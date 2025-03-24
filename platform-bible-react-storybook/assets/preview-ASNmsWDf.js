import{d as K}from"./index-XvsFvOFV.js";const{useEffect:_,useMemo:E}=__STORYBOOK_MODULE_PREVIEW_API__,{global:P}=__STORYBOOK_MODULE_GLOBAL__,{logger:N}=__STORYBOOK_MODULE_CLIENT_LOGGER__;var g="backgrounds",U={light:{name:"light",value:"#F8F8F8"},dark:{name:"dark",value:"#333"}},{document:b,window:O}=P,D=()=>{var r;return!!((r=O==null?void 0:O.matchMedia("(prefers-reduced-motion: reduce)"))!=null&&r.matches)},B=r=>{(Array.isArray(r)?r:[r]).forEach(X)},X=r=>{var d;let e=b.getElementById(r);e&&((d=e.parentElement)==null||d.removeChild(e))},F=(r,e)=>{let d=b.getElementById(r);if(d)d.innerHTML!==e&&(d.innerHTML=e);else{let t=b.createElement("style");t.setAttribute("id",r),t.innerHTML=e,b.head.appendChild(t)}},Y=(r,e,d)=>{var a;let t=b.getElementById(r);if(t)t.innerHTML!==e&&(t.innerHTML=e);else{let o=b.createElement("style");o.setAttribute("id",r),o.innerHTML=e;let i=`addon-backgrounds-grid${d?`-docs-${d}`:""}`,n=b.getElementById(i);n?(a=n.parentElement)==null||a.insertBefore(o,n):b.head.appendChild(o)}},q={cellSize:100,cellAmount:10,opacity:.8},w="addon-backgrounds",C="addon-backgrounds-grid",W=D()?"":"transition: background-color 0.3s;",J=(r,e)=>{let{globals:d,parameters:t,viewMode:a,id:o}=e,{options:i=U,disable:n,grid:s=q}=t[g]||{},c=d[g]||{},u=c.value,l=u?i[u]:void 0,$=(l==null?void 0:l.value)||"transparent",m=c.grid||!1,y=!!l&&!n,f=a==="docs"?`#anchor--${o} .docs-story`:".sb-show-main",v=a==="docs"?`#anchor--${o} .docs-story`:".sb-show-main",H=t.layout===void 0||t.layout==="padded",L=a==="docs"?20:H?16:0,{cellAmount:k,cellSize:p,opacity:x,offsetX:S=L,offsetY:h=L}=s,A=a==="docs"?`${w}-docs-${o}`:`${w}-color`,G=a==="docs"?o:null;_(()=>{let M=`
    ${f} {
      background: ${$} !important;
      ${W}
      }`;if(!y){B(A);return}Y(A,M,G)},[f,A,G,y,$]);let T=a==="docs"?`${C}-docs-${o}`:`${C}`;return _(()=>{if(!m){B(T);return}let M=[`${p*k}px ${p*k}px`,`${p*k}px ${p*k}px`,`${p}px ${p}px`,`${p}px ${p}px`].join(", "),j=`
        ${v} {
          background-size: ${M} !important;
          background-position: ${S}px ${h}px, ${S}px ${h}px, ${S}px ${h}px, ${S}px ${h}px !important;
          background-blend-mode: difference !important;
          background-image: linear-gradient(rgba(130, 130, 130, ${x}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${x}) 1px, transparent 1px),
           linear-gradient(rgba(130, 130, 130, ${x/2}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${x/2}) 1px, transparent 1px) !important;
        }
      `;F(T,j)},[k,p,v,T,m,S,h,x]),r()},Q=(r,e=[],d)=>{if(r==="transparent")return"transparent";if(e.find(a=>a.value===r)||r)return r;let t=e.find(a=>a.name===d);if(t)return t.value;if(d){let a=e.map(o=>o.name).join(", ");N.warn(K`
        Backgrounds Addon: could not find the default color "${d}".
        These are the available colors for your story based on your configuration:
        ${a}.
      `)}return"transparent"},Z=(r,e)=>{var u;let{globals:d,parameters:t}=e,a=(u=d[g])==null?void 0:u.value,o=t[g],i=E(()=>o.disable?"transparent":Q(a,o.values,o.default),[o,a]),n=E(()=>i&&i!=="transparent",[i]),s=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",c=E(()=>`
      ${s} {
        background: ${i} !important;
        ${D()?"":"transition: background-color 0.3s;"}
      }
    `,[i,s]);return _(()=>{let l=e.viewMode==="docs"?`addon-backgrounds-docs-${e.id}`:"addon-backgrounds-color";if(!n){B(l);return}Y(l,c,e.viewMode==="docs"?e.id:null)},[n,c,e]),r()},V=(r,e)=>{var y;let{globals:d,parameters:t}=e,a=t[g].grid,o=((y=d[g])==null?void 0:y.grid)===!0&&a.disable!==!0,{cellAmount:i,cellSize:n,opacity:s}=a,c=e.viewMode==="docs",u=t.layout===void 0||t.layout==="padded"?16:0,l=a.offsetX??(c?20:u),$=a.offsetY??(c?20:u),m=E(()=>{let f=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",v=[`${n*i}px ${n*i}px`,`${n*i}px ${n*i}px`,`${n}px ${n}px`,`${n}px ${n}px`].join(", ");return`
      ${f} {
        background-size: ${v} !important;
        background-position: ${l}px ${$}px, ${l}px ${$}px, ${l}px ${$}px, ${l}px ${$}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${s}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${s}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${s/2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${s/2}) 1px, transparent 1px) !important;
      }
    `},[n]);return _(()=>{let f=e.viewMode==="docs"?`addon-backgrounds-grid-docs-${e.id}`:"addon-backgrounds-grid";if(!o){B(f);return}F(f,m)},[o,m,e]),r()},R,ae=(R=globalThis.FEATURES)!=null&&R.backgroundsStoryGlobals?[J]:[V,Z],I,te={[g]:{grid:{cellSize:20,opacity:.5,cellAmount:5},disable:!1,...!((I=globalThis.FEATURES)!=null&&I.backgroundsStoryGlobals)&&{values:Object.values(U)}}},ee={[g]:{value:void 0,grid:!1}},z,oe=(z=globalThis.FEATURES)!=null&&z.backgroundsStoryGlobals?ee:{[g]:null};export{ae as decorators,oe as initialGlobals,te as parameters};
