var o={exports:{}},r={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var s;function x(){if(s)return r;s=1;var l=Symbol.for("react.transitional.element"),a=Symbol.for("react.fragment");function i(c,e,t){var n=null;if(t!==void 0&&(n=""+t),e.key!==void 0&&(n=""+e.key),"key"in e){t={};for(var u in e)u!=="key"&&(t[u]=e[u])}else t=e;return e=t.ref,{$$typeof:l,type:c,key:n,ref:e!==void 0?e:null,props:t}}return r.Fragment=a,r.jsx=i,r.jsxs=i,r}var d;function p(){return d||(d=1,o.exports=x()),o.exports}var R=p();export{R as j};
