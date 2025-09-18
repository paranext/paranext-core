import{j as s}from"./jsx-runtime-4wK_0ZO4.js";import{r as c,e as Ne,a as Ie}from"./iframe-BcYeWgcr.js";import{c as fe}from"./index-BaQP4hhM.js";import{u as Te,c as _}from"./index-B6gecgxP.js";import{u as E}from"./index-DNc3TkLQ.js";import{c as Ae}from"./index-Dxmr7YCn.js";import{u as Me}from"./index-DZhSYnG_.js";import{u as ke}from"./index-DuMdAayX.js";import{u as Be}from"./index-b4TQRt8l.js";import{P as M}from"./index-CHtcClp9.js";import{c as Ke}from"./index-PhEMGCGr.js";import{c as Oe}from"./shadcn-ui.util-DMJ19wEV.js";import{T as Fe}from"./theme-provider.component-Bum-YBGl.js";import"./index-B1Guct03.js";import"./index-CiidgNRF.js";import"./index-xAGYJ6Tj.js";import"./index-BJ893FO-.js";var pe=["PageUp","PageDown"],he=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],we={"from-left":["Home","PageDown","ArrowDown","ArrowLeft"],"from-right":["Home","PageDown","ArrowDown","ArrowRight"],"from-bottom":["Home","PageDown","ArrowDown","ArrowLeft"],"from-top":["Home","PageDown","ArrowUp","ArrowLeft"]},N="Slider",[$,He,Ue]=Ke(N),[ge,yt]=Ae(N,[Ue]),[ze,H]=ge(N),ve=c.forwardRef((e,t)=>{const{name:n,min:r=0,max:a=100,step:d=1,orientation:o="horizontal",disabled:l=!1,minStepsBetweenThumbs:u=0,defaultValue:w=[r],value:g,onValueChange:i=()=>{},onValueCommit:m=()=>{},inverted:x=!1,form:y,...v}=e,p=c.useRef(new Set),f=c.useRef(0),b=o==="horizontal"?Le:Ye,[h=[],I]=Te({prop:g,defaultProp:w,onChange:S=>{var P;(P=[...p.current][f.current])==null||P.focus(),i(S)}}),z=c.useRef(h);function L(S){const V=We(h,S);T(S,V)}function _e(S){T(S,f.current)}function Ee(){const S=z.current[f.current];h[f.current]!==S&&m(h)}function T(S,V,{commit:P}={commit:!1}){const W=et(d),Y=tt(Math.round((S-r)/d)*d+r,W),A=fe(Y,[r,a]);I((j=[])=>{const C=qe(j,A,V);if(Ze(C,u*d)){f.current=C.indexOf(A);const J=String(C)!==String(j);return J&&P&&m(C),J?C:j}else return j})}return s.jsx(ze,{scope:e.__scopeSlider,name:n,disabled:l,min:r,max:a,valueIndexToChangeRef:f,thumbs:p.current,values:h,orientation:o,form:y,children:s.jsx($.Provider,{scope:e.__scopeSlider,children:s.jsx($.Slot,{scope:e.__scopeSlider,children:s.jsx(b,{"aria-disabled":l,"data-disabled":l?"":void 0,...v,ref:t,onPointerDown:_(v.onPointerDown,()=>{l||(z.current=h)}),min:r,max:a,inverted:x,onSlideStart:l?void 0:L,onSlideMove:l?void 0:_e,onSlideEnd:l?void 0:Ee,onHomeKeyDown:()=>!l&&T(r,0,{commit:!0}),onEndKeyDown:()=>!l&&T(a,h.length-1,{commit:!0}),onStepKeyDown:({event:S,direction:V})=>{if(!l){const Y=pe.includes(S.key)||S.shiftKey&&he.includes(S.key)?10:1,A=f.current,j=h[A],C=d*Y*V;T(j+C,A,{commit:!0})}}})})})})});ve.displayName=N;var[xe,be]=ge(N,{startEdge:"left",endEdge:"right",size:"width",direction:1}),Le=c.forwardRef((e,t)=>{const{min:n,max:r,dir:a,inverted:d,onSlideStart:o,onSlideMove:l,onSlideEnd:u,onStepKeyDown:w,...g}=e,[i,m]=c.useState(null),x=E(t,b=>m(b)),y=c.useRef(void 0),v=Me(a),p=v==="ltr",f=p&&!d||!p&&d;function D(b){const h=y.current||i.getBoundingClientRect(),I=[0,h.width],L=G(I,f?[n,r]:[r,n]);return y.current=h,L(b-h.left)}return s.jsx(xe,{scope:e.__scopeSlider,startEdge:f?"left":"right",endEdge:f?"right":"left",direction:f?1:-1,size:"width",children:s.jsx(Se,{dir:v,"data-orientation":"horizontal",...g,ref:x,style:{...g.style,"--radix-slider-thumb-transform":"translateX(-50%)"},onSlideStart:b=>{const h=D(b.clientX);o==null||o(h)},onSlideMove:b=>{const h=D(b.clientX);l==null||l(h)},onSlideEnd:()=>{y.current=void 0,u==null||u()},onStepKeyDown:b=>{const I=we[f?"from-left":"from-right"].includes(b.key);w==null||w({event:b,direction:I?-1:1})}})})}),Ye=c.forwardRef((e,t)=>{const{min:n,max:r,inverted:a,onSlideStart:d,onSlideMove:o,onSlideEnd:l,onStepKeyDown:u,...w}=e,g=c.useRef(null),i=E(t,g),m=c.useRef(void 0),x=!a;function y(v){const p=m.current||g.current.getBoundingClientRect(),f=[0,p.height],b=G(f,x?[r,n]:[n,r]);return m.current=p,b(v-p.top)}return s.jsx(xe,{scope:e.__scopeSlider,startEdge:x?"bottom":"top",endEdge:x?"top":"bottom",size:"height",direction:x?1:-1,children:s.jsx(Se,{"data-orientation":"vertical",...w,ref:i,style:{...w.style,"--radix-slider-thumb-transform":"translateY(50%)"},onSlideStart:v=>{const p=y(v.clientY);d==null||d(p)},onSlideMove:v=>{const p=y(v.clientY);o==null||o(p)},onSlideEnd:()=>{m.current=void 0,l==null||l()},onStepKeyDown:v=>{const f=we[x?"from-bottom":"from-top"].includes(v.key);u==null||u({event:v,direction:f?-1:1})}})})}),Se=c.forwardRef((e,t)=>{const{__scopeSlider:n,onSlideStart:r,onSlideMove:a,onSlideEnd:d,onHomeKeyDown:o,onEndKeyDown:l,onStepKeyDown:u,...w}=e,g=H(N,n);return s.jsx(M.span,{...w,ref:t,onKeyDown:_(e.onKeyDown,i=>{i.key==="Home"?(o(i),i.preventDefault()):i.key==="End"?(l(i),i.preventDefault()):pe.concat(he).includes(i.key)&&(u(i),i.preventDefault())}),onPointerDown:_(e.onPointerDown,i=>{const m=i.target;m.setPointerCapture(i.pointerId),i.preventDefault(),g.thumbs.has(m)?m.focus():r(i)}),onPointerMove:_(e.onPointerMove,i=>{i.target.hasPointerCapture(i.pointerId)&&a(i)}),onPointerUp:_(e.onPointerUp,i=>{const m=i.target;m.hasPointerCapture(i.pointerId)&&(m.releasePointerCapture(i.pointerId),d(i))})})}),ye="SliderTrack",Ve=c.forwardRef((e,t)=>{const{__scopeSlider:n,...r}=e,a=H(ye,n);return s.jsx(M.span,{"data-disabled":a.disabled?"":void 0,"data-orientation":a.orientation,...r,ref:t})});Ve.displayName=ye;var X="SliderRange",Ce=c.forwardRef((e,t)=>{const{__scopeSlider:n,...r}=e,a=H(X,n),d=be(X,n),o=c.useRef(null),l=E(t,o),u=a.values.length,w=a.values.map(m=>Pe(m,a.min,a.max)),g=u>1?Math.min(...w):0,i=100-Math.max(...w);return s.jsx(M.span,{"data-orientation":a.orientation,"data-disabled":a.disabled?"":void 0,...r,ref:l,style:{...e.style,[d.startEdge]:g+"%",[d.endEdge]:i+"%"}})});Ce.displayName=X;var q="SliderThumb",Re=c.forwardRef((e,t)=>{const n=He(e.__scopeSlider),[r,a]=c.useState(null),d=E(t,l=>a(l)),o=c.useMemo(()=>r?n().findIndex(l=>l.ref.current===r):-1,[n,r]);return s.jsx($e,{...e,ref:d,index:o})}),$e=c.forwardRef((e,t)=>{const{__scopeSlider:n,index:r,name:a,...d}=e,o=H(q,n),l=be(q,n),[u,w]=c.useState(null),g=E(t,D=>w(D)),i=u?o.form||!!u.closest("form"):!0,m=Be(u),x=o.values[r],y=x===void 0?0:Pe(x,o.min,o.max),v=Ge(r,o.values.length),p=m==null?void 0:m[l.size],f=p?Je(p,y,l.direction):0;return c.useEffect(()=>{if(u)return o.thumbs.add(u),()=>{o.thumbs.delete(u)}},[u,o.thumbs]),s.jsxs("span",{style:{transform:"var(--radix-slider-thumb-transform)",position:"absolute",[l.startEdge]:`calc(${y}% + ${f}px)`},children:[s.jsx($.ItemSlot,{scope:e.__scopeSlider,children:s.jsx(M.span,{role:"slider","aria-label":e["aria-label"]||v,"aria-valuemin":o.min,"aria-valuenow":x,"aria-valuemax":o.max,"aria-orientation":o.orientation,"data-orientation":o.orientation,"data-disabled":o.disabled?"":void 0,tabIndex:o.disabled?void 0:0,...d,ref:g,style:x===void 0?{display:"none"}:e.style,onFocus:_(e.onFocus,()=>{o.valueIndexToChangeRef.current=r})})}),i&&s.jsx(De,{name:a??(o.name?o.name+(o.values.length>1?"[]":""):void 0),form:o.form,value:x},r)]})});Re.displayName=q;var Xe="RadioBubbleInput",De=c.forwardRef(({__scopeSlider:e,value:t,...n},r)=>{const a=c.useRef(null),d=E(a,r),o=ke(t);return c.useEffect(()=>{const l=a.current;if(!l)return;const u=window.HTMLInputElement.prototype,g=Object.getOwnPropertyDescriptor(u,"value").set;if(o!==t&&g){const i=new Event("input",{bubbles:!0});g.call(l,t),l.dispatchEvent(i)}},[o,t]),s.jsx(M.input,{style:{display:"none"},...n,ref:d,defaultValue:t})});De.displayName=Xe;function qe(e=[],t,n){const r=[...e];return r[n]=t,r.sort((a,d)=>a-d)}function Pe(e,t,n){const d=100/(n-t)*(e-t);return fe(d,[0,100])}function Ge(e,t){return t>2?`Value ${e+1} of ${t}`:t===2?["Minimum","Maximum"][e]:void 0}function We(e,t){if(e.length===1)return 0;const n=e.map(a=>Math.abs(a-t)),r=Math.min(...n);return n.indexOf(r)}function Je(e,t,n){const r=e/2,d=G([0,50],[0,r]);return(r-d(t)*n)*n}function Qe(e){return e.slice(0,-1).map((t,n)=>e[n+1]-t)}function Ze(e,t){if(t>0){const n=Qe(e);return Math.min(...n)>=t}return!0}function G(e,t){return n=>{if(e[0]===e[1]||t[0]===t[1])return t[0];const r=(t[1]-t[0])/(e[1]-e[0]);return t[0]+r*(n-e[0])}}function et(e){return(String(e).split(".")[1]||"").length}function tt(e,t){const n=Math.pow(10,t);return Math.round(e*n)/n}var je=ve,nt=Ve,rt=Ce,ot=Re;const R=Ne.forwardRef(({className:e,...t},n)=>{const r=Ie();return s.jsxs(je,{ref:n,className:Oe("pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",e),...t,dir:r,children:[s.jsx(nt,{className:"tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary",children:s.jsx(rt,{className:"tw-absolute tw-h-full tw-bg-primary"})}),s.jsx(ot,{className:"tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50"})]})});R.displayName=je.displayName;R.__docgenInfo={description:`The Slider component is an input where the user selects a value from within a given range. This
component is built on Radix UI primitives and styled with Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/slider}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/slider}`,methods:[]};const{fn:U}=__STORYBOOK_MODULE_TEST__,Vt={title:"Shadcn/Slider",component:R,tags:["autodocs"],decorators:[e=>s.jsx(Fe,{children:s.jsx(e,{})})],argTypes:{min:{control:{type:"number"}},max:{control:{type:"number"}},step:{control:{type:"number"}},disabled:{control:"boolean"},onValueChange:{action:"value changed"}}},k={args:{defaultValue:[50],min:0,max:100,step:1,onValueChange:U()}},B={args:{defaultValue:[25,75],min:0,max:100,step:1,onValueChange:U()},parameters:{docs:{description:{story:"A slider with dual handles for selecting a range."}}}},K={args:{defaultValue:[50],disabled:!0,min:0,max:100,step:1,onValueChange:U()},parameters:{docs:{description:{story:"A disabled slider that cannot be interacted with."}}}},O={render:()=>{const[e,t]=c.useState([40]),[n,r]=c.useState([20,80]);return s.jsxs("div",{className:"tw-w-80 tw-space-y-6",children:[s.jsxs("div",{children:[s.jsx("label",{htmlFor:"single-slider",className:"tw-mb-2 tw-block tw-text-sm tw-font-medium",children:"Single Value"}),s.jsx(R,{id:"single-slider",value:e,onValueChange:t,max:100,step:1}),s.jsxs("div",{className:"tw-mt-1 tw-text-sm tw-text-muted-foreground",children:["Value: ",e[0]]})]}),s.jsxs("div",{children:[s.jsx("label",{htmlFor:"range-slider",className:"tw-mb-2 tw-block tw-text-sm tw-font-medium",children:"Range Selection"}),s.jsx(R,{id:"range-slider",value:n,onValueChange:r,max:100,step:1}),s.jsxs("div",{className:"tw-mt-1 tw-text-sm tw-text-muted-foreground",children:["Range: ",n[0]," - ",n[1]]})]}),s.jsxs("div",{children:[s.jsx("label",{htmlFor:"disabled-slider",className:"tw-mb-2 tw-block tw-text-sm tw-font-medium",children:"Disabled"}),s.jsx(R,{id:"disabled-slider",defaultValue:[50],disabled:!0,max:100,step:1})]})]})},parameters:{docs:{description:{story:"Different slider variants showing single value, range, and disabled states."}}}},F={render:e=>{const[t,n]=c.useState([33]),r=a=>{var d;n(a),(d=e.onValueChange)==null||d.call(e,a)};return s.jsxs("div",{className:"tw-w-80 tw-space-y-4",children:[s.jsx(R,{...e,value:t,onValueChange:r}),s.jsxs("div",{className:"tw-text-sm tw-text-muted-foreground",children:["Current value: ",s.jsx("code",{children:t[0]})]})]})},args:{min:0,max:100,step:1,onValueChange:U()},parameters:{docs:{description:{story:"An interactive slider that shows the current value, similar to the original example."}}}};var Q,Z,ee;k.parameters={...k.parameters,docs:{...(Q=k.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    onValueChange: fn()
  }
}`,...(ee=(Z=k.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var te,ne,re;B.parameters={...B.parameters,docs:{...(te=B.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    defaultValue: [25, 75],
    min: 0,
    max: 100,
    step: 1,
    onValueChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A slider with dual handles for selecting a range.'
      }
    }
  }
}`,...(re=(ne=B.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};var oe,se,ae;K.parameters={...K.parameters,docs:{...(oe=K.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    defaultValue: [50],
    disabled: true,
    min: 0,
    max: 100,
    step: 1,
    onValueChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled slider that cannot be interacted with.'
      }
    }
  }
}`,...(ae=(se=K.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};var ie,le,de;O.parameters={...O.parameters,docs:{...(ie=O.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState([40]);
    const [value2, setValue2] = useState([20, 80]);
    return <div className="tw-w-80 tw-space-y-6">
        <div>
          <label htmlFor="single-slider" className="tw-mb-2 tw-block tw-text-sm tw-font-medium">
            Single Value
          </label>
          <Slider id="single-slider" value={value1} onValueChange={setValue1} max={100} step={1} />
          <div className="tw-mt-1 tw-text-sm tw-text-muted-foreground">Value: {value1[0]}</div>
        </div>
        <div>
          <label htmlFor="range-slider" className="tw-mb-2 tw-block tw-text-sm tw-font-medium">
            Range Selection
          </label>
          <Slider id="range-slider" value={value2} onValueChange={setValue2} max={100} step={1} />
          <div className="tw-mt-1 tw-text-sm tw-text-muted-foreground">
            Range: {value2[0]} - {value2[1]}
          </div>
        </div>
        <div>
          <label htmlFor="disabled-slider" className="tw-mb-2 tw-block tw-text-sm tw-font-medium">
            Disabled
          </label>
          <Slider id="disabled-slider" defaultValue={[50]} disabled max={100} step={1} />
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Different slider variants showing single value, range, and disabled states.'
      }
    }
  }
}`,...(de=(le=O.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ce,ue,me;F.parameters={...F.parameters,docs:{...(ce=F.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState([33]);
    const handleValueChange = (newValue: number[]) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };
    return <div className="tw-w-80 tw-space-y-4">
        <Slider {...args} value={value} onValueChange={handleValueChange} />
        <div className="tw-text-sm tw-text-muted-foreground">
          Current value: <code>{value[0]}</code>
        </div>
      </div>;
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    onValueChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive slider that shows the current value, similar to the original example.'
      }
    }
  }
}`,...(me=(ue=F.parameters)==null?void 0:ue.docs)==null?void 0:me.source}}};const Ct=["Default","Range","Disabled","Variants","Interactive"];export{k as Default,K as Disabled,F as Interactive,B as Range,O as Variants,Ct as __namedExportsOrder,Vt as default};
