import{j as t}from"./jsx-runtime-BqcUmbcY.js";import{B as R}from"./button-Dnbhqn_W.js";import{c as B}from"./index-BnuTq2W6.js";import{c as w}from"./utils-BPbySc-g.js";import{a as O}from"./iframe-0_n5iu45.js";import{R as F,L as P,T as U,C as D,V as m,a as T,b as a,c as s}from"./tabs-vertical-TOU7DJ4z.js";import"./index-lKSJLple.js";import"./preload-helper-CTOgD26E.js";import"./index-DPJuDtl-.js";import"./index-CASRnLr1.js";import"./index-BpKuf0Lh.js";import"./index-Du9Nlnyw.js";import"./index-C413clSy.js";import"./index-DvpclMEf.js";import"./index-DfvunXM4.js";import"./index-313O6W2q.js";import"./index-D1LsbgmM.js";import"./index-CdyQqmsD.js";import"./index-Dw9H-T5E.js";function o({className:e,orientation:n="horizontal",...h}){return t.jsx(F,{"data-slot":"tabs","data-orientation":n,className:w("tw:group/tabs tw:flex tw:gap-2 tw:data-horizontal:flex-col",e),...h})}const E=B("tw:group/tabs-list tw:inline-flex tw:w-fit tw:items-center tw:justify-center tw:rounded-lg tw:p-[3px] tw:text-muted-foreground tw:group-data-horizontal/tabs:h-8 tw:group-data-vertical/tabs:h-fit tw:group-data-vertical/tabs:flex-col tw:data-[variant=line]:rounded-none",{variants:{variant:{default:"tw:bg-muted",line:"tw:gap-1 tw:bg-transparent"}},defaultVariants:{variant:"default"}});function p({className:e,variant:n="default",...h}){const I=O();return t.jsx(P,{"data-slot":"tabs-list","data-variant":n,className:w("pr-twp",E({variant:n}),e),dir:I,...h})}function r({className:e,...n}){return t.jsx(U,{"data-slot":"tabs-trigger",className:w("pr-twp tw:relative tw:inline-flex tw:h-[calc(100%-1px)] tw:flex-1 tw:items-center tw:justify-center tw:gap-1.5 tw:rounded-md tw:border tw:border-transparent tw:px-1.5 tw:py-0.5 tw:text-sm tw:font-medium tw:whitespace-nowrap tw:text-foreground/60 tw:transition-all tw:group-data-vertical/tabs:w-full tw:group-data-vertical/tabs:justify-start tw:hover:text-foreground tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:focus-visible:outline-1 tw:focus-visible:outline-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:has-data-[icon=inline-end]:pe-1 tw:has-data-[icon=inline-start]:ps-1 tw:dark:text-muted-foreground tw:dark:hover:text-foreground tw:group-data-[variant=default]/tabs-list:data-active:shadow-sm tw:group-data-[variant=line]/tabs-list:data-active:shadow-none tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4","tw:group-data-[variant=line]/tabs-list:bg-transparent tw:group-data-[variant=line]/tabs-list:data-active:bg-transparent tw:dark:group-data-[variant=line]/tabs-list:data-active:border-transparent tw:dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent","tw:data-active:bg-background tw:data-active:text-foreground tw:dark:data-active:border-input tw:dark:data-active:bg-input/30 tw:dark:data-active:text-foreground","tw:after:absolute tw:after:bg-foreground tw:after:opacity-0 tw:after:transition-opacity tw:group-data-horizontal/tabs:after:inset-x-0 tw:group-data-horizontal/tabs:after:bottom-[-5px] tw:group-data-horizontal/tabs:after:h-0.5 tw:group-data-vertical/tabs:after:inset-y-0 tw:group-data-vertical/tabs:after:-end-1 tw:group-data-vertical/tabs:after:w-0.5 tw:group-data-[variant=line]/tabs-list:data-active:after:opacity-100",e),...n})}function i({className:e,...n}){return t.jsx(D,{"data-slot":"tabs-content",className:w("pr-twp tw:flex-1 tw:text-sm tw:outline-none",e),...n})}o.__docgenInfo={description:`Tabs components provide a set of layered sections of content—known as tab panels—that are
displayed one at a time. These components are built on Radix UI primitives and styled with Shadcn
UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/tabs}
@see Radix UI Documentation: {@link https://www.radix-ui.com/primitives/docs/components/tabs}`,methods:[],displayName:"Tabs",props:{orientation:{defaultValue:{value:"'horizontal'",computed:!1},required:!1}}};p.__docgenInfo={description:"@inheritdoc Tabs",methods:[],displayName:"TabsList",props:{variant:{defaultValue:{value:"'default'",computed:!1},required:!1}}};r.__docgenInfo={description:"@inheritdoc Tabs",methods:[],displayName:"TabsTrigger"};i.__docgenInfo={description:"@inheritdoc Tabs",methods:[],displayName:"TabsContent"};const ot={title:"Basics/Tabs",component:o,tags:["autodocs"],argTypes:{defaultValue:{control:"text"},orientation:{control:"select",options:["horizontal","vertical"]}}},l={render:()=>t.jsxs(o,{defaultValue:"tab1",children:[t.jsxs(p,{children:[t.jsx(r,{value:"tab1",children:"Tab 1"}),t.jsx(r,{value:"tab2",children:"Tab 2"}),t.jsx(r,{value:"tab3",children:"Tab 3"})]}),t.jsx(i,{value:"tab1",children:"Content for Tab 1"}),t.jsx(i,{value:"tab2",children:"Content for Tab 2"}),t.jsx(i,{value:"tab3",children:"Content for Tab 3"})]}),parameters:{docs:{description:{story:"Basic horizontal tabs with text content."}}}},c={render:()=>t.jsxs(m,{defaultValue:"tab1",children:[t.jsxs(T,{children:[t.jsx(a,{value:"tab1",children:"First Tab"}),t.jsx(a,{value:"tab2",children:"Second Tab"}),t.jsx(a,{value:"tab3",children:"Third Tab"})]}),t.jsx(s,{value:"tab1",children:t.jsxs("div",{className:"tw:p-4",children:[t.jsx("h3",{className:"tw:text-lg tw:font-semibold",children:"First Tab Content"}),t.jsx("p",{children:"This is the content for the first vertical tab."})]})}),t.jsx(s,{value:"tab2",children:t.jsxs("div",{className:"tw:p-4",children:[t.jsx("h3",{className:"tw:text-lg tw:font-semibold",children:"Second Tab Content"}),t.jsx("p",{children:"This is the content for the second vertical tab."})]})}),t.jsx(s,{value:"tab3",children:t.jsxs("div",{className:"tw:p-4",children:[t.jsx("h3",{className:"tw:text-lg tw:font-semibold",children:"Third Tab Content"}),t.jsx("p",{children:"This is the content for the third vertical tab."})]})})]}),parameters:{docs:{description:{story:"Vertical tabs with content panels."}}}},d={render:()=>t.jsxs(m,{defaultValue:"2-youShouldNotSeeThis",children:[t.jsxs(T,{children:[t.jsx(a,{value:"1",children:t.jsx(R,{children:"non-text tab trigger"})}),t.jsx(a,{value:"2-youShouldNotSeeThis",children:"Tab 2"}),t.jsx(a,{value:"3",children:"Tab 3"}),t.jsx(a,{value:"4",children:"Tab 4"})]}),t.jsx(s,{value:"1",children:"Tab 1 Content"}),t.jsx(s,{value:"2-youShouldNotSeeThis",children:t.jsxs("div",{children:["Tab 2 Content: Another set of vertical tabs without a default value",t.jsxs(m,{children:[t.jsxs(T,{children:[t.jsx(a,{value:"1",children:"Tab 2-1"}),t.jsx(a,{value:"2",children:"Tab 2-2"})]}),t.jsx(s,{value:"1",children:"Tab 2-1 Content"}),t.jsx(s,{value:"2",children:"Tab 2-2 Content"})]})]})}),t.jsx(s,{value:"3",children:"Tab 3 Content"}),t.jsx(s,{value:"4",children:"Tab 4 Content"})]}),parameters:{docs:{description:{story:"Nested vertical tabs with buttons and complex content, matching the original example."}}}},b={render:()=>t.jsxs(o,{defaultValue:"account",className:"tw:w-96",children:[t.jsxs(p,{className:"tw:grid tw:w-full tw:grid-cols-2",children:[t.jsx(r,{value:"account",children:"Account"}),t.jsx(r,{value:"password",children:"Password"})]}),t.jsxs(i,{value:"account",className:"tw:space-y-4",children:[t.jsxs("div",{className:"tw:space-y-2",children:[t.jsx("h3",{className:"tw:text-lg tw:font-medium",children:"Account Settings"}),t.jsx("p",{className:"tw:text-sm tw:text-muted-foreground",children:"Manage your account settings and preferences."})]}),t.jsxs("div",{className:"tw:space-y-2",children:[t.jsx("label",{className:"tw:text-sm tw:font-medium",children:"Username"}),t.jsx("input",{className:"tw:w-full tw:rounded-md tw:border tw:px-3 tw:py-2",placeholder:"Enter username"})]})]}),t.jsxs(i,{value:"password",className:"tw:space-y-4",children:[t.jsxs("div",{className:"tw:space-y-2",children:[t.jsx("h3",{className:"tw:text-lg tw:font-medium",children:"Password Settings"}),t.jsx("p",{className:"tw:text-sm tw:text-muted-foreground",children:"Change your password and security settings."})]}),t.jsxs("div",{className:"tw:space-y-2",children:[t.jsx("label",{className:"tw:text-sm tw:font-medium",children:"Current Password"}),t.jsx("input",{type:"password",className:"tw:w-full tw:rounded-md tw:border tw:px-3 tw:py-2"})]})]})]}),parameters:{docs:{description:{story:"Rich tabs with forms and detailed content."}}}},u={render:e=>t.jsxs(o,{...e,children:[t.jsxs(p,{children:[t.jsx(r,{value:"overview",children:"Overview"}),t.jsx(r,{value:"analytics",children:"Analytics"}),t.jsx(r,{value:"settings",children:"Settings"})]}),t.jsx(i,{value:"overview",children:t.jsxs("div",{className:"tw:p-4",children:[t.jsx("h3",{className:"tw:text-lg tw:font-semibold",children:"Overview"}),t.jsx("p",{children:"Overview content here."})]})}),t.jsx(i,{value:"analytics",children:t.jsxs("div",{className:"tw:p-4",children:[t.jsx("h3",{className:"tw:text-lg tw:font-semibold",children:"Analytics"}),t.jsx("p",{children:"Analytics content here."})]})}),t.jsx(i,{value:"settings",children:t.jsxs("div",{className:"tw:p-4",children:[t.jsx("h3",{className:"tw:text-lg tw:font-semibold",children:"Settings"}),t.jsx("p",{children:"Settings content here."})]})})]}),args:{defaultValue:"overview"},parameters:{docs:{description:{story:"Interactive tabs where you can experiment with properties using the controls."}}}};var g,v,x;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1</TabsContent>
      <TabsContent value="tab2">Content for Tab 2</TabsContent>
      <TabsContent value="tab3">Content for Tab 3</TabsContent>
    </Tabs>,
  parameters: {
    docs: {
      description: {
        story: 'Basic horizontal tabs with text content.'
      }
    }
  }
}`,...(x=(v=l.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var f,j,y;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <VerticalTabs defaultValue="tab1">
      <VerticalTabsList>
        <VerticalTabsTrigger value="tab1">First Tab</VerticalTabsTrigger>
        <VerticalTabsTrigger value="tab2">Second Tab</VerticalTabsTrigger>
        <VerticalTabsTrigger value="tab3">Third Tab</VerticalTabsTrigger>
      </VerticalTabsList>
      <VerticalTabsContent value="tab1">
        <div className="tw:p-4">
          <h3 className="tw:text-lg tw:font-semibold">First Tab Content</h3>
          <p>This is the content for the first vertical tab.</p>
        </div>
      </VerticalTabsContent>
      <VerticalTabsContent value="tab2">
        <div className="tw:p-4">
          <h3 className="tw:text-lg tw:font-semibold">Second Tab Content</h3>
          <p>This is the content for the second vertical tab.</p>
        </div>
      </VerticalTabsContent>
      <VerticalTabsContent value="tab3">
        <div className="tw:p-4">
          <h3 className="tw:text-lg tw:font-semibold">Third Tab Content</h3>
          <p>This is the content for the third vertical tab.</p>
        </div>
      </VerticalTabsContent>
    </VerticalTabs>,
  parameters: {
    docs: {
      description: {
        story: 'Vertical tabs with content panels.'
      }
    }
  }
}`,...(y=(j=c.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var N,V,C;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <VerticalTabs defaultValue="2-youShouldNotSeeThis">
      <VerticalTabsList>
        <VerticalTabsTrigger value="1">
          <Button>non-text tab trigger</Button>
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="2-youShouldNotSeeThis">Tab 2</VerticalTabsTrigger>
        <VerticalTabsTrigger value="3">Tab 3</VerticalTabsTrigger>
        <VerticalTabsTrigger value="4">Tab 4</VerticalTabsTrigger>
      </VerticalTabsList>
      <VerticalTabsContent value="1">Tab 1 Content</VerticalTabsContent>
      <VerticalTabsContent value="2-youShouldNotSeeThis">
        <div>
          Tab 2 Content: Another set of vertical tabs without a default value
          <VerticalTabs>
            <VerticalTabsList>
              <VerticalTabsTrigger value="1">Tab 2-1</VerticalTabsTrigger>
              <VerticalTabsTrigger value="2">Tab 2-2</VerticalTabsTrigger>
            </VerticalTabsList>
            <VerticalTabsContent value="1">Tab 2-1 Content</VerticalTabsContent>
            <VerticalTabsContent value="2">Tab 2-2 Content</VerticalTabsContent>
          </VerticalTabs>
        </div>
      </VerticalTabsContent>
      <VerticalTabsContent value="3">Tab 3 Content</VerticalTabsContent>
      <VerticalTabsContent value="4">Tab 4 Content</VerticalTabsContent>
    </VerticalTabs>,
  parameters: {
    docs: {
      description: {
        story: 'Nested vertical tabs with buttons and complex content, matching the original example.'
      }
    }
  }
}`,...(C=(V=d.parameters)==null?void 0:V.docs)==null?void 0:C.source}}};var S,L,_;b.parameters={...b.parameters,docs:{...(S=b.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <Tabs defaultValue="account" className="tw:w-96">
      <TabsList className="tw:grid tw:w-full tw:grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="tw:space-y-4">
        <div className="tw:space-y-2">
          <h3 className="tw:text-lg tw:font-medium">Account Settings</h3>
          <p className="tw:text-sm tw:text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <div className="tw:space-y-2">
          {/* Story uses a plain <label> without htmlFor; associating it would complicate the demo */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="tw:text-sm tw:font-medium">Username</label>
          <input className="tw:w-full tw:rounded-md tw:border tw:px-3 tw:py-2" placeholder="Enter username" />
        </div>
      </TabsContent>
      <TabsContent value="password" className="tw:space-y-4">
        <div className="tw:space-y-2">
          <h3 className="tw:text-lg tw:font-medium">Password Settings</h3>
          <p className="tw:text-sm tw:text-muted-foreground">
            Change your password and security settings.
          </p>
        </div>
        <div className="tw:space-y-2">
          {/* Story uses a plain <label> without htmlFor; associating it would complicate the demo */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="tw:text-sm tw:font-medium">Current Password</label>
          <input type="password" className="tw:w-full tw:rounded-md tw:border tw:px-3 tw:py-2" />
        </div>
      </TabsContent>
    </Tabs>,
  parameters: {
    docs: {
      description: {
        story: 'Rich tabs with forms and detailed content.'
      }
    }
  }
}`,...(_=(L=b.parameters)==null?void 0:L.docs)==null?void 0:_.source}}};var k,z,A;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="tw:p-4">
          <h3 className="tw:text-lg tw:font-semibold">Overview</h3>
          <p>Overview content here.</p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="tw:p-4">
          <h3 className="tw:text-lg tw:font-semibold">Analytics</h3>
          <p>Analytics content here.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="tw:p-4">
          <h3 className="tw:text-lg tw:font-semibold">Settings</h3>
          <p>Settings content here.</p>
        </div>
      </TabsContent>
    </Tabs>,
  args: {
    defaultValue: 'overview'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive tabs where you can experiment with properties using the controls.'
      }
    }
  }
}`,...(A=(z=u.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};const lt=["Default","Vertical","NestedVertical","Rich","Interactive"];export{l as Default,u as Interactive,d as NestedVertical,b as Rich,c as Vertical,lt as __namedExportsOrder,ot as default};
