import{j as t}from"./iframe-BnpM0RD1.js";import{B as o}from"./button-CjbDUbLn.js";import{I as Dt}from"./input-DE9fwzU1.js";import{X as Nt}from"./x-DwzwfExV.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-B09mT-Im.js";import"./createLucideIcon-CrjWBKyY.js";const{expect:e,fn:c}=__STORYBOOK_MODULE_TEST__,Ft={title:"Shadcn/Button",component:o,tags:["autodocs","test"],argTypes:{variant:{options:["default","destructive","outline","secondary","ghost","link","subtle"],control:{type:"select"}},size:{options:["default","sm","lg","icon"],control:{type:"select"}},disabled:{control:"boolean"},className:{control:"text"}}},l={args:{children:"Default Button",variant:"default",size:"default"}},d={render:n=>t.jsxs("div",{className:"tw:space-y-4",children:[t.jsx(o,{...n,children:n.children||"Click me!"}),t.jsx("p",{className:"tw:text-sm tw:text-gray-600",children:"Use the Code Editor tab to modify this button in real-time!"})]}),args:{children:"Editable Button",variant:"default"},parameters:{docs:{description:{story:"This story allows live code editing. Try changing the variant, size, or adding click handlers in the Code Editor panel."}}}},u={render:()=>t.jsxs("div",{className:"tw:flex tw:flex-wrap tw:gap-2",children:[t.jsx(o,{variant:"default",children:"Default"}),t.jsx(o,{variant:"destructive",children:"Destructive"}),t.jsx(o,{variant:"outline",children:"Outline"}),t.jsx(o,{variant:"secondary",children:"Secondary"}),t.jsx(o,{variant:"ghost",children:"Ghost"}),t.jsx(o,{variant:"link",children:"Link"}),t.jsx(o,{variant:"subtle",children:"Subtle"})]}),parameters:{docs:{description:{story:"All button variants displayed together. Try editing this code to add new variants or modify existing ones."}}}},m={render:()=>t.jsxs("div",{className:"tw:flex tw:flex-wrap tw:items-center tw:gap-4",children:[t.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[t.jsx("span",{className:"tw:text-sm",children:"default:"}),t.jsx(o,{size:"default",children:"Button"})]}),t.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[t.jsx("span",{className:"tw:text-sm",children:"sm:"}),t.jsx(o,{size:"sm",children:"Button"})]}),t.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[t.jsx("span",{className:"tw:text-sm",children:"lg:"}),t.jsx(o,{size:"lg",children:"Button"})]}),t.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[t.jsx("span",{className:"tw:text-sm",children:"icon:"}),t.jsx(o,{size:"icon",children:"★"})]})]}),parameters:{docs:{description:{story:"All button sizes displayed together."}}}},p={args:{children:"Destructive Button",variant:"destructive"}},w={args:{children:"Outline Button",variant:"outline"}},v={args:{children:"Secondary Button",variant:"secondary"}},b={args:{children:"Ghost Button",variant:"ghost"}},h={args:{children:"Link Button",variant:"link"}},g={args:{children:"Subtle Button",variant:"subtle"}},y={args:{children:"Disabled Button",disabled:!0}},B={args:{children:"Playground Button",variant:"default",size:"default"}},x={args:{children:"Click Me",variant:"default",onClick:c()},play:async({args:n,canvas:r,userEvent:s})=>{const a=r.getByRole("button",{name:/click me/i});await e(a).toBeInTheDocument(),await e(a).toBeVisible(),await s.click(a),await e(n.onClick).toHaveBeenCalled(),await e(n.onClick).toHaveBeenCalledTimes(1)}},f={args:{children:"Disabled Button",disabled:!0,onClick:c()},play:async({args:n,canvas:r})=>{const s=r.getByRole("button",{name:/disabled button/i});await e(s).toBeInTheDocument(),await e(s).toBeDisabled(),await e(n.onClick).not.toHaveBeenCalled()}},C={args:{children:"Variant Test",variant:"destructive",onClick:c()},play:async({args:n,canvas:r,userEvent:s})=>{const a=r.getByRole("button",{name:/variant test/i});await e(a).toBeInTheDocument(),await e(a).toHaveClass("tw:bg-destructive/10"),await s.click(a),await e(n.onClick).toHaveBeenCalledTimes(1),await s.hover(a),await e(a).toBeInTheDocument(),await s.unhover(a),await e(a).toBeInTheDocument()}},k={args:{children:"Size Test",size:"lg",onClick:c()},play:async({args:n,canvas:r,userEvent:s})=>{const a=r.getByRole("button",{name:/size test/i});await e(a).toBeInTheDocument(),await e(a).toHaveClass("tw:h-9"),await s.dblClick(a),await e(n.onClick).toHaveBeenCalledTimes(2),a.focus(),await e(a).toHaveFocus(),a.blur(),await e(a).not.toHaveFocus()}},T={args:{children:"Complex Test Button",variant:"default",onClick:c()},play:async({args:n,canvas:r,userEvent:s,step:a})=>{await a("Initial button verification",async()=>{const i=r.getByRole("button",{name:/complex test button/i});await e(i).toBeInTheDocument(),await e(i).toBeVisible(),await e(i).toBeEnabled()}),await a("Mouse interactions",async()=>{const i=r.getByRole("button",{name:/complex test button/i});await s.hover(i),await s.unhover(i),await s.click(i),await e(n.onClick).toHaveBeenCalledTimes(1)}),await a("Keyboard interactions",async()=>{const i=r.getByRole("button",{name:/complex test button/i});i.focus(),await e(i).toHaveFocus(),await s.keyboard("{Enter}"),await e(n.onClick).toHaveBeenCalledTimes(2),await s.keyboard(" "),await e(n.onClick).toHaveBeenCalledTimes(3)}),await a("Final verification",async()=>{const i=r.getByRole("button",{name:/complex test button/i});await e(i).toBeInTheDocument(),await e(n.onClick).toHaveBeenCalledTimes(3)})}},S={render:()=>t.jsxs("div",{className:"tw:relative tw:w-64",children:[t.jsx(Dt,{"aria-label":"Search",className:"tw:w-full tw:ps-2 tw:pe-8",defaultValue:"Search term"}),t.jsx(o,{"aria-label":"Clear search",className:"tw:absolute tw:end-1 tw:top-1/2 tw:-translate-y-1/2",onClick:c(),size:"icon-xs",variant:"ghost",children:t.jsx(Nt,{})})]}),parameters:{docs:{description:{story:"Hold the clear button down: it should nudge 1px and stay vertically centered. Centering it with `tw:-translate-y-1/2` is one common way to place an icon button inside an input, and it is the case the pressed-state nudge used to break."}}}};var D,N,j;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    children: 'Default Button',
    variant: 'default',
    size: 'default'
  }
}`,...(j=(N=l.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var z,H,E;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(E=(H=d.parameters)==null?void 0:H.docs)==null?void 0:E.source}}};var I,R,V;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(V=(R=u.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};var O,L,F;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(F=(L=m.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};var _,A,G;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    children: 'Destructive Button',
    variant: 'destructive'
  }
}`,...(G=(A=p.parameters)==null?void 0:A.docs)==null?void 0:G.source}}};var P,M,K;w.parameters={...w.parameters,docs:{...(P=w.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    children: 'Outline Button',
    variant: 'outline'
  }
}`,...(K=(M=w.parameters)==null?void 0:M.docs)==null?void 0:K.source}}};var U,q,W;v.parameters={...v.parameters,docs:{...(U=v.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
}`,...(W=(q=v.parameters)==null?void 0:q.docs)==null?void 0:W.source}}};var X,Y,J;b.parameters={...b.parameters,docs:{...(X=b.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
}`,...(J=(Y=b.parameters)==null?void 0:Y.docs)==null?void 0:J.source}}};var Q,Z,$;h.parameters={...h.parameters,docs:{...(Q=h.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    children: 'Link Button',
    variant: 'link'
  }
}`,...($=(Z=h.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var tt,et,at;g.parameters={...g.parameters,docs:{...(tt=g.parameters)==null?void 0:tt.docs,source:{originalSource:`{
  args: {
    children: 'Subtle Button',
    variant: 'subtle'
  }
}`,...(at=(et=g.parameters)==null?void 0:et.docs)==null?void 0:at.source}}};var nt,st,ot;y.parameters={...y.parameters,docs:{...(nt=y.parameters)==null?void 0:nt.docs,source:{originalSource:`{
  args: {
    children: 'Disabled Button',
    disabled: true
  }
}`,...(ot=(st=y.parameters)==null?void 0:st.docs)==null?void 0:ot.source}}};var rt,it,ct;B.parameters={...B.parameters,docs:{...(rt=B.parameters)==null?void 0:rt.docs,source:{originalSource:`{
  args: {
    children: 'Playground Button',
    variant: 'default',
    size: 'default'
  }
}`,...(ct=(it=B.parameters)==null?void 0:it.docs)==null?void 0:ct.source}}};var lt,dt,ut;x.parameters={...x.parameters,docs:{...(lt=x.parameters)==null?void 0:lt.docs,source:{originalSource:`{
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
}`,...(ut=(dt=x.parameters)==null?void 0:dt.docs)==null?void 0:ut.source}}};var mt,pt,wt;f.parameters={...f.parameters,docs:{...(mt=f.parameters)==null?void 0:mt.docs,source:{originalSource:`{
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
}`,...(wt=(pt=f.parameters)==null?void 0:pt.docs)==null?void 0:wt.source}}};var vt,bt,ht;C.parameters={...C.parameters,docs:{...(vt=C.parameters)==null?void 0:vt.docs,source:{originalSource:`{
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
}`,...(ht=(bt=C.parameters)==null?void 0:bt.docs)==null?void 0:ht.source}}};var gt,yt,Bt;k.parameters={...k.parameters,docs:{...(gt=k.parameters)==null?void 0:gt.docs,source:{originalSource:`{
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
}`,...(Bt=(yt=k.parameters)==null?void 0:yt.docs)==null?void 0:Bt.source}}};var xt,ft,Ct;T.parameters={...T.parameters,docs:{...(xt=T.parameters)==null?void 0:xt.docs,source:{originalSource:`{
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
}`,...(Ct=(ft=T.parameters)==null?void 0:ft.docs)==null?void 0:Ct.source}}};var kt,Tt,St;S.parameters={...S.parameters,docs:{...(kt=S.parameters)==null?void 0:kt.docs,source:{originalSource:`{
  render: () => <div className="tw:relative tw:w-64">
      <Input aria-label="Search" className="tw:w-full tw:ps-2 tw:pe-8" defaultValue="Search term" />
      <Button aria-label="Clear search" className="tw:absolute tw:end-1 tw:top-1/2 tw:-translate-y-1/2" onClick={fn()} size="icon-xs" variant="ghost">
        <X />
      </Button>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Hold the clear button down: it should nudge 1px and stay vertically centered. Centering it with \`tw:-translate-y-1/2\` is one common way to place an icon button inside an input, and it is the case the pressed-state nudge used to break.'
      }
    }
  }
}`,...(St=(Tt=S.parameters)==null?void 0:Tt.docs)==null?void 0:St.source}}};const _t=["Default","LiveEditable","VariantsDemo","SizesDemo","Destructive","Outline","Secondary","Ghost","Link","Subtle","Disabled","Playground","ClickTest","DisabledTest","VariantTest","SizeTest","ComplexInteraction","PressNudgeWithCallerTranslate"];export{x as ClickTest,T as ComplexInteraction,l as Default,p as Destructive,y as Disabled,f as DisabledTest,b as Ghost,h as Link,d as LiveEditable,w as Outline,B as Playground,S as PressNudgeWithCallerTranslate,v as Secondary,k as SizeTest,m as SizesDemo,g as Subtle,C as VariantTest,u as VariantsDemo,_t as __namedExportsOrder,Ft as default};
