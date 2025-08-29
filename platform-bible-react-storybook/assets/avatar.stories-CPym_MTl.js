import{j as a}from"./jsx-runtime-CoJcBlqr.js";import{r as l,e as b}from"./iframe-ChjBVkNN.js";import{c as Y}from"./index-uX5GIGLq.js";import{u as Z}from"./index-Dbj3Uwir.js";import{u as w}from"./index-DRtzzKqe.js";import{P as y}from"./index-DF789n87.js";import{s as aa}from"./index-BODYHFlN.js";import{c as j}from"./shadcn-ui.util-DMJ19wEV.js";import{T as ea}from"./theme-provider.component-DRoiPDtx.js";import"./index-BfzcDxxY.js";import"./index-BWcRxFB8.js";import"./index-B3HFQzOn.js";import"./index-CtW3L1xI.js";function ta(){return aa.useSyncExternalStore(ra,()=>!0,()=>!1)}function ra(){return()=>{}}var k="Avatar",[sa,wa]=Y(k),[na,W]=sa(k),$=l.forwardRef((e,t)=>{const{__scopeAvatar:s,...n}=e,[c,r]=l.useState("idle");return a.jsx(na,{scope:s,imageLoadingStatus:c,onImageLoadingStatusChange:r,children:a.jsx(y.span,{...n,ref:t})})});$.displayName=k;var H="AvatarImage",J=l.forwardRef((e,t)=>{const{__scopeAvatar:s,src:n,onLoadingStatusChange:c=()=>{},...r}=e,u=W(H,s),i=oa(n,r),m=Z(v=>{c(v),u.onImageLoadingStatusChange(v)});return w(()=>{i!=="idle"&&m(i)},[i,m]),i==="loaded"?a.jsx(y.img,{...r,ref:t,src:n}):null});J.displayName=H;var X="AvatarFallback",G=l.forwardRef((e,t)=>{const{__scopeAvatar:s,delayMs:n,...c}=e,r=W(X,s),[u,i]=l.useState(n===void 0);return l.useEffect(()=>{if(n!==void 0){const m=window.setTimeout(()=>i(!0),n);return()=>window.clearTimeout(m)}},[n]),u&&r.imageLoadingStatus!=="loaded"?a.jsx(y.span,{...c,ref:t}):null});G.displayName=X;function I(e,t){return e?t?(e.src!==t&&(e.src=t),e.complete&&e.naturalWidth>0?"loaded":"loading"):"error":"idle"}function oa(e,{referrerPolicy:t,crossOrigin:s}){const n=ta(),c=l.useRef(null),r=n?(c.current||(c.current=new window.Image),c.current):null,[u,i]=l.useState(()=>I(r,e));return w(()=>{i(I(r,e))},[r,e]),w(()=>{const m=Q=>()=>{i(Q)};if(!r)return;const v=m("loaded"),S=m("error");return r.addEventListener("load",v),r.addEventListener("error",S),t&&(r.referrerPolicy=t),typeof s=="string"&&(r.crossOrigin=s),()=>{r.removeEventListener("load",v),r.removeEventListener("error",S)}},[r,s,t]),u}var K=$,z=J,O=G;const o=b.forwardRef(({className:e,...t},s)=>a.jsx(K,{ref:s,className:j("pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",e),...t}));o.displayName=K.displayName;const p=b.forwardRef(({className:e,...t},s)=>a.jsx(z,{ref:s,className:j("pr-twp tw-aspect-square tw-h-full tw-w-full",e),...t}));p.displayName=z.displayName;const d=b.forwardRef(({className:e,...t},s)=>a.jsx(O,{ref:s,className:j("pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",e),...t}));d.displayName=O.displayName;o.__docgenInfo={description:`The Avatar component displays a user's profile picture or initials. The component is built and
styled by Shadcn UI. See Shadcn UI Documentation https://ui.shadcn.com/docs/components/avatar`,methods:[]};p.__docgenInfo={description:"@inheritdoc Avatar",methods:[]};d.__docgenInfo={description:"@inheritdoc Avatar",methods:[]};const ba={title:"Shadcn/Avatar",component:o,tags:["autodocs"],decorators:[e=>a.jsx(ea,{children:a.jsx(e,{})})]},h={render:()=>a.jsxs(o,{children:[a.jsx(p,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),a.jsx(d,{children:"CN"})]}),parameters:{docs:{description:{story:"A basic avatar with an image and fallback text."}}}},f={render:()=>a.jsx(o,{children:a.jsx(d,{children:"JD"})}),parameters:{docs:{description:{story:"An avatar that shows only the fallback when no image is provided."}}}},g={render:()=>a.jsxs(o,{children:[a.jsx(p,{src:"https://broken-link.example/image.png",alt:"Broken image"}),a.jsx(d,{children:"BI"})]}),parameters:{docs:{description:{story:"An avatar with a broken image URL that falls back to initials."}}}},A={render:()=>a.jsxs("div",{className:"tw-flex tw-gap-4",children:[a.jsxs(o,{children:[a.jsx(p,{src:"https://github.com/vercel.png",alt:"@vercel"}),a.jsx(d,{children:"VC"})]}),a.jsxs(o,{children:[a.jsx(p,{src:"https://github.com/nextjs.png",alt:"@nextjs"}),a.jsx(d,{children:"NX"})]}),a.jsx(o,{children:a.jsx(d,{children:"AB"})})]}),parameters:{docs:{description:{story:"Multiple avatars showing different states and images."}}}},x={render:e=>a.jsxs(o,{...e,children:[a.jsx(p,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),a.jsx(d,{children:"CN"})]}),parameters:{docs:{description:{story:"An interactive avatar where you can experiment with properties using the controls."}}}};var N,L,C;h.parameters={...h.parameters,docs:{...(N=h.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>,
  parameters: {
    docs: {
      description: {
        story: 'A basic avatar with an image and fallback text.'
      }
    }
  }
}`,...(C=(L=h.parameters)==null?void 0:L.docs)==null?void 0:C.source}}};var F,E,_;f.parameters={...f.parameters,docs:{...(F=f.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>,
  parameters: {
    docs: {
      description: {
        story: 'An avatar that shows only the fallback when no image is provided.'
      }
    }
  }
}`,...(_=(E=f.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var R,B,T;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <Avatar>
      <AvatarImage src="https://broken-link.example/image.png" alt="Broken image" />
      <AvatarFallback>BI</AvatarFallback>
    </Avatar>,
  parameters: {
    docs: {
      description: {
        story: 'An avatar with a broken image URL that falls back to initials.'
      }
    }
  }
}`,...(T=(B=g.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var D,M,P;A.parameters={...A.parameters,docs:{...(D=A.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="tw-flex tw-gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
        <AvatarFallback>NX</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Multiple avatars showing different states and images.'
      }
    }
  }
}`,...(P=(M=A.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var U,q,V;x.parameters={...x.parameters,docs:{...(U=x.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: args => <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>,
  parameters: {
    docs: {
      description: {
        story: 'An interactive avatar where you can experiment with properties using the controls.'
      }
    }
  }
}`,...(V=(q=x.parameters)==null?void 0:q.docs)==null?void 0:V.source}}};const ya=["Default","WithoutImage","BrokenImage","Different","Interactive"];export{g as BrokenImage,h as Default,A as Different,x as Interactive,f as WithoutImage,ya as __namedExportsOrder,ba as default};
