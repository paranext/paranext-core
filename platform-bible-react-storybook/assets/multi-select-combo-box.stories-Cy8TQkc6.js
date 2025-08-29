import{j as e}from"./jsx-runtime-BeudytaJ.js";import{M as n,B as d}from"./multi-select-combo-box.component-CUUSbvkc.js";import{r as p}from"./iframe-Bh-UVLQ1.js";import{T as E}from"./theme-provider.component-CHIw4GFT.js";import"./createLucideIcon-WkfhWSED.js";import"./button-DCi7GKRD.js";import"./index-DzLAgRgn.js";import"./index-OKYpWvY3.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./command-DoAxWGXk.js";import"./index-D03uvc6I.js";import"./index-C4xi1nxg.js";import"./index-Bczu6PfH.js";import"./index-Cknf1CWD.js";import"./index-B2YbZ1yp.js";import"./index-Dmu37ZaT.js";import"./index-qcNN8ToE.js";import"./index-CdNQegAS.js";import"./index-BiFp2t0M.js";import"./index-CWGHIpCi.js";import"./index-C0aPA0iu.js";import"./index-DbkXsGQQ.js";import"./index-wo50UNqV.js";import"./dialog-CrwTrENU.js";import"./x-CY6l0jDE.js";import"./search-BGRWQfUm.js";import"./popover-CcYIsDdc.js";import"./index-C1dm1miQ.js";import"./floating-ui.react-dom-CympVei8.js";import"./index-DEwK2nPV.js";import"./index-BdkO5MHs.js";import"./chevrons-up-down-fNteLPnz.js";import"./check-dKNi6MrJ.js";import"./star-C_Yp3gX4.js";const r=[{value:"resources",label:"Resource",starred:!0},{value:"enhanced-resources",label:"Enhanced Resource"},{value:"source-language-texts",label:"Source Language Text"},{value:"dictionaries",label:"Dictionary"},{value:"consultant-notes",label:"Consultant Note"}],j=[{id:1,name:"Byzantine Text 1904",language:"Ancient Greek (to 1453)",type:"source-language-texts",size:"4 MB",installed:!0},{id:2,name:"Septuaginta 2006",language:"Ancient Greek (to 1453)",type:"source-language-texts",size:"8 MB",installed:!1},{id:3,name:"Hebrew Bible",language:"Hebrew",type:"source-language-texts",size:"12 MB",installed:!1},{id:4,name:"Strong's Dictionary",language:"English",type:"dictionaries",size:"15 MB",installed:!1},{id:5,name:"Translation Notes",language:"English",type:"consultant-notes",size:"2 MB",installed:!1},{id:6,name:"Latin Vulgate",language:"Latin",type:"resources",size:"6 MB",installed:!1},{id:7,name:"English Standard Version",language:"English",type:"resources",size:"10 MB",installed:!1},{id:8,name:"King James Version",language:"English",type:"resources",size:"9 MB",installed:!1},{id:9,name:"New International Version",language:"English",type:"resources",size:"11 MB",installed:!1},{id:10,name:"Reina Valera 1960",language:"Spanish",type:"resources",size:"8 MB",installed:!1},{id:11,name:"Luther Bible",language:"German",type:"resources",size:"7.5 MB",installed:!1},{id:12,name:"Nova Vulgata",language:"Latin",type:"resources",size:"6.8 MB",installed:!1},{id:50,name:"Traducción en lenguaje actual",language:"Spanish",type:"resources",size:"5.9 MB",installed:!1}],m=t=>j.filter(o=>o.type===t.value).length??0,de={title:"Advanced/MultiSelectComboBox",component:n,tags:["autodocs"],decorators:[t=>e.jsx(E,{children:e.jsx("div",{className:"tw-p-4",children:e.jsx(t,{})})})],argTypes:{placeholder:{control:"text"},customSelectedText:{control:"text"},selected:{control:"object"},onChange:{action:"selection changed"}}},l={render:()=>{const[t,o]=p.useState(r.map(s=>s.value)),u=()=>{if(t.length===r.length||t.length===0)return"Any type";if(t.length===1){const s=r.find(M=>M.value===t[0]);if(s)return s.label}return`${t.length} type${t.length>1?"s":""}`};return e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[e.jsx("div",{className:"tw-w-[300px]",children:e.jsx(n,{entries:r,getEntriesCount:m,selected:t,onChange:o,placeholder:"Types",customSelectedText:u(),icon:e.jsx(d,{})})}),e.jsx("p",{children:"Resources:"}),e.jsx("ul",{children:j.filter(s=>t.length===0||t.includes(s.type)).map(s=>e.jsxs("li",{children:[e.jsx("b",{children:s.type})," ",s.name," (",s.language,") - ",s.size]},s.id))})]})},parameters:{docs:{description:{story:"A multi-select combo box for filtering resources by type, with entry count display and custom text."}}}},a={render:()=>{const[t,o]=p.useState(["resources"]);return e.jsx("div",{className:"tw-w-[300px]",children:e.jsx(n,{entries:r,selected:t,onChange:o,placeholder:"Select types",icon:e.jsx(d,{})})})},parameters:{docs:{description:{story:"Basic usage without entry counts or custom text."}}}},c={render:()=>{const[t,o]=p.useState([]);return e.jsx("div",{className:"tw-w-[300px]",children:e.jsx(n,{entries:r,getEntriesCount:m,selected:t,onChange:o,placeholder:"Select types",icon:e.jsx(d,{})})})},parameters:{docs:{description:{story:"Multi-select combo box showing entry counts next to each option."}}}},i={render:()=>{const[t,o]=p.useState(r.map(u=>u.value));return e.jsx("div",{className:"tw-w-[300px]",children:e.jsx(n,{entries:r,getEntriesCount:m,selected:t,onChange:o,placeholder:"Types",customSelectedText:"All types selected",icon:e.jsx(d,{})})})},parameters:{docs:{description:{story:"Multi-select combo box with all options pre-selected and custom text."}}}};var g,y,h;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
