const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./button.stories-B86QCYKD.js","./jsx-runtime-DrLzXHSF.js","./index-BzTIjXJV.js","./entry-preview-uiuKfRXM.js","./chunk-XP5HYGXS-AdqhbrnO.js","./index-Dzs4FJFt.js","./entry-preview-docs-xgTJAu4K.js","./index-DYobWhr_.js","./preview-ASNmsWDf.js","./index-XvsFvOFV.js","./preview-DZSwiA0z.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=r(a);fetch(a.href,i)}})();const scriptRel="modulepreload",assetsURL=function(t,e){return new URL(t,e).href},seen={},__vitePreload=function(e,r,o){let a=Promise.resolve();if(r&&r.length>0){const l=document.getElementsByTagName("link"),u=document.querySelector("meta[property=csp-nonce]"),c=(u==null?void 0:u.nonce)||(u==null?void 0:u.getAttribute("nonce"));a=Promise.allSettled(r.map(d=>{if(d=assetsURL(d,o),d in seen)return;seen[d]=!0;const m=d.endsWith(".css"),h=m?'[rel="stylesheet"]':"";if(!!o)for(let ne=l.length-1;ne>=0;ne--){const le=l[ne];if(le.href===d&&(!m||le.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${h}`))return;const J=document.createElement("link");if(J.rel=m?"stylesheet":scriptRel,m||(J.as="script"),J.crossOrigin="",J.href=d,c&&J.setAttribute("nonce",c),document.head.appendChild(J),m)return new Promise((ne,le)=>{J.addEventListener("load",ne),J.addEventListener("error",()=>le(new Error(`Unable to preload CSS for ${d}`)))})}))}function i(l){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=l,window.dispatchEvent(u),!u.defaultPrevented)throw l}return a.then(l=>{for(const u of l||[])u.status==="rejected"&&i(u.reason);return e().catch(i)})};var tl=Object.create,et=Object.defineProperty,ol=Object.getOwnPropertyDescriptor,nl=Object.getOwnPropertyNames,sl=Object.getPrototypeOf,il=Object.prototype.hasOwnProperty,n=(t,e)=>et(t,"name",{value:e,configurable:!0}),cr=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')}),q=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),_e=(t,e)=>{for(var r in e)et(t,r,{get:e[r],enumerable:!0})},al=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of nl(e))!il.call(t,a)&&a!==r&&et(t,a,{get:()=>e[a],enumerable:!(o=ol(e,a))||o.enumerable});return t},ue=(t,e,r)=>(r=t!=null?tl(sl(t)):{},al(et(r,"default",{value:t,enumerable:!0}),t)),it=q((t,e)=>{(function(r){if(typeof t=="object"&&typeof e<"u")e.exports=r();else if(typeof define=="function"&&define.amd)define([],r);else{var o;typeof window<"u"?o=window:typeof global<"u"?o=global:typeof self<"u"?o=self:o=this,o.memoizerific=r()}})(function(){return n(function r(o,a,i){function l(d,m){if(!a[d]){if(!o[d]){var h=typeof cr=="function"&&cr;if(!m&&h)return h(d,!0);if(u)return u(d,!0);var g=new Error("Cannot find module '"+d+"'");throw g.code="MODULE_NOT_FOUND",g}var J=a[d]={exports:{}};o[d][0].call(J.exports,function(ne){var le=o[d][1][ne];return l(le||ne)},J,J.exports,r,o,a,i)}return a[d].exports}n(l,"s");for(var u=typeof cr=="function"&&cr,c=0;c<i.length;c++)l(i[c]);return l},"e")({1:[function(r,o,a){o.exports=function(i){if(typeof Map!="function"||i){var l=r("./similar");return new l}else return new Map}},{"./similar":2}],2:[function(r,o,a){function i(){return this.list=[],this.lastItem=void 0,this.size=0,this}n(i,"Similar"),i.prototype.get=function(l){var u;if(this.lastItem&&this.isEqual(this.lastItem.key,l))return this.lastItem.val;if(u=this.indexOf(l),u>=0)return this.lastItem=this.list[u],this.list[u].val},i.prototype.set=function(l,u){var c;return this.lastItem&&this.isEqual(this.lastItem.key,l)?(this.lastItem.val=u,this):(c=this.indexOf(l),c>=0?(this.lastItem=this.list[c],this.list[c].val=u,this):(this.lastItem={key:l,val:u},this.list.push(this.lastItem),this.size++,this))},i.prototype.delete=function(l){var u;if(this.lastItem&&this.isEqual(this.lastItem.key,l)&&(this.lastItem=void 0),u=this.indexOf(l),u>=0)return this.size--,this.list.splice(u,1)[0]},i.prototype.has=function(l){var u;return this.lastItem&&this.isEqual(this.lastItem.key,l)?!0:(u=this.indexOf(l),u>=0?(this.lastItem=this.list[u],!0):!1)},i.prototype.forEach=function(l,u){var c;for(c=0;c<this.size;c++)l.call(u||this,this.list[c].val,this.list[c].key,this)},i.prototype.indexOf=function(l){var u;for(u=0;u<this.size;u++)if(this.isEqual(this.list[u].key,l))return u;return-1},i.prototype.isEqual=function(l,u){return l===u||l!==l&&u!==u},o.exports=i},{}],3:[function(r,o,a){var i=r("map-or-similar");o.exports=function(d){var m=new i(!1),h=[];return function(g){var J=n(function(){var ne=m,le,re,ce=arguments.length-1,F=Array(ce+1),se=!0,he;if((J.numArgs||J.numArgs===0)&&J.numArgs!==ce+1)throw new Error("Memoizerific functions should always be called with the same number of arguments");for(he=0;he<ce;he++){if(F[he]={cacheItem:ne,arg:arguments[he]},ne.has(arguments[he])){ne=ne.get(arguments[he]);continue}se=!1,le=new i(!1),ne.set(arguments[he],le),ne=le}return se&&(ne.has(arguments[ce])?re=ne.get(arguments[ce]):se=!1),se||(re=g.apply(null,arguments),ne.set(arguments[ce],re)),d>0&&(F[ce]={cacheItem:ne,arg:arguments[ce]},se?l(h,F):h.push(F),h.length>d&&u(h.shift())),J.wasMemoized=se,J.numArgs=ce+1,re},"memoizerific");return J.limit=d,J.wasMemoized=!1,J.cache=m,J.lru=h,J}};function l(d,m){var h=d.length,g=m.length,J,ne,le;for(ne=0;ne<h;ne++){for(J=!0,le=0;le<g;le++)if(!c(d[ne][le].arg,m[le].arg)){J=!1;break}if(J)break}d.push(d.splice(ne,1)[0])}n(l,"moveToMostRecentLru");function u(d){var m=d.length,h=d[m-1],g,J;for(h.cacheItem.delete(h.arg),J=m-2;J>=0&&(h=d[J],g=h.cacheItem.get(h.arg),!g||!g.size);J--)h.cacheItem.delete(h.arg)}n(u,"removeCachedResult");function c(d,m){return d===m||d!==d&&m!==m}n(c,"isEqual")},{"map-or-similar":1}]},{},[3])(3)})}),wi=q(t=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isEqual=function(){var e=Object.prototype.toString,r=Object.getPrototypeOf,o=Object.getOwnPropertySymbols?function(a){return Object.keys(a).concat(Object.getOwnPropertySymbols(a))}:Object.keys;return function(a,i){return n(function l(u,c,d){var m,h,g,J=e.call(u),ne=e.call(c);if(u===c)return!0;if(u==null||c==null)return!1;if(d.indexOf(u)>-1&&d.indexOf(c)>-1)return!0;if(d.push(u,c),J!=ne||(m=o(u),h=o(c),m.length!=h.length||m.some(function(le){return!l(u[le],c[le],d)})))return!1;switch(J.slice(8,-1)){case"Symbol":return u.valueOf()==c.valueOf();case"Date":case"Number":return+u==+c||+u!=+u&&+c!=+c;case"RegExp":case"Function":case"String":case"Boolean":return""+u==""+c;case"Set":case"Map":m=u.entries(),h=c.entries();do if(!l((g=m.next()).value,h.next().value,d))return!1;while(!g.done);return!0;case"ArrayBuffer":u=new Uint8Array(u),c=new Uint8Array(c);case"DataView":u=new Uint8Array(u.buffer),c=new Uint8Array(c.buffer);case"Float32Array":case"Float64Array":case"Int8Array":case"Int16Array":case"Int32Array":case"Uint8Array":case"Uint16Array":case"Uint32Array":case"Uint8ClampedArray":case"Arguments":case"Array":if(u.length!=c.length)return!1;for(g=0;g<u.length;g++)if((g in u||g in c)&&(g in u!=g in c||!l(u[g],c[g],d)))return!1;return!0;case"Object":return l(r(u),r(c),d);default:return!1}},"n")(a,i,[])}}()}),qn=q(t=>{Object.defineProperty(t,"__esModule",{value:!0}),t.encodeString=o;var e=Array.from({length:256},(a,i)=>"%"+((i<16?"0":"")+i.toString(16)).toUpperCase()),r=new Int8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0]);function o(a){let i=a.length;if(i===0)return"";let l="",u=0,c=0;e:for(;c<i;c++){let d=a.charCodeAt(c);for(;d<128;){if(r[d]!==1&&(u<c&&(l+=a.slice(u,c)),u=c+1,l+=e[d]),++c===i)break e;d=a.charCodeAt(c)}if(u<c&&(l+=a.slice(u,c)),d<2048){u=c+1,l+=e[192|d>>6]+e[128|d&63];continue}if(d<55296||d>=57344){u=c+1,l+=e[224|d>>12]+e[128|d>>6&63]+e[128|d&63];continue}if(++c,c>=i)throw new Error("URI malformed");let m=a.charCodeAt(c)&1023;u=c+1,d=65536+((d&1023)<<10|m),l+=e[240|d>>18]+e[128|d>>12&63]+e[128|d>>6&63]+e[128|d&63]}return u===0?a:u<i?l+a.slice(u):l}n(o,"encodeString")}),It=q(t=>{Object.defineProperty(t,"__esModule",{value:!0}),t.defaultOptions=t.defaultShouldSerializeObject=t.defaultValueSerializer=void 0;var e=qn(),r=n(i=>{switch(typeof i){case"string":return(0,e.encodeString)(i);case"bigint":case"boolean":return""+i;case"number":if(Number.isFinite(i))return i<1e21?""+i:(0,e.encodeString)(""+i);break}return i instanceof Date?(0,e.encodeString)(i.toISOString()):""},"defaultValueSerializer");t.defaultValueSerializer=r;var o=n(i=>i instanceof Date,"defaultShouldSerializeObject");t.defaultShouldSerializeObject=o;var a=n(i=>i,"identityFunc");t.defaultOptions={nesting:!0,nestingSyntax:"dot",arrayRepeat:!1,arrayRepeatSyntax:"repeat",delimiter:38,valueDeserializer:a,valueSerializer:t.defaultValueSerializer,keyDeserializer:a,shouldSerializeObject:t.defaultShouldSerializeObject}}),Vn=q(t=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getDeepObject=a,t.stringifyObject=m;var e=It(),r=qn();function o(h){return h==="__proto__"||h==="constructor"||h==="prototype"}n(o,"isPrototypeKey");function a(h,g,J,ne,le){if(o(g))return h;let re=h[g];return typeof re=="object"&&re!==null?re:!ne&&(le||typeof J=="number"||typeof J=="string"&&J*0===0&&J.indexOf(".")===-1)?h[g]=[]:h[g]={}}n(a,"getDeepObject");var i=20,l="[]",u="[",c="]",d=".";function m(h,g,J=0,ne,le){let{nestingSyntax:re=e.defaultOptions.nestingSyntax,arrayRepeat:ce=e.defaultOptions.arrayRepeat,arrayRepeatSyntax:F=e.defaultOptions.arrayRepeatSyntax,nesting:se=e.defaultOptions.nesting,delimiter:he=e.defaultOptions.delimiter,valueSerializer:Ve=e.defaultOptions.valueSerializer,shouldSerializeObject:we=e.defaultOptions.shouldSerializeObject}=g,ve=typeof he=="number"?String.fromCharCode(he):he,Nt=le===!0&&ce,Bt=re==="dot"||re==="js"&&!le;if(J>i)return"";let Ft="",jt=!0,qe=!1;for(let Dt in h){let p=h[Dt],A;ne?(A=ne,Nt?F==="bracket"&&(A+=l):Bt?(A+=d,A+=Dt):(A+=u,A+=Dt,A+=c)):A=Dt,jt||(Ft+=ve),typeof p=="object"&&p!==null&&!we(p)?(qe=p.pop!==void 0,(se||ce&&qe)&&(Ft+=m(p,g,J+1,A,qe))):(Ft+=(0,r.encodeString)(A),Ft+="=",Ft+=Ve(p,Dt)),jt&&(jt=!1)}return Ft}n(m,"stringifyObject")}),na=q((t,e)=>{var r=12,o=0,a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,7,7,7,7,7,7,7,7,7,7,7,7,8,7,7,10,9,9,9,11,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,24,36,48,60,72,84,96,0,12,12,12,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,24,24,24,0,0,0,0,0,0,0,0,0,24,24,0,0,0,0,0,0,0,0,0,0,48,48,48,0,0,0,0,0,0,0,0,0,0,48,48,0,0,0,0,0,0,0,0,0,48,0,0,0,0,0,0,0,0,0,0,127,63,63,63,0,31,15,15,15,7,7,7];function i(c){var d=c.indexOf("%");if(d===-1)return c;for(var m=c.length,h="",g=0,J=0,ne=d,le=r;d>-1&&d<m;){var re=u(c[d+1],4),ce=u(c[d+2],0),F=re|ce,se=a[F];if(le=a[256+le+se],J=J<<6|F&a[364+se],le===r)h+=c.slice(g,ne),h+=J<=65535?String.fromCharCode(J):String.fromCharCode(55232+(J>>10),56320+(J&1023)),J=0,g=d+3,d=ne=c.indexOf("%",g);else{if(le===o)return null;if(d+=3,d<m&&c.charCodeAt(d)===37)continue;return null}}return h+c.slice(g)}n(i,"decodeURIComponent");var l={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,a:10,A:10,b:11,B:11,c:12,C:12,d:13,D:13,e:14,E:14,f:15,F:15};function u(c,d){var m=l[c];return m===void 0?255:m<<d}n(u,"hexCodeToInt"),e.exports=i}),la=q(t=>{var e=t&&t.__importDefault||function(h){return h&&h.__esModule?h:{default:h}};Object.defineProperty(t,"__esModule",{value:!0}),t.numberValueDeserializer=t.numberKeyDeserializer=void 0,t.parse=m;var r=Vn(),o=It(),a=e(na()),i=n(h=>{let g=Number(h);return Number.isNaN(g)?h:g},"numberKeyDeserializer");t.numberKeyDeserializer=i;var l=n(h=>{let g=Number(h);return Number.isNaN(g)?h:g},"numberValueDeserializer");t.numberValueDeserializer=l;var u=/\+/g,c=n(function(){},"Empty");c.prototype=Object.create(null);function d(h,g,J,ne,le){let re=h.substring(g,J);return ne&&(re=re.replace(u," ")),le&&(re=(0,a.default)(re)||re),re}n(d,"computeKeySlice");function m(h,g){let{valueDeserializer:J=o.defaultOptions.valueDeserializer,keyDeserializer:ne=o.defaultOptions.keyDeserializer,arrayRepeatSyntax:le=o.defaultOptions.arrayRepeatSyntax,nesting:re=o.defaultOptions.nesting,arrayRepeat:ce=o.defaultOptions.arrayRepeat,nestingSyntax:F=o.defaultOptions.nestingSyntax,delimiter:se=o.defaultOptions.delimiter}=g??{},he=typeof se=="string"?se.charCodeAt(0):se,Ve=F==="js",we=new c;if(typeof h!="string")return we;let ve=h.length,Nt="",Bt=-1,Ft=-1,jt=-1,qe=we,Dt,p="",A="",B=!1,de=!1,pe=!1,Lt=!1,qt=!1,Ut=!1,Mt=!1,Gt=0,lr=-1,zr=-1,Qr=-1;for(let Vt=0;Vt<ve+1;Vt++){if(Gt=Vt!==ve?h.charCodeAt(Vt):he,Gt===he){if(Mt=Ft>Bt,Mt||(Ft=Vt),jt!==Ft-1&&(A=d(h,jt+1,lr>-1?lr:Ft,pe,B),p=ne(A),Dt!==void 0&&(qe=(0,r.getDeepObject)(qe,Dt,p,Ve&&qt,Ve&&Ut))),Mt||p!==""){Mt&&(Nt=h.slice(Ft+1,Vt),Lt&&(Nt=Nt.replace(u," ")),de&&(Nt=(0,a.default)(Nt)||Nt));let Jr=J(Nt,p);if(ce){let Zr=qe[p];Zr===void 0?lr>-1?qe[p]=[Jr]:qe[p]=Jr:Zr.pop?Zr.push(Jr):qe[p]=[Zr,Jr]}else qe[p]=Jr}Nt="",Bt=Vt,Ft=Vt,B=!1,de=!1,pe=!1,Lt=!1,qt=!1,Ut=!1,lr=-1,jt=Vt,qe=we,Dt=void 0,p=""}else Gt===93?(ce&&le==="bracket"&&Qr===91&&(lr=zr),re&&(F==="index"||Ve)&&Ft<=Bt&&(jt!==zr&&(A=d(h,jt+1,Vt,pe,B),p=ne(A),Dt!==void 0&&(qe=(0,r.getDeepObject)(qe,Dt,p,void 0,Ve)),Dt=p,pe=!1,B=!1),jt=Vt,Ut=!0,qt=!1)):Gt===46?re&&(F==="dot"||Ve)&&Ft<=Bt&&(jt!==zr&&(A=d(h,jt+1,Vt,pe,B),p=ne(A),Dt!==void 0&&(qe=(0,r.getDeepObject)(qe,Dt,p,Ve)),Dt=p,pe=!1,B=!1),qt=!0,Ut=!1,jt=Vt):Gt===91?re&&(F==="index"||Ve)&&Ft<=Bt&&(jt!==zr&&(A=d(h,jt+1,Vt,pe,B),p=ne(A),Ve&&Dt!==void 0&&(qe=(0,r.getDeepObject)(qe,Dt,p,Ve)),Dt=p,pe=!1,B=!1,qt=!1,Ut=!0),jt=Vt):Gt===61?Ft<=Bt?Ft=Vt:de=!0:Gt===43?Ft>Bt?Lt=!0:pe=!0:Gt===37&&(Ft>Bt?de=!0:B=!0);zr=Vt,Qr=Gt}return we}n(m,"parse")}),ca=q(t=>{Object.defineProperty(t,"__esModule",{value:!0}),t.stringify=r;var e=Vn();function r(o,a){if(o===null||typeof o!="object")return"";let i=a??{};return(0,e.stringifyObject)(o,i)}n(r,"stringify")}),kt=q(t=>{var e=t&&t.__createBinding||(Object.create?function(i,l,u,c){c===void 0&&(c=u);var d=Object.getOwnPropertyDescriptor(l,u);(!d||("get"in d?!l.__esModule:d.writable||d.configurable))&&(d={enumerable:!0,get:n(function(){return l[u]},"get")}),Object.defineProperty(i,c,d)}:function(i,l,u,c){c===void 0&&(c=u),i[c]=l[u]}),r=t&&t.__exportStar||function(i,l){for(var u in i)u!=="default"&&!Object.prototype.hasOwnProperty.call(l,u)&&e(l,i,u)};Object.defineProperty(t,"__esModule",{value:!0}),t.stringify=t.parse=void 0;var o=la();Object.defineProperty(t,"parse",{enumerable:!0,get:n(function(){return o.parse},"get")});var a=ca();Object.defineProperty(t,"stringify",{enumerable:!0,get:n(function(){return a.stringify},"get")}),r(It(),t)}),Kn=q((t,e)=>{e.exports={Aacute:"Á",aacute:"á",Abreve:"Ă",abreve:"ă",ac:"∾",acd:"∿",acE:"∾̳",Acirc:"Â",acirc:"â",acute:"´",Acy:"А",acy:"а",AElig:"Æ",aelig:"æ",af:"⁡",Afr:"𝔄",afr:"𝔞",Agrave:"À",agrave:"à",alefsym:"ℵ",aleph:"ℵ",Alpha:"Α",alpha:"α",Amacr:"Ā",amacr:"ā",amalg:"⨿",amp:"&",AMP:"&",andand:"⩕",And:"⩓",and:"∧",andd:"⩜",andslope:"⩘",andv:"⩚",ang:"∠",ange:"⦤",angle:"∠",angmsdaa:"⦨",angmsdab:"⦩",angmsdac:"⦪",angmsdad:"⦫",angmsdae:"⦬",angmsdaf:"⦭",angmsdag:"⦮",angmsdah:"⦯",angmsd:"∡",angrt:"∟",angrtvb:"⊾",angrtvbd:"⦝",angsph:"∢",angst:"Å",angzarr:"⍼",Aogon:"Ą",aogon:"ą",Aopf:"𝔸",aopf:"𝕒",apacir:"⩯",ap:"≈",apE:"⩰",ape:"≊",apid:"≋",apos:"'",ApplyFunction:"⁡",approx:"≈",approxeq:"≊",Aring:"Å",aring:"å",Ascr:"𝒜",ascr:"𝒶",Assign:"≔",ast:"*",asymp:"≈",asympeq:"≍",Atilde:"Ã",atilde:"ã",Auml:"Ä",auml:"ä",awconint:"∳",awint:"⨑",backcong:"≌",backepsilon:"϶",backprime:"‵",backsim:"∽",backsimeq:"⋍",Backslash:"∖",Barv:"⫧",barvee:"⊽",barwed:"⌅",Barwed:"⌆",barwedge:"⌅",bbrk:"⎵",bbrktbrk:"⎶",bcong:"≌",Bcy:"Б",bcy:"б",bdquo:"„",becaus:"∵",because:"∵",Because:"∵",bemptyv:"⦰",bepsi:"϶",bernou:"ℬ",Bernoullis:"ℬ",Beta:"Β",beta:"β",beth:"ℶ",between:"≬",Bfr:"𝔅",bfr:"𝔟",bigcap:"⋂",bigcirc:"◯",bigcup:"⋃",bigodot:"⨀",bigoplus:"⨁",bigotimes:"⨂",bigsqcup:"⨆",bigstar:"★",bigtriangledown:"▽",bigtriangleup:"△",biguplus:"⨄",bigvee:"⋁",bigwedge:"⋀",bkarow:"⤍",blacklozenge:"⧫",blacksquare:"▪",blacktriangle:"▴",blacktriangledown:"▾",blacktriangleleft:"◂",blacktriangleright:"▸",blank:"␣",blk12:"▒",blk14:"░",blk34:"▓",block:"█",bne:"=⃥",bnequiv:"≡⃥",bNot:"⫭",bnot:"⌐",Bopf:"𝔹",bopf:"𝕓",bot:"⊥",bottom:"⊥",bowtie:"⋈",boxbox:"⧉",boxdl:"┐",boxdL:"╕",boxDl:"╖",boxDL:"╗",boxdr:"┌",boxdR:"╒",boxDr:"╓",boxDR:"╔",boxh:"─",boxH:"═",boxhd:"┬",boxHd:"╤",boxhD:"╥",boxHD:"╦",boxhu:"┴",boxHu:"╧",boxhU:"╨",boxHU:"╩",boxminus:"⊟",boxplus:"⊞",boxtimes:"⊠",boxul:"┘",boxuL:"╛",boxUl:"╜",boxUL:"╝",boxur:"└",boxuR:"╘",boxUr:"╙",boxUR:"╚",boxv:"│",boxV:"║",boxvh:"┼",boxvH:"╪",boxVh:"╫",boxVH:"╬",boxvl:"┤",boxvL:"╡",boxVl:"╢",boxVL:"╣",boxvr:"├",boxvR:"╞",boxVr:"╟",boxVR:"╠",bprime:"‵",breve:"˘",Breve:"˘",brvbar:"¦",bscr:"𝒷",Bscr:"ℬ",bsemi:"⁏",bsim:"∽",bsime:"⋍",bsolb:"⧅",bsol:"\\",bsolhsub:"⟈",bull:"•",bullet:"•",bump:"≎",bumpE:"⪮",bumpe:"≏",Bumpeq:"≎",bumpeq:"≏",Cacute:"Ć",cacute:"ć",capand:"⩄",capbrcup:"⩉",capcap:"⩋",cap:"∩",Cap:"⋒",capcup:"⩇",capdot:"⩀",CapitalDifferentialD:"ⅅ",caps:"∩︀",caret:"⁁",caron:"ˇ",Cayleys:"ℭ",ccaps:"⩍",Ccaron:"Č",ccaron:"č",Ccedil:"Ç",ccedil:"ç",Ccirc:"Ĉ",ccirc:"ĉ",Cconint:"∰",ccups:"⩌",ccupssm:"⩐",Cdot:"Ċ",cdot:"ċ",cedil:"¸",Cedilla:"¸",cemptyv:"⦲",cent:"¢",centerdot:"·",CenterDot:"·",cfr:"𝔠",Cfr:"ℭ",CHcy:"Ч",chcy:"ч",check:"✓",checkmark:"✓",Chi:"Χ",chi:"χ",circ:"ˆ",circeq:"≗",circlearrowleft:"↺",circlearrowright:"↻",circledast:"⊛",circledcirc:"⊚",circleddash:"⊝",CircleDot:"⊙",circledR:"®",circledS:"Ⓢ",CircleMinus:"⊖",CirclePlus:"⊕",CircleTimes:"⊗",cir:"○",cirE:"⧃",cire:"≗",cirfnint:"⨐",cirmid:"⫯",cirscir:"⧂",ClockwiseContourIntegral:"∲",CloseCurlyDoubleQuote:"”",CloseCurlyQuote:"’",clubs:"♣",clubsuit:"♣",colon:":",Colon:"∷",Colone:"⩴",colone:"≔",coloneq:"≔",comma:",",commat:"@",comp:"∁",compfn:"∘",complement:"∁",complexes:"ℂ",cong:"≅",congdot:"⩭",Congruent:"≡",conint:"∮",Conint:"∯",ContourIntegral:"∮",copf:"𝕔",Copf:"ℂ",coprod:"∐",Coproduct:"∐",copy:"©",COPY:"©",copysr:"℗",CounterClockwiseContourIntegral:"∳",crarr:"↵",cross:"✗",Cross:"⨯",Cscr:"𝒞",cscr:"𝒸",csub:"⫏",csube:"⫑",csup:"⫐",csupe:"⫒",ctdot:"⋯",cudarrl:"⤸",cudarrr:"⤵",cuepr:"⋞",cuesc:"⋟",cularr:"↶",cularrp:"⤽",cupbrcap:"⩈",cupcap:"⩆",CupCap:"≍",cup:"∪",Cup:"⋓",cupcup:"⩊",cupdot:"⊍",cupor:"⩅",cups:"∪︀",curarr:"↷",curarrm:"⤼",curlyeqprec:"⋞",curlyeqsucc:"⋟",curlyvee:"⋎",curlywedge:"⋏",curren:"¤",curvearrowleft:"↶",curvearrowright:"↷",cuvee:"⋎",cuwed:"⋏",cwconint:"∲",cwint:"∱",cylcty:"⌭",dagger:"†",Dagger:"‡",daleth:"ℸ",darr:"↓",Darr:"↡",dArr:"⇓",dash:"‐",Dashv:"⫤",dashv:"⊣",dbkarow:"⤏",dblac:"˝",Dcaron:"Ď",dcaron:"ď",Dcy:"Д",dcy:"д",ddagger:"‡",ddarr:"⇊",DD:"ⅅ",dd:"ⅆ",DDotrahd:"⤑",ddotseq:"⩷",deg:"°",Del:"∇",Delta:"Δ",delta:"δ",demptyv:"⦱",dfisht:"⥿",Dfr:"𝔇",dfr:"𝔡",dHar:"⥥",dharl:"⇃",dharr:"⇂",DiacriticalAcute:"´",DiacriticalDot:"˙",DiacriticalDoubleAcute:"˝",DiacriticalGrave:"`",DiacriticalTilde:"˜",diam:"⋄",diamond:"⋄",Diamond:"⋄",diamondsuit:"♦",diams:"♦",die:"¨",DifferentialD:"ⅆ",digamma:"ϝ",disin:"⋲",div:"÷",divide:"÷",divideontimes:"⋇",divonx:"⋇",DJcy:"Ђ",djcy:"ђ",dlcorn:"⌞",dlcrop:"⌍",dollar:"$",Dopf:"𝔻",dopf:"𝕕",Dot:"¨",dot:"˙",DotDot:"⃜",doteq:"≐",doteqdot:"≑",DotEqual:"≐",dotminus:"∸",dotplus:"∔",dotsquare:"⊡",doublebarwedge:"⌆",DoubleContourIntegral:"∯",DoubleDot:"¨",DoubleDownArrow:"⇓",DoubleLeftArrow:"⇐",DoubleLeftRightArrow:"⇔",DoubleLeftTee:"⫤",DoubleLongLeftArrow:"⟸",DoubleLongLeftRightArrow:"⟺",DoubleLongRightArrow:"⟹",DoubleRightArrow:"⇒",DoubleRightTee:"⊨",DoubleUpArrow:"⇑",DoubleUpDownArrow:"⇕",DoubleVerticalBar:"∥",DownArrowBar:"⤓",downarrow:"↓",DownArrow:"↓",Downarrow:"⇓",DownArrowUpArrow:"⇵",DownBreve:"̑",downdownarrows:"⇊",downharpoonleft:"⇃",downharpoonright:"⇂",DownLeftRightVector:"⥐",DownLeftTeeVector:"⥞",DownLeftVectorBar:"⥖",DownLeftVector:"↽",DownRightTeeVector:"⥟",DownRightVectorBar:"⥗",DownRightVector:"⇁",DownTeeArrow:"↧",DownTee:"⊤",drbkarow:"⤐",drcorn:"⌟",drcrop:"⌌",Dscr:"𝒟",dscr:"𝒹",DScy:"Ѕ",dscy:"ѕ",dsol:"⧶",Dstrok:"Đ",dstrok:"đ",dtdot:"⋱",dtri:"▿",dtrif:"▾",duarr:"⇵",duhar:"⥯",dwangle:"⦦",DZcy:"Џ",dzcy:"џ",dzigrarr:"⟿",Eacute:"É",eacute:"é",easter:"⩮",Ecaron:"Ě",ecaron:"ě",Ecirc:"Ê",ecirc:"ê",ecir:"≖",ecolon:"≕",Ecy:"Э",ecy:"э",eDDot:"⩷",Edot:"Ė",edot:"ė",eDot:"≑",ee:"ⅇ",efDot:"≒",Efr:"𝔈",efr:"𝔢",eg:"⪚",Egrave:"È",egrave:"è",egs:"⪖",egsdot:"⪘",el:"⪙",Element:"∈",elinters:"⏧",ell:"ℓ",els:"⪕",elsdot:"⪗",Emacr:"Ē",emacr:"ē",empty:"∅",emptyset:"∅",EmptySmallSquare:"◻",emptyv:"∅",EmptyVerySmallSquare:"▫",emsp13:" ",emsp14:" ",emsp:" ",ENG:"Ŋ",eng:"ŋ",ensp:" ",Eogon:"Ę",eogon:"ę",Eopf:"𝔼",eopf:"𝕖",epar:"⋕",eparsl:"⧣",eplus:"⩱",epsi:"ε",Epsilon:"Ε",epsilon:"ε",epsiv:"ϵ",eqcirc:"≖",eqcolon:"≕",eqsim:"≂",eqslantgtr:"⪖",eqslantless:"⪕",Equal:"⩵",equals:"=",EqualTilde:"≂",equest:"≟",Equilibrium:"⇌",equiv:"≡",equivDD:"⩸",eqvparsl:"⧥",erarr:"⥱",erDot:"≓",escr:"ℯ",Escr:"ℰ",esdot:"≐",Esim:"⩳",esim:"≂",Eta:"Η",eta:"η",ETH:"Ð",eth:"ð",Euml:"Ë",euml:"ë",euro:"€",excl:"!",exist:"∃",Exists:"∃",expectation:"ℰ",exponentiale:"ⅇ",ExponentialE:"ⅇ",fallingdotseq:"≒",Fcy:"Ф",fcy:"ф",female:"♀",ffilig:"ﬃ",fflig:"ﬀ",ffllig:"ﬄ",Ffr:"𝔉",ffr:"𝔣",filig:"ﬁ",FilledSmallSquare:"◼",FilledVerySmallSquare:"▪",fjlig:"fj",flat:"♭",fllig:"ﬂ",fltns:"▱",fnof:"ƒ",Fopf:"𝔽",fopf:"𝕗",forall:"∀",ForAll:"∀",fork:"⋔",forkv:"⫙",Fouriertrf:"ℱ",fpartint:"⨍",frac12:"½",frac13:"⅓",frac14:"¼",frac15:"⅕",frac16:"⅙",frac18:"⅛",frac23:"⅔",frac25:"⅖",frac34:"¾",frac35:"⅗",frac38:"⅜",frac45:"⅘",frac56:"⅚",frac58:"⅝",frac78:"⅞",frasl:"⁄",frown:"⌢",fscr:"𝒻",Fscr:"ℱ",gacute:"ǵ",Gamma:"Γ",gamma:"γ",Gammad:"Ϝ",gammad:"ϝ",gap:"⪆",Gbreve:"Ğ",gbreve:"ğ",Gcedil:"Ģ",Gcirc:"Ĝ",gcirc:"ĝ",Gcy:"Г",gcy:"г",Gdot:"Ġ",gdot:"ġ",ge:"≥",gE:"≧",gEl:"⪌",gel:"⋛",geq:"≥",geqq:"≧",geqslant:"⩾",gescc:"⪩",ges:"⩾",gesdot:"⪀",gesdoto:"⪂",gesdotol:"⪄",gesl:"⋛︀",gesles:"⪔",Gfr:"𝔊",gfr:"𝔤",gg:"≫",Gg:"⋙",ggg:"⋙",gimel:"ℷ",GJcy:"Ѓ",gjcy:"ѓ",gla:"⪥",gl:"≷",glE:"⪒",glj:"⪤",gnap:"⪊",gnapprox:"⪊",gne:"⪈",gnE:"≩",gneq:"⪈",gneqq:"≩",gnsim:"⋧",Gopf:"𝔾",gopf:"𝕘",grave:"`",GreaterEqual:"≥",GreaterEqualLess:"⋛",GreaterFullEqual:"≧",GreaterGreater:"⪢",GreaterLess:"≷",GreaterSlantEqual:"⩾",GreaterTilde:"≳",Gscr:"𝒢",gscr:"ℊ",gsim:"≳",gsime:"⪎",gsiml:"⪐",gtcc:"⪧",gtcir:"⩺",gt:">",GT:">",Gt:"≫",gtdot:"⋗",gtlPar:"⦕",gtquest:"⩼",gtrapprox:"⪆",gtrarr:"⥸",gtrdot:"⋗",gtreqless:"⋛",gtreqqless:"⪌",gtrless:"≷",gtrsim:"≳",gvertneqq:"≩︀",gvnE:"≩︀",Hacek:"ˇ",hairsp:" ",half:"½",hamilt:"ℋ",HARDcy:"Ъ",hardcy:"ъ",harrcir:"⥈",harr:"↔",hArr:"⇔",harrw:"↭",Hat:"^",hbar:"ℏ",Hcirc:"Ĥ",hcirc:"ĥ",hearts:"♥",heartsuit:"♥",hellip:"…",hercon:"⊹",hfr:"𝔥",Hfr:"ℌ",HilbertSpace:"ℋ",hksearow:"⤥",hkswarow:"⤦",hoarr:"⇿",homtht:"∻",hookleftarrow:"↩",hookrightarrow:"↪",hopf:"𝕙",Hopf:"ℍ",horbar:"―",HorizontalLine:"─",hscr:"𝒽",Hscr:"ℋ",hslash:"ℏ",Hstrok:"Ħ",hstrok:"ħ",HumpDownHump:"≎",HumpEqual:"≏",hybull:"⁃",hyphen:"‐",Iacute:"Í",iacute:"í",ic:"⁣",Icirc:"Î",icirc:"î",Icy:"И",icy:"и",Idot:"İ",IEcy:"Е",iecy:"е",iexcl:"¡",iff:"⇔",ifr:"𝔦",Ifr:"ℑ",Igrave:"Ì",igrave:"ì",ii:"ⅈ",iiiint:"⨌",iiint:"∭",iinfin:"⧜",iiota:"℩",IJlig:"Ĳ",ijlig:"ĳ",Imacr:"Ī",imacr:"ī",image:"ℑ",ImaginaryI:"ⅈ",imagline:"ℐ",imagpart:"ℑ",imath:"ı",Im:"ℑ",imof:"⊷",imped:"Ƶ",Implies:"⇒",incare:"℅",in:"∈",infin:"∞",infintie:"⧝",inodot:"ı",intcal:"⊺",int:"∫",Int:"∬",integers:"ℤ",Integral:"∫",intercal:"⊺",Intersection:"⋂",intlarhk:"⨗",intprod:"⨼",InvisibleComma:"⁣",InvisibleTimes:"⁢",IOcy:"Ё",iocy:"ё",Iogon:"Į",iogon:"į",Iopf:"𝕀",iopf:"𝕚",Iota:"Ι",iota:"ι",iprod:"⨼",iquest:"¿",iscr:"𝒾",Iscr:"ℐ",isin:"∈",isindot:"⋵",isinE:"⋹",isins:"⋴",isinsv:"⋳",isinv:"∈",it:"⁢",Itilde:"Ĩ",itilde:"ĩ",Iukcy:"І",iukcy:"і",Iuml:"Ï",iuml:"ï",Jcirc:"Ĵ",jcirc:"ĵ",Jcy:"Й",jcy:"й",Jfr:"𝔍",jfr:"𝔧",jmath:"ȷ",Jopf:"𝕁",jopf:"𝕛",Jscr:"𝒥",jscr:"𝒿",Jsercy:"Ј",jsercy:"ј",Jukcy:"Є",jukcy:"є",Kappa:"Κ",kappa:"κ",kappav:"ϰ",Kcedil:"Ķ",kcedil:"ķ",Kcy:"К",kcy:"к",Kfr:"𝔎",kfr:"𝔨",kgreen:"ĸ",KHcy:"Х",khcy:"х",KJcy:"Ќ",kjcy:"ќ",Kopf:"𝕂",kopf:"𝕜",Kscr:"𝒦",kscr:"𝓀",lAarr:"⇚",Lacute:"Ĺ",lacute:"ĺ",laemptyv:"⦴",lagran:"ℒ",Lambda:"Λ",lambda:"λ",lang:"⟨",Lang:"⟪",langd:"⦑",langle:"⟨",lap:"⪅",Laplacetrf:"ℒ",laquo:"«",larrb:"⇤",larrbfs:"⤟",larr:"←",Larr:"↞",lArr:"⇐",larrfs:"⤝",larrhk:"↩",larrlp:"↫",larrpl:"⤹",larrsim:"⥳",larrtl:"↢",latail:"⤙",lAtail:"⤛",lat:"⪫",late:"⪭",lates:"⪭︀",lbarr:"⤌",lBarr:"⤎",lbbrk:"❲",lbrace:"{",lbrack:"[",lbrke:"⦋",lbrksld:"⦏",lbrkslu:"⦍",Lcaron:"Ľ",lcaron:"ľ",Lcedil:"Ļ",lcedil:"ļ",lceil:"⌈",lcub:"{",Lcy:"Л",lcy:"л",ldca:"⤶",ldquo:"“",ldquor:"„",ldrdhar:"⥧",ldrushar:"⥋",ldsh:"↲",le:"≤",lE:"≦",LeftAngleBracket:"⟨",LeftArrowBar:"⇤",leftarrow:"←",LeftArrow:"←",Leftarrow:"⇐",LeftArrowRightArrow:"⇆",leftarrowtail:"↢",LeftCeiling:"⌈",LeftDoubleBracket:"⟦",LeftDownTeeVector:"⥡",LeftDownVectorBar:"⥙",LeftDownVector:"⇃",LeftFloor:"⌊",leftharpoondown:"↽",leftharpoonup:"↼",leftleftarrows:"⇇",leftrightarrow:"↔",LeftRightArrow:"↔",Leftrightarrow:"⇔",leftrightarrows:"⇆",leftrightharpoons:"⇋",leftrightsquigarrow:"↭",LeftRightVector:"⥎",LeftTeeArrow:"↤",LeftTee:"⊣",LeftTeeVector:"⥚",leftthreetimes:"⋋",LeftTriangleBar:"⧏",LeftTriangle:"⊲",LeftTriangleEqual:"⊴",LeftUpDownVector:"⥑",LeftUpTeeVector:"⥠",LeftUpVectorBar:"⥘",LeftUpVector:"↿",LeftVectorBar:"⥒",LeftVector:"↼",lEg:"⪋",leg:"⋚",leq:"≤",leqq:"≦",leqslant:"⩽",lescc:"⪨",les:"⩽",lesdot:"⩿",lesdoto:"⪁",lesdotor:"⪃",lesg:"⋚︀",lesges:"⪓",lessapprox:"⪅",lessdot:"⋖",lesseqgtr:"⋚",lesseqqgtr:"⪋",LessEqualGreater:"⋚",LessFullEqual:"≦",LessGreater:"≶",lessgtr:"≶",LessLess:"⪡",lesssim:"≲",LessSlantEqual:"⩽",LessTilde:"≲",lfisht:"⥼",lfloor:"⌊",Lfr:"𝔏",lfr:"𝔩",lg:"≶",lgE:"⪑",lHar:"⥢",lhard:"↽",lharu:"↼",lharul:"⥪",lhblk:"▄",LJcy:"Љ",ljcy:"љ",llarr:"⇇",ll:"≪",Ll:"⋘",llcorner:"⌞",Lleftarrow:"⇚",llhard:"⥫",lltri:"◺",Lmidot:"Ŀ",lmidot:"ŀ",lmoustache:"⎰",lmoust:"⎰",lnap:"⪉",lnapprox:"⪉",lne:"⪇",lnE:"≨",lneq:"⪇",lneqq:"≨",lnsim:"⋦",loang:"⟬",loarr:"⇽",lobrk:"⟦",longleftarrow:"⟵",LongLeftArrow:"⟵",Longleftarrow:"⟸",longleftrightarrow:"⟷",LongLeftRightArrow:"⟷",Longleftrightarrow:"⟺",longmapsto:"⟼",longrightarrow:"⟶",LongRightArrow:"⟶",Longrightarrow:"⟹",looparrowleft:"↫",looparrowright:"↬",lopar:"⦅",Lopf:"𝕃",lopf:"𝕝",loplus:"⨭",lotimes:"⨴",lowast:"∗",lowbar:"_",LowerLeftArrow:"↙",LowerRightArrow:"↘",loz:"◊",lozenge:"◊",lozf:"⧫",lpar:"(",lparlt:"⦓",lrarr:"⇆",lrcorner:"⌟",lrhar:"⇋",lrhard:"⥭",lrm:"‎",lrtri:"⊿",lsaquo:"‹",lscr:"𝓁",Lscr:"ℒ",lsh:"↰",Lsh:"↰",lsim:"≲",lsime:"⪍",lsimg:"⪏",lsqb:"[",lsquo:"‘",lsquor:"‚",Lstrok:"Ł",lstrok:"ł",ltcc:"⪦",ltcir:"⩹",lt:"<",LT:"<",Lt:"≪",ltdot:"⋖",lthree:"⋋",ltimes:"⋉",ltlarr:"⥶",ltquest:"⩻",ltri:"◃",ltrie:"⊴",ltrif:"◂",ltrPar:"⦖",lurdshar:"⥊",luruhar:"⥦",lvertneqq:"≨︀",lvnE:"≨︀",macr:"¯",male:"♂",malt:"✠",maltese:"✠",Map:"⤅",map:"↦",mapsto:"↦",mapstodown:"↧",mapstoleft:"↤",mapstoup:"↥",marker:"▮",mcomma:"⨩",Mcy:"М",mcy:"м",mdash:"—",mDDot:"∺",measuredangle:"∡",MediumSpace:" ",Mellintrf:"ℳ",Mfr:"𝔐",mfr:"𝔪",mho:"℧",micro:"µ",midast:"*",midcir:"⫰",mid:"∣",middot:"·",minusb:"⊟",minus:"−",minusd:"∸",minusdu:"⨪",MinusPlus:"∓",mlcp:"⫛",mldr:"…",mnplus:"∓",models:"⊧",Mopf:"𝕄",mopf:"𝕞",mp:"∓",mscr:"𝓂",Mscr:"ℳ",mstpos:"∾",Mu:"Μ",mu:"μ",multimap:"⊸",mumap:"⊸",nabla:"∇",Nacute:"Ń",nacute:"ń",nang:"∠⃒",nap:"≉",napE:"⩰̸",napid:"≋̸",napos:"ŉ",napprox:"≉",natural:"♮",naturals:"ℕ",natur:"♮",nbsp:" ",nbump:"≎̸",nbumpe:"≏̸",ncap:"⩃",Ncaron:"Ň",ncaron:"ň",Ncedil:"Ņ",ncedil:"ņ",ncong:"≇",ncongdot:"⩭̸",ncup:"⩂",Ncy:"Н",ncy:"н",ndash:"–",nearhk:"⤤",nearr:"↗",neArr:"⇗",nearrow:"↗",ne:"≠",nedot:"≐̸",NegativeMediumSpace:"​",NegativeThickSpace:"​",NegativeThinSpace:"​",NegativeVeryThinSpace:"​",nequiv:"≢",nesear:"⤨",nesim:"≂̸",NestedGreaterGreater:"≫",NestedLessLess:"≪",NewLine:`
`,nexist:"∄",nexists:"∄",Nfr:"𝔑",nfr:"𝔫",ngE:"≧̸",nge:"≱",ngeq:"≱",ngeqq:"≧̸",ngeqslant:"⩾̸",nges:"⩾̸",nGg:"⋙̸",ngsim:"≵",nGt:"≫⃒",ngt:"≯",ngtr:"≯",nGtv:"≫̸",nharr:"↮",nhArr:"⇎",nhpar:"⫲",ni:"∋",nis:"⋼",nisd:"⋺",niv:"∋",NJcy:"Њ",njcy:"њ",nlarr:"↚",nlArr:"⇍",nldr:"‥",nlE:"≦̸",nle:"≰",nleftarrow:"↚",nLeftarrow:"⇍",nleftrightarrow:"↮",nLeftrightarrow:"⇎",nleq:"≰",nleqq:"≦̸",nleqslant:"⩽̸",nles:"⩽̸",nless:"≮",nLl:"⋘̸",nlsim:"≴",nLt:"≪⃒",nlt:"≮",nltri:"⋪",nltrie:"⋬",nLtv:"≪̸",nmid:"∤",NoBreak:"⁠",NonBreakingSpace:" ",nopf:"𝕟",Nopf:"ℕ",Not:"⫬",not:"¬",NotCongruent:"≢",NotCupCap:"≭",NotDoubleVerticalBar:"∦",NotElement:"∉",NotEqual:"≠",NotEqualTilde:"≂̸",NotExists:"∄",NotGreater:"≯",NotGreaterEqual:"≱",NotGreaterFullEqual:"≧̸",NotGreaterGreater:"≫̸",NotGreaterLess:"≹",NotGreaterSlantEqual:"⩾̸",NotGreaterTilde:"≵",NotHumpDownHump:"≎̸",NotHumpEqual:"≏̸",notin:"∉",notindot:"⋵̸",notinE:"⋹̸",notinva:"∉",notinvb:"⋷",notinvc:"⋶",NotLeftTriangleBar:"⧏̸",NotLeftTriangle:"⋪",NotLeftTriangleEqual:"⋬",NotLess:"≮",NotLessEqual:"≰",NotLessGreater:"≸",NotLessLess:"≪̸",NotLessSlantEqual:"⩽̸",NotLessTilde:"≴",NotNestedGreaterGreater:"⪢̸",NotNestedLessLess:"⪡̸",notni:"∌",notniva:"∌",notnivb:"⋾",notnivc:"⋽",NotPrecedes:"⊀",NotPrecedesEqual:"⪯̸",NotPrecedesSlantEqual:"⋠",NotReverseElement:"∌",NotRightTriangleBar:"⧐̸",NotRightTriangle:"⋫",NotRightTriangleEqual:"⋭",NotSquareSubset:"⊏̸",NotSquareSubsetEqual:"⋢",NotSquareSuperset:"⊐̸",NotSquareSupersetEqual:"⋣",NotSubset:"⊂⃒",NotSubsetEqual:"⊈",NotSucceeds:"⊁",NotSucceedsEqual:"⪰̸",NotSucceedsSlantEqual:"⋡",NotSucceedsTilde:"≿̸",NotSuperset:"⊃⃒",NotSupersetEqual:"⊉",NotTilde:"≁",NotTildeEqual:"≄",NotTildeFullEqual:"≇",NotTildeTilde:"≉",NotVerticalBar:"∤",nparallel:"∦",npar:"∦",nparsl:"⫽⃥",npart:"∂̸",npolint:"⨔",npr:"⊀",nprcue:"⋠",nprec:"⊀",npreceq:"⪯̸",npre:"⪯̸",nrarrc:"⤳̸",nrarr:"↛",nrArr:"⇏",nrarrw:"↝̸",nrightarrow:"↛",nRightarrow:"⇏",nrtri:"⋫",nrtrie:"⋭",nsc:"⊁",nsccue:"⋡",nsce:"⪰̸",Nscr:"𝒩",nscr:"𝓃",nshortmid:"∤",nshortparallel:"∦",nsim:"≁",nsime:"≄",nsimeq:"≄",nsmid:"∤",nspar:"∦",nsqsube:"⋢",nsqsupe:"⋣",nsub:"⊄",nsubE:"⫅̸",nsube:"⊈",nsubset:"⊂⃒",nsubseteq:"⊈",nsubseteqq:"⫅̸",nsucc:"⊁",nsucceq:"⪰̸",nsup:"⊅",nsupE:"⫆̸",nsupe:"⊉",nsupset:"⊃⃒",nsupseteq:"⊉",nsupseteqq:"⫆̸",ntgl:"≹",Ntilde:"Ñ",ntilde:"ñ",ntlg:"≸",ntriangleleft:"⋪",ntrianglelefteq:"⋬",ntriangleright:"⋫",ntrianglerighteq:"⋭",Nu:"Ν",nu:"ν",num:"#",numero:"№",numsp:" ",nvap:"≍⃒",nvdash:"⊬",nvDash:"⊭",nVdash:"⊮",nVDash:"⊯",nvge:"≥⃒",nvgt:">⃒",nvHarr:"⤄",nvinfin:"⧞",nvlArr:"⤂",nvle:"≤⃒",nvlt:"<⃒",nvltrie:"⊴⃒",nvrArr:"⤃",nvrtrie:"⊵⃒",nvsim:"∼⃒",nwarhk:"⤣",nwarr:"↖",nwArr:"⇖",nwarrow:"↖",nwnear:"⤧",Oacute:"Ó",oacute:"ó",oast:"⊛",Ocirc:"Ô",ocirc:"ô",ocir:"⊚",Ocy:"О",ocy:"о",odash:"⊝",Odblac:"Ő",odblac:"ő",odiv:"⨸",odot:"⊙",odsold:"⦼",OElig:"Œ",oelig:"œ",ofcir:"⦿",Ofr:"𝔒",ofr:"𝔬",ogon:"˛",Ograve:"Ò",ograve:"ò",ogt:"⧁",ohbar:"⦵",ohm:"Ω",oint:"∮",olarr:"↺",olcir:"⦾",olcross:"⦻",oline:"‾",olt:"⧀",Omacr:"Ō",omacr:"ō",Omega:"Ω",omega:"ω",Omicron:"Ο",omicron:"ο",omid:"⦶",ominus:"⊖",Oopf:"𝕆",oopf:"𝕠",opar:"⦷",OpenCurlyDoubleQuote:"“",OpenCurlyQuote:"‘",operp:"⦹",oplus:"⊕",orarr:"↻",Or:"⩔",or:"∨",ord:"⩝",order:"ℴ",orderof:"ℴ",ordf:"ª",ordm:"º",origof:"⊶",oror:"⩖",orslope:"⩗",orv:"⩛",oS:"Ⓢ",Oscr:"𝒪",oscr:"ℴ",Oslash:"Ø",oslash:"ø",osol:"⊘",Otilde:"Õ",otilde:"õ",otimesas:"⨶",Otimes:"⨷",otimes:"⊗",Ouml:"Ö",ouml:"ö",ovbar:"⌽",OverBar:"‾",OverBrace:"⏞",OverBracket:"⎴",OverParenthesis:"⏜",para:"¶",parallel:"∥",par:"∥",parsim:"⫳",parsl:"⫽",part:"∂",PartialD:"∂",Pcy:"П",pcy:"п",percnt:"%",period:".",permil:"‰",perp:"⊥",pertenk:"‱",Pfr:"𝔓",pfr:"𝔭",Phi:"Φ",phi:"φ",phiv:"ϕ",phmmat:"ℳ",phone:"☎",Pi:"Π",pi:"π",pitchfork:"⋔",piv:"ϖ",planck:"ℏ",planckh:"ℎ",plankv:"ℏ",plusacir:"⨣",plusb:"⊞",pluscir:"⨢",plus:"+",plusdo:"∔",plusdu:"⨥",pluse:"⩲",PlusMinus:"±",plusmn:"±",plussim:"⨦",plustwo:"⨧",pm:"±",Poincareplane:"ℌ",pointint:"⨕",popf:"𝕡",Popf:"ℙ",pound:"£",prap:"⪷",Pr:"⪻",pr:"≺",prcue:"≼",precapprox:"⪷",prec:"≺",preccurlyeq:"≼",Precedes:"≺",PrecedesEqual:"⪯",PrecedesSlantEqual:"≼",PrecedesTilde:"≾",preceq:"⪯",precnapprox:"⪹",precneqq:"⪵",precnsim:"⋨",pre:"⪯",prE:"⪳",precsim:"≾",prime:"′",Prime:"″",primes:"ℙ",prnap:"⪹",prnE:"⪵",prnsim:"⋨",prod:"∏",Product:"∏",profalar:"⌮",profline:"⌒",profsurf:"⌓",prop:"∝",Proportional:"∝",Proportion:"∷",propto:"∝",prsim:"≾",prurel:"⊰",Pscr:"𝒫",pscr:"𝓅",Psi:"Ψ",psi:"ψ",puncsp:" ",Qfr:"𝔔",qfr:"𝔮",qint:"⨌",qopf:"𝕢",Qopf:"ℚ",qprime:"⁗",Qscr:"𝒬",qscr:"𝓆",quaternions:"ℍ",quatint:"⨖",quest:"?",questeq:"≟",quot:'"',QUOT:'"',rAarr:"⇛",race:"∽̱",Racute:"Ŕ",racute:"ŕ",radic:"√",raemptyv:"⦳",rang:"⟩",Rang:"⟫",rangd:"⦒",range:"⦥",rangle:"⟩",raquo:"»",rarrap:"⥵",rarrb:"⇥",rarrbfs:"⤠",rarrc:"⤳",rarr:"→",Rarr:"↠",rArr:"⇒",rarrfs:"⤞",rarrhk:"↪",rarrlp:"↬",rarrpl:"⥅",rarrsim:"⥴",Rarrtl:"⤖",rarrtl:"↣",rarrw:"↝",ratail:"⤚",rAtail:"⤜",ratio:"∶",rationals:"ℚ",rbarr:"⤍",rBarr:"⤏",RBarr:"⤐",rbbrk:"❳",rbrace:"}",rbrack:"]",rbrke:"⦌",rbrksld:"⦎",rbrkslu:"⦐",Rcaron:"Ř",rcaron:"ř",Rcedil:"Ŗ",rcedil:"ŗ",rceil:"⌉",rcub:"}",Rcy:"Р",rcy:"р",rdca:"⤷",rdldhar:"⥩",rdquo:"”",rdquor:"”",rdsh:"↳",real:"ℜ",realine:"ℛ",realpart:"ℜ",reals:"ℝ",Re:"ℜ",rect:"▭",reg:"®",REG:"®",ReverseElement:"∋",ReverseEquilibrium:"⇋",ReverseUpEquilibrium:"⥯",rfisht:"⥽",rfloor:"⌋",rfr:"𝔯",Rfr:"ℜ",rHar:"⥤",rhard:"⇁",rharu:"⇀",rharul:"⥬",Rho:"Ρ",rho:"ρ",rhov:"ϱ",RightAngleBracket:"⟩",RightArrowBar:"⇥",rightarrow:"→",RightArrow:"→",Rightarrow:"⇒",RightArrowLeftArrow:"⇄",rightarrowtail:"↣",RightCeiling:"⌉",RightDoubleBracket:"⟧",RightDownTeeVector:"⥝",RightDownVectorBar:"⥕",RightDownVector:"⇂",RightFloor:"⌋",rightharpoondown:"⇁",rightharpoonup:"⇀",rightleftarrows:"⇄",rightleftharpoons:"⇌",rightrightarrows:"⇉",rightsquigarrow:"↝",RightTeeArrow:"↦",RightTee:"⊢",RightTeeVector:"⥛",rightthreetimes:"⋌",RightTriangleBar:"⧐",RightTriangle:"⊳",RightTriangleEqual:"⊵",RightUpDownVector:"⥏",RightUpTeeVector:"⥜",RightUpVectorBar:"⥔",RightUpVector:"↾",RightVectorBar:"⥓",RightVector:"⇀",ring:"˚",risingdotseq:"≓",rlarr:"⇄",rlhar:"⇌",rlm:"‏",rmoustache:"⎱",rmoust:"⎱",rnmid:"⫮",roang:"⟭",roarr:"⇾",robrk:"⟧",ropar:"⦆",ropf:"𝕣",Ropf:"ℝ",roplus:"⨮",rotimes:"⨵",RoundImplies:"⥰",rpar:")",rpargt:"⦔",rppolint:"⨒",rrarr:"⇉",Rrightarrow:"⇛",rsaquo:"›",rscr:"𝓇",Rscr:"ℛ",rsh:"↱",Rsh:"↱",rsqb:"]",rsquo:"’",rsquor:"’",rthree:"⋌",rtimes:"⋊",rtri:"▹",rtrie:"⊵",rtrif:"▸",rtriltri:"⧎",RuleDelayed:"⧴",ruluhar:"⥨",rx:"℞",Sacute:"Ś",sacute:"ś",sbquo:"‚",scap:"⪸",Scaron:"Š",scaron:"š",Sc:"⪼",sc:"≻",sccue:"≽",sce:"⪰",scE:"⪴",Scedil:"Ş",scedil:"ş",Scirc:"Ŝ",scirc:"ŝ",scnap:"⪺",scnE:"⪶",scnsim:"⋩",scpolint:"⨓",scsim:"≿",Scy:"С",scy:"с",sdotb:"⊡",sdot:"⋅",sdote:"⩦",searhk:"⤥",searr:"↘",seArr:"⇘",searrow:"↘",sect:"§",semi:";",seswar:"⤩",setminus:"∖",setmn:"∖",sext:"✶",Sfr:"𝔖",sfr:"𝔰",sfrown:"⌢",sharp:"♯",SHCHcy:"Щ",shchcy:"щ",SHcy:"Ш",shcy:"ш",ShortDownArrow:"↓",ShortLeftArrow:"←",shortmid:"∣",shortparallel:"∥",ShortRightArrow:"→",ShortUpArrow:"↑",shy:"­",Sigma:"Σ",sigma:"σ",sigmaf:"ς",sigmav:"ς",sim:"∼",simdot:"⩪",sime:"≃",simeq:"≃",simg:"⪞",simgE:"⪠",siml:"⪝",simlE:"⪟",simne:"≆",simplus:"⨤",simrarr:"⥲",slarr:"←",SmallCircle:"∘",smallsetminus:"∖",smashp:"⨳",smeparsl:"⧤",smid:"∣",smile:"⌣",smt:"⪪",smte:"⪬",smtes:"⪬︀",SOFTcy:"Ь",softcy:"ь",solbar:"⌿",solb:"⧄",sol:"/",Sopf:"𝕊",sopf:"𝕤",spades:"♠",spadesuit:"♠",spar:"∥",sqcap:"⊓",sqcaps:"⊓︀",sqcup:"⊔",sqcups:"⊔︀",Sqrt:"√",sqsub:"⊏",sqsube:"⊑",sqsubset:"⊏",sqsubseteq:"⊑",sqsup:"⊐",sqsupe:"⊒",sqsupset:"⊐",sqsupseteq:"⊒",square:"□",Square:"□",SquareIntersection:"⊓",SquareSubset:"⊏",SquareSubsetEqual:"⊑",SquareSuperset:"⊐",SquareSupersetEqual:"⊒",SquareUnion:"⊔",squarf:"▪",squ:"□",squf:"▪",srarr:"→",Sscr:"𝒮",sscr:"𝓈",ssetmn:"∖",ssmile:"⌣",sstarf:"⋆",Star:"⋆",star:"☆",starf:"★",straightepsilon:"ϵ",straightphi:"ϕ",strns:"¯",sub:"⊂",Sub:"⋐",subdot:"⪽",subE:"⫅",sube:"⊆",subedot:"⫃",submult:"⫁",subnE:"⫋",subne:"⊊",subplus:"⪿",subrarr:"⥹",subset:"⊂",Subset:"⋐",subseteq:"⊆",subseteqq:"⫅",SubsetEqual:"⊆",subsetneq:"⊊",subsetneqq:"⫋",subsim:"⫇",subsub:"⫕",subsup:"⫓",succapprox:"⪸",succ:"≻",succcurlyeq:"≽",Succeeds:"≻",SucceedsEqual:"⪰",SucceedsSlantEqual:"≽",SucceedsTilde:"≿",succeq:"⪰",succnapprox:"⪺",succneqq:"⪶",succnsim:"⋩",succsim:"≿",SuchThat:"∋",sum:"∑",Sum:"∑",sung:"♪",sup1:"¹",sup2:"²",sup3:"³",sup:"⊃",Sup:"⋑",supdot:"⪾",supdsub:"⫘",supE:"⫆",supe:"⊇",supedot:"⫄",Superset:"⊃",SupersetEqual:"⊇",suphsol:"⟉",suphsub:"⫗",suplarr:"⥻",supmult:"⫂",supnE:"⫌",supne:"⊋",supplus:"⫀",supset:"⊃",Supset:"⋑",supseteq:"⊇",supseteqq:"⫆",supsetneq:"⊋",supsetneqq:"⫌",supsim:"⫈",supsub:"⫔",supsup:"⫖",swarhk:"⤦",swarr:"↙",swArr:"⇙",swarrow:"↙",swnwar:"⤪",szlig:"ß",Tab:"	",target:"⌖",Tau:"Τ",tau:"τ",tbrk:"⎴",Tcaron:"Ť",tcaron:"ť",Tcedil:"Ţ",tcedil:"ţ",Tcy:"Т",tcy:"т",tdot:"⃛",telrec:"⌕",Tfr:"𝔗",tfr:"𝔱",there4:"∴",therefore:"∴",Therefore:"∴",Theta:"Θ",theta:"θ",thetasym:"ϑ",thetav:"ϑ",thickapprox:"≈",thicksim:"∼",ThickSpace:"  ",ThinSpace:" ",thinsp:" ",thkap:"≈",thksim:"∼",THORN:"Þ",thorn:"þ",tilde:"˜",Tilde:"∼",TildeEqual:"≃",TildeFullEqual:"≅",TildeTilde:"≈",timesbar:"⨱",timesb:"⊠",times:"×",timesd:"⨰",tint:"∭",toea:"⤨",topbot:"⌶",topcir:"⫱",top:"⊤",Topf:"𝕋",topf:"𝕥",topfork:"⫚",tosa:"⤩",tprime:"‴",trade:"™",TRADE:"™",triangle:"▵",triangledown:"▿",triangleleft:"◃",trianglelefteq:"⊴",triangleq:"≜",triangleright:"▹",trianglerighteq:"⊵",tridot:"◬",trie:"≜",triminus:"⨺",TripleDot:"⃛",triplus:"⨹",trisb:"⧍",tritime:"⨻",trpezium:"⏢",Tscr:"𝒯",tscr:"𝓉",TScy:"Ц",tscy:"ц",TSHcy:"Ћ",tshcy:"ћ",Tstrok:"Ŧ",tstrok:"ŧ",twixt:"≬",twoheadleftarrow:"↞",twoheadrightarrow:"↠",Uacute:"Ú",uacute:"ú",uarr:"↑",Uarr:"↟",uArr:"⇑",Uarrocir:"⥉",Ubrcy:"Ў",ubrcy:"ў",Ubreve:"Ŭ",ubreve:"ŭ",Ucirc:"Û",ucirc:"û",Ucy:"У",ucy:"у",udarr:"⇅",Udblac:"Ű",udblac:"ű",udhar:"⥮",ufisht:"⥾",Ufr:"𝔘",ufr:"𝔲",Ugrave:"Ù",ugrave:"ù",uHar:"⥣",uharl:"↿",uharr:"↾",uhblk:"▀",ulcorn:"⌜",ulcorner:"⌜",ulcrop:"⌏",ultri:"◸",Umacr:"Ū",umacr:"ū",uml:"¨",UnderBar:"_",UnderBrace:"⏟",UnderBracket:"⎵",UnderParenthesis:"⏝",Union:"⋃",UnionPlus:"⊎",Uogon:"Ų",uogon:"ų",Uopf:"𝕌",uopf:"𝕦",UpArrowBar:"⤒",uparrow:"↑",UpArrow:"↑",Uparrow:"⇑",UpArrowDownArrow:"⇅",updownarrow:"↕",UpDownArrow:"↕",Updownarrow:"⇕",UpEquilibrium:"⥮",upharpoonleft:"↿",upharpoonright:"↾",uplus:"⊎",UpperLeftArrow:"↖",UpperRightArrow:"↗",upsi:"υ",Upsi:"ϒ",upsih:"ϒ",Upsilon:"Υ",upsilon:"υ",UpTeeArrow:"↥",UpTee:"⊥",upuparrows:"⇈",urcorn:"⌝",urcorner:"⌝",urcrop:"⌎",Uring:"Ů",uring:"ů",urtri:"◹",Uscr:"𝒰",uscr:"𝓊",utdot:"⋰",Utilde:"Ũ",utilde:"ũ",utri:"▵",utrif:"▴",uuarr:"⇈",Uuml:"Ü",uuml:"ü",uwangle:"⦧",vangrt:"⦜",varepsilon:"ϵ",varkappa:"ϰ",varnothing:"∅",varphi:"ϕ",varpi:"ϖ",varpropto:"∝",varr:"↕",vArr:"⇕",varrho:"ϱ",varsigma:"ς",varsubsetneq:"⊊︀",varsubsetneqq:"⫋︀",varsupsetneq:"⊋︀",varsupsetneqq:"⫌︀",vartheta:"ϑ",vartriangleleft:"⊲",vartriangleright:"⊳",vBar:"⫨",Vbar:"⫫",vBarv:"⫩",Vcy:"В",vcy:"в",vdash:"⊢",vDash:"⊨",Vdash:"⊩",VDash:"⊫",Vdashl:"⫦",veebar:"⊻",vee:"∨",Vee:"⋁",veeeq:"≚",vellip:"⋮",verbar:"|",Verbar:"‖",vert:"|",Vert:"‖",VerticalBar:"∣",VerticalLine:"|",VerticalSeparator:"❘",VerticalTilde:"≀",VeryThinSpace:" ",Vfr:"𝔙",vfr:"𝔳",vltri:"⊲",vnsub:"⊂⃒",vnsup:"⊃⃒",Vopf:"𝕍",vopf:"𝕧",vprop:"∝",vrtri:"⊳",Vscr:"𝒱",vscr:"𝓋",vsubnE:"⫋︀",vsubne:"⊊︀",vsupnE:"⫌︀",vsupne:"⊋︀",Vvdash:"⊪",vzigzag:"⦚",Wcirc:"Ŵ",wcirc:"ŵ",wedbar:"⩟",wedge:"∧",Wedge:"⋀",wedgeq:"≙",weierp:"℘",Wfr:"𝔚",wfr:"𝔴",Wopf:"𝕎",wopf:"𝕨",wp:"℘",wr:"≀",wreath:"≀",Wscr:"𝒲",wscr:"𝓌",xcap:"⋂",xcirc:"◯",xcup:"⋃",xdtri:"▽",Xfr:"𝔛",xfr:"𝔵",xharr:"⟷",xhArr:"⟺",Xi:"Ξ",xi:"ξ",xlarr:"⟵",xlArr:"⟸",xmap:"⟼",xnis:"⋻",xodot:"⨀",Xopf:"𝕏",xopf:"𝕩",xoplus:"⨁",xotime:"⨂",xrarr:"⟶",xrArr:"⟹",Xscr:"𝒳",xscr:"𝓍",xsqcup:"⨆",xuplus:"⨄",xutri:"△",xvee:"⋁",xwedge:"⋀",Yacute:"Ý",yacute:"ý",YAcy:"Я",yacy:"я",Ycirc:"Ŷ",ycirc:"ŷ",Ycy:"Ы",ycy:"ы",yen:"¥",Yfr:"𝔜",yfr:"𝔶",YIcy:"Ї",yicy:"ї",Yopf:"𝕐",yopf:"𝕪",Yscr:"𝒴",yscr:"𝓎",YUcy:"Ю",yucy:"ю",yuml:"ÿ",Yuml:"Ÿ",Zacute:"Ź",zacute:"ź",Zcaron:"Ž",zcaron:"ž",Zcy:"З",zcy:"з",Zdot:"Ż",zdot:"ż",zeetrf:"ℨ",ZeroWidthSpace:"​",Zeta:"Ζ",zeta:"ζ",zfr:"𝔷",Zfr:"ℨ",ZHcy:"Ж",zhcy:"ж",zigrarr:"⇝",zopf:"𝕫",Zopf:"ℤ",Zscr:"𝒵",zscr:"𝓏",zwj:"‍",zwnj:"‌"}}),ha=q((t,e)=>{e.exports={Aacute:"Á",aacute:"á",Acirc:"Â",acirc:"â",acute:"´",AElig:"Æ",aelig:"æ",Agrave:"À",agrave:"à",amp:"&",AMP:"&",Aring:"Å",aring:"å",Atilde:"Ã",atilde:"ã",Auml:"Ä",auml:"ä",brvbar:"¦",Ccedil:"Ç",ccedil:"ç",cedil:"¸",cent:"¢",copy:"©",COPY:"©",curren:"¤",deg:"°",divide:"÷",Eacute:"É",eacute:"é",Ecirc:"Ê",ecirc:"ê",Egrave:"È",egrave:"è",ETH:"Ð",eth:"ð",Euml:"Ë",euml:"ë",frac12:"½",frac14:"¼",frac34:"¾",gt:">",GT:">",Iacute:"Í",iacute:"í",Icirc:"Î",icirc:"î",iexcl:"¡",Igrave:"Ì",igrave:"ì",iquest:"¿",Iuml:"Ï",iuml:"ï",laquo:"«",lt:"<",LT:"<",macr:"¯",micro:"µ",middot:"·",nbsp:" ",not:"¬",Ntilde:"Ñ",ntilde:"ñ",Oacute:"Ó",oacute:"ó",Ocirc:"Ô",ocirc:"ô",Ograve:"Ò",ograve:"ò",ordf:"ª",ordm:"º",Oslash:"Ø",oslash:"ø",Otilde:"Õ",otilde:"õ",Ouml:"Ö",ouml:"ö",para:"¶",plusmn:"±",pound:"£",quot:'"',QUOT:'"',raquo:"»",reg:"®",REG:"®",sect:"§",shy:"­",sup1:"¹",sup2:"²",sup3:"³",szlig:"ß",THORN:"Þ",thorn:"þ",times:"×",Uacute:"Ú",uacute:"ú",Ucirc:"Û",ucirc:"û",Ugrave:"Ù",ugrave:"ù",uml:"¨",Uuml:"Ü",uuml:"ü",Yacute:"Ý",yacute:"ý",yen:"¥",yuml:"ÿ"}}),Xn=q((t,e)=>{e.exports={amp:"&",apos:"'",gt:">",lt:"<",quot:'"'}}),ga=q((t,e)=>{e.exports={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376}}),ba=q(t=>{var e=t&&t.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(t,"__esModule",{value:!0});var r=e(ga()),o=String.fromCodePoint||function(i){var l="";return i>65535&&(i-=65536,l+=String.fromCharCode(i>>>10&1023|55296),i=56320|i&1023),l+=String.fromCharCode(i),l};function a(i){return i>=55296&&i<=57343||i>1114111?"�":(i in r.default&&(i=r.default[i]),o(i))}n(a,"decodeCodePoint"),t.default=a}),Qn=q(t=>{var e=t&&t.__importDefault||function(m){return m&&m.__esModule?m:{default:m}};Object.defineProperty(t,"__esModule",{value:!0}),t.decodeHTML=t.decodeHTMLStrict=t.decodeXML=void 0;var r=e(Kn()),o=e(ha()),a=e(Xn()),i=e(ba()),l=/&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;t.decodeXML=u(a.default),t.decodeHTMLStrict=u(r.default);function u(m){var h=d(m);return function(g){return String(g).replace(l,h)}}n(u,"getStrictDecoder");var c=n(function(m,h){return m<h?1:-1},"sorter");t.decodeHTML=function(){for(var m=Object.keys(o.default).sort(c),h=Object.keys(r.default).sort(c),g=0,J=0;g<h.length;g++)m[J]===h[g]?(h[g]+=";?",J++):h[g]+=";";var ne=new RegExp("&(?:"+h.join("|")+"|#[xX][\\da-fA-F]+;?|#\\d+;?)","g"),le=d(r.default);function re(ce){return ce.substr(-1)!==";"&&(ce+=";"),le(ce)}return n(re,"replacer"),function(ce){return String(ce).replace(ne,re)}}();function d(m){return n(function(h){if(h.charAt(1)==="#"){var g=h.charAt(2);return g==="X"||g==="x"?i.default(parseInt(h.substr(3),16)):i.default(parseInt(h.substr(2),10))}return m[h.slice(1,-1)]||h},"replace")}n(d,"getReplacer")}),es=q(t=>{var e=t&&t.__importDefault||function(F){return F&&F.__esModule?F:{default:F}};Object.defineProperty(t,"__esModule",{value:!0}),t.escapeUTF8=t.escape=t.encodeNonAsciiHTML=t.encodeHTML=t.encodeXML=void 0;var r=e(Xn()),o=c(r.default),a=d(o);t.encodeXML=ce(o);var i=e(Kn()),l=c(i.default),u=d(l);t.encodeHTML=J(l,u),t.encodeNonAsciiHTML=ce(l);function c(F){return Object.keys(F).sort().reduce(function(se,he){return se[F[he]]="&"+he+";",se},{})}n(c,"getInverseObj");function d(F){for(var se=[],he=[],Ve=0,we=Object.keys(F);Ve<we.length;Ve++){var ve=we[Ve];ve.length===1?se.push("\\"+ve):he.push(ve)}se.sort();for(var Nt=0;Nt<se.length-1;Nt++){for(var Bt=Nt;Bt<se.length-1&&se[Bt].charCodeAt(1)+1===se[Bt+1].charCodeAt(1);)Bt+=1;var Ft=1+Bt-Nt;Ft<3||se.splice(Nt,Ft,se[Nt]+"-"+se[Bt])}return he.unshift("["+se.join("")+"]"),new RegExp(he.join("|"),"g")}n(d,"getInverseReplacer");var m=/(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,h=String.prototype.codePointAt!=null?function(F){return F.codePointAt(0)}:function(F){return(F.charCodeAt(0)-55296)*1024+F.charCodeAt(1)-56320+65536};function g(F){return"&#x"+(F.length>1?h(F):F.charCodeAt(0)).toString(16).toUpperCase()+";"}n(g,"singleCharReplacer");function J(F,se){return function(he){return he.replace(se,function(Ve){return F[Ve]}).replace(m,g)}}n(J,"getInverse");var ne=new RegExp(a.source+"|"+m.source,"g");function le(F){return F.replace(ne,g)}n(le,"escape"),t.escape=le;function re(F){return F.replace(a,g)}n(re,"escapeUTF8"),t.escapeUTF8=re;function ce(F){return function(se){return se.replace(ne,function(he){return F[he]||g(he)})}}n(ce,"getASCIIEncoder")}),Da=q(t=>{Object.defineProperty(t,"__esModule",{value:!0}),t.decodeXMLStrict=t.decodeHTML5Strict=t.decodeHTML4Strict=t.decodeHTML5=t.decodeHTML4=t.decodeHTMLStrict=t.decodeHTML=t.decodeXML=t.encodeHTML5=t.encodeHTML4=t.escapeUTF8=t.escape=t.encodeNonAsciiHTML=t.encodeHTML=t.encodeXML=t.encode=t.decodeStrict=t.decode=void 0;var e=Qn(),r=es();function o(c,d){return(!d||d<=0?e.decodeXML:e.decodeHTML)(c)}n(o,"decode"),t.decode=o;function a(c,d){return(!d||d<=0?e.decodeXML:e.decodeHTMLStrict)(c)}n(a,"decodeStrict"),t.decodeStrict=a;function i(c,d){return(!d||d<=0?r.encodeXML:r.encodeHTML)(c)}n(i,"encode"),t.encode=i;var l=es();Object.defineProperty(t,"encodeXML",{enumerable:!0,get:n(function(){return l.encodeXML},"get")}),Object.defineProperty(t,"encodeHTML",{enumerable:!0,get:n(function(){return l.encodeHTML},"get")}),Object.defineProperty(t,"encodeNonAsciiHTML",{enumerable:!0,get:n(function(){return l.encodeNonAsciiHTML},"get")}),Object.defineProperty(t,"escape",{enumerable:!0,get:n(function(){return l.escape},"get")}),Object.defineProperty(t,"escapeUTF8",{enumerable:!0,get:n(function(){return l.escapeUTF8},"get")}),Object.defineProperty(t,"encodeHTML4",{enumerable:!0,get:n(function(){return l.encodeHTML},"get")}),Object.defineProperty(t,"encodeHTML5",{enumerable:!0,get:n(function(){return l.encodeHTML},"get")});var u=Qn();Object.defineProperty(t,"decodeXML",{enumerable:!0,get:n(function(){return u.decodeXML},"get")}),Object.defineProperty(t,"decodeHTML",{enumerable:!0,get:n(function(){return u.decodeHTML},"get")}),Object.defineProperty(t,"decodeHTMLStrict",{enumerable:!0,get:n(function(){return u.decodeHTMLStrict},"get")}),Object.defineProperty(t,"decodeHTML4",{enumerable:!0,get:n(function(){return u.decodeHTML},"get")}),Object.defineProperty(t,"decodeHTML5",{enumerable:!0,get:n(function(){return u.decodeHTML},"get")}),Object.defineProperty(t,"decodeHTML4Strict",{enumerable:!0,get:n(function(){return u.decodeHTMLStrict},"get")}),Object.defineProperty(t,"decodeHTML5Strict",{enumerable:!0,get:n(function(){return u.decodeHTMLStrict},"get")}),Object.defineProperty(t,"decodeXMLStrict",{enumerable:!0,get:n(function(){return u.decodeXML},"get")})}),Ha=q((t,e)=>{function r(p,A){if(!(p instanceof A))throw new TypeError("Cannot call a class as a function")}n(r,"_classCallCheck");function o(p,A){for(var B=0;B<A.length;B++){var de=A[B];de.enumerable=de.enumerable||!1,de.configurable=!0,"value"in de&&(de.writable=!0),Object.defineProperty(p,de.key,de)}}n(o,"_defineProperties");function a(p,A,B){return A&&o(p.prototype,A),B&&o(p,B),p}n(a,"_createClass");function i(p,A){var B=typeof Symbol<"u"&&p[Symbol.iterator]||p["@@iterator"];if(!B){if(Array.isArray(p)||(B=l(p))||A&&p&&typeof p.length=="number"){B&&(p=B);var de=0,pe=n(function(){},"F");return{s:pe,n:n(function(){return de>=p.length?{done:!0}:{done:!1,value:p[de++]}},"n"),e:n(function(Mt){throw Mt},"e"),f:pe}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Lt=!0,qt=!1,Ut;return{s:n(function(){B=B.call(p)},"s"),n:n(function(){var Mt=B.next();return Lt=Mt.done,Mt},"n"),e:n(function(Mt){qt=!0,Ut=Mt},"e"),f:n(function(){try{!Lt&&B.return!=null&&B.return()}finally{if(qt)throw Ut}},"f")}}n(i,"_createForOfIteratorHelper");function l(p,A){if(p){if(typeof p=="string")return u(p,A);var B=Object.prototype.toString.call(p).slice(8,-1);if(B==="Object"&&p.constructor&&(B=p.constructor.name),B==="Map"||B==="Set")return Array.from(p);if(B==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(B))return u(p,A)}}n(l,"_unsupportedIterableToArray");function u(p,A){(A==null||A>p.length)&&(A=p.length);for(var B=0,de=new Array(A);B<A;B++)de[B]=p[B];return de}n(u,"_arrayLikeToArray");var c=Da(),d={fg:"#FFF",bg:"#000",newline:!1,escapeXML:!1,stream:!1,colors:m()};function m(){var p={0:"#000",1:"#A00",2:"#0A0",3:"#A50",4:"#00A",5:"#A0A",6:"#0AA",7:"#AAA",8:"#555",9:"#F55",10:"#5F5",11:"#FF5",12:"#55F",13:"#F5F",14:"#5FF",15:"#FFF"};return F(0,5).forEach(function(A){F(0,5).forEach(function(B){F(0,5).forEach(function(de){return h(A,B,de,p)})})}),F(0,23).forEach(function(A){var B=A+232,de=g(A*10+8);p[B]="#"+de+de+de}),p}n(m,"getDefaultColors");function h(p,A,B,de){var pe=16+p*36+A*6+B,Lt=p>0?p*40+55:0,qt=A>0?A*40+55:0,Ut=B>0?B*40+55:0;de[pe]=J([Lt,qt,Ut])}n(h,"setStyleColor");function g(p){for(var A=p.toString(16);A.length<2;)A="0"+A;return A}n(g,"toHexString");function J(p){var A=[],B=i(p),de;try{for(B.s();!(de=B.n()).done;){var pe=de.value;A.push(g(pe))}}catch(Lt){B.e(Lt)}finally{B.f()}return"#"+A.join("")}n(J,"toColorHexString");function ne(p,A,B,de){var pe;return A==="text"?pe=Ve(B,de):A==="display"?pe=re(p,B,de):A==="xterm256Foreground"?pe=Nt(p,de.colors[B]):A==="xterm256Background"?pe=Bt(p,de.colors[B]):A==="rgb"&&(pe=le(p,B)),pe}n(ne,"generateOutput");function le(p,A){A=A.substring(2).slice(0,-1);var B=+A.substr(0,2),de=A.substring(5).split(";"),pe=de.map(function(Lt){return("0"+Number(Lt).toString(16)).substr(-2)}).join("");return ve(p,(B===38?"color:#":"background-color:#")+pe)}n(le,"handleRgb");function re(p,A,B){A=parseInt(A,10);var de={"-1":n(function(){return"<br/>"},"_"),0:n(function(){return p.length&&ce(p)},"_"),1:n(function(){return we(p,"b")},"_"),3:n(function(){return we(p,"i")},"_"),4:n(function(){return we(p,"u")},"_"),8:n(function(){return ve(p,"display:none")},"_"),9:n(function(){return we(p,"strike")},"_"),22:n(function(){return ve(p,"font-weight:normal;text-decoration:none;font-style:normal")},"_"),23:n(function(){return Ft(p,"i")},"_"),24:n(function(){return Ft(p,"u")},"_"),39:n(function(){return Nt(p,B.fg)},"_"),49:n(function(){return Bt(p,B.bg)},"_"),53:n(function(){return ve(p,"text-decoration:overline")},"_")},pe;return de[A]?pe=de[A]():4<A&&A<7?pe=we(p,"blink"):29<A&&A<38?pe=Nt(p,B.colors[A-30]):39<A&&A<48?pe=Bt(p,B.colors[A-40]):89<A&&A<98?pe=Nt(p,B.colors[8+(A-90)]):99<A&&A<108&&(pe=Bt(p,B.colors[8+(A-100)])),pe}n(re,"handleDisplay");function ce(p){var A=p.slice(0);return p.length=0,A.reverse().map(function(B){return"</"+B+">"}).join("")}n(ce,"resetStyles");function F(p,A){for(var B=[],de=p;de<=A;de++)B.push(de);return B}n(F,"range");function se(p){return function(A){return(p===null||A.category!==p)&&p!=="all"}}n(se,"notCategory");function he(p){p=parseInt(p,10);var A=null;return p===0?A="all":p===1?A="bold":2<p&&p<5?A="underline":4<p&&p<7?A="blink":p===8?A="hide":p===9?A="strike":29<p&&p<38||p===39||89<p&&p<98?A="foreground-color":(39<p&&p<48||p===49||99<p&&p<108)&&(A="background-color"),A}n(he,"categoryForCode");function Ve(p,A){return A.escapeXML?c.encodeXML(p):p}n(Ve,"pushText");function we(p,A,B){return B||(B=""),p.push(A),"<".concat(A).concat(B?' style="'.concat(B,'"'):"",">")}n(we,"pushTag");function ve(p,A){return we(p,"span",A)}n(ve,"pushStyle");function Nt(p,A){return we(p,"span","color:"+A)}n(Nt,"pushForegroundColor");function Bt(p,A){return we(p,"span","background-color:"+A)}n(Bt,"pushBackgroundColor");function Ft(p,A){var B;if(p.slice(-1)[0]===A&&(B=p.pop()),B)return"</"+A+">"}n(Ft,"closeTag");function jt(p,A,B){var de=!1,pe=3;function Lt(){return""}n(Lt,"remove");function qt(Xr,Kr){return B("xterm256Foreground",Kr),""}n(qt,"removeXterm256Foreground");function Ut(Xr,Kr){return B("xterm256Background",Kr),""}n(Ut,"removeXterm256Background");function Mt(Xr){return A.newline?B("display",-1):B("text",Xr),""}n(Mt,"newline");function Gt(Xr,Kr){de=!0,Kr.trim().length===0&&(Kr="0"),Kr=Kr.trimRight(";").split(";");var Bn=i(Kr),Hn;try{for(Bn.s();!(Hn=Bn.n()).done;){var ta=Hn.value;B("display",ta)}}catch(ra){Bn.e(ra)}finally{Bn.f()}return""}n(Gt,"ansiMess");function lr(Xr){return B("text",Xr),""}n(lr,"realText");function zr(Xr){return B("rgb",Xr),""}n(zr,"rgb");var Qr=[{pattern:/^\x08+/,sub:Lt},{pattern:/^\x1b\[[012]?K/,sub:Lt},{pattern:/^\x1b\[\(B/,sub:Lt},{pattern:/^\x1b\[[34]8;2;\d+;\d+;\d+m/,sub:zr},{pattern:/^\x1b\[38;5;(\d+)m/,sub:qt},{pattern:/^\x1b\[48;5;(\d+)m/,sub:Ut},{pattern:/^\n/,sub:Mt},{pattern:/^\r+\n/,sub:Mt},{pattern:/^\r/,sub:Mt},{pattern:/^\x1b\[((?:\d{1,3};?)+|)m/,sub:Gt},{pattern:/^\x1b\[\d?J/,sub:Lt},{pattern:/^\x1b\[\d{0,3};\d{0,3}f/,sub:Lt},{pattern:/^\x1b\[?[\d;]{0,3}/,sub:Lt},{pattern:/^(([^\x1b\x08\r\n])+)/,sub:lr}];function Vt(Xr,Kr){Kr>pe&&de||(de=!1,p=p.replace(Xr.pattern,Xr.sub))}n(Vt,"process");var Jr=[],Zr=p,Tn=Zr.length;e:for(;Tn>0;){for(var Gn=0,zn=0,So=Qr.length;zn<So;Gn=++zn){var ea=Qr[Gn];if(Vt(ea,Gn),p.length!==Tn){Tn=p.length;continue e}}if(p.length===Tn)break;Jr.push(0),Tn=p.length}return Jr}n(jt,"tokenize");function qe(p,A,B){return A!=="text"&&(p=p.filter(se(he(B))),p.push({token:A,data:B,category:he(B)})),p}n(qe,"updateStickyStack");var Dt=function(){function p(A){r(this,p),A=A||{},A.colors&&(A.colors=Object.assign({},d.colors,A.colors)),this.options=Object.assign({},d,A),this.stack=[],this.stickyStack=[]}return n(p,"Filter"),a(p,[{key:"toHtml",value:n(function(A){var B=this;A=typeof A=="string"?[A]:A;var de=this.stack,pe=this.options,Lt=[];return this.stickyStack.forEach(function(qt){var Ut=ne(de,qt.token,qt.data,pe);Ut&&Lt.push(Ut)}),jt(A.join(""),pe,function(qt,Ut){var Mt=ne(de,qt,Ut,pe);Mt&&Lt.push(Mt),pe.stream&&(B.stickyStack=qe(B.stickyStack,qt,Ut))}),de.length&&Lt.push(ce(de)),Lt.join("")},"toHtml")}]),p}();e.exports=Dt}),Za=q((t,e)=>{(function(r,o){typeof t=="object"&&typeof e<"u"?e.exports=o():typeof define=="function"&&define.amd?define(o):(r=typeof globalThis<"u"?globalThis:r||self).BrowserDetector=o()})(t,function(){function r(c,d){for(var m=0;m<d.length;m++){var h=d[m];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(c,(g=h.key,J=void 0,typeof(J=function(ne,le){if(typeof ne!="object"||ne===null)return ne;var re=ne[Symbol.toPrimitive];if(re!==void 0){var ce=re.call(ne,le);if(typeof ce!="object")return ce;throw new TypeError("@@toPrimitive must return a primitive value.")}return(le==="string"?String:Number)(ne)}(g,"string"))=="symbol"?J:String(J)),h)}var g,J}n(r,"e");var o={chrome:"Google Chrome",brave:"Brave",crios:"Google Chrome",edge:"Microsoft Edge",edg:"Microsoft Edge",edgios:"Microsoft Edge",fennec:"Mozilla Firefox",jsdom:"JsDOM",mozilla:"Mozilla Firefox",fxios:"Mozilla Firefox",msie:"Microsoft Internet Explorer",opera:"Opera",opios:"Opera",opr:"Opera",opt:"Opera",rv:"Microsoft Internet Explorer",safari:"Safari",samsungbrowser:"Samsung Browser",electron:"Electron"},a={android:"Android",androidTablet:"Android Tablet",cros:"Chrome OS",fennec:"Android Tablet",ipad:"IPad",iphone:"IPhone",jsdom:"JsDOM",linux:"Linux",mac:"Macintosh",tablet:"Android Tablet",win:"Windows","windows phone":"Windows Phone",xbox:"Microsoft Xbox"},i=n(function(c){var d=new RegExp("^-?\\d+(?:.\\d{0,".concat(arguments.length>1&&arguments[1]!==void 0?arguments[1]:-1,"})?")),m=Number(c).toString().match(d);return m?m[0]:null},"n"),l=n(function(){return typeof window<"u"?window.navigator:null},"i"),u=function(){function c(g){var J;(function(ne,le){if(!(ne instanceof le))throw new TypeError("Cannot call a class as a function")})(this,c),this.userAgent=g||((J=l())===null||J===void 0?void 0:J.userAgent)||null}n(c,"t");var d,m,h;return d=c,m=[{key:"parseUserAgent",value:n(function(g){var J,ne,le,re={},ce=g||this.userAgent||"",F=ce.toLowerCase().replace(/\s\s+/g," "),se=/(edge)\/([\w.]+)/.exec(F)||/(edg)[/]([\w.]+)/.exec(F)||/(opr)[/]([\w.]+)/.exec(F)||/(opt)[/]([\w.]+)/.exec(F)||/(fxios)[/]([\w.]+)/.exec(F)||/(edgios)[/]([\w.]+)/.exec(F)||/(jsdom)[/]([\w.]+)/.exec(F)||/(samsungbrowser)[/]([\w.]+)/.exec(F)||/(electron)[/]([\w.]+)/.exec(F)||/(chrome)[/]([\w.]+)/.exec(F)||/(crios)[/]([\w.]+)/.exec(F)||/(opios)[/]([\w.]+)/.exec(F)||/(version)(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(F)||/(webkit)[/]([\w.]+).*(version)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(F)||/(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(F)||/(webkit)[/]([\w.]+)/.exec(F)||/(opera)(?:.*version|)[/]([\w.]+)/.exec(F)||/(msie) ([\w.]+)/.exec(F)||/(fennec)[/]([\w.]+)/.exec(F)||F.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(F)||F.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(F)||[],he=/(ipad)/.exec(F)||/(ipod)/.exec(F)||/(iphone)/.exec(F)||/(jsdom)/.exec(F)||/(windows phone)/.exec(F)||/(xbox)/.exec(F)||/(win)/.exec(F)||/(tablet)/.exec(F)||/(android)/.test(F)&&/(mobile)/.test(F)===!1&&["androidTablet"]||/(android)/.exec(F)||/(mac)/.exec(F)||/(linux)/.exec(F)||/(cros)/.exec(F)||[],Ve=se[5]||se[3]||se[1]||null,we=he[0]||null,ve=se[4]||se[2]||null,Nt=l();Ve==="chrome"&&typeof(Nt==null||(J=Nt.brave)===null||J===void 0?void 0:J.isBrave)=="function"&&(Ve="brave"),Ve&&(re[Ve]=!0),we&&(re[we]=!0);var Bt=!!(re.tablet||re.android||re.androidTablet),Ft=!!(re.ipad||re.tablet||re.androidTablet),jt=!!(re.android||re.androidTablet||re.tablet||re.ipad||re.ipod||re.iphone||re["windows phone"]),qe=!!(re.cros||re.mac||re.linux||re.win),Dt=!!(re.brave||re.chrome||re.crios||re.opr||re.safari||re.edg||re.electron),p=!!(re.msie||re.rv);return{name:(ne=o[Ve])!==null&&ne!==void 0?ne:null,platform:(le=a[we])!==null&&le!==void 0?le:null,userAgent:ce,version:ve,shortVersion:ve?i(parseFloat(ve),2):null,isAndroid:Bt,isTablet:Ft,isMobile:jt,isDesktop:qe,isWebkit:Dt,isIE:p}},"value")},{key:"getBrowserInfo",value:n(function(){var g=this.parseUserAgent();return{name:g.name,platform:g.platform,userAgent:g.userAgent,version:g.version,shortVersion:g.shortVersion}},"value")}],h=[{key:"VERSION",get:n(function(){return"3.4.0"},"get")}],m&&r(d.prototype,m),h&&r(d,h),Object.defineProperty(d,"prototype",{writable:!1}),c}();return u})}),Ht={};_e(Ht,{global:()=>E$1});var E$1=(()=>{let t;return typeof window<"u"?t=window:typeof globalThis<"u"?t=globalThis:typeof global<"u"?t=global:typeof self<"u"?t=self:t={},t})(),ge={};_e(ge,{ARGTYPES_INFO_REQUEST:()=>fo,ARGTYPES_INFO_RESPONSE:()=>nt,CHANNEL_CREATED:()=>cl,CHANNEL_WS_DISCONNECT:()=>Wt,CONFIG_ERROR:()=>$t,CREATE_NEW_STORYFILE_REQUEST:()=>pl,CREATE_NEW_STORYFILE_RESPONSE:()=>dl,CURRENT_STORY_WAS_SET:()=>rt,DOCS_PREPARED:()=>Yt,DOCS_RENDERED:()=>pr,FILE_COMPONENT_SEARCH_REQUEST:()=>ul,FILE_COMPONENT_SEARCH_RESPONSE:()=>fl,FORCE_REMOUNT:()=>Kt,FORCE_RE_RENDER:()=>dr,GLOBALS_UPDATED:()=>Ce,NAVIGATE_URL:()=>yl,PLAY_FUNCTION_THREW_EXCEPTION:()=>Xt,PRELOAD_ENTRIES:()=>Qt,PREVIEW_BUILDER_PROGRESS:()=>ml,PREVIEW_KEYDOWN:()=>Zt,REGISTER_SUBSCRIPTION:()=>hl,REQUEST_WHATS_NEW_DATA:()=>wl,RESET_STORY_ARGS:()=>ur,RESULT_WHATS_NEW_DATA:()=>_l,SAVE_STORY_REQUEST:()=>Ol,SAVE_STORY_RESPONSE:()=>Il,SELECT_STORY:()=>gl,SET_CONFIG:()=>Sl,SET_CURRENT_STORY:()=>eo,SET_FILTER:()=>bl,SET_GLOBALS:()=>ro,SET_INDEX:()=>Tl,SET_STORIES:()=>El,SET_WHATS_NEW_CACHE:()=>Cl,SHARED_STATE_CHANGED:()=>Rl,SHARED_STATE_SET:()=>Al,STORIES_COLLAPSE_ALL:()=>xl,STORIES_EXPAND_ALL:()=>vl,STORY_ARGS_UPDATED:()=>to,STORY_CHANGED:()=>oo,STORY_ERRORED:()=>no,STORY_FINISHED:()=>ot,STORY_INDEX_INVALIDATED:()=>so,STORY_MISSING:()=>tt,STORY_PREPARED:()=>io,STORY_RENDERED:()=>We,STORY_RENDER_PHASE_CHANGED:()=>Pe,STORY_SPECIFIED:()=>ao,STORY_THREW_EXCEPTION:()=>lo,STORY_UNCHANGED:()=>co,TELEMETRY_ERROR:()=>uo,TESTING_MODULE_CANCEL_TEST_RUN_REQUEST:()=>Ll,TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE:()=>jl,TESTING_MODULE_CRASH_REPORT:()=>Fl,TESTING_MODULE_PROGRESS_REPORT:()=>Dl,TESTING_MODULE_RUN_ALL_REQUEST:()=>kl,TESTING_MODULE_RUN_REQUEST:()=>Nl,TOGGLE_WHATS_NEW_NOTIFICATIONS:()=>Pl,UNHANDLED_ERRORS_WHILE_PLAYING:()=>Jt,UPDATE_GLOBALS:()=>fr,UPDATE_QUERY_PARAMS:()=>po,UPDATE_STORY_ARGS:()=>yr,default:()=>ll});var zt=(t=>(t.CHANNEL_WS_DISCONNECT="channelWSDisconnect",t.CHANNEL_CREATED="channelCreated",t.CONFIG_ERROR="configError",t.STORY_INDEX_INVALIDATED="storyIndexInvalidated",t.STORY_SPECIFIED="storySpecified",t.SET_CONFIG="setConfig",t.SET_STORIES="setStories",t.SET_INDEX="setIndex",t.SET_CURRENT_STORY="setCurrentStory",t.CURRENT_STORY_WAS_SET="currentStoryWasSet",t.FORCE_RE_RENDER="forceReRender",t.FORCE_REMOUNT="forceRemount",t.PRELOAD_ENTRIES="preloadStories",t.STORY_PREPARED="storyPrepared",t.DOCS_PREPARED="docsPrepared",t.STORY_CHANGED="storyChanged",t.STORY_UNCHANGED="storyUnchanged",t.STORY_RENDERED="storyRendered",t.STORY_FINISHED="storyFinished",t.STORY_MISSING="storyMissing",t.STORY_ERRORED="storyErrored",t.STORY_THREW_EXCEPTION="storyThrewException",t.STORY_RENDER_PHASE_CHANGED="storyRenderPhaseChanged",t.PLAY_FUNCTION_THREW_EXCEPTION="playFunctionThrewException",t.UNHANDLED_ERRORS_WHILE_PLAYING="unhandledErrorsWhilePlaying",t.UPDATE_STORY_ARGS="updateStoryArgs",t.STORY_ARGS_UPDATED="storyArgsUpdated",t.RESET_STORY_ARGS="resetStoryArgs",t.SET_FILTER="setFilter",t.SET_GLOBALS="setGlobals",t.UPDATE_GLOBALS="updateGlobals",t.GLOBALS_UPDATED="globalsUpdated",t.REGISTER_SUBSCRIPTION="registerSubscription",t.PREVIEW_KEYDOWN="previewKeydown",t.PREVIEW_BUILDER_PROGRESS="preview_builder_progress",t.SELECT_STORY="selectStory",t.STORIES_COLLAPSE_ALL="storiesCollapseAll",t.STORIES_EXPAND_ALL="storiesExpandAll",t.DOCS_RENDERED="docsRendered",t.SHARED_STATE_CHANGED="sharedStateChanged",t.SHARED_STATE_SET="sharedStateSet",t.NAVIGATE_URL="navigateUrl",t.UPDATE_QUERY_PARAMS="updateQueryParams",t.REQUEST_WHATS_NEW_DATA="requestWhatsNewData",t.RESULT_WHATS_NEW_DATA="resultWhatsNewData",t.SET_WHATS_NEW_CACHE="setWhatsNewCache",t.TOGGLE_WHATS_NEW_NOTIFICATIONS="toggleWhatsNewNotifications",t.TELEMETRY_ERROR="telemetryError",t.FILE_COMPONENT_SEARCH_REQUEST="fileComponentSearchRequest",t.FILE_COMPONENT_SEARCH_RESPONSE="fileComponentSearchResponse",t.SAVE_STORY_REQUEST="saveStoryRequest",t.SAVE_STORY_RESPONSE="saveStoryResponse",t.ARGTYPES_INFO_REQUEST="argtypesInfoRequest",t.ARGTYPES_INFO_RESPONSE="argtypesInfoResponse",t.CREATE_NEW_STORYFILE_REQUEST="createNewStoryfileRequest",t.CREATE_NEW_STORYFILE_RESPONSE="createNewStoryfileResponse",t.TESTING_MODULE_CRASH_REPORT="testingModuleCrashReport",t.TESTING_MODULE_PROGRESS_REPORT="testingModuleProgressReport",t.TESTING_MODULE_RUN_REQUEST="testingModuleRunRequest",t.TESTING_MODULE_RUN_ALL_REQUEST="testingModuleRunAllRequest",t.TESTING_MODULE_CANCEL_TEST_RUN_REQUEST="testingModuleCancelTestRunRequest",t.TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE="testingModuleCancelTestRunResponse",t))(zt||{}),ll=zt,{CHANNEL_WS_DISCONNECT:Wt,CHANNEL_CREATED:cl,CONFIG_ERROR:$t,CREATE_NEW_STORYFILE_REQUEST:pl,CREATE_NEW_STORYFILE_RESPONSE:dl,CURRENT_STORY_WAS_SET:rt,DOCS_PREPARED:Yt,DOCS_RENDERED:pr,FILE_COMPONENT_SEARCH_REQUEST:ul,FILE_COMPONENT_SEARCH_RESPONSE:fl,FORCE_RE_RENDER:dr,FORCE_REMOUNT:Kt,GLOBALS_UPDATED:Ce,NAVIGATE_URL:yl,PLAY_FUNCTION_THREW_EXCEPTION:Xt,UNHANDLED_ERRORS_WHILE_PLAYING:Jt,PRELOAD_ENTRIES:Qt,PREVIEW_BUILDER_PROGRESS:ml,PREVIEW_KEYDOWN:Zt,REGISTER_SUBSCRIPTION:hl,RESET_STORY_ARGS:ur,SELECT_STORY:gl,SET_CONFIG:Sl,SET_CURRENT_STORY:eo,SET_FILTER:bl,SET_GLOBALS:ro,SET_INDEX:Tl,SET_STORIES:El,SHARED_STATE_CHANGED:Rl,SHARED_STATE_SET:Al,STORIES_COLLAPSE_ALL:xl,STORIES_EXPAND_ALL:vl,STORY_ARGS_UPDATED:to,STORY_CHANGED:oo,STORY_ERRORED:no,STORY_INDEX_INVALIDATED:so,STORY_MISSING:tt,STORY_PREPARED:io,STORY_RENDER_PHASE_CHANGED:Pe,STORY_RENDERED:We,STORY_FINISHED:ot,STORY_SPECIFIED:ao,STORY_THREW_EXCEPTION:lo,STORY_UNCHANGED:co,UPDATE_GLOBALS:fr,UPDATE_QUERY_PARAMS:po,UPDATE_STORY_ARGS:yr,REQUEST_WHATS_NEW_DATA:wl,RESULT_WHATS_NEW_DATA:_l,SET_WHATS_NEW_CACHE:Cl,TOGGLE_WHATS_NEW_NOTIFICATIONS:Pl,TELEMETRY_ERROR:uo,SAVE_STORY_REQUEST:Ol,SAVE_STORY_RESPONSE:Il,ARGTYPES_INFO_REQUEST:fo,ARGTYPES_INFO_RESPONSE:nt,TESTING_MODULE_CRASH_REPORT:Fl,TESTING_MODULE_PROGRESS_REPORT:Dl,TESTING_MODULE_RUN_REQUEST:Nl,TESTING_MODULE_RUN_ALL_REQUEST:kl,TESTING_MODULE_CANCEL_TEST_RUN_REQUEST:Ll,TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE:jl}=zt,yo={"@storybook/global":"__STORYBOOK_MODULE_GLOBAL__","storybook/internal/channels":"__STORYBOOK_MODULE_CHANNELS__","@storybook/channels":"__STORYBOOK_MODULE_CHANNELS__","@storybook/core/channels":"__STORYBOOK_MODULE_CHANNELS__","storybook/internal/client-logger":"__STORYBOOK_MODULE_CLIENT_LOGGER__","@storybook/client-logger":"__STORYBOOK_MODULE_CLIENT_LOGGER__","@storybook/core/client-logger":"__STORYBOOK_MODULE_CLIENT_LOGGER__","storybook/internal/core-events":"__STORYBOOK_MODULE_CORE_EVENTS__","@storybook/core-events":"__STORYBOOK_MODULE_CORE_EVENTS__","@storybook/core/core-events":"__STORYBOOK_MODULE_CORE_EVENTS__","storybook/internal/preview-errors":"__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__","@storybook/core-events/preview-errors":"__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__","@storybook/core/preview-errors":"__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__","storybook/internal/preview-api":"__STORYBOOK_MODULE_PREVIEW_API__","@storybook/preview-api":"__STORYBOOK_MODULE_PREVIEW_API__","@storybook/core/preview-api":"__STORYBOOK_MODULE_PREVIEW_API__","storybook/internal/types":"__STORYBOOK_MODULE_TYPES__","@storybook/types":"__STORYBOOK_MODULE_TYPES__","@storybook/core/types":"__STORYBOOK_MODULE_TYPES__"},cs=Object.keys(yo),br={};_e(br,{Channel:()=>ie,HEARTBEAT_INTERVAL:()=>Po,HEARTBEAT_MAX_LATENCY:()=>Oo,PostMessageTransport:()=>Qe,WebsocketTransport:()=>Ze,createBrowserChannel:()=>kd,default:()=>Nd});function _$1(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];var o=Array.from(typeof t=="string"?[t]:t);o[o.length-1]=o[o.length-1].replace(/\r?\n([\t ]*)$/,"");var a=o.reduce(function(u,c){var d=c.match(/\n([\t ]+|(?!\s).)/g);return d?u.concat(d.map(function(m){var h,g;return(g=(h=m.match(/[\t ]/g))===null||h===void 0?void 0:h.length)!==null&&g!==void 0?g:0})):u},[]);if(a.length){var i=new RegExp(`
[	 ]{`+Math.min.apply(Math,a)+"}","g");o=o.map(function(u){return u.replace(i,`
`)})}o[0]=o[0].replace(/^\r?\n/,"");var l=o[0];return e.forEach(function(u,c){var d=l.match(/(?:^|\n)( *)$/),m=d?d[1]:"",h=u;typeof u=="string"&&u.includes(`
`)&&(h=String(u).split(`
`).map(function(g,J){return J===0?g:""+m+g}).join(`
`)),l+=h+o[c+1]}),l}n(_$1,"dedent");var ps=_$1,mo=new Map,Ml="UNIVERSAL_STORE:",ee={PENDING:"PENDING",RESOLVED:"RESOLVED",REJECTED:"REJECTED"},w=class Ge{constructor(e,r){if(this.debugging=!1,this.listeners=new Map([["*",new Set]]),this.getState=n(()=>(this.debug("getState",{state:this.state}),this.state),"getState"),this.subscribe=n((o,a)=>{let i=typeof o=="function",l=i?"*":o,u=i?o:a;if(this.debug("subscribe",{eventType:l,listener:u}),!u)throw new TypeError(`Missing first subscribe argument, or second if first is the event type, when subscribing to a UniversalStore with id '${this.id}'`);return this.listeners.has(l)||this.listeners.set(l,new Set),this.listeners.get(l).add(u),()=>{var c;this.debug("unsubscribe",{eventType:l,listener:u}),this.listeners.has(l)&&(this.listeners.get(l).delete(u),((c=this.listeners.get(l))==null?void 0:c.size)===0&&this.listeners.delete(l))}},"subscribe"),this.send=n(o=>{if(this.debug("send",{event:o}),this.status!==Ge.Status.READY)throw new TypeError(_$1`Cannot send event before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify({event:o,id:this.id,actor:this.actor,environment:this.environment},null,2)}`);this.emitToListeners(o,{actor:this.actor}),this.emitToChannel(o,{actor:this.actor})},"send"),this.debugging=e.debug??!1,!Ge.isInternalConstructing)throw new TypeError("UniversalStore is not constructable - use UniversalStore.create() instead");if(Ge.isInternalConstructing=!1,this.id=e.id,this.actorId=Date.now().toString(36)+Math.random().toString(36).substring(2),this.actorType=e.leader?Ge.ActorType.LEADER:Ge.ActorType.FOLLOWER,this.state=e.initialState,this.channelEventName=`${Ml}${this.id}`,this.debug("constructor",{options:e,environmentOverrides:r,channelEventName:this.channelEventName}),this.actor.type===Ge.ActorType.LEADER)this.syncing={state:ee.RESOLVED,promise:Promise.resolve()};else{let o,a,i=new Promise((l,u)=>{o=n(()=>{this.syncing.state===ee.PENDING&&(this.syncing.state=ee.RESOLVED,l())},"syncingResolve"),a=n(c=>{this.syncing.state===ee.PENDING&&(this.syncing.state=ee.REJECTED,u(c))},"syncingReject")});this.syncing={state:ee.PENDING,promise:i,resolve:o,reject:a}}this.getState=this.getState.bind(this),this.setState=this.setState.bind(this),this.subscribe=this.subscribe.bind(this),this.onStateChange=this.onStateChange.bind(this),this.send=this.send.bind(this),this.emitToChannel=this.emitToChannel.bind(this),this.prepareThis=this.prepareThis.bind(this),this.emitToListeners=this.emitToListeners.bind(this),this.handleChannelEvents=this.handleChannelEvents.bind(this),this.debug=this.debug.bind(this),this.channel=(r==null?void 0:r.channel)??Ge.preparation.channel,this.environment=(r==null?void 0:r.environment)??Ge.preparation.environment,this.channel&&this.environment?this.prepareThis({channel:this.channel,environment:this.environment}):Ge.preparation.promise.then(this.prepareThis)}static setupPreparationPromise(){let e,r,o=new Promise((a,i)=>{e=n(l=>{a(l)},"resolveRef"),r=n((...l)=>{i(l)},"rejectRef")});Ge.preparation={resolve:e,reject:r,promise:o}}get actor(){return Object.freeze({id:this.actorId,type:this.actorType,environment:this.environment??Ge.Environment.UNKNOWN})}get status(){var e;if(!this.channel||!this.environment)return Ge.Status.UNPREPARED;switch((e=this.syncing)==null?void 0:e.state){case ee.PENDING:case void 0:return Ge.Status.SYNCING;case ee.REJECTED:return Ge.Status.ERROR;case ee.RESOLVED:default:return Ge.Status.READY}}untilReady(){var e;return Promise.all([Ge.preparation.promise,(e=this.syncing)==null?void 0:e.promise])}static create(e){if(!e||typeof(e==null?void 0:e.id)!="string")throw new TypeError("id is required and must be a string, when creating a UniversalStore");e.debug&&console.debug(_$1`[UniversalStore]
        create`,{options:e});let r=mo.get(e.id);if(r)return console.warn(_$1`UniversalStore with id "${e.id}" already exists in this environment, re-using existing.
        You should reuse the existing instance instead of trying to create a new one.`),r;Ge.isInternalConstructing=!0;let o=new Ge(e);return mo.set(e.id,o),o}static __prepare(e,r){Ge.preparation.channel=e,Ge.preparation.environment=r,Ge.preparation.resolve({channel:e,environment:r})}setState(e){let r=this.state,o=typeof e=="function"?e(r):e;if(this.debug("setState",{newState:o,previousState:r,updater:e}),this.status!==Ge.Status.READY)throw new TypeError(_$1`Cannot set state before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify({newState:o,id:this.id,actor:this.actor,environment:this.environment},null,2)}`);this.state=o;let a={type:Ge.InternalEventType.SET_STATE,payload:{state:o,previousState:r}};this.emitToChannel(a,{actor:this.actor}),this.emitToListeners(a,{actor:this.actor})}onStateChange(e){return this.debug("onStateChange",{listener:e}),this.subscribe(Ge.InternalEventType.SET_STATE,({payload:r},o)=>{e(r.state,r.previousState,o)})}emitToChannel(e,r){var o;this.debug("emitToChannel",{event:e,eventInfo:r,channel:this.channel}),(o=this.channel)==null||o.emit(this.channelEventName,{event:e,eventInfo:r})}prepareThis({channel:e,environment:r}){this.channel=e,this.environment=r,this.debug("prepared",{channel:e,environment:r}),this.channel.on(this.channelEventName,this.handleChannelEvents),this.actor.type===Ge.ActorType.LEADER?this.emitToChannel({type:Ge.InternalEventType.LEADER_CREATED},{actor:this.actor}):(this.emitToChannel({type:Ge.InternalEventType.FOLLOWER_CREATED},{actor:this.actor}),this.emitToChannel({type:Ge.InternalEventType.EXISTING_STATE_REQUEST},{actor:this.actor}),setTimeout(()=>{this.syncing.reject(new TypeError(`No existing state found for follower with id: '${this.id}'. Make sure a leader with the same id exists before creating a follower.`))},1e3))}emitToListeners(e,r){let o=this.listeners.get(e.type),a=this.listeners.get("*");this.debug("emitToListeners",{event:e,eventInfo:r,eventTypeListeners:o,everythingListeners:a}),[...o??[],...a??[]].forEach(i=>i(e,r))}handleChannelEvents(e){var a,i,l,u,c;let{event:r,eventInfo:o}=e;if([o.actor.id,(a=o.forwardingActor)==null?void 0:a.id].includes(this.actor.id)){this.debug("handleChannelEvents: Ignoring event from self",{channelEvent:e});return}else if(((i=this.syncing)==null?void 0:i.state)===ee.PENDING&&r.type!==Ge.InternalEventType.EXISTING_STATE_RESPONSE){this.debug("handleChannelEvents: Ignoring event while syncing",{channelEvent:e});return}if(this.debug("handleChannelEvents",{channelEvent:e}),this.actor.type===Ge.ActorType.LEADER){let d=!0;switch(r.type){case Ge.InternalEventType.EXISTING_STATE_REQUEST:d=!1;let m={type:Ge.InternalEventType.EXISTING_STATE_RESPONSE,payload:this.state};this.debug("handleChannelEvents: responding to existing state request",{responseEvent:m}),this.emitToChannel(m,{actor:this.actor});break;case Ge.InternalEventType.LEADER_CREATED:d=!1,this.syncing.state=ee.REJECTED,this.debug("handleChannelEvents: erroring due to second leader being created",{event:r}),console.error(_$1`Detected multiple UniversalStore leaders created with the same id "${this.id}".
            Only one leader can exists at a time, your stores are now in an invalid state.
            Leaders detected:
            this: ${JSON.stringify(this.actor,null,2)}
            other: ${JSON.stringify(o.actor,null,2)}`);break}d&&(this.debug("handleChannelEvents: forwarding event",{channelEvent:e}),this.emitToChannel(r,{actor:o.actor,forwardingActor:this.actor}))}if(this.actor.type===Ge.ActorType.FOLLOWER)switch(r.type){case Ge.InternalEventType.EXISTING_STATE_RESPONSE:if(this.debug("handleChannelEvents: Setting state from leader's existing state response",{event:r}),((l=this.syncing)==null?void 0:l.state)!==ee.PENDING)break;(c=(u=this.syncing).resolve)==null||c.call(u);let d={type:Ge.InternalEventType.SET_STATE,payload:{state:r.payload,previousState:this.state}};this.state=r.payload,this.emitToListeners(d,o);break}switch(r.type){case Ge.InternalEventType.SET_STATE:this.debug("handleChannelEvents: Setting state",{event:r}),this.state=r.payload.state;break}this.emitToListeners(r,{actor:o.actor})}debug(e,r){this.debugging&&console.debug(_$1`[UniversalStore::${this.id}::${this.environment??Ge.Environment.UNKNOWN}]
        ${e}`,JSON.stringify({data:r,actor:this.actor,state:this.state,status:this.status},null,2))}static __reset(){Ge.preparation.reject(new Error("reset")),Ge.setupPreparationPromise(),Ge.isInternalConstructing=!1}};n(w,"UniversalStore"),w.ActorType={LEADER:"LEADER",FOLLOWER:"FOLLOWER"},w.Environment={SERVER:"SERVER",MANAGER:"MANAGER",PREVIEW:"PREVIEW",UNKNOWN:"UNKNOWN",MOCK:"MOCK"},w.InternalEventType={EXISTING_STATE_REQUEST:"__EXISTING_STATE_REQUEST",EXISTING_STATE_RESPONSE:"__EXISTING_STATE_RESPONSE",SET_STATE:"__SET_STATE",LEADER_CREATED:"__LEADER_CREATED",FOLLOWER_CREATED:"__FOLLOWER_CREATED"},w.Status={UNPREPARED:"UNPREPARED",SYNCING:"SYNCING",READY:"READY",ERROR:"ERROR"},w.isInternalConstructing=!1,w.setupPreparationPromise();var Q=w,Ul=n(t=>t.transports!==void 0,"isMulti"),Gl=n(()=>Math.random().toString(16).slice(2),"generateRandomId"),ho=class{constructor(e={}){this.sender=Gl(),this.events={},this.data={},this.transports=[],this.isAsync=e.async||!1,Ul(e)?(this.transports=e.transports||[],this.transports.forEach(r=>{r.setHandler(o=>this.handleEvent(o))})):this.transports=e.transport?[e.transport]:[],this.transports.forEach(r=>{r.setHandler(o=>this.handleEvent(o))})}get hasTransport(){return this.transports.length>0}addListener(e,r){this.events[e]=this.events[e]||[],this.events[e].push(r)}emit(e,...r){let o={type:e,args:r,from:this.sender},a={};r.length>=1&&r[0]&&r[0].options&&(a=r[0].options);let i=n(()=>{this.transports.forEach(l=>{l.send(o,a)}),this.handleEvent(o)},"handler");this.isAsync?setImmediate(i):i()}last(e){return this.data[e]}eventNames(){return Object.keys(this.events)}listenerCount(e){let r=this.listeners(e);return r?r.length:0}listeners(e){return this.events[e]||void 0}once(e,r){let o=this.onceListener(e,r);this.addListener(e,o)}removeAllListeners(e){e?this.events[e]&&delete this.events[e]:this.events={}}removeListener(e,r){let o=this.listeners(e);o&&(this.events[e]=o.filter(a=>a!==r))}on(e,r){this.addListener(e,r)}off(e,r){this.removeListener(e,r)}handleEvent(e){let r=this.listeners(e.type);r&&r.length&&r.forEach(o=>{o.apply(e,e.args)}),this.data[e.type]=e.args}onceListener(e,r){let o=n((...a)=>(this.removeListener(e,o),r(...a)),"onceListener");return o}};n(ho,"Channel");var ie=ho,mr={};_e(mr,{deprecate:()=>ae,logger:()=>I$1,once:()=>j$1,pretty:()=>X});var{LOGLEVEL:ql}=E$1,Se={trace:1,debug:2,info:3,warn:4,error:5,silent:10},Bl=ql,$e=Se[Bl]||Se.info,I$1={trace:n((t,...e)=>{$e<=Se.trace&&console.trace(t,...e)},"trace"),debug:n((t,...e)=>{$e<=Se.debug&&console.debug(t,...e)},"debug"),info:n((t,...e)=>{$e<=Se.info&&console.info(t,...e)},"info"),warn:n((t,...e)=>{$e<=Se.warn&&console.warn(t,...e)},"warn"),error:n((t,...e)=>{$e<=Se.error&&console.error(t,...e)},"error"),log:n((t,...e)=>{$e<Se.silent&&console.log(t,...e)},"log")},go=new Set,j$1=n(t=>(e,...r)=>{if(!go.has(e))return go.add(e),I$1[t](e,...r)},"once");j$1.clear=()=>go.clear();j$1.trace=j$1("trace");j$1.debug=j$1("debug");j$1.info=j$1("info");j$1.warn=j$1("warn");j$1.error=j$1("error");j$1.log=j$1("log");var ae=j$1("warn"),X=n(t=>(...e)=>{let r=[];if(e.length){let o=/<span\s+style=(['"])([^'"]*)\1\s*>/gi,a=/<\/span>/gi,i;for(r.push(e[0].replace(o,"%c").replace(a,"%c"));i=o.exec(e[0]);)r.push(i[2]),r.push("");for(let l=1;l<e.length;l++)r.push(e[l])}I$1[t].apply(I$1,r)},"pretty");X.trace=X("trace");X.debug=X("debug");X.info=X("info");X.warn=X("warn");X.error=X("error");var Vl=Object.create,ds=Object.defineProperty,Hl=Object.getOwnPropertyDescriptor,us=Object.getOwnPropertyNames,zl=Object.getPrototypeOf,Wl=Object.prototype.hasOwnProperty,Z=n((t,e)=>n(function(){return e||(0,t[us(t)[0]])((e={exports:{}}).exports,e),e.exports},"__require"),"__commonJS"),$l=n((t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of us(e))!Wl.call(t,a)&&a!==r&&ds(t,a,{get:n(()=>e[a],"get"),enumerable:!(o=Hl(e,a))||o.enumerable});return t},"__copyProps"),st=n((t,e,r)=>(r=t!=null?Vl(zl(t)):{},$l(e||!t||!t.__esModule?ds(r,"default",{value:t,enumerable:!0}):r,t)),"__toESM"),Yl=["bubbles","cancelBubble","cancelable","composed","currentTarget","defaultPrevented","eventPhase","isTrusted","returnValue","srcElement","target","timeStamp","type"],Kl=["detail"];function fs(t){let e=Yl.filter(r=>t[r]!==void 0).reduce((r,o)=>({...r,[o]:t[o]}),{});return t instanceof CustomEvent&&Kl.filter(r=>t[r]!==void 0).forEach(r=>{e[r]=t[r]}),e}n(fs,"extractEventHiddenProperties");var Ps=ue(it()),Ts=Z({"node_modules/has-symbols/shams.js"(t,e){e.exports=n(function(){if(typeof Symbol!="function"||typeof Object.getOwnPropertySymbols!="function")return!1;if(typeof Symbol.iterator=="symbol")return!0;var r={},o=Symbol("test"),a=Object(o);if(typeof o=="string"||Object.prototype.toString.call(o)!=="[object Symbol]"||Object.prototype.toString.call(a)!=="[object Symbol]")return!1;var i=42;r[o]=i;for(o in r)return!1;if(typeof Object.keys=="function"&&Object.keys(r).length!==0||typeof Object.getOwnPropertyNames=="function"&&Object.getOwnPropertyNames(r).length!==0)return!1;var l=Object.getOwnPropertySymbols(r);if(l.length!==1||l[0]!==o||!Object.prototype.propertyIsEnumerable.call(r,o))return!1;if(typeof Object.getOwnPropertyDescriptor=="function"){var u=Object.getOwnPropertyDescriptor(r,o);if(u.value!==i||u.enumerable!==!0)return!1}return!0},"hasSymbols")}}),Es=Z({"node_modules/has-symbols/index.js"(t,e){var r=typeof Symbol<"u"&&Symbol,o=Ts();e.exports=n(function(){return typeof r!="function"||typeof Symbol!="function"||typeof r("foo")!="symbol"||typeof Symbol("bar")!="symbol"?!1:o()},"hasNativeSymbols")}}),Xl=Z({"node_modules/function-bind/implementation.js"(t,e){var r="Function.prototype.bind called on incompatible ",o=Array.prototype.slice,a=Object.prototype.toString,i="[object Function]";e.exports=n(function(l){var u=this;if(typeof u!="function"||a.call(u)!==i)throw new TypeError(r+u);for(var c=o.call(arguments,1),d,m=n(function(){if(this instanceof d){var le=u.apply(this,c.concat(o.call(arguments)));return Object(le)===le?le:this}else return u.apply(l,c.concat(o.call(arguments)))},"binder"),h=Math.max(0,u.length-c.length),g=[],J=0;J<h;J++)g.push("$"+J);if(d=Function("binder","return function ("+g.join(",")+"){ return binder.apply(this,arguments); }")(m),u.prototype){var ne=n(function(){},"Empty2");ne.prototype=u.prototype,d.prototype=new ne,ne.prototype=null}return d},"bind")}}),To=Z({"node_modules/function-bind/index.js"(t,e){var r=Xl();e.exports=Function.prototype.bind||r}}),Jl=Z({"node_modules/has/src/index.js"(t,e){var r=To();e.exports=r.call(Function.call,Object.prototype.hasOwnProperty)}}),Rs=Z({"node_modules/get-intrinsic/index.js"(t,e){var r,o=SyntaxError,a=Function,i=TypeError,l=n(function(qe){try{return a('"use strict"; return ('+qe+").constructor;")()}catch{}},"getEvalledConstructor"),u=Object.getOwnPropertyDescriptor;if(u)try{u({},"")}catch{u=null}var c=n(function(){throw new i},"throwTypeError"),d=u?function(){try{return arguments.callee,c}catch{try{return u(arguments,"callee").get}catch{return c}}}():c,m=Es()(),h=Object.getPrototypeOf||function(qe){return qe.__proto__},g={},J=typeof Uint8Array>"u"?r:h(Uint8Array),ne={"%AggregateError%":typeof AggregateError>"u"?r:AggregateError,"%Array%":Array,"%ArrayBuffer%":typeof ArrayBuffer>"u"?r:ArrayBuffer,"%ArrayIteratorPrototype%":m?h([][Symbol.iterator]()):r,"%AsyncFromSyncIteratorPrototype%":r,"%AsyncFunction%":g,"%AsyncGenerator%":g,"%AsyncGeneratorFunction%":g,"%AsyncIteratorPrototype%":g,"%Atomics%":typeof Atomics>"u"?r:Atomics,"%BigInt%":typeof BigInt>"u"?r:BigInt,"%Boolean%":Boolean,"%DataView%":typeof DataView>"u"?r:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":typeof Float32Array>"u"?r:Float32Array,"%Float64Array%":typeof Float64Array>"u"?r:Float64Array,"%FinalizationRegistry%":typeof FinalizationRegistry>"u"?r:FinalizationRegistry,"%Function%":a,"%GeneratorFunction%":g,"%Int8Array%":typeof Int8Array>"u"?r:Int8Array,"%Int16Array%":typeof Int16Array>"u"?r:Int16Array,"%Int32Array%":typeof Int32Array>"u"?r:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":m?h(h([][Symbol.iterator]())):r,"%JSON%":typeof JSON=="object"?JSON:r,"%Map%":typeof Map>"u"?r:Map,"%MapIteratorPrototype%":typeof Map>"u"||!m?r:h(new Map()[Symbol.iterator]()),"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":typeof Promise>"u"?r:Promise,"%Proxy%":typeof Proxy>"u"?r:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":typeof Reflect>"u"?r:Reflect,"%RegExp%":RegExp,"%Set%":typeof Set>"u"?r:Set,"%SetIteratorPrototype%":typeof Set>"u"||!m?r:h(new Set()[Symbol.iterator]()),"%SharedArrayBuffer%":typeof SharedArrayBuffer>"u"?r:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":m?h(""[Symbol.iterator]()):r,"%Symbol%":m?Symbol:r,"%SyntaxError%":o,"%ThrowTypeError%":d,"%TypedArray%":J,"%TypeError%":i,"%Uint8Array%":typeof Uint8Array>"u"?r:Uint8Array,"%Uint8ClampedArray%":typeof Uint8ClampedArray>"u"?r:Uint8ClampedArray,"%Uint16Array%":typeof Uint16Array>"u"?r:Uint16Array,"%Uint32Array%":typeof Uint32Array>"u"?r:Uint32Array,"%URIError%":URIError,"%WeakMap%":typeof WeakMap>"u"?r:WeakMap,"%WeakRef%":typeof WeakRef>"u"?r:WeakRef,"%WeakSet%":typeof WeakSet>"u"?r:WeakSet},le=n(function qe(Dt){var p;if(Dt==="%AsyncFunction%")p=l("async function () {}");else if(Dt==="%GeneratorFunction%")p=l("function* () {}");else if(Dt==="%AsyncGeneratorFunction%")p=l("async function* () {}");else if(Dt==="%AsyncGenerator%"){var A=qe("%AsyncGeneratorFunction%");A&&(p=A.prototype)}else if(Dt==="%AsyncIteratorPrototype%"){var B=qe("%AsyncGenerator%");B&&(p=h(B.prototype))}return ne[Dt]=p,p},"doEval2"),re={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},ce=To(),F=Jl(),se=ce.call(Function.call,Array.prototype.concat),he=ce.call(Function.apply,Array.prototype.splice),Ve=ce.call(Function.call,String.prototype.replace),we=ce.call(Function.call,String.prototype.slice),ve=ce.call(Function.call,RegExp.prototype.exec),Nt=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,Bt=/\\(\\)?/g,Ft=n(function(qe){var Dt=we(qe,0,1),p=we(qe,-1);if(Dt==="%"&&p!=="%")throw new o("invalid intrinsic syntax, expected closing `%`");if(p==="%"&&Dt!=="%")throw new o("invalid intrinsic syntax, expected opening `%`");var A=[];return Ve(qe,Nt,function(B,de,pe,Lt){A[A.length]=pe?Ve(Lt,Bt,"$1"):de||B}),A},"stringToPath3"),jt=n(function(qe,Dt){var p=qe,A;if(F(re,p)&&(A=re[p],p="%"+A[0]+"%"),F(ne,p)){var B=ne[p];if(B===g&&(B=le(p)),typeof B>"u"&&!Dt)throw new i("intrinsic "+qe+" exists, but is not available. Please file an issue!");return{alias:A,name:p,value:B}}throw new o("intrinsic "+qe+" does not exist!")},"getBaseIntrinsic2");e.exports=n(function(qe,Dt){if(typeof qe!="string"||qe.length===0)throw new i("intrinsic name must be a non-empty string");if(arguments.length>1&&typeof Dt!="boolean")throw new i('"allowMissing" argument must be a boolean');if(ve(/^%?[^%]*%?$/,qe)===null)throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var p=Ft(qe),A=p.length>0?p[0]:"",B=jt("%"+A+"%",Dt),de=B.name,pe=B.value,Lt=!1,qt=B.alias;qt&&(A=qt[0],he(p,se([0,1],qt)));for(var Ut=1,Mt=!0;Ut<p.length;Ut+=1){var Gt=p[Ut],lr=we(Gt,0,1),zr=we(Gt,-1);if((lr==='"'||lr==="'"||lr==="`"||zr==='"'||zr==="'"||zr==="`")&&lr!==zr)throw new o("property names with quotes must have matching quotes");if((Gt==="constructor"||!Mt)&&(Lt=!0),A+="."+Gt,de="%"+A+"%",F(ne,de))pe=ne[de];else if(pe!=null){if(!(Gt in pe)){if(!Dt)throw new i("base intrinsic for "+qe+" exists, but the property is not available.");return}if(u&&Ut+1>=p.length){var Qr=u(pe,Gt);Mt=!!Qr,Mt&&"get"in Qr&&!("originalValue"in Qr.get)?pe=Qr.get:pe=pe[Gt]}else Mt=F(pe,Gt),pe=pe[Gt];Mt&&!Lt&&(ne[de]=pe)}}return pe},"GetIntrinsic")}}),Ql=Z({"node_modules/call-bind/index.js"(t,e){var r=To(),o=Rs(),a=o("%Function.prototype.apply%"),i=o("%Function.prototype.call%"),l=o("%Reflect.apply%",!0)||r.call(i,a),u=o("%Object.getOwnPropertyDescriptor%",!0),c=o("%Object.defineProperty%",!0),d=o("%Math.max%");if(c)try{c({},"a",{value:1})}catch{c=null}e.exports=n(function(h){var g=l(r,i,arguments);if(u&&c){var J=u(g,"length");J.configurable&&c(g,"length",{value:1+d(0,h.length-(arguments.length-1))})}return g},"callBind");var m=n(function(){return l(r,a,arguments)},"applyBind2");c?c(e.exports,"apply",{value:m}):e.exports.apply=m}}),Zl=Z({"node_modules/call-bind/callBound.js"(t,e){var r=Rs(),o=Ql(),a=o(r("String.prototype.indexOf"));e.exports=n(function(i,l){var u=r(i,!!l);return typeof u=="function"&&a(i,".prototype.")>-1?o(u):u},"callBoundIntrinsic")}}),ec=Z({"node_modules/has-tostringtag/shams.js"(t,e){var r=Ts();e.exports=n(function(){return r()&&!!Symbol.toStringTag},"hasToStringTagShams")}}),rc=Z({"node_modules/is-regex/index.js"(t,e){var r=Zl(),o=ec()(),a,i,l,u;o&&(a=r("Object.prototype.hasOwnProperty"),i=r("RegExp.prototype.exec"),l={},c=n(function(){throw l},"throwRegexMarker"),u={toString:c,valueOf:c},typeof Symbol.toPrimitive=="symbol"&&(u[Symbol.toPrimitive]=c));var c,d=r("Object.prototype.toString"),m=Object.getOwnPropertyDescriptor,h="[object RegExp]";e.exports=n(o?function(g){if(!g||typeof g!="object")return!1;var J=m(g,"lastIndex"),ne=J&&a(J,"value");if(!ne)return!1;try{i(g,u)}catch(le){return le===l}}:function(g){return!g||typeof g!="object"&&typeof g!="function"?!1:d(g)===h},"isRegex")}}),tc=Z({"node_modules/is-function/index.js"(t,e){e.exports=o;var r=Object.prototype.toString;function o(a){if(!a)return!1;var i=r.call(a);return i==="[object Function]"||typeof a=="function"&&i!=="[object RegExp]"||typeof window<"u"&&(a===window.setTimeout||a===window.alert||a===window.confirm||a===window.prompt)}n(o,"isFunction3")}}),oc=Z({"node_modules/is-symbol/index.js"(t,e){var r=Object.prototype.toString,o=Es()();o?(a=Symbol.prototype.toString,i=/^Symbol\(.*\)$/,l=n(function(u){return typeof u.valueOf()!="symbol"?!1:i.test(a.call(u))},"isRealSymbolObject"),e.exports=n(function(u){if(typeof u=="symbol")return!0;if(r.call(u)!=="[object Symbol]")return!1;try{return l(u)}catch{return!1}},"isSymbol3")):e.exports=n(function(u){return!1},"isSymbol3");var a,i,l}}),nc=st(rc()),sc=st(tc()),ic=st(oc());function ac(t){return t!=null&&typeof t=="object"&&Array.isArray(t)===!1}n(ac,"isObject");var lc=typeof global=="object"&&global&&global.Object===Object&&global,cc=lc,pc=typeof self=="object"&&self&&self.Object===Object&&self,dc=cc||pc||Function("return this")(),Eo=dc,uc=Eo.Symbol,Ye=uc,As=Object.prototype,fc=As.hasOwnProperty,yc=As.toString,hr=Ye?Ye.toStringTag:void 0;function mc(t){var e=fc.call(t,hr),r=t[hr];try{t[hr]=void 0;var o=!0}catch{}var a=yc.call(t);return o&&(e?t[hr]=r:delete t[hr]),a}n(mc,"getRawTag");var hc=mc,gc=Object.prototype,Sc=gc.toString;function bc(t){return Sc.call(t)}n(bc,"objectToString");var Tc=bc,Ec="[object Null]",Rc="[object Undefined]",ms=Ye?Ye.toStringTag:void 0;function Ac(t){return t==null?t===void 0?Rc:Ec:ms&&ms in Object(t)?hc(t):Tc(t)}n(Ac,"baseGetTag");var xs=Ac;function xc(t){return t!=null&&typeof t=="object"}n(xc,"isObjectLike");var vc=xc,wc="[object Symbol]";function _c(t){return typeof t=="symbol"||vc(t)&&xs(t)==wc}n(_c,"isSymbol");var Ro=_c;function Cc(t,e){for(var r=-1,o=t==null?0:t.length,a=Array(o);++r<o;)a[r]=e(t[r],r,t);return a}n(Cc,"arrayMap");var Pc=Cc,Oc=Array.isArray,Ao=Oc,hs=Ye?Ye.prototype:void 0,gs=hs?hs.toString:void 0;function vs(t){if(typeof t=="string")return t;if(Ao(t))return Pc(t,vs)+"";if(Ro(t))return gs?gs.call(t):"";var e=t+"";return e=="0"&&1/t==-1/0?"-0":e}n(vs,"baseToString");var Fc=vs;function Dc(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}n(Dc,"isObject2");var ws=Dc,Nc="[object AsyncFunction]",kc="[object Function]",Lc="[object GeneratorFunction]",jc="[object Proxy]";function Mc(t){if(!ws(t))return!1;var e=xs(t);return e==kc||e==Lc||e==Nc||e==jc}n(Mc,"isFunction");var Uc=Mc,Gc=Eo["__core-js_shared__"],bo=Gc,Ss=function(){var t=/[^.]+$/.exec(bo&&bo.keys&&bo.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function qc(t){return!!Ss&&Ss in t}n(qc,"isMasked");var Bc=qc,Vc=Function.prototype,Hc=Vc.toString;function zc(t){if(t!=null){try{return Hc.call(t)}catch{}try{return t+""}catch{}}return""}n(zc,"toSource");var Wc=zc,$c=/[\\^$.*+?()[\]{}|]/g,Yc=/^\[object .+?Constructor\]$/,Kc=Function.prototype,Xc=Object.prototype,Jc=Kc.toString,Qc=Xc.hasOwnProperty,Zc=RegExp("^"+Jc.call(Qc).replace($c,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function ep(t){if(!ws(t)||Bc(t))return!1;var e=Uc(t)?Zc:Yc;return e.test(Wc(t))}n(ep,"baseIsNative");var rp=ep;function tp(t,e){return t==null?void 0:t[e]}n(tp,"getValue");var op=tp;function np(t,e){var r=op(t,e);return rp(r)?r:void 0}n(np,"getNative");var _s=np;function sp(t,e){return t===e||t!==t&&e!==e}n(sp,"eq");var ip=sp,ap=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,lp=/^\w*$/;function cp(t,e){if(Ao(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||Ro(t)?!0:lp.test(t)||!ap.test(t)||e!=null&&t in Object(e)}n(cp,"isKey");var pp=cp,dp=_s(Object,"create"),gr=dp;function up(){this.__data__=gr?gr(null):{},this.size=0}n(up,"hashClear");var fp=up;function yp(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}n(yp,"hashDelete");var mp=yp,hp="__lodash_hash_undefined__",gp=Object.prototype,Sp=gp.hasOwnProperty;function bp(t){var e=this.__data__;if(gr){var r=e[t];return r===hp?void 0:r}return Sp.call(e,t)?e[t]:void 0}n(bp,"hashGet");var Tp=bp,Ep=Object.prototype,Rp=Ep.hasOwnProperty;function Ap(t){var e=this.__data__;return gr?e[t]!==void 0:Rp.call(e,t)}n(Ap,"hashHas");var xp=Ap,vp="__lodash_hash_undefined__";function wp(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=gr&&e===void 0?vp:e,this}n(wp,"hashSet");var _p=wp;function Ke(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}n(Ke,"Hash");Ke.prototype.clear=fp;Ke.prototype.delete=mp;Ke.prototype.get=Tp;Ke.prototype.has=xp;Ke.prototype.set=_p;var bs=Ke;function Cp(){this.__data__=[],this.size=0}n(Cp,"listCacheClear");var Pp=Cp;function Op(t,e){for(var r=t.length;r--;)if(ip(t[r][0],e))return r;return-1}n(Op,"assocIndexOf");var lt=Op,Ip=Array.prototype,Fp=Ip.splice;function Dp(t){var e=this.__data__,r=lt(e,t);if(r<0)return!1;var o=e.length-1;return r==o?e.pop():Fp.call(e,r,1),--this.size,!0}n(Dp,"listCacheDelete");var Np=Dp;function kp(t){var e=this.__data__,r=lt(e,t);return r<0?void 0:e[r][1]}n(kp,"listCacheGet");var Lp=kp;function jp(t){return lt(this.__data__,t)>-1}n(jp,"listCacheHas");var Mp=jp;function Up(t,e){var r=this.__data__,o=lt(r,t);return o<0?(++this.size,r.push([t,e])):r[o][1]=e,this}n(Up,"listCacheSet");var Gp=Up;function Xe(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}n(Xe,"ListCache");Xe.prototype.clear=Pp;Xe.prototype.delete=Np;Xe.prototype.get=Lp;Xe.prototype.has=Mp;Xe.prototype.set=Gp;var qp=Xe,Bp=_s(Eo,"Map"),Vp=Bp;function Hp(){this.size=0,this.__data__={hash:new bs,map:new(Vp||qp),string:new bs}}n(Hp,"mapCacheClear");var zp=Hp;function Wp(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}n(Wp,"isKeyable");var $p=Wp;function Yp(t,e){var r=t.__data__;return $p(e)?r[typeof e=="string"?"string":"hash"]:r.map}n(Yp,"getMapData");var ct=Yp;function Kp(t){var e=ct(this,t).delete(t);return this.size-=e?1:0,e}n(Kp,"mapCacheDelete");var Xp=Kp;function Jp(t){return ct(this,t).get(t)}n(Jp,"mapCacheGet");var Qp=Jp;function Zp(t){return ct(this,t).has(t)}n(Zp,"mapCacheHas");var ed=Zp;function rd(t,e){var r=ct(this,t),o=r.size;return r.set(t,e),this.size+=r.size==o?0:1,this}n(rd,"mapCacheSet");var td=rd;function Je(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}n(Je,"MapCache");Je.prototype.clear=zp;Je.prototype.delete=Xp;Je.prototype.get=Qp;Je.prototype.has=ed;Je.prototype.set=td;var Cs=Je,od="Expected a function";function xo(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(od);var r=n(function(){var o=arguments,a=e?e.apply(this,o):o[0],i=r.cache;if(i.has(a))return i.get(a);var l=t.apply(this,o);return r.cache=i.set(a,l)||i,l},"memoized");return r.cache=new(xo.Cache||Cs),r}n(xo,"memoize");xo.Cache=Cs;var nd=xo,sd=500;function id(t){var e=nd(t,function(o){return r.size===sd&&r.clear(),o}),r=e.cache;return e}n(id,"memoizeCapped");var ad=id,ld=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,cd=/\\(\\)?/g,pd=ad(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(ld,function(r,o,a,i){e.push(a?i.replace(cd,"$1"):o||r)}),e}),dd=pd;function ud(t){return t==null?"":Fc(t)}n(ud,"toString");var fd=ud;function yd(t,e){return Ao(t)?t:pp(t,e)?[t]:dd(fd(t))}n(yd,"castPath");var md=yd;function gd(t){if(typeof t=="string"||Ro(t))return t;var e=t+"";return e=="0"&&1/t==-1/0?"-0":e}n(gd,"toKey");var Sd=gd;function bd(t,e){e=md(e,t);for(var r=0,o=e.length;t!=null&&r<o;)t=t[Sd(e[r++])];return r&&r==o?t:void 0}n(bd,"baseGet");var Td=bd;function Ed(t,e,r){var o=t==null?void 0:Td(t,e);return o===void 0?r:o}n(Ed,"get");var Rd=Ed,at=ac,Ad=n(t=>{let e=null,r=!1,o=!1,a=!1,i="";if(t.indexOf("//")>=0||t.indexOf("/*")>=0)for(let l=0;l<t.length;l+=1)!e&&!r&&!o&&!a?t[l]==='"'||t[l]==="'"||t[l]==="`"?e=t[l]:t[l]==="/"&&t[l+1]==="*"?r=!0:t[l]==="/"&&t[l+1]==="/"?o=!0:t[l]==="/"&&t[l+1]!=="/"&&(a=!0):(e&&(t[l]===e&&t[l-1]!=="\\"||t[l]===`
`&&e!=="`")&&(e=null),a&&(t[l]==="/"&&t[l-1]!=="\\"||t[l]===`
`)&&(a=!1),r&&t[l-1]==="/"&&t[l-2]==="*"&&(r=!1),o&&t[l]===`
`&&(o=!1)),!r&&!o&&(i+=t[l]);else i=t;return i},"removeCodeComments"),xd=(0,Ps.default)(1e4)(t=>Ad(t).replace(/\n\s*/g,"").trim()),vd=n(function(t,e){let r=e.slice(0,e.indexOf("{")),o=e.slice(e.indexOf("{"));if(r.includes("=>")||r.includes("function"))return e;let a=r;return a=a.replace(t,"function"),a+o},"convertShorthandMethods2"),wd=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,Sr=n(t=>t.match(/^[\[\{\"\}].*[\]\}\"]$/),"isJSON");function Os(t){if(!at(t))return t;let e=t,r=!1;return typeof Event<"u"&&t instanceof Event&&(e=fs(e),r=!0),e=Object.keys(e).reduce((o,a)=>{try{e[a]&&e[a].toJSON,o[a]=e[a]}catch{r=!0}return o},{}),r?e:t}n(Os,"convertUnconventionalData");var _d=n(function(t){let e,r,o,a;return n(function(i,l){try{if(i==="")return a=[],e=new Map([[l,"[]"]]),r=new Map,o=[],l;let u=r.get(this)||this;for(;o.length&&u!==o[0];)o.shift(),a.pop();if(typeof l=="boolean")return l;if(l===void 0)return t.allowUndefined?"_undefined_":void 0;if(l===null)return null;if(typeof l=="number")return l===-1/0?"_-Infinity_":l===1/0?"_Infinity_":Number.isNaN(l)?"_NaN_":l;if(typeof l=="bigint")return`_bigint_${l.toString()}`;if(typeof l=="string")return wd.test(l)?t.allowDate?`_date_${l}`:void 0:l;if((0,nc.default)(l))return t.allowRegExp?`_regexp_${l.flags}|${l.source}`:void 0;if((0,sc.default)(l)){if(!t.allowFunction)return;let{name:d}=l,m=l.toString();return m.match(/(\[native code\]|WEBPACK_IMPORTED_MODULE|__webpack_exports__|__webpack_require__)/)?`_function_${d}|${(()=>{}).toString()}`:`_function_${d}|${xd(vd(i,m))}`}if((0,ic.default)(l)){if(!t.allowSymbol)return;let d=Symbol.keyFor(l);return d!==void 0?`_gsymbol_${d}`:`_symbol_${l.toString().slice(7,-1)}`}if(o.length>=t.maxDepth)return Array.isArray(l)?`[Array(${l.length})]`:"[Object]";if(l===this)return`_duplicate_${JSON.stringify(a)}`;if(l instanceof Error&&t.allowError)return{__isConvertedError__:!0,errorProperties:{...l.cause?{cause:l.cause}:{},...l,name:l.name,message:l.message,stack:l.stack,"_constructor-name_":l.constructor.name}};if(l.constructor&&l.constructor.name&&l.constructor.name!=="Object"&&!Array.isArray(l)&&!t.allowClass)return;let c=e.get(l);if(!c){let d=Array.isArray(l)?l:Os(l);if(l.constructor&&l.constructor.name&&l.constructor.name!=="Object"&&!Array.isArray(l)&&t.allowClass)try{Object.assign(d,{"_constructor-name_":l.constructor.name})}catch{}return a.push(i),o.unshift(d),e.set(l,JSON.stringify(a)),l!==d&&r.set(l,d),d}return`_duplicate_${c}`}catch{return}},"replace")},"replacer2"),Cd=n(function reviver(options){let refs=[],root;return n(function revive(key,value){if(key===""&&(root=value,refs.forEach(({target:t,container:e,replacement:r})=>{let o=Sr(r)?JSON.parse(r):r.split(".");o.length===0?e[t]=root:e[t]=Rd(root,o)})),key==="_constructor-name_")return value;if(at(value)&&value.__isConvertedError__){let{message:t,...e}=value.errorProperties,r=new Error(t);return Object.assign(r,e),r}if(at(value)&&value["_constructor-name_"]&&options.allowFunction){let t=value["_constructor-name_"];if(t!=="Object"){let e=new Function(`return function ${t.replace(/[^a-zA-Z0-9$_]+/g,"")}(){}`)();Object.setPrototypeOf(value,new e)}return delete value["_constructor-name_"],value}if(typeof value=="string"&&value.startsWith("_function_")&&options.allowFunction){let[,name,source]=value.match(/_function_([^|]*)\|(.*)/)||[],sourceSanitized=source.replace(/[(\(\))|\\| |\]|`]*$/,"");if(!options.lazyEval)return eval(`(${sourceSanitized})`);let result=n((...args)=>{let f=eval(`(${sourceSanitized})`);return f(...args)},"result");return Object.defineProperty(result,"toString",{value:n(()=>sourceSanitized,"value")}),Object.defineProperty(result,"name",{value:name}),result}if(typeof value=="string"&&value.startsWith("_regexp_")&&options.allowRegExp){let[,t,e]=value.match(/_regexp_([^|]*)\|(.*)/)||[];return new RegExp(e,t)}return typeof value=="string"&&value.startsWith("_date_")&&options.allowDate?new Date(value.replace("_date_","")):typeof value=="string"&&value.startsWith("_duplicate_")?(refs.push({target:key,container:this,replacement:value.replace(/^_duplicate_/,"")}),null):typeof value=="string"&&value.startsWith("_symbol_")&&options.allowSymbol?Symbol(value.replace("_symbol_","")):typeof value=="string"&&value.startsWith("_gsymbol_")&&options.allowSymbol?Symbol.for(value.replace("_gsymbol_","")):typeof value=="string"&&value==="_-Infinity_"?-1/0:typeof value=="string"&&value==="_Infinity_"?1/0:typeof value=="string"&&value==="_NaN_"?NaN:typeof value=="string"&&value.startsWith("_bigint_")&&typeof BigInt=="function"?BigInt(value.replace("_bigint_","")):value},"revive")},"reviver"),Is={maxDepth:10,space:void 0,allowFunction:!0,allowRegExp:!0,allowDate:!0,allowClass:!0,allowError:!0,allowUndefined:!0,allowSymbol:!0,lazyEval:!0},pt=n((t,e={})=>{let r={...Is,...e};return JSON.stringify(Os(t),_d(r),e.space)},"stringify"),Pd=n(()=>{let t=new Map;return n(function e(r){at(r)&&Object.entries(r).forEach(([o,a])=>{a==="_undefined_"?r[o]=void 0:t.get(a)||(t.set(a,!0),e(a))}),Array.isArray(r)&&r.forEach((o,a)=>{o==="_undefined_"?(t.set(o,!0),r[a]=void 0):t.get(o)||(t.set(o,!0),e(o))})},"mutateUndefined")},"mutator"),dt=n((t,e={})=>{let r={...Is,...e},o=JSON.parse(t,Cd(r));return Pd()(o),o},"parse"),vo="Invariant failed";function fe(t,e){if(!t)throw new Error(vo)}n(fe,"invariant");var Fs=n(t=>{let e=Array.from(document.querySelectorAll("iframe[data-is-storybook]")),[r,...o]=e.filter(i=>{var c,d;try{return((c=i.contentWindow)==null?void 0:c.location.origin)===t.source.location.origin&&((d=i.contentWindow)==null?void 0:d.location.pathname)===t.source.location.pathname}catch{}try{return i.contentWindow===t.source}catch{}let l=i.getAttribute("src"),u;try{if(!l)return!1;({origin:u}=new URL(l,document.location.toString()))}catch{return!1}return u===t.origin}),a=r==null?void 0:r.getAttribute("src");if(a&&o.length===0){let{protocol:i,host:l,pathname:u}=new URL(a,document.location.toString());return`${i}//${l}${u}`}return o.length>0&&I$1.error("found multiple candidates for event source"),null},"getEventSourceUrl"),{document:wo,location:_o}=E$1,Ds="storybook-channel",Id={allowFunction:!1,maxDepth:25},Co=class{constructor(e){if(this.config=e,this.connected=!1,this.buffer=[],typeof(E$1==null?void 0:E$1.addEventListener)=="function"&&E$1.addEventListener("message",this.handleEvent.bind(this),!1),e.page!=="manager"&&e.page!=="preview")throw new Error(`postmsg-channel: "config.page" cannot be "${e.page}"`)}setHandler(e){this.handler=(...r)=>{e.apply(this,r),!this.connected&&this.getLocalFrame().length&&(this.flush(),this.connected=!0)}}send(e,r){let{target:o,allowRegExp:a,allowFunction:i,allowSymbol:l,allowDate:u,allowError:c,allowUndefined:d,allowClass:m,maxDepth:h,space:g,lazyEval:J}=r||{},ne=Object.fromEntries(Object.entries({allowRegExp:a,allowFunction:i,allowSymbol:l,allowDate:u,allowError:c,allowUndefined:d,allowClass:m,maxDepth:h,space:g,lazyEval:J}).filter(([se,he])=>typeof he<"u")),le={...Id,...E$1.CHANNEL_OPTIONS||{},...ne},re=this.getFrames(o),ce=new URLSearchParams((_o==null?void 0:_o.search)||""),F=pt({key:Ds,event:e,refId:ce.get("refId")},le);return re.length?(this.buffer.length&&this.flush(),re.forEach(se=>{try{se.postMessage(F,"*")}catch{I$1.error("sending over postmessage fail")}}),Promise.resolve(null)):new Promise((se,he)=>{this.buffer.push({event:e,resolve:se,reject:he})})}flush(){let{buffer:e}=this;this.buffer=[],e.forEach(r=>{this.send(r.event).then(r.resolve).catch(r.reject)})}getFrames(e){if(this.config.page==="manager"){let r=Array.from(wo.querySelectorAll("iframe[data-is-storybook][data-is-loaded]")).flatMap(o=>{try{return o.contentWindow&&o.dataset.isStorybook!==void 0&&o.id===e?[o.contentWindow]:[]}catch{return[]}});return r!=null&&r.length?r:this.getCurrentFrames()}return E$1&&E$1.parent&&E$1.parent!==E$1.self?[E$1.parent]:[]}getCurrentFrames(){return this.config.page==="manager"?Array.from(wo.querySelectorAll('[data-is-storybook="true"]')).flatMap(e=>e.contentWindow?[e.contentWindow]:[]):E$1&&E$1.parent?[E$1.parent]:[]}getLocalFrame(){return this.config.page==="manager"?Array.from(wo.querySelectorAll("#storybook-preview-iframe")).flatMap(e=>e.contentWindow?[e.contentWindow]:[]):E$1&&E$1.parent?[E$1.parent]:[]}handleEvent(e){try{let{data:r}=e,{key:o,event:a,refId:i}=typeof r=="string"&&Sr(r)?dt(r,E$1.CHANNEL_OPTIONS||{}):r;if(o===Ds){let l=this.config.page==="manager"?'<span style="color: #37D5D3; background: black"> manager </span>':'<span style="color: #1EA7FD; background: black"> preview </span>',u=Object.values(ge).includes(a.type)?`<span style="color: #FF4785">${a.type}</span>`:`<span style="color: #FFAE00">${a.type}</span>`;if(i&&(a.refId=i),a.source=this.config.page==="preview"?e.origin:Fs(e),!a.source){X.error(`${l} received ${u} but was unable to determine the source of the event`);return}let c=`${l} received ${u} (${r.length})`;X.debug(_o.origin!==a.source?c:`${c} <span style="color: gray">(on ${_o.origin} from ${a.source})</span>`,...a.args),fe(this.handler,"ChannelHandler should be set"),this.handler(a)}}catch(r){I$1.error(r)}}};n(Co,"PostMessageTransport");var Qe=Co,{WebSocket:Fd}=E$1,Po=15e3,Oo=5e3,Io=class{constructor({url:e,onError:r,page:o}){this.buffer=[],this.isReady=!1,this.isClosed=!1,this.pingTimeout=0,this.socket=new Fd(e),this.socket.onopen=()=>{this.isReady=!0,this.heartbeat(),this.flush()},this.socket.onmessage=({data:a})=>{let i=typeof a=="string"&&Sr(a)?dt(a):a;fe(this.handler),this.handler(i),i.type==="ping"&&(this.heartbeat(),this.send({type:"pong"}))},this.socket.onerror=a=>{r&&r(a)},this.socket.onclose=a=>{fe(this.handler),this.handler({type:Wt,args:[{reason:a.reason,code:a.code}],from:o||"preview"}),this.isClosed=!0,clearTimeout(this.pingTimeout)}}heartbeat(){clearTimeout(this.pingTimeout),this.pingTimeout=setTimeout(()=>{this.socket.close(3008,"timeout")},Po+Oo)}setHandler(e){this.handler=e}send(e){this.isClosed||(this.isReady?this.sendNow(e):this.sendLater(e))}sendLater(e){this.buffer.push(e)}sendNow(e){let r=pt(e,{maxDepth:15,allowFunction:!1,...E$1.CHANNEL_OPTIONS});this.socket.send(r)}flush(){let{buffer:e}=this;this.buffer=[],e.forEach(r=>this.send(r))}};n(Io,"WebsocketTransport");var Ze=Io,{CONFIG_TYPE:Dd}=E$1,Nd=ie;function kd({page:t,extraTransports:e=[]}){let r=[new Qe({page:t}),...e];if(Dd==="DEVELOPMENT"){let a=window.location.protocol==="http:"?"ws":"wss",{hostname:i,port:l}=window.location,u=`${a}://${i}:${l}/storybook-server-channel`;r.push(new Ze({url:u,onError:n(()=>{},"onError"),page:t}))}let o=new ie({transports:r});return Q.__prepare(o,t==="manager"?Q.Environment.MANAGER:Q.Environment.PREVIEW),o}n(kd,"createBrowserChannel");var Tr={};_e(Tr,{Addon_TypesEnum:()=>Ns});var Ns=(t=>(t.TAB="tab",t.PANEL="panel",t.TOOL="tool",t.TOOLEXTRA="toolextra",t.PREVIEW="preview",t.experimental_PAGE="page",t.experimental_SIDEBAR_BOTTOM="sidebar-bottom",t.experimental_SIDEBAR_TOP="sidebar-top",t.experimental_TEST_PROVIDER="test-provider",t))(Ns||{}),Yr={};_e(Yr,{DocsContext:()=>me,HooksContext:()=>be,Preview:()=>Me,PreviewWeb:()=>Wr,PreviewWithSelection:()=>Ue,ReporterAPI:()=>Ee,StoryStore:()=>Le,UrlStore:()=>Be,WebView:()=>He,addons:()=>te$1,applyHooks:()=>ft,combineArgs:()=>tr,combineParameters:()=>Y,composeConfigs:()=>ke,composeStepRunners:()=>Ct,composeStories:()=>qi,composeStory:()=>Pn,createPlaywrightTest:()=>Bi,decorateStory:()=>xn,defaultDecorateStory:()=>vt,definePreview:()=>ks,experimental_MockUniversalStore:()=>gt,experimental_UniversalStore:()=>Q,experimental_useUniversalStore:()=>Si,filterArgTypes:()=>Mr,getCsfFactoryAnnotations:()=>Pt,inferControls:()=>ir,makeDecorator:()=>$s,mockChannel:()=>ut,normalizeProjectAnnotations:()=>Ne,normalizeStory:()=>De,prepareMeta:()=>wt,prepareStory:()=>sr,sanitizeStoryContextUpdate:()=>vn,setDefaultProjectAnnotations:()=>Ui,setProjectAnnotations:()=>Gi,simulateDOMContentLoaded:()=>$r,simulatePageLoad:()=>ss,sortStoriesV7:()=>Ki,useArgs:()=>zs,useCallback:()=>er,useChannel:()=>Vs,useEffect:()=>Er,useGlobals:()=>Ws,useMemo:()=>Ms,useParameter:()=>Hs,useReducer:()=>Bs,useRef:()=>Gs,useState:()=>mt,useStoryContext:()=>Rr,userOrAutoTitle:()=>Wi,userOrAutoTitleFromSpecifier:()=>Fn});function ut(){let t={setHandler:n(()=>{},"setHandler"),send:n(()=>{},"send")};return new ie({transport:t})}n(ut,"mockChannel");var No=class{constructor(){this.getChannel=n(()=>{if(!this.channel){let e=ut();return this.setChannel(e),e}return this.channel},"getChannel"),this.ready=n(()=>this.promise,"ready"),this.hasChannel=n(()=>!!this.channel,"hasChannel"),this.setChannel=n(e=>{this.channel=e,this.resolve()},"setChannel"),this.promise=new Promise(e=>{this.resolve=()=>e(this.getChannel())})}};n(No,"AddonStore");var Do=No,Fo="__STORYBOOK_ADDONS_PREVIEW";function Ld(){return E$1[Fo]||(E$1[Fo]=new Do),E$1[Fo]}n(Ld,"getAddonsStore");var te$1=Ld();function ks(t){return t}n(ks,"definePreview");var Mo=class{constructor(){this.hookListsMap=void 0,this.mountedDecorators=void 0,this.prevMountedDecorators=void 0,this.currentHooks=void 0,this.nextHookIndex=void 0,this.currentPhase=void 0,this.currentEffects=void 0,this.prevEffects=void 0,this.currentDecoratorName=void 0,this.hasUpdates=void 0,this.currentContext=void 0,this.renderListener=n(e=>{var r;e===((r=this.currentContext)==null?void 0:r.id)&&(this.triggerEffects(),this.currentContext=null,this.removeRenderListeners())},"renderListener"),this.init()}init(){this.hookListsMap=new WeakMap,this.mountedDecorators=new Set,this.prevMountedDecorators=new Set,this.currentHooks=[],this.nextHookIndex=0,this.currentPhase="NONE",this.currentEffects=[],this.prevEffects=[],this.currentDecoratorName=null,this.hasUpdates=!1,this.currentContext=null}clean(){this.prevEffects.forEach(e=>{e.destroy&&e.destroy()}),this.init(),this.removeRenderListeners()}getNextHook(){let e=this.currentHooks[this.nextHookIndex];return this.nextHookIndex+=1,e}triggerEffects(){this.prevEffects.forEach(e=>{!this.currentEffects.includes(e)&&e.destroy&&e.destroy()}),this.currentEffects.forEach(e=>{this.prevEffects.includes(e)||(e.destroy=e.create())}),this.prevEffects=this.currentEffects,this.currentEffects=[]}addRenderListeners(){this.removeRenderListeners(),te$1.getChannel().on(We,this.renderListener)}removeRenderListeners(){te$1.getChannel().removeListener(We,this.renderListener)}};n(Mo,"HooksContext");var be=Mo;function Ls(t){let e=n((...r)=>{let{hooks:o}=typeof r[0]=="function"?r[1]:r[0],a=o.currentPhase,i=o.currentHooks,l=o.nextHookIndex,u=o.currentDecoratorName;o.currentDecoratorName=t.name,o.prevMountedDecorators.has(t)?(o.currentPhase="UPDATE",o.currentHooks=o.hookListsMap.get(t)||[]):(o.currentPhase="MOUNT",o.currentHooks=[],o.hookListsMap.set(t,o.currentHooks),o.prevMountedDecorators.add(t)),o.nextHookIndex=0;let c=E$1.STORYBOOK_HOOKS_CONTEXT;E$1.STORYBOOK_HOOKS_CONTEXT=o;let d=t(...r);if(E$1.STORYBOOK_HOOKS_CONTEXT=c,o.currentPhase==="UPDATE"&&o.getNextHook()!=null)throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");return o.currentPhase=a,o.currentHooks=i,o.nextHookIndex=l,o.currentDecoratorName=u,d},"hookified");return e.originalFn=t,e}n(Ls,"hookify");var ko=0,jd=25,ft=n(t=>(e,r)=>{let o=t(Ls(e),r.map(a=>Ls(a)));return a=>{let{hooks:i}=a;i.prevMountedDecorators??(i.prevMountedDecorators=new Set),i.mountedDecorators=new Set([e,...r]),i.currentContext=a,i.hasUpdates=!1;let l=o(a);for(ko=1;i.hasUpdates;)if(i.hasUpdates=!1,i.currentEffects=[],l=o(a),ko+=1,ko>jd)throw new Error("Too many re-renders. Storybook limits the number of renders to prevent an infinite loop.");return i.addRenderListeners(),l}},"applyHooks"),Md=n((t,e)=>t.length===e.length&&t.every((r,o)=>r===e[o]),"areDepsEqual"),Lo=n(()=>new Error("Storybook preview hooks can only be called inside decorators and story functions."),"invalidHooksError");function js(){return E$1.STORYBOOK_HOOKS_CONTEXT||null}n(js,"getHooksContextOrNull");function jo(){let t=js();if(t==null)throw Lo();return t}n(jo,"getHooksContextOrThrow");function Ud(t,e,r){let o=jo();if(o.currentPhase==="MOUNT"){r!=null&&!Array.isArray(r)&&I$1.warn(`${t} received a final argument that is not an array (instead, received ${r}). When specified, the final argument must be an array.`);let a={name:t,deps:r};return o.currentHooks.push(a),e(a),a}if(o.currentPhase==="UPDATE"){let a=o.getNextHook();if(a==null)throw new Error("Rendered more hooks than during the previous render.");return a.name!==t&&I$1.warn(`Storybook has detected a change in the order of Hooks${o.currentDecoratorName?` called by ${o.currentDecoratorName}`:""}. This will lead to bugs and errors if not fixed.`),r!=null&&a.deps==null&&I$1.warn(`${t} received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.`),r!=null&&a.deps!=null&&r.length!==a.deps.length&&I$1.warn(`The final argument passed to ${t} changed size between renders. The order and size of this array must remain constant.
Previous: ${a.deps}
Incoming: ${r}`),(r==null||a.deps==null||!Md(r,a.deps))&&(e(a),a.deps=r),a}throw Lo()}n(Ud,"useHook");function yt(t,e,r){let{memoizedState:o}=Ud(t,a=>{a.memoizedState=e()},r);return o}n(yt,"useMemoLike");function Ms(t,e){return yt("useMemo",t,e)}n(Ms,"useMemo");function er(t,e){return yt("useCallback",()=>t,e)}n(er,"useCallback");function Us(t,e){return yt(t,()=>({current:e}),[])}n(Us,"useRefLike");function Gs(t){return Us("useRef",t)}n(Gs,"useRef");function Gd(){let t=js();if(t!=null&&t.currentPhase!=="NONE")t.hasUpdates=!0;else try{te$1.getChannel().emit(dr)}catch{I$1.warn("State updates of Storybook preview hooks work only in browser")}}n(Gd,"triggerUpdate");function qs(t,e){let r=Us(t,typeof e=="function"?e():e),o=n(a=>{r.current=typeof a=="function"?a(r.current):a,Gd()},"setState");return[r.current,o]}n(qs,"useStateLike");function mt(t){return qs("useState",t)}n(mt,"useState");function Bs(t,e,r){let o=r!=null?()=>r(e):e,[a,i]=qs("useReducer",o);return[a,n(l=>i(u=>t(u,l)),"dispatch")]}n(Bs,"useReducer");function Er(t,e){let r=jo(),o=yt("useEffect",()=>({create:t}),e);r.currentEffects.includes(o)||r.currentEffects.push(o)}n(Er,"useEffect");function Vs(t,e=[]){let r=te$1.getChannel();return Er(()=>(Object.entries(t).forEach(([o,a])=>r.on(o,a)),()=>{Object.entries(t).forEach(([o,a])=>r.removeListener(o,a))}),[...Object.keys(t),...e]),er(r.emit.bind(r),[r])}n(Vs,"useChannel");function Rr(){let{currentContext:t}=jo();if(t==null)throw Lo();return t}n(Rr,"useStoryContext");function Hs(t,e){let{parameters:r}=Rr();if(t)return r[t]??e}n(Hs,"useParameter");function zs(){let t=te$1.getChannel(),{id:e,args:r}=Rr(),o=er(i=>t.emit(yr,{storyId:e,updatedArgs:i}),[t,e]),a=er(i=>t.emit(ur,{storyId:e,argNames:i}),[t,e]);return[r,o,a]}n(zs,"useArgs");function Ws(){let t=te$1.getChannel(),{globals:e}=Rr(),r=er(o=>t.emit(fr,{globals:o}),[t]);return[e,r]}n(Ws,"useGlobals");var $s=n(({name:t,parameterName:e,wrapper:r,skipIfNoParametersOrOptions:o=!1})=>{let a=n(i=>(l,u)=>{let c=u.parameters&&u.parameters[e];return c&&c.disable||o&&!i&&!c?l(u):r(l,u,{options:i,parameters:c})},"decorator");return(...i)=>typeof i[0]=="function"?a()(...i):(...l)=>{if(l.length>1)return i.length>1?a(i)(...l):a(...i)(...l);throw new Error(`Passing stories directly into ${t}() is not allowed,
        instead use addDecorator(${t}) and pass options with the '${e}' parameter`)}},"makeDecorator");function Uo(t,e){let r={},o=Object.entries(t);for(let a=0;a<o.length;a++){let[i,l]=o[a];e(l,i)||(r[i]=l)}return r}n(Uo,"omitBy");function Go(t,e){let r={};for(let o=0;o<e.length;o++){let a=e[o];Object.prototype.hasOwnProperty.call(t,a)&&(r[a]=t[a])}return r}n(Go,"pick");function qo(t,e){let r={},o=Object.entries(t);for(let a=0;a<o.length;a++){let[i,l]=o[a];e(l,i)&&(r[i]=l)}return r}n(qo,"pickBy");function $$1(t){if(typeof t!="object"||t==null)return!1;if(Object.getPrototypeOf(t)===null)return!0;if(t.toString()!=="[object Object]")return!1;let e=t;for(;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}n($$1,"isPlainObject");function oe(t,e){let r={},o=Object.keys(t);for(let a=0;a<o.length;a++){let i=o[a],l=t[i];r[i]=e(l,i,t)}return r}n(oe,"mapValues");var Ys="[object RegExp]",Ks="[object String]",Xs="[object Number]",Js="[object Boolean]",Bo="[object Arguments]",Qs="[object Symbol]",Zs="[object Date]",ei="[object Map]",ri="[object Set]",ti="[object Array]",oi="[object Function]",ni="[object ArrayBuffer]",ht="[object Object]",si="[object Error]",ii="[object DataView]",ai="[object Uint8Array]",li="[object Uint8ClampedArray]",ci="[object Uint16Array]",pi="[object Uint32Array]",di="[object BigUint64Array]",ui="[object Int8Array]",fi="[object Int16Array]",yi="[object Int32Array]",mi="[object BigInt64Array]",hi="[object Float32Array]",gi="[object Float64Array]";function Vo(t){return Object.getOwnPropertySymbols(t).filter(e=>Object.prototype.propertyIsEnumerable.call(t,e))}n(Vo,"getSymbols");function Ho(t){return t==null?t===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}n(Ho,"getTag");function Ar(t,e){if(typeof t==typeof e)switch(typeof t){case"bigint":case"string":case"boolean":case"symbol":case"undefined":return t===e;case"number":return t===e||Object.is(t,e);case"function":return t===e;case"object":return ye(t,e)}return ye(t,e)}n(Ar,"isEqual");function ye(t,e,r){if(Object.is(t,e))return!0;let o=Ho(t),a=Ho(e);if(o===Bo&&(o=ht),a===Bo&&(a=ht),o!==a)return!1;switch(o){case Ks:return t.toString()===e.toString();case Xs:{let u=t.valueOf(),c=e.valueOf();return u===c||Number.isNaN(u)&&Number.isNaN(c)}case Js:case Zs:case Qs:return Object.is(t.valueOf(),e.valueOf());case Ys:return t.source===e.source&&t.flags===e.flags;case oi:return t===e}r=r??new Map;let i=r.get(t),l=r.get(e);if(i!=null&&l!=null)return i===e;r.set(t,e),r.set(e,t);try{switch(o){case ei:{if(t.size!==e.size)return!1;for(let[u,c]of t.entries())if(!e.has(u)||!ye(c,e.get(u),r))return!1;return!0}case ri:{if(t.size!==e.size)return!1;let u=Array.from(t.values()),c=Array.from(e.values());for(let d=0;d<u.length;d++){let m=u[d],h=c.findIndex(g=>ye(m,g,r));if(h===-1)return!1;c.splice(h,1)}return!0}case ti:case ai:case li:case ci:case pi:case di:case ui:case fi:case yi:case mi:case hi:case gi:{if(typeof Buffer<"u"&&Buffer.isBuffer(t)!==Buffer.isBuffer(e)||t.length!==e.length)return!1;for(let u=0;u<t.length;u++)if(!ye(t[u],e[u],r))return!1;return!0}case ni:return t.byteLength!==e.byteLength?!1:ye(new Uint8Array(t),new Uint8Array(e),r);case ii:return t.byteLength!==e.byteLength||t.byteOffset!==e.byteOffset?!1:ye(t.buffer,e.buffer,r);case si:return t.name===e.name&&t.message===e.message;case ht:{if(!(ye(t.constructor,e.constructor,r)||$$1(t)&&$$1(e)))return!1;let u=[...Object.keys(t),...Vo(t)],c=[...Object.keys(e),...Vo(e)];if(u.length!==c.length)return!1;for(let d=0;d<u.length;d++){let m=u[d],h=t[m];if(!Object.prototype.hasOwnProperty.call(e,m))return!1;let g=e[m];if(!ye(h,g,r))return!1}return!0}default:return!1}}finally{r.delete(t),r.delete(e)}}n(ye,"areObjectsEqual");var Si=n((t,e)=>{let[r,o]=mt(e?e(t.getState()):t.getState());return Er(()=>t.onStateChange((a,i)=>{if(!e){o(a);return}let l=e(a),u=e(i);!Ar(l,u)&&o(l)}),[t,o,e]),[r,t.setState]},"useUniversalStore"),St=class Jn extends Q{constructor(e,r){Q.isInternalConstructing=!0,super({...e,leader:!0},{channel:new ie({}),environment:Q.Environment.MOCK}),Q.isInternalConstructing=!1,typeof(r==null?void 0:r.fn)=="function"&&(this.testUtils=r,this.getState=r.fn(this.getState),this.setState=r.fn(this.setState),this.subscribe=r.fn(this.subscribe),this.onStateChange=r.fn(this.onStateChange),this.send=r.fn(this.send))}static create(e,r){return new Jn(e,r)}unsubscribeAll(){var r,o;if(!this.testUtils)throw new Error(ps`Cannot call unsubscribeAll on a store that does not have testUtils.
        Please provide testUtils as the second argument when creating the store.`);let e=n(a=>{try{a.value()}catch{}},"callReturnedUnsubscribeFn");(r=this.subscribe.mock)==null||r.results.forEach(e),(o=this.onStateChange.mock)==null||o.results.forEach(e)}};n(St,"MockUniversalStore");var gt=St,kr={};_e(kr,{CalledExtractOnStoreError:()=>vr,CalledPreviewMethodBeforeInitializationError:()=>V,Category:()=>Ti,EmptyIndexError:()=>Pr,ImplicitActionsDuringRendering:()=>zo,MdxFileWithNoCsfReferencesError:()=>Cr,MissingRenderToCanvasError:()=>wr,MissingStoryAfterHmrError:()=>xr,MissingStoryFromCsfFileError:()=>Ir,MountMustBeDestructuredError:()=>Oe,NextJsSharpError:()=>Wo,NextjsRouterMocksNotAvailable:()=>$o,NoRenderFunctionError:()=>Dr,NoStoryMatchError:()=>Or,NoStoryMountedError:()=>Nr,StoryIndexFetchError:()=>_r,StoryStoreAccessedBeforeInitializationError:()=>Fr,UnknownArgTypesError:()=>Yo,UnsupportedViewportDimensionError:()=>Ko});function bi({code:t,category:e}){let r=String(t).padStart(4,"0");return`SB_${e}_${r}`}n(bi,"parseErrorCode");var bt=class Zn extends Error{constructor(e){super(Zn.getFullMessage(e)),this.data={},this.fromStorybook=!0,this.category=e.category,this.documentation=e.documentation??!1,this.code=e.code}get fullErrorCode(){return bi({code:this.code,category:this.category})}get name(){let e=this.constructor.name;return`${this.fullErrorCode} (${e})`}static getFullMessage({documentation:e,code:r,category:o,message:a}){let i;return e===!0?i=`https://storybook.js.org/error/${bi({code:r,category:o})}`:typeof e=="string"?i=e:Array.isArray(e)&&(i=`
${e.map(l=>`	- ${l}`).join(`
`)}`),`${a}${i!=null?`

More info: ${i}
`:""}`}};n(bt,"StorybookError");var G=bt,Ti=(t=>(t.BLOCKS="BLOCKS",t.DOCS_TOOLS="DOCS-TOOLS",t.PREVIEW_CLIENT_LOGGER="PREVIEW_CLIENT-LOGGER",t.PREVIEW_CHANNELS="PREVIEW_CHANNELS",t.PREVIEW_CORE_EVENTS="PREVIEW_CORE-EVENTS",t.PREVIEW_INSTRUMENTER="PREVIEW_INSTRUMENTER",t.PREVIEW_API="PREVIEW_API",t.PREVIEW_REACT_DOM_SHIM="PREVIEW_REACT-DOM-SHIM",t.PREVIEW_ROUTER="PREVIEW_ROUTER",t.PREVIEW_THEMING="PREVIEW_THEMING",t.RENDERER_HTML="RENDERER_HTML",t.RENDERER_PREACT="RENDERER_PREACT",t.RENDERER_REACT="RENDERER_REACT",t.RENDERER_SERVER="RENDERER_SERVER",t.RENDERER_SVELTE="RENDERER_SVELTE",t.RENDERER_VUE="RENDERER_VUE",t.RENDERER_VUE3="RENDERER_VUE3",t.RENDERER_WEB_COMPONENTS="RENDERER_WEB-COMPONENTS",t.FRAMEWORK_NEXTJS="FRAMEWORK_NEXTJS",t.ADDON_VITEST="ADDON_VITEST",t))(Ti||{}),Xo=class extends G{constructor(e){super({category:"PREVIEW_API",code:1,message:_$1`
        Couldn't find story matching id '${e.storyId}' after HMR.
        - Did you just rename a story?
        - Did you remove it from your CSF file?
        - Are you sure a story with the id '${e.storyId}' exists?
        - Please check the values in the stories field of your main.js config and see if they would match your CSF File.
        - Also check the browser console and terminal for potential error messages.`}),this.data=e}};n(Xo,"MissingStoryAfterHmrError");var xr=Xo,Jo=class extends G{constructor(e){super({category:"PREVIEW_API",code:2,documentation:"https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#using-implicit-actions-during-rendering-is-deprecated-for-example-in-the-play-function",message:_$1`
        We detected that you use an implicit action arg while ${e.phase} of your story.  
        ${e.deprecated?`
This is deprecated and won't work in Storybook 8 anymore.
`:""}
        Please provide an explicit spy to your args like this:
          import { fn } from '@storybook/test';
          ... 
          args: {
           ${e.name}: fn()
          }`}),this.data=e}};n(Jo,"ImplicitActionsDuringRendering");var zo=Jo,Qo=class extends G{constructor(){super({category:"PREVIEW_API",code:3,message:_$1`
        Cannot call \`storyStore.extract()\` without calling \`storyStore.cacheAllCsfFiles()\` first.

        You probably meant to call \`await preview.extract()\` which does the above for you.`})}};n(Qo,"CalledExtractOnStoreError");var vr=Qo,Zo=class extends G{constructor(){super({category:"PREVIEW_API",code:4,message:_$1`
        Expected your framework's preset to export a \`renderToCanvas\` field.

        Perhaps it needs to be upgraded for Storybook 7.0?`,documentation:"https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#mainjs-framework-field"})}};n(Zo,"MissingRenderToCanvasError");var wr=Zo,en=class extends G{constructor(e){super({category:"PREVIEW_API",code:5,message:_$1`
        Called \`Preview.${e.methodName}()\` before initialization.
        
        The preview needs to load the story index before most methods can be called. If you want
        to call \`${e.methodName}\`, try \`await preview.initializationPromise;\` first.
        
        If you didn't call the above code, then likely it was called by an addon that needs to
        do the above.`}),this.data=e}};n(en,"CalledPreviewMethodBeforeInitializationError");var V=en,rn=class extends G{constructor(e){super({category:"PREVIEW_API",code:6,message:_$1`
        Error fetching \`/index.json\`:
        
        ${e.text}

        If you are in development, this likely indicates a problem with your Storybook process,
        check the terminal for errors.

        If you are in a deployed Storybook, there may have been an issue deploying the full Storybook
        build.`}),this.data=e}};n(rn,"StoryIndexFetchError");var _r=rn,tn=class extends G{constructor(e){super({category:"PREVIEW_API",code:7,message:_$1`
        Tried to render docs entry ${e.storyId} but it is a MDX file that has no CSF
        references, or autodocs for a CSF file that some doesn't refer to itself.
        
        This likely is an internal error in Storybook's indexing, or you've attached the
        \`attached-mdx\` tag to an MDX file that is not attached.`}),this.data=e}};n(tn,"MdxFileWithNoCsfReferencesError");var Cr=tn,on=class extends G{constructor(){super({category:"PREVIEW_API",code:8,message:_$1`
        Couldn't find any stories in your Storybook.

        - Please check your stories field of your main.js config: does it match correctly?
        - Also check the browser console and terminal for error messages.`})}};n(on,"EmptyIndexError");var Pr=on,nn=class extends G{constructor(e){super({category:"PREVIEW_API",code:9,message:_$1`
        Couldn't find story matching '${e.storySpecifier}'.

        - Are you sure a story with that id exists?
        - Please check your stories field of your main.js config.
        - Also check the browser console and terminal for error messages.`}),this.data=e}};n(nn,"NoStoryMatchError");var Or=nn,sn=class extends G{constructor(e){super({category:"PREVIEW_API",code:10,message:_$1`
        Couldn't find story matching id '${e.storyId}' after importing a CSF file.

        The file was indexed as if the story was there, but then after importing the file in the browser
        we didn't find the story. Possible reasons:
        - You are using a custom story indexer that is misbehaving.
        - You have a custom file loader that is removing or renaming exports.

        Please check your browser console and terminal for errors that may explain the issue.`}),this.data=e}};n(sn,"MissingStoryFromCsfFileError");var Ir=sn,an=class extends G{constructor(){super({category:"PREVIEW_API",code:11,message:_$1`
        Cannot access the Story Store until the index is ready.

        It is not recommended to use methods directly on the Story Store anyway, in Storybook 9 we will
        remove access to the store entirely`})}};n(an,"StoryStoreAccessedBeforeInitializationError");var Fr=an,ln=class extends G{constructor(e){super({category:"PREVIEW_API",code:12,message:_$1`
      Incorrect use of mount in the play function.
      
      To use mount in the play function, you must satisfy the following two requirements: 
      
      1. You *must* destructure the mount property from the \`context\` (the argument passed to your play function). 
         This makes sure that Storybook does not start rendering the story before the play function begins.
      
      2. Your Storybook framework or builder must be configured to transpile to ES2017 or newer. 
         This is because destructuring statements and async/await usages are otherwise transpiled away, 
         which prevents Storybook from recognizing your usage of \`mount\`.
      
      Note that Angular is not supported. As async/await is transpiled to support the zone.js polyfill. 
      
      More info: https://storybook.js.org/docs/writing-tests/interaction-testing#run-code-before-the-component-gets-rendered
      
      Received the following play function:
      ${e.playFunction}`}),this.data=e}};n(ln,"MountMustBeDestructuredError");var Oe=ln,cn=class extends G{constructor(e){super({category:"PREVIEW_API",code:14,message:_$1`
        No render function available for storyId '${e.id}'
      `}),this.data=e}};n(cn,"NoRenderFunctionError");var Dr=cn,pn=class extends G{constructor(){super({category:"PREVIEW_API",code:15,message:_$1`
        No component is mounted in your story.
        
        This usually occurs when you destructure mount in the play function, but forget to call it.
        
        For example:

        async play({ mount, canvasElement }) {
          // 👈 mount should be called: await mount(); 
          const canvas = within(canvasElement);
          const button = await canvas.findByRole('button');
          await userEvent.click(button);
        };

        Make sure to either remove it or call mount in your play function.
      `})}};n(pn,"NoStoryMountedError");var Nr=pn,dn=class extends G{constructor(){super({category:"FRAMEWORK_NEXTJS",code:1,documentation:"https://storybook.js.org/docs/get-started/nextjs#faq",message:_$1`
      You are importing avif images, but you don't have sharp installed.

      You have to install sharp in order to use image optimization features in Next.js.
      `})}};n(dn,"NextJsSharpError");var Wo=dn,un=class extends G{constructor(e){super({category:"FRAMEWORK_NEXTJS",code:2,message:_$1`
        Tried to access router mocks from "${e.importType}" but they were not created yet. You might be running code in an unsupported environment.
      `}),this.data=e}};n(un,"NextjsRouterMocksNotAvailable");var $o=un,fn=class extends G{constructor(e){super({category:"DOCS-TOOLS",code:1,documentation:"https://github.com/storybookjs/storybook/issues/26606",message:_$1`
        There was a failure when generating detailed ArgTypes in ${e.language} for:
        ${JSON.stringify(e.type,null,2)} 
        
        Storybook will fall back to use a generic type description instead.

        This type is either not supported or it is a bug in the docgen generation in Storybook.
        If you think this is a bug, please detail it as much as possible in the Github issue.
      `}),this.data=e}};n(fn,"UnknownArgTypesError");var Yo=fn,yn=class extends G{constructor(e){super({category:"ADDON_VITEST",code:1,message:_$1`
        Encountered an unsupported value "${e.value}" when setting the viewport ${e.dimension} dimension.
        
        The Storybook plugin only supports values in the following units:
        - px, vh, vw, em, rem and %.
        
        You can either change the viewport for this story to use one of the supported units or skip the test by adding '!test' to the story's tags per https://storybook.js.org/docs/writing-stories/tags
      `}),this.data=e}};n(yn,"UnsupportedViewportDimensionError");var Ko=yn,Ot=ue(it()),rr=Symbol("incompatible"),mn=n((t,e)=>{let r=e.type;if(t==null||!r||e.mapping)return t;switch(r.name){case"string":return String(t);case"enum":return t;case"number":return Number(t);case"boolean":return String(t)==="true";case"array":return!r.value||!Array.isArray(t)?rr:t.reduce((o,a,i)=>{let l=mn(a,{type:r.value});return l!==rr&&(o[i]=l),o},new Array(t.length));case"object":return typeof t=="string"||typeof t=="number"?t:!r.value||typeof t!="object"?rr:Object.entries(t).reduce((o,[a,i])=>{let l=mn(i,{type:r.value[a]});return l===rr?o:Object.assign(o,{[a]:l})},{});default:return rr}},"map"),Ei=n((t,e)=>Object.entries(t).reduce((r,[o,a])=>{if(!e[o])return r;let i=mn(a,e[o]);return i===rr?r:Object.assign(r,{[o]:i})},{}),"mapArgsToTypes"),tr=n((t,e)=>Array.isArray(t)&&Array.isArray(e)?e.reduce((r,o,a)=>(r[a]=tr(t[a],e[a]),r),[...t]).filter(r=>r!==void 0):!$$1(t)||!$$1(e)?e:Object.keys({...t,...e}).reduce((r,o)=>{if(o in e){let a=tr(t[o],e[o]);a!==void 0&&(r[o]=a)}else r[o]=t[o];return r},{}),"combineArgs"),Ri=n((t,e)=>Object.entries(e).reduce((r,[o,{options:a}])=>{function i(){return o in t&&(r[o]=t[o]),r}if(n(i,"allowArg"),!a)return i();if(!Array.isArray(a))return j$1.error(_$1`
        Invalid argType: '${o}.options' should be an array.

        More info: https://storybook.js.org/docs/api/arg-types
      `),i();if(a.some(h=>h&&["object","function"].includes(typeof h)))return j$1.error(_$1`
        Invalid argType: '${o}.options' should only contain primitives. Use a 'mapping' for complex values.

        More info: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
      `),i();let l=Array.isArray(t[o]),u=l&&t[o].findIndex(h=>!a.includes(h)),c=l&&u===-1;if(t[o]===void 0||a.includes(t[o])||c)return i();let d=l?`${o}[${u}]`:o,m=a.map(h=>typeof h=="string"?`'${h}'`:String(h)).join(", ");return j$1.warn(`Received illegal value for '${d}'. Supported options: ${m}`),r},{}),"validateOptions"),Ie=Symbol("Deeply equal"),or=n((t,e)=>{if(typeof t!=typeof e)return e;if(Ar(t,e))return Ie;if(Array.isArray(t)&&Array.isArray(e)){let r=e.reduce((o,a,i)=>{let l=or(t[i],a);return l!==Ie&&(o[i]=l),o},new Array(e.length));return e.length>=t.length?r:r.concat(new Array(t.length-e.length).fill(void 0))}return $$1(t)&&$$1(e)?Object.keys({...t,...e}).reduce((r,o)=>{let a=or(t==null?void 0:t[o],e==null?void 0:e[o]);return a===Ie?r:Object.assign(r,{[o]:a})},{}):e},"deepDiff"),hn="UNTARGETED";function Ai({args:t,argTypes:e}){let r={};return Object.entries(t).forEach(([o,a])=>{let{target:i=hn}=e[o]||{};r[i]=r[i]||{},r[i][o]=a}),r}n(Ai,"groupArgsByTarget");function qd(t){return Object.keys(t).forEach(e=>t[e]===void 0&&delete t[e]),t}n(qd,"deleteUndefined");var gn=class{constructor(){this.initialArgsByStoryId={},this.argsByStoryId={}}get(e){if(!(e in this.argsByStoryId))throw new Error(`No args known for ${e} -- has it been rendered yet?`);return this.argsByStoryId[e]}setInitial(e){if(!this.initialArgsByStoryId[e.id])this.initialArgsByStoryId[e.id]=e.initialArgs,this.argsByStoryId[e.id]=e.initialArgs;else if(this.initialArgsByStoryId[e.id]!==e.initialArgs){let r=or(this.initialArgsByStoryId[e.id],this.argsByStoryId[e.id]);this.initialArgsByStoryId[e.id]=e.initialArgs,this.argsByStoryId[e.id]=e.initialArgs,r!==Ie&&this.updateFromDelta(e,r)}}updateFromDelta(e,r){let o=Ri(r,e.argTypes);this.argsByStoryId[e.id]=tr(this.argsByStoryId[e.id],o)}updateFromPersisted(e,r){let o=Ei(r,e.argTypes);return this.updateFromDelta(e,o)}update(e,r){if(!(e in this.argsByStoryId))throw new Error(`No args known for ${e} -- has it been rendered yet?`);this.argsByStoryId[e]=qd({...this.argsByStoryId[e],...r})}};n(gn,"ArgsStore");var Tt=gn,Et=n((t={})=>Object.entries(t).reduce((e,[r,{defaultValue:o}])=>(typeof o<"u"&&(e[r]=o),e),{}),"getValuesFromArgTypes"),Sn=class{constructor({globals:e={},globalTypes:r={}}){this.set({globals:e,globalTypes:r})}set({globals:e={},globalTypes:r={}}){let o=this.initialGlobals&&or(this.initialGlobals,this.globals);this.allowedGlobalNames=new Set([...Object.keys(e),...Object.keys(r)]);let a=Et(r);this.initialGlobals={...a,...e},this.globals=this.initialGlobals,o&&o!==Ie&&this.updateFromPersisted(o)}filterAllowedGlobals(e){return Object.entries(e).reduce((r,[o,a])=>(this.allowedGlobalNames.has(o)?r[o]=a:I$1.warn(`Attempted to set a global (${o}) that is not defined in initial globals or globalTypes`),r),{})}updateFromPersisted(e){let r=this.filterAllowedGlobals(e);this.globals={...this.globals,...r}}get(){return this.globals}update(e){this.globals={...this.globals,...this.filterAllowedGlobals(e)}}};n(Sn,"GlobalsStore");var Rt=Sn,xi=ue(it()),Bd=(0,xi.default)(1)(t=>Object.values(t).reduce((e,r)=>(e[r.importPath]=e[r.importPath]||r,e),{})),bn=class{constructor({entries:e}={v:5,entries:{}}){this.entries=e}entryFromSpecifier(e){let r=Object.values(this.entries);if(e==="*")return r[0];if(typeof e=="string")return this.entries[e]?this.entries[e]:r.find(i=>i.id.startsWith(e));let{name:o,title:a}=e;return r.find(i=>i.name===o&&i.title===a)}storyIdToEntry(e){let r=this.entries[e];if(!r)throw new xr({storyId:e});return r}importPathToEntry(e){return Bd(this.entries)[e]}};n(bn,"StoryIndexStore");var At=bn,Vd=n(t=>typeof t=="string"?{name:t}:t,"normalizeType"),Hd=n(t=>typeof t=="string"?{type:t}:t,"normalizeControl"),zd=n((t,e)=>{let{type:r,control:o,...a}=t,i={name:e,...a};return r&&(i.type=Vd(r)),o?i.control=Hd(o):o===!1&&(i.control={disable:!0}),i},"normalizeInputType"),Fe=n(t=>oe(t,zd),"normalizeInputTypes");function vi(t){return t.replace(/_/g," ").replace(/-/g," ").replace(/\./g," ").replace(/([^\n])([A-Z])([a-z])/g,(e,r,o,a)=>`${r} ${o}${a}`).replace(/([a-z])([A-Z])/g,(e,r,o)=>`${r} ${o}`).replace(/([a-z])([0-9])/gi,(e,r,o)=>`${r} ${o}`).replace(/([0-9])([a-z])/gi,(e,r,o)=>`${r} ${o}`).replace(/(\s|^)(\w)/g,(e,r,o)=>`${r}${o.toUpperCase()}`).replace(/ +/g," ").trim()}n(vi,"toStartCaseStr");var En=ue(wi()),_i=n(t=>t.map(e=>typeof e<"u").filter(Boolean).length,"count"),Wd=n((t,e)=>{let{exists:r,eq:o,neq:a,truthy:i}=t;if(_i([r,o,a,i])>1)throw new Error(`Invalid conditional test ${JSON.stringify({exists:r,eq:o,neq:a})}`);if(typeof o<"u")return(0,En.isEqual)(e,o);if(typeof a<"u")return!(0,En.isEqual)(e,a);if(typeof r<"u"){let l=typeof e<"u";return r?l:!l}return typeof i>"u"||i?!!e:!e},"testValue"),Rn=n((t,e,r)=>{if(!t.if)return!0;let{arg:o,global:a}=t.if;if(_i([o,a])!==1)throw new Error(`Invalid conditional value ${JSON.stringify({arg:o,global:a})}`);let i=o?e[o]:r[a];return Wd(t.if,i)},"includeConditionalArg");function nr(t){return t!=null&&typeof t=="object"&&"_tag"in t&&(t==null?void 0:t._tag)==="Story"}n(nr,"isStory");var An=n(t=>t.toLowerCase().replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,"-").replace(/-+/g,"-").replace(/^-+/,"").replace(/-+$/,""),"sanitize"),Ci=n((t,e)=>{let r=An(t);if(r==="")throw new Error(`Invalid ${e} '${t}', must include alphanumeric characters`);return r},"sanitizeSafe"),Oi=n((t,e)=>`${Ci(t,"kind")}${e?`--${Ci(e,"name")}`:""}`,"toId"),Ii=n(t=>vi(t),"storyNameFromExport");function Pi(t,e){return Array.isArray(e)?e.includes(t):t.match(e)}n(Pi,"matches");function Lr(t,{includeStories:e,excludeStories:r}){return t!=="__esModule"&&(!e||Pi(t,e))&&(!r||!Pi(t,r))}n(Lr,"isExportStory");var Fi=n((...t)=>{let e=t.reduce((r,o)=>(o.startsWith("!")?r.delete(o.slice(1)):r.add(o),r),new Set);return Array.from(e)},"combineTags"),k=n(t=>Array.isArray(t)?t:t?[t]:[],"normalizeArrays"),$d=_$1`
CSF .story annotations deprecated; annotate story functions directly:
- StoryFn.story.name => StoryFn.storyName
- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.
`;function De(t,e,r){let o=e,a=typeof e=="function"?e:null,{story:i}=o;i&&(I$1.debug("deprecated story",i),ae($d));let l=Ii(t),u=typeof o!="function"&&o.name||o.storyName||(i==null?void 0:i.name)||l,c=[...k(o.decorators),...k(i==null?void 0:i.decorators)],d={...i==null?void 0:i.parameters,...o.parameters},m={...i==null?void 0:i.args,...o.args},h={...i==null?void 0:i.argTypes,...o.argTypes},g=[...k(o.loaders),...k(i==null?void 0:i.loaders)],J=[...k(o.beforeEach),...k(i==null?void 0:i.beforeEach)],ne=[...k(o.experimental_afterEach),...k(i==null?void 0:i.experimental_afterEach)],{render:le,play:re,tags:ce=[],globals:F={}}=o,se=d.__id||Oi(r.id,l);return{moduleExport:e,id:se,name:u,tags:ce,decorators:c,parameters:d,args:m,argTypes:Fe(h),loaders:g,beforeEach:J,experimental_afterEach:ne,globals:F,...le&&{render:le},...a&&{userStoryFn:a},...re&&{play:re}}}n(De,"normalizeStory");function jr(t,e=t.title,r){let{id:o,argTypes:a}=t;return{id:An(o||e),...t,title:e,...a&&{argTypes:Fe(a)},parameters:{fileName:r,...t.parameters}}}n(jr,"normalizeComponentAnnotations");var Yd=n(t=>{let{globals:e,globalTypes:r}=t;(e||r)&&I$1.error("Global args/argTypes can only be set globally",JSON.stringify({globals:e,globalTypes:r}))},"checkGlobals"),Kd=n(t=>{let{options:e}=t;e!=null&&e.storySort&&I$1.error("The storySort option parameter can only be set globally")},"checkStorySort"),xt=n(t=>{t&&(Yd(t),Kd(t))},"checkDisallowedParameters");function Di(t,e,r){let{default:o,__namedExportsOrder:a,...i}=t,l=Object.values(i)[0];if(nr(l)){let d=jr(l.meta.input,r,e);xt(d.parameters);let m={meta:d,stories:{},moduleExports:t};return Object.keys(i).forEach(h=>{if(Lr(h,d)){let g=De(h,i[h].input,d);xt(g.parameters),m.stories[g.id]=g}}),m.projectAnnotations=l.meta.preview.composed,m}let u=jr(o,r,e);xt(u.parameters);let c={meta:u,stories:{},moduleExports:t};return Object.keys(i).forEach(d=>{if(Lr(d,u)){let m=De(d,i[d],u);xt(m.parameters),c.stories[m.id]=m}}),c}n(Di,"processCSFFile");function ki(t){return t!=null&&Xd(t).includes("mount")}n(ki,"mountDestructured");function Xd(t){let e=t.toString().match(/[^(]*\(([^)]*)/);if(!e)return[];let r=Ni(e[1]);if(!r.length)return[];let o=r[0];return o.startsWith("{")&&o.endsWith("}")?Ni(o.slice(1,-1).replace(/\s/g,"")).map(a=>a.replace(/:.*|=.*/g,"")):[]}n(Xd,"getUsedProps");function Ni(t){let e=[],r=[],o=0;for(let i=0;i<t.length;i++)if(t[i]==="{"||t[i]==="[")r.push(t[i]==="{"?"}":"]");else if(t[i]===r[r.length-1])r.pop();else if(!r.length&&t[i]===","){let l=t.substring(o,i).trim();l&&e.push(l),o=i+1}let a=t.substring(o).trim();return a&&e.push(a),e}n(Ni,"splitByComma");function xn(t,e,r){let o=r(t);return a=>e(o,a)}n(xn,"decorateStory");function vn({componentId:t,title:e,kind:r,id:o,name:a,story:i,parameters:l,initialArgs:u,argTypes:c,...d}={}){return d}n(vn,"sanitizeStoryContextUpdate");function vt(t,e){let r={},o=n(i=>l=>{if(!r.value)throw new Error("Decorated function called without init");return r.value={...r.value,...vn(l)},i(r.value)},"bindWithContext"),a=e.reduce((i,l)=>xn(i,l,o),t);return i=>(r.value=i,a(i))}n(vt,"defaultDecorateStory");var Y=n((...t)=>{let e={},r=t.filter(Boolean),o=r.reduce((a,i)=>(Object.entries(i).forEach(([l,u])=>{let c=a[l];Array.isArray(u)||typeof c>"u"?a[l]=u:$$1(u)&&$$1(c)?e[l]=!0:typeof u<"u"&&(a[l]=u)}),a),{});return Object.keys(e).forEach(a=>{let i=r.filter(Boolean).map(l=>l[a]).filter(l=>typeof l<"u");i.every(l=>$$1(l))?o[a]=Y(...i):o[a]=i[i.length-1]}),o},"combineParameters");function sr(t,e,r){let{moduleExport:o,id:a,name:i}=t||{},l=Li(t,e,r),u=n(async we=>{let ve={};for(let Nt of[..."__STORYBOOK_TEST_LOADERS__"in E$1&&Array.isArray(E$1.__STORYBOOK_TEST_LOADERS__)?[E$1.__STORYBOOK_TEST_LOADERS__]:[],k(r.loaders),k(e.loaders),k(t.loaders)]){if(we.abortSignal.aborted)return ve;let Bt=await Promise.all(Nt.map(Ft=>Ft(we)));Object.assign(ve,...Bt)}return ve},"applyLoaders"),c=n(async we=>{let ve=new Array;for(let Nt of[...k(r.beforeEach),...k(e.beforeEach),...k(t.beforeEach)]){if(we.abortSignal.aborted)return ve;let Bt=await Nt(we);Bt&&ve.push(Bt)}return ve},"applyBeforeEach"),d=n(async we=>{let ve=[...k(r.experimental_afterEach),...k(e.experimental_afterEach),...k(t.experimental_afterEach)].reverse();for(let Nt of ve){if(we.abortSignal.aborted)return;await Nt(we)}},"applyAfterEach"),m=n(we=>we.originalStoryFn(we.args,we),"undecoratedStoryFn"),{applyDecorators:h=vt,runStep:g}=r,J=[...k(t==null?void 0:t.decorators),...k(e==null?void 0:e.decorators),...k(r==null?void 0:r.decorators)],ne=(t==null?void 0:t.userStoryFn)||(t==null?void 0:t.render)||e.render||r.render,le=ft(h)(m,J),re=n(we=>le(we),"unboundStoryFn"),ce=(t==null?void 0:t.play)??(e==null?void 0:e.play),F=ki(ce);if(!ne&&!F)throw new Dr({id:a});let se=n(we=>async()=>(await we.renderToCanvas(),we.canvas),"defaultMount"),he=t.mount??e.mount??r.mount??se,Ve=r.testingLibraryRender;return{storyGlobals:{},...l,moduleExport:o,id:a,name:i,story:i,originalStoryFn:ne,undecoratedStoryFn:m,unboundStoryFn:re,applyLoaders:u,applyBeforeEach:c,applyAfterEach:d,playFunction:ce,runStep:g,mount:he,testingLibraryRender:Ve,renderToCanvas:r.renderToCanvas,usesMount:F}}n(sr,"prepareStory");function wt(t,e,r){return{...Li(void 0,t,e),moduleExport:r}}n(wt,"prepareMeta");function Li(t,e,r){var ce;let o=["dev","test"],a=((ce=E$1.DOCS_OPTIONS)==null?void 0:ce.autodocs)===!0?["autodocs"]:[],i=Fi(...o,...a,...r.tags??[],...e.tags??[],...(t==null?void 0:t.tags)??[]),l=Y(r.parameters,e.parameters,t==null?void 0:t.parameters),{argTypesEnhancers:u=[],argsEnhancers:c=[]}=r,d=Y(r.argTypes,e.argTypes,t==null?void 0:t.argTypes);if(t){let F=(t==null?void 0:t.userStoryFn)||(t==null?void 0:t.render)||e.render||r.render;l.__isArgsStory=F&&F.length>0}let m={...r.args,...e.args,...t==null?void 0:t.args},h={...e.globals,...t==null?void 0:t.globals},g={componentId:e.id,title:e.title,kind:e.title,id:(t==null?void 0:t.id)||e.id,name:(t==null?void 0:t.name)||"__meta",story:(t==null?void 0:t.name)||"__meta",component:e.component,subcomponents:e.subcomponents,tags:i,parameters:l,initialArgs:m,argTypes:d,storyGlobals:h};g.argTypes=u.reduce((F,se)=>se({...g,argTypes:F}),g.argTypes);let J={...m};g.initialArgs=c.reduce((F,se)=>({...F,...se({...g,initialArgs:F})}),J);let{name:ne,story:le,...re}=g;return re}n(Li,"preparePartialAnnotations");function _t(t){var i;let{args:e}=t,r={...t,allArgs:void 0,argsByTarget:void 0};if((i=E$1.FEATURES)!=null&&i.argTypeTargetsV7){let l=Ai(t);r={...t,allArgs:t.args,argsByTarget:l,args:l[hn]||{}}}let o=Object.entries(r.args).reduce((l,[u,c])=>{var m;if(!((m=r.argTypes[u])!=null&&m.mapping))return l[u]=c,l;let d=n(h=>{let g=r.argTypes[u].mapping;return g&&h in g?g[h]:h},"mappingFn");return l[u]=Array.isArray(c)?c.map(d):d(c),l},{}),a=Object.entries(o).reduce((l,[u,c])=>{let d=r.argTypes[u]||{};return Rn(d,o,r.globals)&&(l[u]=c),l},{});return{...r,unmappedArgs:e,args:a}}n(_t,"prepareContext");var wn=n((t,e,r)=>{let o=typeof t;switch(o){case"boolean":case"string":case"number":case"function":case"symbol":return{name:o}}return t?r.has(t)?(I$1.warn(_$1`
        We've detected a cycle in arg '${e}'. Args should be JSON-serializable.

        Consider using the mapping feature or fully custom args:
        - Mapping: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
        - Custom args: https://storybook.js.org/docs/essentials/controls#fully-custom-args
      `),{name:"other",value:"cyclic object"}):(r.add(t),Array.isArray(t)?{name:"array",value:t.length>0?wn(t[0],e,new Set(r)):{name:"other",value:"unknown"}}:{name:"object",value:oe(t,a=>wn(a,e,new Set(r)))}):{name:"object",value:{}}},"inferType"),_n=n(t=>{let{id:e,argTypes:r={},initialArgs:o={}}=t,a=oe(o,(l,u)=>({name:u,type:wn(l,`${e}.${u}`,new Set)})),i=oe(r,(l,u)=>({name:u}));return Y(a,i,r)},"inferArgTypes");_n.secondPass=!0;var ji=n((t,e)=>Array.isArray(e)?e.includes(t):t.match(e),"matches"),Mr=n((t,e,r)=>!e&&!r?t:t&&qo(t,(o,a)=>{let i=o.name||a.toString();return!!(!e||ji(i,e))&&(!r||!ji(i,r))}),"filterArgTypes"),Jd=n((t,e,r)=>{let{type:o,options:a}=t;if(o){if(r.color&&r.color.test(e)){let i=o.name;if(i==="string")return{control:{type:"color"}};i!=="enum"&&I$1.warn(`Addon controls: Control of type color only supports string, received "${i}" instead`)}if(r.date&&r.date.test(e))return{control:{type:"date"}};switch(o.name){case"array":return{control:{type:"object"}};case"boolean":return{control:{type:"boolean"}};case"string":return{control:{type:"text"}};case"number":return{control:{type:"number"}};case"enum":{let{value:i}=o;return{control:{type:(i==null?void 0:i.length)<=5?"radio":"select"},options:i}}case"function":case"symbol":return null;default:return{control:{type:a?"select":"object"}}}}},"inferControl"),ir=n(t=>{let{argTypes:e,parameters:{__isArgsStory:r,controls:{include:o=null,exclude:a=null,matchers:i={}}={}}}=t;if(!r)return e;let l=Mr(e,o,a),u=oe(l,(c,d)=>(c==null?void 0:c.type)&&Jd(c,d.toString(),i));return Y(u,l)},"inferControls");ir.secondPass=!0;function Ne({argTypes:t,globalTypes:e,argTypesEnhancers:r,decorators:o,loaders:a,beforeEach:i,experimental_afterEach:l,globals:u,initialGlobals:c,...d}){return u&&Object.keys(u).length>0&&ae(_$1`
      The preview.js 'globals' field is deprecated and will be removed in Storybook 9.0.
      Please use 'initialGlobals' instead. Learn more:

      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#previewjs-globals-renamed-to-initialglobals
    `),{...t&&{argTypes:Fe(t)},...e&&{globalTypes:Fe(e)},decorators:k(o),loaders:k(a),beforeEach:k(i),experimental_afterEach:k(l),argTypesEnhancers:[...r||[],_n,ir],initialGlobals:Y(c,u),...d}}n(Ne,"normalizeProjectAnnotations");var Mi=n(t=>async()=>{let e=[];for(let r of t){let o=await r();o&&e.unshift(o)}return async()=>{for(let r of e)await r()}},"composeBeforeAllHooks");function Ct(t){return async(e,r,o)=>{await t.reduceRight((a,i)=>async()=>i(e,a,o),async()=>r(o))()}}n(Ct,"composeStepRunners");function Gr(t,e){return t.map(r=>{var o;return((o=r.default)==null?void 0:o[e])??r[e]}).filter(Boolean)}n(Gr,"getField");function Te(t,e,r={}){return Gr(t,e).reduce((o,a)=>{let i=k(a);return r.reverseFileOrder?[...i,...o]:[...o,...i]},[])}n(Te,"getArrayField");function Ur(t,e){return Object.assign({},...Gr(t,e))}n(Ur,"getObjectField");function ar(t,e){return Gr(t,e).pop()}n(ar,"getSingletonField");function ke(t){var a;let e=Te(t,"argTypesEnhancers"),r=Gr(t,"runStep"),o=Te(t,"beforeAll");return{parameters:Y(...Gr(t,"parameters")),decorators:Te(t,"decorators",{reverseFileOrder:!(((a=E$1.FEATURES)==null?void 0:a.legacyDecoratorFileOrder)??!1)}),args:Ur(t,"args"),argsEnhancers:Te(t,"argsEnhancers"),argTypes:Ur(t,"argTypes"),argTypesEnhancers:[...e.filter(i=>!i.secondPass),...e.filter(i=>i.secondPass)],globals:Ur(t,"globals"),initialGlobals:Ur(t,"initialGlobals"),globalTypes:Ur(t,"globalTypes"),loaders:Te(t,"loaders"),beforeAll:Mi(o),beforeEach:Te(t,"beforeEach"),experimental_afterEach:Te(t,"experimental_afterEach"),render:ar(t,"render"),renderToCanvas:ar(t,"renderToCanvas"),renderToDOM:ar(t,"renderToDOM"),applyDecorators:ar(t,"applyDecorators"),runStep:Ct(r),tags:Te(t,"tags"),mount:ar(t,"mount"),testingLibraryRender:ar(t,"testingLibraryRender")}}n(ke,"composeConfigs");var Cn=class{constructor(){this.reports=[]}async addReport(e){this.reports.push(e)}};n(Cn,"ReporterAPI");var Ee=Cn;function Pt(t,e,r){return nr(t)?{story:t.input,meta:t.meta.input,preview:t.meta.preview.composed}:{story:t,meta:e,preview:r}}n(Pt,"getCsfFactoryAnnotations");function Ui(t){globalThis.defaultProjectAnnotations=t}n(Ui,"setDefaultProjectAnnotations");var Qd="ComposedStory",Zd="Unnamed Story";function eu(t){return t?ke([t]):{}}n(eu,"extractAnnotation");function Gi(t){let e=Array.isArray(t)?t:[t];return globalThis.globalProjectAnnotations=ke([globalThis.defaultProjectAnnotations??{},ke(e.map(eu))]),globalThis.globalProjectAnnotations??{}}n(Gi,"setProjectAnnotations");var Re=[];function Pn(t,e,r,o,a){var ce;if(t===void 0)throw new Error("Expected a story but received undefined.");e.title=e.title??Qd;let i=jr(e),l=a||t.storyName||((ce=t.story)==null?void 0:ce.name)||t.name||Zd,u=De(l,t,i),c=Ne(ke([o??globalThis.globalProjectAnnotations??{},r??{}])),d=sr(u,i,c),m={...Et(c.globalTypes),...c.initialGlobals,...d.storyGlobals},h=new Ee,g=n(()=>{let F=_t({hooks:new be,globals:m,args:{...d.initialArgs},viewMode:"story",reporting:h,loaded:{},abortSignal:new AbortController().signal,step:n((se,he)=>d.runStep(se,he,F),"step"),canvasElement:null,canvas:{},globalTypes:c.globalTypes,...d,context:null,mount:null});return F.parameters.__isPortableStory=!0,F.context=F,d.renderToCanvas&&(F.renderToCanvas=async()=>{var he;let se=await((he=d.renderToCanvas)==null?void 0:he.call(d,{componentId:d.componentId,title:d.title,id:d.id,name:d.name,tags:d.tags,showMain:n(()=>{},"showMain"),showError:n(Ve=>{throw new Error(`${Ve.title}
${Ve.description}`)},"showError"),showException:n(Ve=>{throw Ve},"showException"),forceRemount:!0,storyContext:F,storyFn:n(()=>d.unboundStoryFn(F),"storyFn"),unboundStoryFn:d.unboundStoryFn},F.canvasElement));se&&Re.push(se)}),F.mount=d.mount(F),F},"initializeContext"),J,ne=n(async F=>{var he;let se=g();return se.canvasElement??(se.canvasElement=(he=globalThis==null?void 0:globalThis.document)==null?void 0:he.body),J&&(se.loaded=J.loaded),Object.assign(se,F),d.playFunction(se)},"play"),le=n(F=>{let se=g();return Object.assign(se,F),tu(d,se)},"run"),re=d.playFunction?ne:void 0;return Object.assign(n(function(F){let se=g();return J&&(se.loaded=J.loaded),se.args={...se.initialArgs,...F},d.unboundStoryFn(se)},"storyFn"),{id:d.id,storyName:l,load:n(async()=>{for(let se of[...Re].reverse())await se();Re.length=0;let F=g();F.loaded=await d.applyLoaders(F),Re.push(...(await d.applyBeforeEach(F)).filter(Boolean)),J=F},"load"),globals:m,args:d.initialArgs,parameters:d.parameters,argTypes:d.argTypes,play:re,run:le,reporting:h,tags:d.tags})}n(Pn,"composeStory");var ru=n((t,e,r,o)=>Pn(t,e,r,{},o),"defaultComposeStory");function qi(t,e,r=ru){let{default:o,__esModule:a,__namedExportsOrder:i,...l}=t,u=o;return Object.entries(l).reduce((c,[d,m])=>{let{story:h,meta:g}=Pt(m);return!u&&g&&(u=g),Lr(d,u)?Object.assign(c,{[d]:r(h,u,e,d)}):c},{})}n(qi,"composeStories");function Bi(t){return t.extend({mount:n(async({mount:e,page:r},o)=>{await o(async(a,...i)=>{if(!("__pw_type"in a)||"__pw_type"in a&&a.__pw_type!=="jsx")throw new Error(_$1`
              Portable stories in Playwright CT only work when referencing JSX elements.
              Please use JSX format for your components such as:

              instead of:
              await mount(MyComponent, { props: { foo: 'bar' } })

              do:
              await mount(<MyComponent foo="bar"/>)

              More info: https://storybook.js.org/docs/api/portable-stories-playwright
            `);await r.evaluate(async u=>{var d,m,h;let c=await((d=globalThis.__pwUnwrapObject)==null?void 0:d.call(globalThis,u));return(h=(m="__pw_type"in c?c.type:c)==null?void 0:m.load)==null?void 0:h.call(m)},a);let l=await e(a,...i);return await r.evaluate(async u=>{var h,g;let c=await((h=globalThis.__pwUnwrapObject)==null?void 0:h.call(globalThis,u)),d="__pw_type"in c?c.type:c,m=document.querySelector("#root");return(g=d==null?void 0:d.play)==null?void 0:g.call(d,{canvasElement:m})},a),l})},"mount")})}n(Bi,"createPlaywrightTest");async function tu(t,e){var a,i;for(let l of[...Re].reverse())await l();if(Re.length=0,!e.canvasElement){let l=document.createElement("div");(i=(a=globalThis==null?void 0:globalThis.document)==null?void 0:a.body)==null||i.appendChild(l),e.canvasElement=l,Re.push(()=>{var u,c,d,m;(c=(u=globalThis==null?void 0:globalThis.document)==null?void 0:u.body)!=null&&c.contains(l)&&((m=(d=globalThis==null?void 0:globalThis.document)==null?void 0:d.body)==null||m.removeChild(l))})}if(e.loaded=await t.applyLoaders(e),e.abortSignal.aborted)return;Re.push(...(await t.applyBeforeEach(e)).filter(Boolean));let r=t.playFunction,o=t.usesMount;o||await e.mount(),!e.abortSignal.aborted&&(r&&(o||(e.mount=async()=>{throw new Oe({playFunction:r.toString()})}),await r(e)),await t.applyAfterEach(e))}n(tu,"runStory");function Vi(t,e){return Uo(Go(t,e),r=>r===void 0)}n(Vi,"picky");var Hi=1e3,ou=1e4,On=class{constructor(e,r,o){this.importFn=r,this.getStoriesJsonData=n(()=>{let l=this.getSetStoriesPayload(),u=["fileName","docsOnly","framework","__id","__isArgsStory"];return{v:3,stories:oe(l.stories,c=>{let{importPath:d}=this.storyIndex.entries[c.id];return{...Vi(c,["id","name","title"]),importPath:d,kind:c.title,story:c.name,parameters:{...Vi(c.parameters,u),fileName:d}}})}},"getStoriesJsonData"),this.storyIndex=new At(e),this.projectAnnotations=Ne(o);let{initialGlobals:a,globalTypes:i}=this.projectAnnotations;this.args=new Tt,this.userGlobals=new Rt({globals:a,globalTypes:i}),this.hooks={},this.cleanupCallbacks={},this.processCSFFileWithCache=(0,Ot.default)(Hi)(Di),this.prepareMetaWithCache=(0,Ot.default)(Hi)(wt),this.prepareStoryWithCache=(0,Ot.default)(ou)(sr)}setProjectAnnotations(e){this.projectAnnotations=Ne(e);let{initialGlobals:r,globalTypes:o}=e;this.userGlobals.set({globals:r,globalTypes:o})}async onStoriesChanged({importFn:e,storyIndex:r}){e&&(this.importFn=e),r&&(this.storyIndex.entries=r.entries),this.cachedCSFFiles&&await this.cacheAllCSFFiles()}async storyIdToEntry(e){return this.storyIndex.storyIdToEntry(e)}async loadCSFFileByStoryId(e){let{importPath:r,title:o}=this.storyIndex.storyIdToEntry(e),a=await this.importFn(r);return this.processCSFFileWithCache(a,r,o)}async loadAllCSFFiles(){let e={};return Object.entries(this.storyIndex.entries).forEach(([r,{importPath:o}])=>{e[o]=r}),(await Promise.all(Object.entries(e).map(async([r,o])=>({importPath:r,csfFile:await this.loadCSFFileByStoryId(o)})))).reduce((r,{importPath:o,csfFile:a})=>(r[o]=a,r),{})}async cacheAllCSFFiles(){this.cachedCSFFiles=await this.loadAllCSFFiles()}preparedMetaFromCSFFile({csfFile:e}){let r=e.meta;return this.prepareMetaWithCache(r,this.projectAnnotations,e.moduleExports.default)}async loadStory({storyId:e}){let r=await this.loadCSFFileByStoryId(e);return this.storyFromCSFFile({storyId:e,csfFile:r})}storyFromCSFFile({storyId:e,csfFile:r}){let o=r.stories[e];if(!o)throw new Ir({storyId:e});let a=r.meta,i=this.prepareStoryWithCache(o,a,r.projectAnnotations??this.projectAnnotations);return this.args.setInitial(i),this.hooks[i.id]=this.hooks[i.id]||new be,i}componentStoriesFromCSFFile({csfFile:e}){return Object.keys(this.storyIndex.entries).filter(r=>!!e.stories[r]).map(r=>this.storyFromCSFFile({storyId:r,csfFile:e}))}async loadEntry(e){let r=await this.storyIdToEntry(e),o=r.type==="docs"?r.storiesImports:[],[a,...i]=await Promise.all([this.importFn(r.importPath),...o.map(l=>{let u=this.storyIndex.importPathToEntry(l);return this.loadCSFFileByStoryId(u.id)})]);return{entryExports:a,csfFiles:i}}getStoryContext(e,{forceInitialArgs:r=!1}={}){let o=this.userGlobals.get(),{initialGlobals:a}=this.userGlobals,i=new Ee;return _t({...e,args:r?e.initialArgs:this.args.get(e.id),initialGlobals:a,globalTypes:this.projectAnnotations.globalTypes,userGlobals:o,reporting:i,globals:{...o,...e.storyGlobals},hooks:this.hooks[e.id]})}addCleanupCallbacks(e,r){this.cleanupCallbacks[e.id]=r}async cleanupStory(e){this.hooks[e.id].clean();let r=this.cleanupCallbacks[e.id];if(r)for(let o of[...r].reverse())await o();delete this.cleanupCallbacks[e.id]}extract(e={includeDocsOnly:!1}){let{cachedCSFFiles:r}=this;if(!r)throw new vr;return Object.entries(this.storyIndex.entries).reduce((o,[a,{type:i,importPath:l}])=>{if(i==="docs")return o;let u=r[l],c=this.storyFromCSFFile({storyId:a,csfFile:u});return!e.includeDocsOnly&&c.parameters.docsOnly||(o[a]=Object.entries(c).reduce((d,[m,h])=>m==="moduleExport"||typeof h=="function"?d:Array.isArray(h)?Object.assign(d,{[m]:h.slice().sort()}):Object.assign(d,{[m]:h}),{args:c.initialArgs,globals:{...this.userGlobals.initialGlobals,...this.userGlobals.globals,...c.storyGlobals}})),o},{})}getSetStoriesPayload(){let e=this.extract({includeDocsOnly:!0}),r=Object.values(e).reduce((o,{title:a})=>(o[a]={},o),{});return{v:2,globals:this.userGlobals.get(),globalParameters:{},kindParameters:r,stories:e}}raw(){return ae("StoryStore.raw() is deprecated and will be removed in 9.0, please use extract() instead"),Object.values(this.extract()).map(({id:e})=>this.fromId(e)).filter(Boolean)}fromId(e){if(ae("StoryStore.fromId() is deprecated and will be removed in 9.0, please use loadStory() instead"),!this.cachedCSFFiles)throw new Error("Cannot call fromId/raw() unless you call cacheAllCSFFiles() first.");let r;try{({importPath:r}=this.storyIndex.storyIdToEntry(e))}catch{return null}let o=this.cachedCSFFiles[r],a=this.storyFromCSFFile({storyId:e,csfFile:o});return{...a,storyFn:n(i=>{let l={...this.getStoryContext(a),abortSignal:new AbortController().signal,canvasElement:null,loaded:{},step:n((u,c)=>a.runStep(u,c,l),"step"),context:null,mount:null,canvas:{},viewMode:"story"};return a.unboundStoryFn({...l,...i})},"storyFn")}}};n(On,"StoryStore");var Le=On;function In(t){return t.startsWith("\\\\?\\")?t:t.replace(/\\/g,"/")}n(In,"slash");var nu=n(t=>{if(t.length===0)return t;let e=t[t.length-1],r=e==null?void 0:e.replace(/(?:[.](?:story|stories))?([.][^.]+)$/i,"");if(t.length===1)return[r];let o=t[t.length-2];return r&&o&&r.toLowerCase()===o.toLowerCase()?[...t.slice(0,-2),r]:r&&(/^(story|stories)([.][^.]+)$/i.test(e)||/^index$/i.test(r))?t.slice(0,-1):[...t.slice(0,-1),r]},"sanitize");function zi(t){return t.flatMap(e=>e.split("/")).filter(Boolean).join("/")}n(zi,"pathJoin");var Fn=n((t,e,r)=>{let{directory:o,importPathMatcher:a,titlePrefix:i=""}=e||{};typeof t=="number"&&j$1.warn(_$1`
      CSF Auto-title received a numeric fileName. This typically happens when
      webpack is mis-configured in production mode. To force webpack to produce
      filenames, set optimization.moduleIds = "named" in your webpack config.
    `);let l=In(String(t));if(a.exec(l)){if(!r){let u=l.replace(o,""),c=zi([i,u]).split("/");return c=nu(c),c.join("/")}return i?zi([i,r]):r}},"userOrAutoTitleFromSpecifier"),Wi=n((t,e,r)=>{for(let o=0;o<e.length;o+=1){let a=Fn(t,e[o],r);if(a)return a}return r||void 0},"userOrAutoTitle"),$i=/\s*\/\s*/,Yi=n((t={})=>(e,r)=>{if(e.title===r.title&&!t.includeNames)return 0;let o=t.method||"configure",a=t.order||[],i=e.title.trim().split($i),l=r.title.trim().split($i);t.includeNames&&(i.push(e.name),l.push(r.name));let u=0;for(;i[u]||l[u];){if(!i[u])return-1;if(!l[u])return 1;let c=i[u],d=l[u];if(c!==d){let h=a.indexOf(c),g=a.indexOf(d),J=a.indexOf("*");return h!==-1||g!==-1?(h===-1&&(J!==-1?h=J:h=a.length),g===-1&&(J!==-1?g=J:g=a.length),h-g):o==="configure"?0:c.localeCompare(d,t.locales?t.locales:void 0,{numeric:!0,sensitivity:"accent"})}let m=a.indexOf(c);m===-1&&(m=a.indexOf("*")),a=m!==-1&&Array.isArray(a[m+1])?a[m+1]:[],u+=1}return 0},"storySort"),su=n((t,e,r)=>{if(e){let o;typeof e=="function"?o=e:o=Yi(e),t.sort(o)}else t.sort((o,a)=>r.indexOf(o.importPath)-r.indexOf(a.importPath));return t},"sortStoriesCommon"),Ki=n((t,e,r)=>{try{return su(t,e,r)}catch(o){throw new Error(_$1`
    Error sorting stories with sort parameter ${e}:

    > ${o.message}
    
    Are you using a V6-style sort function in V7 mode?

    More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-style-story-sort
  `)}},"sortStoriesV7"),Ae=new Error("prepareAborted"),{AbortController:Xi}=globalThis;function Ji(t){try{let{name:e="Error",message:r=String(t),stack:o}=t;return{name:e,message:r,stack:o}}catch{return{name:"Error",message:String(t)}}}n(Ji,"serializeError");var Dn=class{constructor(e,r,o,a,i,l,u={autoplay:!0,forceInitialArgs:!1},c){this.channel=e,this.store=r,this.renderToScreen=o,this.callbacks=a,this.id=i,this.viewMode=l,this.renderOptions=u,this.type="story",this.notYetRendered=!0,this.rerenderEnqueued=!1,this.disableKeyListeners=!1,this.teardownRender=n(()=>{},"teardownRender"),this.torndown=!1,this.abortController=new Xi,c&&(this.story=c,this.phase="preparing")}async runPhase(e,r,o){this.phase=r,this.channel.emit(Pe,{newPhase:this.phase,storyId:this.id}),o&&(await o(),this.checkIfAborted(e))}checkIfAborted(e){return e.aborted?(this.phase="aborted",this.channel.emit(Pe,{newPhase:this.phase,storyId:this.id}),!0):!1}async prepare(){if(await this.runPhase(this.abortController.signal,"preparing",async()=>{this.story=await this.store.loadStory({storyId:this.id})}),this.abortController.signal.aborted)throw await this.store.cleanupStory(this.story),Ae}isEqual(e){return!!(this.id===e.id&&this.story&&this.story===e.story)}isPreparing(){return["preparing"].includes(this.phase)}isPending(){return["loading","beforeEach","rendering","playing","afterEach"].includes(this.phase)}async renderToElement(e){return this.canvasElement=e,this.render({initial:!0,forceRemount:!0})}storyContext(){if(!this.story)throw new Error("Cannot call storyContext before preparing");let{forceInitialArgs:e}=this.renderOptions;return this.store.getStoryContext(this.story,{forceInitialArgs:e})}async render({initial:e=!1,forceRemount:r=!1}={}){var se,he,Ve,we;let{canvasElement:o}=this;if(!this.story)throw new Error("cannot render when not prepared");let a=this.story;if(!o)throw new Error("cannot render when canvasElement is unset");let{id:i,componentId:l,title:u,name:c,tags:d,applyLoaders:m,applyBeforeEach:h,applyAfterEach:g,unboundStoryFn:J,playFunction:ne,runStep:le}=a;r&&!e&&(this.cancelRender(),this.abortController=new Xi);let re=this.abortController.signal,ce=!1,F=a.usesMount;try{let ve={...this.storyContext(),viewMode:this.viewMode,abortSignal:re,canvasElement:o,loaded:{},step:n((B,de)=>le(B,de,ve),"step"),context:null,canvas:{},renderToCanvas:n(async()=>{let B=await this.renderToScreen(Nt,o);this.teardownRender=B||(()=>{}),ce=!0},"renderToCanvas"),mount:n(async(...B)=>{var pe,Lt;(Lt=(pe=this.callbacks).showStoryDuringRender)==null||Lt.call(pe);let de=null;return await this.runPhase(re,"rendering",async()=>{de=await a.mount(ve)(...B)}),F&&await this.runPhase(re,"playing"),de},"mount")};ve.context=ve;let Nt={componentId:l,title:u,kind:u,id:i,name:c,story:c,tags:d,...this.callbacks,showError:n(B=>(this.phase="errored",this.callbacks.showError(B)),"showError"),showException:n(B=>(this.phase="errored",this.callbacks.showException(B)),"showException"),forceRemount:r||this.notYetRendered,storyContext:ve,storyFn:n(()=>J(ve),"storyFn"),unboundStoryFn:J};if(await this.runPhase(re,"loading",async()=>{ve.loaded=await m(ve)}),re.aborted)return;let Bt=await h(ve);if(this.store.addCleanupCallbacks(a,Bt),this.checkIfAborted(re)||(!ce&&!F&&await ve.mount(),this.notYetRendered=!1,re.aborted))return;let Ft=((he=(se=this.story.parameters)==null?void 0:se.test)==null?void 0:he.dangerouslyIgnoreUnhandledErrors)===!0,jt=new Set,qe=n(B=>jt.add("error"in B?B.error:B.reason),"onError");if(this.renderOptions.autoplay&&r&&ne&&this.phase!=="errored"){window.addEventListener("error",qe),window.addEventListener("unhandledrejection",qe),this.disableKeyListeners=!0;try{if(F?await ne(ve):(ve.mount=async()=>{throw new Oe({playFunction:ne.toString()})},await this.runPhase(re,"playing",async()=>ne(ve))),!ce)throw new Nr;this.checkIfAborted(re),!Ft&&jt.size>0?await this.runPhase(re,"errored"):await this.runPhase(re,"played")}catch(B){if((we=(Ve=this.callbacks).showStoryDuringRender)==null||we.call(Ve),await this.runPhase(re,"errored",async()=>{this.channel.emit(Xt,Ji(B))}),this.story.parameters.throwPlayFunctionExceptions!==!1)throw B;console.error(B)}if(!Ft&&jt.size>0&&this.channel.emit(Jt,Array.from(jt).map(Ji)),this.disableKeyListeners=!1,window.removeEventListener("unhandledrejection",qe),window.removeEventListener("error",qe),re.aborted)return}await this.runPhase(re,"completed",async()=>this.channel.emit(We,i)),this.phase!=="errored"&&await this.runPhase(re,"afterEach",async()=>{await g(ve)});let Dt=!Ft&&jt.size>0,p=ve.reporting.reports.some(B=>B.status==="failed"),A=Dt||p;await this.runPhase(re,"finished",async()=>this.channel.emit(ot,{storyId:i,status:A?"error":"success",reporters:ve.reporting.reports}))}catch(ve){this.phase="errored",this.callbacks.showException(ve),await this.runPhase(re,"finished",async()=>this.channel.emit(ot,{storyId:i,status:"error",reporters:[]}))}this.rerenderEnqueued&&(this.rerenderEnqueued=!1,this.render())}async rerender(){if(this.isPending()&&this.phase!=="playing")this.rerenderEnqueued=!0;else return this.render()}async remount(){return await this.teardown(),this.render({forceRemount:!0})}cancelRender(){var e;(e=this.abortController)==null||e.abort()}async teardown(){this.torndown=!0,this.cancelRender(),this.story&&await this.store.cleanupStory(this.story);for(let e=0;e<3;e+=1){if(!this.isPending()){await this.teardownRender();return}await new Promise(r=>setTimeout(r,0))}window.location.reload(),await new Promise(()=>{})}};n(Dn,"StoryRender");var je=Dn,{fetch:iu}=E$1,au="./index.json",Nn=class{constructor(e,r,o=te$1.getChannel(),a=!0){this.importFn=e,this.getProjectAnnotations=r,this.channel=o,this.storyRenders=[],this.storeInitializationPromise=new Promise((i,l)=>{this.resolveStoreInitializationPromise=i,this.rejectStoreInitializationPromise=l}),a&&this.initialize()}get storyStore(){return new Proxy({},{get:n((e,r)=>{if(this.storyStoreValue)return ae("Accessing the Story Store is deprecated and will be removed in 9.0"),this.storyStoreValue[r];throw new Fr},"get")})}async initialize(){this.setupListeners();try{let e=await this.getProjectAnnotationsOrRenderError();await this.runBeforeAllHook(e),await this.initializeWithProjectAnnotations(e)}catch(e){this.rejectStoreInitializationPromise(e)}}ready(){return this.storeInitializationPromise}setupListeners(){this.channel.on(so,this.onStoryIndexChanged.bind(this)),this.channel.on(fr,this.onUpdateGlobals.bind(this)),this.channel.on(yr,this.onUpdateArgs.bind(this)),this.channel.on(fo,this.onRequestArgTypesInfo.bind(this)),this.channel.on(ur,this.onResetArgs.bind(this)),this.channel.on(dr,this.onForceReRender.bind(this)),this.channel.on(Kt,this.onForceRemount.bind(this))}async getProjectAnnotationsOrRenderError(){try{let e=await this.getProjectAnnotations();if(this.renderToCanvas=e.renderToCanvas,!this.renderToCanvas)throw new wr;return e}catch(e){throw this.renderPreviewEntryError("Error reading preview.js:",e),e}}async initializeWithProjectAnnotations(e){this.projectAnnotationsBeforeInitialization=e;try{let r=await this.getStoryIndexFromServer();return this.initializeWithStoryIndex(r)}catch(r){throw this.renderPreviewEntryError("Error loading story index:",r),r}}async runBeforeAllHook(e){var r,o;try{await((r=this.beforeAllCleanup)==null?void 0:r.call(this)),this.beforeAllCleanup=await((o=e.beforeAll)==null?void 0:o.call(e))}catch(a){throw this.renderPreviewEntryError("Error in beforeAll hook:",a),a}}async getStoryIndexFromServer(){let e=await iu(au);if(e.status===200)return e.json();throw new _r({text:await e.text()})}initializeWithStoryIndex(e){if(!this.projectAnnotationsBeforeInitialization)throw new Error("Cannot call initializeWithStoryIndex until project annotations resolve");this.storyStoreValue=new Le(e,this.importFn,this.projectAnnotationsBeforeInitialization),delete this.projectAnnotationsBeforeInitialization,this.setInitialGlobals(),this.resolveStoreInitializationPromise()}async setInitialGlobals(){this.emitGlobals()}emitGlobals(){if(!this.storyStoreValue)throw new V({methodName:"emitGlobals"});let e={globals:this.storyStoreValue.userGlobals.get()||{},globalTypes:this.storyStoreValue.projectAnnotations.globalTypes||{}};this.channel.emit(ro,e)}async onGetProjectAnnotationsChanged({getProjectAnnotations:e}){delete this.previewEntryError,this.getProjectAnnotations=e;let r=await this.getProjectAnnotationsOrRenderError();if(await this.runBeforeAllHook(r),!this.storyStoreValue){await this.initializeWithProjectAnnotations(r);return}this.storyStoreValue.setProjectAnnotations(r),this.emitGlobals()}async onStoryIndexChanged(){if(delete this.previewEntryError,!(!this.storyStoreValue&&!this.projectAnnotationsBeforeInitialization))try{let e=await this.getStoryIndexFromServer();if(this.projectAnnotationsBeforeInitialization){this.initializeWithStoryIndex(e);return}await this.onStoriesChanged({storyIndex:e})}catch(e){throw this.renderPreviewEntryError("Error loading story index:",e),e}}async onStoriesChanged({importFn:e,storyIndex:r}){if(!this.storyStoreValue)throw new V({methodName:"onStoriesChanged"});await this.storyStoreValue.onStoriesChanged({importFn:e,storyIndex:r})}async onUpdateGlobals({globals:e,currentStory:r}){if(this.storyStoreValue||await this.storeInitializationPromise,!this.storyStoreValue)throw new V({methodName:"onUpdateGlobals"});if(this.storyStoreValue.userGlobals.update(e),r){let{initialGlobals:o,storyGlobals:a,userGlobals:i,globals:l}=this.storyStoreValue.getStoryContext(r);this.channel.emit(Ce,{initialGlobals:o,userGlobals:i,storyGlobals:a,globals:l})}else{let{initialGlobals:o,globals:a}=this.storyStoreValue.userGlobals;this.channel.emit(Ce,{initialGlobals:o,userGlobals:a,storyGlobals:{},globals:a})}await Promise.all(this.storyRenders.map(o=>o.rerender()))}async onUpdateArgs({storyId:e,updatedArgs:r}){if(!this.storyStoreValue)throw new V({methodName:"onUpdateArgs"});this.storyStoreValue.args.update(e,r),await Promise.all(this.storyRenders.filter(o=>o.id===e&&!o.renderOptions.forceInitialArgs).map(o=>o.story&&o.story.usesMount?o.remount():o.rerender())),this.channel.emit(to,{storyId:e,args:this.storyStoreValue.args.get(e)})}async onRequestArgTypesInfo({id:e,payload:r}){var o;try{await this.storeInitializationPromise;let a=await((o=this.storyStoreValue)==null?void 0:o.loadStory(r));this.channel.emit(nt,{id:e,success:!0,payload:{argTypes:(a==null?void 0:a.argTypes)||{}},error:null})}catch(a){this.channel.emit(nt,{id:e,success:!1,error:a==null?void 0:a.message})}}async onResetArgs({storyId:e,argNames:r}){var i;if(!this.storyStoreValue)throw new V({methodName:"onResetArgs"});let o=((i=this.storyRenders.find(l=>l.id===e))==null?void 0:i.story)||await this.storyStoreValue.loadStory({storyId:e}),a=(r||[...new Set([...Object.keys(o.initialArgs),...Object.keys(this.storyStoreValue.args.get(e))])]).reduce((l,u)=>(l[u]=o.initialArgs[u],l),{});await this.onUpdateArgs({storyId:e,updatedArgs:a})}async onForceReRender(){await Promise.all(this.storyRenders.map(e=>e.rerender()))}async onForceRemount({storyId:e}){await Promise.all(this.storyRenders.filter(r=>r.id===e).map(r=>r.remount()))}renderStoryToElement(e,r,o,a){if(!this.renderToCanvas||!this.storyStoreValue)throw new V({methodName:"renderStoryToElement"});let i=new je(this.channel,this.storyStoreValue,this.renderToCanvas,o,e.id,"docs",a,e);return i.renderToElement(r),this.storyRenders.push(i),async()=>{await this.teardownRender(i)}}async teardownRender(e,{viewModeChanged:r}={}){var o;this.storyRenders=this.storyRenders.filter(a=>a!==e),await((o=e==null?void 0:e.teardown)==null?void 0:o.call(e,{viewModeChanged:r}))}async loadStory({storyId:e}){if(!this.storyStoreValue)throw new V({methodName:"loadStory"});return this.storyStoreValue.loadStory({storyId:e})}getStoryContext(e,{forceInitialArgs:r=!1}={}){if(!this.storyStoreValue)throw new V({methodName:"getStoryContext"});return this.storyStoreValue.getStoryContext(e,{forceInitialArgs:r})}async extract(e){if(!this.storyStoreValue)throw new V({methodName:"extract"});if(this.previewEntryError)throw this.previewEntryError;return await this.storyStoreValue.cacheAllCSFFiles(),this.storyStoreValue.extract(e)}renderPreviewEntryError(e,r){this.previewEntryError=r,I$1.error(e),I$1.error(r),this.channel.emit($t,r)}};n(Nn,"Preview");var Me=Nn,kn=class{constructor(e,r,o,a){this.channel=e,this.store=r,this.renderStoryToElement=o,this.storyIdByName=n(i=>{let l=this.nameToStoryId.get(i);if(l)return l;throw new Error(`No story found with that name: ${i}`)},"storyIdByName"),this.componentStories=n(()=>this.componentStoriesValue,"componentStories"),this.componentStoriesFromCSFFile=n(i=>this.store.componentStoriesFromCSFFile({csfFile:i}),"componentStoriesFromCSFFile"),this.storyById=n(i=>{if(!i){if(!this.primaryStory)throw new Error("No primary story defined for docs entry. Did you forget to use `<Meta>`?");return this.primaryStory}let l=this.storyIdToCSFFile.get(i);if(!l)throw new Error(`Called \`storyById\` for story that was never loaded: ${i}`);return this.store.storyFromCSFFile({storyId:i,csfFile:l})},"storyById"),this.getStoryContext=n(i=>({...this.store.getStoryContext(i),loaded:{},viewMode:"docs"}),"getStoryContext"),this.loadStory=n(i=>this.store.loadStory({storyId:i}),"loadStory"),this.componentStoriesValue=[],this.storyIdToCSFFile=new Map,this.exportToStory=new Map,this.exportsToCSFFile=new Map,this.nameToStoryId=new Map,this.attachedCSFFiles=new Set,a.forEach((i,l)=>{this.referenceCSFFile(i)})}referenceCSFFile(e){this.exportsToCSFFile.set(e.moduleExports,e),this.exportsToCSFFile.set(e.moduleExports.default,e),this.store.componentStoriesFromCSFFile({csfFile:e}).forEach(r=>{let o=e.stories[r.id];this.storyIdToCSFFile.set(o.id,e),this.exportToStory.set(o.moduleExport,r)})}attachCSFFile(e){if(!this.exportsToCSFFile.has(e.moduleExports))throw new Error("Cannot attach a CSF file that has not been referenced");this.attachedCSFFiles.has(e)||(this.attachedCSFFiles.add(e),this.store.componentStoriesFromCSFFile({csfFile:e}).forEach(r=>{this.nameToStoryId.set(r.name,r.id),this.componentStoriesValue.push(r),this.primaryStory||(this.primaryStory=r)}))}referenceMeta(e,r){let o=this.resolveModuleExport(e);if(o.type!=="meta")throw new Error("<Meta of={} /> must reference a CSF file module export or meta export. Did you mistakenly reference your component instead of your CSF file?");r&&this.attachCSFFile(o.csfFile)}get projectAnnotations(){let{projectAnnotations:e}=this.store;if(!e)throw new Error("Can't get projectAnnotations from DocsContext before they are initialized");return e}resolveAttachedModuleExportType(e){if(e==="story"){if(!this.primaryStory)throw new Error("No primary story attached to this docs file, did you forget to use <Meta of={} />?");return{type:"story",story:this.primaryStory}}if(this.attachedCSFFiles.size===0)throw new Error("No CSF file attached to this docs file, did you forget to use <Meta of={} />?");let r=Array.from(this.attachedCSFFiles)[0];if(e==="meta")return{type:"meta",csfFile:r};let{component:o}=r.meta;if(!o)throw new Error("Attached CSF file does not defined a component, did you forget to export one?");return{type:"component",component:o}}resolveModuleExport(e){let r=this.exportsToCSFFile.get(e);if(r)return{type:"meta",csfFile:r};let o=this.exportToStory.get(nr(e)?e.input:e);return o?{type:"story",story:o}:{type:"component",component:e}}resolveOf(e,r=[]){let o;if(["component","meta","story"].includes(e)){let a=e;o=this.resolveAttachedModuleExportType(a)}else o=this.resolveModuleExport(e);if(r.length&&!r.includes(o.type)){let a=o.type==="component"?"component or unknown":o.type;throw new Error(_$1`Invalid value passed to the 'of' prop. The value was resolved to a '${a}' type but the only types for this block are: ${r.join(", ")}.
        - Did you pass a component to the 'of' prop when the block only supports a story or a meta?
        - ... or vice versa?
        - Did you pass a story, CSF file or meta to the 'of' prop that is not indexed, ie. is not targeted by the 'stories' globs in the main configuration?`)}switch(o.type){case"component":return{...o,projectAnnotations:this.projectAnnotations};case"meta":return{...o,preparedMeta:this.store.preparedMetaFromCSFFile({csfFile:o.csfFile})};case"story":default:return o}}};n(kn,"DocsContext");var me=kn,Ln=class{constructor(e,r,o,a){this.channel=e,this.store=r,this.entry=o,this.callbacks=a,this.type="docs",this.subtype="csf",this.torndown=!1,this.disableKeyListeners=!1,this.preparing=!1,this.id=o.id}isPreparing(){return this.preparing}async prepare(){this.preparing=!0;let{entryExports:e,csfFiles:r=[]}=await this.store.loadEntry(this.id);if(this.torndown)throw Ae;let{importPath:o,title:a}=this.entry,i=this.store.processCSFFileWithCache(e,o,a),l=Object.keys(i.stories)[0];this.story=this.store.storyFromCSFFile({storyId:l,csfFile:i}),this.csfFiles=[i,...r],this.preparing=!1}isEqual(e){return!!(this.id===e.id&&this.story&&this.story===e.story)}docsContext(e){if(!this.csfFiles)throw new Error("Cannot render docs before preparing");let r=new me(this.channel,this.store,e,this.csfFiles);return this.csfFiles.forEach(o=>r.attachCSFFile(o)),r}async renderToElement(e,r){if(!this.story||!this.csfFiles)throw new Error("Cannot render docs before preparing");let o=this.docsContext(r),{docs:a}=this.story.parameters||{};if(!a)throw new Error("Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed");let i=await a.renderer(),{render:l}=i,u=n(async()=>{try{await l(o,a,e),this.channel.emit(pr,this.id)}catch(c){this.callbacks.showException(c)}},"renderDocs");return this.rerender=async()=>u(),this.teardownRender=async({viewModeChanged:c})=>{!c||!e||i.unmount(e)},u()}async teardown({viewModeChanged:e}={}){var r;(r=this.teardownRender)==null||r.call(this,{viewModeChanged:e}),this.torndown=!0}};n(Ln,"CsfDocsRender");var qr=Ln,jn=class{constructor(e,r,o,a){this.channel=e,this.store=r,this.entry=o,this.callbacks=a,this.type="docs",this.subtype="mdx",this.torndown=!1,this.disableKeyListeners=!1,this.preparing=!1,this.id=o.id}isPreparing(){return this.preparing}async prepare(){this.preparing=!0;let{entryExports:e,csfFiles:r=[]}=await this.store.loadEntry(this.id);if(this.torndown)throw Ae;this.csfFiles=r,this.exports=e,this.preparing=!1}isEqual(e){return!!(this.id===e.id&&this.exports&&this.exports===e.exports)}docsContext(e){if(!this.csfFiles)throw new Error("Cannot render docs before preparing");return new me(this.channel,this.store,e,this.csfFiles)}async renderToElement(e,r){if(!this.exports||!this.csfFiles||!this.store.projectAnnotations)throw new Error("Cannot render docs before preparing");let o=this.docsContext(r),{docs:a}=this.store.projectAnnotations.parameters||{};if(!a)throw new Error("Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed");let i={...a,page:this.exports.default},l=await a.renderer(),{render:u}=l,c=n(async()=>{try{await u(o,i,e),this.channel.emit(pr,this.id)}catch(d){this.callbacks.showException(d)}},"renderDocs");return this.rerender=async()=>c(),this.teardownRender=async({viewModeChanged:d}={})=>{!d||!e||(l.unmount(e),this.torndown=!0)},c()}async teardown({viewModeChanged:e}={}){var r;(r=this.teardownRender)==null||r.call(this,{viewModeChanged:e}),this.torndown=!0}};n(jn,"MdxDocsRender");var Br=jn,lu=globalThis;function cu(t){let e=t.composedPath&&t.composedPath()[0]||t.target;return/input|textarea/i.test(e.tagName)||e.getAttribute("contenteditable")!==null}n(cu,"focusInInput");var Qi="attached-mdx",pu="unattached-mdx";function du({tags:t}){return(t==null?void 0:t.includes(pu))||(t==null?void 0:t.includes(Qi))}n(du,"isMdxEntry");function Mn(t){return t.type==="story"}n(Mn,"isStoryRender");function uu(t){return t.type==="docs"}n(uu,"isDocsRender");function fu(t){return uu(t)&&t.subtype==="csf"}n(fu,"isCsfDocsRender");var Un=class extends Me{constructor(e,r,o,a){super(e,r,void 0,!1),this.importFn=e,this.getProjectAnnotations=r,this.selectionStore=o,this.view=a,this.initialize()}setupListeners(){super.setupListeners(),lu.onkeydown=this.onKeydown.bind(this),this.channel.on(eo,this.onSetCurrentStory.bind(this)),this.channel.on(po,this.onUpdateQueryParams.bind(this)),this.channel.on(Qt,this.onPreloadStories.bind(this))}async setInitialGlobals(){if(!this.storyStoreValue)throw new V({methodName:"setInitialGlobals"});let{globals:e}=this.selectionStore.selectionSpecifier||{};e&&this.storyStoreValue.userGlobals.updateFromPersisted(e),this.emitGlobals()}async initializeWithStoryIndex(e){return await super.initializeWithStoryIndex(e),this.selectSpecifiedStory()}async selectSpecifiedStory(){if(!this.storyStoreValue)throw new V({methodName:"selectSpecifiedStory"});if(this.selectionStore.selection){await this.renderSelection();return}if(!this.selectionStore.selectionSpecifier){this.renderMissingStory();return}let{storySpecifier:e,args:r}=this.selectionStore.selectionSpecifier,o=this.storyStoreValue.storyIndex.entryFromSpecifier(e);if(!o){e==="*"?this.renderStoryLoadingException(e,new Pr):this.renderStoryLoadingException(e,new Or({storySpecifier:e.toString()}));return}let{id:a,type:i}=o;this.selectionStore.setSelection({storyId:a,viewMode:i}),this.channel.emit(ao,this.selectionStore.selection),this.channel.emit(rt,this.selectionStore.selection),await this.renderSelection({persistedArgs:r})}async onGetProjectAnnotationsChanged({getProjectAnnotations:e}){await super.onGetProjectAnnotationsChanged({getProjectAnnotations:e}),this.selectionStore.selection&&this.renderSelection()}async onStoriesChanged({importFn:e,storyIndex:r}){await super.onStoriesChanged({importFn:e,storyIndex:r}),this.selectionStore.selection?await this.renderSelection():await this.selectSpecifiedStory()}onKeydown(e){if(!this.storyRenders.find(r=>r.disableKeyListeners)&&!cu(e)){let{altKey:r,ctrlKey:o,metaKey:a,shiftKey:i,key:l,code:u,keyCode:c}=e;this.channel.emit(Zt,{event:{altKey:r,ctrlKey:o,metaKey:a,shiftKey:i,key:l,code:u,keyCode:c}})}}async onSetCurrentStory(e){this.selectionStore.setSelection({viewMode:"story",...e}),await this.storeInitializationPromise,this.channel.emit(rt,this.selectionStore.selection),this.renderSelection()}onUpdateQueryParams(e){this.selectionStore.setQueryParams(e)}async onUpdateGlobals({globals:e}){var o,a;let r=this.currentRender instanceof je&&this.currentRender.story||void 0;super.onUpdateGlobals({globals:e,currentStory:r}),(this.currentRender instanceof Br||this.currentRender instanceof qr)&&await((a=(o=this.currentRender).rerender)==null?void 0:a.call(o))}async onUpdateArgs({storyId:e,updatedArgs:r}){super.onUpdateArgs({storyId:e,updatedArgs:r})}async onPreloadStories({ids:e}){await this.storeInitializationPromise,this.storyStoreValue&&await Promise.allSettled(e.map(r=>{var o;return(o=this.storyStoreValue)==null?void 0:o.loadEntry(r)}))}async renderSelection({persistedArgs:e}={}){var g,J,ne,le;let{renderToCanvas:r}=this;if(!this.storyStoreValue||!r)throw new V({methodName:"renderSelection"});let{selection:o}=this.selectionStore;if(!o)throw new Error("Cannot call renderSelection as no selection was made");let{storyId:a}=o,i;try{i=await this.storyStoreValue.storyIdToEntry(a)}catch(re){this.currentRender&&await this.teardownRender(this.currentRender),this.renderStoryLoadingException(a,re);return}let l=((g=this.currentSelection)==null?void 0:g.storyId)!==a,u=((J=this.currentRender)==null?void 0:J.type)!==i.type;i.type==="story"?this.view.showPreparingStory({immediate:u}):this.view.showPreparingDocs({immediate:u}),(ne=this.currentRender)!=null&&ne.isPreparing()&&await this.teardownRender(this.currentRender);let c;i.type==="story"?c=new je(this.channel,this.storyStoreValue,r,this.mainStoryCallbacks(a),a,"story"):du(i)?c=new Br(this.channel,this.storyStoreValue,i,this.mainStoryCallbacks(a)):c=new qr(this.channel,this.storyStoreValue,i,this.mainStoryCallbacks(a));let d=this.currentSelection;this.currentSelection=o;let m=this.currentRender;this.currentRender=c;try{await c.prepare()}catch(re){m&&await this.teardownRender(m),re!==Ae&&this.renderStoryLoadingException(a,re);return}let h=!l&&m&&!c.isEqual(m);if(e&&Mn(c)&&(fe(!!c.story),this.storyStoreValue.args.updateFromPersisted(c.story,e)),m&&!m.torndown&&!l&&!h&&!u){this.currentRender=m,this.channel.emit(co,a),this.view.showMain();return}if(m&&await this.teardownRender(m,{viewModeChanged:u}),d&&(l||u)&&this.channel.emit(oo,a),Mn(c)){fe(!!c.story);let{parameters:re,initialArgs:ce,argTypes:F,unmappedArgs:se,initialGlobals:he,userGlobals:Ve,storyGlobals:we,globals:ve}=this.storyStoreValue.getStoryContext(c.story);this.channel.emit(io,{id:a,parameters:re,initialArgs:ce,argTypes:F,args:se}),this.channel.emit(Ce,{userGlobals:Ve,storyGlobals:we,globals:ve,initialGlobals:he})}else{let{parameters:re}=this.storyStoreValue.projectAnnotations,{initialGlobals:ce,globals:F}=this.storyStoreValue.userGlobals;if(this.channel.emit(Ce,{globals:F,initialGlobals:ce,storyGlobals:{},userGlobals:F}),fu(c)||((le=c.entry.tags)==null?void 0:le.includes(Qi))){if(!c.csfFiles)throw new Cr({storyId:a});({parameters:re}=this.storyStoreValue.preparedMetaFromCSFFile({csfFile:c.csfFiles[0]}))}this.channel.emit(Yt,{id:a,parameters:re})}Mn(c)?(fe(!!c.story),this.storyRenders.push(c),this.currentRender.renderToElement(this.view.prepareForStory(c.story))):this.currentRender.renderToElement(this.view.prepareForDocs(),this.renderStoryToElement.bind(this))}async teardownRender(e,{viewModeChanged:r=!1}={}){var o;this.storyRenders=this.storyRenders.filter(a=>a!==e),await((o=e==null?void 0:e.teardown)==null?void 0:o.call(e,{viewModeChanged:r}))}mainStoryCallbacks(e){return{showStoryDuringRender:n(()=>this.view.showStoryDuringRender(),"showStoryDuringRender"),showMain:n(()=>this.view.showMain(),"showMain"),showError:n(r=>this.renderError(e,r),"showError"),showException:n(r=>this.renderException(e,r),"showException")}}renderPreviewEntryError(e,r){super.renderPreviewEntryError(e,r),this.view.showErrorDisplay(r)}renderMissingStory(){this.view.showNoPreview(),this.channel.emit(tt)}renderStoryLoadingException(e,r){I$1.error(r),this.view.showErrorDisplay(r),this.channel.emit(tt,e)}renderException(e,r){let{name:o="Error",message:a=String(r),stack:i}=r;this.channel.emit(lo,{name:o,message:a,stack:i}),this.channel.emit(Pe,{newPhase:"errored",storyId:e}),this.view.showErrorDisplay(r),I$1.error(`Error rendering story '${e}':`),I$1.error(r)}renderError(e,{title:r,description:o}){I$1.error(`Error rendering story ${r}: ${o}`),this.channel.emit(no,{title:r,description:o}),this.channel.emit(Pe,{newPhase:"errored",storyId:e}),this.view.showErrorDisplay({message:r,stack:o})}};n(Un,"PreviewWithSelection");var Ue=Un,Hr=ue(kt()),da=ue(kt()),pa=/^[a-zA-Z0-9 _-]*$/,ua=/^-?[0-9]+(\.[0-9]+)?$/,Uu=/^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i,fa=/^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i,Wn=n((t="",e)=>t===null||t===""||!pa.test(t)?!1:e==null||e instanceof Date||typeof e=="number"||typeof e=="boolean"?!0:typeof e=="string"?pa.test(e)||ua.test(e)||Uu.test(e)||fa.test(e):Array.isArray(e)?e.every(r=>Wn(t,r)):$$1(e)?Object.entries(e).every(([r,o])=>Wn(r,o)):!1,"validateArgs"),Gu={delimiter:";",nesting:!0,arrayRepeat:!0,arrayRepeatSyntax:"bracket",nestingSyntax:"js",valueDeserializer(t){if(t.startsWith("!")){if(t==="!undefined")return;if(t==="!null")return null;if(t==="!true")return!0;if(t==="!false")return!1;if(t.startsWith("!date(")&&t.endsWith(")"))return new Date(t.replaceAll(" ","+").slice(6,-1));if(t.startsWith("!hex(")&&t.endsWith(")"))return`#${t.slice(5,-1)}`;let e=t.slice(1).match(fa);if(e)return t.startsWith("!rgba")||t.startsWith("!RGBA")?`${e[1]}(${e[2]}, ${e[3]}, ${e[4]}, ${e[5]})`:t.startsWith("!hsla")||t.startsWith("!HSLA")?`${e[1]}(${e[2]}, ${e[3]}%, ${e[4]}%, ${e[5]})`:t.startsWith("!rgb")||t.startsWith("!RGB")?`${e[1]}(${e[2]}, ${e[3]}, ${e[4]})`:`${e[1]}(${e[2]}, ${e[3]}%, ${e[4]}%)`}return ua.test(t)?Number(t):t}},$n=n(t=>{let e=t.split(";").map(r=>r.replace("=","~").replace(":","="));return Object.entries((0,da.parse)(e.join(";"),Gu)).reduce((r,[o,a])=>Wn(o,a)?Object.assign(r,{[o]:a}):(j$1.warn(_$1`
      Omitted potentially unsafe URL args.

      More info: https://storybook.js.org/docs/writing-stories/args#setting-args-through-the-url
    `),r),{})},"parseArgsParam"),{history:ya,document:xe}=E$1;function qu(t){let e=(t||"").match(/^\/story\/(.+)/);if(!e)throw new Error(`Invalid path '${t}',  must start with '/story/'`);return e[1]}n(qu,"pathToId");var ma=n(({selection:t,extraParams:e})=>{let r=xe==null?void 0:xe.location.search.slice(1),{path:o,selectedKind:a,selectedStory:i,...l}=(0,Hr.parse)(r);return`?${(0,Hr.stringify)({...l,...e,...t&&{id:t.storyId,viewMode:t.viewMode}})}`},"getQueryString"),Bu=n(t=>{if(!t)return;let e=ma({selection:t}),{hash:r=""}=xe.location;xe.title=t.storyId,ya.replaceState({},"",`${xe.location.pathname}${e}${r}`)},"setPath"),Vu=n(t=>t!=null&&typeof t=="object"&&Array.isArray(t)===!1,"isObject"),Vr=n(t=>{if(t!==void 0){if(typeof t=="string")return t;if(Array.isArray(t))return Vr(t[0]);if(Vu(t))return Vr(Object.values(t).filter(Boolean))}},"getFirstString"),Hu=n(()=>{if(typeof xe<"u"){let t=xe.location.search.slice(1),e=(0,Hr.parse)(t),r=typeof e.args=="string"?$n(e.args):void 0,o=typeof e.globals=="string"?$n(e.globals):void 0,a=Vr(e.viewMode);(typeof a!="string"||!a.match(/docs|story/))&&(a="story");let i=Vr(e.path),l=i?qu(i):Vr(e.id);if(l)return{storySpecifier:l,args:r,globals:o,viewMode:a}}return null},"getSelectionSpecifierFromPath"),Yn=class{constructor(){this.selectionSpecifier=Hu()}setSelection(e){this.selection=e,Bu(this.selection)}setQueryParams(e){let r=ma({extraParams:e}),{hash:o=""}=xe.location;ya.replaceState({},"",`${xe.location.pathname}${r}${o}`)}};n(Yn,"UrlStore");var Be=Yn,$a=ue(Ha()),Ya=ue(kt()),{document:z$1}=E$1,za=100,Ka=(t=>(t.MAIN="MAIN",t.NOPREVIEW="NOPREVIEW",t.PREPARING_STORY="PREPARING_STORY",t.PREPARING_DOCS="PREPARING_DOCS",t.ERROR="ERROR",t))(Ka||{}),rs={PREPARING_STORY:"sb-show-preparing-story",PREPARING_DOCS:"sb-show-preparing-docs",MAIN:"sb-show-main",NOPREVIEW:"sb-show-nopreview",ERROR:"sb-show-errordisplay"},ts={centered:"sb-main-centered",fullscreen:"sb-main-fullscreen",padded:"sb-main-padded"},Wa=new $a.default({escapeXML:!0}),os=class{constructor(){if(this.testing=!1,typeof z$1<"u"){let{__SPECIAL_TEST_PARAMETER__:e}=(0,Ya.parse)(z$1.location.search.slice(1));switch(e){case"preparing-story":{this.showPreparingStory(),this.testing=!0;break}case"preparing-docs":{this.showPreparingDocs(),this.testing=!0;break}}}}prepareForStory(e){return this.showStory(),this.applyLayout(e.parameters.layout),z$1.documentElement.scrollTop=0,z$1.documentElement.scrollLeft=0,this.storyRoot()}storyRoot(){return z$1.getElementById("storybook-root")}prepareForDocs(){return this.showMain(),this.showDocs(),this.applyLayout("fullscreen"),z$1.documentElement.scrollTop=0,z$1.documentElement.scrollLeft=0,this.docsRoot()}docsRoot(){return z$1.getElementById("storybook-docs")}applyLayout(e="padded"){if(e==="none"){z$1.body.classList.remove(this.currentLayoutClass),this.currentLayoutClass=null;return}this.checkIfLayoutExists(e);let r=ts[e];z$1.body.classList.remove(this.currentLayoutClass),z$1.body.classList.add(r),this.currentLayoutClass=r}checkIfLayoutExists(e){ts[e]||I$1.warn(_$1`
          The desired layout: ${e} is not a valid option.
          The possible options are: ${Object.keys(ts).join(", ")}, none.
        `)}showMode(e){clearTimeout(this.preparingTimeout),Object.keys(Ka).forEach(r=>{r===e?z$1.body.classList.add(rs[r]):z$1.body.classList.remove(rs[r])})}showErrorDisplay({message:e="",stack:r=""}){let o=e,a=r,i=e.split(`
`);i.length>1&&([o]=i,a=i.slice(1).join(`
`).replace(/^\n/,"")),z$1.getElementById("error-message").innerHTML=Wa.toHtml(o),z$1.getElementById("error-stack").innerHTML=Wa.toHtml(a),this.showMode("ERROR")}showNoPreview(){var e,r;this.testing||(this.showMode("NOPREVIEW"),(e=this.storyRoot())==null||e.setAttribute("hidden","true"),(r=this.docsRoot())==null||r.setAttribute("hidden","true"))}showPreparingStory({immediate:e=!1}={}){clearTimeout(this.preparingTimeout),e?this.showMode("PREPARING_STORY"):this.preparingTimeout=setTimeout(()=>this.showMode("PREPARING_STORY"),za)}showPreparingDocs({immediate:e=!1}={}){clearTimeout(this.preparingTimeout),e?this.showMode("PREPARING_DOCS"):this.preparingTimeout=setTimeout(()=>this.showMode("PREPARING_DOCS"),za)}showMain(){this.showMode("MAIN")}showDocs(){this.storyRoot().setAttribute("hidden","true"),this.docsRoot().removeAttribute("hidden")}showStory(){this.docsRoot().setAttribute("hidden","true"),this.storyRoot().removeAttribute("hidden")}showStoryDuringRender(){z$1.body.classList.add(rs.MAIN)}};n(os,"WebView");var He=os,ns=class extends Ue{constructor(e,r){super(e,r,new Be,new He),this.importFn=e,this.getProjectAnnotations=r,E$1.__STORYBOOK_PREVIEW__=this}};n(ns,"PreviewWeb");var Wr=ns,{document:ze}=E$1,wf=["application/javascript","application/ecmascript","application/x-ecmascript","application/x-javascript","text/ecmascript","text/javascript","text/javascript1.0","text/javascript1.1","text/javascript1.2","text/javascript1.3","text/javascript1.4","text/javascript1.5","text/jscript","text/livescript","text/x-ecmascript","text/x-javascript","module"],_f="script",Xa="scripts-root";function $r(){let t=ze.createEvent("Event");t.initEvent("DOMContentLoaded",!0,!0),ze.dispatchEvent(t)}n($r,"simulateDOMContentLoaded");function Cf(t,e,r){let o=ze.createElement("script");o.type=t.type==="module"?"module":"text/javascript",t.src?(o.onload=e,o.onerror=e,o.src=t.src):o.textContent=t.innerText,r?r.appendChild(o):ze.head.appendChild(o),t.parentNode.removeChild(t),t.src||e()}n(Cf,"insertScript");function Ja(t,e,r=0){t[r](()=>{r++,r===t.length?e():Ja(t,e,r)})}n(Ja,"insertScriptsSequentially");function ss(t){let e=ze.getElementById(Xa);e?e.innerHTML="":(e=ze.createElement("div"),e.id=Xa,ze.body.appendChild(e));let r=Array.from(t.querySelectorAll(_f));if(r.length){let o=[];r.forEach(a=>{let i=a.getAttribute("type");(!i||wf.includes(i))&&o.push(l=>Cf(a,l,e))}),o.length&&Ja(o,$r,void 0)}else $r()}n(ss,"simulatePageLoad");var Qa={"@storybook/global":Ht,"storybook/internal/channels":br,"@storybook/channels":br,"@storybook/core/channels":br,"storybook/internal/client-logger":mr,"@storybook/client-logger":mr,"@storybook/core/client-logger":mr,"storybook/internal/core-events":ge,"@storybook/core-events":ge,"@storybook/core/core-events":ge,"storybook/internal/preview-errors":kr,"@storybook/core-events/preview-errors":kr,"@storybook/core/preview-errors":kr,"storybook/internal/preview-api":Yr,"@storybook/preview-api":Yr,"@storybook/core/preview-api":Yr,"storybook/internal/types":Tr,"@storybook/types":Tr,"@storybook/core/types":Tr},el=ue(Za()),ls;function Pf(){var t;return ls||(ls=new el.default((t=E$1.navigator)==null?void 0:t.userAgent).getBrowserInfo()),ls}n(Pf,"getBrowserInfo");function rl(t){return t.browserInfo=Pf(),t}n(rl,"prepareForTelemetry");function Of(t){let e=t.error||t;e.fromStorybook&&E$1.sendTelemetryError(e)}n(Of,"errorListener");function If({reason:t}){t.fromStorybook&&E$1.sendTelemetryError(t)}n(If,"unhandledRejectionListener");function Ff(){cs.forEach(t=>{E$1[yo[t]]=Qa[t]}),E$1.sendTelemetryError=t=>{E$1.__STORYBOOK_ADDONS_CHANNEL__.emit(uo,rl(t))},E$1.addEventListener("error",Of),E$1.addEventListener("unhandledrejection",If)}n(Ff,"setup");Ff();const{createBrowserChannel}=__STORYBOOK_MODULE_CHANNELS__,{addons}=__STORYBOOK_MODULE_PREVIEW_API__,channel=createBrowserChannel({page:"preview"});addons.setChannel(channel);window.__STORYBOOK_ADDONS_CHANNEL__=channel;window.CONFIG_TYPE==="DEVELOPMENT"&&(window.__STORYBOOK_SERVER_CHANNEL__=channel);var b=Object.create,f=Object.defineProperty,v=Object.getOwnPropertyDescriptor,P=Object.getOwnPropertyNames,O=Object.getPrototypeOf,_=Object.prototype.hasOwnProperty,s=(t,e)=>f(t,"name",{value:e,configurable:!0}),$=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),j=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of P(e))!_.call(t,a)&&a!==r&&f(t,a,{get:()=>e[a],enumerable:!(o=v(e,a))||o.enumerable});return t},C=(t,e,r)=>(r=t!=null?b(O(t)):{},j(f(r,"default",{value:t,enumerable:!0}),t)),T=$(t=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isEqual=function(){var e=Object.prototype.toString,r=Object.getPrototypeOf,o=Object.getOwnPropertySymbols?function(a){return Object.keys(a).concat(Object.getOwnPropertySymbols(a))}:Object.keys;return function(a,i){return s(function l(u,c,d){var m,h,g,J=e.call(u),ne=e.call(c);if(u===c)return!0;if(u==null||c==null)return!1;if(d.indexOf(u)>-1&&d.indexOf(c)>-1)return!0;if(d.push(u,c),J!=ne||(m=o(u),h=o(c),m.length!=h.length||m.some(function(le){return!l(u[le],c[le],d)})))return!1;switch(J.slice(8,-1)){case"Symbol":return u.valueOf()==c.valueOf();case"Date":case"Number":return+u==+c||+u!=+u&&+c!=+c;case"RegExp":case"Function":case"String":case"Boolean":return""+u==""+c;case"Set":case"Map":m=u.entries(),h=c.entries();do if(!l((g=m.next()).value,h.next().value,d))return!1;while(!g.done);return!0;case"ArrayBuffer":u=new Uint8Array(u),c=new Uint8Array(c);case"DataView":u=new Uint8Array(u.buffer),c=new Uint8Array(c.buffer);case"Float32Array":case"Float64Array":case"Int8Array":case"Int16Array":case"Int32Array":case"Uint8Array":case"Uint16Array":case"Uint32Array":case"Uint8ClampedArray":case"Arguments":case"Array":if(u.length!=c.length)return!1;for(g=0;g<u.length;g++)if((g in u||g in c)&&(g in u!=g in c||!l(u[g],c[g],d)))return!1;return!0;case"Object":return l(r(u),r(c),d);default:return!1}},"n")(a,i,[])}}()});function R(t){return t.replace(/_/g," ").replace(/-/g," ").replace(/\./g," ").replace(/([^\n])([A-Z])([a-z])/g,(e,r,o,a)=>`${r} ${o}${a}`).replace(/([a-z])([A-Z])/g,(e,r,o)=>`${r} ${o}`).replace(/([a-z])([0-9])/gi,(e,r,o)=>`${r} ${o}`).replace(/([0-9])([a-z])/gi,(e,r,o)=>`${r} ${o}`).replace(/(\s|^)(\w)/g,(e,r,o)=>`${r}${o.toUpperCase()}`).replace(/ +/g," ").trim()}s(R,"toStartCaseStr");var y=C(T()),x=s(t=>t.map(e=>typeof e<"u").filter(Boolean).length,"count"),E=s((t,e)=>{let{exists:r,eq:o,neq:a,truthy:i}=t;if(x([r,o,a,i])>1)throw new Error(`Invalid conditional test ${JSON.stringify({exists:r,eq:o,neq:a})}`);if(typeof o<"u")return(0,y.isEqual)(e,o);if(typeof a<"u")return!(0,y.isEqual)(e,a);if(typeof r<"u"){let l=typeof e<"u";return r?l:!l}return typeof i>"u"||i?!!e:!e},"testValue"),z=s((t,e,r)=>{if(!t.if)return!0;let{arg:o,global:a}=t.if;if(x([o,a])!==1)throw new Error(`Invalid conditional value ${JSON.stringify({arg:o,global:a})}`);let i=o?e[o]:r[a];return E(t.if,i)},"includeConditionalArg");const{composeConfigs:M,normalizeProjectAnnotations:N}=__STORYBOOK_MODULE_PREVIEW_API__;function L(t){let e,r={_tag:"Preview",input:t,get composed(){if(e)return e;let{addons:o,...a}=t;return e=N(M([...o??[],a])),e},meta(o){return I(o,this)}};return globalThis.globalProjectAnnotations=r.composed,r}s(L,"__definePreview");function W(t){return t!=null&&typeof t=="object"&&"_tag"in t&&(t==null?void 0:t._tag)==="Preview"}s(W,"isPreview");function H(t){return t!=null&&typeof t=="object"&&"_tag"in t&&(t==null?void 0:t._tag)==="Meta"}s(H,"isMeta");function I(t,e){return{_tag:"Meta",input:t,preview:e,get composed(){throw new Error("Not implemented")},story(r){return U(r,this)}}}s(I,"defineMeta");function U(t,e){return{_tag:"Story",input:t,meta:e,get composed(){throw new Error("Not implemented")}}}s(U,"defineStory");function K(t){return t!=null&&typeof t=="object"&&"_tag"in t&&(t==null?void 0:t._tag)==="Story"}s(K,"isStory");var D=s(t=>t.toLowerCase().replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,"-").replace(/-+/g,"-").replace(/^-+/,"").replace(/-+$/,""),"sanitize");function S(t,e){return Array.isArray(e)?e.includes(t):t.match(e)}s(S,"matches");function te(t,{includeStories:e,excludeStories:r}){return t!=="__esModule"&&(!e||S(t,e))&&(!r||!S(t,r))}s(te,"isExportStory");const importers={"./src/stories/button.stories.tsx":()=>__vitePreload(()=>import("./button.stories-B86QCYKD.js"),__vite__mapDeps([0,1,2]),import.meta.url)};async function importFn(t){return await importers[t]()}Ff();const{composeConfigs,PreviewWeb}=__STORYBOOK_MODULE_PREVIEW_API__,getProjectAnnotations=async(t=[])=>{const e=await __vitePreload(()=>import("./preview-CIwosuWp.js"),[],import.meta.url);if(W(e.default))return e.default.composed;const r=await Promise.all([t[0]??__vitePreload(()=>import("./entry-preview-uiuKfRXM.js"),__vite__mapDeps([3,4,2,5]),import.meta.url),t[1]??__vitePreload(()=>import("./entry-preview-docs-xgTJAu4K.js"),__vite__mapDeps([6,4,7,2]),import.meta.url),t[2]??__vitePreload(()=>import("./preview-4tyBEhRc.js"),[],import.meta.url),t[3]??__vitePreload(()=>import("./preview-C_oRvk42.js"),[],import.meta.url),t[4]??__vitePreload(()=>import("./preview-D6DYhgjB.js"),[],import.meta.url),t[5]??__vitePreload(()=>import("./preview-ASNmsWDf.js"),__vite__mapDeps([8,9]),import.meta.url),t[6]??__vitePreload(()=>import("./preview-C0p7j47a.js"),[],import.meta.url),t[7]??__vitePreload(()=>import("./preview-D6lEy75_.js"),[],import.meta.url),t[8]??__vitePreload(()=>import("./preview-DZSwiA0z.js"),__vite__mapDeps([10,9]),import.meta.url),t[9]??__vitePreload(()=>import("./preview-CsPQu-H9.js"),[],import.meta.url),t[10]??__vitePreload(()=>import("./preview-Dsq_8SDT.js"),[],import.meta.url)]);return composeConfigs([...r,e])};window.__STORYBOOK_PREVIEW__=window.__STORYBOOK_PREVIEW__||new PreviewWeb(importFn,getProjectAnnotations);window.__STORYBOOK_STORY_STORE__=window.__STORYBOOK_STORY_STORE__||window.__STORYBOOK_PREVIEW__.storyStore;function injectStyle(t,e="top"){if(!t||typeof document>"u")return;const r=document.head||document.querySelector("head"),o=r.querySelector(":first-child"),a=document.createElement("style");a.appendChild(document.createTextNode(t)),e==="top"&&o?r.insertBefore(a,o):r.appendChild(a)}injectStyle(`
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

  /*
   * Theme colors in Platform.Bible. These are applied in CSS properties using \`hsl(var(--varName))\`
   * or Tailwind classes like \`tw-bg-primary\`
   *
   * See the wiki's
   * [Matching Application Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 210 20% 98%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 90%;
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

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }

  /* using color palette https://supercolorpalette.com/?scp=G0-hsl-99827A-E7DDD0-FEF4E7-FEFAF1-FFFFFF-D8E9E3-719892-07463D-0A433D-083030-041616-000000-85DBB8-F2F52E-CD3737 */
  .paratext-light {
    --background: 0 0% 100%;
    --foreground: 0 0% 0%;
    --muted: 33.9 32.4% 86.1%;
    --muted-foreground: 15.5 13.2% 53.9%;
    --popover: 40 20% 98%;
    --popover-foreground: 0 0% 0%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 0%;
    --border: 220 13% 91%;
    --input: 161.3 26.7% 88.2%;
    --primary: 173.4 82.1% 15.3%;
    --primary-foreground: 40 85.7% 97.3%;
    --secondary: 161.3 26.7% 88.2%;
    --secondary-foreground: 173.4 82.1% 15.3%;
    --accent: 161.3 26.7% 88.2%;
    --accent-foreground: 173.4 82.1% 15.3%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;
  }

  .paratext-dark {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --muted: 15.5 13.2% 53.9%;
    --muted-foreground: 33.9 32.4% 86.1%;
    --popover: 180 71.4% 5%;
    --popover-foreground: 0 0% 100%;
    --card: 0 0% 0%;
    --card-foreground: 0 0% 100%;
    --border: 220 13% 20%;
    --input: 220 13% 20%;
    --primary: 161.3 26.7% 88.2%;
    --primary-foreground: 173.4 82.1% 15.3%;
    --secondary: 180 71.4% 11%;
    --secondary-foreground: 161.3 26.7% 88.2%;
    --accent: 180 71.4% 11%;
    --accent-foreground: 161.3 26.7% 88.2%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;
  }
  * {
  border-color: hsl(var(--border));
}

  body {
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
  --tw-prose-body: #374151;
  --tw-prose-headings: #111827;
  --tw-prose-lead: #4b5563;
  --tw-prose-links: #111827;
  --tw-prose-bold: #111827;
  --tw-prose-counters: #6b7280;
  --tw-prose-bullets: #d1d5db;
  --tw-prose-hr: #e5e7eb;
  --tw-prose-quotes: #111827;
  --tw-prose-quote-borders: #e5e7eb;
  --tw-prose-captions: #6b7280;
  --tw-prose-kbd: #111827;
  --tw-prose-kbd-shadows: 17 24 39;
  --tw-prose-code: #111827;
  --tw-prose-pre-code: #e5e7eb;
  --tw-prose-pre-bg: #1f2937;
  --tw-prose-th-borders: #d1d5db;
  --tw-prose-td-borders: #e5e7eb;
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
.tw-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.tw-bottom-2 {
  bottom: 0.5rem;
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
.tw-z-30 {
  z-index: 30;
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
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-m-1 {
  margin: 0.25rem;
}
.tw-m-2 {
  margin: 0.5rem;
}
.tw-m-4 {
  margin: 1rem;
}
.tw--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
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
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.tw-my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.tw-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.tw-mb-1 {
  margin-bottom: 0.25rem;
}
.tw-mb-2 {
  margin-bottom: 0.5rem;
}
.tw-mb-20 {
  margin-bottom: 5rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-me-4 {
  margin-inline-end: 1rem;
}
.tw-ml-1 {
  margin-left: 0.25rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
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
.tw-ms-1 {
  margin-inline-start: 0.25rem;
}
.tw-ms-2 {
  margin-inline-start: 0.5rem;
}
.tw-ms-3 {
  margin-inline-start: 0.75rem;
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
.tw-mt-20 {
  margin-top: 5rem;
}
.tw-mt-3 {
  margin-top: 0.75rem;
}
.tw-mt-4 {
  margin-top: 1rem;
}
.tw-mt-auto {
  margin-top: auto;
}
.tw-box-border {
  box-sizing: border-box;
}
.tw-box-content {
  box-sizing: content-box;
}
.tw-block {
  display: block;
}
.tw-inline-block {
  display: inline-block;
}
.tw-inline {
  display: inline;
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
.tw-h-1\\/2 {
  height: 50%;
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
.tw-h-\\[100\\%\\] {
  height: 100%;
}
.tw-h-\\[1px\\] {
  height: 1px;
}
.tw-h-\\[405px\\] {
  height: 405px;
}
.tw-h-\\[5px\\] {
  height: 5px;
}
.tw-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.tw-h-full {
  height: 100%;
}
.tw-h-px {
  height: 1px;
}
.tw-h-screen {
  height: 100vh;
}
.tw-h-svh {
  height: 100svh;
}
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-min-h-0 {
  min-height: 0px;
}
.tw-min-h-svh {
  min-height: 100svh;
}
.tw-w-0 {
  width: 0px;
}
.tw-w-1\\/2 {
  width: 50%;
}
.tw-w-1\\/3 {
  width: 33.333333%;
}
.tw-w-10 {
  width: 2.5rem;
}
.tw-w-11 {
  width: 2.75rem;
}
.tw-w-14 {
  width: 3.5rem;
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
.tw-w-3 {
  width: 0.75rem;
}
.tw-w-3\\.5 {
  width: 0.875rem;
}
.tw-w-3\\/4 {
  width: 75%;
}
.tw-w-4 {
  width: 1rem;
}
.tw-w-5 {
  width: 1.25rem;
}
.tw-w-6 {
  width: 1.5rem;
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
.tw-w-9 {
  width: 2.25rem;
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
.tw-w-\\[1px\\] {
  width: 1px;
}
.tw-w-\\[200px\\] {
  width: 200px;
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
.tw-w-\\[46px\\] {
  width: 46px;
}
.tw-w-\\[5px\\] {
  width: 5px;
}
.tw-w-\\[70px\\] {
  width: 70px;
}
.tw-w-auto {
  width: auto;
}
.tw-w-full {
  width: 100%;
}
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-5 {
  min-width: 1.25rem;
}
.tw-min-w-72 {
  min-width: 18rem;
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
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-\\[--skeleton-width\\] {
  max-width: var(--skeleton-width);
}
.tw-max-w-\\[220px\\] {
  max-width: 220px;
}
.tw-max-w-lg {
  max-width: 32rem;
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
.tw-shrink-0 {
  flex-shrink: 0;
}
.tw-flex-grow {
  flex-grow: 1;
}
.tw-grow {
  flex-grow: 1;
}
.tw-basis-0 {
  flex-basis: 0px;
}
.tw-caption-bottom {
  caption-side: bottom;
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
.tw-rotate-0 {
  --tw-rotate: 0deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-rotate-90 {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-scale-0 {
  --tw-scale-x: 0;
  --tw-scale-y: 0;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
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
.tw-cursor-not-allowed {
  cursor: not-allowed;
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
.tw-list-disc {
  list-style-type: disc;
}
.tw-columns-2 {
  columns: 2;
}
.tw-auto-rows-max {
  grid-auto-rows: max-content;
}
.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.tw-grid-cols-\\[25\\%\\,25\\%\\,50\\%\\] {
  grid-template-columns: 25% 25% 50%;
}
.tw-grid-cols-\\[25\\%\\,50\\%\\,25\\%\\] {
  grid-template-columns: 25% 50% 25%;
}
.tw-flex-row {
  flex-direction: row;
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
.tw-items-start {
  align-items: flex-start;
}
.tw-items-center {
  align-items: center;
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
.tw-gap-0\\.5 {
  gap: 0.125rem;
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
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-space-x-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0px * var(--tw-space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
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
.tw-self-stretch {
  align-self: stretch;
}
.tw-overflow-auto {
  overflow: auto;
}
.tw-overflow-hidden {
  overflow: hidden;
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
.tw-text-ellipsis {
  text-overflow: ellipsis;
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
.tw-rounded-s-md {
  border-start-start-radius: calc(var(--radius) - 2px);
  border-end-start-radius: calc(var(--radius) - 2px);
}
.tw-rounded-ee-none {
  border-end-end-radius: 0px;
}
.tw-rounded-se-md {
  border-start-end-radius: calc(var(--radius) - 2px);
}
.tw-rounded-ss-none {
  border-start-start-radius: 0px;
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
.tw-border-e-2 {
  border-inline-end-width: 2px;
}
.tw-border-l {
  border-left-width: 1px;
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
.tw-border-t-2 {
  border-top-width: 2px;
}
.tw-border-solid {
  border-style: solid;
}
.tw-border-dashed {
  border-style: dashed;
}
.tw-border-\\[\\#22ac32\\] {
  --tw-border-opacity: 1;
  border-color: rgb(34 172 50 / var(--tw-border-opacity, 1));
}
.tw-border-\\[\\#df4744\\] {
  --tw-border-opacity: 1;
  border-color: rgb(223 71 68 / var(--tw-border-opacity, 1));
}
.tw-border-\\[\\#e0a035\\] {
  --tw-border-opacity: 1;
  border-color: rgb(224 160 53 / var(--tw-border-opacity, 1));
}
.tw-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
.tw-border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity, 1));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-muted {
  border-color: hsl(var(--muted));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity, 1));
}
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-border-transparent {
  border-color: transparent;
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
.tw-bg-\\[\\#36c84b\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(54 200 75 / var(--tw-bg-opacity, 1));
}
.tw-bg-\\[\\#f25450\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(242 84 80 / var(--tw-bg-opacity, 1));
}
.tw-bg-\\[\\#fdbb40\\] {
  --tw-bg-opacity: 1;
  background-color: rgb(253 187 64 / var(--tw-bg-opacity, 1));
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-accent-foreground {
  background-color: hsl(var(--accent-foreground));
}
.tw-bg-amber-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
}
.tw-bg-amber-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 230 138 / var(--tw-bg-opacity, 1));
}
.tw-bg-amber-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 251 235 / var(--tw-bg-opacity, 1));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));
}
.tw-bg-border {
  background-color: hsl(var(--border));
}
.tw-bg-card {
  background-color: hsl(var(--card));
}
.tw-bg-card-foreground {
  background-color: hsl(var(--card-foreground));
}
.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}
.tw-bg-destructive-foreground {
  background-color: hsl(var(--destructive-foreground));
}
.tw-bg-foreground {
  background-color: hsl(var(--foreground));
}
.tw-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1));
}
.tw-bg-input {
  background-color: hsl(var(--input));
}
.tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-bg-muted-foreground {
  background-color: hsl(var(--muted-foreground));
}
.tw-bg-muted\\/40 {
  background-color: hsl(var(--muted) / 0.4);
}
.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.tw-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity, 1));
}
.tw-bg-popover {
  background-color: hsl(var(--popover));
}
.tw-bg-popover-foreground {
  background-color: hsl(var(--popover-foreground));
}
.tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.tw-bg-ring {
  background-color: hsl(var(--ring));
}
.tw-bg-secondary {
  background-color: hsl(var(--secondary));
}
.tw-bg-secondary-foreground {
  background-color: hsl(var(--secondary-foreground));
}
.tw-bg-sidebar {
  background-color: hsl(var(--sidebar-background));
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
.tw-bg-zinc-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity, 1));
}
.tw-bg-none {
  background-image: none;
}
.tw-fill-current {
  fill: currentColor;
}
.tw-p-0 {
  padding: 0px;
}
.tw-p-1 {
  padding: 0.25rem;
}
.tw-p-2 {
  padding: 0.5rem;
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
.tw-px-7 {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
}
.tw-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
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
.tw-py-\\[1px\\] {
  padding-top: 1px;
  padding-bottom: 1px;
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
.tw-pe-2 {
  padding-inline-end: 0.5rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
}
.tw-pe-\\[calc\\(138px\\+1rem\\)\\] {
  padding-inline-end: calc(138px + 1rem);
}
.tw-pl-1 {
  padding-left: 0.25rem;
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
.tw-ps-3 {
  padding-inline-start: 0.75rem;
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
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-4 {
  padding-top: 1rem;
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
.tw-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.tw-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.tw-text-5xl {
  font-size: 3rem;
  line-height: 1;
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
.tw-font-medium {
  font-weight: 500;
}
.tw-font-normal {
  font-weight: 400;
}
.tw-font-semibold {
  font-weight: 600;
}
.tw-uppercase {
  text-transform: uppercase;
}
.tw-capitalize {
  text-transform: capitalize;
}
.tw-not-italic {
  font-style: normal;
}
.tw-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.tw-leading-9 {
  line-height: 2.25rem;
}
.tw-leading-none {
  line-height: 1;
}
.tw-leading-relaxed {
  line-height: 1.625;
}
.tw-tracking-tight {
  letter-spacing: -0.025em;
}
.tw-tracking-widest {
  letter-spacing: 0.1em;
}
.tw-text-accent-foreground {
  color: hsl(var(--accent-foreground));
}
.tw-text-amber-800 {
  --tw-text-opacity: 1;
  color: rgb(146 64 14 / var(--tw-text-opacity, 1));
}
.tw-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity, 1));
}
.tw-text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity, 1));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
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
.tw-text-foreground\\/80 {
  color: hsl(var(--foreground) / 0.8);
}
.tw-text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
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
.tw-text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
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
.tw-text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity, 1));
}
.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
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
.tw-text-yellow-900 {
  --tw-text-opacity: 1;
  color: rgb(113 63 18 / var(--tw-text-opacity, 1));
}
.tw-underline {
  text-decoration-line: underline;
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
.tw-ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring));
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
.tw-duration-300 {
  transition-duration: 300ms;
}
.tw-duration-500 {
  transition-duration: 500ms;
}
.tw-ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-duration-300 {
  animation-duration: 300ms;
}
.tw-duration-500 {
  animation-duration: 500ms;
}
.tw-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.tw-ease-linear {
  animation-timing-function: linear;
}

/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css */

/* #endregion */

.\\*\\:tw-m-4 > * {
  margin: 1rem;
}

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

.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}

.hover\\:tw-border-blue-600:hover {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity, 1));
}

.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}

.hover\\:tw-bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}

.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}

.hover\\:tw-bg-gray-300:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-bg-gray-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1));
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

.hover\\:tw-bg-primary\\/80:hover {
  background-color: hsl(var(--primary) / 0.8);
}

.hover\\:tw-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}

.hover\\:tw-bg-red-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));
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

.hover\\:tw-bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}

.hover\\:tw-text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}

.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}

.hover\\:tw-text-gray-900:hover {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}

.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}

.hover\\:tw-text-sidebar-accent-foreground:hover {
  color: hsl(var(--sidebar-accent-foreground));
}

.hover\\:tw-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}

.hover\\:tw-opacity-100:hover {
  opacity: 1;
}

.hover\\:tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:tw-shadow-sm:hover {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:after\\:tw-bg-sidebar-border:hover::after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border));
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

.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:tw-outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
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

.focus-visible\\:tw-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:tw-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
}

.active\\:tw-bg-sidebar-accent:active {
  background-color: hsl(var(--sidebar-accent));
}

.active\\:tw-bg-white:active {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
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

.tw-group:hover .group-hover\\:tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}

.tw-group:hover .group-hover\\:tw-opacity-100 {
  opacity: 1;
}

.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}

.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
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

.data-\\[active\\=true\\]\\:tw-bg-sidebar-accent[data-active="true"] {
  background-color: hsl(var(--sidebar-accent));
}

.data-\\[highlighted\\]\\:tw-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
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

@media (min-width: 640px) {

  .sm\\:tw-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .sm\\:tw-static {
    position: static;
  }

  .sm\\:tw-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .sm\\:tw-flex {
    display: flex;
  }

  .sm\\:tw-table-cell {
    display: table-cell;
  }

  .sm\\:tw-hidden {
    display: none;
  }

  .sm\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-gap-4 {
    gap: 1rem;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:tw-border-0 {
    border-width: 0px;
  }

  .sm\\:tw-bg-transparent {
    background-color: transparent;
  }

  .sm\\:tw-px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .sm\\:tw-py-0 {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .sm\\:tw-py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .sm\\:tw-py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .sm\\:tw-pl-14 {
    padding-left: 3.5rem;
  }

  .sm\\:tw-text-start {
    text-align: start;
  }
}

@media (min-width: 768px) {

  .md\\:tw-block {
    display: block;
  }

  .md\\:tw-inline {
    display: inline;
  }

  .md\\:tw-flex {
    display: flex;
  }

  .md\\:tw-table-cell {
    display: table-cell;
  }

  .md\\:tw-h-8 {
    height: 2rem;
  }

  .md\\:tw-w-8 {
    width: 2rem;
  }

  .md\\:tw-w-\\[200px\\] {
    width: 200px;
  }

  .md\\:tw-grow-0 {
    flex-grow: 0;
  }

  .md\\:tw-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\\:tw-gap-8 {
    gap: 2rem;
  }

  .md\\:tw-text-base {
    font-size: 1rem;
    line-height: 1.5rem;
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

  .lg\\:tw-sr-only {
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

  .lg\\:tw-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .lg\\:tw-flex {
    display: flex;
  }

  .lg\\:tw-w-\\[336px\\] {
    width: 336px;
  }

  .lg\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\\:tw-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }
}

@media (min-width: 1280px) {

  .xl\\:tw-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .xl\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .xl\\:tw-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .xl\\:tw-whitespace-nowrap {
    white-space: nowrap;
  }
}

.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}

.ltr\\:tw-left-2\\.5:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.625rem;
}

.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}

.rtl\\:tw-right-2\\.5:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.625rem;
}

.rtl\\:tw-ps-2:where([dir="rtl"], [dir="rtl"] *) {
  padding-inline-start: 0.5rem;
}

@media (prefers-color-scheme: dark) {

  .dark\\:tw--rotate-90 {
    --tw-rotate: -90deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-rotate-0 {
    --tw-rotate: 0deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-scale-0 {
    --tw-scale-x: 0;
    --tw-scale-y: 0;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-scale-100 {
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-border-destructive {
    border-color: hsl(var(--destructive));
  }
}

.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
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
`,"top");export{D,__vitePreload as _,z};
