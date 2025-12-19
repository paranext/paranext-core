import{j as a}from"./jsx-runtime-DkZffS7G.js";import{A as e,a as t,b as r}from"./avatar-CPfZvs_t.js";import{T as F}from"./theme-provider.component-CLayh_EF.js";import"./iframe-BOdkGgb4.js";import"./index-Bv4A9Uov.js";import"./index-WJpgKkg-.js";import"./index-BoWhEbbY.js";import"./index-xra8YWXu.js";import"./index-CrEK2TMc.js";import"./index-DmDjGDmO.js";import"./index-DxTEeOx6.js";import"./index-DljIFHvA.js";import"./shadcn-ui.util-DMJ19wEV.js";const U={title:"Shadcn/Avatar",component:e,tags:["autodocs"],decorators:[l=>a.jsx(F,{children:a.jsx(l,{})})]},s={render:()=>a.jsxs(e,{children:[a.jsx(t,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),a.jsx(r,{children:"CN"})]}),parameters:{docs:{description:{story:"A basic avatar with an image and fallback text."}}}},c={render:()=>a.jsx(e,{children:a.jsx(r,{children:"JD"})}),parameters:{docs:{description:{story:"An avatar that shows only the fallback when no image is provided."}}}},n={render:()=>a.jsxs(e,{children:[a.jsx(t,{src:"https://broken-link.example/image.png",alt:"Broken image"}),a.jsx(r,{children:"BI"})]}),parameters:{docs:{description:{story:"An avatar with a broken image URL that falls back to initials."}}}},o={render:()=>a.jsxs("div",{className:"tw-flex tw-gap-4",children:[a.jsxs(e,{children:[a.jsx(t,{src:"https://github.com/vercel.png",alt:"@vercel"}),a.jsx(r,{children:"VC"})]}),a.jsxs(e,{children:[a.jsx(t,{src:"https://github.com/nextjs.png",alt:"@nextjs"}),a.jsx(r,{children:"NX"})]}),a.jsx(e,{children:a.jsx(r,{children:"AB"})})]}),parameters:{docs:{description:{story:"Multiple avatars showing different states and images."}}}},i={render:l=>a.jsxs(e,{...l,children:[a.jsx(t,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),a.jsx(r,{children:"CN"})]}),parameters:{docs:{description:{story:"An interactive avatar where you can experiment with properties using the controls."}}}};var d,p,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var h,v,g;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(g=(v=c.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var A,u,x;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(x=(u=n.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var b,k,f;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(f=(k=o.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};var j,y,w;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(w=(y=i.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};const V=["Default","WithoutImage","BrokenImage","Different","Interactive"];export{n as BrokenImage,s as Default,o as Different,i as Interactive,c as WithoutImage,V as __namedExportsOrder,U as default};
