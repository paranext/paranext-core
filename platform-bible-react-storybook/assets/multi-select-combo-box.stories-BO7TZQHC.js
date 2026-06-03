import{r as c,j as t}from"./iframe-Co0esBWG.js";import{M as l}from"./multi-select-combo-box.component-CsNvhaIf.js";import{B as i}from"./blocks-2xj_e110.js";import"./preload-helper-CTOgD26E.js";import"./button-ETRJLBBa.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-Ck6dum3j.js";import"./command-ChrCI_SM.js";import"./index-CF0IDChK.js";import"./index-STyPEdgE.js";import"./index-BIxvU4-J.js";import"./index-oVoVSHSH.js";import"./index-DfYBx9LR.js";import"./index-5hWJNLge.js";import"./index-CYzPOBNV.js";import"./index-DQaK3PyO.js";import"./index-BlE70o7s.js";import"./index-BD1g9_cp.js";import"./dialog-C-f35Adg.js";import"./z-index-BATlIu8s.js";import"./createReactComponent-DXO_B0eA.js";import"./input-group-BvExG6Kr.js";import"./input-CTPWmj3f.js";import"./IconCheck-Ct5I0Y8V.js";import"./popover-Bi-b2nQf.js";import"./index-D5CRjR4h.js";import"./index-CKpNPuVq.js";import"./chevrons-up-down-kdR2Q5B8.js";import"./createLucideIcon-CgE4DKB2.js";import"./check-BeVsBgME.js";import"./star-CcToEgS9.js";const E=[{id:1,name:"Byzantine Text 1904",language:"Ancient Greek (to 1453)",type:"source-language-texts",size:"4 MB",installed:!0},{id:2,name:"Septuaginta 2006",language:"Ancient Greek (to 1453)",type:"source-language-texts",size:"8 MB",installed:!1},{id:3,name:"Hebrew Bible",language:"Hebrew",type:"source-language-texts",size:"12 MB",installed:!1},{id:4,name:"Strong's Dictionary",language:"English",type:"dictionaries",size:"15 MB",installed:!1},{id:5,name:"Translation Notes",language:"English",type:"consultant-notes",size:"2 MB",installed:!1},{id:6,name:"Latin Vulgate",language:"Latin",type:"resources",size:"6 MB",installed:!1},{id:7,name:"English Standard Version",language:"English",type:"resources",size:"10 MB",installed:!1},{id:8,name:"King James Version",language:"English",type:"resources",size:"9 MB",installed:!1},{id:9,name:"New International Version",language:"English",type:"resources",size:"11 MB",installed:!1},{id:10,name:"Reina Valera 1960",language:"Spanish",type:"resources",size:"8 MB",installed:!1},{id:11,name:"Luther Bible",language:"German",type:"resources",size:"7.5 MB",installed:!1},{id:12,name:"Nova Vulgata",language:"Latin",type:"resources",size:"6.8 MB",installed:!1},{id:50,name:"Traducción en lenguaje actual",language:"Spanish",type:"resources",size:"5.9 MB",installed:!1}],a=e=>(E.filter(r=>r.type===e).length??0).toString(),o=[{value:"resources",secondaryLabel:a("resources"),label:"Resource",starred:!0},{value:"enhanced-resources",secondaryLabel:a("enhanced-resources"),label:"Enhanced Resource"},{value:"source-language-texts",secondaryLabel:a("source-language-texts"),label:"Source Language Text"},{value:"dictionaries",secondaryLabel:a("dictionaries"),label:"Dictionary"},{value:"consultant-notes",secondaryLabel:a("consultant-notes"),label:"Consultant Note"}],de={title:"Advanced/MultiSelectComboBox",component:l,tags:["autodocs"],decorators:[e=>t.jsx("div",{className:"tw:p-4",children:t.jsx(e,{})})],argTypes:{placeholder:{control:"text"},customSelectedText:{control:"text"},selected:{control:"object"},onChange:{action:"selection changed"}}},d={render:()=>{const[e,r]=c.useState(o.map(s=>s.value)),n=()=>{if(e.length===o.length||e.length===0)return"Any type";if(e.length===1){const s=o.find(h=>h.value===e[0]);if(s)return s.label}return`${e.length} type${e.length>1?"s":""}`};return t.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-4",children:[t.jsx("div",{className:"tw:w-[300px]",children:t.jsx(l,{entries:o,selected:e,onChange:r,placeholder:"Types",customSelectedText:n(),icon:t.jsx(i,{})})}),t.jsx("p",{children:"Resources:"}),t.jsx("ul",{children:E.filter(s=>e.length===0||e.includes(s.type)).map(s=>t.jsxs("li",{children:[t.jsx("b",{children:s.type})," ",s.name," (",s.language,") - ",s.size]},s.id))})]})},parameters:{docs:{description:{story:"A multi-select combo box for filtering resources by type, with entry count display and custom text."}}}},p={render:()=>{const[e,r]=c.useState(["resources"]);return t.jsx("div",{className:"tw:w-[300px]",children:t.jsx(l,{entries:o,selected:e,onChange:r,placeholder:"Select types",icon:t.jsx(i,{})})})},parameters:{docs:{description:{story:"Basic usage without entry counts or custom text."}}}},u={render:()=>{const[e,r]=c.useState([]);return t.jsx("div",{className:"tw:w-[300px]",children:t.jsx(l,{entries:o,selected:e,onChange:r,placeholder:"Select types",icon:t.jsx(i,{})})})},parameters:{docs:{description:{story:"Multi-select combo box showing entry counts next to each option."}}}},m={render:()=>{const[e,r]=c.useState(o.map(n=>n.value));return t.jsx("div",{className:"tw:w-[300px]",children:t.jsx(l,{entries:o,selected:e,onChange:r,placeholder:"Types",customSelectedText:"All types selected",icon:t.jsx(i,{})})})},parameters:{docs:{description:{story:"Multi-select combo box with all options pre-selected and custom text."}}}},g={render:()=>{const[e,r]=c.useState(["resources","dictionaries"]),n=()=>{if(e.length===o.length||e.length===0)return"Any type";if(e.length===1){const s=o.find(h=>h.value===e[0]);if(s)return s.label}return`${e.length} type${e.length>1?"s":""} selected`};return t.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-4",children:[t.jsx("p",{className:"tw:text-sm tw:text-muted-foreground",children:"Resize the container below to test overflow behavior. The text should truncate with ellipsis when the container becomes too narrow."}),t.jsx("div",{className:"tw:resize tw:overflow-auto tw:rounded tw:border-2 tw:border-dashed tw:border-muted-foreground tw:p-4",style:{minWidth:"150px",width:"300px",maxWidth:"600px"},children:t.jsx(l,{entries:o,selected:e,onChange:r,placeholder:"Select resource types",customSelectedText:n(),icon:t.jsx(i,{}),hasToggleAllFeature:!0})}),t.jsxs("div",{className:"tw:mt-4",children:[t.jsx("p",{className:"tw:font-semibold",children:"Selected values:"}),t.jsx("p",{className:"tw:text-sm",children:e.length>0?e.join(", "):"None"})]})]})},parameters:{docs:{description:{story:"A resizable container demonstrating text truncation and overflow handling. Drag the bottom-right corner to resize."}}}};var y,x,w;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
    return <div className="tw:flex tw:flex-col tw:gap-4">
        <div className="tw:w-[300px]">
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
}`,...(w=(x=d.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var S,f,b;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>(['resources']);
    return <div className="tw:w-[300px]">
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
}`,...(b=(f=p.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var v,T,B;u.parameters={...u.parameters,docs:{...(v=u.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return <div className="tw:w-[300px]">
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
}`,...(B=(T=u.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};var j,C,N;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>(types.map(type => type.value));
    return <div className="tw:w-[300px]">
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
}`,...(N=(C=m.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var z,M,A;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<string[]>(['resources', 'dictionaries']);
    const getCustomSelectedText = () => {
      if (selected.length === types.length || selected.length === 0) return 'Any type';
      if (selected.length === 1) {
        const matchingType = types.find(type => type.value === selected[0]);
        if (matchingType) return matchingType.label;
      }
      return \`\${selected.length} type\${selected.length > 1 ? 's' : ''} selected\`;
    };
    return <div className="tw:flex tw:flex-col tw:gap-4">
        <p className="tw:text-sm tw:text-muted-foreground">
          Resize the container below to test overflow behavior. The text should truncate with
          ellipsis when the container becomes too narrow.
        </p>
        <div className="tw:resize tw:overflow-auto tw:rounded tw:border-2 tw:border-dashed tw:border-muted-foreground tw:p-4" style={{
        minWidth: '150px',
        width: '300px',
        maxWidth: '600px'
      }}>
          <MultiSelectComboBox entries={types} selected={selected} onChange={setSelected} placeholder="Select resource types" customSelectedText={getCustomSelectedText()} icon={<Blocks />} hasToggleAllFeature />
        </div>
        <div className="tw:mt-4">
          <p className="tw:font-semibold">Selected values:</p>
          <p className="tw:text-sm">{selected.length > 0 ? selected.join(', ') : 'None'}</p>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A resizable container demonstrating text truncation and overflow handling. Drag the bottom-right corner to resize.'
      }
    }
  }
}`,...(A=(M=g.parameters)==null?void 0:M.docs)==null?void 0:A.source}}};const pe=["Default","BasicUsage","WithCounts","AllSelected","ResizableContainer"];export{m as AllSelected,p as BasicUsage,d as Default,g as ResizableContainer,u as WithCounts,pe as __namedExportsOrder,de as default};
