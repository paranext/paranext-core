import{j as a}from"./iframe-D7KoA474.js";import{A as e,a as t,b as r}from"./avatar-1Oy8riAp.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./index-BYDUkm8N.js";import"./index-BKuimPlw.js";import"./index-LHbdIgeI.js";import"./index-C2LWIdbJ.js";import"./index-QBj_iDku.js";const q={title:"Shadcn/Avatar",component:e,tags:["autodocs"]},s={render:()=>a.jsxs(e,{children:[a.jsx(t,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),a.jsx(r,{children:"CN"})]}),parameters:{docs:{description:{story:"A basic avatar with an image and fallback text."}}}},c={render:()=>a.jsx(e,{children:a.jsx(r,{children:"JD"})}),parameters:{docs:{description:{story:"An avatar that shows only the fallback when no image is provided."}}}},n={render:()=>a.jsxs(e,{children:[a.jsx(t,{src:"https://broken-link.example/image.png",alt:"Broken image"}),a.jsx(r,{children:"BI"})]}),parameters:{docs:{description:{story:"An avatar with a broken image URL that falls back to initials."}}}},o={render:()=>a.jsxs("div",{className:"tw:flex tw:gap-4",children:[a.jsxs(e,{children:[a.jsx(t,{src:"https://github.com/vercel.png",alt:"@vercel"}),a.jsx(r,{children:"VC"})]}),a.jsxs(e,{children:[a.jsx(t,{src:"https://github.com/nextjs.png",alt:"@nextjs"}),a.jsx(r,{children:"NX"})]}),a.jsx(e,{children:a.jsx(r,{children:"AB"})})]}),parameters:{docs:{description:{story:"Multiple avatars showing different states and images."}}}},i={render:w=>a.jsxs(e,{...w,children:[a.jsx(t,{src:"https://github.com/shadcn.png",alt:"@shadcn"}),a.jsx(r,{children:"CN"})]}),parameters:{docs:{description:{story:"An interactive avatar where you can experiment with properties using the controls."}}}};var l,d,p;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(p=(d=s.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var m,h,v;c.parameters={...c.parameters,docs:{...(m=c.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(v=(h=c.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var g,A,u;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(u=(A=n.parameters)==null?void 0:A.docs)==null?void 0:u.source}}};var x,b,k;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div className="tw:flex tw:gap-4">
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
}`,...(k=(b=o.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};var f,j,y;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(y=(j=i.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};const J=["Default","WithoutImage","BrokenImage","Different","Interactive"];export{n as BrokenImage,s as Default,o as Different,i as Interactive,c as WithoutImage,J as __namedExportsOrder,q as default};
