import{j as n}from"./jsx-runtime-CoJcBlqr.js";import{r as f}from"./iframe-ChjBVkNN.js";import{C as T}from"./checkbox-CecyqPXS.js";import{S as j}from"./smart-label.component-4Y5b19_v.js";import{C as E,d as _}from"./card-D-ett0Sz.js";import{T as N}from"./theme-provider.component-DRoiPDtx.js";import"./index-CtW3L1xI.js";import"./index-uX5GIGLq.js";import"./index-ikrtYkS6.js";import"./index-DRtzzKqe.js";import"./index-DI1pkOJa.js";import"./index-CJGEWkUs.js";import"./index-a8-6909D.js";import"./index-DF789n87.js";import"./index-BfzcDxxY.js";import"./index-BWcRxFB8.js";import"./index-B3HFQzOn.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./check-DhWHefu6.js";import"./createLucideIcon-CVIRtPIF.js";import"./label-DboBKY13.js";import"./index-BPbCuWFR.js";function m({id:e,className:c,listItems:r,selectedListItems:l,handleSelectListItem:s,createLabel:i,createComplexLabel:a}){return n.jsx("div",{id:e,className:c,children:r.map(t=>n.jsxs("div",{className:"tw-m-2 tw-flex tw-items-center",children:[n.jsx(T,{className:"tw-me-2 tw-align-middle",checked:l.includes(t),onCheckedChange:o=>s(t,o)}),n.jsx(j,{item:t,createLabel:i,createComplexLabel:a})]},t))})}m.__docgenInfo={description:"Renders a list of checkboxes. Each checkbox corresponds to an item from the `listItems` array.",methods:[],displayName:"Checklist",props:{id:{required:!1,tsType:{name:"string"},description:"Optional string representing the id attribute of the Checklist"},className:{required:!1,tsType:{name:"string"},description:"Optional string representing CSS class name(s) for styling"},listItems:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Array of strings representing the checkable items"},selectedListItems:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Array of strings representing the checked items"},handleSelectListItem:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: string, selected: boolean) => void",signature:{arguments:[{type:{name:"string"},name:"item"},{type:{name:"boolean"},name:"selected"}],return:{name:"void"}}},description:`Function that is called when a checkbox item is selected or deselected

@param item The string description for this item
@param selected True if selected, false if not selected`},createLabel:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: string) => string",signature:{arguments:[{type:{name:"string"},name:"item"}],return:{name:"string"}}},description:`Optional function creates a label for a provided checkable item

@param item The item for which a label is to be created
@returns A string representing the label text for the checkbox associated with that item`},createComplexLabel:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: string) => ReactNode",signature:{arguments:[{type:{name:"string"},name:"item"}],return:{name:"ReactNode"}}},description:`Optional function creates a label for a provided checkable item

@param item The item for which a label is to be created, including text and any additional
  elements (e.g. links)
@returns A react node representing the label text and any additional elements (e.g. links) for
  the checkbox associated with that item`}}};const{fn:u}=__STORYBOOK_MODULE_TEST__,se={title:"Basics/Checklist",component:m,tags:["autodocs"],decorators:[e=>n.jsx(N,{children:n.jsx(e,{})})],argTypes:{handleSelectListItem:{action:"item selected"},listItems:{control:"object"},selectedListItems:{control:"object"}}},d={args:{listItems:["Item 1","Item 2","Item 3","Item 4"],selectedListItems:["Item 2"],handleSelectListItem:u()}},p={render:e=>{const[c,r]=f.useState(["Box B","Box E"]),l=(s,i)=>{var a;r(i?t=>[...t,s]:t=>t.filter(o=>o!==s)),(a=e.handleSelectListItem)==null||a.call(e,s,i)};return n.jsx(E,{children:n.jsx(_,{className:"tw-h-64 tw-w-full tw-overflow-auto tw-p-4",children:n.jsx(m,{...e,selectedListItems:c,handleSelectListItem:l})})})},args:{listItems:["Box A","Box B","Box C","Box D","Box E","Box F"],selectedListItems:["Box B","Box E"],handleSelectListItem:u()},parameters:{docs:{description:{story:"A checklist displayed inside a card container, similar to the original example."}}}},h={render:e=>{const[c,r]=f.useState([]),l=(s,i)=>{var a;r(i?t=>[...t,s]:t=>t.filter(o=>o!==s)),(a=e.handleSelectListItem)==null||a.call(e,s,i)};return n.jsx("div",{className:"tw-h-96 tw-w-80",children:n.jsx(m,{...e,selectedListItems:c,handleSelectListItem:l})})},args:{listItems:Array.from({length:20},(e,c)=>`Item ${c+1}`),selectedListItems:[],handleSelectListItem:u()},parameters:{docs:{description:{story:"A checklist with many items to demonstrate scrolling behavior."}}}},I={render:e=>{const[c,r]=f.useState(e.selectedListItems||[]),l=(s,i)=>{var a;r(i?t=>[...t,s]:t=>t.filter(o=>o!==s)),(a=e.handleSelectListItem)==null||a.call(e,s,i)};return n.jsx(m,{...e,selectedListItems:c,handleSelectListItem:l})},args:{listItems:["Apple","Banana","Cherry","Date","Elderberry"],selectedListItems:["Banana","Date"],handleSelectListItem:u()},parameters:{docs:{description:{story:"An interactive checklist where you can select and deselect items."}}}};var g,S,x;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    listItems: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    selectedListItems: ['Item 2'],
    handleSelectListItem: fn()
  }
}`,...(x=(S=d.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var y,L,w;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
        <CardContent className="tw-h-64 tw-w-full tw-overflow-auto tw-p-4">
          <Checklist {...args} selectedListItems={selectedItems} handleSelectListItem={handleSelect} />
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
        story: 'A checklist displayed inside a card container, similar to the original example.'
      }
    }
  }
}`,...(w=(L=p.parameters)==null?void 0:L.docs)==null?void 0:w.source}}};var B,b,C;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
    return <div className="tw-h-96 tw-w-80">
        <Checklist {...args} selectedListItems={selectedItems} handleSelectListItem={handleSelect} />
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
        story: 'A checklist with many items to demonstrate scrolling behavior.'
      }
    }
  }
}`,...(C=(b=h.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var v,k,A;I.parameters={...I.parameters,docs:{...(v=I.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
    return <Checklist {...args} selectedListItems={selectedItems} handleSelectListItem={handleSelect} />;
  },
  args: {
    listItems: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
    selectedListItems: ['Banana', 'Date'],
    handleSelectListItem: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive checklist where you can select and deselect items.'
      }
    }
  }
}`,...(A=(k=I.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};const ne=["Default","InCard","ManyItems","Interactive"];export{d as Default,p as InCard,I as Interactive,h as ManyItems,ne as __namedExportsOrder,se as default};
