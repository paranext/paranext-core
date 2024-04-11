"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const k=require("react/jsx-runtime"),de=require("@mui/material"),ne=require("react"),mr=require("@mui/styled-engine"),Gt=require("react-dom"),Le=require("platform-bible-utils"),fo=require("react-data-grid");function di(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const n in e)if(n!=="default"){const r=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:()=>e[n]})}}return t.default=e,Object.freeze(t)}const w=di(ne),Fs=di(Gt);function lt({id:e,isDisabled:t=!1,className:n,onClick:r,onContextMenu:o,children:i}){return k.jsx(de.Button,{id:e,disabled:t,className:`papi-button ${n??""}`,onClick:r,onContextMenu:o,children:i})}function Pn({id:e,title:t,isDisabled:n=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:l=[],className:c,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:b}){return k.jsx(de.Autocomplete,{id:e,disablePortal:!0,disabled:n,disableClearable:!r,fullWidth:i,options:l,className:`papi-combo-box ${o?"error":""} ${c??""}`,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:b,renderInput:v=>k.jsx(de.TextField,{...v,error:o,fullWidth:i,disabled:n,label:t,style:{width:a}})})}function Vs({startChapter:e,endChapter:t,handleSelectStartChapter:n,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const a=ne.useMemo(()=>Array.from({length:i},(u,d)=>d+1),[i]),l=(u,d)=>{n(d),d>t&&r(d)},c=(u,d)=>{r(d),d<e&&n(d)};return k.jsxs(k.Fragment,{children:[k.jsx(de.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:k.jsx(Pn,{onChange:(u,d)=>l(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),k.jsx(de.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:k.jsx(Pn,{onChange:(u,d)=>c(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:t,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var dt=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(dt||{});function pi({id:e,isChecked:t,labelText:n="",labelPosition:r=dt.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:l=!1,className:c,onChange:u}){const d=k.jsx(de.Checkbox,{id:e,checked:t,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${l?"error":""} ${c??""}`,onChange:u});let f;if(n){const p=r===dt.Before||r===dt.Above,b=k.jsx("span",{className:`papi-checkbox-label ${l?"error":""} ${c??""}`,children:n}),v=r===dt.Before||r===dt.After,g=v?b:k.jsx("div",{children:b}),m=v?d:k.jsx("div",{children:d});f=k.jsxs(de.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:l,children:[p&&g,m,!p&&g]})}else f=d;return f}function ue(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function T(){return T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},T.apply(this,arguments)}function zs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Us(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var o=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,o.get?o:{enumerable:!0,get:function(){return e[r]}})}),n}var gr={exports:{}},vn={exports:{}},se={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ho;function Hs(){if(ho)return se;ho=1;var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function y(h){if(typeof h=="object"&&h!==null){var S=h.$$typeof;switch(S){case t:switch(h=h.type,h){case c:case u:case r:case i:case o:case f:return h;default:switch(h=h&&h.$$typeof,h){case l:case d:case v:case b:case a:return h;default:return S}}case n:return S}}}function x(h){return y(h)===u}return se.AsyncMode=c,se.ConcurrentMode=u,se.ContextConsumer=l,se.ContextProvider=a,se.Element=t,se.ForwardRef=d,se.Fragment=r,se.Lazy=v,se.Memo=b,se.Portal=n,se.Profiler=i,se.StrictMode=o,se.Suspense=f,se.isAsyncMode=function(h){return x(h)||y(h)===c},se.isConcurrentMode=x,se.isContextConsumer=function(h){return y(h)===l},se.isContextProvider=function(h){return y(h)===a},se.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===t},se.isForwardRef=function(h){return y(h)===d},se.isFragment=function(h){return y(h)===r},se.isLazy=function(h){return y(h)===v},se.isMemo=function(h){return y(h)===b},se.isPortal=function(h){return y(h)===n},se.isProfiler=function(h){return y(h)===i},se.isStrictMode=function(h){return y(h)===o},se.isSuspense=function(h){return y(h)===f},se.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===r||h===u||h===i||h===o||h===f||h===p||typeof h=="object"&&h!==null&&(h.$$typeof===v||h.$$typeof===b||h.$$typeof===a||h.$$typeof===l||h.$$typeof===d||h.$$typeof===m||h.$$typeof===E||h.$$typeof===$||h.$$typeof===g)},se.typeOf=y,se}var ae={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mo;function qs(){return mo||(mo=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,t=e?Symbol.for("react.element"):60103,n=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,l=e?Symbol.for("react.context"):60110,c=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,v=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,m=e?Symbol.for("react.fundamental"):60117,E=e?Symbol.for("react.responder"):60118,$=e?Symbol.for("react.scope"):60119;function y(N){return typeof N=="string"||typeof N=="function"||N===r||N===u||N===i||N===o||N===f||N===p||typeof N=="object"&&N!==null&&(N.$$typeof===v||N.$$typeof===b||N.$$typeof===a||N.$$typeof===l||N.$$typeof===d||N.$$typeof===m||N.$$typeof===E||N.$$typeof===$||N.$$typeof===g)}function x(N){if(typeof N=="object"&&N!==null){var J=N.$$typeof;switch(J){case t:var C=N.type;switch(C){case c:case u:case r:case i:case o:case f:return C;default:var oe=C&&C.$$typeof;switch(oe){case l:case d:case v:case b:case a:return oe;default:return J}}case n:return J}}}var h=c,S=u,P=l,A=a,I=t,j=d,B=r,z=v,W=b,L=n,_=i,R=o,D=f,Q=!1;function Z(N){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),O(N)||x(N)===c}function O(N){return x(N)===u}function M(N){return x(N)===l}function V(N){return x(N)===a}function X(N){return typeof N=="object"&&N!==null&&N.$$typeof===t}function F(N){return x(N)===d}function U(N){return x(N)===r}function q(N){return x(N)===v}function G(N){return x(N)===b}function H(N){return x(N)===n}function K(N){return x(N)===i}function Y(N){return x(N)===o}function re(N){return x(N)===f}ae.AsyncMode=h,ae.ConcurrentMode=S,ae.ContextConsumer=P,ae.ContextProvider=A,ae.Element=I,ae.ForwardRef=j,ae.Fragment=B,ae.Lazy=z,ae.Memo=W,ae.Portal=L,ae.Profiler=_,ae.StrictMode=R,ae.Suspense=D,ae.isAsyncMode=Z,ae.isConcurrentMode=O,ae.isContextConsumer=M,ae.isContextProvider=V,ae.isElement=X,ae.isForwardRef=F,ae.isFragment=U,ae.isLazy=q,ae.isMemo=G,ae.isPortal=H,ae.isProfiler=K,ae.isStrictMode=Y,ae.isSuspense=re,ae.isValidElementType=y,ae.typeOf=x}()),ae}var go;function fi(){return go||(go=1,process.env.NODE_ENV==="production"?vn.exports=Hs():vn.exports=qs()),vn.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var er,bo;function Ws(){if(bo)return er;bo=1;var e=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},l=0;l<10;l++)a["_"+String.fromCharCode(l)]=l;var c=Object.getOwnPropertyNames(a).map(function(d){return a[d]});if(c.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(d){u[d]=d}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return er=o()?Object.assign:function(i,a){for(var l,c=r(i),u,d=1;d<arguments.length;d++){l=Object(arguments[d]);for(var f in l)t.call(l,f)&&(c[f]=l[f]);if(e){u=e(l);for(var p=0;p<u.length;p++)n.call(l,u[p])&&(c[u[p]]=l[u[p]])}}return c},er}var tr,vo;function Pr(){if(vo)return tr;vo=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return tr=e,tr}var nr,yo;function hi(){return yo||(yo=1,nr=Function.call.bind(Object.prototype.hasOwnProperty)),nr}var rr,xo;function Gs(){if(xo)return rr;xo=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var t=Pr(),n={},r=hi();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,l,c,u){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var f;try{if(typeof i[d]!="function"){var p=Error((c||"React class")+": "+l+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}f=i[d](a,d,c,l,null,t)}catch(v){f=v}if(f&&!(f instanceof Error)&&e((c||"React class")+": type specification of "+l+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in n)){n[f.message]=!0;var b=u?u():"";e("Failed "+l+" type: "+f.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(n={})},rr=o,rr}var or,Eo;function Xs(){if(Eo)return or;Eo=1;var e=fi(),t=Ws(),n=Pr(),r=hi(),o=Gs(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(l){var c="Warning: "+l;typeof console<"u"&&console.error(c);try{throw new Error(c)}catch{}});function a(){return null}return or=function(l,c){var u=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function f(O){var M=O&&(u&&O[u]||O[d]);if(typeof M=="function")return M}var p="<<anonymous>>",b={array:E("array"),bigint:E("bigint"),bool:E("boolean"),func:E("function"),number:E("number"),object:E("object"),string:E("string"),symbol:E("symbol"),any:$(),arrayOf:y,element:x(),elementType:h(),instanceOf:S,node:j(),objectOf:A,oneOf:P,oneOfType:I,shape:z,exact:W};function v(O,M){return O===M?O!==0||1/O===1/M:O!==O&&M!==M}function g(O,M){this.message=O,this.data=M&&typeof M=="object"?M:{},this.stack=""}g.prototype=Error.prototype;function m(O){if(process.env.NODE_ENV!=="production")var M={},V=0;function X(U,q,G,H,K,Y,re){if(H=H||p,Y=Y||G,re!==n){if(c){var N=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw N.name="Invariant Violation",N}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var J=H+":"+G;!M[J]&&V<3&&(i("You are manually calling a React.PropTypes validation function for the `"+Y+"` prop on `"+H+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),M[J]=!0,V++)}}return q[G]==null?U?q[G]===null?new g("The "+K+" `"+Y+"` is marked as required "+("in `"+H+"`, but its value is `null`.")):new g("The "+K+" `"+Y+"` is marked as required in "+("`"+H+"`, but its value is `undefined`.")):null:O(q,G,H,K,Y)}var F=X.bind(null,!1);return F.isRequired=X.bind(null,!0),F}function E(O){function M(V,X,F,U,q,G){var H=V[X],K=R(H);if(K!==O){var Y=D(H);return new g("Invalid "+U+" `"+q+"` of type "+("`"+Y+"` supplied to `"+F+"`, expected ")+("`"+O+"`."),{expectedType:O})}return null}return m(M)}function $(){return m(a)}function y(O){function M(V,X,F,U,q){if(typeof O!="function")return new g("Property `"+q+"` of component `"+F+"` has invalid PropType notation inside arrayOf.");var G=V[X];if(!Array.isArray(G)){var H=R(G);return new g("Invalid "+U+" `"+q+"` of type "+("`"+H+"` supplied to `"+F+"`, expected an array."))}for(var K=0;K<G.length;K++){var Y=O(G,K,F,U,q+"["+K+"]",n);if(Y instanceof Error)return Y}return null}return m(M)}function x(){function O(M,V,X,F,U){var q=M[V];if(!l(q)){var G=R(q);return new g("Invalid "+F+" `"+U+"` of type "+("`"+G+"` supplied to `"+X+"`, expected a single ReactElement."))}return null}return m(O)}function h(){function O(M,V,X,F,U){var q=M[V];if(!e.isValidElementType(q)){var G=R(q);return new g("Invalid "+F+" `"+U+"` of type "+("`"+G+"` supplied to `"+X+"`, expected a single ReactElement type."))}return null}return m(O)}function S(O){function M(V,X,F,U,q){if(!(V[X]instanceof O)){var G=O.name||p,H=Z(V[X]);return new g("Invalid "+U+" `"+q+"` of type "+("`"+H+"` supplied to `"+F+"`, expected ")+("instance of `"+G+"`."))}return null}return m(M)}function P(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function M(V,X,F,U,q){for(var G=V[X],H=0;H<O.length;H++)if(v(G,O[H]))return null;var K=JSON.stringify(O,function(re,N){var J=D(N);return J==="symbol"?String(N):N});return new g("Invalid "+U+" `"+q+"` of value `"+String(G)+"` "+("supplied to `"+F+"`, expected one of "+K+"."))}return m(M)}function A(O){function M(V,X,F,U,q){if(typeof O!="function")return new g("Property `"+q+"` of component `"+F+"` has invalid PropType notation inside objectOf.");var G=V[X],H=R(G);if(H!=="object")return new g("Invalid "+U+" `"+q+"` of type "+("`"+H+"` supplied to `"+F+"`, expected an object."));for(var K in G)if(r(G,K)){var Y=O(G,K,F,U,q+"."+K,n);if(Y instanceof Error)return Y}return null}return m(M)}function I(O){if(!Array.isArray(O))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var M=0;M<O.length;M++){var V=O[M];if(typeof V!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+Q(V)+" at index "+M+"."),a}function X(F,U,q,G,H){for(var K=[],Y=0;Y<O.length;Y++){var re=O[Y],N=re(F,U,q,G,H,n);if(N==null)return null;N.data&&r(N.data,"expectedType")&&K.push(N.data.expectedType)}var J=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new g("Invalid "+G+" `"+H+"` supplied to "+("`"+q+"`"+J+"."))}return m(X)}function j(){function O(M,V,X,F,U){return L(M[V])?null:new g("Invalid "+F+" `"+U+"` supplied to "+("`"+X+"`, expected a ReactNode."))}return m(O)}function B(O,M,V,X,F){return new g((O||"React class")+": "+M+" type `"+V+"."+X+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+F+"`.")}function z(O){function M(V,X,F,U,q){var G=V[X],H=R(G);if(H!=="object")return new g("Invalid "+U+" `"+q+"` of type `"+H+"` "+("supplied to `"+F+"`, expected `object`."));for(var K in O){var Y=O[K];if(typeof Y!="function")return B(F,U,q,K,D(Y));var re=Y(G,K,F,U,q+"."+K,n);if(re)return re}return null}return m(M)}function W(O){function M(V,X,F,U,q){var G=V[X],H=R(G);if(H!=="object")return new g("Invalid "+U+" `"+q+"` of type `"+H+"` "+("supplied to `"+F+"`, expected `object`."));var K=t({},V[X],O);for(var Y in K){var re=O[Y];if(r(O,Y)&&typeof re!="function")return B(F,U,q,Y,D(re));if(!re)return new g("Invalid "+U+" `"+q+"` key `"+Y+"` supplied to `"+F+"`.\nBad object: "+JSON.stringify(V[X],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(O),null,"  "));var N=re(G,Y,F,U,q+"."+Y,n);if(N)return N}return null}return m(M)}function L(O){switch(typeof O){case"number":case"string":case"undefined":return!0;case"boolean":return!O;case"object":if(Array.isArray(O))return O.every(L);if(O===null||l(O))return!0;var M=f(O);if(M){var V=M.call(O),X;if(M!==O.entries){for(;!(X=V.next()).done;)if(!L(X.value))return!1}else for(;!(X=V.next()).done;){var F=X.value;if(F&&!L(F[1]))return!1}}else return!1;return!0;default:return!1}}function _(O,M){return O==="symbol"?!0:M?M["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&M instanceof Symbol:!1}function R(O){var M=typeof O;return Array.isArray(O)?"array":O instanceof RegExp?"object":_(M,O)?"symbol":M}function D(O){if(typeof O>"u"||O===null)return""+O;var M=R(O);if(M==="object"){if(O instanceof Date)return"date";if(O instanceof RegExp)return"regexp"}return M}function Q(O){var M=D(O);switch(M){case"array":case"object":return"an "+M;case"boolean":case"date":case"regexp":return"a "+M;default:return M}}function Z(O){return!O.constructor||!O.constructor.name?p:O.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},or}var ir,wo;function Ks(){if(wo)return ir;wo=1;var e=Pr();function t(){}function n(){}return n.resetWarningCache=t,ir=function(){function r(a,l,c,u,d,f){if(f!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:n,resetWarningCache:t};return i.PropTypes=i,i},ir}if(process.env.NODE_ENV!=="production"){var Ys=fi(),Js=!0;gr.exports=Xs()(Ys.isElement,Js)}else gr.exports=Ks()();var Zs=gr.exports;const s=zs(Zs);function mi(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(n=mi(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function ye(){for(var e,t,n=0,r="",o=arguments.length;n<o;n++)(e=arguments[n])&&(t=mi(e))&&(r&&(r+=" "),r+=t);return r}function At(e,t){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||t(...r)}}function pt(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function gi(e){if(!pt(e))return e;const t={};return Object.keys(e).forEach(n=>{t[n]=gi(e[n])}),t}function Xe(e,t,n={clone:!0}){const r=n.clone?T({},e):e;return pt(e)&&pt(t)&&Object.keys(t).forEach(o=>{o!=="__proto__"&&(pt(t[o])&&o in e&&pt(e[o])?r[o]=Xe(e[o],t[o],n):n.clone?r[o]=pt(t[o])?gi(t[o]):t[o]:r[o]=t[o])}),r}function Qs(e){const{prototype:t={}}=e;return!!t.isReactComponent}function bi(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;const c=i.type;return typeof c=="function"&&!Qs(c)&&(l="Did you accidentally use a plain function component for an element instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const vi=At(s.element,bi);vi.isRequired=At(s.element.isRequired,bi);const ln=vi;function ea(e){const{prototype:t={}}=e;return!!t.isReactComponent}function ta(e,t,n,r,o){const i=e[t],a=o||t;if(i==null||typeof window>"u")return null;let l;return typeof i=="function"&&!ea(i)&&(l="Did you accidentally provide a plain function component instead?"),l!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const na=At(s.elementType,ta),ra="exact-prop: ​";function yi(e){return process.env.NODE_ENV==="production"?e:T({},e,{[ra]:t=>{const n=Object.keys(t).filter(r=>!e.hasOwnProperty(r));return n.length>0?new Error(`The following props are not supported: ${n.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function Rt(e){let t="https://mui.com/production-error/?code="+e;for(let n=1;n<arguments.length;n+=1)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}var br={exports:{}},le={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var To;function oa(){if(To)return le;To=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v;v=Symbol.for("react.module.reference");function g(m){if(typeof m=="object"&&m!==null){var E=m.$$typeof;switch(E){case e:switch(m=m.type,m){case n:case o:case r:case u:case d:return m;default:switch(m=m&&m.$$typeof,m){case l:case a:case c:case p:case f:case i:return m;default:return E}}case t:return E}}}return le.ContextConsumer=a,le.ContextProvider=i,le.Element=e,le.ForwardRef=c,le.Fragment=n,le.Lazy=p,le.Memo=f,le.Portal=t,le.Profiler=o,le.StrictMode=r,le.Suspense=u,le.SuspenseList=d,le.isAsyncMode=function(){return!1},le.isConcurrentMode=function(){return!1},le.isContextConsumer=function(m){return g(m)===a},le.isContextProvider=function(m){return g(m)===i},le.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===e},le.isForwardRef=function(m){return g(m)===c},le.isFragment=function(m){return g(m)===n},le.isLazy=function(m){return g(m)===p},le.isMemo=function(m){return g(m)===f},le.isPortal=function(m){return g(m)===t},le.isProfiler=function(m){return g(m)===o},le.isStrictMode=function(m){return g(m)===r},le.isSuspense=function(m){return g(m)===u},le.isSuspenseList=function(m){return g(m)===d},le.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===n||m===o||m===r||m===u||m===d||m===b||typeof m=="object"&&m!==null&&(m.$$typeof===p||m.$$typeof===f||m.$$typeof===i||m.$$typeof===a||m.$$typeof===c||m.$$typeof===v||m.getModuleId!==void 0)},le.typeOf=g,le}var ce={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oo;function ia(){return Oo||(Oo=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),l=Symbol.for("react.server_context"),c=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),v=!1,g=!1,m=!1,E=!1,$=!1,y;y=Symbol.for("react.module.reference");function x(C){return!!(typeof C=="string"||typeof C=="function"||C===n||C===o||$||C===r||C===u||C===d||E||C===b||v||g||m||typeof C=="object"&&C!==null&&(C.$$typeof===p||C.$$typeof===f||C.$$typeof===i||C.$$typeof===a||C.$$typeof===c||C.$$typeof===y||C.getModuleId!==void 0))}function h(C){if(typeof C=="object"&&C!==null){var oe=C.$$typeof;switch(oe){case e:var be=C.type;switch(be){case n:case o:case r:case u:case d:return be;default:var we=be&&be.$$typeof;switch(we){case l:case a:case c:case p:case f:case i:return we;default:return oe}}case t:return oe}}}var S=a,P=i,A=e,I=c,j=n,B=p,z=f,W=t,L=o,_=r,R=u,D=d,Q=!1,Z=!1;function O(C){return Q||(Q=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function M(C){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function V(C){return h(C)===a}function X(C){return h(C)===i}function F(C){return typeof C=="object"&&C!==null&&C.$$typeof===e}function U(C){return h(C)===c}function q(C){return h(C)===n}function G(C){return h(C)===p}function H(C){return h(C)===f}function K(C){return h(C)===t}function Y(C){return h(C)===o}function re(C){return h(C)===r}function N(C){return h(C)===u}function J(C){return h(C)===d}ce.ContextConsumer=S,ce.ContextProvider=P,ce.Element=A,ce.ForwardRef=I,ce.Fragment=j,ce.Lazy=B,ce.Memo=z,ce.Portal=W,ce.Profiler=L,ce.StrictMode=_,ce.Suspense=R,ce.SuspenseList=D,ce.isAsyncMode=O,ce.isConcurrentMode=M,ce.isContextConsumer=V,ce.isContextProvider=X,ce.isElement=F,ce.isForwardRef=U,ce.isFragment=q,ce.isLazy=G,ce.isMemo=H,ce.isPortal=K,ce.isProfiler=Y,ce.isStrictMode=re,ce.isSuspense=N,ce.isSuspenseList=J,ce.isValidElementType=x,ce.typeOf=h}()),ce}process.env.NODE_ENV==="production"?br.exports=oa():br.exports=ia();var Cn=br.exports;const sa=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function aa(e){const t=`${e}`.match(sa);return t&&t[1]||""}function xi(e,t=""){return e.displayName||e.name||aa(e)||t}function ko(e,t,n){const r=xi(t);return e.displayName||(r!==""?`${n}(${r})`:n)}function la(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return xi(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Cn.ForwardRef:return ko(e,e.render,"ForwardRef");case Cn.Memo:return ko(e,e.type,"memo");default:return}}}function Ke(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[t],a=o||t;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`):null}const ca=s.oneOfType([s.func,s.object]),Cr=ca;function ze(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":Rt(7));return e.charAt(0).toUpperCase()+e.slice(1)}function vr(...e){return e.reduce((t,n)=>n==null?t:function(...o){t.apply(this,o),n.apply(this,o)},()=>{})}function Ei(e,t=166){let n;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r}function ua(e,t){return process.env.NODE_ENV==="production"?()=>null:(n,r,o,i,a)=>{const l=o||"<<anonymous>>",c=a||r;return typeof n[r]<"u"?new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`):null}}function da(e,t){var n,r;return w.isValidElement(e)&&t.indexOf((n=e.type.muiName)!=null?n:(r=e.type)==null||(r=r._payload)==null||(r=r.value)==null?void 0:r.muiName)!==-1}function xe(e){return e&&e.ownerDocument||document}function Nt(e){return xe(e).defaultView||window}function pa(e,t){if(process.env.NODE_ENV==="production")return()=>null;const n=t?T({},t.propTypes):null;return o=>(i,a,l,c,u,...d)=>{const f=u||a,p=n==null?void 0:n[f];if(p){const b=p(i,a,l,c,u,...d);if(b)return b}return typeof i[a]<"u"&&!i[o]?new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`):null}}function Rn(e,t){typeof e=="function"?e(t):e&&(e.current=t)}const fa=typeof window<"u"?w.useLayoutEffect:w.useEffect,ht=fa;let So=0;function ha(e){const[t,n]=w.useState(e),r=e||t;return w.useEffect(()=>{t==null&&(So+=1,n(`mui-${So}`))},[t]),r}const Po=w["useId".toString()];function wi(e){if(Po!==void 0){const t=Po();return e??t}return ha(e)}function ma(e,t,n,r,o){if(process.env.NODE_ENV==="production")return null;const i=o||t;return typeof e[t]<"u"?new Error(`The prop \`${i}\` is not supported. Please remove it.`):null}function Ti({controlled:e,default:t,name:n,state:r="value"}){const{current:o}=w.useRef(e!==void 0),[i,a]=w.useState(t),l=o?e:i;if(process.env.NODE_ENV!=="production"){w.useEffect(()=>{o!==(e!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${r} state of ${n} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[r,n,e]);const{current:u}=w.useRef(t);w.useEffect(()=>{!o&&u!==t&&console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`))},[JSON.stringify(t)])}const c=w.useCallback(u=>{o||a(u)},[]);return[l,c]}function tn(e){const t=w.useRef(e);return ht(()=>{t.current=e}),w.useRef((...n)=>(0,t.current)(...n)).current}function Ae(...e){return w.useMemo(()=>e.every(t=>t==null)?null:t=>{e.forEach(n=>{Rn(n,t)})},e)}const Co={};function ga(e,t){const n=w.useRef(Co);return n.current===Co&&(n.current=e(t)),n}const ba=[];function va(e){w.useEffect(e,ba)}class cn{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new cn}start(t,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},t)}}function Xt(){const e=ga(cn.create).current;return va(e.disposeEffect),e}let Dn=!0,yr=!1;const ya=new cn,xa={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Ea(e){const{type:t,tagName:n}=e;return!!(n==="INPUT"&&xa[t]&&!e.readOnly||n==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function wa(e){e.metaKey||e.altKey||e.ctrlKey||(Dn=!0)}function sr(){Dn=!1}function Ta(){this.visibilityState==="hidden"&&yr&&(Dn=!0)}function Oa(e){e.addEventListener("keydown",wa,!0),e.addEventListener("mousedown",sr,!0),e.addEventListener("pointerdown",sr,!0),e.addEventListener("touchstart",sr,!0),e.addEventListener("visibilitychange",Ta,!0)}function ka(e){const{target:t}=e;try{return t.matches(":focus-visible")}catch{}return Dn||Ea(t)}function Oi(){const e=w.useCallback(o=>{o!=null&&Oa(o.ownerDocument)},[]),t=w.useRef(!1);function n(){return t.current?(yr=!0,ya.start(100,()=>{yr=!1}),t.current=!1,!0):!1}function r(o){return ka(o)?(t.current=!0,!0):!1}return{isFocusVisibleRef:t,onFocus:r,onBlur:n,ref:e}}function ki(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function Sa(e){const t=typeof e;switch(t){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return t}}function Pa(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Ca=Number.isInteger||Pa;function Si(e,t,n,r){const o=e[t];if(o==null||!Ca(o)){const i=Sa(o);return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`)}return null}function Pi(e,t,...n){return e[t]===void 0?null:Si(e,t,...n)}function xr(){return null}Pi.isRequired=Si;xr.isRequired=xr;const Ci=process.env.NODE_ENV==="production"?xr:Pi;function Ri(e,t){const n=T({},t);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))n[r]=T({},e[r],n[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=t[r];n[r]={},!i||!Object.keys(i)?n[r]=o:!o||!Object.keys(o)?n[r]=i:(n[r]=T({},i),Object.keys(o).forEach(a=>{n[r][a]=Ri(o[a],i[a])}))}else n[r]===void 0&&(n[r]=e[r])}),n}function Ze(e,t,n=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,a)=>{if(a){const l=t(a);l!==""&&i.push(l),n&&n[a]&&i.push(n[a])}return i},[]).join(" ")}),r}const Ro=e=>e,Ra=()=>{let e=Ro;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Ro}}},Na=Ra(),Ni=Na,$i={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function He(e,t,n="Mui"){const r=$i[t];return r?`${n}-${r}`:`${Ni.generate(e)}-${t}`}function rt(e,t,n="Mui"){const r={};return t.forEach(o=>{r[o]=He(e,o,n)}),r}function $a(e,t=Number.MIN_SAFE_INTEGER,n=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,n))}function Mi(e){return typeof e=="string"}function Kt(e,t,n){return e===void 0||Mi(e)?t:T({},t,{ownerState:T({},t.ownerState,n)})}const Ma={disableDefaultClasses:!1},_a=w.createContext(Ma);function Ia(e){const{disableDefaultClasses:t}=w.useContext(_a);return n=>t?"":e(n)}function _i(e,t=[]){if(e===void 0)return{};const n={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!t.includes(r)).forEach(r=>{n[r]=e[r]}),n}function Aa(e,t,n){return typeof e=="function"?e(t,n):e}function No(e){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>!(n.match(/^on[A-Z]/)&&typeof e[n]=="function")).forEach(n=>{t[n]=e[n]}),t}function ja(e){const{getSlotProps:t,additionalProps:n,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!t){const b=ye(n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),v=T({},n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),g=T({},n,o,r);return b.length>0&&(g.className=b),Object.keys(v).length>0&&(g.style=v),{props:g,internalRef:void 0}}const a=_i(T({},o,r)),l=No(r),c=No(o),u=t(a),d=ye(u==null?void 0:u.className,n==null?void 0:n.className,i,o==null?void 0:o.className,r==null?void 0:r.className),f=T({},u==null?void 0:u.style,n==null?void 0:n.style,o==null?void 0:o.style,r==null?void 0:r.style),p=T({},u,n,c,l);return d.length>0&&(p.className=d),Object.keys(f).length>0&&(p.style=f),{props:p,internalRef:u.ref}}const Da=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function mt(e){var t;const{elementType:n,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,a=ue(e,Da),l=i?{}:Aa(r,o),{props:c,internalRef:u}=ja(T({},a,{externalSlotProps:l})),d=Ae(u,l==null?void 0:l.ref,(t=e.additionalProps)==null?void 0:t.ref);return Kt(n,T({},c,{ref:d}),o)}const Ii="base";function Ba(e){return`${Ii}--${e}`}function La(e,t){return`${Ii}-${e}-${t}`}function Ai(e,t){const n=$i[t];return n?Ba(n):La(e,t)}function Fa(e,t){const n={};return t.forEach(r=>{n[r]=Ai(e,r)}),n}const Va=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function za(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Ua(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}function Ha(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Ua(e))}function qa(e){const t=[],n=[];return Array.from(e.querySelectorAll(Va)).forEach((r,o)=>{const i=za(r);i===-1||!Ha(r)||(i===0?t.push(r):n.push({documentOrder:o,tabIndex:i,node:r}))}),n.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(t)}function Wa(){return!0}function Nn(e){const{children:t,disableAutoFocus:n=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=qa,isEnabled:a=Wa,open:l}=e,c=w.useRef(!1),u=w.useRef(null),d=w.useRef(null),f=w.useRef(null),p=w.useRef(null),b=w.useRef(!1),v=w.useRef(null),g=Ae(t.ref,v),m=w.useRef(null);w.useEffect(()=>{!l||!v.current||(b.current=!n)},[n,l]),w.useEffect(()=>{if(!l||!v.current)return;const y=xe(v.current);return v.current.contains(y.activeElement)||(v.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),v.current.setAttribute("tabIndex","-1")),b.current&&v.current.focus()),()=>{o||(f.current&&f.current.focus&&(c.current=!0,f.current.focus()),f.current=null)}},[l]),w.useEffect(()=>{if(!l||!v.current)return;const y=xe(v.current),x=P=>{m.current=P,!(r||!a()||P.key!=="Tab")&&y.activeElement===v.current&&P.shiftKey&&(c.current=!0,d.current&&d.current.focus())},h=()=>{const P=v.current;if(P===null)return;if(!y.hasFocus()||!a()||c.current){c.current=!1;return}if(P.contains(y.activeElement)||r&&y.activeElement!==u.current&&y.activeElement!==d.current)return;if(y.activeElement!==p.current)p.current=null;else if(p.current!==null)return;if(!b.current)return;let A=[];if((y.activeElement===u.current||y.activeElement===d.current)&&(A=i(v.current)),A.length>0){var I,j;const B=!!((I=m.current)!=null&&I.shiftKey&&((j=m.current)==null?void 0:j.key)==="Tab"),z=A[0],W=A[A.length-1];typeof z!="string"&&typeof W!="string"&&(B?W.focus():z.focus())}else P.focus()};y.addEventListener("focusin",h),y.addEventListener("keydown",x,!0);const S=setInterval(()=>{y.activeElement&&y.activeElement.tagName==="BODY"&&h()},50);return()=>{clearInterval(S),y.removeEventListener("focusin",h),y.removeEventListener("keydown",x,!0)}},[n,r,o,a,l,i]);const E=y=>{f.current===null&&(f.current=y.relatedTarget),b.current=!0,p.current=y.target;const x=t.props.onFocus;x&&x(y)},$=y=>{f.current===null&&(f.current=y.relatedTarget),b.current=!0};return k.jsxs(w.Fragment,{children:[k.jsx("div",{tabIndex:l?0:-1,onFocus:$,ref:u,"data-testid":"sentinelStart"}),w.cloneElement(t,{ref:g,onFocus:E}),k.jsx("div",{tabIndex:l?0:-1,onFocus:$,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Nn.propTypes={children:ln,disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableRestoreFocus:s.bool,getTabbable:s.func,isEnabled:s.func,open:s.bool.isRequired});process.env.NODE_ENV!=="production"&&(Nn["propTypes"]=yi(Nn.propTypes));function Ga(e){return typeof e=="function"?e():e}const nn=w.forwardRef(function(t,n){const{children:r,container:o,disablePortal:i=!1}=t,[a,l]=w.useState(null),c=Ae(w.isValidElement(r)?r.ref:null,n);if(ht(()=>{i||l(Ga(o)||document.body)},[o,i]),ht(()=>{if(a&&!i)return Rn(n,a),()=>{Rn(n,null)}},[n,a,i]),i){if(w.isValidElement(r)){const u={ref:c};return w.cloneElement(r,u)}return k.jsx(w.Fragment,{children:r})}return k.jsx(w.Fragment,{children:a&&Fs.createPortal(r,a)})});process.env.NODE_ENV!=="production"&&(nn.propTypes={children:s.node,container:s.oneOfType([Ke,s.func]),disablePortal:s.bool});process.env.NODE_ENV!=="production"&&(nn["propTypes"]=yi(nn.propTypes));function Xa(e){const t=xe(e);return t.body===e?Nt(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function Jt(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function $o(e){return parseInt(Nt(e).getComputedStyle(e).paddingRight,10)||0}function Ka(e){const n=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return n||r}function Mo(e,t,n,r,o){const i=[t,n,...r];[].forEach.call(e.children,a=>{const l=i.indexOf(a)===-1,c=!Ka(a);l&&c&&Jt(a,o)})}function ar(e,t){let n=-1;return e.some((r,o)=>t(r)?(n=o,!0):!1),n}function Ya(e,t){const n=[],r=e.container;if(!t.disableScrollLock){if(Xa(r)){const a=ki(xe(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${$o(r)+a}px`;const l=xe(r).querySelectorAll(".mui-fixed");[].forEach.call(l,c=>{n.push({value:c.style.paddingRight,property:"padding-right",el:c}),c.style.paddingRight=`${$o(c)+a}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=xe(r).body;else{const a=r.parentElement,l=Nt(r);i=(a==null?void 0:a.nodeName)==="HTML"&&l.getComputedStyle(a).overflowY==="scroll"?a:r}n.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{n.forEach(({value:i,el:a,property:l})=>{i?a.style.setProperty(l,i):a.style.removeProperty(l)})}}function Ja(e){const t=[];return[].forEach.call(e.children,n=>{n.getAttribute("aria-hidden")==="true"&&t.push(n)}),t}class Za{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,n){let r=this.modals.indexOf(t);if(r!==-1)return r;r=this.modals.length,this.modals.push(t),t.modalRef&&Jt(t.modalRef,!1);const o=Ja(n);Mo(n,t.mount,t.modalRef,o,!0);const i=ar(this.containers,a=>a.container===n);return i!==-1?(this.containers[i].modals.push(t),r):(this.containers.push({modals:[t],container:n,restore:null,hiddenSiblings:o}),r)}mount(t,n){const r=ar(this.containers,i=>i.modals.indexOf(t)!==-1),o=this.containers[r];o.restore||(o.restore=Ya(o,n))}remove(t,n=!0){const r=this.modals.indexOf(t);if(r===-1)return r;const o=ar(this.containers,a=>a.modals.indexOf(t)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(t),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),t.modalRef&&Jt(t.modalRef,n),Mo(i.container,t.mount,t.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const a=i.modals[i.modals.length-1];a.modalRef&&Jt(a.modalRef,!1)}return r}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}function Qa(e){return typeof e=="function"?e():e}function el(e){return e?e.props.hasOwnProperty("in"):!1}const tl=new Za;function nl(e){const{container:t,disableEscapeKeyDown:n=!1,disableScrollLock:r=!1,manager:o=tl,closeAfterTransition:i=!1,onTransitionEnter:a,onTransitionExited:l,children:c,onClose:u,open:d,rootRef:f}=e,p=w.useRef({}),b=w.useRef(null),v=w.useRef(null),g=Ae(v,f),[m,E]=w.useState(!d),$=el(c);let y=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(y=!1);const x=()=>xe(b.current),h=()=>(p.current.modalRef=v.current,p.current.mount=b.current,p.current),S=()=>{o.mount(h(),{disableScrollLock:r}),v.current&&(v.current.scrollTop=0)},P=tn(()=>{const R=Qa(t)||x().body;o.add(h(),R),v.current&&S()}),A=w.useCallback(()=>o.isTopModal(h()),[o]),I=tn(R=>{b.current=R,R&&(d&&A()?S():v.current&&Jt(v.current,y))}),j=w.useCallback(()=>{o.remove(h(),y)},[y,o]);w.useEffect(()=>()=>{j()},[j]),w.useEffect(()=>{d?P():(!$||!i)&&j()},[d,j,$,i,P]);const B=R=>D=>{var Q;(Q=R.onKeyDown)==null||Q.call(R,D),!(D.key!=="Escape"||D.which===229||!A())&&(n||(D.stopPropagation(),u&&u(D,"escapeKeyDown")))},z=R=>D=>{var Q;(Q=R.onClick)==null||Q.call(R,D),D.target===D.currentTarget&&u&&u(D,"backdropClick")};return{getRootProps:(R={})=>{const D=_i(e);delete D.onTransitionEnter,delete D.onTransitionExited;const Q=T({},D,R);return T({role:"presentation"},Q,{onKeyDown:B(Q),ref:g})},getBackdropProps:(R={})=>{const D=R;return T({"aria-hidden":!0},D,{onClick:z(D),open:d})},getTransitionProps:()=>{const R=()=>{E(!1),a&&a()},D=()=>{E(!0),l&&l(),i&&j()};return{onEnter:vr(R,c==null?void 0:c.props.onEnter),onExited:vr(D,c==null?void 0:c.props.onExited)}},rootRef:g,portalRef:I,isTopModal:A,exited:m,hasTransition:$}}var ke="top",je="bottom",De="right",Se="left",Rr="auto",un=[ke,je,De,Se],$t="start",rn="end",rl="clippingParents",ji="viewport",zt="popper",ol="reference",_o=un.reduce(function(e,t){return e.concat([t+"-"+$t,t+"-"+rn])},[]),Di=[].concat(un,[Rr]).reduce(function(e,t){return e.concat([t,t+"-"+$t,t+"-"+rn])},[]),il="beforeRead",sl="read",al="afterRead",ll="beforeMain",cl="main",ul="afterMain",dl="beforeWrite",pl="write",fl="afterWrite",hl=[il,sl,al,ll,cl,ul,dl,pl,fl];function Ue(e){return e?(e.nodeName||"").toLowerCase():null}function $e(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function gt(e){var t=$e(e).Element;return e instanceof t||e instanceof Element}function Ie(e){var t=$e(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function Nr(e){if(typeof ShadowRoot>"u")return!1;var t=$e(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function ml(e){var t=e.state;Object.keys(t.elements).forEach(function(n){var r=t.styles[n]||{},o=t.attributes[n]||{},i=t.elements[n];!Ie(i)||!Ue(i)||(Object.assign(i.style,r),Object.keys(o).forEach(function(a){var l=o[a];l===!1?i.removeAttribute(a):i.setAttribute(a,l===!0?"":l)}))})}function gl(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach(function(r){var o=t.elements[r],i=t.attributes[r]||{},a=Object.keys(t.styles.hasOwnProperty(r)?t.styles[r]:n[r]),l=a.reduce(function(c,u){return c[u]="",c},{});!Ie(o)||!Ue(o)||(Object.assign(o.style,l),Object.keys(i).forEach(function(c){o.removeAttribute(c)}))})}}const bl={name:"applyStyles",enabled:!0,phase:"write",fn:ml,effect:gl,requires:["computeStyles"]};function Ve(e){return e.split("-")[0]}var ft=Math.max,$n=Math.min,Mt=Math.round;function Er(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Bi(){return!/^((?!chrome|android).)*safari/i.test(Er())}function _t(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!1);var r=e.getBoundingClientRect(),o=1,i=1;t&&Ie(e)&&(o=e.offsetWidth>0&&Mt(r.width)/e.offsetWidth||1,i=e.offsetHeight>0&&Mt(r.height)/e.offsetHeight||1);var a=gt(e)?$e(e):window,l=a.visualViewport,c=!Bi()&&n,u=(r.left+(c&&l?l.offsetLeft:0))/o,d=(r.top+(c&&l?l.offsetTop:0))/i,f=r.width/o,p=r.height/i;return{width:f,height:p,top:d,right:u+f,bottom:d+p,left:u,x:u,y:d}}function $r(e){var t=_t(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function Li(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&Nr(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Ye(e){return $e(e).getComputedStyle(e)}function vl(e){return["table","td","th"].indexOf(Ue(e))>=0}function ot(e){return((gt(e)?e.ownerDocument:e.document)||window.document).documentElement}function Bn(e){return Ue(e)==="html"?e:e.assignedSlot||e.parentNode||(Nr(e)?e.host:null)||ot(e)}function Io(e){return!Ie(e)||Ye(e).position==="fixed"?null:e.offsetParent}function yl(e){var t=/firefox/i.test(Er()),n=/Trident/i.test(Er());if(n&&Ie(e)){var r=Ye(e);if(r.position==="fixed")return null}var o=Bn(e);for(Nr(o)&&(o=o.host);Ie(o)&&["html","body"].indexOf(Ue(o))<0;){var i=Ye(o);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||t&&i.willChange==="filter"||t&&i.filter&&i.filter!=="none")return o;o=o.parentNode}return null}function dn(e){for(var t=$e(e),n=Io(e);n&&vl(n)&&Ye(n).position==="static";)n=Io(n);return n&&(Ue(n)==="html"||Ue(n)==="body"&&Ye(n).position==="static")?t:n||yl(e)||t}function Mr(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Zt(e,t,n){return ft(e,$n(t,n))}function xl(e,t,n){var r=Zt(e,t,n);return r>n?n:r}function Fi(){return{top:0,right:0,bottom:0,left:0}}function Vi(e){return Object.assign({},Fi(),e)}function zi(e,t){return t.reduce(function(n,r){return n[r]=e,n},{})}var El=function(t,n){return t=typeof t=="function"?t(Object.assign({},n.rects,{placement:n.placement})):t,Vi(typeof t!="number"?t:zi(t,un))};function wl(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,l=Ve(n.placement),c=Mr(l),u=[Se,De].indexOf(l)>=0,d=u?"height":"width";if(!(!i||!a)){var f=El(o.padding,n),p=$r(i),b=c==="y"?ke:Se,v=c==="y"?je:De,g=n.rects.reference[d]+n.rects.reference[c]-a[c]-n.rects.popper[d],m=a[c]-n.rects.reference[c],E=dn(i),$=E?c==="y"?E.clientHeight||0:E.clientWidth||0:0,y=g/2-m/2,x=f[b],h=$-p[d]-f[v],S=$/2-p[d]/2+y,P=Zt(x,S,h),A=c;n.modifiersData[r]=(t={},t[A]=P,t.centerOffset=P-S,t)}}function Tl(e){var t=e.state,n=e.options,r=n.element,o=r===void 0?"[data-popper-arrow]":r;o!=null&&(typeof o=="string"&&(o=t.elements.popper.querySelector(o),!o)||Li(t.elements.popper,o)&&(t.elements.arrow=o))}const Ol={name:"arrow",enabled:!0,phase:"main",fn:wl,effect:Tl,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function It(e){return e.split("-")[1]}var kl={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Sl(e,t){var n=e.x,r=e.y,o=t.devicePixelRatio||1;return{x:Mt(n*o)/o||0,y:Mt(r*o)/o||0}}function Ao(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,a=e.offsets,l=e.position,c=e.gpuAcceleration,u=e.adaptive,d=e.roundOffsets,f=e.isFixed,p=a.x,b=p===void 0?0:p,v=a.y,g=v===void 0?0:v,m=typeof d=="function"?d({x:b,y:g}):{x:b,y:g};b=m.x,g=m.y;var E=a.hasOwnProperty("x"),$=a.hasOwnProperty("y"),y=Se,x=ke,h=window;if(u){var S=dn(n),P="clientHeight",A="clientWidth";if(S===$e(n)&&(S=ot(n),Ye(S).position!=="static"&&l==="absolute"&&(P="scrollHeight",A="scrollWidth")),S=S,o===ke||(o===Se||o===De)&&i===rn){x=je;var I=f&&S===h&&h.visualViewport?h.visualViewport.height:S[P];g-=I-r.height,g*=c?1:-1}if(o===Se||(o===ke||o===je)&&i===rn){y=De;var j=f&&S===h&&h.visualViewport?h.visualViewport.width:S[A];b-=j-r.width,b*=c?1:-1}}var B=Object.assign({position:l},u&&kl),z=d===!0?Sl({x:b,y:g},$e(n)):{x:b,y:g};if(b=z.x,g=z.y,c){var W;return Object.assign({},B,(W={},W[x]=$?"0":"",W[y]=E?"0":"",W.transform=(h.devicePixelRatio||1)<=1?"translate("+b+"px, "+g+"px)":"translate3d("+b+"px, "+g+"px, 0)",W))}return Object.assign({},B,(t={},t[x]=$?g+"px":"",t[y]=E?b+"px":"",t.transform="",t))}function Pl(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=r===void 0?!0:r,i=n.adaptive,a=i===void 0?!0:i,l=n.roundOffsets,c=l===void 0?!0:l,u={placement:Ve(t.placement),variation:It(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Ao(Object.assign({},u,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:c})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ao(Object.assign({},u,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const Cl={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Pl,data:{}};var yn={passive:!0};function Rl(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=o===void 0?!0:o,a=r.resize,l=a===void 0?!0:a,c=$e(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&u.forEach(function(d){d.addEventListener("scroll",n.update,yn)}),l&&c.addEventListener("resize",n.update,yn),function(){i&&u.forEach(function(d){d.removeEventListener("scroll",n.update,yn)}),l&&c.removeEventListener("resize",n.update,yn)}}const Nl={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Rl,data:{}};var $l={left:"right",right:"left",bottom:"top",top:"bottom"};function Tn(e){return e.replace(/left|right|bottom|top/g,function(t){return $l[t]})}var Ml={start:"end",end:"start"};function jo(e){return e.replace(/start|end/g,function(t){return Ml[t]})}function _r(e){var t=$e(e),n=t.pageXOffset,r=t.pageYOffset;return{scrollLeft:n,scrollTop:r}}function Ir(e){return _t(ot(e)).left+_r(e).scrollLeft}function _l(e,t){var n=$e(e),r=ot(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,l=0,c=0;if(o){i=o.width,a=o.height;var u=Bi();(u||!u&&t==="fixed")&&(l=o.offsetLeft,c=o.offsetTop)}return{width:i,height:a,x:l+Ir(e),y:c}}function Il(e){var t,n=ot(e),r=_r(e),o=(t=e.ownerDocument)==null?void 0:t.body,i=ft(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=ft(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-r.scrollLeft+Ir(e),c=-r.scrollTop;return Ye(o||n).direction==="rtl"&&(l+=ft(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:l,y:c}}function Ar(e){var t=Ye(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function Ui(e){return["html","body","#document"].indexOf(Ue(e))>=0?e.ownerDocument.body:Ie(e)&&Ar(e)?e:Ui(Bn(e))}function Qt(e,t){var n;t===void 0&&(t=[]);var r=Ui(e),o=r===((n=e.ownerDocument)==null?void 0:n.body),i=$e(r),a=o?[i].concat(i.visualViewport||[],Ar(r)?r:[]):r,l=t.concat(a);return o?l:l.concat(Qt(Bn(a)))}function wr(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Al(e,t){var n=_t(e,!1,t==="fixed");return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}function Do(e,t,n){return t===ji?wr(_l(e,n)):gt(t)?Al(t,n):wr(Il(ot(e)))}function jl(e){var t=Qt(Bn(e)),n=["absolute","fixed"].indexOf(Ye(e).position)>=0,r=n&&Ie(e)?dn(e):e;return gt(r)?t.filter(function(o){return gt(o)&&Li(o,r)&&Ue(o)!=="body"}):[]}function Dl(e,t,n,r){var o=t==="clippingParents"?jl(e):[].concat(t),i=[].concat(o,[n]),a=i[0],l=i.reduce(function(c,u){var d=Do(e,u,r);return c.top=ft(d.top,c.top),c.right=$n(d.right,c.right),c.bottom=$n(d.bottom,c.bottom),c.left=ft(d.left,c.left),c},Do(e,a,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function Hi(e){var t=e.reference,n=e.element,r=e.placement,o=r?Ve(r):null,i=r?It(r):null,a=t.x+t.width/2-n.width/2,l=t.y+t.height/2-n.height/2,c;switch(o){case ke:c={x:a,y:t.y-n.height};break;case je:c={x:a,y:t.y+t.height};break;case De:c={x:t.x+t.width,y:l};break;case Se:c={x:t.x-n.width,y:l};break;default:c={x:t.x,y:t.y}}var u=o?Mr(o):null;if(u!=null){var d=u==="y"?"height":"width";switch(i){case $t:c[u]=c[u]-(t[d]/2-n[d]/2);break;case rn:c[u]=c[u]+(t[d]/2-n[d]/2);break}}return c}function on(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=r===void 0?e.placement:r,i=n.strategy,a=i===void 0?e.strategy:i,l=n.boundary,c=l===void 0?rl:l,u=n.rootBoundary,d=u===void 0?ji:u,f=n.elementContext,p=f===void 0?zt:f,b=n.altBoundary,v=b===void 0?!1:b,g=n.padding,m=g===void 0?0:g,E=Vi(typeof m!="number"?m:zi(m,un)),$=p===zt?ol:zt,y=e.rects.popper,x=e.elements[v?$:p],h=Dl(gt(x)?x:x.contextElement||ot(e.elements.popper),c,d,a),S=_t(e.elements.reference),P=Hi({reference:S,element:y,strategy:"absolute",placement:o}),A=wr(Object.assign({},y,P)),I=p===zt?A:S,j={top:h.top-I.top+E.top,bottom:I.bottom-h.bottom+E.bottom,left:h.left-I.left+E.left,right:I.right-h.right+E.right},B=e.modifiersData.offset;if(p===zt&&B){var z=B[o];Object.keys(j).forEach(function(W){var L=[De,je].indexOf(W)>=0?1:-1,_=[ke,je].indexOf(W)>=0?"y":"x";j[W]+=z[_]*L})}return j}function Bl(e,t){t===void 0&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,u=c===void 0?Di:c,d=It(r),f=d?l?_o:_o.filter(function(v){return It(v)===d}):un,p=f.filter(function(v){return u.indexOf(v)>=0});p.length===0&&(p=f);var b=p.reduce(function(v,g){return v[g]=on(e,{placement:g,boundary:o,rootBoundary:i,padding:a})[Ve(g)],v},{});return Object.keys(b).sort(function(v,g){return b[v]-b[g]})}function Ll(e){if(Ve(e)===Rr)return[];var t=Tn(e);return[jo(e),t,jo(t)]}function Fl(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!0:a,c=n.fallbackPlacements,u=n.padding,d=n.boundary,f=n.rootBoundary,p=n.altBoundary,b=n.flipVariations,v=b===void 0?!0:b,g=n.allowedAutoPlacements,m=t.options.placement,E=Ve(m),$=E===m,y=c||($||!v?[Tn(m)]:Ll(m)),x=[m].concat(y).reduce(function(F,U){return F.concat(Ve(U)===Rr?Bl(t,{placement:U,boundary:d,rootBoundary:f,padding:u,flipVariations:v,allowedAutoPlacements:g}):U)},[]),h=t.rects.reference,S=t.rects.popper,P=new Map,A=!0,I=x[0],j=0;j<x.length;j++){var B=x[j],z=Ve(B),W=It(B)===$t,L=[ke,je].indexOf(z)>=0,_=L?"width":"height",R=on(t,{placement:B,boundary:d,rootBoundary:f,altBoundary:p,padding:u}),D=L?W?De:Se:W?je:ke;h[_]>S[_]&&(D=Tn(D));var Q=Tn(D),Z=[];if(i&&Z.push(R[z]<=0),l&&Z.push(R[D]<=0,R[Q]<=0),Z.every(function(F){return F})){I=B,A=!1;break}P.set(B,Z)}if(A)for(var O=v?3:1,M=function(U){var q=x.find(function(G){var H=P.get(G);if(H)return H.slice(0,U).every(function(K){return K})});if(q)return I=q,"break"},V=O;V>0;V--){var X=M(V);if(X==="break")break}t.placement!==I&&(t.modifiersData[r]._skip=!0,t.placement=I,t.reset=!0)}}const Vl={name:"flip",enabled:!0,phase:"main",fn:Fl,requiresIfExists:["offset"],data:{_skip:!1}};function Bo(e,t,n){return n===void 0&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function Lo(e){return[ke,De,je,Se].some(function(t){return e[t]>=0})}function zl(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=on(t,{elementContext:"reference"}),l=on(t,{altBoundary:!0}),c=Bo(a,r),u=Bo(l,o,i),d=Lo(c),f=Lo(u);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:u,isReferenceHidden:d,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":f})}const Ul={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:zl};function Hl(e,t,n){var r=Ve(e),o=[Se,ke].indexOf(r)>=0?-1:1,i=typeof n=="function"?n(Object.assign({},t,{placement:e})):n,a=i[0],l=i[1];return a=a||0,l=(l||0)*o,[Se,De].indexOf(r)>=0?{x:l,y:a}:{x:a,y:l}}function ql(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=o===void 0?[0,0]:o,a=Di.reduce(function(d,f){return d[f]=Hl(f,t.rects,i),d},{}),l=a[t.placement],c=l.x,u=l.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=u),t.modifiersData[r]=a}const Wl={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:ql};function Gl(e){var t=e.state,n=e.name;t.modifiersData[n]=Hi({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const Xl={name:"popperOffsets",enabled:!0,phase:"read",fn:Gl,data:{}};function Kl(e){return e==="x"?"y":"x"}function Yl(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=o===void 0?!0:o,a=n.altAxis,l=a===void 0?!1:a,c=n.boundary,u=n.rootBoundary,d=n.altBoundary,f=n.padding,p=n.tether,b=p===void 0?!0:p,v=n.tetherOffset,g=v===void 0?0:v,m=on(t,{boundary:c,rootBoundary:u,padding:f,altBoundary:d}),E=Ve(t.placement),$=It(t.placement),y=!$,x=Mr(E),h=Kl(x),S=t.modifiersData.popperOffsets,P=t.rects.reference,A=t.rects.popper,I=typeof g=="function"?g(Object.assign({},t.rects,{placement:t.placement})):g,j=typeof I=="number"?{mainAxis:I,altAxis:I}:Object.assign({mainAxis:0,altAxis:0},I),B=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,z={x:0,y:0};if(S){if(i){var W,L=x==="y"?ke:Se,_=x==="y"?je:De,R=x==="y"?"height":"width",D=S[x],Q=D+m[L],Z=D-m[_],O=b?-A[R]/2:0,M=$===$t?P[R]:A[R],V=$===$t?-A[R]:-P[R],X=t.elements.arrow,F=b&&X?$r(X):{width:0,height:0},U=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Fi(),q=U[L],G=U[_],H=Zt(0,P[R],F[R]),K=y?P[R]/2-O-H-q-j.mainAxis:M-H-q-j.mainAxis,Y=y?-P[R]/2+O+H+G+j.mainAxis:V+H+G+j.mainAxis,re=t.elements.arrow&&dn(t.elements.arrow),N=re?x==="y"?re.clientTop||0:re.clientLeft||0:0,J=(W=B==null?void 0:B[x])!=null?W:0,C=D+K-J-N,oe=D+Y-J,be=Zt(b?$n(Q,C):Q,D,b?ft(Z,oe):Z);S[x]=be,z[x]=be-D}if(l){var we,me=x==="x"?ke:Se,st=x==="x"?je:De,Te=S[h],qe=h==="y"?"height":"width",Pe=Te+m[me],We=Te-m[st],ve=[ke,Se].indexOf(E)!==-1,yt=(we=B==null?void 0:B[h])!=null?we:0,at=ve?Pe:Te-P[qe]-A[qe]-yt+j.altAxis,Dt=ve?Te+P[qe]+A[qe]-yt-j.altAxis:We,mn=b&&ve?xl(at,Te,Dt):Zt(b?at:Pe,Te,b?Dt:We);S[h]=mn,z[h]=mn-Te}t.modifiersData[r]=z}}const Jl={name:"preventOverflow",enabled:!0,phase:"main",fn:Yl,requiresIfExists:["offset"]};function Zl(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function Ql(e){return e===$e(e)||!Ie(e)?_r(e):Zl(e)}function ec(e){var t=e.getBoundingClientRect(),n=Mt(t.width)/e.offsetWidth||1,r=Mt(t.height)/e.offsetHeight||1;return n!==1||r!==1}function tc(e,t,n){n===void 0&&(n=!1);var r=Ie(t),o=Ie(t)&&ec(t),i=ot(t),a=_t(e,o,n),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&((Ue(t)!=="body"||Ar(i))&&(l=Ql(t)),Ie(t)?(c=_t(t,!0),c.x+=t.clientLeft,c.y+=t.clientTop):i&&(c.x=Ir(i))),{x:a.left+l.scrollLeft-c.x,y:a.top+l.scrollTop-c.y,width:a.width,height:a.height}}function nc(e){var t=new Map,n=new Set,r=[];e.forEach(function(i){t.set(i.name,i)});function o(i){n.add(i.name);var a=[].concat(i.requires||[],i.requiresIfExists||[]);a.forEach(function(l){if(!n.has(l)){var c=t.get(l);c&&o(c)}}),r.push(i)}return e.forEach(function(i){n.has(i.name)||o(i)}),r}function rc(e){var t=nc(e);return hl.reduce(function(n,r){return n.concat(t.filter(function(o){return o.phase===r}))},[])}function oc(e){var t;return function(){return t||(t=new Promise(function(n){Promise.resolve().then(function(){t=void 0,n(e())})})),t}}function ic(e){var t=e.reduce(function(n,r){var o=n[r.name];return n[r.name]=o?Object.assign({},o,r,{options:Object.assign({},o.options,r.options),data:Object.assign({},o.data,r.data)}):r,n},{});return Object.keys(t).map(function(n){return t[n]})}var Fo={placement:"bottom",modifiers:[],strategy:"absolute"};function Vo(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function sc(e){e===void 0&&(e={});var t=e,n=t.defaultModifiers,r=n===void 0?[]:n,o=t.defaultOptions,i=o===void 0?Fo:o;return function(l,c,u){u===void 0&&(u=i);var d={placement:"bottom",orderedModifiers:[],options:Object.assign({},Fo,i),modifiersData:{},elements:{reference:l,popper:c},attributes:{},styles:{}},f=[],p=!1,b={state:d,setOptions:function(E){var $=typeof E=="function"?E(d.options):E;g(),d.options=Object.assign({},i,d.options,$),d.scrollParents={reference:gt(l)?Qt(l):l.contextElement?Qt(l.contextElement):[],popper:Qt(c)};var y=rc(ic([].concat(r,d.options.modifiers)));return d.orderedModifiers=y.filter(function(x){return x.enabled}),v(),b.update()},forceUpdate:function(){if(!p){var E=d.elements,$=E.reference,y=E.popper;if(Vo($,y)){d.rects={reference:tc($,dn(y),d.options.strategy==="fixed"),popper:$r(y)},d.reset=!1,d.placement=d.options.placement,d.orderedModifiers.forEach(function(j){return d.modifiersData[j.name]=Object.assign({},j.data)});for(var x=0;x<d.orderedModifiers.length;x++){if(d.reset===!0){d.reset=!1,x=-1;continue}var h=d.orderedModifiers[x],S=h.fn,P=h.options,A=P===void 0?{}:P,I=h.name;typeof S=="function"&&(d=S({state:d,options:A,name:I,instance:b})||d)}}}},update:oc(function(){return new Promise(function(m){b.forceUpdate(),m(d)})}),destroy:function(){g(),p=!0}};if(!Vo(l,c))return b;b.setOptions(u).then(function(m){!p&&u.onFirstUpdate&&u.onFirstUpdate(m)});function v(){d.orderedModifiers.forEach(function(m){var E=m.name,$=m.options,y=$===void 0?{}:$,x=m.effect;if(typeof x=="function"){var h=x({state:d,name:E,instance:b,options:y}),S=function(){};f.push(h||S)}})}function g(){f.forEach(function(m){return m()}),f=[]}return b}}var ac=[Nl,Xl,Cl,bl,Wl,Vl,Jl,Ol,Ul],lc=sc({defaultModifiers:ac});const qi="Popper";function cc(e){return Ai(qi,e)}Fa(qi,["root"]);const uc=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],dc=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function pc(e,t){if(t==="ltr")return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}function Mn(e){return typeof e=="function"?e():e}function Ln(e){return e.nodeType!==void 0}function fc(e){return!Ln(e)}const hc=()=>Ze({root:["root"]},Ia(cc)),mc={},gc=w.forwardRef(function(t,n){var r;const{anchorEl:o,children:i,direction:a,disablePortal:l,modifiers:c,open:u,placement:d,popperOptions:f,popperRef:p,slotProps:b={},slots:v={},TransitionProps:g}=t,m=ue(t,uc),E=w.useRef(null),$=Ae(E,n),y=w.useRef(null),x=Ae(y,p),h=w.useRef(x);ht(()=>{h.current=x},[x]),w.useImperativeHandle(p,()=>y.current,[]);const S=pc(d,a),[P,A]=w.useState(S),[I,j]=w.useState(Mn(o));w.useEffect(()=>{y.current&&y.current.forceUpdate()}),w.useEffect(()=>{o&&j(Mn(o))},[o]),ht(()=>{if(!I||!u)return;const _=Q=>{A(Q.placement)};if(process.env.NODE_ENV!=="production"&&I&&Ln(I)&&I.nodeType===1){const Q=I.getBoundingClientRect();process.env.NODE_ENV!=="test"&&Q.top===0&&Q.left===0&&Q.right===0&&Q.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}let R=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:Q})=>{_(Q)}}];c!=null&&(R=R.concat(c)),f&&f.modifiers!=null&&(R=R.concat(f.modifiers));const D=lc(I,E.current,T({placement:S},f,{modifiers:R}));return h.current(D),()=>{D.destroy(),h.current(null)}},[I,l,c,u,f,S]);const B={placement:P};g!==null&&(B.TransitionProps=g);const z=hc(),W=(r=v.root)!=null?r:"div",L=mt({elementType:W,externalSlotProps:b.root,externalForwardedProps:m,additionalProps:{role:"tooltip",ref:$},ownerState:t,className:z.root});return k.jsx(W,T({},L,{children:typeof i=="function"?i(B):i}))}),Wi=w.forwardRef(function(t,n){const{anchorEl:r,children:o,container:i,direction:a="ltr",disablePortal:l=!1,keepMounted:c=!1,modifiers:u,open:d,placement:f="bottom",popperOptions:p=mc,popperRef:b,style:v,transition:g=!1,slotProps:m={},slots:E={}}=t,$=ue(t,dc),[y,x]=w.useState(!0),h=()=>{x(!1)},S=()=>{x(!0)};if(!c&&!d&&(!g||y))return null;let P;if(i)P=i;else if(r){const j=Mn(r);P=j&&Ln(j)?xe(j).body:xe(null).body}const A=!d&&c&&(!g||y)?"none":void 0,I=g?{in:d,onEnter:h,onExited:S}:void 0;return k.jsx(nn,{disablePortal:l,container:P,children:k.jsx(gc,T({anchorEl:r,direction:a,disablePortal:l,modifiers:u,ref:n,open:g?!y:d,placement:f,popperOptions:p,popperRef:b,slotProps:m,slots:E},$,{style:T({position:"fixed",top:0,left:0,display:A},v),TransitionProps:I,children:o}))})});process.env.NODE_ENV!=="production"&&(Wi.propTypes={anchorEl:At(s.oneOfType([Ke,s.object,s.func]),e=>{if(e.open){const t=Mn(e.anchorEl);if(t&&Ln(t)&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else if(!t||typeof t.getBoundingClientRect!="function"||fc(t)&&t.contextElement!=null&&t.contextElement.nodeType!==1)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","It should be an HTML element instance or a virtualElement ","(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`))}return null}),children:s.oneOfType([s.node,s.func]),container:s.oneOfType([Ke,s.func]),direction:s.oneOf(["ltr","rtl"]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:Cr,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),transition:s.bool});const bc=["values","unit","step"],vc=e=>{const t=Object.keys(e).map(n=>({key:n,val:e[n]}))||[];return t.sort((n,r)=>n.val-r.val),t.reduce((n,r)=>T({},n,{[r.key]:r.val}),{})};function yc(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:r=5}=e,o=ue(e,bc),i=vc(t),a=Object.keys(i);function l(p){return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n})`}function c(p){return`@media (max-width:${(typeof t[p]=="number"?t[p]:p)-r/100}${n})`}function u(p,b){const v=a.indexOf(b);return`@media (min-width:${typeof t[p]=="number"?t[p]:p}${n}) and (max-width:${(v!==-1&&typeof t[a[v]]=="number"?t[a[v]]:b)-r/100}${n})`}function d(p){return a.indexOf(p)+1<a.length?u(p,a[a.indexOf(p)+1]):l(p)}function f(p){const b=a.indexOf(p);return b===0?l(a[1]):b===a.length-1?c(a[b]):u(p,a[a.indexOf(p)+1]).replace("@media","@media not all and")}return T({keys:a,values:i,up:l,down:c,between:u,only:d,not:f,unit:n},o)}const xc={borderRadius:4},Ec=xc,wc=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.string,s.object,s.array]):{},it=wc;function en(e,t){return t?Xe(e,t,{clone:!1}):e}const jr={xs:0,sm:600,md:900,lg:1200,xl:1536},zo={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${jr[e]}px)`};function Je(e,t,n){const r=e.theme||{};if(Array.isArray(t)){const i=r.breakpoints||zo;return t.reduce((a,l,c)=>(a[i.up(i.keys[c])]=n(t[c]),a),{})}if(typeof t=="object"){const i=r.breakpoints||zo;return Object.keys(t).reduce((a,l)=>{if(Object.keys(i.values||jr).indexOf(l)!==-1){const c=i.up(l);a[c]=n(t[l],l)}else{const c=l;a[c]=t[c]}return a},{})}return n(t)}function Tc(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function Oc(e,t){return e.reduce((n,r)=>{const o=n[r];return(!o||Object.keys(o).length===0)&&delete n[r],n},t)}function Fn(e,t,n=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&n){const r=`vars.${t}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return t.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function _n(e,t,n,r=n){let o;return typeof e=="function"?o=e(n):Array.isArray(e)?o=e[n]||r:o=Fn(e,n)||r,t&&(o=t(o,r,e)),o}function ge(e){const{prop:t,cssProperty:n=e.prop,themeKey:r,transform:o}=e,i=a=>{if(a[t]==null)return null;const l=a[t],c=a.theme,u=Fn(c,r)||{};return Je(a,l,f=>{let p=_n(u,o,f);return f===p&&typeof f=="string"&&(p=_n(u,o,`${t}${f==="default"?"":ze(f)}`,f)),n===!1?p:{[n]:p}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[t]:it}:{},i.filterProps=[t],i}function kc(e){const t={};return n=>(t[n]===void 0&&(t[n]=e(n)),t[n])}const Sc={m:"margin",p:"padding"},Pc={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Uo={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Cc=kc(e=>{if(e.length>2)if(Uo[e])e=Uo[e];else return[e];const[t,n]=e.split(""),r=Sc[t],o=Pc[n]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),Vn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],zn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],Rc=[...Vn,...zn];function pn(e,t,n,r){var o;const i=(o=Fn(e,t,!1))!=null?o:n;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Gi(e){return pn(e,"spacing",8,"spacing")}function fn(e,t){if(typeof t=="string"||t==null)return t;const n=Math.abs(t),r=e(n);return t>=0?r:typeof r=="number"?-r:`-${r}`}function Nc(e,t){return n=>e.reduce((r,o)=>(r[o]=fn(t,n),r),{})}function $c(e,t,n,r){if(t.indexOf(n)===-1)return null;const o=Cc(n),i=Nc(o,r),a=e[n];return Je(e,a,i)}function Xi(e,t){const n=Gi(e.theme);return Object.keys(e).map(r=>$c(e,t,r,n)).reduce(en,{})}function fe(e){return Xi(e,Vn)}fe.propTypes=process.env.NODE_ENV!=="production"?Vn.reduce((e,t)=>(e[t]=it,e),{}):{};fe.filterProps=Vn;function he(e){return Xi(e,zn)}he.propTypes=process.env.NODE_ENV!=="production"?zn.reduce((e,t)=>(e[t]=it,e),{}):{};he.filterProps=zn;process.env.NODE_ENV!=="production"&&Rc.reduce((e,t)=>(e[t]=it,e),{});function Mc(e=8){if(e.mui)return e;const t=Gi({spacing:e}),n=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const a=t(i);return typeof a=="number"?`${a}px`:a}).join(" "));return n.mui=!0,n}function Un(...e){const t=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),n=r=>Object.keys(r).reduce((o,i)=>t[i]?en(o,t[i](r)):o,{});return n.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},n.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),n}function _e(e){return typeof e!="number"?e:`${e}px solid`}function Be(e,t){return ge({prop:e,themeKey:"borders",transform:t})}const _c=Be("border",_e),Ic=Be("borderTop",_e),Ac=Be("borderRight",_e),jc=Be("borderBottom",_e),Dc=Be("borderLeft",_e),Bc=Be("borderColor"),Lc=Be("borderTopColor"),Fc=Be("borderRightColor"),Vc=Be("borderBottomColor"),zc=Be("borderLeftColor"),Uc=Be("outline",_e),Hc=Be("outlineColor"),Hn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=pn(e.theme,"shape.borderRadius",4,"borderRadius"),n=r=>({borderRadius:fn(t,r)});return Je(e,e.borderRadius,n)}return null};Hn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:it}:{};Hn.filterProps=["borderRadius"];Un(_c,Ic,Ac,jc,Dc,Bc,Lc,Fc,Vc,zc,Hn,Uc,Hc);const qn=e=>{if(e.gap!==void 0&&e.gap!==null){const t=pn(e.theme,"spacing",8,"gap"),n=r=>({gap:fn(t,r)});return Je(e,e.gap,n)}return null};qn.propTypes=process.env.NODE_ENV!=="production"?{gap:it}:{};qn.filterProps=["gap"];const Wn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=pn(e.theme,"spacing",8,"columnGap"),n=r=>({columnGap:fn(t,r)});return Je(e,e.columnGap,n)}return null};Wn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:it}:{};Wn.filterProps=["columnGap"];const Gn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=pn(e.theme,"spacing",8,"rowGap"),n=r=>({rowGap:fn(t,r)});return Je(e,e.rowGap,n)}return null};Gn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:it}:{};Gn.filterProps=["rowGap"];const qc=ge({prop:"gridColumn"}),Wc=ge({prop:"gridRow"}),Gc=ge({prop:"gridAutoFlow"}),Xc=ge({prop:"gridAutoColumns"}),Kc=ge({prop:"gridAutoRows"}),Yc=ge({prop:"gridTemplateColumns"}),Jc=ge({prop:"gridTemplateRows"}),Zc=ge({prop:"gridTemplateAreas"}),Qc=ge({prop:"gridArea"});Un(qn,Wn,Gn,qc,Wc,Gc,Xc,Kc,Yc,Jc,Zc,Qc);function Ct(e,t){return t==="grey"?t:e}const eu=ge({prop:"color",themeKey:"palette",transform:Ct}),tu=ge({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Ct}),nu=ge({prop:"backgroundColor",themeKey:"palette",transform:Ct});Un(eu,tu,nu);function Ne(e){return e<=1&&e!==0?`${e*100}%`:e}const ru=ge({prop:"width",transform:Ne}),Dr=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=n=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[n])||jr[n];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:Ne(n)}};return Je(e,e.maxWidth,t)}return null};Dr.filterProps=["maxWidth"];const ou=ge({prop:"minWidth",transform:Ne}),iu=ge({prop:"height",transform:Ne}),su=ge({prop:"maxHeight",transform:Ne}),au=ge({prop:"minHeight",transform:Ne});ge({prop:"size",cssProperty:"width",transform:Ne});ge({prop:"size",cssProperty:"height",transform:Ne});const lu=ge({prop:"boxSizing"});Un(ru,Dr,ou,iu,su,au,lu);const cu={border:{themeKey:"borders",transform:_e},borderTop:{themeKey:"borders",transform:_e},borderRight:{themeKey:"borders",transform:_e},borderBottom:{themeKey:"borders",transform:_e},borderLeft:{themeKey:"borders",transform:_e},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:_e},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Hn},color:{themeKey:"palette",transform:Ct},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Ct},backgroundColor:{themeKey:"palette",transform:Ct},p:{style:he},pt:{style:he},pr:{style:he},pb:{style:he},pl:{style:he},px:{style:he},py:{style:he},padding:{style:he},paddingTop:{style:he},paddingRight:{style:he},paddingBottom:{style:he},paddingLeft:{style:he},paddingX:{style:he},paddingY:{style:he},paddingInline:{style:he},paddingInlineStart:{style:he},paddingInlineEnd:{style:he},paddingBlock:{style:he},paddingBlockStart:{style:he},paddingBlockEnd:{style:he},m:{style:fe},mt:{style:fe},mr:{style:fe},mb:{style:fe},ml:{style:fe},mx:{style:fe},my:{style:fe},margin:{style:fe},marginTop:{style:fe},marginRight:{style:fe},marginBottom:{style:fe},marginLeft:{style:fe},marginX:{style:fe},marginY:{style:fe},marginInline:{style:fe},marginInlineStart:{style:fe},marginInlineEnd:{style:fe},marginBlock:{style:fe},marginBlockStart:{style:fe},marginBlockEnd:{style:fe},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:qn},rowGap:{style:Gn},columnGap:{style:Wn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ne},maxWidth:{style:Dr},minWidth:{transform:Ne},height:{transform:Ne},maxHeight:{transform:Ne},minHeight:{transform:Ne},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},Br=cu;function uu(...e){const t=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),n=new Set(t);return e.every(r=>n.size===Object.keys(r).length)}function du(e,t){return typeof e=="function"?e(t):e}function pu(){function e(n,r,o,i){const a={[n]:r,theme:o},l=i[n];if(!l)return{[n]:r};const{cssProperty:c=n,themeKey:u,transform:d,style:f}=l;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[n]:r};const p=Fn(o,u)||{};return f?f(a):Je(a,r,v=>{let g=_n(p,d,v);return v===g&&typeof v=="string"&&(g=_n(p,d,`${n}${v==="default"?"":ze(v)}`,v)),c===!1?g:{[c]:g}})}function t(n){var r;const{sx:o,theme:i={}}=n||{};if(!o)return null;const a=(r=i.unstable_sxConfig)!=null?r:Br;function l(c){let u=c;if(typeof c=="function")u=c(i);else if(typeof c!="object")return c;if(!u)return null;const d=Tc(i.breakpoints),f=Object.keys(d);let p=d;return Object.keys(u).forEach(b=>{const v=du(u[b],i);if(v!=null)if(typeof v=="object")if(a[b])p=en(p,e(b,v,i,a));else{const g=Je({theme:i},v,m=>({[b]:m}));uu(g,v)?p[b]=t({sx:v,theme:i}):p=en(p,g)}else p=en(p,e(b,v,i,a))}),Oc(f,p)}return Array.isArray(o)?o.map(l):l(o)}return t}const Ki=pu();Ki.filterProps=["sx"];const Lr=Ki;function fu(e,t){const n=this;return n.vars&&typeof n.getColorSchemeSelector=="function"?{[n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:n.palette.mode===e?t:{}}const hu=["breakpoints","palette","spacing","shape"];function Fr(e={},...t){const{breakpoints:n={},palette:r={},spacing:o,shape:i={}}=e,a=ue(e,hu),l=yc(n),c=Mc(o);let u=Xe({breakpoints:l,direction:"ltr",components:{},palette:T({mode:"light"},r),spacing:c,shape:T({},Ec,i)},a);return u.applyStyles=fu,u=t.reduce((d,f)=>Xe(d,f),u),u.unstable_sxConfig=T({},Br,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Lr({sx:f,theme:this})},u}function mu(e){return Object.keys(e).length===0}function Yi(e=null){const t=w.useContext(mr.ThemeContext);return!t||mu(t)?e:t}const gu=Fr();function Ji(e=gu){return Yi(e)}const bu=["ownerState"],vu=["variants"],yu=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function xu(e){return Object.keys(e).length===0}function Eu(e){return typeof e=="string"&&e.charCodeAt(0)>96}function On(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const wu=Fr(),Ho=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function xn({defaultTheme:e,theme:t,themeId:n}){return xu(t)?e:t[n]||t}function Tu(e){return e?(t,n)=>n[e]:null}function kn(e,t){let{ownerState:n}=t,r=ue(t,bu);const o=typeof e=="function"?e(T({ownerState:n},r)):e;if(Array.isArray(o))return o.flatMap(i=>kn(i,T({ownerState:n},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let l=ue(o,vu);return i.forEach(c=>{let u=!0;typeof c.props=="function"?u=c.props(T({ownerState:n},r,n)):Object.keys(c.props).forEach(d=>{(n==null?void 0:n[d])!==c.props[d]&&r[d]!==c.props[d]&&(u=!1)}),u&&(Array.isArray(l)||(l=[l]),l.push(typeof c.style=="function"?c.style(T({ownerState:n},r,n)):c.style))}),l}return o}function Ou(e={}){const{themeId:t,defaultTheme:n=wu,rootShouldForwardProp:r=On,slotShouldForwardProp:o=On}=e,i=a=>Lr(T({},a,{theme:xn(T({},a,{defaultTheme:n,themeId:t}))}));return i.__mui_systemSx=!0,(a,l={})=>{mr.internal_processStyles(a,h=>h.filter(S=>!(S!=null&&S.__mui_systemSx)));const{name:c,slot:u,skipVariantsResolver:d,skipSx:f,overridesResolver:p=Tu(Ho(u))}=l,b=ue(l,yu),v=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,g=f||!1;let m;process.env.NODE_ENV!=="production"&&c&&(m=`${c}-${Ho(u||"Root")}`);let E=On;u==="Root"||u==="root"?E=r:u?E=o:Eu(a)&&(E=void 0);const $=mr(a,T({shouldForwardProp:E,label:m},b)),y=h=>typeof h=="function"&&h.__emotion_real!==h||pt(h)?S=>kn(h,T({},S,{theme:xn({theme:S.theme,defaultTheme:n,themeId:t})})):h,x=(h,...S)=>{let P=y(h);const A=S?S.map(y):[];c&&p&&A.push(B=>{const z=xn(T({},B,{defaultTheme:n,themeId:t}));if(!z.components||!z.components[c]||!z.components[c].styleOverrides)return null;const W=z.components[c].styleOverrides,L={};return Object.entries(W).forEach(([_,R])=>{L[_]=kn(R,T({},B,{theme:z}))}),p(B,L)}),c&&!v&&A.push(B=>{var z;const W=xn(T({},B,{defaultTheme:n,themeId:t})),L=W==null||(z=W.components)==null||(z=z[c])==null?void 0:z.variants;return kn({variants:L},T({},B,{theme:W}))}),g||A.push(i);const I=A.length-S.length;if(Array.isArray(h)&&I>0){const B=new Array(I).fill("");P=[...h,...B],P.raw=[...h.raw,...B]}const j=$(P,...A);if(process.env.NODE_ENV!=="production"){let B;c&&(B=`${c}${ze(u||"")}`),B===void 0&&(B=`Styled(${la(a)})`),j.displayName=B}return a.muiName&&(j.muiName=a.muiName),j};return $.withConfig&&(x.withConfig=$.withConfig),x}}function ku(e){const{theme:t,name:n,props:r}=e;return!t||!t.components||!t.components[n]||!t.components[n].defaultProps?r:Ri(t.components[n].defaultProps,r)}function Su({props:e,name:t,defaultTheme:n,themeId:r}){let o=Ji(n);return r&&(o=o[r]||o),ku({theme:o,name:t,props:e})}function Vr(e,t=0,n=1){return process.env.NODE_ENV!=="production"&&(e<t||e>n)&&console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`),$a(e,t,n)}function Pu(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&n[0].length===1&&(n=n.map(r=>r+r)),n?`rgb${n.length===4?"a":""}(${n.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function bt(e){if(e.type)return e;if(e.charAt(0)==="#")return bt(Pu(e));const t=e.indexOf("("),n=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(n)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:Rt(9,e));let r=e.substring(t+1,e.length-1),o;if(n==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:Rt(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:n,values:r,colorSpace:o}}function Xn(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${n} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function Cu(e){e=bt(e);const{values:t}=e,n=t[0],r=t[1]/100,o=t[2]/100,i=r*Math.min(o,1-o),a=(u,d=(u+n/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let l="rgb";const c=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(l+="a",c.push(t[3])),Xn({type:l,values:c})}function qo(e){e=bt(e);let t=e.type==="hsl"||e.type==="hsla"?bt(Cu(e)).values:e.values;return t=t.map(n=>(e.type!=="color"&&(n/=255),n<=.03928?n/12.92:((n+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function Wo(e,t){const n=qo(e),r=qo(t);return(Math.max(n,r)+.05)/(Math.min(n,r)+.05)}function In(e,t){return e=bt(e),t=Vr(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,Xn(e)}function Ru(e,t){if(e=bt(e),t=Vr(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]*=1-t;return Xn(e)}function Nu(e,t){if(e=bt(e),t=Vr(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(e.type.indexOf("color")!==-1)for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return Xn(e)}function $u(e,t){return T({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}const Mu={black:"#000",white:"#fff"},sn=Mu,_u={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Iu=_u,Au={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},xt=Au,ju={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Et=ju,Du={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},Ut=Du,Bu={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},wt=Bu,Lu={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Tt=Lu,Fu={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Ot=Fu,Vu=["mode","contrastThreshold","tonalOffset"],Go={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:sn.white,default:sn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},lr={text:{primary:sn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:sn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Xo(e,t,n,r){const o=r.light||r,i=r.dark||r*1.5;e[t]||(e.hasOwnProperty(n)?e[t]=e[n]:t==="light"?e.light=Nu(e.main,o):t==="dark"&&(e.dark=Ru(e.main,i)))}function zu(e="light"){return e==="dark"?{main:wt[200],light:wt[50],dark:wt[400]}:{main:wt[700],light:wt[400],dark:wt[800]}}function Uu(e="light"){return e==="dark"?{main:xt[200],light:xt[50],dark:xt[400]}:{main:xt[500],light:xt[300],dark:xt[700]}}function Hu(e="light"){return e==="dark"?{main:Et[500],light:Et[300],dark:Et[700]}:{main:Et[700],light:Et[400],dark:Et[800]}}function qu(e="light"){return e==="dark"?{main:Tt[400],light:Tt[300],dark:Tt[700]}:{main:Tt[700],light:Tt[500],dark:Tt[900]}}function Wu(e="light"){return e==="dark"?{main:Ot[400],light:Ot[300],dark:Ot[700]}:{main:Ot[800],light:Ot[500],dark:Ot[900]}}function Gu(e="light"){return e==="dark"?{main:Ut[400],light:Ut[300],dark:Ut[700]}:{main:"#ed6c02",light:Ut[500],dark:Ut[900]}}function Xu(e){const{mode:t="light",contrastThreshold:n=3,tonalOffset:r=.2}=e,o=ue(e,Vu),i=e.primary||zu(t),a=e.secondary||Uu(t),l=e.error||Hu(t),c=e.info||qu(t),u=e.success||Wu(t),d=e.warning||Gu(t);function f(g){const m=Wo(g,lr.text.primary)>=n?lr.text.primary:Go.text.primary;if(process.env.NODE_ENV!=="production"){const E=Wo(g,m);E<3&&console.error([`MUI: The contrast ratio of ${E}:1 for ${m} on ${g}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return m}const p=({color:g,name:m,mainShade:E=500,lightShade:$=300,darkShade:y=700})=>{if(g=T({},g),!g.main&&g[E]&&(g.main=g[E]),!g.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.`:Rt(11,m?` (${m})`:"",E));if(typeof g.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${m?` (${m})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:Rt(12,m?` (${m})`:"",JSON.stringify(g.main)));return Xo(g,"light",$,r),Xo(g,"dark",y,r),g.contrastText||(g.contrastText=f(g.main)),g},b={dark:lr,light:Go};return process.env.NODE_ENV!=="production"&&(b[t]||console.error(`MUI: The palette mode \`${t}\` is not supported.`)),Xe(T({common:T({},sn),mode:t,primary:p({color:i,name:"primary"}),secondary:p({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:l,name:"error"}),warning:p({color:d,name:"warning"}),info:p({color:c,name:"info"}),success:p({color:u,name:"success"}),grey:Iu,contrastThreshold:n,getContrastText:f,augmentColor:p,tonalOffset:r},b[t]),o)}const Ku=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Yu(e){return Math.round(e*1e5)/1e5}const Ko={textTransform:"uppercase"},Yo='"Roboto", "Helvetica", "Arial", sans-serif';function Ju(e,t){const n=typeof t=="function"?t(e):t,{fontFamily:r=Yo,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:l=500,fontWeightBold:c=700,htmlFontSize:u=16,allVariants:d,pxToRem:f}=n,p=ue(n,Ku);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,v=f||(E=>`${E/u*b}rem`),g=(E,$,y,x,h)=>T({fontFamily:r,fontWeight:E,fontSize:v($),lineHeight:y},r===Yo?{letterSpacing:`${Yu(x/$)}em`}:{},h,d),m={h1:g(i,96,1.167,-1.5),h2:g(i,60,1.2,-.5),h3:g(a,48,1.167,0),h4:g(a,34,1.235,.25),h5:g(a,24,1.334,0),h6:g(l,20,1.6,.15),subtitle1:g(a,16,1.75,.15),subtitle2:g(l,14,1.57,.1),body1:g(a,16,1.5,.15),body2:g(a,14,1.43,.15),button:g(l,14,1.75,.4,Ko),caption:g(a,12,1.66,.4),overline:g(a,12,2.66,1,Ko),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Xe(T({htmlFontSize:u,pxToRem:v,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:l,fontWeightBold:c},m),p,{clone:!1})}const Zu=.2,Qu=.14,ed=.12;function pe(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Zu})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Qu})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${ed})`].join(",")}const td=["none",pe(0,2,1,-1,0,1,1,0,0,1,3,0),pe(0,3,1,-2,0,2,2,0,0,1,5,0),pe(0,3,3,-2,0,3,4,0,0,1,8,0),pe(0,2,4,-1,0,4,5,0,0,1,10,0),pe(0,3,5,-1,0,5,8,0,0,1,14,0),pe(0,3,5,-1,0,6,10,0,0,1,18,0),pe(0,4,5,-2,0,7,10,1,0,2,16,1),pe(0,5,5,-3,0,8,10,1,0,3,14,2),pe(0,5,6,-3,0,9,12,1,0,3,16,2),pe(0,6,6,-3,0,10,14,1,0,4,18,3),pe(0,6,7,-4,0,11,15,1,0,4,20,3),pe(0,7,8,-4,0,12,17,2,0,5,22,4),pe(0,7,8,-4,0,13,19,2,0,5,24,4),pe(0,7,9,-4,0,14,21,2,0,5,26,4),pe(0,8,9,-5,0,15,22,2,0,6,28,5),pe(0,8,10,-5,0,16,24,2,0,6,30,5),pe(0,8,11,-5,0,17,26,2,0,6,32,5),pe(0,9,11,-5,0,18,28,2,0,7,34,6),pe(0,9,12,-6,0,19,29,2,0,7,36,6),pe(0,10,13,-6,0,20,31,3,0,8,38,7),pe(0,10,13,-6,0,21,33,3,0,8,40,7),pe(0,10,14,-6,0,22,35,3,0,8,42,7),pe(0,11,14,-7,0,23,36,3,0,9,44,8),pe(0,11,15,-7,0,24,38,3,0,9,46,8)],nd=td,rd=["duration","easing","delay"],od={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},id={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Jo(e){return`${Math.round(e)}ms`}function sd(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function ad(e){const t=T({},od,e.easing),n=T({},id,e.duration);return T({getAutoHeightDuration:sd,create:(o=["all"],i={})=>{const{duration:a=n.standard,easing:l=t.easeInOut,delay:c=0}=i,u=ue(i,rd);if(process.env.NODE_ENV!=="production"){const d=p=>typeof p=="string",f=p=>!isNaN(parseFloat(p));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(a)&&!d(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),d(l)||console.error('MUI: Argument "easing" must be a string.'),!f(c)&&!d(c)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof a=="string"?a:Jo(a)} ${l} ${typeof c=="string"?c:Jo(c)}`).join(",")}},e,{easing:t,duration:n})}const ld={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},cd=ld,ud=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function dd(e={},...t){const{mixins:n={},palette:r={},transitions:o={},typography:i={}}=e,a=ue(e,ud);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":Rt(18));const l=Xu(r),c=Fr(e);let u=Xe(c,{mixins:$u(c.breakpoints,n),palette:l,shadows:nd.slice(),typography:Ju(l,i),transitions:ad(o),zIndex:T({},cd)});if(u=Xe(u,a),u=t.reduce((d,f)=>Xe(d,f),u),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(p,b)=>{let v;for(v in p){const g=p[v];if(d.indexOf(v)!==-1&&Object.keys(g).length>0){if(process.env.NODE_ENV!=="production"){const m=He("",v);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`,"You can not override it like this: ",JSON.stringify(p,null,2),"",`Instead, you need to use the '&.${m}' syntax:`,JSON.stringify({root:{[`&.${m}`]:g}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}p[v]={}}}};Object.keys(u.components).forEach(p=>{const b=u.components[p].styleOverrides;b&&p.indexOf("Mui")===0&&f(b,p)})}return u.unstable_sxConfig=T({},Br,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(f){return Lr({sx:f,theme:this})},u}const pd=dd(),zr=pd,Ur="$$material",Zi=e=>On(e)&&e!=="classes",fd=Ou({themeId:Ur,defaultTheme:zr,rootShouldForwardProp:Zi}),Ee=fd;function hn(){const e=Ji(zr);return process.env.NODE_ENV!=="production"&&w.useDebugValue(e),e[Ur]||e}function Qe({props:e,name:t}){return Su({props:e,name:t,defaultTheme:zr,themeId:Ur})}function Tr(e,t){return Tr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Tr(e,t)}function hd(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Tr(e,t)}const Zo={disabled:!1};var md=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.shape({enter:s.number,exit:s.number,appear:s.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&s.oneOfType([s.string,s.shape({enter:s.string,exit:s.string,active:s.string}),s.shape({enter:s.string,enterDone:s.string,enterActive:s.string,exit:s.string,exitDone:s.string,exitActive:s.string})]);const Qi=ne.createContext(null);var gd=function(t){return t.scrollTop},Yt="unmounted",ct="exited",ut="entering",St="entered",Or="exiting",et=function(e){hd(t,e);function t(r,o){var i;i=e.call(this,r,o)||this;var a=o,l=a&&!a.isMounting?r.enter:r.appear,c;return i.appearStatus=null,r.in?l?(c=ct,i.appearStatus=ut):c=St:r.unmountOnExit||r.mountOnEnter?c=Yt:c=ct,i.state={status:c},i.nextCallback=null,i}t.getDerivedStateFromProps=function(o,i){var a=o.in;return a&&i.status===Yt?{status:ct}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(o){var i=null;if(o!==this.props){var a=this.state.status;this.props.in?a!==ut&&a!==St&&(i=ut):(a===ut||a===St)&&(i=Or)}this.updateStatus(!1,i)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var o=this.props.timeout,i,a,l;return i=a=l=o,o!=null&&typeof o!="number"&&(i=o.exit,a=o.enter,l=o.appear!==void 0?o.appear:a),{exit:i,enter:a,appear:l}},n.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===ut){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:Gt.findDOMNode(this);a&&gd(a)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===ct&&this.setState({status:Yt})},n.performEnter=function(o){var i=this,a=this.props.enter,l=this.context?this.context.isMounting:o,c=this.props.nodeRef?[l]:[Gt.findDOMNode(this),l],u=c[0],d=c[1],f=this.getTimeouts(),p=l?f.appear:f.enter;if(!o&&!a||Zo.disabled){this.safeSetState({status:St},function(){i.props.onEntered(u)});return}this.props.onEnter(u,d),this.safeSetState({status:ut},function(){i.props.onEntering(u,d),i.onTransitionEnd(p,function(){i.safeSetState({status:St},function(){i.props.onEntered(u,d)})})})},n.performExit=function(){var o=this,i=this.props.exit,a=this.getTimeouts(),l=this.props.nodeRef?void 0:Gt.findDOMNode(this);if(!i||Zo.disabled){this.safeSetState({status:ct},function(){o.props.onExited(l)});return}this.props.onExit(l),this.safeSetState({status:Or},function(){o.props.onExiting(l),o.onTransitionEnd(a.exit,function(){o.safeSetState({status:ct},function(){o.props.onExited(l)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},n.setNextCallback=function(o){var i=this,a=!0;return this.nextCallback=function(l){a&&(a=!1,i.nextCallback=null,o(l))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},n.onTransitionEnd=function(o,i){this.setNextCallback(i);var a=this.props.nodeRef?this.props.nodeRef.current:Gt.findDOMNode(this),l=o==null&&!this.props.addEndListener;if(!a||l){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var c=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],u=c[0],d=c[1];this.props.addEndListener(u,d)}o!=null&&setTimeout(this.nextCallback,o)},n.render=function(){var o=this.state.status;if(o===Yt)return null;var i=this.props,a=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var l=ue(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return ne.createElement(Qi.Provider,{value:null},typeof a=="function"?a(o,l):ne.cloneElement(ne.Children.only(a),l))},t}(ne.Component);et.contextType=Qi;et.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:s.shape({current:typeof Element>"u"?s.any:function(e,t,n,r,o,i){var a=e[t];return s.instanceOf(a&&"ownerDocument"in a?a.ownerDocument.defaultView.Element:Element)(e,t,n,r,o,i)}}),children:s.oneOfType([s.func.isRequired,s.element.isRequired]).isRequired,in:s.bool,mountOnEnter:s.bool,unmountOnExit:s.bool,appear:s.bool,enter:s.bool,exit:s.bool,timeout:function(t){var n=md;t.addEndListener||(n=n.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return n.apply(void 0,[t].concat(o))},addEndListener:s.func,onEnter:s.func,onEntering:s.func,onEntered:s.func,onExit:s.func,onExiting:s.func,onExited:s.func}:{};function kt(){}et.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:kt,onEntering:kt,onEntered:kt,onExit:kt,onExiting:kt,onExited:kt};et.UNMOUNTED=Yt;et.EXITED=ct;et.ENTERING=ut;et.ENTERED=St;et.EXITING=Or;const es=et,ts=e=>e.scrollTop;function An(e,t){var n,r;const{timeout:o,easing:i,style:a={}}=e;return{duration:(n=a.transitionDuration)!=null?n:typeof o=="number"?o:o[t.mode]||0,easing:(r=a.transitionTimingFunction)!=null?r:typeof i=="object"?i[t.mode]:i,delay:a.transitionDelay}}const bd=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function kr(e){return`scale(${e}, ${e**2})`}const vd={entering:{opacity:1,transform:kr(1)},entered:{opacity:1,transform:"none"}},cr=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Hr=w.forwardRef(function(t,n){const{addEndListener:r,appear:o=!0,children:i,easing:a,in:l,onEnter:c,onEntered:u,onEntering:d,onExit:f,onExited:p,onExiting:b,style:v,timeout:g="auto",TransitionComponent:m=es}=t,E=ue(t,bd),$=Xt(),y=w.useRef(),x=hn(),h=w.useRef(null),S=Ae(h,i.ref,n),P=_=>R=>{if(_){const D=h.current;R===void 0?_(D):_(D,R)}},A=P(d),I=P((_,R)=>{ts(_);const{duration:D,delay:Q,easing:Z}=An({style:v,timeout:g,easing:a},{mode:"enter"});let O;g==="auto"?(O=x.transitions.getAutoHeightDuration(_.clientHeight),y.current=O):O=D,_.style.transition=[x.transitions.create("opacity",{duration:O,delay:Q}),x.transitions.create("transform",{duration:cr?O:O*.666,delay:Q,easing:Z})].join(","),c&&c(_,R)}),j=P(u),B=P(b),z=P(_=>{const{duration:R,delay:D,easing:Q}=An({style:v,timeout:g,easing:a},{mode:"exit"});let Z;g==="auto"?(Z=x.transitions.getAutoHeightDuration(_.clientHeight),y.current=Z):Z=R,_.style.transition=[x.transitions.create("opacity",{duration:Z,delay:D}),x.transitions.create("transform",{duration:cr?Z:Z*.666,delay:cr?D:D||Z*.333,easing:Q})].join(","),_.style.opacity=0,_.style.transform=kr(.75),f&&f(_)}),W=P(p),L=_=>{g==="auto"&&$.start(y.current||0,_),r&&r(h.current,_)};return k.jsx(m,T({appear:o,in:l,nodeRef:h,onEnter:I,onEntered:j,onEntering:A,onExit:z,onExited:W,onExiting:B,addEndListener:L,timeout:g==="auto"?null:g},E,{children:(_,R)=>w.cloneElement(i,T({style:T({opacity:0,transform:kr(.75),visibility:_==="exited"&&!l?"hidden":void 0},vd[_],v,i.props.style),ref:S},R))}))});process.env.NODE_ENV!=="production"&&(Hr.propTypes={addEndListener:s.func,appear:s.bool,children:ln.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});Hr.muiSupportAuto=!0;const Sr=Hr,yd=e=>{let t;return e<1?t=5.11916*e**2:t=4.5*Math.log(e+1)+2,(t/100).toFixed(2)},Qo=yd,xd=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Ed=Ee(Wi,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),ns=w.forwardRef(function(t,n){var r;const o=Yi(),i=Qe({props:t,name:"MuiPopper"}),{anchorEl:a,component:l,components:c,componentsProps:u,container:d,disablePortal:f,keepMounted:p,modifiers:b,open:v,placement:g,popperOptions:m,popperRef:E,transition:$,slots:y,slotProps:x}=i,h=ue(i,xd),S=(r=y==null?void 0:y.root)!=null?r:c==null?void 0:c.Root,P=T({anchorEl:a,container:d,disablePortal:f,keepMounted:p,modifiers:b,open:v,placement:g,popperOptions:m,popperRef:E,transition:$},h);return k.jsx(Ed,T({as:l,direction:o==null?void 0:o.direction,slots:{root:S},slotProps:x??u},P,{ref:n}))});process.env.NODE_ENV!=="production"&&(ns.propTypes={anchorEl:s.oneOfType([Ke,s.object,s.func]),children:s.oneOfType([s.node,s.func]),component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Ke,s.func]),disablePortal:s.bool,keepMounted:s.bool,modifiers:s.arrayOf(s.shape({data:s.object,effect:s.func,enabled:s.bool,fn:s.func,name:s.any,options:s.object,phase:s.oneOf(["afterMain","afterRead","afterWrite","beforeMain","beforeRead","beforeWrite","main","read","write"]),requires:s.arrayOf(s.string),requiresIfExists:s.arrayOf(s.string)})),open:s.bool.isRequired,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),popperOptions:s.shape({modifiers:s.array,onFirstUpdate:s.func,placement:s.oneOf(["auto-end","auto-start","auto","bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),strategy:s.oneOf(["absolute","fixed"])}),popperRef:Cr,slotProps:s.shape({root:s.oneOfType([s.func,s.object])}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transition:s.bool});const rs=ns;function wd(e){return He("MuiTooltip",e)}const Td=rt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),nt=Td,Od=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function kd(e){return Math.round(e*1e5)/1e5}const Sd=e=>{const{classes:t,disableInteractive:n,arrow:r,touch:o,placement:i}=e,a={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch",`tooltipPlacement${ze(i.split("-")[0])}`],arrow:["arrow"]};return Ze(a,wd,t)},Pd=Ee(rs,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})(({theme:e,ownerState:t,open:n})=>T({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!t.disableInteractive&&{pointerEvents:"auto"},!n&&{pointerEvents:"none"},t.arrow&&{[`&[data-popper-placement*="bottom"] .${nt.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${nt.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${nt.arrow}`]:T({},t.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${nt.arrow}`]:T({},t.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),Cd=Ee("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t[`tooltipPlacement${ze(n.placement.split("-")[0])}`]]}})(({theme:e,ownerState:t})=>T({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:In(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},t.arrow&&{position:"relative",margin:0},t.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:`${kd(16/14)}em`,fontWeight:e.typography.fontWeightRegular},{[`.${nt.popper}[data-popper-placement*="left"] &`]:T({transformOrigin:"right center"},t.isRtl?T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"}):T({marginRight:"14px"},t.touch&&{marginRight:"24px"})),[`.${nt.popper}[data-popper-placement*="right"] &`]:T({transformOrigin:"left center"},t.isRtl?T({marginRight:"14px"},t.touch&&{marginRight:"24px"}):T({marginLeft:"14px"},t.touch&&{marginLeft:"24px"})),[`.${nt.popper}[data-popper-placement*="top"] &`]:T({transformOrigin:"center bottom",marginBottom:"14px"},t.touch&&{marginBottom:"24px"}),[`.${nt.popper}[data-popper-placement*="bottom"] &`]:T({transformOrigin:"center top",marginTop:"14px"},t.touch&&{marginTop:"24px"})})),Rd=Ee("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,t)=>t.arrow})(({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:In(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let En=!1;const ei=new cn;let Ht={x:0,y:0};function wn(e,t){return n=>{t&&t(n),e(n)}}const os=w.forwardRef(function(t,n){var r,o,i,a,l,c,u,d,f,p,b,v,g,m,E,$,y,x,h;const S=Qe({props:t,name:"MuiTooltip"}),{arrow:P=!1,children:A,components:I={},componentsProps:j={},describeChild:B=!1,disableFocusListener:z=!1,disableHoverListener:W=!1,disableInteractive:L=!1,disableTouchListener:_=!1,enterDelay:R=100,enterNextDelay:D=0,enterTouchDelay:Q=700,followCursor:Z=!1,id:O,leaveDelay:M=0,leaveTouchDelay:V=1500,onClose:X,onOpen:F,open:U,placement:q="bottom",PopperComponent:G,PopperProps:H={},slotProps:K={},slots:Y={},title:re,TransitionComponent:N=Sr,TransitionProps:J}=S,C=ue(S,Od),oe=w.isValidElement(A)?A:k.jsx("span",{children:A}),be=hn(),we=be.direction==="rtl",[me,st]=w.useState(),[Te,qe]=w.useState(null),Pe=w.useRef(!1),We=L||Z,ve=Xt(),yt=Xt(),at=Xt(),Dt=Xt(),[mn,Zr]=Ti({controlled:U,default:!1,name:"Tooltip",state:"open"});let Ge=mn;if(process.env.NODE_ENV!=="production"){const{current:ee}=w.useRef(U!==void 0);w.useEffect(()=>{me&&me.disabled&&!ee&&re!==""&&me.tagName.toLowerCase()==="button"&&console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.","A disabled element does not fire events.","Tooltip needs to listen to the child element's events to display the title.","","Add a simple wrapper element, such as a `span`."].join(`
`))},[re,me,ee])}const Kn=wi(O),Bt=w.useRef(),gn=tn(()=>{Bt.current!==void 0&&(document.body.style.WebkitUserSelect=Bt.current,Bt.current=void 0),Dt.clear()});w.useEffect(()=>gn,[gn]);const Qr=ee=>{ei.clear(),En=!0,Zr(!0),F&&!Ge&&F(ee)},bn=tn(ee=>{ei.start(800+M,()=>{En=!1}),Zr(!1),X&&Ge&&X(ee),ve.start(be.transitions.duration.shortest,()=>{Pe.current=!1})}),Yn=ee=>{Pe.current&&ee.type!=="touchstart"||(me&&me.removeAttribute("title"),yt.clear(),at.clear(),R||En&&D?yt.start(En?D:R,()=>{Qr(ee)}):Qr(ee))},eo=ee=>{yt.clear(),at.start(M,()=>{bn(ee)})},{isFocusVisibleRef:to,onBlur:Cs,onFocus:Rs,ref:Ns}=Oi(),[,no]=w.useState(!1),ro=ee=>{Cs(ee),to.current===!1&&(no(!1),eo(ee))},oo=ee=>{me||st(ee.currentTarget),Rs(ee),to.current===!0&&(no(!0),Yn(ee))},io=ee=>{Pe.current=!0;const Ce=oe.props;Ce.onTouchStart&&Ce.onTouchStart(ee)},so=Yn,ao=eo,$s=ee=>{io(ee),at.clear(),ve.clear(),gn(),Bt.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Dt.start(Q,()=>{document.body.style.WebkitUserSelect=Bt.current,Yn(ee)})},Ms=ee=>{oe.props.onTouchEnd&&oe.props.onTouchEnd(ee),gn(),at.start(V,()=>{bn(ee)})};w.useEffect(()=>{if(!Ge)return;function ee(Ce){(Ce.key==="Escape"||Ce.key==="Esc")&&bn(Ce)}return document.addEventListener("keydown",ee),()=>{document.removeEventListener("keydown",ee)}},[bn,Ge]);const _s=Ae(oe.ref,Ns,st,n);!re&&re!==0&&(Ge=!1);const Jn=w.useRef(),Is=ee=>{const Ce=oe.props;Ce.onMouseMove&&Ce.onMouseMove(ee),Ht={x:ee.clientX,y:ee.clientY},Jn.current&&Jn.current.update()},Lt={},Zn=typeof re=="string";B?(Lt.title=!Ge&&Zn&&!W?re:null,Lt["aria-describedby"]=Ge?Kn:null):(Lt["aria-label"]=Zn?re:null,Lt["aria-labelledby"]=Ge&&!Zn?Kn:null);const Me=T({},Lt,C,oe.props,{className:ye(C.className,oe.props.className),onTouchStart:io,ref:_s},Z?{onMouseMove:Is}:{});process.env.NODE_ENV!=="production"&&(Me["data-mui-internal-clone-element"]=!0,w.useEffect(()=>{me&&!me.getAttribute("data-mui-internal-clone-element")&&console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.","Please make sure that props are spread on the same element that the ref is applied to."].join(`
`))},[me]));const Ft={};_||(Me.onTouchStart=$s,Me.onTouchEnd=Ms),W||(Me.onMouseOver=wn(so,Me.onMouseOver),Me.onMouseLeave=wn(ao,Me.onMouseLeave),We||(Ft.onMouseOver=so,Ft.onMouseLeave=ao)),z||(Me.onFocus=wn(oo,Me.onFocus),Me.onBlur=wn(ro,Me.onBlur),We||(Ft.onFocus=oo,Ft.onBlur=ro)),process.env.NODE_ENV!=="production"&&oe.props.title&&console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.",`Remove this title prop \`${oe.props.title}\` or the Tooltip component.`].join(`
`));const As=w.useMemo(()=>{var ee;let Ce=[{name:"arrow",enabled:!!Te,options:{element:Te,padding:4}}];return(ee=H.popperOptions)!=null&&ee.modifiers&&(Ce=Ce.concat(H.popperOptions.modifiers)),T({},H.popperOptions,{modifiers:Ce})},[Te,H]),Vt=T({},S,{isRtl:we,arrow:P,disableInteractive:We,placement:q,PopperComponentProp:G,touch:Pe.current}),Qn=Sd(Vt),lo=(r=(o=Y.popper)!=null?o:I.Popper)!=null?r:Pd,co=(i=(a=(l=Y.transition)!=null?l:I.Transition)!=null?a:N)!=null?i:Sr,uo=(c=(u=Y.tooltip)!=null?u:I.Tooltip)!=null?c:Cd,po=(d=(f=Y.arrow)!=null?f:I.Arrow)!=null?d:Rd,js=Kt(lo,T({},H,(p=K.popper)!=null?p:j.popper,{className:ye(Qn.popper,H==null?void 0:H.className,(b=(v=K.popper)!=null?v:j.popper)==null?void 0:b.className)}),Vt),Ds=Kt(co,T({},J,(g=K.transition)!=null?g:j.transition),Vt),Bs=Kt(uo,T({},(m=K.tooltip)!=null?m:j.tooltip,{className:ye(Qn.tooltip,(E=($=K.tooltip)!=null?$:j.tooltip)==null?void 0:E.className)}),Vt),Ls=Kt(po,T({},(y=K.arrow)!=null?y:j.arrow,{className:ye(Qn.arrow,(x=(h=K.arrow)!=null?h:j.arrow)==null?void 0:x.className)}),Vt);return k.jsxs(w.Fragment,{children:[w.cloneElement(oe,Me),k.jsx(lo,T({as:G??rs,placement:q,anchorEl:Z?{getBoundingClientRect:()=>({top:Ht.y,left:Ht.x,right:Ht.x,bottom:Ht.y,width:0,height:0})}:me,popperRef:Jn,open:me?Ge:!1,id:Kn,transition:!0},Ft,js,{popperOptions:As,children:({TransitionProps:ee})=>k.jsx(co,T({timeout:be.transitions.duration.shorter},ee,Ds,{children:k.jsxs(uo,T({},Bs,{children:[re,P?k.jsx(po,T({},Ls,{ref:qe})):null]}))}))}))]})});process.env.NODE_ENV!=="production"&&(os.propTypes={arrow:s.bool,children:ln.isRequired,classes:s.object,className:s.string,components:s.shape({Arrow:s.elementType,Popper:s.elementType,Tooltip:s.elementType,Transition:s.elementType}),componentsProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),describeChild:s.bool,disableFocusListener:s.bool,disableHoverListener:s.bool,disableInteractive:s.bool,disableTouchListener:s.bool,enterDelay:s.number,enterNextDelay:s.number,enterTouchDelay:s.number,followCursor:s.bool,id:s.string,leaveDelay:s.number,leaveTouchDelay:s.number,onClose:s.func,onOpen:s.func,open:s.bool,placement:s.oneOf(["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]),PopperComponent:s.elementType,PopperProps:s.object,slotProps:s.shape({arrow:s.object,popper:s.object,tooltip:s.object,transition:s.object}),slots:s.shape({arrow:s.elementType,popper:s.elementType,tooltip:s.elementType,transition:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),title:s.node,TransitionComponent:s.elementType,TransitionProps:s.object});const Nd=os;var qr={},is={exports:{}};(function(e){function t(n){return n&&n.__esModule?n:{default:n}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(is);var $d=is.exports,ur={};function Md(e){return He("MuiSvgIcon",e)}rt("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const _d=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Id=e=>{const{color:t,fontSize:n,classes:r}=e,o={root:["root",t!=="inherit"&&`color${ze(t)}`,`fontSize${ze(n)}`]};return Ze(o,Md,r)},Ad=Ee("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.color!=="inherit"&&t[`color${ze(n.color)}`],t[`fontSize${ze(n.fontSize)}`]]}})(({theme:e,ownerState:t})=>{var n,r,o,i,a,l,c,u,d,f,p,b,v;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:t.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=e.transitions)==null||(r=n.create)==null?void 0:r.call(n,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((l=e.typography)==null||(c=l.pxToRem)==null?void 0:c.call(l,24))||"1.5rem",large:((u=e.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[t.fontSize],color:(f=(p=(e.vars||e).palette)==null||(p=p[t.color])==null?void 0:p.main)!=null?f:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(v=(e.vars||e).palette)==null||(v=v.action)==null?void 0:v.disabled,inherit:void 0}[t.color]}}),Wr=w.forwardRef(function(t,n){const r=Qe({props:t,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:l="svg",fontSize:c="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:f,viewBox:p="0 0 24 24"}=r,b=ue(r,_d),v=w.isValidElement(o)&&o.type==="svg",g=T({},r,{color:a,component:l,fontSize:c,instanceFontSize:t.fontSize,inheritViewBox:d,viewBox:p,hasSvgAsChild:v}),m={};d||(m.viewBox=p);const E=Id(g);return k.jsxs(Ad,T({as:l,className:ye(E.root,i),focusable:"false",color:u,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:n},m,b,v&&o.props,{ownerState:g,children:[v?o.props.children:o,f?k.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(Wr.propTypes={children:s.node,classes:s.object,className:s.string,color:s.oneOfType([s.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),s.string]),component:s.elementType,fontSize:s.oneOfType([s.oneOf(["inherit","large","medium","small"]),s.string]),htmlColor:s.string,inheritViewBox:s.bool,shapeRendering:s.string,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),titleAccess:s.string,viewBox:s.string});Wr.muiName="SvgIcon";const ti=Wr;function ss(e,t){function n(r,o){return k.jsx(ti,T({"data-testid":`${t}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(n.displayName=`${t}Icon`),n.muiName=ti.muiName,w.memo(w.forwardRef(n))}const jd={configure:e=>{process.env.NODE_ENV!=="production"&&console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.","","You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead","","The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401","","The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)),Ni.configure(e)}},Dd=Object.freeze(Object.defineProperty({__proto__:null,capitalize:ze,createChainedFunction:vr,createSvgIcon:ss,debounce:Ei,deprecatedPropType:ua,isMuiElement:da,ownerDocument:xe,ownerWindow:Nt,requirePropFactory:pa,setRef:Rn,unstable_ClassNameGenerator:jd,unstable_useEnhancedEffect:ht,unstable_useId:wi,unsupportedProp:ma,useControlled:Ti,useEventCallback:tn,useForkRef:Ae,useIsFocusVisible:Oi},Symbol.toStringTag,{value:"Module"})),Bd=Us(Dd);var ni;function Ld(){return ni||(ni=1,function(e){"use client";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.createSvgIcon}});var t=Bd}(ur)),ur}var Fd=$d;Object.defineProperty(qr,"__esModule",{value:!0});var as=qr.default=void 0,Vd=Fd(Ld()),zd=k;as=qr.default=(0,Vd.default)((0,zd.jsx)("path",{d:"m10 17 5-5-5-5z"}),"ArrowRight");function ri(e,t,n){return e?k.jsx(de.ListItemIcon,{className:`papi-menu-icon-${n?"leading":"trailing"}`,children:k.jsx("img",{src:e,alt:`${n?"Leading":"Trailing"} icon for ${t}`})}):void 0}function Gr(e){const{onClick:t,label:n,tooltip:r,allowForLeadingIcons:o=!0,iconPathBefore:i=void 0,iconPathAfter:a=void 0,hasAutoFocus:l=!1,className:c,isDisabled:u=!1,isDense:d=!0,isSubMenuParent:f=!1,hasDisabledGutters:p=!1,hasDivider:b=!1,focusVisibleClassName:v,id:g,children:m}=e,E=k.jsx(de.MenuItem,{sx:{lineHeight:.8},autoFocus:l,className:c,disabled:u,dense:d,disableGutters:p,divider:b,focusVisibleClassName:v,onClick:t,id:g,children:n?k.jsxs(k.Fragment,{children:[ri(i,n,!0),k.jsx(de.ListItemText,{primary:n,inset:!i&&o}),f?k.jsx(de.ListItemIcon,{className:"papi-menu-icon-trailing",children:k.jsx(as,{})}):ri(a,n,!1)]}):m});return r?k.jsx(Nd,{title:r,placement:"right",children:k.jsx("div",{children:E})}):E}function ls(e){return Object.entries(e.groups).map(([n,r])=>({id:n,group:r}))}function Ud(e){const[t,n]=ne.useState(void 0),{parentMenuItem:r,parentItemProps:o,menuDefinition:i}=e,a=u=>{n(u.currentTarget)},l=()=>{n(void 0)},c=()=>{let u=ls(i).filter(d=>"menuItem"in d.group);if(!(r!=null&&r.id))throw new Error("A valid parent menu item is required for submenus.");return u=u.filter(d=>"menuItem"in d.group&&d.group.menuItem===r.id),k.jsx(Xr,{...e,includedGroups:u})};return k.jsxs(k.Fragment,{children:[k.jsx(Gr,{onClick:a,...o,isSubMenuParent:!0}),k.jsx(de.Menu,{anchorEl:t,open:!!t,onClose:l,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const Hd=(e,t)=>t.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function Xr(e){const{menuDefinition:t,onClick:n,commandHandler:r,includedGroups:o}=e,{items:i,allowForLeadingIcons:a}=ne.useMemo(()=>{const d=o&&o.length>0?o:ls(t).filter(v=>!("menuItem"in v.group)),f=Object.values(d).sort((v,g)=>(v.group.order||0)-(g.group.order||0)),p=[];f.forEach(v=>{Hd(v.id,t.items).forEach(g=>p.push({item:g,isLastItemInGroup:!1})),p.length>0&&(p[p.length-1].isLastItemInGroup=!0)}),p.length>0&&(p[p.length-1].isLastItemInGroup=!1);const b=p.some(v=>"iconPathBefore"in v.item&&v.item.iconPathBefore);return{items:p,allowForLeadingIcons:b}},[o,t]),l=({item:d,isLastItemInGroup:f})=>({className:"papi-menu-item",label:d.label,tooltip:d.tooltip,iconPathBefore:"iconPathBefore"in d?d.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in d?d.iconPathAfter:void 0,hasDivider:f,allowForLeadingIcons:a}),[c]=i;if(!c)return k.jsx("div",{});const u=c.item.group;return k.jsx("div",{role:"menu","aria-label":u,children:i.map((d,f)=>{const{item:p}=d,b=l(d);if("command"in p){const v=p.group+f;return k.jsx(Gr,{onClick:g=>{n==null||n(g),r(p)},...b},v)}return k.jsx(Ud,{parentMenuItem:p,parentItemProps:b,...e},u+p.id)})},u)}function qd(e){const{menuDefinition:t,columnId:n}=e;let i=Object.entries(t.groups).map(([a,l])=>({id:a,group:l})).filter(a=>"column"in a.group);return n&&"columns"in t&&t.columns[n]&&(i=i.filter(a=>"column"in a.group&&a.group.column===n)),k.jsx(Xr,{...e,includedGroups:i})}function Wd({commandHandler:e,menuDefinition:t,id:n,metadata:r,onClick:o,className:i}){return k.jsxs(de.Grid,{id:n,item:!0,xs:"auto",role:"menu","aria-label":n,className:`papi-menu-column ${i??""}`,children:[k.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),k.jsx(de.List,{id:n,dense:!0,className:i??"",children:k.jsx(qd,{commandHandler:e,menuDefinition:t,columnId:n,onClick:o})})]})}function cs({commandHandler:e,className:t,multiColumnMenu:n,id:r}){const{columns:o}=n,i=ne.useMemo(()=>{const a=new Map;return Object.getOwnPropertyNames(o).forEach(l=>{if(l==="isExtensible")return;const c=l,u=o[c];typeof u=="object"&&typeof u.order=="number"&&!Number.isNaN(u.order)?a.set(u.order,{id:c,metadata:u}):console.warn(`Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`)}),Array.from(a.values()).sort((l,c)=>(l.metadata.order||0)-(c.metadata.order||0))},[o,r]);return k.jsx(de.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${t??""}`,columns:i.length,role:"menu","aria-label":"GridMenu",id:r,children:i.map((a,l)=>k.jsx(Wd,{commandHandler:e,menuDefinition:n,...a,className:t},l))})}const us=w.createContext({});process.env.NODE_ENV!=="production"&&(us.displayName="ListContext");const Gd=us;function Xd(e){return He("MuiList",e)}rt("MuiList",["root","padding","dense","subheader"]);const Kd=["children","className","component","dense","disablePadding","subheader"],Yd=e=>{const{classes:t,disablePadding:n,dense:r,subheader:o}=e;return Ze({root:["root",!n&&"padding",r&&"dense",o&&"subheader"]},Xd,t)},Jd=Ee("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})(({ownerState:e})=>T({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),ds=w.forwardRef(function(t,n){const r=Qe({props:t,name:"MuiList"}),{children:o,className:i,component:a="ul",dense:l=!1,disablePadding:c=!1,subheader:u}=r,d=ue(r,Kd),f=w.useMemo(()=>({dense:l}),[l]),p=T({},r,{component:a,dense:l,disablePadding:c}),b=Yd(p);return k.jsx(Gd.Provider,{value:f,children:k.jsxs(Jd,T({as:a,className:ye(b.root,i),ref:n,ownerState:p},d,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(ds.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,dense:s.bool,disablePadding:s.bool,subheader:s.node,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const Zd=ds,Qd=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function dr(e,t,n){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:n?null:e.firstChild}function oi(e,t,n){return e===t?n?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:n?null:e.lastChild}function ps(e,t){if(t===void 0)return!0;let n=e.innerText;return n===void 0&&(n=e.textContent),n=n.trim().toLowerCase(),n.length===0?!1:t.repeating?n[0]===t.keys[0]:n.indexOf(t.keys.join(""))===0}function qt(e,t,n,r,o,i){let a=!1,l=o(e,t,t?n:!1);for(;l;){if(l===e.firstChild){if(a)return!1;a=!0}const c=r?!1:l.disabled||l.getAttribute("aria-disabled")==="true";if(!l.hasAttribute("tabindex")||!ps(l,i)||c)l=o(e,l,n);else return l.focus(),!0}return!1}const fs=w.forwardRef(function(t,n){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:a,className:l,disabledItemsFocusable:c=!1,disableListWrap:u=!1,onKeyDown:d,variant:f="selectedMenu"}=t,p=ue(t,Qd),b=w.useRef(null),v=w.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});ht(()=>{o&&b.current.focus()},[o]),w.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(y,x)=>{const h=!b.current.style.width;if(y.clientHeight<b.current.clientHeight&&h){const S=`${ki(xe(y))}px`;b.current.style[x.direction==="rtl"?"paddingLeft":"paddingRight"]=S,b.current.style.width=`calc(100% + ${S})`}return b.current}}),[]);const g=y=>{const x=b.current,h=y.key,S=xe(x).activeElement;if(h==="ArrowDown")y.preventDefault(),qt(x,S,u,c,dr);else if(h==="ArrowUp")y.preventDefault(),qt(x,S,u,c,oi);else if(h==="Home")y.preventDefault(),qt(x,null,u,c,dr);else if(h==="End")y.preventDefault(),qt(x,null,u,c,oi);else if(h.length===1){const P=v.current,A=h.toLowerCase(),I=performance.now();P.keys.length>0&&(I-P.lastTime>500?(P.keys=[],P.repeating=!0,P.previousKeyMatched=!0):P.repeating&&A!==P.keys[0]&&(P.repeating=!1)),P.lastTime=I,P.keys.push(A);const j=S&&!P.repeating&&ps(S,P);P.previousKeyMatched&&(j||qt(x,S,!1,c,dr,P))?y.preventDefault():P.previousKeyMatched=!1}d&&d(y)},m=Ae(b,n);let E=-1;w.Children.forEach(a,(y,x)=>{if(!w.isValidElement(y)){E===x&&(E+=1,E>=a.length&&(E=-1));return}process.env.NODE_ENV!=="production"&&Cn.isFragment(y)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),y.props.disabled||(f==="selectedMenu"&&y.props.selected||E===-1)&&(E=x),E===x&&(y.props.disabled||y.props.muiSkipListHighlight||y.type.muiSkipListHighlight)&&(E+=1,E>=a.length&&(E=-1))});const $=w.Children.map(a,(y,x)=>{if(x===E){const h={};return i&&(h.autoFocus=!0),y.props.tabIndex===void 0&&f==="selectedMenu"&&(h.tabIndex=0),w.cloneElement(y,h)}return y});return k.jsx(Zd,T({role:"menu",ref:m,className:l,onKeyDown:g,tabIndex:o?0:-1},p,{children:$}))});process.env.NODE_ENV!=="production"&&(fs.propTypes={autoFocus:s.bool,autoFocusItem:s.bool,children:s.node,className:s.string,disabledItemsFocusable:s.bool,disableListWrap:s.bool,onKeyDown:s.func,variant:s.oneOf(["menu","selectedMenu"])});const ep=fs,tp=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],np={entering:{opacity:1},entered:{opacity:1}},hs=w.forwardRef(function(t,n){const r=hn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:a=!0,children:l,easing:c,in:u,onEnter:d,onEntered:f,onEntering:p,onExit:b,onExited:v,onExiting:g,style:m,timeout:E=o,TransitionComponent:$=es}=t,y=ue(t,tp),x=w.useRef(null),h=Ae(x,l.ref,n),S=L=>_=>{if(L){const R=x.current;_===void 0?L(R):L(R,_)}},P=S(p),A=S((L,_)=>{ts(L);const R=An({style:m,timeout:E,easing:c},{mode:"enter"});L.style.webkitTransition=r.transitions.create("opacity",R),L.style.transition=r.transitions.create("opacity",R),d&&d(L,_)}),I=S(f),j=S(g),B=S(L=>{const _=An({style:m,timeout:E,easing:c},{mode:"exit"});L.style.webkitTransition=r.transitions.create("opacity",_),L.style.transition=r.transitions.create("opacity",_),b&&b(L)}),z=S(v),W=L=>{i&&i(x.current,L)};return k.jsx($,T({appear:a,in:u,nodeRef:x,onEnter:A,onEntered:I,onEntering:P,onExit:B,onExited:z,onExiting:j,addEndListener:W,timeout:E},y,{children:(L,_)=>w.cloneElement(l,T({style:T({opacity:0,visibility:L==="exited"&&!u?"hidden":void 0},np[L],m,l.props.style),ref:h},_))}))});process.env.NODE_ENV!=="production"&&(hs.propTypes={addEndListener:s.func,appear:s.bool,children:ln.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const rp=hs;function op(e){return He("MuiBackdrop",e)}rt("MuiBackdrop",["root","invisible"]);const ip=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],sp=e=>{const{classes:t,invisible:n}=e;return Ze({root:["root",n&&"invisible"]},op,t)},ap=Ee("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})(({ownerState:e})=>T({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),ms=w.forwardRef(function(t,n){var r,o,i;const a=Qe({props:t,name:"MuiBackdrop"}),{children:l,className:c,component:u="div",components:d={},componentsProps:f={},invisible:p=!1,open:b,slotProps:v={},slots:g={},TransitionComponent:m=rp,transitionDuration:E}=a,$=ue(a,ip),y=T({},a,{component:u,invisible:p}),x=sp(y),h=(r=v.root)!=null?r:f.root;return k.jsx(m,T({in:b,timeout:E},$,{children:k.jsx(ap,T({"aria-hidden":!0},h,{as:(o=(i=g.root)!=null?i:d.Root)!=null?o:u,className:ye(x.root,c,h==null?void 0:h.className),ownerState:T({},y,h==null?void 0:h.ownerState),classes:x,ref:n,children:l}))}))});process.env.NODE_ENV!=="production"&&(ms.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.object}),invisible:s.bool,open:s.bool.isRequired,slotProps:s.shape({root:s.object}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const lp=ms;function cp(e){return He("MuiModal",e)}rt("MuiModal",["root","hidden","backdrop"]);const up=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],dp=e=>{const{open:t,exited:n,classes:r}=e;return Ze({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},cp,r)},pp=Ee("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})(({theme:e,ownerState:t})=>T({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),fp=Ee(lp,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),gs=w.forwardRef(function(t,n){var r,o,i,a,l,c;const u=Qe({name:"MuiModal",props:t}),{BackdropComponent:d=fp,BackdropProps:f,className:p,closeAfterTransition:b=!1,children:v,container:g,component:m,components:E={},componentsProps:$={},disableAutoFocus:y=!1,disableEnforceFocus:x=!1,disableEscapeKeyDown:h=!1,disablePortal:S=!1,disableRestoreFocus:P=!1,disableScrollLock:A=!1,hideBackdrop:I=!1,keepMounted:j=!1,onBackdropClick:B,open:z,slotProps:W,slots:L}=u,_=ue(u,up),R=T({},u,{closeAfterTransition:b,disableAutoFocus:y,disableEnforceFocus:x,disableEscapeKeyDown:h,disablePortal:S,disableRestoreFocus:P,disableScrollLock:A,hideBackdrop:I,keepMounted:j}),{getRootProps:D,getBackdropProps:Q,getTransitionProps:Z,portalRef:O,isTopModal:M,exited:V,hasTransition:X}=nl(T({},R,{rootRef:n})),F=T({},R,{exited:V}),U=dp(F),q={};if(v.props.tabIndex===void 0&&(q.tabIndex="-1"),X){const{onEnter:J,onExited:C}=Z();q.onEnter=J,q.onExited=C}const G=(r=(o=L==null?void 0:L.root)!=null?o:E.Root)!=null?r:pp,H=(i=(a=L==null?void 0:L.backdrop)!=null?a:E.Backdrop)!=null?i:d,K=(l=W==null?void 0:W.root)!=null?l:$.root,Y=(c=W==null?void 0:W.backdrop)!=null?c:$.backdrop,re=mt({elementType:G,externalSlotProps:K,externalForwardedProps:_,getSlotProps:D,additionalProps:{ref:n,as:m},ownerState:F,className:ye(p,K==null?void 0:K.className,U==null?void 0:U.root,!F.open&&F.exited&&(U==null?void 0:U.hidden))}),N=mt({elementType:H,externalSlotProps:Y,additionalProps:f,getSlotProps:J=>Q(T({},J,{onClick:C=>{B&&B(C),J!=null&&J.onClick&&J.onClick(C)}})),className:ye(Y==null?void 0:Y.className,f==null?void 0:f.className,U==null?void 0:U.backdrop),ownerState:F});return!j&&!z&&(!X||V)?null:k.jsx(nn,{ref:O,container:g,disablePortal:S,children:k.jsxs(G,T({},re,{children:[!I&&d?k.jsx(H,T({},N)):null,k.jsx(Nn,{disableEnforceFocus:x,disableAutoFocus:y,disableRestoreFocus:P,isEnabled:M,open:z,children:w.cloneElement(v,q)})]}))})});process.env.NODE_ENV!=="production"&&(gs.propTypes={BackdropComponent:s.elementType,BackdropProps:s.object,children:ln.isRequired,classes:s.object,className:s.string,closeAfterTransition:s.bool,component:s.elementType,components:s.shape({Backdrop:s.elementType,Root:s.elementType}),componentsProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([Ke,s.func]),disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableEscapeKeyDown:s.bool,disablePortal:s.bool,disableRestoreFocus:s.bool,disableScrollLock:s.bool,hideBackdrop:s.bool,keepMounted:s.bool,onBackdropClick:s.func,onClose:s.func,onTransitionEnter:s.func,onTransitionExited:s.func,open:s.bool.isRequired,slotProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({backdrop:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const hp=gs;function mp(e){return He("MuiPaper",e)}rt("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const gp=["className","component","elevation","square","variant"],bp=e=>{const{square:t,elevation:n,variant:r,classes:o}=e,i={root:["root",r,!t&&"rounded",r==="elevation"&&`elevation${n}`]};return Ze(i,mp,o)},vp=Ee("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!n.square&&t.rounded,n.variant==="elevation"&&t[`elevation${n.elevation}`]]}})(({theme:e,ownerState:t})=>{var n;return T({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!t.square&&{borderRadius:e.shape.borderRadius},t.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},t.variant==="elevation"&&T({boxShadow:(e.vars||e).shadows[t.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${In("#fff",Qo(t.elevation))}, ${In("#fff",Qo(t.elevation))})`},e.vars&&{backgroundImage:(n=e.vars.overlays)==null?void 0:n[t.elevation]}))}),bs=w.forwardRef(function(t,n){const r=Qe({props:t,name:"MuiPaper"}),{className:o,component:i="div",elevation:a=1,square:l=!1,variant:c="elevation"}=r,u=ue(r,gp),d=T({},r,{component:i,elevation:a,square:l,variant:c}),f=bp(d);return process.env.NODE_ENV!=="production"&&hn().shadows[a]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)),k.jsx(vp,T({as:i,ownerState:d,className:ye(f.root,o),ref:n},u))});process.env.NODE_ENV!=="production"&&(bs.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,elevation:At(Ci,e=>{const{elevation:t,variant:n}=e;return t>0&&n==="outlined"?new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:s.bool,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),variant:s.oneOfType([s.oneOf(["elevation","outlined"]),s.string])});const yp=bs;function xp(e){return He("MuiPopover",e)}rt("MuiPopover",["root","paper"]);const Ep=["onEntering"],wp=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],Tp=["slotProps"];function ii(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.height/2:t==="bottom"&&(n=e.height),n}function si(e,t){let n=0;return typeof t=="number"?n=t:t==="center"?n=e.width/2:t==="right"&&(n=e.width),n}function ai(e){return[e.horizontal,e.vertical].map(t=>typeof t=="number"?`${t}px`:t).join(" ")}function Sn(e){return typeof e=="function"?e():e}const Op=e=>{const{classes:t}=e;return Ze({root:["root"],paper:["paper"]},xp,t)},kp=Ee(hp,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),vs=Ee(yp,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),ys=w.forwardRef(function(t,n){var r,o,i;const a=Qe({props:t,name:"MuiPopover"}),{action:l,anchorEl:c,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:f="anchorEl",children:p,className:b,container:v,elevation:g=8,marginThreshold:m=16,open:E,PaperProps:$={},slots:y,slotProps:x,transformOrigin:h={vertical:"top",horizontal:"left"},TransitionComponent:S=Sr,transitionDuration:P="auto",TransitionProps:{onEntering:A}={},disableScrollLock:I=!1}=a,j=ue(a.TransitionProps,Ep),B=ue(a,wp),z=(r=x==null?void 0:x.paper)!=null?r:$,W=w.useRef(),L=Ae(W,z.ref),_=T({},a,{anchorOrigin:u,anchorReference:f,elevation:g,marginThreshold:m,externalPaperSlotProps:z,transformOrigin:h,TransitionComponent:S,transitionDuration:P,TransitionProps:j}),R=Op(_),D=w.useCallback(()=>{if(f==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const J=Sn(c),C=J&&J.nodeType===1?J:xe(W.current).body,oe=C.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const be=C.getBoundingClientRect();process.env.NODE_ENV!=="test"&&be.top===0&&be.left===0&&be.right===0&&be.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:oe.top+ii(oe,u.vertical),left:oe.left+si(oe,u.horizontal)}},[c,u.horizontal,u.vertical,d,f]),Q=w.useCallback(J=>({vertical:ii(J,h.vertical),horizontal:si(J,h.horizontal)}),[h.horizontal,h.vertical]),Z=w.useCallback(J=>{const C={width:J.offsetWidth,height:J.offsetHeight},oe=Q(C);if(f==="none")return{top:null,left:null,transformOrigin:ai(oe)};const be=D();let we=be.top-oe.vertical,me=be.left-oe.horizontal;const st=we+C.height,Te=me+C.width,qe=Nt(Sn(c)),Pe=qe.innerHeight-m,We=qe.innerWidth-m;if(m!==null&&we<m){const ve=we-m;we-=ve,oe.vertical+=ve}else if(m!==null&&st>Pe){const ve=st-Pe;we-=ve,oe.vertical+=ve}if(process.env.NODE_ENV!=="production"&&C.height>Pe&&C.height&&Pe&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${C.height-Pe}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),m!==null&&me<m){const ve=me-m;me-=ve,oe.horizontal+=ve}else if(Te>We){const ve=Te-We;me-=ve,oe.horizontal+=ve}return{top:`${Math.round(we)}px`,left:`${Math.round(me)}px`,transformOrigin:ai(oe)}},[c,f,D,Q,m]),[O,M]=w.useState(E),V=w.useCallback(()=>{const J=W.current;if(!J)return;const C=Z(J);C.top!==null&&(J.style.top=C.top),C.left!==null&&(J.style.left=C.left),J.style.transformOrigin=C.transformOrigin,M(!0)},[Z]);w.useEffect(()=>(I&&window.addEventListener("scroll",V),()=>window.removeEventListener("scroll",V)),[c,I,V]);const X=(J,C)=>{A&&A(J,C),V()},F=()=>{M(!1)};w.useEffect(()=>{E&&V()}),w.useImperativeHandle(l,()=>E?{updatePosition:()=>{V()}}:null,[E,V]),w.useEffect(()=>{if(!E)return;const J=Ei(()=>{V()}),C=Nt(c);return C.addEventListener("resize",J),()=>{J.clear(),C.removeEventListener("resize",J)}},[c,E,V]);let U=P;P==="auto"&&!S.muiSupportAuto&&(U=void 0);const q=v||(c?xe(Sn(c)).body:void 0),G=(o=y==null?void 0:y.root)!=null?o:kp,H=(i=y==null?void 0:y.paper)!=null?i:vs,K=mt({elementType:H,externalSlotProps:T({},z,{style:O?z.style:T({},z.style,{opacity:0})}),additionalProps:{elevation:g,ref:L},ownerState:_,className:ye(R.paper,z==null?void 0:z.className)}),Y=mt({elementType:G,externalSlotProps:(x==null?void 0:x.root)||{},externalForwardedProps:B,additionalProps:{ref:n,slotProps:{backdrop:{invisible:!0}},container:q,open:E},ownerState:_,className:ye(R.root,b)}),{slotProps:re}=Y,N=ue(Y,Tp);return k.jsx(G,T({},N,!Mi(G)&&{slotProps:re,disableScrollLock:I},{children:k.jsx(S,T({appear:!0,in:E,onEntering:X,onExited:F,timeout:U},j,{children:k.jsx(H,T({},K,{children:p}))}))}))});process.env.NODE_ENV!=="production"&&(ys.propTypes={action:Cr,anchorEl:At(s.oneOfType([Ke,s.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const t=Sn(e.anchorEl);if(t&&t.nodeType===1){const n=t.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&n.top===0&&n.left===0&&n.right===0&&n.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`))}return null}),anchorOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),anchorPosition:s.shape({left:s.number.isRequired,top:s.number.isRequired}),anchorReference:s.oneOf(["anchorEl","anchorPosition","none"]),children:s.node,classes:s.object,className:s.string,container:s.oneOfType([Ke,s.func]),disableScrollLock:s.bool,elevation:Ci,marginThreshold:s.number,onClose:s.func,open:s.bool.isRequired,PaperProps:s.shape({component:na}),slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transformOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object});const Sp=ys;function Pp(e){return He("MuiMenu",e)}rt("MuiMenu",["root","paper","list"]);const Cp=["onEntering"],Rp=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],Np={vertical:"top",horizontal:"right"},$p={vertical:"top",horizontal:"left"},Mp=e=>{const{classes:t}=e;return Ze({root:["root"],paper:["paper"],list:["list"]},Pp,t)},_p=Ee(Sp,{shouldForwardProp:e=>Zi(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ip=Ee(vs,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),Ap=Ee(ep,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),xs=w.forwardRef(function(t,n){var r,o;const i=Qe({props:t,name:"MuiMenu"}),{autoFocus:a=!0,children:l,className:c,disableAutoFocusItem:u=!1,MenuListProps:d={},onClose:f,open:p,PaperProps:b={},PopoverClasses:v,transitionDuration:g="auto",TransitionProps:{onEntering:m}={},variant:E="selectedMenu",slots:$={},slotProps:y={}}=i,x=ue(i.TransitionProps,Cp),h=ue(i,Rp),S=hn(),P=S.direction==="rtl",A=T({},i,{autoFocus:a,disableAutoFocusItem:u,MenuListProps:d,onEntering:m,PaperProps:b,transitionDuration:g,TransitionProps:x,variant:E}),I=Mp(A),j=a&&!u&&p,B=w.useRef(null),z=(Z,O)=>{B.current&&B.current.adjustStyleForScrollbar(Z,S),m&&m(Z,O)},W=Z=>{Z.key==="Tab"&&(Z.preventDefault(),f&&f(Z,"tabKeyDown"))};let L=-1;w.Children.map(l,(Z,O)=>{w.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&Cn.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(E==="selectedMenu"&&Z.props.selected||L===-1)&&(L=O))});const _=(r=$.paper)!=null?r:Ip,R=(o=y.paper)!=null?o:b,D=mt({elementType:$.root,externalSlotProps:y.root,ownerState:A,className:[I.root,c]}),Q=mt({elementType:_,externalSlotProps:R,ownerState:A,className:I.paper});return k.jsx(_p,T({onClose:f,anchorOrigin:{vertical:"bottom",horizontal:P?"right":"left"},transformOrigin:P?Np:$p,slots:{paper:_,root:$.root},slotProps:{root:D,paper:Q},open:p,ref:n,transitionDuration:g,TransitionProps:T({onEntering:z},x),ownerState:A},h,{classes:v,children:k.jsx(Ap,T({onKeyDown:W,actions:B,autoFocus:a&&(L===-1||u),autoFocusItem:j,variant:E},d,{className:ye(I.list,d.className),children:l}))}))});process.env.NODE_ENV!=="production"&&(xs.propTypes={anchorEl:s.oneOfType([Ke,s.func]),autoFocus:s.bool,children:s.node,classes:s.object,className:s.string,disableAutoFocusItem:s.bool,MenuListProps:s.object,onClose:s.func,open:s.bool.isRequired,PaperProps:s.object,PopoverClasses:s.object,slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object,variant:s.oneOf(["menu","selectedMenu"])});const jp=xs;function Dp({className:e,commandHandler:t,menuDefinition:n,children:r}){var u;const[o,i]=ne.useState(void 0),a=ne.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),l=ne.useCallback(()=>{i(void 0)},[]),c=ne.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=n==null?void 0:n.items)==null?void 0:u.length)??0)===0||!r?r:k.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:a,children:[r,k.jsx(jp,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:c,children:k.jsx(Xr,{menuDefinition:n,commandHandler:t,onClick:l})})]})}const Bp=ss(k.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Lp(e){return{preserveValue:!0,...e}}const jn=(e,t,n={})=>{const r=ne.useRef(t);r.current=t;const o=ne.useRef(n);o.current=Lp(o.current);const[i,a]=ne.useState(()=>r.current),[l,c]=ne.useState(!0);return ne.useEffect(()=>{let u=!0;return c(!!e),(async()=>{if(e){const d=await e();u&&(a(()=>d),c(!1))}})(),()=>{u=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[i,l]};function Es({menuProvider:e,normalMenu:t,fullMenu:n,commandHandler:r,containerRef:o,className:i,ariaLabelPrefix:a,children:l}){const[c,u]=ne.useState(!1),[d,f]=ne.useState(!1),p=ne.useCallback(()=>{c&&u(!1),f(!1)},[c]),b=ne.useCallback(x=>{x.stopPropagation(),u(h=>{const S=!h;return S&&x.shiftKey?f(!0):S||f(!1),S})},[]),v=ne.useCallback(x=>(p(),r(x)),[r,p]),[g,m]=ne.useState({top:1,left:1});ne.useEffect(()=>{if(c){const x=o==null?void 0:o.current;if(x){const h=x.getBoundingClientRect(),S=window.scrollY,P=window.scrollX,A=h.top+S+x.clientHeight,I=h.left+P;m({top:A,left:I})}}},[c,o]);const[E]=jn(ne.useCallback(async()=>(e==null?void 0:e(!1))??t,[e,t,c]),t),[$]=jn(ne.useCallback(async()=>(e==null?void 0:e(!0))??n??E,[e,n,E,c]),n??E),y=d&&$?$:E;return k.jsxs(k.Fragment,{children:[k.jsx(de.IconButton,{sx:{paddingTop:0,paddingBottom:0},edge:"start",className:`papi-menuButton ${i??""}`,color:"inherit","aria-label":`${a??""} menu button`,onClick:b,children:l??k.jsx(Bp,{})}),k.jsx(de.Drawer,{className:`papi-menu-drawer ${i??""}`,anchor:"left",variant:"temporary",open:c,onClose:p,PaperProps:{className:"papi-menu-drawer-paper",style:{top:g.top,left:g.left}},children:y?k.jsx(cs,{className:i,id:`${a??""} main menu`,commandHandler:v,multiColumnMenu:y}):void 0})]})}function Fp({id:e,label:t,isDisabled:n=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:l,onClick:c,children:u}){return k.jsx(de.IconButton,{id:e,disabled:n,edge:i,size:a,"aria-label":t,title:o?void 0:r??t,className:`papi-icon-button ${l??""}`,onClick:c,children:u})}var Vp=Object.defineProperty,zp=(e,t,n)=>t in e?Vp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,te=(e,t,n)=>(zp(e,typeof t!="symbol"?t+"":t,n),n);const vt=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],Kr=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ws=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],li=Zp();function jt(e,t=!0){return t&&(e=e.toUpperCase()),e in li?li[e]:0}function Yr(e){return jt(e)>0}function Up(e){const t=typeof e=="string"?jt(e):e;return t>=40&&t<=66}function Hp(e){return(typeof e=="string"?jt(e):e)<=39}function Ts(e){return e<=66}function qp(e){const t=typeof e=="string"?jt(e):e;return Ss(t)&&!Ts(t)}function*Wp(){for(let e=1;e<=vt.length;e++)yield e}const Gp=1,Os=vt.length;function Xp(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function Jr(e,t="***"){const n=e-1;return n<0||n>=vt.length?t:vt[n]}function ks(e){return e<=0||e>Os?"******":ws[e-1]}function Kp(e){return ks(jt(e))}function Ss(e){const t=typeof e=="number"?Jr(e):e;return Yr(t)&&!Kr.includes(t)}function Yp(e){const t=typeof e=="number"?Jr(e):e;return Yr(t)&&Kr.includes(t)}function Jp(e){return ws[e-1].includes("*obsolete*")}function Zp(){const e={};for(let t=0;t<vt.length;t++)e[vt[t]]=t+1;return e}const Fe={allBookIds:vt,nonCanonicalIds:Kr,bookIdToNumber:jt,isBookIdValid:Yr,isBookNT:Up,isBookOT:Hp,isBookOTNT:Ts,isBookDC:qp,allBookNumbers:Wp,firstBook:Gp,lastBook:Os,extraBooks:Xp,bookNumberToId:Jr,bookNumberToEnglishName:ks,bookIdToEnglishName:Kp,isCanonical:Ss,isExtraMaterial:Yp,isObsolete:Jp};var tt=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(tt||{});const Re=class{constructor(t){if(te(this,"name"),te(this,"fullPath"),te(this,"isPresent"),te(this,"hasVerseSegments"),te(this,"isCustomized"),te(this,"baseVersification"),te(this,"scriptureBooks"),te(this,"_type"),t!=null)typeof t=="string"?this.name=t:this._type=t;else throw new Error("Argument null")}get type(){return this._type}equals(t){return!t.type||!this.type?!1:t.type===this.type}};te(Re,"Original",new Re(tt.Original)),te(Re,"Septuagint",new Re(tt.Septuagint)),te(Re,"Vulgate",new Re(tt.Vulgate)),te(Re,"English",new Re(tt.English)),te(Re,"RussianProtestant",new Re(tt.RussianProtestant)),te(Re,"RussianOrthodox",new Re(tt.RussianOrthodox));let Pt=Re;function ci(e,t){const n=t[0];for(let r=1;r<t.length;r++)e=e.split(t[r]).join(n);return e.split(n)}var Ps=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(Ps||{});const Oe=class ie{constructor(t,n,r,o){if(te(this,"firstChapter"),te(this,"lastChapter"),te(this,"lastVerse"),te(this,"hasSegmentsDefined"),te(this,"text"),te(this,"BBBCCCVVVS"),te(this,"longHashCode"),te(this,"versification"),te(this,"rtlMark","‏"),te(this,"_bookNum",0),te(this,"_chapterNum",0),te(this,"_verseNum",0),te(this,"_verse"),r==null&&o==null)if(t!=null&&typeof t=="string"){const i=t,a=n!=null&&n instanceof Pt?n:void 0;this.setEmpty(a),this.parse(i)}else if(t!=null&&typeof t=="number"){const i=n!=null&&n instanceof Pt?n:void 0;this.setEmpty(i),this._verseNum=t%ie.chapterDigitShifter,this._chapterNum=Math.floor(t%ie.bookDigitShifter/ie.chapterDigitShifter),this._bookNum=Math.floor(t/ie.bookDigitShifter)}else if(n==null)if(t!=null&&t instanceof ie){const i=t;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(t==null)return;const i=t instanceof Pt?t:ie.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(t!=null&&n!=null&&r!=null)if(typeof t=="string"&&typeof n=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(t,n,r);else if(typeof t=="number"&&typeof n=="number"&&typeof r=="number")this._bookNum=t,this._chapterNum=n,this._verseNum=r,this.versification=o??ie.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(t,n=ie.defaultVersification){const r=new ie(n);return r.parse(t),r}static isVerseParseable(t){return t.length>0&&"0123456789".includes(t[0])&&!t.endsWith(this.verseRangeSeparator)&&!t.endsWith(this.verseSequenceIndicator)}static tryParse(t){let n;try{return n=ie.parse(t),{success:!0,verseRef:n}}catch(r){if(r instanceof Wt)return n=new ie,{success:!1,verseRef:n};throw r}}static getBBBCCCVVV(t,n,r){return t%ie.bcvMaxValue*ie.bookDigitShifter+(n>=0?n%ie.bcvMaxValue*ie.chapterDigitShifter:0)+(r>=0?r%ie.bcvMaxValue:0)}static tryGetVerseNum(t){let n;if(!t)return n=-1,{success:!0,vNum:n};n=0;let r;for(let o=0;o<t.length;o++){if(r=t[o],r<"0"||r>"9")return o===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +r-+"0",n>ie.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(ie.verseRangeSeparator)||this._verse.includes(ie.verseSequenceIndicator))}get book(){return Fe.bookNumberToId(this.bookNum,"")}set book(t){this.bookNum=Fe.bookIdToNumber(t)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(t){const n=+t;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(t){const{success:n,vNum:r}=ie.tryGetVerseNum(t);this._verse=n?void 0:t.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=ie.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(t){if(t<=0||t>Fe.lastBook)throw new Wt("BookNum must be greater than zero and less than or equal to last book");this._bookNum=t}get chapterNum(){return this._chapterNum}set chapterNum(t){this.chapterNum=t}get verseNum(){return this._verseNum}set verseNum(t){this._verseNum=t}get versificationStr(){var t;return(t=this.versification)==null?void 0:t.name}set versificationStr(t){this.versification=this.versification!=null?new Pt(t):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(ie.verseRangeSeparators,ie.verseSequenceIndicators)}get BBBCCC(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return ie.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(t){if(t=t.replace(this.rtlMark,""),t.includes("/")){const i=t.split("/");if(t=i[0],i.length>1)try{const a=+i[1].trim();this.versification=new Pt(tt[a])}catch{throw new Wt("Invalid reference : "+t)}}const n=t.trim().split(" ");if(n.length!==2)throw new Wt("Invalid reference : "+t);const r=n[1].split(":"),o=+r[0];if(r.length!==2||Fe.bookIdToNumber(n[0])===0||!Number.isInteger(o)||o<0||!ie.isVerseParseable(r[1]))throw new Wt("Invalid reference : "+t);this.updateInternal(n[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new ie(this)}toString(){const t=this.book;return t===""?"":`${t} ${this.chapter}:${this.verse}`}equals(t){return t instanceof ie?t._bookNum===this._bookNum&&t._chapterNum===this._chapterNum&&t._verseNum===this._verseNum&&t.verse===this.verse&&t.versification!=null&&this.versification!=null&&t.versification.equals(this.versification):!1}allVerses(t=!1,n=ie.verseRangeSeparators,r=ie.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=ci(this._verse,r);for(const a of i.map(l=>ci(l,n))){const l=this.clone();l.verse=a[0];const c=l.verseNum;if(o.push(l),a.length>1){const u=this.clone();if(u.verse=a[1],!t)for(let d=c+1;d<u.verseNum;d++){const f=new ie(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(f)}o.push(u)}}return o}validateVerse(t,n){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,t,n)){const i=o.internalValid;if(i!==0)return i;const a=o.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>Fe.lastBook?2:(Fe.isCanonical(this._bookNum),0)}setEmpty(t=ie.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=t}updateInternal(t,n,r){this.bookNum=Fe.bookIdToNumber(t),this.chapter=n,this.verse=r}};te(Oe,"defaultVersification",Pt.English),te(Oe,"verseRangeSeparator","-"),te(Oe,"verseSequenceIndicator",","),te(Oe,"verseRangeSeparators",[Oe.verseRangeSeparator]),te(Oe,"verseSequenceIndicators",[Oe.verseSequenceIndicator]),te(Oe,"chapterDigitShifter",1e3),te(Oe,"bookDigitShifter",Oe.chapterDigitShifter*Oe.chapterDigitShifter),te(Oe,"bcvMaxValue",Oe.chapterDigitShifter-1),te(Oe,"ValidStatusType",Ps);class Wt extends Error{}function an({variant:e="outlined",id:t,isDisabled:n=!1,hasError:r=!1,isFullWidth:o=!1,helperText:i,label:a,placeholder:l,isRequired:c=!1,className:u,defaultValue:d,value:f,onChange:p,onFocus:b,onBlur:v}){return k.jsx(de.TextField,{variant:e,id:t,disabled:n,error:r,fullWidth:o,helperText:i,label:a,placeholder:l,required:c,className:`papi-textfield ${u??""}`,defaultValue:d,value:f,onChange:p,onFocus:b,onBlur:v})}let pr;const fr=()=>(pr||(pr=Fe.allBookIds.map(e=>({bookId:e,label:Fe.bookIdToEnglishName(e)}))),pr);function Qp({scrRef:e,handleSubmit:t,id:n}){const r=c=>{t(c)},o=(c,u)=>{const f={bookNum:Fe.bookIdToNumber(u.bookId),chapterNum:1,verseNum:1};r(f)},i=c=>{t({...e,chapterNum:+c.target.value})},a=c=>{t({...e,verseNum:+c.target.value})},l=ne.useMemo(()=>fr()[e.bookNum-1],[e.bookNum]);return k.jsxs("span",{id:n,children:[k.jsx(Pn,{title:"Book",className:"papi-ref-selector book",value:l,options:fr(),onChange:o,isClearable:!1,width:200}),k.jsx(lt,{onClick:()=>r(Le.offsetBook(e,-1)),isDisabled:e.bookNum<=Le.FIRST_SCR_BOOK_NUM,children:"<"}),k.jsx(lt,{onClick:()=>r(Le.offsetBook(e,1)),isDisabled:e.bookNum>=fr().length,children:">"}),k.jsx(an,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),k.jsx(lt,{onClick:()=>t(Le.offsetChapter(e,-1)),isDisabled:e.chapterNum<=Le.FIRST_SCR_CHAPTER_NUM,children:"<"}),k.jsx(lt,{onClick:()=>t(Le.offsetChapter(e,1)),isDisabled:e.chapterNum>=Le.getChaptersForBook(e.bookNum),children:">"}),k.jsx(an,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),k.jsx(lt,{onClick:()=>t(Le.offsetVerse(e,-1)),isDisabled:e.verseNum<=Le.FIRST_SCR_VERSE_NUM,children:"<"}),k.jsx(lt,{onClick:()=>t(Le.offsetVerse(e,1)),children:">"})]})}function ef({onSearch:e,placeholder:t,isFullWidth:n}){const[r,o]=ne.useState(""),i=a=>{o(a),e(a)};return k.jsx(de.Paper,{component:"form",className:"search-bar-paper",children:k.jsx(an,{isFullWidth:n,className:"search-bar-input",placeholder:t,value:r,onChange:a=>i(a.target.value)})})}function tf({id:e,isDisabled:t=!1,orientation:n="horizontal",min:r=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:l,value:c,valueLabelDisplay:u="off",className:d,onChange:f,onChangeCommitted:p}){return k.jsx(de.Slider,{id:e,disabled:t,orientation:n,min:r,max:o,step:i,marks:a,defaultValue:l,value:c,valueLabelDisplay:u,className:`papi-slider ${n} ${d??""}`,onChange:f,onChangeCommitted:p})}function nf({autoHideDuration:e=void 0,id:t,isOpen:n=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:l}){const c={action:(a==null?void 0:a.action)||l,message:a==null?void 0:a.message,className:r};return k.jsx(de.Snackbar,{autoHideDuration:e??void 0,open:n,onClose:o,anchorOrigin:i,id:t,ContentProps:c})}function rf({id:e,isChecked:t,isDisabled:n=!1,hasError:r=!1,className:o,onChange:i}){return k.jsx(de.Switch,{id:e,checked:t,disabled:n,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function ui({onRowChange:e,row:t,column:n}){const r=o=>{e({...t,[n.key]:o.target.value})};return k.jsx(an,{defaultValue:t[n.key],onChange:r})}const of=({onChange:e,disabled:t,checked:n,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return k.jsx(pi,{...r,isChecked:n,isDisabled:t,onChange:o})};function sf({columns:e,sortColumns:t,onSortColumnsChange:n,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:l=!0,defaultColumnResizable:c=!0,rows:u,enableSelectColumn:d,selectColumnWidth:f=50,rowKeyGetter:p,rowHeight:b=35,headerRowHeight:v=35,selectedRows:g,onSelectedRowsChange:m,onRowsChange:E,onCellClick:$,onCellDoubleClick:y,onCellContextMenu:x,onCellKeyDown:h,direction:S="ltr",enableVirtualization:P=!0,onCopy:A,onPaste:I,onScroll:j,className:B,"data-testid":z}){const W=ne.useMemo(()=>{const L=e.map(_=>typeof _.editable=="function"?{..._,editable:D=>!!_.editable(D),renderEditCell:_.renderEditCell||ui}:_.editable&&!_.renderEditCell?{..._,renderEditCell:ui}:_.renderEditCell&&!_.editable?{..._,editable:!1}:_);return d?[{...fo.SelectColumn,minWidth:f},...L]:L},[e,d,f]);return k.jsx(fo,{columns:W,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:l,resizable:c},sortColumns:t,onSortColumnsChange:n,onColumnResize:r,rows:u,rowKeyGetter:p,rowHeight:b,headerRowHeight:v,selectedRows:g,onSelectedRowsChange:m,onRowsChange:E,onCellClick:$,onCellDoubleClick:y,onCellContextMenu:x,onCellKeyDown:h,direction:S,enableVirtualization:P,onCopy:A,onPaste:I,onScroll:j,renderers:{renderCheckbox:of},className:`papi-table ${B??"rdg-light"}`,"data-testid":z})}function af({menuProvider:e,commandHandler:t,className:n,id:r,children:o}){const i=ne.useRef(void 0);return k.jsx("div",{ref:i,style:{position:"relative"},children:k.jsx(de.AppBar,{position:"static",id:r,children:k.jsxs(de.Toolbar,{className:`papi-toolbar ${n??""}`,variant:"dense",children:[e?k.jsx(Es,{commandHandler:t,containerRef:i,menuProvider:e}):void 0,o?k.jsx("div",{className:"papi-toolbar-children",children:o}):void 0]})})})}const lf=(e,t)=>{ne.useEffect(()=>{if(!e)return()=>{};const n=e(t);return()=>{n()}},[e,t])},hr=()=>!1,cf=(e,t)=>{const[n]=jn(ne.useCallback(async()=>{if(!e)return hr;const r=await Promise.resolve(e(t));return async()=>r()},[t,e]),hr,{preserveValue:!1});ne.useEffect(()=>()=>{n!==hr&&n()},[n])};exports.Button=lt;exports.ChapterRangeSelector=Vs;exports.Checkbox=pi;exports.ComboBox=Pn;exports.ContextMenu=Dp;exports.GridMenu=cs;exports.HamburgerMenuButton=Es;exports.IconButton=Fp;exports.LabelPosition=dt;exports.MenuItem=Gr;exports.RefSelector=Qp;exports.SearchBar=ef;exports.Slider=tf;exports.Snackbar=nf;exports.Switch=rf;exports.Table=sf;exports.TextField=an;exports.Toolbar=af;exports.useEvent=lf;exports.useEventAsync=cf;exports.usePromise=jn;function uf(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(o,r):n.appendChild(o)}uf(`.papi-button {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
    --tw-contain-style:  
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
    --tw-contain-style:  
}
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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

.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
}
`,"top");
//# sourceMappingURL=index.cjs.map
