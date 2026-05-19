import{j as e}from"./jsx-runtime-BqcUmbcY.js";import{B as P}from"./badge-dSnrhr7k.js";import{B as z}from"./button-cDNWA0HW.js";import{L}from"./label-zAjiROwM.js";import{M as R}from"./multi-select-combo-box.component-DkNgtx7h.js";import{X as D}from"./x-BJfvSp07.js";import{r as y}from"./iframe-BFG9MXr8.js";import{T as V}from"./theme-provider.component-CIt3d4G0.js";import{B as h}from"./blocks-xOzmm8AL.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-DUw1oAiz.js";import"./index-TymG44fR.js";import"./index-CLBbIJ7H.js";import"./index-BYfxZaVj.js";import"./command-CYX-iBiB.js";import"./index-DSPbIWSs.js";import"./index-CaQ3uSnV.js";import"./index-D0cmz7Qp.js";import"./index-PZEnGw13.js";import"./index-ECExBmd2.js";import"./index-Bq5uX91E.js";import"./index-BJdXyzof.js";import"./index-DFntkxUt.js";import"./index-Cc6hlV6K.js";import"./dialog-C1nXPD-j.js";import"./z-index-BATlIu8s.js";import"./createReactComponent-DEV0YrFP.js";import"./input-group-C9NTyl2L.js";import"./input-C3oppNdn.js";import"./IconCheck-BpDGODSu.js";import"./popover-DbX6GD3O.js";import"./index-Cp2vzGiM.js";import"./index-CoFk__af.js";import"./chevrons-up-down-edNjJIT8.js";import"./createLucideIcon-D0wJQiG-.js";import"./check-B4A0i3Du.js";import"./star-BzCzqXPe.js";import"./preload-helper-CTOgD26E.js";function l({entries:t,selected:s,onChange:o,placeholder:i,commandEmptyMessage:r,customSelectedText:m,isDisabled:C,sortSelected:F,icon:k,className:M,badgesPlaceholder:A,id:E}){return e.jsxs("div",{id:E,className:"tw:flex tw:items-center tw:gap-2",children:[e.jsx(R,{entries:t,selected:s,onChange:o,placeholder:i,commandEmptyMessage:r,customSelectedText:m,isDisabled:C,sortSelected:F,icon:k,className:M}),s.length>0?e.jsx("div",{className:"tw:flex tw:flex-wrap tw:items-center tw:gap-2",children:s.map(u=>{var f;return e.jsxs(P,{variant:"muted",className:"tw:flex tw:items-center tw:gap-1",children:[e.jsx(z,{variant:"ghost",size:"icon",className:"tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",onClick:()=>o(s.filter(g=>g!==u)),children:e.jsx(D,{className:"tw:h-3 tw:w-3"})}),(f=t.find(g=>g.value===u))==null?void 0:f.label]},u)})}):e.jsx(L,{children:A})]})}l.__docgenInfo={description:`This is a variant of the {@link MultiSelectComboBox}, that shows a {@link Badge} component for each
selected item in the combo box. Clicking the 'X' icon on the badge will clear the item from the
selected options. A placeholder text must be provided through 'badgesPlaceholder'. This will be
displayed if no items are selected,`,methods:[],displayName:"Filter",props:{entries:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  value: string;
  label: string;
  secondaryLabel?: string;
  starred?: boolean;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"secondaryLabel",value:{name:"string",required:!1}},{key:"starred",value:{name:"boolean",required:!1}}]}}],raw:"MultiSelectComboBoxEntry[]"},description:"The list of entries to select from."},selected:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"The currently selected values."},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(values: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"values"}],return:{name:"void"}}},description:"Callback function to handle changes in selection."},placeholder:{required:!0,tsType:{name:"string"},description:"Placeholder text when no items are selected."},hasToggleAllFeature:{required:!1,tsType:{name:"boolean"},description:"Whether to show select all/clear all buttons."},selectAllText:{required:!1,tsType:{name:"string"},description:"Text for the select all button."},clearAllText:{required:!1,tsType:{name:"string"},description:"Text for the clear all button."},commandEmptyMessage:{required:!1,tsType:{name:"string"},description:"Message displayed when no entries are found."},customSelectedText:{required:!1,tsType:{name:"string"},description:"Custom text to display when items are selected."},isOpen:{required:!1,tsType:{name:"boolean"},description:"Whether the dropdown is open (for controlled usage)."},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Handler that is called when the dropdown's open state changes."},isDisabled:{required:!1,tsType:{name:"boolean"},description:"Flag to disable the component."},sortSelected:{required:!1,tsType:{name:"boolean"},description:"Flag to sort selected items."},icon:{required:!1,tsType:{name:"ReactNode"},description:"Optional icon to display in the button."},className:{required:!1,tsType:{name:"string"},description:"Additional class names for styling."},variant:{required:!1,tsType:{name:"VariantProps['variant']",raw:"VariantProps<typeof buttonVariants>['variant']"},description:"Button variant to use for the trigger button."},id:{required:!1,tsType:{name:"string"},description:"Optional ID for the component."},badgesPlaceholder:{required:!0,tsType:{name:"string"},description:`Placeholder text that will be displayed when no items are selected. It will appear at the
location where the badges would be if any items were selected.`}}};const q=[{id:1,name:"Byzantine Text 1904",language:"Ancient Greek (to 1453)",type:"source-language-texts",size:"4 MB",installed:!0},{id:2,name:"Septuaginta 2006",language:"Ancient Greek (to 1453)",type:"source-language-texts",size:"8 MB",installed:!1},{id:3,name:"Hebrew Bible",language:"Hebrew",type:"source-language-texts",size:"12 MB",installed:!1},{id:4,name:"Strong's Dictionary",language:"English",type:"dictionaries",size:"15 MB",installed:!1},{id:5,name:"Translation Notes",language:"English",type:"consultant-notes",size:"2 MB",installed:!1},{id:6,name:"Latin Vulgate",language:"Latin",type:"resources",size:"6 MB",installed:!1},{id:7,name:"English Standard Version",language:"English",type:"resources",size:"10 MB",installed:!1},{id:8,name:"King James Version",language:"English",type:"resources",size:"9 MB",installed:!1}],a=t=>(q.filter(s=>s.type===t).length??0).toString(),n=[{value:"resources",secondaryLabel:a("resources"),label:"Resource",starred:!0},{value:"enhanced-resources",secondaryLabel:a("enhanced-resources"),label:"Enhanced Resource"},{value:"source-language-texts",secondaryLabel:a("source-language-texts"),label:"Source Language Text"},{value:"dictionaries",secondaryLabel:a("dictionaries"),label:"Dictionary"},{value:"consultant-notes",secondaryLabel:a("consultant-notes"),label:"Consultant Note"}],je={title:"Advanced/Filter",component:l,tags:["autodocs"],decorators:[t=>e.jsx(V,{children:e.jsx("div",{className:"tw:p-4",children:e.jsx(t,{})})})]},c={render:()=>{const[t,s]=y.useState(["resources"]),o=()=>{if(t.length===n.length||t.length===0)return"Any type";if(t.length===1){const r=n.find(m=>m.value===t[0]);if(r)return r.label}return`${t.length} type${t.length>1?"s":""}`},i=q.filter(r=>t.length===0||t.includes(r.type));return e.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-4",children:[e.jsx("div",{className:"tw:w-[500px]",children:e.jsx(l,{entries:n,selected:t,onChange:s,placeholder:"Filter by type",customSelectedText:o(),icon:e.jsx(h,{}),badgesPlaceholder:"No types selected"})}),e.jsxs("div",{children:[e.jsx("p",{children:e.jsxs("strong",{children:["Filtered Resources (",i.length,"):"]})}),e.jsx("ul",{className:"tw:max-h-[300px] tw:overflow-y-auto",children:i.map(r=>e.jsxs("li",{className:"tw:py-1",children:[e.jsx("span",{className:"tw:font-medium",children:r.name}),e.jsxs("span",{className:"tw:text-muted-foreground",children:[" (",r.language,")"]}),e.jsxs("span",{className:"tw:text-sm tw:text-muted-foreground",children:[" - ",r.size]}),r.installed&&e.jsx("span",{className:"tw:ml-2 tw:text-green-600",children:"✓ Installed"})]},r.id))})]})]})},parameters:{docs:{description:{story:"A filter component that shows selected filters as badges and allows filtering resources by type."}}}},d={render:()=>{const[t,s]=y.useState(["resources","dictionaries","consultant-notes"]);return e.jsx("div",{className:"tw:w-[600px]",children:e.jsx(l,{entries:n,selected:t,onChange:s,placeholder:"Select types",icon:e.jsx(h,{}),badgesPlaceholder:"No filters applied"})})},parameters:{docs:{description:{story:"Filter component showing multiple selected badges that can be individually removed."}}}},p={render:()=>{const[t,s]=y.useState([]);return e.jsx("div",{className:"tw:w-[400px]",children:e.jsx(l,{entries:n,selected:t,onChange:s,placeholder:"Filter by type",icon:e.jsx(h,{}),badgesPlaceholder:"No filters applied"})})},parameters:{docs:{description:{story:"Filter component in empty state showing placeholder text."}}}};var w,x,b;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
    return <div className="tw:flex tw:flex-col tw:gap-4">
        <div className="tw:w-[500px]">
          <Filter entries={types} selected={selectedTypes} onChange={setSelectedTypes} placeholder="Filter by type" customSelectedText={getCustomSelectedText()} icon={<Blocks />} badgesPlaceholder="No types selected" />
        </div>

        <div>
          <p>
            <strong>Filtered Resources ({filteredResources.length}):</strong>
          </p>
          <ul className="tw:max-h-[300px] tw:overflow-y-auto">
            {filteredResources.map(resource => <li key={resource.id} className="tw:py-1">
                <span className="tw:font-medium">{resource.name}</span>
                <span className="tw:text-muted-foreground"> ({resource.language})</span>
                <span className="tw:text-sm tw:text-muted-foreground"> - {resource.size}</span>
                {resource.installed && <span className="tw:ml-2 tw:text-green-600">✓ Installed</span>}
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
}`,...(b=(x=c.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var T,v,S;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['resources', 'dictionaries', 'consultant-notes']);
    return <div className="tw:w-[600px]">
        <Filter entries={types} selected={selectedTypes} onChange={setSelectedTypes} placeholder="Select types" icon={<Blocks />} badgesPlaceholder="No filters applied" />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter component showing multiple selected badges that can be individually removed.'
      }
    }
  }
}`,...(S=(v=d.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var N,j,B;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    return <div className="tw:w-[400px]">
        <Filter entries={types} selected={selectedTypes} onChange={setSelectedTypes} placeholder="Filter by type" icon={<Blocks />} badgesPlaceholder="No filters applied" />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter component in empty state showing placeholder text.'
      }
    }
  }
}`,...(B=(j=p.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};const Be=["Default","MultipleBadges","EmptyState"];export{c as Default,p as EmptyState,d as MultipleBadges,Be as __namedExportsOrder,je as default};
