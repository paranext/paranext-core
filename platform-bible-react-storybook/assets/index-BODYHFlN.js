import{b as q}from"./iframe-ChjBVkNN.js";var a={exports:{}},s={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f;function w(){if(f)return s;f=1;var u=q();function S(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var l=typeof Object.is=="function"?Object.is:S,p=u.useState,h=u.useEffect,m=u.useLayoutEffect,y=u.useDebugValue;function v(e,t){var r=t(),i=p({inst:{value:r,getSnapshot:t}}),n=i[0].inst,c=i[1];return m(function(){n.value=r,n.getSnapshot=t,o(n)&&c({inst:n})},[e,r,t]),h(function(){return o(n)&&c({inst:n}),e(function(){o(n)&&c({inst:n})})},[e]),y(r),r}function o(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!l(e,r)}catch{return!0}}function E(e,t){return t()}var x=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?E:v;return s.useSyncExternalStore=u.useSyncExternalStore!==void 0?u.useSyncExternalStore:x,s}var d;function b(){return d||(d=1,a.exports=w()),a.exports}var C=b();export{C as s};
