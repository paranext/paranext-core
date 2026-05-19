var ut=Object.defineProperty;var ht=(e,t,n)=>t in e?ut(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var S=(e,t,n)=>ht(e,typeof t!="symbol"?t+"":t,n);import{_ as vt}from"./assets/preload-helper-CTOgD26E.js";class st{constructor(){S(this,"registryByUrl",new Map);S(this,"registryById",new Map)}clear(){this.registryByUrl.clear(),this.registryById.clear()}keys(){return this.registryByUrl.keys()}add(t){this.registryByUrl.set(t.url,t),this.registryById.set(t.id,t)}register(t,n,r,a,i){const c=typeof t=="object"?t.type:t;if(typeof t=="object"){const o=t;if(o instanceof F||o instanceof A||o instanceof O||o instanceof $)throw new TypeError(`[vitest] Cannot register a mock that is already defined. Expected a JSON representation from \`MockedModule.toJSON\`, instead got "${o.type}". Use "registry.add()" to update a mock instead.`);if(o.type==="automock"){const l=F.fromJSON(o);return this.add(l),l}else if(o.type==="autospy"){const l=A.fromJSON(o);return this.add(l),l}else if(o.type==="redirect"){const l=$.fromJSON(o);return this.add(l),l}else throw o.type==="manual"?new Error("Cannot set serialized manual mock. Define a factory function manually with `ManualMockedModule.fromJSON()`."):new Error(`Unknown mock type: ${o.type}`)}if(typeof n!="string")throw new TypeError("[vitest] Mocks require a raw string.");if(typeof a!="string")throw new TypeError("[vitest] Mocks require a url string.");if(typeof r!="string")throw new TypeError("[vitest] Mocks require an id string.");if(c==="manual"){if(typeof i!="function")throw new TypeError("[vitest] Manual mocks require a factory function.");const o=new O(n,r,a,i);return this.add(o),o}else if(c==="automock"||c==="autospy"){const o=c==="automock"?new F(n,r,a):new A(n,r,a);return this.add(o),o}else if(c==="redirect"){if(typeof i!="string")throw new TypeError("[vitest] Redirect mocks require a redirect string.");const o=new $(n,r,a,i);return this.add(o),o}else throw new Error(`[vitest] Unknown mock type: ${c}`)}delete(t){this.registryByUrl.delete(t)}get(t){return this.registryByUrl.get(t)}getById(t){return this.registryById.get(t)}has(t){return this.registryByUrl.has(t)}}class F{constructor(t,n,r){S(this,"type","automock");this.raw=t,this.id=n,this.url=r}static fromJSON(t){return new A(t.raw,t.id,t.url)}toJSON(){return{type:this.type,url:this.url,raw:this.raw,id:this.id}}}class A{constructor(t,n,r){S(this,"type","autospy");this.raw=t,this.id=n,this.url=r}static fromJSON(t){return new A(t.raw,t.id,t.url)}toJSON(){return{type:this.type,url:this.url,id:this.id,raw:this.raw}}}class ${constructor(t,n,r,a){S(this,"type","redirect");this.raw=t,this.id=n,this.url=r,this.redirect=a}static fromJSON(t){return new $(t.raw,t.id,t.url,t.redirect)}toJSON(){return{type:this.type,url:this.url,raw:this.raw,id:this.id,redirect:this.redirect}}}class O{constructor(t,n,r,a){S(this,"cache");S(this,"type","manual");this.raw=t,this.id=n,this.url=r,this.factory=a}async resolve(){if(this.cache)return this.cache;let t;try{t=await this.factory()}catch(n){const r=new Error('[vitest] There was an error when mocking a module. If you are using "vi.mock" factory, make sure there are no top level variables inside, since this call is hoisted to top of the file. Read more: https://vitest.dev/api/vi.html#vi-mock');throw r.cause=n,r}if(t===null||typeof t!="object"||Array.isArray(t))throw new TypeError(`[vitest] vi.mock("${this.raw}", factory?: () => unknown) is not returning an object. Did you mean to return an object with a "default" key?`);return this.cache=t}static fromJSON(t,n){return new O(t.raw,t.id,t.url,n)}toJSON(){return{type:this.type,url:this.url,id:this.id,raw:this.raw}}}function bt(e,t,n={}){const r=new Array,a=new xt,i=(l,w,f)=>{try{return l[w]=f,!0}catch{return!1}},c=(l,w)=>{const f=H(l),h=f==="Module"||!!l.__esModule;for(const{key:b,descriptor:z}of Y(l,h,e.globalConstructors)){if(!h&&z.get){try{Object.defineProperty(w,b,z)}catch{}continue}if(kt(b,f))continue;const u=l[b],s=a.getId(u);if(s!==void 0){r.push(()=>i(w,b,a.getMockedValue(s)));continue}const d=H(u);if(Array.isArray(u)){i(w,b,[]);continue}const C=d.includes("Function")&&typeof u=="function";if((!C||u._isMockFunction)&&d!=="Object"&&d!=="Module"){i(w,b,u);continue}if(i(w,b,C?u:{})){if(C){let y=function(){if(this instanceof w[b])for(const{key:q,descriptor:T}of Y(this,!1,e.globalConstructors)){if(T.get)continue;const L=this[q];if(H(L).includes("Function")&&typeof L=="function"){const B=this[q],p=P(this,q).mockImplementation(B),E=p.mockReset;p.mockRestore=p.mockReset=()=>(E.call(p),p.mockImplementation(B),p)}}};if(!e.spyOn)throw new Error("[@vitest/mocker] `spyOn` is not defined. This is a Vitest error. Please open a new issue with reproduction.");const P=e.spyOn,M=P(w,b);if(e.type==="automock"){M.mockImplementation(y);const q=M.mockReset;M.mockRestore=M.mockReset=()=>(q.call(M),M.mockImplementation(y),M)}Object.defineProperty(w[b],"length",{value:0})}a.track(u,w[b]),c(u,w[b])}}},o=n;c(t,o);for(const l of r)l();return o}class xt{constructor(){S(this,"idMap",new Map);S(this,"mockedValueMap",new Map)}getId(t){return this.idMap.get(t)}getMockedValue(t){return this.mockedValueMap.get(t)}track(t,n){const r=this.idMap.size;return this.idMap.set(t,r),this.mockedValueMap.set(r,n),r}}function H(e){return Object.prototype.toString.apply(e).slice(8,-1)}function kt(e,t){return t.includes("Function")&&typeof e=="string"&&["arguments","callee","caller","length","name"].includes(e)}function Y(e,t,n){const{Map:r,Object:a,Function:i,RegExp:c,Array:o}=n,l=new r;let w=e;do{if(w===a.prototype||w===i.prototype||w===c.prototype)break;yt(w,f=>{const h=a.getOwnPropertyDescriptor(w,f);h&&l.set(f,{key:f,descriptor:h})})}while(w=a.getPrototypeOf(w));if(t&&!l.has("default")&&"default"in e){const f=a.getOwnPropertyDescriptor(e,"default");f&&l.set("default",{key:"default",descriptor:f})}return o.from(l.values())}function yt(e,t){const n=typeof t=="function"?t:r=>t.add(r);Object.getOwnPropertyNames(e).forEach(n),Object.getOwnPropertySymbols(e).forEach(n)}const _t=/^[A-Za-z]:\//;function ct(e=""){return e&&e.replace(/\\/g,"/").replace(_t,t=>t.toUpperCase())}const zt=/^[/\\]{2}/,qt=/^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/,St=/^[A-Za-z]:$/,Ct=/.(\.[^./]+|\.)$/,It=function(e){if(e.length===0)return".";e=ct(e);const t=e.match(zt),n=K(e),r=e[e.length-1]==="/";return e=Mt(e,!n),e.length===0?n?"/":r?"./":".":(r&&(e+="/"),St.test(e)&&(e+="/"),t?n?`//${e}`:`//./${e}`:n&&!K(e)?`/${e}`:e)},Et=function(...e){let t="";for(const n of e)if(n)if(t.length>0){const r=t[t.length-1]==="/",a=n[0]==="/";r&&a?t+=n.slice(1):t+=r||a?n:`/${n}`}else t+=n;return It(t)};function Mt(e,t){let n="",r=0,a=-1,i=0,c=null;for(let o=0;o<=e.length;++o){if(o<e.length)c=e[o];else{if(c==="/")break;c="/"}if(c==="/"){if(!(a===o-1||i===1))if(i===2){if(n.length<2||r!==2||n[n.length-1]!=="."||n[n.length-2]!=="."){if(n.length>2){const l=n.lastIndexOf("/");l===-1?(n="",r=0):(n=n.slice(0,l),r=n.length-1-n.lastIndexOf("/")),a=o,i=0;continue}else if(n.length>0){n="",r=0,a=o,i=0;continue}}t&&(n+=n.length>0?"/..":"..",r=2)}else n.length>0?n+=`/${e.slice(a+1,o)}`:n=e.slice(a+1,o),r=o-a-1;a=o,i=0}else c==="."&&i!==-1?++i:i=-1}return n}const K=function(e){return qt.test(e)},Pt=function(e){if(e==="..")return"";const t=Ct.exec(ct(e));return t&&t[1]||""};var Tt={reset:[0,0],bold:[1,22,"\x1B[22m\x1B[1m"],dim:[2,22,"\x1B[22m\x1B[2m"],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29],black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],gray:[90,39],bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]},Nt=Object.entries(Tt);function Z(e){return String(e)}Z.open="";Z.close="";function At(e=!1){let t=typeof process<"u"?process:void 0,n=(t==null?void 0:t.env)||{},r=(t==null?void 0:t.argv)||[];return!("NO_COLOR"in n||r.includes("--no-color"))&&("FORCE_COLOR"in n||r.includes("--color")||(t==null?void 0:t.platform)==="win32"||e&&n.TERM!=="dumb"||"CI"in n)||typeof window<"u"&&!!window.chrome}function $t(e=!1){let t=At(e),n=(c,o,l,w)=>{let f="",h=0;do f+=c.substring(h,w)+l,h=w+o.length,w=c.indexOf(o,h);while(~w);return f+c.substring(h)},r=(c,o,l=c)=>{let w=f=>{let h=String(f),b=h.indexOf(o,c.length);return~b?c+n(h,o,l,b)+o:c+h+o};return w.open=c,w.close=o,w},a={isColorSupported:t},i=c=>`\x1B[${c}m`;for(let[c,o]of Nt)a[c]=t?r(i(o[0]),i(o[1]),o[2]):Z;return a}$t();function lt(e,t){return t.forEach(function(n){n&&typeof n!="string"&&!Array.isArray(n)&&Object.keys(n).forEach(function(r){if(r!=="default"&&!(r in e)){var a=Object.getOwnPropertyDescriptor(n,r);Object.defineProperty(e,r,a.get?a:{enumerable:!0,get:function(){return n[r]}})}})}),Object.freeze(e)}function dt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var j={exports:{}},x={};/**
* @license React
* react-is.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/var G;function Lt(){if(G)return x;G=1;var e=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),i=Symbol.for("react.consumer"),c=Symbol.for("react.context"),o=Symbol.for("react.forward_ref"),l=Symbol.for("react.suspense"),w=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),h=Symbol.for("react.lazy"),b=Symbol.for("react.view_transition"),z=Symbol.for("react.client.reference");function u(s){if(typeof s=="object"&&s!==null){var d=s.$$typeof;switch(d){case e:switch(s=s.type,s){case n:case a:case r:case l:case w:case b:return s;default:switch(s=s&&s.$$typeof,s){case c:case o:case h:case f:return s;case i:return s;default:return d}}case t:return d}}}return x.ContextConsumer=i,x.ContextProvider=c,x.Element=e,x.ForwardRef=o,x.Fragment=n,x.Lazy=h,x.Memo=f,x.Portal=t,x.Profiler=a,x.StrictMode=r,x.Suspense=l,x.SuspenseList=w,x.isContextConsumer=function(s){return u(s)===i},x.isContextProvider=function(s){return u(s)===c},x.isElement=function(s){return typeof s=="object"&&s!==null&&s.$$typeof===e},x.isForwardRef=function(s){return u(s)===o},x.isFragment=function(s){return u(s)===n},x.isLazy=function(s){return u(s)===h},x.isMemo=function(s){return u(s)===f},x.isPortal=function(s){return u(s)===t},x.isProfiler=function(s){return u(s)===a},x.isStrictMode=function(s){return u(s)===r},x.isSuspense=function(s){return u(s)===l},x.isSuspenseList=function(s){return u(s)===w},x.isValidElementType=function(s){return typeof s=="string"||typeof s=="function"||s===n||s===a||s===r||s===l||s===w||typeof s=="object"&&s!==null&&(s.$$typeof===h||s.$$typeof===f||s.$$typeof===c||s.$$typeof===i||s.$$typeof===o||s.$$typeof===z||s.getModuleId!==void 0)},x.typeOf=u,x}var Q;function Bt(){return Q||(Q=1,j.exports=Lt()),j.exports}var pt=Bt(),Rt=dt(pt),Vt=lt({__proto__:null,default:Rt},[pt]),D={exports:{}},v={};/**
* @license React
* react-is.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/var tt;function Ut(){if(tt)return v;tt=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),i=Symbol.for("react.provider"),c=Symbol.for("react.context"),o=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),f=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),z=Symbol.for("react.offscreen"),u;u=Symbol.for("react.module.reference");function s(d){if(typeof d=="object"&&d!==null){var C=d.$$typeof;switch(C){case e:switch(d=d.type,d){case n:case a:case r:case w:case f:return d;default:switch(d=d&&d.$$typeof,d){case o:case c:case l:case b:case h:case i:return d;default:return C}}case t:return C}}}return v.ContextConsumer=c,v.ContextProvider=i,v.Element=e,v.ForwardRef=l,v.Fragment=n,v.Lazy=b,v.Memo=h,v.Portal=t,v.Profiler=a,v.StrictMode=r,v.Suspense=w,v.SuspenseList=f,v.isAsyncMode=function(){return!1},v.isConcurrentMode=function(){return!1},v.isContextConsumer=function(d){return s(d)===c},v.isContextProvider=function(d){return s(d)===i},v.isElement=function(d){return typeof d=="object"&&d!==null&&d.$$typeof===e},v.isForwardRef=function(d){return s(d)===l},v.isFragment=function(d){return s(d)===n},v.isLazy=function(d){return s(d)===b},v.isMemo=function(d){return s(d)===h},v.isPortal=function(d){return s(d)===t},v.isProfiler=function(d){return s(d)===a},v.isStrictMode=function(d){return s(d)===r},v.isSuspense=function(d){return s(d)===w},v.isSuspenseList=function(d){return s(d)===f},v.isValidElementType=function(d){return typeof d=="string"||typeof d=="function"||d===n||d===a||d===r||d===w||d===f||d===z||typeof d=="object"&&d!==null&&(d.$$typeof===b||d.$$typeof===h||d.$$typeof===i||d.$$typeof===c||d.$$typeof===l||d.$$typeof===u||d.getModuleId!==void 0)},v.typeOf=s,v}var nt;function Ft(){return nt||(nt=1,D.exports=Ut()),D.exports}var wt=Ft(),Ot=dt(wt),Ht=lt({__proto__:null,default:Ot},[wt]);const jt=["isAsyncMode","isConcurrentMode","isContextConsumer","isContextProvider","isElement","isForwardRef","isFragment","isLazy","isMemo","isPortal","isProfiler","isStrictMode","isSuspense","isSuspenseList","isValidElementType"];Object.fromEntries(jt.map(e=>[e,t=>Ht[e](t)||Vt[e](t)]));let Dt=()=>"Promise{…}";try{const{getPromiseDetails:e,kPending:t,kRejected:n}=process.binding("util");Array.isArray(e(Promise.resolve()))&&(Dt=(r,a)=>{const[i,c]=e(r);return i===t?"Promise{<pending>}":`Promise${i===n?"!":""}{${a.inspect(c,a)}}`})}catch{}function Jt(e){const{message:t="$$stack trace error",stackTraceLimit:n=1}=e||{},r=Error.stackTraceLimit,a=Error.prepareStackTrace;Error.stackTraceLimit=n,Error.prepareStackTrace=o=>o.stack;const c=new Error(t).stack||"";return Error.prepareStackTrace=a,Error.stackTraceLimit=r,c}var J,et;function Xt(){if(et)return J;et=1;var e,t,n,r,a,i,c,o,l,w,f,h,b,z,u,s,d,C,P;return b=/\/(?![*\/])(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\\]).|\\.)*(\/[$_\u200C\u200D\p{ID_Continue}]*|\\)?/uy,h=/--|\+\+|=>|\.{3}|\??\.(?!\d)|(?:&&|\|\||\?\?|[+\-%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2}|\/(?![\/*]))=?|[?~,:;[\](){}]/y,e=/(\x23?)(?=[$_\p{ID_Start}\\])(?:[$_\u200C\u200D\p{ID_Continue}]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+/uy,u=/(['"])(?:(?!\1)[^\\\n\r]|\\(?:\r\n|[^]))*(\1)?/y,f=/(?:0[xX][\da-fA-F](?:_?[\da-fA-F])*|0[oO][0-7](?:_?[0-7])*|0[bB][01](?:_?[01])*)n?|0n|[1-9](?:_?\d)*n|(?:(?:0(?!\d)|0\d*[89]\d*|[1-9](?:_?\d)*)(?:\.(?:\d(?:_?\d)*)?)?|\.\d(?:_?\d)*)(?:[eE][+-]?\d(?:_?\d)*)?|0[0-7]+/y,s=/[`}](?:[^`\\$]|\\[^]|\$(?!\{))*(`|\$\{)?/y,P=/[\t\v\f\ufeff\p{Zs}]+/uy,o=/\r?\n|[\r\u2028\u2029]/y,l=/\/\*(?:[^*]|\*(?!\/))*(\*\/)?/y,z=/\/\/.*/y,n=/[<>.:={}]|\/(?![\/*])/y,t=/[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}-]*/uy,r=/(['"])(?:(?!\1)[^])*(\1)?/y,a=/[^<>{}]+/y,C=/^(?:[\/+-]|\.{3}|\?(?:InterpolationIn(?:JSX|Template)|NoLineTerminatorHere|NonExpressionParenEnd|UnaryIncDec))?$|[{}([,;<>=*%&|^!~?:]$/,d=/^(?:=>|[;\]){}]|else|\?(?:NoLineTerminatorHere|NonExpressionParenEnd))?$/,i=/^(?:await|case|default|delete|do|else|instanceof|new|return|throw|typeof|void|yield)$/,c=/^(?:return|throw|yield)$/,w=RegExp(o.source),J=function*(y,{jsx:M=!1}={}){var q,T,L,g,m,B,p,E,W,I,R,k,V,_;for({length:B}=y,g=0,m="",_=[{tag:"JS"}],q=[],R=0,k=!1;g<B;){switch(E=_[_.length-1],E.tag){case"JS":case"JSNonExpressionParen":case"InterpolationInTemplate":case"InterpolationInJSX":if(y[g]==="/"&&(C.test(m)||i.test(m))&&(b.lastIndex=g,p=b.exec(y))){g=b.lastIndex,m=p[0],k=!0,yield{type:"RegularExpressionLiteral",value:p[0],closed:p[1]!==void 0&&p[1]!=="\\"};continue}if(h.lastIndex=g,p=h.exec(y)){switch(V=p[0],W=h.lastIndex,I=V,V){case"(":m==="?NonExpressionParenKeyword"&&_.push({tag:"JSNonExpressionParen",nesting:R}),R++,k=!1;break;case")":R--,k=!0,E.tag==="JSNonExpressionParen"&&R===E.nesting&&(_.pop(),I="?NonExpressionParenEnd",k=!1);break;case"{":h.lastIndex=0,L=!d.test(m)&&(C.test(m)||i.test(m)),q.push(L),k=!1;break;case"}":switch(E.tag){case"InterpolationInTemplate":if(q.length===E.nesting){s.lastIndex=g,p=s.exec(y),g=s.lastIndex,m=p[0],p[1]==="${"?(m="?InterpolationInTemplate",k=!1,yield{type:"TemplateMiddle",value:p[0]}):(_.pop(),k=!0,yield{type:"TemplateTail",value:p[0],closed:p[1]==="`"});continue}break;case"InterpolationInJSX":if(q.length===E.nesting){_.pop(),g+=1,m="}",yield{type:"JSXPunctuator",value:"}"};continue}}k=q.pop(),I=k?"?ExpressionBraceEnd":"}";break;case"]":k=!0;break;case"++":case"--":I=k?"?PostfixIncDec":"?UnaryIncDec";break;case"<":if(M&&(C.test(m)||i.test(m))){_.push({tag:"JSXTag"}),g+=1,m="<",yield{type:"JSXPunctuator",value:V};continue}k=!1;break;default:k=!1}g=W,m=I,yield{type:"Punctuator",value:V};continue}if(e.lastIndex=g,p=e.exec(y)){switch(g=e.lastIndex,I=p[0],p[0]){case"for":case"if":case"while":case"with":m!=="."&&m!=="?."&&(I="?NonExpressionParenKeyword")}m=I,k=!i.test(p[0]),yield{type:p[1]==="#"?"PrivateIdentifier":"IdentifierName",value:p[0]};continue}if(u.lastIndex=g,p=u.exec(y)){g=u.lastIndex,m=p[0],k=!0,yield{type:"StringLiteral",value:p[0],closed:p[2]!==void 0};continue}if(f.lastIndex=g,p=f.exec(y)){g=f.lastIndex,m=p[0],k=!0,yield{type:"NumericLiteral",value:p[0]};continue}if(s.lastIndex=g,p=s.exec(y)){g=s.lastIndex,m=p[0],p[1]==="${"?(m="?InterpolationInTemplate",_.push({tag:"InterpolationInTemplate",nesting:q.length}),k=!1,yield{type:"TemplateHead",value:p[0]}):(k=!0,yield{type:"NoSubstitutionTemplate",value:p[0],closed:p[1]==="`"});continue}break;case"JSXTag":case"JSXTagEnd":if(n.lastIndex=g,p=n.exec(y)){switch(g=n.lastIndex,I=p[0],p[0]){case"<":_.push({tag:"JSXTag"});break;case">":_.pop(),m==="/"||E.tag==="JSXTagEnd"?(I="?JSX",k=!0):_.push({tag:"JSXChildren"});break;case"{":_.push({tag:"InterpolationInJSX",nesting:q.length}),I="?InterpolationInJSX",k=!1;break;case"/":m==="<"&&(_.pop(),_[_.length-1].tag==="JSXChildren"&&_.pop(),_.push({tag:"JSXTagEnd"}))}m=I,yield{type:"JSXPunctuator",value:p[0]};continue}if(t.lastIndex=g,p=t.exec(y)){g=t.lastIndex,m=p[0],yield{type:"JSXIdentifier",value:p[0]};continue}if(r.lastIndex=g,p=r.exec(y)){g=r.lastIndex,m=p[0],yield{type:"JSXString",value:p[0],closed:p[2]!==void 0};continue}break;case"JSXChildren":if(a.lastIndex=g,p=a.exec(y)){g=a.lastIndex,m=p[0],yield{type:"JSXText",value:p[0]};continue}switch(y[g]){case"<":_.push({tag:"JSXTag"}),g++,m="<",yield{type:"JSXPunctuator",value:"<"};continue;case"{":_.push({tag:"InterpolationInJSX",nesting:q.length}),g++,m="?InterpolationInJSX",k=!1,yield{type:"JSXPunctuator",value:"{"};continue}}if(P.lastIndex=g,p=P.exec(y)){g=P.lastIndex,yield{type:"WhiteSpace",value:p[0]};continue}if(o.lastIndex=g,p=o.exec(y)){g=o.lastIndex,k=!1,c.test(m)&&(m="?NoLineTerminatorHere"),yield{type:"LineTerminatorSequence",value:p[0]};continue}if(l.lastIndex=g,p=l.exec(y)){g=l.lastIndex,w.test(p[0])&&(k=!1,c.test(m)&&(m="?NoLineTerminatorHere")),yield{type:"MultiLineComment",value:p[0],closed:p[1]!==void 0};continue}if(z.lastIndex=g,p=z.exec(y)){g=z.lastIndex,k=!1,yield{type:"SingleLineComment",value:p[0]};continue}T=String.fromCodePoint(y.codePointAt(g)),g+=T.length,m=T,k=!1,yield{type:E.tag.startsWith("JSX")?"JSXInvalid":"Invalid",value:T}}},J}Xt();var gt={keyword:["break","case","catch","continue","debugger","default","do","else","finally","for","function","if","return","switch","throw","try","var","const","while","with","new","this","super","class","extends","export","import","null","true","false","in","instanceof","typeof","void","delete"],strict:["implements","interface","let","package","private","protected","public","static","yield"]};new Set(gt.keyword);new Set(gt.strict);const rt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Zt=new Uint8Array(64),Wt=new Uint8Array(128);for(let e=0;e<rt.length;e++){const t=rt.charCodeAt(e);Zt[e]=t,Wt[t]=e}var at;(function(e){e[e.Empty=1]="Empty",e[e.Hash=2]="Hash",e[e.Query=3]="Query",e[e.RelativePath=4]="RelativePath",e[e.AbsolutePath=5]="AbsolutePath",e[e.SchemeRelative=6]="SchemeRelative",e[e.Absolute=7]="Absolute"})(at||(at={}));const Yt=/^[A-Za-z]:\//;function Kt(e=""){return e&&e.replace(/\\/g,"/").replace(Yt,t=>t.toUpperCase())}const Gt=/^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;function Qt(){return typeof process<"u"&&typeof process.cwd=="function"?process.cwd().replace(/\\/g,"/"):"/"}const tn=function(...e){e=e.map(r=>Kt(r));let t="",n=!1;for(let r=e.length-1;r>=-1&&!n;r--){const a=r>=0?e[r]:Qt();!a||a.length===0||(t=`${a}/${t}`,n=ot(a))}return t=nn(t,!n),n&&!ot(t)?`/${t}`:t.length>0?t:"."};function nn(e,t){let n="",r=0,a=-1,i=0,c=null;for(let o=0;o<=e.length;++o){if(o<e.length)c=e[o];else{if(c==="/")break;c="/"}if(c==="/"){if(!(a===o-1||i===1))if(i===2){if(n.length<2||r!==2||n[n.length-1]!=="."||n[n.length-2]!=="."){if(n.length>2){const l=n.lastIndexOf("/");l===-1?(n="",r=0):(n=n.slice(0,l),r=n.length-1-n.lastIndexOf("/")),a=o,i=0;continue}else if(n.length>0){n="",r=0,a=o,i=0;continue}}t&&(n+=n.length>0?"/..":"..",r=2)}else n.length>0?n+=`/${e.slice(a+1,o)}`:n=e.slice(a+1,o),r=o-a-1;a=o,i=0}else c==="."&&i!==-1?++i:i=-1}return n}const ot=function(e){return Gt.test(e)},ft=/^\s*at .*(?:\S:\d+|\(native\))/m,en=/^(?:eval@)?(?:\[native code\])?$/;function mt(e){if(!e.includes(":"))return[e];const n=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(e.replace(/^\(|\)$/g,""));if(!n)return[e];let r=n[1];if(r.startsWith("async ")&&(r=r.slice(6)),r.startsWith("http:")||r.startsWith("https:")){const a=new URL(r);a.searchParams.delete("import"),a.searchParams.delete("browserv"),r=a.pathname+a.hash+a.search}if(r.startsWith("/@fs/")){const a=/^\/@fs\/[a-zA-Z]:\//.test(r);r=r.slice(a?5:4)}return[r,n[2]||void 0,n[3]||void 0]}function rn(e){let t=e.trim();if(en.test(t)||(t.includes(" > eval")&&(t=t.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!t.includes("@")&&!t.includes(":")))return null;const n=/((.*".+"[^@]*)?[^@]*)(@)/,r=t.match(n),a=r&&r[1]?r[1]:void 0,[i,c,o]=mt(t.replace(n,""));return!i||!c||!o?null:{file:i,method:a||"",line:Number.parseInt(c),column:Number.parseInt(o)}}function an(e){const t=e.trim();return ft.test(t)?on(t):rn(t)}function on(e){let t=e.trim();if(!ft.test(t))return null;t.includes("(eval ")&&(t=t.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let n=t.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,"");const r=n.match(/ (\(.+\)$)/);n=r?n.replace(r[0],""):n;const[a,i,c]=mt(r?r[1]:n);let o=r&&n||"",l=a&&["eval","<anonymous>"].includes(a)?void 0:a;return!l||!i||!c?null:(o.startsWith("async ")&&(o=o.slice(6)),l.startsWith("file://")&&(l=l.slice(7)),l=l.startsWith("node:")||l.startsWith("internal:")?l:tn(l),o&&(o=o.replace(/__vite_ssr_import_\d+__\./g,"")),{method:o,file:l,line:Number.parseInt(i),column:Number.parseInt(c)})}function sn(e){const t=(e==null?void 0:e.globalThisKey)||"__vitest_mocker__";function n(){return typeof globalThis[t]<"u"?globalThis[t]:new Proxy({},{get(r,a){throw new Error(`Vitest mocker was not initialized in this environment. vi.${String(a)}() is forbidden.`)}})}return{hoisted(r){if(typeof r!="function")throw new TypeError(`vi.hoisted() expects a function, but received a ${typeof r}`);return r()},mock(r,a){if(typeof r!="string")throw new TypeError(`vi.mock() expects a string path, but received a ${typeof r}`);const i=N("mock");n().queueMock(r,i,typeof a=="function"?()=>a(()=>n().importActual(r,i)):a)},unmock(r){if(typeof r!="string")throw new TypeError(`vi.unmock() expects a string path, but received a ${typeof r}`);n().queueUnmock(r,N("unmock"))},doMock(r,a){if(typeof r!="string")throw new TypeError(`vi.doMock() expects a string path, but received a ${typeof r}`);const i=N("doMock");n().queueMock(r,i,typeof a=="function"?()=>a(()=>n().importActual(r,i)):a)},doUnmock(r){if(typeof r!="string")throw new TypeError(`vi.doUnmock() expects a string path, but received a ${typeof r}`);n().queueUnmock(r,N("doUnmock"))},async importActual(r){return n().importActual(r,N("importActual"))},async importMock(r){return n().importMock(r,N("importMock"))}}}function N(e){const n=Jt({stackTraceLimit:5}).split(`
`),r=n.findIndex(i=>i.includes(` at Object.${e}`)||i.includes(`${e}@`)),a=an(n[r+1]);return(a==null?void 0:a.file)||""}const{now:it}=Date;class cn{constructor(t,n,r,a){S(this,"registry",new st);S(this,"queue",new Set);S(this,"mockedIds",new Set);this.interceptor=t,this.rpc=n,this.spyOn=r,this.config=a}async prepare(){this.queue.size&&await Promise.all([...this.queue.values()])}async resolveFactoryModule(t){const n=this.registry.get(t);if(!n||n.type!=="manual")throw new Error(`Mock ${t} wasn't registered. This is probably a Vitest error. Please, open a new issue with reproduction.`);return await n.resolve()}getFactoryModule(t){const n=this.registry.get(t);if(!n||n.type!=="manual")throw new Error(`Mock ${t} wasn't registered. This is probably a Vitest error. Please, open a new issue with reproduction.`);if(!n.cache)throw new Error(`Mock ${t} wasn't resolved. This is probably a Vitest error. Please, open a new issue with reproduction.`);return n.cache}async invalidate(){const t=Array.from(this.mockedIds);t.length&&(await this.rpc.invalidate(t),await this.interceptor.invalidate(),this.registry.clear())}async importActual(t,n){const r=await this.rpc.resolveId(t,n);if(r==null)throw new Error(`[vitest] Cannot resolve "${t}" imported from "${n}"`);const a=Pt(r.id),i=new URL(r.url,location.href),c=`_vitest_original&ext${a}`,o=`${i.pathname}${i.search?`${i.search}&${c}`:`?${c}`}${i.hash}`;return this.wrapDynamicImport(()=>import(o)).then(l=>{if(!r.optimized||typeof l.default>"u")return l;const w=l.default;return w!=null&&w.__esModule?w:{...typeof w=="object"&&!Array.isArray(w)||typeof w=="function"?w:{},default:w}})}async importMock(t,n){await this.prepare();const{resolvedId:r,resolvedUrl:a,redirectUrl:i}=await this.rpc.resolveMock(t,n,{mock:"auto"}),c=this.resolveMockPath(U(a));let o=this.registry.get(c);if(!o)if(i){const l=new URL(this.resolveMockPath(U(i)),location.href).toString();o=new $(t,r,c,l)}else o=new F(t,r,c);if(o.type==="manual")return await o.resolve();if(o.type==="automock"||o.type==="autospy"){const l=new URL(`/@id/${r}`,location.href),w=l.search?`${l.search}&t=${it()}`:`?t=${it()}`,f=await vt(()=>import(`${l.pathname}${w}&mock=${o.type}${l.hash}`),[],import.meta.url);return this.mockObject(f,o.type)}return import(o.redirect)}mockObject(t,n="automock"){return bt({globalConstructors:{Object,Function,Array,Map,RegExp},spyOn:this.spyOn,type:n},t)}queueMock(t,n,r){const a=this.rpc.resolveMock(t,n,{mock:typeof r=="function"?"factory":r!=null&&r.spy?"spy":"auto"}).then(async({redirectUrl:i,resolvedId:c,resolvedUrl:o,needsInterop:l,mockType:w})=>{const f=this.resolveMockPath(U(o));this.mockedIds.add(c);const h=typeof r=="function"?async()=>{const u=await r();return l?{default:u}:u}:void 0,b=typeof i=="string"?new URL(this.resolveMockPath(U(i)),location.href).toString():null;let z;w==="manual"?z=this.registry.register("manual",t,c,f,h):w==="autospy"?z=this.registry.register("autospy",t,c,f):w==="redirect"?z=this.registry.register("redirect",t,c,f,b):z=this.registry.register("automock",t,c,f),await this.interceptor.register(z)}).finally(()=>{this.queue.delete(a)});this.queue.add(a)}queueUnmock(t,n){const r=this.rpc.resolveId(t,n).then(async a=>{if(!a)return;const i=this.resolveMockPath(U(a.url));this.mockedIds.add(a.id),this.registry.delete(i),await this.interceptor.delete(i)}).finally(()=>{this.queue.delete(r)});this.queue.add(r)}wrapDynamicImport(t){return typeof t=="function"?new Promise((r,a)=>{this.prepare().finally(()=>{t().then(r,a)})}):t}resolveMockPath(t){const n=this.config,r=Et("/@fs/",n.root);return t.startsWith(n.root)?t.slice(n.root.length):t.startsWith(r)?t.slice(r.length):t}}const ln=/(\?|&)v=\w{8}/;function U(e){return e.replace(ln,"")}class dn{constructor(){S(this,"mocks",new st)}async register(t){this.mocks.add(t)}async delete(t){this.mocks.delete(t)}async invalidate(){this.mocks.clear()}}const X=e=>{switch(e){case"resolveId":return Promise.resolve({id:"",url:"",optimized:!1});case"resolveMock":return Promise.resolve({mockType:"dummy",resolvedId:"",resolvedUrl:"",redirectUrl:"",needsInterop:!1});case"invalidate":return Promise.resolve()}};class pn extends cn{queueMock(){}}function wn(e){const t=new pn(e("__vitest_mocker__"),{resolveId(n,r){return X("resolveId")},resolveMock(n,r,a){return X("resolveMock")},async invalidate(n){return X("invalidate")}},(...n)=>globalThis.__STORYBOOK_MODULE_TEST__.spyOn(...n),{root:""});return globalThis.__vitest_mocker__=t,sn({globalThisKey:"__vitest_mocker__"})}globalThis.__STORYBOOK_MOCKER__=wn(()=>new dn);function gn(e,t="top"){if(!e||typeof document>"u")return;const n=document.head||document.querySelector("head"),r=n.querySelector(":first-child"),a=document.createElement("style");a.appendChild(document.createTextNode(e)),t==="top"&&r?n.insertBefore(a,r):n.appendChild(a)}gn(`
      @font-face {
        font-family: 'Nunito Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./sb-common-assets/nunito-sans-regular.woff2') format('woff2');
      }

      @font-face {
        font-family: 'Nunito Sans';
        font-style: italic;
        font-weight: 400;
        font-display: swap;
        src: url('./sb-common-assets/nunito-sans-italic.woff2') format('woff2');
      }

      @font-face {
        font-family: 'Nunito Sans';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./sb-common-assets/nunito-sans-bold.woff2') format('woff2');
      }

      @font-face {
        font-family: 'Nunito Sans';
        font-style: italic;
        font-weight: 700;
        font-display: swap;
        src: url('./sb-common-assets/nunito-sans-bold-italic.woff2') format('woff2');
      }
    /* Copied from https://github.com/eten-tech-foundation/scripture-editors/blob/platform_v0.8.1/packages/platform/src/usj-nodes.css */

/* stylelint-disable */

/* Sample styles for USJ Nodes */

.leadingFloat {
  float: start;
}
.clearFloat {
  clear: both;
}
.align_start {
  text-align: start;
}
.align_center {
  text-align: center;
}
.align_end {
  text-align: end;
}
@font-face {
  font-family: 'Charis SIL';
  src:
    local('Charis SIL'), local('Charis SIL Bold'), local('Charis SIL Bold Italic'),
    local('Charis SIL Italic');
  font-weight: normal;
}
@font-face {
  font-family: 'Charis SIL';
  src: local('Charis SIL Bold');
  font-weight: bold;
}
@font-face {
  font-family: 'Charis SIL';
  src: local('Charis SIL Italic');
  font-style: italic;
}
@font-face {
  font-family: 'Charis SIL';
  src: local('Charis SIL Bold Italic');
  font-weight: bold;
  font-style: italic;
}
.formatted-font .usfm {
  font-family: 'Charis SIL', serif;
  font-size: 12pt;
}

/* BookNode */

.formatted-font .usfm_id {
  font-size: 100%;
}

.marker-hidden .book[data-code]::before {
  content: attr(data-code) ' ';
}

/* ChapterNode, ImmutableChapterNode */

.formatted-font .usfm_c {
  display: block;
  font-weight: bold;
  font-size: 150%;
}
.text-spacing .usfm_c {
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_ca {
  color: #007306;
  font-size: 133%;
  font-style: italic;
}

.formatted-font .usfm_cp {
  font-weight: bold;
  color: #003380;
  font-size: 150%;
}
.text-spacing .usfm_cp {
  margin-bottom: 4pt;
  margin-top: 8pt;
}

/* VerseNode, ImmutableVerseNode */

.formatted-font .usfm_v {
  font-size: 66%;
  vertical-align: text-top;
}
.text-spacing .usfm_v {
  white-space: nowrap;
  unicode-bidi: embed;
}

.formatted-font .usfm_va {
  color: #007306;
  font-size: 66%;
  vertical-align: text-top;
}

.formatted-font .usfm_vp {
  color: #003380;
  font-size: 66%;
  vertical-align: text-top;
}

/* ParaNode */

.formatted-font .usfm_usfm {
  font-size: 100%;
}

.formatted-font .usfm_ide {
  font-size: 100%;
}

.formatted-font .usfm_h {
  font-size: 100%;
}

/* check if deprecated */
.formatted-font .usfm_h1 {
  font-size: 100%;
}

/* check if deprecated */
.formatted-font .usfm_h2 {
  font-size: 100%;
}

/* check if deprecated */
.formatted-font .usfm_h3 {
  font-size: 100%;
}

.formatted-font .usfm_toc1 {
  font-weight: bold;
  color: #004c00;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_toc2 {
  color: #004c00;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_toc3 {
  font-weight: bold;
  color: #e05858;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_toca1 {
  color: #8c8c8c;
  font-size: 83%;
  font-style: italic;
}

.formatted-font .usfm_toca2 {
  color: #8c8c8c;
  font-size: 83%;
  font-style: italic;
}

.formatted-font .usfm_toca3 {
  color: #8c8c8c;
  font-size: 83%;
  font-style: italic;
}

.formatted-font .usfm_rem {
  color: #003380;
  font-size: 100%;
}

.formatted-font .usfm_sts {
  color: #003380;
  font-size: 100%;
}

/* check if deprecated */
.formatted-font .usfm_restore {
  color: #003380;
  font-size: 100%;
}

.formatted-font .usfm_imt {
  font-weight: bold;
  font-size: 116%;
}
.text-spacing .usfm_imt {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_imt1 {
  font-weight: bold;
  font-size: 116%;
}
.text-spacing .usfm_imt1 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_imt2 {
  font-size: 108%;
  font-style: italic;
}
.text-spacing .usfm_imt2 {
  text-align: center;
  margin-bottom: 3pt;
  margin-top: 6pt;
}

.formatted-font .usfm_imt3 {
  font-weight: bold;
  font-size: 100%;
}
.text-spacing .usfm_imt3 {
  text-align: center;
  margin-bottom: 2pt;
  margin-top: 2pt;
}

.formatted-font .usfm_imt4 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_imt4 {
  text-align: center;
  margin-bottom: 2pt;
  margin-top: 2pt;
}

.formatted-font .usfm_imte {
  font-weight: bold;
  font-size: 166%;
}
.text-spacing .usfm_imte {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

/* check if deprecated */
.formatted-font .usfm_imte1 {
  font-weight: bold;
  font-size: 166%;
}
.text-spacing .usfm_imte1 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

/* check if deprecated */
.formatted-font .usfm_imte2 {
  font-size: 133%;
  font-style: italic;
}
.text-spacing .usfm_imte2 {
  text-align: center;
  margin-bottom: 2pt;
}

.formatted-font .usfm_is {
  font-weight: bold;
  font-size: 116%;
}
.text-spacing .usfm_is {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_is1 {
  font-weight: bold;
  font-size: 116%;
}
.text-spacing .usfm_is1 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_is2 {
  font-weight: bold;
  font-size: 100%;
}
.text-spacing .usfm_is2 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_iot {
  font-weight: bold;
  font-size: 100%;
}
.text-spacing .usfm_iot {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_io {
  font-size: 100%;
}
.text-spacing[dir='ltr'] .usfm_io {
  margin-left: 10vw;
}
.text-spacing[dir='rtl'] .usfm_io {
  margin-right: 10vw;
}

.formatted-font .usfm_io1 {
  font-size: 100%;
}
.text-spacing[dir='ltr'] .usfm_io1 {
  margin-left: 10vw;
}
.text-spacing[dir='rtl'] .usfm_io1 {
  margin-right: 10vw;
}

.formatted-font .usfm_io2 {
  font-size: 100%;
}
.text-spacing[dir='ltr'] .usfm_io2 {
  margin-left: 15vw;
}
.text-spacing[dir='rtl'] .usfm_io2 {
  margin-right: 15vw;
}

.formatted-font .usfm_io3 {
  font-size: 100%;
}
.text-spacing[dir='ltr'] .usfm_io3 {
  margin-left: 20vw;
}
.text-spacing[dir='rtl'] .usfm_io3 {
  margin-right: 20vw;
}

.formatted-font .usfm_io4 {
  font-size: 100%;
}
.text-spacing[dir='ltr'] .usfm_io4 {
  margin-left: 25vw;
}
.text-spacing[dir='rtl'] .usfm_io4 {
  margin-right: 25vw;
}

.formatted-font .usfm_ior {
  font-size: 100%;
}

.formatted-font .usfm_ip {
  font-size: 100%;
}
.text-spacing .usfm_ip {
  text-indent: 2.5vw;
}

/* check if deprecated */
.formatted-font .usfm_im {
  font-size: 100%;
}

.formatted-font .usfm_ipi {
  font-size: 100%;
}
.text-spacing .usfm_ipi {
  text-indent: 2.5vw;
  margin-left: 5vw;
  margin-right: 5vw;
}

/* check if deprecated */
.formatted-font .usfm_imi {
  font-size: 100%;
}
.text-spacing .usfm_imi {
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_ili {
  font-size: 100%;
}
.text-spacing .usfm_ili {
  text-indent: -7.5vw;
}
.text-spacing[dir='ltr'] .usfm_ili {
  margin-left: 10vw;
}
.text-spacing[dir='rtl'] .usfm_ili {
  margin-right: 10vw;
}

.formatted-font .usfm_ili1 {
  font-size: 100%;
}
.text-spacing .usfm_ili1 {
  text-indent: -7.5vw;
}
.text-spacing[dir='ltr'] .usfm_ili1 {
  margin-left: 10vw;
}
.text-spacing[dir='rtl'] .usfm_ili1 {
  margin-right: 10vw;
}

.formatted-font .usfm_ili2 {
  font-size: 100%;
}
.text-spacing .usfm_ili2 {
  text-indent: -7.5vw;
}
.text-spacing[dir='ltr'] .usfm_ili2 {
  margin-left: 15vw;
}
.text-spacing[dir='rtl'] .usfm_ili2 {
  margin-right: 15vw;
}

.formatted-font .usfm_ipq {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_ipq {
  text-indent: 2.5vw;
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_imq {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_imq {
  margin-left: 5vw;
  margin-right: 5vw;
}

.usfm_ipr {
  text-align: end;
}
.formatted-font .usfm_ipr {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_ipr {
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_ib {
  font-size: 83%;
}

/* check if deprecated */
.formatted-font .usfm_iq {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_iq {
  text-indent: -15vw;
}
.text-spacing[dir='ltr'] .usfm_iq {
  margin-left: 20vw;
}
.text-spacing[dir='rtl'] .usfm_iq {
  margin-right: 20vw;
}

/* check if deprecated */
.formatted-font .usfm_iq1 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_iq1 {
  text-indent: -15vw;
}
.text-spacing[dir='ltr'] .usfm_iq1 {
  margin-left: 20vw;
}
.text-spacing[dir='rtl'] .usfm_iq1 {
  margin-right: 20vw;
}

/* check if deprecated */
.formatted-font .usfm_iq2 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_iq2 {
  text-indent: -10vw;
}
.text-spacing[dir='ltr'] .usfm_iq2 {
  margin-left: 20vw;
}
.text-spacing[dir='rtl'] .usfm_iq2 {
  margin-right: 20vw;
}

/* check if deprecated */
.formatted-font .usfm_iq3 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_iq3 {
  text-indent: -5vw;
}
.text-spacing[dir='ltr'] .usfm_iq3 {
  margin-left: 20vw;
}
.text-spacing[dir='rtl'] .usfm_iq3 {
  margin-right: 20vw;
}

.formatted-font .usfm_iex {
  font-size: 100%;
}
.text-spacing .usfm_iex {
  text-indent: 2.5vw;
  margin-bottom: 4pt;
  margin-top: 4pt;
}

/* check if deprecated */
.formatted-font .usfm_iqt {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_ie {
  font-size: 83%;
}

.formatted-font .usfm_cl {
  font-weight: bold;
  font-size: 150%;
}
.text-spacing .usfm_cl {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_cd {
  font-size: 91%;
}
.text-spacing .usfm_cd {
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_p {
  font-size: 100%;
}
.text-spacing .usfm_p {
  text-indent: 2.5vw;
}

.formatted-font .usfm_m {
  font-size: 100%;
}

.formatted-font .usfm_po {
  font-size: 100%;
}
.text-spacing .usfm_po {
  text-indent: 2.5vw;
  margin-bottom: 4pt;
  margin-top: 4pt;
}

.usfm_pr {
  text-align: end;
}
.formatted-font .usfm_pr {
  font-size: 100%;
}

.usfm_cls {
  text-align: end;
}
.formatted-font .usfm_cls {
  font-size: 100%;
}

.formatted-font .usfm_pmo {
  font-size: 100%;
}
.text-spacing .usfm_pmo {
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_pm {
  font-size: 100%;
}
.text-spacing .usfm_pm {
  text-indent: 2.5vw;
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_pmc {
  font-size: 100%;
}
.text-spacing .usfm_pmc {
  margin-left: 5vw;
  margin-right: 5vw;
}

.usfm_pmr {
  text-align: end;
}
.formatted-font .usfm_pmr {
  font-size: 100%;
}
.text-spacing .usfm_pmr {
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_pi {
  font-size: 100%;
}
.text-spacing .usfm_pi {
  text-indent: 2.5vw;
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_pi1 {
  font-size: 100%;
}
.text-spacing .usfm_pi1 {
  text-indent: 2.5vw;
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_pi2 {
  font-size: 100%;
}
.text-spacing .usfm_pi2 {
  text-indent: 2.5vw;
}
.text-spacing[dir='ltr'] .usfm_pi2 {
  margin-left: 10vw;
  margin-right: 5vw;
}
.text-spacing[dir='rtl'] .usfm_pi2 {
  margin-left: 5vw;
  margin-right: 10vw;
}

.formatted-font .usfm_pi3 {
  font-size: 100%;
}
.text-spacing .usfm_pi3 {
  text-indent: 2.5vw;
}
.text-spacing[dir='ltr'] .usfm_pi3 {
  margin-left: 15vw;
  margin-right: 5vw;
}
.text-spacing[dir='rtl'] .usfm_pi3 {
  margin-left: 5vw;
  margin-right: 15vw;
}

.formatted-font .usfm_pc {
  font-size: 100%;
}
.text-spacing .usfm_pc {
  text-align: center;
}

.formatted-font .usfm_mi {
  font-size: 100%;
}
.text-spacing .usfm_mi {
  margin-left: 5vw;
  margin-right: 5vw;
}

/* check if deprecated */
.formatted-font .usfm_nb {
  font-size: 100%;
}

.formatted-font .usfm_q {
  font-size: 100%;
}
.text-spacing .usfm_q {
  text-indent: -10vw;
}
.text-spacing[dir='ltr'] .usfm_q {
  margin-left: 15vw;
}
.text-spacing[dir='rtl'] .usfm_q {
  margin-right: 15vw;
}

.formatted-font .usfm_q1 {
  font-size: 100%;
}
.text-spacing .usfm_q1 {
  text-indent: -10vw;
}
.text-spacing[dir='ltr'] .usfm_q1 {
  margin-left: 15vw;
}
.text-spacing[dir='rtl'] .usfm_q1 {
  margin-right: 15vw;
}

.formatted-font .usfm_q2 {
  font-size: 100%;
}
.text-spacing .usfm_q2 {
  text-indent: -7.5vw;
}
.text-spacing[dir='ltr'] .usfm_q2 {
  margin-left: 15vw;
}
.text-spacing[dir='rtl'] .usfm_q2 {
  margin-right: 15vw;
}

.formatted-font .usfm_q3 {
  font-size: 100%;
}
.text-spacing .usfm_q3 {
  text-indent: -5vw;
}
.text-spacing[dir='ltr'] .usfm_q3 {
  margin-left: 15vw;
}
.text-spacing[dir='rtl'] .usfm_q3 {
  margin-right: 15vw;
}

.formatted-font .usfm_q4 {
  font-size: 100%;
}
.text-spacing .usfm_q4 {
  text-indent: -2.5vw;
}
.text-spacing[dir='ltr'] .usfm_q4 {
  margin-left: 15vw;
}
.text-spacing[dir='rtl'] .usfm_q4 {
  margin-right: 15vw;
}

.formatted-font .usfm_qc {
  font-size: 100%;
}
.text-spacing .usfm_qc {
  text-align: center;
}

.usfm_qr {
  text-align: end;
}
.formatted-font .usfm_qr {
  font-size: 100%;
}

.formatted-font .usfm_qa {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_qm {
  font-size: 100%;
}
.text-spacing .usfm_qm {
  text-indent: -15vw;
}
.text-spacing[dir='ltr'] .usfm_qm {
  margin-left: 20vw;
}
.text-spacing[dir='rtl'] .usfm_qm {
  margin-right: 20vw;
}

.formatted-font .usfm_qm1 {
  font-size: 100%;
}
.text-spacing .usfm_qm1 {
  text-indent: -15vw;
}
.text-spacing[dir='ltr'] .usfm_qm1 {
  margin-left: 20vw;
}
.text-spacing[dir='rtl'] .usfm_qm1 {
  margin-right: 20vw;
}

.formatted-font .usfm_qm2 {
  font-size: 100%;
}
.text-spacing .usfm_qm2 {
  text-indent: -10vw;
}
.text-spacing[dir='ltr'] .usfm_qm2 {
  margin-left: 20vw;
}
.text-spacing[dir='rtl'] .usfm_qm2 {
  margin-right: 20vw;
}

.formatted-font .usfm_qm3 {
  font-size: 100%;
}
.text-spacing .usfm_qm3 {
  text-indent: -5vw;
}
.text-spacing[dir='ltr'] .usfm_qm3 {
  margin-left: 20vw;
}
.text-spacing[dir='rtl'] .usfm_qm3 {
  margin-right: 20vw;
}

.formatted-font .usfm_qd {
  font-size: 100%;
  font-style: italic;
}
.text-spacing[dir='ltr'] .usfm_qd {
  margin-left: 5vw;
}
.text-spacing[dir='rtl'] .usfm_qd {
  margin-right: 5vw;
}

.formatted-font .usfm_b {
  font-size: 83%;
}

.formatted-font .usfm_mt {
  font-weight: bold;
  font-size: 166%;
}
.text-spacing .usfm_mt {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_mt1 {
  font-weight: bold;
  font-size: 166%;
}
.text-spacing .usfm_mt1 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 2pt;
}

.formatted-font .usfm_mt2 {
  font-size: 133%;
  font-style: italic;
}
.text-spacing .usfm_mt2 {
  text-align: center;
  margin-bottom: 2pt;
}

.formatted-font .usfm_mt3 {
  font-weight: bold;
  font-size: 133%;
}
.text-spacing .usfm_mt3 {
  text-align: center;
  margin-bottom: 2pt;
  margin-top: 2pt;
}

.formatted-font .usfm_mt4 {
  font-size: 100%;
}
.text-spacing .usfm_mt4 {
  text-align: center;
  margin-bottom: 2pt;
  margin-top: 2pt;
}

.formatted-font .usfm_mte {
  font-weight: bold;
  font-size: 166%;
}
.text-spacing .usfm_mte {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_mte1 {
  font-weight: bold;
  font-size: 166%;
}
.text-spacing .usfm_mte1 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_mte2 {
  font-size: 133%;
  font-style: italic;
}
.text-spacing .usfm_mte2 {
  text-align: center;
  margin-bottom: 2pt;
}

.formatted-font .usfm_ms {
  font-weight: bold;
  font-size: 116%;
}
.text-spacing .usfm_ms {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 16pt;
}

.formatted-font .usfm_ms1 {
  font-weight: bold;
  font-size: 116%;
}
.text-spacing .usfm_ms1 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 16pt;
}

.formatted-font .usfm_ms2 {
  font-weight: bold;
  font-size: 116%;
}
.text-spacing .usfm_ms2 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 16pt;
}

.formatted-font .usfm_ms3 {
  font-size: 116%;
  font-style: italic;
}
.text-spacing .usfm_ms3 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 16pt;
}

.formatted-font .usfm_mr {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_mr {
  text-align: center;
  margin-bottom: 4pt;
}

.formatted-font .usfm_s {
  font-weight: bold;
  font-size: 100%;
}
.text-spacing .usfm_s {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_s1 {
  font-weight: bold;
  font-size: 100%;
}
.text-spacing .usfm_s1 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_s2 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_s2 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_s3 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_s3 {
  margin-bottom: 3pt;
  margin-top: 6pt;
}

.formatted-font .usfm_s4 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_s4 {
  margin-bottom: 3pt;
  margin-top: 6pt;
}

.formatted-font .usfm_sr {
  font-weight: bold;
  font-size: 100%;
}
.text-spacing .usfm_sr {
  text-align: center;
  margin-bottom: 4pt;
}

.formatted-font .usfm_r {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_r {
  text-align: center;
  margin-bottom: 4pt;
}

.formatted-font .usfm_sp {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_sp {
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_d {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_d {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 4pt;
}

.text-spacing .usfm_sd {
  margin-bottom: 24pt;
  margin-top: 24pt;
}

.text-spacing .usfm_sd1 {
  margin-bottom: 24pt;
  margin-top: 24pt;
}

.text-spacing .usfm_sd2 {
  margin-bottom: 18pt;
  margin-top: 18pt;
}

.text-spacing .usfm_sd3 {
  margin-bottom: 12pt;
  margin-top: 12pt;
}

.text-spacing .usfm_sd4 {
  margin-bottom: 8pt;
  margin-top: 8pt;
}

.formatted-font .usfm_lh {
  font-size: 100%;
}
.text-spacing .usfm_lh {
  text-indent: 2.5vw;
}

.formatted-font .usfm_li {
  font-size: 100%;
}
.text-spacing .usfm_li {
  text-indent: -7.5vw;
}
.text-spacing[dir='ltr'] .usfm_li {
  margin-left: 10vw;
}
.text-spacing[dir='rtl'] .usfm_li {
  margin-right: 10vw;
}

.formatted-font .usfm_li1 {
  font-size: 100%;
}
.text-spacing .usfm_li1 {
  text-indent: -7.5vw;
}
.text-spacing[dir='ltr'] .usfm_li1 {
  margin-left: 10vw;
}
.text-spacing[dir='rtl'] .usfm_li1 {
  margin-right: 10vw;
}

.formatted-font .usfm_li2 {
  font-size: 100%;
}
.text-spacing .usfm_li2 {
  text-indent: -7.5vw;
}
.text-spacing[dir='ltr'] .usfm_li2 {
  margin-left: 15vw;
}
.text-spacing[dir='rtl'] .usfm_li2 {
  margin-right: 15vw;
}

.formatted-font .usfm_li3 {
  font-size: 100%;
}
.text-spacing .usfm_li3 {
  text-indent: -7.5vw;
}
.text-spacing[dir='ltr'] .usfm_li3 {
  margin-left: 20vw;
}
.text-spacing[dir='rtl'] .usfm_li3 {
  margin-right: 20vw;
}

.formatted-font .usfm_li4 {
  font-size: 100%;
}
.text-spacing .usfm_li4 {
  text-indent: -7.5vw;
}
.text-spacing[dir='ltr'] .usfm_li4 {
  margin-left: 25vw;
}
.text-spacing[dir='rtl'] .usfm_li4 {
  margin-right: 25vw;
}

.formatted-font .usfm_lf {
  font-size: 100%;
}

.formatted-font .usfm_lim {
  font-size: 100%;
}
.text-spacing .usfm_lim {
  text-indent: -7.5vw;
}
.text-spacing[dir='ltr'] .usfm_lim {
  margin-left: 15vw;
  margin-right: 5vw;
}
.text-spacing[dir='rtl'] .usfm_lim {
  margin-left: 5vw;
  margin-right: 15vw;
}

.formatted-font .usfm_lim1 {
  font-size: 100%;
}
.text-spacing .usfm_lim1 {
  text-indent: -7.5vw;
}
.text-spacing[dir='ltr'] .usfm_lim1 {
  margin-left: 15vw;
  margin-right: 5vw;
}
.text-spacing[dir='rtl'] .usfm_lim1 {
  margin-left: 5vw;
  margin-right: 15vw;
}

.formatted-font .usfm_lim2 {
  font-size: 100%;
}
.text-spacing .usfm_lim2 {
  text-indent: -7.5vw;
}
.text-spacing[dir='ltr'] .usfm_lim2 {
  margin-left: 20vw;
}
.text-spacing[dir='rtl'] .usfm_lim2 {
  margin-right: 20vw;
}

.formatted-font .usfm_lim3 {
  font-size: 100%;
}
.text-spacing .usfm_lim3 {
  text-indent: -7.5vw;
}
.text-spacing[dir='ltr'] .usfm_lim3 {
  margin-left: 25vw;
}
.text-spacing[dir='rtl'] .usfm_lim3 {
  margin-right: 25vw;
}

.formatted-font .usfm_lim4 {
  font-size: 100%;
}
.text-spacing .usfm_lim4 {
  text-indent: -7.5vw;
}
.text-spacing[dir='ltr'] .usfm_lim4 {
  margin-left: 30vw;
}
.text-spacing[dir='rtl'] .usfm_lim4 {
  margin-right: 30vw;
}

.usfm_lit {
  text-align: end;
}
.formatted-font .usfm_lit {
  font-weight: bold;
  font-size: 100%;
}

.formatted-font .usfm_ph {
  font-size: 100%;
}
.text-spacing .usfm_ph {
  text-indent: -5vw;
}
.text-spacing[dir='ltr'] .usfm_ph {
  margin-left: 10vw;
}
.text-spacing[dir='rtl'] .usfm_ph {
  margin-right: 10vw;
}

.formatted-font .usfm_ph1 {
  font-size: 100%;
}
.text-spacing .usfm_ph1 {
  text-indent: -5vw;
}
.text-spacing[dir='ltr'] .usfm_ph1 {
  margin-left: 10vw;
}
.text-spacing[dir='rtl'] .usfm_ph1 {
  margin-right: 10vw;
}

.formatted-font .usfm_ph2 {
  font-size: 100%;
}
.text-spacing .usfm_ph2 {
  text-indent: -5vw;
}
.text-spacing[dir='ltr'] .usfm_ph2 {
  margin-left: 15vw;
}
.text-spacing[dir='rtl'] .usfm_ph2 {
  margin-right: 15vw;
}

.formatted-font .usfm_ph3 {
  font-size: 100%;
}
.text-spacing .usfm_ph3 {
  text-indent: -5vw;
}
.text-spacing[dir='ltr'] .usfm_ph3 {
  margin-left: 20vw;
}
.text-spacing[dir='rtl'] .usfm_ph3 {
  margin-right: 20vw;
}

/* CharNode */

.formatted-font .usfm_qs {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_qac {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_litl {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_lik {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_liv {
  font-size: 100%;
}

.formatted-font .usfm_liv1 {
  font-size: 100%;
}

.formatted-font .usfm_liv2 {
  font-size: 100%;
}

.formatted-font .usfm_liv3 {
  font-size: 100%;
}

.formatted-font .usfm_liv4 {
  font-size: 100%;
}

.formatted-font .usfm_liv5 {
  font-size: 100%;
}

.formatted-font .usfm_rq {
  font-size: 83%;
  font-style: italic;
}

.formatted-font .usfm_qt {
  font-weight: bold;
  font-size: 100%;
}

.formatted-font .usfm_nd {
  font-size: 100%;
  text-decoration: underline;
}

.formatted-font .usfm_tl {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_dc {
  font-style: italic;
}

.formatted-font .usfm_bk {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_sig {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_pn {
  font-weight: bold;
  font-size: 100%;
  text-decoration: underline;
}

.formatted-font .usfm_png {
  font-size: 100%;
  text-decoration: underline;
}

/* check if deprecated */
.formatted-font .usfm_addpn {
  font-weight: bold;
  font-size: 100%;
  font-style: italic;
  text-decoration: underline;
}

.formatted-font .usfm_wj {
  color: #d43128;
  font-size: 100%;
}

.formatted-font .usfm_k {
  font-weight: bold;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_sls {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_ord {
  vertical-align: text-top;
  font-size: 66%;
}

.formatted-font .usfm_add {
  font-weight: bold;
  font-style: italic;
}

.formatted-font .usfm_no {
  font-size: 100%;
}

.formatted-font .usfm_it {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_bd {
  font-weight: bold;
  font-size: 100%;
}

.formatted-font .usfm_bdit {
  font-weight: bold;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_em {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_sc {
  font-size: 100%;
  font-variant: small-caps;
}

.formatted-font .usfm_sup {
  vertical-align: text-top;
  font-size: 66%;
}

/* check if deprecated */
.formatted-font .usfm_pb {
  font-size: 100%;
}

/* check if deprecated */
.formatted-font .usfm_fig {
  font-size: 100%;
}

.formatted-font .usfm_jmp {
  color: #003380;
  text-decoration: underline;
}

.formatted-font .usfm_pro {
  font-size: 83%;
}

.formatted-font .usfm_rb {
  font-size: 100%;
}

.formatted-font .usfm_w {
  font-size: 100%;
}

.formatted-font .usfm_wh {
  font-size: 100%;
}

.formatted-font .usfm_wg {
  font-size: 100%;
}

.formatted-font .usfm_wa {
  font-size: 100%;
}

/* check if deprecated */
.formatted-font .usfm_ndx {
  font-size: 100%;
}

/* Footnote NoteNode */

.formatted-font .usfm_f {
  font-size: 100%;
}

.formatted-font .usfm_fe {
  font-size: 100%;
}

/* Footnote CharNode */

.formatted-font .usfm_fr {
  font-weight: bold;
  font-size: 100%;
}

.formatted-font .usfm_ft {
  font-size: 100%;
}

.formatted-font .usfm_fk {
  font-weight: bold;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_fq {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_fqa {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_fl {
  font-weight: bold;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_fw {
  font-size: 100%;
}

.formatted-font .usfm_fp {
  font-size: 100%;
}

.formatted-font .usfm_fv {
  vertical-align: text-top;
  font-size: 66%;
}

.formatted-font .usfm_fdc {
  font-size: 100%;
}

.formatted-font .usfm_fm {
  vertical-align: text-top;
  font-size: 66%;
}

/* Cross-reference NoteNode */

.formatted-font .usfm_x {
  font-size: 100%;
}

/* Cross-reference CharNode */

.formatted-font .usfm_xo {
  font-weight: bold;
  font-size: 100%;
}

.formatted-font .usfm_xop {
  font-size: 100%;
}

.formatted-font .usfm_xt {
  font-size: 100%;
  unicode-bidi: embed;
}

.formatted-font .usfm_xta {
  font-size: 100%;
}

.formatted-font .usfm_xk {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_xq {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_xot {
  font-size: 100%;
}

.formatted-font .usfm_xnt {
  font-size: 100%;
}

.formatted-font .usfm_xdc {
  font-size: 100%;
}

/* periph */

.formatted-font .usfm_periph {
  font-weight: bold;
  color: #e87217;
  font-size: 116%;
}
.text-spacing .usfm_periph {
  margin-bottom: 4pt;
  margin-top: 16pt;
}

.formatted-font .usfm_p1 {
  font-size: 100%;
}
.text-spacing .usfm_p1 {
  text-indent: 2.5vw;
}

.formatted-font .usfm_p2 {
  font-size: 100%;
}
.text-spacing .usfm_p2 {
  text-indent: 2.5vw;
}
.text-spacing[dir='ltr'] .usfm_p2 {
  margin-left: 2.5vw;
}
.text-spacing[dir='rtl'] .usfm_p2 {
  margin-right: 2.5vw;
}

.formatted-font .usfm_k1 {
  font-size: 100%;
}

.formatted-font .usfm_k2 {
  font-size: 100%;
}

.formatted-font .usfm_xtSee {
  color: #003380;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_xtSeeAlso {
  color: #003380;
  font-size: 100%;
  font-style: italic;
}

/* MilestoneNode */

.formatted-font .usfm_qt-s {
  font-size: 100%;
}

.formatted-font .usfm_qt-e {
  font-size: 100%;
}

.formatted-font .usfm_qt1-s {
  font-size: 100%;
}

.formatted-font .usfm_qt1-e {
  font-size: 100%;
}

.formatted-font .usfm_qt2-s {
  font-size: 100%;
}

.formatted-font .usfm_qt2-e {
  font-size: 100%;
}

.formatted-font .usfm_qt3-s {
  font-size: 100%;
}

.formatted-font .usfm_qt3-e {
  font-size: 100%;
}

.formatted-font .usfm_qt4-s {
  font-size: 100%;
}

.formatted-font .usfm_qt4-e {
  font-size: 100%;
}

.formatted-font .usfm_qt5-s {
  font-size: 100%;
}

.formatted-font .usfm_qt5-e {
  font-size: 100%;
}

.formatted-font .usfm_ts-s {
  font-size: 100%;
}

.formatted-font .usfm_ts-e {
  font-size: 100%;
}

/* table */

.formatted-font .usfm_tr {
  font-size: 100%;
}
.text-spacing .usfm_tr {
  text-indent: -5vw;
}
.text-spacing[dir='ltr'] .usfm_tr {
  margin-left: 10vw;
}
.text-spacing[dir='rtl'] .usfm_tr {
  margin-right: 10vw;
}

.formatted-font .usfm_th1 {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_th2 {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_th3 {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_th4 {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_th5 {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_tc1 {
  font-size: 100%;
}

.formatted-font .usfm_tc2 {
  font-size: 100%;
}

.formatted-font .usfm_tc3 {
  font-size: 100%;
}

.formatted-font .usfm_tc4 {
  font-size: 100%;
}

.formatted-font .usfm_tc5 {
  font-size: 100%;
}

.formatted-font .usfm_thc1 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_thc1 {
  text-align: center;
}

.formatted-font .usfm_thc2 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_thc2 {
  text-align: center;
}

.formatted-font .usfm_thc3 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_thc3 {
  text-align: center;
}

.formatted-font .usfm_thc4 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_thc4 {
  text-align: center;
}

.formatted-font .usfm_thc5 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_thc5 {
  text-align: center;
}

.formatted-font .usfm_tcc1 {
  font-size: 100%;
}
.text-spacing .usfm_tcc1 {
  text-align: center;
}

.formatted-font .usfm_tcc2 {
  font-size: 100%;
}
.text-spacing .usfm_tcc2 {
  text-align: center;
}

.formatted-font .usfm_tcc3 {
  font-size: 100%;
}
.text-spacing .usfm_tcc3 {
  text-align: center;
}

.formatted-font .usfm_tcc4 {
  font-size: 100%;
}
.text-spacing .usfm_tcc4 {
  text-align: center;
}

.formatted-font .usfm_tcc5 {
  font-size: 100%;
}
.text-spacing .usfm_tcc5 {
  text-align: center;
}

.formatted-font .usfm_thr1 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_thr1 {
  text-align: end;
}

.formatted-font .usfm_thr2 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_thr2 {
  text-align: end;
}

.formatted-font .usfm_thr3 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_thr3 {
  text-align: end;
}

.formatted-font .usfm_thr4 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_thr4 {
  text-align: end;
}

.formatted-font .usfm_thr5 {
  font-size: 100%;
  font-style: italic;
}
.text-spacing .usfm_thr5 {
  text-align: end;
}

.formatted-font .usfm_tcr1 {
  font-size: 100%;
}
.text-spacing .usfm_tcr1 {
  text-align: end;
}

.formatted-font .usfm_tcr2 {
  font-size: 100%;
}
.text-spacing .usfm_tcr2 {
  text-align: end;
}

.formatted-font .usfm_tcr3 {
  font-size: 100%;
}
.text-spacing .usfm_tcr3 {
  text-align: end;
}

.formatted-font .usfm_tcr4 {
  font-size: 100%;
}
.text-spacing .usfm_tcr4 {
  text-align: end;
}

.formatted-font .usfm_tcr5 {
  font-size: 100%;
}
.text-spacing .usfm_tcr5 {
  text-align: end;
}

/* table/unknown */

.formatted-font .usfm_tr1 {
  font-size: 100%;
}
.text-spacing .usfm_tr1 {
  text-indent: -5vw;
}
.text-spacing[dir='ltr'] .usfm_tr1 {
  margin-left: 10vw;
}
.text-spacing[dir='rtl'] .usfm_tr1 {
  margin-right: 10vw;
}

.formatted-font .usfm_tr2 {
  font-size: 100%;
}
.text-spacing .usfm_tr2 {
  text-indent: -5vw;
}
.text-spacing[dir='ltr'] .usfm_tr2 {
  margin-left: 15vw;
}
.text-spacing[dir='rtl'] .usfm_tr2 {
  margin-right: 15vw;
}

.formatted-font .usfm_ps {
  font-size: 100%;
}
.text-spacing .usfm_ps {
  text-indent: 2.5vw;
}

.formatted-font .usfm_psi {
  font-size: 100%;
}
.text-spacing .usfm_psi {
  text-indent: 2.5vw;
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_fs {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_wr {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_pub {
  font-size: 83%;
}

.formatted-font .usfm_toc {
  font-size: 83%;
}

.formatted-font .usfm_pref {
  font-size: 83%;
}

.formatted-font .usfm_intro {
  font-size: 83%;
}

.formatted-font .usfm_conc {
  font-size: 83%;
}

.formatted-font .usfm_glo {
  font-size: 83%;
}

.formatted-font .usfm_idx {
  font-size: 83%;
}

.formatted-font .usfm_maps {
  font-size: 83%;
}

.formatted-font .usfm_cov {
  font-size: 83%;
}

.formatted-font .usfm_spine {
  font-size: 83%;
}

.formatted-font .usfm_pubinfo {
  color: #003380;
  font-size: 100%;
}

.formatted-font .usfm_zpa-xb {
  font-size: 100%;
}

.formatted-font .usfm_zpa-xc {
  font-weight: bold;
  font-size: 100%;
}

.formatted-font .usfm_zpa-xv {
  font-size: 100%;
}

.formatted-font .usfm_zpa-d {
  font-size: 100%;
}

.marker {
  unicode-bidi: isolate;
}

.marker-visible .marker,
.marker-hidden .marker,
.marker-hidden .book[data-code]::before,
.marker-editable .book .marker {
  color: rgba(140, 140, 140, 1);
}

.marker-visible .marker:not(.chapter),
.marker-hidden .marker:not(.chapter) {
  font-size: 0.7em;
}

.notetext {
  unicode-bidi: embed;
}

.attribute {
  color: rgba(170, 170, 170, 1);
}

.attribute:hover {
  color: rgba(25, 25, 25, 1);
}

.invalid {
  color: rgba(204, 30, 20, 1);
  font-weight: bold;
}

/* NoteNode >  Marker, TextNode */

.note.collapsed .marker[data-lexical-decorator='true'],
.note.collapsed span[data-lexical-text='true'] {
  display: none;
}

/* Expanded NoteNode background styling */
.marker-visible .note.expanded,
.marker-hidden .note.expanded {
  /* Light neon blue */
  background-color: rgba(173, 216, 230, 0.3);
  padding: 1px 8px;
  /* Pill-like rounded ends */
  border-radius: 15px;
}

/* First level nested CharNodes within expanded NoteNode */
.marker-visible .note.expanded .char,
.marker-hidden .note.expanded .char {
  /* Slightly darker neon blue */
  background-color: rgba(173, 216, 230, 0.45);
  padding: 1px 6px;
  /* Pill-like rounded ends */
  border-radius: 12px;
}

/* Second level nested CharNodes within expanded NoteNode */
.marker-visible .note.expanded .char .char,
.marker-hidden .note.expanded .char .char {
  /* Darker neon blue */
  background-color: rgba(173, 216, 230, 0.6);
  padding: 0px 4px;
  /* Pill-like rounded ends */
  border-radius: 10px;
}

/* NoteNode > ImmutableNoteCallerNode */

.immutable-note-caller > button,
/* Styles for Preview (and Ruby) views */
.caller_preview,
.previewcallee {
  color: rgba(18, 82, 179, 1);
}

.note.collapsed .immutable-note-caller > button,
/* Styles for Preview (and Ruby) views */
.caller_preview,
.previewcallee {
  font-weight: bold;
  line-height: 1;
  vertical-align: super;
  font-size: 0.66em;
}

.note.expanded .immutable-note-caller > button {
  vertical-align: baseline;
  font-size: 1em;
  font-weight: normal;
}

.immutable-note-caller > button {
  cursor: pointer;
  text-decoration: none;
  border: 0;
  padding: 0;
  background-color: inherit;
}

@counter-style note-callers {
  system: alphabetic;
  /* These symbols are updated in TS by the \`NoteNodePlugin\`. */
  symbols: 'a' 'b' 'c' 'd' 'e' 'f' 'g' 'h' 'i' 'j' 'k' 'l' 'm' 'n' 'o' 'p' 'q' 'r' 's' 't' 'u' 'v'
    'w' 'x' 'y' 'z';
}

.editor-input {
  counter-reset: caller;
}

.editor-input.reset-counters {
  counter-reset: none;
}

.immutable-note-caller[data-caller='+'] {
  counter-increment: caller;
}

.note.collapsed .immutable-note-caller[data-caller='+'] > button::before {
  content: counter(caller, note-callers);
}

.formatted-font.text-spacing[contenteditable='false']
  .note.collapsed
  .immutable-note-caller[data-caller='-'] {
  display: none;
}

.caller_big {
  unicode-bidi: normal;
  color: rgba(18, 82, 179, 1);
  font-weight: bold;
  text-indent: 0pt;
  vertical-align: text-top;
  font-size: 0.66em;
}

.caller_small {
  unicode-bidi: normal;
  color: rgba(18, 82, 179, 1);
  font-family: 'Times New Roman', serif;
  vertical-align: text-top;
  text-indent: 0pt;
  font-size: 0.66em;
}

.caller_highlight {
  background-color: #ffffb5;
  border-top: solid 1px #0000ff;
  border-bottom: solid 1px #0000ff;
}

.opennote {
  color: #7777ff;
}

table {
  border-collapse: collapse;
}

td {
  border: 1px solid #000000;
  page-break-inside: avoid;
  /* FB27281 adding padding based on font size*/
  padding-right: 0.28em;
  padding-left: 0.28em;
}

td.markercell {
  border-style: none;
}

rt {
  cursor: pointer;
}

/* Style statues */
.status_unknown {
  color: rgba(204, 30, 20, 1);
  font-weight: bold;
}

.status_invalid {
  border-bottom: 1px solid rgba(204, 30, 20, 1);
  color: rgba(204, 30, 20, 1);
}

.caption {
  text-align: center;
  font-style: italic;
  font-weight: bold;
}

.figure {
  text-align: center;
}

.sidebar {
  border: solid 1px rgba(18, 82, 179, 1);
  margin-left: 10px;
}

/* VerseNode, ImmutableVerseNode */

.formatted-font .verse {
  background-color: rgba(222, 222, 222, 1);
  vertical-align: super;
  font-size: 0.66em;
}
.text-spacing .verse {
  margin: 0px 2px 0px 2px;
  padding: 0px 1px 0px 1px;
  text-indent: 0in;
  white-space: nowrap;
}

span.unread img {
  background-color: #ffff99;
  position: relative;
  bottom: -1px; /* negative of border-width to align baseline */
  border-width: 1px;
  border-style: solid;
  border-color: #808080;
}
span.read img {
  background-color: transparent;
  position: relative;
  bottom: 0px;
  border-width: 0px;
  border-style: none;
}

.annot_comment_todo {
  border-bottom: 1px dashed #888888;
}

.annot_comment_done {
  border-bottom: 1px dashed #888888;
}

.annot_greencursor {
  background-color: rgba(152, 235, 157, 1);
}
.annot_goldcursor {
  background-color: rgba(255, 255, 163, 1);
}
.annot_bluecursor {
  background-color: rgba(204, 224, 255, 1);
}
.annot_greycursor {
  background-color: rgba(222, 222, 222, 1);
}
.annot_violetcursor {
  background-color: rgba(233, 212, 255, 1);
}

.annot_spellingerror {
  background-repeat: repeat-x;
  background-position: left bottom;
  padding-bottom: 0px;
  vertical-align: text-top;
}

.annot_spellingunknown {
  background-repeat: repeat-x;
  background-position: left bottom;
  padding-bottom: 0px;
  vertical-align: text-top;
}

.found_term {
  background-color: rgba(222, 222, 222, 1);
  text-indent: 0;
  margin-left: 0;
  display: inline-block;
  border-bottom-style: solid;
  border-bottom-width: medium medium thick medium;
  border-bottom-color: rgba(252, 252, 252, 1);
  text-decoration: inherit;
}
.guessed_term {
  background-color: rgba(255, 191, 143, 1);
  text-indent: 0;
  margin-left: 0;
  display: inline-block;
  border-bottom-style: solid;
  border-bottom-width: medium medium thick medium;
  border-bottom-color: rgba(252, 252, 252, 1);
  text-decoration: inherit;
}
.found_term.unselected_term {
  background-color: rgba(222, 222, 222, 0.6);
  text-indent: 0;
  margin-left: 0;
  display: inline-block;
  border-bottom-style: solid;
  border-bottom-width: medium medium thick medium;
  border-bottom-color: rgba(252, 252, 252, 1);
  text-decoration: inherit;
}
.guessed_term.unselected_term {
  background-color: rgba(255, 191, 143, 0.3);
  text-indent: 0;
  margin-left: 0;
  display: inline-block;
  border-bottom-style: solid;
  border-bottom-width: medium medium thick medium;
  border-bottom-color: rgba(252, 252, 252, 1);
  text-decoration: inherit;
}
.selected_term {
  border-style: none none solid none;
  text-indent: 0;
  margin-left: 0;
  display: inline-block;
  border-bottom-style: solid;
  border-bottom-width: medium medium thick medium;
  border-bottom-color: rgba(252, 252, 252, 1);
  text-decoration: inherit;
}
.annot_reference_link {
  border-bottom: 1px solid #93c4ff;
}
.annot_invalid_reference {
  border-bottom: 1px solid #ff8080;
}
.annot_checkError {
  border-top: 1px solid #ff0000;
  border-bottom: 1px solid #ff0000;
  background-color: rgba(255, 204, 204, 0.5);
}
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
/*! tailwindcss v4.2.2 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-divide-x-reverse:0;--tw-border-style:solid;--tw-divide-y-reverse:0;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-ordinal:initial;--tw-slashed-zero:initial;--tw-numeric-figure:initial;--tw-numeric-spacing:initial;--tw-numeric-fraction:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-duration:initial;--tw-ease:initial;--tw-content:"";--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-animation-delay:0s;--tw-animation-direction:normal;--tw-animation-duration:initial;--tw-animation-fill-mode:none;--tw-animation-iteration-count:1;--tw-enter-blur:0;--tw-enter-opacity:1;--tw-enter-rotate:0;--tw-enter-scale:1;--tw-enter-translate-x:0;--tw-enter-translate-y:0;--tw-exit-blur:0;--tw-exit-opacity:1;--tw-exit-rotate:0;--tw-exit-scale:1;--tw-exit-translate-x:0;--tw-exit-translate-y:0}}}@layer theme{:root,:host{--tw-font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--tw-color-red-100:oklch(93.6% .032 17.717);--tw-color-red-200:oklch(88.5% .062 18.334);--tw-color-red-300:oklch(80.8% .114 19.571);--tw-color-red-400:oklch(70.4% .191 22.216);--tw-color-red-500:oklch(63.7% .237 25.331);--tw-color-red-600:oklch(57.7% .245 27.325);--tw-color-red-700:oklch(50.5% .213 27.518);--tw-color-red-800:oklch(44.4% .177 26.899);--tw-color-orange-100:oklch(95.4% .038 75.164);--tw-color-orange-800:oklch(47% .157 37.304);--tw-color-amber-200:oklch(92.4% .12 95.746);--tw-color-yellow-50:oklch(98.7% .026 102.212);--tw-color-yellow-100:oklch(97.3% .071 103.193);--tw-color-yellow-400:oklch(85.2% .199 91.936);--tw-color-yellow-500:oklch(79.5% .184 86.047);--tw-color-yellow-600:oklch(68.1% .162 75.834);--tw-color-yellow-700:oklch(55.4% .135 66.442);--tw-color-green-50:oklch(98.2% .018 155.826);--tw-color-green-100:oklch(96.2% .044 156.743);--tw-color-green-500:oklch(72.3% .219 149.579);--tw-color-green-600:oklch(62.7% .194 149.214);--tw-color-green-700:oklch(52.7% .154 150.069);--tw-color-green-800:oklch(44.8% .119 151.328);--tw-color-teal-400:oklch(77.7% .152 181.912);--tw-color-teal-500:oklch(70.4% .14 182.503);--tw-color-teal-600:oklch(60% .118 184.704);--tw-color-sky-400:oklch(74.6% .16 232.661);--tw-color-sky-500:oklch(68.5% .169 237.323);--tw-color-sky-600:oklch(58.8% .158 241.966);--tw-color-blue-50:oklch(97% .014 254.604);--tw-color-blue-100:oklch(93.2% .032 255.585);--tw-color-blue-400:oklch(70.7% .165 254.624);--tw-color-blue-500:oklch(62.3% .214 259.815);--tw-color-blue-600:oklch(54.6% .245 262.881);--tw-color-blue-800:oklch(42.4% .199 265.638);--tw-color-indigo-200:oklch(87% .065 274.039);--tw-color-purple-50:oklch(97.7% .014 308.299);--tw-color-purple-200:oklch(90.2% .063 306.703);--tw-color-purple-900:oklch(38.1% .176 304.987);--tw-color-rose-400:oklch(71.2% .194 13.428);--tw-color-rose-500:oklch(64.5% .246 16.439);--tw-color-rose-600:oklch(58.6% .253 17.585);--tw-color-slate-300:oklch(86.9% .022 252.894);--tw-color-slate-900:oklch(20.8% .042 265.755);--tw-color-gray-50:oklch(98.5% .002 247.839);--tw-color-gray-100:oklch(96.7% .003 264.542);--tw-color-gray-300:oklch(87.2% .01 258.338);--tw-color-gray-500:oklch(55.1% .027 264.364);--tw-color-gray-600:oklch(44.6% .03 256.802);--tw-color-gray-700:oklch(37.3% .034 259.733);--tw-color-gray-800:oklch(27.8% .033 256.848);--tw-color-zinc-400:oklch(70.5% .015 286.067);--tw-color-neutral-300:oklch(87% 0 0);--tw-color-black:#000;--tw-color-white:#fff;--tw-container-xs:20rem;--tw-container-sm:24rem;--tw-container-md:28rem;--tw-container-lg:32rem;--tw-container-2xl:42rem;--tw-container-3xl:48rem;--tw-container-4xl:56rem;--tw-container-6xl:72rem;--tw-text-xs:.75rem;--tw-text-xs--line-height:calc(1 / .75);--tw-text-sm:.875rem;--tw-text-sm--line-height:calc(1.25 / .875);--tw-text-base:1rem;--tw-text-base--line-height:calc(1.5 / 1);--tw-text-lg:1.125rem;--tw-text-lg--line-height:calc(1.75 / 1.125);--tw-text-xl:1.25rem;--tw-text-xl--line-height:calc(1.75 / 1.25);--tw-text-2xl:1.5rem;--tw-text-2xl--line-height:calc(2 / 1.5);--tw-text-3xl:1.875rem;--tw-text-3xl--line-height:calc(2.25 / 1.875);--tw-text-4xl:2.25rem;--tw-text-4xl--line-height:calc(2.5 / 2.25);--tw-text-5xl:3rem;--tw-text-5xl--line-height:1;--tw-font-weight-normal:400;--tw-font-weight-medium:500;--tw-font-weight-semibold:600;--tw-font-weight-bold:700;--tw-font-weight-extrabold:800;--tw-tracking-tight:-.025em;--tw-tracking-wider:.05em;--tw-tracking-widest:.1em;--tw-leading-tight:1.25;--tw-leading-snug:1.375;--tw-leading-relaxed:1.625;--tw-leading-loose:2;--tw-radius-md:calc(var(--radius) * .8);--tw-drop-shadow-sm:0 1px 2px #00000026;--tw-animate-spin:spin 1s linear infinite;--tw-animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--tw-blur-xs:4px;--tw-blur-2xl:40px;--tw-default-transition-duration:.15s;--tw-default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--tw-default-font-family:"IBM Plex Sans Variable", sans-serif;--tw-default-mono-font-family:var(--tw-font-mono)}}@layer base{.pr-twp,.pr-twp *{border-color:var(--border);outline-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.pr-twp,.pr-twp *{outline-color:color-mix(in oklab, var(--ring) 50%, transparent)}}body.pr-twp{background-color:var(--background);color:var(--foreground)}html.pr-twp{font-family:IBM Plex Sans Variable,sans-serif}:where(.pr-twp,.pr-twp *),:where(.pr-twp,.pr-twp *):after,:where(.pr-twp,.pr-twp *):before,:where(.pr-twp,.pr-twp *) ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--tw-default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--tw-default-font-feature-settings,normal);font-variation-settings:var(--tw-default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr:where(.pr-twp,.pr-twp *){height:0;color:inherit;border-top-width:1px}abbr:where([title]):where(.pr-twp,.pr-twp *){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1:where(.pr-twp,.pr-twp *),h2:where(.pr-twp,.pr-twp *),h3:where(.pr-twp,.pr-twp *),h4:where(.pr-twp,.pr-twp *),h5:where(.pr-twp,.pr-twp *),h6:where(.pr-twp,.pr-twp *){font-size:inherit;font-weight:inherit}a:where(.pr-twp,.pr-twp *){color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b:where(.pr-twp,.pr-twp *),strong:where(.pr-twp,.pr-twp *){font-weight:bolder}code:where(.pr-twp,.pr-twp *),kbd:where(.pr-twp,.pr-twp *),samp:where(.pr-twp,.pr-twp *),pre:where(.pr-twp,.pr-twp *){font-family:var(--tw-default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--tw-default-mono-font-feature-settings,normal);font-variation-settings:var(--tw-default-mono-font-variation-settings,normal);font-size:1em}small:where(.pr-twp,.pr-twp *){font-size:80%}sub:where(.pr-twp,.pr-twp *),sup:where(.pr-twp,.pr-twp *){vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub:where(.pr-twp,.pr-twp *){bottom:-.25em}sup:where(.pr-twp,.pr-twp *){top:-.5em}table:where(.pr-twp,.pr-twp *){text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(.pr-twp,.pr-twp *){outline:auto}progress:where(.pr-twp,.pr-twp *){vertical-align:baseline}summary:where(.pr-twp,.pr-twp *){display:list-item}ol:where(.pr-twp,.pr-twp *),ul:where(.pr-twp,.pr-twp *),menu:where(.pr-twp,.pr-twp *){list-style:none}img:where(.pr-twp,.pr-twp *),svg:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *),canvas:where(.pr-twp,.pr-twp *),audio:where(.pr-twp,.pr-twp *),iframe:where(.pr-twp,.pr-twp *),embed:where(.pr-twp,.pr-twp *),object:where(.pr-twp,.pr-twp *){vertical-align:middle;display:block}img:where(.pr-twp,.pr-twp *),video:where(.pr-twp,.pr-twp *){max-width:100%;height:auto}button:where(.pr-twp,.pr-twp *),input:where(.pr-twp,.pr-twp *),select:where(.pr-twp,.pr-twp *),optgroup:where(.pr-twp,.pr-twp *),textarea:where(.pr-twp,.pr-twp *){font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(.pr-twp,.pr-twp *) ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup:where(.pr-twp,.pr-twp *){font-weight:bolder}:where(select:is([multiple],[size])) optgroup option:where(.pr-twp,.pr-twp *){padding-inline-start:20px}:where(.pr-twp,.pr-twp *) ::file-selector-button{margin-inline-end:4px}:where(.pr-twp,.pr-twp *) ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){:where(.pr-twp,.pr-twp *) ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){:where(.pr-twp,.pr-twp *) ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea:where(.pr-twp,.pr-twp *){resize:vertical}:where(.pr-twp,.pr-twp *) ::-webkit-search-decoration{-webkit-appearance:none}:where(.pr-twp,.pr-twp *) ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{display:inline-flex}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-fields-wrapper{padding:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-year-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-month-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-day-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-hour-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-minute-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-second-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-millisecond-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-datetime-edit-meridiem-field{padding-block:0}:where(.pr-twp,.pr-twp *) ::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid:where(.pr-twp,.pr-twp *){box-shadow:none}button:where(.pr-twp,.pr-twp *),input:where([type=button],[type=reset],[type=submit]):where(.pr-twp,.pr-twp *){appearance:button}:where(.pr-twp,.pr-twp *) ::file-selector-button{appearance:button}:where(.pr-twp,.pr-twp *) ::-webkit-inner-spin-button{height:auto}:where(.pr-twp,.pr-twp *) ::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])):where(.pr-twp,.pr-twp *){display:none!important}}@layer components;@layer utilities{.tw\\:\\@container\\/card-header{container:card-header/inline-size}.tw\\:\\@container\\/toolbar{container:toolbar/inline-size}.tw\\:pointer-events-auto{pointer-events:auto}.tw\\:pointer-events-none{pointer-events:none}.tw\\:invisible{visibility:hidden}.tw\\:sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.tw\\:absolute{position:absolute}.tw\\:fixed{position:fixed}.tw\\:relative{position:relative}.tw\\:sticky{position:sticky}.tw\\:inset-0{inset:calc(calc(var(--spacing)) * 0)}.tw\\:inset-y-0{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:start-1\\.5{inset-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:start-1\\/2{inset-inline-start:50%}.tw\\:end-0{inset-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:end-1{inset-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:end-2{inset-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:end-3{inset-inline-end:calc(calc(var(--spacing)) * 3)}.tw\\:-top-\\[1px\\]{top:-1px}.tw\\:top-0{top:calc(calc(var(--spacing)) * 0)}.tw\\:top-1\\.5{top:calc(calc(var(--spacing)) * 1.5)}.tw\\:top-1\\/2{top:50%}.tw\\:top-1\\/3{top:33.3333%}.tw\\:top-2{top:calc(calc(var(--spacing)) * 2)}.tw\\:top-2\\.5{top:calc(calc(var(--spacing)) * 2.5)}.tw\\:top-3\\.5{top:calc(calc(var(--spacing)) * 3.5)}.tw\\:top-\\[-1px\\]{top:-1px}.tw\\:-right-1{right:calc(calc(var(--spacing)) * -1)}.tw\\:right-0{right:calc(calc(var(--spacing)) * 0)}.tw\\:right-1{right:calc(calc(var(--spacing)) * 1)}.tw\\:right-3{right:calc(calc(var(--spacing)) * 3)}.tw\\:bottom-0{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:-left-\\[1px\\]{left:-1px}.tw\\:left-0{left:calc(calc(var(--spacing)) * 0)}.tw\\:left-2{left:calc(calc(var(--spacing)) * 2)}.tw\\:left-3{left:calc(calc(var(--spacing)) * 3)}.tw\\:isolate{isolation:isolate}.tw\\:z-10{z-index:10}.tw\\:z-20{z-index:20}.tw\\:z-50{z-index:50}.tw\\:order-first{order:-9999}.tw\\:order-last{order:9999}.tw\\:col-span-1{grid-column:span 1/span 1}.tw\\:col-span-2{grid-column:span 2/span 2}.tw\\:col-span-3{grid-column:span 3/span 3}.tw\\:col-start-1{grid-column-start:1}.tw\\:col-start-2{grid-column-start:2}.tw\\:row-span-2{grid-row:span 2/span 2}.tw\\:row-start-1{grid-row-start:1}.tw\\:row-start-2{grid-row-start:2}.tw\\:m-0{margin:calc(calc(var(--spacing)) * 0)}.tw\\:m-1{margin:calc(calc(var(--spacing)) * 1)}.tw\\:m-2{margin:calc(calc(var(--spacing)) * 2)}.tw\\:-mx-1{margin-inline:calc(calc(var(--spacing)) * -1)}.tw\\:-mx-4{margin-inline:calc(calc(var(--spacing)) * -4)}.tw\\:mx-0{margin-inline:calc(calc(var(--spacing)) * 0)}.tw\\:mx-1{margin-inline:calc(calc(var(--spacing)) * 1)}.tw\\:mx-2{margin-inline:calc(calc(var(--spacing)) * 2)}.tw\\:mx-3\\.5{margin-inline:calc(calc(var(--spacing)) * 3.5)}.tw\\:mx-8{margin-inline:calc(calc(var(--spacing)) * 8)}.tw\\:my-1{margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:my-2\\.5{margin-block:calc(calc(var(--spacing)) * 2.5)}.tw\\:my-4{margin-block:calc(calc(var(--spacing)) * 4)}.tw\\:ms-1{margin-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:ms-2{margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ms-5{margin-inline-start:calc(calc(var(--spacing)) * 5)}.tw\\:ms-auto{margin-inline-start:auto}.tw\\:me-1{margin-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:me-2{margin-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:prose{color:var(--tw-prose-body);max-width:65ch}.tw\\:prose :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-lead);margin-top:1.2em;margin-bottom:1.2em;font-size:1.25em;line-height:1.6}.tw\\:prose :where(a):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-links);font-weight:500;text-decoration:underline}.tw\\:prose :where(strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-bold);font-weight:600}.tw\\:prose :where(a strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote strong):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:decimal}.tw\\:prose :where(ol[type=A]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=A s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-alpha}.tw\\:prose :where(ol[type=a s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-alpha}.tw\\:prose :where(ol[type=I]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type=I s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:upper-roman}.tw\\:prose :where(ol[type=i s]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:lower-roman}.tw\\:prose :where(ol[type="1"]):not(:where([class~=not-prose],[class~=not-prose] *)){list-style-type:decimal}.tw\\:prose :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em;padding-inline-start:1.625em;list-style-type:disc}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-counters);font-weight:400}.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *))::marker{color:var(--tw-prose-bullets)}.tw\\:prose :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.25em;font-weight:600}.tw\\:prose :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){border-color:var(--tw-prose-hr);border-top-width:1px;margin-top:3em;margin-bottom:3em}.tw\\:prose :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-quotes);border-inline-start-width:.25rem;border-inline-start-color:var(--tw-prose-quote-borders);quotes:"“""”""‘""’";margin-top:1.6em;margin-bottom:1.6em;padding-inline-start:1em;font-style:italic;font-weight:500}.tw\\:prose :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before{content:open-quote}.tw\\:prose :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:close-quote}.tw\\:prose :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:0;margin-bottom:.888889em;font-size:2.25em;font-weight:800;line-height:1.11111}.tw\\:prose :where(h1 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:900}.tw\\:prose :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:2em;margin-bottom:1em;font-size:1.5em;font-weight:700;line-height:1.33333}.tw\\:prose :where(h2 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:800}.tw\\:prose :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.6em;margin-bottom:.6em;font-size:1.25em;font-weight:600;line-height:1.6}.tw\\:prose :where(h3 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);margin-top:1.5em;margin-bottom:.5em;font-weight:600;line-height:1.5}.tw\\:prose :where(h4 strong):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-weight:700}.tw\\:prose :where(img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em;display:block}.tw\\:prose :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-kbd);box-shadow:0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);padding-top:.1875em;padding-inline-end:.375em;padding-bottom:.1875em;border-radius:.3125rem;padding-inline-start:.375em;font-family:inherit;font-size:.875em;font-weight:500}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-code);font-size:.875em;font-weight:600}.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:"\`"}.tw\\:prose :where(a code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h1 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.875em}.tw\\:prose :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit;font-size:.9em}.tw\\:prose :where(h4 code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(blockquote code):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(thead th code):not(:where([class~=not-prose],[class~=not-prose] *)){color:inherit}.tw\\:prose :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-pre-code);background-color:var(--tw-prose-pre-bg);padding-top:.857143em;padding-inline-end:1.14286em;padding-bottom:.857143em;border-radius:.375rem;margin-top:1.71429em;margin-bottom:1.71429em;padding-inline-start:1.14286em;font-size:.875em;font-weight:400;line-height:1.71429;overflow-x:auto}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)){font-weight:inherit;color:inherit;font-size:inherit;font-family:inherit;line-height:inherit;background-color:#0000;border-width:0;border-radius:0;padding:0}.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose :where(pre code):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:prose :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){table-layout:auto;width:100%;margin-top:2em;margin-bottom:2em;font-size:.875em;line-height:1.71429}.tw\\:prose :where(thead):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-th-borders)}.tw\\:prose :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-headings);vertical-align:bottom;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em;font-weight:600}.tw\\:prose :where(tbody tr):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:1px;border-bottom-color:var(--tw-prose-td-borders)}.tw\\:prose :where(tbody tr:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){border-bottom-width:0}.tw\\:prose :where(tbody td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:baseline}.tw\\:prose :where(tfoot):not(:where([class~=not-prose],[class~=not-prose] *)){border-top-width:1px;border-top-color:var(--tw-prose-th-borders)}.tw\\:prose :where(tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){vertical-align:top}.tw\\:prose :where(th,td):not(:where([class~=not-prose],[class~=not-prose] *)){text-align:start}.tw\\:prose :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){color:var(--tw-prose-captions);margin-top:.857143em;font-size:.875em;line-height:1.42857}.tw\\:prose{--tw-prose-body:var(--foreground);--tw-prose-headings:var(--foreground);--tw-prose-lead:var(--muted-foreground);--tw-prose-links:var(--primary);--tw-prose-bold:var(--foreground);--tw-prose-counters:var(--muted-foreground);--tw-prose-bullets:var(--muted-foreground);--tw-prose-hr:var(--border);--tw-prose-quotes:var(--foreground);--tw-prose-quote-borders:var(--border);--tw-prose-captions:var(--muted-foreground);--tw-prose-kbd:oklch(21% .034 264.665);--tw-prose-kbd-shadows:NaN NaN NaN;--tw-prose-code:var(--foreground);--tw-prose-pre-code:var(--muted-foreground);--tw-prose-pre-bg:var(--muted);--tw-prose-th-borders:var(--border);--tw-prose-td-borders:var(--border);--tw-prose-invert-body:var(--foreground);--tw-prose-invert-headings:var(--foreground);--tw-prose-invert-lead:var(--muted-foreground);--tw-prose-invert-links:var(--primary);--tw-prose-invert-bold:var(--foreground);--tw-prose-invert-counters:var(--muted-foreground);--tw-prose-invert-bullets:var(--muted-foreground);--tw-prose-invert-hr:var(--border);--tw-prose-invert-quotes:var(--foreground);--tw-prose-invert-quote-borders:var(--border);--tw-prose-invert-captions:var(--muted-foreground);--tw-prose-invert-kbd:#fff;--tw-prose-invert-kbd-shadows:255 255 255;--tw-prose-invert-code:var(--foreground);--tw-prose-invert-pre-code:var(--muted-foreground);--tw-prose-invert-pre-bg:var(--muted);--tw-prose-invert-th-borders:var(--border);--tw-prose-invert-td-borders:var(--border);font-size:1rem;line-height:1.75}.tw\\:prose :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;margin-bottom:.5em}.tw\\:prose :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.375em}.tw\\:prose :where(.tw\\:prose>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(.tw\\:prose>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em}.tw\\:prose :where(.tw\\:prose>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.25em}.tw\\:prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.75em;margin-bottom:.75em}.tw\\:prose :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.25em;margin-bottom:1.25em}.tw\\:prose :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.5em;padding-inline-start:1.625em}.tw\\:prose :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.571429em;padding-inline-end:.571429em;padding-bottom:.571429em;padding-inline-start:.571429em}.tw\\:prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2em;margin-bottom:2em}.tw\\:prose :where(.tw\\:prose>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose :where(.tw\\:prose>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:prose-sm{font-size:.875rem;line-height:1.71429}.tw\\:prose-sm :where(p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where([class~=lead]):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.888889em;margin-bottom:.888889em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(blockquote):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.33333em;margin-bottom:1.33333em;padding-inline-start:1.11111em}.tw\\:prose-sm :where(h1):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:.8em;font-size:2.14286em;line-height:1.2}.tw\\:prose-sm :where(h2):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.6em;margin-bottom:.8em;font-size:1.42857em;line-height:1.4}.tw\\:prose-sm :where(h3):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.55556em;margin-bottom:.444444em;font-size:1.28571em;line-height:1.55556}.tw\\:prose-sm :where(h4):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.42857em;margin-bottom:.571429em;line-height:1.42857}.tw\\:prose-sm :where(img):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(picture):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(picture>img):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(video):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(kbd):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.142857em;padding-inline-end:.357143em;padding-bottom:.142857em;border-radius:.3125rem;padding-inline-start:.357143em;font-size:.857143em}.tw\\:prose-sm :where(code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em}.tw\\:prose-sm :where(h2 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.9em}.tw\\:prose-sm :where(h3 code):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.888889em}.tw\\:prose-sm :where(pre):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;border-radius:.25rem;margin-top:1.66667em;margin-bottom:1.66667em;padding-inline-start:1em;font-size:.857143em;line-height:1.66667}.tw\\:prose-sm :where(ol):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(li):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;margin-bottom:.285714em}.tw\\:prose-sm :where(ol>li):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(ul>li):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:.428571em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li p):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ul>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(.tw\\:prose-sm>ol>li>p:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:1.14286em}.tw\\:prose-sm :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.571429em;margin-bottom:.571429em}.tw\\:prose-sm :where(dl):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em;margin-bottom:1.14286em}.tw\\:prose-sm :where(dt):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.14286em}.tw\\:prose-sm :where(dd):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.285714em;padding-inline-start:1.57143em}.tw\\:prose-sm :where(hr):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:2.85714em;margin-bottom:2.85714em}.tw\\:prose-sm :where(hr+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h2+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h3+*):not(:where([class~=not-prose],[class~=not-prose] *)),.tw\\:prose-sm :where(h4+*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(table):not(:where([class~=not-prose],[class~=not-prose] *)){font-size:.857143em;line-height:1.5}.tw\\:prose-sm :where(thead th):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(thead th:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(thead th:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(tbody td,tfoot td):not(:where([class~=not-prose],[class~=not-prose] *)){padding-top:.666667em;padding-inline-end:1em;padding-bottom:.666667em;padding-inline-start:1em}.tw\\:prose-sm :where(tbody td:first-child,tfoot td:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-start:0}.tw\\:prose-sm :where(tbody td:last-child,tfoot td:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){padding-inline-end:0}.tw\\:prose-sm :where(figure):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:1.71429em;margin-bottom:1.71429em}.tw\\:prose-sm :where(figure>*):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0;margin-bottom:0}.tw\\:prose-sm :where(figcaption):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:.666667em;font-size:.857143em;line-height:1.33333}.tw\\:prose-sm :where(.tw\\:prose-sm>:first-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-top:0}.tw\\:prose-sm :where(.tw\\:prose-sm>:last-child):not(:where([class~=not-prose],[class~=not-prose] *)){margin-bottom:0}.tw\\:-mt-4{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:mt-1{margin-top:calc(calc(var(--spacing)) * 1)}.tw\\:mt-2{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:mt-3{margin-top:calc(calc(var(--spacing)) * 3)}.tw\\:mt-4{margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:mt-6{margin-top:calc(calc(var(--spacing)) * 6)}.tw\\:mt-auto{margin-top:auto}.tw\\:mr-1{margin-right:calc(calc(var(--spacing)) * 1)}.tw\\:mr-2{margin-right:calc(calc(var(--spacing)) * 2)}.tw\\:mr-3{margin-right:calc(calc(var(--spacing)) * 3)}.tw\\:-mb-4{margin-bottom:calc(calc(var(--spacing)) * -4)}.tw\\:mb-1{margin-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:mb-2{margin-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:mb-3{margin-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:mb-4{margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:ml-2{margin-left:calc(calc(var(--spacing)) * 2)}.tw\\:ml-4{margin-left:calc(calc(var(--spacing)) * 4)}.tw\\:ml-auto{margin-left:auto}.tw\\:box-border{box-sizing:border-box}.tw\\:line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.tw\\:no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}.tw\\:no-scrollbar::-webkit-scrollbar{display:none}.tw\\:block{display:block}.tw\\:flex{display:flex}.tw\\:grid{display:grid}.tw\\:hidden{display:none}.tw\\:inline-block{display:inline-block}.tw\\:inline-flex{display:inline-flex}.tw\\:inline-grid{display:inline-grid}.tw\\:field-sizing-content{field-sizing:content}.tw\\:aspect-square{aspect-ratio:1}.tw\\:size-2{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:size-2\\.5{width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:size-3{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:size-3\\.5{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:size-4{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:size-6{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:size-7{width:calc(calc(var(--spacing)) * 7);height:calc(calc(var(--spacing)) * 7)}.tw\\:size-8{width:calc(calc(var(--spacing)) * 8);height:calc(calc(var(--spacing)) * 8)}.tw\\:size-9{width:calc(calc(var(--spacing)) * 9);height:calc(calc(var(--spacing)) * 9)}.tw\\:size-full{width:100%;height:100%}.tw\\:h-1{height:calc(calc(var(--spacing)) * 1)}.tw\\:h-2{height:calc(calc(var(--spacing)) * 2)}.tw\\:h-3{height:calc(calc(var(--spacing)) * 3)}.tw\\:h-4{height:calc(calc(var(--spacing)) * 4)}.tw\\:h-5{height:calc(calc(var(--spacing)) * 5)}.tw\\:h-6{height:calc(calc(var(--spacing)) * 6)}.tw\\:h-7{height:calc(calc(var(--spacing)) * 7)}.tw\\:h-8{height:calc(calc(var(--spacing)) * 8)}.tw\\:h-8\\!{height:calc(calc(var(--spacing)) * 8)!important}.tw\\:h-9{height:calc(calc(var(--spacing)) * 9)}.tw\\:h-10{height:calc(calc(var(--spacing)) * 10)}.tw\\:h-12{height:calc(calc(var(--spacing)) * 12)}.tw\\:h-14{height:calc(calc(var(--spacing)) * 14)}.tw\\:h-20{height:calc(calc(var(--spacing)) * 20)}.tw\\:h-24{height:calc(calc(var(--spacing)) * 24)}.tw\\:h-32{height:calc(calc(var(--spacing)) * 32)}.tw\\:h-40{height:calc(calc(var(--spacing)) * 40)}.tw\\:h-64{height:calc(calc(var(--spacing)) * 64)}.tw\\:h-96{height:calc(calc(var(--spacing)) * 96)}.tw\\:h-\\[1\\.2rem\\]{height:1.2rem}.tw\\:h-\\[5px\\]{height:5px}.tw\\:h-\\[300px\\]{height:300px}.tw\\:h-\\[calc\\(100\\%-1px\\)\\]{height:calc(100% - 1px)}.tw\\:h-\\[calc\\(100\\%-2px\\)\\]{height:calc(100% - 2px)}.tw\\:h-auto{height:auto}.tw\\:h-full{height:100%}.tw\\:h-px{height:1px}.tw\\:h-svh{height:100svh}.tw\\:max-h-\\(--radix-context-menu-content-available-height\\){max-height:var(--radix-context-menu-content-available-height)}.tw\\:max-h-\\(--radix-dropdown-menu-content-available-height\\){max-height:var(--radix-dropdown-menu-content-available-height)}.tw\\:max-h-\\(--radix-select-content-available-height\\){max-height:var(--radix-select-content-available-height)}.tw\\:max-h-5{max-height:calc(calc(var(--spacing)) * 5)}.tw\\:max-h-10{max-height:calc(calc(var(--spacing)) * 10)}.tw\\:max-h-72{max-height:calc(calc(var(--spacing)) * 72)}.tw\\:max-h-80{max-height:calc(calc(var(--spacing)) * 80)}.tw\\:max-h-\\[96\\%\\]{max-height:96%}.tw\\:max-h-\\[300px\\]{max-height:300px}.tw\\:min-h-0{min-height:calc(calc(var(--spacing)) * 0)}.tw\\:min-h-11{min-height:calc(calc(var(--spacing)) * 11)}.tw\\:min-h-16{min-height:calc(calc(var(--spacing)) * 16)}.tw\\:min-h-svh{min-height:100svh}.tw\\:w-\\(--radix-dropdown-menu-trigger-width\\){width:var(--radix-dropdown-menu-trigger-width)}.tw\\:w-\\(--sidebar-width\\){width:var(--sidebar-width)}.tw\\:w-1{width:calc(calc(var(--spacing)) * 1)}.tw\\:w-1\\/2{width:50%}.tw\\:w-2{width:calc(calc(var(--spacing)) * 2)}.tw\\:w-3{width:calc(calc(var(--spacing)) * 3)}.tw\\:w-3\\/4{width:75%}.tw\\:w-4{width:calc(calc(var(--spacing)) * 4)}.tw\\:w-4\\/5{width:80%}.tw\\:w-4\\/6{width:66.6667%}.tw\\:w-5{width:calc(calc(var(--spacing)) * 5)}.tw\\:w-5\\/6{width:83.3333%}.tw\\:w-6{width:calc(calc(var(--spacing)) * 6)}.tw\\:w-8{width:calc(calc(var(--spacing)) * 8)}.tw\\:w-9{width:calc(calc(var(--spacing)) * 9)}.tw\\:w-9\\/12{width:75%}.tw\\:w-10{width:calc(calc(var(--spacing)) * 10)}.tw\\:w-12{width:calc(calc(var(--spacing)) * 12)}.tw\\:w-20{width:calc(calc(var(--spacing)) * 20)}.tw\\:w-24{width:calc(calc(var(--spacing)) * 24)}.tw\\:w-32{width:calc(calc(var(--spacing)) * 32)}.tw\\:w-48{width:calc(calc(var(--spacing)) * 48)}.tw\\:w-56{width:calc(calc(var(--spacing)) * 56)}.tw\\:w-60{width:calc(calc(var(--spacing)) * 60)}.tw\\:w-64{width:calc(calc(var(--spacing)) * 64)}.tw\\:w-72{width:calc(calc(var(--spacing)) * 72)}.tw\\:w-80{width:calc(calc(var(--spacing)) * 80)}.tw\\:w-96{width:calc(calc(var(--spacing)) * 96)}.tw\\:w-\\[1\\.2rem\\]{width:1.2rem}.tw\\:w-\\[1px\\]{width:1px}.tw\\:w-\\[5px\\]{width:5px}.tw\\:w-\\[70px\\]{width:70px}.tw\\:w-\\[100px\\]{width:100px}.tw\\:w-\\[116px\\]{width:116px}.tw\\:w-\\[124px\\]{width:124px}.tw\\:w-\\[150px\\]{width:150px}.tw\\:w-\\[180px\\]{width:180px}.tw\\:w-\\[200px\\]{width:200px}.tw\\:w-\\[250px\\]{width:250px}.tw\\:w-\\[280px\\]{width:280px}.tw\\:w-\\[300px\\]{width:300px}.tw\\:w-\\[350px\\]{width:350px}.tw\\:w-\\[400px\\]{width:400px}.tw\\:w-\\[500px\\]{width:500px}.tw\\:w-\\[600px\\]{width:600px}.tw\\:w-\\[calc\\(100\\%-2px\\)\\]{width:calc(100% - 2px)}.tw\\:w-auto{width:auto}.tw\\:w-fit{width:fit-content}.tw\\:w-full{width:100%}.tw\\:w-max{width:max-content}.tw\\:w-px{width:1px}.tw\\:max-w-\\(--skeleton-width\\){max-width:var(--skeleton-width)}.tw\\:max-w-2xl{max-width:var(--tw-container-2xl)}.tw\\:max-w-3xl{max-width:var(--tw-container-3xl)}.tw\\:max-w-4xl{max-width:var(--tw-container-4xl)}.tw\\:max-w-5{max-width:calc(calc(var(--spacing)) * 5)}.tw\\:max-w-6xl{max-width:var(--tw-container-6xl)}.tw\\:max-w-40{max-width:calc(calc(var(--spacing)) * 40)}.tw\\:max-w-48{max-width:calc(calc(var(--spacing)) * 48)}.tw\\:max-w-64{max-width:calc(calc(var(--spacing)) * 64)}.tw\\:max-w-96{max-width:calc(calc(var(--spacing)) * 96)}.tw\\:max-w-\\[200px\\]{max-width:200px}.tw\\:max-w-\\[220px\\]{max-width:220px}.tw\\:max-w-\\[calc\\(100\\%-2rem\\)\\]{max-width:calc(100% - 2rem)}.tw\\:max-w-fit{max-width:fit-content}.tw\\:max-w-full{max-width:100%}.tw\\:max-w-lg{max-width:var(--tw-container-lg)}.tw\\:max-w-md{max-width:var(--tw-container-md)}.tw\\:max-w-none{max-width:none}.tw\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:max-w-xs{max-width:var(--tw-container-xs)}.tw\\:min-w-0{min-width:calc(calc(var(--spacing)) * 0)}.tw\\:min-w-5{min-width:calc(calc(var(--spacing)) * 5)}.tw\\:min-w-7{min-width:calc(calc(var(--spacing)) * 7)}.tw\\:min-w-8{min-width:calc(calc(var(--spacing)) * 8)}.tw\\:min-w-9{min-width:calc(calc(var(--spacing)) * 9)}.tw\\:min-w-16{min-width:calc(calc(var(--spacing)) * 16)}.tw\\:min-w-32{min-width:calc(calc(var(--spacing)) * 32)}.tw\\:min-w-36{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:min-w-80{min-width:calc(calc(var(--spacing)) * 80)}.tw\\:min-w-\\[26px\\]{min-width:26px}.tw\\:min-w-\\[96px\\]{min-width:96px}.tw\\:min-w-\\[140px\\]{min-width:140px}.tw\\:min-w-\\[215px\\]{min-width:215px}.tw\\:min-w-\\[500px\\]{min-width:500px}.tw\\:min-w-min{min-width:min-content}.tw\\:flex-1{flex:1}.tw\\:shrink{flex-shrink:1}.tw\\:shrink-0{flex-shrink:0}.tw\\:flex-grow,.tw\\:grow,.tw\\:grow-\\[1\\]{flex-grow:1}.tw\\:grow-\\[10\\]{flex-grow:10}.tw\\:basis-0{flex-basis:calc(calc(var(--spacing)) * 0)}.tw\\:caption-bottom{caption-side:bottom}.tw\\:border-collapse{border-collapse:collapse}.tw\\:origin-\\(--radix-context-menu-content-transform-origin\\){transform-origin:var(--radix-context-menu-content-transform-origin)}.tw\\:origin-\\(--radix-dropdown-menu-content-transform-origin\\){transform-origin:var(--radix-dropdown-menu-content-transform-origin)}.tw\\:origin-\\(--radix-menubar-content-transform-origin\\){transform-origin:var(--radix-menubar-content-transform-origin)}.tw\\:origin-\\(--radix-popover-content-transform-origin\\){transform-origin:var(--radix-popover-content-transform-origin)}.tw\\:origin-\\(--radix-select-content-transform-origin\\){transform-origin:var(--radix-select-content-transform-origin)}.tw\\:origin-\\(--radix-tooltip-content-transform-origin\\){transform-origin:var(--radix-tooltip-content-transform-origin)}.tw\\:-translate-x-1\\/2{--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-x-px{--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:-translate-y-1\\/2{--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-0{--tw-translate-y:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:translate-y-\\[calc\\(-50\\%_-_2px\\)\\]{--tw-translate-y:calc(-50% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rotate-45{rotate:45deg}.tw\\:rotate-180{rotate:180deg}.tw\\:transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.tw\\:animate-none\\!{animation:none!important}.tw\\:animate-pulse{animation:var(--tw-animate-pulse)}.tw\\:animate-spin{animation:var(--tw-animate-spin)}.tw\\:cursor-default{cursor:default}.tw\\:cursor-ew-resize{cursor:ew-resize}.tw\\:cursor-pointer{cursor:pointer}.tw\\:cursor-text{cursor:text}.tw\\:touch-none{touch-action:none}.tw\\:resize{resize:both}.tw\\:resize-none{resize:none}.tw\\:scroll-m-20{scroll-margin:calc(calc(var(--spacing)) * 20)}.tw\\:scroll-my-1{scroll-margin-block:calc(calc(var(--spacing)) * 1)}.tw\\:scroll-py-1{scroll-padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:list-inside{list-style-position:inside}.tw\\:list-outside{list-style-position:outside}.tw\\:\\!list-\\[lower-alpha\\]{list-style-type:lower-alpha!important}.tw\\:\\!list-\\[lower-roman\\]{list-style-type:lower-roman!important}.tw\\:\\!list-\\[upper-alpha\\]{list-style-type:upper-alpha!important}.tw\\:\\!list-\\[upper-roman\\]{list-style-type:upper-roman!important}.tw\\:\\!list-decimal{list-style-type:decimal!important}.tw\\:\\!list-disc{list-style-type:disc!important}.tw\\:list-decimal{list-style-type:decimal}.tw\\:list-disc{list-style-type:disc}.tw\\:list-none{list-style-type:none}.tw\\:grid-flow-col{grid-auto-flow:column}.tw\\:auto-rows-min{grid-auto-rows:min-content}.tw\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.tw\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.tw\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tw\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.tw\\:grid-cols-\\[25\\%_25\\%_50\\%\\]{grid-template-columns:25% 25% 50%}.tw\\:grid-cols-\\[25\\%_50\\%_25\\%\\]{grid-template-columns:25% 50% 25%}.tw\\:grid-cols-\\[min-content_1fr\\]{grid-template-columns:min-content 1fr}.tw\\:grid-cols-\\[min-content_min-content_1fr\\]{grid-template-columns:min-content min-content 1fr}.tw\\:grid-cols-subgrid{grid-template-columns:subgrid}.tw\\:flex-col{flex-direction:column}.tw\\:flex-col-reverse{flex-direction:column-reverse}.tw\\:flex-row{flex-direction:row}.tw\\:flex-row-reverse{flex-direction:row-reverse}.tw\\:flex-wrap{flex-wrap:wrap}.tw\\:place-content-center{place-content:center}.tw\\:content-center{align-content:center}.tw\\:items-baseline{align-items:baseline}.tw\\:items-center{align-items:center}.tw\\:items-end{align-items:flex-end}.tw\\:items-start{align-items:flex-start}.tw\\:items-stretch{align-items:stretch}.tw\\:justify-between{justify-content:space-between}.tw\\:justify-center{justify-content:center}.tw\\:justify-end{justify-content:flex-end}.tw\\:justify-start{justify-content:flex-start}.tw\\:gap-0{gap:calc(calc(var(--spacing)) * 0)}.tw\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:gap-1{gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-1\\.5{gap:calc(calc(var(--spacing)) * 1.5)}.tw\\:gap-1\\.5\\!{gap:calc(calc(var(--spacing)) * 1.5)!important}.tw\\:gap-2{gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-2\\.5{gap:calc(calc(var(--spacing)) * 2.5)}.tw\\:gap-3{gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-4{gap:calc(calc(var(--spacing)) * 4)}.tw\\:gap-5{gap:calc(calc(var(--spacing)) * 5)}.tw\\:gap-6{gap:calc(calc(var(--spacing)) * 6)}.tw\\:gap-16{gap:calc(calc(var(--spacing)) * 16)}.tw\\:gap-\\[--spacing\\(var\\(--gap\\)\\)\\]{gap:calc(calc(var(--spacing)) * var(--gap))}.tw\\:gap-\\[12px\\]{gap:12px}:where(.tw\\:space-y-1>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-1\\.5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 1.5) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 1.5) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-y-reverse)))}:where(.tw\\:space-y-8>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-y-reverse));margin-block-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-y-reverse)))}.tw\\:gap-x-1{column-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-x-2{column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:gap-x-3{column-gap:calc(calc(var(--spacing)) * 3)}.tw\\:gap-x-4{column-gap:calc(calc(var(--spacing)) * 4)}:where(.tw\\:-space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * -2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * -2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 2) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-3>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 3) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 3) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-4>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 4) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 4) * calc(1 - var(--tw-space-x-reverse)))}:where(.tw\\:space-x-6>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 6) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 6) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:gap-y-1{row-gap:calc(calc(var(--spacing)) * 1)}.tw\\:gap-y-2{row-gap:calc(calc(var(--spacing)) * 2)}:where(.tw\\:divide-x>:not(:last-child)){--tw-divide-x-reverse:0;border-inline-style:var(--tw-border-style);border-inline-start-width:calc(1px * var(--tw-divide-x-reverse));border-inline-end-width:calc(1px * calc(1 - var(--tw-divide-x-reverse)))}:where(.tw\\:divide-y>:not(:last-child)){--tw-divide-y-reverse:0;border-bottom-style:var(--tw-border-style);border-top-style:var(--tw-border-style);border-top-width:calc(1px * var(--tw-divide-y-reverse));border-bottom-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)))}.tw\\:self-start{align-self:flex-start}.tw\\:self-stretch{align-self:stretch}.tw\\:justify-self-end{justify-self:flex-end}.tw\\:truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:overflow-auto{overflow:auto}.tw\\:overflow-clip{overflow:clip}.tw\\:overflow-hidden{overflow:hidden}.tw\\:overflow-scroll{overflow:scroll}.tw\\:overflow-visible{overflow:visible}.tw\\:overflow-x-auto{overflow-x:auto}.tw\\:overflow-x-hidden{overflow-x:hidden}.tw\\:overflow-y-auto{overflow-y:auto}.tw\\:overflow-y-hidden{overflow-y:hidden}.tw\\:rounded{border-radius:.25rem}.tw\\:rounded-2xl{border-radius:calc(var(--radius) * 1.8)}.tw\\:rounded-4xl{border-radius:calc(var(--radius) * 2.6)}.tw\\:rounded-\\[2px\\]{border-radius:2px}.tw\\:rounded-\\[4px\\]{border-radius:4px}.tw\\:rounded-\\[6px\\]{border-radius:6px}.tw\\:rounded-\\[calc\\(var\\(--radius\\)-3px\\)\\]{border-radius:calc(var(--radius) - 3px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,12px\\)\\]{border-radius:min(var(--tw-radius-md), 12px)}.tw\\:rounded-full{border-radius:3.40282e38px}.tw\\:rounded-lg{border-radius:var(--radius)}.tw\\:rounded-lg\\!{border-radius:var(--radius)!important}.tw\\:rounded-md{border-radius:calc(var(--radius) * .8)}.tw\\:rounded-none{border-radius:0}.tw\\:rounded-sm{border-radius:calc(var(--radius) * .6)}.tw\\:rounded-xl{border-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-xl\\!{border-radius:calc(var(--radius) * 1.4)!important}.tw\\:rounded-s-none{border-start-start-radius:0;border-end-start-radius:0}.tw\\:rounded-e-none{border-start-end-radius:0;border-end-end-radius:0}.tw\\:rounded-t-xl{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-l-lg{border-top-left-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:rounded-r-xl{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:rounded-b-xl{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:border{border-style:var(--tw-border-style);border-width:1px}.tw\\:border-0{border-style:var(--tw-border-style);border-width:0}.tw\\:border-2{border-style:var(--tw-border-style);border-width:2px}.tw\\:border-s{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:border-s-0{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:border-s-2{border-inline-start-style:var(--tw-border-style);border-inline-start-width:2px}.tw\\:border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:border-e-0{border-inline-end-style:var(--tw-border-style);border-inline-end-width:0}.tw\\:border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:border-t-0{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:border-b-0{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.tw\\:border-l-4{border-left-style:var(--tw-border-style);border-left-width:4px}.tw\\:border-dashed{--tw-border-style:dashed;border-style:dashed}.tw\\:border-none{--tw-border-style:none;border-style:none}.tw\\:border-solid{--tw-border-style:solid;border-style:solid}.tw\\:border-black{border-color:var(--tw-color-black)}.tw\\:border-blue-400{border-color:var(--tw-color-blue-400)}.tw\\:border-blue-500{border-color:var(--tw-color-blue-500)}.tw\\:border-border,.tw\\:border-border\\/50{border-color:var(--border)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-border\\/50{border-color:color-mix(in oklab, var(--border) 50%, transparent)}}.tw\\:border-gray-300{border-color:var(--tw-color-gray-300)}.tw\\:border-input,.tw\\:border-input\\/30{border-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:border-input\\/30{border-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:border-muted-foreground{border-color:var(--muted-foreground)}.tw\\:border-primary{border-color:var(--primary)}.tw\\:border-red-300{border-color:var(--tw-color-red-300)}.tw\\:border-red-400{border-color:var(--tw-color-red-400)}.tw\\:border-red-500{border-color:var(--tw-color-red-500)}.tw\\:border-red-600{border-color:var(--tw-color-red-600)}.tw\\:border-ring{border-color:var(--ring)}.tw\\:border-sidebar-border{border-color:var(--sidebar-border)}.tw\\:border-slate-300{border-color:var(--tw-color-slate-300)}.tw\\:border-transparent{border-color:#0000}.tw\\:border-yellow-400{border-color:var(--tw-color-yellow-400)}.tw\\:border-yellow-500{border-color:var(--tw-color-yellow-500)}.tw\\:border-s-amber-200{border-inline-start-color:var(--tw-color-amber-200)}.tw\\:border-s-indigo-200{border-inline-start-color:var(--tw-color-indigo-200)}.tw\\:border-s-purple-200{border-inline-start-color:var(--tw-color-purple-200)}.tw\\:border-s-red-200{border-inline-start-color:var(--tw-color-red-200)}.tw\\:\\!bg-destructive\\/50{background-color:var(--destructive)!important}@supports (color:color-mix(in lab, red, red)){.tw\\:\\!bg-destructive\\/50{background-color:color-mix(in oklab, var(--destructive) 50%, transparent)!important}}.tw\\:bg-accent{background-color:var(--accent)}.tw\\:bg-accent-foreground{background-color:var(--accent-foreground)}.tw\\:bg-background,.tw\\:bg-background\\/50{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-background\\/50{background-color:color-mix(in oklab, var(--background) 50%, transparent)}}.tw\\:bg-black\\/10{background-color:var(--tw-color-black)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-black\\/10{background-color:color-mix(in oklab, var(--tw-color-black) 10%, transparent)}}.tw\\:bg-blue-50{background-color:var(--tw-color-blue-50)}.tw\\:bg-blue-100{background-color:var(--tw-color-blue-100)}.tw\\:bg-blue-400{background-color:var(--tw-color-blue-400)}.tw\\:bg-blue-500{background-color:var(--tw-color-blue-500)}.tw\\:bg-border{background-color:var(--border)}.tw\\:bg-card{background-color:var(--card)}.tw\\:bg-card-foreground{background-color:var(--card-foreground)}.tw\\:bg-destructive-foreground{background-color:var(--destructive-foreground)}.tw\\:bg-destructive\\/10{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-destructive\\/10{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:bg-foreground{background-color:var(--foreground)}.tw\\:bg-gray-50{background-color:var(--tw-color-gray-50)}.tw\\:bg-gray-100{background-color:var(--tw-color-gray-100)}.tw\\:bg-gray-500{background-color:var(--tw-color-gray-500)}.tw\\:bg-green-50{background-color:var(--tw-color-green-50)}.tw\\:bg-green-100{background-color:var(--tw-color-green-100)}.tw\\:bg-green-500{background-color:var(--tw-color-green-500)}.tw\\:bg-input,.tw\\:bg-input\\/30{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-input\\/30{background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:bg-muted{background-color:var(--muted)}.tw\\:bg-muted-foreground{background-color:var(--muted-foreground)}.tw\\:bg-muted\\/50{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-muted\\/50{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:bg-neutral-300{background-color:var(--tw-color-neutral-300)}.tw\\:bg-orange-100{background-color:var(--tw-color-orange-100)}.tw\\:bg-popover{background-color:var(--popover)}.tw\\:bg-popover-foreground{background-color:var(--popover-foreground)}.tw\\:bg-popover\\/70{background-color:var(--popover)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-popover\\/70{background-color:color-mix(in oklab, var(--popover) 70%, transparent)}}.tw\\:bg-primary{background-color:var(--primary)}.tw\\:bg-primary-foreground{background-color:var(--primary-foreground)}.tw\\:bg-purple-50{background-color:var(--tw-color-purple-50)}.tw\\:bg-red-100{background-color:var(--tw-color-red-100)}.tw\\:bg-red-500{background-color:var(--tw-color-red-500)}.tw\\:bg-rose-500,.tw\\:bg-rose-500\\/5{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/5{background-color:color-mix(in oklab, var(--tw-color-rose-500) 5%, transparent)}}.tw\\:bg-rose-500\\/15{background-color:var(--tw-color-rose-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-rose-500\\/15{background-color:color-mix(in oklab, var(--tw-color-rose-500) 15%, transparent)}}.tw\\:bg-secondary{background-color:var(--secondary)}.tw\\:bg-secondary-foreground{background-color:var(--secondary-foreground)}.tw\\:bg-sidebar{background-color:var(--sidebar)}.tw\\:bg-sidebar-accent{background-color:var(--sidebar-accent)}.tw\\:bg-sidebar-border{background-color:var(--sidebar-border)}.tw\\:bg-sky-500,.tw\\:bg-sky-500\\/5{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/5{background-color:color-mix(in oklab, var(--tw-color-sky-500) 5%, transparent)}}.tw\\:bg-sky-500\\/15{background-color:var(--tw-color-sky-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-sky-500\\/15{background-color:color-mix(in oklab, var(--tw-color-sky-500) 15%, transparent)}}.tw\\:bg-teal-500,.tw\\:bg-teal-500\\/5{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/5{background-color:color-mix(in oklab, var(--tw-color-teal-500) 5%, transparent)}}.tw\\:bg-teal-500\\/15{background-color:var(--tw-color-teal-500)}@supports (color:color-mix(in lab, red, red)){.tw\\:bg-teal-500\\/15{background-color:color-mix(in oklab, var(--tw-color-teal-500) 15%, transparent)}}.tw\\:bg-transparent{background-color:#0000}.tw\\:bg-white{background-color:var(--tw-color-white)}.tw\\:bg-yellow-50{background-color:var(--tw-color-yellow-50)}.tw\\:bg-yellow-100{background-color:var(--tw-color-yellow-100)}.tw\\:bg-yellow-500{background-color:var(--tw-color-yellow-500)}.tw\\:bg-zinc-400{background-color:var(--tw-color-zinc-400)}.tw\\:bg-clip-padding{background-clip:padding-box}.tw\\:fill-destructive{fill:var(--destructive)}.tw\\:fill-foreground{fill:var(--foreground)}.tw\\:fill-yellow-400,.tw\\:fill-yellow-400\\/50{fill:var(--tw-color-yellow-400)}@supports (color:color-mix(in lab, red, red)){.tw\\:fill-yellow-400\\/50{fill:color-mix(in oklab, var(--tw-color-yellow-400) 50%, transparent)}}.tw\\:object-cover{object-fit:cover}.tw\\:\\!p-4{padding:calc(calc(var(--spacing)) * 4)!important}.tw\\:p-0{padding:calc(calc(var(--spacing)) * 0)}.tw\\:p-0\\.5{padding:calc(calc(var(--spacing)) * .5)}.tw\\:p-1{padding:calc(calc(var(--spacing)) * 1)}.tw\\:p-2{padding:calc(calc(var(--spacing)) * 2)}.tw\\:p-2\\.5{padding:calc(calc(var(--spacing)) * 2.5)}.tw\\:p-3{padding:calc(calc(var(--spacing)) * 3)}.tw\\:p-4{padding:calc(calc(var(--spacing)) * 4)}.tw\\:p-6{padding:calc(calc(var(--spacing)) * 6)}.tw\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:p-\\[1px\\]{padding:1px}.tw\\:p-\\[3px\\]{padding:3px}.tw\\:p-\\[10px\\]{padding:10px}.tw\\:p-\\[16px\\]{padding:16px}.tw\\:px-0{padding-inline:calc(calc(var(--spacing)) * 0)}.tw\\:px-1{padding-inline:calc(calc(var(--spacing)) * 1)}.tw\\:px-1\\.5{padding-inline:calc(calc(var(--spacing)) * 1.5)}.tw\\:px-2{padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:px-2\\.5{padding-inline:calc(calc(var(--spacing)) * 2.5)}.tw\\:px-3{padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:px-4{padding-inline:calc(calc(var(--spacing)) * 4)}.tw\\:px-6{padding-inline:calc(calc(var(--spacing)) * 6)}.tw\\:py-0{padding-block:calc(calc(var(--spacing)) * 0)}.tw\\:py-0\\.5{padding-block:calc(calc(var(--spacing)) * .5)}.tw\\:py-1{padding-block:calc(calc(var(--spacing)) * 1)}.tw\\:py-1\\.5{padding-block:calc(calc(var(--spacing)) * 1.5)}.tw\\:py-2{padding-block:calc(calc(var(--spacing)) * 2)}.tw\\:py-3{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:py-4{padding-block:calc(calc(var(--spacing)) * 4)}.tw\\:py-6{padding-block:calc(calc(var(--spacing)) * 6)}.tw\\:py-8{padding-block:calc(calc(var(--spacing)) * 8)}.tw\\:py-\\[2px\\]{padding-block:2px}.tw\\:ps-1\\.5{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:ps-2{padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:ps-2\\.5{padding-inline-start:calc(calc(var(--spacing)) * 2.5)}.tw\\:ps-4{padding-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:ps-7{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:ps-8{padding-inline-start:calc(calc(var(--spacing)) * 8)}.tw\\:ps-9{padding-inline-start:calc(calc(var(--spacing)) * 9)}.tw\\:ps-12{padding-inline-start:calc(calc(var(--spacing)) * 12)}.tw\\:ps-\\[85px\\]{padding-inline-start:85px}.tw\\:pe-1{padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:pe-1\\.5{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:pe-2{padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:pe-8{padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:pe-9{padding-inline-end:calc(calc(var(--spacing)) * 9)}.tw\\:pe-\\[calc\\(138px\\+1rem\\)\\]{padding-inline-end:calc(138px + 1rem)}.tw\\:pt-1{padding-top:calc(calc(var(--spacing)) * 1)}.tw\\:pt-2{padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:pt-3{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:pt-4{padding-top:calc(calc(var(--spacing)) * 4)}.tw\\:pt-6{padding-top:calc(calc(var(--spacing)) * 6)}.tw\\:\\!pr-10{padding-right:calc(calc(var(--spacing)) * 10)!important}.tw\\:pr-0{padding-right:calc(calc(var(--spacing)) * 0)}.tw\\:pr-3{padding-right:calc(calc(var(--spacing)) * 3)}.tw\\:pr-4{padding-right:calc(calc(var(--spacing)) * 4)}.tw\\:pb-0{padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:pb-1{padding-bottom:calc(calc(var(--spacing)) * 1)}.tw\\:pb-2{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:pb-3{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:pb-4{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:pb-8{padding-bottom:calc(calc(var(--spacing)) * 8)}.tw\\:pb-16{padding-bottom:calc(calc(var(--spacing)) * 16)}.tw\\:pb-24{padding-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:pl-2{padding-left:calc(calc(var(--spacing)) * 2)}.tw\\:pl-3{padding-left:calc(calc(var(--spacing)) * 3)}.tw\\:pl-4{padding-left:calc(calc(var(--spacing)) * 4)}.tw\\:pl-5{padding-left:calc(calc(var(--spacing)) * 5)}.tw\\:pl-6{padding-left:calc(calc(var(--spacing)) * 6)}.tw\\:pl-8{padding-left:calc(calc(var(--spacing)) * 8)}.tw\\:text-center{text-align:center}.tw\\:text-end{text-align:end}.tw\\:text-left{text-align:left}.tw\\:text-right{text-align:right}.tw\\:text-start{text-align:start}.tw\\:align-middle{vertical-align:middle}.tw\\:font-heading{font-family:var(--font-sans)}.tw\\:font-mono{font-family:var(--tw-font-mono)}.tw\\:font-sans{font-family:IBM Plex Sans Variable,sans-serif}.tw\\:text-2xl{font-size:var(--tw-text-2xl);line-height:var(--tw-leading,var(--tw-text-2xl--line-height))}.tw\\:text-3xl{font-size:var(--tw-text-3xl);line-height:var(--tw-leading,var(--tw-text-3xl--line-height))}.tw\\:text-4xl{font-size:var(--tw-text-4xl);line-height:var(--tw-leading,var(--tw-text-4xl--line-height))}.tw\\:text-base{font-size:var(--tw-text-base);line-height:var(--tw-leading,var(--tw-text-base--line-height))}.tw\\:text-lg{font-size:var(--tw-text-lg);line-height:var(--tw-leading,var(--tw-text-lg--line-height))}.tw\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:text-xl{font-size:var(--tw-text-xl);line-height:var(--tw-leading,var(--tw-text-xl--line-height))}.tw\\:text-xs{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:text-\\[0\\.8rem\\]{font-size:.8rem}.tw\\:leading-loose{--tw-leading:var(--tw-leading-loose);line-height:var(--tw-leading-loose)}.tw\\:leading-none{--tw-leading:1;line-height:1}.tw\\:leading-relaxed{--tw-leading:var(--tw-leading-relaxed);line-height:var(--tw-leading-relaxed)}.tw\\:leading-snug{--tw-leading:var(--tw-leading-snug);line-height:var(--tw-leading-snug)}.tw\\:leading-tight{--tw-leading:var(--tw-leading-tight);line-height:var(--tw-leading-tight)}.tw\\:font-bold{--tw-font-weight:var(--tw-font-weight-bold);font-weight:var(--tw-font-weight-bold)}.tw\\:font-extrabold{--tw-font-weight:var(--tw-font-weight-extrabold);font-weight:var(--tw-font-weight-extrabold)}.tw\\:font-medium{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:font-normal{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:font-semibold{--tw-font-weight:var(--tw-font-weight-semibold);font-weight:var(--tw-font-weight-semibold)}.tw\\:tracking-tight{--tw-tracking:var(--tw-tracking-tight);letter-spacing:var(--tw-tracking-tight)}.tw\\:tracking-wider{--tw-tracking:var(--tw-tracking-wider);letter-spacing:var(--tw-tracking-wider)}.tw\\:tracking-widest{--tw-tracking:var(--tw-tracking-widest);letter-spacing:var(--tw-tracking-widest)}.tw\\:text-balance{text-wrap:balance}.tw\\:text-nowrap{text-wrap:nowrap}.tw\\:break-words{overflow-wrap:break-word}.tw\\:text-clip{text-overflow:clip}.tw\\:text-ellipsis{text-overflow:ellipsis}.tw\\:whitespace-normal{white-space:normal}.tw\\:whitespace-nowrap{white-space:nowrap}.tw\\:\\[color\\:blue\\]{color:#00f}.tw\\:text-accent{color:var(--accent)}.tw\\:text-accent-foreground{color:var(--accent-foreground)}.tw\\:text-background{color:var(--background)}.tw\\:text-blue-400{color:var(--tw-color-blue-400)}.tw\\:text-blue-500{color:var(--tw-color-blue-500)}.tw\\:text-blue-600{color:var(--tw-color-blue-600)}.tw\\:text-blue-800{color:var(--tw-color-blue-800)}.tw\\:text-card{color:var(--card)}.tw\\:text-card-foreground{color:var(--card-foreground)}.tw\\:text-current{color:currentColor}.tw\\:text-destructive{color:var(--destructive)}.tw\\:text-destructive-foreground{color:var(--destructive-foreground)}.tw\\:text-foreground,.tw\\:text-foreground\\/30{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/30{color:color-mix(in oklab, var(--foreground) 30%, transparent)}}.tw\\:text-foreground\\/50{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/50{color:color-mix(in oklab, var(--foreground) 50%, transparent)}}.tw\\:text-foreground\\/60{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/60{color:color-mix(in oklab, var(--foreground) 60%, transparent)}}.tw\\:text-foreground\\/70{color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-foreground\\/70{color:color-mix(in oklab, var(--foreground) 70%, transparent)}}.tw\\:text-gray-300{color:var(--tw-color-gray-300)}.tw\\:text-gray-500{color:var(--tw-color-gray-500)}.tw\\:text-gray-600{color:var(--tw-color-gray-600)}.tw\\:text-gray-700{color:var(--tw-color-gray-700)}.tw\\:text-gray-800{color:var(--tw-color-gray-800)}.tw\\:text-green-600{color:var(--tw-color-green-600)}.tw\\:text-green-700{color:var(--tw-color-green-700)}.tw\\:text-green-800{color:var(--tw-color-green-800)}.tw\\:text-inherit{color:inherit}.tw\\:text-muted{color:var(--muted)}.tw\\:text-muted-foreground,.tw\\:text-muted-foreground\\/50{color:var(--muted-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-muted-foreground\\/50{color:color-mix(in oklab, var(--muted-foreground) 50%, transparent)}}.tw\\:text-orange-800{color:var(--tw-color-orange-800)}.tw\\:text-popover{color:var(--popover)}.tw\\:text-popover-foreground{color:var(--popover-foreground)}.tw\\:text-primary{color:var(--primary)}.tw\\:text-primary-foreground{color:var(--primary-foreground)}.tw\\:text-purple-900{color:var(--tw-color-purple-900)}.tw\\:text-red-500{color:var(--tw-color-red-500)}.tw\\:text-red-600{color:var(--tw-color-red-600)}.tw\\:text-red-700{color:var(--tw-color-red-700)}.tw\\:text-red-800{color:var(--tw-color-red-800)}.tw\\:text-rose-600{color:var(--tw-color-rose-600)}.tw\\:text-secondary{color:var(--secondary)}.tw\\:text-secondary-foreground{color:var(--secondary-foreground)}.tw\\:text-sidebar-accent-foreground{color:var(--sidebar-accent-foreground)}.tw\\:text-sidebar-foreground,.tw\\:text-sidebar-foreground\\/70{color:var(--sidebar-foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:text-sidebar-foreground\\/70{color:color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)}}.tw\\:text-sky-600{color:var(--tw-color-sky-600)}.tw\\:text-slate-900{color:var(--tw-color-slate-900)}.tw\\:text-teal-600{color:var(--tw-color-teal-600)}.tw\\:text-white{color:var(--tw-color-white)}.tw\\:text-yellow-400{color:var(--tw-color-yellow-400)}.tw\\:text-yellow-600{color:var(--tw-color-yellow-600)}.tw\\:text-yellow-700{color:var(--tw-color-yellow-700)}.tw\\:capitalize{text-transform:capitalize}.tw\\:uppercase{text-transform:uppercase}.tw\\:italic{font-style:italic}.tw\\:tabular-nums{--tw-numeric-spacing:tabular-nums;font-variant-numeric:var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)}.tw\\:line-through{text-decoration-line:line-through}.tw\\:underline{text-decoration-line:underline}.tw\\:decoration-destructive{-webkit-text-decoration-color:var(--destructive);-webkit-text-decoration-color:var(--destructive);text-decoration-color:var(--destructive)}.tw\\:underline-offset-4{text-underline-offset:4px}.tw\\:opacity-0{opacity:0}.tw\\:opacity-50{opacity:.5}.tw\\:opacity-60{opacity:.6}.tw\\:opacity-100{opacity:1}.tw\\:bg-blend-color{background-blend-mode:color}.tw\\:shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-\\[0_0_0_1px_var\\(--sidebar-border\\)\\]{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-border));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none{--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:shadow-none\\!{--tw-shadow:0 0 #0000!important;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)!important}.tw\\:shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-0{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-2{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:ring-background{--tw-ring-color:var(--background)}.tw\\:ring-foreground\\/10{--tw-ring-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-foreground\\/10{--tw-ring-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}.tw\\:ring-primary{--tw-ring-color:var(--primary)}.tw\\:ring-ring\\/50{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:ring-ring\\/50{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:ring-sidebar-ring{--tw-ring-color:var(--sidebar-ring)}.tw\\:ring-offset-2{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:ring-offset-background{--tw-ring-offset-color:var(--background)}.tw\\:outline-hidden{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:outline-hidden{outline-offset:2px;outline:2px solid #0000}}.tw\\:drop-shadow-sm{--tw-drop-shadow-size:drop-shadow(0 1px 2px var(--tw-drop-shadow-color,#00000026));--tw-drop-shadow:drop-shadow(var(--tw-drop-shadow-sm));filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.tw\\:transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[color\\,box-shadow\\]{transition-property:color,box-shadow;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[left\\,right\\,width\\]{transition-property:left,right,width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[margin\\,opacity\\]{transition-property:margin,opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\,height\\,padding\\]{transition-property:width,height,padding;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-\\[width\\]{transition-property:width;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:transition-none{transition-property:none}.tw\\:duration-100{--tw-duration:.1s;transition-duration:.1s}.tw\\:duration-200{--tw-duration:.2s;transition-duration:.2s}.tw\\:ease-linear{--tw-ease:linear;transition-timing-function:linear}.tw\\:prose-quoteless :where(blockquote p:first-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):before,.tw\\:prose-quoteless :where(blockquote p:last-of-type):not(:where([class~=not-prose],[class~=not-prose] *)):after{content:none}.tw\\:outline-none{--tw-outline-style:none;outline-style:none}.tw\\:select-none{-webkit-user-select:none;user-select:none}.tw\\:group-focus-within\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):focus-within *){opacity:1}@media (hover:hover){.tw\\:group-hover\\:visible:is(:where(.tw\\:group):hover *){visibility:visible}.tw\\:group-hover\\:hidden:is(:where(.tw\\:group):hover *){display:none}.tw\\:group-hover\\:opacity-100:is(:where(.tw\\:group):hover *),.tw\\:group-hover\\/menu-item\\:opacity-100:is(:where(.tw\\:group\\/menu-item):hover *){opacity:1}}.tw\\:group-focus\\/context-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/context-menu-item):focus *),.tw\\:group-focus\\/dropdown-menu-item\\:text-accent-foreground:is(:where(.tw\\:group\\/dropdown-menu-item):focus *),.tw\\:group-focus\\/menubar-item\\:text-accent-foreground:is(:where(.tw\\:group\\/menubar-item):focus *){color:var(--accent-foreground)}.tw\\:group-has-disabled\\/field\\:opacity-50:is(:where(.tw\\:group\\/field):has(:disabled) *){opacity:.5}.tw\\:group-has-data-\\[sidebar\\=menu-action\\]\\/menu-item\\:pe-8:is(:where(.tw\\:group\\/menu-item):has([data-sidebar=menu-action]) *){padding-inline-end:calc(calc(var(--spacing)) * 8)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:size-10:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *){width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:size-6:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *){width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:group-has-data-\\[slot\\=command-shortcut\\]\\/command-item\\:hidden:is(:where(.tw\\:group\\/command-item):has([data-slot=command-shortcut]) *){display:none}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pt-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-top:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>input\\]\\/input-group\\:pb-2:is(:where(.tw\\:group\\/input-group):has(>input) *){padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:group-has-\\[\\>svg\\]\\/alert\\:col-start-2:is(:where(.tw\\:group\\/alert):has(>svg) *){grid-column-start:2}.tw\\:group-data-\\[checked\\=true\\]\\/command-item\\:opacity-100:is(:where(.tw\\:group\\/command-item)[data-checked=true] *){opacity:1}.tw\\:group-data-\\[collapsible\\=icon\\]\\:-mt-8:is(:where(.tw\\:group)[data-collapsible=icon] *){margin-top:calc(calc(var(--spacing)) * -8)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){display:none}.tw\\:group-data-\\[collapsible\\=icon\\]\\:size-8\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(calc(var(--spacing)) * 8)!important;height:calc(calc(var(--spacing)) * 8)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\(--sidebar-width-icon\\):is(:where(.tw\\:group)[data-collapsible=icon] *){width:var(--sidebar-width-icon)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)))}.tw\\:group-data-\\[collapsible\\=icon\\]\\:w-\\[calc\\(var\\(--sidebar-width-icon\\)\\+\\(--spacing\\(4\\)\\)\\+2px\\)\\]:is(:where(.tw\\:group)[data-collapsible=icon] *){width:calc(var(--sidebar-width-icon) + (calc(calc(var(--spacing)) * 4)) + 2px)}.tw\\:group-data-\\[collapsible\\=icon\\]\\:overflow-hidden:is(:where(.tw\\:group)[data-collapsible=icon] *){overflow:hidden}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-0\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 0)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:p-2\\!:is(:where(.tw\\:group)[data-collapsible=icon] *){padding:calc(calc(var(--spacing)) * 2)!important}.tw\\:group-data-\\[collapsible\\=icon\\]\\:opacity-0:is(:where(.tw\\:group)[data-collapsible=icon] *){opacity:0}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){right:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\]:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){left:calc(var(--sidebar-width) * -1)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:w-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){width:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:translate-x-0:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:group-data-\\[disabled\\=true\\]\\:pointer-events-none:is(:where(.tw\\:group)[data-disabled=true] *){pointer-events:none}.tw\\:group-data-\\[disabled\\=true\\]\\:opacity-50:is(:where(.tw\\:group)[data-disabled=true] *),.tw\\:group-data-\\[disabled\\=true\\]\\/input-group\\:opacity-50:is(:where(.tw\\:group\\/input-group)[data-disabled=true] *){opacity:.5}.tw\\:group-data-\\[side\\=primary\\]\\:-right-4:is(:where(.tw\\:group)[data-side=primary] *){right:calc(calc(var(--spacing)) * -4)}.tw\\:group-data-\\[side\\=primary\\]\\:border-e:is(:where(.tw\\:group)[data-side=primary] *){border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}.tw\\:group-data-\\[side\\=secondary\\]\\:left-0:is(:where(.tw\\:group)[data-side=secondary] *){left:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-\\[side\\=secondary\\]\\:rotate-180:is(:where(.tw\\:group)[data-side=secondary] *){rotate:180deg}.tw\\:group-data-\\[side\\=secondary\\]\\:border-s:is(:where(.tw\\:group)[data-side=secondary] *){border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:size-2\\.5:is(:where(.tw\\:group\\/avatar)[data-size=default] *){width:calc(calc(var(--spacing)) * 2.5);height:calc(calc(var(--spacing)) * 2.5)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:size-4:is(:where(.tw\\:group\\/switch)[data-size=default] *){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:size-3:is(:where(.tw\\:group\\/avatar)[data-size=lg] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:text-xs:is(:where(.tw\\:group\\/avatar)[data-size=sm] *){font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:p-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:px-3:is(:where(.tw\\:group\\/card)[data-size=sm] *){padding-inline:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:text-sm:is(:where(.tw\\:group\\/card)[data-size=sm] *){font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:size-3:is(:where(.tw\\:group\\/switch)[data-size=sm] *){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:rounded-none:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){border-radius:0}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:px-2:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *){padding-inline:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[variant\\=floating\\]\\:rounded-lg:is(:where(.tw\\:group)[data-variant=floating] *){border-radius:var(--radius)}.tw\\:group-data-\\[variant\\=floating\\]\\:shadow-sm:is(:where(.tw\\:group)[data-variant=floating] *){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-1:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=floating\\]\\:ring-sidebar-border:is(:where(.tw\\:group)[data-variant=floating] *){--tw-ring-color:var(--sidebar-border)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *){background-color:#0000}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:mt-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){margin-top:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=bottom\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=bottom] *){text-align:center}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:me-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){margin-inline-end:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=left\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=left] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:my-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-block:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:ms-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){margin-inline-start:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:h-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){height:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=right\\]\\/drawer-content\\:w-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=right] *){width:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mx-auto:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-inline:auto}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:mb-4:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:block:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){display:block}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:h-1\\.5:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){height:calc(calc(var(--spacing)) * 1.5)}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:w-\\[100px\\]:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){width:100px}.tw\\:group-data-\\[vaul-drawer-direction\\=top\\]\\/drawer-content\\:text-center:is(:where(.tw\\:group\\/drawer-content)[data-vaul-drawer-direction=top] *){text-align:center}.tw\\:group-data-selected\\/command-item\\:text-foreground:is(:where(.tw\\:group\\/command-item):where([data-selected=true]) *){color:var(--foreground)}.tw\\:group-data-horizontal\\/tabs\\:h-8:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *){height:calc(calc(var(--spacing)) * 8)}.tw\\:group-data-vertical\\/tabs\\:h-fit:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){height:fit-content}.tw\\:group-data-vertical\\/tabs\\:w-full:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){width:100%}.tw\\:group-data-vertical\\/tabs\\:flex-col:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){flex-direction:column}.tw\\:group-data-vertical\\/tabs\\:justify-start:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *){justify-content:flex-start}@media (hover:hover){.tw\\:peer-hover\\/menu-button\\:text-sidebar-accent-foreground:is(:where(.tw\\:peer\\/menu-button):hover~*){color:var(--sidebar-accent-foreground)}.tw\\:peer-focus\\:group-hover\\:text-blue-500:is(:where(.tw\\:peer):focus~*):is(:where(.tw\\:group):hover *){color:var(--tw-color-blue-500)}}.tw\\:peer-disabled\\:cursor-not-allowed:is(:where(.tw\\:peer):disabled~*){cursor:not-allowed}.tw\\:peer-disabled\\:opacity-50:is(:where(.tw\\:peer):disabled~*){opacity:.5}.tw\\:peer-data-\\[size\\=default\\]\\/menu-button\\:top-1\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=default]~*){top:calc(calc(var(--spacing)) * 1.5)}.tw\\:peer-data-\\[size\\=lg\\]\\/menu-button\\:top-2\\.5:is(:where(.tw\\:peer\\/menu-button)[data-size=lg]~*){top:calc(calc(var(--spacing)) * 2.5)}.tw\\:peer-data-\\[size\\=sm\\]\\/menu-button\\:top-1:is(:where(.tw\\:peer\\/menu-button)[data-size=sm]~*){top:calc(calc(var(--spacing)) * 1)}.tw\\:peer-data-active\\/menu-button\\:text-sidebar-accent-foreground:is(:is(:where(.tw\\:peer\\/menu-button):where([data-state=active]),:where(.tw\\:peer\\/menu-button):where([data-active]:not([data-active=false])))~*){color:var(--sidebar-accent-foreground)}.tw\\:file\\:inline-flex::file-selector-button{display:inline-flex}.tw\\:file\\:h-6::file-selector-button{height:calc(calc(var(--spacing)) * 6)}.tw\\:file\\:border-0::file-selector-button{border-style:var(--tw-border-style);border-width:0}.tw\\:file\\:bg-transparent::file-selector-button{background-color:#0000}.tw\\:file\\:text-sm::file-selector-button{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:file\\:font-medium::file-selector-button{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:file\\:text-foreground::file-selector-button{color:var(--foreground)}.tw\\:placeholder\\:text-muted-foreground::placeholder{color:var(--muted-foreground)}.tw\\:before\\:pointer-events-none:before{content:var(--tw-content);pointer-events:none}.tw\\:before\\:absolute:before{content:var(--tw-content);position:absolute}.tw\\:before\\:inset-0:before{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:top-0\\.5:before{content:var(--tw-content);top:calc(calc(var(--spacing)) * .5)}.tw\\:before\\:left-0:before{content:var(--tw-content);left:calc(calc(var(--spacing)) * 0)}.tw\\:before\\:-z-1:before{content:var(--tw-content);z-index:calc(1 * -1)}.tw\\:before\\:block:before{content:var(--tw-content);display:block}.tw\\:before\\:hidden:before{content:var(--tw-content);display:none}.tw\\:before\\:h-4:before{content:var(--tw-content);height:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:w-4:before{content:var(--tw-content);width:calc(calc(var(--spacing)) * 4)}.tw\\:before\\:cursor-pointer:before{content:var(--tw-content);cursor:pointer}.tw\\:before\\:rounded:before{content:var(--tw-content);border-radius:.25rem}.tw\\:before\\:rounded-\\[inherit\\]:before{content:var(--tw-content);border-radius:inherit}.tw\\:before\\:border:before{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:before\\:border-primary:before{content:var(--tw-content);border-color:var(--primary)}.tw\\:before\\:bg-primary:before{content:var(--tw-content);background-color:var(--primary)}.tw\\:before\\:bg-cover:before{content:var(--tw-content);background-size:cover}.tw\\:before\\:bg-no-repeat:before{content:var(--tw-content);background-repeat:no-repeat}.tw\\:before\\:backdrop-blur-2xl:before{content:var(--tw-content);--tw-backdrop-blur:blur(var(--tw-blur-2xl));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:backdrop-saturate-150:before{content:var(--tw-content);--tw-backdrop-saturate:saturate(150%);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.tw\\:before\\:content-\\[\\"\\"\\]:before{--tw-content:"";content:var(--tw-content)}.tw\\:before\\:content-\\[\\\\\\"\\\\\\"\\]:before{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:after\\:absolute:after{content:var(--tw-content);position:absolute}.tw\\:after\\:-inset-2:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-0:after{content:var(--tw-content);inset:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:-inset-x-3:after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * -3)}.tw\\:after\\:-inset-y-2:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * -2)}.tw\\:after\\:inset-y-0:after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:after\\:start-1\\/2:after{content:var(--tw-content);inset-inline-start:50%}.tw\\:after\\:top-\\[6px\\]:after{content:var(--tw-content);top:6px}.tw\\:after\\:right-\\[7px\\]:after{content:var(--tw-content);right:7px}.tw\\:after\\:left-\\[7px\\]:after{content:var(--tw-content);left:7px}.tw\\:after\\:block:after{content:var(--tw-content);display:block}.tw\\:after\\:hidden:after{content:var(--tw-content);display:none}.tw\\:after\\:h-0\\.5:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:after\\:h-\\[6px\\]:after{content:var(--tw-content);height:6px}.tw\\:after\\:w-1:after{content:var(--tw-content);width:calc(calc(var(--spacing)) * 1)}.tw\\:after\\:w-\\[2px\\]:after{content:var(--tw-content);width:2px}.tw\\:after\\:w-\\[3px\\]:after{content:var(--tw-content);width:3px}.tw\\:after\\:-translate-x-1\\/2:after{content:var(--tw-content);--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:after\\:rotate-45:after{content:var(--tw-content);rotate:45deg}.tw\\:after\\:cursor-pointer:after{content:var(--tw-content);cursor:pointer}.tw\\:after\\:rounded-full:after{content:var(--tw-content);border-radius:3.40282e38px}.tw\\:after\\:border:after{content:var(--tw-content);border-style:var(--tw-border-style);border-width:1px}.tw\\:after\\:border-t-0:after{content:var(--tw-content);border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:after\\:border-r-2:after{content:var(--tw-content);border-right-style:var(--tw-border-style);border-right-width:2px}.tw\\:after\\:border-b-2:after{content:var(--tw-content);border-bottom-style:var(--tw-border-style);border-bottom-width:2px}.tw\\:after\\:border-l-0:after{content:var(--tw-content);border-left-style:var(--tw-border-style);border-left-width:0}.tw\\:after\\:border-solid:after{content:var(--tw-content);--tw-border-style:solid;border-style:solid}.tw\\:after\\:border-border:after{content:var(--tw-content);border-color:var(--border)}.tw\\:after\\:border-white:after{content:var(--tw-content);border-color:var(--tw-color-white)}.tw\\:after\\:bg-foreground:after{content:var(--tw-content);background-color:var(--foreground)}.tw\\:after\\:bg-muted:after{content:var(--tw-content);background-color:var(--muted)}.tw\\:after\\:opacity-0:after{content:var(--tw-content);opacity:0}.tw\\:after\\:mix-blend-darken:after{content:var(--tw-content);mix-blend-mode:darken}.tw\\:after\\:transition-opacity:after{content:var(--tw-content);transition-property:opacity;transition-timing-function:var(--tw-ease,var(--tw-default-transition-timing-function));transition-duration:var(--tw-duration,var(--tw-default-transition-duration))}.tw\\:after\\:content-\\[\\"\\"\\]:after{--tw-content:"";content:var(--tw-content)}.tw\\:after\\:content-\\[\\\\\\"\\\\\\"\\]:after{--tw-content:\\"\\";content:var(--tw-content)}.tw\\:group-data-\\[collapsible\\=offcanvas\\]\\:after\\:start-full:is(:where(.tw\\:group)[data-collapsible=offcanvas] *):after{content:var(--tw-content);inset-inline-start:100%}.tw\\:group-data-horizontal\\/tabs\\:after\\:inset-x-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-horizontal\\/tabs\\:after\\:bottom-\\[-5px\\]:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);bottom:-5px}.tw\\:group-data-horizontal\\/tabs\\:after\\:h-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=horizontal]) *):after{content:var(--tw-content);height:calc(calc(var(--spacing)) * .5)}.tw\\:group-data-vertical\\/tabs\\:after\\:inset-y-0:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:group-data-vertical\\/tabs\\:after\\:-end-1:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);inset-inline-end:calc(calc(var(--spacing)) * -1)}.tw\\:group-data-vertical\\/tabs\\:after\\:w-0\\.5:is(:where(.tw\\:group\\/tabs):where([data-orientation=vertical]) *):after{content:var(--tw-content);width:calc(calc(var(--spacing)) * .5)}.tw\\:first\\:mt-0:first-child{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:even\\:bg-muted:nth-child(2n){background-color:var(--muted)}@media (hover:hover){.tw\\:hover\\:-mt-4:hover{margin-top:calc(calc(var(--spacing)) * -4)}.tw\\:hover\\:cursor-pointer:hover{cursor:pointer}.tw\\:hover\\:bg-accent:hover{background-color:var(--accent)}.tw\\:hover\\:bg-blue-600:hover{background-color:var(--tw-color-blue-600)}.tw\\:hover\\:bg-destructive\\/20:hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-destructive\\/20:hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:hover\\:bg-gray-50:hover{background-color:var(--tw-color-gray-50)}.tw\\:hover\\:bg-input:hover{background-color:var(--input)}.tw\\:hover\\:bg-muted:hover,.tw\\:hover\\:bg-muted\\/50:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/50:hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:hover\\:bg-muted\\/80:hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-muted\\/80:hover{background-color:color-mix(in oklab, var(--muted) 80%, transparent)}}.tw\\:hover\\:bg-primary\\/10:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/10:hover{background-color:color-mix(in oklab, var(--primary) 10%, transparent)}}.tw\\:hover\\:bg-primary\\/70:hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-primary\\/70:hover{background-color:color-mix(in oklab, var(--primary) 70%, transparent)}}.tw\\:hover\\:bg-red-500:hover{background-color:var(--tw-color-red-500)}.tw\\:hover\\:bg-secondary:hover,.tw\\:hover\\:bg-secondary\\/80:hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:hover\\:bg-secondary\\/80:hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:hover\\:bg-sidebar-accent:hover{background-color:var(--sidebar-accent)}.tw\\:hover\\:bg-transparent:hover{background-color:#0000}.tw\\:hover\\:text-foreground:hover{color:var(--foreground)}.tw\\:hover\\:text-muted-foreground:hover{color:var(--muted-foreground)}.tw\\:hover\\:text-primary-foreground:hover{color:var(--primary-foreground)}.tw\\:hover\\:text-sidebar-accent-foreground:hover{color:var(--sidebar-accent-foreground)}.tw\\:hover\\:underline:hover{text-decoration-line:underline}.tw\\:hover\\:opacity-80:hover{opacity:.8}.tw\\:hover\\:opacity-100:hover{opacity:1}.tw\\:hover\\:shadow-\\[0_0_0_1px_var\\(--sidebar-accent\\)\\]:hover{--tw-shadow:0 0 0 1px var(--tw-shadow-color,var(--sidebar-accent));box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:shadow-md:hover{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:ring-3:hover{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:hover\\:group-data-\\[collapsible\\=offcanvas\\]\\:bg-sidebar:hover:is(:where(.tw\\:group)[data-collapsible=offcanvas] *){background-color:var(--sidebar)}.tw\\:hover\\:after\\:bg-sidebar-border:hover:after{content:var(--tw-content);background-color:var(--sidebar-border)}}.tw\\:focus\\:relative:focus{position:relative}.tw\\:focus\\:z-10:focus{z-index:10}.tw\\:focus\\:bg-accent:focus{background-color:var(--accent)}.tw\\:focus\\:bg-muted:focus{background-color:var(--muted)}.tw\\:focus\\:text-accent-foreground:focus{color:var(--accent-foreground)}.tw\\:focus\\:text-foreground:focus{color:var(--foreground)}.tw\\:focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus\\:ring-ring:focus{--tw-ring-color:var(--ring)}.tw\\:focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus\\:ring-offset-background:focus{--tw-ring-offset-color:var(--background)}.tw\\:focus\\:outline-hidden:focus{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus\\:outline-hidden:focus{outline-offset:2px;outline:2px solid #0000}}:is(.tw\\:focus\\:\\*\\*\\:text-accent-foreground:focus *),:is(.tw\\:not-data-\\[variant\\=destructive\\]\\:focus\\:\\*\\*\\:text-accent-foreground:not([data-variant=destructive]):focus *){color:var(--accent-foreground)}.tw\\:focus-visible\\:relative:focus-visible{position:relative}.tw\\:focus-visible\\:z-10:focus-visible{z-index:10}.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:border-destructive\\/40:focus-visible{border-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:focus-visible\\:border-ring:focus-visible{border-color:var(--ring)}.tw\\:focus-visible\\:ring-0:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-1:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-3:focus-visible,.tw\\:focus-visible\\:ring-\\[3px\\]:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:focus-visible\\:ring-\\[color\\:hsl\\(240\\,5\\%\\,64\\.9\\%\\)\\]:focus-visible{--tw-ring-color:#a1a1aa}.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-destructive\\/20:focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:focus-visible\\:ring-ring:focus-visible,.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:focus-visible\\:ring-ring\\/50:focus-visible{--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:focus-visible\\:ring-offset-2:focus-visible{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)}.tw\\:focus-visible\\:outline-hidden:focus-visible{--tw-outline-style:none;outline-style:none}@media (forced-colors:active){.tw\\:focus-visible\\:outline-hidden:focus-visible{outline-offset:2px;outline:2px solid #0000}}.tw\\:focus-visible\\:outline-1:focus-visible{outline-style:var(--tw-outline-style);outline-width:1px}.tw\\:focus-visible\\:outline-ring:focus-visible{outline-color:var(--ring)}:is(.tw\\:\\*\\:focus-visible\\:relative>*):focus-visible{position:relative}:is(.tw\\:\\*\\:focus-visible\\:z-10>*):focus-visible{z-index:10}.tw\\:active\\:bg-sidebar-accent:active{background-color:var(--sidebar-accent)}.tw\\:active\\:text-sidebar-accent-foreground:active{color:var(--sidebar-accent-foreground)}.tw\\:active\\:ring-3:active{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:active\\:not-aria-\\[haspopup\\]\\:translate-y-px:active:not([aria-haspopup]){--tw-translate-y:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:disabled\\:pointer-events-none:disabled{pointer-events:none}.tw\\:disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.tw\\:disabled\\:bg-input\\/50:disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:disabled\\:bg-input\\/50:disabled{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:disabled\\:bg-transparent:disabled{background-color:#0000}.tw\\:disabled\\:opacity-50:disabled{opacity:.5}:where([data-side=primary]) .tw\\:in-data-\\[side\\=primary\\]\\:cursor-w-resize{cursor:w-resize}:where([data-side=secondary]) .tw\\:in-data-\\[side\\=secondary\\]\\:cursor-e-resize{cursor:e-resize}:where([data-slot=button-group]) .tw\\:in-data-\\[slot\\=button-group\\]\\:rounded-lg{border-radius:var(--radius)}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:border-inherit:focus-within{border-color:inherit}:where([data-slot=combobox-content]) .tw\\:in-data-\\[slot\\=combobox-content\\]\\:focus-within\\:ring-0:focus-within{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:where([data-slot=dialog-content]) .tw\\:in-data-\\[slot\\=dialog-content\\]\\:rounded-lg\\!{border-radius:var(--radius)!important}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/20{background-color:color-mix(in oklab, var(--background) 20%, transparent)}}:where([data-slot=tooltip-content]) .tw\\:in-data-\\[slot\\=tooltip-content\\]\\:text-background{color:var(--background)}.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-disabled\\:bg-input\\/50:has(:disabled){background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:has-disabled\\:opacity-50:has(:disabled){opacity:.5}.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-aria-expanded\\:bg-muted\\/50:has([aria-expanded=true]){background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-end\\]\\:pe-2:has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-end\\]\\:pe-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-end]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[icon\\=inline-start\\]\\:ps-2:has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[spacing\\=0\\]\\/toggle-group\\:has-data-\\[icon\\=inline-start\\]\\:ps-1\\.5:is(:where(.tw\\:group\\/toggle-group)[data-spacing="0"] *):has([data-icon=inline-start]){padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[slot\\=alert-action\\]\\:relative:has([data-slot=alert-action]){position:relative}.tw\\:has-data-\\[slot\\=alert-action\\]\\:pe-18:has([data-slot=alert-action]){padding-inline-end:calc(calc(var(--spacing)) * 18)}.tw\\:has-data-\\[slot\\=card-action\\]\\:grid-cols-\\[1fr_auto\\]:has([data-slot=card-action]){grid-template-columns:1fr auto}.tw\\:has-data-\\[slot\\=card-description\\]\\:grid-rows-\\[auto_auto\\]:has([data-slot=card-description]){grid-template-rows:auto auto}.tw\\:has-data-\\[slot\\=card-footer\\]\\:pb-0:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}.tw\\:has-data-\\[slot\\=kbd\\]\\:pe-1\\.5:has([data-slot=kbd]){padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-data-\\[variant\\=inset\\]\\:bg-sidebar:has([data-variant=inset]){background-color:var(--sidebar)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:border-ring:has([data-slot=input-group-control]:focus-visible){border-color:var(--ring)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-3:has([data-slot=input-group-control]:focus-visible){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:var(--ring)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\=input-group-control\\]\\:focus-visible\\]\\:ring-ring\\/50:has([data-slot=input-group-control]:focus-visible){--tw-ring-color:color-mix(in oklab, var(--ring) 50%, transparent)}}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:border-destructive:has([data-slot][aria-invalid=true]){border-color:var(--destructive)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-3:has([data-slot][aria-invalid=true]){--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/20:has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:h-auto:has(>[data-align=block-end]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:flex-col:has(>[data-align=block-end]){flex-direction:column}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:h-auto:has(>[data-align=block-start]){height:auto}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:flex-col:has(>[data-align=block-start]){flex-direction:column}.tw\\:has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:gap-2:has(>[data-slot=button-group]){gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>button\\]\\:ms-\\[-0\\.3rem\\]:has(>button){margin-inline-start:-.3rem}.tw\\:has-\\[\\>button\\]\\:me-\\[-0\\.3rem\\]:has(>button){margin-inline-end:-.3rem}.tw\\:has-\\[\\>img\\]\\:grid-cols-\\[auto_1fr\\]:has(>img){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>img\\]\\:gap-x-2:has(>img){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>img\\:first-child\\]\\:pt-0:has(>img:first-child){padding-top:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>kbd\\]\\:ms-\\[-0\\.15rem\\]:has(>kbd){margin-inline-start:-.15rem}.tw\\:has-\\[\\>kbd\\]\\:me-\\[-0\\.15rem\\]:has(>kbd){margin-inline-end:-.15rem}.tw\\:has-\\[\\>svg\\]\\:grid-cols-\\[auto_1fr\\]:has(>svg){grid-template-columns:auto 1fr}.tw\\:has-\\[\\>svg\\]\\:gap-x-2:has(>svg){column-gap:calc(calc(var(--spacing)) * 2)}.tw\\:has-\\[\\>svg\\]\\:p-0:has(>svg){padding:calc(calc(var(--spacing)) * 0)}.tw\\:has-\\[\\>textarea\\]\\:h-auto:has(>textarea){height:auto}.tw\\:aria-disabled\\:pointer-events-none[aria-disabled=true]{pointer-events:none}.tw\\:aria-disabled\\:opacity-50[aria-disabled=true]{opacity:.5}.tw\\:aria-expanded\\:bg-muted[aria-expanded=true]{background-color:var(--muted)}.tw\\:aria-expanded\\:bg-secondary[aria-expanded=true]{background-color:var(--secondary)}.tw\\:aria-expanded\\:text-foreground[aria-expanded=true]{color:var(--foreground)}.tw\\:aria-expanded\\:text-secondary-foreground[aria-expanded=true]{color:var(--secondary-foreground)}.tw\\:aria-expanded\\:opacity-100[aria-expanded=true]{opacity:1}.tw\\:aria-invalid\\:border-destructive[aria-invalid=true]{border-color:var(--destructive)}.tw\\:aria-invalid\\:ring-0[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-3[aria-invalid=true]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:aria-invalid\\:ring-destructive\\/20[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:aria-invalid\\:aria-checked\\:border-primary[aria-invalid=true][aria-checked=true]{border-color:var(--primary)}.tw\\:aria-pressed\\:bg-muted[aria-pressed=true]{background-color:var(--muted)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:h-px[aria-orientation=horizontal]{height:1px}.tw\\:aria-\\[orientation\\=horizontal\\]\\:w-full[aria-orientation=horizontal]{width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:start-0[aria-orientation=horizontal]:after{content:var(--tw-content);inset-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:h-1[aria-orientation=horizontal]:after{content:var(--tw-content);height:calc(calc(var(--spacing)) * 1)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:w-full[aria-orientation=horizontal]:after{content:var(--tw-content);width:100%}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:translate-x-0[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-y-1\\/2[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-y:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:aria-\\[orientation\\=vertical\\]\\:flex-col[aria-orientation=vertical]{flex-direction:column}.tw\\:data-inset\\:ps-7[data-inset]{padding-inline-start:calc(calc(var(--spacing)) * 7)}.tw\\:data-placeholder\\:text-muted-foreground[data-placeholder]{color:var(--muted-foreground)}.tw\\:data-\\[align-trigger\\=false\\]\\:min-w-36[data-align-trigger=false]{min-width:calc(calc(var(--spacing)) * 36)}.tw\\:data-\\[align-trigger\\=true\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-align-trigger=true]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[align-trigger\\=true\\]\\:animate-none[data-align-trigger=true]{animation:none}.tw\\:data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled=true]{pointer-events:none}.tw\\:data-\\[disabled\\=true\\]\\:opacity-50[data-disabled=true]{opacity:.5}.tw\\:data-\\[position\\=popper\\]\\:h-\\(--radix-select-trigger-height\\)[data-position=popper]{height:var(--radix-select-trigger-height)}.tw\\:data-\\[position\\=popper\\]\\:w-full[data-position=popper]{width:100%}.tw\\:data-\\[position\\=popper\\]\\:min-w-\\(--radix-select-trigger-width\\)[data-position=popper]{min-width:var(--radix-select-trigger-width)}.tw\\:data-\\[side\\=bottom\\]\\:translate-y-1[data-side=bottom]{--tw-translate-y:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=bottom\\]\\:slide-in-from-top-2[data-side=bottom]{--tw-enter-translate-y:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=left\\]\\:-translate-x-1[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=left\\]\\:slide-in-from-right-2[data-side=left]{--tw-enter-translate-x:calc(2*var(--spacing))}.tw\\:data-\\[side\\=right\\]\\:translate-x-1[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=right\\]\\:slide-in-from-left-2[data-side=right]{--tw-enter-translate-x:calc(2*var(--spacing)*-1)}.tw\\:data-\\[side\\=top\\]\\:-translate-y-1[data-side=top]{--tw-translate-y:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:data-\\[side\\=top\\]\\:slide-in-from-bottom-2[data-side=top]{--tw-enter-translate-y:calc(2*var(--spacing))}.tw\\:data-\\[size\\=default\\]\\:h-8[data-size=default]{height:calc(calc(var(--spacing)) * 8)}.tw\\:data-\\[size\\=default\\]\\:h-\\[18\\.4px\\][data-size=default]{height:18.4px}.tw\\:data-\\[size\\=default\\]\\:w-\\[32px\\][data-size=default]{width:32px}.tw\\:data-\\[size\\=lg\\]\\:size-10[data-size=lg]{width:calc(calc(var(--spacing)) * 10);height:calc(calc(var(--spacing)) * 10)}.tw\\:data-\\[size\\=md\\]\\:text-sm[data-size=md]{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:data-\\[size\\=sm\\]\\:size-6[data-size=sm]{width:calc(calc(var(--spacing)) * 6);height:calc(calc(var(--spacing)) * 6)}.tw\\:data-\\[size\\=sm\\]\\:h-7[data-size=sm]{height:calc(calc(var(--spacing)) * 7)}.tw\\:data-\\[size\\=sm\\]\\:h-\\[14px\\][data-size=sm]{height:14px}.tw\\:data-\\[size\\=sm\\]\\:w-\\[24px\\][data-size=sm]{width:24px}.tw\\:data-\\[size\\=sm\\]\\:gap-3[data-size=sm]{gap:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:rounded-\\[min\\(var\\(--tw-radius-md\\)\\,10px\\)\\][data-size=sm]{border-radius:min(var(--tw-radius-md), 10px)}.tw\\:data-\\[size\\=sm\\]\\:py-3[data-size=sm]{padding-block:calc(calc(var(--spacing)) * 3)}.tw\\:data-\\[size\\=sm\\]\\:text-xs[data-size=sm]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}.tw\\:data-\\[size\\=sm\\]\\:has-data-\\[slot\\=card-footer\\]\\:pb-0[data-size=sm]:has([data-slot=card-footer]){padding-bottom:calc(calc(var(--spacing)) * 0)}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-item]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-item\\]\\:data-highlighted\\:bg-foreground\\/10 *)[data-slot$=-item][data-highlighted]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-separator\\]\\:bg-foreground\\/5 *)[data-slot$=-separator]{background-color:color-mix(in oklab, var(--foreground) 5%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:var(--foreground)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:focus\\:bg-foreground\\/10 *)[data-slot$=-trigger]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)}}:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[slot\\$\\=-trigger\\]\\:aria-expanded\\:bg-foreground\\/10\\! *)[data-slot$=-trigger][aria-expanded=true]{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\:data-\\[slot\\=alert-description\\]\\:text-destructive\\/90>*)[data-slot=alert-description]{color:color-mix(in oklab, var(--destructive) 90%, transparent)}}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-2>*)[data-slot=avatar]{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:\\*\\:data-\\[slot\\=avatar\\]\\:ring-background>*)[data-slot=avatar]{--tw-ring-color:var(--background)}:is(.tw\\:\\*\\:data-\\[slot\\=input-group-addon\\]\\:ps-2\\!>*)[data-slot=input-group-addon]{padding-inline-start:calc(calc(var(--spacing)) * 2)!important}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:relative *)[data-slot=kbd]{position:relative}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:isolate *)[data-slot=kbd]{isolation:isolate}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:z-50 *)[data-slot=kbd]{z-index:50}:is(.tw\\:\\*\\*\\:data-\\[slot\\=kbd\\]\\:rounded-sm *)[data-slot=kbd]{border-radius:calc(var(--radius) * .6)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1>*)[data-slot=select-value]{-webkit-line-clamp:1;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex>*)[data-slot=select-value]{display:flex}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:flex-1>*)[data-slot=select-value]{flex:1}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:items-center>*)[data-slot=select-value]{align-items:center}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:gap-1\\.5>*)[data-slot=select-value]{gap:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\:data-\\[slot\\=select-value\\]\\:text-start>*)[data-slot=select-value]{text-align:start}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-s-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:first-child{border-start-start-radius:var(--radius);border-end-start-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:first\\:rounded-t-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-e-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"]:last-child{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:last\\:rounded-b-lg:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"]:last-child{border-bottom-right-radius:var(--radius);border-bottom-left-radius:var(--radius)}.tw\\:data-\\[state\\=active\\]\\:bg-background[data-state=active]{background-color:var(--background)}.tw\\:data-\\[state\\=active\\]\\:text-foreground[data-state=active]{color:var(--foreground)}.tw\\:data-\\[state\\=active\\]\\:shadow-sm[data-state=active]{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:data-\\[state\\=closed\\]\\:overflow-hidden[data-state=closed]{overflow:hidden}.tw\\:data-\\[state\\=delayed-open\\]\\:animate-in[data-state=delayed-open]{animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-\\[state\\=delayed-open\\]\\:fade-in-0[data-state=delayed-open]{--tw-enter-opacity:0}.tw\\:data-\\[state\\=delayed-open\\]\\:zoom-in-95[data-state=delayed-open]{--tw-enter-scale:.95}.tw\\:data-\\[state\\=on\\]\\:bg-muted[data-state=on],.tw\\:data-\\[state\\=open\\]\\:bg-muted[data-state=open]{background-color:var(--muted)}.tw\\:data-\\[state\\=open\\]\\:text-foreground[data-state=open]{color:var(--foreground)}.tw\\:data-\\[state\\=selected\\]\\:bg-muted[data-state=selected]{background-color:var(--muted)}.tw\\:data-\\[variant\\=destructive\\]\\:text-destructive[data-variant=destructive]{color:var(--destructive)}:is(:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:\\*\\*\\:text-accent-foreground\\! *)[data-variant=destructive] *),:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:text-accent-foreground\\! *)[data-variant=destructive]{color:var(--accent-foreground)!important}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/10[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 10%, transparent)}}.tw\\:data-\\[variant\\=destructive\\]\\:focus\\:text-destructive[data-variant=destructive]:focus{color:var(--destructive)}:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:var(--foreground)!important}@supports (color:color-mix(in lab, red, red)){:is(.tw\\:\\*\\*\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-foreground\\/10\\! *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--foreground) 10%, transparent)!important}}.tw\\:data-\\[variant\\=line\\]\\:rounded-none[data-variant=line]{border-radius:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-s-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:border-t-0:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]{border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:group-data-horizontal\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-s:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=horizontal]) *)[data-spacing="0"][data-variant=outline]:first-child{border-inline-start-style:var(--tw-border-style);border-inline-start-width:1px}.tw\\:group-data-vertical\\/toggle-group\\:data-\\[spacing\\=0\\]\\:data-\\[variant\\=outline\\]\\:first\\:border-t:is(:where(.tw\\:group\\/toggle-group):where([data-orientation=vertical]) *)[data-spacing="0"][data-variant=outline]:first-child{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:inset-x-0[data-vaul-drawer-direction=bottom]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:bottom-0[data-vaul-drawer-direction=bottom]{bottom:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:mt-24[data-vaul-drawer-direction=bottom]{margin-top:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=bottom]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:rounded-t-xl[data-vaul-drawer-direction=bottom]{border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=bottom\\]\\:border-t[data-vaul-drawer-direction=bottom]{border-top-style:var(--tw-border-style);border-top-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:inset-y-0[data-vaul-drawer-direction=left]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:left-0[data-vaul-drawer-direction=left]{left:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:w-3\\/4[data-vaul-drawer-direction=left]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:flex-row[data-vaul-drawer-direction=left]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:rounded-r-xl[data-vaul-drawer-direction=left]{border-top-right-radius:calc(var(--radius) * 1.4);border-bottom-right-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:border-r[data-vaul-drawer-direction=left]{border-right-style:var(--tw-border-style);border-right-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=left\\/right\\]\\:flex-row[data-vaul-drawer-direction=left\\/right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:inset-y-0[data-vaul-drawer-direction=right]{inset-block:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:right-0[data-vaul-drawer-direction=right]{right:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:w-3\\/4[data-vaul-drawer-direction=right]{width:75%}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:flex-row[data-vaul-drawer-direction=right]{flex-direction:row}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:rounded-l-xl[data-vaul-drawer-direction=right]{border-top-left-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:border-l[data-vaul-drawer-direction=right]{border-left-style:var(--tw-border-style);border-left-width:1px}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:inset-x-0[data-vaul-drawer-direction=top]{inset-inline:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:top-0[data-vaul-drawer-direction=top]{top:calc(calc(var(--spacing)) * 0)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:mb-24[data-vaul-drawer-direction=top]{margin-bottom:calc(calc(var(--spacing)) * 24)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:max-h-\\[80vh\\][data-vaul-drawer-direction=top]{max-height:80vh}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:rounded-b-xl[data-vaul-drawer-direction=top]{border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}.tw\\:data-\\[vaul-drawer-direction\\=top\\]\\:border-b[data-vaul-drawer-direction=top]{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}@supports ((-webkit-backdrop-filter:var(--tw)) or (backdrop-filter:var(--tw))){.tw\\:supports-backdrop-filter\\:backdrop-blur-xs{--tw-backdrop-blur:blur(var(--tw-blur-xs));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}}@media (min-width:40rem){.tw\\:sm\\:flex{display:flex}.tw\\:sm\\:max-w-sm{max-width:var(--tw-container-sm)}.tw\\:sm\\:flex-row{flex-direction:row}.tw\\:sm\\:justify-end{justify-content:flex-end}.tw\\:sm\\:p-8{padding:calc(calc(var(--spacing)) * 8)}.tw\\:sm\\:text-start{text-align:start}.tw\\:data-\\[vaul-drawer-direction\\=left\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=left],.tw\\:data-\\[vaul-drawer-direction\\=right\\]\\:sm\\:max-w-sm[data-vaul-drawer-direction=right]{max-width:var(--tw-container-sm)}}@media (min-width:48rem){.tw\\:md\\:block{display:block}.tw\\:md\\:flex{display:flex}.tw\\:md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.tw\\:md\\:gap-0\\.5{gap:calc(calc(var(--spacing)) * .5)}.tw\\:md\\:text-start{text-align:start}.tw\\:md\\:text-sm{font-size:var(--tw-text-sm);line-height:var(--tw-leading,var(--tw-text-sm--line-height))}.tw\\:md\\:text-pretty{text-wrap:pretty}.tw\\:md\\:opacity-0{opacity:0}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:m-2:is(:where(.tw\\:peer)[data-variant=inset]~*){margin:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:ms-0:is(:where(.tw\\:peer)[data-variant=inset]~*){margin-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:rounded-xl:is(:where(.tw\\:peer)[data-variant=inset]~*){border-radius:calc(var(--radius) * 1.4)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:shadow-sm:is(:where(.tw\\:peer)[data-variant=inset]~*){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:md\\:peer-data-\\[variant\\=inset\\]\\:peer-data-\\[state\\=collapsed\\]\\:ms-2:is(:where(.tw\\:peer)[data-variant=inset]~*):is(:where(.tw\\:peer)[data-state=collapsed]~*){margin-inline-start:calc(calc(var(--spacing)) * 2)}.tw\\:md\\:after\\:hidden:after{content:var(--tw-content);display:none}}@media (min-width:64rem){.tw\\:lg\\:flex{display:flex}.tw\\:lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}:where(.tw\\:lg\\:space-x-8>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(calc(var(--spacing)) * 8) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(calc(var(--spacing)) * 8) * calc(1 - var(--tw-space-x-reverse)))}.tw\\:lg\\:text-5xl{font-size:var(--tw-text-5xl);line-height:var(--tw-leading,var(--tw-text-5xl--line-height))}}@media (min-width:48rem){@media (min-width:64rem){.tw\\:md\\:lg\\:hidden{display:none}}}@container (min-width:24rem){.tw\\:\\@sm\\:basis-auto{flex-basis:auto}}.tw\\:ltr\\:-translate-x-1\\/2:where(:dir(ltr),[dir=ltr],[dir=ltr] *){--tw-translate-x:calc(calc(1 / 2 * 100%) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:flex:where(:dir(rtl),[dir=rtl],[dir=rtl] *){display:flex}.tw\\:rtl\\:-translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:-1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:translate-x-px:where(:dir(rtl),[dir=rtl],[dir=rtl] *){--tw-translate-x:1px;translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:after\\:translate-x-1\\/2:where(:dir(rtl),[dir=rtl],[dir=rtl] *):after{content:var(--tw-content);--tw-translate-x:calc(1 / 2 * 100%);translate:var(--tw-translate-x) var(--tw-translate-y)}:where([data-side=primary]) .tw\\:rtl\\:in-data-\\[side\\=primary\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}:where([data-side=secondary]) .tw\\:rtl\\:in-data-\\[side\\=secondary\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}.tw\\:rtl\\:aria-\\[orientation\\=horizontal\\]\\:after\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[aria-orientation=horizontal]:after{content:var(--tw-content);--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=left\\]\\:translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=left]{--tw-translate-x:calc(calc(var(--spacing)) * 1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:data-\\[side\\=right\\]\\:-translate-x-1:where(:dir(rtl),[dir=rtl],[dir=rtl] *)[data-side=right]{--tw-translate-x:calc(calc(var(--spacing)) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:border-input:is(.dark *){border-color:var(--input)}.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-destructive\\/20:is(.dark *){background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:bg-input\\/30:is(.dark *){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:bg-transparent:is(.dark *){background-color:#0000}.tw\\:dark\\:text-muted-foreground:is(.dark *){color:var(--muted-foreground)}.tw\\:dark\\:text-rose-400:is(.dark *){color:var(--tw-color-rose-400)}.tw\\:dark\\:text-sky-400:is(.dark *){color:var(--tw-color-sky-400)}.tw\\:dark\\:text-teal-400:is(.dark *){color:var(--tw-color-teal-400)}.tw\\:dark\\:after\\:mix-blend-lighten:is(.dark *):after{content:var(--tw-content);mix-blend-mode:lighten}@media (hover:hover){.tw\\:dark\\:hover\\:bg-blue-500:is(.dark *):hover{background-color:var(--tw-color-blue-500)}.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-destructive\\/30:is(.dark *):hover{background-color:color-mix(in oklab, var(--destructive) 30%, transparent)}}.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-input\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--input) 50%, transparent)}}.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:var(--muted)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:hover\\:bg-muted\\/50:is(.dark *):hover{background-color:color-mix(in oklab, var(--muted) 50%, transparent)}}.tw\\:dark\\:hover\\:text-foreground:is(.dark *):hover{color:var(--foreground)}}.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:focus-visible\\:ring-destructive\\/40:is(.dark *):focus-visible{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:disabled\\:bg-input\\/80:is(.dark *):disabled{background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:disabled\\:bg-transparent:is(.dark *):disabled{background-color:#0000}:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:var(--background)}@supports (color:color-mix(in lab, red, red)){:where([data-slot=tooltip-content]) .tw\\:dark\\:in-data-\\[slot\\=tooltip-content\\]\\:bg-background\\/10:is(.dark *){background-color:color-mix(in oklab, var(--background) 10%, transparent)}}.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-disabled\\:bg-input\\/80:is(.dark *):has(:disabled){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:has-\\[\\[data-slot\\]\\[aria-invalid\\=true\\]\\]\\:ring-destructive\\/40:is(.dark *):has([data-slot][aria-invalid=true]){--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:border-destructive\\/50:is(.dark *)[aria-invalid=true]{border-color:color-mix(in oklab, var(--destructive) 50%, transparent)}}.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:aria-invalid\\:ring-destructive\\/40:is(.dark *)[aria-invalid=true]{--tw-ring-color:color-mix(in oklab, var(--destructive) 40%, transparent)}}.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-\\[variant\\=destructive\\]\\:focus\\:bg-destructive\\/20:is(.dark *)[data-variant=destructive]:focus{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:data-open\\:animate-in:where([data-state=open]),.tw\\:data-open\\:animate-in:where([data-open]:not([data-open=false])){animation:enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-open\\:bg-accent:where([data-state=open]),.tw\\:data-open\\:bg-accent:where([data-open]:not([data-open=false])){background-color:var(--accent)}.tw\\:data-open\\:text-accent-foreground:where([data-state=open]),.tw\\:data-open\\:text-accent-foreground:where([data-open]:not([data-open=false])){color:var(--accent-foreground)}.tw\\:data-open\\:fade-in-0:where([data-state=open]),.tw\\:data-open\\:fade-in-0:where([data-open]:not([data-open=false])){--tw-enter-opacity:0}.tw\\:data-open\\:zoom-in-95:where([data-state=open]),.tw\\:data-open\\:zoom-in-95:where([data-open]:not([data-open=false])){--tw-enter-scale:.95}@media (hover:hover){:is(.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-state=open]),.tw\\:data-open\\:hover\\:bg-sidebar-accent:where([data-open]:not([data-open=false]))):hover{background-color:var(--sidebar-accent)}:is(.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-state=open]),.tw\\:data-open\\:hover\\:text-sidebar-accent-foreground:where([data-open]:not([data-open=false]))):hover{color:var(--sidebar-accent-foreground)}}.tw\\:data-closed\\:animate-out:where([data-state=closed]),.tw\\:data-closed\\:animate-out:where([data-closed]:not([data-closed=false])){animation:exit var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)}.tw\\:data-closed\\:fade-out-0:where([data-state=closed]),.tw\\:data-closed\\:fade-out-0:where([data-closed]:not([data-closed=false])){--tw-exit-opacity:0}.tw\\:data-closed\\:zoom-out-95:where([data-state=closed]),.tw\\:data-closed\\:zoom-out-95:where([data-closed]:not([data-closed=false])){--tw-exit-scale:.95}.tw\\:data-checked\\:border-primary:where([data-state=checked]),.tw\\:data-checked\\:border-primary:where([data-checked]:not([data-checked=false])){border-color:var(--primary)}.tw\\:data-checked\\:bg-primary:where([data-state=checked]),.tw\\:data-checked\\:bg-primary:where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:data-checked\\:text-primary-foreground:where([data-state=checked]),.tw\\:data-checked\\:text-primary-foreground:where([data-checked]:not([data-checked=false])){color:var(--primary-foreground)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:translate-x-\\[calc\\(100\\%-2px\\)\\]:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(100% - 2px);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-checked]:not([data-checked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=checked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-checked\\:-translate-x-\\[calc\\(100\\%-2px\\)\\]:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-checked]:not([data-checked=false])){--tw-translate-x:calc(calc(100% - 2px) * -1);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary)}.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-state=checked]),.tw\\:dark\\:data-checked\\:bg-primary-foreground:is(.dark *):where([data-checked]:not([data-checked=false])){background-color:var(--primary-foreground)}.tw\\:data-unchecked\\:bg-input:where([data-state=unchecked]),.tw\\:data-unchecked\\:bg-input:where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:translate-x-0:is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=default\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=default] *):where([data-unchecked]:not([data-unchecked=false])),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-state=unchecked]),.tw\\:rtl\\:group-data-\\[size\\=sm\\]\\/switch\\:data-unchecked\\:-translate-x-0:where(:dir(rtl),[dir=rtl],[dir=rtl] *):is(:where(.tw\\:group\\/switch)[data-size=sm] *):where([data-unchecked]:not([data-unchecked=false])){--tw-translate-x:calc(calc(var(--spacing)) * 0);translate:var(--tw-translate-x) var(--tw-translate-y)}.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-foreground:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--foreground)}.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-state=unchecked]),.tw\\:dark\\:data-unchecked\\:bg-input\\/80:is(.dark *):where([data-unchecked]:not([data-unchecked=false])){background-color:color-mix(in oklab, var(--input) 80%, transparent)}}.tw\\:data-selected\\:bg-muted:where([data-selected=true]){background-color:var(--muted)}.tw\\:data-selected\\:text-foreground:where([data-selected=true]){color:var(--foreground)}.tw\\:data-disabled\\:pointer-events-none:where([data-disabled=true]),.tw\\:data-disabled\\:pointer-events-none:where([data-disabled]:not([data-disabled=false])){pointer-events:none}.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled=true]),.tw\\:data-disabled\\:cursor-not-allowed:where([data-disabled]:not([data-disabled=false])){cursor:not-allowed}.tw\\:data-disabled\\:opacity-50:where([data-disabled=true]),.tw\\:data-disabled\\:opacity-50:where([data-disabled]:not([data-disabled=false])){opacity:.5}.tw\\:data-active\\:bg-background:where([data-state=active]),.tw\\:data-active\\:bg-background:where([data-active]:not([data-active=false])){background-color:var(--background)}.tw\\:data-active\\:bg-sidebar-accent:where([data-state=active]),.tw\\:data-active\\:bg-sidebar-accent:where([data-active]:not([data-active=false])){background-color:var(--sidebar-accent)}.tw\\:data-active\\:font-medium:where([data-state=active]),.tw\\:data-active\\:font-medium:where([data-active]:not([data-active=false])){--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}.tw\\:data-active\\:text-foreground:where([data-state=active]),.tw\\:data-active\\:text-foreground:where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-state=active]),.tw\\:data-active\\:text-sidebar-accent-foreground:where([data-active]:not([data-active=false])){color:var(--sidebar-accent-foreground)}.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=default\\]\\/tabs-list\\:data-active\\:shadow-sm:is(:where(.tw\\:group\\/tabs-list)[data-variant=default] *):where([data-active]:not([data-active=false])){--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:shadow-none:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){--tw-shadow:0 0 #0000;box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}:is(.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:after\\:opacity-100:is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false]))):after{content:var(--tw-content);opacity:1}.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:border-input:is(.dark *):where([data-active]:not([data-active=false])){border-color:var(--input)}.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:var(--input)}@supports (color:color-mix(in lab, red, red)){.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:bg-input\\/30:is(.dark *):where([data-active]:not([data-active=false])){background-color:color-mix(in oklab, var(--input) 30%, transparent)}}.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-state=active]),.tw\\:dark\\:data-active\\:text-foreground:is(.dark *):where([data-active]:not([data-active=false])){color:var(--foreground)}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:border-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){border-color:#0000}.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-state=active]),.tw\\:dark\\:group-data-\\[variant\\=line\\]\\/tabs-list\\:data-active\\:bg-transparent:is(.dark *):is(:where(.tw\\:group\\/tabs-list)[data-variant=line] *):where([data-active]:not([data-active=false])){background-color:#0000}.tw\\:data-horizontal\\:mx-px:where([data-orientation=horizontal]){margin-inline:1px}.tw\\:data-horizontal\\:h-1:where([data-orientation=horizontal]){height:calc(calc(var(--spacing)) * 1)}.tw\\:data-horizontal\\:h-full:where([data-orientation=horizontal]){height:100%}.tw\\:data-horizontal\\:h-px:where([data-orientation=horizontal]){height:1px}.tw\\:data-horizontal\\:w-auto:where([data-orientation=horizontal]){width:auto}.tw\\:data-horizontal\\:w-full:where([data-orientation=horizontal]){width:100%}.tw\\:data-horizontal\\:flex-col:where([data-orientation=horizontal]){flex-direction:column}.tw\\:data-vertical\\:my-px:where([data-orientation=vertical]){margin-block:1px}.tw\\:data-vertical\\:h-auto:where([data-orientation=vertical]){height:auto}.tw\\:data-vertical\\:h-full:where([data-orientation=vertical]){height:100%}.tw\\:data-vertical\\:min-h-40:where([data-orientation=vertical]){min-height:calc(calc(var(--spacing)) * 40)}.tw\\:data-vertical\\:w-1:where([data-orientation=vertical]){width:calc(calc(var(--spacing)) * 1)}.tw\\:data-vertical\\:w-auto:where([data-orientation=vertical]){width:auto}.tw\\:data-vertical\\:w-full:where([data-orientation=vertical]){width:100%}.tw\\:data-vertical\\:w-px:where([data-orientation=vertical]){width:1px}.tw\\:data-vertical\\:flex-col:where([data-orientation=vertical]){flex-direction:column}.tw\\:data-vertical\\:items-stretch:where([data-orientation=vertical]){align-items:stretch}.tw\\:data-vertical\\:self-stretch:where([data-orientation=vertical]){align-self:stretch}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=true]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=true]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=true]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=true]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=true]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=true]>blockquote{font-style:normal}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:mt-0 [data-lexical-editor=\\"true\\"]>blockquote{margin-top:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:border-s-0 [data-lexical-editor=\\"true\\"]>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:ps-0 [data-lexical-editor=\\"true\\"]>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:font-normal [data-lexical-editor=\\"true\\"]>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:text-foreground [data-lexical-editor=\\"true\\"]>blockquote{color:var(--foreground)}.tw\\:\\[\\&_\\[data-lexical-editor\\=\\\\\\"true\\\\\\"\\]\\>blockquote\\]\\:not-italic [data-lexical-editor=\\"true\\"]>blockquote{font-style:normal}.tw\\:\\[\\&_a\\]\\:underline a{text-decoration-line:underline}.tw\\:\\[\\&_a\\]\\:underline-offset-3 a{text-underline-offset:3px}@media (hover:hover){.tw\\:\\[\\&_a\\]\\:hover\\:text-foreground a:hover{color:var(--foreground)}}.tw\\:\\[\\&_p\\:not\\(\\:last-child\\)\\]\\:mb-4 p:not(:last-child){margin-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:pointer-events-none svg{pointer-events:none}.tw\\:\\[\\&_svg\\]\\:size-4 svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_svg\\]\\:shrink-0 svg{flex-shrink:0}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4 svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&_tr\\]\\:border-b tr{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.tw\\:\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child{border-style:var(--tw-border-style);border-width:0}.tw\\:\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pe-0:has([role=checkbox]){padding-inline-end:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\.border-b\\]\\:pb-2.border-b{padding-bottom:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\.border-b\\]\\:pb-4.border-b{padding-bottom:calc(calc(var(--spacing)) * 4)}.tw\\:group-data-\\[size\\=sm\\]\\/card\\:\\[\\.border-b\\]\\:pb-3:is(:where(.tw\\:group\\/card)[data-size=sm] *).border-b{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:\\[\\.border-t\\]\\:pt-2.border-t{padding-top:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:px-2 *)[cmdk-group-heading]{padding-inline:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:py-1\\.5 *)[cmdk-group-heading]{padding-block:calc(calc(var(--spacing)) * 1.5)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-xs *)[cmdk-group-heading]{font-size:var(--tw-text-xs);line-height:var(--tw-leading,var(--tw-text-xs--line-height))}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:font-medium *)[cmdk-group-heading]{--tw-font-weight:var(--tw-font-weight-medium);font-weight:var(--tw-font-weight-medium)}:is(.tw\\:\\*\\*\\:\\[\\[cmdk-group-heading\\]\\]\\:text-muted-foreground *)[cmdk-group-heading]{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:underline>*):is(a){text-decoration-line:underline}:is(.tw\\:\\*\\:\\[a\\]\\:underline-offset-3>*):is(a){text-underline-offset:3px}@media (hover:hover){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:var(--destructive)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-destructive\\/20:is(a):hover{background-color:color-mix(in oklab, var(--destructive) 20%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-muted:is(a):hover{background-color:var(--muted)}.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:var(--primary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-primary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--primary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:var(--secondary)}@supports (color:color-mix(in lab, red, red)){.tw\\:\\[a\\]\\:hover\\:bg-secondary\\/80:is(a):hover{background-color:color-mix(in oklab, var(--secondary) 80%, transparent)}}.tw\\:\\[a\\]\\:hover\\:text-muted-foreground:is(a):hover{color:var(--muted-foreground)}:is(.tw\\:\\*\\:\\[a\\]\\:hover\\:text-foreground>*):is(a):hover{color:var(--foreground)}}:is(.tw\\:\\*\\:\\[img\\]\\:row-span-2>*):is(img){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[img\\]\\:translate-y-0\\.5>*):is(img){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[img\\]\\:text-current>*):is(img){color:currentColor}:is(.tw\\:\\*\\:\\[img\\:first-child\\]\\:rounded-t-xl>*):is(img:first-child){border-top-left-radius:calc(var(--radius) * 1.4);border-top-right-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:last-child\\]\\:rounded-b-xl>*):is(img:last-child){border-bottom-right-radius:calc(var(--radius) * 1.4);border-bottom-left-radius:calc(var(--radius) * 1.4)}:is(.tw\\:\\*\\:\\[img\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(img:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:flex>*):is(span):last-child{display:flex}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:items-center>*):is(span):last-child{align-items:center}:is(.tw\\:\\*\\:\\[span\\]\\:last\\:gap-2>*):is(span):last-child{gap:calc(calc(var(--spacing)) * 2)}:is(.tw\\:\\*\\:\\[svg\\]\\:row-span-2>*):is(svg){grid-row:span 2/span 2}:is(.tw\\:\\*\\:\\[svg\\]\\:translate-y-0\\.5>*):is(svg){--tw-translate-y:calc(calc(var(--spacing)) * .5);translate:var(--tw-translate-x) var(--tw-translate-y)}:is(.tw\\:\\*\\:\\[svg\\]\\:text-current>*):is(svg){color:currentColor}:is(.tw\\:focus\\:\\*\\:\\[svg\\]\\:text-accent-foreground:focus>*):is(svg){color:var(--accent-foreground)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive[data-variant=destructive]>*):is(svg){color:var(--destructive)}:is(.tw\\:data-\\[variant\\=destructive\\]\\:\\*\\:\\[svg\\]\\:text-destructive\\![data-variant=destructive]>*):is(svg){color:var(--destructive)!important}:is(.tw\\:data-selected\\:\\*\\:\\[svg\\]\\:text-foreground:where([data-selected=true])>*):is(svg){color:var(--foreground)}:is(.tw\\:\\*\\:\\[svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>*):is(svg:not([class*=size-])){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-s-none>:not(:first-child){border-start-start-radius:0;border-end-start-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:rounded-t-none>:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-s-0>:not(:first-child){border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:border-t-0>:not(:first-child){border-top-style:var(--tw-border-style);border-top-width:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-e-none>:not(:last-child){border-start-end-radius:0;border-end-end-radius:0}.tw\\:\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:rounded-b-none>:not(:last-child){border-bottom-right-radius:0;border-bottom-left-radius:0}.tw\\:has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:rounded-e-lg:has(:is(select[aria-hidden=true]:last-child))>[data-slot=select-trigger]:last-of-type{border-start-end-radius:var(--radius);border-end-end-radius:var(--radius)}.tw\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:w-fit>[data-slot=select-trigger]:not([class*=w-]){width:fit-content}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-e-lg\\!>[data-slot]:not(:has(~[data-slot])){border-start-end-radius:var(--radius)!important;border-end-end-radius:var(--radius)!important}.tw\\:\\[\\&\\>\\[data-slot\\]\\:not\\(\\:has\\(\\~\\[data-slot\\]\\)\\)\\]\\:rounded-b-lg\\!>[data-slot]:not(:has(~[data-slot])){border-bottom-right-radius:var(--radius)!important;border-bottom-left-radius:var(--radius)!important}.tw\\:\\[\\&\\>blockquote\\]\\:border-s-0>blockquote{border-inline-start-style:var(--tw-border-style);border-inline-start-width:0}.tw\\:\\[\\&\\>blockquote\\]\\:p-0>blockquote{padding:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:ps-0>blockquote{padding-inline-start:calc(calc(var(--spacing)) * 0)}.tw\\:\\[\\&\\>blockquote\\]\\:font-normal>blockquote{--tw-font-weight:var(--tw-font-weight-normal);font-weight:var(--tw-font-weight-normal)}.tw\\:\\[\\&\\>blockquote\\]\\:text-foreground>blockquote{color:var(--foreground)}.tw\\:\\[\\&\\>blockquote\\]\\:not-italic>blockquote{font-style:normal}.tw\\:\\[\\&\\>input\\]\\:flex-1>input{flex:1}.tw\\:has-\\[\\>\\[data-align\\=block-end\\]\\]\\:\\[\\&\\>input\\]\\:pt-3:has(>[data-align=block-end])>input{padding-top:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=block-start\\]\\]\\:\\[\\&\\>input\\]\\:pb-3:has(>[data-align=block-start])>input{padding-bottom:calc(calc(var(--spacing)) * 3)}.tw\\:has-\\[\\>\\[data-align\\=inline-end\\]\\]\\:\\[\\&\\>input\\]\\:pe-1\\.5:has(>[data-align=inline-end])>input{padding-inline-end:calc(calc(var(--spacing)) * 1.5)}.tw\\:has-\\[\\>\\[data-align\\=inline-start\\]\\]\\:\\[\\&\\>input\\]\\:ps-1\\.5:has(>[data-align=inline-start])>input{padding-inline-start:calc(calc(var(--spacing)) * 1.5)}.tw\\:\\[\\&\\>kbd\\]\\:rounded-\\[calc\\(var\\(--radius\\)-5px\\)\\]>kbd{border-radius:calc(var(--radius) - 5px)}.tw\\:\\[\\&\\>li\\]\\:mt-2>li{margin-top:calc(calc(var(--spacing)) * 2)}.tw\\:\\[\\&\\>span\\:last-child\\]\\:truncate>span:last-child{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.tw\\:\\[\\&\\>svg\\]\\:pointer-events-none>svg{pointer-events:none}.tw\\:\\[\\&\\>svg\\]\\:size-3\\!>svg{width:calc(calc(var(--spacing)) * 3)!important;height:calc(calc(var(--spacing)) * 3)!important}.tw\\:\\[\\&\\>svg\\]\\:size-3\\.5>svg{width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\]\\:size-4>svg{width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>svg\\]\\:shrink-0>svg{flex-shrink:0}.tw\\:\\[\\&\\>svg\\]\\:text-sidebar-accent-foreground>svg{color:var(--sidebar-accent-foreground)}.tw\\:group-has-data-\\[size\\=lg\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-5:is(:where(.tw\\:group\\/avatar-group):has([data-size=lg]) *)>svg{width:calc(calc(var(--spacing)) * 5);height:calc(calc(var(--spacing)) * 5)}.tw\\:group-has-data-\\[size\\=sm\\]\\/avatar-group\\:\\[\\&\\>svg\\]\\:size-3:is(:where(.tw\\:group\\/avatar-group):has([data-size=sm]) *)>svg{width:calc(calc(var(--spacing)) * 3);height:calc(calc(var(--spacing)) * 3)}.tw\\:group-data-\\[size\\=default\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=default] *)>svg,.tw\\:group-data-\\[size\\=lg\\]\\/avatar\\:\\[\\&\\>svg\\]\\:size-2:is(:where(.tw\\:group\\/avatar)[data-size=lg] *)>svg{width:calc(calc(var(--spacing)) * 2);height:calc(calc(var(--spacing)) * 2)}.tw\\:group-data-\\[size\\=sm\\]\\/avatar\\:\\[\\&\\>svg\\]\\:hidden:is(:where(.tw\\:group\\/avatar)[data-size=sm] *)>svg{display:none}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-3\\.5>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 3.5);height:calc(calc(var(--spacing)) * 3.5)}.tw\\:\\[\\&\\>svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:size-4>svg:not([class*=size-]){width:calc(calc(var(--spacing)) * 4);height:calc(calc(var(--spacing)) * 4)}.tw\\:\\[\\&\\>tr\\]\\:last\\:border-b-0>tr:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}.tw\\:\\[\\&\\[align\\=center\\]\\]\\:text-center[align=center]{text-align:center}.tw\\:\\[\\&\\[align\\=right\\]\\]\\:text-right[align=right]{text-align:right}.tw\\:\\[\\&\\[aria-orientation\\=horizontal\\]\\>div\\]\\:rotate-90[aria-orientation=horizontal]>div{rotate:90deg}[data-side=primary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-end-2{inset-inline-end:calc(calc(var(--spacing)) * -2)}[data-side=primary][data-state=collapsed] .tw\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize{cursor:e-resize}[data-side=primary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:w-resize}[data-side=secondary][data-collapsible=offcanvas] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:-start-2{inset-inline-start:calc(calc(var(--spacing)) * -2)}[data-side=secondary][data-state=collapsed] .tw\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-w-resize{cursor:w-resize}[data-side=secondary][data-state=collapsed] .tw\\:rtl\\:\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:cursor-e-resize:where(:dir(rtl),[dir=rtl],[dir=rtl] *){cursor:e-resize}}@property --tw-animation-delay{syntax:"*";inherits:false;initial-value:0s}@property --tw-animation-direction{syntax:"*";inherits:false;initial-value:normal}@property --tw-animation-duration{syntax:"*";inherits:false}@property --tw-animation-fill-mode{syntax:"*";inherits:false;initial-value:none}@property --tw-animation-iteration-count{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-enter-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-enter-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-blur{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-opacity{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-rotate{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-scale{syntax:"*";inherits:false;initial-value:1}@property --tw-exit-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-exit-translate-y{syntax:"*";inherits:false;initial-value:0}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+460-52F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-cyrillic-wght-normal.woff2)format("woff2-variations");unicode-range:U+301,U+400-45F,U+490-491,U+4B0-4B1,U+2116}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-greek-wght-normal.woff2)format("woff2-variations");unicode-range:U+370-377,U+37A-37F,U+384-38A,U+38C,U+38E-3A1,U+3A3-3FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-vietnamese-wght-normal.woff2)format("woff2-variations");unicode-range:U+102-103,U+110-111,U+128-129,U+168-169,U+1A0-1A1,U+1AF-1B0,U+300-301,U+303-304,U+308-309,U+323,U+329,U+1EA0-1EF9,U+20AB}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-ext-wght-normal.woff2)format("woff2-variations");unicode-range:U+100-2BA,U+2BD-2C5,U+2C7-2CC,U+2CE-2D7,U+2DD-2FF,U+304,U+308,U+329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:IBM Plex Sans Variable;font-style:normal;font-display:swap;font-weight:100 700;src:url(./files/ibm-plex-sans-latin-wght-normal.woff2)format("woff2-variations");unicode-range:U+??,U+131,U+152-153,U+2BB-2BC,U+2C6,U+2DA,U+2DC,U+304,U+308,U+329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.light,:root{--radius:.625rem;--spacing:.25rem;--background:oklch(100% 0 0);--foreground:oklch(13.71% .036 258.53);--card:oklch(100% 0 0);--card-foreground:oklch(13.71% .036 258.53);--popover:oklch(98.43% .0018 248.56);--popover-foreground:oklch(13.71% .036 258.53);--primary:oklch(20.79% .0399 265.73);--primary-foreground:oklch(98.38% .0036 248.23);--secondary:oklch(95.89% .011 248.06);--secondary-foreground:oklch(20.79% .0399 265.73);--muted:oklch(95.89% .011 248.06);--muted-foreground:oklch(55.47% .0408 257.45);--accent:oklch(95.89% .011 248.06);--accent-foreground:oklch(20.79% .0399 265.73);--destructive:oklch(63.69% .2077 25.32);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(92.9% .0127 255.58);--input:oklch(92.9% .0127 255.58);--ring:oklch(13.71% .036 258.53);--chart-1:oklch(64.6% .222 41.116);--chart-2:oklch(60% .118 184.704);--chart-3:oklch(39.8% .07 227.392);--chart-4:oklch(82.8% .189 84.429);--chart-5:oklch(76.9% .188 70.08);--sidebar:oklch(98.43% .0018 248.56);--sidebar-foreground:oklch(13.71% .036 258.53);--sidebar-primary:oklch(20.79% .0399 265.73);--sidebar-primary-foreground:oklch(98.38% .0036 248.23);--sidebar-accent:oklch(95.89% .011 248.06);--sidebar-accent-foreground:oklch(20.79% .0399 265.73);--sidebar-border:oklch(92.9% .0127 255.58);--sidebar-ring:oklch(13.71% .036 258.53)}.dark{--background:oklch(13.71% .036 258.53);--foreground:oklch(98.38% .0036 248.23);--card:oklch(13.71% .036 258.53);--card-foreground:oklch(98.38% .0036 248.23);--popover:oklch(13.71% .036 258.53);--popover-foreground:oklch(98.38% .0036 248.23);--primary:oklch(98.38% .0036 248.23);--primary-foreground:oklch(20.79% .0399 265.73);--secondary:oklch(28% .037 259.98);--secondary-foreground:oklch(98.38% .0036 248.23);--muted:oklch(28% .037 259.98);--muted-foreground:oklch(71.07% .0351 256.8);--accent:oklch(28% .037 259.98);--accent-foreground:oklch(98.38% .0036 248.23);--destructive:oklch(39.6% .1331 25.71);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(44.54% .0374 257.3);--input:oklch(44.54% .0374 257.3);--ring:oklch(86.88% .0199 252.89);--chart-1:oklch(48.8% .243 264.376);--chart-2:oklch(69.6% .17 162.48);--chart-3:oklch(76.9% .188 70.08);--chart-4:oklch(62.7% .265 303.9);--chart-5:oklch(64.5% .246 16.439);--sidebar:oklch(13.71% .036 258.53);--sidebar-foreground:oklch(71.07% .0351 256.8);--sidebar-primary:oklch(98.38% .0036 248.23);--sidebar-primary-foreground:oklch(20.79% .0399 265.73);--sidebar-accent:oklch(28% .037 259.98);--sidebar-accent-foreground:oklch(71.07% .0351 256.8);--sidebar-border:oklch(28% .037 259.98);--sidebar-ring:oklch(86.88% .0199 252.89)}.paratext-light{--background:oklch(100% 0 0);--foreground:oklch(15.3% .006 107.1);--card:oklch(100% 0 0);--card-foreground:oklch(15.3% .006 107.1);--popover:oklch(100% 0 0);--popover-foreground:oklch(15.3% .006 107.1);--primary:oklch(55.5% .163 48.998);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(96.7% .001 286.375);--secondary-foreground:oklch(21% .006 285.885);--muted:oklch(96.6% .005 106.5);--muted-foreground:oklch(58% .031 107.3);--accent:oklch(96.6% .005 106.5);--accent-foreground:oklch(22.8% .013 107.4);--destructive:oklch(57.7% .245 27.325);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(62.7% .194 149.214);--warning:oklch(84% .16 84);--warning-foreground:oklch(28% .07 46);--border:oklch(93% .007 106.5);--input:oklch(93% .007 106.5);--ring:oklch(73.7% .021 106.9);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(98.8% .003 106.5);--sidebar-foreground:oklch(15.3% .006 107.1);--sidebar-primary:oklch(66.6% .179 58.318);--sidebar-primary-foreground:oklch(98.7% .022 95.277);--sidebar-accent:oklch(96.6% .005 106.5);--sidebar-accent-foreground:oklch(22.8% .013 107.4);--sidebar-border:oklch(93% .007 106.5);--sidebar-ring:oklch(73.7% .021 106.9)}.paratext-dark{--background:oklch(15.3% .006 107.1);--foreground:oklch(98.8% .003 106.5);--card:oklch(22.8% .013 107.4);--card-foreground:oklch(98.8% .003 106.5);--popover:oklch(22.8% .013 107.4);--popover-foreground:oklch(98.8% .003 106.5);--primary:oklch(47.3% .137 46.201);--primary-foreground:oklch(98.7% .022 95.277);--secondary:oklch(27.4% .006 286.033);--secondary-foreground:oklch(98.5% 0 0);--muted:oklch(28.6% .016 107.4);--muted-foreground:oklch(73.7% .021 106.9);--accent:oklch(28.6% .016 107.4);--accent-foreground:oklch(98.8% .003 106.5);--destructive:oklch(70.4% .191 22.216);--destructive-foreground:oklch(98.38% .0036 248.23);--success-foreground:oklch(79.2% .209 151.711);--warning:oklch(41% .11 46);--warning-foreground:oklch(99% .02 95);--border:oklch(100% 0 0/.1);--input:oklch(100% 0 0/.15);--ring:oklch(58% .031 107.3);--chart-1:oklch(88% .011 106.6);--chart-2:oklch(58% .031 107.3);--chart-3:oklch(46.6% .025 107.3);--chart-4:oklch(39.4% .023 107.4);--chart-5:oklch(28.6% .016 107.4);--sidebar:oklch(22.8% .013 107.4);--sidebar-foreground:oklch(98.8% .003 106.5);--sidebar-primary:oklch(76.9% .188 70.08);--sidebar-primary-foreground:oklch(27.9% .077 45.635);--sidebar-accent:oklch(28.6% .016 107.4);--sidebar-accent-foreground:oklch(98.8% .003 106.5);--sidebar-border:oklch(100% 0 0/.1);--sidebar-ring:oklch(58% .031 107.3)}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-divide-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-divide-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-ordinal{syntax:"*";inherits:false}@property --tw-slashed-zero{syntax:"*";inherits:false}@property --tw-numeric-figure{syntax:"*";inherits:false}@property --tw-numeric-spacing{syntax:"*";inherits:false}@property --tw-numeric-fraction{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-duration{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}@keyframes enter{0%{opacity:var(--tw-enter-opacity,1);transform:translate3d(var(--tw-enter-translate-x,0),var(--tw-enter-translate-y,0),0)scale3d(var(--tw-enter-scale,1),var(--tw-enter-scale,1),var(--tw-enter-scale,1))rotate(var(--tw-enter-rotate,0));filter:blur(var(--tw-enter-blur,0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity,1);transform:translate3d(var(--tw-exit-translate-x,0),var(--tw-exit-translate-y,0),0)scale3d(var(--tw-exit-scale,1),var(--tw-exit-scale,1),var(--tw-exit-scale,1))rotate(var(--tw-exit-rotate,0));filter:blur(var(--tw-exit-blur,0))}}
/*
 * WARNING: This CSS file is for DEMO PURPOSES ONLY
 *
 * This stylesheet is part of a demo component used in Storybook.
 * For production applications, use the Scripture Editor component from:
 * - @eten-tech-foundation/platform-editor
 *
 * Copied from paranext-core/extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.scss
 */

/* Copied from https://github.com/eten-tech-foundation/scripture-editors/blob/platform_v0.8.1/packages/platform/src/usj-nodes.css */

/* stylelint-disable */

/* Sample styles for USJ Nodes */

.leadingFloat {
  float: start;
}

.clearFloat {
  clear: both;
}

.align_start {
  text-align: start;
}

.align_center {
  text-align: center;
}

.align_end {
  text-align: end;
}

@font-face {
  font-family: 'Charis SIL';
  src:
    local('Charis SIL'), local('Charis SIL Bold'), local('Charis SIL Bold Italic'),
    local('Charis SIL Italic');
  font-weight: normal;
}

@font-face {
  font-family: 'Charis SIL';
  src: local('Charis SIL Bold');
  font-weight: bold;
}

@font-face {
  font-family: 'Charis SIL';
  src: local('Charis SIL Italic');
  font-style: italic;
}

@font-face {
  font-family: 'Charis SIL';
  src: local('Charis SIL Bold Italic');
  font-weight: bold;
  font-style: italic;
}

.formatted-font .usfm {
  font-family: 'Charis SIL', serif;
  font-size: 12pt;
}

/* BookNode */

.formatted-font .usfm_id {
  font-size: 100%;
}

.marker-hidden .book[data-code]::before {
  content: attr(data-code) ' ';
}

/* ChapterNode, ImmutableChapterNode */

.formatted-font .usfm_c {
  display: block;
  font-weight: bold;
  font-size: 150%;
}

.text-spacing .usfm_c {
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_ca {
  color: #007306;
  font-size: 133%;
  font-style: italic;
}

.formatted-font .usfm_cp {
  font-weight: bold;
  color: #003380;
  font-size: 150%;
}

.text-spacing .usfm_cp {
  margin-bottom: 4pt;
  margin-top: 8pt;
}

/* VerseNode, ImmutableVerseNode */

.formatted-font .usfm_v {
  font-size: 66%;
  vertical-align: text-top;
}

.text-spacing .usfm_v {
  white-space: nowrap;
  unicode-bidi: embed;
}

.formatted-font .usfm_va {
  color: #007306;
  font-size: 66%;
  vertical-align: text-top;
}

.formatted-font .usfm_vp {
  color: #003380;
  font-size: 66%;
  vertical-align: text-top;
}

/* ParaNode */

.formatted-font .usfm_usfm {
  font-size: 100%;
}

.formatted-font .usfm_ide {
  font-size: 100%;
}

.formatted-font .usfm_h {
  font-size: 100%;
}

/* check if deprecated */

.formatted-font .usfm_h1 {
  font-size: 100%;
}

/* check if deprecated */

.formatted-font .usfm_h2 {
  font-size: 100%;
}

/* check if deprecated */

.formatted-font .usfm_h3 {
  font-size: 100%;
}

.formatted-font .usfm_toc1 {
  font-weight: bold;
  color: #004c00;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_toc2 {
  color: #004c00;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_toc3 {
  font-weight: bold;
  color: #e05858;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_toca1 {
  color: #8c8c8c;
  font-size: 83%;
  font-style: italic;
}

.formatted-font .usfm_toca2 {
  color: #8c8c8c;
  font-size: 83%;
  font-style: italic;
}

.formatted-font .usfm_toca3 {
  color: #8c8c8c;
  font-size: 83%;
  font-style: italic;
}

.formatted-font .usfm_rem {
  color: #003380;
  font-size: 100%;
}

.formatted-font .usfm_sts {
  color: #003380;
  font-size: 100%;
}

/* check if deprecated */

.formatted-font .usfm_restore {
  color: #003380;
  font-size: 100%;
}

.formatted-font .usfm_imt {
  font-weight: bold;
  font-size: 116%;
}

.text-spacing .usfm_imt {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_imt1 {
  font-weight: bold;
  font-size: 116%;
}

.text-spacing .usfm_imt1 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_imt2 {
  font-size: 108%;
  font-style: italic;
}

.text-spacing .usfm_imt2 {
  text-align: center;
  margin-bottom: 3pt;
  margin-top: 6pt;
}

.formatted-font .usfm_imt3 {
  font-weight: bold;
  font-size: 100%;
}

.text-spacing .usfm_imt3 {
  text-align: center;
  margin-bottom: 2pt;
  margin-top: 2pt;
}

.formatted-font .usfm_imt4 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_imt4 {
  text-align: center;
  margin-bottom: 2pt;
  margin-top: 2pt;
}

.formatted-font .usfm_imte {
  font-weight: bold;
  font-size: 166%;
}

.text-spacing .usfm_imte {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

/* check if deprecated */

.formatted-font .usfm_imte1 {
  font-weight: bold;
  font-size: 166%;
}

.text-spacing .usfm_imte1 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

/* check if deprecated */

.formatted-font .usfm_imte2 {
  font-size: 133%;
  font-style: italic;
}

.text-spacing .usfm_imte2 {
  text-align: center;
  margin-bottom: 2pt;
}

.formatted-font .usfm_is {
  font-weight: bold;
  font-size: 116%;
}

.text-spacing .usfm_is {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_is1 {
  font-weight: bold;
  font-size: 116%;
}

.text-spacing .usfm_is1 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_is2 {
  font-weight: bold;
  font-size: 100%;
}

.text-spacing .usfm_is2 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_iot {
  font-weight: bold;
  font-size: 100%;
}

.text-spacing .usfm_iot {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_io {
  font-size: 100%;
}

.text-spacing[dir='ltr'] .usfm_io {
  margin-left: 10vw;
}

.text-spacing[dir='rtl'] .usfm_io {
  margin-right: 10vw;
}

.formatted-font .usfm_io1 {
  font-size: 100%;
}

.text-spacing[dir='ltr'] .usfm_io1 {
  margin-left: 10vw;
}

.text-spacing[dir='rtl'] .usfm_io1 {
  margin-right: 10vw;
}

.formatted-font .usfm_io2 {
  font-size: 100%;
}

.text-spacing[dir='ltr'] .usfm_io2 {
  margin-left: 15vw;
}

.text-spacing[dir='rtl'] .usfm_io2 {
  margin-right: 15vw;
}

.formatted-font .usfm_io3 {
  font-size: 100%;
}

.text-spacing[dir='ltr'] .usfm_io3 {
  margin-left: 20vw;
}

.text-spacing[dir='rtl'] .usfm_io3 {
  margin-right: 20vw;
}

.formatted-font .usfm_io4 {
  font-size: 100%;
}

.text-spacing[dir='ltr'] .usfm_io4 {
  margin-left: 25vw;
}

.text-spacing[dir='rtl'] .usfm_io4 {
  margin-right: 25vw;
}

.formatted-font .usfm_ior {
  font-size: 100%;
}

.formatted-font .usfm_ip {
  font-size: 100%;
}

.text-spacing .usfm_ip {
  text-indent: 2.5vw;
}

/* check if deprecated */

.formatted-font .usfm_im {
  font-size: 100%;
}

.formatted-font .usfm_ipi {
  font-size: 100%;
}

.text-spacing .usfm_ipi {
  text-indent: 2.5vw;
  margin-left: 5vw;
  margin-right: 5vw;
}

/* check if deprecated */

.formatted-font .usfm_imi {
  font-size: 100%;
}

.text-spacing .usfm_imi {
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_ili {
  font-size: 100%;
}

.text-spacing .usfm_ili {
  text-indent: -7.5vw;
}

.text-spacing[dir='ltr'] .usfm_ili {
  margin-left: 10vw;
}

.text-spacing[dir='rtl'] .usfm_ili {
  margin-right: 10vw;
}

.formatted-font .usfm_ili1 {
  font-size: 100%;
}

.text-spacing .usfm_ili1 {
  text-indent: -7.5vw;
}

.text-spacing[dir='ltr'] .usfm_ili1 {
  margin-left: 10vw;
}

.text-spacing[dir='rtl'] .usfm_ili1 {
  margin-right: 10vw;
}

.formatted-font .usfm_ili2 {
  font-size: 100%;
}

.text-spacing .usfm_ili2 {
  text-indent: -7.5vw;
}

.text-spacing[dir='ltr'] .usfm_ili2 {
  margin-left: 15vw;
}

.text-spacing[dir='rtl'] .usfm_ili2 {
  margin-right: 15vw;
}

.formatted-font .usfm_ipq {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_ipq {
  text-indent: 2.5vw;
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_imq {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_imq {
  margin-left: 5vw;
  margin-right: 5vw;
}

.usfm_ipr {
  text-align: end;
}

.formatted-font .usfm_ipr {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_ipr {
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_ib {
  font-size: 83%;
}

/* check if deprecated */

.formatted-font .usfm_iq {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_iq {
  text-indent: -15vw;
}

.text-spacing[dir='ltr'] .usfm_iq {
  margin-left: 20vw;
}

.text-spacing[dir='rtl'] .usfm_iq {
  margin-right: 20vw;
}

/* check if deprecated */

.formatted-font .usfm_iq1 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_iq1 {
  text-indent: -15vw;
}

.text-spacing[dir='ltr'] .usfm_iq1 {
  margin-left: 20vw;
}

.text-spacing[dir='rtl'] .usfm_iq1 {
  margin-right: 20vw;
}

/* check if deprecated */

.formatted-font .usfm_iq2 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_iq2 {
  text-indent: -10vw;
}

.text-spacing[dir='ltr'] .usfm_iq2 {
  margin-left: 20vw;
}

.text-spacing[dir='rtl'] .usfm_iq2 {
  margin-right: 20vw;
}

/* check if deprecated */

.formatted-font .usfm_iq3 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_iq3 {
  text-indent: -5vw;
}

.text-spacing[dir='ltr'] .usfm_iq3 {
  margin-left: 20vw;
}

.text-spacing[dir='rtl'] .usfm_iq3 {
  margin-right: 20vw;
}

.formatted-font .usfm_iex {
  font-size: 100%;
}

.text-spacing .usfm_iex {
  text-indent: 2.5vw;
  margin-bottom: 4pt;
  margin-top: 4pt;
}

/* check if deprecated */

.formatted-font .usfm_iqt {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_ie {
  font-size: 83%;
}

.formatted-font .usfm_cl {
  font-weight: bold;
  font-size: 150%;
}

.text-spacing .usfm_cl {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_cd {
  font-size: 91%;
}

.text-spacing .usfm_cd {
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_p {
  font-size: 100%;
}

.text-spacing .usfm_p {
  text-indent: 2.5vw;
}

.formatted-font .usfm_m {
  font-size: 100%;
}

.formatted-font .usfm_po {
  font-size: 100%;
}

.text-spacing .usfm_po {
  text-indent: 2.5vw;
  margin-bottom: 4pt;
  margin-top: 4pt;
}

.usfm_pr {
  text-align: end;
}

.formatted-font .usfm_pr {
  font-size: 100%;
}

.usfm_cls {
  text-align: end;
}

.formatted-font .usfm_cls {
  font-size: 100%;
}

.formatted-font .usfm_pmo {
  font-size: 100%;
}

.text-spacing .usfm_pmo {
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_pm {
  font-size: 100%;
}

.text-spacing .usfm_pm {
  text-indent: 2.5vw;
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_pmc {
  font-size: 100%;
}

.text-spacing .usfm_pmc {
  margin-left: 5vw;
  margin-right: 5vw;
}

.usfm_pmr {
  text-align: end;
}

.formatted-font .usfm_pmr {
  font-size: 100%;
}

.text-spacing .usfm_pmr {
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_pi {
  font-size: 100%;
}

.text-spacing .usfm_pi {
  text-indent: 2.5vw;
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_pi1 {
  font-size: 100%;
}

.text-spacing .usfm_pi1 {
  text-indent: 2.5vw;
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_pi2 {
  font-size: 100%;
}

.text-spacing .usfm_pi2 {
  text-indent: 2.5vw;
}

.text-spacing[dir='ltr'] .usfm_pi2 {
  margin-left: 10vw;
  margin-right: 5vw;
}

.text-spacing[dir='rtl'] .usfm_pi2 {
  margin-left: 5vw;
  margin-right: 10vw;
}

.formatted-font .usfm_pi3 {
  font-size: 100%;
}

.text-spacing .usfm_pi3 {
  text-indent: 2.5vw;
}

.text-spacing[dir='ltr'] .usfm_pi3 {
  margin-left: 15vw;
  margin-right: 5vw;
}

.text-spacing[dir='rtl'] .usfm_pi3 {
  margin-left: 5vw;
  margin-right: 15vw;
}

.formatted-font .usfm_pc {
  font-size: 100%;
}

.text-spacing .usfm_pc {
  text-align: center;
}

.formatted-font .usfm_mi {
  font-size: 100%;
}

.text-spacing .usfm_mi {
  margin-left: 5vw;
  margin-right: 5vw;
}

/* check if deprecated */

.formatted-font .usfm_nb {
  font-size: 100%;
}

.formatted-font .usfm_q {
  font-size: 100%;
}

.text-spacing .usfm_q {
  text-indent: -10vw;
}

.text-spacing[dir='ltr'] .usfm_q {
  margin-left: 15vw;
}

.text-spacing[dir='rtl'] .usfm_q {
  margin-right: 15vw;
}

.formatted-font .usfm_q1 {
  font-size: 100%;
}

.text-spacing .usfm_q1 {
  text-indent: -10vw;
}

.text-spacing[dir='ltr'] .usfm_q1 {
  margin-left: 15vw;
}

.text-spacing[dir='rtl'] .usfm_q1 {
  margin-right: 15vw;
}

.formatted-font .usfm_q2 {
  font-size: 100%;
}

.text-spacing .usfm_q2 {
  text-indent: -7.5vw;
}

.text-spacing[dir='ltr'] .usfm_q2 {
  margin-left: 15vw;
}

.text-spacing[dir='rtl'] .usfm_q2 {
  margin-right: 15vw;
}

.formatted-font .usfm_q3 {
  font-size: 100%;
}

.text-spacing .usfm_q3 {
  text-indent: -5vw;
}

.text-spacing[dir='ltr'] .usfm_q3 {
  margin-left: 15vw;
}

.text-spacing[dir='rtl'] .usfm_q3 {
  margin-right: 15vw;
}

.formatted-font .usfm_q4 {
  font-size: 100%;
}

.text-spacing .usfm_q4 {
  text-indent: -2.5vw;
}

.text-spacing[dir='ltr'] .usfm_q4 {
  margin-left: 15vw;
}

.text-spacing[dir='rtl'] .usfm_q4 {
  margin-right: 15vw;
}

.formatted-font .usfm_qc {
  font-size: 100%;
}

.text-spacing .usfm_qc {
  text-align: center;
}

.usfm_qr {
  text-align: end;
}

.formatted-font .usfm_qr {
  font-size: 100%;
}

.formatted-font .usfm_qa {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_qm {
  font-size: 100%;
}

.text-spacing .usfm_qm {
  text-indent: -15vw;
}

.text-spacing[dir='ltr'] .usfm_qm {
  margin-left: 20vw;
}

.text-spacing[dir='rtl'] .usfm_qm {
  margin-right: 20vw;
}

.formatted-font .usfm_qm1 {
  font-size: 100%;
}

.text-spacing .usfm_qm1 {
  text-indent: -15vw;
}

.text-spacing[dir='ltr'] .usfm_qm1 {
  margin-left: 20vw;
}

.text-spacing[dir='rtl'] .usfm_qm1 {
  margin-right: 20vw;
}

.formatted-font .usfm_qm2 {
  font-size: 100%;
}

.text-spacing .usfm_qm2 {
  text-indent: -10vw;
}

.text-spacing[dir='ltr'] .usfm_qm2 {
  margin-left: 20vw;
}

.text-spacing[dir='rtl'] .usfm_qm2 {
  margin-right: 20vw;
}

.formatted-font .usfm_qm3 {
  font-size: 100%;
}

.text-spacing .usfm_qm3 {
  text-indent: -5vw;
}

.text-spacing[dir='ltr'] .usfm_qm3 {
  margin-left: 20vw;
}

.text-spacing[dir='rtl'] .usfm_qm3 {
  margin-right: 20vw;
}

.formatted-font .usfm_qd {
  font-size: 100%;
  font-style: italic;
}

.text-spacing[dir='ltr'] .usfm_qd {
  margin-left: 5vw;
}

.text-spacing[dir='rtl'] .usfm_qd {
  margin-right: 5vw;
}

.formatted-font .usfm_b {
  font-size: 83%;
}

.formatted-font .usfm_mt {
  font-weight: bold;
  font-size: 166%;
}

.text-spacing .usfm_mt {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_mt1 {
  font-weight: bold;
  font-size: 166%;
}

.text-spacing .usfm_mt1 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 2pt;
}

.formatted-font .usfm_mt2 {
  font-size: 133%;
  font-style: italic;
}

.text-spacing .usfm_mt2 {
  text-align: center;
  margin-bottom: 2pt;
}

.formatted-font .usfm_mt3 {
  font-weight: bold;
  font-size: 133%;
}

.text-spacing .usfm_mt3 {
  text-align: center;
  margin-bottom: 2pt;
  margin-top: 2pt;
}

.formatted-font .usfm_mt4 {
  font-size: 100%;
}

.text-spacing .usfm_mt4 {
  text-align: center;
  margin-bottom: 2pt;
  margin-top: 2pt;
}

.formatted-font .usfm_mte {
  font-weight: bold;
  font-size: 166%;
}

.text-spacing .usfm_mte {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_mte1 {
  font-weight: bold;
  font-size: 166%;
}

.text-spacing .usfm_mte1 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_mte2 {
  font-size: 133%;
  font-style: italic;
}

.text-spacing .usfm_mte2 {
  text-align: center;
  margin-bottom: 2pt;
}

.formatted-font .usfm_ms {
  font-weight: bold;
  font-size: 116%;
}

.text-spacing .usfm_ms {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 16pt;
}

.formatted-font .usfm_ms1 {
  font-weight: bold;
  font-size: 116%;
}

.text-spacing .usfm_ms1 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 16pt;
}

.formatted-font .usfm_ms2 {
  font-weight: bold;
  font-size: 116%;
}

.text-spacing .usfm_ms2 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 16pt;
}

.formatted-font .usfm_ms3 {
  font-size: 116%;
  font-style: italic;
}

.text-spacing .usfm_ms3 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 16pt;
}

.formatted-font .usfm_mr {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_mr {
  text-align: center;
  margin-bottom: 4pt;
}

.formatted-font .usfm_s {
  font-weight: bold;
  font-size: 100%;
}

.text-spacing .usfm_s {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_s1 {
  font-weight: bold;
  font-size: 100%;
}

.text-spacing .usfm_s1 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_s2 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_s2 {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_s3 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_s3 {
  margin-bottom: 3pt;
  margin-top: 6pt;
}

.formatted-font .usfm_s4 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_s4 {
  margin-bottom: 3pt;
  margin-top: 6pt;
}

.formatted-font .usfm_sr {
  font-weight: bold;
  font-size: 100%;
}

.text-spacing .usfm_sr {
  text-align: center;
  margin-bottom: 4pt;
}

.formatted-font .usfm_r {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_r {
  text-align: center;
  margin-bottom: 4pt;
}

.formatted-font .usfm_sp {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_sp {
  margin-bottom: 4pt;
  margin-top: 8pt;
}

.formatted-font .usfm_d {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_d {
  text-align: center;
  margin-bottom: 4pt;
  margin-top: 4pt;
}

.text-spacing .usfm_sd {
  margin-bottom: 24pt;
  margin-top: 24pt;
}

.text-spacing .usfm_sd1 {
  margin-bottom: 24pt;
  margin-top: 24pt;
}

.text-spacing .usfm_sd2 {
  margin-bottom: 18pt;
  margin-top: 18pt;
}

.text-spacing .usfm_sd3 {
  margin-bottom: 12pt;
  margin-top: 12pt;
}

.text-spacing .usfm_sd4 {
  margin-bottom: 8pt;
  margin-top: 8pt;
}

.formatted-font .usfm_lh {
  font-size: 100%;
}

.text-spacing .usfm_lh {
  text-indent: 2.5vw;
}

.formatted-font .usfm_li {
  font-size: 100%;
}

.text-spacing .usfm_li {
  text-indent: -7.5vw;
}

.text-spacing[dir='ltr'] .usfm_li {
  margin-left: 10vw;
}

.text-spacing[dir='rtl'] .usfm_li {
  margin-right: 10vw;
}

.formatted-font .usfm_li1 {
  font-size: 100%;
}

.text-spacing .usfm_li1 {
  text-indent: -7.5vw;
}

.text-spacing[dir='ltr'] .usfm_li1 {
  margin-left: 10vw;
}

.text-spacing[dir='rtl'] .usfm_li1 {
  margin-right: 10vw;
}

.formatted-font .usfm_li2 {
  font-size: 100%;
}

.text-spacing .usfm_li2 {
  text-indent: -7.5vw;
}

.text-spacing[dir='ltr'] .usfm_li2 {
  margin-left: 15vw;
}

.text-spacing[dir='rtl'] .usfm_li2 {
  margin-right: 15vw;
}

.formatted-font .usfm_li3 {
  font-size: 100%;
}

.text-spacing .usfm_li3 {
  text-indent: -7.5vw;
}

.text-spacing[dir='ltr'] .usfm_li3 {
  margin-left: 20vw;
}

.text-spacing[dir='rtl'] .usfm_li3 {
  margin-right: 20vw;
}

.formatted-font .usfm_li4 {
  font-size: 100%;
}

.text-spacing .usfm_li4 {
  text-indent: -7.5vw;
}

.text-spacing[dir='ltr'] .usfm_li4 {
  margin-left: 25vw;
}

.text-spacing[dir='rtl'] .usfm_li4 {
  margin-right: 25vw;
}

.formatted-font .usfm_lf {
  font-size: 100%;
}

.formatted-font .usfm_lim {
  font-size: 100%;
}

.text-spacing .usfm_lim {
  text-indent: -7.5vw;
}

.text-spacing[dir='ltr'] .usfm_lim {
  margin-left: 15vw;
  margin-right: 5vw;
}

.text-spacing[dir='rtl'] .usfm_lim {
  margin-left: 5vw;
  margin-right: 15vw;
}

.formatted-font .usfm_lim1 {
  font-size: 100%;
}

.text-spacing .usfm_lim1 {
  text-indent: -7.5vw;
}

.text-spacing[dir='ltr'] .usfm_lim1 {
  margin-left: 15vw;
  margin-right: 5vw;
}

.text-spacing[dir='rtl'] .usfm_lim1 {
  margin-left: 5vw;
  margin-right: 15vw;
}

.formatted-font .usfm_lim2 {
  font-size: 100%;
}

.text-spacing .usfm_lim2 {
  text-indent: -7.5vw;
}

.text-spacing[dir='ltr'] .usfm_lim2 {
  margin-left: 20vw;
}

.text-spacing[dir='rtl'] .usfm_lim2 {
  margin-right: 20vw;
}

.formatted-font .usfm_lim3 {
  font-size: 100%;
}

.text-spacing .usfm_lim3 {
  text-indent: -7.5vw;
}

.text-spacing[dir='ltr'] .usfm_lim3 {
  margin-left: 25vw;
}

.text-spacing[dir='rtl'] .usfm_lim3 {
  margin-right: 25vw;
}

.formatted-font .usfm_lim4 {
  font-size: 100%;
}

.text-spacing .usfm_lim4 {
  text-indent: -7.5vw;
}

.text-spacing[dir='ltr'] .usfm_lim4 {
  margin-left: 30vw;
}

.text-spacing[dir='rtl'] .usfm_lim4 {
  margin-right: 30vw;
}

.usfm_lit {
  text-align: end;
}

.formatted-font .usfm_lit {
  font-weight: bold;
  font-size: 100%;
}

.formatted-font .usfm_ph {
  font-size: 100%;
}

.text-spacing .usfm_ph {
  text-indent: -5vw;
}

.text-spacing[dir='ltr'] .usfm_ph {
  margin-left: 10vw;
}

.text-spacing[dir='rtl'] .usfm_ph {
  margin-right: 10vw;
}

.formatted-font .usfm_ph1 {
  font-size: 100%;
}

.text-spacing .usfm_ph1 {
  text-indent: -5vw;
}

.text-spacing[dir='ltr'] .usfm_ph1 {
  margin-left: 10vw;
}

.text-spacing[dir='rtl'] .usfm_ph1 {
  margin-right: 10vw;
}

.formatted-font .usfm_ph2 {
  font-size: 100%;
}

.text-spacing .usfm_ph2 {
  text-indent: -5vw;
}

.text-spacing[dir='ltr'] .usfm_ph2 {
  margin-left: 15vw;
}

.text-spacing[dir='rtl'] .usfm_ph2 {
  margin-right: 15vw;
}

.formatted-font .usfm_ph3 {
  font-size: 100%;
}

.text-spacing .usfm_ph3 {
  text-indent: -5vw;
}

.text-spacing[dir='ltr'] .usfm_ph3 {
  margin-left: 20vw;
}

.text-spacing[dir='rtl'] .usfm_ph3 {
  margin-right: 20vw;
}

/* CharNode */

.formatted-font .usfm_qs {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_qac {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_litl {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_lik {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_liv {
  font-size: 100%;
}

.formatted-font .usfm_liv1 {
  font-size: 100%;
}

.formatted-font .usfm_liv2 {
  font-size: 100%;
}

.formatted-font .usfm_liv3 {
  font-size: 100%;
}

.formatted-font .usfm_liv4 {
  font-size: 100%;
}

.formatted-font .usfm_liv5 {
  font-size: 100%;
}

.formatted-font .usfm_rq {
  font-size: 83%;
  font-style: italic;
}

.formatted-font .usfm_qt {
  font-weight: bold;
  font-size: 100%;
}

.formatted-font .usfm_nd {
  font-size: 100%;
  text-decoration: underline;
}

.formatted-font .usfm_tl {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_dc {
  font-style: italic;
}

.formatted-font .usfm_bk {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_sig {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_pn {
  font-weight: bold;
  font-size: 100%;
  text-decoration: underline;
}

.formatted-font .usfm_png {
  font-size: 100%;
  text-decoration: underline;
}

/* check if deprecated */

.formatted-font .usfm_addpn {
  font-weight: bold;
  font-size: 100%;
  font-style: italic;
  text-decoration: underline;
}

.formatted-font .usfm_wj {
  color: #d43128;
  font-size: 100%;
}

.formatted-font .usfm_k {
  font-weight: bold;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_sls {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_ord {
  vertical-align: text-top;
  font-size: 66%;
}

.formatted-font .usfm_add {
  font-weight: bold;
  font-style: italic;
}

.formatted-font .usfm_no {
  font-size: 100%;
}

.formatted-font .usfm_it {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_bd {
  font-weight: bold;
  font-size: 100%;
}

.formatted-font .usfm_bdit {
  font-weight: bold;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_em {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_sc {
  font-size: 100%;
  font-variant: small-caps;
}

.formatted-font .usfm_sup {
  vertical-align: text-top;
  font-size: 66%;
}

/* check if deprecated */

.formatted-font .usfm_pb {
  font-size: 100%;
}

/* check if deprecated */

.formatted-font .usfm_fig {
  font-size: 100%;
}

.formatted-font .usfm_jmp {
  color: #003380;
  text-decoration: underline;
}

.formatted-font .usfm_pro {
  font-size: 83%;
}

.formatted-font .usfm_rb {
  font-size: 100%;
}

.formatted-font .usfm_w {
  font-size: 100%;
}

.formatted-font .usfm_wh {
  font-size: 100%;
}

.formatted-font .usfm_wg {
  font-size: 100%;
}

.formatted-font .usfm_wa {
  font-size: 100%;
}

/* check if deprecated */

.formatted-font .usfm_ndx {
  font-size: 100%;
}

/* Footnote NoteNode */

.formatted-font .usfm_f {
  font-size: 100%;
}

.formatted-font .usfm_fe {
  font-size: 100%;
}

/* Footnote CharNode */

.formatted-font .usfm_fr {
  font-weight: bold;
  font-size: 100%;
}

.formatted-font .usfm_ft {
  font-size: 100%;
}

.formatted-font .usfm_fk {
  font-weight: bold;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_fq {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_fqa {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_fl {
  font-weight: bold;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_fw {
  font-size: 100%;
}

.formatted-font .usfm_fp {
  font-size: 100%;
}

.formatted-font .usfm_fv {
  vertical-align: text-top;
  font-size: 66%;
}

.formatted-font .usfm_fdc {
  font-size: 100%;
}

.formatted-font .usfm_fm {
  vertical-align: text-top;
  font-size: 66%;
}

/* Cross-reference NoteNode */

.formatted-font .usfm_x {
  font-size: 100%;
}

/* Cross-reference CharNode */

.formatted-font .usfm_xo {
  font-weight: bold;
  font-size: 100%;
}

.formatted-font .usfm_xop {
  font-size: 100%;
}

.formatted-font .usfm_xt {
  font-size: 100%;
  unicode-bidi: embed;
}

.formatted-font .usfm_xta {
  font-size: 100%;
}

.formatted-font .usfm_xk {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_xq {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_xot {
  font-size: 100%;
}

.formatted-font .usfm_xnt {
  font-size: 100%;
}

.formatted-font .usfm_xdc {
  font-size: 100%;
}

/* periph */

.formatted-font .usfm_periph {
  font-weight: bold;
  color: #e87217;
  font-size: 116%;
}

.text-spacing .usfm_periph {
  margin-bottom: 4pt;
  margin-top: 16pt;
}

.formatted-font .usfm_p1 {
  font-size: 100%;
}

.text-spacing .usfm_p1 {
  text-indent: 2.5vw;
}

.formatted-font .usfm_p2 {
  font-size: 100%;
}

.text-spacing .usfm_p2 {
  text-indent: 2.5vw;
}

.text-spacing[dir='ltr'] .usfm_p2 {
  margin-left: 2.5vw;
}

.text-spacing[dir='rtl'] .usfm_p2 {
  margin-right: 2.5vw;
}

.formatted-font .usfm_k1 {
  font-size: 100%;
}

.formatted-font .usfm_k2 {
  font-size: 100%;
}

.formatted-font .usfm_xtSee {
  color: #003380;
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_xtSeeAlso {
  color: #003380;
  font-size: 100%;
  font-style: italic;
}

/* MilestoneNode */

.formatted-font .usfm_qt-s {
  font-size: 100%;
}

.formatted-font .usfm_qt-e {
  font-size: 100%;
}

.formatted-font .usfm_qt1-s {
  font-size: 100%;
}

.formatted-font .usfm_qt1-e {
  font-size: 100%;
}

.formatted-font .usfm_qt2-s {
  font-size: 100%;
}

.formatted-font .usfm_qt2-e {
  font-size: 100%;
}

.formatted-font .usfm_qt3-s {
  font-size: 100%;
}

.formatted-font .usfm_qt3-e {
  font-size: 100%;
}

.formatted-font .usfm_qt4-s {
  font-size: 100%;
}

.formatted-font .usfm_qt4-e {
  font-size: 100%;
}

.formatted-font .usfm_qt5-s {
  font-size: 100%;
}

.formatted-font .usfm_qt5-e {
  font-size: 100%;
}

.formatted-font .usfm_ts-s {
  font-size: 100%;
}

.formatted-font .usfm_ts-e {
  font-size: 100%;
}

/* table */

.formatted-font .usfm_tr {
  font-size: 100%;
}

.text-spacing .usfm_tr {
  text-indent: -5vw;
}

.text-spacing[dir='ltr'] .usfm_tr {
  margin-left: 10vw;
}

.text-spacing[dir='rtl'] .usfm_tr {
  margin-right: 10vw;
}

.formatted-font .usfm_th1 {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_th2 {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_th3 {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_th4 {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_th5 {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_tc1 {
  font-size: 100%;
}

.formatted-font .usfm_tc2 {
  font-size: 100%;
}

.formatted-font .usfm_tc3 {
  font-size: 100%;
}

.formatted-font .usfm_tc4 {
  font-size: 100%;
}

.formatted-font .usfm_tc5 {
  font-size: 100%;
}

.formatted-font .usfm_thc1 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_thc1 {
  text-align: center;
}

.formatted-font .usfm_thc2 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_thc2 {
  text-align: center;
}

.formatted-font .usfm_thc3 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_thc3 {
  text-align: center;
}

.formatted-font .usfm_thc4 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_thc4 {
  text-align: center;
}

.formatted-font .usfm_thc5 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_thc5 {
  text-align: center;
}

.formatted-font .usfm_tcc1 {
  font-size: 100%;
}

.text-spacing .usfm_tcc1 {
  text-align: center;
}

.formatted-font .usfm_tcc2 {
  font-size: 100%;
}

.text-spacing .usfm_tcc2 {
  text-align: center;
}

.formatted-font .usfm_tcc3 {
  font-size: 100%;
}

.text-spacing .usfm_tcc3 {
  text-align: center;
}

.formatted-font .usfm_tcc4 {
  font-size: 100%;
}

.text-spacing .usfm_tcc4 {
  text-align: center;
}

.formatted-font .usfm_tcc5 {
  font-size: 100%;
}

.text-spacing .usfm_tcc5 {
  text-align: center;
}

.formatted-font .usfm_thr1 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_thr1 {
  text-align: end;
}

.formatted-font .usfm_thr2 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_thr2 {
  text-align: end;
}

.formatted-font .usfm_thr3 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_thr3 {
  text-align: end;
}

.formatted-font .usfm_thr4 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_thr4 {
  text-align: end;
}

.formatted-font .usfm_thr5 {
  font-size: 100%;
  font-style: italic;
}

.text-spacing .usfm_thr5 {
  text-align: end;
}

.formatted-font .usfm_tcr1 {
  font-size: 100%;
}

.text-spacing .usfm_tcr1 {
  text-align: end;
}

.formatted-font .usfm_tcr2 {
  font-size: 100%;
}

.text-spacing .usfm_tcr2 {
  text-align: end;
}

.formatted-font .usfm_tcr3 {
  font-size: 100%;
}

.text-spacing .usfm_tcr3 {
  text-align: end;
}

.formatted-font .usfm_tcr4 {
  font-size: 100%;
}

.text-spacing .usfm_tcr4 {
  text-align: end;
}

.formatted-font .usfm_tcr5 {
  font-size: 100%;
}

.text-spacing .usfm_tcr5 {
  text-align: end;
}

/* table/unknown */

.formatted-font .usfm_tr1 {
  font-size: 100%;
}

.text-spacing .usfm_tr1 {
  text-indent: -5vw;
}

.text-spacing[dir='ltr'] .usfm_tr1 {
  margin-left: 10vw;
}

.text-spacing[dir='rtl'] .usfm_tr1 {
  margin-right: 10vw;
}

.formatted-font .usfm_tr2 {
  font-size: 100%;
}

.text-spacing .usfm_tr2 {
  text-indent: -5vw;
}

.text-spacing[dir='ltr'] .usfm_tr2 {
  margin-left: 15vw;
}

.text-spacing[dir='rtl'] .usfm_tr2 {
  margin-right: 15vw;
}

.formatted-font .usfm_ps {
  font-size: 100%;
}

.text-spacing .usfm_ps {
  text-indent: 2.5vw;
}

.formatted-font .usfm_psi {
  font-size: 100%;
}

.text-spacing .usfm_psi {
  text-indent: 2.5vw;
  margin-left: 5vw;
  margin-right: 5vw;
}

.formatted-font .usfm_fs {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_wr {
  font-size: 100%;
  font-style: italic;
}

.formatted-font .usfm_pub {
  font-size: 83%;
}

.formatted-font .usfm_toc {
  font-size: 83%;
}

.formatted-font .usfm_pref {
  font-size: 83%;
}

.formatted-font .usfm_intro {
  font-size: 83%;
}

.formatted-font .usfm_conc {
  font-size: 83%;
}

.formatted-font .usfm_glo {
  font-size: 83%;
}

.formatted-font .usfm_idx {
  font-size: 83%;
}

.formatted-font .usfm_maps {
  font-size: 83%;
}

.formatted-font .usfm_cov {
  font-size: 83%;
}

.formatted-font .usfm_spine {
  font-size: 83%;
}

.formatted-font .usfm_pubinfo {
  color: #003380;
  font-size: 100%;
}

.formatted-font .usfm_zpa-xb {
  font-size: 100%;
}

.formatted-font .usfm_zpa-xc {
  font-weight: bold;
  font-size: 100%;
}

.formatted-font .usfm_zpa-xv {
  font-size: 100%;
}

.formatted-font .usfm_zpa-d {
  font-size: 100%;
}

.marker {
  unicode-bidi: isolate;
}

.marker-visible .marker,
.marker-hidden .marker,
.marker-hidden .book[data-code]::before,
.marker-editable .book .marker {
  color: rgba(140, 140, 140, 1);
}

.marker-visible .marker:not(.chapter),
.marker-hidden .marker:not(.chapter) {
  font-size: 0.7em;
}

.notetext {
  unicode-bidi: embed;
}

.attribute {
  color: rgba(170, 170, 170, 1);
}

.attribute:hover {
  color: rgba(25, 25, 25, 1);
}

.invalid {
  color: rgba(204, 30, 20, 1);
  font-weight: bold;
}

/* NoteNode >  Marker, TextNode */

.note.collapsed .marker[data-lexical-decorator='true'],
.note.collapsed span[data-lexical-text='true'] {
  display: none;
}

/* Expanded NoteNode background styling */

.marker-visible .note.expanded,
.marker-hidden .note.expanded {
  /* Light neon blue */
  background-color: rgba(173, 216, 230, 0.3);
  padding: 1px 8px;
  /* Pill-like rounded ends */
  border-radius: 15px;
}

/* First level nested CharNodes within expanded NoteNode */

.marker-visible .note.expanded .char,
.marker-hidden .note.expanded .char {
  /* Slightly darker neon blue */
  background-color: rgba(173, 216, 230, 0.45);
  padding: 1px 6px;
  /* Pill-like rounded ends */
  border-radius: 12px;
}

/* Second level nested CharNodes within expanded NoteNode */

.marker-visible .note.expanded .char .char,
.marker-hidden .note.expanded .char .char {
  /* Darker neon blue */
  background-color: rgba(173, 216, 230, 0.6);
  padding: 0px 4px;
  /* Pill-like rounded ends */
  border-radius: 10px;
}

/* NoteNode > ImmutableNoteCallerNode */

.immutable-note-caller > button,
/* Styles for Preview (and Ruby) views */
.caller_preview,
.previewcallee {
  color: rgba(18, 82, 179, 1);
}

.note.collapsed .immutable-note-caller > button,
/* Styles for Preview (and Ruby) views */
.caller_preview,
.previewcallee {
  font-weight: bold;
  line-height: 1;
  vertical-align: super;
  font-size: 0.66em;
}

.note.expanded .immutable-note-caller > button {
  vertical-align: baseline;
  font-size: 1em;
  font-weight: normal;
}

.immutable-note-caller > button {
  cursor: pointer;
  text-decoration: none;
  border: 0;
  padding: 0;
  background-color: inherit;
}

@counter-style note-callers {
  system: alphabetic;
  /* These symbols are updated in TS by the \`NoteNodePlugin\`. */
  symbols: 'a' 'b' 'c' 'd' 'e' 'f' 'g' 'h' 'i' 'j' 'k' 'l' 'm' 'n' 'o' 'p' 'q' 'r' 's' 't' 'u' 'v'
    'w' 'x' 'y' 'z';
}

.editor-input {
  counter-reset: caller;
}

.editor-input.reset-counters {
  counter-reset: none;
}

.immutable-note-caller[data-caller='+'] {
  counter-increment: caller;
}

.note.collapsed .immutable-note-caller[data-caller='+'] > button::before {
  content: counter(caller, note-callers);
}

.formatted-font.text-spacing[contenteditable='false']
  .note.collapsed
  .immutable-note-caller[data-caller='-'] {
  display: none;
}

.caller_big {
  unicode-bidi: normal;
  color: rgba(18, 82, 179, 1);
  font-weight: bold;
  text-indent: 0pt;
  vertical-align: text-top;
  font-size: 0.66em;
}

.caller_small {
  unicode-bidi: normal;
  color: rgba(18, 82, 179, 1);
  font-family: 'Times New Roman', serif;
  vertical-align: text-top;
  text-indent: 0pt;
  font-size: 0.66em;
}

.caller_highlight {
  background-color: #ffffb5;
  border-top: solid 1px #0000ff;
  border-bottom: solid 1px #0000ff;
}

.opennote {
  color: #7777ff;
}

table {
  border-collapse: collapse;
}

td {
  border: 1px solid #000000;
  page-break-inside: avoid;
  /* FB27281 adding padding based on font size*/
  padding-right: 0.28em;
  padding-left: 0.28em;
}

td.markercell {
  border-style: none;
}

rt {
  cursor: pointer;
}

/* Style statues */

.status_unknown {
  color: rgba(204, 30, 20, 1);
  font-weight: bold;
}

.status_invalid {
  border-bottom: 1px solid rgba(204, 30, 20, 1);
  color: rgba(204, 30, 20, 1);
}

.caption {
  text-align: center;
  font-style: italic;
  font-weight: bold;
}

.figure {
  text-align: center;
}

.sidebar {
  border: solid 1px rgba(18, 82, 179, 1);
  margin-left: 10px;
}

/* VerseNode, ImmutableVerseNode */

.formatted-font .verse {
  background-color: rgba(222, 222, 222, 1);
  vertical-align: super;
  font-size: 0.66em;
}

.text-spacing .verse {
  margin: 0px 2px 0px 2px;
  padding: 0px 1px 0px 1px;
  text-indent: 0in;
  white-space: nowrap;
}

span.unread img {
  background-color: #ffff99;
  position: relative;
  bottom: -1px; /* negative of border-width to align baseline */
  border-width: 1px;
  border-style: solid;
  border-color: #808080;
}

span.read img {
  background-color: transparent;
  position: relative;
  bottom: 0px;
  border-width: 0px;
  border-style: none;
}

.annot_comment_todo {
  border-bottom: 1px dashed #888888;
}

.annot_comment_done {
  border-bottom: 1px dashed #888888;
}

.annot_greencursor {
  background-color: rgba(152, 235, 157, 1);
}

.annot_goldcursor {
  background-color: rgba(255, 255, 163, 1);
}

.annot_bluecursor {
  background-color: rgba(204, 224, 255, 1);
}

.annot_greycursor {
  background-color: rgba(222, 222, 222, 1);
}

.annot_violetcursor {
  background-color: rgba(233, 212, 255, 1);
}

.annot_spellingerror {
  background-repeat: repeat-x;
  background-position: left bottom;
  padding-bottom: 0px;
  vertical-align: text-top;
}

.annot_spellingunknown {
  background-repeat: repeat-x;
  background-position: left bottom;
  padding-bottom: 0px;
  vertical-align: text-top;
}

.found_term {
  background-color: rgba(222, 222, 222, 1);
  text-indent: 0;
  margin-left: 0;
  display: inline-block;
  border-bottom-style: solid;
  border-bottom-width: medium medium thick medium;
  border-bottom-color: rgba(252, 252, 252, 1);
  text-decoration: inherit;
}

.guessed_term {
  background-color: rgba(255, 191, 143, 1);
  text-indent: 0;
  margin-left: 0;
  display: inline-block;
  border-bottom-style: solid;
  border-bottom-width: medium medium thick medium;
  border-bottom-color: rgba(252, 252, 252, 1);
  text-decoration: inherit;
}

.found_term.unselected_term {
  background-color: rgba(222, 222, 222, 0.6);
  text-indent: 0;
  margin-left: 0;
  display: inline-block;
  border-bottom-style: solid;
  border-bottom-width: medium medium thick medium;
  border-bottom-color: rgba(252, 252, 252, 1);
  text-decoration: inherit;
}

.guessed_term.unselected_term {
  background-color: rgba(255, 191, 143, 0.3);
  text-indent: 0;
  margin-left: 0;
  display: inline-block;
  border-bottom-style: solid;
  border-bottom-width: medium medium thick medium;
  border-bottom-color: rgba(252, 252, 252, 1);
  text-decoration: inherit;
}

.selected_term {
  border-style: none none solid none;
  text-indent: 0;
  margin-left: 0;
  display: inline-block;
  border-bottom-style: solid;
  border-bottom-width: medium medium thick medium;
  border-bottom-color: rgba(252, 252, 252, 1);
  text-decoration: inherit;
}

.annot_reference_link {
  border-bottom: 1px solid #93c4ff;
}

.annot_invalid_reference {
  border-bottom: 1px solid #ff8080;
}

.annot_checkError {
  border-top: 1px solid #ff0000;
  border-bottom: 1px solid #ff0000;
  background-color: rgba(255, 204, 204, 0.5);
}

/* Copied from https://github.com/eten-tech-foundation/scripture-editors/blob/platform_v0.8.1/packages/platform/src/editor/editor.css */

/* stylelint-disable selector-no-qualifying-type */

/* Lexical */

.editor-container {
  margin: 0 auto 20px;
  border-radius: 2px;
  max-width: 600px;
  color: #000;
  position: relative;
  line-height: 20px;
  font-weight: 400;
  text-align: start;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.editor-toolbar-container-readonly {
  display: none;
}

.editor-toolbar-container-editable {
  display: inline;
}

.editor-inner {
  background: #fff;
  position: relative;
}

.editor-input {
  min-height: 150px;
  resize: none;
  font-size: 15px;
  position: relative;
  tab-size: 1;
  outline: 0;
  padding: 15px 10px;
  flex: auto;
}

.editor-input > p {
  direction: inherit;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.5;
}

.editor-placeholder {
  color: #999;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 15px;
  font-size: 15px;
  user-select: none;
  display: inline-block;
  pointer-events: none;
  margin-block-start: 1em;
  margin-inline-start: calc(10px + 2.5vw);
  width: -webkit-fill-available;
}

.editor-text-bold {
  font-weight: bold;
}

.editor-text-italic {
  font-style: italic;
}

.editor-text-underline {
  text-decoration: underline;
}

.editor-text-strikethrough {
  text-decoration: line-through;
}

/* stylelint-disable-next-line selector-class-pattern */

.editor-text-underlineStrikethrough {
  text-decoration: underline line-through;
}

.editor-text-code {
  background-color: rgb(240, 242, 245);
  padding: 1px 0.25rem;
  font-family: Menlo, Consolas, Monaco, monospace;
  font-size: 94%;
}

.editor-link {
  color: rgb(33, 111, 219);
  text-decoration: none;
}

.tree-view-output {
  display: block;
  background: #222;
  color: #fff;
  padding: 5px;
  font-size: 12px;
  white-space: pre-wrap;
  margin: 1px auto 10px;
  max-height: 250px;
  position: relative;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: auto;
  line-height: 14px;
}

/* stylelint-disable-next-line selector-class-pattern */

.editor-tokenComment {
  color: slategray;
}

/* stylelint-disable-next-line selector-class-pattern */

.editor-tokenPunctuation {
  color: #999;
}

/* stylelint-disable-next-line selector-class-pattern */

.editor-tokenProperty {
  color: #905;
}

/* stylelint-disable-next-line selector-class-pattern */

.editor-tokenSelector {
  color: #690;
}

/* stylelint-disable-next-line selector-class-pattern */

.editor-tokenOperator {
  color: #9a6e3a;
}

/* stylelint-disable-next-line selector-class-pattern */

.editor-tokenAttr {
  color: #07a;
}

/* stylelint-disable-next-line selector-class-pattern */

.editor-tokenVariable {
  color: #e90;
}

/* stylelint-disable-next-line selector-class-pattern */

.editor-tokenFunction {
  color: #dd4a68;
}

.editor-typed-mark-external-spelling {
  background: inherit;
  text-decoration: underline wavy red;
}

.editor-typed-mark-external-grammar {
  background: inherit;
  text-decoration: underline wavy grey;
}

.editor-typed-mark-external-other {
  background: inherit;
  text-decoration: underline wavy green;
}

.editor-typed-mark-external-spelling.editor-typed-mark-external-grammar {
  text-decoration-color: rgb(192, 64, 64);
}

.editor-typed-mark-external-spelling.editor-typed-mark-external-grammar.editor-typed-mark-external-other {
  text-decoration-color: rgb(128, 85, 43);
}

.editor-typed-mark-internal-comment {
  background: rgba(255, 212, 0, 0.14);
  border-bottom: 2px solid rgba(255, 212, 0, 0.3);
  padding-bottom: 2px;
}

.editor-typed-mark-internal-comment.selected {
  background: rgba(255, 212, 0, 0.5);
  border-bottom: 2px solid rgba(255, 212, 0, 1);
}

/* stylelint-disable-next-line selector-class-pattern */

.editor-typed-markOverlap-internal-comment {
  background: rgba(255, 212, 0, 0.3);
  border-bottom: 2px solid rgba(255, 212, 0, 0.7);
}

/* stylelint-disable-next-line selector-class-pattern */

.editor-typed-markOverlap-internal-comment.selected {
  background: rgba(255, 212, 0, 0.7);
  border-bottom: 2px solid rgba(255, 212, 0, 0.7);
}

.marker-editable [class^='editor-typed-mark'] {
  background: none;
  border-bottom: 0;
}

.editor-paragraph {
  margin: 0;
  margin-bottom: 8px;
  position: relative;
}

.editor-paragraph:last-child {
  margin-bottom: 0;
}

pre::-webkit-scrollbar {
  background: transparent;
  width: 10px;
}

pre::-webkit-scrollbar-thumb {
  background: #999;
}

.link-editor {
  position: absolute;
  z-index: 100;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  max-width: 300px;
  width: 100%;
  opacity: 0;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  transition: opacity 0.5s;
}

.link-editor .link-input {
  display: block;
  width: calc(100% - 24px);
  box-sizing: border-box;
  margin: 8px 12px;
  padding: 8px 12px;
  border-radius: 15px;
  background-color: #eee;
  font-size: 15px;
  color: rgb(5, 5, 5);
  border: 0;
  outline: 0;
  position: relative;
  font-family: inherit;
}

.link-editor div.link-edit {
  background-image: url('/assets/images/icons/pencil-fill.svg');
  background-size: 16px;
  background-position: center;
  background-repeat: no-repeat;
  width: 35px;
  vertical-align: -0.25em;
  position: absolute;
  top: 0;
  bottom: 0;
  cursor: pointer;
}

.link-editor[dir='ltr'] div.link-edit {
  right: 0;
}

.link-editor[dir='rtl'] div.link-edit {
  left: 0;
}

.link-editor .link-input a {
  color: rgb(33, 111, 219);
  text-decoration: none;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-editor[dir='ltr'] .link-input a {
  margin-right: 30px;
}

.link-editor[dir='rtl'] .link-input a {
  margin-left: 30px;
}

.link-editor .link-input a:hover {
  text-decoration: underline;
}

.link-editor .button {
  width: 20px;
  height: 20px;
  display: inline-block;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 2px;
}

.link-editor .button.hovered {
  width: 20px;
  height: 20px;
  display: inline-block;
  background-color: #eee;
}

.dropdown {
  z-index: 100;
  display: block;
  position: fixed;
  box-shadow:
    0 12px 28px 0 rgba(0, 0, 0, 0.2),
    0 2px 4px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  min-height: 40px;
  background-color: #fff;
}

.dropdown .item {
  margin: 0 8px;
  padding: 8px;
  color: #050505;
  cursor: pointer;
  line-height: 16px;
  font-size: 15px;
  display: flex;
  align-content: center;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
  border: 0;
  max-width: 250px;
}

.dropdown .item.block-marker {
  min-width: 420px;
}

.dropdown .item.fontsize-item,
.dropdown .item.fontsize-item .text {
  min-width: unset;
}

.dropdown .item .active {
  display: flex;
  width: 20px;
  height: 20px;
  background-size: contain;
}

.dropdown .item:first-child {
  margin-top: 8px;
}

.dropdown .item:last-child {
  margin-bottom: 8px;
}

.dropdown .item:hover {
  background-color: #eee;
}

.dropdown .item .text {
  display: flex;
  line-height: 20px;
  flex-grow: 1;
  min-width: 150px;
  margin: 0;
  text-indent: 0;
}

.dropdown .item .icon {
  display: flex;
  width: 20px;
  height: 20px;
  user-select: none;
  margin-right: 12px;
  line-height: 16px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.dropdown .divider {
  width: auto;
  background-color: #eee;
  margin: 4px 8px;
  height: 1px;
}

button.item.dropdown-item-active {
  background-color: rgba(223, 232, 250, 0.3);
}

button.item.dropdown-item-active i {
  opacity: 1;
}

i.undo {
  background-image: url('/assets/images/icons/arrow-counterclockwise.svg');
}

i.redo {
  background-image: url('/assets/images/icons/arrow-clockwise.svg');
}

.icon.m,
.icon.nb,
.icon.p,
.icon.pi,
.icon.paragraph {
  background-image: url('/assets/images/icons/text-paragraph.svg');
}

.icon.ms,
.icon.ms1,
.icon.r,
.icon.s,
.icon.large-heading,
.icon.h1 {
  background-image: url('/assets/images/icons/type-h1.svg');
}

.icon.ms2,
.icon.small-heading,
.icon.h2 {
  background-image: url('/assets/images/icons/type-h2.svg');
}

.icon.ms3,
.icon.h3 {
  background-image: url('/assets/images/icons/type-h3.svg');
}

.icon.mt,
.icon.mt1,
.icon.square-1 {
  background-image: url('/assets/images/icons/1-square.svg');
}

.icon.mt2,
.icon.square-2 {
  background-image: url('/assets/images/icons/2-square.svg');
}

.icon.mt3,
.icon.square-3 {
  background-image: url('/assets/images/icons/3-square.svg');
}

.icon.mt4,
.icon.square-4 {
  background-image: url('/assets/images/icons/4-square.svg');
}

.icon.cl,
.icon.bookmark {
  background-image: url('/assets/images/icons/bookmark.svg');
}

.icon.ide,
.icon.h,
.icon.h1,
.icon.h2,
.icon.h3,
.icon.toc1,
.icon.toc2,
.icon.toc3,
.icon.file-earmark {
  background-image: url('/assets/images/icons/file-earmark.svg');
}

.icon.bullet-list,
.icon.ul {
  background-image: url('/assets/images/icons/list-ul.svg');
}

.icon.numbered-list,
.icon.ol {
  background-image: url('/assets/images/icons/list-ol.svg');
}

.icon.b,
.icon.q1,
.icon.q2,
.icon.quote {
  background-image: url('/assets/images/icons/chat-square-quote.svg');
}

.icon.ban {
  background-image: url('/assets/images/icons/ban.svg');
}

.icon.code {
  background-image: url('/assets/images/icons/code.svg');
}

i.bold {
  background-image: url('/assets/images/icons/type-bold.svg');
}

i.italic {
  background-image: url('/assets/images/icons/type-italic.svg');
}

i.underline {
  background-image: url('/assets/images/icons/type-underline.svg');
}

i.strikethrough {
  background-image: url('/assets/images/icons/type-strikethrough.svg');
}

i.code {
  background-image: url('/assets/images/icons/code.svg');
}

i.link {
  background-image: url('/assets/images/icons/link.svg');
}

i.left-align {
  background-image: url('/assets/images/icons/text-left.svg');
}

i.center-align {
  background-image: url('/assets/images/icons/text-center.svg');
}

i.right-align {
  background-image: url('/assets/images/icons/text-right.svg');
}

i.justify-align {
  background-image: url('/assets/images/icons/justify.svg');
}

.actions i {
  background-size: contain;
  display: inline-block;
  height: 15px;
  width: 5px;
  vertical-align: -0.25em;
}

i.chevron-down {
  background-color: transparent;
  background-size: contain;
  display: inline-block;
  height: 8px;
  width: 8px;
  background-image: url('/assets/images/icons/chevron-down.svg');
}

.debug-timetravel-panel {
  overflow: hidden;
  padding: 0 0 10px;
  margin: auto;
  display: flex;
}

.debug-timetravel-panel-slider {
  padding: 0;
  flex: 8;
}

.debug-timetravel-panel-button {
  padding: 0;
  border: 0;
  background: none;
  flex: 1;
  color: #fff;
  font-size: 12px;
}

.debug-timetravel-panel-button:hover {
  text-decoration: underline;
}

.debug-timetravel-button {
  border: 0;
  padding: 0;
  font-size: 12px;
  top: 10px;
  right: 15px;
  position: absolute;
  background: none;
  color: #fff;
}

.debug-timetravel-button:hover {
  text-decoration: underline;
}

.toolbar {
  display: flex;
  margin-bottom: 1px;
  background: #fff;
  padding: 4px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  vertical-align: middle;
  overflow: auto;
  height: 36px;
  position: sticky;
  top: 0;
  z-index: 2;
}

button.toolbar-item {
  border: 0;
  display: flex;
  background: none;
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
  vertical-align: middle;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
}

button.toolbar-item:disabled {
  cursor: not-allowed;
}

button.toolbar-item.spaced {
  margin-right: 2px;
}

button.toolbar-item i.format {
  background-size: contain;
  height: 18px;
  width: 18px;
  vertical-align: -0.25em;
  display: flex;
  opacity: 0.6;
}

button.toolbar-item:disabled .icon,
button.toolbar-item:disabled .text,
button.toolbar-item:disabled i.format,
button.toolbar-item:disabled .chevron-down {
  opacity: 0.2;
}

button.toolbar-item.active {
  background-color: rgba(223, 232, 250, 0.3);
}

button.toolbar-item.active i {
  opacity: 1;
}

.toolbar-item:hover:not([disabled]) {
  background-color: #eee;
}

.toolbar-item.font-family .text {
  display: block;
  max-width: 40px;
}

.toolbar .code-language {
  width: 150px;
}

.toolbar .toolbar-item .text {
  line-height: 20px;
  vertical-align: middle;
  font-size: 14px;
  color: #777;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 170px;
  white-space: nowrap;
  display: inline-block;
  height: 20px;
  text-align: start;
  padding-right: 10px;
}

.toolbar .toolbar-item .icon {
  display: flex;
  width: 20px;
  height: 20px;
  user-select: none;
  margin-right: 8px;
  line-height: 16px;
  background-size: contain;
}

.toolbar i.chevron-down,
.toolbar-item i.chevron-down {
  margin-top: 3px;
  width: 16px;
  height: 16px;
  display: flex;
  user-select: none;
}

.toolbar i.chevron-down.inside {
  width: 16px;
  height: 16px;
  display: flex;
  margin-left: -25px;
  margin-top: 11px;
  margin-right: 10px;
  pointer-events: none;
}

.toolbar .divider {
  width: 1px;
  background-color: #eee;
  margin: 0 4px;
}

/* ContextMenuPlugin */

.auto-embed-menu {
  width: 150px;
}

.typeahead-popover {
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.typeahead-popover ul {
  padding: 0;
  list-style: none;
  margin: 0;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.typeahead-popover ul::-webkit-scrollbar {
  display: none;
}

.typeahead-popover ul li {
  margin: 0;
  min-width: 180px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  border-radius: 8px;
}

.typeahead-popover ul li.selected {
  background: #eee;
}

.typeahead-popover ul li.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.typeahead-popover li {
  margin: 0 8px;
  padding: 8px;
  color: #050505;
  cursor: pointer;
  line-height: 16px;
  font-size: 15px;
  display: flex;
  align-content: center;
  flex-direction: row;
  flex-shrink: 0;
  background-color: #fff;
  border-radius: 8px;
  border: 0;
}

.typeahead-popover li.active {
  display: flex;
  width: 20px;
  height: 20px;
  background-size: contain;
}

.typeahead-popover li:first-child {
  border-radius: 8px 8px 0 0;
}

.typeahead-popover li:last-child {
  border-radius: 0 0 8px 8px;
}

.typeahead-popover li:hover {
  background-color: #eee;
}

.typeahead-popover li .text {
  display: flex;
  line-height: 20px;
  flex-grow: 1;
  min-width: 150px;
}

.typeahead-popover li .icon {
  display: flex;
  width: 20px;
  height: 20px;
  user-select: none;
  margin-right: 8px;
  line-height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* Copied from https://github.com/eten-tech-foundation/scripture-editors/blob/platform_v0.8.0/libs/shared/src/styles/nodes-menu.css */

/* Floating Menu Styles */

.floating-box:has(> .autocomplete-menu-container) {
  background: #f1f1f1;
  border: 1px solid #ccc;
}

.floating-box .autocomplete-menu-options {
  display: block;
  text-align: left;
  width: fit-content;
  overflow-x: clip;
  text-overflow: ellipsis;
  overflow-y: auto;
  max-height: 200px;
}

.autocomplete-menu-options button {
  background: transparent;
  color: inherit;
  display: grid;
  grid-template-columns: min-content minmax(0, 90vw);
  align-items: baseline;
  max-width: 400px;
  gap: 1rem;
  width: 100%;
  white-space: nowrap;
  font-size: 0.9rem;
  border-radius: 0;
  border: 0;
}

/* stylelint-disable-next-line selector-no-qualifying-type */

.autocomplete-menu-options button[aria-selected='true'] {
  background: rgb(0 0 0 / 5%);
}

/* stylelint-disable-next-line selector-no-qualifying-type */

.autocomplete-menu-options button.active {
  background: rgb(189, 232, 255);
}

.autocomplete-menu-options button .description {
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  white-space: nowrap;
  text-align: right;
  align-items: baseline;
  font-size: 0.7rem;
  opacity: 0.8;
}

/* stylelint-disable-next-line selector-no-qualifying-type */

.autocomplete-menu-container input[type='text'] {
  width: auto;
  padding: 0.5rem;
  box-sizing: border-box;
  background: #e9e9e9;
  border: 0;
  outline: none;
  color: #222;
  font-size: 1rem;
  margin: 0.4rem;
  border-radius: 0.2rem;
  font-family: inherit;
}

.autocomplete-menu-container {
  display: flex;
  flex-direction: column;
}

.autocomplete-menu-container.inverse {
  flex-direction: column-reverse;
}

/* @import './tailwind.css'; */

/* Modified from \`extensions\\src\\platform-scripture-editor\\src\\_editor-overrides.scss\` */

/* Platform.Bible image protocol overrides */

/* stylelint-disable selector-no-qualifying-type */

/* this is required for many overwrites */

/* stylelint-disable selector-class-pattern */

/*  Platform.Bible modifications */

.editor-container {
  max-width: none;
  color: var(--foreground);
  overflow-y: auto;
  flex-grow: 1;
  margin: 0;

  /*  remove rounded top corners to look better in tabs */
  .toolbar {
    border-bottom: 1px solid var(--border);
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    background-color: var(--background);
    color: var(--color);
  }
}

/*  text selection */

:focus ::selection {
  color: var(--primary-foreground);
  background-color: var(--primary);
}

::selection {
  color: var(--secondary-foreground);
  background-color: var(--secondary);
}

/*  focus ring */

:focus-visible:not(.editor-input),
.CommentPlugin_CommentInputBox_Editor:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  --tw-ring-offset-width: 2px;
  --tw-ring-color: var(--ring);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
    var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
  --tw-ring-offset-color: var(--background);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

/*  buttons */

/*  icon button variant "ghost" */

.Button__root,
button.toolbar-item {
  color: var(--foreground);

  i,
  i.format {
    opacity: unset;
  }

  &:disabled i,
  &:disabled i.format {
    opacity: 0.5;
  }
}

/*  hover button, input button */

.CommentPlugin_CommentsPanel_SendButton,
.CommentPlugin_CommentsPanel_List_DeleteButton {
  color: var(--accent-foreground);
}

/*  text button variant "ghost" on popover */

.Modal__closeButton {
  color: var(--popover-foreground);
  background-color: var(--popover);
}

/*  toggle button */

.CommentPlugin_ShowCommentsButton.active {
  background-color: var(--accent);
}

/*  hover and active states */

.toolbar-item:hover:not([disabled]),
.toolbar-item:active:not([disabled]),
.CommentPlugin_ShowCommentsButton.Button__root:hover:not([disabled]),
/* needs to be overwritten */
.CommentPlugin_AddCommentBox_button.Button__root:hover:not([disabled]),
/* fills until the border */
.CommentPlugin_AddCommentBox:hover:not([disabled]),
.CommentPlugin_CommentsPanel_SendButton:hover:not([disabled]),
.CommentPlugin_CommentsPanel_SendButton:active:not([disabled]),
.CommentPlugin_CommentsPanel_List_DeleteButton:hover:not([disabled]),
.CommentPlugin_CommentsPanel_List_DeleteButton:active:not([disabled]),
.Modal__closeButton:hover:not([disabled]) {
  color: var(--accent-foreground);
  background-color: var(--accent);
}

.CommentPlugin_CommentsPanel_List_DeleteButton:hover,
.CommentPlugin_CommentsPanel_SendButton:hover i.send,
.CommentPlugin_CommentsPanel_DeletedComment,
.CommentPlugin_CommentsPanel_List_Comment:hover .CommentPlugin_CommentsPanel_List_DeleteButton,
.CommentPlugin_CommentsPanel_List_Thread_QuoteBox:hover
  .CommentPlugin_CommentsPanel_List_DeleteButton {
  filter: unset;
  opacity: unset;
}

/*  toolbar */

.toolbar .toolbar-item .text {
  color: var(--foreground);
}

.toolbar .divider {
  background-color: var(--border);
}

.dropdown {
  background-color: var(--popover);

  .item {
    color: var(--popover-foreground);
    background-color: var(--popover);
  }

  .item:hover {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  .divider {
    background-color: var(--muted);
  }
}

/*  make the toolbar shrink and grow dynamically */

/*  work around https://github.com/BiblioNexus-Foundation/scripture-editors/issues/126 */

.toolbar-item.block-controls {
  max-width: calc(100% - 140px);

  .icon.block-marker.nb {
    min-width: 20px;
  }

  .chevron-down {
    min-width: 16px;
  }
}

.toolbar .toolbar-item .icon {
  min-width: 20px;
}

/*  _commenting.scss */

.CommentPlugin_CommentInputBox,
.Modal__modal {
  background-color: var(--popover);
  color: var(--popover-foreground);

  &::before {
    background-color: var(--popover);
    border-color: transparent transparent var(--popover) var(--popover);
  }

  .Button__root {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
  }

  .Button__root.primary {
    background-color: var(--primary);
    color: var(--primary-foreground);
  }

  .Button__root:hover:not([disabled]) {
    opacity: 0.8;
  }
}

.typeahead-popover,
.typeahead-popover li {
  background-color: var(--popover);
  color: var(--popover-foreground);
}

.typeahead-popover ul li.selected,
.typeahead-popover li:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.CommentPlugin_CommentInputBox_Editor,
.CommentPlugin_CommentsPanel_Editor {
  background-color: var(--popover);
  color: var(--popover-foreground);
  border-color: var(--border);
  caret-color: var(--foreground);
}

.CommentPlugin_CommentsPanel_Heading,
.CommentPlugin_CommentsPanel_List_Thread {
  border-color: var(--border);
}

.CommentPlugin_ShowCommentsButton {
  z-index: 10;
  right: 26px;
}

/*  work around https://github.com/BiblioNexus-Foundation/scripture-editors/issues/127 */

.CommentPlugin_AddCommentBox {
  left: unset !important;
  right: 0 !important;

  background-color: var(--popover);
  color: var(--popover-foreground);
  border: 1px solid var(--border);
}

.CommentPlugin_AddCommentBox_button {
  color: var(--popover-foreground);

  &:hover {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }
}

.CommentPlugin_CommentsPanel {
  background-color: var(--popover);
  color: var(--popover-foreground);
}

.CommentPlugin_CommentsPanel_SendButton {
  margin: 10px;
  top: 0;
  right: 0;
}

/*  inside the editor */

.editor-inner {
  background: var(--background);
}

.formatted-font .verse {
  background-color: var(--secondary);
}

/*  icons */

button {
  i,
  i.chevron-down,
  .icon {
    mask-size: contain;
    mask-position: center;
    background-color: currentColor;
  }
}

i.add-comment {
  /*  could be replaced with lucid icon message-square-text */
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-chat-left-text'%3e%3cpath%20d='M14%201a1%201%200%200%201%201%201v8a1%201%200%200%201-1%201H4.414A2%202%200%200%200%203%2011.586l-2%202V2a1%201%200%200%201%201-1h12zM2%200a2%202%200%200%200-2%202v12.793a.5.5%200%200%200%20.854.353l2.853-2.853A1%201%200%200%201%204.414%2012H14a2%202%200%200%200%202-2V2a2%202%200%200%200-2-2H2z'/%3e%3cpath%20d='M3%203.5a.5.5%200%200%201%20.5-.5h9a.5.5%200%200%201%200%201h-9a.5.5%200%200%201-.5-.5zM3%206a.5.5%200%200%201%20.5-.5h9a.5.5%200%200%201%200%201h-9A.5.5%200%200%201%203%206zm0%202.5a.5.5%200%200%201%20.5-.5h5a.5.5%200%200%201%200%201h-5a.5.5%200%200%201-.5-.5z'/%3e%3c/svg%3e");
  background-image: none;
}

i.comments {
  /*  could be replaced with lucid icon messages-square */
  mask-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13%205.885v1.166a3.95%203.95%200%200%201-3.949%203.95H6.917a.748.748%200%200%200-.45.15l-1.345%201.007a.752.752%200%200%200-.032%201.181A2.933%202.933%200%200%200%206.95%2014h2.716l2.534%201.901a.506.506%200%200%200%20.524.047A.501.501%200%200%200%2013%2015.5V14h.051a2.949%202.949%200%200%200%202.95-2.949v-3.05a3.002%203.002%200%200%200-2.002-2.83.756.756%200%200%200-.999.714'%20fill='%23050505'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.05%201H2.95A2.952%202.952%200%200%200%200%203.949v3.102A2.952%202.952%200%200%200%202.949%2010H3v1.5a.502.502%200%200%200%20.8.4L6.334%2010H9.05A2.952%202.952%200%200%200%2012%207.05V3.95A2.952%202.952%200%200%200%209.05%201'%20fill='%23050505'/%3e%3c/svg%3e");
  background-image: none;
}

i.send {
  /*  could be replaced with lucid icon send */
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-send'%3e%3cpath%20d='M15.854.146a.5.5%200%200%201%20.11.54l-5.819%2014.547a.75.75%200%200%201-1.329.124l-3.178-4.995L.643%207.184a.75.75%200%200%201%20.124-1.33L15.314.037a.5.5%200%200%201%20.54.11ZM6.636%2010.07l2.761%204.338L14.13%202.576%206.636%2010.07Zm6.787-8.201L1.591%206.602l4.339%202.76%207.494-7.493Z'/%3e%3c/svg%3e");
  background-image: none;
}

.CommentPlugin_CommentsPanel_List_DeleteButton i.delete {
  /*  could be replaced with lucid icon trash-2 */
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-trash3'%3e%3cpath%20d='M6.5%201h3a.5.5%200%200%201%20.5.5v1H6v-1a.5.5%200%200%201%20.5-.5ZM11%202.5v-1A1.5%201.5%200%200%200%209.5%200h-3A1.5%201.5%200%200%200%205%201.5v1H2.506a.58.58%200%200%200-.01%200H1.5a.5.5%200%200%200%200%201h.538l.853%2010.66A2%202%200%200%200%204.885%2016h6.23a2%202%200%200%200%201.994-1.84l.853-10.66h.538a.5.5%200%200%200%200-1h-.995a.59.59%200%200%200-.01%200H11Zm1.958%201-.846%2010.58a1%201%200%200%201-.997.92h-6.23a1%201%200%200%201-.997-.92L3.042%203.5h9.916Zm-7.487%201a.5.5%200%200%201%20.528.47l.5%208.5a.5.5%200%200%201-.998.06L5%205.03a.5.5%200%200%201%20.47-.53Zm5.058%200a.5.5%200%200%201%20.47.53l-.5%208.5a.5.5%200%201%201-.998-.06l.5-8.5a.5.5%200%200%201%20.528-.47ZM8%204.5a.5.5%200%200%201%20.5.5v8.5a.5.5%200%200%201-1%200V5a.5.5%200%200%201%20.5-.5Z'/%3e%3c/svg%3e");
  background-image: none;
  /*  linting does not like a duplicate rule, therefore putting it in here. */
  /*  overwriting requires this exact selector (or a more specific one) */
  left: 8px;
  top: 8px;
}

/*  _editor.scss */

.link-editor div.link-edit {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-pencil-fill'%3e%3cpath%20d='M12.854.146a.5.5%200%200%200-.707%200L10.5%201.793%2014.207%205.5l1.647-1.646a.5.5%200%200%200%200-.708l-3-3zm.646%206.061L9.793%202.5%203.293%209H3.5a.5.5%200%200%201%20.5.5v.5h.5a.5.5%200%200%201%20.5.5v.5h.5a.5.5%200%200%201%20.5.5v.5h.5a.5.5%200%200%201%20.5.5v.207l6.5-6.5zm-7.468%207.468A.5.5%200%200%201%206%2013.5V13h-.5a.5.5%200%200%201-.5-.5V12h-.5a.5.5%200%200%201-.5-.5V11h-.5a.5.5%200%200%201-.5-.5V10h-.5a.499.499%200%200%201-.175-.032l-.179.178a.5.5%200%200%200-.11.168l-2%205a.5.5%200%200%200%20.65.65l5-2a.5.5%200%200%200%20.168-.11l.178-.178z'/%3e%3c/svg%3e");
  background-image: none;
}

i.undo {
  /*  could be replaced with lucid icon rotate-ccw */
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-arrow-counterclockwise'%3e%3cpath%20fill-rule='evenodd'%20d='M8%203a5%205%200%201%201-4.546%202.914.5.5%200%200%200-.908-.417A6%206%200%201%200%208%202v1z'/%3e%3cpath%20d='M8%204.466V.534a.25.25%200%200%200-.41-.192L5.23%202.308a.25.25%200%200%200%200%20.384l2.36%201.966A.25.25%200%200%200%208%204.466z'/%3e%3c/svg%3e");
  background-image: none;
}

i.redo {
  /*  could be replaced with lucid icon rotate-cw */
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-arrow-clockwise'%3e%3cpath%20fill-rule='evenodd'%20d='M8%203a5%205%200%201%200%204.546%202.914.5.5%200%200%201%20.908-.417A6%206%200%201%201%208%202v1z'/%3e%3cpath%20d='M8%204.466V.534a.25.25%200%200%201%20.41-.192l2.36%201.966c.12.1.12.284%200%20.384L8.41%204.658A.25.25%200%200%201%208%204.466z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.m,
.icon.nb,
.icon.p,
.icon.pi,
.icon.paragraph {
  /*  could be replaced with lucid icon text */
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-text-paragraph'%3e%3cpath%20fill-rule='evenodd'%20d='M2%2012.5a.5.5%200%200%201%20.5-.5h7a.5.5%200%200%201%200%201h-7a.5.5%200%200%201-.5-.5zm0-3a.5.5%200%200%201%20.5-.5h11a.5.5%200%200%201%200%201h-11a.5.5%200%200%201-.5-.5zm0-3a.5.5%200%200%201%20.5-.5h11a.5.5%200%200%201%200%201h-11a.5.5%200%200%201-.5-.5zm4-3a.5.5%200%200%201%20.5-.5h7a.5.5%200%200%201%200%201h-7a.5.5%200%200%201-.5-.5z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.ms,
.icon.ms1,
.icon.r,
.icon.s,
.icon.large-heading,
.icon.h1 {
  /*  could be replaced with lucid icon heading-1 */
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-type-h1'%3e%3cpath%20d='M8.637%2013V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329%200V3.669h-1.244L10.5%205.316v1.265l2.16-1.565h.062V13h1.244z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.ms2,
.icon.small-heading,
.icon.h2 {
  /*  could be replaced with lucid icon heading-2 */
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-type-h2'%3e%3cpath%20d='M7.638%2013V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668%201.716-1.668.957%200%201.675.608%201.675%201.572%200%20.855-.554%201.504-1.067%202.085l-3.513%203.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998%201.586-1.784%201.586-2.953%200-1.463-1.155-2.556-2.919-2.556-1.941%200-2.966%201.326-2.966%202.74v.049h1.223z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.ms3,
.icon.h3 {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-type-h3'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M11.07%208.4h1.049c1.174%200%201.99.69%202.004%201.724.014%201.034-.802%201.786-2.068%201.779-1.11-.007-1.905-.605-1.99-1.357h-1.21C8.926%2011.91%2010.116%2013%2012.028%2013c1.99%200%203.439-1.188%203.404-2.87-.028-1.553-1.287-2.221-2.096-2.313v-.07c.724-.127%201.814-.935%201.772-2.293-.035-1.392-1.21-2.468-3.038-2.454-1.927.007-2.94%201.196-2.981%202.426h1.23c.064-.71.732-1.336%201.744-1.336%201.027%200%201.744.64%201.744%201.568.007.95-.738%201.639-1.744%201.639h-.991V8.4ZM7.495%2013V3.201H6.174v4.15H1.32V3.2H0V13h1.32V8.513h4.854V13h1.32Z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.mt,
.icon.mt1,
.icon.square-1 {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-1-square'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M9.283%204.002V12H7.971V5.338h-.065L6.072%206.656V5.385l1.899-1.383h1.312Z'/%3e%3cpath%20d='M0%202a2%202%200%200%201%202-2h12a2%202%200%200%201%202%202v12a2%202%200%200%201-2%202H2a2%202%200%200%201-2-2V2Zm15%200a1%201%200%200%200-1-1H2a1%201%200%200%200-1%201v12a1%201%200%200%200%201%201h12a1%201%200%200%200%201-1V2Z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.mt2,
.icon.square-2 {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-2-square'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M6.646%206.24v.07H5.375v-.064c0-1.213.879-2.402%202.637-2.402%201.582%200%202.613.949%202.613%202.215%200%201.002-.6%201.667-1.287%202.43l-.096.107-1.974%202.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705%200-.744-.557-1.236-1.313-1.236-.843%200-1.336.615-1.336%201.306Z'/%3e%3cpath%20d='M0%202a2%202%200%200%201%202-2h12a2%202%200%200%201%202%202v12a2%202%200%200%201-2%202H2a2%202%200%200%201-2-2V2Zm15%200a1%201%200%200%200-1-1H2a1%201%200%200%200-1%201v12a1%201%200%200%200%201%201h12a1%201%200%200%200%201-1V2Z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.mt3,
.icon.square-3 {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-3-square'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M7.918%208.414h-.879V7.342h.838c.78%200%201.348-.522%201.342-1.237%200-.709-.563-1.195-1.348-1.195-.79%200-1.312.498-1.348%201.055H5.275c.036-1.137.95-2.115%202.625-2.121%201.594-.012%202.608.885%202.637%202.062.023%201.137-.885%201.776-1.482%201.875v.07c.703.07%201.71.64%201.734%201.917.024%201.459-1.277%202.396-2.93%202.396-1.705%200-2.707-.967-2.754-2.144H6.33c.059.597.68%201.06%201.541%201.066.973.006%201.6-.563%201.588-1.354-.006-.779-.621-1.318-1.541-1.318Z'/%3e%3cpath%20d='M0%202a2%202%200%200%201%202-2h12a2%202%200%200%201%202%202v12a2%202%200%200%201-2%202H2a2%202%200%200%201-2-2V2Zm15%200a1%201%200%200%200-1-1H2a1%201%200%200%200-1%201v12a1%201%200%200%200%201%201h12a1%201%200%200%200%201-1V2Z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.mt4,
.icon.square-4 {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-4-square'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M7.519%205.057c.22-.352.439-.703.657-1.055h1.933v5.332h1.008v1.107H10.11V12H8.85v-1.559H4.978V9.322c.77-1.427%201.656-2.847%202.542-4.265ZM6.225%209.281v.053H8.85V5.063h-.065c-.867%201.33-1.787%202.806-2.56%204.218Z'/%3e%3cpath%20d='M0%202a2%202%200%200%201%202-2h12a2%202%200%200%201%202%202v12a2%202%200%200%201-2%202H2a2%202%200%200%201-2-2V2Zm15%200a1%201%200%200%200-1-1H2a1%201%200%200%200-1%201v12a1%201%200%200%200%201%201h12a1%201%200%200%200%201-1V2Z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.cl,
.icon.bookmark {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-bookmark'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M2%202a2%202%200%200%201%202-2h8a2%202%200%200%201%202%202v13.5a.5.5%200%200%201-.777.416L8%2013.101l-5.223%202.815A.5.5%200%200%201%202%2015.5V2zm2-1a1%201%200%200%200-1%201v12.566l4.723-2.482a.5.5%200%200%201%20.554%200L13%2014.566V2a1%201%200%200%200-1-1H4z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.ide,
.icon.h,
.icon.h1,
.icon.h2,
.icon.h3,
.icon.toc1,
.icon.toc2,
.icon.toc3,
.icon.file-earmark {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-file-earmark'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M14%204.5V14a2%202%200%200%201-2%202H4a2%202%200%200%201-2-2V2a2%202%200%200%201%202-2h5.5L14%204.5zm-3%200A1.5%201.5%200%200%201%209.5%203V1H4a1%201%200%200%200-1%201v12a1%201%200%200%200%201%201h8a1%201%200%200%200%201-1V4.5h-2z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.bullet-list,
.icon.ul {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-list-ul'%3e%3cpath%20fill-rule='evenodd'%20d='M5%2011.5a.5.5%200%200%201%20.5-.5h9a.5.5%200%200%201%200%201h-9a.5.5%200%200%201-.5-.5zm0-4a.5.5%200%200%201%20.5-.5h9a.5.5%200%200%201%200%201h-9a.5.5%200%200%201-.5-.5zm0-4a.5.5%200%200%201%20.5-.5h9a.5.5%200%200%201%200%201h-9a.5.5%200%200%201-.5-.5zm-3%201a1%201%200%201%200%200-2%201%201%200%200%200%200%202zm0%204a1%201%200%201%200%200-2%201%201%200%200%200%200%202zm0%204a1%201%200%201%200%200-2%201%201%200%200%200%200%202z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.numbered-list,
.icon.ol {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-list-ol'%3e%3cpath%20fill-rule='evenodd'%20d='M5%2011.5a.5.5%200%200%201%20.5-.5h9a.5.5%200%200%201%200%201h-9a.5.5%200%200%201-.5-.5zm0-4a.5.5%200%200%201%20.5-.5h9a.5.5%200%200%201%200%201h-9a.5.5%200%200%201-.5-.5zm0-4a.5.5%200%200%201%20.5-.5h9a.5.5%200%200%201%200%201h-9a.5.5%200%200%201-.5-.5z'/%3e%3cpath%20d='M1.713%2011.865v-.474H2c.217%200%20.363-.137.363-.317%200-.185-.158-.31-.361-.31-.223%200-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595%200%200%201-.492.594v.033a.615.615%200%200%201%20.569.631c.003.533-.502.8-1.051.8-.656%200-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254%200%20.424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583%200%20.96.326.96.756%200%20.389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508%200-.18-.147-.32-.342-.32a.33.33%200%200%200-.342.338v.041zM2.564%205h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.b,
.icon.q1,
.icon.q2,
.icon.quote {
  /*  could be replaced with lucid icon message-square-quote */
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-chat-square-quote'%3e%3cpath%20d='M14%201a1%201%200%200%201%201%201v8a1%201%200%200%201-1%201h-2.5a2%202%200%200%200-1.6.8L8%2014.333%206.1%2011.8a2%202%200%200%200-1.6-.8H2a1%201%200%200%201-1-1V2a1%201%200%200%201%201-1h12zM2%200a2%202%200%200%200-2%202v8a2%202%200%200%200%202%202h2.5a1%201%200%200%201%20.8.4l1.9%202.533a1%201%200%200%200%201.6%200l1.9-2.533a1%201%200%200%201%20.8-.4H14a2%202%200%200%200%202-2V2a2%202%200%200%200-2-2H2z'/%3e%3cpath%20d='M7.066%204.76A1.665%201.665%200%200%200%204%205.668a1.667%201.667%200%200%200%202.561%201.406c-.131.389-.375.804-.777%201.22a.417.417%200%201%200%20.6.58c1.486-1.54%201.293-3.214.682-4.112zm4%200A1.665%201.665%200%200%200%208%205.668a1.667%201.667%200%200%200%202.561%201.406c-.131.389-.375.804-.777%201.22a.417.417%200%201%200%20.6.58c1.486-1.54%201.293-3.214.682-4.112z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.ban {
  /*  could be replaced with lucid icon lucide-ban */
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-ban'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M15%208a6.973%206.973%200%200%200-1.71-4.584l-9.874%209.875A7%207%200%200%200%2015%208ZM2.71%2012.584l9.874-9.875a7%207%200%200%200-9.874%209.874ZM16%208A8%208%200%201%201%200%208a8%208%200%200%201%2016%200Z'/%3e%3c/svg%3e");
  background-image: none;
}

.icon.code {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-code'%3e%3cpath%20d='M5.854%204.854a.5.5%200%201%200-.708-.708l-3.5%203.5a.5.5%200%200%200%200%20.708l3.5%203.5a.5.5%200%200%200%20.708-.708L2.707%208l3.147-3.146zm4.292%200a.5.5%200%200%201%20.708-.708l3.5%203.5a.5.5%200%200%201%200%20.708l-3.5%203.5a.5.5%200%200%201-.708-.708L13.293%208l-3.147-3.146z'/%3e%3c/svg%3e");
  background-image: none;
}

i.bold {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-type-bold'%3e%3cpath%20d='M8.21%2013c2.106%200%203.412-1.087%203.412-2.823%200-1.306-.984-2.283-2.324-2.386v-.055a2.176%202.176%200%200%200%201.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908%204.674h1.696c.963%200%201.517.451%201.517%201.244%200%20.834-.629%201.32-1.73%201.32H5.908V4.673zm0%206.788V8.598h1.73c1.217%200%201.88.492%201.88%201.415%200%20.943-.643%201.449-1.832%201.449H5.907z'/%3e%3c/svg%3e");
  background-image: none;
}

i.italic {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-type-italic'%3e%3cpath%20d='M7.991%2011.674%209.53%204.455c.123-.595.246-.71%201.347-.807l.11-.52H7.211l-.11.52c1.06.096%201.128.212%201.005.807L6.57%2011.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z'/%3e%3c/svg%3e");
  background-image: none;
}

i.underline {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-type-underline'%3e%3cpath%20d='M5.313%203.136h-1.23V9.54c0%202.105%201.47%203.623%203.917%203.623s3.917-1.518%203.917-3.623V3.136h-1.23v6.323c0%201.49-.978%202.57-2.687%202.57-1.709%200-2.687-1.08-2.687-2.57V3.136zM12.5%2015h-9v-1h9v1z'/%3e%3c/svg%3e");
  background-image: none;
}

i.strikethrough {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-type-strikethrough'%3e%3cpath%20d='M6.333%205.686c0%20.31.083.581.27.814H5.166a2.776%202.776%200%200%201-.099-.76c0-1.627%201.436-2.768%203.48-2.768%201.969%200%203.39%201.175%203.445%202.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23%200-2.18.602-2.18%201.607zm2.194%207.478c-2.153%200-3.589-1.107-3.705-2.81h1.23c.144%201.06%201.129%201.703%202.544%201.703%201.34%200%202.31-.705%202.31-1.675%200-.827-.547-1.374-1.914-1.675L8.046%208.5H1v-1h14v1h-3.504c.468.437.675.994.675%201.697%200%201.826-1.436%202.967-3.644%202.967z'/%3e%3c/svg%3e");
  background-image: none;
}

i.code {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-code'%3e%3cpath%20d='M5.854%204.854a.5.5%200%201%200-.708-.708l-3.5%203.5a.5.5%200%200%200%200%20.708l3.5%203.5a.5.5%200%200%200%20.708-.708L2.707%208l3.147-3.146zm4.292%200a.5.5%200%200%201%20.708-.708l3.5%203.5a.5.5%200%200%201%200%20.708l-3.5%203.5a.5.5%200%200%201-.708-.708L13.293%208l-3.147-3.146z'/%3e%3c/svg%3e");
  background-image: none;
}

i.link {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-link'%3e%3cpath%20d='M6.354%205.5H4a3%203%200%200%200%200%206h3a3%203%200%200%200%202.83-4H9c-.086%200-.17.01-.25.031A2%202%200%200%201%207%2010.5H4a2%202%200%201%201%200-4h1.535c.218-.376.495-.714.82-1z'/%3e%3cpath%20d='M9%205.5a3%203%200%200%200-2.83%204h1.098A2%202%200%200%201%209%206.5h3a2%202%200%201%201%200%204h-1.535a4.02%204.02%200%200%201-.82%201H12a3%203%200%201%200%200-6H9z'/%3e%3c/svg%3e");
  background-image: none;
}

i.left-align {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-text-left'%3e%3cpath%20fill-rule='evenodd'%20d='M2%2012.5a.5.5%200%200%201%20.5-.5h7a.5.5%200%200%201%200%201h-7a.5.5%200%200%201-.5-.5zm0-3a.5.5%200%200%201%20.5-.5h11a.5.5%200%200%201%200%201h-11a.5.5%200%200%201-.5-.5zm0-3a.5.5%200%200%201%20.5-.5h7a.5.5%200%200%201%200%201h-7a.5.5%200%200%201-.5-.5zm0-3a.5.5%200%200%201%20.5-.5h11a.5.5%200%200%201%200%201h-11a.5.5%200%200%201-.5-.5z'/%3e%3c/svg%3e");
  background-image: none;
}

i.center-align {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-text-center'%3e%3cpath%20fill-rule='evenodd'%20d='M4%2012.5a.5.5%200%200%201%20.5-.5h7a.5.5%200%200%201%200%201h-7a.5.5%200%200%201-.5-.5zm-2-3a.5.5%200%200%201%20.5-.5h11a.5.5%200%200%201%200%201h-11a.5.5%200%200%201-.5-.5zm2-3a.5.5%200%200%201%20.5-.5h7a.5.5%200%200%201%200%201h-7a.5.5%200%200%201-.5-.5zm-2-3a.5.5%200%200%201%20.5-.5h11a.5.5%200%200%201%200%201h-11a.5.5%200%200%201-.5-.5z'/%3e%3c/svg%3e");
  background-image: none;
}

i.right-align {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-text-right'%3e%3cpath%20fill-rule='evenodd'%20d='M6%2012.5a.5.5%200%200%201%20.5-.5h7a.5.5%200%200%201%200%201h-7a.5.5%200%200%201-.5-.5zm-4-3a.5.5%200%200%201%20.5-.5h11a.5.5%200%200%201%200%201h-11a.5.5%200%200%201-.5-.5zm4-3a.5.5%200%200%201%20.5-.5h7a.5.5%200%200%201%200%201h-7a.5.5%200%200%201-.5-.5zm-4-3a.5.5%200%200%201%20.5-.5h11a.5.5%200%200%201%200%201h-11a.5.5%200%200%201-.5-.5z'/%3e%3c/svg%3e");
  background-image: none;
}

i.justify-align {
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-justify'%3e%3cpath%20fill-rule='evenodd'%20d='M2%2012.5a.5.5%200%200%201%20.5-.5h11a.5.5%200%200%201%200%201h-11a.5.5%200%200%201-.5-.5zm0-3a.5.5%200%200%201%20.5-.5h11a.5.5%200%200%201%200%201h-11a.5.5%200%200%201-.5-.5zm0-3a.5.5%200%200%201%20.5-.5h11a.5.5%200%200%201%200%201h-11a.5.5%200%200%201-.5-.5zm0-3a.5.5%200%200%201%20.5-.5h11a.5.5%200%200%201%200%201h-11a.5.5%200%200%201-.5-.5z'/%3e%3c/svg%3e");
  background-image: none;
}

i.chevron-down {
  /*  could be replaced with lucid icon chevron-down */
  mask-image: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-chevron-down'%3e%3cpath%20fill-rule='evenodd'%20d='M1.646%204.646a.5.5%200%200%201%20.708%200L8%2010.293l5.646-5.647a.5.5%200%200%201%20.708.708l-6%206a.5.5%200%200%201-.708%200l-6-6a.5.5%200%200%201%200-.708z'/%3e%3c/svg%3e");
  background-image: none;
}

/* This was needed after introducing the story description and the \`CanvasWithDescription\` item. */

.toolbar {
  min-height: 45px;
}

/* Darker background when the Pilcrow toggle is active to match other toggles */

.toolbar .toolbar-item.active[aria-pressed='true'] {
  background-color: color-mix(in oklab, var(--accent) 85%, black);
}

/* Ensure the pilcrow glyph matches icon sizing and vertical centering */

.toolbar .toolbar-item .icon.pilcrow-icon {
  display: inline-flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  font-size: 16px; /* similar visual weight as other icons */
  line-height: 1;
  vertical-align: middle;
  background-color: unset;
  margin-right: 0;
}

body {
  /*  remove margins added by the electron browser user-agent style sheet */
  margin: 0;
}

/*  #region verse number highlight */

/*  Highlight keyframes thanks to chazsolo at https://stackoverflow.com/a/55835473 */

@keyframes highlight {
  from {
    background-color: yellow;
  }
}

.toolbar {
  height: initial;
}

.editor-container .highlighted {
  position: relative;
}

.editor-container .highlighted::before {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.8;
  animation: highlight 2s;
}

/*  #endregion */
/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
   shorter. */
.footnote-editor .editor-input {
  min-height: 75px;
}

.footnote-editor .typeahead-popover {
  z-index: 300;
}

.footnote-editor .immutable-note-caller {
  display: none;
}

/* Need to be able to override the styles for the editor that happens to have an underscore */
/* stylelint-disable selector-class-pattern */
.footnote-editor .text-spacing .usfm_p {
  text-indent: 0;
}
/**
 * This file was automatically generated on installation of the Shadcn/Lexical editor. The default
 * location of this file has been changed to integrate better with our project structure.
 *
 * Original file location: src/components/editor/themes/editor-theme.css
 *
 * Shadcn/Lexical Editor Documentation: https://shadcn-editor.vercel.app/docs/
 */

/* stylelint-disable selector-class-pattern */
/* Lexical editor theme classes use camelCase naming convention */

.EditorTheme__code {
  background-color: transparent;
  font-family: Menlo, Consolas, Monaco, monospace;
  display: block;
  padding: 8px 8px 8px 52px;
  line-height: 1.53;
  font-size: 13px;
  margin: 0;
  margin-top: 8px;
  margin-bottom: 8px;
  overflow-x: auto;
  border: 1px solid #ccc;
  position: relative;
  border-radius: 8px;
  tab-size: 2;
}

.EditorTheme__code::before {
  content: attr(data-gutter);
  position: absolute;
  background-color: transparent;
  border-right: 1px solid #ccc;
  left: 0;
  top: 0;
  padding: 8px;
  color: #777;
  white-space: pre-wrap;
  text-align: right;
  min-width: 25px;
}

.EditorTheme__table {
  border-collapse: collapse;
  border-spacing: 0;
  overflow-y: scroll;
  overflow-x: scroll;
  table-layout: fixed;
  width: fit-content;
  width: 100%;
  margin: 0 0 30px;
}

.EditorTheme__tokenComment {
  color: slategray;
}

.EditorTheme__tokenPunctuation {
  color: #999;
}

.EditorTheme__tokenProperty {
  color: #905;
}

.EditorTheme__tokenSelector {
  color: #690;
}

.EditorTheme__tokenOperator {
  color: #9a6e3a;
}

.EditorTheme__tokenAttr {
  color: #07a;
}

.EditorTheme__tokenVariable {
  color: #e90;
}

.EditorTheme__tokenFunction {
  color: #dd4a68;
}

.Collapsible__container {
  background-color: var(--background);
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.Collapsible__title {
  padding: 0.25rem;
  padding-left: 1rem;
  position: relative;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  list-style-type: disclosure-closed;
  list-style-position: inside;
}

.Collapsible__title p {
  display: inline-flex;
}

.Collapsible__title::marker {
  color: lightgray;
}

.Collapsible__container[open] > .Collapsible__title {
  list-style-type: disclosure-open;
}
`,"after-all");
