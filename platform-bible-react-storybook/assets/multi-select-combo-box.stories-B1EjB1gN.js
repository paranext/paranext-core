import{j as e}from"./jsx-runtime-CvGToidP.js";import{M as l,B as p}from"./multi-select-combo-box.component-ChguH6Cn.js";import{r as u}from"./iframe-FHgAwj54.js";import{T as z}from"./theme-provider.component-BRfsG9zC.js";import"./createLucideIcon-B4WsWZHQ.js";import"./button-cud2eTA2.js";import"./index-C6LUVuya.js";import"./index-D-wbo5Oc.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./command-D3tc6HP1.js";import"./index-DGcOpdI4.js";import"./index-Cb3YhHOz.js";import"./index-DMIDenWg.js";import"./index-DvVrmaIy.js";import"./index-gPdjwkel.js";import"./index-CgTHgj0j.js";import"./index-BJ-VzaQi.js";import"./index-DmQmB0x9.js";import"./index-desAK0Z_.js";import"./index-DLzBYexm.js";import"./Combination-CMZlQmZK.js";import"./index-8o_pfAlr.js";import"./index-np2ZhOVR.js";import"./dialog-C1cDbYMW.js";import"./x-CFBWqveS.js";import"./search-DYGW0Xl3.js";import"./popover-CevumqeB.js";import"./index-CBoFXSy3.js";import"./floating-ui.react-dom-DDxLfT8M.js";import"./index-BXuT3Sj2.js";import"./index-DYbRprcN.js";import"./chevrons-up-down-PdOvZfnq.js";import"./check-Ce2iVscw.js";import"./star-CqQsKU_h.js";const C=[{id:1,name:"Byzantine Text 1904",language:"Ancient Greek (to 1453)",type:"source-language-texts",size:"4 MB",installed:!0},{id:2,name:"Septuaginta 2006",language:"Ancient Greek (to 1453)",type:"source-language-texts",size:"8 MB",installed:!1},{id:3,name:"Hebrew Bible",language:"Hebrew",type:"source-language-texts",size:"12 MB",installed:!1},{id:4,name:"Strong's Dictionary",language:"English",type:"dictionaries",size:"15 MB",installed:!1},{id:5,name:"Translation Notes",language:"English",type:"consultant-notes",size:"2 MB",installed:!1},{id:6,name:"Latin Vulgate",language:"Latin",type:"resources",size:"6 MB",installed:!1},{id:7,name:"English Standard Version",language:"English",type:"resources",size:"10 MB",installed:!1},{id:8,name:"King James Version",language:"English",type:"resources",size:"9 MB",installed:!1},{id:9,name:"New International Version",language:"English",type:"resources",size:"11 MB",installed:!1},{id:10,name:"Reina Valera 1960",language:"Spanish",type:"resources",size:"8 MB",installed:!1},{id:11,name:"Luther Bible",language:"German",type:"resources",size:"7.5 MB",installed:!1},{id:12,name:"Nova Vulgata",language:"Latin",type:"resources",size:"6.8 MB",installed:!1},{id:50,name:"Traducción en lenguaje actual",language:"Spanish",type:"resources",size:"5.9 MB",installed:!1}],a=t=>(C.filter(r=>r.type===t).length??0).toString(),o=[{value:"resources",secondaryLabel:a("resources"),label:"Resource",starred:!0},{value:"enhanced-resources",secondaryLabel:a("enhanced-resources"),label:"Enhanced Resource"},{value:"source-language-texts",secondaryLabel:a("source-language-texts"),label:"Source Language Text"},{value:"dictionaries",secondaryLabel:a("dictionaries"),label:"Dictionary"},{value:"consultant-notes",secondaryLabel:a("consultant-notes"),label:"Consultant Note"}],de={title:"Advanced/MultiSelectComboBox",component:l,tags:["autodocs"],decorators:[t=>e.jsx(z,{children:e.jsx("div",{className:"tw-p-4",children:e.jsx(t,{})})})],argTypes:{placeholder:{control:"text"},customSelectedText:{control:"text"},selected:{control:"object"},onChange:{action:"selection changed"}}},n={render:()=>{const[t,r]=u.useState(o.map(s=>s.value)),m=()=>{if(t.length===o.length||t.length===0)return"Any type";if(t.length===1){const s=o.find(M=>M.value===t[0]);if(s)return s.label}return`${t.length} type${t.length>1?"s":""}`};return e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[e.jsx("div",{className:"tw-w-[300px]",children:e.jsx(l,{entries:o,selected:t,onChange:r,placeholder:"Types",customSelectedText:m(),icon:e.jsx(p,{})})}),e.jsx("p",{children:"Resources:"}),e.jsx("ul",{children:C.filter(s=>t.length===0||t.includes(s.type)).map(s=>e.jsxs("li",{children:[e.jsx("b",{children:s.type})," ",s.name," (",s.language,") - ",s.size]},s.id))})]})},parameters:{docs:{description:{story:"A multi-select combo box for filtering resources by type, with entry count display and custom text."}}}},c={render:()=>{const[t,r]=u.useState(["resources"]);return e.jsx("div",{className:"tw-w-[300px]",children:e.jsx(l,{entries:o,selected:t,onChange:r,placeholder:"Select types",icon:e.jsx(p,{})})})},parameters:{docs:{description:{story:"Basic usage without entry counts or custom text."}}}},i={render:()=>{const[t,r]=u.useState([]);return e.jsx("div",{className:"tw-w-[300px]",children:e.jsx(l,{entries:o,selected:t,onChange:r,placeholder:"Select types",icon:e.jsx(p,{})})})},parameters:{docs:{description:{story:"Multi-select combo box showing entry counts next to each option."}}}},d={render:()=>{const[t,r]=u.useState(o.map(m=>m.value));return e.jsx("div",{className:"tw-w-[300px]",children:e.jsx(l,{entries:o,selected:t,onChange:r,placeholder:"Types",customSelectedText:"All types selected",icon:e.jsx(p,{})})})},parameters:{docs:{description:{story:"Multi-select combo box with all options pre-selected and custom text."}}}};var g,y,h;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>(types.map(type => type.value));
    const getCustomSelectedText = () => {
      if (selectedTypes.length === types.length || selectedTypes.length === 0) return 'Any type';
      if (selectedTypes.length === 1) {
        const matchingType = types.find(type => type.value === selectedTypes[0]);
        if (matchingType) return matchingType.label;
      }
      return \`\${selectedTypes.length} type\${selectedTypes.length > 1 ? 's' : ''}\`;
    };
    return <div className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-w-[300px]">
          <MultiSelectComboBox entries={types} selected={selectedTypes} onChange={setSelectedTypes} placeholder="Types" customSelectedText={getCustomSelectedText()} icon={<Blocks />} />
        </div>

        <p>Resources:</p>
        <ul>
          {resources.filter(resource => selectedTypes.length === 0 || selectedTypes.includes(resource.type)).map(resource => <li key={resource.id}>
                <b>{resource.type}</b> {resource.name} ({resource.language}) - {resource.size}
              </li>)}
        </ul>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A multi-select combo box for filtering resources by type, with entry count display and custom text.'
      }
    }
  }
}`,...(h=(y=n.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var x,S,f;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>(['resources']);
    return <div className="tw-w-[300px]">
        <MultiSelectComboBox entries={types} selected={selected} onChange={setSelected} placeholder="Select types" icon={<Blocks />} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic usage without entry counts or custom text.'
      }
    }
  }
}`,...(f=(S=c.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var b,T,w;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return <div className="tw-w-[300px]">
        <MultiSelectComboBox entries={types} selected={selected} onChange={setSelected} placeholder="Select types" icon={<Blocks />} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select combo box showing entry counts next to each option.'
      }
    }
  }
}`,...(w=(T=i.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var B,v,j;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>(types.map(type => type.value));
    return <div className="tw-w-[300px]">
        <MultiSelectComboBox entries={types} selected={selected} onChange={setSelected} placeholder="Types" customSelectedText="All types selected" icon={<Blocks />} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select combo box with all options pre-selected and custom text.'
      }
    }
  }
}`,...(j=(v=d.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};const pe=["Default","BasicUsage","WithCounts","AllSelected"];export{d as AllSelected,c as BasicUsage,n as Default,i as WithCounts,pe as __namedExportsOrder,de as default};
