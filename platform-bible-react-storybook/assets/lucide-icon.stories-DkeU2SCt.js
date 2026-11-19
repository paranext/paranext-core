import{j as e}from"./iframe-BF0oAZsm.js";import{a as x,L as f}from"./lucide-icon.component-DiR-048I.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./createLucideIcon-Cd5TFffm.js";import"./circle-check-big-C8Db35mU.js";import"./message-square-CshoSCM9.js";import"./search-CTz4AEeP.js";import"./book-open-fhKngcey.js";import"./square-x-A1Cpml9n.js";import"./file-text-BaRkMKpc.js";import"./eye-B7aA1wTO.js";import"./pencil-DejOn9d9.js";import"./external-link-DXXDSIEA.js";import"./circle-question-mark-CyPlxiW_.js";import"./settings-B98OW7jf.js";import"./house-CajRYguC.js";const B={title:"Basics/LucideIcon",component:f,tags:["autodocs"],parameters:{docs:{description:{component:`
**Experimental.** Renders one of a curated set of lucide icons by its kebab-case name. The icon
strokes with the current text colour, so it follows the theme and the state of its surroundings.
A name outside the curated set renders nothing.
        `}}},argTypes:{name:{control:"select",options:x},className:{control:"text"}}},t={args:{name:"search"}},r={args:{name:"not-a-real-icon"},parameters:{docs:{description:{story:"A name outside the curated set renders nothing."}}}},s={args:{name:"book",className:"tw:h-8 tw:w-8 tw:text-primary"},parameters:{docs:{description:{story:"`className` is appended to the default 16px size, so it can resize or recolour."}}}},a={render:()=>e.jsx("div",{className:"tw:grid tw:grid-cols-4 tw:gap-4",children:x.map(o=>e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[e.jsx(f,{name:o}),e.jsx("span",{className:"tw:text-sm",children:o})]},o))}),parameters:{docs:{description:{story:"Every icon in the curated set, with its name."}}}};var n,c,i;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    name: 'search'
  }
}`,...(i=(c=t.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var m,d,p;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    name: 'not-a-real-icon'
  },
  parameters: {
    docs: {
      description: {
        story: 'A name outside the curated set renders nothing.'
      }
    }
  }
}`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var l,u,h;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    name: 'book',
    className: 'tw:h-8 tw:w-8 tw:text-primary'
  },
  parameters: {
    docs: {
      description: {
        story: '\`className\` is appended to the default 16px size, so it can resize or recolour.'
      }
    }
  }
}`,...(h=(u=s.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var w,g,N;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div className="tw:grid tw:grid-cols-4 tw:gap-4">
      {LUCIDE_ICON_NAMES.map(name => <div key={name} className="tw:flex tw:items-center tw:gap-2">
          <LucideIcon name={name} />
          <span className="tw:text-sm">{name}</span>
        </div>)}
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Every icon in the curated set, with its name.'
      }
    }
  }
}`,...(N=(g=a.parameters)==null?void 0:g.docs)==null?void 0:N.source}}};const D=["KnownName","UnknownName","ClassNameOverride","AllIcons"];export{a as AllIcons,s as ClassNameOverride,t as KnownName,r as UnknownName,D as __namedExportsOrder,B as default};
