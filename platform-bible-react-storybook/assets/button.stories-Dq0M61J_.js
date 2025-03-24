import{j as g}from"./jsx-runtime-CkbJRe7C.js";import{R as K}from"./index-C3r0K7yt.js";import{S as W}from"./index-BI4MhQUN.js";import{a as $,c as F,T as G}from"./theme-provider.component-BdICX5pq.js";import"./_commonjsHelpers-COjnNjrF.js";const x=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,B=$,H=(e,r)=>t=>{var i;if((r==null?void 0:r.variants)==null)return B(e,t==null?void 0:t.class,t==null?void 0:t.className);const{variants:l,defaultVariants:a}=r,p=Object.keys(l).map(n=>{const o=t==null?void 0:t[n],d=a==null?void 0:a[n];if(o===null)return null;const s=x(o)||x(d);return l[n][s]}),y=t&&Object.entries(t).reduce((n,o)=>{let[d,s]=o;return s===void 0||(n[d]=s),n},{}),I=r==null||(i=r.compoundVariants)===null||i===void 0?void 0:i.reduce((n,o)=>{let{class:d,className:s,...U}=o;return Object.entries(U).every(A=>{let[b,w]=A;return Array.isArray(w)?w.includes({...a,...y}[b]):{...a,...y}[b]===w})?[...n,d,s]:n},[]);return B(e,p,I,t==null?void 0:t.class,t==null?void 0:t.className)},J=H("pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",{variants:{variant:{default:"tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",destructive:"tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",outline:"tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",secondary:"tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",ghost:"hover:tw-bg-accent hover:tw-text-accent-foreground",link:"tw-text-primary tw-underline-offset-4 hover:tw-underline"},size:{default:"tw-h-10 tw-px-4 tw-py-2",sm:"tw-h-9 tw-rounded-md tw-px-3",lg:"tw-h-11 tw-rounded-md tw-px-8",icon:"tw-h-10 tw-w-10"}},defaultVariants:{variant:"default",size:"default"}}),h=K.forwardRef(({className:e,variant:r,size:t,asChild:i=!1,...l},a)=>{const p=i?W:"button";return g.jsx(p,{className:F(J({variant:r,size:t,className:e})),ref:a,...l})});h.displayName="Button";h.__docgenInfo={description:`The Button component displays a button or a component that looks like a button. The component is
built and styled by Shadcn UI.

@param ButtonProps
@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/button}`,methods:[],displayName:"Button",props:{asChild:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}},composes:["VariantProps"]};const Z={title:"Shadcn/Button",component:h,tags:["autodocs"],argTypes:{variant:{options:["default","destructive","outline","secondary","ghost","link"],control:{type:"select"}},size:{options:["default","sm","lg","icon"],control:{type:"select"}},disabled:{control:"boolean"},className:{control:"text"}},decorators:[e=>g.jsx(G,{children:g.jsx(e,{})})]},u={args:{children:"Default Button",variant:"default",size:"default"}},c={args:{children:"Destructive Button",variant:"destructive"}},m={args:{children:"Outline Button",variant:"outline"}},v={args:{children:"Playground Button",variant:"default",size:"default"}},f={args:{children:"Disabled Button",disabled:!0}};var S,D,k;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    children: 'Default Button',
    variant: 'default',
    size: 'default'
  }
}`,...(k=(D=u.parameters)==null?void 0:D.docs)==null?void 0:k.source}}};var N,V,j;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    children: 'Destructive Button',
    variant: 'destructive'
  }
}`,...(j=(V=c.parameters)==null?void 0:V.docs)==null?void 0:j.source}}};var C,O,P;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'Outline Button',
    variant: 'outline'
  }
}`,...(P=(O=m.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var _,z,T;v.parameters={...v.parameters,docs:{...(_=v.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    children: 'Playground Button',
    variant: 'default',
    size: 'default'
  }
}`,...(T=(z=v.parameters)==null?void 0:z.docs)==null?void 0:T.source}}};var R,q,E;f.parameters={...f.parameters,docs:{...(R=f.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    children: 'Disabled Button',
    disabled: true
  }
}`,...(E=(q=f.parameters)==null?void 0:q.docs)==null?void 0:E.source}}};const tt=["Default","Destructive","Outline","Playground","Disabled"];export{u as Default,c as Destructive,f as Disabled,m as Outline,v as Playground,tt as __namedExportsOrder,Z as default};
