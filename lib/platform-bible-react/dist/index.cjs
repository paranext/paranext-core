"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const E=require("react/jsx-runtime"),ae=require("@mui/material"),ne=require("react"),rt=require("@mui/styled-engine"),un=require("react-dom"),Se=require("platform-bible-utils"),$t=require("react-data-grid");function xr(e){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const t in e)if(t!=="default"){const r=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(n,t,r.get?r:{enumerable:!0,get:()=>e[t]})}}return n.default=e,Object.freeze(n)}const w=xr(ne),mo=xr(un);function Ae({id:e,isDisabled:n=!1,className:t,onClick:r,onContextMenu:o,children:i}){return E.jsx(ae.Button,{id:e,disabled:n,className:`papi-button ${t??""}`,onClick:r,onContextMenu:o,children:i})}function On({id:e,title:n,isDisabled:t=!1,isClearable:r=!0,hasError:o=!1,isFullWidth:i=!1,width:a,options:c=[],className:l,value:u,onChange:d,onFocus:p,onBlur:f,getOptionLabel:b}){return E.jsx(ae.Autocomplete,{id:e,disablePortal:!0,disabled:t,disableClearable:!r,fullWidth:i,options:c,className:`papi-combo-box ${o?"error":""} ${l??""}`,value:u,onChange:d,onFocus:p,onBlur:f,getOptionLabel:b,renderInput:y=>E.jsx(ae.TextField,{...y,error:o,fullWidth:i,disabled:t,label:n,style:{width:a}})})}function go({startChapter:e,endChapter:n,handleSelectStartChapter:t,handleSelectEndChapter:r,isDisabled:o,chapterCount:i}){const a=ne.useMemo(()=>Array.from({length:i},(u,d)=>d+1),[i]),c=(u,d)=>{t(d),d>n&&r(d)},l=(u,d)=>{r(d),d<e&&t(d)};return E.jsxs(E.Fragment,{children:[E.jsx(ae.FormControlLabel,{className:"book-selection-chapter-form-label start",disabled:o,control:E.jsx(On,{onChange:(u,d)=>c(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:e,isDisabled:o},"start chapter"),label:"Chapters",labelPlacement:"start"}),E.jsx(ae.FormControlLabel,{className:"book-selection-chapter-form-label end",disabled:o,control:E.jsx(On,{onChange:(u,d)=>l(u,d),className:"book-selection-chapter",isClearable:!1,options:a,getOptionLabel:u=>u.toString(),value:n,isDisabled:o},"end chapter"),label:"to",labelPlacement:"start"})]})}var Be=(e=>(e.After="after",e.Before="before",e.Above="above",e.Below="below",e))(Be||{});function Er({id:e,isChecked:n,labelText:t="",labelPosition:r=Be.After,isIndeterminate:o=!1,isDefaultChecked:i,isDisabled:a=!1,hasError:c=!1,className:l,onChange:u}){const d=E.jsx(ae.Checkbox,{id:e,checked:n,indeterminate:o,defaultChecked:i,disabled:a,className:`papi-checkbox ${c?"error":""} ${l??""}`,onChange:u});let p;if(t){const f=r===Be.Before||r===Be.Above,b=E.jsx("span",{className:`papi-checkbox-label ${c?"error":""} ${l??""}`,children:t}),y=r===Be.Before||r===Be.After,g=y?b:E.jsx("div",{children:b}),h=y?d:E.jsx("div",{children:d});p=E.jsxs(ae.FormLabel,{className:`papi-checkbox ${r.toString()}`,disabled:a,error:c,children:[f&&g,h,!f&&g]})}else p=d;return p}function _t(e,n,t){return e?E.jsx(ae.ListItemIcon,{className:`papi-menu-icon-${t?"leading":"trailing"}`,children:E.jsx("img",{src:e,alt:`${t?"Leading":"Trailing"} icon for ${n}`})}):void 0}function Tr(e){const{onClick:n,label:t,allowForLeadingIcons:r=!0,iconPathBefore:o=void 0,iconPathAfter:i=void 0,hasAutoFocus:a=!1,className:c,isDisabled:l=!1,isDense:u=!0,hasDisabledGutters:d=!1,hasDivider:p=!1,focusVisibleClassName:f,id:b,children:y}=e;return E.jsx(ae.MenuItem,{sx:{lineHeight:.8},autoFocus:a,className:c,disabled:l,dense:u,disableGutters:d,divider:p,focusVisibleClassName:f,onClick:n,id:b,children:t?E.jsxs(E.Fragment,{children:[_t(o,t,!0),E.jsx(ae.ListItemText,{primary:t,inset:!o&&r}),_t(i,t,!1)]}):y})}function kr(e){return Object.entries(e.groups).map(([t,r])=>({id:t,group:r}))}function bo(e){const[n,t]=ne.useState(void 0),{parentMenuItem:r,menuDefinition:o}=e,i=l=>{t(l.currentTarget)},a=()=>{t(void 0)},c=()=>{let l=kr(o).filter(u=>"menuItem"in u.group);return r!=null&&r.id&&(l=l.filter(u=>"menuItem"in u&&u.menuItem===r.id)),dt(e,l)};return E.jsxs(E.Fragment,{children:[E.jsx(ae.MenuItem,{onClick:i,children:r.label}),E.jsx(ae.Menu,{anchorEl:n,open:!!n,onClose:a,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"left"},children:c()},r.id)]})}const yo=(e,n)=>n.filter(o=>o.group===e).sort((o,i)=>(o.order||0)-(i.order||0));function dt(e,n){const{menuDefinition:t,onClick:r,commandHandler:o}=e,i=((n==null?void 0:n.length)??0)>0?n:kr(t).filter(f=>!("menuItem"in f.group)),a=Object.values(i).sort((f,b)=>(f.group.order||0)-(b.group.order||0)),c=[];a.forEach(f=>{yo(f.id,t.items).forEach(b=>c.push({item:b,isLastItemInGroup:!1})),c.length>0&&(c[c.length-1].isLastItemInGroup=!0)}),c.length>0&&(c[c.length-1].isLastItemInGroup=!1);const l=c==null?void 0:c.some(f=>"iconPathBefore"in f),u=({item:f,isLastItemInGroup:b})=>({className:"papi-menu-item",label:f.label,iconPathBefore:"iconPathBefore"in f?f.iconPathBefore:void 0,iconPathAfter:"iconPathAfter"in f?f.iconPathAfter:void 0,hasDivider:b,allowForLeadingIcons:l}),[d]=c;if(!d)return E.jsx("div",{});const p=d.item.group;return E.jsx("div",{role:"menu","aria-label":p,children:(()=>{const f=[];return c.forEach((b,y)=>{const{item:g}=b,h=u(b);if("command"in g){const k=g.group+y;f.push(E.jsx(Tr,{onClick:()=>{r==null||r(),o(g)},...h},k))}else f.push(E.jsx(bo,{parentMenuItem:g,...e},p+g.id))}),f})()},p)}function Sr(e){const{menuDefinition:n,columnId:t}=e;let i=Object.entries(n.groups).map(([a,c])=>({id:a,group:c})).filter(a=>"column"in a.group);return t&&"columns"in n&&n.columns[t]&&(i=i.filter(a=>"column"in a.group&&a.group.column===t)),dt(e,i)}function vo({commandHandler:e,menuDefinition:n,id:t,metadata:r,onClick:o,className:i}){return E.jsxs(ae.Grid,{id:t,item:!0,xs:"auto",role:"menu","aria-label":t,className:`papi-menu-column ${i??""}`,children:[E.jsx("h3",{"aria-label":r.label,className:`papi-menu-column-header ${i??""}`,children:r.label}),E.jsx(ae.List,{id:t,dense:!0,className:i??"",children:E.jsx(Sr,{commandHandler:e,menuDefinition:n,columnId:t,onClick:o})})]})}function wr({commandHandler:e,className:n,multiColumnMenu:t,id:r}){const{columns:o}=t,i=new Map;Object.getOwnPropertyNames(o).forEach(c=>{if(c==="isExtensible")return;const l=c,u=o[l];typeof u=="object"&&i.set(u.order,{id:l,metadata:u})});const a=Array.from(i.values()).sort((c,l)=>(c.metadata.order||0)-(l.metadata.order||0));return E.jsx(ae.Grid,{container:!0,spacing:0,className:`papi-multi-column-menu ${n??""}`,columns:a.length,role:"menu","aria-label":"GridMenu",id:r,children:a.map((c,l)=>E.jsx(vo,{commandHandler:e,menuDefinition:t,...c,className:n},l))})}function xo({id:e,label:n,isDisabled:t=!1,tooltip:r,isTooltipSuppressed:o=!1,adjustMarginToAlignToEdge:i=!1,size:a="medium",className:c,onClick:l,children:u}){return E.jsx(ae.IconButton,{id:e,disabled:t,edge:i,size:a,"aria-label":n,title:o?void 0:r??n,className:`papi-icon-button ${c??""}`,onClick:l,children:u})}function T(){return T=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},T.apply(this,arguments)}function le(e,n){if(e==null)return{};var t={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(n.indexOf(o)>=0)&&(t[o]=e[o]);return t}function Eo(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ot={exports:{}},te={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var It;function To(){if(It)return te;It=1;var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),c=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),y;y=Symbol.for("react.module.reference");function g(h){if(typeof h=="object"&&h!==null){var k=h.$$typeof;switch(k){case e:switch(h=h.type,h){case t:case o:case r:case u:case d:return h;default:switch(h=h&&h.$$typeof,h){case c:case a:case l:case f:case p:case i:return h;default:return k}}case n:return k}}}return te.ContextConsumer=a,te.ContextProvider=i,te.Element=e,te.ForwardRef=l,te.Fragment=t,te.Lazy=f,te.Memo=p,te.Portal=n,te.Profiler=o,te.StrictMode=r,te.Suspense=u,te.SuspenseList=d,te.isAsyncMode=function(){return!1},te.isConcurrentMode=function(){return!1},te.isContextConsumer=function(h){return g(h)===a},te.isContextProvider=function(h){return g(h)===i},te.isElement=function(h){return typeof h=="object"&&h!==null&&h.$$typeof===e},te.isForwardRef=function(h){return g(h)===l},te.isFragment=function(h){return g(h)===t},te.isLazy=function(h){return g(h)===f},te.isMemo=function(h){return g(h)===p},te.isPortal=function(h){return g(h)===n},te.isProfiler=function(h){return g(h)===o},te.isStrictMode=function(h){return g(h)===r},te.isSuspense=function(h){return g(h)===u},te.isSuspenseList=function(h){return g(h)===d},te.isValidElementType=function(h){return typeof h=="string"||typeof h=="function"||h===t||h===o||h===r||h===u||h===d||h===b||typeof h=="object"&&h!==null&&(h.$$typeof===f||h.$$typeof===p||h.$$typeof===i||h.$$typeof===a||h.$$typeof===l||h.$$typeof===y||h.getModuleId!==void 0)},te.typeOf=g,te}var re={};/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mt;function ko(){return Mt||(Mt=1,process.env.NODE_ENV!=="production"&&function(){var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),a=Symbol.for("react.context"),c=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),d=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),y=!1,g=!1,h=!1,k=!1,D=!1,x;x=Symbol.for("react.module.reference");function O(S){return!!(typeof S=="string"||typeof S=="function"||S===t||S===o||D||S===r||S===u||S===d||k||S===b||y||g||h||typeof S=="object"&&S!==null&&(S.$$typeof===f||S.$$typeof===p||S.$$typeof===i||S.$$typeof===a||S.$$typeof===l||S.$$typeof===x||S.getModuleId!==void 0))}function m(S){if(typeof S=="object"&&S!==null){var he=S.$$typeof;switch(he){case e:var ye=S.type;switch(ye){case t:case o:case r:case u:case d:return ye;default:var Oe=ye&&ye.$$typeof;switch(Oe){case c:case a:case l:case f:case p:case i:return Oe;default:return he}}case n:return he}}}var _=a,N=i,H=e,J=l,Y=t,q=f,W=p,ee=n,A=o,R=r,$=u,j=d,se=!1,Z=!1;function v(S){return se||(se=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")),!1}function P(S){return Z||(Z=!0,console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")),!1}function I(S){return m(S)===a}function V(S){return m(S)===i}function M(S){return typeof S=="object"&&S!==null&&S.$$typeof===e}function F(S){return m(S)===l}function B(S){return m(S)===t}function L(S){return m(S)===f}function G(S){return m(S)===p}function K(S){return m(S)===n}function z(S){return m(S)===o}function pe(S){return m(S)===r}function C(S){return m(S)===u}function U(S){return m(S)===d}re.ContextConsumer=_,re.ContextProvider=N,re.Element=H,re.ForwardRef=J,re.Fragment=Y,re.Lazy=q,re.Memo=W,re.Portal=ee,re.Profiler=A,re.StrictMode=R,re.Suspense=$,re.SuspenseList=j,re.isAsyncMode=v,re.isConcurrentMode=P,re.isContextConsumer=I,re.isContextProvider=V,re.isElement=M,re.isForwardRef=F,re.isFragment=B,re.isLazy=L,re.isMemo=G,re.isPortal=K,re.isProfiler=z,re.isStrictMode=pe,re.isSuspense=C,re.isSuspenseList=U,re.isValidElementType=O,re.typeOf=m}()),re}process.env.NODE_ENV==="production"?ot.exports=To():ot.exports=ko();var Cn=ot.exports,it={exports:{}},En={exports:{}},oe={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var At;function So(){if(At)return oe;At=1;var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,l=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,k=e?Symbol.for("react.responder"):60118,D=e?Symbol.for("react.scope"):60119;function x(m){if(typeof m=="object"&&m!==null){var _=m.$$typeof;switch(_){case n:switch(m=m.type,m){case l:case u:case r:case i:case o:case p:return m;default:switch(m=m&&m.$$typeof,m){case c:case d:case y:case b:case a:return m;default:return _}}case t:return _}}}function O(m){return x(m)===u}return oe.AsyncMode=l,oe.ConcurrentMode=u,oe.ContextConsumer=c,oe.ContextProvider=a,oe.Element=n,oe.ForwardRef=d,oe.Fragment=r,oe.Lazy=y,oe.Memo=b,oe.Portal=t,oe.Profiler=i,oe.StrictMode=o,oe.Suspense=p,oe.isAsyncMode=function(m){return O(m)||x(m)===l},oe.isConcurrentMode=O,oe.isContextConsumer=function(m){return x(m)===c},oe.isContextProvider=function(m){return x(m)===a},oe.isElement=function(m){return typeof m=="object"&&m!==null&&m.$$typeof===n},oe.isForwardRef=function(m){return x(m)===d},oe.isFragment=function(m){return x(m)===r},oe.isLazy=function(m){return x(m)===y},oe.isMemo=function(m){return x(m)===b},oe.isPortal=function(m){return x(m)===t},oe.isProfiler=function(m){return x(m)===i},oe.isStrictMode=function(m){return x(m)===o},oe.isSuspense=function(m){return x(m)===p},oe.isValidElementType=function(m){return typeof m=="string"||typeof m=="function"||m===r||m===u||m===i||m===o||m===p||m===f||typeof m=="object"&&m!==null&&(m.$$typeof===y||m.$$typeof===b||m.$$typeof===a||m.$$typeof===c||m.$$typeof===d||m.$$typeof===h||m.$$typeof===k||m.$$typeof===D||m.$$typeof===g)},oe.typeOf=x,oe}var ie={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jt;function wo(){return jt||(jt=1,process.env.NODE_ENV!=="production"&&function(){var e=typeof Symbol=="function"&&Symbol.for,n=e?Symbol.for("react.element"):60103,t=e?Symbol.for("react.portal"):60106,r=e?Symbol.for("react.fragment"):60107,o=e?Symbol.for("react.strict_mode"):60108,i=e?Symbol.for("react.profiler"):60114,a=e?Symbol.for("react.provider"):60109,c=e?Symbol.for("react.context"):60110,l=e?Symbol.for("react.async_mode"):60111,u=e?Symbol.for("react.concurrent_mode"):60111,d=e?Symbol.for("react.forward_ref"):60112,p=e?Symbol.for("react.suspense"):60113,f=e?Symbol.for("react.suspense_list"):60120,b=e?Symbol.for("react.memo"):60115,y=e?Symbol.for("react.lazy"):60116,g=e?Symbol.for("react.block"):60121,h=e?Symbol.for("react.fundamental"):60117,k=e?Symbol.for("react.responder"):60118,D=e?Symbol.for("react.scope"):60119;function x(C){return typeof C=="string"||typeof C=="function"||C===r||C===u||C===i||C===o||C===p||C===f||typeof C=="object"&&C!==null&&(C.$$typeof===y||C.$$typeof===b||C.$$typeof===a||C.$$typeof===c||C.$$typeof===d||C.$$typeof===h||C.$$typeof===k||C.$$typeof===D||C.$$typeof===g)}function O(C){if(typeof C=="object"&&C!==null){var U=C.$$typeof;switch(U){case n:var S=C.type;switch(S){case l:case u:case r:case i:case o:case p:return S;default:var he=S&&S.$$typeof;switch(he){case c:case d:case y:case b:case a:return he;default:return U}}case t:return U}}}var m=l,_=u,N=c,H=a,J=n,Y=d,q=r,W=y,ee=b,A=t,R=i,$=o,j=p,se=!1;function Z(C){return se||(se=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),v(C)||O(C)===l}function v(C){return O(C)===u}function P(C){return O(C)===c}function I(C){return O(C)===a}function V(C){return typeof C=="object"&&C!==null&&C.$$typeof===n}function M(C){return O(C)===d}function F(C){return O(C)===r}function B(C){return O(C)===y}function L(C){return O(C)===b}function G(C){return O(C)===t}function K(C){return O(C)===i}function z(C){return O(C)===o}function pe(C){return O(C)===p}ie.AsyncMode=m,ie.ConcurrentMode=_,ie.ContextConsumer=N,ie.ContextProvider=H,ie.Element=J,ie.ForwardRef=Y,ie.Fragment=q,ie.Lazy=W,ie.Memo=ee,ie.Portal=A,ie.Profiler=R,ie.StrictMode=$,ie.Suspense=j,ie.isAsyncMode=Z,ie.isConcurrentMode=v,ie.isContextConsumer=P,ie.isContextProvider=I,ie.isElement=V,ie.isForwardRef=M,ie.isFragment=F,ie.isLazy=B,ie.isMemo=L,ie.isPortal=G,ie.isProfiler=K,ie.isStrictMode=z,ie.isSuspense=pe,ie.isValidElementType=x,ie.typeOf=O}()),ie}var Dt;function Or(){return Dt||(Dt=1,process.env.NODE_ENV==="production"?En.exports=So():En.exports=wo()),En.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var Hn,Bt;function Oo(){if(Bt)return Hn;Bt=1;var e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable;function r(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function o(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var a={},c=0;c<10;c++)a["_"+String.fromCharCode(c)]=c;var l=Object.getOwnPropertyNames(a).map(function(d){return a[d]});if(l.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(d){u[d]=d}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return Hn=o()?Object.assign:function(i,a){for(var c,l=r(i),u,d=1;d<arguments.length;d++){c=Object(arguments[d]);for(var p in c)n.call(c,p)&&(l[p]=c[p]);if(e){u=e(c);for(var f=0;f<u.length;f++)t.call(c,u[f])&&(l[u[f]]=c[u[f]])}}return l},Hn}var qn,Lt;function ft(){if(Lt)return qn;Lt=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return qn=e,qn}var Wn,Ft;function Cr(){return Ft||(Ft=1,Wn=Function.call.bind(Object.prototype.hasOwnProperty)),Wn}var Gn,Vt;function Co(){if(Vt)return Gn;Vt=1;var e=function(){};if(process.env.NODE_ENV!=="production"){var n=ft(),t={},r=Cr();e=function(i){var a="Warning: "+i;typeof console<"u"&&console.error(a);try{throw new Error(a)}catch{}}}function o(i,a,c,l,u){if(process.env.NODE_ENV!=="production"){for(var d in i)if(r(i,d)){var p;try{if(typeof i[d]!="function"){var f=Error((l||"React class")+": "+c+" type `"+d+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof i[d]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw f.name="Invariant Violation",f}p=i[d](a,d,l,c,null,n)}catch(y){p=y}if(p&&!(p instanceof Error)&&e((l||"React class")+": type specification of "+c+" `"+d+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+typeof p+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),p instanceof Error&&!(p.message in t)){t[p.message]=!0;var b=u?u():"";e("Failed "+c+" type: "+p.message+(b??""))}}}}return o.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(t={})},Gn=o,Gn}var Kn,zt;function Po(){if(zt)return Kn;zt=1;var e=Or(),n=Oo(),t=ft(),r=Cr(),o=Co(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(c){var l="Warning: "+c;typeof console<"u"&&console.error(l);try{throw new Error(l)}catch{}});function a(){return null}return Kn=function(c,l){var u=typeof Symbol=="function"&&Symbol.iterator,d="@@iterator";function p(v){var P=v&&(u&&v[u]||v[d]);if(typeof P=="function")return P}var f="<<anonymous>>",b={array:k("array"),bigint:k("bigint"),bool:k("boolean"),func:k("function"),number:k("number"),object:k("object"),string:k("string"),symbol:k("symbol"),any:D(),arrayOf:x,element:O(),elementType:m(),instanceOf:_,node:Y(),objectOf:H,oneOf:N,oneOfType:J,shape:W,exact:ee};function y(v,P){return v===P?v!==0||1/v===1/P:v!==v&&P!==P}function g(v,P){this.message=v,this.data=P&&typeof P=="object"?P:{},this.stack=""}g.prototype=Error.prototype;function h(v){if(process.env.NODE_ENV!=="production")var P={},I=0;function V(F,B,L,G,K,z,pe){if(G=G||f,z=z||L,pe!==t){if(l){var C=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw C.name="Invariant Violation",C}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var U=G+":"+L;!P[U]&&I<3&&(i("You are manually calling a React.PropTypes validation function for the `"+z+"` prop on `"+G+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),P[U]=!0,I++)}}return B[L]==null?F?B[L]===null?new g("The "+K+" `"+z+"` is marked as required "+("in `"+G+"`, but its value is `null`.")):new g("The "+K+" `"+z+"` is marked as required in "+("`"+G+"`, but its value is `undefined`.")):null:v(B,L,G,K,z)}var M=V.bind(null,!1);return M.isRequired=V.bind(null,!0),M}function k(v){function P(I,V,M,F,B,L){var G=I[V],K=$(G);if(K!==v){var z=j(G);return new g("Invalid "+F+" `"+B+"` of type "+("`"+z+"` supplied to `"+M+"`, expected ")+("`"+v+"`."),{expectedType:v})}return null}return h(P)}function D(){return h(a)}function x(v){function P(I,V,M,F,B){if(typeof v!="function")return new g("Property `"+B+"` of component `"+M+"` has invalid PropType notation inside arrayOf.");var L=I[V];if(!Array.isArray(L)){var G=$(L);return new g("Invalid "+F+" `"+B+"` of type "+("`"+G+"` supplied to `"+M+"`, expected an array."))}for(var K=0;K<L.length;K++){var z=v(L,K,M,F,B+"["+K+"]",t);if(z instanceof Error)return z}return null}return h(P)}function O(){function v(P,I,V,M,F){var B=P[I];if(!c(B)){var L=$(B);return new g("Invalid "+M+" `"+F+"` of type "+("`"+L+"` supplied to `"+V+"`, expected a single ReactElement."))}return null}return h(v)}function m(){function v(P,I,V,M,F){var B=P[I];if(!e.isValidElementType(B)){var L=$(B);return new g("Invalid "+M+" `"+F+"` of type "+("`"+L+"` supplied to `"+V+"`, expected a single ReactElement type."))}return null}return h(v)}function _(v){function P(I,V,M,F,B){if(!(I[V]instanceof v)){var L=v.name||f,G=Z(I[V]);return new g("Invalid "+F+" `"+B+"` of type "+("`"+G+"` supplied to `"+M+"`, expected ")+("instance of `"+L+"`."))}return null}return h(P)}function N(v){if(!Array.isArray(v))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),a;function P(I,V,M,F,B){for(var L=I[V],G=0;G<v.length;G++)if(y(L,v[G]))return null;var K=JSON.stringify(v,function(pe,C){var U=j(C);return U==="symbol"?String(C):C});return new g("Invalid "+F+" `"+B+"` of value `"+String(L)+"` "+("supplied to `"+M+"`, expected one of "+K+"."))}return h(P)}function H(v){function P(I,V,M,F,B){if(typeof v!="function")return new g("Property `"+B+"` of component `"+M+"` has invalid PropType notation inside objectOf.");var L=I[V],G=$(L);if(G!=="object")return new g("Invalid "+F+" `"+B+"` of type "+("`"+G+"` supplied to `"+M+"`, expected an object."));for(var K in L)if(r(L,K)){var z=v(L,K,M,F,B+"."+K,t);if(z instanceof Error)return z}return null}return h(P)}function J(v){if(!Array.isArray(v))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),a;for(var P=0;P<v.length;P++){var I=v[P];if(typeof I!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+se(I)+" at index "+P+"."),a}function V(M,F,B,L,G){for(var K=[],z=0;z<v.length;z++){var pe=v[z],C=pe(M,F,B,L,G,t);if(C==null)return null;C.data&&r(C.data,"expectedType")&&K.push(C.data.expectedType)}var U=K.length>0?", expected one of type ["+K.join(", ")+"]":"";return new g("Invalid "+L+" `"+G+"` supplied to "+("`"+B+"`"+U+"."))}return h(V)}function Y(){function v(P,I,V,M,F){return A(P[I])?null:new g("Invalid "+M+" `"+F+"` supplied to "+("`"+V+"`, expected a ReactNode."))}return h(v)}function q(v,P,I,V,M){return new g((v||"React class")+": "+P+" type `"+I+"."+V+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+M+"`.")}function W(v){function P(I,V,M,F,B){var L=I[V],G=$(L);if(G!=="object")return new g("Invalid "+F+" `"+B+"` of type `"+G+"` "+("supplied to `"+M+"`, expected `object`."));for(var K in v){var z=v[K];if(typeof z!="function")return q(M,F,B,K,j(z));var pe=z(L,K,M,F,B+"."+K,t);if(pe)return pe}return null}return h(P)}function ee(v){function P(I,V,M,F,B){var L=I[V],G=$(L);if(G!=="object")return new g("Invalid "+F+" `"+B+"` of type `"+G+"` "+("supplied to `"+M+"`, expected `object`."));var K=n({},I[V],v);for(var z in K){var pe=v[z];if(r(v,z)&&typeof pe!="function")return q(M,F,B,z,j(pe));if(!pe)return new g("Invalid "+F+" `"+B+"` key `"+z+"` supplied to `"+M+"`.\nBad object: "+JSON.stringify(I[V],null,"  ")+`
Valid keys: `+JSON.stringify(Object.keys(v),null,"  "));var C=pe(L,z,M,F,B+"."+z,t);if(C)return C}return null}return h(P)}function A(v){switch(typeof v){case"number":case"string":case"undefined":return!0;case"boolean":return!v;case"object":if(Array.isArray(v))return v.every(A);if(v===null||c(v))return!0;var P=p(v);if(P){var I=P.call(v),V;if(P!==v.entries){for(;!(V=I.next()).done;)if(!A(V.value))return!1}else for(;!(V=I.next()).done;){var M=V.value;if(M&&!A(M[1]))return!1}}else return!1;return!0;default:return!1}}function R(v,P){return v==="symbol"?!0:P?P["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&P instanceof Symbol:!1}function $(v){var P=typeof v;return Array.isArray(v)?"array":v instanceof RegExp?"object":R(P,v)?"symbol":P}function j(v){if(typeof v>"u"||v===null)return""+v;var P=$(v);if(P==="object"){if(v instanceof Date)return"date";if(v instanceof RegExp)return"regexp"}return P}function se(v){var P=j(v);switch(P){case"array":case"object":return"an "+P;case"boolean":case"date":case"regexp":return"a "+P;default:return P}}function Z(v){return!v.constructor||!v.constructor.name?f:v.constructor.name}return b.checkPropTypes=o,b.resetWarningCache=o.resetWarningCache,b.PropTypes=b,b},Kn}var Xn,Ut;function Ro(){if(Ut)return Xn;Ut=1;var e=ft();function n(){}function t(){}return t.resetWarningCache=n,Xn=function(){function r(a,c,l,u,d,p){if(p!==e){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}r.isRequired=r;function o(){return r}var i={array:r,bigint:r,bool:r,func:r,number:r,object:r,string:r,symbol:r,any:r,arrayOf:o,element:r,elementType:r,instanceOf:o,node:r,objectOf:o,oneOf:o,oneOfType:o,shape:o,exact:o,checkPropTypes:t,resetWarningCache:n};return i.PropTypes=i,i},Xn}if(process.env.NODE_ENV!=="production"){var No=Or(),$o=!0;it.exports=Po()(No.isElement,$o)}else it.exports=Ro()();var _o=it.exports;const s=Eo(_o);function Pr(e){var n,t,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(n=0;n<o;n++)e[n]&&(t=Pr(e[n]))&&(r&&(r+=" "),r+=t)}else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function Pe(){for(var e,n,t=0,r="",o=arguments.length;t<o;t++)(e=arguments[t])&&(n=Pr(e))&&(r&&(r+=" "),r+=n);return r}function yn(e,n){return process.env.NODE_ENV==="production"?()=>null:function(...r){return e(...r)||n(...r)}}function Le(e){if(typeof e!="object"||e===null)return!1;const n=Object.getPrototypeOf(e);return(n===null||n===Object.prototype||Object.getPrototypeOf(n)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Rr(e){if(!Le(e))return e;const n={};return Object.keys(e).forEach(t=>{n[t]=Rr(e[t])}),n}function Ce(e,n,t={clone:!0}){const r=t.clone?T({},e):e;return Le(e)&&Le(n)&&Object.keys(n).forEach(o=>{o!=="__proto__"&&(Le(n[o])&&o in e&&Le(e[o])?r[o]=Ce(e[o],n[o],t):t.clone?r[o]=Le(n[o])?Rr(n[o]):n[o]:r[o]=n[o])}),r}function Io(e){const{prototype:n={}}=e;return!!n.isReactComponent}function Nr(e,n,t,r,o){const i=e[n],a=o||n;if(i==null||typeof window>"u")return null;let c;const l=i.type;return typeof l=="function"&&!Io(l)&&(c="Did you accidentally use a plain function component for an element instead?"),c!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${t}\`. Expected an element that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const $r=yn(s.element,Nr);$r.isRequired=yn(s.element.isRequired,Nr);const In=$r;function Mo(e){const{prototype:n={}}=e;return!!n.isReactComponent}function Ao(e,n,t,r,o){const i=e[n],a=o||n;if(i==null||typeof window>"u")return null;let c;return typeof i=="function"&&!Mo(i)&&(c="Did you accidentally provide a plain function component instead?"),c!==void 0?new Error(`Invalid ${r} \`${a}\` supplied to \`${t}\`. Expected an element type that can hold a ref. ${c} For more information see https://mui.com/r/caveat-with-refs-guide`):null}const jo=yn(s.elementType,Ao),Do="exact-prop: ​";function _r(e){return process.env.NODE_ENV==="production"?e:T({},e,{[Do]:n=>{const t=Object.keys(n).filter(r=>!e.hasOwnProperty(r));return t.length>0?new Error(`The following props are not supported: ${t.map(r=>`\`${r}\``).join(", ")}. Please remove them.`):null}})}function tn(e){let n="https://mui.com/production-error/?code="+e;for(let t=1;t<arguments.length;t+=1)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified MUI error #"+e+"; visit "+n+" for the full message."}const Bo=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function Lo(e){const n=`${e}`.match(Bo);return n&&n[1]||""}function Ir(e,n=""){return e.displayName||e.name||Lo(e)||n}function Ht(e,n,t){const r=Ir(n);return e.displayName||(r!==""?`${t}(${r})`:t)}function Fo(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return Ir(e,"Component");if(typeof e=="object")switch(e.$$typeof){case Cn.ForwardRef:return Ht(e,e.render,"ForwardRef");case Cn.Memo:return Ht(e,e.type,"memo");default:return}}}function hn(e,n,t,r,o){if(process.env.NODE_ENV==="production")return null;const i=e[n],a=o||n;return i==null?null:i&&i.nodeType!==1?new Error(`Invalid ${r} \`${a}\` supplied to \`${t}\`. Expected an HTMLElement.`):null}const Vo=s.oneOfType([s.func,s.object]),zo=Vo;function Fe(e){if(typeof e!="string")throw new Error(process.env.NODE_ENV!=="production"?"MUI: `capitalize(string)` expects a string argument.":tn(7));return e.charAt(0).toUpperCase()+e.slice(1)}function qt(...e){return e.reduce((n,t)=>t==null?n:function(...o){n.apply(this,o),t.apply(this,o)},()=>{})}function Uo(e,n=166){let t;function r(...o){const i=()=>{e.apply(this,o)};clearTimeout(t),t=setTimeout(i,n)}return r.clear=()=>{clearTimeout(t)},r}function xe(e){return e&&e.ownerDocument||document}function mn(e){return xe(e).defaultView||window}function st(e,n){typeof e=="function"?e(n):e&&(e.current=n)}const Ho=typeof window<"u"?w.useLayoutEffect:w.useEffect,Pn=Ho;function Wt(e){const n=w.useRef(e);return Pn(()=>{n.current=e}),w.useRef((...t)=>(0,n.current)(...t)).current}function Ie(...e){return w.useMemo(()=>e.every(n=>n==null)?null:n=>{e.forEach(t=>{st(t,n)})},e)}const Gt={};function qo(e,n){const t=w.useRef(Gt);return t.current===Gt&&(t.current=e(n)),t}const Wo=[];function Go(e){w.useEffect(e,Wo)}class pt{constructor(){this.currentId=0,this.clear=()=>{this.currentId!==0&&(clearTimeout(this.currentId),this.currentId=0)},this.disposeEffect=()=>this.clear}static create(){return new pt}start(n,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=0,t()},n)}}function Ko(){const e=qo(pt.create).current;return Go(e.disposeEffect),e}function Mr(e){const n=e.documentElement.clientWidth;return Math.abs(window.innerWidth-n)}function Xo(e){const n=typeof e;switch(n){case"number":return Number.isNaN(e)?"NaN":Number.isFinite(e)?e!==Math.floor(e)?"float":"number":"Infinity";case"object":return e===null?"null":e.constructor.name;default:return n}}function Yo(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}const Jo=Number.isInteger||Yo;function Ar(e,n,t,r){const o=e[n];if(o==null||!Jo(o)){const i=Xo(o);return new RangeError(`Invalid ${r} \`${n}\` of type \`${i}\` supplied to \`${t}\`, expected \`integer\`.`)}return null}function jr(e,n,...t){return e[n]===void 0?null:Ar(e,n,...t)}function at(){return null}jr.isRequired=Ar;at.isRequired=at;const Dr=process.env.NODE_ENV==="production"?at:jr;function Br(e,n){const t=T({},n);return Object.keys(e).forEach(r=>{if(r.toString().match(/^(components|slots)$/))t[r]=T({},e[r],t[r]);else if(r.toString().match(/^(componentsProps|slotProps)$/)){const o=e[r]||{},i=n[r];t[r]={},!i||!Object.keys(i)?t[r]=o:!o||!Object.keys(o)?t[r]=i:(t[r]=T({},i),Object.keys(o).forEach(a=>{t[r][a]=Br(o[a],i[a])}))}else t[r]===void 0&&(t[r]=e[r])}),t}function Ue(e,n,t=void 0){const r={};return Object.keys(e).forEach(o=>{r[o]=e[o].reduce((i,a)=>{if(a){const c=n(a);c!==""&&i.push(c),t&&t[a]&&i.push(t[a])}return i},[]).join(" ")}),r}const Kt=e=>e,Zo=()=>{let e=Kt;return{configure(n){e=n},generate(n){return e(n)},reset(){e=Kt}}},Qo=Zo(),ei=Qo,ni={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Ne(e,n,t="Mui"){const r=ni[n];return r?`${t}-${r}`:`${ei.generate(e)}-${n}`}function He(e,n,t="Mui"){const r={};return n.forEach(o=>{r[o]=Ne(e,o,t)}),r}function ti(e,n=Number.MIN_SAFE_INTEGER,t=Number.MAX_SAFE_INTEGER){return Math.max(n,Math.min(e,t))}function Lr(e){return typeof e=="string"}function ri(e,n,t){return e===void 0||Lr(e)?n:T({},n,{ownerState:T({},n.ownerState,t)})}function Fr(e,n=[]){if(e===void 0)return{};const t={};return Object.keys(e).filter(r=>r.match(/^on[A-Z]/)&&typeof e[r]=="function"&&!n.includes(r)).forEach(r=>{t[r]=e[r]}),t}function oi(e,n,t){return typeof e=="function"?e(n,t):e}function Vr(e){var n,t,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(n=0;n<o;n++)e[n]&&(t=Vr(e[n]))&&(r&&(r+=" "),r+=t)}else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function Xt(){for(var e,n,t=0,r="",o=arguments.length;t<o;t++)(e=arguments[t])&&(n=Vr(e))&&(r&&(r+=" "),r+=n);return r}function Yt(e){if(e===void 0)return{};const n={};return Object.keys(e).filter(t=>!(t.match(/^on[A-Z]/)&&typeof e[t]=="function")).forEach(t=>{n[t]=e[t]}),n}function ii(e){const{getSlotProps:n,additionalProps:t,externalSlotProps:r,externalForwardedProps:o,className:i}=e;if(!n){const b=Xt(t==null?void 0:t.className,i,o==null?void 0:o.className,r==null?void 0:r.className),y=T({},t==null?void 0:t.style,o==null?void 0:o.style,r==null?void 0:r.style),g=T({},t,o,r);return b.length>0&&(g.className=b),Object.keys(y).length>0&&(g.style=y),{props:g,internalRef:void 0}}const a=Fr(T({},o,r)),c=Yt(r),l=Yt(o),u=n(a),d=Xt(u==null?void 0:u.className,t==null?void 0:t.className,i,o==null?void 0:o.className,r==null?void 0:r.className),p=T({},u==null?void 0:u.style,t==null?void 0:t.style,o==null?void 0:o.style,r==null?void 0:r.style),f=T({},u,t,l,c);return d.length>0&&(f.className=d),Object.keys(p).length>0&&(f.style=p),{props:f,internalRef:u.ref}}const si=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function rn(e){var n;const{elementType:t,externalSlotProps:r,ownerState:o,skipResolvingSlotProps:i=!1}=e,a=le(e,si),c=i?{}:oi(r,o),{props:l,internalRef:u}=ii(T({},a,{externalSlotProps:c})),d=Ie(u,c==null?void 0:c.ref,(n=e.additionalProps)==null?void 0:n.ref);return ri(t,T({},l,{ref:d}),o)}const ai=["values","unit","step"],ci=e=>{const n=Object.keys(e).map(t=>({key:t,val:e[t]}))||[];return n.sort((t,r)=>t.val-r.val),n.reduce((t,r)=>T({},t,{[r.key]:r.val}),{})};function li(e){const{values:n={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:t="px",step:r=5}=e,o=le(e,ai),i=ci(n),a=Object.keys(i);function c(f){return`@media (min-width:${typeof n[f]=="number"?n[f]:f}${t})`}function l(f){return`@media (max-width:${(typeof n[f]=="number"?n[f]:f)-r/100}${t})`}function u(f,b){const y=a.indexOf(b);return`@media (min-width:${typeof n[f]=="number"?n[f]:f}${t}) and (max-width:${(y!==-1&&typeof n[a[y]]=="number"?n[a[y]]:b)-r/100}${t})`}function d(f){return a.indexOf(f)+1<a.length?u(f,a[a.indexOf(f)+1]):c(f)}function p(f){const b=a.indexOf(f);return b===0?c(a[1]):b===a.length-1?l(a[b]):u(f,a[a.indexOf(f)+1]).replace("@media","@media not all and")}return T({keys:a,values:i,up:c,down:l,between:u,only:d,not:p,unit:t},o)}const ui={borderRadius:4},di=ui,fi=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.string,s.object,s.array]):{},Me=fi;function fn(e,n){return n?Ce(e,n,{clone:!1}):e}const ht={xs:0,sm:600,md:900,lg:1200,xl:1536},Jt={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${ht[e]}px)`};function Re(e,n,t){const r=e.theme||{};if(Array.isArray(n)){const i=r.breakpoints||Jt;return n.reduce((a,c,l)=>(a[i.up(i.keys[l])]=t(n[l]),a),{})}if(typeof n=="object"){const i=r.breakpoints||Jt;return Object.keys(n).reduce((a,c)=>{if(Object.keys(i.values||ht).indexOf(c)!==-1){const l=i.up(c);a[l]=t(n[c],c)}else{const l=c;a[l]=n[l]}return a},{})}return t(n)}function pi(e={}){var n;return((n=e.keys)==null?void 0:n.reduce((r,o)=>{const i=e.up(o);return r[i]={},r},{}))||{}}function hi(e,n){return e.reduce((t,r)=>{const o=t[r];return(!o||Object.keys(o).length===0)&&delete t[r],t},n)}function Mn(e,n,t=!0){if(!n||typeof n!="string")return null;if(e&&e.vars&&t){const r=`vars.${n}`.split(".").reduce((o,i)=>o&&o[i]?o[i]:null,e);if(r!=null)return r}return n.split(".").reduce((r,o)=>r&&r[o]!=null?r[o]:null,e)}function Rn(e,n,t,r=t){let o;return typeof e=="function"?o=e(t):Array.isArray(e)?o=e[t]||r:o=Mn(e,t)||r,n&&(o=n(o,r,e)),o}function fe(e){const{prop:n,cssProperty:t=e.prop,themeKey:r,transform:o}=e,i=a=>{if(a[n]==null)return null;const c=a[n],l=a.theme,u=Mn(l,r)||{};return Re(a,c,p=>{let f=Rn(u,o,p);return p===f&&typeof p=="string"&&(f=Rn(u,o,`${n}${p==="default"?"":Fe(p)}`,p)),t===!1?f:{[t]:f}})};return i.propTypes=process.env.NODE_ENV!=="production"?{[n]:Me}:{},i.filterProps=[n],i}function mi(e){const n={};return t=>(n[t]===void 0&&(n[t]=e(t)),n[t])}const gi={m:"margin",p:"padding"},bi={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Zt={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},yi=mi(e=>{if(e.length>2)if(Zt[e])e=Zt[e];else return[e];const[n,t]=e.split(""),r=gi[n],o=bi[t]||"";return Array.isArray(o)?o.map(i=>r+i):[r+o]}),An=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],jn=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"],vi=[...An,...jn];function vn(e,n,t,r){var o;const i=(o=Mn(e,n,!1))!=null?o:t;return typeof i=="number"?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&typeof a!="number"&&console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`),i*a):Array.isArray(i)?a=>typeof a=="string"?a:(process.env.NODE_ENV!=="production"&&(Number.isInteger(a)?a>i.length-1&&console.error([`MUI: The value provided (${a}) overflows.`,`The supported values are: ${JSON.stringify(i)}.`,`${a} > ${i.length-1}, you need to add the missing values.`].join(`
`)):console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))),i[a]):typeof i=="function"?i:(process.env.NODE_ENV!=="production"&&console.error([`MUI: The \`theme.${n}\` value (${i}) is invalid.`,"It should be a number, an array or a function."].join(`
`)),()=>{})}function zr(e){return vn(e,"spacing",8,"spacing")}function xn(e,n){if(typeof n=="string"||n==null)return n;const t=Math.abs(n),r=e(t);return n>=0?r:typeof r=="number"?-r:`-${r}`}function xi(e,n){return t=>e.reduce((r,o)=>(r[o]=xn(n,t),r),{})}function Ei(e,n,t,r){if(n.indexOf(t)===-1)return null;const o=yi(t),i=xi(o,r),a=e[t];return Re(e,a,i)}function Ur(e,n){const t=zr(e.theme);return Object.keys(e).map(r=>Ei(e,n,r,t)).reduce(fn,{})}function ue(e){return Ur(e,An)}ue.propTypes=process.env.NODE_ENV!=="production"?An.reduce((e,n)=>(e[n]=Me,e),{}):{};ue.filterProps=An;function de(e){return Ur(e,jn)}de.propTypes=process.env.NODE_ENV!=="production"?jn.reduce((e,n)=>(e[n]=Me,e),{}):{};de.filterProps=jn;process.env.NODE_ENV!=="production"&&vi.reduce((e,n)=>(e[n]=Me,e),{});function Ti(e=8){if(e.mui)return e;const n=zr({spacing:e}),t=(...r)=>(process.env.NODE_ENV!=="production"&&(r.length<=4||console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)),(r.length===0?[1]:r).map(i=>{const a=n(i);return typeof a=="number"?`${a}px`:a}).join(" "));return t.mui=!0,t}function Dn(...e){const n=e.reduce((r,o)=>(o.filterProps.forEach(i=>{r[i]=o}),r),{}),t=r=>Object.keys(r).reduce((o,i)=>n[i]?fn(o,n[i](r)):o,{});return t.propTypes=process.env.NODE_ENV!=="production"?e.reduce((r,o)=>Object.assign(r,o.propTypes),{}):{},t.filterProps=e.reduce((r,o)=>r.concat(o.filterProps),[]),t}function ve(e){return typeof e!="number"?e:`${e}px solid`}function Ee(e,n){return fe({prop:e,themeKey:"borders",transform:n})}const ki=Ee("border",ve),Si=Ee("borderTop",ve),wi=Ee("borderRight",ve),Oi=Ee("borderBottom",ve),Ci=Ee("borderLeft",ve),Pi=Ee("borderColor"),Ri=Ee("borderTopColor"),Ni=Ee("borderRightColor"),$i=Ee("borderBottomColor"),_i=Ee("borderLeftColor"),Ii=Ee("outline",ve),Mi=Ee("outlineColor"),Bn=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const n=vn(e.theme,"shape.borderRadius",4,"borderRadius"),t=r=>({borderRadius:xn(n,r)});return Re(e,e.borderRadius,t)}return null};Bn.propTypes=process.env.NODE_ENV!=="production"?{borderRadius:Me}:{};Bn.filterProps=["borderRadius"];Dn(ki,Si,wi,Oi,Ci,Pi,Ri,Ni,$i,_i,Bn,Ii,Mi);const Ln=e=>{if(e.gap!==void 0&&e.gap!==null){const n=vn(e.theme,"spacing",8,"gap"),t=r=>({gap:xn(n,r)});return Re(e,e.gap,t)}return null};Ln.propTypes=process.env.NODE_ENV!=="production"?{gap:Me}:{};Ln.filterProps=["gap"];const Fn=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const n=vn(e.theme,"spacing",8,"columnGap"),t=r=>({columnGap:xn(n,r)});return Re(e,e.columnGap,t)}return null};Fn.propTypes=process.env.NODE_ENV!=="production"?{columnGap:Me}:{};Fn.filterProps=["columnGap"];const Vn=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const n=vn(e.theme,"spacing",8,"rowGap"),t=r=>({rowGap:xn(n,r)});return Re(e,e.rowGap,t)}return null};Vn.propTypes=process.env.NODE_ENV!=="production"?{rowGap:Me}:{};Vn.filterProps=["rowGap"];const Ai=fe({prop:"gridColumn"}),ji=fe({prop:"gridRow"}),Di=fe({prop:"gridAutoFlow"}),Bi=fe({prop:"gridAutoColumns"}),Li=fe({prop:"gridAutoRows"}),Fi=fe({prop:"gridTemplateColumns"}),Vi=fe({prop:"gridTemplateRows"}),zi=fe({prop:"gridTemplateAreas"}),Ui=fe({prop:"gridArea"});Dn(Ln,Fn,Vn,Ai,ji,Di,Bi,Li,Fi,Vi,zi,Ui);function nn(e,n){return n==="grey"?n:e}const Hi=fe({prop:"color",themeKey:"palette",transform:nn}),qi=fe({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:nn}),Wi=fe({prop:"backgroundColor",themeKey:"palette",transform:nn});Dn(Hi,qi,Wi);function be(e){return e<=1&&e!==0?`${e*100}%`:e}const Gi=fe({prop:"width",transform:be}),mt=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const n=t=>{var r,o;const i=((r=e.theme)==null||(r=r.breakpoints)==null||(r=r.values)==null?void 0:r[t])||ht[t];return i?((o=e.theme)==null||(o=o.breakpoints)==null?void 0:o.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:be(t)}};return Re(e,e.maxWidth,n)}return null};mt.filterProps=["maxWidth"];const Ki=fe({prop:"minWidth",transform:be}),Xi=fe({prop:"height",transform:be}),Yi=fe({prop:"maxHeight",transform:be}),Ji=fe({prop:"minHeight",transform:be});fe({prop:"size",cssProperty:"width",transform:be});fe({prop:"size",cssProperty:"height",transform:be});const Zi=fe({prop:"boxSizing"});Dn(Gi,mt,Ki,Xi,Yi,Ji,Zi);const Qi={border:{themeKey:"borders",transform:ve},borderTop:{themeKey:"borders",transform:ve},borderRight:{themeKey:"borders",transform:ve},borderBottom:{themeKey:"borders",transform:ve},borderLeft:{themeKey:"borders",transform:ve},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:ve},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Bn},color:{themeKey:"palette",transform:nn},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:nn},backgroundColor:{themeKey:"palette",transform:nn},p:{style:de},pt:{style:de},pr:{style:de},pb:{style:de},pl:{style:de},px:{style:de},py:{style:de},padding:{style:de},paddingTop:{style:de},paddingRight:{style:de},paddingBottom:{style:de},paddingLeft:{style:de},paddingX:{style:de},paddingY:{style:de},paddingInline:{style:de},paddingInlineStart:{style:de},paddingInlineEnd:{style:de},paddingBlock:{style:de},paddingBlockStart:{style:de},paddingBlockEnd:{style:de},m:{style:ue},mt:{style:ue},mr:{style:ue},mb:{style:ue},ml:{style:ue},mx:{style:ue},my:{style:ue},margin:{style:ue},marginTop:{style:ue},marginRight:{style:ue},marginBottom:{style:ue},marginLeft:{style:ue},marginX:{style:ue},marginY:{style:ue},marginInline:{style:ue},marginInlineStart:{style:ue},marginInlineEnd:{style:ue},marginBlock:{style:ue},marginBlockStart:{style:ue},marginBlockEnd:{style:ue},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Ln},rowGap:{style:Vn},columnGap:{style:Fn},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:be},maxWidth:{style:mt},minWidth:{transform:be},height:{transform:be},maxHeight:{transform:be},minHeight:{transform:be},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}},gt=Qi;function es(...e){const n=e.reduce((r,o)=>r.concat(Object.keys(o)),[]),t=new Set(n);return e.every(r=>t.size===Object.keys(r).length)}function ns(e,n){return typeof e=="function"?e(n):e}function ts(){function e(t,r,o,i){const a={[t]:r,theme:o},c=i[t];if(!c)return{[t]:r};const{cssProperty:l=t,themeKey:u,transform:d,style:p}=c;if(r==null)return null;if(u==="typography"&&r==="inherit")return{[t]:r};const f=Mn(o,u)||{};return p?p(a):Re(a,r,y=>{let g=Rn(f,d,y);return y===g&&typeof y=="string"&&(g=Rn(f,d,`${t}${y==="default"?"":Fe(y)}`,y)),l===!1?g:{[l]:g}})}function n(t){var r;const{sx:o,theme:i={}}=t||{};if(!o)return null;const a=(r=i.unstable_sxConfig)!=null?r:gt;function c(l){let u=l;if(typeof l=="function")u=l(i);else if(typeof l!="object")return l;if(!u)return null;const d=pi(i.breakpoints),p=Object.keys(d);let f=d;return Object.keys(u).forEach(b=>{const y=ns(u[b],i);if(y!=null)if(typeof y=="object")if(a[b])f=fn(f,e(b,y,i,a));else{const g=Re({theme:i},y,h=>({[b]:h}));es(g,y)?f[b]=n({sx:y,theme:i}):f=fn(f,g)}else f=fn(f,e(b,y,i,a))}),hi(p,f)}return Array.isArray(o)?o.map(c):c(o)}return n}const Hr=ts();Hr.filterProps=["sx"];const bt=Hr;function rs(e,n){const t=this;return t.vars&&typeof t.getColorSchemeSelector=="function"?{[t.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:n}:t.palette.mode===e?n:{}}const os=["breakpoints","palette","spacing","shape"];function yt(e={},...n){const{breakpoints:t={},palette:r={},spacing:o,shape:i={}}=e,a=le(e,os),c=li(t),l=Ti(o);let u=Ce({breakpoints:c,direction:"ltr",components:{},palette:T({mode:"light"},r),spacing:l,shape:T({},di,i)},a);return u.applyStyles=rs,u=n.reduce((d,p)=>Ce(d,p),u),u.unstable_sxConfig=T({},gt,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(p){return bt({sx:p,theme:this})},u}function is(e){return Object.keys(e).length===0}function ss(e=null){const n=w.useContext(rt.ThemeContext);return!n||is(n)?e:n}const as=yt();function qr(e=as){return ss(e)}const cs=["ownerState"],ls=["variants"],us=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function ds(e){return Object.keys(e).length===0}function fs(e){return typeof e=="string"&&e.charCodeAt(0)>96}function kn(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const ps=yt(),Qt=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function Tn({defaultTheme:e,theme:n,themeId:t}){return ds(n)?e:n[t]||n}function hs(e){return e?(n,t)=>t[e]:null}function Sn(e,n){let{ownerState:t}=n,r=le(n,cs);const o=typeof e=="function"?e(T({ownerState:t},r)):e;if(Array.isArray(o))return o.flatMap(i=>Sn(i,T({ownerState:t},r)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:i=[]}=o;let c=le(o,ls);return i.forEach(l=>{let u=!0;typeof l.props=="function"?u=l.props(T({ownerState:t},r)):Object.keys(l.props).forEach(d=>{(t==null?void 0:t[d])!==l.props[d]&&r[d]!==l.props[d]&&(u=!1)}),u&&(Array.isArray(c)||(c=[c]),c.push(typeof l.style=="function"?l.style(T({ownerState:t},r)):l.style))}),c}return o}function ms(e={}){const{themeId:n,defaultTheme:t=ps,rootShouldForwardProp:r=kn,slotShouldForwardProp:o=kn}=e,i=a=>bt(T({},a,{theme:Tn(T({},a,{defaultTheme:t,themeId:n}))}));return i.__mui_systemSx=!0,(a,c={})=>{rt.internal_processStyles(a,m=>m.filter(_=>!(_!=null&&_.__mui_systemSx)));const{name:l,slot:u,skipVariantsResolver:d,skipSx:p,overridesResolver:f=hs(Qt(u))}=c,b=le(c,us),y=d!==void 0?d:u&&u!=="Root"&&u!=="root"||!1,g=p||!1;let h;process.env.NODE_ENV!=="production"&&l&&(h=`${l}-${Qt(u||"Root")}`);let k=kn;u==="Root"||u==="root"?k=r:u?k=o:fs(a)&&(k=void 0);const D=rt(a,T({shouldForwardProp:k,label:h},b)),x=m=>typeof m=="function"&&m.__emotion_real!==m||Le(m)?_=>Sn(m,T({},_,{theme:Tn({theme:_.theme,defaultTheme:t,themeId:n})})):m,O=(m,..._)=>{let N=x(m);const H=_?_.map(x):[];l&&f&&H.push(q=>{const W=Tn(T({},q,{defaultTheme:t,themeId:n}));if(!W.components||!W.components[l]||!W.components[l].styleOverrides)return null;const ee=W.components[l].styleOverrides,A={};return Object.entries(ee).forEach(([R,$])=>{A[R]=Sn($,T({},q,{theme:W}))}),f(q,A)}),l&&!y&&H.push(q=>{var W;const ee=Tn(T({},q,{defaultTheme:t,themeId:n})),A=ee==null||(W=ee.components)==null||(W=W[l])==null?void 0:W.variants;return Sn({variants:A},T({},q,{theme:ee}))}),g||H.push(i);const J=H.length-_.length;if(Array.isArray(m)&&J>0){const q=new Array(J).fill("");N=[...m,...q],N.raw=[...m.raw,...q]}const Y=D(N,...H);if(process.env.NODE_ENV!=="production"){let q;l&&(q=`${l}${Fe(u||"")}`),q===void 0&&(q=`Styled(${Fo(a)})`),Y.displayName=q}return a.muiName&&(Y.muiName=a.muiName),Y};return D.withConfig&&(O.withConfig=D.withConfig),O}}function gs(e){const{theme:n,name:t,props:r}=e;return!n||!n.components||!n.components[t]||!n.components[t].defaultProps?r:Br(n.components[t].defaultProps,r)}function bs({props:e,name:n,defaultTheme:t,themeId:r}){let o=qr(t);return r&&(o=o[r]||o),gs({theme:o,name:n,props:e})}function vt(e,n=0,t=1){return process.env.NODE_ENV!=="production"&&(e<n||e>t)&&console.error(`MUI: The value provided ${e} is out of range [${n}, ${t}].`),ti(e,n,t)}function ys(e){e=e.slice(1);const n=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let t=e.match(n);return t&&t[0].length===1&&(t=t.map(r=>r+r)),t?`rgb${t.length===4?"a":""}(${t.map((r,o)=>o<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function Ve(e){if(e.type)return e;if(e.charAt(0)==="#")return Ve(ys(e));const n=e.indexOf("("),t=e.substring(0,n);if(["rgb","rgba","hsl","hsla","color"].indexOf(t)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`:tn(9,e));let r=e.substring(n+1,e.length-1),o;if(t==="color"){if(r=r.split(" "),o=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(o)===-1)throw new Error(process.env.NODE_ENV!=="production"?`MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`:tn(10,o))}else r=r.split(",");return r=r.map(i=>parseFloat(i)),{type:t,values:r,colorSpace:o}}function zn(e){const{type:n,colorSpace:t}=e;let{values:r}=e;return n.indexOf("rgb")!==-1?r=r.map((o,i)=>i<3?parseInt(o,10):o):n.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),n.indexOf("color")!==-1?r=`${t} ${r.join(" ")}`:r=`${r.join(", ")}`,`${n}(${r})`}function vs(e){e=Ve(e);const{values:n}=e,t=n[0],r=n[1]/100,o=n[2]/100,i=r*Math.min(o,1-o),a=(u,d=(u+t/30)%12)=>o-i*Math.max(Math.min(d-3,9-d,1),-1);let c="rgb";const l=[Math.round(a(0)*255),Math.round(a(8)*255),Math.round(a(4)*255)];return e.type==="hsla"&&(c+="a",l.push(n[3])),zn({type:c,values:l})}function er(e){e=Ve(e);let n=e.type==="hsl"||e.type==="hsla"?Ve(vs(e)).values:e.values;return n=n.map(t=>(e.type!=="color"&&(t/=255),t<=.03928?t/12.92:((t+.055)/1.055)**2.4)),Number((.2126*n[0]+.7152*n[1]+.0722*n[2]).toFixed(3))}function nr(e,n){const t=er(e),r=er(n);return(Math.max(t,r)+.05)/(Math.min(t,r)+.05)}function tr(e,n){return e=Ve(e),n=vt(n),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${n}`:e.values[3]=n,zn(e)}function xs(e,n){if(e=Ve(e),n=vt(n),e.type.indexOf("hsl")!==-1)e.values[2]*=1-n;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]*=1-n;return zn(e)}function Es(e,n){if(e=Ve(e),n=vt(n),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*n;else if(e.type.indexOf("rgb")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(255-e.values[t])*n;else if(e.type.indexOf("color")!==-1)for(let t=0;t<3;t+=1)e.values[t]+=(1-e.values[t])*n;return zn(e)}function Ts(e,n){return T({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},n)}const ks={black:"#000",white:"#fff"},gn=ks,Ss={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},ws=Ss,Os={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},Ge=Os,Cs={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},Ke=Cs,Ps={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},an=Ps,Rs={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Xe=Rs,Ns={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},Ye=Ns,$s={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},Je=$s,_s=["mode","contrastThreshold","tonalOffset"],rr={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:gn.white,default:gn.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Yn={text:{primary:gn.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:gn.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function or(e,n,t,r){const o=r.light||r,i=r.dark||r*1.5;e[n]||(e.hasOwnProperty(t)?e[n]=e[t]:n==="light"?e.light=Es(e.main,o):n==="dark"&&(e.dark=xs(e.main,i)))}function Is(e="light"){return e==="dark"?{main:Xe[200],light:Xe[50],dark:Xe[400]}:{main:Xe[700],light:Xe[400],dark:Xe[800]}}function Ms(e="light"){return e==="dark"?{main:Ge[200],light:Ge[50],dark:Ge[400]}:{main:Ge[500],light:Ge[300],dark:Ge[700]}}function As(e="light"){return e==="dark"?{main:Ke[500],light:Ke[300],dark:Ke[700]}:{main:Ke[700],light:Ke[400],dark:Ke[800]}}function js(e="light"){return e==="dark"?{main:Ye[400],light:Ye[300],dark:Ye[700]}:{main:Ye[700],light:Ye[500],dark:Ye[900]}}function Ds(e="light"){return e==="dark"?{main:Je[400],light:Je[300],dark:Je[700]}:{main:Je[800],light:Je[500],dark:Je[900]}}function Bs(e="light"){return e==="dark"?{main:an[400],light:an[300],dark:an[700]}:{main:"#ed6c02",light:an[500],dark:an[900]}}function Ls(e){const{mode:n="light",contrastThreshold:t=3,tonalOffset:r=.2}=e,o=le(e,_s),i=e.primary||Is(n),a=e.secondary||Ms(n),c=e.error||As(n),l=e.info||js(n),u=e.success||Ds(n),d=e.warning||Bs(n);function p(g){const h=nr(g,Yn.text.primary)>=t?Yn.text.primary:rr.text.primary;if(process.env.NODE_ENV!=="production"){const k=nr(g,h);k<3&&console.error([`MUI: The contrast ratio of ${k}:1 for ${h} on ${g}`,"falls below the WCAG recommended absolute minimum contrast ratio of 3:1.","https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`))}return h}const f=({color:g,name:h,mainShade:k=500,lightShade:D=300,darkShade:x=700})=>{if(g=T({},g),!g.main&&g[k]&&(g.main=g[k]),!g.hasOwnProperty("main"))throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.`:tn(11,h?` (${h})`:"",k));if(typeof g.main!="string")throw new Error(process.env.NODE_ENV!=="production"?`MUI: The color${h?` (${h})`:""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });`:tn(12,h?` (${h})`:"",JSON.stringify(g.main)));return or(g,"light",D,r),or(g,"dark",x,r),g.contrastText||(g.contrastText=p(g.main)),g},b={dark:Yn,light:rr};return process.env.NODE_ENV!=="production"&&(b[n]||console.error(`MUI: The palette mode \`${n}\` is not supported.`)),Ce(T({common:T({},gn),mode:n,primary:f({color:i,name:"primary"}),secondary:f({color:a,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:f({color:c,name:"error"}),warning:f({color:d,name:"warning"}),info:f({color:l,name:"info"}),success:f({color:u,name:"success"}),grey:ws,contrastThreshold:t,getContrastText:p,augmentColor:f,tonalOffset:r},b[n]),o)}const Fs=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function Vs(e){return Math.round(e*1e5)/1e5}const ir={textTransform:"uppercase"},sr='"Roboto", "Helvetica", "Arial", sans-serif';function zs(e,n){const t=typeof n=="function"?n(e):n,{fontFamily:r=sr,fontSize:o=14,fontWeightLight:i=300,fontWeightRegular:a=400,fontWeightMedium:c=500,fontWeightBold:l=700,htmlFontSize:u=16,allVariants:d,pxToRem:p}=t,f=le(t,Fs);process.env.NODE_ENV!=="production"&&(typeof o!="number"&&console.error("MUI: `fontSize` is required to be a number."),typeof u!="number"&&console.error("MUI: `htmlFontSize` is required to be a number."));const b=o/14,y=p||(k=>`${k/u*b}rem`),g=(k,D,x,O,m)=>T({fontFamily:r,fontWeight:k,fontSize:y(D),lineHeight:x},r===sr?{letterSpacing:`${Vs(O/D)}em`}:{},m,d),h={h1:g(i,96,1.167,-1.5),h2:g(i,60,1.2,-.5),h3:g(a,48,1.167,0),h4:g(a,34,1.235,.25),h5:g(a,24,1.334,0),h6:g(c,20,1.6,.15),subtitle1:g(a,16,1.75,.15),subtitle2:g(c,14,1.57,.1),body1:g(a,16,1.5,.15),body2:g(a,14,1.43,.15),button:g(c,14,1.75,.4,ir),caption:g(a,12,1.66,.4),overline:g(a,12,2.66,1,ir),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Ce(T({htmlFontSize:u,pxToRem:y,fontFamily:r,fontSize:o,fontWeightLight:i,fontWeightRegular:a,fontWeightMedium:c,fontWeightBold:l},h),f,{clone:!1})}const Us=.2,Hs=.14,qs=.12;function ce(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Us})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Hs})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${qs})`].join(",")}const Ws=["none",ce(0,2,1,-1,0,1,1,0,0,1,3,0),ce(0,3,1,-2,0,2,2,0,0,1,5,0),ce(0,3,3,-2,0,3,4,0,0,1,8,0),ce(0,2,4,-1,0,4,5,0,0,1,10,0),ce(0,3,5,-1,0,5,8,0,0,1,14,0),ce(0,3,5,-1,0,6,10,0,0,1,18,0),ce(0,4,5,-2,0,7,10,1,0,2,16,1),ce(0,5,5,-3,0,8,10,1,0,3,14,2),ce(0,5,6,-3,0,9,12,1,0,3,16,2),ce(0,6,6,-3,0,10,14,1,0,4,18,3),ce(0,6,7,-4,0,11,15,1,0,4,20,3),ce(0,7,8,-4,0,12,17,2,0,5,22,4),ce(0,7,8,-4,0,13,19,2,0,5,24,4),ce(0,7,9,-4,0,14,21,2,0,5,26,4),ce(0,8,9,-5,0,15,22,2,0,6,28,5),ce(0,8,10,-5,0,16,24,2,0,6,30,5),ce(0,8,11,-5,0,17,26,2,0,6,32,5),ce(0,9,11,-5,0,18,28,2,0,7,34,6),ce(0,9,12,-6,0,19,29,2,0,7,36,6),ce(0,10,13,-6,0,20,31,3,0,8,38,7),ce(0,10,13,-6,0,21,33,3,0,8,40,7),ce(0,10,14,-6,0,22,35,3,0,8,42,7),ce(0,11,14,-7,0,23,36,3,0,9,44,8),ce(0,11,15,-7,0,24,38,3,0,9,46,8)],Gs=Ws,Ks=["duration","easing","delay"],Xs={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Ys={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function ar(e){return`${Math.round(e)}ms`}function Js(e){if(!e)return 0;const n=e/36;return Math.round((4+15*n**.25+n/5)*10)}function Zs(e){const n=T({},Xs,e.easing),t=T({},Ys,e.duration);return T({getAutoHeightDuration:Js,create:(o=["all"],i={})=>{const{duration:a=t.standard,easing:c=n.easeInOut,delay:l=0}=i,u=le(i,Ks);if(process.env.NODE_ENV!=="production"){const d=f=>typeof f=="string",p=f=>!isNaN(parseFloat(f));!d(o)&&!Array.isArray(o)&&console.error('MUI: Argument "props" must be a string or Array.'),!p(a)&&!d(a)&&console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`),d(c)||console.error('MUI: Argument "easing" must be a string.'),!p(l)&&!d(l)&&console.error('MUI: Argument "delay" must be a number or a string.'),typeof i!="object"&&console.error(["MUI: Secong argument of transition.create must be an object.","Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)),Object.keys(u).length!==0&&console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`)}return(Array.isArray(o)?o:[o]).map(d=>`${d} ${typeof a=="string"?a:ar(a)} ${c} ${typeof l=="string"?l:ar(l)}`).join(",")}},e,{easing:n,duration:t})}const Qs={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},ea=Qs,na=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function ta(e={},...n){const{mixins:t={},palette:r={},transitions:o={},typography:i={}}=e,a=le(e,na);if(e.vars)throw new Error(process.env.NODE_ENV!=="production"?"MUI: `vars` is a private field used for CSS variables support.\nPlease use another name.":tn(18));const c=Ls(r),l=yt(e);let u=Ce(l,{mixins:Ts(l.breakpoints,t),palette:c,shadows:Gs.slice(),typography:zs(c,i),transitions:Zs(o),zIndex:T({},ea)});if(u=Ce(u,a),u=n.reduce((d,p)=>Ce(d,p),u),process.env.NODE_ENV!=="production"){const d=["active","checked","completed","disabled","error","expanded","focused","focusVisible","required","selected"],p=(f,b)=>{let y;for(y in f){const g=f[y];if(d.indexOf(y)!==-1&&Object.keys(g).length>0){if(process.env.NODE_ENV!=="production"){const h=Ne("",y);console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${y}\` internal state.`,"You can not override it like this: ",JSON.stringify(f,null,2),"",`Instead, you need to use the '&.${h}' syntax:`,JSON.stringify({root:{[`&.${h}`]:g}},null,2),"","https://mui.com/r/state-classes-guide"].join(`
`))}f[y]={}}}};Object.keys(u.components).forEach(f=>{const b=u.components[f].styleOverrides;b&&f.indexOf("Mui")===0&&p(b,f)})}return u.unstable_sxConfig=T({},gt,a==null?void 0:a.unstable_sxConfig),u.unstable_sx=function(p){return bt({sx:p,theme:this})},u}const ra=ta(),xt=ra,Et="$$material",Wr=e=>kn(e)&&e!=="classes",oa=ms({themeId:Et,defaultTheme:xt,rootShouldForwardProp:Wr}),ke=oa;function qe({props:e,name:n}){return bs({props:e,name:n,defaultTheme:xt,themeId:Et})}const Gr=w.createContext({});process.env.NODE_ENV!=="production"&&(Gr.displayName="ListContext");const ia=Gr;function sa(e){return Ne("MuiList",e)}He("MuiList",["root","padding","dense","subheader"]);const aa=["children","className","component","dense","disablePadding","subheader"],ca=e=>{const{classes:n,disablePadding:t,dense:r,subheader:o}=e;return Ue({root:["root",!t&&"padding",r&&"dense",o&&"subheader"]},sa,n)},la=ke("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,!t.disablePadding&&n.padding,t.dense&&n.dense,t.subheader&&n.subheader]}})(({ownerState:e})=>T({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),Kr=w.forwardRef(function(n,t){const r=qe({props:n,name:"MuiList"}),{children:o,className:i,component:a="ul",dense:c=!1,disablePadding:l=!1,subheader:u}=r,d=le(r,aa),p=w.useMemo(()=>({dense:c}),[c]),f=T({},r,{component:a,dense:c,disablePadding:l}),b=ca(f);return E.jsx(ia.Provider,{value:p,children:E.jsxs(la,T({as:a,className:Pe(b.root,i),ref:t,ownerState:f},d,{children:[u,o]}))})});process.env.NODE_ENV!=="production"&&(Kr.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,dense:s.bool,disablePadding:s.bool,subheader:s.node,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const ua=Kr,da=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function Jn(e,n,t){return e===n?e.firstChild:n&&n.nextElementSibling?n.nextElementSibling:t?null:e.firstChild}function cr(e,n,t){return e===n?t?e.firstChild:e.lastChild:n&&n.previousElementSibling?n.previousElementSibling:t?null:e.lastChild}function Xr(e,n){if(n===void 0)return!0;let t=e.innerText;return t===void 0&&(t=e.textContent),t=t.trim().toLowerCase(),t.length===0?!1:n.repeating?t[0]===n.keys[0]:t.indexOf(n.keys.join(""))===0}function cn(e,n,t,r,o,i){let a=!1,c=o(e,n,n?t:!1);for(;c;){if(c===e.firstChild){if(a)return!1;a=!0}const l=r?!1:c.disabled||c.getAttribute("aria-disabled")==="true";if(!c.hasAttribute("tabindex")||!Xr(c,i)||l)c=o(e,c,t);else return c.focus(),!0}return!1}const Yr=w.forwardRef(function(n,t){const{actions:r,autoFocus:o=!1,autoFocusItem:i=!1,children:a,className:c,disabledItemsFocusable:l=!1,disableListWrap:u=!1,onKeyDown:d,variant:p="selectedMenu"}=n,f=le(n,da),b=w.useRef(null),y=w.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});Pn(()=>{o&&b.current.focus()},[o]),w.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(x,O)=>{const m=!b.current.style.width;if(x.clientHeight<b.current.clientHeight&&m){const _=`${Mr(xe(x))}px`;b.current.style[O.direction==="rtl"?"paddingLeft":"paddingRight"]=_,b.current.style.width=`calc(100% + ${_})`}return b.current}}),[]);const g=x=>{const O=b.current,m=x.key,_=xe(O).activeElement;if(m==="ArrowDown")x.preventDefault(),cn(O,_,u,l,Jn);else if(m==="ArrowUp")x.preventDefault(),cn(O,_,u,l,cr);else if(m==="Home")x.preventDefault(),cn(O,null,u,l,Jn);else if(m==="End")x.preventDefault(),cn(O,null,u,l,cr);else if(m.length===1){const N=y.current,H=m.toLowerCase(),J=performance.now();N.keys.length>0&&(J-N.lastTime>500?(N.keys=[],N.repeating=!0,N.previousKeyMatched=!0):N.repeating&&H!==N.keys[0]&&(N.repeating=!1)),N.lastTime=J,N.keys.push(H);const Y=_&&!N.repeating&&Xr(_,N);N.previousKeyMatched&&(Y||cn(O,_,!1,l,Jn,N))?x.preventDefault():N.previousKeyMatched=!1}d&&d(x)},h=Ie(b,t);let k=-1;w.Children.forEach(a,(x,O)=>{if(!w.isValidElement(x)){k===O&&(k+=1,k>=a.length&&(k=-1));return}process.env.NODE_ENV!=="production"&&Cn.isFragment(x)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),x.props.disabled||(p==="selectedMenu"&&x.props.selected||k===-1)&&(k=O),k===O&&(x.props.disabled||x.props.muiSkipListHighlight||x.type.muiSkipListHighlight)&&(k+=1,k>=a.length&&(k=-1))});const D=w.Children.map(a,(x,O)=>{if(O===k){const m={};return i&&(m.autoFocus=!0),x.props.tabIndex===void 0&&p==="selectedMenu"&&(m.tabIndex=0),w.cloneElement(x,m)}return x});return E.jsx(ua,T({role:"menu",ref:h,className:c,onKeyDown:g,tabIndex:o?0:-1},f,{children:D}))});process.env.NODE_ENV!=="production"&&(Yr.propTypes={autoFocus:s.bool,autoFocusItem:s.bool,children:s.node,className:s.string,disabledItemsFocusable:s.bool,disableListWrap:s.bool,onKeyDown:s.func,variant:s.oneOf(["menu","selectedMenu"])});const fa=Yr,pa=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function ha(e){const n=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(n)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:n}function ma(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const n=r=>e.ownerDocument.querySelector(`input[type="radio"]${r}`);let t=n(`[name="${e.name}"]:checked`);return t||(t=n(`[name="${e.name}"]`)),t!==e}function ga(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||ma(e))}function ba(e){const n=[],t=[];return Array.from(e.querySelectorAll(pa)).forEach((r,o)=>{const i=ha(r);i===-1||!ga(r)||(i===0?n.push(r):t.push({documentOrder:o,tabIndex:i,node:r}))}),t.sort((r,o)=>r.tabIndex===o.tabIndex?r.documentOrder-o.documentOrder:r.tabIndex-o.tabIndex).map(r=>r.node).concat(n)}function ya(){return!0}function Nn(e){const{children:n,disableAutoFocus:t=!1,disableEnforceFocus:r=!1,disableRestoreFocus:o=!1,getTabbable:i=ba,isEnabled:a=ya,open:c}=e,l=w.useRef(!1),u=w.useRef(null),d=w.useRef(null),p=w.useRef(null),f=w.useRef(null),b=w.useRef(!1),y=w.useRef(null),g=Ie(n.ref,y),h=w.useRef(null);w.useEffect(()=>{!c||!y.current||(b.current=!t)},[t,c]),w.useEffect(()=>{if(!c||!y.current)return;const x=xe(y.current);return y.current.contains(x.activeElement)||(y.current.hasAttribute("tabIndex")||(process.env.NODE_ENV!=="production"&&console.error(["MUI: The modal content node does not accept focus.",'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)),y.current.setAttribute("tabIndex","-1")),b.current&&y.current.focus()),()=>{o||(p.current&&p.current.focus&&(l.current=!0,p.current.focus()),p.current=null)}},[c]),w.useEffect(()=>{if(!c||!y.current)return;const x=xe(y.current),O=N=>{h.current=N,!(r||!a()||N.key!=="Tab")&&x.activeElement===y.current&&N.shiftKey&&(l.current=!0,d.current&&d.current.focus())},m=()=>{const N=y.current;if(N===null)return;if(!x.hasFocus()||!a()||l.current){l.current=!1;return}if(N.contains(x.activeElement)||r&&x.activeElement!==u.current&&x.activeElement!==d.current)return;if(x.activeElement!==f.current)f.current=null;else if(f.current!==null)return;if(!b.current)return;let H=[];if((x.activeElement===u.current||x.activeElement===d.current)&&(H=i(y.current)),H.length>0){var J,Y;const q=!!((J=h.current)!=null&&J.shiftKey&&((Y=h.current)==null?void 0:Y.key)==="Tab"),W=H[0],ee=H[H.length-1];typeof W!="string"&&typeof ee!="string"&&(q?ee.focus():W.focus())}else N.focus()};x.addEventListener("focusin",m),x.addEventListener("keydown",O,!0);const _=setInterval(()=>{x.activeElement&&x.activeElement.tagName==="BODY"&&m()},50);return()=>{clearInterval(_),x.removeEventListener("focusin",m),x.removeEventListener("keydown",O,!0)}},[t,r,o,a,c,i]);const k=x=>{p.current===null&&(p.current=x.relatedTarget),b.current=!0,f.current=x.target;const O=n.props.onFocus;O&&O(x)},D=x=>{p.current===null&&(p.current=x.relatedTarget),b.current=!0};return E.jsxs(w.Fragment,{children:[E.jsx("div",{tabIndex:c?0:-1,onFocus:D,ref:u,"data-testid":"sentinelStart"}),w.cloneElement(n,{ref:g,onFocus:k}),E.jsx("div",{tabIndex:c?0:-1,onFocus:D,ref:d,"data-testid":"sentinelEnd"})]})}process.env.NODE_ENV!=="production"&&(Nn.propTypes={children:In,disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableRestoreFocus:s.bool,getTabbable:s.func,isEnabled:s.func,open:s.bool.isRequired});process.env.NODE_ENV!=="production"&&(Nn["propTypes"]=_r(Nn.propTypes));function va(e){return typeof e=="function"?e():e}const $n=w.forwardRef(function(n,t){const{children:r,container:o,disablePortal:i=!1}=n,[a,c]=w.useState(null),l=Ie(w.isValidElement(r)?r.ref:null,t);if(Pn(()=>{i||c(va(o)||document.body)},[o,i]),Pn(()=>{if(a&&!i)return st(t,a),()=>{st(t,null)}},[t,a,i]),i){if(w.isValidElement(r)){const u={ref:l};return w.cloneElement(r,u)}return E.jsx(w.Fragment,{children:r})}return E.jsx(w.Fragment,{children:a&&mo.createPortal(r,a)})});process.env.NODE_ENV!=="production"&&($n.propTypes={children:s.node,container:s.oneOfType([hn,s.func]),disablePortal:s.bool});process.env.NODE_ENV!=="production"&&($n["propTypes"]=_r($n.propTypes));function xa(e){const n=xe(e);return n.body===e?mn(e).innerWidth>n.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function pn(e,n){n?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function lr(e){return parseInt(mn(e).getComputedStyle(e).paddingRight,10)||0}function Ea(e){const t=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,r=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return t||r}function ur(e,n,t,r,o){const i=[n,t,...r];[].forEach.call(e.children,a=>{const c=i.indexOf(a)===-1,l=!Ea(a);c&&l&&pn(a,o)})}function Zn(e,n){let t=-1;return e.some((r,o)=>n(r)?(t=o,!0):!1),t}function Ta(e,n){const t=[],r=e.container;if(!n.disableScrollLock){if(xa(r)){const a=Mr(xe(r));t.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${lr(r)+a}px`;const c=xe(r).querySelectorAll(".mui-fixed");[].forEach.call(c,l=>{t.push({value:l.style.paddingRight,property:"padding-right",el:l}),l.style.paddingRight=`${lr(l)+a}px`})}let i;if(r.parentNode instanceof DocumentFragment)i=xe(r).body;else{const a=r.parentElement,c=mn(r);i=(a==null?void 0:a.nodeName)==="HTML"&&c.getComputedStyle(a).overflowY==="scroll"?a:r}t.push({value:i.style.overflow,property:"overflow",el:i},{value:i.style.overflowX,property:"overflow-x",el:i},{value:i.style.overflowY,property:"overflow-y",el:i}),i.style.overflow="hidden"}return()=>{t.forEach(({value:i,el:a,property:c})=>{i?a.style.setProperty(c,i):a.style.removeProperty(c)})}}function ka(e){const n=[];return[].forEach.call(e.children,t=>{t.getAttribute("aria-hidden")==="true"&&n.push(t)}),n}class Sa{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(n,t){let r=this.modals.indexOf(n);if(r!==-1)return r;r=this.modals.length,this.modals.push(n),n.modalRef&&pn(n.modalRef,!1);const o=ka(t);ur(t,n.mount,n.modalRef,o,!0);const i=Zn(this.containers,a=>a.container===t);return i!==-1?(this.containers[i].modals.push(n),r):(this.containers.push({modals:[n],container:t,restore:null,hiddenSiblings:o}),r)}mount(n,t){const r=Zn(this.containers,i=>i.modals.indexOf(n)!==-1),o=this.containers[r];o.restore||(o.restore=Ta(o,t))}remove(n,t=!0){const r=this.modals.indexOf(n);if(r===-1)return r;const o=Zn(this.containers,a=>a.modals.indexOf(n)!==-1),i=this.containers[o];if(i.modals.splice(i.modals.indexOf(n),1),this.modals.splice(r,1),i.modals.length===0)i.restore&&i.restore(),n.modalRef&&pn(n.modalRef,t),ur(i.container,n.mount,n.modalRef,i.hiddenSiblings,!1),this.containers.splice(o,1);else{const a=i.modals[i.modals.length-1];a.modalRef&&pn(a.modalRef,!1)}return r}isTopModal(n){return this.modals.length>0&&this.modals[this.modals.length-1]===n}}function wa(e){return typeof e=="function"?e():e}function Oa(e){return e?e.props.hasOwnProperty("in"):!1}const Ca=new Sa;function Pa(e){const{container:n,disableEscapeKeyDown:t=!1,disableScrollLock:r=!1,manager:o=Ca,closeAfterTransition:i=!1,onTransitionEnter:a,onTransitionExited:c,children:l,onClose:u,open:d,rootRef:p}=e,f=w.useRef({}),b=w.useRef(null),y=w.useRef(null),g=Ie(y,p),[h,k]=w.useState(!d),D=Oa(l);let x=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(x=!1);const O=()=>xe(b.current),m=()=>(f.current.modalRef=y.current,f.current.mount=b.current,f.current),_=()=>{o.mount(m(),{disableScrollLock:r}),y.current&&(y.current.scrollTop=0)},N=Wt(()=>{const $=wa(n)||O().body;o.add(m(),$),y.current&&_()}),H=w.useCallback(()=>o.isTopModal(m()),[o]),J=Wt($=>{b.current=$,$&&(d&&H()?_():y.current&&pn(y.current,x))}),Y=w.useCallback(()=>{o.remove(m(),x)},[x,o]);w.useEffect(()=>()=>{Y()},[Y]),w.useEffect(()=>{d?N():(!D||!i)&&Y()},[d,Y,D,i,N]);const q=$=>j=>{var se;(se=$.onKeyDown)==null||se.call($,j),!(j.key!=="Escape"||j.which===229||!H())&&(t||(j.stopPropagation(),u&&u(j,"escapeKeyDown")))},W=$=>j=>{var se;(se=$.onClick)==null||se.call($,j),j.target===j.currentTarget&&u&&u(j,"backdropClick")};return{getRootProps:($={})=>{const j=Fr(e);delete j.onTransitionEnter,delete j.onTransitionExited;const se=T({},j,$);return T({role:"presentation"},se,{onKeyDown:q(se),ref:g})},getBackdropProps:($={})=>{const j=$;return T({"aria-hidden":!0},j,{onClick:W(j),open:d})},getTransitionProps:()=>{const $=()=>{k(!1),a&&a()},j=()=>{k(!0),c&&c(),i&&Y()};return{onEnter:qt($,l==null?void 0:l.props.onEnter),onExited:qt(j,l==null?void 0:l.props.onExited)}},rootRef:g,portalRef:J,isTopModal:H,exited:h,hasTransition:D}}function ct(e,n){return ct=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},ct(e,n)}function Ra(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,ct(e,n)}const dr={disabled:!1};var Na=process.env.NODE_ENV!=="production"?s.oneOfType([s.number,s.shape({enter:s.number,exit:s.number,appear:s.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&s.oneOfType([s.string,s.shape({enter:s.string,exit:s.string,active:s.string}),s.shape({enter:s.string,enterDone:s.string,enterActive:s.string,exit:s.string,exitDone:s.string,exitActive:s.string})]);const Jr=ne.createContext(null);var $a=function(n){return n.scrollTop},dn="unmounted",je="exited",De="entering",Qe="entered",lt="exiting",$e=function(e){Ra(n,e);function n(r,o){var i;i=e.call(this,r,o)||this;var a=o,c=a&&!a.isMounting?r.enter:r.appear,l;return i.appearStatus=null,r.in?c?(l=je,i.appearStatus=De):l=Qe:r.unmountOnExit||r.mountOnEnter?l=dn:l=je,i.state={status:l},i.nextCallback=null,i}n.getDerivedStateFromProps=function(o,i){var a=o.in;return a&&i.status===dn?{status:je}:null};var t=n.prototype;return t.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},t.componentDidUpdate=function(o){var i=null;if(o!==this.props){var a=this.state.status;this.props.in?a!==De&&a!==Qe&&(i=De):(a===De||a===Qe)&&(i=lt)}this.updateStatus(!1,i)},t.componentWillUnmount=function(){this.cancelNextCallback()},t.getTimeouts=function(){var o=this.props.timeout,i,a,c;return i=a=c=o,o!=null&&typeof o!="number"&&(i=o.exit,a=o.enter,c=o.appear!==void 0?o.appear:a),{exit:i,enter:a,appear:c}},t.updateStatus=function(o,i){if(o===void 0&&(o=!1),i!==null)if(this.cancelNextCallback(),i===De){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:un.findDOMNode(this);a&&$a(a)}this.performEnter(o)}else this.performExit();else this.props.unmountOnExit&&this.state.status===je&&this.setState({status:dn})},t.performEnter=function(o){var i=this,a=this.props.enter,c=this.context?this.context.isMounting:o,l=this.props.nodeRef?[c]:[un.findDOMNode(this),c],u=l[0],d=l[1],p=this.getTimeouts(),f=c?p.appear:p.enter;if(!o&&!a||dr.disabled){this.safeSetState({status:Qe},function(){i.props.onEntered(u)});return}this.props.onEnter(u,d),this.safeSetState({status:De},function(){i.props.onEntering(u,d),i.onTransitionEnd(f,function(){i.safeSetState({status:Qe},function(){i.props.onEntered(u,d)})})})},t.performExit=function(){var o=this,i=this.props.exit,a=this.getTimeouts(),c=this.props.nodeRef?void 0:un.findDOMNode(this);if(!i||dr.disabled){this.safeSetState({status:je},function(){o.props.onExited(c)});return}this.props.onExit(c),this.safeSetState({status:lt},function(){o.props.onExiting(c),o.onTransitionEnd(a.exit,function(){o.safeSetState({status:je},function(){o.props.onExited(c)})})})},t.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},t.safeSetState=function(o,i){i=this.setNextCallback(i),this.setState(o,i)},t.setNextCallback=function(o){var i=this,a=!0;return this.nextCallback=function(c){a&&(a=!1,i.nextCallback=null,o(c))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},t.onTransitionEnd=function(o,i){this.setNextCallback(i);var a=this.props.nodeRef?this.props.nodeRef.current:un.findDOMNode(this),c=o==null&&!this.props.addEndListener;if(!a||c){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var l=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],u=l[0],d=l[1];this.props.addEndListener(u,d)}o!=null&&setTimeout(this.nextCallback,o)},t.render=function(){var o=this.state.status;if(o===dn)return null;var i=this.props,a=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var c=le(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return ne.createElement(Jr.Provider,{value:null},typeof a=="function"?a(o,c):ne.cloneElement(ne.Children.only(a),c))},n}(ne.Component);$e.contextType=Jr;$e.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:s.shape({current:typeof Element>"u"?s.any:function(e,n,t,r,o,i){var a=e[n];return s.instanceOf(a&&"ownerDocument"in a?a.ownerDocument.defaultView.Element:Element)(e,n,t,r,o,i)}}),children:s.oneOfType([s.func.isRequired,s.element.isRequired]).isRequired,in:s.bool,mountOnEnter:s.bool,unmountOnExit:s.bool,appear:s.bool,enter:s.bool,exit:s.bool,timeout:function(n){var t=Na;n.addEndListener||(t=t.isRequired);for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return t.apply(void 0,[n].concat(o))},addEndListener:s.func,onEnter:s.func,onEntering:s.func,onEntered:s.func,onExit:s.func,onExiting:s.func,onExited:s.func}:{};function Ze(){}$e.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Ze,onEntering:Ze,onEntered:Ze,onExit:Ze,onExiting:Ze,onExited:Ze};$e.UNMOUNTED=dn;$e.EXITED=je;$e.ENTERING=De;$e.ENTERED=Qe;$e.EXITING=lt;const Zr=$e;function Un(){const e=qr(xt);return process.env.NODE_ENV!=="production"&&w.useDebugValue(e),e[Et]||e}const Qr=e=>e.scrollTop;function _n(e,n){var t,r;const{timeout:o,easing:i,style:a={}}=e;return{duration:(t=a.transitionDuration)!=null?t:typeof o=="number"?o:o[n.mode]||0,easing:(r=a.transitionTimingFunction)!=null?r:typeof i=="object"?i[n.mode]:i,delay:a.transitionDelay}}const _a=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function ut(e){return`scale(${e}, ${e**2})`}const Ia={entering:{opacity:1,transform:ut(1)},entered:{opacity:1,transform:"none"}},Qn=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),Tt=w.forwardRef(function(n,t){const{addEndListener:r,appear:o=!0,children:i,easing:a,in:c,onEnter:l,onEntered:u,onEntering:d,onExit:p,onExited:f,onExiting:b,style:y,timeout:g="auto",TransitionComponent:h=Zr}=n,k=le(n,_a),D=Ko(),x=w.useRef(),O=Un(),m=w.useRef(null),_=Ie(m,i.ref,t),N=R=>$=>{if(R){const j=m.current;$===void 0?R(j):R(j,$)}},H=N(d),J=N((R,$)=>{Qr(R);const{duration:j,delay:se,easing:Z}=_n({style:y,timeout:g,easing:a},{mode:"enter"});let v;g==="auto"?(v=O.transitions.getAutoHeightDuration(R.clientHeight),x.current=v):v=j,R.style.transition=[O.transitions.create("opacity",{duration:v,delay:se}),O.transitions.create("transform",{duration:Qn?v:v*.666,delay:se,easing:Z})].join(","),l&&l(R,$)}),Y=N(u),q=N(b),W=N(R=>{const{duration:$,delay:j,easing:se}=_n({style:y,timeout:g,easing:a},{mode:"exit"});let Z;g==="auto"?(Z=O.transitions.getAutoHeightDuration(R.clientHeight),x.current=Z):Z=$,R.style.transition=[O.transitions.create("opacity",{duration:Z,delay:j}),O.transitions.create("transform",{duration:Qn?Z:Z*.666,delay:Qn?j:j||Z*.333,easing:se})].join(","),R.style.opacity=0,R.style.transform=ut(.75),p&&p(R)}),ee=N(f),A=R=>{g==="auto"&&D.start(x.current||0,R),r&&r(m.current,R)};return E.jsx(h,T({appear:o,in:c,nodeRef:m,onEnter:J,onEntered:Y,onEntering:H,onExit:W,onExited:ee,onExiting:q,addEndListener:A,timeout:g==="auto"?null:g},k,{children:(R,$)=>w.cloneElement(i,T({style:T({opacity:0,transform:ut(.75),visibility:R==="exited"&&!c?"hidden":void 0},Ia[R],y,i.props.style),ref:_},$))}))});process.env.NODE_ENV!=="production"&&(Tt.propTypes={addEndListener:s.func,appear:s.bool,children:In.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});Tt.muiSupportAuto=!0;const Ma=Tt,Aa=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],ja={entering:{opacity:1},entered:{opacity:1}},eo=w.forwardRef(function(n,t){const r=Un(),o={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:i,appear:a=!0,children:c,easing:l,in:u,onEnter:d,onEntered:p,onEntering:f,onExit:b,onExited:y,onExiting:g,style:h,timeout:k=o,TransitionComponent:D=Zr}=n,x=le(n,Aa),O=w.useRef(null),m=Ie(O,c.ref,t),_=A=>R=>{if(A){const $=O.current;R===void 0?A($):A($,R)}},N=_(f),H=_((A,R)=>{Qr(A);const $=_n({style:h,timeout:k,easing:l},{mode:"enter"});A.style.webkitTransition=r.transitions.create("opacity",$),A.style.transition=r.transitions.create("opacity",$),d&&d(A,R)}),J=_(p),Y=_(g),q=_(A=>{const R=_n({style:h,timeout:k,easing:l},{mode:"exit"});A.style.webkitTransition=r.transitions.create("opacity",R),A.style.transition=r.transitions.create("opacity",R),b&&b(A)}),W=_(y),ee=A=>{i&&i(O.current,A)};return E.jsx(D,T({appear:a,in:u,nodeRef:O,onEnter:H,onEntered:J,onEntering:N,onExit:q,onExited:W,onExiting:Y,addEndListener:ee,timeout:k},x,{children:(A,R)=>w.cloneElement(c,T({style:T({opacity:0,visibility:A==="exited"&&!u?"hidden":void 0},ja[A],h,c.props.style),ref:m},R))}))});process.env.NODE_ENV!=="production"&&(eo.propTypes={addEndListener:s.func,appear:s.bool,children:In.isRequired,easing:s.oneOfType([s.shape({enter:s.string,exit:s.string}),s.string]),in:s.bool,onEnter:s.func,onEntered:s.func,onEntering:s.func,onExit:s.func,onExited:s.func,onExiting:s.func,style:s.object,timeout:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const Da=eo;function Ba(e){return Ne("MuiBackdrop",e)}He("MuiBackdrop",["root","invisible"]);const La=["children","className","component","components","componentsProps","invisible","open","slotProps","slots","TransitionComponent","transitionDuration"],Fa=e=>{const{classes:n,invisible:t}=e;return Ue({root:["root",t&&"invisible"]},Ba,n)},Va=ke("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,t.invisible&&n.invisible]}})(({ownerState:e})=>T({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent"},e.invisible&&{backgroundColor:"transparent"})),no=w.forwardRef(function(n,t){var r,o,i;const a=qe({props:n,name:"MuiBackdrop"}),{children:c,className:l,component:u="div",components:d={},componentsProps:p={},invisible:f=!1,open:b,slotProps:y={},slots:g={},TransitionComponent:h=Da,transitionDuration:k}=a,D=le(a,La),x=T({},a,{component:u,invisible:f}),O=Fa(x),m=(r=y.root)!=null?r:p.root;return E.jsx(h,T({in:b,timeout:k},D,{children:E.jsx(Va,T({"aria-hidden":!0},m,{as:(o=(i=g.root)!=null?i:d.Root)!=null?o:u,className:Pe(O.root,l,m==null?void 0:m.className),ownerState:T({},x,m==null?void 0:m.ownerState),classes:O,ref:t,children:c}))}))});process.env.NODE_ENV!=="production"&&(no.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,components:s.shape({Root:s.elementType}),componentsProps:s.shape({root:s.object}),invisible:s.bool,open:s.bool.isRequired,slotProps:s.shape({root:s.object}),slots:s.shape({root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})])});const za=no;function Ua(e){return Ne("MuiModal",e)}He("MuiModal",["root","hidden","backdrop"]);const Ha=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],qa=e=>{const{open:n,exited:t,classes:r}=e;return Ue({root:["root",!n&&t&&"hidden"],backdrop:["backdrop"]},Ua,r)},Wa=ke("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,!t.open&&t.exited&&n.hidden]}})(({theme:e,ownerState:n})=>T({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!n.open&&n.exited&&{visibility:"hidden"})),Ga=ke(za,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,n)=>n.backdrop})({zIndex:-1}),to=w.forwardRef(function(n,t){var r,o,i,a,c,l;const u=qe({name:"MuiModal",props:n}),{BackdropComponent:d=Ga,BackdropProps:p,className:f,closeAfterTransition:b=!1,children:y,container:g,component:h,components:k={},componentsProps:D={},disableAutoFocus:x=!1,disableEnforceFocus:O=!1,disableEscapeKeyDown:m=!1,disablePortal:_=!1,disableRestoreFocus:N=!1,disableScrollLock:H=!1,hideBackdrop:J=!1,keepMounted:Y=!1,onBackdropClick:q,open:W,slotProps:ee,slots:A}=u,R=le(u,Ha),$=T({},u,{closeAfterTransition:b,disableAutoFocus:x,disableEnforceFocus:O,disableEscapeKeyDown:m,disablePortal:_,disableRestoreFocus:N,disableScrollLock:H,hideBackdrop:J,keepMounted:Y}),{getRootProps:j,getBackdropProps:se,getTransitionProps:Z,portalRef:v,isTopModal:P,exited:I,hasTransition:V}=Pa(T({},$,{rootRef:t})),M=T({},$,{exited:I}),F=qa(M),B={};if(y.props.tabIndex===void 0&&(B.tabIndex="-1"),V){const{onEnter:U,onExited:S}=Z();B.onEnter=U,B.onExited=S}const L=(r=(o=A==null?void 0:A.root)!=null?o:k.Root)!=null?r:Wa,G=(i=(a=A==null?void 0:A.backdrop)!=null?a:k.Backdrop)!=null?i:d,K=(c=ee==null?void 0:ee.root)!=null?c:D.root,z=(l=ee==null?void 0:ee.backdrop)!=null?l:D.backdrop,pe=rn({elementType:L,externalSlotProps:K,externalForwardedProps:R,getSlotProps:j,additionalProps:{ref:t,as:h},ownerState:M,className:Pe(f,K==null?void 0:K.className,F==null?void 0:F.root,!M.open&&M.exited&&(F==null?void 0:F.hidden))}),C=rn({elementType:G,externalSlotProps:z,additionalProps:p,getSlotProps:U=>se(T({},U,{onClick:S=>{q&&q(S),U!=null&&U.onClick&&U.onClick(S)}})),className:Pe(z==null?void 0:z.className,p==null?void 0:p.className,F==null?void 0:F.backdrop),ownerState:M});return!Y&&!W&&(!V||I)?null:E.jsx($n,{ref:v,container:g,disablePortal:_,children:E.jsxs(L,T({},pe,{children:[!J&&d?E.jsx(G,T({},C)):null,E.jsx(Nn,{disableEnforceFocus:O,disableAutoFocus:x,disableRestoreFocus:N,isEnabled:P,open:W,children:w.cloneElement(y,B)})]}))})});process.env.NODE_ENV!=="production"&&(to.propTypes={BackdropComponent:s.elementType,BackdropProps:s.object,children:In.isRequired,classes:s.object,className:s.string,closeAfterTransition:s.bool,component:s.elementType,components:s.shape({Backdrop:s.elementType,Root:s.elementType}),componentsProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),container:s.oneOfType([hn,s.func]),disableAutoFocus:s.bool,disableEnforceFocus:s.bool,disableEscapeKeyDown:s.bool,disablePortal:s.bool,disableRestoreFocus:s.bool,disableScrollLock:s.bool,hideBackdrop:s.bool,keepMounted:s.bool,onBackdropClick:s.func,onClose:s.func,onTransitionEnter:s.func,onTransitionExited:s.func,open:s.bool.isRequired,slotProps:s.shape({backdrop:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({backdrop:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object])});const Ka=to,Xa=e=>{let n;return e<1?n=5.11916*e**2:n=4.5*Math.log(e+1)+2,(n/100).toFixed(2)},fr=Xa;function Ya(e){return Ne("MuiPaper",e)}He("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const Ja=["className","component","elevation","square","variant"],Za=e=>{const{square:n,elevation:t,variant:r,classes:o}=e,i={root:["root",r,!n&&"rounded",r==="elevation"&&`elevation${t}`]};return Ue(i,Ya,o)},Qa=ke("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,n[t.variant],!t.square&&n.rounded,t.variant==="elevation"&&n[`elevation${t.elevation}`]]}})(({theme:e,ownerState:n})=>{var t;return T({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!n.square&&{borderRadius:e.shape.borderRadius},n.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},n.variant==="elevation"&&T({boxShadow:(e.vars||e).shadows[n.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${tr("#fff",fr(n.elevation))}, ${tr("#fff",fr(n.elevation))})`},e.vars&&{backgroundImage:(t=e.vars.overlays)==null?void 0:t[n.elevation]}))}),ro=w.forwardRef(function(n,t){const r=qe({props:n,name:"MuiPaper"}),{className:o,component:i="div",elevation:a=1,square:c=!1,variant:l="elevation"}=r,u=le(r,Ja),d=T({},r,{component:i,elevation:a,square:c,variant:l}),p=Za(d);return process.env.NODE_ENV!=="production"&&Un().shadows[a]===void 0&&console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`,`Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)),E.jsx(Qa,T({as:i,ownerState:d,className:Pe(p.root,o),ref:t},u))});process.env.NODE_ENV!=="production"&&(ro.propTypes={children:s.node,classes:s.object,className:s.string,component:s.elementType,elevation:yn(Dr,e=>{const{elevation:n,variant:t}=e;return n>0&&t==="outlined"?new Error(`MUI: Combining \`elevation={${n}}\` with \`variant="${t}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`):null}),square:s.bool,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),variant:s.oneOfType([s.oneOf(["elevation","outlined"]),s.string])});const ec=ro;function nc(e){return Ne("MuiPopover",e)}He("MuiPopover",["root","paper"]);const tc=["onEntering"],rc=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps","disableScrollLock"],oc=["slotProps"];function pr(e,n){let t=0;return typeof n=="number"?t=n:n==="center"?t=e.height/2:n==="bottom"&&(t=e.height),t}function hr(e,n){let t=0;return typeof n=="number"?t=n:n==="center"?t=e.width/2:n==="right"&&(t=e.width),t}function mr(e){return[e.horizontal,e.vertical].map(n=>typeof n=="number"?`${n}px`:n).join(" ")}function wn(e){return typeof e=="function"?e():e}const ic=e=>{const{classes:n}=e;return Ue({root:["root"],paper:["paper"]},nc,n)},sc=ke(Ka,{name:"MuiPopover",slot:"Root",overridesResolver:(e,n)=>n.root})({}),oo=ke(ec,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,n)=>n.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),io=w.forwardRef(function(n,t){var r,o,i;const a=qe({props:n,name:"MuiPopover"}),{action:c,anchorEl:l,anchorOrigin:u={vertical:"top",horizontal:"left"},anchorPosition:d,anchorReference:p="anchorEl",children:f,className:b,container:y,elevation:g=8,marginThreshold:h=16,open:k,PaperProps:D={},slots:x,slotProps:O,transformOrigin:m={vertical:"top",horizontal:"left"},TransitionComponent:_=Ma,transitionDuration:N="auto",TransitionProps:{onEntering:H}={},disableScrollLock:J=!1}=a,Y=le(a.TransitionProps,tc),q=le(a,rc),W=(r=O==null?void 0:O.paper)!=null?r:D,ee=w.useRef(),A=Ie(ee,W.ref),R=T({},a,{anchorOrigin:u,anchorReference:p,elevation:g,marginThreshold:h,externalPaperSlotProps:W,transformOrigin:m,TransitionComponent:_,transitionDuration:N,TransitionProps:Y}),$=ic(R),j=w.useCallback(()=>{if(p==="anchorPosition")return process.env.NODE_ENV!=="production"&&(d||console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')),d;const U=wn(l),S=U&&U.nodeType===1?U:xe(ee.current).body,he=S.getBoundingClientRect();if(process.env.NODE_ENV!=="production"){const ye=S.getBoundingClientRect();process.env.NODE_ENV!=="test"&&ye.top===0&&ye.left===0&&ye.right===0&&ye.bottom===0&&console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}return{top:he.top+pr(he,u.vertical),left:he.left+hr(he,u.horizontal)}},[l,u.horizontal,u.vertical,d,p]),se=w.useCallback(U=>({vertical:pr(U,m.vertical),horizontal:hr(U,m.horizontal)}),[m.horizontal,m.vertical]),Z=w.useCallback(U=>{const S={width:U.offsetWidth,height:U.offsetHeight},he=se(S);if(p==="none")return{top:null,left:null,transformOrigin:mr(he)};const ye=j();let Oe=ye.top-he.vertical,We=ye.left-he.horizontal;const Ct=Oe+S.height,Pt=We+S.width,Rt=mn(wn(l)),sn=Rt.innerHeight-h,Nt=Rt.innerWidth-h;if(h!==null&&Oe<h){const Te=Oe-h;Oe-=Te,he.vertical+=Te}else if(h!==null&&Ct>sn){const Te=Ct-sn;Oe-=Te,he.vertical+=Te}if(process.env.NODE_ENV!=="production"&&S.height>sn&&S.height&&sn&&console.error(["MUI: The popover component is too tall.",`Some part of it can not be seen on the screen (${S.height-sn}px).`,"Please consider adding a `max-height` to improve the user-experience."].join(`
`)),h!==null&&We<h){const Te=We-h;We-=Te,he.horizontal+=Te}else if(Pt>Nt){const Te=Pt-Nt;We-=Te,he.horizontal+=Te}return{top:`${Math.round(Oe)}px`,left:`${Math.round(We)}px`,transformOrigin:mr(he)}},[l,p,j,se,h]),[v,P]=w.useState(k),I=w.useCallback(()=>{const U=ee.current;if(!U)return;const S=Z(U);S.top!==null&&(U.style.top=S.top),S.left!==null&&(U.style.left=S.left),U.style.transformOrigin=S.transformOrigin,P(!0)},[Z]);w.useEffect(()=>(J&&window.addEventListener("scroll",I),()=>window.removeEventListener("scroll",I)),[l,J,I]);const V=(U,S)=>{H&&H(U,S),I()},M=()=>{P(!1)};w.useEffect(()=>{k&&I()}),w.useImperativeHandle(c,()=>k?{updatePosition:()=>{I()}}:null,[k,I]),w.useEffect(()=>{if(!k)return;const U=Uo(()=>{I()}),S=mn(l);return S.addEventListener("resize",U),()=>{U.clear(),S.removeEventListener("resize",U)}},[l,k,I]);let F=N;N==="auto"&&!_.muiSupportAuto&&(F=void 0);const B=y||(l?xe(wn(l)).body:void 0),L=(o=x==null?void 0:x.root)!=null?o:sc,G=(i=x==null?void 0:x.paper)!=null?i:oo,K=rn({elementType:G,externalSlotProps:T({},W,{style:v?W.style:T({},W.style,{opacity:0})}),additionalProps:{elevation:g,ref:A},ownerState:R,className:Pe($.paper,W==null?void 0:W.className)}),z=rn({elementType:L,externalSlotProps:(O==null?void 0:O.root)||{},externalForwardedProps:q,additionalProps:{ref:t,slotProps:{backdrop:{invisible:!0}},container:B,open:k},ownerState:R,className:Pe($.root,b)}),{slotProps:pe}=z,C=le(z,oc);return E.jsx(L,T({},C,!Lr(L)&&{slotProps:pe,disableScrollLock:J},{children:E.jsx(_,T({appear:!0,in:k,onEntering:V,onExited:M,timeout:F},Y,{children:E.jsx(G,T({},K,{children:f}))}))}))});process.env.NODE_ENV!=="production"&&(io.propTypes={action:zo,anchorEl:yn(s.oneOfType([hn,s.func]),e=>{if(e.open&&(!e.anchorReference||e.anchorReference==="anchorEl")){const n=wn(e.anchorEl);if(n&&n.nodeType===1){const t=n.getBoundingClientRect();if(process.env.NODE_ENV!=="test"&&t.top===0&&t.left===0&&t.right===0&&t.bottom===0)return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.","The anchor element should be part of the document layout.","Make sure the element is present in the document or that it's not display none."].join(`
`))}else return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.",`It should be an Element or PopoverVirtualElement instance but it's \`${n}\` instead.`].join(`
`))}return null}),anchorOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),anchorPosition:s.shape({left:s.number.isRequired,top:s.number.isRequired}),anchorReference:s.oneOf(["anchorEl","anchorPosition","none"]),children:s.node,classes:s.object,className:s.string,container:s.oneOfType([hn,s.func]),disableScrollLock:s.bool,elevation:Dr,marginThreshold:s.number,onClose:s.func,open:s.bool.isRequired,PaperProps:s.shape({component:jo}),slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transformOrigin:s.shape({horizontal:s.oneOfType([s.oneOf(["center","left","right"]),s.number]).isRequired,vertical:s.oneOfType([s.oneOf(["bottom","center","top"]),s.number]).isRequired}),TransitionComponent:s.elementType,transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object});const ac=io;function cc(e){return Ne("MuiMenu",e)}He("MuiMenu",["root","paper","list"]);const lc=["onEntering"],uc=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],dc={vertical:"top",horizontal:"right"},fc={vertical:"top",horizontal:"left"},pc=e=>{const{classes:n}=e;return Ue({root:["root"],paper:["paper"],list:["list"]},cc,n)},hc=ke(ac,{shouldForwardProp:e=>Wr(e)||e==="classes",name:"MuiMenu",slot:"Root",overridesResolver:(e,n)=>n.root})({}),mc=ke(oo,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,n)=>n.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),gc=ke(fa,{name:"MuiMenu",slot:"List",overridesResolver:(e,n)=>n.list})({outline:0}),so=w.forwardRef(function(n,t){var r,o;const i=qe({props:n,name:"MuiMenu"}),{autoFocus:a=!0,children:c,className:l,disableAutoFocusItem:u=!1,MenuListProps:d={},onClose:p,open:f,PaperProps:b={},PopoverClasses:y,transitionDuration:g="auto",TransitionProps:{onEntering:h}={},variant:k="selectedMenu",slots:D={},slotProps:x={}}=i,O=le(i.TransitionProps,lc),m=le(i,uc),_=Un(),N=_.direction==="rtl",H=T({},i,{autoFocus:a,disableAutoFocusItem:u,MenuListProps:d,onEntering:h,PaperProps:b,transitionDuration:g,TransitionProps:O,variant:k}),J=pc(H),Y=a&&!u&&f,q=w.useRef(null),W=(Z,v)=>{q.current&&q.current.adjustStyleForScrollbar(Z,_),h&&h(Z,v)},ee=Z=>{Z.key==="Tab"&&(Z.preventDefault(),p&&p(Z,"tabKeyDown"))};let A=-1;w.Children.map(c,(Z,v)=>{w.isValidElement(Z)&&(process.env.NODE_ENV!=="production"&&Cn.isFragment(Z)&&console.error(["MUI: The Menu component doesn't accept a Fragment as a child.","Consider providing an array instead."].join(`
`)),Z.props.disabled||(k==="selectedMenu"&&Z.props.selected||A===-1)&&(A=v))});const R=(r=D.paper)!=null?r:mc,$=(o=x.paper)!=null?o:b,j=rn({elementType:D.root,externalSlotProps:x.root,ownerState:H,className:[J.root,l]}),se=rn({elementType:R,externalSlotProps:$,ownerState:H,className:J.paper});return E.jsx(hc,T({onClose:p,anchorOrigin:{vertical:"bottom",horizontal:N?"right":"left"},transformOrigin:N?dc:fc,slots:{paper:R,root:D.root},slotProps:{root:j,paper:se},open:f,ref:t,transitionDuration:g,TransitionProps:T({onEntering:W},O),ownerState:H},m,{classes:y,children:E.jsx(gc,T({onKeyDown:ee,actions:q,autoFocus:a&&(A===-1||u),autoFocusItem:Y,variant:k},d,{className:Pe(J.list,d.className),children:c}))}))});process.env.NODE_ENV!=="production"&&(so.propTypes={anchorEl:s.oneOfType([hn,s.func]),autoFocus:s.bool,children:s.node,classes:s.object,className:s.string,disableAutoFocusItem:s.bool,MenuListProps:s.object,onClose:s.func,open:s.bool.isRequired,PaperProps:s.object,PopoverClasses:s.object,slotProps:s.shape({paper:s.oneOfType([s.func,s.object]),root:s.oneOfType([s.func,s.object])}),slots:s.shape({paper:s.elementType,root:s.elementType}),sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),transitionDuration:s.oneOfType([s.oneOf(["auto"]),s.number,s.shape({appear:s.number,enter:s.number,exit:s.number})]),TransitionProps:s.object,variant:s.oneOf(["menu","selectedMenu"])});const bc=so;function yc({className:e,commandHandler:n,menuDefinition:t,children:r}){var u;const[o,i]=ne.useState(void 0),a=ne.useCallback(d=>{d.preventDefault(),i(o===void 0?{mouseX:d.clientX+2,mouseY:d.clientY-6}:void 0)},[o]),c=ne.useCallback(()=>{i(void 0)},[]),l=ne.useMemo(()=>{if(o!==void 0)return{top:o.mouseY,left:o.mouseX}},[o]);return(((u=t==null?void 0:t.items)==null?void 0:u.length)??0)===0||!r?r:E.jsxs("div",{className:`papi-context-menu-target ${e??""}`,onContextMenu:a,children:[r,E.jsx(bc,{className:`papi-context-menu ${e??""}`,open:o!==void 0,onClose:c,anchorReference:"anchorPosition",anchorPosition:l,children:E.jsx(dt,{menuDefinition:t,commandHandler:n,onClick:c})})]})}var vc=Object.defineProperty,xc=(e,n,t)=>n in e?vc(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,X=(e,n,t)=>(xc(e,typeof n!="symbol"?n+"":n,t),t);const ze=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],kt=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ao=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],gr=Nc();function on(e,n=!0){return n&&(e=e.toUpperCase()),e in gr?gr[e]:0}function St(e){return on(e)>0}function Ec(e){const n=typeof e=="string"?on(e):e;return n>=40&&n<=66}function Tc(e){return(typeof e=="string"?on(e):e)<=39}function co(e){return e<=66}function kc(e){const n=typeof e=="string"?on(e):e;return fo(n)&&!co(n)}function*Sc(){for(let e=1;e<=ze.length;e++)yield e}const wc=1,lo=ze.length;function Oc(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function wt(e,n="***"){const t=e-1;return t<0||t>=ze.length?n:ze[t]}function uo(e){return e<=0||e>lo?"******":ao[e-1]}function Cc(e){return uo(on(e))}function fo(e){const n=typeof e=="number"?wt(e):e;return St(n)&&!kt.includes(n)}function Pc(e){const n=typeof e=="number"?wt(e):e;return St(n)&&kt.includes(n)}function Rc(e){return ao[e-1].includes("*obsolete*")}function Nc(){const e={};for(let n=0;n<ze.length;n++)e[ze[n]]=n+1;return e}const we={allBookIds:ze,nonCanonicalIds:kt,bookIdToNumber:on,isBookIdValid:St,isBookNT:Ec,isBookOT:Tc,isBookOTNT:co,isBookDC:kc,allBookNumbers:Sc,firstBook:wc,lastBook:lo,extraBooks:Oc,bookNumberToId:wt,bookNumberToEnglishName:uo,bookIdToEnglishName:Cc,isCanonical:fo,isExtraMaterial:Pc,isObsolete:Rc};var _e=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(_e||{});const ge=class{constructor(n){if(X(this,"name"),X(this,"fullPath"),X(this,"isPresent"),X(this,"hasVerseSegments"),X(this,"isCustomized"),X(this,"baseVersification"),X(this,"scriptureBooks"),X(this,"_type"),n!=null)typeof n=="string"?this.name=n:this._type=n;else throw new Error("Argument null")}get type(){return this._type}equals(n){return!n.type||!this.type?!1:n.type===this.type}};X(ge,"Original",new ge(_e.Original)),X(ge,"Septuagint",new ge(_e.Septuagint)),X(ge,"Vulgate",new ge(_e.Vulgate)),X(ge,"English",new ge(_e.English)),X(ge,"RussianProtestant",new ge(_e.RussianProtestant)),X(ge,"RussianOrthodox",new ge(_e.RussianOrthodox));let en=ge;function br(e,n){const t=n[0];for(let r=1;r<n.length;r++)e=e.split(n[r]).join(t);return e.split(t)}var po=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(po||{});const me=class Q{constructor(n,t,r,o){if(X(this,"firstChapter"),X(this,"lastChapter"),X(this,"lastVerse"),X(this,"hasSegmentsDefined"),X(this,"text"),X(this,"BBBCCCVVVS"),X(this,"longHashCode"),X(this,"versification"),X(this,"rtlMark","‏"),X(this,"_bookNum",0),X(this,"_chapterNum",0),X(this,"_verseNum",0),X(this,"_verse"),r==null&&o==null)if(n!=null&&typeof n=="string"){const i=n,a=t!=null&&t instanceof en?t:void 0;this.setEmpty(a),this.parse(i)}else if(n!=null&&typeof n=="number"){const i=t!=null&&t instanceof en?t:void 0;this.setEmpty(i),this._verseNum=n%Q.chapterDigitShifter,this._chapterNum=Math.floor(n%Q.bookDigitShifter/Q.chapterDigitShifter),this._bookNum=Math.floor(n/Q.bookDigitShifter)}else if(t==null)if(n!=null&&n instanceof Q){const i=n;this._bookNum=i.bookNum,this._chapterNum=i.chapterNum,this._verseNum=i.verseNum,this._verse=i.verse,this.versification=i.versification}else{if(n==null)return;const i=n instanceof en?n:Q.defaultVersification;this.setEmpty(i)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&t!=null&&r!=null)if(typeof n=="string"&&typeof t=="string"&&typeof r=="string")this.setEmpty(o),this.updateInternal(n,t,r);else if(typeof n=="number"&&typeof t=="number"&&typeof r=="number")this._bookNum=n,this._chapterNum=t,this._verseNum=r,this.versification=o??Q.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static parse(n,t=Q.defaultVersification){const r=new Q(t);return r.parse(n),r}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let t;try{return t=Q.parse(n),{success:!0,verseRef:t}}catch(r){if(r instanceof ln)return t=new Q,{success:!1,verseRef:t};throw r}}static getBBBCCCVVV(n,t,r){return n%Q.bcvMaxValue*Q.bookDigitShifter+(t>=0?t%Q.bcvMaxValue*Q.chapterDigitShifter:0)+(r>=0?r%Q.bcvMaxValue:0)}static tryGetVerseNum(n){let t;if(!n)return t=-1,{success:!0,vNum:t};t=0;let r;for(let o=0;o<n.length;o++){if(r=n[o],r<"0"||r>"9")return o===0&&(t=-1),{success:!1,vNum:t};if(t=t*10+ +r-+"0",t>Q.bcvMaxValue)return t=-1,{success:!1,vNum:t}}return{success:!0,vNum:t}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(Q.verseRangeSeparator)||this._verse.includes(Q.verseSequenceIndicator))}get book(){return we.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=we.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const t=+n;this._chapterNum=Number.isInteger(t)?t:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:t,vNum:r}=Q.tryGetVerseNum(n);this._verse=t?void 0:n.replace(this.rtlMark,""),this._verseNum=r,!(this._verseNum>=0)&&({vNum:this._verseNum}=Q.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>we.lastBook)throw new ln("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new en(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(Q.verseRangeSeparators,Q.verseSequenceIndicators)}get BBBCCC(){return Q.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return Q.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const i=n.split("/");if(n=i[0],i.length>1)try{const a=+i[1].trim();this.versification=new en(_e[a])}catch{throw new ln("Invalid reference : "+n)}}const t=n.trim().split(" ");if(t.length!==2)throw new ln("Invalid reference : "+n);const r=t[1].split(":"),o=+r[0];if(r.length!==2||we.bookIdToNumber(t[0])===0||!Number.isInteger(o)||o<0||!Q.isVerseParseable(r[1]))throw new ln("Invalid reference : "+n);this.updateInternal(t[0],r[0],r[1])}simplify(){this._verse=void 0}clone(){return new Q(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}equals(n){return n instanceof Q?n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n.verse===this.verse&&n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification):!1}allVerses(n=!1,t=Q.verseRangeSeparators,r=Q.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],i=br(this._verse,r);for(const a of i.map(c=>br(c,t))){const c=this.clone();c.verse=a[0];const l=c.verseNum;if(o.push(c),a.length>1){const u=this.clone();if(u.verse=a[1],!n)for(let d=l+1;d<u.verseNum;d++){const p=new Q(this._bookNum,this._chapterNum,d,this.versification);this.isExcluded||o.push(p)}o.push(u)}}return o}validateVerse(n,t){if(!this.verse)return this.internalValid;let r=0;for(const o of this.allVerses(!0,n,t)){const i=o.internalValid;if(i!==0)return i;const a=o.BBBCCCVVV;if(r>a)return 3;if(r===a)return 4;r=a}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>we.lastBook?2:(we.isCanonical(this._bookNum),0)}setEmpty(n=Q.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,t,r){this.bookNum=we.bookIdToNumber(n),this.chapter=t,this.verse=r}};X(me,"defaultVersification",en.English),X(me,"verseRangeSeparator","-"),X(me,"verseSequenceIndicator",","),X(me,"verseRangeSeparators",[me.verseRangeSeparator]),X(me,"verseSequenceIndicators",[me.verseSequenceIndicator]),X(me,"chapterDigitShifter",1e3),X(me,"bookDigitShifter",me.chapterDigitShifter*me.chapterDigitShifter),X(me,"bcvMaxValue",me.chapterDigitShifter-1),X(me,"ValidStatusType",po);class ln extends Error{}function bn({variant:e="outlined",id:n,isDisabled:t=!1,hasError:r=!1,isFullWidth:o=!1,helperText:i,label:a,placeholder:c,isRequired:l=!1,className:u,defaultValue:d,value:p,onChange:f,onFocus:b,onBlur:y}){return E.jsx(ae.TextField,{variant:e,id:n,disabled:t,error:r,fullWidth:o,helperText:i,label:a,placeholder:c,required:l,className:`papi-textfield ${u??""}`,defaultValue:d,value:p,onChange:f,onFocus:b,onBlur:y})}let et;const nt=()=>(et||(et=we.allBookIds.map(e=>({bookId:e,label:we.bookIdToEnglishName(e)}))),et);function $c({scrRef:e,handleSubmit:n,id:t}){const r=l=>{n(l)},o=(l,u)=>{const p={bookNum:we.bookIdToNumber(u.bookId),chapterNum:1,verseNum:1};r(p)},i=l=>{n({...e,chapterNum:+l.target.value})},a=l=>{n({...e,verseNum:+l.target.value})},c=ne.useMemo(()=>nt()[e.bookNum-1],[e.bookNum]);return E.jsxs("span",{id:t,children:[E.jsx(On,{title:"Book",className:"papi-ref-selector book",value:c,options:nt(),onChange:o,isClearable:!1,width:200}),E.jsx(Ae,{onClick:()=>r(Se.offsetBook(e,-1)),isDisabled:e.bookNum<=Se.FIRST_SCR_BOOK_NUM,children:"<"}),E.jsx(Ae,{onClick:()=>r(Se.offsetBook(e,1)),isDisabled:e.bookNum>=nt().length,children:">"}),E.jsx(bn,{className:"papi-ref-selector chapter-verse",label:"Chapter",value:e.chapterNum,onChange:i}),E.jsx(Ae,{onClick:()=>n(Se.offsetChapter(e,-1)),isDisabled:e.chapterNum<=Se.FIRST_SCR_CHAPTER_NUM,children:"<"}),E.jsx(Ae,{onClick:()=>n(Se.offsetChapter(e,1)),isDisabled:e.chapterNum>=Se.getChaptersForBook(e.bookNum),children:">"}),E.jsx(bn,{className:"papi-ref-selector chapter-verse",label:"Verse",value:e.verseNum,onChange:a}),E.jsx(Ae,{onClick:()=>n(Se.offsetVerse(e,-1)),isDisabled:e.verseNum<=Se.FIRST_SCR_VERSE_NUM,children:"<"}),E.jsx(Ae,{onClick:()=>n(Se.offsetVerse(e,1)),children:">"})]})}function _c({onSearch:e,placeholder:n,isFullWidth:t}){const[r,o]=ne.useState(""),i=a=>{o(a),e(a)};return E.jsx(ae.Paper,{component:"form",className:"search-bar-paper",children:E.jsx(bn,{isFullWidth:t,className:"search-bar-input",placeholder:n,value:r,onChange:a=>i(a.target.value)})})}function Ic({id:e,isDisabled:n=!1,orientation:t="horizontal",min:r=0,max:o=100,step:i=1,showMarks:a=!1,defaultValue:c,value:l,valueLabelDisplay:u="off",className:d,onChange:p,onChangeCommitted:f}){return E.jsx(ae.Slider,{id:e,disabled:n,orientation:t,min:r,max:o,step:i,marks:a,defaultValue:c,value:l,valueLabelDisplay:u,className:`papi-slider ${t} ${d??""}`,onChange:p,onChangeCommitted:f})}function Mc({autoHideDuration:e=void 0,id:n,isOpen:t=!1,className:r,onClose:o,anchorOrigin:i={vertical:"bottom",horizontal:"left"},ContentProps:a,children:c}){const l={action:(a==null?void 0:a.action)||c,message:a==null?void 0:a.message,className:r};return E.jsx(ae.Snackbar,{autoHideDuration:e??void 0,open:t,onClose:o,anchorOrigin:i,id:n,ContentProps:l})}function Ac({id:e,isChecked:n,isDisabled:t=!1,hasError:r=!1,className:o,onChange:i}){return E.jsx(ae.Switch,{id:e,checked:n,disabled:t,className:`papi-switch ${r?"error":""} ${o??""}`,onChange:i})}function yr({onRowChange:e,row:n,column:t}){const r=o=>{e({...n,[t.key]:o.target.value})};return E.jsx(bn,{defaultValue:n[t.key],onChange:r})}const jc=({onChange:e,disabled:n,checked:t,...r})=>{const o=i=>{e(i.target.checked,i.nativeEvent.shiftKey)};return E.jsx(Er,{...r,isChecked:t,isDisabled:n,onChange:o})};function Dc({columns:e,sortColumns:n,onSortColumnsChange:t,onColumnResize:r,defaultColumnWidth:o,defaultColumnMinWidth:i,defaultColumnMaxWidth:a,defaultColumnSortable:c=!0,defaultColumnResizable:l=!0,rows:u,enableSelectColumn:d,selectColumnWidth:p=50,rowKeyGetter:f,rowHeight:b=35,headerRowHeight:y=35,selectedRows:g,onSelectedRowsChange:h,onRowsChange:k,onCellClick:D,onCellDoubleClick:x,onCellContextMenu:O,onCellKeyDown:m,direction:_="ltr",enableVirtualization:N=!0,onCopy:H,onPaste:J,onScroll:Y,className:q,id:W}){const ee=ne.useMemo(()=>{const A=e.map(R=>typeof R.editable=="function"?{...R,editable:j=>!!R.editable(j),renderEditCell:R.renderEditCell||yr}:R.editable&&!R.renderEditCell?{...R,renderEditCell:yr}:R.renderEditCell&&!R.editable?{...R,editable:!1}:R);return d?[{...$t.SelectColumn,minWidth:p},...A]:A},[e,d,p]);return E.jsx($t,{columns:ee,defaultColumnOptions:{width:o,minWidth:i,maxWidth:a,sortable:c,resizable:l},sortColumns:n,onSortColumnsChange:t,onColumnResize:r,rows:u,rowKeyGetter:f,rowHeight:b,headerRowHeight:y,selectedRows:g,onSelectedRowsChange:h,onRowsChange:k,onCellClick:D,onCellDoubleClick:x,onCellContextMenu:O,onCellKeyDown:m,direction:_,enableVirtualization:N,onCopy:H,onPaste:J,onScroll:Y,renderers:{renderCheckbox:jc},className:`papi-table ${q??"rdg-light"}`,id:W})}function Bc(e){return Ne("MuiSvgIcon",e)}He("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Lc=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],Fc=e=>{const{color:n,fontSize:t,classes:r}=e,o={root:["root",n!=="inherit"&&`color${Fe(n)}`,`fontSize${Fe(t)}`]};return Ue(o,Bc,r)},Vc=ke("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e;return[n.root,t.color!=="inherit"&&n[`color${Fe(t.color)}`],n[`fontSize${Fe(t.fontSize)}`]]}})(({theme:e,ownerState:n})=>{var t,r,o,i,a,c,l,u,d,p,f,b,y;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:n.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(t=e.transitions)==null||(r=t.create)==null?void 0:r.call(t,"fill",{duration:(o=e.transitions)==null||(o=o.duration)==null?void 0:o.shorter}),fontSize:{inherit:"inherit",small:((i=e.typography)==null||(a=i.pxToRem)==null?void 0:a.call(i,20))||"1.25rem",medium:((c=e.typography)==null||(l=c.pxToRem)==null?void 0:l.call(c,24))||"1.5rem",large:((u=e.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[n.fontSize],color:(p=(f=(e.vars||e).palette)==null||(f=f[n.color])==null?void 0:f.main)!=null?p:{action:(b=(e.vars||e).palette)==null||(b=b.action)==null?void 0:b.active,disabled:(y=(e.vars||e).palette)==null||(y=y.action)==null?void 0:y.disabled,inherit:void 0}[n.color]}}),Ot=w.forwardRef(function(n,t){const r=qe({props:n,name:"MuiSvgIcon"}),{children:o,className:i,color:a="inherit",component:c="svg",fontSize:l="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:p,viewBox:f="0 0 24 24"}=r,b=le(r,Lc),y=w.isValidElement(o)&&o.type==="svg",g=T({},r,{color:a,component:c,fontSize:l,instanceFontSize:n.fontSize,inheritViewBox:d,viewBox:f,hasSvgAsChild:y}),h={};d||(h.viewBox=f);const k=Fc(g);return E.jsxs(Vc,T({as:c,className:Pe(k.root,i),focusable:"false",color:u,"aria-hidden":p?void 0:!0,role:p?"img":void 0,ref:t},h,b,y&&o.props,{ownerState:g,children:[y?o.props.children:o,p?E.jsx("title",{children:p}):null]}))});process.env.NODE_ENV!=="production"&&(Ot.propTypes={children:s.node,classes:s.object,className:s.string,color:s.oneOfType([s.oneOf(["inherit","action","disabled","primary","secondary","error","info","success","warning"]),s.string]),component:s.elementType,fontSize:s.oneOfType([s.oneOf(["inherit","large","medium","small"]),s.string]),htmlColor:s.string,inheritViewBox:s.bool,shapeRendering:s.string,sx:s.oneOfType([s.arrayOf(s.oneOfType([s.func,s.object,s.bool])),s.func,s.object]),titleAccess:s.string,viewBox:s.string});Ot.muiName="SvgIcon";const vr=Ot;function zc(e,n){function t(r,o){return E.jsx(vr,T({"data-testid":`${n}Icon`,ref:o},r,{children:e}))}return process.env.NODE_ENV!=="production"&&(t.displayName=`${n}Icon`),t.muiName=vr.muiName,w.memo(w.forwardRef(t))}const Uc=zc(E.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}),"Menu");function Hc({menuProvider:e,commandHandler:n,className:t,id:r,children:o}){const[i,a]=ne.useState(!1),[c,l]=ne.useState(!1),u=ne.useCallback(()=>{i&&a(!1),l(!1)},[i]),d=ne.useCallback(h=>{h.stopPropagation(),a(k=>{const D=!k;return D&&h.shiftKey?l(!0):D||l(!1),D})},[]),p=ne.useRef(void 0),[f,b]=ne.useState(0);ne.useEffect(()=>{i&&p.current&&b(p.current.clientHeight)},[i]);const y=ne.useCallback(h=>(u(),n(h)),[n,u]),g=e==null?void 0:e(c);return E.jsx("div",{ref:p,style:{position:"relative"},children:E.jsx(ae.AppBar,{position:"static",id:r,children:E.jsxs(ae.Toolbar,{className:`papi-toolbar ${t??""}`,variant:"dense",children:[g?E.jsx(ae.IconButton,{edge:"start",className:`papi-menuButton ${t??""}`,color:"inherit","aria-label":"open drawer",onClick:d,children:E.jsx(Uc,{})}):void 0,o?E.jsx("div",{className:"papi-menu-children",children:o}):void 0,g?E.jsx(ae.Drawer,{className:`papi-menu-drawer ${t??""}`,anchor:"left",variant:"persistent",open:i,onClose:u,PaperProps:{className:"papi-menu-drawer-paper",style:{top:f}},children:E.jsx(wr,{className:t,commandHandler:y,multiColumnMenu:g})}):void 0]})})})}const qc=(e,n)=>{ne.useEffect(()=>{if(!e)return()=>{};const t=e(n);return()=>{t()}},[e,n])};function Wc(e){return{preserveValue:!0,...e}}const ho=(e,n,t={})=>{const r=ne.useRef(n);r.current=n;const o=ne.useRef(t);o.current=Wc(o.current);const[i,a]=ne.useState(()=>r.current),[c,l]=ne.useState(!0);return ne.useEffect(()=>{let u=!0;return l(!!e),(async()=>{if(e){const d=await e();u&&(a(()=>d),l(!1))}})(),()=>{u=!1,o.current.preserveValue||a(()=>r.current)}},[e]),[i,c]},tt=()=>!1,Gc=(e,n)=>{const[t]=ho(ne.useCallback(async()=>{if(!e)return tt;const r=await Promise.resolve(e(n));return async()=>r()},[n,e]),tt,{preserveValue:!1});ne.useEffect(()=>()=>{t!==tt&&t()},[t])};exports.Button=Ae;exports.ChapterRangeSelector=go;exports.Checkbox=Er;exports.ComboBox=On;exports.ContextMenu=yc;exports.GridMenu=wr;exports.IconButton=xo;exports.LabelPosition=Be;exports.MenuItem=Tr;exports.RefSelector=$c;exports.SearchBar=_c;exports.Slider=Ic;exports.Snackbar=Mc;exports.Switch=Ac;exports.Table=Dc;exports.TextField=bn;exports.Toolbar=Hc;exports.TopLevelMenu=Sr;exports.useEvent=qc;exports.useEventAsync=Gc;exports.usePromise=ho;function Kc(e,n="top"){if(!e||typeof document>"u")return;const t=document.head||document.querySelector("head"),r=t.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),n==="top"&&r?t.insertBefore(o,r):t.appendChild(o)}Kc(`.papi-checkbox {
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
`,"top");
//# sourceMappingURL=index.cjs.map
