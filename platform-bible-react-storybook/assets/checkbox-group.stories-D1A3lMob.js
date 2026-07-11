import{j as a,r as f}from"./iframe-BKOggoAO.js";import{C as j}from"./checkbox-Cgn0aGc_.js";import{S as E}from"./smart-label.component-DQOiPyTp.js";import{C as _,a as N}from"./card-DBSX511N.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./IconCheck-C_-6UjQE.js";import"./createReactComponent-B1Xl801K.js";import"./index-BwqOFUaJ.js";import"./index-96H_U_DX.js";import"./index-BN0fWOl8.js";import"./index-9NE6y8HQ.js";import"./index-BRyq3DSc.js";import"./index-CyA-yTcG.js";import"./index-dDO-xXGJ.js";import"./index-D6ZGOYzH.js";import"./label-CeXBM4NB.js";function T({id:e,className:c,listItems:n,selectedListItems:l,handleSelectListItem:s,createLabel:r,createComplexLabel:i}){return a.jsx("div",{id:e,className:c,children:n.map(t=>a.jsxs("div",{className:"tw:m-2 tw:flex tw:items-center",children:[a.jsx(j,{className:"tw:me-2 tw:align-middle",checked:l.includes(t),onCheckedChange:o=>s(t,o)}),a.jsx(E,{item:t,createLabel:r,createComplexLabel:i})]},t))})}const I=T;T.__docgenInfo={description:"Renders a list of checkboxes. Each checkbox corresponds to an item from the `listItems` array.\n\n@deprecated 2026-06-08 Use {@link CheckboxGroup} instead. `Checklist` is kept as the existing\n  export for backward compatibility and will be removed in a future release.",methods:[],displayName:"Checklist",props:{id:{required:!1,tsType:{name:"string"},description:"Optional string representing the id attribute of the Checklist"},className:{required:!1,tsType:{name:"string"},description:"Optional string representing CSS class name(s) for styling"},listItems:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Array of strings representing the checkable items"},selectedListItems:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Array of strings representing the checked items"},handleSelectListItem:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: string, selected: boolean) => void",signature:{arguments:[{type:{name:"string"},name:"item"},{type:{name:"boolean"},name:"selected"}],return:{name:"void"}}},description:`Function that is called when a checkbox item is selected or deselected

@param item The string description for this item
@param selected True if selected, false if not selected`},createLabel:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: string) => string",signature:{arguments:[{type:{name:"string"},name:"item"}],return:{name:"string"}}},description:`Optional function creates a label for a provided checkable item

@param item The item for which a label is to be created
@returns A string representing the label text for the checkbox associated with that item`},createComplexLabel:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: string) => ReactNode",signature:{arguments:[{type:{name:"string"},name:"item"}],return:{name:"ReactNode"}}},description:`Optional function creates a label for a provided checkable item

@param item The item for which a label is to be created, including text and any additional
  elements (e.g. links)
@returns A react node representing the label text and any additional elements (e.g. links) for
  the checkbox associated with that item`}}};const{fn:u}=__STORYBOOK_MODULE_TEST__,W={title:"Basics/CheckboxGroup",component:I,tags:["autodocs"],argTypes:{handleSelectListItem:{action:"item selected"},listItems:{control:"object"},selectedListItems:{control:"object"}}},m={args:{listItems:["Item 1","Item 2","Item 3","Item 4"],selectedListItems:["Item 2"],handleSelectListItem:u()}},d={render:e=>{const[c,n]=f.useState(["Box B","Box E"]),l=(s,r)=>{var i;n(r?t=>[...t,s]:t=>t.filter(o=>o!==s)),(i=e.handleSelectListItem)==null||i.call(e,s,r)};return a.jsx(_,{children:a.jsx(N,{className:"tw:h-64 tw:w-full tw:overflow-auto tw:p-4",children:a.jsx(I,{...e,selectedListItems:c,handleSelectListItem:l})})})},args:{listItems:["Box A","Box B","Box C","Box D","Box E","Box F"],selectedListItems:["Box B","Box E"],handleSelectListItem:u()},parameters:{docs:{description:{story:"A checkbox list displayed inside a card container, similar to the original example."}}}},p={render:e=>{const[c,n]=f.useState([]),l=(s,r)=>{var i;n(r?t=>[...t,s]:t=>t.filter(o=>o!==s)),(i=e.handleSelectListItem)==null||i.call(e,s,r)};return a.jsx("div",{className:"tw:h-96 tw:w-80",children:a.jsx(I,{...e,selectedListItems:c,handleSelectListItem:l})})},args:{listItems:Array.from({length:20},(e,c)=>`Item ${c+1}`),selectedListItems:[],handleSelectListItem:u()},parameters:{docs:{description:{story:"A checkbox list with many items to demonstrate scrolling behavior."}}}},h={render:e=>{const[c,n]=f.useState(e.selectedListItems||[]),l=(s,r)=>{var i;n(r?t=>[...t,s]:t=>t.filter(o=>o!==s)),(i=e.handleSelectListItem)==null||i.call(e,s,r)};return a.jsx(I,{...e,selectedListItems:c,handleSelectListItem:l})},args:{listItems:["Apple","Banana","Cherry","Date","Elderberry"],selectedListItems:["Banana","Date"],handleSelectListItem:u()},parameters:{docs:{description:{story:"An interactive checkbox list where you can select and deselect items."}}}};var g,x,S;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    listItems: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    selectedListItems: ['Item 2'],
    handleSelectListItem: fn()
  }
}`,...(S=(x=m.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var y,b,L;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => {
    const [selectedItems, setSelectedItems] = useState<string[]>(['Box B', 'Box E']);
    const handleSelect = (item: string, selected: boolean) => {
      if (selected) {
        setSelectedItems(prev => [...prev, item]);
      } else {
        setSelectedItems(prev => prev.filter(i => i !== item));
      }
      args.handleSelectListItem?.(item, selected);
    };
    return <Card>
        <CardContent className="tw:h-64 tw:w-full tw:overflow-auto tw:p-4">
          <CheckboxGroup {...args} selectedListItems={selectedItems} handleSelectListItem={handleSelect} />
        </CardContent>
      </Card>;
  },
  args: {
    listItems: ['Box A', 'Box B', 'Box C', 'Box D', 'Box E', 'Box F'],
    selectedListItems: ['Box B', 'Box E'],
    handleSelectListItem: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A checkbox list displayed inside a card container, similar to the original example.'
      }
    }
  }
}`,...(L=(b=d.parameters)==null?void 0:b.docs)==null?void 0:L.source}}};var w,C,k;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const handleSelect = (item: string, selected: boolean) => {
      if (selected) {
        setSelectedItems(prev => [...prev, item]);
      } else {
        setSelectedItems(prev => prev.filter(i => i !== item));
      }
      args.handleSelectListItem?.(item, selected);
    };
    return <div className="tw:h-96 tw:w-80">
        <CheckboxGroup {...args} selectedListItems={selectedItems} handleSelectListItem={handleSelect} />
      </div>;
  },
  args: {
    listItems: Array.from({
      length: 20
    }, (_, i) => \`Item \${i + 1}\`),
    selectedListItems: [],
    handleSelectListItem: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A checkbox list with many items to demonstrate scrolling behavior.'
      }
    }
  }
}`,...(k=(C=p.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var B,v,A;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => {
    const [selectedItems, setSelectedItems] = useState<string[]>(args.selectedListItems || []);
    const handleSelect = (item: string, selected: boolean) => {
      if (selected) {
        setSelectedItems(prev => [...prev, item]);
      } else {
        setSelectedItems(prev => prev.filter(i => i !== item));
      }
      args.handleSelectListItem?.(item, selected);
    };
    return <CheckboxGroup {...args} selectedListItems={selectedItems} handleSelectListItem={handleSelect} />;
  },
  args: {
    listItems: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
    selectedListItems: ['Banana', 'Date'],
    handleSelectListItem: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive checkbox list where you can select and deselect items.'
      }
    }
  }
}`,...(A=(v=h.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};const X=["Default","InCard","ManyItems","Interactive"];export{m as Default,d as InCard,h as Interactive,p as ManyItems,X as __namedExportsOrder,W as default};
