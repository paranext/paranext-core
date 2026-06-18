import{r as n}from"./iframe-CZvc88lx.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=(...t)=>t.filter((e,o,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===o).join(" ").trim();/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,o,r)=>r?r.toUpperCase():o.toLowerCase());/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=t=>{const e=A(t);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1},b=n.createContext({}),L=()=>n.useContext(b),W=n.forwardRef(({color:t,size:e,strokeWidth:o,absoluteStrokeWidth:r,className:a="",children:s,iconNode:p,...l},m)=>{const{size:c=24,strokeWidth:d=2,absoluteStrokeWidth:C=!1,color:f="currentColor",className:x=""}=L()??{},w=r??C?Number(o??d)*24/Number(e??c):o??d;return n.createElement("svg",{ref:m,...i,width:e??c??i.width,height:e??c??i.height,stroke:t??f,strokeWidth:w,className:h("lucide",x,a),...!s&&!S(l)&&{"aria-hidden":"true"},...l},[...p.map(([k,y])=>n.createElement(k,y)),...Array.isArray(s)?s:[s]])});/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(t,e)=>{const o=n.forwardRef(({className:r,...a},s)=>n.createElement(W,{ref:s,iconNode:e,className:h(`lucide-${g(u(t))}`,`lucide-${t}`,r),...a}));return o.displayName=u(t),o};export{v as c};
