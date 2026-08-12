import{j as n}from"./iframe-B0QPoExt.js";import{B as o}from"./button-BZsSMpo1.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-uzc-mgJu.js";const{expect:t,fn:c}=__STORYBOOK_MODULE_TEST__,Ht={title:"Shadcn/Button",component:o,tags:["autodocs","test"],argTypes:{variant:{options:["default","destructive","outline","secondary","ghost","link","subtle"],control:{type:"select"}},size:{options:["default","sm","lg","icon"],control:{type:"select"}},disabled:{control:"boolean"},className:{control:"text"}}},l={args:{children:"Default Button",variant:"default",size:"default"}},d={render:a=>n.jsxs("div",{className:"tw:space-y-4",children:[n.jsx(o,{...a,children:a.children||"Click me!"}),n.jsx("p",{className:"tw:text-sm tw:text-gray-600",children:"Use the Code Editor tab to modify this button in real-time!"})]}),args:{children:"Editable Button",variant:"default"},parameters:{docs:{description:{story:"This story allows live code editing. Try changing the variant, size, or adding click handlers in the Code Editor panel."}}}},u={render:()=>n.jsxs("div",{className:"tw:flex tw:flex-wrap tw:gap-2",children:[n.jsx(o,{variant:"default",children:"Default"}),n.jsx(o,{variant:"destructive",children:"Destructive"}),n.jsx(o,{variant:"outline",children:"Outline"}),n.jsx(o,{variant:"secondary",children:"Secondary"}),n.jsx(o,{variant:"ghost",children:"Ghost"}),n.jsx(o,{variant:"link",children:"Link"}),n.jsx(o,{variant:"subtle",children:"Subtle"})]}),parameters:{docs:{description:{story:"All button variants displayed together. Try editing this code to add new variants or modify existing ones."}}}},m={render:()=>n.jsxs("div",{className:"tw:flex tw:flex-wrap tw:items-center tw:gap-4",children:[n.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[n.jsx("span",{className:"tw:text-sm",children:"default:"}),n.jsx(o,{size:"default",children:"Button"})]}),n.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[n.jsx("span",{className:"tw:text-sm",children:"sm:"}),n.jsx(o,{size:"sm",children:"Button"})]}),n.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[n.jsx("span",{className:"tw:text-sm",children:"lg:"}),n.jsx(o,{size:"lg",children:"Button"})]}),n.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[n.jsx("span",{className:"tw:text-sm",children:"icon:"}),n.jsx(o,{size:"icon",children:"★"})]})]}),parameters:{docs:{description:{story:"All button sizes displayed together."}}}},p={args:{children:"Destructive Button",variant:"destructive"}},v={args:{children:"Outline Button",variant:"outline"}},w={args:{children:"Secondary Button",variant:"secondary"}},b={args:{children:"Ghost Button",variant:"ghost"}},h={args:{children:"Link Button",variant:"link"}},g={args:{children:"Subtle Button",variant:"subtle"}},B={args:{children:"Disabled Button",disabled:!0}},y={args:{children:"Playground Button",variant:"default",size:"default"}},x={args:{children:"Click Me",variant:"default",onClick:c()},play:async({args:a,canvas:i,userEvent:s})=>{const e=i.getByRole("button",{name:/click me/i});await t(e).toBeInTheDocument(),await t(e).toBeVisible(),await s.click(e),await t(a.onClick).toHaveBeenCalled(),await t(a.onClick).toHaveBeenCalledTimes(1)}},f={args:{children:"Disabled Button",disabled:!0,onClick:c()},play:async({args:a,canvas:i})=>{const s=i.getByRole("button",{name:/disabled button/i});await t(s).toBeInTheDocument(),await t(s).toBeDisabled(),await t(a.onClick).not.toHaveBeenCalled()}},C={args:{children:"Variant Test",variant:"destructive",onClick:c()},play:async({args:a,canvas:i,userEvent:s})=>{const e=i.getByRole("button",{name:/variant test/i});await t(e).toBeInTheDocument(),await t(e).toHaveClass("tw:bg-destructive/10"),await s.click(e),await t(a.onClick).toHaveBeenCalledTimes(1),await s.hover(e),await t(e).toBeInTheDocument(),await s.unhover(e),await t(e).toBeInTheDocument()}},k={args:{children:"Size Test",size:"lg",onClick:c()},play:async({args:a,canvas:i,userEvent:s})=>{const e=i.getByRole("button",{name:/size test/i});await t(e).toBeInTheDocument(),await t(e).toHaveClass("tw:h-9"),await s.dblClick(e),await t(a.onClick).toHaveBeenCalledTimes(2),e.focus(),await t(e).toHaveFocus(),e.blur(),await t(e).not.toHaveFocus()}},T={args:{children:"Complex Test Button",variant:"default",onClick:c()},play:async({args:a,canvas:i,userEvent:s,step:e})=>{await e("Initial button verification",async()=>{const r=i.getByRole("button",{name:/complex test button/i});await t(r).toBeInTheDocument(),await t(r).toBeVisible(),await t(r).toBeEnabled()}),await e("Mouse interactions",async()=>{const r=i.getByRole("button",{name:/complex test button/i});await s.hover(r),await s.unhover(r),await s.click(r),await t(a.onClick).toHaveBeenCalledTimes(1)}),await e("Keyboard interactions",async()=>{const r=i.getByRole("button",{name:/complex test button/i});r.focus(),await t(r).toHaveFocus(),await s.keyboard("{Enter}"),await t(a.onClick).toHaveBeenCalledTimes(2),await s.keyboard(" "),await t(a.onClick).toHaveBeenCalledTimes(3)}),await e("Final verification",async()=>{const r=i.getByRole("button",{name:/complex test button/i});await t(r).toBeInTheDocument(),await t(a.onClick).toHaveBeenCalledTimes(3)})}};var D,S,z;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    children: 'Default Button',
    variant: 'default',
    size: 'default'
  }
}`,...(z=(S=l.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var H,j,E;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: args => <div className="tw:space-y-4">
      <Button {...args}>{args.children || 'Click me!'}</Button>
      <p className="tw:text-sm tw:text-gray-600">
        Use the Code Editor tab to modify this button in real-time!
      </p>
    </div>,
  args: {
    children: 'Editable Button',
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'This story allows live code editing. Try changing the variant, size, or adding click handlers in the Code Editor panel.'
      }
    }
  }
}`,...(E=(j=d.parameters)==null?void 0:j.docs)==null?void 0:E.source}}};var N,I,R;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="tw:flex tw:flex-wrap tw:gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="subtle">Subtle</Button>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together. Try editing this code to add new variants or modify existing ones.'
      }
    }
  }
}`,...(R=(I=u.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};var V,O,L;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-4">
      <div className="tw:flex tw:items-center tw:gap-2">
        <span className="tw:text-sm">default:</span>
        <Button size="default">Button</Button>
      </div>
      <div className="tw:flex tw:items-center tw:gap-2">
        <span className="tw:text-sm">sm:</span>
        <Button size="sm">Button</Button>
      </div>
      <div className="tw:flex tw:items-center tw:gap-2">
        <span className="tw:text-sm">lg:</span>
        <Button size="lg">Button</Button>
      </div>
      <div className="tw:flex tw:items-center tw:gap-2">
        <span className="tw:text-sm">icon:</span>
        <Button size="icon">★</Button>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together.'
      }
    }
  }
}`,...(L=(O=m.parameters)==null?void 0:O.docs)==null?void 0:L.source}}};var F,_,A;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    children: 'Destructive Button',
    variant: 'destructive'
  }
}`,...(A=(_=p.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var G,M,P;v.parameters={...v.parameters,docs:{...(G=v.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    children: 'Outline Button',
    variant: 'outline'
  }
}`,...(P=(M=v.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var K,U,q;w.parameters={...w.parameters,docs:{...(K=w.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
}`,...(q=(U=w.parameters)==null?void 0:U.docs)==null?void 0:q.source}}};var Y,J,Q;b.parameters={...b.parameters,docs:{...(Y=b.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
}`,...(Q=(J=b.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var W,X,Z;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    children: 'Link Button',
    variant: 'link'
  }
}`,...(Z=(X=h.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,tt,et;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    children: 'Subtle Button',
    variant: 'subtle'
  }
}`,...(et=(tt=g.parameters)==null?void 0:tt.docs)==null?void 0:et.source}}};var nt,at,st;B.parameters={...B.parameters,docs:{...(nt=B.parameters)==null?void 0:nt.docs,source:{originalSource:`{
  args: {
    children: 'Disabled Button',
    disabled: true
  }
}`,...(st=(at=B.parameters)==null?void 0:at.docs)==null?void 0:st.source}}};var ot,it,rt;y.parameters={...y.parameters,docs:{...(ot=y.parameters)==null?void 0:ot.docs,source:{originalSource:`{
  args: {
    children: 'Playground Button',
    variant: 'default',
    size: 'default'
  }
}`,...(rt=(it=y.parameters)==null?void 0:it.docs)==null?void 0:rt.source}}};var ct,lt,dt;x.parameters={...x.parameters,docs:{...(ct=x.parameters)==null?void 0:ct.docs,source:{originalSource:`{
  args: {
    children: 'Click Me',
    variant: 'default',
    onClick: fn()
  },
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    const button = canvas.getByRole('button', {
      name: /click me/i
    });

    // Verify button is rendered
    await expect(button).toBeInTheDocument();
    await expect(button).toBeVisible();

    // Click the button
    await userEvent.click(button);

    // Verify the onClick handler was called
    await expect(args.onClick).toHaveBeenCalled();
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }
}`,...(dt=(lt=x.parameters)==null?void 0:lt.docs)==null?void 0:dt.source}}};var ut,mt,pt;f.parameters={...f.parameters,docs:{...(ut=f.parameters)==null?void 0:ut.docs,source:{originalSource:`{
  args: {
    children: 'Disabled Button',
    disabled: true,
    onClick: fn()
  },
  play: async ({
    args,
    canvas
  }) => {
    const button = canvas.getByRole('button', {
      name: /disabled button/i
    });

    // Verify button is rendered and disabled
    await expect(button).toBeInTheDocument();
    await expect(button).toBeDisabled();

    // Verify the onClick handler was not called (disabled buttons don't trigger clicks)
    await expect(args.onClick).not.toHaveBeenCalled();
  }
}`,...(pt=(mt=f.parameters)==null?void 0:mt.docs)==null?void 0:pt.source}}};var vt,wt,bt;C.parameters={...C.parameters,docs:{...(vt=C.parameters)==null?void 0:vt.docs,source:{originalSource:`{
  args: {
    children: 'Variant Test',
    variant: 'destructive',
    onClick: fn()
  },
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    const button = canvas.getByRole('button', {
      name: /variant test/i
    });

    // Verify button is rendered with destructive variant styles
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass('tw:bg-destructive/10');

    // Test button interaction
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    // Test hover state by hovering over the button
    await userEvent.hover(button);
    await expect(button).toBeInTheDocument();

    // Test unhover
    await userEvent.unhover(button);
    await expect(button).toBeInTheDocument();
  }
}`,...(bt=(wt=C.parameters)==null?void 0:wt.docs)==null?void 0:bt.source}}};var ht,gt,Bt;k.parameters={...k.parameters,docs:{...(ht=k.parameters)==null?void 0:ht.docs,source:{originalSource:`{
  args: {
    children: 'Size Test',
    size: 'lg',
    onClick: fn()
  },
  play: async ({
    args,
    canvas,
    userEvent
  }) => {
    const button = canvas.getByRole('button', {
      name: /size test/i
    });

    // Verify button is rendered with large size styles
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass('tw:h-9'); // Large size class

    // Test double click
    await userEvent.dblClick(button);
    await expect(args.onClick).toHaveBeenCalledTimes(2);

    // Test focus and blur
    button.focus();
    await expect(button).toHaveFocus();
    button.blur();
    await expect(button).not.toHaveFocus();
  }
}`,...(Bt=(gt=k.parameters)==null?void 0:gt.docs)==null?void 0:Bt.source}}};var yt,xt,ft;T.parameters={...T.parameters,docs:{...(yt=T.parameters)==null?void 0:yt.docs,source:{originalSource:`{
  args: {
    children: 'Complex Test Button',
    variant: 'default',
    onClick: fn()
  },
  play: async ({
    args,
    canvas,
    userEvent,
    step
  }) => {
    await step('Initial button verification', async () => {
      const button = canvas.getByRole('button', {
        name: /complex test button/i
      });
      await expect(button).toBeInTheDocument();
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    });
    await step('Mouse interactions', async () => {
      const button = canvas.getByRole('button', {
        name: /complex test button/i
      });

      // Hover and unhover
      await userEvent.hover(button);
      await userEvent.unhover(button);

      // Single click
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
    await step('Keyboard interactions', async () => {
      const button = canvas.getByRole('button', {
        name: /complex test button/i
      });

      // Focus the button directly
      button.focus();
      await expect(button).toHaveFocus();

      // Activate via Enter key
      await userEvent.keyboard('{Enter}');
      await expect(args.onClick).toHaveBeenCalledTimes(2);

      // Activate via Space key
      await userEvent.keyboard(' ');
      await expect(args.onClick).toHaveBeenCalledTimes(3);
    });
    await step('Final verification', async () => {
      const button = canvas.getByRole('button', {
        name: /complex test button/i
      });
      await expect(button).toBeInTheDocument();
      await expect(args.onClick).toHaveBeenCalledTimes(3);
    });
  }
}`,...(ft=(xt=T.parameters)==null?void 0:xt.docs)==null?void 0:ft.source}}};const jt=["Default","LiveEditable","VariantsDemo","SizesDemo","Destructive","Outline","Secondary","Ghost","Link","Subtle","Disabled","Playground","ClickTest","DisabledTest","VariantTest","SizeTest","ComplexInteraction"];export{x as ClickTest,T as ComplexInteraction,l as Default,p as Destructive,B as Disabled,f as DisabledTest,b as Ghost,h as Link,d as LiveEditable,v as Outline,y as Playground,w as Secondary,k as SizeTest,m as SizesDemo,g as Subtle,C as VariantTest,u as VariantsDemo,jt as __namedExportsOrder,Ht as default};
