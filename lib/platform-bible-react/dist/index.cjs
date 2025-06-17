"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const i=require("react"),Za=require("clsx"),Qa=require("tailwind-merge"),Ue=require("class-variance-authority"),Qn=require("@radix-ui/react-dropdown-menu"),k=require("lucide-react"),E=require("platform-bible-utils"),$e=require("@radix-ui/react-slot"),eo=require("@radix-ui/react-label"),to=require("@radix-ui/react-radio-group"),no=require("@radix-ui/react-popover"),ue=require("cmdk"),ro=require("@radix-ui/react-dialog"),ce=require("@tanstack/react-table"),ao=require("@radix-ui/react-select"),oo=require("markdown-to-jsx"),so=require("@radix-ui/react-checkbox"),io=require("@radix-ui/react-toggle-group"),lo=require("@radix-ui/react-toggle"),co=require("@radix-ui/react-separator"),mo=require("@radix-ui/react-tooltip"),uo=require("@radix-ui/react-tabs"),po=require("@radix-ui/react-menubar"),wo=require("react-hotkeys-hook"),bo=require("@radix-ui/react-avatar"),ve=require("vaul"),fo=require("@radix-ui/react-progress"),er=require("sonner"),xo=require("@radix-ui/react-slider"),ho=require("@radix-ui/react-switch");function ae(e){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const r in e)if(r!=="default"){const a=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,a.get?a:{enumerable:!0,get:()=>e[r]})}}return n.default=e,Object.freeze(n)}const q=ae(Qn),tr=ae(eo),rt=ae(to),at=ae(no),De=ae(ro),W=ae(ao),an=ae(so),jt=ae(io),nr=ae(lo),rr=ae(co),it=ae(mo),pe=ae(uo),H=ae(po),Ye=ae(bo),on=ae(fo),tt=ae(xo),sn=ae(ho);var Ct={exports:{}},Et={};/**
 * @license React
 * react-jsx-dev-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xn;function vo(){if(Xn)return Et;Xn=1;var e=Symbol.for("react.fragment");return Et.Fragment=e,Et.jsxDEV=void 0,Et}var kt={};/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $n;function go(){return $n||($n=1,process.env.NODE_ENV!=="production"&&function(){var e=i,n=Symbol.for("react.element"),r=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),o=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.provider"),m=Symbol.for("react.context"),u=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),x=Symbol.for("react.suspense_list"),N=Symbol.for("react.memo"),h=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),P=Symbol.iterator,S="@@iterator";function C(s){if(s===null||typeof s!="object")return null;var w=P&&s[P]||s[S];return typeof w=="function"?w:null}var y=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function D(s){{for(var w=arguments.length,g=new Array(w>1?w-1:0),U=1;U<w;U++)g[U-1]=arguments[U];G("error",s,g)}}function G(s,w,g){{var U=y.ReactDebugCurrentFrame,L=U.getStackAddendum();L!==""&&(w+="%s",g=g.concat([L]));var $=g.map(function(A){return String(A)});$.unshift("Warning: "+w),Function.prototype.apply.call(console[s],console,$)}}var z=!1,K=!1,ye=!1,he=!1,j=!1,v;v=Symbol.for("react.module.reference");function X(s){return!!(typeof s=="string"||typeof s=="function"||s===a||s===l||j||s===o||s===p||s===x||he||s===b||z||K||ye||typeof s=="object"&&s!==null&&(s.$$typeof===h||s.$$typeof===N||s.$$typeof===c||s.$$typeof===m||s.$$typeof===u||s.$$typeof===v||s.getModuleId!==void 0))}function _(s,w,g){var U=s.displayName;if(U)return U;var L=w.displayName||w.name||"";return L!==""?g+"("+L+")":g}function se(s){return s.displayName||"Context"}function oe(s){if(s==null)return null;if(typeof s.tag=="number"&&D("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof s=="function")return s.displayName||s.name||null;if(typeof s=="string")return s;switch(s){case a:return"Fragment";case r:return"Portal";case l:return"Profiler";case o:return"StrictMode";case p:return"Suspense";case x:return"SuspenseList"}if(typeof s=="object")switch(s.$$typeof){case m:var w=s;return se(w)+".Consumer";case c:var g=s;return se(g._context)+".Provider";case u:return _(s,s.render,"ForwardRef");case N:var U=s.displayName||null;return U!==null?U:oe(s.type)||"Memo";case h:{var L=s,$=L._payload,A=L._init;try{return oe(A($))}catch{return null}}}return null}var we=Object.assign,ie=0,ne,R,f,T,V,M,re;function J(){}J.__reactDisabledLog=!0;function Pa(){{if(ie===0){ne=console.log,R=console.info,f=console.warn,T=console.error,V=console.group,M=console.groupCollapsed,re=console.groupEnd;var s={configurable:!0,enumerable:!0,value:J,writable:!0};Object.defineProperties(console,{info:s,log:s,warn:s,error:s,group:s,groupCollapsed:s,groupEnd:s})}ie++}}function Va(){{if(ie--,ie===0){var s={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:we({},s,{value:ne}),info:we({},s,{value:R}),warn:we({},s,{value:f}),error:we({},s,{value:T}),group:we({},s,{value:V}),groupCollapsed:we({},s,{value:M}),groupEnd:we({},s,{value:re})})}ie<0&&D("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var Xt=y.ReactCurrentDispatcher,$t;function gt(s,w,g){{if($t===void 0)try{throw Error()}catch(L){var U=L.stack.trim().match(/\n( *(at )?)/);$t=U&&U[1]||""}return`
`+$t+s}}var Yt=!1,Nt;{var ja=typeof WeakMap=="function"?WeakMap:Map;Nt=new ja}function Un(s,w){if(!s||Yt)return"";{var g=Nt.get(s);if(g!==void 0)return g}var U;Yt=!0;var L=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var $;$=Xt.current,Xt.current=null,Pa();try{if(w){var A=function(){throw Error()};if(Object.defineProperty(A.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(A,[])}catch(me){U=me}Reflect.construct(s,[],A)}else{try{A.call()}catch(me){U=me}s.call(A.prototype)}}else{try{throw Error()}catch(me){U=me}s()}}catch(me){if(me&&U&&typeof me.stack=="string"){for(var O=me.stack.split(`
`),le=U.stack.split(`
`),Z=O.length-1,Q=le.length-1;Z>=1&&Q>=0&&O[Z]!==le[Q];)Q--;for(;Z>=1&&Q>=0;Z--,Q--)if(O[Z]!==le[Q]){if(Z!==1||Q!==1)do if(Z--,Q--,Q<0||O[Z]!==le[Q]){var fe=`
`+O[Z].replace(" at new "," at ");return s.displayName&&fe.includes("<anonymous>")&&(fe=fe.replace("<anonymous>",s.displayName)),typeof s=="function"&&Nt.set(s,fe),fe}while(Z>=1&&Q>=0);break}}}finally{Yt=!1,Xt.current=$,Va(),Error.prepareStackTrace=L}var Be=s?s.displayName||s.name:"",Se=Be?gt(Be):"";return typeof s=="function"&&Nt.set(s,Se),Se}function Ga(s,w,g){return Un(s,!1)}function Ua(s){var w=s.prototype;return!!(w&&w.isReactComponent)}function Dt(s,w,g){if(s==null)return"";if(typeof s=="function")return Un(s,Ua(s));if(typeof s=="string")return gt(s);switch(s){case p:return gt("Suspense");case x:return gt("SuspenseList")}if(typeof s=="object")switch(s.$$typeof){case u:return Ga(s.render);case N:return Dt(s.type,w,g);case h:{var U=s,L=U._payload,$=U._init;try{return Dt($(L),w,g)}catch{}}}return""}var Je=Object.prototype.hasOwnProperty,Sn={},_n=y.ReactDebugCurrentFrame;function yt(s){if(s){var w=s._owner,g=Dt(s.type,s._source,w?w.type:null);_n.setExtraStackFrame(g)}else _n.setExtraStackFrame(null)}function Sa(s,w,g,U,L){{var $=Function.call.bind(Je);for(var A in s)if($(s,A)){var O=void 0;try{if(typeof s[A]!="function"){var le=Error((U||"React class")+": "+g+" type `"+A+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof s[A]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw le.name="Invariant Violation",le}O=s[A](w,A,U,g,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(Z){O=Z}O&&!(O instanceof Error)&&(yt(L),D("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",U||"React class",g,A,typeof O),yt(null)),O instanceof Error&&!(O.message in Sn)&&(Sn[O.message]=!0,yt(L),D("Failed %s type: %s",g,O.message),yt(null))}}}var _a=Array.isArray;function qt(s){return _a(s)}function Ra(s){{var w=typeof Symbol=="function"&&Symbol.toStringTag,g=w&&s[Symbol.toStringTag]||s.constructor.name||"Object";return g}}function Ta(s){try{return Rn(s),!1}catch{return!0}}function Rn(s){return""+s}function Tn(s){if(Ta(s))return D("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",Ra(s)),Rn(s)}var We=y.ReactCurrentOwner,Ma={key:!0,ref:!0,__self:!0,__source:!0},Mn,On,Ht;Ht={};function Oa(s){if(Je.call(s,"ref")){var w=Object.getOwnPropertyDescriptor(s,"ref").get;if(w&&w.isReactWarning)return!1}return s.ref!==void 0}function Ia(s){if(Je.call(s,"key")){var w=Object.getOwnPropertyDescriptor(s,"key").get;if(w&&w.isReactWarning)return!1}return s.key!==void 0}function za(s,w){if(typeof s.ref=="string"&&We.current&&w&&We.current.stateNode!==w){var g=oe(We.current.type);Ht[g]||(D('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',oe(We.current.type),s.ref),Ht[g]=!0)}}function Aa(s,w){{var g=function(){Mn||(Mn=!0,D("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",w))};g.isReactWarning=!0,Object.defineProperty(s,"key",{get:g,configurable:!0})}}function Fa(s,w){{var g=function(){On||(On=!0,D("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",w))};g.isReactWarning=!0,Object.defineProperty(s,"ref",{get:g,configurable:!0})}}var Ba=function(s,w,g,U,L,$,A){var O={$$typeof:n,type:s,key:w,ref:g,props:A,_owner:$};return O._store={},Object.defineProperty(O._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(O,"_self",{configurable:!1,enumerable:!1,writable:!1,value:U}),Object.defineProperty(O,"_source",{configurable:!1,enumerable:!1,writable:!1,value:L}),Object.freeze&&(Object.freeze(O.props),Object.freeze(O)),O};function La(s,w,g,U,L){{var $,A={},O=null,le=null;g!==void 0&&(Tn(g),O=""+g),Ia(w)&&(Tn(w.key),O=""+w.key),Oa(w)&&(le=w.ref,za(w,L));for($ in w)Je.call(w,$)&&!Ma.hasOwnProperty($)&&(A[$]=w[$]);if(s&&s.defaultProps){var Z=s.defaultProps;for($ in Z)A[$]===void 0&&(A[$]=Z[$])}if(O||le){var Q=typeof s=="function"?s.displayName||s.name||"Unknown":s;O&&Aa(A,Q),le&&Fa(A,Q)}return Ba(s,O,le,L,U,We.current,A)}}var Kt=y.ReactCurrentOwner,In=y.ReactDebugCurrentFrame;function Fe(s){if(s){var w=s._owner,g=Dt(s.type,s._source,w?w.type:null);In.setExtraStackFrame(g)}else In.setExtraStackFrame(null)}var Jt;Jt=!1;function Wt(s){return typeof s=="object"&&s!==null&&s.$$typeof===n}function zn(){{if(Kt.current){var s=oe(Kt.current.type);if(s)return`

Check the render method of \``+s+"`."}return""}}function Xa(s){{if(s!==void 0){var w=s.fileName.replace(/^.*[\\\/]/,""),g=s.lineNumber;return`

Check your code at `+w+":"+g+"."}return""}}var An={};function $a(s){{var w=zn();if(!w){var g=typeof s=="string"?s:s.displayName||s.name;g&&(w=`

Check the top-level render call using <`+g+">.")}return w}}function Fn(s,w){{if(!s._store||s._store.validated||s.key!=null)return;s._store.validated=!0;var g=$a(w);if(An[g])return;An[g]=!0;var U="";s&&s._owner&&s._owner!==Kt.current&&(U=" It was passed a child from "+oe(s._owner.type)+"."),Fe(s),D('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',g,U),Fe(null)}}function Bn(s,w){{if(typeof s!="object")return;if(qt(s))for(var g=0;g<s.length;g++){var U=s[g];Wt(U)&&Fn(U,w)}else if(Wt(s))s._store&&(s._store.validated=!0);else if(s){var L=C(s);if(typeof L=="function"&&L!==s.entries)for(var $=L.call(s),A;!(A=$.next()).done;)Wt(A.value)&&Fn(A.value,w)}}}function Ya(s){{var w=s.type;if(w==null||typeof w=="string")return;var g;if(typeof w=="function")g=w.propTypes;else if(typeof w=="object"&&(w.$$typeof===u||w.$$typeof===N))g=w.propTypes;else return;if(g){var U=oe(w);Sa(g,s.props,"prop",U,s)}else if(w.PropTypes!==void 0&&!Jt){Jt=!0;var L=oe(w);D("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",L||"Unknown")}typeof w.getDefaultProps=="function"&&!w.getDefaultProps.isReactClassApproved&&D("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function qa(s){{for(var w=Object.keys(s.props),g=0;g<w.length;g++){var U=w[g];if(U!=="children"&&U!=="key"){Fe(s),D("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",U),Fe(null);break}}s.ref!==null&&(Fe(s),D("Invalid attribute `ref` supplied to `React.Fragment`."),Fe(null))}}var Ln={};function Ha(s,w,g,U,L,$){{var A=X(s);if(!A){var O="";(s===void 0||typeof s=="object"&&s!==null&&Object.keys(s).length===0)&&(O+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var le=Xa(L);le?O+=le:O+=zn();var Z;s===null?Z="null":qt(s)?Z="array":s!==void 0&&s.$$typeof===n?(Z="<"+(oe(s.type)||"Unknown")+" />",O=" Did you accidentally export a JSX literal instead of a component?"):Z=typeof s,D("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",Z,O)}var Q=La(s,w,g,L,$);if(Q==null)return Q;if(A){var fe=w.children;if(fe!==void 0)if(U)if(qt(fe)){for(var Be=0;Be<fe.length;Be++)Bn(fe[Be],s);Object.freeze&&Object.freeze(fe)}else D("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else Bn(fe,s)}if(Je.call(w,"key")){var Se=oe(s),me=Object.keys(w).filter(function(Wa){return Wa!=="key"}),Zt=me.length>0?"{key: someKey, "+me.join(": ..., ")+": ...}":"{key: someKey}";if(!Ln[Se+Zt]){var Ja=me.length>0?"{"+me.join(": ..., ")+": ...}":"{}";D(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,Zt,Se,Ja,Se),Ln[Se+Zt]=!0}}return s===a?qa(Q):Ya(Q),Q}}var Ka=Ha;kt.Fragment=a,kt.jsxDEV=Ka}()),kt}var Yn;function No(){return Yn||(Yn=1,process.env.NODE_ENV==="production"?Ct.exports=vo():Ct.exports=go()),Ct.exports}var t=No();const Do=Qa.extendTailwindMerge({prefix:"tw-"});function d(...e){return Do(Za.clsx(e))}const Ae=i.forwardRef(({className:e,type:n,...r},a)=>t.jsxDEV("input",{type:n,className:d("pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),ref:a,...r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/input.tsx",lineNumber:21,columnNumber:7},void 0));Ae.displayName="Input";const yo=i.forwardRef(({handleSearch:e,handleKeyDown:n,handleOnClick:r,handleSubmit:a,className:o,...l},c)=>t.jsxDEV(Ae,{...l,type:"text",className:d("tw-relative tw-box-border tw-min-w-0 tw-max-w-48 tw-flex-shrink tw-grow tw-basis-32 tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-2 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",o),onChange:m=>e(m.target.value),onKeyDown:m=>{m.key==="Enter"?(a(),m.preventDefault()):n(m)},onClick:r,ref:c},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-input.component.tsx",lineNumber:31,columnNumber:7},void 0)),pn=i.createContext(void 0);function ge(){const e=i.useContext(pn);if(!e)throw new Error("useMenuContext must be used within a MenuContext.Provider.");return e}const Ee=Ue.cva("",{variants:{variant:{default:"",muted:"hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"}},defaultVariants:{variant:"default"}}),Co="layoutDirection";function te(){const e=localStorage.getItem(Co);return e==="rtl"?e:"ltr"}const Gt=q.Trigger,wn=q.Group,ar=q.Portal,or=q.Sub,Eo=q.RadioGroup;function lt({variant:e="default",...n}){const r=i.useMemo(()=>({variant:e}),[e]);return t.jsxDEV(pn.Provider,{value:r,children:t.jsxDEV(q.Root,{...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:119,columnNumber:7},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:118,columnNumber:5},this)}const bn=i.forwardRef(({className:e,inset:n,children:r,...a},o)=>{const l=ge();return t.jsxDEV(q.SubTrigger,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",n&&"tw-pl-8",e,Ee({variant:l.variant})),...a,children:[r,t.jsxDEV(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:143,columnNumber:7},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:132,columnNumber:5},void 0)});bn.displayName=q.SubTrigger.displayName;const fn=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(q.SubContent,{ref:r,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:154,columnNumber:3},void 0));fn.displayName=q.SubContent.displayName;const qe=i.forwardRef(({className:e,sideOffset:n=4,children:r,...a},o)=>{const l=te();return t.jsxDEV(q.Portal,{children:t.jsxDEV(q.Content,{ref:o,sideOffset:n,className:d("pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...a,children:t.jsxDEV("div",{dir:l,children:r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:186,columnNumber:9},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:176,columnNumber:7},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:175,columnNumber:5},void 0)});qe.displayName=q.Content.displayName;const Ut=i.forwardRef(({className:e,inset:n,...r},a)=>{const o=te(),l=ge();return t.jsxDEV(q.Item,{ref:a,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",e,Ee({variant:l.variant})),...r,dir:o},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:201,columnNumber:5},void 0)});Ut.displayName=q.Item.displayName;const St=i.forwardRef(({className:e,children:n,checked:r,...a},o)=>{const l=ge();return t.jsxDEV(q.CheckboxItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,Ee({variant:l.variant})),checked:r,...a,children:[t.jsxDEV("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:t.jsxDEV(q.ItemIndicator,{children:t.jsxDEV(k.Check,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:236,columnNumber:11},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:235,columnNumber:9},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:234,columnNumber:7},void 0),n]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:224,columnNumber:5},void 0)});St.displayName=q.CheckboxItem.displayName;const xn=i.forwardRef(({className:e,children:n,...r},a)=>{const o=ge();return t.jsxDEV(q.RadioItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e,Ee({variant:o.variant})),...r,children:[t.jsxDEV("span",{className:"tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2",children:t.jsxDEV(q.ItemIndicator,{children:t.jsxDEV(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:263,columnNumber:11},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:262,columnNumber:9},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:261,columnNumber:7},void 0),n]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:252,columnNumber:5},void 0)});xn.displayName=q.RadioItem.displayName;const ct=i.forwardRef(({className:e,inset:n,...r},a)=>t.jsxDEV(q.Label,{ref:a,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",e),...r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:277,columnNumber:3},void 0));ct.displayName=q.Label.displayName;const He=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(q.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:290,columnNumber:3},void 0));He.displayName=q.Separator.displayName;function sr({className:e,...n}){return t.jsxDEV("span",{className:d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dropdown-menu.tsx",lineNumber:301,columnNumber:5},this)}sr.displayName="DropdownMenuShortcut";var ko=Object.defineProperty,Po=(e,n,r)=>n in e?ko(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,I=(e,n,r)=>Po(e,typeof n!="symbol"?n+"":n,r);const Me=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","ESG","WIS","SIR","BAR","LJE","S3Y","SUS","BEL","1MA","2MA","3MA","4MA","1ES","2ES","MAN","PS2","ODA","PSS","JSA","JDB","TBS","SST","DNT","BLT","XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","3ES","EZA","5EZ","6EZ","INT","CNC","GLO","TDX","NDX","DAG","PS3","2BA","LBA","JUB","ENO","1MQ","2MQ","3MQ","REP","4BA","LAO"],hn=["XXA","XXB","XXC","XXD","XXE","XXF","XXG","FRT","BAK","OTH","INT","CNC","GLO","TDX","NDX"],ir=["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther (Hebrew)","Job","Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel (Hebrew)","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation","Tobit","Judith","Esther Greek","Wisdom of Solomon","Sirach (Ecclesiasticus)","Baruch","Letter of Jeremiah","Song of 3 Young Men","Susanna","Bel and the Dragon","1 Maccabees","2 Maccabees","3 Maccabees","4 Maccabees","1 Esdras (Greek)","2 Esdras (Latin)","Prayer of Manasseh","Psalm 151","Odes","Psalms of Solomon","Joshua A. *obsolete*","Judges B. *obsolete*","Tobit S. *obsolete*","Susanna Th. *obsolete*","Daniel Th. *obsolete*","Bel Th. *obsolete*","Extra A","Extra B","Extra C","Extra D","Extra E","Extra F","Extra G","Front Matter","Back Matter","Other Matter","3 Ezra *obsolete*","Apocalypse of Ezra","5 Ezra (Latin Prologue)","6 Ezra (Latin Epilogue)","Introduction","Concordance ","Glossary ","Topical Index","Names Index","Daniel Greek","Psalms 152-155","2 Baruch (Apocalypse)","Letter of Baruch","Jubilees","Enoch","1 Meqabyan","2 Meqabyan","3 Meqabyan","Reproof (Proverbs 25-31)","4 Baruch (Rest of Baruch)","Laodiceans"],qn=Oo();function Ke(e,n=!0){return n&&(e=e.toUpperCase()),e in qn?qn[e]:0}function vn(e){return Ke(e)>0}function Vo(e){const n=typeof e=="string"?Ke(e):e;return n>=40&&n<=66}function jo(e){return(typeof e=="string"?Ke(e):e)<=39}function lr(e){return e<=66}function Go(e){const n=typeof e=="string"?Ke(e):e;return dr(n)&&!lr(n)}function*Uo(){for(let e=1;e<=Me.length;e++)yield e}const So=1,cr=Me.length;function _o(){return["XXA","XXB","XXC","XXD","XXE","XXF","XXG"]}function gn(e,n="***"){const r=e-1;return r<0||r>=Me.length?n:Me[r]}function mr(e){return e<=0||e>cr?"******":ir[e-1]}function Ro(e){return mr(Ke(e))}function dr(e){const n=typeof e=="number"?gn(e):e;return vn(n)&&!hn.includes(n)}function To(e){const n=typeof e=="number"?gn(e):e;return vn(n)&&hn.includes(n)}function Mo(e){return ir[e-1].includes("*obsolete*")}function Oo(){const e={};for(let n=0;n<Me.length;n++)e[Me[n]]=n+1;return e}const F={allBookIds:Me,nonCanonicalIds:hn,bookIdToNumber:Ke,isBookIdValid:vn,isBookNT:Vo,isBookOT:jo,isBookOTNT:lr,isBookDC:Go,allBookNumbers:Uo,firstBook:So,lastBook:cr,extraBooks:_o,bookNumberToId:gn,bookNumberToEnglishName:mr,bookIdToEnglishName:Ro,isCanonical:dr,isExtraMaterial:To,isObsolete:Mo};var Ne=(e=>(e[e.Unknown=0]="Unknown",e[e.Original=1]="Original",e[e.Septuagint=2]="Septuagint",e[e.Vulgate=3]="Vulgate",e[e.English=4]="English",e[e.RussianProtestant=5]="RussianProtestant",e[e.RussianOrthodox=6]="RussianOrthodox",e))(Ne||{});const be=class{constructor(n){if(I(this,"name"),I(this,"fullPath"),I(this,"isPresent"),I(this,"hasVerseSegments"),I(this,"isCustomized"),I(this,"baseVersification"),I(this,"scriptureBooks"),I(this,"_type"),n==null)throw new Error("Argument undefined");typeof n=="string"?(this.name=n,this._type=Ne[n]):(this._type=n,this.name=Ne[n])}get type(){return this._type}equals(n){return!n.type||!this.type?!1:n.type===this.type}};I(be,"Original",new be(Ne.Original)),I(be,"Septuagint",new be(Ne.Septuagint)),I(be,"Vulgate",new be(Ne.Vulgate)),I(be,"English",new be(Ne.English)),I(be,"RussianProtestant",new be(Ne.RussianProtestant)),I(be,"RussianOrthodox",new be(Ne.RussianOrthodox));let Re=be;function Hn(e,n){const r=n[0];for(let a=1;a<n.length;a++)e=e.split(n[a]).join(r);return e.split(r)}var ur=(e=>(e[e.Valid=0]="Valid",e[e.UnknownVersification=1]="UnknownVersification",e[e.OutOfRange=2]="OutOfRange",e[e.VerseOutOfOrder=3]="VerseOutOfOrder",e[e.VerseRepeated=4]="VerseRepeated",e))(ur||{});const de=class B{constructor(n,r,a,o){if(I(this,"firstChapter"),I(this,"lastChapter"),I(this,"lastVerse"),I(this,"hasSegmentsDefined"),I(this,"text"),I(this,"BBBCCCVVVS"),I(this,"longHashCode"),I(this,"versification"),I(this,"rtlMark","‏"),I(this,"_bookNum",0),I(this,"_chapterNum",0),I(this,"_verseNum",0),I(this,"_verse"),a==null&&o==null)if(n!=null&&typeof n=="string"){const l=n,c=r!=null&&r instanceof Re?r:void 0;this.setEmpty(c),this.parse(l)}else if(n!=null&&typeof n=="number"){const l=r!=null&&r instanceof Re?r:void 0;this.setEmpty(l),this._verseNum=n%B.chapterDigitShifter,this._chapterNum=Math.floor(n%B.bookDigitShifter/B.chapterDigitShifter),this._bookNum=Math.floor(n/B.bookDigitShifter)}else if(r==null)if(n!=null&&n instanceof B){const l=n;this._bookNum=l.bookNum,this._chapterNum=l.chapterNum,this._verseNum=l.verseNum,this._verse=l.verse,this.versification=l.versification}else{if(n==null)return;const l=n instanceof Re?n:B.defaultVersification;this.setEmpty(l)}else throw new Error("VerseRef constructor not supported.");else if(n!=null&&r!=null&&a!=null)if(typeof n=="string"&&typeof r=="string"&&typeof a=="string")this.setEmpty(o),this.updateInternal(n,r,a);else if(typeof n=="number"&&typeof r=="number"&&typeof a=="number")this._bookNum=n,this._chapterNum=r,this._verseNum=a,this.versification=o??B.defaultVersification;else throw new Error("VerseRef constructor not supported.");else throw new Error("VerseRef constructor not supported.")}static isVerseParseable(n){return n.length>0&&"0123456789".includes(n[0])&&!n.endsWith(this.verseRangeSeparator)&&!n.endsWith(this.verseSequenceIndicator)}static tryParse(n){let r;try{return r=new B(n),{success:!0,verseRef:r}}catch(a){if(a instanceof Ze)return r=new B,{success:!1,verseRef:r};throw a}}static getBBBCCCVVV(n,r,a){return n%B.bcvMaxValue*B.bookDigitShifter+(r>=0?r%B.bcvMaxValue*B.chapterDigitShifter:0)+(a>=0?a%B.bcvMaxValue:0)}static fromJSON(n){const{book:r,chapterNum:a,verseNum:o,verse:l,versificationStr:c}=n,m=l||o.toString();let u;return c&&(u=new Re(c)),r?new B(r,a.toString(),m,u):new B}static tryGetVerseNum(n){let r;if(!n)return r=-1,{success:!0,vNum:r};r=0;let a;for(let o=0;o<n.length;o++){if(a=n[o],a<"0"||a>"9")return o===0&&(r=-1),{success:!1,vNum:r};if(r=r*10+ +a-0,r>B.bcvMaxValue)return r=-1,{success:!1,vNum:r}}return{success:!0,vNum:r}}get isDefault(){return this.bookNum===0&&this.chapterNum===0&&this.verseNum===0&&this.versification==null}get hasMultiple(){return this._verse!=null&&(this._verse.includes(B.verseRangeSeparator)||this._verse.includes(B.verseSequenceIndicator))}get book(){return F.bookNumberToId(this.bookNum,"")}set book(n){this.bookNum=F.bookIdToNumber(n)}get chapter(){return this.isDefault||this._chapterNum<0?"":this._chapterNum.toString()}set chapter(n){const r=+n;this._chapterNum=Number.isInteger(r)?r:-1}get verse(){return this._verse!=null?this._verse:this.isDefault||this._verseNum<0?"":this._verseNum.toString()}set verse(n){const{success:r,vNum:a}=B.tryGetVerseNum(n);this._verse=r?void 0:n.replace(this.rtlMark,""),this._verseNum=a,!(this._verseNum>=0)&&({vNum:this._verseNum}=B.tryGetVerseNum(this._verse))}get bookNum(){return this._bookNum}set bookNum(n){if(n<=0||n>F.lastBook)throw new Ze("BookNum must be greater than zero and less than or equal to last book");this._bookNum=n}get chapterNum(){return this._chapterNum}set chapterNum(n){this.chapterNum=n}get verseNum(){return this._verseNum}set verseNum(n){this._verseNum=n}get versificationStr(){var n;return(n=this.versification)==null?void 0:n.name}set versificationStr(n){this.versification=this.versification!=null?new Re(n):void 0}get valid(){return this.validStatus===0}get validStatus(){return this.validateVerse(B.verseRangeSeparators,B.verseSequenceIndicators)}get BBBCCC(){return B.getBBBCCCVVV(this._bookNum,this._chapterNum,0)}get BBBCCCVVV(){return B.getBBBCCCVVV(this._bookNum,this._chapterNum,this._verseNum)}get isExcluded(){return!1}parse(n){if(n=n.replace(this.rtlMark,""),n.includes("/")){const l=n.split("/");if(n=l[0],l.length>1)try{const c=+l[1].trim();this.versification=new Re(Ne[c])}catch{throw new Ze("Invalid reference : "+n)}}const r=n.trim().split(" ");if(r.length!==2)throw new Ze("Invalid reference : "+n);const a=r[1].split(":"),o=+a[0];if(a.length!==2||F.bookIdToNumber(r[0])===0||!Number.isInteger(o)||o<0||!B.isVerseParseable(a[1]))throw new Ze("Invalid reference : "+n);this.updateInternal(r[0],a[0],a[1])}simplify(){this._verse=void 0}clone(){return new B(this)}toString(){const n=this.book;return n===""?"":`${n} ${this.chapter}:${this.verse}`}toJSON(){let n=this.verse;(n===""||n===this.verseNum.toString())&&(n=void 0);const r={book:this.book,chapterNum:this.chapterNum,verseNum:this.verseNum,verse:n,versificationStr:this.versificationStr};return n||delete r.verse,r}equals(n){return n instanceof B?n._bookNum===this._bookNum&&n._chapterNum===this._chapterNum&&n._verseNum===this._verseNum&&n.verse===this.verse&&(n.versification==null&&this.versification==null||n.versification!=null&&this.versification!=null&&n.versification.equals(this.versification)):!1}allVerses(n=!1,r=B.verseRangeSeparators,a=B.verseSequenceIndicators){if(this._verse==null||this.chapterNum<=0)return[this.clone()];const o=[],l=Hn(this._verse,a);for(const c of l.map(m=>Hn(m,r))){const m=this.clone();m.verse=c[0];const u=m.verseNum;if(o.push(m),c.length>1){const p=this.clone();if(p.verse=c[1],!n)for(let x=u+1;x<p.verseNum;x++){const N=new B(this._bookNum,this._chapterNum,x,this.versification);this.isExcluded||o.push(N)}o.push(p)}}return o}validateVerse(n,r){if(!this.verse)return this.internalValid;let a=0;for(const o of this.allVerses(!0,n,r)){const l=o.internalValid;if(l!==0)return l;const c=o.BBBCCCVVV;if(a>c)return 3;if(a===c)return 4;a=c}return 0}get internalValid(){return this.versification==null?1:this._bookNum<=0||this._bookNum>F.lastBook?2:(F.isCanonical(this._bookNum),0)}setEmpty(n=B.defaultVersification){this._bookNum=0,this._chapterNum=-1,this._verse=void 0,this.versification=n}updateInternal(n,r,a){this.bookNum=F.bookIdToNumber(n),this.chapter=r,this.verse=a}};I(de,"defaultVersification",Re.English),I(de,"verseRangeSeparator","-"),I(de,"verseSequenceIndicator",","),I(de,"verseRangeSeparators",[de.verseRangeSeparator]),I(de,"verseSequenceIndicators",[de.verseSequenceIndicator]),I(de,"chapterDigitShifter",1e3),I(de,"bookDigitShifter",de.chapterDigitShifter*de.chapterDigitShifter),I(de,"bcvMaxValue",de.chapterDigitShifter-1),I(de,"ValidStatusType",ur);class Ze extends Error{}const Io=i.forwardRef(({bookId:e,handleSelectBook:n,isSelected:r,handleHighlightBook:a,handleKeyDown:o,bookType:l,children:c},m)=>t.jsxDEV(Ut,{ref:m,textValue:e,className:d("tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",{"tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100":r}),onSelect:u=>{u.preventDefault(),n()},onKeyDown:u=>{o(u)},onFocus:a,onMouseMove:a,children:[t.jsxDEV("span",{className:d("tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-font-bold":r,"tw-border-s-red-200":l.toLowerCase()==="ot","tw-border-s-purple-200":l.toLowerCase()==="nt","tw-border-s-indigo-200":l.toLowerCase()==="dc"}),children:F.bookIdToEnglishName(e)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-menu-item.component.tsx",lineNumber:66,columnNumber:9},void 0),r&&t.jsxDEV("div",{children:c},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-menu-item.component.tsx",lineNumber:79,columnNumber:24},void 0)]},e,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-menu-item.component.tsx",lineNumber:44,columnNumber:7},void 0));function zo({handleSelectChapter:e,endChapter:n,activeChapter:r,highlightedChapter:a,handleHighlightedChapter:o}){const l=Array.from({length:n},(m,u)=>u+1),c=i.useCallback(m=>{o(m)},[o]);return t.jsxDEV("div",{className:d("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"),children:l.map(m=>t.jsxDEV("div",{className:d("tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",{"tw-font-semibold tw-text-amber-900":m===r,"tw-bg-amber-200":m===a}),onClick:u=>{u.preventDefault(),u.stopPropagation(),e(m)},role:"button",onKeyDown:u=>{u.key==="Enter"&&e(m)},tabIndex:0,onMouseMove:()=>c(m),children:m},m,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/chapter-select.component.tsx",lineNumber:44,columnNumber:9},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/chapter-select.component.tsx",lineNumber:42,columnNumber:5},this)}const Ao=6,Nn=F.allBookIds.filter(e=>!F.isObsolete(F.bookIdToNumber(e))),Fo={OT:"Old Testament",NT:"New Testament",DC:"Deuterocanon"},Kn=["OT","NT","DC"],Bo=96,Lo=[/^(\w+)$/i,/^(\w+)(?:\s(\d+))$/i,/^(\w+)(?:\s(\d+):(\d+))$/i],Jn=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Enter"]),Xo='a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])',Qe=e=>E.getChaptersForBook(F.bookIdToNumber(e));function $o(){return Nn.map(n=>F.bookIdToEnglishName(n))}function Yo(e){return $o().includes(e)}function qo(e){const n=e.toLowerCase().replace(/^\w/,r=>r.toUpperCase());if(Yo(n))return Nn.find(a=>F.bookIdToEnglishName(a)===n)}function Ho({scrRef:e,handleSubmit:n,className:r,getActiveBookIds:a}){const o=te(),[l,c]=i.useState(()=>E.formatScrRef(e,"English")),[m,u]=i.useState(""),[p,x]=i.useState(e.book),[N,h]=i.useState(e.chapterNum??0),[b,P]=i.useState(e.book),[S,C]=i.useState(!1),[y,D]=i.useState(S),G=i.useRef(void 0),z=i.useRef(void 0),K=i.useRef(void 0),ye=i.useCallback(f=>{const T=a?a():Nn;return{OT:T.filter(V=>F.isBookOT(V)),NT:T.filter(V=>F.isBookNT(V)),DC:T.filter(V=>F.isBookDC(V))}[f].filter(V=>{const M=F.bookIdToEnglishName(V).toLowerCase(),re=m.replace(/[^a-zA-Z]/g,"").toLowerCase();return M.includes(re)||V.toLowerCase().includes(re)})},[m,a]),he=f=>{c(f),u(f)},j=i.useRef(!1),v=i.useCallback(()=>{c(E.formatScrRef(e,"English")),u(""),x(e.book),P(e.book)},[e]),X=i.useCallback(f=>{if(j.current){j.current=!1;return}C(f)},[]),_=i.useCallback((f,T,V,M)=>{if(h(e.book!==f?1:e.chapterNum),T||Qe(f)===-1){n({book:f,chapterNum:V??1,verseNum:M??1}),C(!1),u("");return}x(p!==f?f:""),C(!T)},[n,e.book,e.chapterNum,p]),se=f=>{f<=0||f>Qe(p)||_(p,!0,f)},oe=i.useCallback(()=>{Lo.forEach(f=>{const T=f.exec(m);if(T){const[V,M=void 0,re=void 0]=T.slice(1),J=qo(V);(F.isBookIdValid(V)||J)&&_(J??V,!0,M?parseInt(M,10):1,re?parseInt(re,10):1)}})},[_,m]),we=i.useCallback(f=>{S?f.key==="ArrowDown"||f.key==="Tab"&&!f.shiftKey?(K!=null&&K.current?K.current.focus():z.current&&z.current.focus(),f.preventDefault()):f.key==="Escape"&&document.activeElement===G.current&&(C(!1),f.preventDefault(),f.stopPropagation()):f.key!=="Tab"&&C(!0)},[S]),ie=i.useCallback(f=>{if(!E.MODIFIER_KEYS.has(f.key)){if(f.key==="Tab"){if(f.shiftKey)G.current.focus();else{const T=[...document.querySelectorAll(Xo)].filter(M=>{var re,J;return M instanceof HTMLElement&&((M.offsetWidth>0||M.offsetHeight>0)&&!((re=z.current)!=null&&re.contains(M))&&!((J=G.current)!=null&&J.contains(M))||M===f.target)}),V=f.target instanceof HTMLElement?T.indexOf(f.target):-1;V>=0?T[(V+1)%T.length].focus():G.current.focus()}f.preventDefault(),f.stopPropagation();return}f.stopPropagation(),G.current.focus(),G.current.dispatchEvent(new KeyboardEvent("keydown",{...f,view:void 0}))}},[]),ne=i.useCallback(f=>{const{key:T}=f;Jn.has(T)||(ie(f),f.preventDefault())},[ie]),R=i.useCallback((f,T)=>{const{key:V}=f;if(Jn.has(V)){if(b===p){if(V==="Enter"){f.preventDefault(),_(p,!0,N);return}const M=V==="ArrowRight"&&!o||V==="ArrowRight"&&o==="ltr"||V==="ArrowLeft"&&o==="rtl",re=V==="ArrowLeft"&&!o||V==="ArrowLeft"&&o==="ltr"||V==="ArrowRight"&&o==="rtl";let J=0;if(M)if(N<Qe(b))J=1;else{f.preventDefault();return}else if(re)if(N>1)J=-1;else{f.preventDefault();return}else V==="ArrowDown"?J=Ao:V==="ArrowUp"&&(J=-6);if(N+J<=0||N+J>Qe(b))h(0);else if(J!==0){h(N+J),f.preventDefault();return}}if(T===0&&V==="ArrowUp"){f.preventDefault(),G.current.focus();return}return}ie(f)},[o,b,N,ie,p,_]);return i.useEffect(()=>{p===b?p===e.book?h(e.chapterNum):h(1):h(0)},[b,e.book,e.chapterNum,p]),i.useEffect(()=>{v()},[v]),i.useEffect(()=>{},[S,v]),i.useLayoutEffect(()=>{D(S)},[S]),i.useLayoutEffect(()=>{const f=setTimeout(()=>{var T,V;if(y&&z.current&&K.current){const re=K.current.offsetTop-Bo;z.current.scrollTo({top:re,behavior:"instant"}),G.current.focus()}!y&&document.activeElement!==G.current&&!((T=G.current)!=null&&T.contains(document.activeElement))&&document.activeElement!==z.current&&!((V=z.current)!=null&&V.contains(document.activeElement))&&v()},10);return()=>{clearTimeout(f)}},[y,v]),t.jsxDEV(lt,{modal:!1,open:S,onOpenChange:X,children:[t.jsxDEV(Gt,{asChild:!0,children:t.jsxDEV(yo,{ref:G,value:l,handleSearch:he,handleKeyDown:we,handleOnClick:()=>{x(e.book),P(e.book),h(e.chapterNum>0?e.chapterNum:0),C(!0),G.current.focus()},onFocus:()=>{j.current=!0},handleSubmit:oe,placeholder:E.formatScrRef(e,"English"),className:r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",lineNumber:521,columnNumber:9},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",lineNumber:520,columnNumber:7},this),t.jsxDEV(qe,{className:"tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",style:{width:"233px",maxHeight:"500px",zIndex:"250"},align:o==="ltr"?"start":"end",ref:z,onKeyDown:ne,onFocus:f=>{var T,V;!((T=G.current)!=null&&T.contains(f.relatedTarget))&&!((V=z.current)!=null&&V.contains(f.relatedTarget))&&G.current.select()},children:t.jsxDEV("div",{className:"rtl:tw-ps-2",children:Kn.map((f,T)=>{const V=ye(f);return V.length>0&&t.jsxDEV("div",{children:[t.jsxDEV(ct,{className:"tw-font-semibold tw-text-foreground/80",children:Fo[f]},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",lineNumber:566,columnNumber:19},this),V.map((M,re)=>t.jsxDEV("div",{children:t.jsxDEV(Io,{bookId:M,handleSelectBook:()=>_(M,!1),isSelected:p===M,handleHighlightBook:()=>P(M),handleKeyDown:J=>R(J,re),bookType:f,ref:J=>{p===M&&(K.current=J)},children:t.jsxDEV(zo,{handleSelectChapter:se,endChapter:Qe(M),activeChapter:e.book===M?e.chapterNum:0,highlightedChapter:N,handleHighlightedChapter:J=>{h(J)}},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",lineNumber:583,columnNumber:25},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",lineNumber:572,columnNumber:23},this)},M,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",lineNumber:571,columnNumber:21},this)),Kn.length-1!==T?t.jsxDEV(He,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",lineNumber:597,columnNumber:21},this):void 0]},f,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",lineNumber:565,columnNumber:17},this)})},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",lineNumber:560,columnNumber:9},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",lineNumber:542,columnNumber:7},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx",lineNumber:519,columnNumber:5},this)}const pr=Ue.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),Y=i.forwardRef(({className:e,variant:n,size:r,asChild:a=!1,...o},l)=>{const c=a?$e.Slot:"button";return t.jsxDEV(c,{className:d(pr({variant:n,size:r,className:e})),ref:l,...o},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/button.tsx",lineNumber:60,columnNumber:7},void 0)});Y.displayName="Button";const Ko=Ue.cva("tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"),ee=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(tr.Root,{ref:r,className:d("pr-twp",Ko(),e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/label.tsx",lineNumber:28,columnNumber:3},void 0));ee.displayName=tr.Root.displayName;const _t=i.forwardRef(({className:e,...n},r)=>{const a=te();return t.jsxDEV(rt.Root,{className:d("pr-twp tw-grid tw-gap-2",e),...n,ref:r,dir:a},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/radio-group.tsx",lineNumber:22,columnNumber:5},void 0)});_t.displayName=rt.Root.displayName;const ot=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(rt.Item,{ref:r,className:d("pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...n,children:t.jsxDEV(rt.Indicator,{className:"tw-flex tw-items-center tw-justify-center",children:t.jsxDEV(k.Circle,{className:"tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/radio-group.tsx",lineNumber:47,columnNumber:9},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/radio-group.tsx",lineNumber:46,columnNumber:7},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/radio-group.tsx",lineNumber:38,columnNumber:5},void 0));ot.displayName=rt.Item.displayName;const Rt=at.Root,Tt=at.Trigger,mt=i.forwardRef(({className:e,align:n="center",sideOffset:r=4,...a},o)=>{const l=te();return t.jsxDEV(at.Portal,{children:t.jsxDEV(at.Content,{ref:o,align:n,sideOffset:r,className:d("pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...a,dir:l},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/popover.tsx",lineNumber:27,columnNumber:7},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/popover.tsx",lineNumber:26,columnNumber:5},void 0)});mt.displayName=at.Content.displayName;const Jo=De.Portal,wr=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(De.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",lineNumber:20,columnNumber:3},void 0));wr.displayName=De.Overlay.displayName;const Wo=i.forwardRef(({className:e,children:n,...r},a)=>{const o=te();return t.jsxDEV(Jo,{children:[t.jsxDEV(wr,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",lineNumber:38,columnNumber:7},void 0),t.jsxDEV(De.Content,{ref:a,className:d("pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",e),...r,dir:o,children:[n,t.jsxDEV(De.Close,{className:d("tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",{"tw-right-4":o==="ltr"},{"tw-left-4":o==="rtl"}),children:[t.jsxDEV(k.X,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",lineNumber:56,columnNumber:11},void 0),t.jsxDEV("span",{className:"tw-sr-only",children:"Close"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",lineNumber:57,columnNumber:11},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",lineNumber:49,columnNumber:9},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",lineNumber:39,columnNumber:7},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",lineNumber:37,columnNumber:5},void 0)});Wo.displayName=De.Content.displayName;const Zo=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(De.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",lineNumber:94,columnNumber:3},void 0));Zo.displayName=De.Title.displayName;const Qo=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(De.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/dialog.tsx",lineNumber:106,columnNumber:3},void 0));Qo.displayName=De.Description.displayName;const dt=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(ue.Command,{ref:r,className:d("tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",lineNumber:14,columnNumber:3},void 0));dt.displayName=ue.Command.displayName;const ut=i.forwardRef(({className:e,...n},r)=>{const a=te();return t.jsxDEV("div",{className:"tw-flex tw-items-center tw-border-b tw-px-3",dir:a,children:[t.jsxDEV(k.Search,{className:"tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",lineNumber:46,columnNumber:7},void 0),t.jsxDEV(ue.Command.Input,{ref:r,className:d("tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",lineNumber:47,columnNumber:7},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",lineNumber:45,columnNumber:5},void 0)});ut.displayName=ue.Command.Input.displayName;const pt=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(ue.Command.List,{ref:r,className:d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",lineNumber:65,columnNumber:3},void 0));pt.displayName=ue.Command.List.displayName;const wt=i.forwardRef((e,n)=>t.jsxDEV(ue.Command.Empty,{ref:n,className:"tw-py-6 tw-text-center tw-text-sm",...e},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",lineNumber:78,columnNumber:3},void 0));wt.displayName=ue.Command.Empty.displayName;const Mt=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(ue.Command.Group,{ref:r,className:d("tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",lineNumber:87,columnNumber:3},void 0));Mt.displayName=ue.Command.Group.displayName;const br=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(ue.Command.Separator,{ref:r,className:d("tw--mx-1 tw-h-px tw-bg-border",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",lineNumber:103,columnNumber:3},void 0));br.displayName=ue.Command.Separator.displayName;const bt=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(ue.Command.Item,{ref:r,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/command.tsx",lineNumber:115,columnNumber:3},void 0));bt.displayName=ue.Command.Item.displayName;function es(e){return typeof e=="string"?e:typeof e=="number"?e.toString():e.label}function Pt({id:e,options:n=[],className:r,buttonClassName:a,popoverContentClassName:o,value:l,onChange:c=()=>{},getOptionLabel:m=es,icon:u=void 0,buttonPlaceholder:p="",textPlaceholder:x="",commandEmptyMessage:N="No option found",buttonVariant:h="outline",alignDropDown:b="start",isDisabled:P=!1,...S}){const[C,y]=i.useState(!1);return t.jsxDEV(Rt,{open:C,onOpenChange:y,...S,children:[t.jsxDEV(Tt,{asChild:!0,children:t.jsxDEV(Y,{variant:h,role:"combobox","aria-expanded":C,id:e,className:d("tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",a??r),disabled:P,children:[t.jsxDEV("div",{className:"tw-flex tw-flex-1 tw-items-center tw-overflow-hidden",children:[u&&t.jsxDEV("div",{className:"tw-pe-2",children:u},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",lineNumber:106,columnNumber:22},this),t.jsxDEV("span",{className:d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"),children:l?m(l):p},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",lineNumber:107,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",lineNumber:105,columnNumber:11},this),t.jsxDEV(k.ChevronsUpDown,{className:"tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",lineNumber:112,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",lineNumber:94,columnNumber:9},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",lineNumber:93,columnNumber:7},this),t.jsxDEV(mt,{align:b,className:d("tw-w-[200px] tw-p-0",o),children:t.jsxDEV(dt,{children:[t.jsxDEV(ut,{placeholder:x,className:"tw-text-inherit"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",lineNumber:120,columnNumber:11},this),t.jsxDEV(wt,{children:N},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",lineNumber:121,columnNumber:11},this),t.jsxDEV(pt,{children:n.map(D=>t.jsxDEV(bt,{value:m(D),onSelect:()=>{c(D),y(!1)},children:[t.jsxDEV(k.Check,{className:d("tw-me-2 tw-h-4 tw-w-4",{"tw-opacity-0":!l||m(l)!==m(D)})},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",lineNumber:132,columnNumber:17},this),m(D)]},m(D),!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",lineNumber:124,columnNumber:15},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",lineNumber:122,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",lineNumber:119,columnNumber:9},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",lineNumber:115,columnNumber:7},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/combo-box.component.tsx",lineNumber:92,columnNumber:5},this)}function fr({startChapter:e,endChapter:n,handleSelectStartChapter:r,handleSelectEndChapter:a,isDisabled:o=!1,chapterCount:l}){const c=i.useMemo(()=>Array.from({length:l},(p,x)=>x+1),[l]),m=p=>{r(p),p>n&&a(p)},u=p=>{a(p),p<e&&r(p)};return t.jsxDEV(t.Fragment,{children:[t.jsxDEV(ee,{htmlFor:"start-chapters-combobox",children:"Chapters"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/chapter-range-selector.component.tsx",lineNumber:57,columnNumber:7},this),t.jsxDEV(Pt,{isDisabled:o,onChange:m,buttonClassName:"tw-me-2 tw-ms-2 tw-w-20",options:c,getOptionLabel:p=>p.toString(),value:e},"start chapter",!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/chapter-range-selector.component.tsx",lineNumber:58,columnNumber:7},this),t.jsxDEV(ee,{htmlFor:"end-chapters-combobox",children:"to"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/chapter-range-selector.component.tsx",lineNumber:68,columnNumber:7},this),t.jsxDEV(Pt,{isDisabled:o,onChange:u,buttonClassName:"tw-ms-2 tw-w-20",options:c,getOptionLabel:p=>p.toString(),value:n},"end chapter",!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/chapter-range-selector.component.tsx",lineNumber:69,columnNumber:7},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/chapter-range-selector.component.tsx",lineNumber:56,columnNumber:5},this)}var xr=(e=>(e.CURRENT_BOOK="current book",e.CHOOSE_BOOKS="choose books",e))(xr||{});const ts=Object.freeze(["%webView_bookSelector_currentBook%","%webView_bookSelector_choose%","%webView_bookSelector_chooseBooks%"]),Qt=(e,n)=>e[n]??n;function ns({handleBookSelectionModeChange:e,currentBookName:n,onSelectBooks:r,selectedBookIds:a,chapterCount:o,endChapter:l,handleSelectEndChapter:c,startChapter:m,handleSelectStartChapter:u,localizedStrings:p}){const x=Qt(p,"%webView_bookSelector_currentBook%"),N=Qt(p,"%webView_bookSelector_choose%"),h=Qt(p,"%webView_bookSelector_chooseBooks%"),[b,P]=i.useState("current book"),S=C=>{P(C),e(C)};return t.jsxDEV(_t,{className:"pr-twp tw-flex",value:b,onValueChange:C=>S(C),children:t.jsxDEV("div",{className:"tw-flex tw-w-full tw-flex-col tw-gap-4",children:[t.jsxDEV("div",{className:"tw-grid tw-grid-cols-[25%,25%,50%]",children:[t.jsxDEV("div",{className:"tw-flex tw-items-center",children:[t.jsxDEV(ot,{value:"current book"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:107,columnNumber:13},this),t.jsxDEV(ee,{className:"tw-ms-1",children:x},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:108,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:106,columnNumber:11},this),t.jsxDEV(ee,{className:"tw-flex tw-items-center",children:n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:110,columnNumber:11},this),t.jsxDEV("div",{className:"tw-flex tw-items-center tw-justify-end",children:t.jsxDEV(fr,{isDisabled:b==="choose books",handleSelectStartChapter:u,handleSelectEndChapter:c,chapterCount:o,startChapter:m,endChapter:l},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:112,columnNumber:13},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:111,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:105,columnNumber:9},this),t.jsxDEV("div",{className:"tw-grid tw-grid-cols-[25%,50%,25%]",children:[t.jsxDEV("div",{className:"tw-flex tw-items-center",children:[t.jsxDEV(ot,{value:"choose books"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:124,columnNumber:13},this),t.jsxDEV(ee,{className:"tw-ms-1",children:h},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:125,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:123,columnNumber:11},this),t.jsxDEV(ee,{className:"tw-flex tw-items-center",children:a.map(C=>F.bookIdToEnglishName(C)).join(", ")},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:127,columnNumber:11},this),t.jsxDEV(Y,{disabled:b==="current book",onClick:()=>r(),children:N},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:130,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:122,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:104,columnNumber:7},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/book-selector.component.tsx",lineNumber:97,columnNumber:5},this)}function rs({table:e}){return t.jsxDEV(lt,{children:[t.jsxDEV(Qn.DropdownMenuTrigger,{asChild:!0,children:t.jsxDEV(Y,{variant:"outline",size:"sm",className:"tw-ml-auto tw-hidden tw-h-8 lg:tw-flex",children:[t.jsxDEV(k.FilterIcon,{className:"tw-mr-2 tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",lineNumber:23,columnNumber:11},this),"View"]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",lineNumber:22,columnNumber:9},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",lineNumber:21,columnNumber:7},this),t.jsxDEV(qe,{align:"end",className:"tw-w-[150px]",children:[t.jsxDEV(ct,{children:"Toggle columns"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",lineNumber:28,columnNumber:9},this),t.jsxDEV(He,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",lineNumber:29,columnNumber:9},this),e.getAllColumns().filter(n=>n.getCanHide()).map(n=>t.jsxDEV(St,{className:"tw-capitalize",checked:n.getIsVisible(),onCheckedChange:r=>n.toggleVisibility(!!r),children:n.id},n.id,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",lineNumber:35,columnNumber:15},this))]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",lineNumber:27,columnNumber:7},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-column-toggle.component.tsx",lineNumber:20,columnNumber:5},this)}const Oe=W.Root,hr=W.Group,Ie=W.Value,vr=Ue.cva("tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",{variants:{size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-8 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{size:"default"}}),je=i.forwardRef(({className:e,children:n,size:r,...a},o)=>{const l=te();return t.jsxDEV(W.Trigger,{className:d(vr({size:r,className:e})),ref:o,...a,dir:l,children:[n,t.jsxDEV(W.Icon,{asChild:!0,children:t.jsxDEV(k.ChevronDown,{className:"tw-h-4 tw-w-4 tw-opacity-50"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:72,columnNumber:9},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:71,columnNumber:7},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:64,columnNumber:5},void 0)});je.displayName=W.Trigger.displayName;const Dn=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(W.ScrollUpButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...n,children:t.jsxDEV(k.ChevronUp,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:89,columnNumber:5},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:84,columnNumber:3},void 0));Dn.displayName=W.ScrollUpButton.displayName;const yn=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(W.ScrollDownButton,{ref:r,className:d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",e),...n,children:t.jsxDEV(k.ChevronDown,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:104,columnNumber:5},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:99,columnNumber:3},void 0));yn.displayName=W.ScrollDownButton.displayName;const Ge=i.forwardRef(({className:e,children:n,position:r="popper",...a},o)=>{const l=te();return t.jsxDEV(W.Portal,{children:t.jsxDEV(W.Content,{ref:o,className:d("pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",r==="popper"&&"data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",e),position:r,...a,children:[t.jsxDEV(Dn,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:128,columnNumber:9},void 0),t.jsxDEV(W.Viewport,{className:d("tw-p-1",r==="popper"&&"tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"),children:t.jsxDEV("div",{dir:l,children:n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:136,columnNumber:11},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:129,columnNumber:9},void 0),t.jsxDEV(yn,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:138,columnNumber:9},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:117,columnNumber:7},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:116,columnNumber:5},void 0)});Ge.displayName=W.Content.displayName;const gr=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(W.Label,{ref:r,className:d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:150,columnNumber:3},void 0));gr.displayName=W.Label.displayName;const xe=i.forwardRef(({className:e,children:n,...r},a)=>t.jsxDEV(W.Item,{ref:a,className:d("tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",e),...r,children:[t.jsxDEV("span",{className:"tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:t.jsxDEV(W.ItemIndicator,{children:t.jsxDEV(k.Check,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:173,columnNumber:9},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:172,columnNumber:7},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:171,columnNumber:5},void 0),t.jsxDEV(W.ItemText,{children:n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:177,columnNumber:5},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:163,columnNumber:3},void 0));xe.displayName=W.Item.displayName;const Nr=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(W.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/select.tsx",lineNumber:187,columnNumber:3},void 0));Nr.displayName=W.Separator.displayName;function as({table:e}){return t.jsxDEV("div",{className:"tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3",children:t.jsxDEV("div",{className:"tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8",children:[t.jsxDEV("div",{className:"tw-flex-1 tw-text-sm tw-text-muted-foreground",children:[e.getFilteredSelectedRowModel().rows.length," of"," ",e.getFilteredRowModel().rows.length," row(s) selected"]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:21,columnNumber:9},this),t.jsxDEV("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[t.jsxDEV("p",{className:"tw-text-nowrap tw-text-sm tw-font-medium",children:"Rows per page"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:26,columnNumber:11},this),t.jsxDEV(Oe,{value:`${e.getState().pagination.pageSize}`,onValueChange:n=>{e.setPageSize(Number(n))},children:[t.jsxDEV(je,{className:"tw-h-8 tw-w-[70px]",children:t.jsxDEV(Ie,{placeholder:e.getState().pagination.pageSize},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:34,columnNumber:15},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:33,columnNumber:13},this),t.jsxDEV(Ge,{side:"top",children:[10,20,30,40,50].map(n=>t.jsxDEV(xe,{value:`${n}`,children:n},n,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:38,columnNumber:17},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:36,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:27,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:25,columnNumber:9},this),t.jsxDEV("div",{className:"tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium",children:["Page ",e.getState().pagination.pageIndex+1," of ",e.getPageCount()]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:45,columnNumber:9},this),t.jsxDEV("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[t.jsxDEV(Y,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(0),disabled:!e.getCanPreviousPage(),children:[t.jsxDEV("span",{className:"tw-sr-only",children:"Go to first page"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:56,columnNumber:13},this),t.jsxDEV(k.ArrowLeftIcon,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:57,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:49,columnNumber:11},this),t.jsxDEV(Y,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.previousPage(),disabled:!e.getCanPreviousPage(),children:[t.jsxDEV("span",{className:"tw-sr-only",children:"Go to previous page"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:66,columnNumber:13},this),t.jsxDEV(k.ChevronLeftIcon,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:67,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:59,columnNumber:11},this),t.jsxDEV(Y,{variant:"outline",size:"icon",className:"tw-h-8 tw-w-8 tw-p-0",onClick:()=>e.nextPage(),disabled:!e.getCanNextPage(),children:[t.jsxDEV("span",{className:"tw-sr-only",children:"Go to next page"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:76,columnNumber:13},this),t.jsxDEV(k.ChevronRightIcon,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:77,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:69,columnNumber:11},this),t.jsxDEV(Y,{variant:"outline",size:"icon",className:"tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",onClick:()=>e.setPageIndex(e.getPageCount()-1),disabled:!e.getCanNextPage(),children:[t.jsxDEV("span",{className:"tw-sr-only",children:"Go to last page"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:86,columnNumber:13},this),t.jsxDEV(k.ArrowRightIcon,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:87,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:79,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:48,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:20,columnNumber:7},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table-pagination.component.tsx",lineNumber:19,columnNumber:5},this)}const ft=i.forwardRef(({className:e,stickyHeader:n,...r},a)=>t.jsxDEV("div",{className:d("pr-twp tw-relative tw-w-full",{"tw-overflow-auto":!n}),children:t.jsxDEV("table",{ref:a,className:d("tw-w-full tw-caption-bottom tw-text-sm",e),...r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",lineNumber:14,columnNumber:5},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",lineNumber:13,columnNumber:3},void 0));ft.displayName="Table";const xt=i.forwardRef(({className:e,stickyHeader:n,...r},a)=>t.jsxDEV("thead",{ref:a,className:d({"tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm":n},"[&_tr]:tw-border-b",e),...r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",lineNumber:28,columnNumber:3},void 0));xt.displayName="TableHeader";const ht=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("tbody",{ref:r,className:d("[&_tr:last-child]:tw-border-0",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",lineNumber:45,columnNumber:3},void 0));ht.displayName="TableBody";const Dr=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("tfoot",{ref:r,className:d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",lineNumber:54,columnNumber:3},void 0));Dr.displayName="TableFooter";const Ce=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("tr",{ref:r,className:d("tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",lineNumber:65,columnNumber:5},void 0));Ce.displayName="TableRow";const Xe=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("th",{ref:r,className:d("tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",lineNumber:82,columnNumber:3},void 0));Xe.displayName="TableHead";const ze=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("td",{ref:r,className:d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",lineNumber:98,columnNumber:3},void 0));ze.displayName="TableCell";const yr=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("caption",{ref:r,className:d("tw-mt-4 tw-text-sm tw-text-muted-foreground",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/table.tsx",lineNumber:111,columnNumber:3},void 0));yr.displayName="TableCaption";function Cr({columns:e,data:n,enablePagination:r=!1,showPaginationControls:a=!1,showColumnVisibilityControls:o=!1,stickyHeader:l=!1,onRowClickHandler:c=()=>{}}){var C;const[m,u]=i.useState([]),[p,x]=i.useState([]),[N,h]=i.useState({}),[b,P]=i.useState({}),S=ce.useReactTable({data:n,columns:e,getCoreRowModel:ce.getCoreRowModel(),...r&&{getPaginationRowModel:ce.getPaginationRowModel()},onSortingChange:u,getSortedRowModel:ce.getSortedRowModel(),onColumnFiltersChange:x,getFilteredRowModel:ce.getFilteredRowModel(),onColumnVisibilityChange:h,onRowSelectionChange:P,state:{sorting:m,columnFilters:p,columnVisibility:N,rowSelection:b}});return t.jsxDEV("div",{className:"pr-twp",children:[o&&t.jsxDEV(rs,{table:S},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:87,columnNumber:40},this),t.jsxDEV(ft,{stickyHeader:l,children:[t.jsxDEV(xt,{stickyHeader:l,children:S.getHeaderGroups().map(y=>t.jsxDEV(Ce,{children:y.headers.map(D=>t.jsxDEV(Xe,{children:D.isPlaceholder?void 0:ce.flexRender(D.column.columnDef.header,D.getContext())},D.id,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:94,columnNumber:19},this))},y.id,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:91,columnNumber:13},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:89,columnNumber:9},this),t.jsxDEV(ht,{children:(C=S.getRowModel().rows)!=null&&C.length?S.getRowModel().rows.map(y=>t.jsxDEV(Ce,{onClick:()=>c(y,S),"data-state":y.getIsSelected()&&"selected",children:y.getVisibleCells().map(D=>t.jsxDEV(ze,{children:ce.flexRender(D.column.columnDef.cell,D.getContext())},D.id,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:113,columnNumber:19},this))},y.id,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:107,columnNumber:15},this)):t.jsxDEV(Ce,{children:t.jsxDEV(ze,{colSpan:e.length,className:"tw-h-24 tw-text-center",children:"No results."},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:121,columnNumber:15},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:120,columnNumber:13},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:104,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:88,columnNumber:7},this),r&&t.jsxDEV("div",{className:"tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4",children:[t.jsxDEV(Y,{variant:"outline",size:"sm",onClick:()=>S.previousPage(),disabled:!S.getCanPreviousPage(),children:"Previous"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:130,columnNumber:11},this),t.jsxDEV(Y,{variant:"outline",size:"sm",onClick:()=>S.nextPage(),disabled:!S.getCanNextPage(),children:"Next"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:138,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:129,columnNumber:9},this),r&&a&&t.jsxDEV(as,{table:S},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:148,columnNumber:54},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/data-table/data-table.component.tsx",lineNumber:86,columnNumber:5},this)}function os({id:e,markdown:n,className:r,anchorTarget:a}){const o=i.useMemo(()=>({overrides:{a:{props:{target:a}}}}),[a]);return t.jsxDEV("div",{id:e,className:d("pr-twp",r),children:t.jsxDEV(oo,{options:o,children:n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/markdown-renderer.component.tsx",lineNumber:41,columnNumber:7},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/markdown-renderer.component.tsx",lineNumber:40,columnNumber:5},this)}var Er=(e=>(e[e.Check=0]="Check",e[e.Radio=1]="Radio",e))(Er||{});function ss({id:e,label:n,groups:r}){return t.jsxDEV("div",{id:e,children:t.jsxDEV(lt,{children:[t.jsxDEV(Gt,{asChild:!0,children:t.jsxDEV(Y,{variant:"default",children:[t.jsxDEV(k.Filter,{size:16,className:"tw-mr-2 tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",lineNumber:62,columnNumber:13},this),n,t.jsxDEV(k.ChevronDown,{size:16,className:"tw-ml-2 tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",lineNumber:64,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",lineNumber:61,columnNumber:11},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",lineNumber:60,columnNumber:9},this),t.jsxDEV(qe,{children:r.map(a=>t.jsxDEV("div",{children:[t.jsxDEV(ct,{children:a.groupLabel},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",lineNumber:70,columnNumber:15},this),t.jsxDEV(wn,{children:a.items.map(o=>t.jsxDEV("div",{children:o.itemType===0?t.jsxDEV(St,{onClick:o.onClick,children:o.itemLabel},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",lineNumber:75,columnNumber:23},this):t.jsxDEV(xn,{onClick:o.onClick,value:o.itemLabel,children:o.itemLabel},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",lineNumber:79,columnNumber:23},this)},o.itemLabel,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",lineNumber:73,columnNumber:19},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",lineNumber:71,columnNumber:15},this),t.jsxDEV(He,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",lineNumber:86,columnNumber:15},this)]},a.groupLabel,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",lineNumber:69,columnNumber:13},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",lineNumber:67,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",lineNumber:59,columnNumber:7},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/filter-dropdown.component.tsx",lineNumber:57,columnNumber:5},this)}function is({id:e,category:n,downloads:r,languages:a,moreInfoUrl:o}){const l=new E.NumberFormat("en",{notation:"compact",compactDisplay:"short"}).format(Object.values(r).reduce((m,u)=>m+u,0)),c=()=>{window.scrollTo(0,document.body.scrollHeight)};return t.jsxDEV("div",{id:e,className:"tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",children:[t.jsxDEV("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1",children:[t.jsxDEV("div",{className:"tw-flex",children:t.jsxDEV("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:52,columnNumber:11},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:51,columnNumber:9},this),t.jsxDEV("span",{className:"tw-text-xs tw-text-foreground",children:"CATEGORY"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:54,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:50,columnNumber:7},this),t.jsxDEV("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[t.jsxDEV("div",{className:"tw-flex tw-gap-1",children:[t.jsxDEV(k.User,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:58,columnNumber:11},this),t.jsxDEV("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:l},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:59,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:57,columnNumber:9},this),t.jsxDEV("span",{className:"tw-text-xs tw-text-foreground",children:"USERS"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:61,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:56,columnNumber:7},this),t.jsxDEV("div",{className:"tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4",children:[t.jsxDEV("div",{className:"tw-flex tw-gap-2",children:a.slice(0,3).map(m=>t.jsxDEV("span",{className:"tw-text-xs tw-font-semibold tw-text-foreground",children:m.toUpperCase()},m,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:66,columnNumber:13},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:64,columnNumber:9},this),a.length>3&&t.jsxDEV("button",{type:"button",onClick:()=>c(),className:"tw-text-xs tw-text-foreground tw-underline",children:["+",a.length-3," more languages"]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:72,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:63,columnNumber:7},this),t.jsxDEV("div",{className:"tw-flex tw-flex-col tw-gap-1 tw-ps-4",children:[t.jsxDEV("div",{className:"tw-flex tw-gap-1",children:[t.jsxDEV("a",{href:o,target:"_blank",rel:"noreferrer",className:"tw-flex tw-text-xs tw-font-semibold tw-text-foreground tw-underline",children:"Website"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:83,columnNumber:11},this),t.jsxDEV(k.Link,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:91,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:82,columnNumber:9},this),t.jsxDEV("div",{className:"tw-flex tw-gap-1",children:[t.jsxDEV("a",{href:"https://example.com",target:"_blank",rel:"noreferrer",className:"tw-flex tw-text-xs tw-font-semibold tw-text-foreground tw-underline",children:"Support"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:94,columnNumber:11},this),t.jsxDEV(k.CircleHelp,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:102,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:93,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:81,columnNumber:7},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/more-info.component.tsx",lineNumber:46,columnNumber:5},this)}function ls({id:e,versionHistory:n}){const[r,a]=i.useState(!1),o=new Date;function l(m){const u=new Date(m),p=new Date(o.getTime()-u.getTime()),x=p.getUTCFullYear()-1970,N=p.getUTCMonth(),h=p.getUTCDate()-1;let b="";return x>0?b=`${x.toString()} year${x===1?"":"s"} ago`:N>0?b=`${N.toString()} month${N===1?"":"s"} ago`:h===0?b="today":b=`${h.toString()} day${h===1?"":"s"} ago`,b}const c=Object.entries(n).sort((m,u)=>u[0].localeCompare(m[0]));return t.jsxDEV("div",{id:e,children:[t.jsxDEV("h3",{className:"tw-text-md tw-font-semibold",children:"What`s New"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",lineNumber:65,columnNumber:7},this),t.jsxDEV("ul",{className:"tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground",children:(r?c:c.slice(0,5)).map(m=>t.jsxDEV("div",{className:"tw-mt-3 tw-flex tw-justify-between",children:[t.jsxDEV("div",{className:"tw-text-foreground",children:t.jsxDEV("li",{className:"tw-prose tw-text-xs",children:t.jsxDEV("span",{children:m[1].description},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",lineNumber:71,columnNumber:17},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",lineNumber:70,columnNumber:15},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",lineNumber:69,columnNumber:13},this),t.jsxDEV("div",{className:"tw-justify-end tw-text-right",children:[t.jsxDEV("div",{children:["Version ",m[0]]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",lineNumber:75,columnNumber:15},this),t.jsxDEV("div",{children:l(m[1].date)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",lineNumber:76,columnNumber:15},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",lineNumber:74,columnNumber:13},this)]},m[0],!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",lineNumber:68,columnNumber:11},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",lineNumber:66,columnNumber:7},this),c.length>5&&t.jsxDEV("button",{type:"button",onClick:()=>a(!r),className:"tw-text-xs tw-text-foreground tw-underline",children:r?"Show Less Version History":"Show All Version History"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",lineNumber:82,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/version-history.component.tsx",lineNumber:64,columnNumber:5},this)}function cs({id:e,publisherDisplayName:n,fileSize:r,locales:a,versionHistory:o}){const l=i.useMemo(()=>E.formatBytes(r),[r]),m=(u=>{const p=new Intl.DisplayNames(navigator.language,{type:"language"});return u.map(x=>p.of(x))})(a);return t.jsxDEV("div",{id:e,className:"tw-border-t tw-py-2",children:t.jsxDEV("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-divide-y",children:[t.jsxDEV(ls,{versionHistory:o},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:52,columnNumber:9},this),t.jsxDEV("div",{className:"tw-flex tw-flex-col tw-gap-2 tw-py-2",children:[t.jsxDEV("h2",{className:"tw-text-md tw-font-semibold",children:"Information"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:54,columnNumber:11},this),t.jsxDEV("div",{className:"tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground",children:[t.jsxDEV("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[t.jsxDEV("span",{children:"Publisher"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:57,columnNumber:15},this),t.jsxDEV("span",{className:"tw-font-semibold",children:n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:58,columnNumber:15},this),t.jsxDEV("span",{children:"Size"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:59,columnNumber:15},this),t.jsxDEV("span",{className:"tw-font-semibold",children:l},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:60,columnNumber:15},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:56,columnNumber:13},this),t.jsxDEV("div",{className:"tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground",children:t.jsxDEV("p",{className:"tw-flex tw-flex-col tw-justify-start tw-gap-1",children:[t.jsxDEV("span",{children:"Languages"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:64,columnNumber:17},this),t.jsxDEV("span",{className:"tw-font-semibold",children:m.join(", ")},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:65,columnNumber:17},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:63,columnNumber:15},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:62,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:55,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:53,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:51,columnNumber:7},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/extension-marketplace/footer.component.tsx",lineNumber:50,columnNumber:5},this)}const kr=Ue.cva("pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",{variants:{variant:{default:"tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",secondary:"tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",muted:"tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",destructive:"tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",outline:"tw-border tw-text-foreground",blueIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",mutedIndicator:"tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"}},defaultVariants:{variant:"default"}}),st=i.forwardRef(({className:e,variant:n,...r},a)=>t.jsxDEV("div",{ref:a,className:d("pr-twp",kr({variant:n}),e),...r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/badge.tsx",lineNumber:55,columnNumber:7},void 0));st.displayName="Badge";function Pr({entries:e,getEntriesCount:n=void 0,selected:r,onChange:a,placeholder:o,commandEmptyMessage:l="No entries found",customSelectedText:c,isDisabled:m=!1,sortSelected:u=!1,icon:p=void 0,className:x=void 0}){const[N,h]=i.useState(!1),b=i.useCallback(C=>{var D;const y=(D=e.find(G=>G.label===C))==null?void 0:D.value;y&&a(r.includes(y)?r.filter(G=>G!==y):[...r,y])},[e,r,a]),P=()=>c||o,S=i.useMemo(()=>{if(!u)return e;const C=e.filter(D=>D.starred).sort((D,G)=>D.label.localeCompare(G.label)),y=e.filter(D=>!D.starred).sort((D,G)=>{const z=r.includes(D.value),K=r.includes(G.value);return z&&!K?-1:!z&&K?1:D.label.localeCompare(G.label)});return[...C,...y]},[e,r,u]);return t.jsxDEV("div",{className:x,children:t.jsxDEV(Rt,{open:N,onOpenChange:h,children:[t.jsxDEV(Tt,{asChild:!0,children:t.jsxDEV(Y,{variant:"ghost",role:"combobox","aria-expanded":N,className:d("tw-w-full tw-justify-between",r.length>0&&r.length<e.length&&"tw-border-primary","tw-group"),disabled:m,children:[t.jsxDEV("div",{className:"tw-flex tw-items-center tw-gap-2",children:[t.jsxDEV("div",{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50",children:t.jsxDEV("span",{className:"tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center",children:p},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:120,columnNumber:17},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:119,columnNumber:15},this),t.jsxDEV("div",{className:d({"tw-text-muted-foreground group-hover:tw-text-secondary-foreground":r.length===0||r.length===e.length}),children:t.jsxDEV("div",{className:"tw-font-normal",children:P()},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:130,columnNumber:17},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:124,columnNumber:15},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:118,columnNumber:13},this),t.jsxDEV(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:133,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:107,columnNumber:11},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:106,columnNumber:9},this),t.jsxDEV(mt,{align:"start",className:"tw-w-full tw-p-0",children:t.jsxDEV(dt,{children:[t.jsxDEV(ut,{placeholder:`Search ${o.toLowerCase()}...`},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:138,columnNumber:13},this),t.jsxDEV(pt,{children:[t.jsxDEV(wt,{children:l},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:140,columnNumber:15},this),t.jsxDEV(Mt,{children:S.map(C=>{const y=n?n(C):void 0;return t.jsxDEV(bt,{value:C.label,onSelect:b,className:"tw-flex tw-items-center tw-gap-2",children:[t.jsxDEV("div",{className:"w-4",children:t.jsxDEV(k.Check,{className:d("tw-h-4 tw-w-4",r.includes(C.value)?"tw-opacity-100":"tw-opacity-0")},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:154,columnNumber:25},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:153,columnNumber:23},this),t.jsxDEV("div",{className:"tw-w-4",children:C.starred&&t.jsxDEV(k.Star,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:162,columnNumber:44},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:161,columnNumber:23},this),t.jsxDEV("div",{className:"tw-flex-grow",children:C.label},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:164,columnNumber:23},this),n&&t.jsxDEV("div",{className:"tw-w-10 tw-text-end tw-text-muted-foreground",children:y},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:166,columnNumber:25},this)]},C.label,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:147,columnNumber:21},this)})},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:141,columnNumber:15},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:139,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:137,columnNumber:11},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:136,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:105,columnNumber:7},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/multi-select-combo-box.component.tsx",lineNumber:104,columnNumber:5},this)}function ms({entries:e,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:l,customSelectedText:c,isDisabled:m,sortSelected:u,icon:p,className:x,badgesPlaceholder:N}){return t.jsxDEV("div",{className:"tw-flex tw-items-center tw-gap-2",children:[t.jsxDEV(Pr,{entries:e,getEntriesCount:n,selected:r,onChange:a,placeholder:o,commandEmptyMessage:l,customSelectedText:c,isDisabled:m,sortSelected:u,icon:p,className:x},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/filter.component.tsx",lineNumber:37,columnNumber:7},this),r.length>0?t.jsxDEV("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:r.map(h=>{var b;return t.jsxDEV(st,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[t.jsxDEV(Y,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>a(r.filter(P=>P!==h)),children:t.jsxDEV(k.X,{className:"tw-h-3 tw-w-3"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/filter.component.tsx",lineNumber:60,columnNumber:17},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/filter.component.tsx",lineNumber:54,columnNumber:15},this),(b=e.find(P=>P.value===h))==null?void 0:b.label]},h,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/filter.component.tsx",lineNumber:53,columnNumber:13},this)})},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/filter.component.tsx",lineNumber:51,columnNumber:9},this):t.jsxDEV(ee,{children:N},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/filter.component.tsx",lineNumber:67,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/filter.component.tsx",lineNumber:36,columnNumber:5},this)}function ds({occurrenceData:e,setScriptureReference:n,localizedStrings:r}){const a=r["%webView_inventory_occurrences_table_header_reference%"],o=r["%webView_inventory_occurrences_table_header_occurrence%"],l=i.useMemo(()=>{const c=[];return e.forEach(m=>{c.some(u=>E.deepEqual(u,m))||c.push(m)}),c},[e]);return t.jsxDEV(ft,{stickyHeader:!0,children:[t.jsxDEV(xt,{stickyHeader:!0,children:t.jsxDEV(Ce,{children:[t.jsxDEV(Xe,{children:a},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",lineNumber:58,columnNumber:11},this),t.jsxDEV(Xe,{children:o},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",lineNumber:59,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",lineNumber:57,columnNumber:9},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",lineNumber:56,columnNumber:7},this),t.jsxDEV(ht,{children:l.length>0&&l.map(c=>t.jsxDEV(Ce,{onClick:()=>{n(c.reference)},children:[t.jsxDEV(ze,{children:`${F.bookIdToEnglishName(c.reference.book)} ${c.reference.chapterNum}:${c.reference.verseNum}`},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",lineNumber:73,columnNumber:15},this),t.jsxDEV(ze,{children:c.text},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",lineNumber:74,columnNumber:15},this)]},`${c.reference.book} ${c.reference.chapterNum}:${c.reference.verseNum}-${c.text}`,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",lineNumber:65,columnNumber:13},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",lineNumber:62,columnNumber:7},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/occurrences-table.component.tsx",lineNumber:55,columnNumber:5},this)}const Ot=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(an.Root,{ref:r,className:d("tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",e),...n,children:t.jsxDEV(an.Indicator,{className:d("tw-flex tw-items-center tw-justify-center tw-text-current"),children:t.jsxDEV(k.Check,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/checkbox.tsx",lineNumber:29,columnNumber:7},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/checkbox.tsx",lineNumber:26,columnNumber:5},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/checkbox.tsx",lineNumber:18,columnNumber:3},void 0));Ot.displayName=an.Root.displayName;const Vr=Ue.cva("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",{variants:{variant:{default:"tw-bg-transparent",outline:"tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"},size:{default:"tw-h-10 tw-px-3",sm:"tw-h-9 tw-px-2.5",lg:"tw-h-11 tw-px-5"}},defaultVariants:{variant:"default",size:"default"}}),us=i.forwardRef(({className:e,variant:n,size:r,...a},o)=>t.jsxDEV(nr.Root,{ref:o,className:d(Vr({variant:n,size:r,className:e})),...a},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/toggle.tsx",lineNumber:33,columnNumber:3},void 0));us.displayName=nr.Root.displayName;const jr=i.createContext({size:"default",variant:"default"}),Cn=i.forwardRef(({className:e,variant:n,size:r,children:a,...o},l)=>{const c=te();return t.jsxDEV(jt.Root,{ref:l,className:d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1",e),...o,dir:c,children:t.jsxDEV(jr.Provider,{value:{variant:n,size:r},children:a},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/toggle-group.tsx",lineNumber:34,columnNumber:7},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/toggle-group.tsx",lineNumber:28,columnNumber:5},void 0)});Cn.displayName=jt.Root.displayName;const nt=i.forwardRef(({className:e,children:n,variant:r,size:a,...o},l)=>{const c=i.useContext(jr);return t.jsxDEV(jt.Item,{ref:l,className:d(Vr({variant:c.variant||r,size:c.size||a}),e),...o,children:n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/toggle-group.tsx",lineNumber:56,columnNumber:5},void 0)});nt.displayName=jt.Item.displayName;const It=e=>e==="asc"?t.jsxDEV(k.ArrowUpIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:24,columnNumber:12},void 0):e==="desc"?t.jsxDEV(k.ArrowDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:27,columnNumber:12},void 0):t.jsxDEV(k.ArrowUpDownIcon,{className:"tw-ms-2 tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:29,columnNumber:10},void 0),ps=e=>({accessorKey:"item",accessorFn:n=>n.items[0],header:({column:n})=>t.jsxDEV(Y,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,It(n.getIsSorted())]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:43,columnNumber:7},void 0)}),ws=(e,n)=>({accessorKey:`item${n}`,accessorFn:r=>r.items[n],header:({column:r})=>t.jsxDEV(Y,{variant:"ghost",onClick:()=>r.toggleSorting(void 0),children:[e,It(r.getIsSorted())]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:69,columnNumber:7},void 0)}),bs=e=>({accessorKey:"count",header:({column:n})=>t.jsxDEV("div",{className:"tw-flex tw-justify-end tw-tabular-nums",children:t.jsxDEV(Y,{variant:"ghost",onClick:()=>n.toggleSorting(void 0),children:[e,It(n.getIsSorted())]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:89,columnNumber:9},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:88,columnNumber:7},void 0),cell:({row:n})=>t.jsxDEV("div",{className:"tw-flex tw-justify-end",children:n.getValue("count")},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:95,columnNumber:24},void 0)}),en=(e,n,r,a,o,l)=>{let c=[...r];e.forEach(u=>{n==="approved"?c.includes(u)||c.push(u):c=c.filter(p=>p!==u)}),a(c);let m=[...o];e.forEach(u=>{n==="unapproved"?m.includes(u)||m.push(u):m=m.filter(p=>p!==u)}),l(m)},fs=(e,n,r,a,o)=>({accessorKey:"status",header:({column:l})=>t.jsxDEV("div",{className:"tw-flex tw-justify-center",children:t.jsxDEV(Y,{variant:"ghost",onClick:()=>l.toggleSorting(void 0),children:[e,It(l.getIsSorted())]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:166,columnNumber:11},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:165,columnNumber:9},void 0),cell:({row:l})=>{const c=l.getValue("status"),m=l.getValue("item");return t.jsxDEV(Cn,{value:c,variant:"outline",type:"single",children:[t.jsxDEV(nt,{onClick:u=>{u.stopPropagation(),en([m],"approved",n,r,a,o)},value:"approved",children:t.jsxDEV(k.CircleCheckIcon,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:192,columnNumber:13},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:178,columnNumber:11},void 0),t.jsxDEV(nt,{onClick:u=>{u.stopPropagation(),en([m],"unapproved",n,r,a,o)},value:"unapproved",children:t.jsxDEV(k.CircleXIcon,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:208,columnNumber:13},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:194,columnNumber:11},void 0),t.jsxDEV(nt,{onClick:u=>{u.stopPropagation(),en([m],"unknown",n,r,a,o)},value:"unknown",children:t.jsxDEV(k.CircleHelpIcon,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:224,columnNumber:13},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:210,columnNumber:11},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory-columns.tsx",lineNumber:177,columnNumber:9},void 0)}}),xs=e=>e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g),hs=e=>{const n=/^\\[vc]\s+(\d+)/,r=e.match(n);if(r)return+r[1]},vs=e=>{const n=e.match(/^\\id\s+([A-Za-z]+)/);return n?n[1]:""},Gr=(e,n,r)=>r.includes(e)?"unapproved":n.includes(e)?"approved":"unknown",gs=Object.freeze(["%webView_inventory_all%","%webView_inventory_approved%","%webView_inventory_unapproved%","%webView_inventory_unknown%","%webView_inventory_scope_currentBook%","%webView_inventory_scope_chapter%","%webView_inventory_scope_verse%","%webView_inventory_filter_text%","%webView_inventory_show_additional_items%","%webView_inventory_occurrences_table_header_reference%","%webView_inventory_occurrences_table_header_occurrence%"]),Ns=(e,n,r)=>{let a=e;return n!=="all"&&(a=a.filter(o=>n==="approved"&&o.status==="approved"||n==="unapproved"&&o.status==="unapproved"||n==="unknown"&&o.status==="unknown")),r!==""&&(a=a.filter(o=>o.items[0].includes(r))),a},Ds=(e,n,r)=>{const a=[];return e.forEach(o=>{const l=a.find(c=>E.deepEqual(c.items,E.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText));if(l)l.count+=1,l.occurrences.push({reference:o.verseRef,text:o.verse});else{const c={items:E.isString(o.inventoryText)?[o.inventoryText]:o.inventoryText,count:1,status:Gr(E.isString(o.inventoryText)?o.inventoryText:o.inventoryText[0],n,r),occurrences:[{reference:o.verseRef,text:o.verse}]};a.push(c)}}),a},ke=(e,n)=>e[n]??n;function ys({inventoryItems:e,setVerseRef:n,localizedStrings:r,additionalItemsLabels:a,approvedItems:o,unapprovedItems:l,scope:c,onScopeChange:m,columns:u}){const p=ke(r,"%webView_inventory_all%"),x=ke(r,"%webView_inventory_approved%"),N=ke(r,"%webView_inventory_unapproved%"),h=ke(r,"%webView_inventory_unknown%"),b=ke(r,"%webView_inventory_scope_currentBook%"),P=ke(r,"%webView_inventory_scope_chapter%"),S=ke(r,"%webView_inventory_filter_text%"),C=ke(r,"%webView_inventory_show_additional_items%"),[y,D]=i.useState(!1),[G,z]=i.useState("all"),[K,ye]=i.useState(""),[he,j]=i.useState([]),v=i.useMemo(()=>e.length===0?[]:Ds(e,o,l),[e,o,l]),X=i.useMemo(()=>{if(y)return v;const R=[];return v.forEach(f=>{const T=f.items[0],V=R.find(M=>M.items[0]===T);V?(V.count+=f.count,V.occurrences=V.occurrences.concat(f.occurrences)):R.push({items:[T],count:f.count,occurrences:f.occurrences,status:f.status})}),R},[y,v]),_=i.useMemo(()=>Ns(X,G,K),[X,G,K]),se=i.useMemo(()=>{var T,V;if(!y)return u;const R=(T=a==null?void 0:a.tableHeaders)==null?void 0:T.length;if(!R)return u;const f=[];for(let M=0;M<R;M++)f.push(ws(((V=a==null?void 0:a.tableHeaders)==null?void 0:V[M])||"Additional Item",M+1));return[...f,...u]},[a==null?void 0:a.tableHeaders,u,y]);i.useEffect(()=>{_.length===0?j([]):_.length===1&&j(_[0].items)},[_]);const oe=(R,f)=>{f.setRowSelection(()=>{const T={};return T[R.index]=!0,T}),j(R.original.items)},we=R=>{if(R==="book"||R==="chapter")m(R);else throw new Error(`Invalid scope value: ${R}`)},ie=R=>{if(R==="all"||R==="approved"||R==="unapproved"||R==="unknown")z(R);else throw new Error(`Invalid status filter value: ${R}`)},ne=i.useMemo(()=>{if(X.length===0||he.length===0)return[];const R=X.filter(f=>E.deepEqual(y?f.items:[f.items[0]],he));if(R.length>1)throw new Error("Selected item is not unique");return R.length===0?[]:R[0].occurrences},[he,y,X]);return t.jsxDEV("div",{className:"pr-twp tw-flex tw-h-full tw-flex-col",children:[t.jsxDEV("div",{className:"tw-flex tw-items-stretch",children:[t.jsxDEV(Oe,{onValueChange:R=>ie(R),defaultValue:G,children:[t.jsxDEV(je,{className:"tw-m-1",children:t.jsxDEV(Ie,{placeholder:"Select filter"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:364,columnNumber:13},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:363,columnNumber:11},this),t.jsxDEV(Ge,{children:[t.jsxDEV(xe,{value:"all",children:p},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:367,columnNumber:13},this),t.jsxDEV(xe,{value:"approved",children:x},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:368,columnNumber:13},this),t.jsxDEV(xe,{value:"unapproved",children:N},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:369,columnNumber:13},this),t.jsxDEV(xe,{value:"unknown",children:h},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:370,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:366,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:359,columnNumber:9},this),t.jsxDEV(Oe,{onValueChange:R=>we(R),defaultValue:c,children:[t.jsxDEV(je,{className:"tw-m-1",children:t.jsxDEV(Ie,{placeholder:"Select scope"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:375,columnNumber:13},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:374,columnNumber:11},this),t.jsxDEV(Ge,{children:[t.jsxDEV(xe,{value:"book",children:b},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:378,columnNumber:13},this),t.jsxDEV(xe,{value:"chapter",children:P},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:379,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:377,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:373,columnNumber:9},this),t.jsxDEV(Ae,{className:"tw-m-1 tw-rounded-md tw-border",placeholder:S,value:K,onChange:R=>{ye(R.target.value)}},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:382,columnNumber:9},this),a&&t.jsxDEV("div",{className:"tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border",children:[t.jsxDEV(Ot,{className:"tw-m-1",checked:y,onCheckedChange:R=>{D(R)}},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:392,columnNumber:13},this),t.jsxDEV(ee,{className:"tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap",children:(a==null?void 0:a.checkboxText)??C},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:399,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:391,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:358,columnNumber:7},this),t.jsxDEV("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:t.jsxDEV(Cr,{columns:se,data:_,onRowClickHandler:oe,stickyHeader:!0},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:406,columnNumber:9},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:405,columnNumber:7},this),ne.length>0&&t.jsxDEV("div",{className:"tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border",children:t.jsxDEV(ds,{occurrenceData:ne,setScriptureReference:n,localizedStrings:r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:415,columnNumber:11},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:414,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/inventory/inventory.component.tsx",lineNumber:357,columnNumber:5},this)}const zt=i.forwardRef(({className:e,orientation:n="horizontal",decorative:r=!0,...a},o)=>t.jsxDEV(rr.Root,{ref:o,decorative:r,orientation:n,className:d("pr-twp tw-shrink-0 tw-bg-border",n==="horizontal"?"tw-h-[1px] tw-w-full":"tw-h-full tw-w-[1px]",e),...a},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/separator.tsx",lineNumber:17,columnNumber:3},void 0));zt.displayName=rr.Root.displayName;function ln({className:e,...n}){return t.jsxDEV("div",{className:d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/skeleton.tsx",lineNumber:6,columnNumber:5},this)}const At=it.Provider,Ft=it.Root,Bt=it.Trigger,vt=i.forwardRef(({className:e,sideOffset:n=4,...r},a)=>t.jsxDEV(it.Content,{ref:a,sideOffset:n,className:d("pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",e),...r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/tooltip.tsx",lineNumber:25,columnNumber:3},void 0));vt.displayName=it.Content.displayName;const Cs="16rem",Es="3rem",Ur=i.createContext(void 0);function Lt(){const e=i.useContext(Ur);if(!e)throw new Error("useSidebar must be used within a SidebarProvider.");return e}const Sr=i.forwardRef(({defaultOpen:e=!0,open:n,onOpenChange:r,className:a,style:o,children:l,side:c="primary",...m},u)=>{const[p,x]=i.useState(e),N=n??p,h=i.useCallback(G=>{const z=typeof G=="function"?G(N):G;r?r(z):x(z)},[r,N]),b=i.useCallback(()=>h(G=>!G),[h]),P=N?"expanded":"collapsed",y=te()==="ltr"?c:c==="primary"?"secondary":"primary",D=i.useMemo(()=>({state:P,open:N,setOpen:h,toggleSidebar:b,side:y}),[P,N,h,b,y]);return t.jsxDEV(Ur.Provider,{value:D,children:t.jsxDEV(At,{delayDuration:0,children:t.jsxDEV("div",{style:{"--sidebar-width":Cs,"--sidebar-width-icon":Es,...o},className:d("tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",a),ref:u,...m,children:l},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:131,columnNumber:11},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:130,columnNumber:9},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:129,columnNumber:7},void 0)});Sr.displayName="SidebarProvider";const _r=i.forwardRef(({variant:e="sidebar",collapsible:n="offcanvas",className:r,children:a,...o},l)=>{const c=Lt();return n==="none"?t.jsxDEV("div",{className:d("tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",r),ref:l,...o,children:a},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:168,columnNumber:7},void 0):t.jsxDEV("div",{ref:l,className:"tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block","data-state":c.state,"data-collapsible":c.state==="collapsed"?n:"","data-variant":e,"data-side":c.side,children:[t.jsxDEV("div",{className:d("tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear","group-data-[collapsible=offcanvas]:tw-w-0","group-data-[side=secondary]:tw-rotate-180",e==="floating"||e==="inset"?"group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]")},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:191,columnNumber:7},void 0),t.jsxDEV("div",{className:d("tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",c.side==="primary"?"tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]":"tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",e==="floating"||e==="inset"?"tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]":"group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",r),...o,children:t.jsxDEV("div",{"data-sidebar":"sidebar",className:"tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",children:a},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:216,columnNumber:9},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:201,columnNumber:7},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:182,columnNumber:5},void 0)});_r.displayName="Sidebar";const ks=i.forwardRef(({className:e,onClick:n,...r},a)=>{const o=Lt();return t.jsxDEV(Y,{ref:a,"data-sidebar":"trigger",variant:"ghost",size:"icon",className:d("tw-h-7 tw-w-7",e),onClick:l=>{n==null||n(l),o.toggleSidebar()},...r,children:[o.side==="primary"?t.jsxDEV(k.PanelLeft,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:247,columnNumber:37},void 0):t.jsxDEV(k.PanelRight,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:247,columnNumber:53},void 0),t.jsxDEV("span",{className:"tw-sr-only",children:"Toggle Sidebar"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:248,columnNumber:7},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:235,columnNumber:5},void 0)});ks.displayName="SidebarTrigger";const Ps=i.forwardRef(({className:e,...n},r)=>{const{toggleSidebar:a}=Lt();return t.jsxDEV("button",{type:"button",ref:r,"data-sidebar":"rail","aria-label":"Toggle Sidebar",tabIndex:-1,onClick:a,title:"Toggle Sidebar",className:d("tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex","[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize","[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize","group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar","[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2","[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:259,columnNumber:7},void 0)});Ps.displayName="SidebarRail";const Rr=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("main",{ref:r,className:d("tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background","peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:286,columnNumber:7},void 0));Rr.displayName="SidebarInset";const Vs=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(Ae,{ref:r,"data-sidebar":"input",className:d("tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:306,columnNumber:5},void 0));Vs.displayName="SidebarInput";const js=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("div",{ref:r,"data-sidebar":"header",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:322,columnNumber:7},void 0));js.displayName="SidebarHeader";const Gs=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("div",{ref:r,"data-sidebar":"footer",className:d("tw-flex tw-flex-col tw-gap-2 tw-p-2",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:336,columnNumber:7},void 0));Gs.displayName="SidebarFooter";const Us=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(zt,{ref:r,"data-sidebar":"separator",className:d("tw-mx-2 tw-w-auto tw-bg-sidebar-border",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:352,columnNumber:5},void 0));Us.displayName="SidebarSeparator";const Tr=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("div",{ref:r,"data-sidebar":"content",className:d("tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:365,columnNumber:7},void 0));Tr.displayName="SidebarContent";const cn=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("div",{ref:r,"data-sidebar":"group",className:d("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:382,columnNumber:7},void 0));cn.displayName="SidebarGroup";const mn=i.forwardRef(({className:e,asChild:n=!1,...r},a)=>{const o=n?$e.Slot:"div";return t.jsxDEV(o,{ref:a,"data-sidebar":"group-label",className:d("tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",e),...r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:400,columnNumber:5},void 0)});mn.displayName="SidebarGroupLabel";const Ss=i.forwardRef(({className:e,asChild:n=!1,...r},a)=>{const o=n?$e.Slot:"button";return t.jsxDEV(o,{ref:a,"data-sidebar":"group-action",className:d("tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","group-data-[collapsible=icon]:tw-hidden",e),...r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:421,columnNumber:5},void 0)});Ss.displayName="SidebarGroupAction";const dn=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("div",{ref:r,"data-sidebar":"group-content",className:d("tw-w-full tw-text-sm",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:439,columnNumber:5},void 0));dn.displayName="SidebarGroupContent";const Mr=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("ul",{ref:r,"data-sidebar":"menu",className:d("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:451,columnNumber:5},void 0));Mr.displayName="SidebarMenu";const Or=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("li",{ref:r,"data-sidebar":"menu-item",className:d("tw-group/menu-item tw-relative",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:463,columnNumber:5},void 0));Or.displayName="SidebarMenuItem";const _s=Ue.cva("tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",{variants:{variant:{default:"hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",outline:"tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"},size:{default:"tw-h-8 tw-text-sm",sm:"tw-h-7 tw-text-xs",lg:"tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"}},defaultVariants:{variant:"default",size:"default"}}),Ir=i.forwardRef(({asChild:e=!1,isActive:n=!1,variant:r="default",size:a="default",tooltip:o,className:l,...c},m)=>{const u=e?$e.Slot:"button",{state:p}=Lt(),x=t.jsxDEV(u,{ref:m,"data-sidebar":"menu-button","data-size":a,"data-active":n,className:d(_s({variant:r,size:a}),l),...c},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:519,columnNumber:7},void 0);return o?(typeof o=="string"&&(o={children:o}),t.jsxDEV(Ft,{children:[t.jsxDEV(Bt,{asChild:!0,children:x},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:542,columnNumber:9},void 0),t.jsxDEV(vt,{side:"right",align:"center",hidden:p!=="collapsed",...o},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:543,columnNumber:9},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:541,columnNumber:7},void 0)):x});Ir.displayName="SidebarMenuButton";const Rs=i.forwardRef(({className:e,asChild:n=!1,showOnHover:r=!1,...a},o)=>{const l=n?$e.Slot:"button";return t.jsxDEV(l,{ref:o,"data-sidebar":"menu-action",className:d("tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0","after:tw-absolute after:tw--inset-2 after:md:tw-hidden","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",r&&"tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",e),...a},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:560,columnNumber:5},void 0)});Rs.displayName="SidebarMenuAction";const Ts=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("div",{ref:r,"data-sidebar":"menu-badge",className:d("tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground","tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground","tw-peer-data-[size=sm]/menu-button:top-1","tw-peer-data-[size=default]/menu-button:top-1.5","tw-peer-data-[size=lg]/menu-button:top-2.5","group-data-[collapsible=icon]:tw-hidden",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:583,columnNumber:5},void 0));Ts.displayName="SidebarMenuBadge";const Ms=i.forwardRef(({className:e,showIcon:n=!1,...r},a)=>{const o=i.useMemo(()=>`${Math.floor(Math.random()*40)+50}%`,[]);return t.jsxDEV("div",{ref:a,"data-sidebar":"menu-skeleton",className:d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",e),...r,children:[n&&t.jsxDEV(ln,{className:"tw-size-4 tw-rounded-md","data-sidebar":"menu-skeleton-icon"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:620,columnNumber:9},void 0),t.jsxDEV(ln,{className:"tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1","data-sidebar":"menu-skeleton-text",style:{"--skeleton-width":o}},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:622,columnNumber:7},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:613,columnNumber:5},void 0)});Ms.displayName="SidebarMenuSkeleton";const Os=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("ul",{ref:r,"data-sidebar":"menu-sub",className:d("tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5","group-data-[collapsible=icon]:tw-hidden",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:639,columnNumber:5},void 0));Os.displayName="SidebarMenuSub";const Is=i.forwardRef(({...e},n)=>t.jsxDEV("li",{ref:n,...e},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:654,columnNumber:26},void 0));Is.displayName="SidebarMenuSubItem";const zs=i.forwardRef(({asChild:e=!1,size:n="md",isActive:r,className:a,...o},l)=>{const c=e?$e.Slot:"a";return t.jsxDEV(c,{ref:l,"data-sidebar":"menu-sub-button","data-size":n,"data-active":r,className:d("tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground","data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",n==="sm"&&"tw-text-xs",n==="md"&&"tw-text-sm","group-data-[collapsible=icon]:tw-hidden",a),...o},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sidebar.tsx",lineNumber:669,columnNumber:5},void 0)});zs.displayName="SidebarMenuSubButton";function zr({id:e,extensionLabels:n,projectInfo:r,handleSelectSidebarItem:a,selectedSidebarItem:o,extensionsSidebarGroupLabel:l,projectsSidebarGroupLabel:c,buttonPlaceholderText:m,className:u}){const p=i.useCallback((h,b)=>{a(h,b)},[a]),x=i.useCallback(h=>{const b=r.find(P=>P.projectId===h);return b?b.projectName:h},[r]),N=i.useCallback(h=>!o.projectId&&h===o.label,[o]);return t.jsxDEV(_r,{id:e,collapsible:"none",variant:"inset",className:d("tw-w-96 tw-gap-2 tw-overflow-y-auto",u),children:t.jsxDEV(Tr,{children:[t.jsxDEV(cn,{children:[t.jsxDEV(mn,{className:"tw-text-sm",children:l},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",lineNumber:98,columnNumber:11},this),t.jsxDEV(dn,{children:t.jsxDEV(Mr,{children:Object.entries(n).map(([h,b])=>t.jsxDEV(Or,{children:t.jsxDEV(Ir,{onClick:()=>p(h),isActive:N(h),children:t.jsxDEV("span",{className:"tw-pl-3",children:b},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",lineNumber:109,columnNumber:21},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",lineNumber:105,columnNumber:19},this)},h,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",lineNumber:104,columnNumber:17},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",lineNumber:102,columnNumber:13},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",lineNumber:101,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",lineNumber:97,columnNumber:9},this),t.jsxDEV(cn,{children:[t.jsxDEV(mn,{className:"tw-text-sm",children:c},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",lineNumber:117,columnNumber:11},this),t.jsxDEV(dn,{className:"tw-pl-3",children:t.jsxDEV(Pt,{buttonVariant:"ghost",buttonClassName:d("tw-w-full",{"tw-bg-sidebar-accent tw-text-sidebar-accent-foreground":o==null?void 0:o.projectId}),popoverContentClassName:"tw-z-[1000]",options:r.flatMap(h=>h.projectId),getOptionLabel:h=>x(h),buttonPlaceholder:m,onChange:h=>{const b=x(h);p(b,h)},value:(o==null?void 0:o.projectId)??void 0,icon:t.jsxDEV(k.ScrollText,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",lineNumber:138,columnNumber:21},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",lineNumber:119,columnNumber:13},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",lineNumber:118,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",lineNumber:116,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",lineNumber:96,columnNumber:7},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar.component.tsx",lineNumber:90,columnNumber:5},this)}function En({value:e,onSearch:n,placeholder:r,isFullWidth:a,className:o,isDisabled:l=!1}){const c=te();return t.jsxDEV("div",{className:d("tw-relative",{"tw-w-full":a},o),children:[t.jsxDEV(k.Search,{className:d("tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",{"tw-right-3":c==="rtl"},{"tw-left-3":c==="ltr"})},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/search-bar.component.tsx",lineNumber:57,columnNumber:7},this),t.jsxDEV(Ae,{className:"tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",placeholder:r,value:e,onChange:m=>n(m.target.value),disabled:l},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/search-bar.component.tsx",lineNumber:64,columnNumber:7},this),e&&t.jsxDEV(Y,{variant:"ghost",size:"icon",className:d("tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",{"tw-left-0":c==="rtl"},{"tw-right-0":c==="ltr"}),onClick:()=>{n("")},children:[t.jsxDEV(k.X,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/search-bar.component.tsx",lineNumber:84,columnNumber:11},this),t.jsxDEV("span",{className:"tw-sr-only",children:"Clear"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/search-bar.component.tsx",lineNumber:85,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/search-bar.component.tsx",lineNumber:72,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/search-bar.component.tsx",lineNumber:56,columnNumber:5},this)}function As({id:e,extensionLabels:n,projectInfo:r,children:a,handleSelectSidebarItem:o,selectedSidebarItem:l,searchValue:c,onSearch:m,extensionsSidebarGroupLabel:u,projectsSidebarGroupLabel:p,buttonPlaceholderText:x}){return t.jsxDEV("div",{className:"tw-box-border tw-flex tw-h-full tw-flex-col",children:[t.jsxDEV("div",{className:"tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4",children:t.jsxDEV(En,{className:"tw-w-9/12",value:c,onSearch:m,placeholder:"Search app settings, extension settings, and project settings"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar-content-search.component.tsx",lineNumber:38,columnNumber:9},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar-content-search.component.tsx",lineNumber:37,columnNumber:7},this),t.jsxDEV(Sr,{id:e,className:"tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",children:[t.jsxDEV(zr,{className:"tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",extensionLabels:n,projectInfo:r,handleSelectSidebarItem:o,selectedSidebarItem:l,extensionsSidebarGroupLabel:u,projectsSidebarGroupLabel:p,buttonPlaceholderText:x},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar-content-search.component.tsx",lineNumber:49,columnNumber:9},this),t.jsxDEV(Rr,{className:"tw-min-w-[215px]",children:a},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar-content-search.component.tsx",lineNumber:59,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar-content-search.component.tsx",lineNumber:45,columnNumber:7},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-sidebar-content-search.component.tsx",lineNumber:36,columnNumber:5},this)}const Pe="scrBook",Fs="scrRef",Te="source",Bs="details",Ls="Scripture Reference",Xs="Scripture Book",Ar="Type",$s="Details";function Ys(e,n){const r=n??!1;return[{accessorFn:a=>`${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,id:Pe,header:(e==null?void 0:e.scriptureReferenceColumnName)??Ls,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?F.bookIdToEnglishName(o.start.book):a.row.groupingColumnId===Pe?E.formatScrRef(o.start):void 0},getGroupingValue:a=>F.bookIdToNumber(a.start.book),sortingFn:(a,o)=>E.compareScrRefs(a.original.start,o.original.start),enableGrouping:!0},{accessorFn:a=>E.formatScrRef(a.start),id:Fs,header:void 0,cell:a=>{const o=a.row.original;return a.row.getIsGrouped()?void 0:E.formatScrRef(o.start)},sortingFn:(a,o)=>E.compareScrRefs(a.original.start,o.original.start),enableGrouping:!1},{accessorFn:a=>a.source.displayName,id:Te,header:r?(e==null?void 0:e.typeColumnName)??Ar:void 0,cell:a=>r||a.row.getIsGrouped()?a.getValue():void 0,getGroupingValue:a=>a.source.id,sortingFn:(a,o)=>a.original.source.displayName.localeCompare(o.original.source.displayName),enableGrouping:!0},{accessorFn:a=>a.detail,id:Bs,header:(e==null?void 0:e.detailsColumnName)??$s,cell:a=>a.getValue(),enableGrouping:!1}]}const qs=e=>{if(!("offset"in e.start))throw new Error("No offset available in range start");if(e.end&&!("offset"in e.end))throw new Error("No offset available in range end");const{offset:n}=e.start;let r=0;return e.end&&({offset:r}=e.end),!e.end||E.compareScrRefs(e.start,e.end)===0?`${E.scrRefToBBBCCCVVV(e.start)}+${n}`:`${E.scrRefToBBBCCCVVV(e.start)}+${n}-${E.scrRefToBBBCCCVVV(e.end)}+${r}`},Wn=e=>`${qs({start:e.start,end:e.end})} ${e.source.displayName} ${e.detail}`;function Hs({sources:e,showColumnHeaders:n=!1,showSourceColumn:r=!1,scriptureReferenceColumnName:a,scriptureBookGroupName:o,typeColumnName:l,detailsColumnName:c,onRowSelected:m}){const[u,p]=i.useState([]),[x,N]=i.useState([{id:Pe,desc:!1}]),[h,b]=i.useState({}),P=i.useMemo(()=>e.flatMap(j=>j.data.map(v=>({...v,source:j.source}))),[e]),S=i.useMemo(()=>Ys({scriptureReferenceColumnName:a,typeColumnName:l,detailsColumnName:c},r),[a,l,c,r]);i.useEffect(()=>{u.includes(Te)?N([{id:Te,desc:!1},{id:Pe,desc:!1}]):N([{id:Pe,desc:!1}])},[u]);const C=ce.useReactTable({data:P,columns:S,state:{grouping:u,sorting:x,rowSelection:h},onGroupingChange:p,onSortingChange:N,onRowSelectionChange:b,getExpandedRowModel:ce.getExpandedRowModel(),getGroupedRowModel:ce.getGroupedRowModel(),getCoreRowModel:ce.getCoreRowModel(),getSortedRowModel:ce.getSortedRowModel(),getRowId:Wn,autoResetExpanded:!1,enableMultiRowSelection:!1,enableSubRowSelection:!1});i.useEffect(()=>{if(m){const j=C.getSelectedRowModel().rowsById,v=Object.keys(j);if(v.length===1){const X=P.find(_=>Wn(_)===v[0])||void 0;X&&m(X)}}},[h,P,m,C]);const y=o??Xs,D=l??Ar,G=[{label:"No Grouping",value:[]},{label:`Group by ${y}`,value:[Pe]},{label:`Group by ${D}`,value:[Te]},{label:`Group by ${y} and ${D}`,value:[Pe,Te]},{label:`Group by ${D} and ${y}`,value:[Te,Pe]}],z=j=>{p(JSON.parse(j))},K=(j,v)=>{!j.getIsGrouped()&&!j.getIsSelected()&&j.getToggleSelectedHandler()(v)},ye=(j,v)=>j.getIsGrouped()?"":d("banded-row",v%2===0?"even":"odd"),he=(j,v,X)=>{if(!((j==null?void 0:j.length)===0||v.depth<X.column.getGroupedIndex())){if(v.getIsGrouped())switch(v.depth){case 1:return"tw-ps-4";default:return}switch(v.depth){case 1:return"tw-ps-8";case 2:return"tw-ps-12";default:return}}};return t.jsxDEV("div",{className:"pr-twp tw-flex tw-h-full tw-w-full tw-flex-col",children:[!n&&t.jsxDEV(Oe,{value:JSON.stringify(u),onValueChange:j=>{z(j)},children:[t.jsxDEV(je,{className:"tw-mb-1 tw-mt-2",children:t.jsxDEV(Ie,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:380,columnNumber:13},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:379,columnNumber:11},this),t.jsxDEV(Ge,{position:"item-aligned",children:t.jsxDEV(hr,{children:G.map(j=>t.jsxDEV(xe,{value:JSON.stringify(j.value),children:j.label},j.label,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:385,columnNumber:17},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:383,columnNumber:13},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:382,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:373,columnNumber:9},this),t.jsxDEV(ft,{className:"tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0",children:[n&&t.jsxDEV(xt,{children:C.getHeaderGroups().map(j=>t.jsxDEV(Ce,{children:j.headers.filter(v=>v.column.columnDef.header).map(v=>t.jsxDEV(Xe,{colSpan:v.colSpan,className:"top-0 tw-sticky",children:v.isPlaceholder?void 0:t.jsxDEV("div",{children:[v.column.getCanGroup()?t.jsxDEV(Y,{variant:"ghost",title:`Toggle grouping by ${v.column.columnDef.header}`,onClick:v.column.getToggleGroupingHandler(),type:"button",children:v.column.getIsGrouped()?"🛑":"👊 "},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:406,columnNumber:29},this):void 0," ",ce.flexRender(v.column.columnDef.header,v.getContext())]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:404,columnNumber:25},this)},v.id,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:402,columnNumber:21},this))},j.id,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:397,columnNumber:15},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:395,columnNumber:11},this),t.jsxDEV(ht,{children:C.getRowModel().rows.map((j,v)=>{const X=te();return t.jsxDEV(Ce,{"data-state":j.getIsSelected()?"selected":"",className:d(ye(j,v)),onClick:_=>K(j,_),children:j.getVisibleCells().map(_=>{if(!(_.getIsPlaceholder()||_.column.columnDef.enableGrouping&&!_.getIsGrouped()&&(_.column.columnDef.id!==Te||!r)))return t.jsxDEV(ze,{className:d(_.column.columnDef.id,"tw-p-[1px]",he(u,j,_)),children:_.getIsGrouped()?t.jsxDEV(Y,{variant:"link",onClick:j.getToggleExpandedHandler(),type:"button",children:[j.getIsExpanded()&&t.jsxDEV(k.ChevronDown,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:464,columnNumber:55},this),!j.getIsExpanded()&&(X==="ltr"?t.jsxDEV(k.ChevronRight,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:466,columnNumber:50},this):t.jsxDEV(k.ChevronLeft,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:466,columnNumber:69},this))," ",ce.flexRender(_.column.columnDef.cell,_.getContext())," (",j.subRows.length,")"]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:459,columnNumber:29},this):ce.flexRender(_.column.columnDef.cell,_.getContext())},_.id,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:443,columnNumber:21},this)})},j.id,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:428,columnNumber:15},this)})},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:424,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:393,columnNumber:7},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scripture-results-viewer/scripture-results-viewer.component.tsx",lineNumber:371,columnNumber:5},this)}var Ve=(e=>(e.OT="OT",e.NT="NT",e.DC="DC",e.Extra="Extra",e))(Ve||{});const Ks=(e,n,r,a,o)=>{switch(e){case"OT":return n??"Old Testament";case"NT":return r??"New Testament";case"DC":return a??"Deuterocanon";case"Extra":return o??"Extra Materials";default:throw new Error(`Unknown section: ${e}`)}},Js=(e,n,r,a,o)=>{switch(e){case"OT":return n??"OT";case"NT":return r??"NT";case"DC":return a??"DC";case"Extra":return o??"Extra";default:throw new Error(`Unknown section: ${e}`)}},Le=e=>{if(F.isBookOT(e))return"OT";if(F.isBookNT(e))return"NT";if(F.isBookDC(e))return"DC";if(F.isExtraMaterial(e))return"Extra";throw new Error(`Unknown section for book: ${e}`)},kn=(e,n)=>e.filter(r=>{try{return Le(r)===n}catch{return!1}}),Fr=(e,n,r)=>kn(e,n).every(a=>r.includes(a));function Ws({bookId:e,selectedBookIds:n,toggleBook:r,lastKeyEventShiftKey:a,localizedBookNames:o}){var m,u;const l=i.useRef(!1),c=i.useRef();return t.jsxDEV(bt,{value:e,className:"tw-flex tw-items-center",onSelect:()=>{l.current||(r(e,a.current),a.current=!1),c.current&&clearTimeout(c.current),c.current=setTimeout(()=>{l.current=!1},100)},onMouseDown:p=>{p.preventDefault(),l.current=!0,r(e,p.shiftKey)},role:"option","aria-selected":n.includes(e),"aria-label":`${F.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,children:[t.jsxDEV(k.Check,{className:d("tw-me-2 tw-h-4 tw-w-4",n.includes(e)?"tw-opacity-100":"tw-opacity-0")},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-item.component.tsx",lineNumber:66,columnNumber:7},this),t.jsxDEV("span",{className:d("tw-flex-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",{"tw-border-s-red-200":Le(e)===Ve.OT,"tw-border-s-purple-200":Le(e)===Ve.NT,"tw-border-s-indigo-200":Le(e)===Ve.DC,"tw-border-s-yellow-200":Le(e)===Ve.Extra}),children:o&&((m=o.get(e))==null?void 0:m.localizedName)||F.bookIdToEnglishName(e)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-item.component.tsx",lineNumber:72,columnNumber:7},this),t.jsxDEV("span",{className:"tw-ml-2 tw-text-xs tw-text-muted-foreground",children:o&&((u=o.get(e))==null?void 0:u.localizedId)||e.toLocaleUpperCase()},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-item.component.tsx",lineNumber:87,columnNumber:7},this)]},e,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-item.component.tsx",lineNumber:40,columnNumber:5},this)}function Zs({section:e,availableBookIds:n,selectedBookIds:r,onToggle:a,localizedStrings:o}){const l=kn(n,e).length===0,c=o["%scripture_section_ot_short%"],m=o["%scripture_section_nt_short%"],u=o["%scripture_section_dc_short%"],p=o["%scripture_section_extra_short%"];return t.jsxDEV(Y,{variant:"outline",size:"sm",onClick:()=>a(e),className:d(Fr(n,e,r)&&!l&&"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"),disabled:l,children:Js(e,c,m,u,p)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/section-button.component.tsx",lineNumber:37,columnNumber:5},this)}const Zn=5,tn=6;function Qs({availableBookInfo:e,selectedBookIds:n,onChangeSelectedBookIds:r,localizedStrings:a,localizedBookNames:o}){const l=a["%webView_book_selector_books_selected%"],c=a["%webView_book_selector_select_books%"],m=a["%webView_book_selector_search_books%"],u=a["%webView_book_selector_select_all%"],p=a["%webView_book_selector_clear_all%"],x=a["%webView_book_selector_no_book_found%"],N=a["%webView_book_selector_more%"],h=a["%scripture_section_ot_long%"],b=a["%scripture_section_nt_long%"],P=a["%scripture_section_dc_long%"],S=a["%scripture_section_extra_long%"],[C,y]=i.useState(!1),D=i.useRef(void 0),G=i.useRef(!1);if(e.length!==F.allBookIds.length)throw new Error("availableBookInfo length must match Canon.allBookIds length");const z=i.useMemo(()=>F.allBookIds.filter((v,X)=>e[X]==="1"&&!F.isObsolete(F.bookIdToNumber(v))),[e]),K=i.useCallback((v,X=!1)=>{if(!X||!D.current){r(n.includes(v)?n.filter(ne=>ne!==v):[...n,v]),D.current=v;return}const _=z.findIndex(ne=>ne===D.current),se=z.findIndex(ne=>ne===v);if(_===-1||se===-1)return;const[oe,we]=[Math.min(_,se),Math.max(_,se)],ie=z.slice(oe,we+1).map(ne=>ne);r(n.includes(v)?n.filter(ne=>!ie.includes(ne)):[...new Set([...n,...ie])])},[n,r,z]),ye=i.useCallback(v=>{const X=kn(z,v).map(_=>_);r(Fr(z,v,n)?n.filter(_=>!X.includes(_)):[...new Set([...n,...X])])},[n,r,z]),he=()=>{r(z.map(v=>v))},j=()=>{r([])};return t.jsxDEV("div",{className:"tw-space-y-2",children:[t.jsxDEV("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:Object.values(Ve).map(v=>t.jsxDEV(Zs,{section:v,availableBookIds:z,selectedBookIds:n,onToggle:ye,localizedStrings:a},v,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:149,columnNumber:13},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:146,columnNumber:7},this),t.jsxDEV(Rt,{open:C,onOpenChange:y,children:[t.jsxDEV(Tt,{asChild:!0,children:t.jsxDEV(Y,{variant:"outline",role:"combobox","aria-expanded":C,className:"tw-max-w-64 tw-justify-between",children:[n.length>0?`${l}: ${n.length}`:c,t.jsxDEV(k.ChevronsUpDown,{className:"tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:172,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:163,columnNumber:11},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:162,columnNumber:9},this),t.jsxDEV(mt,{className:"tw-w-full tw-p-0",align:"start",children:t.jsxDEV(dt,{onKeyDown:v=>{v.key==="Enter"&&(G.current=v.shiftKey)},children:[t.jsxDEV(ut,{placeholder:m},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:184,columnNumber:13},this),t.jsxDEV("div",{className:"tw-flex tw-justify-between tw-border-b tw-p-2",children:[t.jsxDEV(Y,{variant:"ghost",size:"sm",onClick:he,children:u},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:186,columnNumber:15},this),t.jsxDEV(Y,{variant:"ghost",size:"sm",onClick:j,children:p},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:189,columnNumber:15},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:185,columnNumber:13},this),t.jsxDEV(pt,{children:[t.jsxDEV(wt,{children:x},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:194,columnNumber:15},this),Object.values(Ve).map((v,X)=>{const _=z.filter(se=>Le(se)===v);if(_.length!==0)return t.jsxDEV(i.Fragment,{children:[t.jsxDEV(Mt,{heading:Ks(v,h,b,P,S),children:_.map(se=>t.jsxDEV(Ws,{bookId:se,selectedBookIds:n,toggleBook:K,lastKeyEventShiftKey:G,localizedBookNames:o},se,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:214,columnNumber:25},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:204,columnNumber:21},this),X<Object.values(Ve).length-1&&t.jsxDEV(br,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:224,columnNumber:67},this)]},v,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:203,columnNumber:19},this)})]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:193,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:176,columnNumber:11},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:175,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:161,columnNumber:7},this),n.length>0&&t.jsxDEV("div",{className:"tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",children:[n.slice(0,n.length===tn?tn:Zn).map(v=>{var X;return t.jsxDEV(st,{variant:"secondary",children:o&&((X=o.get(v))==null?void 0:X.localizedName)||F.bookIdToEnglishName(v)||v},v,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:243,columnNumber:15},this)}),n.length>tn&&t.jsxDEV(st,{variant:"secondary",children:`+${n.length-Zn} ${N}`},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:250,columnNumber:13},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:234,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/book-selector.component.tsx",lineNumber:145,columnNumber:5},this)}const ei=Object.freeze(["%webView_scope_selector_selected_text%","%webView_scope_selector_current_verse%","%webView_scope_selector_current_chapter%","%webView_scope_selector_current_book%","%webView_scope_selector_choose_books%","%webView_scope_selector_scope%","%webView_scope_selector_select_books%","%webView_book_selector_books_selected%","%webView_book_selector_select_books%","%webView_book_selector_search_books%","%webView_book_selector_select_all%","%webView_book_selector_clear_all%","%webView_book_selector_no_book_found%","%webView_book_selector_more%","%scripture_section_ot_long%","%scripture_section_ot_short%","%scripture_section_nt_long%","%scripture_section_nt_short%","%scripture_section_dc_long%","%scripture_section_dc_short%","%scripture_section_extra_long%","%scripture_section_extra_short%"]),_e=(e,n)=>e[n]??n;function ti({scope:e,availableScopes:n,onScopeChange:r,availableBookInfo:a,selectedBookIds:o,onSelectedBookIdsChange:l,localizedStrings:c,localizedBookNames:m}){const u=_e(c,"%webView_scope_selector_selected_text%"),p=_e(c,"%webView_scope_selector_current_verse%"),x=_e(c,"%webView_scope_selector_current_chapter%"),N=_e(c,"%webView_scope_selector_current_book%"),h=_e(c,"%webView_scope_selector_choose_books%"),b=_e(c,"%webView_scope_selector_scope%"),P=_e(c,"%webView_scope_selector_select_books%"),S=[{value:"selectedText",label:u,id:"scope-selected-text"},{value:"verse",label:p,id:"scope-verse"},{value:"chapter",label:x,id:"scope-chapter"},{value:"book",label:N,id:"scope-book"},{value:"selectedBooks",label:h,id:"scope-selected"}],C=n?S.filter(y=>n.includes(y.value)):S;return t.jsxDEV("div",{className:"tw-grid tw-gap-4",children:[t.jsxDEV("div",{className:"tw-grid tw-gap-2",children:[t.jsxDEV(ee,{children:b},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",lineNumber:144,columnNumber:9},this),t.jsxDEV(_t,{value:e,onValueChange:r,className:"tw-flex tw-flex-col tw-space-y-1",children:C.map(({value:y,label:D,id:G})=>t.jsxDEV("div",{className:"tw-flex tw-items-center",children:[t.jsxDEV(ot,{className:"tw-me-2",value:y,id:G},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",lineNumber:152,columnNumber:15},this),t.jsxDEV(ee,{htmlFor:G,children:D},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",lineNumber:153,columnNumber:15},this)]},G,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",lineNumber:151,columnNumber:13},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",lineNumber:145,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",lineNumber:143,columnNumber:7},this),e==="selectedBooks"&&t.jsxDEV("div",{className:"tw-grid tw-gap-2",children:[t.jsxDEV(ee,{children:P},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",lineNumber:161,columnNumber:11},this),t.jsxDEV(Qs,{availableBookInfo:a,selectedBookIds:o,onChangeSelectedBookIds:l,localizedStrings:c,localizedBookNames:m},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",lineNumber:162,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",lineNumber:160,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.component.tsx",lineNumber:142,columnNumber:5},this)}const nn={[E.getLocalizeKeyForScrollGroupId("undefined")]:"Ø",[E.getLocalizeKeyForScrollGroupId(0)]:"A",[E.getLocalizeKeyForScrollGroupId(1)]:"B",[E.getLocalizeKeyForScrollGroupId(2)]:"C",[E.getLocalizeKeyForScrollGroupId(3)]:"D",[E.getLocalizeKeyForScrollGroupId(4)]:"E",[E.getLocalizeKeyForScrollGroupId(5)]:"F",[E.getLocalizeKeyForScrollGroupId(6)]:"G",[E.getLocalizeKeyForScrollGroupId(7)]:"H",[E.getLocalizeKeyForScrollGroupId(8)]:"I",[E.getLocalizeKeyForScrollGroupId(9)]:"J",[E.getLocalizeKeyForScrollGroupId(10)]:"K",[E.getLocalizeKeyForScrollGroupId(11)]:"L",[E.getLocalizeKeyForScrollGroupId(12)]:"M",[E.getLocalizeKeyForScrollGroupId(13)]:"N",[E.getLocalizeKeyForScrollGroupId(14)]:"O",[E.getLocalizeKeyForScrollGroupId(15)]:"P",[E.getLocalizeKeyForScrollGroupId(16)]:"Q",[E.getLocalizeKeyForScrollGroupId(17)]:"R",[E.getLocalizeKeyForScrollGroupId(18)]:"S",[E.getLocalizeKeyForScrollGroupId(19)]:"T",[E.getLocalizeKeyForScrollGroupId(20)]:"U",[E.getLocalizeKeyForScrollGroupId(21)]:"V",[E.getLocalizeKeyForScrollGroupId(22)]:"W",[E.getLocalizeKeyForScrollGroupId(23)]:"X",[E.getLocalizeKeyForScrollGroupId(24)]:"Y",[E.getLocalizeKeyForScrollGroupId(25)]:"Z"};function ni({availableScrollGroupIds:e,scrollGroupId:n,onChangeScrollGroupId:r,localizedStrings:a={},size:o,className:l}){const c={...nn,...Object.fromEntries(Object.entries(a).map(([u,p])=>[u,u===p&&u in nn?nn[u]:p]))},m=te();return t.jsxDEV(Oe,{value:`${n}`,onValueChange:u=>r(u==="undefined"?void 0:parseInt(u,10)),children:[t.jsxDEV(je,{size:o,className:d("pr-twp tw-w-auto",l),children:t.jsxDEV(Ie,{placeholder:c[E.getLocalizeKeyForScrollGroupId(n)]??n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scroll-group-selector.component.tsx",lineNumber:140,columnNumber:9},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scroll-group-selector.component.tsx",lineNumber:139,columnNumber:7},this),t.jsxDEV(Ge,{align:m==="rtl"?"end":"start",style:{zIndex:250},children:e.map(u=>t.jsxDEV(xe,{value:`${u}`,children:c[E.getLocalizeKeyForScrollGroupId(u)]},`${u}`,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scroll-group-selector.component.tsx",lineNumber:153,columnNumber:11},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scroll-group-selector.component.tsx",lineNumber:147,columnNumber:7},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/scroll-group-selector.component.tsx",lineNumber:131,columnNumber:5},this)}function ri({children:e}){return t.jsxDEV("div",{className:"pr-twp tw-grid",children:e},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",lineNumber:14,columnNumber:10},this)}function ai({primary:e,secondary:n,children:r,isLoading:a=!1,loadingMessage:o}){return t.jsxDEV("div",{className:"tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2",children:[t.jsxDEV("div",{children:[t.jsxDEV("p",{className:"tw-text-sm tw-font-medium tw-leading-none",children:e},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",lineNumber:48,columnNumber:9},this),t.jsxDEV("p",{className:"tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground",children:n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",lineNumber:49,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",lineNumber:47,columnNumber:7},this),a?t.jsxDEV("p",{className:"tw-text-sm tw-text-muted-foreground",children:o},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",lineNumber:55,columnNumber:9},this):t.jsxDEV("div",{children:r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",lineNumber:57,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",lineNumber:46,columnNumber:5},this)}function oi({primary:e,secondary:n,includeSeparator:r=!1}){return t.jsxDEV("div",{className:"tw-space-y-4 tw-py-2",children:[t.jsxDEV("div",{children:[t.jsxDEV("h3",{className:"tw-text-lg tw-font-medium",children:e},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",lineNumber:89,columnNumber:9},this),t.jsxDEV("p",{className:"tw-text-sm tw-text-muted-foreground",children:n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",lineNumber:90,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",lineNumber:88,columnNumber:7},this),r?t.jsxDEV(zt,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",lineNumber:92,columnNumber:27},this):""]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/settings-components/settings-list.component.tsx",lineNumber:87,columnNumber:5},this)}function Br(e,n){var r;return(r=Object.entries(e).find(([,a])=>"menuItem"in a&&a.menuItem===n))==null?void 0:r[0]}function Vt({icon:e,menuLabel:n,leading:r}){return e?t.jsxDEV("img",{className:d("tw-max-h-5 tw-max-w-5",r?"tw-me-2":"tw-ms-2"),src:e,alt:`${r?"Leading":"Trailing"} icon for ${n}`},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/menu-icon.component.tsx",lineNumber:14,columnNumber:5},this):void 0}const Lr=(e,n,r,a)=>r?Object.entries(e).filter(([l,c])=>"column"in c&&c.column===r||l===r).sort(([,l],[,c])=>l.order-c.order).flatMap(([l])=>n.filter(m=>m.group===l).sort((m,u)=>m.order-u.order).map(m=>t.jsxDEV(Ft,{children:[t.jsxDEV(Bt,{asChild:!0,children:"command"in m?t.jsxDEV(Ut,{onClick:()=>{a(m)},children:[m.iconPathBefore&&t.jsxDEV(Vt,{icon:m.iconPathBefore,menuLabel:m.label,leading:!0},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:66,columnNumber:21},void 0),m.label,m.iconPathAfter&&t.jsxDEV(Vt,{icon:m.iconPathAfter,menuLabel:m.label},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:70,columnNumber:21},void 0)]},`dropdown-menu-item-${m.label}-${m.command}`,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:57,columnNumber:17},void 0):t.jsxDEV(or,{children:[t.jsxDEV(bn,{children:m.label},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:75,columnNumber:19},void 0),t.jsxDEV(ar,{children:t.jsxDEV(fn,{children:Lr(e,n,Br(e,m.id),a)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:78,columnNumber:21},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:77,columnNumber:19},void 0)]},`dropdown-menu-sub-${m.label}-${m.id}`,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:74,columnNumber:17},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:55,columnNumber:13},void 0),m.tooltip&&t.jsxDEV(vt,{children:m.tooltip},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:90,columnNumber:30},void 0)]},`tooltip-${m.label}-${"command"in m?m.command:m.id}`,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:54,columnNumber:11},void 0))):void 0;function un({onSelectMenuItem:e,menuData:n,tabLabel:r,icon:a,className:o,variant:l,id:c}){return t.jsxDEV(lt,{variant:l,children:[t.jsxDEV(Gt,{"aria-label":r,className:o,asChild:!0,id:c,children:t.jsxDEV(Y,{variant:"ghost",size:"icon",children:a??t.jsxDEV(k.MenuIcon,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:142,columnNumber:20},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:141,columnNumber:9},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:140,columnNumber:7},this),t.jsxDEV(qe,{align:"start",className:"tw-z-[250]",children:Object.entries(n.columns).filter(([,m])=>typeof m=="object").sort(([,m],[,u])=>typeof m=="boolean"||typeof u=="boolean"?0:m.order-u.order).map(([m],u,p)=>t.jsxDEV(i.Fragment,{children:[t.jsxDEV(wn,{children:t.jsxDEV(At,{children:Lr(n.groups,n.items,m,e)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:155,columnNumber:17},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:154,columnNumber:15},this),u<p.length-1&&t.jsxDEV(He,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:160,columnNumber:44},this)]},m,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:153,columnNumber:13},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:145,columnNumber:7},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/tab-dropdown-menu.component.tsx",lineNumber:139,columnNumber:5},this)}function si({onSelectProjectMenuItem:e,onSelectViewInfoMenuItem:n,projectMenuData:r,tabViewMenuData:a,id:o,className:l,startAreaChildren:c,centerAreaChildren:m,endAreaChildren:u}){return t.jsxDEV("div",{className:d("tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-border tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar",l),id:o,children:[r&&t.jsxDEV(un,{onSelectMenuItem:e,menuData:r,tabLabel:"Project",icon:t.jsxDEV(k.Menu,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",lineNumber:67,columnNumber:17},this),className:"tw-h-full tw-w-8"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",lineNumber:63,columnNumber:9},this),t.jsxDEV("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start",children:c},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",lineNumber:71,columnNumber:7},this),t.jsxDEV("div",{className:"tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto",children:m},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",lineNumber:74,columnNumber:7},this),t.jsxDEV("div",{className:"tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end",children:[a&&t.jsxDEV(un,{onSelectMenuItem:n,menuData:a,tabLabel:"View Info",icon:t.jsxDEV(k.EllipsisVertical,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",lineNumber:83,columnNumber:19},this),className:"tw-h-full"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",lineNumber:79,columnNumber:11},this),u]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",lineNumber:77,columnNumber:7},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-toolbar.component.tsx",lineNumber:55,columnNumber:5},this)}const Pn=i.forwardRef(({className:e,...n},r)=>{const a=te();return t.jsxDEV(pe.Root,{orientation:"vertical",ref:r,className:d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground",e),...n,dir:a},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/tabs-vertical.tsx",lineNumber:32,columnNumber:5},void 0)});Pn.displayName=pe.List.displayName;const Vn=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(pe.List,{ref:r,className:d("tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/tabs-vertical.tsx",lineNumber:49,columnNumber:3},void 0));Vn.displayName=pe.List.displayName;const Xr=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(pe.Trigger,{ref:r,...n,className:d("overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/tabs-vertical.tsx",lineNumber:65,columnNumber:3},void 0)),jn=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(pe.Content,{ref:r,className:d("tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/tabs-vertical.tsx",lineNumber:80,columnNumber:3},void 0));jn.displayName=pe.Content.displayName;function ii({tabList:e,searchValue:n,onSearch:r,searchPlaceholder:a,headerTitle:o,searchClassName:l}){return t.jsxDEV("div",{className:"pr-twp",children:[t.jsxDEV("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[o?t.jsxDEV("h1",{children:o},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",lineNumber:63,columnNumber:24},this):"",t.jsxDEV(En,{className:l,value:n,onSearch:r,placeholder:a},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",lineNumber:64,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",lineNumber:62,columnNumber:7},this),t.jsxDEV(Pn,{children:[t.jsxDEV(Vn,{children:e.map(c=>t.jsxDEV(Xr,{value:c.value,children:c.value},c.key,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",lineNumber:74,columnNumber:13},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",lineNumber:72,columnNumber:9},this),e.map(c=>t.jsxDEV(jn,{value:c.value,children:c.content},c.key,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",lineNumber:80,columnNumber:11},this))]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",lineNumber:71,columnNumber:7},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/tab-navigation-content-search.component.tsx",lineNumber:61,columnNumber:5},this)}function li({...e}){return t.jsxDEV(H.Menu,{...e},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:13,columnNumber:10},this)}function ci({...e}){return t.jsxDEV(H.Sub,{"data-slot":"menubar-sub",...e},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:29,columnNumber:10},this)}const $r=i.forwardRef(({className:e,variant:n="default",...r},a)=>{const o=i.useMemo(()=>({variant:n}),[n]);return t.jsxDEV(pn.Provider,{value:o,children:t.jsxDEV(H.Root,{ref:a,className:d("tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",e),...r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:48,columnNumber:7},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:46,columnNumber:5},void 0)});$r.displayName=H.Root.displayName;const Yr=i.forwardRef(({className:e,...n},r)=>{const a=ge();return t.jsxDEV(H.Trigger,{ref:r,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",Ee({variant:a.variant,className:e})),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:67,columnNumber:5},void 0)});Yr.displayName=H.Trigger.displayName;const qr=i.forwardRef(({className:e,inset:n,children:r,...a},o)=>{const l=ge();return t.jsxDEV(H.SubTrigger,{ref:o,className:d("tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",n&&"tw-pl-8",Ee({variant:l.variant,className:e}),e),...a,children:[r,t.jsxDEV(k.ChevronRight,{className:"tw-ml-auto tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:99,columnNumber:7},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:88,columnNumber:5},void 0)});qr.displayName=H.SubTrigger.displayName;const Hr=i.forwardRef(({className:e,...n},r)=>{const a=ge();return t.jsxDEV(H.SubContent,{ref:r,className:d("tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",{"tw-bg-popover":a.variant==="muted"},e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:111,columnNumber:5},void 0)});Hr.displayName=H.SubContent.displayName;const Kr=i.forwardRef(({className:e,align:n="start",alignOffset:r=-4,sideOffset:a=8,...o},l)=>{const c=ge();return t.jsxDEV(H.Portal,{children:t.jsxDEV(H.Content,{ref:l,align:n,alignOffset:r,sideOffset:a,className:d("tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2","pr-twp",{"tw-bg-popover":c.variant==="muted"},e),...o},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:134,columnNumber:7},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:133,columnNumber:5},void 0)});Kr.displayName=H.Content.displayName;const Jr=i.forwardRef(({className:e,inset:n,...r},a)=>{const o=ge();return t.jsxDEV(H.Item,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",n&&"tw-pl-8",Ee({variant:o.variant,className:e}),e),...r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:164,columnNumber:5},void 0)});Jr.displayName=H.Item.displayName;const mi=i.forwardRef(({className:e,children:n,checked:r,...a},o)=>{const l=ge();return t.jsxDEV(H.CheckboxItem,{ref:o,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Ee({variant:l.variant,className:e}),e),checked:r,...a,children:[t.jsxDEV("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:t.jsxDEV(H.ItemIndicator,{children:t.jsxDEV(k.Check,{className:"tw-h-4 tw-w-4"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:196,columnNumber:11},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:195,columnNumber:9},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:194,columnNumber:7},void 0),n]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:184,columnNumber:5},void 0)});mi.displayName=H.CheckboxItem.displayName;const di=i.forwardRef(({className:e,children:n,...r},a)=>{const o=ge();return t.jsxDEV(H.RadioItem,{ref:a,className:d("tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",Ee({variant:o.variant,className:e}),e),...r,children:[t.jsxDEV("span",{className:"tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center",children:t.jsxDEV(H.ItemIndicator,{children:t.jsxDEV(k.Circle,{className:"tw-h-2 tw-w-2 tw-fill-current"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:222,columnNumber:11},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:221,columnNumber:9},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:220,columnNumber:7},void 0),n]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:211,columnNumber:5},void 0)});di.displayName=H.RadioItem.displayName;const ui=i.forwardRef(({className:e,inset:n,...r},a)=>t.jsxDEV(H.Label,{ref:a,className:d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold",n&&"tw-pl-8",e),...r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:237,columnNumber:3},void 0));ui.displayName=H.Label.displayName;const Wr=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(H.Separator,{ref:r,className:d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/menubar.tsx",lineNumber:249,columnNumber:3},void 0));Wr.displayName=H.Separator.displayName;const et=(e,n)=>{setTimeout(()=>{n.forEach(r=>{var a;(a=e.current)==null||a.dispatchEvent(new KeyboardEvent("keydown",r))})},0)},Zr=(e,n,r,a)=>{if(!r)return;const o=Object.entries(e).filter(([l,c])=>"column"in c&&c.column===r||l===r).sort(([,l],[,c])=>l.order-c.order);return o.flatMap(([l],c)=>{const m=n.filter(p=>p.group===l).sort((p,x)=>p.order-x.order).map(p=>t.jsxDEV(Ft,{children:[t.jsxDEV(Bt,{asChild:!0,children:"command"in p?t.jsxDEV(Jr,{onClick:()=>{a(p)},children:[p.iconPathBefore&&t.jsxDEV(Vt,{icon:p.iconPathBefore,menuLabel:p.label,leading:!0},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:79,columnNumber:21},void 0),p.label,p.iconPathAfter&&t.jsxDEV(Vt,{icon:p.iconPathAfter,menuLabel:p.label},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:83,columnNumber:21},void 0)]},`menubar-item-${p.label}-${p.command}`,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:70,columnNumber:17},void 0):t.jsxDEV(ci,{children:[t.jsxDEV(qr,{children:p.label},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:88,columnNumber:19},void 0),t.jsxDEV(Hr,{children:Zr(e,n,Br(e,p.id),a)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:89,columnNumber:19},void 0)]},`menubar-sub-${p.label}-${p.id}`,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:87,columnNumber:17},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:68,columnNumber:13},void 0),p.tooltip&&t.jsxDEV(vt,{children:p.tooltip},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:100,columnNumber:30},void 0)]},`tooltip-${p.label}-${"command"in p?p.command:p.id}`,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:67,columnNumber:11},void 0)),u=[...m];return m.length>0&&c<o.length-1&&u.push(t.jsxDEV(Wr,{},`separator-${l}`,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:107,columnNumber:31},void 0)),u})};function pi({menuData:e,onSelectMenuItem:n,onOpenChange:r,variant:a}){const o=i.useRef(void 0),l=i.useRef(void 0),c=i.useRef(void 0),m=i.useRef(void 0),u=i.useRef(void 0),p=x=>{switch(x){case"platform.app":return l;case"platform.window":return c;case"platform.layout":return m;case"platform.help":return u;default:return}};if(wo.useHotkeys(["alt","alt+p","alt+l","alt+n","alt+h"],(x,N)=>{var P,S,C,y;x.preventDefault();const h={key:"Escape",code:"Escape",keyCode:27,bubbles:!0},b={key:" ",code:"Space",keyCode:32,bubbles:!0};switch(N.hotkey){case"alt":et(l,[h]);break;case"alt+p":(P=l.current)==null||P.focus(),et(l,[h,b]);break;case"alt+l":(S=c.current)==null||S.focus(),et(c,[h,b]);break;case"alt+n":(C=m.current)==null||C.focus(),et(m,[h,b]);break;case"alt+h":(y=u.current)==null||y.focus(),et(u,[h,b]);break}}),i.useEffect(()=>{if(!r||!o.current)return;const x=new MutationObserver(b=>{b.forEach(P=>{if(P.attributeName==="data-state"&&P.target instanceof HTMLElement){const S=P.target.getAttribute("data-state");r(S==="open")}})});return o.current.querySelectorAll("[data-state]").forEach(b=>{x.observe(b,{attributes:!0})}),()=>x.disconnect()},[r]),!!e)return t.jsxDEV($r,{ref:o,className:"pr-twp tw-border-0 tw-bg-transparent",variant:a,children:Object.entries(e.columns).filter(([,x])=>typeof x=="object").sort(([,x],[,N])=>typeof x=="boolean"||typeof N=="boolean"?0:x.order-N.order).map(([x,N])=>t.jsxDEV(li,{children:[t.jsxDEV(Yr,{ref:p(x),children:typeof N=="object"&&"label"in N&&N.label},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:237,columnNumber:13},this),t.jsxDEV(Kr,{className:"tw-z-[250]",children:t.jsxDEV(At,{children:Zr(e.groups,e.items,x,n)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:243,columnNumber:15},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:240,columnNumber:13},this)]},x,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:236,columnNumber:11},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/menus/platform-menubar.component.tsx",lineNumber:228,columnNumber:5},this)}function wi(e){switch(e){case void 0:return;case"darwin":return"tw-ps-[85px]";default:return"tw-pe-[calc(138px+1rem)]"}}function bi({menuData:e,onOpenChange:n,onSelectMenuItem:r,className:a,id:o,children:l,appMenuAreaChildren:c,configAreaChildren:m,shouldUseAsAppDragArea:u,menubarVariant:p="default"}){const x=i.useRef(void 0);return t.jsxDEV("div",{className:d("tw-border tw-px-4 tw-text-foreground",a),ref:x,style:{position:"relative"},id:o,children:t.jsxDEV("div",{className:"tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",style:u?{WebkitAppRegion:"drag"}:void 0,children:[t.jsxDEV("div",{className:"tw-flex tw-grow tw-basis-0",children:t.jsxDEV("div",{className:"tw-flex tw-items-center tw-gap-2",style:u?{WebkitAppRegion:"no-drag"}:void 0,children:[c,e&&t.jsxDEV(pi,{menuData:e,onOpenChange:n,onSelectMenuItem:r,variant:p},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",lineNumber:120,columnNumber:15},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",lineNumber:112,columnNumber:11},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",lineNumber:111,columnNumber:9},this),t.jsxDEV("div",{className:"tw-flex tw-items-center tw-gap-2 tw-px-2",style:u?{WebkitAppRegion:"no-drag"}:void 0,children:l},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",lineNumber:131,columnNumber:9},this),t.jsxDEV("div",{className:"tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end",children:t.jsxDEV("div",{className:"tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",style:u?{WebkitAppRegion:"no-drag"}:void 0,children:m},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",lineNumber:141,columnNumber:11},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",lineNumber:140,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",lineNumber:105,columnNumber:7},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/toolbar.component.tsx",lineNumber:99,columnNumber:5},this)}const fi=(e,n)=>e[n]??n;function xi({knownUiLanguages:e,primaryLanguage:n="en",fallbackLanguages:r=[],onLanguagesChange:a,onPrimaryLanguageChange:o,onFallbackLanguagesChange:l,localizedStrings:c,className:m}){const u=fi(c,"%settings_uiLanguageSelector_selectFallbackLanguages%"),[p,x]=i.useState(!1),N=b=>{o&&o(b),a&&a([b,...r.filter(P=>P!==b)]),l&&r.find(P=>P===b)&&l([...r.filter(P=>P!==b)]),x(!1)},h=(b,P)=>{var C,y,D,G,z,K;const S=P!==b?((y=(C=e[b])==null?void 0:C.uiNames)==null?void 0:y[P])??((G=(D=e[b])==null?void 0:D.uiNames)==null?void 0:G.en):void 0;return S?`${(z=e[b])==null?void 0:z.autonym} (${S})`:(K=e[b])==null?void 0:K.autonym};return t.jsxDEV("div",{className:d("pr-twp tw-max-w-sm",m),children:[t.jsxDEV(Oe,{name:"uiLanguage",value:n,onValueChange:N,open:p,onOpenChange:b=>x(b),children:[t.jsxDEV(je,{children:t.jsxDEV(Ie,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",lineNumber:148,columnNumber:11},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",lineNumber:147,columnNumber:9},this),t.jsxDEV(Ge,{className:"tw-z-[250]",children:Object.keys(e).map(b=>t.jsxDEV(xe,{value:b,children:h(b,n)},b,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",lineNumber:155,columnNumber:15},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",lineNumber:150,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",lineNumber:140,columnNumber:7},this),n!=="en"&&t.jsxDEV(t.Fragment,{children:[t.jsxDEV(ee,{className:"tw-ms-3",children:u},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",lineNumber:166,columnNumber:11},this),t.jsxDEV("div",{className:"tw-ms-3",children:t.jsxDEV(ee,{children:["Currently:"," ",(r==null?void 0:r.length)>0?`${r.map(b=>h(b,n)).join(", ")}`:`default (${e.en.autonym})`]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",lineNumber:169,columnNumber:13},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",lineNumber:167,columnNumber:11},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",lineNumber:165,columnNumber:9},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/advanced/ui-language-selector.component.tsx",lineNumber:138,columnNumber:5},this)}function hi({item:e,createLabel:n,createComplexLabel:r}){return n?t.jsxDEV(ee,{children:n(e)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/smart-label.component.tsx",lineNumber:13,columnNumber:12},this):r?t.jsxDEV(ee,{children:r(e)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/smart-label.component.tsx",lineNumber:16,columnNumber:12},this):t.jsxDEV(ee,{children:e},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/smart-label.component.tsx",lineNumber:18,columnNumber:10},this)}function vi({id:e,className:n,listItems:r,selectedListItems:a,handleSelectListItem:o,createLabel:l,createComplexLabel:c}){return t.jsxDEV("div",{id:e,className:n,children:r.map(m=>t.jsxDEV("div",{className:"tw-m-2 tw-flex tw-items-center",children:[t.jsxDEV(Ot,{className:"tw-me-2 tw-align-middle",checked:a.includes(m),onCheckedChange:u=>o(m,u)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/checklist.component.tsx",lineNumber:55,columnNumber:11},this),t.jsxDEV(hi,{item:m,createLabel:l,createComplexLabel:c},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/checklist.component.tsx",lineNumber:60,columnNumber:11},this)]},m,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/checklist.component.tsx",lineNumber:54,columnNumber:9},this))},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/checklist.component.tsx",lineNumber:52,columnNumber:5},this)}const Qr=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(k.LoaderCircle,{size:35,className:d("tw-animate-spin",e),...n,ref:r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/spinner.component.tsx",lineNumber:13,columnNumber:5},void 0));Qr.displayName="Spinner";function gi({id:e,isDisabled:n=!1,hasError:r=!1,isFullWidth:a=!1,helperText:o,label:l,placeholder:c,isRequired:m=!1,className:u,defaultValue:p,value:x,onChange:N,onFocus:h,onBlur:b}){return t.jsxDEV("div",{className:d("tw-inline-grid tw-items-center tw-gap-1.5",{"tw-w-full":a}),children:[t.jsxDEV(ee,{htmlFor:e,className:d({"tw-text-red-600":r,"tw-hidden":!l}),children:`${l}${m?"*":""}`},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/text-field.component.tsx",lineNumber:77,columnNumber:7},this),t.jsxDEV(Ae,{id:e,disabled:n,placeholder:c,required:m,className:d(u,{"tw-border-red-600":r}),defaultValue:p,value:x,onChange:N,onFocus:h,onBlur:b},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/text-field.component.tsx",lineNumber:84,columnNumber:7},this),t.jsxDEV("p",{className:d({"tw-hidden":!o}),children:o},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/text-field.component.tsx",lineNumber:96,columnNumber:7},this)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/basics/text-field.component.tsx",lineNumber:76,columnNumber:5},this)}const Ni=Ue.cva("tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",{variants:{variant:{default:"tw-bg-background tw-text-foreground",destructive:"tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"}},defaultVariants:{variant:"default"}}),ea=i.forwardRef(({className:e,variant:n,...r},a)=>t.jsxDEV("div",{ref:a,role:"alert",className:d(Ni({variant:n}),e),...r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/alert.tsx",lineNumber:40,columnNumber:3},void 0));ea.displayName="Alert";const ta=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("h5",{ref:r,className:d("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight",e),...n,children:[n.children," "]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/alert.tsx",lineNumber:47,columnNumber:5},void 0));ta.displayName="AlertTitle";const na=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("div",{ref:r,className:d("tw-text-sm [&_p]:tw-leading-relaxed",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/alert.tsx",lineNumber:64,columnNumber:3},void 0));na.displayName="AlertDescription";const ra=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(Ye.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/avatar.tsx",lineNumber:14,columnNumber:3},void 0));ra.displayName=Ye.Root.displayName;const aa=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(Ye.Image,{ref:r,className:d("pr-twp tw-aspect-square tw-h-full tw-w-full",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/avatar.tsx",lineNumber:30,columnNumber:3},void 0));aa.displayName=Ye.Image.displayName;const oa=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(Ye.Fallback,{ref:r,className:d("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/avatar.tsx",lineNumber:43,columnNumber:3},void 0));oa.displayName=Ye.Fallback.displayName;const sa=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("div",{ref:r,className:d("pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/card.tsx",lineNumber:11,columnNumber:5},void 0));sa.displayName="Card";const ia=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("div",{ref:r,className:d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/card.tsx",lineNumber:26,columnNumber:5},void 0));ia.displayName="CardHeader";const la=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("h3",{ref:r,className:d("pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",e),...n,children:n.children},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/card.tsx",lineNumber:38,columnNumber:5},void 0));la.displayName="CardTitle";const ca=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("p",{ref:r,className:d("pr-twp tw-text-sm tw-text-muted-foreground",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/card.tsx",lineNumber:58,columnNumber:3},void 0));ca.displayName="CardDescription";const ma=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("div",{ref:r,className:d("pr-twp tw-p-6 tw-pt-0",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/card.tsx",lineNumber:65,columnNumber:5},void 0));ma.displayName="CardContent";const da=i.forwardRef(({className:e,...n},r)=>t.jsxDEV("div",{ref:r,className:d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/card.tsx",lineNumber:73,columnNumber:5},void 0));da.displayName="CardFooter";const ua=i.createContext({direction:"bottom"});function pa({shouldScaleBackground:e=!0,direction:n="bottom",...r}){const a=i.useMemo(()=>({direction:n}),[n]);return t.jsxDEV(ua.Provider,{value:a,children:t.jsxDEV(ve.Drawer.Root,{shouldScaleBackground:e,direction:n,...r},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",lineNumber:22,columnNumber:7},this)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",lineNumber:21,columnNumber:5},this)}pa.displayName="Drawer";const Di=ve.Drawer.Trigger,wa=ve.Drawer.Portal,yi=ve.Drawer.Close,Gn=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(ve.Drawer.Overlay,{ref:r,className:d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",lineNumber:42,columnNumber:3},void 0));Gn.displayName=ve.Drawer.Overlay.displayName;const ba=i.forwardRef(({className:e,children:n,...r},a)=>{const{direction:o="bottom"}=i.useContext(ua),l={bottom:"tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",top:"tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",left:"tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",right:"tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"},c={bottom:"tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",top:"tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",left:"tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",right:"tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"};return t.jsxDEV(wa,{children:[t.jsxDEV(Gn,{},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",lineNumber:75,columnNumber:7},void 0),t.jsxDEV(ve.Drawer.Content,{ref:a,className:d("pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",o==="bottom"||o==="top"?"tw-flex-col":"tw-flex-row",l[o],e),...r,children:[(o==="bottom"||o==="right")&&t.jsxDEV("div",{className:c[o]},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",lineNumber:90,columnNumber:11},void 0),t.jsxDEV("div",{className:"tw-flex tw-flex-col",children:n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",lineNumber:92,columnNumber:9},void 0),(o==="top"||o==="left")&&t.jsxDEV("div",{className:c[o]},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",lineNumber:94,columnNumber:11},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",lineNumber:76,columnNumber:7},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",lineNumber:74,columnNumber:5},void 0)});ba.displayName="DrawerContent";function fa({className:e,...n}){return t.jsxDEV("div",{className:d("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",lineNumber:104,columnNumber:5},this)}fa.displayName="DrawerHeader";function xa({className:e,...n}){return t.jsxDEV("div",{className:d("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",lineNumber:114,columnNumber:5},this)}xa.displayName="DrawerFooter";const ha=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(ve.Drawer.Title,{ref:r,className:d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",lineNumber:123,columnNumber:3},void 0));ha.displayName=ve.Drawer.Title.displayName;const va=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(ve.Drawer.Description,{ref:r,className:d("tw-text-sm tw-text-muted-foreground",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/drawer.tsx",lineNumber:135,columnNumber:3},void 0));va.displayName=ve.Drawer.Description.displayName;const ga=i.forwardRef(({className:e,value:n,...r},a)=>t.jsxDEV(on.Root,{ref:a,className:d("pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",e),...r,children:t.jsxDEV(on.Indicator,{className:"tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",style:{transform:`translateX(-${100-(n||0)}%)`}},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/progress.tsx",lineNumber:18,columnNumber:5},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/progress.tsx",lineNumber:10,columnNumber:3},void 0));ga.displayName=on.Root.displayName;function Ci({...e}){return t.jsxDEV(er.Toaster,{className:"tw-toaster tw-group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/sonner.tsx",lineNumber:22,columnNumber:5},this)}const Na=i.forwardRef(({className:e,...n},r)=>{const a=te();return t.jsxDEV(tt.Root,{ref:r,className:d("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...n,dir:a,children:[t.jsxDEV(tt.Track,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:t.jsxDEV(tt.Range,{className:"tw-absolute tw-h-full tw-bg-primary"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/slider.tsx",lineNumber:30,columnNumber:9},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/slider.tsx",lineNumber:29,columnNumber:7},void 0),t.jsxDEV(tt.Thumb,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/slider.tsx",lineNumber:32,columnNumber:7},void 0)]},void 0,!0,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/slider.tsx",lineNumber:20,columnNumber:5},void 0)});Na.displayName=tt.Root.displayName;const Da=i.forwardRef(({className:e,...n},r)=>{const a=te();return t.jsxDEV(sn.Root,{className:d("tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",e),...n,ref:r,children:t.jsxDEV(sn.Thumb,{className:d("pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",{"data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0":a==="ltr"},{"data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0":a==="rtl"})},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/switch.tsx",lineNumber:28,columnNumber:7},void 0)},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/switch.tsx",lineNumber:20,columnNumber:5},void 0)});Da.displayName=sn.Root.displayName;const Ei=pe.Root,ya=i.forwardRef(({className:e,...n},r)=>{const a=te();return t.jsxDEV(pe.List,{ref:r,className:d("pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",e),...n,dir:a},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/tabs.tsx",lineNumber:37,columnNumber:5},void 0)});ya.displayName=pe.List.displayName;const Ca=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(pe.Trigger,{ref:r,className:d("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/tabs.tsx",lineNumber:55,columnNumber:3},void 0));Ca.displayName=pe.Trigger.displayName;const Ea=i.forwardRef(({className:e,...n},r)=>t.jsxDEV(pe.Content,{ref:r,className:d("pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",e),...n},void 0,!1,{fileName:"C:/Users/Paratext/Documents/Git/paranext-core/lib/platform-bible-react/src/components/shadcn-ui/tabs.tsx",lineNumber:71,columnNumber:3},void 0));Ea.displayName=pe.Content.displayName;const ki=(e,n)=>{i.useEffect(()=>{if(!e)return()=>{};const r=e(n);return()=>{r()}},[e,n])};function Pi(e){return{preserveValue:!0,...e}}const ka=(e,n,r={})=>{const a=i.useRef(n);a.current=n;const o=i.useRef(r);o.current=Pi(o.current);const[l,c]=i.useState(()=>a.current),[m,u]=i.useState(!0);return i.useEffect(()=>{let p=!0;return u(!!e),(async()=>{if(e){const x=await e();p&&(c(()=>x),u(!1))}})(),()=>{p=!1,o.current.preserveValue||c(()=>a.current)}},[e]),[l,m]},rn=()=>!1,Vi=(e,n)=>{const[r]=ka(i.useCallback(async()=>{if(!e)return rn;const a=await Promise.resolve(e(n));return async()=>a()},[n,e]),rn,{preserveValue:!1});i.useEffect(()=>()=>{r!==rn&&r()},[r])};Object.defineProperty(exports,"sonner",{enumerable:!0,get:()=>er.toast});exports.Alert=ea;exports.AlertDescription=na;exports.AlertTitle=ta;exports.Avatar=ra;exports.AvatarFallback=oa;exports.AvatarImage=aa;exports.BOOK_SELECTOR_STRING_KEYS=ts;exports.Badge=st;exports.BookChapterControl=Ho;exports.BookSelectionMode=xr;exports.BookSelector=ns;exports.Button=Y;exports.Card=sa;exports.CardContent=ma;exports.CardDescription=ca;exports.CardFooter=da;exports.CardHeader=ia;exports.CardTitle=la;exports.ChapterRangeSelector=fr;exports.Checkbox=Ot;exports.Checklist=vi;exports.ComboBox=Pt;exports.Command=dt;exports.CommandEmpty=wt;exports.CommandGroup=Mt;exports.CommandInput=ut;exports.CommandItem=bt;exports.CommandList=pt;exports.DataTable=Cr;exports.Drawer=pa;exports.DrawerClose=yi;exports.DrawerContent=ba;exports.DrawerDescription=va;exports.DrawerFooter=xa;exports.DrawerHeader=fa;exports.DrawerOverlay=Gn;exports.DrawerPortal=wa;exports.DrawerTitle=ha;exports.DrawerTrigger=Di;exports.DropdownMenu=lt;exports.DropdownMenuCheckboxItem=St;exports.DropdownMenuContent=qe;exports.DropdownMenuGroup=wn;exports.DropdownMenuItem=Ut;exports.DropdownMenuItemType=Er;exports.DropdownMenuLabel=ct;exports.DropdownMenuPortal=ar;exports.DropdownMenuRadioGroup=Eo;exports.DropdownMenuRadioItem=xn;exports.DropdownMenuSeparator=He;exports.DropdownMenuShortcut=sr;exports.DropdownMenuSub=or;exports.DropdownMenuSubContent=fn;exports.DropdownMenuSubTrigger=bn;exports.DropdownMenuTrigger=Gt;exports.Filter=ms;exports.FilterDropdown=ss;exports.Footer=cs;exports.INVENTORY_STRING_KEYS=gs;exports.Input=Ae;exports.Inventory=ys;exports.Label=ee;exports.MarkdownRenderer=os;exports.MoreInfo=is;exports.MultiSelectComboBox=Pr;exports.NavigationContentSearch=ii;exports.Popover=Rt;exports.PopoverContent=mt;exports.PopoverTrigger=Tt;exports.Progress=ga;exports.RadioGroup=_t;exports.RadioGroupItem=ot;exports.SCOPE_SELECTOR_STRING_KEYS=ei;exports.ScopeSelector=ti;exports.ScriptureResultsViewer=Hs;exports.ScrollGroupSelector=ni;exports.SearchBar=En;exports.Select=Oe;exports.SelectContent=Ge;exports.SelectGroup=hr;exports.SelectItem=xe;exports.SelectLabel=gr;exports.SelectScrollDownButton=yn;exports.SelectScrollUpButton=Dn;exports.SelectSeparator=Nr;exports.SelectTrigger=je;exports.SelectValue=Ie;exports.Separator=zt;exports.SettingsList=ri;exports.SettingsListHeader=oi;exports.SettingsListItem=ai;exports.SettingsSidebar=zr;exports.SettingsSidebarContentSearch=As;exports.Skeleton=ln;exports.Slider=Na;exports.Sonner=Ci;exports.Spinner=Qr;exports.Switch=Da;exports.TabDropdownMenu=un;exports.TabToolbar=si;exports.Table=ft;exports.TableBody=ht;exports.TableCaption=yr;exports.TableCell=ze;exports.TableFooter=Dr;exports.TableHead=Xe;exports.TableHeader=xt;exports.TableRow=Ce;exports.Tabs=Ei;exports.TabsContent=Ea;exports.TabsList=ya;exports.TabsTrigger=Ca;exports.TextField=gi;exports.ToggleGroup=Cn;exports.ToggleGroupItem=nt;exports.Toolbar=bi;exports.Tooltip=Ft;exports.TooltipContent=vt;exports.TooltipProvider=At;exports.TooltipTrigger=Bt;exports.UiLanguageSelector=xi;exports.VerticalTabs=Pn;exports.VerticalTabsContent=jn;exports.VerticalTabsList=Vn;exports.VerticalTabsTrigger=Xr;exports.badgeVariants=kr;exports.buttonVariants=pr;exports.cn=d;exports.getBookIdFromUSFM=vs;exports.getLinesFromUSFM=xs;exports.getNumberFromUSFM=hs;exports.getStatusForItem=Gr;exports.getToolbarOSReservedSpaceClassName=wi;exports.inventoryCountColumn=bs;exports.inventoryItemColumn=ps;exports.inventoryStatusColumn=fs;exports.selectTriggerVariants=vr;exports.useEvent=ki;exports.useEventAsync=Vi;exports.usePromise=ka;function ji(e,n="top"){if(!e||typeof document>"u")return;const r=document.head||document.querySelector("head"),a=r.querySelector(":first-child"),o=document.createElement("style");o.appendChild(document.createTextNode(e)),n==="top"&&a?r.insertBefore(o,a):r.appendChild(o)}ji(`.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
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
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%; /* black */
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%; /* black */
    --popover: 210 20% 98%; /* popover platform */
    --popover-foreground: 222.2 84% 4.9%; /* black */
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 50% 95%;
    --secondary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --muted: 210 50% 95%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 50% 95%;
    --accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 214.3 31.8% 91.4%; /* slate-200 */
    --input: 214.3 31.8% 91.4%; /* slate-200 */
    --ring: 222.2 84% 4.9%; /* black */

    --sidebar-background: 210 20% 98%; /* popover platform */
    --sidebar-foreground: 222.2 84% 4.9%; /* black */
    --sidebar-primary: 222.2 47.4% 11.2%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 210 50% 95%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-border: 214.3 31.8% 91.4%; /* slate-200 */
    --sidebar-ring: 222.2 84% 4.9%; /* black */

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%; /* black */
    --foreground: 210 40% 98%; /* slate-50 */
    --card: 222.2 84% 4.9%; /* black */
    --card-foreground: 210 40% 98%; /* slate-50 */
    --popover: 222.2 84% 4.9%; /* black */
    --popover-foreground: 210 40% 98%; /* slate-50 */
    --primary: 210 40% 98%; /* slate-50 */
    --primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%; /* slate-50 */
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%; /* slate-50 */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 215.3 19.3% 34.5%; /* slate-600 */
    --input: 215.3 19.3% 34.5%; /* slate-600 */
    --ring: 212.7 26.8% 83.9%;

    --sidebar-background: 222.2 84% 4.9%; /* black */
    --sidebar-foreground: 215 20.2% 65.1%;
    --sidebar-primary: 210 40% 98%; /* slate-50 */
    --sidebar-primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-accent: 217.2 32.6% 17.5%;
    --sidebar-accent-foreground: 215 20.2% 65.1%;
    --sidebar-border: 217.2 32.6% 17.5%;
    --sidebar-ring: 212.7 26.8% 83.9%;
  }

  /* using color palette https://supercolorpalette.com/?scp=G0-hsl-99827A-E7DDD0-FEF4E7-FEFAF1-FFFFFF-D8E9E3-719892-07463D-0A433D-083030-041616-000000-85DBB8-F2F52E-CD3737 */
  .paratext-light {
    --background: 0 0% 100%; /* white */
    --foreground: 0 0% 0%; /* black */
    --muted: 33.9 32.4% 86.1%; /* paratext light brown */
    --muted-foreground: 15.5 13.2% 53.9%; /*paratext brown */
    --popover: 40 20% 98%; /* popover paratext */
    --popover-foreground: 0 0% 0%; /* black */
    --card: 0 0% 100%; /* white */
    --card-foreground: 0 0% 0%; /* black */
    --border: 220 13% 91%; /* border */
    --input: 161.3 26.7% 88.2%; /* paratext light green */
    --primary: 173.4 82.1% 15.3%; /* paratext dark green */
    --primary-foreground: 40 85.7% 97.3%; /* paratext sand */
    --secondary: 161.3 26.7% 88.2%; /* paratext light green */
    --secondary-foreground: 173.4 82.1% 15.3%; /* paratext dark green */
    --accent: 161.3 26.7% 88.2%; /* paratext light green */
    --accent-foreground: 173.4 82.1% 15.3%; /* paratext dark green */
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 15.5 13.2% 53.9%; /*paratext brown */

    --sidebar-background: 40 20% 98%; /* popover paratext */
    --sidebar-foreground: 12 10.95% 26.86%; /* dark brown */
    --sidebar-primary: 173.4 82.1% 15.3%; /* paratext dark green */
    --sidebar-primary-foreground: 40 85.7% 97.3%; /* paratext sand */
    --sidebar-accent: 33.9 32.4% 86.1%; /* paratext light brown */
    --sidebar-accent-foreground: 0 0% 0%; /* black */
    --sidebar-border: 220 13% 91%; /* border */
    --sidebar-ring: 15.5 13.2% 53.9%; /*paratext brown */
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

    --sidebar-background: 180 71.4% 5%;
    --sidebar-foreground: 33.9 32.4% 86.1%;
    --sidebar-primary: 161.3 26.7% 88.2%;
    --sidebar-primary-foreground: 173.4 82.1% 15.3%;
    --sidebar-accent: 15.5 13.2% 53.9%;
    --sidebar-accent-foreground: 33.9 32.4% 86.1%;
    --sidebar-border: 220 13% 20%;
    --sidebar-ring: 15.5 13.2% 53.9%;
  }
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
.tw-inset-x-0 {
  left: 0px;
  right: 0px;
}
.tw-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.tw-bottom-0 {
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
.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
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
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-me-4 {
  margin-inline-end: 1rem;
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
.tw-mt-24 {
  margin-top: 6rem;
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
.tw-h-\\[100px\\] {
  height: 100px;
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
.tw-h-auto {
  height: auto;
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
.tw-max-h-5 {
  max-height: 1.25rem;
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
.tw-max-w-48 {
  max-width: 12rem;
}
.tw-max-w-5 {
  max-width: 1.25rem;
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
.tw-flex-shrink {
  flex-shrink: 1;
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
.tw-basis-32 {
  flex-basis: 8rem;
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
.tw-gap-8 {
  gap: 2rem;
}
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
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
.tw-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
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
.tw-rounded-s-md {
  border-start-start-radius: calc(var(--radius) - 2px);
  border-end-start-radius: calc(var(--radius) - 2px);
}
.tw-rounded-t-\\[10px\\] {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
.tw-border-solid {
  border-style: solid;
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
.tw-border-input {
  border-color: hsl(var(--input));
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
.tw-border-s-yellow-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 240 138 / var(--tw-border-opacity, 1));
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
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
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
.tw-duration-500 {
  transition-duration: 500ms;
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
.tw-duration-500 {
  animation-duration: 500ms;
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
.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
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
@container (min-width: 24rem) {

  .\\@sm\\:tw-grow {
    flex-grow: 1;
  }

  .\\@sm\\:tw-basis-auto {
    flex-basis: auto;
  }
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
`,"after-all");
//# sourceMappingURL=index.cjs.map
