import{j as a}from"./jsx-runtime-BqcUmbcY.js";import{r as f}from"./iframe-oaSdyu94.js";import{C as T}from"./checkbox-D2lPisdJ.js";import{S as j}from"./smart-label.component-DzNaU2t-.js";import{C as E,d as _}from"./card-wUL_y_tt.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./IconCheck-OgjABSMz.js";import"./createReactComponent-ScSJC5Xc.js";import"./index-BlNexVmn.js";import"./index-D-MCYtfy.js";import"./index-DdJKDonB.js";import"./index-BFB5idcO.js";import"./index-BDsVdyxx.js";import"./index-1FfjU1_c.js";import"./index-_dumRM7I.js";import"./index-Q0QDavV7.js";import"./index-ym48Zy-e.js";import"./index-DORKhY_Q.js";import"./label-BgCRyCOp.js";function m({id:e,className:c,listItems:n,selectedListItems:l,handleSelectListItem:s,createLabel:r,createComplexLabel:i}){return a.jsx("div",{id:e,className:c,children:n.map(t=>a.jsxs("div",{className:"tw:m-2 tw:flex tw:items-center",children:[a.jsx(T,{className:"tw:me-2 tw:align-middle",checked:l.includes(t),onCheckedChange:o=>s(t,o)}),a.jsx(j,{item:t,createLabel:r,createComplexLabel:i})]},t))})}m.__docgenInfo={description:"Renders a list of checkboxes. Each checkbox corresponds to an item from the `listItems` array.",methods:[],displayName:"Checklist",props:{id:{required:!1,tsType:{name:"string"},description:"Optional string representing the id attribute of the Checklist"},className:{required:!1,tsType:{name:"string"},description:"Optional string representing CSS class name(s) for styling"},listItems:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Array of strings representing the checkable items"},selectedListItems:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Array of strings representing the checked items"},handleSelectListItem:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: string, selected: boolean) => void",signature:{arguments:[{type:{name:"string"},name:"item"},{type:{name:"boolean"},name:"selected"}],return:{name:"void"}}},description:`Function that is called when a checkbox item is selected or deselected

@param item The string description for this item
@param selected True if selected, false if not selected`},createLabel:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: string) => string",signature:{arguments:[{type:{name:"string"},name:"item"}],return:{name:"string"}}},description:`Optional function creates a label for a provided checkable item

@param item The item for which a label is to be created
@returns A string representing the label text for the checkbox associated with that item`},createComplexLabel:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: string) => ReactNode",signature:{arguments:[{type:{name:"string"},name:"item"}],return:{name:"ReactNode"}}},description:`Optional function creates a label for a provided checkable item

@param item The item for which a label is to be created, including text and any additional
  elements (e.g. links)
@returns A react node representing the label text and any additional elements (e.g. links) for
  the checkbox associated with that item`}}};const{fn:u}=__STORYBOOK_MODULE_TEST__,Z={title:"Basics/Checklist",component:m,tags:["autodocs"],argTypes:{handleSelectListItem:{action:"item selected"},listItems:{control:"object"},selectedListItems:{control:"object"}}},d={args:{listItems:["Item 1","Item 2","Item 3","Item 4"],selectedListItems:["Item 2"],handleSelectListItem:u()}},p={render:e=>{const[c,n]=f.useState(["Box B","Box E"]),l=(s,r)=>{var i;n(r?t=>[...t,s]:t=>t.filter(o=>o!==s)),(i=e.handleSelectListItem)==null||i.call(e,s,r)};return a.jsx(E,{children:a.jsx(_,{className:"tw:h-64 tw:w-full tw:overflow-auto tw:p-4",children:a.jsx(m,{...e,selectedListItems:c,handleSelectListItem:l})})})},args:{listItems:["Box A","Box B","Box C","Box D","Box E","Box F"],selectedListItems:["Box B","Box E"],handleSelectListItem:u()},parameters:{docs:{description:{story:"A checklist displayed inside a card container, similar to the original example."}}}},h={render:e=>{const[c,n]=f.useState([]),l=(s,r)=>{var i;n(r?t=>[...t,s]:t=>t.filter(o=>o!==s)),(i=e.handleSelectListItem)==null||i.call(e,s,r)};return a.jsx("div",{className:"tw:h-96 tw:w-80",children:a.jsx(m,{...e,selectedListItems:c,handleSelectListItem:l})})},args:{listItems:Array.from({length:20},(e,c)=>`Item ${c+1}`),selectedListItems:[],handleSelectListItem:u()},parameters:{docs:{description:{story:"A checklist with many items to demonstrate scrolling behavior."}}}},I={render:e=>{const[c,n]=f.useState(e.selectedListItems||[]),l=(s,r)=>{var i;n(r?t=>[...t,s]:t=>t.filter(o=>o!==s)),(i=e.handleSelectListItem)==null||i.call(e,s,r)};return a.jsx(m,{...e,selectedListItems:c,handleSelectListItem:l})},args:{listItems:["Apple","Banana","Cherry","Date","Elderberry"],selectedListItems:["Banana","Date"],handleSelectListItem:u()},parameters:{docs:{description:{story:"An interactive checklist where you can select and deselect items."}}}};var g,S,y;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    listItems: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    selectedListItems: ['Item 2'],
    handleSelectListItem: fn()
  }
}`,...(y=(S=d.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var x,L,w;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
    return <div className="tw:h-96 tw:w-80">
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
}`,...(A=(k=I.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};const ee=["Default","InCard","ManyItems","Interactive"];export{d as Default,p as InCard,I as Interactive,h as ManyItems,ee as __namedExportsOrder,Z as default};
