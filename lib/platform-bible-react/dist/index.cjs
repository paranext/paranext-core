"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const E=require("react/jsx-runtime"),ae=require("@mui/material"),se=require("react"),ot=require("@mui/styled-engine"),un=require("react-dom"),Se=require("platform-bible-utils"),_t=require("react-data-grid");function Er(e){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const t in e)if(t!=="default"){const r=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(n,t,r.get?r:{enumerable:!0,get:()=>e[t]})}}return n.default=e,Object.freeze(n)}const O=Er(se),bo=Er(un);function De({id:e,isDisabled:n=!1,className:t,onClick:r,onContextMenu:o,children:i}){return E.jsx(ae.Button,{id:e,disabled:n,className:`papi-button ${t??""}`,onClick:r,onContextMenu:o,children:i})}function wn({id:e,title:n,isDisabled:t=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:s,options:c=[],className:l,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:y}){return E.jsx(ae.Autocomplete,{id:e,disablePortal:!0,disabled:t,disableClearable:!r,fullWidth:i,options:c,className:`papi-combo-box ${o?"error":""} ${l??""}`,value:u,onChange:d,onFocus:f,onBlur:p,getOptionLabel:y,renderInput:b=>E.jsx(ae.TextField,{...b,error:o,fullWidth:i,disabled:t,label:n,style:{width:s}})})}function yo({startChapter:e,endChapter:n,handleSelectStartChapter:t,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const s=se.useMemo(()=>Array.from({length:i},(u,d)=>d+1),[i]),c=(u,d)=>{t(d),d>n&&r(d)},l=(u,d)=>{r(d),d<e&&t(d)};return E.jsxs(E.Fragment,{children:[E.jsx(ae.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:E.jsx(wn,{onChange:(u,d)=>c(u,d),className:"book-selection-chapter",isClearable:!1,options:s,getOptionLabel:u=>u.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),E.jsx(ae.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:E.jsx(wn,{onChange:(u,d)=>l(u,d),className:"book-selection-chapter",isClearable:!1,options:s,getOptionLabel:u=>u.toString(),value:n,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var Ve=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Ve||{});function Tr({id:e,isChecked:n,labelText:t="",labelPosition:r=Ve.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:s=!1,hasError:c=!1,className:l,onChange:u}){const d=E.jsx(ae.Checkbox,{id:e,checked:n,indeterminate:o,defaultChecked:i,disabled:s,className:`papi-checkbox ${c?"error":""} ${l??""}`,onChange:u});let f;if(t){const p=r===Ve.Before||r===Ve.Above,y=E.jsx("span",{className:`papi-checkbox-label ${c?"error":""} ${l??""}`,children:t}),b=r===Ve.Before||r===Ve.After,g=b?y:E.jsx("div",{children:y}),h=b?d:E.jsx("div",{children:d});f=E.jsxs(ae.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:s,error:c,children:[p&&g,h,!p&&g]})}else f=d;return f}function $t(e,n,t){return e?E.jsx(ae.ListItemIcon,{className:`papi-menu-icon-${t?"leading":"trailing"}`,children:E.jsx("img",{src:e,alt:`${t?"Leading":"Trailing"} icon for ${n}`})}):void 0}function kr(e){const{onClick:n,label:t,allowForLeadingIcons:r=!0,iconPathBefore:o=void 0,iconPathAfter:i=void 0,hasAutoFocus:s=!1,className:c,isDisabled:l=!1,isDense:u=!0,hasDisabledGutters:d=!1,hasDivider:f=!1,focusVisibleClassName:p,id:y,children:b}=e;return E.jsx(ae.MenuItem,{sx:{lineHeight:.8},autoFocus:s,className:c,disabled:l,dense:u,disableGutters:d,divider:f,focusVisibleClassName:p,onClick:n,id:y,children:t?E.jsxs(E.Fragment,{children:[$t(o,t,!0),E.jsx(ae.ListItemText,{primary:t,inset:!o&&r}),$t(i,t,!1)]}):b})}function Sr(e){return Object.entries(e.groups).map(([t,r])=>({id:t,group:r}))}function vo(e){const[n,t]=se.useState(void 0),{parentMenuItem:r,menuDefinition:o}=e,i=l=>{t(l.currentTarget)},s=()=>{t(void 0)},c=()=>{let l=Sr(o).filter(u=>"menuItem"in u.group);return r!=null&&r.id&&(l=l.filter(u=>"menuItem"in u&&u.menuItem===r.id)),ft(e,l)};return E.jsxs(E.Fragment,{children:[E.jsx(ae.MenuItem,{onClick:i,children:r.label}),E.jsx(ae.Menu,{anchorEl:n,open:!!n,onClose:s,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const xo=(e,n)=>n.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function ft(e,n){const{menuDefinition:t,onClick:r,commandHandler:o}=e;((n==null?void 0:n.length)??!0)&&(n=Sr(t).filter(f=>!("menuItem"in f.group)));const i=Object.values(n).sort((f,p)=>(f.group.order||0)-(p.group.order||0)),s=[];i.forEach(f=>{xo(f.id,t.items).forEach(p=>s.push({item:p,isLastItemInGroup:!1})),s.length>0&&(s[s.length-1].isLastItemInGroup=!0)}),s.length>0&&(s[s.length-1].isLastItemInGroup=!1);const c=s==null?void 0:s.some(f=>"iconPathBefore"in f),l=({item:f,isLastItemInGroup:p})=>({className:"papi-menu-item",label:f.label,iconPathBefore:"iconPathBefore"in f?f.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in f?f.iconPathAfter:void 0,hasDivider:p,allowForLeadingIcons:c}),[u]=s;if(!u)return E.jsx("div",{});const d=u.item.group;return E.jsx("div",{role:"menu","aria-label":d,children:(()=>{const f=[];return s.forEach((p,y)=>{const{item:b}=p,g=l(p);if("command"in b){const h=b.group+y;f.push(E.jsx(kr,{onClick:()=>{r==null||r(),o(b)},...g},h))}else f.push(E.jsx(vo,{parentMenuItem:b,...e},d+b.id))}),f})()},d)}function wr(e){const{menuDefinition:n,columnId:t}=e;let i=Object.entries(n.groups).map(([s,c])=>({id:s,group:c})).filter(s=>"column"in s.group);return t&&"columns"in n&&n.columns[t]&&(i=i.filter(s=>"column"in s.group&&s.group.column===t)),ft(e,i)}function Eo({commandHandler:e,menuDefinition:n,id:t,metadata:r,onClick:o,className:i}){return E.jsxs(ae.Grid,{id:t,item:!0,xs:"auto",role:"menu","aria-label":t,className:`papi-menu-column ${i??""}`,children:[E.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),E.jsx(ae.List,{id:t,dense:!0,className:i??"",children:E.jsx(wr,{commandHandler:e,menuDefinition:n,columnId:t,onClick:o})})]})}function Or({commandHandler:e,className:n,multiColumnMenu:t,id:r}){const{columns:o}=t,i=new Map;Object.getOwnPropertyNames(o).forEach(c=>{if(c==="isExtensible")return;const l=c,u=o[l];typeof u=="object"&&i.set(u.order,{id:l,metadata:u})});const s=Array.from(i.values()).sort((c,l)=>(c.metadata.order||0)-(l.metadata.order||0));return E.jsx(ae.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${n??""}`,columns:s.length,role:"menu","aria-label":"GridMenu",id:r,children:s.map((c,l)=>E.jsx(Eo,{commandHandler:e,menuDefinition:t,...c,className:n},l))})}function To({id:e,label:n,isDisabled:t=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:s="medium",className:c,onClick:l,children:u}){return E.jsx(ae.IconButton,{id:e,disabled:t,edge:i,size:s,"aria-label":n,title:o?void 0:r??n,className:`papi-icon-button ${c??""}`,onClick:l,children:u})}function S(){return S=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},S.apply(this,arguments)}function le(e,n){if(e==null)return{};var t={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(n.indexOf(o)>=0)&&(t[o]=e[o]);return t}function ko(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var it={exports:{}},ne={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mt;function So(){if(Mt)return ne;Mt=1;var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),y=Symbol.for("react.offscreen"),b;b=Symbol.for("react.module.reference");function g(h){if(typeof h=="object"&&h!==null){var k=h.$$typeof;switch(k){case e:switch(h=h.type,h){case t:case o:case r:case u:case d:return h;default:switch(h=h&&h.$$typeof,h){case c:case s:case l:case p:case f:case i:return h;default:return k}}case n:return k}}}return ne.ContextConsumer=s,ne.ContextProvider=i,ne.Element=e,ne.ForwardRef=l,ne.Fragment=t,ne.Lazy=p,ne.Memo=f,ne.Portal=n,ne.Profiler=o,ne.StrictMode=r,ne.Suspense=u,ne.SuspenseList=d,ne.isAsyncMode=function(){return!1},ne.isConcurrentMode=function(){return!1},ne.isContextConsumer=function(h){return g(h)===s},ne.isContextProvider=function(h){return g(h)===i},ne.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},ne.isForwardRef=function(h){return g(h)===l},ne.isFragment=function(h){return g(h)===t},ne.isLazy=function(h){return g(h)===p},ne.isMemo=function(h){return g(h)===f},ne.isPortal=function(h){return g(h)===n},ne.isProfiler=function(h){return g(h)===o},ne.isStrictMode=function(h){return g(h)===r},ne.isSuspense=function(h){return g(h)===u},ne.isSuspenseList=function(h){return g(h)===d},ne.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===t||h===o||h===r||h===u||h===d||h===y||typeof h=="object"&&h!==null&&(h.$$typeof===p||h.$$typeof===f||h.$$typeof===i||h.$$typeof===s||h.$$typeof===l||h.$$typeof===b||h.getModuleId!==void 0)},ne.typeOf=g,ne}var te={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var It;function wo(){return It||(It=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),s=Symbol.for("react.context"),c=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),y=Symbol.for("react.offscreen"),b=!1,g=!1,h=!1,k=!1,D=!1,x;x=Symbol.for("react.module.reference");function T(w){return!!(typeof w=="string"||typeof w=="function"||w===t||w===o||D||w===r||w===u||w===d||k||w===y||b||g||h||typeof w=="object"&&w!==null&&(w.$$typeof===p||w.$$typeof===f||w.$$typeof===i||w.$$typeof===s||w.$$typeof===l||w.$$typeof===x||w.getModuleId!==void 0))}function m(w){if(typeof w=="object"&&w!==null){var he=w.$$typeof;switch(he){case e:var ge=w.type;switch(ge){case t:case o:case r:case u:case d:return ge;default:var Oe=ge&&ge.$$typeof;switch(Oe){case c:case s:case l:case p:case f:case i:return Oe;default:return he}}case n:return he}}}var I=s,_=i,K=e,Z=l,R=t,G=p,q=f,ee=n,M=o,N=r,$=u,B=d,ie=!1,Q=!1;function v(w){return ie||(ie=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function P(w){return Q||(Q=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function A(w){return m(w)===s}function z(w){return m(w)===i}function j(w){return typeof w=="object"&&w!==null&&w.$$typeof===e}function V(w){return m(w)===l}function F(w){return m(w)===t}function L(w){return m(w)===p}function W(w){return m(w)===f}function X(w){return m(w)===n}function U(w){return m(w)===o}function pe(w){return m(w)===r}function C(w){return m(w)===u}function H(w){return m(w)===d}te.ContextConsumer=I,te.ContextProvider=_,te.Element=K,te.ForwardRef=Z,te.Fragment=R,te.Lazy=G,te.Memo=q,te.Portal=ee,te.Profiler=M,te.StrictMode=N,te.Suspense=$,te.SuspenseList=B,te.isAsyncMode=v,te.isConcurrentMode=P,te.isContextConsumer=A,te.isContextProvider=z,te.isElement=j,te.isForwardRef=V,te.isFragment=F,te.isLazy=L,te.isMemo=W,te.isPortal=X,te.isProfiler=U,te.isStrictMode=pe,te.isSuspense=C,te.isSuspenseList=H,te.isValidElementType=T,te.typeOf=m}()),te}process.env.NODE_ENV==="production"?it.exports=So():it.exports=wo();var On=it.exports,st={exports:{}},En={exports:{}},re={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var At;function Oo(){if(At)return re;At=1;var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,l=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,y=e?Symbol.for("react.memo"):60115,b=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,k=e?Symbol.for("react.responder"):60118,D=e?Symbol.for("react.scope"):60119;function x(m){if(typeof m=="object"&&m!==null){var I=m.$$typeof;switch(I){case n:switch(m=m.type,m){case l:case u:case r:case i:case o:case f:return m;default:switch(m=m&&m.$$typeof,m){case c:case d:case b:case y:case s:return m;default:return I}}case t:return I}}}function T(m){return x(m)===u}return re.AsyncMode=l,re.ConcurrentMode=u,re.ContextConsumer=c,re.ContextProvider=s,re.Element=n,re.ForwardRef=d,re.Fragment=r,re.Lazy=b,re.Memo=y,re.Portal=t,re.Profiler=i,re.StrictMode=o,re.Suspense=f,re.isAsyncMode=function(m){return T(m)||x(m)===l},re.isConcurrentMode=T,re.isContextConsumer=function(m){return x(m)===c},re.isContextProvider=function(m){return x(m)===s},re.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===n},re.isForwardRef=function(m){return x(m)===d},re.isFragment=function(m){return x(m)===r},re.isLazy=function(m){return x(m)===b},re.isMemo=function(m){return x(m)===y},re.isPortal=function(m){return x(m)===t},re.isProfiler=function(m){return x(m)===i},re.isStrictMode=function(m){return x(m)===o},re.isSuspense=function(m){return x(m)===f},re.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===r||m===u||m===i||m===o||m===f||m===p||typeof m=="object"&&m!==null&&(m.$$typeof===b||m.$$typeof===y||m.$$typeof===s||m.$$typeof===c||m.$$typeof===d||m.$$typeof===h||m.$$typeof===k||m.$$typeof===D||m.$$typeof===g)},re.typeOf=x,re}var oe={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jt;function Co(){return jt||(jt=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,l=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,f=e?Symbol.for("react.suspense"):60113,p=e?Symbol.for("react.suspense_list"):60120,y=e?Symbol.for("react.memo"):60115,b=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,k=e?Symbol.for("react.responder"):60118,D=e?Symbol.for("react.scope"):60119;function x(C){return typeof C=="string"||typeof C=="function"||C===r||C===u||C===i||C===o||C===f||C===p||typeof C=="object"&&C!==null&&(C.$$typeof===b||C.$$typeof===y||C.$$typeof===s||C.$$typeof===c||C.$$typeof===d||C.$$typeof===h||C.$$typeof===k||C.$$typeof===D||C.$$typeof===g)}function T(C){if(typeof C=="object"&&C!==null){var H=C.$$typeof;switch(H){case n:var w=C.type;switch(w){case l:case u:case r:case i:case o:case f:return w;default:var he=w&&w.$$typeof;switch(he){case c:case d:case b:case y:case s:return he;default:return H}}case t:return H}}}var m=l,I=u,_=c,K=s,Z=n,R=d,G=r,q=b,ee=y,M=t,N=i,$=o,B=f,ie=!1;function Q(C){return ie||(ie=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),v(C)||T(C)===l}function v(C){return T(C)===u}function P(C){return T(C)===c}function A(C){return T(C)===s}function z(C){return typeof C=="object"&&C!==null&&C.$$typeof===n}function j(C){return T(C)===d}function V(C){return T(C)===r}function F(C){return T(C)===b}function L(C){return T(C)===y}function W(C){return T(C)===t}function X(C){return T(C)===i}function U(C){return T(C)===o}function pe(C){return T(C)===f}oe.AsyncMode=m,oe.ConcurrentMode=I,oe.ContextConsumer=_,oe.ContextProvider=K,oe.Element=Z,oe.ForwardRef=R,oe.Fragment=G,oe.Lazy=q,oe.Memo=ee,oe.Portal=M,oe.Profiler=N,oe.StrictMode=$,oe.Suspense=B,oe.isAsyncMode=Q,oe.isConcurrentMode=v,oe.isContextConsumer=P,oe.isContextProvider=A,oe.isElement=z,oe.isForwardRef=j,oe.isFragment=V,oe.isLazy=F,oe.isMemo=L,oe.isPortal=W,oe.isProfiler=X,oe.isStrictMode=U,oe.isSuspense=pe,oe.isValidElementType=x,oe.typeOf=T}()),oe}var Dt;function Cr(){return Dt||(Dt=1,process.env.NODE_ENV==="production"?En.exports=Oo():En.exports=Co()),En.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var qn,Bt;function Po(){if(Bt)return qn;Bt=1;var e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var s={},c=0;c<10;c++)s["_"+String.fromCharCode(c)]=c;var l=Object.getOwnPropertyNames(s).map(function(d){return s[d]});if(l.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(d){u[d]=d}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return qn=o()?Object.assign:function(i,s){for(var c,l=r(i),u,d=1;d<arguments.length;d++){c=Object(arguments[d]);for(var f in c)n.call(c,f)&&(l[f]=c[f]);if(e){u=e(c);for(var p=0;p<u.length;p++)t.call(c,u[p])&&(l[u[p]]=c[u[p]])}}return l},qn}var Wn,Ft;function pt(){if(Ft)return Wn;Ft=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Wn=e,Wn}var Gn,Lt;function Pr(){return Lt||(Lt=1,Gn=Function.call.bind(Object.prototype.hasOwnProperty)),Gn}var Kn,Vt;function Ro(){if(Vt)return Kn;Vt=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var n=pt(),t={},r=Pr();e=function(i){var s="Warning: "+i;typeof console<"u"&&console.error(s);try{throw new Error(s)}catch{}}}function o(i,s,c,l,u){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var f;try{if(typeof i[d]!="function"){var p=Error((l||"React class")+": "+c+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw p.name="Invariant Violation",p}f=i[d](s,d,l,c,null,n)}catch(b){f=b}if(f&&!(f instanceof Error)&&e((l||"React class")+": type specification of "+c+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in t)){t[f.message]=!0;var y=u?u():"";e("Failed "+c+" type: "+f.message+(y??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(t={})},Kn=o,Kn}var Xn,zt;function No(){if(zt)return Xn;zt=1;var e=Cr(),n=Po(),t=pt(),r=Pr(),o=Ro(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(c){var l="Warning: "+c;typeof console<"u"&&console.error(l);try{throw new Error(l)}catch{}});function s(){return null}return Xn=function(c,l){var u=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function f(v){var P=v&&(u&&v[u]||v[d]);if(typeof P=="function")return P}var p="<<anonymous>>",y={array:k("array"),bigint:k("bigint"),bool:k("boolean"),func:k("function"),number:k("number"),object:k("object"),string:k("string"),symbol:k("symbol"),any:D(),arrayOf:x,element:T(),elementType:m(),instanceOf:I,node:R(),objectOf:K,oneOf:_,oneOfType:Z,shape:q,exact:ee};function b(v,P){return v===P?v!==0||1/v===1/P:v!==v&&P!==P}function g(v,P){this.message=v,this.data=P&&typeof P=="object"?P:{},this.stack=""}g.prototype=Error.prototype;function h(v){if(process.env.NODE_ENV!=="production")var P={},A=0;function z(V,F,L,W,X,U,pe){if(W=W||p,U=U||L,pe!==t){if(l){var C=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw C.name="Invariant Violation",C}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var H=W+":"+L;!P[H]&&A<3&&(i("You are manually calling a React.PropTypes validation function for the `"+U+"` prop on `"+W+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),P[H]=!0,A++)}}return F[L]==null?V?F[L]===null?new g("The "+X+" `"+U+"` is marked as required "+("in `"+W+"`, but its value is `null`.")):new g("The "+X+" `"+U+"` is marked as required in "+("`"+W+"`, but its value is `undefined`.")):null:v(F,L,W,X,U)}var j=z.bind(null,!1);return j.isRequired=z.bind(null,!0),j}function k(v){function P(A,z,j,V,F,L){var W=A[z],X=$(W);if(X!==v){var U=B(W);return new g("Invalid "+V+" `"+F+"` of type "+("`"+U+"` supplied to `"+j+"`, expected ")+("`"+v+"`."),{expectedType:v})}return null}return h(P)}function D(){return h(s)}function x(v){function P(A,z,j,V,F){if(typeof v!="function")return new g("Property `"+F+"` of component `"+j+"` has invalid PropType notation inside arrayOf.");var L=A[z];if(!Array.isArray(L)){var W=$(L);return new g("Invalid "+V+" `"+F+"` of type "+("`"+W+"` supplied to `"+j+"`, expected an array."))}for(var X=0;X<L.length;X++){var U=v(L,X,j,V,F+"["+X+"]",t);if(U instanceof Error)return U}return null}return h(P)}function T(){function v(P,A,z,j,V){var F=P[A];if(!c(F)){var L=$(F);return new g("Invalid "+j+" `"+V+"` of type "+("`"+L+"` supplied to `"+z+"`, expected a single ReactElement."))}return null}return h(v)}function m(){function v(P,A,z,j,V){var F=P[A];if(!e.isValidElementType(F)){var L=$(F);return new g("Invalid "+j+" `"+V+"` of type "+("`"+L+"` supplied to `"+z+"`, expected a single ReactElement type."))}return null}return h(v)}function I(v){function P(A,z,j,V,F){if(!(A[z]instanceof v)){var L=v.name||p,W=Q(A[z]);return new g("Invalid "+V+" `"+F+"` of type "+("`"+W+"` supplied to `"+j+"`, expected ")+("instance of `"+L+"`."))}return null}return h(P)}function _(v){if(!Array.isArray(v))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),s;function P(A,z,j,V,F){for(var L=A[z],W=0;W<v.length;W++)if(b(L,v[W]))return null;var X=JSON.stringify(v,function(pe,C){var H=B(C);return H==="symbol"?String(C):C});return new g("Invalid "+V+" `"+F+"` of value `"+String(L)+"` "+("supplied to `"+j+"`, expected one of "+X+"."))}return h(P)}function K(v){function P(A,z,j,V,F){if(typeof v!="function")return new g("Property `"+F+"` of component `"+j+"` has invalid PropType notation inside objectOf.");var L=A[z],W=$(L);if(W!=="object")return new g("Invalid "+V+" `"+F+"` of type "+("`"+W+"` supplied to `"+j+"`, expected an object."));for(var X in L)if(r(L,X)){var U=v(L,X,j,V,F+"."+X,t);if(U instanceof Error)return U}return null}return h(P)}function Z(v){if(!Array.isArray(v))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),s;for(var P=0;P<v.length;P++){var A=v[P];if(typeof A!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+ie(A)+" at index "+P+"."),s}function z(j,V,F,L,W){for(var X=[],U=0;U<v.length;U++){var pe=v[U],C=pe(j,V,F,L,W,t);if(C==null)return null;C.data&&r(C.data,"expectedType")&&X.push(C.data.expectedType)}var H=X.length>0?", expected one of type ["+X.join(", ")+"]":"";return new g("Invalid "+L+" `"+W+"` supplied to "+("`"+F+"`"+H+"."))}return h(z)}function R(){function v(P,A,z,j,V){return M(P[A])?null:new g("Invalid "+j+" `"+V+"` supplied to "+("`"+z+"`, expected a ReactNode."))}return h(v)}function G(v,P,A,z,j){return new g((v||"React class")+": "+P+" type `"+A+"."+z+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+j+"`.")}function q(v){function P(A,z,j,V,F){var L=A[z],W=$(L);if(W!=="object")return new g("Invalid "+V+" `"+F+"` of type `"+W+"` "+("supplied to `"+j+"`, expected `object`."));for(var X in v){var U=v[X];if(typeof U!="function")return G(j,V,F,X,B(U));var pe=U(L,X,j,V,F+"."+X,t);if(pe)return pe}return null}return h(P)}function ee(v){function P(A,z,j,V,F){var L=A[z],W=$(L);if(W!=="object")return new g("Invalid "+V+" `"+F+"` of type `"+W+"` "+("supplied to `"+j+"`, expected `object`."));var X=n({},A[z],v);for(var U in X){var pe=v[U];if(r(v,U)&&typeof pe!="function")return G(j,V,F,U,B(pe));if(!pe)return new g("Invalid "+V+" `"+F+"` key `"+U+"` supplied to `"+j+"`.\nBad object: "+JSON.stringify(A[z],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(v),null,"  "));var C=pe(L,U,j,V,F+"."+U,t);if(C)return C}return null}return h(P)}function M(v){switch(typeof v){case"number":case"string":case"undefined":return!0;case"boolean":return!v;case"object":if(Array.isArray(v))return v.every(M);if(v===null||c(v))return!0;var P=f(v);if(P){var A=P.call(v),z;if(P!==v.entries){for(;!(z=A.next()).done;)if(!M(z.value))return!1}else for(;!(z=A.next()).done;){var j=z.value;if(j&&!M(j[1]))return!1}}else return!1;return!0;default:return!1}}function N(v,P){return v==="symbol"?!0:P?P["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&P instanceof Symbol:!1}function $(v){var P=typeof v;return Array.isArray(v)?"array":v instanceof RegExp?"object":N(P,v)?"symbol":P}function B(v){if(typeof v>"u"||v===null)return""+v;var P=$(v);if(P==="object"){if(v instanceof Date)return"date";if(v instanceof RegExp)return"regexp"}return P}function ie(v){var P=B(v);switch(P){case"array":case"object":return"an "+P;case"boolean":case"date":case"regexp":return"a "+P;default:return P}}function Q(v){return!v.constructor||!v.constructor.name?p:v.constructor.name}return y.checkPropTypes=o,y.resetWarningCache=o.resetWarningCache,y.PropTypes=y,y},Xn}var Yn,Ut;function _o(){if(Ut)return Yn;Ut=1;var e=pt();function n(){}function t(){}return t.resetWarningCache=n,Yn=function(){function r(s,c,l,u,d,f){if(f!==e){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:t,resetWarningCache:n};return i.PropTypes=i,i},Yn}if(process.env.NODE_ENV!=="production"){var $o=Cr(),Mo=!0;st.exports=No()($o.isElement,Mo)}else st.exports=_o()();var Io=st.exports;const a=ko(Io);function Rr(e){var n,t,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(n=0;n<o;n++)e[n]&&(t=Rr(e[n]))&&(r&&(r+=" "),r+=t)}else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function Re(){for(var e,n,t=0,r="",o=arguments.length;t<o;t++)(e=arguments[t])&&(n=Rr(e))&&(r&&(r+=" "),r+=n);return r}function yn(e,n){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||n(...r)}}function Ie(e){if(typeof e!="object"||e===null)return!1;const n=Object.getPrototypeOf(e);return(n===null||n===Object.prototype||Object.getPrototypeOf(n)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Nr(e){if(!Ie(e))return e;const n={};return Object.keys(e).forEach(t=>{n[t]=Nr(e[t])}),n}function Te(e,n,t={clone:!0}){const r=t.clone?S({},e):e;return Ie(e)&&Ie(n)&&Object.keys(n).forEach(o=>{o!=="__proto__"&&(Ie(n[o])&&o in e&&Ie(e[o])?r[o]=Te(e[o],n[o],t):t.clone?r[o]=Ie(n[o])?Nr(n[o]):n[o]:r[o]=n[o])}),r}function Ao(e){const{prototype:n={}}=e;return!!n.isReactComponent}function _r(e,n,t,r,o){const i=e[n],s=o||n;if(i==null||typeof window>"u")return null;let c;const l=i.type;return typeof l=="function"&&!Ao(l)&&(c="Did you accidentally use a plain function component for an element instead?"),c!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${t}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const $r=yn(a.element,_r);$r.isRequired=yn(a.element.isRequired,_r);const In=$r;function jo(e){const{prototype:n={}}=e;return!!n.isReactComponent}function Do(e,n,t,r,o){const i=e[n],s=o||n;if(i==null||typeof window>"u")return null;let c;return typeof i=="function"&&!jo(i)&&(c="Did you accidentally provide a plain function component instead?"),c!==void 0?new Error(`Invalid ${r} \`${s}\` supplied to \`${t}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const Bo=yn(a.elementType,Do),Fo="exact-prop: ​";function Mr(e){return process.env.NODE_ENV==="production"?e:S({},e,{[Fo]:n=>{const t=Object.keys(n).filter(r=>!e.hasOwnProperty(r));return t.length>0?new Error(`The following props are not supported: ${t.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function tn(e){let n="https://mui.com/production-error/?code="+e;for(let t=1;t<arguments.length;t+=1)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified MUI error #"+e+"; visit "+n+" for the full message."}const Lo=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Vo(e){const n=`${e}`.match(Lo);return n&&n[1]||""}function Ir(e,n=""){return e.displayName||e.name||Vo(e)||n}function Ht(e,n,t){const r=Ir(n);return e.displayName||(r!==""?`${t}(${r})`:t)}function zo(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Ir(e,"Component");if(typeof e=="object")switch(e.$$typeof){case On.ForwardRef:return Ht(e,e.render,"ForwardRef");case On.Memo:return Ht(e,e.type,"memo");default:return}}}function hn(e,n,t,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[n],s=o||n;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${s}\` supplied to \`${t}\`. Expected an HTMLElement.`):null}const Uo=a.oneOfType([a.func,a.object]),Ho=Uo;function we(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":tn(7));return e.charAt(0).toUpperCase()+e.slice(1)}function qt(...e){return e.reduce((n,t)=>t==null?n:function(...o){n.apply(this,o),t.apply(this,o)},()=>{})}function qo(e,n=166){let t;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(t),t=setTimeout(i,n)}return r.clear=()=>{clearTimeout(t)},r}function ve(e){return e&&e.ownerDocument||document}function mn(e){return ve(e).defaultView||window}function at(e,n){typeof e=="function"?e(n):e&&(e.current=n)}const Wo=typeof window<"u"?O.useLayoutEffect:O.useEffect,Cn=Wo;function Wt(e){const n=O.useRef(e);return Cn(()=>{n.current=e}),O.useRef((...t)=>(0,n.current)(...t)).current}function Ae(...e){return O.useMemo(()=>e.every(n=>n==null)?null:n=>{e.forEach(t=>{at(t,n)})},e)}function Ar(e){const n=e.documentElement.clientWidth;return Math.abs(window.innerWidth-n)}function Go(e){const n=typeof e;switch(n){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return n}}function Ko(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Xo=Number.isInteger||Ko;function jr(e,n,t,r){const o=e[n];if(o==null||!Xo(o)){const i=Go(o);return new RangeError(`Invalid ${r} \`${n}\` of type \`${i}\` supplied to \`${t}\`, expected \`integer\`.`)}return null}function Dr(e,n,...t){return e[n]===void 0?null:jr(e,n,...t)}function ct(){return null}Dr.isRequired=jr;ct.isRequired=ct;const Br=process.env.NODE_ENV==="production"?ct:Dr;function Fr(e,n){const t=S({},n);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))t[r]=S({},e[r],t[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=n[r];t[r]={},!i||!Object.keys(i)?t[r]=o:!o||!Object.keys(o)?t[r]=i:(t[r]=S({},i),Object.keys(o).forEach(s=>{t[r][s]=Fr(o[s],i[s])}))}else t[r]===void 0&&(t[r]=e[r])}),t}function He(e,n,t=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,s)=>{if(s){const c=n(s);c!==""&&i.push(c),t&&t[s]&&i.push(t[s])}return i},[]).join(" ")}),r}const Gt=e=>e,Yo=()=>{let e=Gt;return{configure(n){e=n},generate(n){return e(n)},reset(){e=Gt}}},Jo=Yo(),Zo=Jo,Qo={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function _e(e,n,t="Mui"){const r=Qo[n];return r?`${t}-${r}`:`${Zo.generate(e)}-${n}`}function qe(e,n,t="Mui"){const r={};return n.forEach(o=>{r[o]=_e(e,o,t)}),r}function ei(e,n=Number.MIN_SAFE_INTEGER,t=Number.MAX_SAFE_INTEGER){return Math.max(n,Math.min(e,t))}function Lr(e){return typeof e=="string"}function ni(e,n,t){return e===void 0||Lr(e)?n:S({},n,{ownerState:S({},n.ownerState,t)})}function Vr(e,n=[]){if(e===void 0)return{};const t={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!n.includes(r)).forEach(r=>{t[r]=e[r]}),t}function ti(e,n,t){return typeof e=="function"?e(n,t):e}function zr(e){var n,t,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(n=0;n<o;n++)e[n]&&(t=zr(e[n]))&&(r&&(r+=" "),r+=t)}else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function Kt(){for(var e,n,t=0,r="",o=arguments.length;t<o;t++)(e=arguments[t])&&(n=zr(e))&&(r&&(r+=" "),r+=n);return r}function Xt(e){if(e===void 0)return{};const n={};return Object.keys(e).filter(t=>!(t.match(/^on[A-Z]/)&&typeof e[t]=="function")).forEach(t=>{n[t]=e[t]}),n}function ri(e){const{getSlotProps:n,additionalProps:t,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!n){const y=Kt(t==null?void 0:t.className,i,o==null?void 0:o.className,r==null?void 0:r.className),b=S({},t==null?void 0:t.style,o==null?void 0:o.style,r==null?void 0:r.style),g=S({},t,o,r);return y.length>0&&(g.className=y),Object.keys(b).length>0&&(g.style=b),{props:g,internalRef:void 0}}const s=Vr(S({},o,r)),c=Xt(r),l=Xt(o),u=n(s),d=Kt(u==null?void 0:u.className,t==null?void 0:t.className,i,o==null?void 0:o.className,r==null?void 0:r.className),f=S({},u==null?void 0:u.style,t==null?void 0:t.style,o==null?void 0:o.style,r==null?void 0:r.style),p=S({},u,t,l,c);return d.length>0&&(p.className=d),Object.keys(f).length>0&&(p.style=f),{props:p,internalRef:u.ref}}const oi=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function rn(e){var n;const{elementType:t,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,s=le(e,oi),c=i?{}:ti(r,o),{props:l,internalRef:u}=ri(S({},s,{externalSlotProps:c})),d=Ae(u,c==null?void 0:c.ref,(n=e.additionalProps)==null?void 0:n.ref);return ni(t,S({},l,{ref:d}),o)}const ii=["values","unit","step"],si=e=>{const n=Object.keys(e).map(t=>({key:t,val:e[t]}))||[];return n.sort((t,r)=>t.val-r.val),n.reduce((t,r)=>S({},t,{[r.key]:r.val}),{})};function ai(e){const{values:n={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:t="px",step:r=5}=e,o=le(e,ii),i=si(n),s=Object.keys(i);function c(p){return`@media (min-width:${typeof n[p]=="number"?n[p]:p}${t})`}function l(p){return`@media (max-width:${(typeof n[p]=="number"?n[p]:p)-r/100}${t})`}function u(p,y){const b=s.indexOf(y);return`@media (min-width:${typeof n[p]=="number"?n[p]:p}${t}) and (max-width:${(b!==-1&&typeof n[s[b]]=="number"?n[s[b]]:y)-r/100}${t})`}function d(p){return s.indexOf(p)+1<s.length?u(p,s[s.indexOf(p)+1]):c(p)}function f(p){const y=s.indexOf(p);return y===0?c(s[1]):y===s.length-1?l(s[y]):u(p,s[s.indexOf(p)+1]).replace("@media","@media not all and")}return S({keys:s,values:i,up:c,down:l,between:u,only:d,not:f,unit:t},o)}const ci={borderRadius:4},li=ci,ui=process.env.NODE_ENV!=="production"?a.oneOfType([a.number,a.string,a.object,a.array]):{},je=ui;function fn(e,n){return n?Te(e,n,{clone:!1}):e}const ht={xs:0,sm:600,md:900,lg:1200,xl:1536},Yt={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${ht[e]}px)`};function Ne(e,n,t){const r=e.theme||{};if(Array.isArray(n)){const i=r.breakpoints||Yt;return n.reduce((s,c,l)=>(s[i.up(i.keys[l])]=t(n[l]),s),{})}if(typeof n=="object"){const i=r.breakpoints||Yt;return Object.keys(n).reduce((s,c)=>{if(Object.keys(i.values||ht).indexOf(c)!==-1){const l=i.up(c);s[l]=t(n[c],c)}else{const l=c;s[l]=n[l]}return s},{})}return t(n)}function di(e={}){var n;return((n=e.keys)==null?void 0:n.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function fi(e,n){return e.reduce((t,r)=>{const o=t[r];return(!o||Object.keys(o).length===0)&&delete t[r],t},n)}function An(e,n,t=!0){if(!n||typeof n!="string")return null;if(e&&e.vars&&t){const r=`vars.${n}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return n.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Pn(e,n,t,r=t){let o;return typeof e=="function"?o=e(t):Array.isArray(e)?o=e[t]||r:o=An(e,t)||r,n&&(o=n(o,r,e)),o}function fe(e){const{prop:n,cssProperty:t=e.prop,themeKey:r,transform:o}=e,i=s=>{if(s[n]==null)return null;const c=s[n],l=s.theme,u=An(l,r)||{};return Ne(s,c,f=>{let p=Pn(u,o,f);return f===p&&typeof f=="string"&&(p=Pn(u,o,`${n}${f==="default"?"":we(f)}`,f)),t===!1?p:{[t]:p}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[n]:je}:{},i.filterProps=[n],i}function pi(e){const n={};return t=>(n[t]===void 0&&(n[t]=e(t)),n[t])}const hi={m:"margin",p:"padding"},mi={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Jt={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},gi=pi(e=>{if(e.length>2)if(Jt[e])e=Jt[e];else return[e];const[n,t]=e.split(""),r=hi[n],o=mi[t]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),jn=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],Dn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],bi=[...jn,...Dn];function vn(e,n,t,r){var o;const i=(o=An(e,n,!1))!=null?o:t;return typeof i=="number"?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&typeof s!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`),i*s):Array.isArray(i)?s=>typeof s=="string"?s:(process.env.NODE_ENV!=="production"&&(Number.isInteger(s)?s>i.length-1&&console.error([`MUI: The value provided (${s}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${s} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))),i[s]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${n}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function Ur(e){return vn(e,"spacing",8,"spacing")}function xn(e,n){if(typeof n=="string"||n==null)return n;const t=Math.abs(n),r=e(t);return n>=0?r:typeof r=="number"?-r:`-${r}`}function yi(e,n){return t=>e.reduce((r,o)=>(r[o]=xn(n,t),r),{})}function vi(e,n,t,r){if(n.indexOf(t)===-1)return null;const o=gi(t),i=yi(o,r),s=e[t];return Ne(e,s,i)}function Hr(e,n){const t=Ur(e.theme);return Object.keys(e).map(r=>vi(e,n,r,t)).reduce(fn,{})}function ue(e){return Hr(e,jn)}ue.propTypes=process.env.NODE_ENV!=="production"?jn.reduce((e,n)=>(e[n]=je,e),{}):{};ue.filterProps=jn;function de(e){return Hr(e,Dn)}de.propTypes=process.env.NODE_ENV!=="production"?Dn.reduce((e,n)=>(e[n]=je,e),{}):{};de.filterProps=Dn;process.env.NODE_ENV!=="production"&&bi.reduce((e,n)=>(e[n]=je,e),{});function xi(e=8){if(e.mui)return e;const n=Ur({spacing:e}),t=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const s=n(i);return typeof s=="number"?`${s}px`:s}).join(" "));return t.mui=!0,t}function Bn(...e){const n=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),t=r=>Object.keys(r).reduce((o,i)=>n[i]?fn(o,n[i](r)):o,{});return t.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},t.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),t}function be(e){return typeof e!="number"?e:`${e}px solid`}function xe(e,n){return fe({prop:e,themeKey:"borders",transform:n})}const Ei=xe("border",be),Ti=xe("borderTop",be),ki=xe("borderRight",be),Si=xe("borderBottom",be),wi=xe("borderLeft",be),Oi=xe("borderColor"),Ci=xe("borderTopColor"),Pi=xe("borderRightColor"),Ri=xe("borderBottomColor"),Ni=xe("borderLeftColor"),_i=xe("outline",be),$i=xe("outlineColor"),Fn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const n=vn(e.theme,"shape.borderRadius",4,"borderRadius"),t=r=>({borderRadius:xn(n,r)});return Ne(e,e.borderRadius,t)}return null};Fn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:je}:{};Fn.filterProps=["borderRadius"];Bn(Ei,Ti,ki,Si,wi,Oi,Ci,Pi,Ri,Ni,Fn,_i,$i);const Ln=e=>{if(e.gap!==void 0&&e.gap!==null){const n=vn(e.theme,"spacing",8,"gap"),t=r=>({gap:xn(n,r)});return Ne(e,e.gap,t)}return null};Ln.propTypes=process.env.NODE_ENV!=="production"?{gap:je}:{};Ln.filterProps=["gap"];const Vn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const n=vn(e.theme,"spacing",8,"columnGap"),t=r=>({columnGap:xn(n,r)});return Ne(e,e.columnGap,t)}return null};Vn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:je}:{};Vn.filterProps=["columnGap"];const zn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const n=vn(e.theme,"spacing",8,"rowGap"),t=r=>({rowGap:xn(n,r)});return Ne(e,e.rowGap,t)}return null};zn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:je}:{};zn.filterProps=["rowGap"];const Mi=fe({prop:"gridColumn"}),Ii=fe({prop:"gridRow"}),Ai=fe({prop:"gridAutoFlow"}),ji=fe({prop:"gridAutoColumns"}),Di=fe({prop:"gridAutoRows"}),Bi=fe({prop:"gridTemplateColumns"}),Fi=fe({prop:"gridTemplateRows"}),Li=fe({prop:"gridTemplateAreas"}),Vi=fe({prop:"gridArea"});Bn(Ln,Vn,zn,Mi,Ii,Ai,ji,Di,Bi,Fi,Li,Vi);function nn(e,n){return n==="grey"?n:e}const zi=fe({prop:"color",themeKey:"palette",transform:nn}),Ui=fe({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:nn}),Hi=fe({prop:"backgroundColor",themeKey:"palette",transform:nn});Bn(zi,Ui,Hi);function me(e){return e<=1&&e!==0?`${e*100}%`:e}const qi=fe({prop:"width",transform:me}),mt=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const n=t=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[t])||ht[t];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:me(t)}};return Ne(e,e.maxWidth,n)}return null};mt.filterProps=["maxWidth"];const Wi=fe({prop:"minWidth",transform:me}),Gi=fe({prop:"height",transform:me}),Ki=fe({prop:"maxHeight",transform:me}),Xi=fe({prop:"minHeight",transform:me});fe({prop:"size",cssProperty:"width",transform:me});fe({prop:"size",cssProperty:"height",transform:me});const Yi=fe({prop:"boxSizing"});Bn(qi,mt,Wi,Gi,Ki,Xi,Yi);const Ji={border:{themeKey:"borders",transform:be},borderTop:{themeKey:"borders",transform:be},borderRight:{themeKey:"borders",transform:be},borderBottom:{themeKey:"borders",transform:be},borderLeft:{themeKey:"borders",transform:be},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:be},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Fn},color:{themeKey:"palette",transform:nn},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:nn},backgroundColor:{themeKey:"palette",transform:nn},p:{style:de},pt:{style:de},pr:{style:de},pb:{style:de},pl:{style:de},px:{style:de},py:{style:de},padding:{style:de},paddingTop:{style:de},paddingRight:{style:de},paddingBottom:{style:de},paddingLeft:{style:de},paddingX:{style:de},paddingY:{style:de},paddingInline:{style:de},paddingInlineStart:{style:de},paddingInlineEnd:{style:de},paddingBlock:{style:de},paddingBlockStart:{style:de},paddingBlockEnd:{style:de},m:{style:ue},mt:{style:ue},mr:{style:ue},mb:{style:ue},ml:{style:ue},mx:{style:ue},my:{style:ue},margin:{style:ue},marginTop:{style:ue},marginRight:{style:ue},marginBottom:{style:ue},marginLeft:{style:ue},marginX:{style:ue},marginY:{style:ue},marginInline:{style:ue},marginInlineStart:{style:ue},marginInlineEnd:{style:ue},marginBlock:{style:ue},marginBlockStart:{style:ue},marginBlockEnd:{style:ue},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Ln},rowGap:{style:zn},columnGap:{style:Vn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:me},maxWidth:{style:mt},minWidth:{transform:me},height:{transform:me},maxHeight:{transform:me},minHeight:{transform:me},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},gt=Ji;function Zi(...e){const n=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),t=new Set(n);return e.every(r=>t.size===Object.keys(r).length)}function Qi(e,n){return typeof e=="function"?e(n):e}function es(){function e(t,r,o,i){const s={[t]:r,theme:o},c=i[t];if(!c)return{[t]:r};const{cssProperty:l=t,themeKey:u,transform:d,style:f}=c;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[t]:r};const p=An(o,u)||{};return f?f(s):Ne(s,r,b=>{let g=Pn(p,d,b);return b===g&&typeof b=="string"&&(g=Pn(p,d,`${t}${b==="default"?"":we(b)}`,b)),l===!1?g:{[l]:g}})}function n(t){var r;const{sx:o,theme:i={}}=t||{};if(!o)return null;const s=(r=i.unstable_sxConfig)!=null?r:gt;function c(l){let u=l;if(typeof l=="function")u=l(i);else if(typeof l!="object")return l;if(!u)return null;const d=di(i.breakpoints),f=Object.keys(d);let p=d;return Object.keys(u).forEach(y=>{const b=Qi(u[y],i);if(b!=null)if(typeof b=="object")if(s[y])p=fn(p,e(y,b,i,s));else{const g=Ne({theme:i},b,h=>({[y]:h}));Zi(g,b)?p[y]=n({sx:b,theme:i}):p=fn(p,g)}else p=fn(p,e(y,b,i,s))}),fi(f,p)}return Array.isArray(o)?o.map(c):c(o)}return n}const qr=es();qr.filterProps=["sx"];const bt=qr,ns=["breakpoints","palette","spacing","shape"];function yt(e={},...n){const{breakpoints:t={},palette:r={},spacing:o,shape:i={}}=e,s=le(e,ns),c=ai(t),l=xi(o);let u=Te({breakpoints:c,direction:"ltr",components:{},palette:S({mode:"light"},r),spacing:l,shape:S({},li,i)},s);return u=n.reduce((d,f)=>Te(d,f),u),u.unstable_sxConfig=S({},gt,s==null?void 0:s.unstable_sxConfig),u.unstable_sx=function(f){return bt({sx:f,theme:this})},u}function ts(e){return Object.keys(e).length===0}function rs(e=null){const n=O.useContext(ot.ThemeContext);return!n||ts(n)?e:n}const os=yt();function Wr(e=os){return rs(e)}const is=["variant"];function Zt(e){return e.length===0}function Gr(e){const{variant:n}=e,t=le(e,is);let r=n||"";return Object.keys(t).sort().forEach(o=>{o==="color"?r+=Zt(r)?e[o]:we(e[o]):r+=`${Zt(r)?o:we(o)}${we(e[o].toString())}`}),r}const ss=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function as(e){return Object.keys(e).length===0}function cs(e){return typeof e=="string"&&e.charCodeAt(0)>96}const ls=(e,n)=>n.components&&n.components[e]&&n.components[e].styleOverrides?n.components[e].styleOverrides:null,Rn=e=>{let n=0;const t={};return e&&e.forEach(r=>{let o="";typeof r.props=="function"?(o=`callback${n}`,n+=1):o=Gr(r.props),t[o]=r.style}),t},us=(e,n)=>{let t=[];return n&&n.components&&n.components[e]&&n.components[e].variants&&(t=n.components[e].variants),Rn(t)},Nn=(e,n,t)=>{const{ownerState:r={}}=e,o=[];let i=0;return t&&t.forEach(s=>{let c=!0;if(typeof s.props=="function"){const l=S({},e,r);c=s.props(l)}else Object.keys(s.props).forEach(l=>{r[l]!==s.props[l]&&e[l]!==s.props[l]&&(c=!1)});c&&(typeof s.props=="function"?o.push(n[`callback${i}`]):o.push(n[Gr(s.props)])),typeof s.props=="function"&&(i+=1)}),o},ds=(e,n,t,r)=>{var o;const i=t==null||(o=t.components)==null||(o=o[r])==null?void 0:o.variants;return Nn(e,n,i)};function Tn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const fs=yt(),Qt=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function kn({defaultTheme:e,theme:n,themeId:t}){return as(n)?e:n[t]||n}function ps(e){return e?(n,t)=>t[e]:null}const er=({styledArg:e,props:n,defaultTheme:t,themeId:r})=>{const o=e(S({},n,{theme:kn(S({},n,{defaultTheme:t,themeId:r}))}));let i;if(o&&o.variants&&(i=o.variants,delete o.variants),i){const s=Nn(n,Rn(i),i);return[o,...s]}return o};function hs(e={}){const{themeId:n,defaultTheme:t=fs,rootShouldForwardProp:r=Tn,slotShouldForwardProp:o=Tn}=e,i=s=>bt(S({},s,{theme:kn(S({},s,{defaultTheme:t,themeId:n}))}));return i.__mui_systemSx=!0,(s,c={})=>{ot.internal_processStyles(s,T=>T.filter(m=>!(m!=null&&m.__mui_systemSx)));const{name:l,slot:u,skipVariantsResolver:d,skipSx:f,overridesResolver:p=ps(Qt(u))}=c,y=le(c,ss),b=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,g=f||!1;let h;process.env.NODE_ENV!=="production"&&l&&(h=`${l}-${Qt(u||"Root")}`);let k=Tn;u==="Root"||u==="root"?k=r:u?k=o:cs(s)&&(k=void 0);const D=ot(s,S({shouldForwardProp:k,label:h},y)),x=(T,...m)=>{const I=m?m.map(R=>{if(typeof R=="function"&&R.__emotion_real!==R)return G=>er({styledArg:R,props:G,defaultTheme:t,themeId:n});if(Ie(R)){let G=R,q;return R&&R.variants&&(q=R.variants,delete G.variants,G=ee=>{let M=R;return Nn(ee,Rn(q),q).forEach($=>{M=Te(M,$)}),M}),G}return R}):[];let _=T;if(Ie(T)){let R;T&&T.variants&&(R=T.variants,delete _.variants,_=G=>{let q=T;return Nn(G,Rn(R),R).forEach(M=>{q=Te(q,M)}),q})}else typeof T=="function"&&T.__emotion_real!==T&&(_=R=>er({styledArg:T,props:R,defaultTheme:t,themeId:n}));l&&p&&I.push(R=>{const G=kn(S({},R,{defaultTheme:t,themeId:n})),q=ls(l,G);if(q){const ee={};return Object.entries(q).forEach(([M,N])=>{ee[M]=typeof N=="function"?N(S({},R,{theme:G})):N}),p(R,ee)}return null}),l&&!b&&I.push(R=>{const G=kn(S({},R,{defaultTheme:t,themeId:n}));return ds(R,us(l,G),G,l)}),g||I.push(i);const K=I.length-m.length;if(Array.isArray(T)&&K>0){const R=new Array(K).fill("");_=[...T,...R],_.raw=[...T.raw,...R]}const Z=D(_,...I);if(process.env.NODE_ENV!=="production"){let R;l&&(R=`${l}${we(u||"")}`),R===void 0&&(R=`Styled(${zo(s)})`),Z.displayName=R}return s.muiName&&(Z.muiName=s.muiName),Z};return D.withConfig&&(x.withConfig=D.withConfig),x}}function ms(e){const{theme:n,name:t,props:r}=e;return!n||!n.components||!n.components[t]||!n.components[t].defaultProps?r:Fr(n.components[t].defaultProps,r)}function gs({props:e,name:n,defaultTheme:t,themeId:r}){let o=Wr(t);return r&&(o=o[r]||o),ms({theme:o,name:n,props:e})}function vt(e,n=0,t=1){return process.env.NODE_ENV!=="production"&&(e<n||e>t)&&console.error(`MUI: The value provided ${e} is out of range [${n}, ${t}].`),ei(e,n,t)}function bs(e){e=e.slice(1);const n=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let t=e.match(n);return t&&t[0].length===1&&(t=t.map(r=>r+r)),t?`rgb${t.length===4?"a":""}(${t.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function ze(e){if(e.type)return e;if(e.charAt(0)==="#")return ze(bs(e));const n=e.indexOf("("),t=e.substring(0,n);if(["rgb","rgba","hsl","hsla","color"].indexOf(t)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:tn(9,e));let r=e.substring(n+1,e.length-1),o;if(t==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:tn(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:t,values:r,colorSpace:o}}function Un(e){const{type:n,colorSpace:t}=e;let{values:r}=e;return n.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):n.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),n.indexOf("color")!==-1?r=`${t} ${r.join(" ")}`:r=`${r.join(", ")}`,`${n}(${r})`}function ys(e){e=ze(e);const{values:n}=e,t=n[0],r=n[1]/100,o=n[2]/100,i=r*Math.min(o,1-o),s=(u,d=(u+t/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let c="rgb";const l=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(c+="a",l.push(n[3])),Un({type:c,values:l})}function nr(e){e=ze(e);let n=e.type==="hsl"||e.type==="hsla"?ze(ys(e)).values:e.values;return n=n.map(t=>(e.type!=="color"&&(t/=255),t<=.03928?t/12.92:((t+.055)/1.055)**2.4)),Number((.2126*n[0]+.7152*n[1]+.0722*n[2]).toFixed(3))}function tr(e,n){const t=nr(e),r=nr(n);return(Math.max(t,r)+.05)/(Math.min(t,r)+.05)}function rr(e,n){return e=ze(e),n=vt(n),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${n}`:e.values[3]=n,Un(e)}function vs(e,n){if(e=ze(e),n=vt(n),e.type.indexOf("hsl")!==-1)e.values[2]*=1-n;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]*=1-n;return Un(e)}function xs(e,n){if(e=ze(e),n=vt(n),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*n;else if(e.type.indexOf("rgb")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(255-e.values[t])*n;else if(e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(1-e.values[t])*n;return Un(e)}function Es(e,n){return S({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},n)}const Ts={black:"#000",white:"#fff"},gn=Ts,ks={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},Ss=ks,ws={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ke=ws,Os={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Xe=Os,Cs={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},an=Cs,Ps={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Ye=Ps,Rs={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Je=Rs,Ns={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Ze=Ns,_s=["mode","contrastThreshold","tonalOffset"],or={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:gn.white,default:gn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Jn={text:{primary:gn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:gn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function ir(e,n,t,r){const o=r.light||r,i=r.dark||r*1.5;e[n]||(e.hasOwnProperty(t)?e[n]=e[t]:n==="light"?e.light=xs(e.main,o):n==="dark"&&(e.dark=vs(e.main,i)))}function $s(e="light"){return e==="dark"?{main:Ye[200],light:Ye[50],dark:Ye[400]}:{main:Ye[700],light:Ye[400],dark:Ye[800]}}function Ms(e="light"){return e==="dark"?{main:Ke[200],light:Ke[50],dark:Ke[400]}:{main:Ke[500],light:Ke[300],dark:Ke[700]}}function Is(e="light"){return e==="dark"?{main:Xe[500],light:Xe[300],dark:Xe[700]}:{main:Xe[700],light:Xe[400],dark:Xe[800]}}function As(e="light"){return e==="dark"?{main:Je[400],light:Je[300],dark:Je[700]}:{main:Je[700],light:Je[500],dark:Je[900]}}function js(e="light"){return e==="dark"?{main:Ze[400],light:Ze[300],dark:Ze[700]}:{main:Ze[800],light:Ze[500],dark:Ze[900]}}function Ds(e="light"){return e==="dark"?{main:an[400],light:an[300],dark:an[700]}:{main:"#ed6c02",light:an[500],dark:an[900]}}function Bs(e){const{mode:n="light",contrastThreshold:t=3,tonalOffset:r=.2}=e,o=le(e,_s),i=e.primary||$s(n),s=e.secondary||Ms(n),c=e.error||Is(n),l=e.info||As(n),u=e.success||js(n),d=e.warning||Ds(n);function f(g){const h=tr(g,Jn.text.primary)>=t?Jn.text.primary:or.text.primary;if(process.env.NODE_ENV!=="production"){const k=tr(g,h);k<3&&console.error([`MUI: The contrast ratio of ${k}:1 for ${h} on ${g}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const p=({color:g,name:h,mainShade:k=500,lightShade:D=300,darkShade:x=700})=>{if(g=S({},g),!g.main&&g[k]&&(g.main=g[k]),!g.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.`:tn(11,h?` (${h})`:"",k));if(typeof g.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:tn(12,h?` (${h})`:"",JSON.stringify(g.main)));return ir(g,"light",D,r),ir(g,"dark",x,r),g.contrastText||(g.contrastText=f(g.main)),g},y={dark:Jn,light:or};return process.env.NODE_ENV!=="production"&&(y[n]||console.error(`MUI: The palette mode \`${n}\` is not supported.`)),Te(S({common:S({},gn),mode:n,primary:p({color:i,name:"primary"}),secondary:p({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:p({color:c,name:"error"}),warning:p({color:d,name:"warning"}),info:p({color:l,name:"info"}),success:p({color:u,name:"success"}),grey:Ss,contrastThreshold:t,getContrastText:f,augmentColor:p,tonalOffset:r},y[n]),o)}const Fs=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Ls(e){return Math.round(e*1e5)/1e5}const sr={textTransform:"uppercase"},ar='"Roboto", "Helvetica", "Arial", sans-serif';function Vs(e,n){const t=typeof n=="function"?n(e):n,{fontFamily:r=ar,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:s=400,fontWeightMedium:c=500,fontWeightBold:l=700,htmlFontSize:u=16,allVariants:d,pxToRem:f}=t,p=le(t,Fs);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const y=o/14,b=f||(k=>`${k/u*y}rem`),g=(k,D,x,T,m)=>S({fontFamily:r,fontWeight:k,fontSize:b(D),lineHeight:x},r===ar?{letterSpacing:`${Ls(T/D)}em`}:{},m,d),h={h1:g(i,96,1.167,-1.5),h2:g(i,60,1.2,-.5),h3:g(s,48,1.167,0),h4:g(s,34,1.235,.25),h5:g(s,24,1.334,0),h6:g(c,20,1.6,.15),subtitle1:g(s,16,1.75,.15),subtitle2:g(c,14,1.57,.1),body1:g(s,16,1.5,.15),body2:g(s,14,1.43,.15),button:g(c,14,1.75,.4,sr),caption:g(s,12,1.66,.4),overline:g(s,12,2.66,1,sr),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Te(S({htmlFontSize:u,pxToRem:b,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:s,fontWeightMedium:c,fontWeightBold:l},h),p,{clone:!1})}const zs=.2,Us=.14,Hs=.12;function ce(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${zs})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Us})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Hs})`].join(",")}const qs=["none",ce(0,2,1,-1,0,1,1,0,0,1,3,0),ce(0,3,1,-2,0,2,2,0,0,1,5,0),ce(0,3,3,-2,0,3,4,0,0,1,8,0),ce(0,2,4,-1,0,4,5,0,0,1,10,0),ce(0,3,5,-1,0,5,8,0,0,1,14,0),ce(0,3,5,-1,0,6,10,0,0,1,18,0),ce(0,4,5,-2,0,7,10,1,0,2,16,1),ce(0,5,5,-3,0,8,10,1,0,3,14,2),ce(0,5,6,-3,0,9,12,1,0,3,16,2),ce(0,6,6,-3,0,10,14,1,0,4,18,3),ce(0,6,7,-4,0,11,15,1,0,4,20,3),ce(0,7,8,-4,0,12,17,2,0,5,22,4),ce(0,7,8,-4,0,13,19,2,0,5,24,4),ce(0,7,9,-4,0,14,21,2,0,5,26,4),ce(0,8,9,-5,0,15,22,2,0,6,28,5),ce(0,8,10,-5,0,16,24,2,0,6,30,5),ce(0,8,11,-5,0,17,26,2,0,6,32,5),ce(0,9,11,-5,0,18,28,2,0,7,34,6),ce(0,9,12,-6,0,19,29,2,0,7,36,6),ce(0,10,13,-6,0,20,31,3,0,8,38,7),ce(0,10,13,-6,0,21,33,3,0,8,40,7),ce(0,10,14,-6,0,22,35,3,0,8,42,7),ce(0,11,14,-7,0,23,36,3,0,9,44,8),ce(0,11,15,-7,0,24,38,3,0,9,46,8)],Ws=qs,Gs=["duration","easing","delay"],Ks={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Xs={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function cr(e){return`${Math.round(e)}ms`}function Ys(e){if(!e)return 0;const n=e/36;return Math.round((4+15*n**.25+n/5)*10)}function Js(e){const n=S({},Ks,e.easing),t=S({},Xs,e.duration);return S({getAutoHeightDuration:Ys,create:(o=["all"],i={})=>{const{duration:s=t.standard,easing:c=n.easeInOut,delay:l=0}=i,u=le(i,Gs);if(process.env.NODE_ENV!=="production"){const d=p=>typeof p=="string",f=p=>!isNaN(parseFloat(p));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!f(s)&&!d(s)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`),d(c)||console.error('MUI: Argument "easing" must be a string.'),!f(l)&&!d(l)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof s=="string"?s:cr(s)} ${c} ${typeof l=="string"?l:cr(l)}`).join(",")}},e,{easing:n,duration:t})}const Zs={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},Qs=Zs,ea=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function na(e={},...n){const{mixins:t={},palette:r={},transitions:o={},typography:i={}}=e,s=le(e,ea);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":tn(18));const c=Bs(r),l=yt(e);let u=Te(l,{mixins:Es(l.breakpoints,t),palette:c,shadows:Ws.slice(),typography:Vs(c,i),transitions:Js(o),zIndex:S({},Qs),applyDarkStyles(d){return this.vars?{[this.getColorSchemeSelector("dark").replace(/(\[[^\]]+\])/,":where($1)")]:d}:this.palette.mode==="dark"?d:{}}});if(u=Te(u,s),u=n.reduce((d,f)=>Te(d,f),u),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],f=(p,y)=>{let b;for(b in p){const g=p[b];if(d.indexOf(b)!==-1&&Object.keys(g).length>0){if(process.env.NODE_ENV!=="production"){const h=_e("",b);console.error([`MUI: The \`${y}\` component increases the CSS specificity of the \`${b}\` internal state.`,"You can not override it like this: ",JSON.stringify(p,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:g}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}p[b]={}}}};Object.keys(u.components).forEach(p=>{const y=u.components[p].styleOverrides;y&&p.indexOf("Mui")===0&&f(y,p)})}return u.unstable_sxConfig=S({},gt,s==null?void 0:s.unstable_sxConfig),u.unstable_sx=function(f){return bt({sx:f,theme:this})},u}const ta=na(),xt=ta,Et="$$material",Kr=e=>Tn(e)&&e!=="classes",ra=hs({themeId:Et,defaultTheme:xt,rootShouldForwardProp:Kr}),ke=ra;function We({props:e,name:n}){return gs({props:e,name:n,defaultTheme:xt,themeId:Et})}const Xr=O.createContext({});process.env.NODE_ENV!=="production"&&(Xr.displayName="ListContext");const oa=Xr;function ia(e){return _e("MuiList",e)}qe("MuiList",["root","padding","dense","subheader"]);const sa=["children","className","component","dense","disablePadding","subheader"],aa=e=>{const{classes:n,disablePadding:t,dense:r,subheader:o}=e;return He({root:["root",!t&&"padding",r&&"dense",o&&"subheader"]},ia,n)},ca=ke("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,!t.disablePadding&&n.padding,t.dense&&n.dense,t.subheader&&n.subheader]}})(({ownerState:e})=>S({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Yr=O.forwardRef(function(n,t){const r=We({props:n,name:"MuiList"}),{children:o,className:i,component:s="ul",dense:c=!1,disablePadding:l=!1,subheader:u}=r,d=le(r,sa),f=O.useMemo(()=>({dense:c}),[c]),p=S({},r,{component:s,dense:c,disablePadding:l}),y=aa(p);return E.jsx(oa.Provider,{value:f,children:E.jsxs(ca,S({as:s,className:Re(y.root,i),ref:t,ownerState:p},d,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(Yr.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,dense:a.bool,disablePadding:a.bool,subheader:a.node,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object])});const la=Yr,ua=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Zn(e,n,t){return e===n?e.firstChild:n&&n.nextElementSibling?n.nextElementSibling:t?null:e.firstChild}function lr(e,n,t){return e===n?t?e.firstChild:e.lastChild:n&&n.previousElementSibling?n.previousElementSibling:t?null:e.lastChild}function Jr(e,n){if(n===void 0)return!0;let t=e.innerText;return t===void 0&&(t=e.textContent),t=t.trim().toLowerCase(),t.length===0?!1:n.repeating?t[0]===n.keys[0]:t.indexOf(n.keys.join(""))===0}function cn(e,n,t,r,o,i){let s=!1,c=o(e,n,n?t:!1);for(;c;){if(c===e.firstChild){if(s)return!1;s=!0}const l=r?!1:c.disabled||c.getAttribute("aria-disabled")==="true";if(!c.hasAttribute("tabindex")||!Jr(c,i)||l)c=o(e,c,t);else return c.focus(),!0}return!1}const Zr=O.forwardRef(function(n,t){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:s,className:c,disabledItemsFocusable:l=!1,disableListWrap:u=!1,onKeyDown:d,variant:f="selectedMenu"}=n,p=le(n,ua),y=O.useRef(null),b=O.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Cn(()=>{o&&y.current.focus()},[o]),O.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,T)=>{const m=!y.current.style.width;if(x.clientHeight<y.current.clientHeight&&m){const I=`${Ar(ve(x))}px`;y.current.style[T.direction==="rtl"?"paddingLeft":"paddingRight"]=I,y.current.style.width=`calc(100% + ${I})`}return y.current}}),[]);const g=x=>{const T=y.current,m=x.key,I=ve(T).activeElement;if(m==="ArrowDown")x.preventDefault(),cn(T,I,u,l,Zn);else if(m==="ArrowUp")x.preventDefault(),cn(T,I,u,l,lr);else if(m==="Home")x.preventDefault(),cn(T,null,u,l,Zn);else if(m==="End")x.preventDefault(),cn(T,null,u,l,lr);else if(m.length===1){const _=b.current,K=m.toLowerCase(),Z=performance.now();_.keys.length>0&&(Z-_.lastTime>500?(_.keys=[],_.repeating=!0,_.previousKeyMatched=!0):_.repeating&&K!==_.keys[0]&&(_.repeating=!1)),_.lastTime=Z,_.keys.push(K);const R=I&&!_.repeating&&Jr(I,_);_.previousKeyMatched&&(R||cn(T,I,!1,l,Zn,_))?x.preventDefault():_.previousKeyMatched=!1}d&&d(x)},h=Ae(y,t);let k=-1;O.Children.forEach(s,(x,T)=>{if(!O.isValidElement(x)){k===T&&(k+=1,k>=s.length&&(k=-1));return}process.env.NODE_ENV!=="production"&&On.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(f==="selectedMenu"&&x.props.selected||k===-1)&&(k=T),k===T&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(k+=1,k>=s.length&&(k=-1))});const D=O.Children.map(s,(x,T)=>{if(T===k){const m={};return i&&(m.autoFocus=!0),x.props.tabIndex===void 0&&f==="selectedMenu"&&(m.tabIndex=0),O.cloneElement(x,m)}return x});return E.jsx(la,S({role:"menu",ref:h,className:c,onKeyDown:g,tabIndex:o?0:-1},p,{children:D}))});process.env.NODE_ENV!=="production"&&(Zr.propTypes={autoFocus:a.bool,autoFocusItem:a.bool,children:a.node,className:a.string,disabledItemsFocusable:a.bool,disableListWrap:a.bool,onKeyDown:a.func,variant:a.oneOf(["menu","selectedMenu"])});const da=Zr,fa=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function pa(e){const n=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(n)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:n}function ha(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const n=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let t=n(`[name="${e.name}"]:checked`);return t||(t=n(`[name="${e.name}"]`)),t!==e}function ma(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||ha(e))}function ga(e){const n=[],t=[];return Array.from(e.querySelectorAll(fa)).forEach((r,o)=>{const i=pa(r);i===-1||!ma(r)||(i===0?n.push(r):t.push({documentOrder:o,tabIndex:i,node:r}))}),t.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(n)}function ba(){return!0}function _n(e){const{children:n,disableAutoFocus:t=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=ga,isEnabled:s=ba,open:c}=e,l=O.useRef(!1),u=O.useRef(null),d=O.useRef(null),f=O.useRef(null),p=O.useRef(null),y=O.useRef(!1),b=O.useRef(null),g=Ae(n.ref,b),h=O.useRef(null);O.useEffect(()=>{!c||!b.current||(y.current=!t)},[t,c]),O.useEffect(()=>{if(!c||!b.current)return;const x=ve(b.current);return b.current.contains(x.activeElement)||(b.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),b.current.setAttribute("tabIndex","-1")),y.current&&b.current.focus()),()=>{o||(f.current&&f.current.focus&&(l.current=!0,f.current.focus()),f.current=null)}},[c]),O.useEffect(()=>{if(!c||!b.current)return;const x=ve(b.current),T=_=>{h.current=_,!(r||!s()||_.key!=="Tab")&&x.activeElement===b.current&&_.shiftKey&&(l.current=!0,d.current&&d.current.focus())},m=()=>{const _=b.current;if(_===null)return;if(!x.hasFocus()||!s()||l.current){l.current=!1;return}if(_.contains(x.activeElement)||r&&x.activeElement!==u.current&&x.activeElement!==d.current)return;if(x.activeElement!==p.current)p.current=null;else if(p.current!==null)return;if(!y.current)return;let K=[];if((x.activeElement===u.current||x.activeElement===d.current)&&(K=i(b.current)),K.length>0){var Z,R;const G=!!((Z=h.current)!=null&&Z.shiftKey&&((R=h.current)==null?void 0:R.key)==="Tab"),q=K[0],ee=K[K.length-1];typeof q!="string"&&typeof ee!="string"&&(G?ee.focus():q.focus())}else _.focus()};x.addEventListener("focusin",m),x.addEventListener("keydown",T,!0);const I=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&m()},50);return()=>{clearInterval(I),x.removeEventListener("focusin",m),x.removeEventListener("keydown",T,!0)}},[t,r,o,s,c,i]);const k=x=>{f.current===null&&(f.current=x.relatedTarget),y.current=!0,p.current=x.target;const T=n.props.onFocus;T&&T(x)},D=x=>{f.current===null&&(f.current=x.relatedTarget),y.current=!0};return E.jsxs(O.Fragment,{children:[E.jsx("div",{tabIndex:c?0:-1,onFocus:D,ref:u,"data-testid":"sentinelStart"}),O.cloneElement(n,{ref:g,onFocus:k}),E.jsx("div",{tabIndex:c?0:-1,onFocus:D,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(_n.propTypes={children:In,disableAutoFocus:a.bool,disableEnforceFocus:a.bool,disableRestoreFocus:a.bool,getTabbable:a.func,isEnabled:a.func,open:a.bool.isRequired});process.env.NODE_ENV!=="production"&&(_n["propTypes"]=Mr(_n.propTypes));function ya(e){return typeof e=="function"?e():e}const $n=O.forwardRef(function(n,t){const{children:r,container:o,disablePortal:i=!1}=n,[s,c]=O.useState(null),l=Ae(O.isValidElement(r)?r.ref:null,t);if(Cn(()=>{i||c(ya(o)||document.body)},[o,i]),Cn(()=>{if(s&&!i)return at(t,s),()=>{at(t,null)}},[t,s,i]),i){if(O.isValidElement(r)){const u={ref:l};return O.cloneElement(r,u)}return E.jsx(O.Fragment,{children:r})}return E.jsx(O.Fragment,{children:s&&bo.createPortal(r,s)})});process.env.NODE_ENV!=="production"&&($n.propTypes={children:a.node,container:a.oneOfType([hn,a.func]),disablePortal:a.bool});process.env.NODE_ENV!=="production"&&($n["propTypes"]=Mr($n.propTypes));function va(e){const n=ve(e);return n.body===e?mn(e).innerWidth>n.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function pn(e,n){n?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function ur(e){return parseInt(mn(e).getComputedStyle(e).paddingRight,10)||0}function xa(e){const t=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return t||r}function dr(e,n,t,r,o){const i=[n,t,...r];[].forEach.call(e.children,s=>{const c=i.indexOf(s)===-1,l=!xa(s);c&&l&&pn(s,o)})}function Qn(e,n){let t=-1;return e.some((r,o)=>n(r)?(t=o,!0):!1),t}function Ea(e,n){const t=[],r=e.container;if(!n.disableScrollLock){if(va(r)){const s=Ar(ve(r));t.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${ur(r)+s}px`;const c=ve(r).querySelectorAll(".mui-fixed");[].forEach.call(c,l=>{t.push({value:l.style.paddingRight,property:"padding-right",el:l}),l.style.paddingRight=`${ur(l)+s}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=ve(r).body;else{const s=r.parentElement,c=mn(r);i=(s==null?void 0:s.nodeName)==="HTML"&&c.getComputedStyle(s).overflowY==="scroll"?s:r}t.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{t.forEach(({value:i,el:s,property:c})=>{i?s.style.setProperty(c,i):s.style.removeProperty(c)})}}function Ta(e){const n=[];return[].forEach.call(e.children,t=>{t.getAttribute("aria-hidden")==="true"&&n.push(t)}),n}class ka{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(n,t){let r=this.modals.indexOf(n);if(r!==-1)return r;r=this.modals.length,this.modals.push(n),n.modalRef&&pn(n.modalRef,!1);const o=Ta(t);dr(t,n.mount,n.modalRef,o,!0);const i=Qn(this.containers,s=>s.container===t);return i!==-1?(this.containers[i].modals.push(n),r):(this.containers.push({modals:[n],container:t,restore:null,hiddenSiblings:o}),r)}mount(n,t){const r=Qn(this.containers,i=>i.modals.indexOf(n)!==-1),o=this.containers[r];o.restore||(o.restore=Ea(o,t))}remove(n,t=!0){const r=this.modals.indexOf(n);if(r===-1)return r;const o=Qn(this.containers,s=>s.modals.indexOf(n)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(n),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),n.modalRef&&pn(n.modalRef,t),dr(i.container,n.mount,n.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const s=i.modals[i.modals.length-1];s.modalRef&&pn(s.modalRef,!1)}return r}isTopModal(n){return this.modals.length>0&&this.modals[this.modals.length-1]===n}}function Sa(e){return typeof e=="function"?e():e}function wa(e){return e?e.props.hasOwnProperty("in"):!1}const Oa=new ka;function Ca(e){const{container:n,disableEscapeKeyDown:t=!1,disableScrollLock:r=!1,manager:o=Oa,closeAfterTransition:i=!1,onTransitionEnter:s,onTransitionExited:c,children:l,onClose:u,open:d,rootRef:f}=e,p=O.useRef({}),y=O.useRef(null),b=O.useRef(null),g=Ae(b,f),[h,k]=O.useState(!d),D=wa(l);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const T=()=>ve(y.current),m=()=>(p.current.modalRef=b.current,p.current.mount=y.current,p.current),I=()=>{o.mount(m(),{disableScrollLock:r}),b.current&&(b.current.scrollTop=0)},_=Wt(()=>{const $=Sa(n)||T().body;o.add(m(),$),b.current&&I()}),K=O.useCallback(()=>o.isTopModal(m()),[o]),Z=Wt($=>{y.current=$,$&&(d&&K()?I():b.current&&pn(b.current,x))}),R=O.useCallback(()=>{o.remove(m(),x)},[x,o]);O.useEffect(()=>()=>{R()},[R]),O.useEffect(()=>{d?_():(!D||!i)&&R()},[d,R,D,i,_]);const G=$=>B=>{var ie;(ie=$.onKeyDown)==null||ie.call($,B),!(B.key!=="Escape"||B.which===229||!K())&&(t||(B.stopPropagation(),u&&u(B,"escapeKeyDown")))},q=$=>B=>{var ie;(ie=$.onClick)==null||ie.call($,B),B.target===B.currentTarget&&u&&u(B,"backdropClick")};return{getRootProps:($={})=>{const B=Vr(e);delete B.onTransitionEnter,delete B.onTransitionExited;const ie=S({},B,$);return S({role:"presentation"},ie,{onKeyDown:G(ie),ref:g})},getBackdropProps:($={})=>{const B=$;return S({"aria-hidden":!0},B,{onClick:q(B),open:d})},getTransitionProps:()=>{const $=()=>{k(!1),s&&s()},B=()=>{k(!0),c&&c(),i&&R()};return{onEnter:qt($,l==null?void 0:l.props.onEnter),onExited:qt(B,l==null?void 0:l.props.onExited)}},rootRef:g,portalRef:Z,isTopModal:K,exited:h,hasTransition:D}}function lt(e,n){return lt=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},lt(e,n)}function Pa(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,lt(e,n)}const fr={disabled:!1};var Ra=process.env.NODE_ENV!=="production"?a.oneOfType([a.number,a.shape({enter:a.number,exit:a.number,appear:a.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&a.oneOfType([a.string,a.shape({enter:a.string,exit:a.string,active:a.string}),a.shape({enter:a.string,enterDone:a.string,enterActive:a.string,exit:a.string,exitDone:a.string,exitActive:a.string})]);const Qr=se.createContext(null);var Na=function(n){return n.scrollTop},dn="unmounted",Be="exited",Fe="entering",en="entered",ut="exiting",$e=function(e){Pa(n,e);function n(r,o){var i;i=e.call(this,r,o)||this;var s=o,c=s&&!s.isMounting?r.enter:r.appear,l;return i.appearStatus=null,r.in?c?(l=Be,i.appearStatus=Fe):l=en:r.unmountOnExit||r.mountOnEnter?l=dn:l=Be,i.state={status:l},i.nextCallback=null,i}n.getDerivedStateFromProps=function(o,i){var s=o.in;return s&&i.status===dn?{status:Be}:null};var t=n.prototype;return t.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},t.componentDidUpdate=function(o){var i=null;if(o!==this.props){var s=this.state.status;this.props.in?s!==Fe&&s!==en&&(i=Fe):(s===Fe||s===en)&&(i=ut)}this.updateStatus(!1,i)},t.componentWillUnmount=function(){this.cancelNextCallback()},t.getTimeouts=function(){var o=this.props.timeout,i,s,c;return i=s=c=o,o!=null&&typeof o!="number"&&(i=o.exit,s=o.enter,c=o.appear!==void 0?o.appear:s),{exit:i,enter:s,appear:c}},t.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===Fe){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:un.findDOMNode(this);s&&Na(s)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Be&&this.setState({status:dn})},t.performEnter=function(o){var i=this,s=this.props.enter,c=this.context?this.context.isMounting:o,l=this.props.nodeRef?[c]:[un.findDOMNode(this),c],u=l[0],d=l[1],f=this.getTimeouts(),p=c?f.appear:f.enter;if(!o&&!s||fr.disabled){this.safeSetState({status:en},function(){i.props.onEntered(u)});return}this.props.onEnter(u,d),this.safeSetState({status:Fe},function(){i.props.onEntering(u,d),i.onTransitionEnd(p,function(){i.safeSetState({status:en},function(){i.props.onEntered(u,d)})})})},t.performExit=function(){var o=this,i=this.props.exit,s=this.getTimeouts(),c=this.props.nodeRef?void 0:un.findDOMNode(this);if(!i||fr.disabled){this.safeSetState({status:Be},function(){o.props.onExited(c)});return}this.props.onExit(c),this.safeSetState({status:ut},function(){o.props.onExiting(c),o.onTransitionEnd(s.exit,function(){o.safeSetState({status:Be},function(){o.props.onExited(c)})})})},t.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},t.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},t.setNextCallback=function(o){var i=this,s=!0;return this.nextCallback=function(c){s&&(s=!1,i.nextCallback=null,o(c))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},t.onTransitionEnd=function(o,i){this.setNextCallback(i);var s=this.props.nodeRef?this.props.nodeRef.current:un.findDOMNode(this),c=o==null&&!this.props.addEndListener;if(!s||c){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var l=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],u=l[0],d=l[1];this.props.addEndListener(u,d)}o!=null&&setTimeout(this.nextCallback,o)},t.render=function(){var o=this.state.status;if(o===dn)return null;var i=this.props,s=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var c=le(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return se.createElement(Qr.Provider,{value:null},typeof s=="function"?s(o,c):se.cloneElement(se.Children.only(s),c))},n}(se.Component);$e.contextType=Qr;$e.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:a.shape({current:typeof Element>"u"?a.any:function(e,n,t,r,o,i){var s=e[n];return a.instanceOf(s&&"ownerDocument"in s?s.ownerDocument.defaultView.Element:Element)(e,n,t,r,o,i)}}),children:a.oneOfType([a.func.isRequired,a.element.isRequired]).isRequired,in:a.bool,mountOnEnter:a.bool,unmountOnExit:a.bool,appear:a.bool,enter:a.bool,exit:a.bool,timeout:function(n){var t=Ra;n.addEndListener||(t=t.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return t.apply(void 0,[n].concat(o))},addEndListener:a.func,onEnter:a.func,onEntering:a.func,onEntered:a.func,onExit:a.func,onExiting:a.func,onExited:a.func}:{};function Qe(){}$e.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Qe,onEntering:Qe,onEntered:Qe,onExit:Qe,onExiting:Qe,onExited:Qe};$e.UNMOUNTED=dn;$e.EXITED=Be;$e.ENTERING=Fe;$e.ENTERED=en;$e.EXITING=ut;const eo=$e;function Hn(){const e=Wr(xt);return process.env.NODE_ENV!=="production"&&O.useDebugValue(e),e[Et]||e}const no=e=>e.scrollTop;function Mn(e,n){var t,r;const{timeout:o,easing:i,style:s={}}=e;return{duration:(t=s.transitionDuration)!=null?t:typeof o=="number"?o:o[n.mode]||0,easing:(r=s.transitionTimingFunction)!=null?r:typeof i=="object"?i[n.mode]:i,delay:s.transitionDelay}}const _a=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function dt(e){return`scale(${e}, ${e**2})`}const $a={entering:{opacity:1,transform:dt(1)},entered:{opacity:1,transform:"none"}},et=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Tt=O.forwardRef(function(n,t){const{addEndListener:r,appear:o=!0,children:i,easing:s,in:c,onEnter:l,onEntered:u,onEntering:d,onExit:f,onExited:p,onExiting:y,style:b,timeout:g="auto",TransitionComponent:h=eo}=n,k=le(n,_a),D=O.useRef(),x=O.useRef(),T=Hn(),m=O.useRef(null),I=Ae(m,i.ref,t),_=N=>$=>{if(N){const B=m.current;$===void 0?N(B):N(B,$)}},K=_(d),Z=_((N,$)=>{no(N);const{duration:B,delay:ie,easing:Q}=Mn({style:b,timeout:g,easing:s},{mode:"enter"});let v;g==="auto"?(v=T.transitions.getAutoHeightDuration(N.clientHeight),x.current=v):v=B,N.style.transition=[T.transitions.create("opacity",{duration:v,delay:ie}),T.transitions.create("transform",{duration:et?v:v*.666,delay:ie,easing:Q})].join(","),l&&l(N,$)}),R=_(u),G=_(y),q=_(N=>{const{duration:$,delay:B,easing:ie}=Mn({style:b,timeout:g,easing:s},{mode:"exit"});let Q;g==="auto"?(Q=T.transitions.getAutoHeightDuration(N.clientHeight),x.current=Q):Q=$,N.style.transition=[T.transitions.create("opacity",{duration:Q,delay:B}),T.transitions.create("transform",{duration:et?Q:Q*.666,delay:et?B:B||Q*.333,easing:ie})].join(","),N.style.opacity=0,N.style.transform=dt(.75),f&&f(N)}),ee=_(p),M=N=>{g==="auto"&&(D.current=setTimeout(N,x.current||0)),r&&r(m.current,N)};return O.useEffect(()=>()=>{clearTimeout(D.current)},[]),E.jsx(h,S({appear:o,in:c,nodeRef:m,onEnter:Z,onEntered:R,onEntering:K,onExit:q,onExited:ee,onExiting:G,addEndListener:M,timeout:g==="auto"?null:g},k,{children:(N,$)=>O.cloneElement(i,S({style:S({opacity:0,transform:dt(.75),visibility:N==="exited"&&!c?"hidden":void 0},$a[N],b,i.props.style),ref:I},$))}))});process.env.NODE_ENV!=="production"&&(Tt.propTypes={addEndListener:a.func,appear:a.bool,children:In.isRequired,easing:a.oneOfType([a.shape({enter:a.string,exit:a.string}),a.string]),in:a.bool,onEnter:a.func,onEntered:a.func,onEntering:a.func,onExit:a.func,onExited:a.func,onExiting:a.func,style:a.object,timeout:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});Tt.muiSupportAuto=!0;const Ma=Tt,Ia=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],Aa={entering:{opacity:1},entered:{opacity:1}},to=O.forwardRef(function(n,t){const r=Hn(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:s=!0,children:c,easing:l,in:u,onEnter:d,onEntered:f,onEntering:p,onExit:y,onExited:b,onExiting:g,style:h,timeout:k=o,TransitionComponent:D=eo}=n,x=le(n,Ia),T=O.useRef(null),m=Ae(T,c.ref,t),I=M=>N=>{if(M){const $=T.current;N===void 0?M($):M($,N)}},_=I(p),K=I((M,N)=>{no(M);const $=Mn({style:h,timeout:k,easing:l},{mode:"enter"});M.style.webkitTransition=r.transitions.create("opacity",$),M.style.transition=r.transitions.create("opacity",$),d&&d(M,N)}),Z=I(f),R=I(g),G=I(M=>{const N=Mn({style:h,timeout:k,easing:l},{mode:"exit"});M.style.webkitTransition=r.transitions.create("opacity",N),M.style.transition=r.transitions.create("opacity",N),y&&y(M)}),q=I(b),ee=M=>{i&&i(T.current,M)};return E.jsx(D,S({appear:s,in:u,nodeRef:T,onEnter:K,onEntered:Z,onEntering:_,onExit:G,onExited:q,onExiting:R,addEndListener:ee,timeout:k},x,{children:(M,N)=>O.cloneElement(c,S({style:S({opacity:0,visibility:M==="exited"&&!u?"hidden":void 0},Aa[M],h,c.props.style),ref:m},N))}))});process.env.NODE_ENV!=="production"&&(to.propTypes={addEndListener:a.func,appear:a.bool,children:In.isRequired,easing:a.oneOfType([a.shape({enter:a.string,exit:a.string}),a.string]),in:a.bool,onEnter:a.func,onEntered:a.func,onEntering:a.func,onExit:a.func,onExited:a.func,onExiting:a.func,style:a.object,timeout:a.oneOfType([a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});const ja=to;function Da(e){return _e("MuiBackdrop",e)}qe("MuiBackdrop",["root","invisible"]);const Ba=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Fa=e=>{const{classes:n,invisible:t}=e;return He({root:["root",t&&"invisible"]},Da,n)},La=ke("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,t.invisible&&n.invisible]}})(({ownerState:e})=>S({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),ro=O.forwardRef(function(n,t){var r,o,i;const s=We({props:n,name:"MuiBackdrop"}),{children:c,className:l,component:u="div",components:d={},componentsProps:f={},invisible:p=!1,open:y,slotProps:b={},slots:g={},TransitionComponent:h=ja,transitionDuration:k}=s,D=le(s,Ba),x=S({},s,{component:u,invisible:p}),T=Fa(x),m=(r=b.root)!=null?r:f.root;return E.jsx(h,S({in:y,timeout:k},D,{children:E.jsx(La,S({"aria-hidden":!0},m,{as:(o=(i=g.root)!=null?i:d.Root)!=null?o:u,className:Re(T.root,l,m==null?void 0:m.className),ownerState:S({},x,m==null?void 0:m.ownerState),classes:T,ref:t,children:c}))}))});process.env.NODE_ENV!=="production"&&(ro.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,components:a.shape({Root:a.elementType}),componentsProps:a.shape({root:a.object}),invisible:a.bool,open:a.bool.isRequired,slotProps:a.shape({root:a.object}),slots:a.shape({root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),TransitionComponent:a.elementType,transitionDuration:a.oneOfType([a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})])});const Va=ro;function za(e){return _e("MuiModal",e)}qe("MuiModal",["root","hidden","backdrop"]);const Ua=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],Ha=e=>{const{open:n,exited:t,classes:r}=e;return He({root:["root",!n&&t&&"hidden"],backdrop:["backdrop"]},za,r)},qa=ke("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,!t.open&&t.exited&&n.hidden]}})(({theme:e,ownerState:n})=>S({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!n.open&&n.exited&&{visibility:"hidden"})),Wa=ke(Va,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,n)=>n.backdrop})({zIndex:-1}),oo=O.forwardRef(function(n,t){var r,o,i,s,c,l;const u=We({name:"MuiModal",props:n}),{BackdropComponent:d=Wa,BackdropProps:f,className:p,closeAfterTransition:y=!1,children:b,container:g,component:h,components:k={},componentsProps:D={},disableAutoFocus:x=!1,disableEnforceFocus:T=!1,disableEscapeKeyDown:m=!1,disablePortal:I=!1,disableRestoreFocus:_=!1,disableScrollLock:K=!1,hideBackdrop:Z=!1,keepMounted:R=!1,onBackdropClick:G,open:q,slotProps:ee,slots:M}=u,N=le(u,Ua),$=S({},u,{closeAfterTransition:y,disableAutoFocus:x,disableEnforceFocus:T,disableEscapeKeyDown:m,disablePortal:I,disableRestoreFocus:_,disableScrollLock:K,hideBackdrop:Z,keepMounted:R}),{getRootProps:B,getBackdropProps:ie,getTransitionProps:Q,portalRef:v,isTopModal:P,exited:A,hasTransition:z}=Ca(S({},$,{rootRef:t})),j=S({},$,{exited:A}),V=Ha(j),F={};if(b.props.tabIndex===void 0&&(F.tabIndex="-1"),z){const{onEnter:H,onExited:w}=Q();F.onEnter=H,F.onExited=w}const L=(r=(o=M==null?void 0:M.root)!=null?o:k.Root)!=null?r:qa,W=(i=(s=M==null?void 0:M.backdrop)!=null?s:k.Backdrop)!=null?i:d,X=(c=ee==null?void 0:ee.root)!=null?c:D.root,U=(l=ee==null?void 0:ee.backdrop)!=null?l:D.backdrop,pe=rn({elementType:L,externalSlotProps:X,externalForwardedProps:N,getSlotProps:B,additionalProps:{ref:t,as:h},ownerState:j,className:Re(p,X==null?void 0:X.className,V==null?void 0:V.root,!j.open&&j.exited&&(V==null?void 0:V.hidden))}),C=rn({elementType:W,externalSlotProps:U,additionalProps:f,getSlotProps:H=>ie(S({},H,{onClick:w=>{G&&G(w),H!=null&&H.onClick&&H.onClick(w)}})),className:Re(U==null?void 0:U.className,f==null?void 0:f.className,V==null?void 0:V.backdrop),ownerState:j});return!R&&!q&&(!z||A)?null:E.jsx($n,{ref:v,container:g,disablePortal:I,children:E.jsxs(L,S({},pe,{children:[!Z&&d?E.jsx(W,S({},C)):null,E.jsx(_n,{disableEnforceFocus:T,disableAutoFocus:x,disableRestoreFocus:_,isEnabled:P,open:q,children:O.cloneElement(b,F)})]}))})});process.env.NODE_ENV!=="production"&&(oo.propTypes={BackdropComponent:a.elementType,BackdropProps:a.object,children:In.isRequired,classes:a.object,className:a.string,closeAfterTransition:a.bool,component:a.elementType,components:a.shape({Backdrop:a.elementType,Root:a.elementType}),componentsProps:a.shape({backdrop:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),container:a.oneOfType([hn,a.func]),disableAutoFocus:a.bool,disableEnforceFocus:a.bool,disableEscapeKeyDown:a.bool,disablePortal:a.bool,disableRestoreFocus:a.bool,disableScrollLock:a.bool,hideBackdrop:a.bool,keepMounted:a.bool,onBackdropClick:a.func,onClose:a.func,onTransitionEnter:a.func,onTransitionExited:a.func,open:a.bool.isRequired,slotProps:a.shape({backdrop:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({backdrop:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object])});const Ga=oo,Ka=e=>{let n;return e<1?n=5.11916*e**2:n=4.5*Math.log(e+1)+2,(n/100).toFixed(2)},pr=Ka;function Xa(e){return _e("MuiPaper",e)}qe("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Ya=["className","component","elevation","square","variant"],Ja=e=>{const{square:n,elevation:t,variant:r,classes:o}=e,i={root:["root",r,!n&&"rounded",r==="elevation"&&`elevation${t}`]};return He(i,Xa,o)},Za=ke("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,n[t.variant],!t.square&&n.rounded,t.variant==="elevation"&&n[`elevation${t.elevation}`]]}})(({theme:e,ownerState:n})=>{var t;return S({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!n.square&&{borderRadius:e.shape.borderRadius},n.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},n.variant==="elevation"&&S({boxShadow:(e.vars||e).shadows[n.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${rr("#fff",pr(n.elevation))}, ${rr("#fff",pr(n.elevation))})`},e.vars&&{backgroundImage:(t=e.vars.overlays)==null?void 0:t[n.elevation]}))}),io=O.forwardRef(function(n,t){const r=We({props:n,name:"MuiPaper"}),{className:o,component:i="div",elevation:s=1,square:c=!1,variant:l="elevation"}=r,u=le(r,Ya),d=S({},r,{component:i,elevation:s,square:c,variant:l}),f=Ja(d);return process.env.NODE_ENV!=="production"&&Hn().shadows[s]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)),E.jsx(Za,S({as:i,ownerState:d,className:Re(f.root,o),ref:t},u))});process.env.NODE_ENV!=="production"&&(io.propTypes={children:a.node,classes:a.object,className:a.string,component:a.elementType,elevation:yn(Br,e=>{const{elevation:n,variant:t}=e;return n>0&&t==="outlined"?new Error(`MUI: Combining \`elevation={${n}}\` with \`variant="${t}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:a.bool,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),variant:a.oneOfType([a.oneOf(["elevation","outlined"]),a.string])});const Qa=io;function ec(e){return _e("MuiPopover",e)}qe("MuiPopover",["root","paper"]);const nc=["onEntering"],tc=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],rc=["slotProps"];function hr(e,n){let t=0;return typeof n=="number"?t=n:n==="center"?t=e.height/2:n==="bottom"&&(t=e.height),t}function mr(e,n){let t=0;return typeof n=="number"?t=n:n==="center"?t=e.width/2:n==="right"&&(t=e.width),t}function gr(e){return[e.horizontal,e.vertical].map(n=>typeof n=="number"?`${n}px`:n).join(" ")}function Sn(e){return typeof e=="function"?e():e}const oc=e=>{const{classes:n}=e;return He({root:["root"],paper:["paper"]},ec,n)},ic=ke(Ga,{name:"MuiPopover",slot:"Root",overridesResolver:(e,n)=>n.root})({}),so=ke(Qa,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,n)=>n.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),ao=O.forwardRef(function(n,t){var r,o,i;const s=We({props:n,name:"MuiPopover"}),{action:c,anchorEl:l,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:f="anchorEl",children:p,className:y,container:b,elevation:g=8,marginThreshold:h=16,open:k,PaperProps:D={},slots:x,slotProps:T,transformOrigin:m={vertical:"top",horizontal:"left"},TransitionComponent:I=Ma,transitionDuration:_="auto",TransitionProps:{onEntering:K}={},disableScrollLock:Z=!1}=s,R=le(s.TransitionProps,nc),G=le(s,tc),q=(r=T==null?void 0:T.paper)!=null?r:D,ee=O.useRef(),M=Ae(ee,q.ref),N=S({},s,{anchorOrigin:u,anchorReference:f,elevation:g,marginThreshold:h,externalPaperSlotProps:q,transformOrigin:m,TransitionComponent:I,transitionDuration:_,TransitionProps:R}),$=oc(N),B=O.useCallback(()=>{if(f==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const H=Sn(l),w=H&&H.nodeType===1?H:ve(ee.current).body,he=w.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const ge=w.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ge.top===0&&ge.left===0&&ge.right===0&&ge.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:he.top+hr(he,u.vertical),left:he.left+mr(he,u.horizontal)}},[l,u.horizontal,u.vertical,d,f]),ie=O.useCallback(H=>({vertical:hr(H,m.vertical),horizontal:mr(H,m.horizontal)}),[m.horizontal,m.vertical]),Q=O.useCallback(H=>{const w={width:H.offsetWidth,height:H.offsetHeight},he=ie(w);if(f==="none")return{top:null,left:null,transformOrigin:gr(he)};const ge=B();let Oe=ge.top-he.vertical,Ge=ge.left-he.horizontal;const Ct=Oe+w.height,Pt=Ge+w.width,Rt=mn(Sn(l)),sn=Rt.innerHeight-h,Nt=Rt.innerWidth-h;if(h!==null&&Oe<h){const Ee=Oe-h;Oe-=Ee,he.vertical+=Ee}else if(h!==null&&Ct>sn){const Ee=Ct-sn;Oe-=Ee,he.vertical+=Ee}if(process.env.NODE_ENV!=="production"&&w.height>sn&&w.height&&sn&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${w.height-sn}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),h!==null&&Ge<h){const Ee=Ge-h;Ge-=Ee,he.horizontal+=Ee}else if(Pt>Nt){const Ee=Pt-Nt;Ge-=Ee,he.horizontal+=Ee}return{top:`${Math.round(Oe)}px`,left:`${Math.round(Ge)}px`,transformOrigin:gr(he)}},[l,f,B,ie,h]),[v,P]=O.useState(k),A=O.useCallback(()=>{const H=ee.current;if(!H)return;const w=Q(H);w.top!==null&&(H.style.top=w.top),w.left!==null&&(H.style.left=w.left),H.style.transformOrigin=w.transformOrigin,P(!0)},[Q]);O.useEffect(()=>(Z&&window.addEventListener("scroll",A),()=>window.removeEventListener("scroll",A)),[l,Z,A]);const z=(H,w)=>{K&&K(H,w),A()},j=()=>{P(!1)};O.useEffect(()=>{k&&A()}),O.useImperativeHandle(c,()=>k?{updatePosition:()=>{A()}}:null,[k,A]),O.useEffect(()=>{if(!k)return;const H=qo(()=>{A()}),w=mn(l);return w.addEventListener("resize",H),()=>{H.clear(),w.removeEventListener("resize",H)}},[l,k,A]);let V=_;_==="auto"&&!I.muiSupportAuto&&(V=void 0);const F=b||(l?ve(Sn(l)).body:void 0),L=(o=x==null?void 0:x.root)!=null?o:ic,W=(i=x==null?void 0:x.paper)!=null?i:so,X=rn({elementType:W,externalSlotProps:S({},q,{style:v?q.style:S({},q.style,{opacity:0})}),additionalProps:{elevation:g,ref:M},ownerState:N,className:Re($.paper,q==null?void 0:q.className)}),U=rn({elementType:L,externalSlotProps:(T==null?void 0:T.root)||{},externalForwardedProps:G,additionalProps:{ref:t,slotProps:{backdrop:{invisible:!0}},container:F,open:k},ownerState:N,className:Re($.root,y)}),{slotProps:pe}=U,C=le(U,rc);return E.jsx(L,S({},C,!Lr(L)&&{slotProps:pe,disableScrollLock:Z},{children:E.jsx(I,S({appear:!0,in:k,onEntering:z,onExited:j,timeout:V},R,{children:E.jsx(W,S({},X,{children:p}))}))}))});process.env.NODE_ENV!=="production"&&(ao.propTypes={action:Ho,anchorEl:yn(a.oneOfType([hn,a.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const n=Sn(e.anchorEl);if(n&&n.nodeType===1){const t=n.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&t.top===0&&t.left===0&&t.right===0&&t.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${n}\` instead.`].join(`
`))}return null}),anchorOrigin:a.shape({horizontal:a.oneOfType([a.oneOf(["center","left","right"]),a.number]).isRequired,vertical:a.oneOfType([a.oneOf(["bottom","center","top"]),a.number]).isRequired}),anchorPosition:a.shape({left:a.number.isRequired,top:a.number.isRequired}),anchorReference:a.oneOf(["anchorEl","anchorPosition","none"]),children:a.node,classes:a.object,className:a.string,container:a.oneOfType([hn,a.func]),disableScrollLock:a.bool,elevation:Br,marginThreshold:a.number,onClose:a.func,open:a.bool.isRequired,PaperProps:a.shape({component:Bo}),slotProps:a.shape({paper:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({paper:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transformOrigin:a.shape({horizontal:a.oneOfType([a.oneOf(["center","left","right"]),a.number]).isRequired,vertical:a.oneOfType([a.oneOf(["bottom","center","top"]),a.number]).isRequired}),TransitionComponent:a.elementType,transitionDuration:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})]),TransitionProps:a.object});const sc=ao;function ac(e){return _e("MuiMenu",e)}qe("MuiMenu",["root","paper","list"]);const cc=["onEntering"],lc=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],uc={vertical:"top",horizontal:"right"},dc={vertical:"top",horizontal:"left"},fc=e=>{const{classes:n}=e;return He({root:["root"],paper:["paper"],list:["list"]},ac,n)},pc=ke(sc,{shouldForwardProp:e=>Kr(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,n)=>n.root})({}),hc=ke(so,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,n)=>n.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),mc=ke(da,{name:"MuiMenu",slot:"List",overridesResolver:(e,n)=>n.list})({outline:0}),co=O.forwardRef(function(n,t){var r,o;const i=We({props:n,name:"MuiMenu"}),{autoFocus:s=!0,children:c,className:l,disableAutoFocusItem:u=!1,MenuListProps:d={},onClose:f,open:p,PaperProps:y={},PopoverClasses:b,transitionDuration:g="auto",TransitionProps:{onEntering:h}={},variant:k="selectedMenu",slots:D={},slotProps:x={}}=i,T=le(i.TransitionProps,cc),m=le(i,lc),I=Hn(),_=I.direction==="rtl",K=S({},i,{autoFocus:s,disableAutoFocusItem:u,MenuListProps:d,onEntering:h,PaperProps:y,transitionDuration:g,TransitionProps:T,variant:k}),Z=fc(K),R=s&&!u&&p,G=O.useRef(null),q=(Q,v)=>{G.current&&G.current.adjustStyleForScrollbar(Q,I),h&&h(Q,v)},ee=Q=>{Q.key==="Tab"&&(Q.preventDefault(),f&&f(Q,"tabKeyDown"))};let M=-1;O.Children.map(c,(Q,v)=>{O.isValidElement(Q)&&(process.env.NODE_ENV!=="production"&&On.isFragment(Q)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Q.props.disabled||(k==="selectedMenu"&&Q.props.selected||M===-1)&&(M=v))});const N=(r=D.paper)!=null?r:hc,$=(o=x.paper)!=null?o:y,B=rn({elementType:D.root,externalSlotProps:x.root,ownerState:K,className:[Z.root,l]}),ie=rn({elementType:N,externalSlotProps:$,ownerState:K,className:Z.paper});return E.jsx(pc,S({onClose:f,anchorOrigin:{vertical:"bottom",horizontal:_?"right":"left"},transformOrigin:_?uc:dc,slots:{paper:N,root:D.root},slotProps:{root:B,paper:ie},open:p,ref:t,transitionDuration:g,TransitionProps:S({onEntering:q},T),ownerState:K},m,{classes:b,children:E.jsx(mc,S({onKeyDown:ee,actions:G,autoFocus:s&&(M===-1||u),autoFocusItem:R,variant:k},d,{className:Re(Z.list,d.className),children:c}))}))});process.env.NODE_ENV!=="production"&&(co.propTypes={anchorEl:a.oneOfType([hn,a.func]),autoFocus:a.bool,children:a.node,classes:a.object,className:a.string,disableAutoFocusItem:a.bool,MenuListProps:a.object,onClose:a.func,open:a.bool.isRequired,PaperProps:a.object,PopoverClasses:a.object,slotProps:a.shape({paper:a.oneOfType([a.func,a.object]),root:a.oneOfType([a.func,a.object])}),slots:a.shape({paper:a.elementType,root:a.elementType}),sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),transitionDuration:a.oneOfType([a.oneOf(["auto"]),a.number,a.shape({appear:a.number,enter:a.number,exit:a.number})]),TransitionProps:a.object,variant:a.oneOf(["menu","selectedMenu"])});const gc=co;function bc(e){var u;const{className:n,commandHandler:t,menuDefinition:r,children:o}=e,[i,s]=se.useState(void 0),c=d=>{d.preventDefault(),s(i===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},l=()=>{s(void 0)};return(((u=r==null?void 0:r.items)==null?void 0:u.length)??0)===0||!o?o:E.jsxs("div",{className:`papi-context-menu-target ${n??""}`,onContextMenu:c,style:{cursor:"context-menu"},children:[o,E.jsx(gc,{className:`papi-context-menu ${n??""}`,open:i!==void 0,onClose:l,anchorReference:"anchorPosition",anchorPosition:i!==void 0?{top:i.mouseY,left:i.mouseX}:void 0,children:E.jsx(ft,{menuDefinition:r,commandHandler:t,onClick:l})})]})}var yc=Object.defineProperty,vc=(e,n,t)=>n in e?yc(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,J=(e,n,t)=>(vc(e,typeof n!="symbol"?n+"":n,t),t);const Ue=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],kt=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],lo=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],br=Rc();function on(e,n=!0){return n&&(e=e.toUpperCase()),e in br?br[e]:0}function St(e){return on(e)>0}function xc(e){const n=typeof e=="string"?on(e):e;return n>=40&&n<=66}function Ec(e){return(typeof e=="string"?on(e):e)<=39}function uo(e){return e<=66}function Tc(e){const n=typeof e=="string"?on(e):e;return ho(n)&&!uo(n)}function*kc(){for(let e=1;e<=Ue.length;e++)yield e}const Sc=1,fo=Ue.length;function wc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function wt(e,n="***"){const t=e-1;return t<0||t>=Ue.length?n:Ue[t]}function po(e){return e<=0||e>fo?"******":lo[e-1]}function Oc(e){return po(on(e))}function ho(e){const n=typeof e=="number"?wt(e):e;return St(n)&&!kt.includes(n)}function Cc(e){const n=typeof e=="number"?wt(e):e;return St(n)&&kt.includes(n)}function Pc(e){return lo[e-1].includes("*obsolete*")}function Rc(){const e={};for(let n=0;n<Ue.length;n++)e[Ue[n]]=n+1;return e}const Pe={allBookIds:Ue,nonCanonicalIds:kt,bookIdToNumber:on,isBookIdValid:St,isBookNT:xc,isBookOT:Ec,isBookOTNT:uo,isBookDC:Tc,allBookNumbers:kc,firstBook:Sc,lastBook:fo,extraBooks:wc,bookNumberToId:wt,bookNumberToEnglishName:po,bookIdToEnglishName:Oc,isCanonical:ho,isExtraMaterial:Cc,isObsolete:Pc};var Me=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Me||{});const Le=class{constructor(e){if(J(this,"name"),J(this,"fullPath"),J(this,"isPresent"),J(this,"hasVerseSegments"),J(this,"isCustomized"),J(this,"baseVersification"),J(this,"scriptureBooks"),J(this,"_type"),e!=null)typeof e=="string"?this.name=e:this._type=e;else throw new Error("Argument null")}get type(){return this._type}equals(e){return!e.type||!this.type?!1:e.type===this.type}};let ye=Le;J(ye,"Original",new Le(Me.Original)),J(ye,"Septuagint",new Le(Me.Septuagint)),J(ye,"Vulgate",new Le(Me.Vulgate)),J(ye,"English",new Le(Me.English)),J(ye,"RussianProtestant",new Le(Me.RussianProtestant)),J(ye,"RussianOrthodox",new Le(Me.RussianOrthodox));function yr(e,n){const t=n[0];for(let r=1;r<n.length;r++)e=e.split(n[r]).join(t);return e.split(t)}var mo=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(mo||{});const Y=class{constructor(e,n,t,r){if(J(this,"firstChapter"),J(this,"lastChapter"),J(this,"lastVerse"),J(this,"hasSegmentsDefined"),J(this,"text"),J(this,"BBBCCCVVVS"),J(this,"longHashCode"),J(this,"versification"),J(this,"rtlMark","‏"),J(this,"_bookNum",0),J(this,"_chapterNum",0),J(this,"_verseNum",0),J(this,"_verse"),t==null&&r==null)if(e!=null&&typeof e=="string"){const o=e,i=n!=null&&n instanceof ye?n:void 0;this.setEmpty(i),this.parse(o)}else if(e!=null&&typeof e=="number"){const o=n!=null&&n instanceof ye?n:void 0;this.setEmpty(o),this._verseNum=e%Y.chapterDigitShifter,this._chapterNum=Math.floor(e%Y.bookDigitShifter/Y.chapterDigitShifter),this._bookNum=Math.floor(e/Y.bookDigitShifter)}else if(n==null)if(e!=null&&e instanceof Y){const o=e;this._bookNum=o.bookNum,this._chapterNum=o.chapterNum,this._verseNum=o.verseNum,this._verse=o.verse,this.versification=o.versification}else{if(e==null)return;const o=e instanceof ye?e:Y.defaultVersification;this.setEmpty(o)}else throw new Error("VerseRef constructor not supported.");else if(e!=null&&n!=null&&t!=null)if(typeof e=="string"&&typeof n=="string"&&typeof t=="string")this.setEmpty(r),this.updateInternal(e,n,t);else if(typeof e=="number"&&typeof n=="number"&&typeof t=="number")this._bookNum=e,this._chapterNum=n,this._verseNum=t,this.versification=r??Y.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(e,n=Y.defaultVersification){const t=new Y(n);return t.parse(e),t}static isVerseParseable(e){return e.length>0&&"0123456789".includes(e[0])&&!e.endsWith(this.verseRangeSeparator)&&!e.endsWith(this.verseSequenceIndicator)}static tryParse(e){let n;try{return n=Y.parse(e),{success:!0,verseRef:n}}catch(t){if(t instanceof ln)return n=new Y,{success:!1,verseRef:n};throw t}}static getBBBCCCVVV(e,n,t){return e%Y.bcvMaxValue*Y.bookDigitShifter+(n>=0?n%Y.bcvMaxValue*Y.chapterDigitShifter:0)+(t>=0?t%Y.bcvMaxValue:0)}static tryGetVerseNum(e){let n;if(!e)return n=-1,{success:!0,vNum:n};n=0;let t;for(let r=0;r<e.length;r++){if(t=e[r],t<"0"||t>"9")return r===0&&(n=-1),{success:!1,vNum:n};if(n=n*10+ +t-+"0",n>Y.bcvMaxValue)return n=-1,{success:!1,vNum:n}}return{success:!0,vNum:n}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(Y.verseRangeSeparator)||this._verse.includes(Y.verseSequenceIndicator))}get book(){return Pe.bookNumberToId(this.bookNum,"")}set book(e){this.bookNum=Pe.bookIdToNumber(e)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(e){const n=+e;this._chapterNum=Number.isInteger(n)?n:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(e){const{success:n,vNum:t}=Y.tryGetVerseNum(e);this._verse=n?void 0:e.replace(this.rtlMark,""),this._verseNum=t,!(this._verseNum>=0)&&({vNum:this._verseNum}=Y.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(e){if(e<=0||e>Pe.lastBook)throw new ln("BookNum must be greater than zero and less than or equal to last book");this._bookNum=e}get chapterNum(){return this._chapterNum}set chapterNum(e){this.chapterNum=e}get verseNum(){return this._verseNum}set verseNum(e){this._verseNum=e}get versificationStr(){var e;return(e=this.versification)==null?void 0:e.name}set versificationStr(e){this.versification=this.versification!=null?new ye(e):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(Y.verseRangeSeparators,Y.verseSequenceIndicators)}get BBBCCC(){return Y.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return Y.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(e){if(e=e.replace(this.rtlMark,""),e.includes("/")){const o=e.split("/");if(e=o[0],o.length>1)try{const i=+o[1].trim();this.versification=new ye(Me[i])}catch{throw new ln("Invalid reference : "+e)}}const n=e.trim().split(" ");if(n.length!==2)throw new ln("Invalid reference : "+e);const t=n[1].split(":"),r=+t[0];if(t.length!==2||Pe.bookIdToNumber(n[0])===0||!Number.isInteger(r)||r<0||!Y.isVerseParseable(t[1]))throw new ln("Invalid reference : "+e);this.updateInternal(n[0],t[0],t[1])}simplify(){this._verse=void 0}clone(){return new Y(this)}toString(){const e=this.book;return e===""?"":`${e} ${this.chapter}:${this.verse}`}equals(e){return e._bookNum===this._bookNum&&e._chapterNum===this._chapterNum&&e._verseNum===this._verseNum&&e._verse===this._verse&&e.versification!=null&&this.versification!=null&&e.versification.equals(this.versification)}allVerses(e=!1,n=Y.verseRangeSeparators,t=Y.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const r=[],o=yr(this._verse,t);for(const i of o.map(s=>yr(s,n))){const s=this.clone();s.verse=i[0];const c=s.verseNum;if(r.push(s),i.length>1){const l=this.clone();if(l.verse=i[1],!e)for(let u=c+1;u<l.verseNum;u++){const d=new Y(this._bookNum,this._chapterNum,u,this.versification);this.isExcluded||r.push(d)}r.push(l)}}return r}validateVerse(e,n){if(!this.verse)return this.internalValid;let t=0;for(const r of this.allVerses(!0,e,n)){const o=r.internalValid;if(o!==0)return o;const i=r.BBBCCCVVV;if(t>i)return 3;if(t===i)return 4;t=i}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>Pe.lastBook?2:0}setEmpty(e=Y.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=e}updateInternal(e,n,t){this.bookNum=Pe.bookIdToNumber(e),this.chapter=n,this.verse=t}};let Ce=Y;J(Ce,"defaultVersification",ye.English),J(Ce,"verseRangeSeparator","-"),J(Ce,"verseSequenceIndicator",","),J(Ce,"verseRangeSeparators",[Y.verseRangeSeparator]),J(Ce,"verseSequenceIndicators",[Y.verseSequenceIndicator]),J(Ce,"chapterDigitShifter",1e3),J(Ce,"bookDigitShifter",Y.chapterDigitShifter*Y.chapterDigitShifter),J(Ce,"bcvMaxValue",Y.chapterDigitShifter-1),J(Ce,"ValidStatusType",mo);class ln extends Error{}function bn({variant:e="outlined",id:n,isDisabled:t=!1,hasError:r=!1,isFullWidth:o=!1,helperText:i,label:s,placeholder:c,isRequired:l=!1,className:u,defaultValue:d,value:f,onChange:p,onFocus:y,onBlur:b}){return E.jsx(ae.TextField,{variant:e,id:n,disabled:t,error:r,fullWidth:o,helperText:i,label:s,placeholder:c,required:l,className:`papi-textfield ${u??""}`,defaultValue:d,value:f,onChange:p,onFocus:y,onBlur:b})}let nt;const tt=()=>(nt||(nt=Pe.allBookIds.map(e=>({bookId:e,label:Pe.bookIdToEnglishName(e)}))),nt);function Nc({scrRef:e,handleSubmit:n,id:t}){const r=l=>{n(l)},o=(l,u)=>{const f={bookNum:Pe.bookIdToNumber(u.bookId),chapterNum:1,verseNum:1};r(f)},i=l=>{n({...e,chapterNum:+l.target.value})},s=l=>{n({...e,verseNum:+l.target.value})},c=se.useMemo(()=>tt()[e.bookNum-1],[e.bookNum]);return E.jsxs("span",{id:t,children:[E.jsx(wn,{title:"Book",className:"papi-ref-selector book",value:c,options:tt(),onChange:o,isClearable:!1,width:200}),E.jsx(De,{onClick:()=>r(Se.offsetBook(e,-1)),isDisabled:e.bookNum<=Se.FIRST_SCR_BOOK_NUM,children:"<"}),E.jsx(De,{onClick:()=>r(Se.offsetBook(e,1)),isDisabled:e.bookNum>=tt().length,children:">"}),E.jsx(bn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),E.jsx(De,{onClick:()=>n(Se.offsetChapter(e,-1)),isDisabled:e.chapterNum<=Se.FIRST_SCR_CHAPTER_NUM,children:"<"}),E.jsx(De,{onClick:()=>n(Se.offsetChapter(e,1)),isDisabled:e.chapterNum>=Se.getChaptersForBook(e.bookNum),children:">"}),E.jsx(bn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:s}),E.jsx(De,{onClick:()=>n(Se.offsetVerse(e,-1)),isDisabled:e.verseNum<=Se.FIRST_SCR_VERSE_NUM,children:"<"}),E.jsx(De,{onClick:()=>n(Se.offsetVerse(e,1)),children:">"})]})}function _c({onSearch:e,placeholder:n,isFullWidth:t}){const[r,o]=se.useState(""),i=s=>{o(s),e(s)};return E.jsx(ae.Paper,{component:"form",className:"search-bar-paper",children:E.jsx(bn,{isFullWidth:t,className:"search-bar-input",placeholder:n,value:r,onChange:s=>i(s.target.value)})})}function $c({id:e,isDisabled:n=!1,orientation:t="horizontal",min:r=0,max:o=100,step:i=1,showMarks:s=!1,defaultValue:c,value:l,valueLabelDisplay:u="off",className:d,onChange:f,onChangeCommitted:p}){return E.jsx(ae.Slider,{id:e,disabled:n,orientation:t,min:r,max:o,step:i,marks:s,defaultValue:c,value:l,valueLabelDisplay:u,className:`papi-slider ${t} ${d??""}`,onChange:f,onChangeCommitted:p})}function Mc({autoHideDuration:e=void 0,id:n,isOpen:t=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:s,children:c}){const l={action:(s==null?void 0:s.action)||c,message:s==null?void 0:s.message,className:r};return E.jsx(ae.Snackbar,{autoHideDuration:e??void 0,open:t,onClose:o,anchorOrigin:i,id:n,ContentProps:l})}function Ic({id:e,isChecked:n,isDisabled:t=!1,hasError:r=!1,className:o,onChange:i}){return E.jsx(ae.Switch,{id:e,checked:n,disabled:t,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function vr({onRowChange:e,row:n,column:t}){const r=o=>{e({...n,[t.key]:o.target.value})};return E.jsx(bn,{defaultValue:n[t.key],onChange:r})}const Ac=({onChange:e,disabled:n,checked:t,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return E.jsx(Tr,{...r,isChecked:t,isDisabled:n,onChange:o})};function jc({columns:e,sortColumns:n,onSortColumnsChange:t,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:s,defaultColumnSortable:c=!0,defaultColumnResizable:l=!0,rows:u,enableSelectColumn:d,selectColumnWidth:f=50,rowKeyGetter:p,rowHeight:y=35,headerRowHeight:b=35,selectedRows:g,onSelectedRowsChange:h,onRowsChange:k,onCellClick:D,onCellDoubleClick:x,onCellContextMenu:T,onCellKeyDown:m,direction:I="ltr",enableVirtualization:_=!0,onCopy:K,onPaste:Z,onScroll:R,className:G,id:q}){const ee=se.useMemo(()=>{const M=e.map(N=>typeof N.editable=="function"?{...N,editable:B=>!!N.editable(B),renderEditCell:N.renderEditCell||vr}:N.editable&&!N.renderEditCell?{...N,renderEditCell:vr}:N.renderEditCell&&!N.editable?{...N,editable:!1}:N);return d?[{..._t.SelectColumn,minWidth:f},...M]:M},[e,d,f]);return E.jsx(_t,{columns:ee,defaultColumnOptions:{width:o,minWidth:i,maxWidth:s,sortable:c,resizable:l},sortColumns:n,onSortColumnsChange:t,onColumnResize:r,rows:u,rowKeyGetter:p,rowHeight:y,headerRowHeight:b,selectedRows:g,onSelectedRowsChange:h,onRowsChange:k,onCellClick:D,onCellDoubleClick:x,onCellContextMenu:T,onCellKeyDown:m,direction:I,enableVirtualization:_,onCopy:K,onPaste:Z,onScroll:R,renderers:{renderCheckbox:Ac},className:`papi-table ${G??"rdg-light"}`,id:q})}function Dc(e){return _e("MuiSvgIcon",e)}qe("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Bc=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Fc=e=>{const{color:n,fontSize:t,classes:r}=e,o={root:["root",n!=="inherit"&&`color${we(n)}`,`fontSize${we(t)}`]};return He(o,Dc,r)},Lc=ke("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,t.color!=="inherit"&&n[`color${we(t.color)}`],n[`fontSize${we(t.fontSize)}`]]}})(({theme:e,ownerState:n})=>{var t,r,o,i,s,c,l,u,d,f,p,y,b;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:n.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(t=e.transitions)==null||(r=t.create)==null?void 0:r.call(t,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(s=i.pxToRem)==null?void 0:s.call(i,20))||"1.25rem",medium:((c=e.typography)==null||(l=c.pxToRem)==null?void 0:l.call(c,24))||"1.5rem",large:((u=e.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[n.fontSize],color:(f=(p=(e.vars||e).palette)==null||(p=p[n.color])==null?void 0:p.main)!=null?f:{action:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.active,disabled:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.disabled,inherit:void 0}[n.color]}}),Ot=O.forwardRef(function(n,t){const r=We({props:n,name:"MuiSvgIcon"}),{children:o,className:i,color:s="inherit",component:c="svg",fontSize:l="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:f,viewBox:p="0 0 24 24"}=r,y=le(r,Bc),b=O.isValidElement(o)&&o.type==="svg",g=S({},r,{color:s,component:c,fontSize:l,instanceFontSize:n.fontSize,inheritViewBox:d,viewBox:p,hasSvgAsChild:b}),h={};d||(h.viewBox=p);const k=Fc(g);return E.jsxs(Lc,S({as:c,className:Re(k.root,i),focusable:"false",color:u,"aria-hidden":f?void 0:!0,role:f?"img":void 0,ref:t},h,y,b&&o.props,{ownerState:g,children:[b?o.props.children:o,f?E.jsx("title",{children:f}):null]}))});process.env.NODE_ENV!=="production"&&(Ot.propTypes={children:a.node,classes:a.object,className:a.string,color:a.oneOfType([a.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),a.string]),component:a.elementType,fontSize:a.oneOfType([a.oneOf(["inherit","large","medium","small"]),a.string]),htmlColor:a.string,inheritViewBox:a.bool,shapeRendering:a.string,sx:a.oneOfType([a.arrayOf(a.oneOfType([a.func,a.object,a.bool])),a.func,a.object]),titleAccess:a.string,viewBox:a.string});Ot.muiName="SvgIcon";const xr=Ot;function Vc(e,n){function t(r,o){return E.jsx(xr,S({"data-testid":`${n}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(t.displayName=`${n}Icon`),t.muiName=xr.muiName,O.memo(O.forwardRef(t))}const zc=Vc(E.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Uc({menuProvider:e,commandHandler:n,className:t,id:r,children:o}){const[i,s]=se.useState(!1),[c,l]=se.useState(!1),u=se.useCallback(()=>{i&&s(!1),l(!1)},[i]),d=se.useCallback(h=>{h.stopPropagation(),s(k=>{const D=!k;return D&&h.shiftKey?l(!0):D||l(!1),D})},[]),f=se.useRef(void 0),[p,y]=se.useState(0);se.useEffect(()=>{i&&f.current&&y(f.current.clientHeight)},[i]);const b=se.useCallback(h=>(u(),n(h)),[n,u]),g=e==null?void 0:e(c);return E.jsx("div",{ref:f,style:{position:"relative"},children:E.jsx(ae.AppBar,{position:"static",id:r,children:E.jsxs(ae.Toolbar,{className:`papi-toolbar ${t??""}`,variant:"dense",children:[g?E.jsx(ae.IconButton,{edge:"start",className:`papi-menuButton ${t??""}`,color:"inherit","aria-label":"open drawer",onClick:d,children:E.jsx(zc,{})}):void 0,o?E.jsx("div",{className:"papi-menu-children",children:o}):void 0,g?E.jsx(ae.Drawer,{className:`papi-menu-drawer ${t??""}`,anchor:"left",variant:"persistent",open:i,onClose:u,PaperProps:{className:"papi-menu-drawer-paper",style:{top:p}},children:E.jsx(Or,{className:t,commandHandler:b,multiColumnMenu:g})}):void 0]})})})}const Hc=(e,n)=>{se.useEffect(()=>{if(!e)return()=>{};const t=e(n);return()=>{t()}},[e,n])};function qc(e){return{preserveValue:!0,...e}}const go=(e,n,t={})=>{const r=se.useRef(n);r.current=n;const o=se.useRef(t);o.current=qc(o.current);const[i,s]=se.useState(()=>r.current),[c,l]=se.useState(!0);return se.useEffect(()=>{let u=!0;return l(!!e),(async()=>{if(e){const d=await e();u&&(s(()=>d),l(!1))}})(),()=>{u=!1,o.current.preserveValue||s(()=>r.current)}},[e]),[i,c]},rt=()=>!1,Wc=(e,n)=>{const[t]=go(se.useCallback(async()=>{if(!e)return rt;const r=await Promise.resolve(e(n));return async()=>r()},[n,e]),rt,{preserveValue:!1});se.useEffect(()=>()=>{t!==rt&&t()},[t])};exports.Button=De;exports.ChapterRangeSelector=yo;exports.Checkbox=Tr;exports.ComboBox=wn;exports.ContextMenu=bc;exports.GridMenu=Or;exports.IconButton=To;exports.LabelPosition=Ve;exports.MenuItem=kr;exports.RefSelector=Nc;exports.SearchBar=_c;exports.Slider=$c;exports.Snackbar=Mc;exports.Switch=Ic;exports.Table=jc;exports.TextField=bn;exports.Toolbar=Uc;exports.TopLevelMenu=wr;exports.useEvent=Hc;exports.useEventAsync=Wc;exports.usePromise=go;function Gc(e,n="top"){if(!e||typeof document>"u")return;const t=document.head||document.querySelector("head"),r=t.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),n==="top"&&r?t.insertBefore(o,r):t.appendChild(o)}Gc(`.papi-button {
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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

`,"top");
//# sourceMappingURL=index.cjs.map
