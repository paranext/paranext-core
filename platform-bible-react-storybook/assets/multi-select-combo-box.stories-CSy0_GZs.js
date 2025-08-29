import{j as e}from"./jsx-runtime-CoJcBlqr.js";import{M as n,B as d}from"./multi-select-combo-box.component-ViukAdAo.js";import{r as p}from"./iframe-ChjBVkNN.js";import{T as E}from"./theme-provider.component-DRoiPDtx.js";import"./createLucideIcon-CVIRtPIF.js";import"./button-BOi5X0CC.js";import"./index-B3HFQzOn.js";import"./index-CtW3L1xI.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./command-CVOFFHX5.js";import"./index-DsNDavHQ.js";import"./index-ikrtYkS6.js";import"./index-DRtzzKqe.js";import"./index-uX5GIGLq.js";import"./index-BjqnVq7v.js";import"./index-BfzcDxxY.js";import"./index-BWcRxFB8.js";import"./index-Dbj3Uwir.js";import"./index-CDUyRbSN.js";import"./index-a8-6909D.js";import"./index-Db6mirig.js";import"./index-DF789n87.js";import"./index-BODYHFlN.js";import"./dialog-BfFK0RV0.js";import"./x-DEJKqPBv.js";import"./search-BdbvA1lj.js";import"./popover-Ctsr1WcE.js";import"./index-VUEIl7Yq.js";import"./floating-ui.react-dom-Dob2_vp1.js";import"./index-CJGEWkUs.js";import"./index-CPgSHOWO.js";import"./chevrons-up-down-kNT_6Df3.js";import"./check-DhWHefu6.js";import"./star-DDemYP74.js";const r=[{value:"resources",label:"Resource",starred:!0},{value:"enhanced-resources",label:"Enhanced Resource"},{value:"source-language-texts",label:"Source Language Text"},{value:"dictionaries",label:"Dictionary"},{value:"consultant-notes",label:"Consultant Note"}],j=[{id:1,name:"Byzantine Text 1904",language:"Ancient Greek (to 1453)",type:"source-language-texts",size:"4 MB",installed:!0},{id:2,name:"Septuaginta 2006",language:"Ancient Greek (to 1453)",type:"source-language-texts",size:"8 MB",installed:!1},{id:3,name:"Hebrew Bible",language:"Hebrew",type:"source-language-texts",size:"12 MB",installed:!1},{id:4,name:"Strong's Dictionary",language:"English",type:"dictionaries",size:"15 MB",installed:!1},{id:5,name:"Translation Notes",language:"English",type:"consultant-notes",size:"2 MB",installed:!1},{id:6,name:"Latin Vulgate",language:"Latin",type:"resources",size:"6 MB",installed:!1},{id:7,name:"English Standard Version",language:"English",type:"resources",size:"10 MB",installed:!1},{id:8,name:"King James Version",language:"English",type:"resources",size:"9 MB",installed:!1},{id:9,name:"New International Version",language:"English",type:"resources",size:"11 MB",installed:!1},{id:10,name:"Reina Valera 1960",language:"Spanish",type:"resources",size:"8 MB",installed:!1},{id:11,name:"Luther Bible",language:"German",type:"resources",size:"7.5 MB",installed:!1},{id:12,name:"Nova Vulgata",language:"Latin",type:"resources",size:"6.8 MB",installed:!1},{id:50,name:"Traducción en lenguaje actual",language:"Spanish",type:"resources",size:"5.9 MB",installed:!1}],m=t=>j.filter(o=>o.type===t.value).length??0,de={title:"Advanced/MultiSelectComboBox",component:n,tags:["autodocs"],decorators:[t=>e.jsx(E,{children:e.jsx("div",{className:"tw-p-4",children:e.jsx(t,{})})})],argTypes:{placeholder:{control:"text"},customSelectedText:{control:"text"},selected:{control:"object"},onChange:{action:"selection changed"}}},l={render:()=>{const[t,o]=p.useState(r.map(s=>s.value)),u=()=>{if(t.length===r.length||t.length===0)return"Any type";if(t.length===1){const s=r.find(M=>M.value===t[0]);if(s)return s.label}return`${t.length} type${t.length>1?"s":""}`};return e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[e.jsx("div",{className:"tw-w-[300px]",children:e.jsx(n,{entries:r,getEntriesCount:m,selected:t,onChange:o,placeholder:"Types",customSelectedText:u(),icon:e.jsx(d,{})})}),e.jsx("p",{children:"Resources:"}),e.jsx("ul",{children:j.filter(s=>t.length===0||t.includes(s.type)).map(s=>e.jsxs("li",{children:[e.jsx("b",{children:s.type})," ",s.name," (",s.language,") - ",s.size]},s.id))})]})},parameters:{docs:{description:{story:"A multi-select combo box for filtering resources by type, with entry count display and custom text."}}}},a={render:()=>{const[t,o]=p.useState(["resources"]);return e.jsx("div",{className:"tw-w-[300px]",children:e.jsx(n,{entries:r,selected:t,onChange:o,placeholder:"Select types",icon:e.jsx(d,{})})})},parameters:{docs:{description:{story:"Basic usage without entry counts or custom text."}}}},c={render:()=>{const[t,o]=p.useState([]);return e.jsx("div",{className:"tw-w-[300px]",children:e.jsx(n,{entries:r,getEntriesCount:m,selected:t,onChange:o,placeholder:"Select types",icon:e.jsx(d,{})})})},parameters:{docs:{description:{story:"Multi-select combo box showing entry counts next to each option."}}}},i={render:()=>{const[t,o]=p.useState(r.map(u=>u.value));return e.jsx("div",{className:"tw-w-[300px]",children:e.jsx(n,{entries:r,getEntriesCount:m,selected:t,onChange:o,placeholder:"Types",customSelectedText:"All types selected",icon:e.jsx(d,{})})})},parameters:{docs:{description:{story:"Multi-select combo box with all options pre-selected and custom text."}}}};var g,y,h;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
          <MultiSelectComboBox entries={types} getEntriesCount={getOptionsCount} selected={selectedTypes} onChange={setSelectedTypes} placeholder="Types" customSelectedText={getCustomSelectedText()} icon={<Blocks />} />
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
}`,...(h=(y=l.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var x,S,f;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(f=(S=a.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var T,b,w;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return <div className="tw-w-[300px]">
        <MultiSelectComboBox entries={types} getEntriesCount={getOptionsCount} selected={selected} onChange={setSelected} placeholder="Select types" icon={<Blocks />} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select combo box showing entry counts next to each option.'
      }
    }
  }
}`,...(w=(b=c.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var C,B,v;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>(types.map(type => type.value));
    return <div className="tw-w-[300px]">
        <MultiSelectComboBox entries={types} getEntriesCount={getOptionsCount} selected={selected} onChange={setSelected} placeholder="Types" customSelectedText="All types selected" icon={<Blocks />} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select combo box with all options pre-selected and custom text.'
      }
    }
  }
}`,...(v=(B=i.parameters)==null?void 0:B.docs)==null?void 0:v.source}}};const pe=["Default","BasicUsage","WithCounts","AllSelected"];export{i as AllSelected,a as BasicUsage,l as Default,c as WithCounts,pe as __namedExportsOrder,de as default};
