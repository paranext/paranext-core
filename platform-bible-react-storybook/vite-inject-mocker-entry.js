var hn=Object.defineProperty;var bn=(e,n,t)=>n in e?hn(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var q=(e,n,t)=>bn(e,typeof n!="symbol"?n+"":n,t);import{_ as xn}from"./assets/preload-helper-CTOgD26E.js";class ln{constructor(){q(this,"registryByUrl",new Map);q(this,"registryById",new Map)}clear(){this.registryByUrl.clear(),this.registryById.clear()}keys(){return this.registryByUrl.keys()}add(n){this.registryByUrl.set(n.url,n),this.registryById.set(n.id,n)}register(n,t,r,o,a){const l=typeof n=="object"?n.type:n;if(typeof n=="object"){const i=n;if(i instanceof X||i instanceof A||i instanceof H||i instanceof R)throw new TypeError(`[vitest] Cannot register a mock that is already defined. Expected a JSON representation from \`MockedModule.toJSON\`, instead got "${i.type}". Use "registry.add()" to update a mock instead.`);if(i.type==="automock"){const d=X.fromJSON(i);return this.add(d),d}else if(i.type==="autospy"){const d=A.fromJSON(i);return this.add(d),d}else if(i.type==="redirect"){const d=R.fromJSON(i);return this.add(d),d}else throw i.type==="manual"?new Error("Cannot set serialized manual mock. Define a factory function manually with `ManualMockedModule.fromJSON()`."):new Error(`Unknown mock type: ${i.type}`)}if(typeof t!="string")throw new TypeError("[vitest] Mocks require a raw string.");if(typeof o!="string")throw new TypeError("[vitest] Mocks require a url string.");if(typeof r!="string")throw new TypeError("[vitest] Mocks require an id string.");if(l==="manual"){if(typeof a!="function")throw new TypeError("[vitest] Manual mocks require a factory function.");const i=new H(t,r,o,a);return this.add(i),i}else if(l==="automock"||l==="autospy"){const i=l==="automock"?new X(t,r,o):new A(t,r,o);return this.add(i),i}else if(l==="redirect"){if(typeof a!="string")throw new TypeError("[vitest] Redirect mocks require a redirect string.");const i=new R(t,r,o,a);return this.add(i),i}else throw new Error(`[vitest] Unknown mock type: ${l}`)}delete(n){this.registryByUrl.delete(n)}get(n){return this.registryByUrl.get(n)}getById(n){return this.registryById.get(n)}has(n){return this.registryByUrl.has(n)}}class X{constructor(n,t,r){q(this,"type","automock");this.raw=n,this.id=t,this.url=r}static fromJSON(n){return new A(n.raw,n.id,n.url)}toJSON(){return{type:this.type,url:this.url,raw:this.raw,id:this.id}}}class A{constructor(n,t,r){q(this,"type","autospy");this.raw=n,this.id=t,this.url=r}static fromJSON(n){return new A(n.raw,n.id,n.url)}toJSON(){return{type:this.type,url:this.url,id:this.id,raw:this.raw}}}class R{constructor(n,t,r,o){q(this,"type","redirect");this.raw=n,this.id=t,this.url=r,this.redirect=o}static fromJSON(n){return new R(n.raw,n.id,n.url,n.redirect)}toJSON(){return{type:this.type,url:this.url,raw:this.raw,id:this.id,redirect:this.redirect}}}class H{constructor(n,t,r,o){q(this,"cache");q(this,"type","manual");this.raw=n,this.id=t,this.url=r,this.factory=o}async resolve(){if(this.cache)return this.cache;let n;try{n=await this.factory()}catch(t){const r=new Error('[vitest] There was an error when mocking a module. If you are using "vi.mock" factory, make sure there are no top level variables inside, since this call is hoisted to top of the file. Read more: https://vitest.dev/api/vi.html#vi-mock');throw r.cause=t,r}if(n===null||typeof n!="object"||Array.isArray(n))throw new TypeError(`[vitest] vi.mock("${this.raw}", factory?: () => unknown) is not returning an object. Did you mean to return an object with a "default" key?`);return this.cache=n}static fromJSON(n,t){return new H(n.raw,n.id,n.url,t)}toJSON(){return{type:this.type,url:this.url,id:this.id,raw:this.raw}}}function vn(e,n,t={}){const r=new Array,o=new yn,a=(d,f,w)=>{try{return d[f]=w,!0}catch{return!1}},l=(d,f)=>{const w=Y(d),h=w==="Module"||!!d.__esModule;for(const{key:x,descriptor:z}of W(d,h,e.globalConstructors)){if(!h&&z.get){try{Object.defineProperty(f,x,z)}catch{}continue}if(_n(x,w))continue;const u=d[x],s=o.getId(u);if(s!==void 0){r.push(()=>a(f,x,o.getMockedValue(s)));continue}const c=Y(u);if(Array.isArray(u)){a(f,x,[]);continue}const C=c.includes("Function")&&typeof u=="function";if((!C||u._isMockFunction)&&c!=="Object"&&c!=="Module"){a(f,x,u);continue}if(a(f,x,C?u:{})){if(C){let _=function(){if(this instanceof f[x])for(const{key:S,descriptor:T}of W(this,!1,e.globalConstructors)){if(T.get)continue;const L=this[S];if(Y(L).includes("Function")&&typeof L=="function"){const $=this[S],m=M(this,S).mockImplementation($),E=m.mockReset;m.mockRestore=m.mockReset=()=>(E.call(m),m.mockImplementation($),m)}}};if(!e.spyOn)throw new Error("[@vitest/mocker] `spyOn` is not defined. This is a Vitest error. Please open a new issue with reproduction.");const M=e.spyOn,P=M(f,x);if(e.type==="automock"){P.mockImplementation(_);const S=P.mockReset;P.mockRestore=P.mockReset=()=>(S.call(P),P.mockImplementation(_),P)}Object.defineProperty(f[x],"length",{value:0})}o.track(u,f[x]),l(u,f[x])}}},i=t;l(n,i);for(const d of r)d();return i}class yn{constructor(){q(this,"idMap",new Map);q(this,"mockedValueMap",new Map)}getId(n){return this.idMap.get(n)}getMockedValue(n){return this.mockedValueMap.get(n)}track(n,t){const r=this.idMap.size;return this.idMap.set(n,r),this.mockedValueMap.set(r,t),r}}function Y(e){return Object.prototype.toString.apply(e).slice(8,-1)}function _n(e,n){return n.includes("Function")&&typeof e=="string"&&["arguments","callee","caller","length","name"].includes(e)}function W(e,n,t){const{Map:r,Object:o,Function:a,RegExp:l,Array:i}=t,d=new r;let f=e;do{if(f===o.prototype||f===a.prototype||f===l.prototype)break;kn(f,w=>{const h=o.getOwnPropertyDescriptor(f,w);h&&d.set(w,{key:w,descriptor:h})})}while(f=o.getPrototypeOf(f));if(n&&!d.has("default")&&"default"in e){const w=o.getOwnPropertyDescriptor(e,"default");w&&d.set("default",{key:"default",descriptor:w})}return i.from(d.values())}function kn(e,n){const t=typeof n=="function"?n:r=>n.add(r);Object.getOwnPropertyNames(e).forEach(t),Object.getOwnPropertySymbols(e).forEach(t)}const zn=/^[A-Za-z]:\//;function dn(e=""){return e&&e.replace(/\\/g,"/").replace(zn,n=>n.toUpperCase())}const Sn=/^[/\\]{2}/,qn=/^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/,Cn=/^[A-Za-z]:$/,In=/.(\.[^./]+|\.)$/,En=function(e){if(e.length===0)return".";e=dn(e);const n=e.match(Sn),t=K(e),r=e[e.length-1]==="/";return e=Mn(e,!t),e.length===0?t?"/":r?"./":".":(r&&(e+="/"),Cn.test(e)&&(e+="/"),n?t?`//${e}`:`//./${e}`:t&&!K(e)?`/${e}`:e)},Pn=function(...e){let n="";for(const t of e)if(t)if(n.length>0){const r=n[n.length-1]==="/",o=t[0]==="/";r&&o?n+=t.slice(1):n+=r||o?t:`/${t}`}else n+=t;return En(n)};function Mn(e,n){let t="",r=0,o=-1,a=0,l=null;for(let i=0;i<=e.length;++i){if(i<e.length)l=e[i];else{if(l==="/")break;l="/"}if(l==="/"){if(!(o===i-1||a===1))if(a===2){if(t.length<2||r!==2||t[t.length-1]!=="."||t[t.length-2]!=="."){if(t.length>2){const d=t.lastIndexOf("/");d===-1?(t="",r=0):(t=t.slice(0,d),r=t.length-1-t.lastIndexOf("/")),o=i,a=0;continue}else if(t.length>0){t="",r=0,o=i,a=0;continue}}n&&(t+=t.length>0?"/..":"..",r=2)}else t.length>0?t+=`/${e.slice(o+1,i)}`:t=e.slice(o+1,i),r=i-o-1;o=i,a=0}else l==="."&&a!==-1?++a:a=-1}return t}const K=function(e){return qn.test(e)},Tn=function(e){if(e==="..")return"";const n=In.exec(dn(e));return n&&n[1]||""};var Nn={reset:[0,0],bold:[1,22,"\x1B[22m\x1B[1m"],dim:[2,22,"\x1B[22m\x1B[2m"],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29],black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],gray:[90,39],bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]},An=Object.entries(Nn);function D(e){return String(e)}D.open="";D.close="";function Rn(e=!1){let n=typeof process<"u"?process:void 0,t=(n==null?void 0:n.env)||{},r=(n==null?void 0:n.argv)||[];return!("NO_COLOR"in t||r.includes("--no-color"))&&("FORCE_COLOR"in t||r.includes("--color")||(n==null?void 0:n.platform)==="win32"||e&&t.TERM!=="dumb"||"CI"in t)||typeof window<"u"&&!!window.chrome}function Ln(e=!1){let n=Rn(e),t=(l,i,d,f)=>{let w="",h=0;do w+=l.substring(h,f)+d,h=f+i.length,f=l.indexOf(i,h);while(~f);return w+l.substring(h)},r=(l,i,d=l)=>{let f=w=>{let h=String(w),x=h.indexOf(i,l.length);return~x?l+t(h,i,d,x)+i:l+h+i};return f.open=l,f.close=i,f},o={isColorSupported:n},a=l=>`\x1B[${l}m`;for(let[l,i]of An)o[l]=n?r(a(i[0]),a(i[1]),i[2]):D;return o}Ln();function cn(e,n){return n.forEach(function(t){t&&typeof t!="string"&&!Array.isArray(t)&&Object.keys(t).forEach(function(r){if(r!=="default"&&!(r in e)){var o=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:function(){return t[r]}})}})}),Object.freeze(e)}function mn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var j={exports:{}},v={};/**
* @license React
* react-is.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/var G;function $n(){if(G)return v;G=1;var e=Symbol.for("react.transitional.element"),n=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.consumer"),l=Symbol.for("react.context"),i=Symbol.for("react.forward_ref"),d=Symbol.for("react.suspense"),f=Symbol.for("react.suspense_list"),w=Symbol.for("react.memo"),h=Symbol.for("react.lazy"),x=Symbol.for("react.view_transition"),z=Symbol.for("react.client.reference");function u(s){if(typeof s=="object"&&s!==null){var c=s.$$typeof;switch(c){case e:switch(s=s.type,s){case t:case o:case r:case d:case f:case x:return s;default:switch(s=s&&s.$$typeof,s){case l:case i:case h:case w:return s;case a:return s;default:return c}}case n:return c}}}return v.ContextConsumer=a,v.ContextProvider=l,v.Element=e,v.ForwardRef=i,v.Fragment=t,v.Lazy=h,v.Memo=w,v.Portal=n,v.Profiler=o,v.StrictMode=r,v.Suspense=d,v.SuspenseList=f,v.isContextConsumer=function(s){return u(s)===a},v.isContextProvider=function(s){return u(s)===l},v.isElement=function(s){return typeof s=="object"&&s!==null&&s.$$typeof===e},v.isForwardRef=function(s){return u(s)===i},v.isFragment=function(s){return u(s)===t},v.isLazy=function(s){return u(s)===h},v.isMemo=function(s){return u(s)===w},v.isPortal=function(s){return u(s)===n},v.isProfiler=function(s){return u(s)===o},v.isStrictMode=function(s){return u(s)===r},v.isSuspense=function(s){return u(s)===d},v.isSuspenseList=function(s){return u(s)===f},v.isValidElementType=function(s){return typeof s=="string"||typeof s=="function"||s===t||s===o||s===r||s===d||s===f||typeof s=="object"&&s!==null&&(s.$$typeof===h||s.$$typeof===w||s.$$typeof===l||s.$$typeof===a||s.$$typeof===i||s.$$typeof===z||s.getModuleId!==void 0)},v.typeOf=u,v}var Q;function Bn(){return Q||(Q=1,j.exports=$n()),j.exports}var fn=Bn(),Vn=mn(fn),On=cn({__proto__:null,default:Vn},[fn]),F={exports:{}},b={};/**
* @license React
* react-is.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/var nn;function Xn(){if(nn)return b;nn=1;var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),l=Symbol.for("react.context"),i=Symbol.for("react.server_context"),d=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),w=Symbol.for("react.suspense_list"),h=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),z=Symbol.for("react.offscreen"),u;u=Symbol.for("react.module.reference");function s(c){if(typeof c=="object"&&c!==null){var C=c.$$typeof;switch(C){case e:switch(c=c.type,c){case t:case o:case r:case f:case w:return c;default:switch(c=c&&c.$$typeof,c){case i:case l:case d:case x:case h:case a:return c;default:return C}}case n:return C}}}return b.ContextConsumer=l,b.ContextProvider=a,b.Element=e,b.ForwardRef=d,b.Fragment=t,b.Lazy=x,b.Memo=h,b.Portal=n,b.Profiler=o,b.StrictMode=r,b.Suspense=f,b.SuspenseList=w,b.isAsyncMode=function(){return!1},b.isConcurrentMode=function(){return!1},b.isContextConsumer=function(c){return s(c)===l},b.isContextProvider=function(c){return s(c)===a},b.isElement=function(c){return typeof c=="object"&&c!==null&&c.$$typeof===e},b.isForwardRef=function(c){return s(c)===d},b.isFragment=function(c){return s(c)===t},b.isLazy=function(c){return s(c)===x},b.isMemo=function(c){return s(c)===h},b.isPortal=function(c){return s(c)===n},b.isProfiler=function(c){return s(c)===o},b.isStrictMode=function(c){return s(c)===r},b.isSuspense=function(c){return s(c)===f},b.isSuspenseList=function(c){return s(c)===w},b.isValidElementType=function(c){return typeof c=="string"||typeof c=="function"||c===t||c===o||c===r||c===f||c===w||c===z||typeof c=="object"&&c!==null&&(c.$$typeof===x||c.$$typeof===h||c.$$typeof===a||c.$$typeof===l||c.$$typeof===d||c.$$typeof===u||c.getModuleId!==void 0)},b.typeOf=s,b}var tn;function Hn(){return tn||(tn=1,F.exports=Xn()),F.exports}var pn=Hn(),Yn=mn(pn),jn=cn({__proto__:null,default:Yn},[pn]);const Fn=["isAsyncMode","isConcurrentMode","isContextConsumer","isContextProvider","isElement","isForwardRef","isFragment","isLazy","isMemo","isPortal","isProfiler","isStrictMode","isSuspense","isSuspenseList","isValidElementType"];Object.fromEntries(Fn.map(e=>[e,n=>jn[e](n)||On[e](n)]));let Jn=()=>"Promise{…}";try{const{getPromiseDetails:e,kPending:n,kRejected:t}=process.binding("util");Array.isArray(e(Promise.resolve()))&&(Jn=(r,o)=>{const[a,l]=e(r);return a===n?"Promise{<pending>}":`Promise${a===t?"!":""}{${o.inspect(l,o)}}`})}catch{}function Un(e){const{message:n="$$stack trace error",stackTraceLimit:t=1}=e||{},r=Error.stackTraceLimit,o=Error.prepareStackTrace;Error.stackTraceLimit=t,Error.prepareStackTrace=i=>i.stack;const l=new Error(n).stack||"";return Error.prepareStackTrace=o,Error.stackTraceLimit=r,l}var J,en;function Dn(){if(en)return J;en=1;var e,n,t,r,o,a,l,i,d,f,w,h,x,z,u,s,c,C,M;return x=/\/(?![*\/])(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\\]).|\\.)*(\/[$_\u200C\u200D\p{ID_Continue}]*|\\)?/uy,h=/--|\+\+|=>|\.{3}|\??\.(?!\d)|(?:&&|\|\||\?\?|[+\-%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2}|\/(?![\/*]))=?|[?~,:;[\](){}]/y,e=/(\x23?)(?=[$_\p{ID_Start}\\])(?:[$_\u200C\u200D\p{ID_Continue}]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+/uy,u=/(['"])(?:(?!\1)[^\\\n\r]|\\(?:\r\n|[^]))*(\1)?/y,w=/(?:0[xX][\da-fA-F](?:_?[\da-fA-F])*|0[oO][0-7](?:_?[0-7])*|0[bB][01](?:_?[01])*)n?|0n|[1-9](?:_?\d)*n|(?:(?:0(?!\d)|0\d*[89]\d*|[1-9](?:_?\d)*)(?:\.(?:\d(?:_?\d)*)?)?|\.\d(?:_?\d)*)(?:[eE][+-]?\d(?:_?\d)*)?|0[0-7]+/y,s=/[`}](?:[^`\\$]|\\[^]|\$(?!\{))*(`|\$\{)?/y,M=/[\t\v\f\ufeff\p{Zs}]+/uy,i=/\r?\n|[\r\u2028\u2029]/y,d=/\/\*(?:[^*]|\*(?!\/))*(\*\/)?/y,z=/\/\/.*/y,t=/[<>.:={}]|\/(?![\/*])/y,n=/[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}-]*/uy,r=/(['"])(?:(?!\1)[^])*(\1)?/y,o=/[^<>{}]+/y,C=/^(?:[\/+-]|\.{3}|\?(?:InterpolationIn(?:JSX|Template)|NoLineTerminatorHere|NonExpressionParenEnd|UnaryIncDec))?$|[{}([,;<>=*%&|^!~?:]$/,c=/^(?:=>|[;\]){}]|else|\?(?:NoLineTerminatorHere|NonExpressionParenEnd))?$/,a=/^(?:await|case|default|delete|do|else|instanceof|new|return|throw|typeof|void|yield)$/,l=/^(?:return|throw|yield)$/,f=RegExp(i.source),J=function*(_,{jsx:P=!1}={}){var S,T,L,p,g,$,m,E,Z,I,B,y,V,k;for({length:$}=_,p=0,g="",k=[{tag:"JS"}],S=[],B=0,y=!1;p<$;){switch(E=k[k.length-1],E.tag){case"JS":case"JSNonExpressionParen":case"InterpolationInTemplate":case"InterpolationInJSX":if(_[p]==="/"&&(C.test(g)||a.test(g))&&(x.lastIndex=p,m=x.exec(_))){p=x.lastIndex,g=m[0],y=!0,yield{type:"RegularExpressionLiteral",value:m[0],closed:m[1]!==void 0&&m[1]!=="\\"};continue}if(h.lastIndex=p,m=h.exec(_)){switch(V=m[0],Z=h.lastIndex,I=V,V){case"(":g==="?NonExpressionParenKeyword"&&k.push({tag:"JSNonExpressionParen",nesting:B}),B++,y=!1;break;case")":B--,y=!0,E.tag==="JSNonExpressionParen"&&B===E.nesting&&(k.pop(),I="?NonExpressionParenEnd",y=!1);break;case"{":h.lastIndex=0,L=!c.test(g)&&(C.test(g)||a.test(g)),S.push(L),y=!1;break;case"}":switch(E.tag){case"InterpolationInTemplate":if(S.length===E.nesting){s.lastIndex=p,m=s.exec(_),p=s.lastIndex,g=m[0],m[1]==="${"?(g="?InterpolationInTemplate",y=!1,yield{type:"TemplateMiddle",value:m[0]}):(k.pop(),y=!0,yield{type:"TemplateTail",value:m[0],closed:m[1]==="`"});continue}break;case"InterpolationInJSX":if(S.length===E.nesting){k.pop(),p+=1,g="}",yield{type:"JSXPunctuator",value:"}"};continue}}y=S.pop(),I=y?"?ExpressionBraceEnd":"}";break;case"]":y=!0;break;case"++":case"--":I=y?"?PostfixIncDec":"?UnaryIncDec";break;case"<":if(P&&(C.test(g)||a.test(g))){k.push({tag:"JSXTag"}),p+=1,g="<",yield{type:"JSXPunctuator",value:V};continue}y=!1;break;default:y=!1}p=Z,g=I,yield{type:"Punctuator",value:V};continue}if(e.lastIndex=p,m=e.exec(_)){switch(p=e.lastIndex,I=m[0],m[0]){case"for":case"if":case"while":case"with":g!=="."&&g!=="?."&&(I="?NonExpressionParenKeyword")}g=I,y=!a.test(m[0]),yield{type:m[1]==="#"?"PrivateIdentifier":"IdentifierName",value:m[0]};continue}if(u.lastIndex=p,m=u.exec(_)){p=u.lastIndex,g=m[0],y=!0,yield{type:"StringLiteral",value:m[0],closed:m[2]!==void 0};continue}if(w.lastIndex=p,m=w.exec(_)){p=w.lastIndex,g=m[0],y=!0,yield{type:"NumericLiteral",value:m[0]};continue}if(s.lastIndex=p,m=s.exec(_)){p=s.lastIndex,g=m[0],m[1]==="${"?(g="?InterpolationInTemplate",k.push({tag:"InterpolationInTemplate",nesting:S.length}),y=!1,yield{type:"TemplateHead",value:m[0]}):(y=!0,yield{type:"NoSubstitutionTemplate",value:m[0],closed:m[1]==="`"});continue}break;case"JSXTag":case"JSXTagEnd":if(t.lastIndex=p,m=t.exec(_)){switch(p=t.lastIndex,I=m[0],m[0]){case"<":k.push({tag:"JSXTag"});break;case">":k.pop(),g==="/"||E.tag==="JSXTagEnd"?(I="?JSX",y=!0):k.push({tag:"JSXChildren"});break;case"{":k.push({tag:"InterpolationInJSX",nesting:S.length}),I="?InterpolationInJSX",y=!1;break;case"/":g==="<"&&(k.pop(),k[k.length-1].tag==="JSXChildren"&&k.pop(),k.push({tag:"JSXTagEnd"}))}g=I,yield{type:"JSXPunctuator",value:m[0]};continue}if(n.lastIndex=p,m=n.exec(_)){p=n.lastIndex,g=m[0],yield{type:"JSXIdentifier",value:m[0]};continue}if(r.lastIndex=p,m=r.exec(_)){p=r.lastIndex,g=m[0],yield{type:"JSXString",value:m[0],closed:m[2]!==void 0};continue}break;case"JSXChildren":if(o.lastIndex=p,m=o.exec(_)){p=o.lastIndex,g=m[0],yield{type:"JSXText",value:m[0]};continue}switch(_[p]){case"<":k.push({tag:"JSXTag"}),p++,g="<",yield{type:"JSXPunctuator",value:"<"};continue;case"{":k.push({tag:"InterpolationInJSX",nesting:S.length}),p++,g="?InterpolationInJSX",y=!1,yield{type:"JSXPunctuator",value:"{"};continue}}if(M.lastIndex=p,m=M.exec(_)){p=M.lastIndex,yield{type:"WhiteSpace",value:m[0]};continue}if(i.lastIndex=p,m=i.exec(_)){p=i.lastIndex,y=!1,l.test(g)&&(g="?NoLineTerminatorHere"),yield{type:"LineTerminatorSequence",value:m[0]};continue}if(d.lastIndex=p,m=d.exec(_)){p=d.lastIndex,f.test(m[0])&&(y=!1,l.test(g)&&(g="?NoLineTerminatorHere")),yield{type:"MultiLineComment",value:m[0],closed:m[1]!==void 0};continue}if(z.lastIndex=p,m=z.exec(_)){p=z.lastIndex,y=!1,yield{type:"SingleLineComment",value:m[0]};continue}T=String.fromCodePoint(_.codePointAt(p)),p+=T.length,g=T,y=!1,yield{type:E.tag.startsWith("JSX")?"JSXInvalid":"Invalid",value:T}}},J}Dn();var wn={keyword:["break","case","catch","continue","debugger","default","do","else","finally","for","function","if","return","switch","throw","try","var","const","while","with","new","this","super","class","extends","export","import","null","true","false","in","instanceof","typeof","void","delete"],strict:["implements","interface","let","package","private","protected","public","static","yield"]};new Set(wn.keyword);new Set(wn.strict);const rn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Zn=new Uint8Array(64),Wn=new Uint8Array(128);for(let e=0;e<rn.length;e++){const n=rn.charCodeAt(e);Zn[e]=n,Wn[n]=e}var on;(function(e){e[e.Empty=1]="Empty",e[e.Hash=2]="Hash",e[e.Query=3]="Query",e[e.RelativePath=4]="RelativePath",e[e.AbsolutePath=5]="AbsolutePath",e[e.SchemeRelative=6]="SchemeRelative",e[e.Absolute=7]="Absolute"})(on||(on={}));const Kn=/^[A-Za-z]:\//;function Gn(e=""){return e&&e.replace(/\\/g,"/").replace(Kn,n=>n.toUpperCase())}const Qn=/^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;function nt(){return typeof process<"u"&&typeof process.cwd=="function"?process.cwd().replace(/\\/g,"/"):"/"}const tt=function(...e){e=e.map(r=>Gn(r));let n="",t=!1;for(let r=e.length-1;r>=-1&&!t;r--){const o=r>=0?e[r]:nt();!o||o.length===0||(n=`${o}/${n}`,t=an(o))}return n=et(n,!t),t&&!an(n)?`/${n}`:n.length>0?n:"."};function et(e,n){let t="",r=0,o=-1,a=0,l=null;for(let i=0;i<=e.length;++i){if(i<e.length)l=e[i];else{if(l==="/")break;l="/"}if(l==="/"){if(!(o===i-1||a===1))if(a===2){if(t.length<2||r!==2||t[t.length-1]!=="."||t[t.length-2]!=="."){if(t.length>2){const d=t.lastIndexOf("/");d===-1?(t="",r=0):(t=t.slice(0,d),r=t.length-1-t.lastIndexOf("/")),o=i,a=0;continue}else if(t.length>0){t="",r=0,o=i,a=0;continue}}n&&(t+=t.length>0?"/..":"..",r=2)}else t.length>0?t+=`/${e.slice(o+1,i)}`:t=e.slice(o+1,i),r=i-o-1;o=i,a=0}else l==="."&&a!==-1?++a:a=-1}return t}const an=function(e){return Qn.test(e)},gn=/^\s*at .*(?:\S:\d+|\(native\))/m,rt=/^(?:eval@)?(?:\[native code\])?$/;function un(e){if(!e.includes(":"))return[e];const t=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(e.replace(/^\(|\)$/g,""));if(!t)return[e];let r=t[1];if(r.startsWith("async ")&&(r=r.slice(6)),r.startsWith("http:")||r.startsWith("https:")){const o=new URL(r);o.searchParams.delete("import"),o.searchParams.delete("browserv"),r=o.pathname+o.hash+o.search}if(r.startsWith("/@fs/")){const o=/^\/@fs\/[a-zA-Z]:\//.test(r);r=r.slice(o?5:4)}return[r,t[2]||void 0,t[3]||void 0]}function ot(e){let n=e.trim();if(rt.test(n)||(n.includes(" > eval")&&(n=n.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),!n.includes("@")&&!n.includes(":")))return null;const t=/((.*".+"[^@]*)?[^@]*)(@)/,r=n.match(t),o=r&&r[1]?r[1]:void 0,[a,l,i]=un(n.replace(t,""));return!a||!l||!i?null:{file:a,method:o||"",line:Number.parseInt(l),column:Number.parseInt(i)}}function it(e){const n=e.trim();return gn.test(n)?at(n):ot(n)}function at(e){let n=e.trim();if(!gn.test(n))return null;n.includes("(eval ")&&(n=n.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));let t=n.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,"");const r=t.match(/ (\(.+\)$)/);t=r?t.replace(r[0],""):t;const[o,a,l]=un(r?r[1]:t);let i=r&&t||"",d=o&&["eval","<anonymous>"].includes(o)?void 0:o;return!d||!a||!l?null:(i.startsWith("async ")&&(i=i.slice(6)),d.startsWith("file://")&&(d=d.slice(7)),d=d.startsWith("node:")||d.startsWith("internal:")?d:tt(d),i&&(i=i.replace(/__vite_ssr_import_\d+__\./g,"")),{method:i,file:d,line:Number.parseInt(a),column:Number.parseInt(l)})}function st(e){const n=(e==null?void 0:e.globalThisKey)||"__vitest_mocker__";function t(){return typeof globalThis[n]<"u"?globalThis[n]:new Proxy({},{get(r,o){throw new Error(`Vitest mocker was not initialized in this environment. vi.${String(o)}() is forbidden.`)}})}return{hoisted(r){if(typeof r!="function")throw new TypeError(`vi.hoisted() expects a function, but received a ${typeof r}`);return r()},mock(r,o){if(typeof r!="string")throw new TypeError(`vi.mock() expects a string path, but received a ${typeof r}`);const a=N("mock");t().queueMock(r,a,typeof o=="function"?()=>o(()=>t().importActual(r,a)):o)},unmock(r){if(typeof r!="string")throw new TypeError(`vi.unmock() expects a string path, but received a ${typeof r}`);t().queueUnmock(r,N("unmock"))},doMock(r,o){if(typeof r!="string")throw new TypeError(`vi.doMock() expects a string path, but received a ${typeof r}`);const a=N("doMock");t().queueMock(r,a,typeof o=="function"?()=>o(()=>t().importActual(r,a)):o)},doUnmock(r){if(typeof r!="string")throw new TypeError(`vi.doUnmock() expects a string path, but received a ${typeof r}`);t().queueUnmock(r,N("doUnmock"))},async importActual(r){return t().importActual(r,N("importActual"))},async importMock(r){return t().importMock(r,N("importMock"))}}}function N(e){const t=Un({stackTraceLimit:5}).split(`
`),r=t.findIndex(a=>a.includes(` at Object.${e}`)||a.includes(`${e}@`)),o=it(t[r+1]);return(o==null?void 0:o.file)||""}const{now:sn}=Date;class lt{constructor(n,t,r,o){q(this,"registry",new ln);q(this,"queue",new Set);q(this,"mockedIds",new Set);this.interceptor=n,this.rpc=t,this.spyOn=r,this.config=o}async prepare(){this.queue.size&&await Promise.all([...this.queue.values()])}async resolveFactoryModule(n){const t=this.registry.get(n);if(!t||t.type!=="manual")throw new Error(`Mock ${n} wasn't registered. This is probably a Vitest error. Please, open a new issue with reproduction.`);return await t.resolve()}getFactoryModule(n){const t=this.registry.get(n);if(!t||t.type!=="manual")throw new Error(`Mock ${n} wasn't registered. This is probably a Vitest error. Please, open a new issue with reproduction.`);if(!t.cache)throw new Error(`Mock ${n} wasn't resolved. This is probably a Vitest error. Please, open a new issue with reproduction.`);return t.cache}async invalidate(){const n=Array.from(this.mockedIds);n.length&&(await this.rpc.invalidate(n),await this.interceptor.invalidate(),this.registry.clear())}async importActual(n,t){const r=await this.rpc.resolveId(n,t);if(r==null)throw new Error(`[vitest] Cannot resolve "${n}" imported from "${t}"`);const o=Tn(r.id),a=new URL(r.url,location.href),l=`_vitest_original&ext${o}`,i=`${a.pathname}${a.search?`${a.search}&${l}`:`?${l}`}${a.hash}`;return this.wrapDynamicImport(()=>import(i)).then(d=>{if(!r.optimized||typeof d.default>"u")return d;const f=d.default;return f!=null&&f.__esModule?f:{...typeof f=="object"&&!Array.isArray(f)||typeof f=="function"?f:{},default:f}})}async importMock(n,t){await this.prepare();const{resolvedId:r,resolvedUrl:o,redirectUrl:a}=await this.rpc.resolveMock(n,t,{mock:"auto"}),l=this.resolveMockPath(O(o));let i=this.registry.get(l);if(!i)if(a){const d=new URL(this.resolveMockPath(O(a)),location.href).toString();i=new R(n,r,l,d)}else i=new X(n,r,l);if(i.type==="manual")return await i.resolve();if(i.type==="automock"||i.type==="autospy"){const d=new URL(`/@id/${r}`,location.href),f=d.search?`${d.search}&t=${sn()}`:`?t=${sn()}`,w=await xn(()=>import(`${d.pathname}${f}&mock=${i.type}${d.hash}`),[],import.meta.url);return this.mockObject(w,i.type)}return import(i.redirect)}mockObject(n,t="automock"){return vn({globalConstructors:{Object,Function,Array,Map,RegExp},spyOn:this.spyOn,type:t},n)}queueMock(n,t,r){const o=this.rpc.resolveMock(n,t,{mock:typeof r=="function"?"factory":r!=null&&r.spy?"spy":"auto"}).then(async({redirectUrl:a,resolvedId:l,resolvedUrl:i,needsInterop:d,mockType:f})=>{const w=this.resolveMockPath(O(i));this.mockedIds.add(l);const h=typeof r=="function"?async()=>{const u=await r();return d?{default:u}:u}:void 0,x=typeof a=="string"?new URL(this.resolveMockPath(O(a)),location.href).toString():null;let z;f==="manual"?z=this.registry.register("manual",n,l,w,h):f==="autospy"?z=this.registry.register("autospy",n,l,w):f==="redirect"?z=this.registry.register("redirect",n,l,w,x):z=this.registry.register("automock",n,l,w),await this.interceptor.register(z)}).finally(()=>{this.queue.delete(o)});this.queue.add(o)}queueUnmock(n,t){const r=this.rpc.resolveId(n,t).then(async o=>{if(!o)return;const a=this.resolveMockPath(O(o.url));this.mockedIds.add(o.id),this.registry.delete(a),await this.interceptor.delete(a)}).finally(()=>{this.queue.delete(r)});this.queue.add(r)}wrapDynamicImport(n){return typeof n=="function"?new Promise((r,o)=>{this.prepare().finally(()=>{n().then(r,o)})}):n}resolveMockPath(n){const t=this.config,r=Pn("/@fs/",t.root);return n.startsWith(t.root)?n.slice(t.root.length):n.startsWith(r)?n.slice(r.length):n}}const dt=/(\?|&)v=\w{8}/;function O(e){return e.replace(dt,"")}class ct{constructor(){q(this,"mocks",new ln)}async register(n){this.mocks.add(n)}async delete(n){this.mocks.delete(n)}async invalidate(){this.mocks.clear()}}const U=e=>{switch(e){case"resolveId":return Promise.resolve({id:"",url:"",optimized:!1});case"resolveMock":return Promise.resolve({mockType:"dummy",resolvedId:"",resolvedUrl:"",redirectUrl:"",needsInterop:!1});case"invalidate":return Promise.resolve()}};class mt extends lt{queueMock(){}}function ft(e){const n=new mt(e("__vitest_mocker__"),{resolveId(t,r){return U("resolveId")},resolveMock(t,r,o){return U("resolveMock")},async invalidate(t){return U("invalidate")}},(...t)=>globalThis.__STORYBOOK_MODULE_TEST__.spyOn(...t),{root:""});return globalThis.__vitest_mocker__=n,st({globalThisKey:"__vitest_mocker__"})}globalThis.__STORYBOOK_MOCKER__=ft(()=>new ct);function pt(e,n="top"){if(!e||typeof document>"u")return;const t=document.head||document.querySelector("head"),r=t.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),n==="top"&&r?t.insertBefore(o,r):t.appendChild(o)}pt(`
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
}/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*:where(.pr-twp,.pr-twp *),
::before:where(.pr-twp,.pr-twp *),
::after:where(.pr-twp,.pr-twp *) {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before:where(.pr-twp,.pr-twp *),
::after:where(.pr-twp,.pr-twp *) {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html:where(.pr-twp,.pr-twp *),
:host:where(.pr-twp,.pr-twp *) {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */ /* 3 */
  tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body:where(.pr-twp,.pr-twp *) {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr:where(.pr-twp,.pr-twp *) {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]):where(.pr-twp,.pr-twp *) {
  text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1:where(.pr-twp,.pr-twp *),
h2:where(.pr-twp,.pr-twp *),
h3:where(.pr-twp,.pr-twp *),
h4:where(.pr-twp,.pr-twp *),
h5:where(.pr-twp,.pr-twp *),
h6:where(.pr-twp,.pr-twp *) {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a:where(.pr-twp,.pr-twp *) {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b:where(.pr-twp,.pr-twp *),
strong:where(.pr-twp,.pr-twp *) {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code:where(.pr-twp,.pr-twp *),
kbd:where(.pr-twp,.pr-twp *),
samp:where(.pr-twp,.pr-twp *),
pre:where(.pr-twp,.pr-twp *) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small:where(.pr-twp,.pr-twp *) {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub:where(.pr-twp,.pr-twp *),
sup:where(.pr-twp,.pr-twp *) {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub:where(.pr-twp,.pr-twp *) {
  bottom: -0.25em;
}

sup:where(.pr-twp,.pr-twp *) {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table:where(.pr-twp,.pr-twp *) {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button:where(.pr-twp,.pr-twp *),
input:where(.pr-twp,.pr-twp *),
optgroup:where(.pr-twp,.pr-twp *),
select:where(.pr-twp,.pr-twp *),
textarea:where(.pr-twp,.pr-twp *) {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button:where(.pr-twp,.pr-twp *),
select:where(.pr-twp,.pr-twp *) {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button:where(.pr-twp,.pr-twp *),
input:where([type='button']):where(.pr-twp,.pr-twp *),
input:where([type='reset']):where(.pr-twp,.pr-twp *),
input:where([type='submit']):where(.pr-twp,.pr-twp *) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring:where(.pr-twp,.pr-twp *) {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid:where(.pr-twp,.pr-twp *) {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress:where(.pr-twp,.pr-twp *) {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button:where(.pr-twp,.pr-twp *),
::-webkit-outer-spin-button:where(.pr-twp,.pr-twp *) {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search']:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary:where(.pr-twp,.pr-twp *) {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote:where(.pr-twp,.pr-twp *),
dl:where(.pr-twp,.pr-twp *),
dd:where(.pr-twp,.pr-twp *),
h1:where(.pr-twp,.pr-twp *),
h2:where(.pr-twp,.pr-twp *),
h3:where(.pr-twp,.pr-twp *),
h4:where(.pr-twp,.pr-twp *),
h5:where(.pr-twp,.pr-twp *),
h6:where(.pr-twp,.pr-twp *),
hr:where(.pr-twp,.pr-twp *),
figure:where(.pr-twp,.pr-twp *),
p:where(.pr-twp,.pr-twp *),
pre:where(.pr-twp,.pr-twp *) {
  margin: 0;
}

fieldset:where(.pr-twp,.pr-twp *) {
  margin: 0;
  padding: 0;
}

legend:where(.pr-twp,.pr-twp *) {
  padding: 0;
}

ol:where(.pr-twp,.pr-twp *),
ul:where(.pr-twp,.pr-twp *),
menu:where(.pr-twp,.pr-twp *) {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog:where(.pr-twp,.pr-twp *) {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea:where(.pr-twp,.pr-twp *) {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::placeholder:where(.pr-twp,.pr-twp *),
textarea::placeholder:where(.pr-twp,.pr-twp *) {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button:where(.pr-twp,.pr-twp *),
[role="button"]:where(.pr-twp,.pr-twp *) {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled:where(.pr-twp,.pr-twp *) {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img:where(.pr-twp,.pr-twp *),
svg:where(.pr-twp,.pr-twp *),
video:where(.pr-twp,.pr-twp *),
canvas:where(.pr-twp,.pr-twp *),
audio:where(.pr-twp,.pr-twp *),
iframe:where(.pr-twp,.pr-twp *),
embed:where(.pr-twp,.pr-twp *),
object:where(.pr-twp,.pr-twp *) {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img:where(.pr-twp,.pr-twp *),
video:where(.pr-twp,.pr-twp *) {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden]:where(:not([hidden="until-found"])):where(.pr-twp,.pr-twp *) {
  display: none;
}
  /* Adding the preflight selector (pr-twp) to components was not changing the font as desired.
  So this piece of code adds tw-font-sans everywhere we include preflight. */
  .pr-twp {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
  @font-face {
    font-family: 'Inter';
    font-display: 'swap';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  }

  /**
   * Theme colors and other CSS variable properties in Platform.Bible. These are applied in CSS
   * properties using \`hsl(var(--variableName))\` or Tailwind classes like \`tw-bg-primary\`
   *
   * See the wiki's [Matching Application
   * Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
  /* ["Slate" base theme by shadcn/ui](https://ui.shadcn.com/docs/theming#slate) */
  :root {
    --background: 0 0% 100%; /* white */
    --foreground: 222.2 84% 4.9%; /* slate-950 */
    --card: 0 0% 100%; /* white */
    --card-foreground: 222.2 84% 4.9%; /* slate-950 */
    --popover: 210 20% 98%; /* popover platform */
    --popover-foreground: 222.2 84% 4.9%; /* slate-950 */
    --primary: 222.2 47.4% 11.2%; /* slate-900 */
    --primary-foreground: 210 40% 98%; /* slate-50 */
    --secondary: 210 50% 95%;
    --secondary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --muted: 210 50% 95%;
    --muted-foreground: 215.4 16.3% 46.9%; /* slate-500 */
    --accent: 210 50% 95%;
    --accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 214.3 31.8% 91.4%; /* slate-200 */
    --input: 214.3 31.8% 91.4%; /* slate-200 */
    --ring: 222.2 84% 4.9%; /* slate-950 */

    --sidebar-background: 210 20% 98%; /* popover platform */
    --sidebar-foreground: 222.2 84% 4.9%; /* slate-950 */
    --sidebar-primary: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-primary-foreground: 210 40% 98%; /* slate-50 */
    --sidebar-accent: 210 50% 95%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-border: 214.3 31.8% 91.4%; /* slate-200 */
    --sidebar-ring: 222.2 84% 4.9%; /* slate-950 */

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%; /* slate-950 */
    --foreground: 210 40% 98%; /* slate-50 */
    --card: 222.2 84% 4.9%; /* slate-950 */
    --card-foreground: 210 40% 98%; /* slate-50 */
    --popover: 222.2 84% 4.9%; /* slate-950 */
    --popover-foreground: 210 40% 98%; /* slate-50 */
    --primary: 210 40% 98%; /* slate-50 */
    --primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --secondary: 217.2 32.6% 17.5%; /* slate-800 */
    --secondary-foreground: 210 40% 98%; /* slate-50 */
    --muted: 217.2 32.6% 17.5%; /* slate-800 */
    --muted-foreground: 215 20.2% 65.1%; /* slate-400 */
    --accent: 217.2 32.6% 17.5%; /* slate-800 */
    --accent-foreground: 210 40% 98%; /* slate-50 */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 215.3 19.3% 34.5%; /* slate-600 */
    --input: 215.3 19.3% 34.5%; /* slate-600 */
    --ring: 212.7 26.8% 83.9%; /* slate-300 */

    --sidebar-background: 222.2 84% 4.9%; /* slate-950 */
    --sidebar-foreground: 215 20.2% 65.1%; /* slate-400 */
    --sidebar-primary: 210 40% 98%; /* slate-50 */
    --sidebar-primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-accent: 217.2 32.6% 17.5%; /* slate-800 */
    --sidebar-accent-foreground: 215 20.2% 65.1%; /* slate-400 */
    --sidebar-border: 217.2 32.6% 17.5%; /* slate-800 */
    --sidebar-ring: 212.7 26.8% 83.9%; /* slate-300 */
  }

  /* Palette built in https://tweakcn.com/themes/cmeukcpoj000204l45lxw5a74 based on "Caffeine" theme*/
  .pr-twp,
  .pr-twp * {
  border-color: hsl(var(--border));
  outline-color: hsl(var(--ring) / 0.5);
}

  /**
    * disabled because tslint does not like it, but it is the selector that's needed
    */
  /* stylelint-disable-next-line selector-no-qualifying-type */
  body.pr-twp {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
.tw-prose {
  color: var(--tw-prose-body);
  max-width: 65ch;
}
.tw-prose :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-lead);
  font-size: 1.25em;
  line-height: 1.6;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}
.tw-prose :where(a):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-links);
  text-decoration: underline;
  font-weight: 500;
}
.tw-prose :where(strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-bold);
  font-weight: 600;
}
.tw-prose :where(a strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol[type="A"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="A" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="I"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="I" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="1"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
}
.tw-prose :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: disc;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  font-weight: 400;
  color: var(--tw-prose-counters);
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  color: var(--tw-prose-bullets);
}
.tw-prose :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.25em;
}
.tw-prose :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-color: var(--tw-prose-hr);
  border-top-width: 1px;
  margin-top: 3em;
  margin-bottom: 3em;
}
.tw-prose :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-style: italic;
  color: var(--tw-prose-quotes);
  border-inline-start-width: 0.25rem;
  border-inline-start-color: var(--tw-prose-quote-borders);
  quotes: "0o201C""0o201D""0o2018""0o2019";
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-inline-start: 1em;
}
.tw-prose :where(blockquote p:first-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: open-quote;
}
.tw-prose :where(blockquote p:last-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: close-quote;
}
.tw-prose :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}
.tw-prose :where(h1 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 900;
  color: inherit;
}
.tw-prose :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3333333;
}
.tw-prose :where(h2 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 800;
  color: inherit;
}
.tw-prose :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  font-size: 1.25em;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.6;
}
.tw-prose :where(h3 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.5;
}
.tw-prose :where(h4 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  display: block;
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-family: inherit;
  color: var(--tw-prose-kbd);
  box-shadow: 0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);
  font-size: 0.875em;
  border-radius: 0.3125rem;
  padding-top: 0.1875em;
  padding-inline-end: 0.375em;
  padding-bottom: 0.1875em;
  padding-inline-start: 0.375em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-code);
  font-weight: 600;
  font-size: 0.875em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: "\`";
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: "\`";
}
.tw-prose :where(a code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h1 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.875em;
}
.tw-prose :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.9em;
}
.tw-prose :where(h4 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-pre-code);
  background-color: var(--tw-prose-pre-bg);
  overflow-x: auto;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.7142857;
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
  border-radius: 0.375rem;
  padding-top: 0.8571429em;
  padding-inline-end: 1.1428571em;
  padding-bottom: 0.8571429em;
  padding-inline-start: 1.1428571em;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  padding: 0;
  font-weight: inherit;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: none;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: none;
}
.tw-prose :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  width: 100%;
  table-layout: auto;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.7142857;
}
.tw-prose :where(thead):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-th-borders);
}
.tw-prose :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  vertical-align: bottom;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody tr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-td-borders);
}
.tw-prose :where(tbody tr:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 0;
}
.tw-prose :where(tbody td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: baseline;
}
.tw-prose :where(tfoot):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-top-width: 1px;
  border-top-color: var(--tw-prose-th-borders);
}
.tw-prose :where(tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: top;
}
.tw-prose :where(th, td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  text-align: start;
}
.tw-prose :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-captions);
  font-size: 0.875em;
  line-height: 1.4285714;
  margin-top: 0.8571429em;
}
.tw-prose {
  --tw-prose-body: hsl(var(--foreground));
  --tw-prose-headings: hsl(var(--foreground));
  --tw-prose-lead: hsl(var(--muted-foreground));
  --tw-prose-links: hsl(var(--primary));
  --tw-prose-bold: hsl(var(--foreground));
  --tw-prose-counters: hsl(var(--muted-foreground));
  --tw-prose-bullets: hsl(var(--muted-foreground));
  --tw-prose-hr: hsl(var(--border));
  --tw-prose-quotes: hsl(var(--foreground));
  --tw-prose-quote-borders: hsl(var(--border));
  --tw-prose-captions: hsl(var(--muted-foreground));
  --tw-prose-kbd: #111827;
  --tw-prose-kbd-shadows: 17 24 39;
  --tw-prose-code: hsl(var(--foreground));
  --tw-prose-pre-code: hsl(var(--muted-foreground));
  --tw-prose-pre-bg: hsl(var(--muted));
  --tw-prose-th-borders: hsl(var(--border));
  --tw-prose-td-borders: hsl(var(--border));
  --tw-prose-invert-body: #d1d5db;
  --tw-prose-invert-headings: #fff;
  --tw-prose-invert-lead: #9ca3af;
  --tw-prose-invert-links: #fff;
  --tw-prose-invert-bold: #fff;
  --tw-prose-invert-counters: #9ca3af;
  --tw-prose-invert-bullets: #4b5563;
  --tw-prose-invert-hr: #374151;
  --tw-prose-invert-quotes: #f3f4f6;
  --tw-prose-invert-quote-borders: #374151;
  --tw-prose-invert-captions: #9ca3af;
  --tw-prose-invert-kbd: #fff;
  --tw-prose-invert-kbd-shadows: 255 255 255;
  --tw-prose-invert-code: #fff;
  --tw-prose-invert-pre-code: #d1d5db;
  --tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);
  --tw-prose-invert-th-borders: #4b5563;
  --tw-prose-invert-td-borders: #374151;
  font-size: 1rem;
  line-height: 1.75;
}
.tw-prose :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(.tw-prose > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(.tw-prose > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.5714286em;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(.tw-prose > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(.tw-prose > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 0;
}
.tw-prose-sm {
  font-size: 0.875rem;
  line-height: 1.7142857;
}
.tw-prose-sm :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.2857143em;
  line-height: 1.5555556;
  margin-top: 0.8888889em;
  margin-bottom: 0.8888889em;
}
.tw-prose-sm :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.3333333em;
  margin-bottom: 1.3333333em;
  padding-inline-start: 1.1111111em;
}
.tw-prose-sm :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 2.1428571em;
  margin-top: 0;
  margin-bottom: 0.8em;
  line-height: 1.2;
}
.tw-prose-sm :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.4285714em;
  margin-top: 1.6em;
  margin-bottom: 0.8em;
  line-height: 1.4;
}
.tw-prose-sm :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.2857143em;
  margin-top: 1.5555556em;
  margin-bottom: 0.4444444em;
  line-height: 1.5555556;
}
.tw-prose-sm :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.4285714em;
  margin-bottom: 0.5714286em;
  line-height: 1.4285714;
}
.tw-prose-sm :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose-sm :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  border-radius: 0.3125rem;
  padding-top: 0.1428571em;
  padding-inline-end: 0.3571429em;
  padding-bottom: 0.1428571em;
  padding-inline-start: 0.3571429em;
}
.tw-prose-sm :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
}
.tw-prose-sm :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.9em;
}
.tw-prose-sm :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8888889em;
}
.tw-prose-sm :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.6666667;
  margin-top: 1.6666667em;
  margin-bottom: 1.6666667em;
  border-radius: 0.25rem;
  padding-top: 0.6666667em;
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.2857143em;
  margin-bottom: 0.2857143em;
}
.tw-prose-sm :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.4285714em;
}
.tw-prose-sm :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.4285714em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.tw-prose-sm :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.2857143em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2.8571429em;
  margin-bottom: 2.8571429em;
}
.tw-prose-sm :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.5;
}
.tw-prose-sm :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose-sm :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose-sm :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.6666667em;
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose-sm :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose-sm :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose-sm :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.3333333;
  margin-top: 0.6666667em;
}
.tw-prose-sm :where(.tw-prose-sm > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(.tw-prose-sm > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 0;
}
.tw-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.tw-pointer-events-none {
  pointer-events: none;
}
.tw-pointer-events-auto {
  pointer-events: auto;
}
.tw-fixed {
  position: fixed;
}
.tw-absolute {
  position: absolute;
}
.tw-relative {
  position: relative;
}
.tw-sticky {
  position: sticky;
}
.tw-inset-0 {
  inset: 0px;
}
.tw-inset-x-0 {
  left: 0px;
  right: 0px;
}
.tw-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.tw--left-\\[1px\\] {
  left: -1px;
}
.tw--right-1 {
  right: -0.25rem;
}
.tw--top-\\[1px\\] {
  top: -1px;
}
.tw-bottom-0 {
  bottom: 0px;
}
.tw-left-0 {
  left: 0px;
}
.tw-left-2 {
  left: 0.5rem;
}
.tw-left-3 {
  left: 0.75rem;
}
.tw-left-4 {
  left: 1rem;
}
.tw-left-\\[50\\%\\] {
  left: 50%;
}
.tw-right-0 {
  right: 0px;
}
.tw-right-1 {
  right: 0.25rem;
}
.tw-right-3 {
  right: 0.75rem;
}
.tw-right-4 {
  right: 1rem;
}
.tw-start-2 {
  inset-inline-start: 0.5rem;
}
.tw-top-0 {
  top: 0px;
}
.tw-top-1\\.5 {
  top: 0.375rem;
}
.tw-top-1\\/2 {
  top: 50%;
}
.tw-top-2\\.5 {
  top: 0.625rem;
}
.tw-top-3\\.5 {
  top: 0.875rem;
}
.tw-top-4 {
  top: 1rem;
}
.tw-top-\\[-1px\\] {
  top: -1px;
}
.tw-top-\\[50\\%\\] {
  top: 50%;
}
.tw-z-10 {
  z-index: 10;
}
.tw-z-20 {
  z-index: 20;
}
.tw-z-50 {
  z-index: 50;
}
.tw-z-\\[1000\\] {
  z-index: 1000;
}
.tw-z-\\[250\\] {
  z-index: 250;
}
.tw-z-\\[300\\] {
  z-index: 300;
}
.tw-col-span-1 {
  grid-column: span 1 / span 1;
}
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-col-span-3 {
  grid-column: span 3 / span 3;
}
.tw-col-start-1 {
  grid-column-start: 1;
}
.tw-row-span-2 {
  grid-row: span 2 / span 2;
}
.tw-row-start-2 {
  grid-row-start: 2;
}
.tw-m-0 {
  margin: 0px;
}
.tw-m-1 {
  margin: 0.25rem;
}
.tw-m-2 {
  margin: 0.5rem;
}
.tw--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.tw-mx-0 {
  margin-left: 0px;
  margin-right: 0px;
}
.tw-mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.tw-mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.tw-mx-3\\.5 {
  margin-left: 0.875rem;
  margin-right: 0.875rem;
}
.tw-mx-8 {
  margin-left: 2rem;
  margin-right: 2rem;
}
.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.tw-my-2\\.5 {
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
}
.tw-my-auto {
  margin-top: auto;
  margin-bottom: auto;
}
.tw-mb-1 {
  margin-bottom: 0.25rem;
}
.tw-mb-2 {
  margin-bottom: 0.5rem;
}
.tw-mb-24 {
  margin-bottom: 6rem;
}
.tw-mb-4 {
  margin-bottom: 1rem;
}
.tw-me-1 {
  margin-inline-end: 0.25rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
}
.tw-ml-24 {
  margin-left: 6rem;
}
.tw-ml-4 {
  margin-left: 1rem;
}
.tw-ml-auto {
  margin-left: auto;
}
.tw-mr-1 {
  margin-right: 0.25rem;
}
.tw-mr-2 {
  margin-right: 0.5rem;
}
.tw-mr-24 {
  margin-right: 6rem;
}
.tw-mr-4 {
  margin-right: 1rem;
}
.tw-ms-1 {
  margin-inline-start: 0.25rem;
}
.tw-ms-2 {
  margin-inline-start: 0.5rem;
}
.tw-ms-5 {
  margin-inline-start: 1.25rem;
}
.tw-ms-auto {
  margin-inline-start: auto;
}
.tw-mt-1 {
  margin-top: 0.25rem;
}
.tw-mt-2 {
  margin-top: 0.5rem;
}
.tw-mt-24 {
  margin-top: 6rem;
}
.tw-mt-3 {
  margin-top: 0.75rem;
}
.tw-mt-4 {
  margin-top: 1rem;
}
.tw-mt-6 {
  margin-top: 1.5rem;
}
.tw-mt-auto {
  margin-top: auto;
}
.tw-box-border {
  box-sizing: border-box;
}
.tw-line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.tw-block {
  display: block;
}
.tw-inline-block {
  display: inline-block;
}
.tw-flex {
  display: flex;
}
.tw-inline-flex {
  display: inline-flex;
}
.tw-grid {
  display: grid;
}
.tw-inline-grid {
  display: inline-grid;
}
.tw-hidden {
  display: none;
}
.tw-aspect-square {
  aspect-ratio: 1 / 1;
}
.tw-size-4 {
  width: 1rem;
  height: 1rem;
}
.tw-h-1 {
  height: 0.25rem;
}
.tw-h-10 {
  height: 2.5rem;
}
.tw-h-11 {
  height: 2.75rem;
}
.tw-h-12 {
  height: 3rem;
}
.tw-h-14 {
  height: 3.5rem;
}
.tw-h-2 {
  height: 0.5rem;
}
.tw-h-2\\.5 {
  height: 0.625rem;
}
.tw-h-20 {
  height: 5rem;
}
.tw-h-24 {
  height: 6rem;
}
.tw-h-3 {
  height: 0.75rem;
}
.tw-h-3\\.5 {
  height: 0.875rem;
}
.tw-h-32 {
  height: 8rem;
}
.tw-h-4 {
  height: 1rem;
}
.tw-h-40 {
  height: 10rem;
}
.tw-h-5 {
  height: 1.25rem;
}
.tw-h-6 {
  height: 1.5rem;
}
.tw-h-64 {
  height: 16rem;
}
.tw-h-7 {
  height: 1.75rem;
}
.tw-h-8 {
  height: 2rem;
}
.tw-h-9 {
  height: 2.25rem;
}
.tw-h-96 {
  height: 24rem;
}
.tw-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.tw-h-\\[100px\\] {
  height: 100px;
}
.tw-h-\\[1px\\] {
  height: 1px;
}
.tw-h-\\[300px\\] {
  height: 300px;
}
.tw-h-\\[5px\\] {
  height: 5px;
}
.tw-h-\\[calc\\(100\\%-2px\\)\\] {
  height: calc(100% - 2px);
}
.tw-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.tw-h-auto {
  height: auto;
}
.tw-h-full {
  height: 100%;
}
.tw-h-px {
  height: 1px;
}
.tw-h-svh {
  height: 100svh;
}
.tw-max-h-10 {
  max-height: 2.5rem;
}
.tw-max-h-5 {
  max-height: 1.25rem;
}
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[--radix-context-menu-content-available-height\\] {
  max-height: var(--radix-context-menu-content-available-height);
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-max-h-\\[96\\%\\] {
  max-height: 96%;
}
.tw-min-h-0 {
  min-height: 0px;
}
.tw-min-h-11 {
  min-height: 2.75rem;
}
.tw-min-h-\\[80px\\] {
  min-height: 80px;
}
.tw-min-h-svh {
  min-height: 100svh;
}
.tw-w-1\\/2 {
  width: 50%;
}
.tw-w-10 {
  width: 2.5rem;
}
.tw-w-11 {
  width: 2.75rem;
}
.tw-w-12 {
  width: 3rem;
}
.tw-w-2 {
  width: 0.5rem;
}
.tw-w-2\\.5 {
  width: 0.625rem;
}
.tw-w-20 {
  width: 5rem;
}
.tw-w-24 {
  width: 6rem;
}
.tw-w-3 {
  width: 0.75rem;
}
.tw-w-3\\.5 {
  width: 0.875rem;
}
.tw-w-3\\/4 {
  width: 75%;
}
.tw-w-32 {
  width: 8rem;
}
.tw-w-4 {
  width: 1rem;
}
.tw-w-4\\/5 {
  width: 80%;
}
.tw-w-4\\/6 {
  width: 66.666667%;
}
.tw-w-48 {
  width: 12rem;
}
.tw-w-5 {
  width: 1.25rem;
}
.tw-w-5\\/6 {
  width: 83.333333%;
}
.tw-w-56 {
  width: 14rem;
}
.tw-w-6 {
  width: 1.5rem;
}
.tw-w-60 {
  width: 15rem;
}
.tw-w-64 {
  width: 16rem;
}
.tw-w-7 {
  width: 1.75rem;
}
.tw-w-72 {
  width: 18rem;
}
.tw-w-8 {
  width: 2rem;
}
.tw-w-80 {
  width: 20rem;
}
.tw-w-9\\/12 {
  width: 75%;
}
.tw-w-96 {
  width: 24rem;
}
.tw-w-\\[--sidebar-width\\] {
  width: var(--sidebar-width);
}
.tw-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.tw-w-\\[100px\\] {
  width: 100px;
}
.tw-w-\\[116px\\] {
  width: 116px;
}
.tw-w-\\[124px\\] {
  width: 124px;
}
.tw-w-\\[150px\\] {
  width: 150px;
}
.tw-w-\\[180px\\] {
  width: 180px;
}
.tw-w-\\[1px\\] {
  width: 1px;
}
.tw-w-\\[200px\\] {
  width: 200px;
}
.tw-w-\\[250px\\] {
  width: 250px;
}
.tw-w-\\[280px\\] {
  width: 280px;
}
.tw-w-\\[300px\\] {
  width: 300px;
}
.tw-w-\\[350px\\] {
  width: 350px;
}
.tw-w-\\[400px\\] {
  width: 400px;
}
.tw-w-\\[500px\\] {
  width: 500px;
}
.tw-w-\\[5px\\] {
  width: 5px;
}
.tw-w-\\[600px\\] {
  width: 600px;
}
.tw-w-\\[70px\\] {
  width: 70px;
}
.tw-w-\\[calc\\(100\\%-2px\\)\\] {
  width: calc(100% - 2px);
}
.tw-w-auto {
  width: auto;
}
.tw-w-fit {
  width: fit-content;
}
.tw-w-full {
  width: 100%;
}
.tw-w-px {
  width: 1px;
}
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-16 {
  min-width: 4rem;
}
.tw-min-w-36 {
  min-width: 9rem;
}
.tw-min-w-5 {
  min-width: 1.25rem;
}
.tw-min-w-80 {
  min-width: 20rem;
}
.tw-min-w-\\[12rem\\] {
  min-width: 12rem;
}
.tw-min-w-\\[140px\\] {
  min-width: 140px;
}
.tw-min-w-\\[215px\\] {
  min-width: 215px;
}
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.tw-max-w-2xl {
  max-width: 42rem;
}
.tw-max-w-3xl {
  max-width: 48rem;
}
.tw-max-w-48 {
  max-width: 12rem;
}
.tw-max-w-4xl {
  max-width: 56rem;
}
.tw-max-w-5 {
  max-width: 1.25rem;
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-6xl {
  max-width: 72rem;
}
.tw-max-w-96 {
  max-width: 24rem;
}
.tw-max-w-\\[--skeleton-width\\] {
  max-width: var(--skeleton-width);
}
.tw-max-w-\\[220px\\] {
  max-width: 220px;
}
.tw-max-w-full {
  max-width: 100%;
}
.tw-max-w-lg {
  max-width: 32rem;
}
.tw-max-w-md {
  max-width: 28rem;
}
.tw-max-w-none {
  max-width: none;
}
.tw-max-w-sm {
  max-width: 24rem;
}
.tw-flex-1 {
  flex: 1 1 0%;
}
.tw-flex-shrink-0 {
  flex-shrink: 0;
}
.tw-shrink {
  flex-shrink: 1;
}
.tw-shrink-0 {
  flex-shrink: 0;
}
.tw-flex-grow {
  flex-grow: 1;
}
.tw-grow {
  flex-grow: 1;
}
.tw-grow-\\[2\\] {
  flex-grow: 2;
}
.tw-basis-0 {
  flex-basis: 0px;
}
.tw-caption-bottom {
  caption-side: bottom;
}
.tw-border-collapse {
  border-collapse: collapse;
}
.tw-origin-\\[--radix-context-menu-content-transform-origin\\] {
  transform-origin: var(--radix-context-menu-content-transform-origin);
}
.tw--translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-x-px {
  --tw-translate-x: -1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-px {
  --tw-translate-x: 1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-y-\\[-50\\%\\] {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes tw-pulse {

  50% {
    opacity: .5;
  }
}
.tw-animate-pulse {
  animation: tw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes tw-spin {

  to {
    transform: rotate(360deg);
  }
}
.tw-animate-spin {
  animation: tw-spin 1s linear infinite;
}
.tw-cursor-default {
  cursor: default;
}
.tw-cursor-ew-resize {
  cursor: ew-resize;
}
.tw-cursor-pointer {
  cursor: pointer;
}
.tw-touch-none {
  touch-action: none;
}
.tw-select-none {
  user-select: none;
}
.tw-resize {
  resize: both;
}
.tw-scroll-m-20 {
  scroll-margin: 5rem;
}
.tw-list-inside {
  list-style-position: inside;
}
.tw-list-outside {
  list-style-position: outside;
}
.\\!tw-list-\\[lower-alpha\\] {
  list-style-type: lower-alpha !important;
}
.\\!tw-list-\\[lower-roman\\] {
  list-style-type: lower-roman !important;
}
.\\!tw-list-\\[upper-alpha\\] {
  list-style-type: upper-alpha !important;
}
.\\!tw-list-\\[upper-roman\\] {
  list-style-type: upper-roman !important;
}
.\\!tw-list-decimal {
  list-style-type: decimal !important;
}
.\\!tw-list-disc {
  list-style-type: disc !important;
}
.tw-list-decimal {
  list-style-type: decimal;
}
.tw-list-disc {
  list-style-type: disc;
}
.tw-list-none {
  list-style-type: none;
}
.tw-grid-flow-col {
  grid-auto-flow: column;
}
.tw-grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.tw-grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.tw-grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.tw-grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}
.tw-grid-cols-\\[25\\%\\,25\\%\\,50\\%\\] {
  grid-template-columns: 25% 25% 50%;
}
.tw-grid-cols-\\[25\\%\\,50\\%\\,25\\%\\] {
  grid-template-columns: 25% 50% 25%;
}
.tw-grid-cols-\\[min-content_1fr\\] {
  grid-template-columns: min-content 1fr;
}
.tw-grid-cols-\\[min-content_min-content_1fr\\] {
  grid-template-columns: min-content min-content 1fr;
}
.tw-grid-cols-subgrid {
  grid-template-columns: subgrid;
}
.tw-flex-row {
  flex-direction: row;
}
.tw-flex-row-reverse {
  flex-direction: row-reverse;
}
.tw-flex-col {
  flex-direction: column;
}
.tw-flex-col-reverse {
  flex-direction: column-reverse;
}
.tw-flex-wrap {
  flex-wrap: wrap;
}
.tw-content-center {
  align-content: center;
}
.tw-items-start {
  align-items: flex-start;
}
.tw-items-end {
  align-items: flex-end;
}
.tw-items-center {
  align-items: center;
}
.tw-items-baseline {
  align-items: baseline;
}
.tw-items-stretch {
  align-items: stretch;
}
.tw-justify-start {
  justify-content: flex-start;
}
.tw-justify-end {
  justify-content: flex-end;
}
.tw-justify-center {
  justify-content: center;
}
.tw-justify-between {
  justify-content: space-between;
}
.tw-gap-1 {
  gap: 0.25rem;
}
.tw-gap-1\\.5 {
  gap: 0.375rem;
}
.tw-gap-2 {
  gap: 0.5rem;
}
.tw-gap-2\\.5 {
  gap: 0.625rem;
}
.tw-gap-3 {
  gap: 0.75rem;
}
.tw-gap-4 {
  gap: 1rem;
}
.tw-gap-5 {
  gap: 1.25rem;
}
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-\\[12px\\] {
  gap: 12px;
}
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-3 {
  column-gap: 0.75rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-gap-y-1 {
  row-gap: 0.25rem;
}
.tw-space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.tw-space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}
.tw-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.tw-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.tw-space-y-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-8 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(2rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(2rem * var(--tw-space-y-reverse));
}
.tw-divide-x > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-x-reverse: 0;
  border-right-width: calc(1px * var(--tw-divide-x-reverse));
  border-left-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)));
}
.tw-divide-y > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
.tw-self-stretch {
  align-self: stretch;
}
.tw-overflow-auto {
  overflow: auto;
}
.tw-overflow-hidden {
  overflow: hidden;
}
.tw-overflow-clip {
  overflow: clip;
}
.tw-overflow-visible {
  overflow: visible;
}
.tw-overflow-scroll {
  overflow: scroll;
}
.tw-overflow-x-auto {
  overflow-x: auto;
}
.tw-overflow-y-auto {
  overflow-y: auto;
}
.tw-overflow-x-hidden {
  overflow-x: hidden;
}
.tw-overflow-y-hidden {
  overflow-y: hidden;
}
.tw-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tw-text-ellipsis {
  text-overflow: ellipsis;
}
.tw-text-clip {
  text-overflow: clip;
}
.tw-whitespace-normal {
  white-space: normal;
}
.tw-whitespace-nowrap {
  white-space: nowrap;
}
.tw-text-nowrap {
  text-wrap: nowrap;
}
.tw-text-balance {
  text-wrap: balance;
}
.tw-break-words {
  overflow-wrap: break-word;
}
.tw-rounded {
  border-radius: 0.25rem;
}
.tw-rounded-2xl {
  border-radius: 1rem;
}
.tw-rounded-\\[6px\\] {
  border-radius: 6px;
}
.tw-rounded-full {
  border-radius: 9999px;
}
.tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-rounded-md {
  border-radius: calc(var(--radius) - 2px);
}
.tw-rounded-none {
  border-radius: 0px;
}
.tw-rounded-sm {
  border-radius: calc(var(--radius) - 4px);
}
.tw-rounded-xl {
  border-radius: 0.75rem;
}
.tw-rounded-b-\\[10px\\] {
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-l-\\[10px\\] {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-r-\\[10px\\] {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.tw-rounded-r-xl {
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}
.tw-rounded-t-\\[10px\\] {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.tw-border {
  border-width: 1px;
}
.tw-border-0 {
  border-width: 0px;
}
.tw-border-2 {
  border-width: 2px;
}
.tw-border-b {
  border-bottom-width: 1px;
}
.tw-border-b-0 {
  border-bottom-width: 0px;
}
.tw-border-e {
  border-inline-end-width: 1px;
}
.tw-border-e-0 {
  border-inline-end-width: 0px;
}
.tw-border-l {
  border-left-width: 1px;
}
.tw-border-l-2 {
  border-left-width: 2px;
}
.tw-border-l-4 {
  border-left-width: 4px;
}
.tw-border-s-2 {
  border-inline-start-width: 2px;
}
.tw-border-t {
  border-top-width: 1px;
}
.tw-border-t-0 {
  border-top-width: 0px;
}
.tw-border-solid {
  border-style: solid;
}
.tw-border-dashed {
  border-style: dashed;
}
.tw-border-none {
  border-style: none;
}
.tw-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));
}
.tw-border-blue-400 {
  --tw-border-opacity: 1;
  border-color: rgb(96 165 250 / var(--tw-border-opacity, 1));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}
.tw-border-border {
  border-color: hsl(var(--border));
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-muted-foreground {
  border-color: hsl(var(--muted-foreground));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-300 {
  --tw-border-opacity: 1;
  border-color: rgb(252 165 165 / var(--tw-border-opacity, 1));
}
.tw-border-red-400 {
  --tw-border-opacity: 1;
  border-color: rgb(248 113 113 / var(--tw-border-opacity, 1));
}
.tw-border-red-500 {
  --tw-border-opacity: 1;
  border-color: rgb(239 68 68 / var(--tw-border-opacity, 1));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity, 1));
}
.tw-border-ring {
  border-color: hsl(var(--ring));
}
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-border-slate-300 {
  --tw-border-opacity: 1;
  border-color: rgb(203 213 225 / var(--tw-border-opacity, 1));
}
.tw-border-transparent {
  border-color: transparent;
}
.tw-border-yellow-400 {
  --tw-border-opacity: 1;
  border-color: rgb(250 204 21 / var(--tw-border-opacity, 1));
}
.tw-border-yellow-500 {
  --tw-border-opacity: 1;
  border-color: rgb(234 179 8 / var(--tw-border-opacity, 1));
}
.tw-border-s-amber-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(253 230 138 / var(--tw-border-opacity, 1));
}
.tw-border-s-indigo-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(199 210 254 / var(--tw-border-opacity, 1));
}
.tw-border-s-purple-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(233 213 255 / var(--tw-border-opacity, 1));
}
.tw-border-s-red-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 202 202 / var(--tw-border-opacity, 1));
}
.\\!tw-bg-destructive\\/50 {
  background-color: hsl(var(--destructive) / 0.5) !important;
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-border {
  background-color: hsl(var(--border));
}
.tw-bg-card {
  background-color: hsl(var(--card));
}
.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}
.tw-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(107 114 128 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(220 252 231 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(240 253 244 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity, 1));
}
.tw-bg-input {
  background-color: hsl(var(--input));
}
.tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.tw-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity, 1));
}
.tw-bg-orange-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 237 213 / var(--tw-bg-opacity, 1));
}
.tw-bg-popover {
  background-color: hsl(var(--popover));
}
.tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.tw-bg-purple-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 245 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-red-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 226 226 / var(--tw-bg-opacity, 1));
}
.tw-bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
}
.tw-bg-secondary {
  background-color: hsl(var(--secondary));
}
.tw-bg-sidebar {
  background-color: hsl(var(--sidebar-background));
}
.tw-bg-sidebar-accent {
  background-color: hsl(var(--sidebar-accent));
}
.tw-bg-sidebar-border {
  background-color: hsl(var(--sidebar-border));
}
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 249 195 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 252 232 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity, 1));
}
.tw-bg-zinc-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity, 1));
}
.tw-fill-current {
  fill: currentColor;
}
.tw-fill-destructive {
  fill: hsl(var(--destructive));
}
.tw-fill-yellow-400 {
  fill: #facc15;
}
.tw-fill-yellow-400\\/50 {
  fill: rgb(250 204 21 / 0.5);
}
.tw-p-0 {
  padding: 0px;
}
.tw-p-0\\.5 {
  padding: 0.125rem;
}
.tw-p-1 {
  padding: 0.25rem;
}
.tw-p-2 {
  padding: 0.5rem;
}
.tw-p-3 {
  padding: 0.75rem;
}
.tw-p-4 {
  padding: 1rem;
}
.tw-p-6 {
  padding: 1.5rem;
}
.tw-p-8 {
  padding: 2rem;
}
.tw-p-\\[10px\\] {
  padding: 10px;
}
.tw-p-\\[1px\\] {
  padding: 1px;
}
.tw-px-0 {
  padding-left: 0px;
  padding-right: 0px;
}
.tw-px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.tw-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.tw-px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.tw-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.tw-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.tw-px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.tw-px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.tw-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.tw-py-0 {
  padding-top: 0px;
  padding-bottom: 0px;
}
.tw-py-0\\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.tw-py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.tw-py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.tw-py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.tw-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.tw-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.tw-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.tw-py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.\\!tw-pr-10 {
  padding-right: 2.5rem !important;
}
.tw-pb-0 {
  padding-bottom: 0px;
}
.tw-pb-2 {
  padding-bottom: 0.5rem;
}
.tw-pb-3 {
  padding-bottom: 0.75rem;
}
.tw-pb-4 {
  padding-bottom: 1rem;
}
.tw-pe-1 {
  padding-inline-end: 0.25rem;
}
.tw-pe-2 {
  padding-inline-end: 0.5rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
}
.tw-pe-\\[calc\\(138px\\+1rem\\)\\] {
  padding-inline-end: calc(138px + 1rem);
}
.tw-pl-2 {
  padding-left: 0.5rem;
}
.tw-pl-3 {
  padding-left: 0.75rem;
}
.tw-pl-4 {
  padding-left: 1rem;
}
.tw-pl-5 {
  padding-left: 1.25rem;
}
.tw-pl-6 {
  padding-left: 1.5rem;
}
.tw-pl-8 {
  padding-left: 2rem;
}
.tw-pr-0 {
  padding-right: 0px;
}
.tw-pr-2 {
  padding-right: 0.5rem;
}
.tw-pr-3 {
  padding-right: 0.75rem;
}
.tw-pr-4 {
  padding-right: 1rem;
}
.tw-ps-12 {
  padding-inline-start: 3rem;
}
.tw-ps-4 {
  padding-inline-start: 1rem;
}
.tw-ps-8 {
  padding-inline-start: 2rem;
}
.tw-ps-9 {
  padding-inline-start: 2.25rem;
}
.tw-ps-\\[85px\\] {
  padding-inline-start: 85px;
}
.tw-pt-0 {
  padding-top: 0px;
}
.tw-pt-1 {
  padding-top: 0.25rem;
}
.tw-pt-2 {
  padding-top: 0.5rem;
}
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-6 {
  padding-top: 1.5rem;
}
.tw-text-left {
  text-align: left;
}
.tw-text-center {
  text-align: center;
}
.tw-text-right {
  text-align: right;
}
.tw-text-start {
  text-align: start;
}
.tw-text-end {
  text-align: end;
}
.tw-align-middle {
  vertical-align: middle;
}
.tw-font-sans {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.tw-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.tw-text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.tw-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.tw-text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.tw-text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.tw-text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.tw-text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.tw-text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.tw-font-bold {
  font-weight: 700;
}
.tw-font-extrabold {
  font-weight: 800;
}
.tw-font-medium {
  font-weight: 500;
}
.tw-font-normal {
  font-weight: 400;
}
.tw-font-semibold {
  font-weight: 600;
}
.tw-capitalize {
  text-transform: capitalize;
}
.tw-italic {
  font-style: italic;
}
.tw-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.tw-leading-loose {
  line-height: 2;
}
.tw-leading-none {
  line-height: 1;
}
.tw-leading-relaxed {
  line-height: 1.625;
}
.tw-leading-tight {
  line-height: 1.25;
}
.tw-tracking-tight {
  letter-spacing: -0.025em;
}
.tw-tracking-widest {
  letter-spacing: 0.1em;
}
.tw-text-blue-400 {
  --tw-text-opacity: 1;
  color: rgb(96 165 250 / var(--tw-text-opacity, 1));
}
.tw-text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity, 1));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}
.tw-text-blue-800 {
  --tw-text-opacity: 1;
  color: rgb(30 64 175 / var(--tw-text-opacity, 1));
}
.tw-text-card-foreground {
  color: hsl(var(--card-foreground));
}
.tw-text-current {
  color: currentColor;
}
.tw-text-destructive {
  color: hsl(var(--destructive));
}
.tw-text-destructive-foreground {
  color: hsl(var(--destructive-foreground));
}
.tw-text-foreground {
  color: hsl(var(--foreground));
}
.tw-text-gray-300 {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity, 1));
}
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
.tw-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
.tw-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity, 1));
}
.tw-text-green-600 {
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity, 1));
}
.tw-text-green-700 {
  --tw-text-opacity: 1;
  color: rgb(21 128 61 / var(--tw-text-opacity, 1));
}
.tw-text-green-800 {
  --tw-text-opacity: 1;
  color: rgb(22 101 52 / var(--tw-text-opacity, 1));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
}
.tw-text-muted-foreground\\/50 {
  color: hsl(var(--muted-foreground) / 0.5);
}
.tw-text-orange-800 {
  --tw-text-opacity: 1;
  color: rgb(154 52 18 / var(--tw-text-opacity, 1));
}
.tw-text-popover-foreground {
  color: hsl(var(--popover-foreground));
}
.tw-text-primary {
  color: hsl(var(--primary));
}
.tw-text-primary-foreground {
  color: hsl(var(--primary-foreground));
}
.tw-text-purple-900 {
  --tw-text-opacity: 1;
  color: rgb(88 28 135 / var(--tw-text-opacity, 1));
}
.tw-text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity, 1));
}
.tw-text-red-700 {
  --tw-text-opacity: 1;
  color: rgb(185 28 28 / var(--tw-text-opacity, 1));
}
.tw-text-red-800 {
  --tw-text-opacity: 1;
  color: rgb(153 27 27 / var(--tw-text-opacity, 1));
}
.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.tw-text-sidebar-accent-foreground {
  color: hsl(var(--sidebar-accent-foreground));
}
.tw-text-sidebar-foreground {
  color: hsl(var(--sidebar-foreground));
}
.tw-text-sidebar-foreground\\/70 {
  color: hsl(var(--sidebar-foreground) / 0.7);
}
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity, 1));
}
.tw-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-400 {
  --tw-text-opacity: 1;
  color: rgb(250 204 21 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-600 {
  --tw-text-opacity: 1;
  color: rgb(202 138 4 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-700 {
  --tw-text-opacity: 1;
  color: rgb(161 98 7 / var(--tw-text-opacity, 1));
}
.tw-underline {
  text-decoration-line: underline;
}
.tw-line-through {
  text-decoration-line: line-through;
}
.tw-decoration-destructive {
  text-decoration-color: hsl(var(--destructive));
}
.tw-underline-offset-4 {
  text-underline-offset: 4px;
}
.tw-opacity-0 {
  opacity: 0;
}
.tw-opacity-100 {
  opacity: 1;
}
.tw-opacity-50 {
  opacity: 0.5;
}
.tw-opacity-60 {
  opacity: 0.6;
}
.tw-opacity-70 {
  opacity: 0.7;
}
.tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-border\\)\\)\\] {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-border));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-none {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.tw-ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-2 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-primary {
  --tw-ring-color: hsl(var(--primary));
}
.tw-ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.tw-ring-offset-2 {
  --tw-ring-offset-width: 2px;
}
.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.tw-drop-shadow-sm {
  --tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.tw-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[left\\,right\\,width\\] {
  transition-property: left,right,width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[margin\\,opa\\] {
  transition-property: margin,opa;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\,height\\,padding\\] {
  transition-property: width,height,padding;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\] {
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-duration-200 {
  transition-duration: 200ms;
}
.tw-ease-linear {
  transition-timing-function: linear;
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
.tw-animate-in {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.tw-fade-in-0 {
  --tw-enter-opacity: 0;
}
.tw-fade-in-80 {
  --tw-enter-opacity: 0.8;
}
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-ease-linear {
  animation-timing-function: linear;
}
.tw-\\@container\\/tab-toolbar-center {
  container-type: inline-size;
  container-name: tab-toolbar-center;
}
.tw-\\@container\\/tab-toolbar-end {
  container-type: inline-size;
  container-name: tab-toolbar-end;
}
.tw-\\@container\\/tab-toolbar-start {
  container-type: inline-size;
  container-name: tab-toolbar-start;
}
.tw-\\@container\\/toolbar {
  container-type: inline-size;
  container-name: toolbar;
}
.\\[--lexical-indent-base-value\\:40px\\] {
  --lexical-indent-base-value: 40px;
}

/*
 * WARNING: These themes are also represented in paranext-core/src/shared/data/themes.data.json!
 * Please update in both locations
*/
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css */
/* #endregion */

/* Note that the following region is from shadcn/ui's styles
 * https://ui.shadcn.com/docs/installation/manual#configure-styles but is scoped down to .pr-twp
 * because this is just a component library and should not apply its styles to the entire page.
 *
 * There is now a section in this library's README.md that explains how to apply these styles to the
 * entire page if desired.
 *
 * The template has the original shadcn/ui styles because it intentionally applies the styles to the
 * entire page. The same is true for Platform.Bible - see \`app.component.scss\`
 */
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css but with the difference of being scoped to .pr-twp here */
.file\\:tw-border-0::file-selector-button {
  border-width: 0px;
}
.file\\:tw-bg-transparent::file-selector-button {
  background-color: transparent;
}
.file\\:tw-text-sm::file-selector-button {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.file\\:tw-font-medium::file-selector-button {
  font-weight: 500;
}
.file\\:tw-text-foreground::file-selector-button {
  color: hsl(var(--foreground));
}
.placeholder\\:tw-text-muted-foreground::placeholder {
  color: hsl(var(--muted-foreground));
}
.before\\:tw-absolute::before {
  content: var(--tw-content);
  position: absolute;
}
.before\\:tw-left-0::before {
  content: var(--tw-content);
  left: 0px;
}
.before\\:tw-top-0\\.5::before {
  content: var(--tw-content);
  top: 0.125rem;
}
.before\\:tw-block::before {
  content: var(--tw-content);
  display: block;
}
.before\\:tw-hidden::before {
  content: var(--tw-content);
  display: none;
}
.before\\:tw-h-4::before {
  content: var(--tw-content);
  height: 1rem;
}
.before\\:tw-w-4::before {
  content: var(--tw-content);
  width: 1rem;
}
.before\\:tw-cursor-pointer::before {
  content: var(--tw-content);
  cursor: pointer;
}
.before\\:tw-rounded::before {
  content: var(--tw-content);
  border-radius: 0.25rem;
}
.before\\:tw-border::before {
  content: var(--tw-content);
  border-width: 1px;
}
.before\\:tw-border-primary::before {
  content: var(--tw-content);
  border-color: hsl(var(--primary));
}
.before\\:tw-bg-primary::before {
  content: var(--tw-content);
  background-color: hsl(var(--primary));
}
.before\\:tw-bg-cover::before {
  content: var(--tw-content);
  background-size: cover;
}
.before\\:tw-bg-no-repeat::before {
  content: var(--tw-content);
  background-repeat: no-repeat;
}
.before\\:tw-content-\\[\\"\\"\\]::before {
  --tw-content: "";
  content: var(--tw-content);
}
.after\\:tw-absolute::after {
  content: var(--tw-content);
  position: absolute;
}
.after\\:tw--inset-2::after {
  content: var(--tw-content);
  inset: -0.5rem;
}
.after\\:tw-inset-y-0::after {
  content: var(--tw-content);
  top: 0px;
  bottom: 0px;
}
.after\\:tw-left-1\\/2::after {
  content: var(--tw-content);
  left: 50%;
}
.after\\:tw-left-\\[7px\\]::after {
  content: var(--tw-content);
  left: 7px;
}
.after\\:tw-right-\\[7px\\]::after {
  content: var(--tw-content);
  right: 7px;
}
.after\\:tw-top-\\[6px\\]::after {
  content: var(--tw-content);
  top: 6px;
}
.after\\:tw-block::after {
  content: var(--tw-content);
  display: block;
}
.after\\:tw-hidden::after {
  content: var(--tw-content);
  display: none;
}
.after\\:tw-h-0\\.5::after {
  content: var(--tw-content);
  height: 0.125rem;
}
.after\\:tw-h-\\[6px\\]::after {
  content: var(--tw-content);
  height: 6px;
}
.after\\:tw-w-1::after {
  content: var(--tw-content);
  width: 0.25rem;
}
.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}
.after\\:tw-w-\\[3px\\]::after {
  content: var(--tw-content);
  width: 3px;
}
.after\\:tw--translate-x-1\\/2::after {
  content: var(--tw-content);
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.after\\:tw-rotate-45::after {
  content: var(--tw-content);
  --tw-rotate: 45deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.after\\:tw-cursor-pointer::after {
  content: var(--tw-content);
  cursor: pointer;
}
.after\\:tw-border-b-2::after {
  content: var(--tw-content);
  border-bottom-width: 2px;
}
.after\\:tw-border-l-0::after {
  content: var(--tw-content);
  border-left-width: 0px;
}
.after\\:tw-border-r-2::after {
  content: var(--tw-content);
  border-right-width: 2px;
}
.after\\:tw-border-t-0::after {
  content: var(--tw-content);
  border-top-width: 0px;
}
.after\\:tw-border-solid::after {
  content: var(--tw-content);
  border-style: solid;
}
.after\\:tw-border-white::after {
  content: var(--tw-content);
  --tw-border-opacity: 1;
  border-color: rgb(255 255 255 / var(--tw-border-opacity, 1));
}
.after\\:tw-bg-muted::after {
  content: var(--tw-content);
  background-color: hsl(var(--muted));
}
.after\\:tw-content-\\[\\"\\"\\]::after {
  --tw-content: "";
  content: var(--tw-content);
}
.first\\:tw-mt-0:first-child {
  margin-top: 0px;
}
.even\\:tw-bg-muted:nth-child(even) {
  background-color: hsl(var(--muted));
}
.hover\\:tw-cursor-pointer:hover {
  cursor: pointer;
}
.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}
.hover\\:tw-bg-blue-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
}
.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}
.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}
.hover\\:tw-bg-input:hover {
  background-color: hsl(var(--input));
}
.hover\\:tw-bg-muted:hover {
  background-color: hsl(var(--muted));
}
.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}
.hover\\:tw-bg-muted\\/80:hover {
  background-color: hsl(var(--muted) / 0.8);
}
.hover\\:tw-bg-primary\\/70:hover {
  background-color: hsl(var(--primary) / 0.7);
}
.hover\\:tw-bg-primary\\/80:hover {
  background-color: hsl(var(--primary) / 0.8);
}
.hover\\:tw-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}
.hover\\:tw-bg-secondary:hover {
  background-color: hsl(var(--secondary));
}
.hover\\:tw-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}
.hover\\:tw-bg-sidebar-accent:hover {
  background-color: hsl(var(--sidebar-accent));
}
.hover\\:tw-bg-transparent:hover {
  background-color: transparent;
}
.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}
.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}
.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}
.hover\\:tw-text-primary-foreground:hover {
  color: hsl(var(--primary-foreground));
}
.hover\\:tw-text-sidebar-accent-foreground:hover {
  color: hsl(var(--sidebar-accent-foreground));
}
.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}
.hover\\:tw-opacity-100:hover {
  opacity: 1;
}
.hover\\:tw-opacity-80:hover {
  opacity: 0.8;
}
.hover\\:tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:tw-shadow-md:hover {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:after\\:tw-bg-sidebar-border:hover::after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border));
}
.focus\\:tw-relative:focus {
  position: relative;
}
.focus\\:tw-z-10:focus {
  z-index: 10;
}
.focus\\:tw-bg-accent:focus {
  background-color: hsl(var(--accent));
}
.focus\\:tw-bg-muted:focus {
  background-color: hsl(var(--muted));
}
.focus\\:tw-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
}
.focus\\:tw-text-foreground:focus {
  color: hsl(var(--foreground));
}
.focus\\:tw-outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\\:tw-ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus\\:tw-ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}
.focus\\:tw-ring-offset-1:focus {
  --tw-ring-offset-width: 1px;
}
.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
.focus\\:tw-ring-offset-background:focus {
  --tw-ring-offset-color: hsl(var(--background));
}
.focus-visible\\:tw-relative:focus-visible {
  position: relative;
}
.focus-visible\\:tw-z-10:focus-visible {
  z-index: 10;
}
.focus-visible\\:tw-outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus-visible\\:tw-ring-1:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:tw-ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:tw-ring-\\[color\\:hsl\\(2400o2c 5\\%0o2c 64\\.9\\%\\)\\]:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity, 1));
}
.focus-visible\\:tw-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}
.focus-visible\\:tw-ring-sidebar-ring:focus-visible {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.focus-visible\\:tw-ring-offset-1:focus-visible {
  --tw-ring-offset-width: 1px;
}
.focus-visible\\:tw-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}
.focus-visible\\:tw-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
}
.active\\:tw-bg-sidebar-accent:active {
  background-color: hsl(var(--sidebar-accent));
}
.active\\:tw-text-sidebar-accent-foreground:active {
  color: hsl(var(--sidebar-accent-foreground));
}
.disabled\\:tw-pointer-events-none:disabled {
  pointer-events: none;
}
.disabled\\:tw-cursor-not-allowed:disabled {
  cursor: not-allowed;
}
.disabled\\:tw-opacity-50:disabled {
  opacity: 0.5;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
}
.has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:tw-gap-2:has(>[data-slot=button-group]) {
  gap: 0.5rem;
}
.has-\\[\\[data-variant\\=inset\\]\\]\\:tw-bg-sidebar:has([data-variant=inset]) {
  background-color: hsl(var(--sidebar-background));
}
.aria-disabled\\:tw-pointer-events-none[aria-disabled="true"] {
  pointer-events: none;
}
.aria-disabled\\:tw-opacity-50[aria-disabled="true"] {
  opacity: 0.5;
}
.data-\\[disabled\\=true\\]\\:tw-pointer-events-none[data-disabled="true"] {
  pointer-events: none;
}
.data-\\[disabled\\]\\:tw-pointer-events-none[data-disabled] {
  pointer-events: none;
}
.data-\\[orientation\\=vertical\\]\\:tw-h-auto[data-orientation="vertical"] {
  height: auto;
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-h-px[data-panel-group-direction="vertical"] {
  height: 1px;
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-w-full[data-panel-group-direction="vertical"] {
  width: 100%;
}
.data-\\[side\\=bottom\\]\\:tw-translate-y-1[data-side="bottom"] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=left\\]\\:tw--translate-x-1[data-side="left"] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=right\\]\\:tw-translate-x-1[data-side="right"] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=top\\]\\:tw--translate-y-1[data-side="top"] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:tw-translate-x-5[data-state="checked"] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:tw-translate-x-\\[-20px\\][data-state="checked"] {
  --tw-translate-x: -20px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=unchecked\\]\\:tw-translate-x-0[data-state="unchecked"] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-flex-col[data-panel-group-direction="vertical"] {
  flex-direction: column;
}
.data-\\[active\\=true\\]\\:tw-bg-sidebar-accent[data-active="true"] {
  background-color: hsl(var(--sidebar-accent));
}
.data-\\[selected\\=true\\]\\:tw-bg-accent[data-selected="true"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=active\\]\\:tw-bg-background[data-state="active"] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=checked\\]\\:tw-bg-primary[data-state="checked"] {
  background-color: hsl(var(--primary));
}
.data-\\[state\\=on\\]\\:tw-bg-accent[data-state="on"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=open\\]\\:tw-bg-accent[data-state="open"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=open\\]\\:tw-bg-muted[data-state="open"] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=selected\\]\\:tw-bg-muted[data-state="selected"] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=unchecked\\]\\:tw-bg-input[data-state="unchecked"] {
  background-color: hsl(var(--input));
}
.data-\\[active\\=true\\]\\:tw-font-medium[data-active="true"] {
  font-weight: 500;
}
.data-\\[active\\=true\\]\\:tw-text-sidebar-accent-foreground[data-active="true"] {
  color: hsl(var(--sidebar-accent-foreground));
}
.data-\\[selected\\=true\\]\\:tw-text-accent-foreground[data-selected="true"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=active\\]\\:tw-text-foreground[data-state="active"] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:tw-text-primary-foreground[data-state="checked"] {
  color: hsl(var(--primary-foreground));
}
.data-\\[state\\=on\\]\\:tw-text-accent-foreground[data-state="on"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:tw-text-accent-foreground[data-state="open"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:tw-text-foreground[data-state="open"] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=open\\]\\:tw-text-muted-foreground[data-state="open"] {
  color: hsl(var(--muted-foreground));
}
.data-\\[disabled\\=true\\]\\:tw-opacity-50[data-disabled="true"] {
  opacity: 0.5;
}
.data-\\[disabled\\]\\:tw-opacity-50[data-disabled] {
  opacity: 0.5;
}
.data-\\[state\\=open\\]\\:tw-opacity-100[data-state="open"] {
  opacity: 1;
}
.data-\\[state\\=active\\]\\:tw-shadow-sm[data-state="active"] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.data-\\[state\\=open\\]\\:tw-animate-in[data-state="open"] {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:tw-animate-out[data-state="closed"] {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:tw-fade-out-0[data-state="closed"] {
  --tw-exit-opacity: 0;
}
.data-\\[state\\=open\\]\\:tw-fade-in-0[data-state="open"] {
  --tw-enter-opacity: 0;
}
.data-\\[state\\=closed\\]\\:tw-zoom-out-95[data-state="closed"] {
  --tw-exit-scale: .95;
}
.data-\\[state\\=open\\]\\:tw-zoom-in-95[data-state="open"] {
  --tw-enter-scale: .95;
}
.data-\\[side\\=bottom\\]\\:tw-slide-in-from-top-2[data-side="bottom"] {
  --tw-enter-translate-y: -0.5rem;
}
.data-\\[side\\=left\\]\\:tw-slide-in-from-right-2[data-side="left"] {
  --tw-enter-translate-x: 0.5rem;
}
.data-\\[side\\=right\\]\\:tw-slide-in-from-left-2[data-side="right"] {
  --tw-enter-translate-x: -0.5rem;
}
.data-\\[side\\=top\\]\\:tw-slide-in-from-bottom-2[data-side="top"] {
  --tw-enter-translate-y: 0.5rem;
}
.data-\\[state\\=closed\\]\\:tw-slide-out-to-left-1\\/2[data-state="closed"] {
  --tw-exit-translate-x: -50%;
}
.data-\\[state\\=closed\\]\\:tw-slide-out-to-top-\\[48\\%\\][data-state="closed"] {
  --tw-exit-translate-y: -48%;
}
.data-\\[state\\=open\\]\\:tw-slide-in-from-left-1\\/2[data-state="open"] {
  --tw-enter-translate-x: -50%;
}
.data-\\[state\\=open\\]\\:tw-slide-in-from-top-\\[48\\%\\][data-state="open"] {
  --tw-enter-translate-y: -48%;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-left-0[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  left: 0px;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-h-1[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  height: 0.25rem;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-w-full[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  width: 100%;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw--translate-y-1\\/2[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-translate-x-0[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=open\\]\\:hover\\:tw-bg-sidebar-accent:hover[data-state="open"] {
  background-color: hsl(var(--sidebar-accent));
}
.data-\\[state\\=open\\]\\:hover\\:tw-text-sidebar-accent-foreground:hover[data-state="open"] {
  color: hsl(var(--sidebar-accent-foreground));
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  left: calc(var(--sidebar-width) * -1);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  right: calc(var(--sidebar-width) * -1);
}
.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw--right-4 {
  right: -1rem;
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-left-0 {
  left: 0px;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw--mt-8 {
  margin-top: -2rem;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-hidden {
  display: none;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[--sidebar-width-icon\\] {
  width: var(--sidebar-width-icon);
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem);
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)_\\+2px\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem + 2px);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-w-0 {
  width: 0px;
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-overflow-hidden {
  overflow: hidden;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border {
  border-width: 1px;
}
.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw-border-r {
  border-right-width: 1px;
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-border-l {
  border-left-width: 1px;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-opacity-0 {
  opacity: 0;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:after\\:tw-left-full::after {
  content: var(--tw-content);
  left: 100%;
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:tw-bg-sidebar:hover {
  background-color: hsl(var(--sidebar-background));
}
.tw-peer[data-variant="inset"] ~ .peer-data-\\[variant\\=inset\\]\\:tw-min-h-\\[calc\\(100svh-theme\\(spacing\\.4\\)\\)\\] {
  min-height: calc(100svh - 1rem);
}
@container (min-width: 24rem) {

  .\\@sm\\:tw-grow {
    flex-grow: 1;
  }

  .\\@sm\\:tw-basis-auto {
    flex-basis: auto;
  }
}
@media (min-width: 640px) {

  .sm\\:tw-flex {
    display: flex;
  }

  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:tw-text-left {
    text-align: left;
  }

  .sm\\:tw-text-start {
    text-align: start;
  }
}
@media (min-width: 768px) {

  .md\\:tw-block {
    display: block;
  }

  .md\\:tw-flex {
    display: flex;
  }

  .md\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\\:tw-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .md\\:tw-opacity-0 {
    opacity: 0;
  }

  .after\\:md\\:tw-hidden::after {
    content: var(--tw-content);
    display: none;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-m-2 {
    margin: 0.5rem;
  }

  .tw-peer[data-state="collapsed"][data-variant="inset"] ~ .md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-2 {
    margin-left: 0.5rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-0 {
    margin-left: 0px;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-rounded-xl {
    border-radius: 0.75rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-shadow {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
}
@media (min-width: 1024px) {

  .lg\\:tw-flex {
    display: flex;
  }

  .lg\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:tw-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .lg\\:tw-text-5xl {
    font-size: 3rem;
    line-height: 1;
  }
}
.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}
.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}
@media (prefers-color-scheme: dark) {

  .dark\\:tw-border-destructive {
    border-color: hsl(var(--destructive));
  }
}
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-rounded-l-none>*:not(:first-child) {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-rounded-t-none>*:not(:first-child) {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-border-l-0>*:not(:first-child) {
  border-left-width: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-border-t-0>*:not(:first-child) {
  border-top-width: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:tw-rounded-b-none>*:not(:last-child) {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:tw-rounded-r-none>*:not(:last-child) {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.\\[\\&\\>\\*\\]\\:focus-visible\\:tw-relative:focus-visible>* {
  position: relative;
}
.\\[\\&\\>\\*\\]\\:focus-visible\\:tw-z-10:focus-visible>* {
  z-index: 10;
}
.has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:tw-rounded-r-md>[data-slot=select-trigger]:last-of-type:has(select[aria-hidden=true]:last-child) {
  border-top-right-radius: calc(var(--radius) - 2px);
  border-bottom-right-radius: calc(var(--radius) - 2px);
}
.\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:tw-w-fit>[data-slot=select-trigger]:not([class*=w-]) {
  width: fit-content;
}
.\\[\\&\\>img\\+div\\]\\:tw-translate-y-\\[-3px\\]>img+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>img\\]\\:tw-absolute>img {
  position: absolute;
}
.\\[\\&\\>img\\]\\:tw-left-4>img {
  left: 1rem;
}
.\\[\\&\\>img\\]\\:tw-top-4>img {
  top: 1rem;
}
.\\[\\&\\>img\\]\\:tw-text-destructive>img {
  color: hsl(var(--destructive));
}
.\\[\\&\\>img\\]\\:tw-text-foreground>img {
  color: hsl(var(--foreground));
}
.\\[\\&\\>img\\~\\*\\]\\:tw-pl-7>img~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>input\\]\\:tw-flex-1>input {
  flex: 1 1 0%;
}
.\\[\\&\\>li\\]\\:tw-mt-2>li {
  margin-top: 0.5rem;
}
.\\[\\&\\>span\\:last-child\\]\\:tw-truncate>span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.\\[\\&\\>span\\]\\:tw-line-clamp-1>span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.\\[\\&\\>svg\\+div\\]\\:tw-translate-y-\\[-3px\\]>svg+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>svg\\]\\:tw-absolute>svg {
  position: absolute;
}
.\\[\\&\\>svg\\]\\:tw-left-4>svg {
  left: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-top-4>svg {
  top: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-size-4>svg {
  width: 1rem;
  height: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-shrink-0>svg {
  flex-shrink: 0;
}
.\\[\\&\\>svg\\]\\:tw-text-destructive>svg {
  color: hsl(var(--destructive));
}
.\\[\\&\\>svg\\]\\:tw-text-foreground>svg {
  color: hsl(var(--foreground));
}
.\\[\\&\\>svg\\]\\:tw-text-sidebar-accent-foreground>svg {
  color: hsl(var(--sidebar-accent-foreground));
}
.\\[\\&\\>svg\\~\\*\\]\\:tw-pl-7>svg~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>tr\\]\\:last\\:tw-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}
.\\[\\&\\[align\\=center\\]\\]\\:tw-text-center[align=center] {
  text-align: center;
}
.\\[\\&\\[align\\=right\\]\\]\\:tw-text-right[align=right] {
  text-align: right;
}
.\\[\\&\\[data-panel-group-direction\\=vertical\\]\\>div\\]\\:tw-rotate-90[data-panel-group-direction=vertical]>div {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-px-2 [cmdk-group-heading] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-py-1\\.5 [cmdk-group-heading] {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-xs [cmdk-group-heading] {
  font-size: 0.75rem;
  line-height: 1rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-font-medium [cmdk-group-heading] {
  font-weight: 500;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-muted-foreground [cmdk-group-heading] {
  color: hsl(var(--muted-foreground));
}
.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:tw-pt-0 [cmdk-group]:not([hidden]) ~[cmdk-group] {
  padding-top: 0px;
}
.\\[\\&_\\[cmdk-group\\]\\]\\:tw-px-2 [cmdk-group] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-h-5 [cmdk-input-wrapper] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-w-5 [cmdk-input-wrapper] svg {
  width: 1.25rem;
}
.\\[\\&_\\[cmdk-input\\]\\]\\:tw-h-12 [cmdk-input] {
  height: 3rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:tw-px-2 [cmdk-item] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:tw-py-3 [cmdk-item] {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-h-5 [cmdk-item] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-w-5 [cmdk-item] svg {
  width: 1.25rem;
}
.\\[\\&_p\\]\\:tw-leading-relaxed p {
  line-height: 1.625;
}
.\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:tw-size-4 svg:not([class*=size-]) {
  width: 1rem;
  height: 1rem;
}
.\\[\\&_svg\\]\\:tw-pointer-events-none svg {
  pointer-events: none;
}
.\\[\\&_svg\\]\\:tw-size-4 svg {
  width: 1rem;
  height: 1rem;
}
.\\[\\&_svg\\]\\:tw-shrink-0 svg {
  flex-shrink: 0;
}
.\\[\\&_tr\\:last-child\\]\\:tw-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:tw-border-b tr {
  border-bottom-width: 1px;
}
[data-side=primary][data-collapsible=offcanvas] .\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--right-2 {
  right: -0.5rem;
}
[data-side=primary][data-state=collapsed] .\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}
[data-side=secondary][data-collapsible=offcanvas] .\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--left-2 {
  left: -0.5rem;
}
[data-side=secondary][data-state=collapsed] .\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}
[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}
[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
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
  color: hsl(var(--foreground));
  overflow-y: auto;
  flex-grow: 1;
  margin: 0;

  /*  remove rounded top corners to look better in tabs */
  .toolbar {
    border-bottom: 1px solid hsl(var(--border));
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    background-color: hsl(var(--background));
    color: hsl(var(--color));
  }
}

/*  text selection */

:focus ::selection {
  color: hsl(var(--primary-foreground));
  background-color: hsl(var(--primary));
}

::selection {
  color: hsl(var(--secondary-foreground));
  background-color: hsl(var(--secondary));
}

/*  focus ring */

:focus-visible:not(.editor-input),
.CommentPlugin_CommentInputBox_Editor:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  --tw-ring-offset-width: 2px;
  --tw-ring-color: hsl(var(--ring));
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
    var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
  --tw-ring-offset-color: hsl(var(--background));
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

/*  buttons */

/*  icon button variant "ghost" */

.Button__root,
button.toolbar-item {
  color: hsl(var(--foreground));

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
  color: hsl(var(--accent-foreground));
}

/*  text button variant "ghost" on popover */

.Modal__closeButton {
  color: hsl(var(--popover-foreground));
  background-color: hsl(var(--popover));
}

/*  toggle button */

.CommentPlugin_ShowCommentsButton.active {
  background-color: hsl(var(--accent));
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
  color: hsl(var(--accent-foreground));
  background-color: hsl(var(--accent));
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
  color: hsl(var(--foreground));
}

.toolbar .divider {
  background-color: hsl(var(--border));
}

.dropdown {
  background-color: hsl(var(--popover));

  .item {
    color: hsl(var(--popover-foreground));
    background-color: hsl(var(--popover));
  }

  .item:hover {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  .divider {
    background-color: hsl(var(--muted));
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
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));

  &::before {
    background-color: hsl(var(--popover));
    border-color: transparent transparent hsl(var(--popover)) hsl(var(--popover));
  }

  .Button__root {
    background-color: hsl(var(--secondary));
    color: hsl(var(--secondary-foreground));
  }

  .Button__root.primary {
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
  }

  .Button__root:hover:not([disabled]) {
    opacity: 0.8;
  }
}

.typeahead-popover,
.typeahead-popover li {
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
}

.typeahead-popover ul li.selected,
.typeahead-popover li:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.CommentPlugin_CommentInputBox_Editor,
.CommentPlugin_CommentsPanel_Editor {
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  border-color: hsl(var(--border));
  caret-color: hsl(var(--foreground));
}

.CommentPlugin_CommentsPanel_Heading,
.CommentPlugin_CommentsPanel_List_Thread {
  border-color: hsl(var(--border));
}

.CommentPlugin_ShowCommentsButton {
  z-index: 10;
  right: 26px;
}

/*  work around https://github.com/BiblioNexus-Foundation/scripture-editors/issues/127 */

.CommentPlugin_AddCommentBox {
  left: unset !important;
  right: 0 !important;

  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  border: 1px solid hsl(var(--border));
}

.CommentPlugin_AddCommentBox_button {
  color: hsl(var(--popover-foreground));

  &:hover {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }
}

.CommentPlugin_CommentsPanel {
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
}

.CommentPlugin_CommentsPanel_SendButton {
  margin: 10px;
  top: 0;
  right: 0;
}

/*  inside the editor */

.editor-inner {
  background: hsl(var(--background));
}

.formatted-font .verse {
  background-color: hsl(var(--secondary));
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
  background-color: color-mix(in oklab, hsl(var(--accent)) 85%, black);
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
`,"after-all");
