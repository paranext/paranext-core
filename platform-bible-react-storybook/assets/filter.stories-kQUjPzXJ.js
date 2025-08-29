import{j as e}from"./jsx-runtime-CoJcBlqr.js";import{B as A}from"./badge-CK0yIiXb.js";import{B as P}from"./button-BOi5X0CC.js";import{L as R}from"./label-DboBKY13.js";import{M as D,B as g}from"./multi-select-combo-box.component-ViukAdAo.js";import{X as L}from"./x-DEJKqPBv.js";import{r as y}from"./iframe-ChjBVkNN.js";import{T as O}from"./theme-provider.component-DRoiPDtx.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-B3HFQzOn.js";import"./index-CtW3L1xI.js";import"./index-DF789n87.js";import"./index-BfzcDxxY.js";import"./index-BWcRxFB8.js";import"./createLucideIcon-CVIRtPIF.js";import"./command-CVOFFHX5.js";import"./index-DsNDavHQ.js";import"./index-ikrtYkS6.js";import"./index-DRtzzKqe.js";import"./index-uX5GIGLq.js";import"./index-BjqnVq7v.js";import"./index-Dbj3Uwir.js";import"./index-CDUyRbSN.js";import"./index-a8-6909D.js";import"./index-Db6mirig.js";import"./index-BODYHFlN.js";import"./dialog-BfFK0RV0.js";import"./search-BdbvA1lj.js";import"./popover-Ctsr1WcE.js";import"./index-VUEIl7Yq.js";import"./floating-ui.react-dom-Dob2_vp1.js";import"./index-CJGEWkUs.js";import"./index-CPgSHOWO.js";import"./chevrons-up-down-kNT_6Df3.js";import"./check-DhWHefu6.js";import"./star-DDemYP74.js";function i({entries:t,getEntriesCount:r,selected:n,onChange:a,placeholder:s,commandEmptyMessage:p,customSelectedText:E,isDisabled:q,sortSelected:k,icon:F,className:M,badgesPlaceholder:z}){return e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx(D,{entries:t,getEntriesCount:r,selected:n,onChange:a,placeholder:s,commandEmptyMessage:p,customSelectedText:E,isDisabled:q,sortSelected:k,icon:F,className:M}),n.length>0?e.jsx("div",{className:"tw-flex tw-flex-wrap tw-items-center tw-gap-2",children:n.map(u=>{var f;return e.jsxs(A,{variant:"muted",className:"tw-flex tw-items-center tw-gap-1",children:[e.jsx(P,{variant:"ghost",size:"icon",className:"tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",onClick:()=>a(n.filter(m=>m!==u)),children:e.jsx(L,{className:"tw-h-3 tw-w-3"})}),(f=t.find(m=>m.value===u))==null?void 0:f.label]},u)})}):e.jsx(R,{children:z})]})}i.__docgenInfo={description:`This is a variant of the {@link MultiSelectComboBox}, that shows a {@link Badge} component for each
selected item in the combo box. Clicking the 'X' icon on the badge will clear the item from the
selected options. A placeholder text must be provided through 'badgesPlaceholder'. This will be
displayed if no items are selected,`,methods:[],displayName:"Filter",props:{entries:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  value: string;
  label: string;
  starred?: boolean;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"starred",value:{name:"boolean",required:!1}}]}}],raw:"MultiSelectComboBoxEntry[]"},description:""},getEntriesCount:{required:!1,tsType:{name:"signature",type:"function",raw:"(option: MultiSelectComboBoxEntry) => number",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  value: string;
  label: string;
  starred?: boolean;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"starred",value:{name:"boolean",required:!1}}]}},name:"option"}],return:{name:"number"}}},description:""},selected:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(values: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"values"}],return:{name:"void"}}},description:""},placeholder:{required:!0,tsType:{name:"string"},description:""},commandEmptyMessage:{required:!1,tsType:{name:"string"},description:""},customSelectedText:{required:!1,tsType:{name:"string"},description:""},isDisabled:{required:!1,tsType:{name:"boolean"},description:""},sortSelected:{required:!1,tsType:{name:"boolean"},description:""},icon:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},badgesPlaceholder:{required:!0,tsType:{name:"string"},description:`Placeholder text that will be displayed when no items are selected. It will appear at the
location where the badges would be if any items were selected.`}}};const l=[{value:"resources",label:"Resource",starred:!0},{value:"enhanced-resources",label:"Enhanced Resource"},{value:"source-language-texts",label:"Source Language Text"},{value:"dictionaries",label:"Dictionary"},{value:"consultant-notes",label:"Consultant Note"}],B=[{id:1,name:"Byzantine Text 1904",language:"Ancient Greek (to 1453)",type:"source-language-texts",size:"4 MB",installed:!0},{id:2,name:"Septuaginta 2006",language:"Ancient Greek (to 1453)",type:"source-language-texts",size:"8 MB",installed:!1},{id:3,name:"Hebrew Bible",language:"Hebrew",type:"source-language-texts",size:"12 MB",installed:!1},{id:4,name:"Strong's Dictionary",language:"English",type:"dictionaries",size:"15 MB",installed:!1},{id:5,name:"Translation Notes",language:"English",type:"consultant-notes",size:"2 MB",installed:!1},{id:6,name:"Latin Vulgate",language:"Latin",type:"resources",size:"6 MB",installed:!1},{id:7,name:"English Standard Version",language:"English",type:"resources",size:"10 MB",installed:!1},{id:8,name:"King James Version",language:"English",type:"resources",size:"9 MB",installed:!1}],h=t=>B.filter(r=>r.type===t.value).length??0,Se={title:"Advanced/Filter",component:i,tags:["autodocs"],decorators:[t=>e.jsx(O,{children:e.jsx("div",{className:"tw-p-4",children:e.jsx(t,{})})})]},o={render:()=>{const[t,r]=y.useState(["resources"]),n=()=>{if(t.length===l.length||t.length===0)return"Any type";if(t.length===1){const s=l.find(p=>p.value===t[0]);if(s)return s.label}return`${t.length} type${t.length>1?"s":""}`},a=B.filter(s=>t.length===0||t.includes(s.type));return e.jsxs("div",{className:"tw-flex tw-flex-col tw-gap-4",children:[e.jsx("div",{className:"tw-w-[500px]",children:e.jsx(i,{entries:l,getEntriesCount:h,selected:t,onChange:r,placeholder:"Filter by type",customSelectedText:n(),icon:e.jsx(g,{}),badgesPlaceholder:"No types selected"})}),e.jsxs("div",{children:[e.jsx("p",{children:e.jsxs("strong",{children:["Filtered Resources (",a.length,"):"]})}),e.jsx("ul",{className:"tw-max-h-[300px] tw-overflow-y-auto",children:a.map(s=>e.jsxs("li",{className:"tw-py-1",children:[e.jsx("span",{className:"tw-font-medium",children:s.name}),e.jsxs("span",{className:"tw-text-muted-foreground",children:[" (",s.language,")"]}),e.jsxs("span",{className:"tw-text-sm tw-text-muted-foreground",children:[" - ",s.size]}),s.installed&&e.jsx("span",{className:"tw-ml-2 tw-text-green-600",children:"✓ Installed"})]},s.id))})]})]})},parameters:{docs:{description:{story:"A filter component that shows selected filters as badges and allows filtering resources by type."}}}},c={render:()=>{const[t,r]=y.useState(["resources","dictionaries","consultant-notes"]);return e.jsx("div",{className:"tw-w-[600px]",children:e.jsx(i,{entries:l,getEntriesCount:h,selected:t,onChange:r,placeholder:"Select types",icon:e.jsx(g,{}),badgesPlaceholder:"No filters applied"})})},parameters:{docs:{description:{story:"Filter component showing multiple selected badges that can be individually removed."}}}},d={render:()=>{const[t,r]=y.useState([]);return e.jsx("div",{className:"tw-w-[400px]",children:e.jsx(i,{entries:l,getEntriesCount:h,selected:t,onChange:r,placeholder:"Filter by type",icon:e.jsx(g,{}),badgesPlaceholder:"No filters applied"})})},parameters:{docs:{description:{story:"Filter component in empty state showing placeholder text."}}}};var w,x,b;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['resources']);
    const getCustomSelectedText = () => {
      if (selectedTypes.length === types.length || selectedTypes.length === 0) return 'Any type';
      if (selectedTypes.length === 1) {
        const matchingType = types.find(type => type.value === selectedTypes[0]);
        if (matchingType) return matchingType.label;
      }
      return \`\${selectedTypes.length} type\${selectedTypes.length > 1 ? 's' : ''}\`;
    };
    const filteredResources = resources.filter(resource => {
      return selectedTypes.length === 0 || selectedTypes.includes(resource.type);
    });
    return <div className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-w-[500px]">
          <Filter entries={types} getEntriesCount={getOptionsCount} selected={selectedTypes} onChange={setSelectedTypes} placeholder="Filter by type" customSelectedText={getCustomSelectedText()} icon={<Blocks />} badgesPlaceholder="No types selected" />
        </div>

        <div>
          <p>
            <strong>Filtered Resources ({filteredResources.length}):</strong>
          </p>
          <ul className="tw-max-h-[300px] tw-overflow-y-auto">
            {filteredResources.map(resource => <li key={resource.id} className="tw-py-1">
                <span className="tw-font-medium">{resource.name}</span>
                <span className="tw-text-muted-foreground"> ({resource.language})</span>
                <span className="tw-text-sm tw-text-muted-foreground"> - {resource.size}</span>
                {resource.installed && <span className="tw-ml-2 tw-text-green-600">✓ Installed</span>}
              </li>)}
          </ul>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A filter component that shows selected filters as badges and allows filtering resources by type.'
      }
    }
  }
}`,...(b=(x=o.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var T,v,S;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['resources', 'dictionaries', 'consultant-notes']);
    return <div className="tw-w-[600px]">
        <Filter entries={types} getEntriesCount={getOptionsCount} selected={selectedTypes} onChange={setSelectedTypes} placeholder="Select types" icon={<Blocks />} badgesPlaceholder="No filters applied" />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter component showing multiple selected badges that can be individually removed.'
      }
    }
  }
}`,...(S=(v=c.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var N,j,C;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    return <div className="tw-w-[400px]">
        <Filter entries={types} getEntriesCount={getOptionsCount} selected={selectedTypes} onChange={setSelectedTypes} placeholder="Filter by type" icon={<Blocks />} badgesPlaceholder="No filters applied" />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter component in empty state showing placeholder text.'
      }
    }
  }
}`,...(C=(j=d.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};const Ne=["Default","MultipleBadges","EmptyState"];export{o as Default,d as EmptyState,c as MultipleBadges,Ne as __namedExportsOrder,Se as default};
