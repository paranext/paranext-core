import{j as e,r as j}from"./iframe-D1SZpvhJ.js";import{S as u}from"./settings-sidebar.component-jQC1RLaN.js";import{S as U}from"./sidebar-EIKE1w7M.js";import"./preload-helper-CTOgD26E.js";import"./project-selector.component-sxWQB7_9.js";import"./index-B259sMQH.js";import"./index.es-CXoS8DB2.js";import"./index-C5x4eDsm.js";import"./index-Cn7xqC4M.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./localization.util-C4JImkK1.js";import"./badge-DILeQIoJ.js";import"./index-BnuTq2W6.js";import"./index-CalxZy4E.js";import"./button-TwHp1ArR.js";import"./popover-ChFu7UH2.js";import"./use-dismiss-on-window-blur.hook-u5BeANax.js";import"./portal-container.context-BnuKkI1y.js";import"./index-BF4lifi6.js";import"./index-D6Nkly0L.js";import"./index-uZO2Rb5_.js";import"./index-BNImGkpL.js";import"./index-VrRHttHj.js";import"./index-CaP0C2LT.js";import"./index-DN1DuW3l.js";import"./index-CShuqExK.js";import"./index-C-Pbi6In.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-B84MTRIc.js";import"./index-C0ycuobO.js";import"./command-SEt-AVAr.js";import"./index-C_aqGRsp.js";import"./dialog-CiPIS4e5.js";import"./createReactComponent-JPrj0szX.js";import"./input-group-A4OTI5n_.js";import"./input-DpFBWK6L.js";import"./IconCheck-DWJaLGrX.js";import"./dropdown-menu-Ds8CnL6v.js";import"./menu.context-BN0BnCTj.js";import"./IconChevronRight-DNuPEnxh.js";import"./index-DA2m8vW-.js";import"./index-DnTh8p-3.js";import"./tooltip-DImImlbh.js";import"./index-DG79uRi3.js";import"./use-truncation-tooltip.hook-DjAUfrmO.js";import"./createLucideIcon-ASNMBz4j.js";import"./arrow-right-MElJtlKg.js";import"./loader-circle-CpLnHQZP.js";import"./chevrons-up-down-CGln6aVI.js";import"./chevron-down-DJH24it0.js";import"./separator-CB0lBkeB.js";import"./skeleton-Cw3M8wS0.js";const Ue={title:"Advanced/Settings/SettingsSidebar",component:u,tags:["autodocs"],parameters:{docs:{description:{component:`
A sidebar component specifically designed for settings navigation in Platform.Bible applications.

This component provides:
- Extension settings navigation with labeled sections
- Project settings selection via dropdown
- Active item highlighting
- Integration with the shadcn-ui sidebar system
- Customizable labels and styling

The sidebar displays two main sections: extension settings (as clickable menu items) and project settings (as a searchable dropdown). Must be wrapped in a SidebarProvider component.
        `}}},decorators:[s=>e.jsx(U,{children:e.jsx("div",{className:"tw:flex tw:h-96",children:e.jsx(s,{})})})],argTypes:{id:{control:"text",description:"Optional ID for testing purposes"},extensionLabels:{control:!1,description:"Record of extension keys and their display labels"},projectInfo:{control:!1,description:"Array of project information with IDs and names"},handleSelectSidebarItem:{control:!1,description:"Callback function for sidebar item selection"},selectedSidebarItem:{control:!1,description:"Currently selected sidebar item information"},extensionsSidebarGroupLabel:{control:"text",description:"Label for the extensions group section"},projectsSidebarGroupLabel:{control:"text",description:"Label for the projects group section"},buttonPlaceholderText:{control:"text",description:"Placeholder text for the project selection button"},className:{control:"text",description:"Additional CSS classes for styling"}}},V={"platform-bible-core":"Platform Bible Core","platform-bible-react":"Platform Bible React","platform-bible-utils":"Platform Bible Utils","text-editor":"Text Editor","reference-selector":"Reference Selector","note-taking":"Note Taking","translation-helper":"Translation Helper"},A=[{projectId:"project-1",projectName:"ESV",projectFullName:"English Standard Version"},{projectId:"project-2",projectName:"NIV",projectFullName:"New International Version"},{projectId:"project-3",projectName:"KJV",projectFullName:"King James Version"},{projectId:"project-4",projectName:"NASB",projectFullName:"New American Standard Bible"},{projectId:"project-5",projectName:"RSV",projectFullName:"Revised Standard Version"}];function o({extensions:s=V,projects:p=A,extensionsLabel:i="Extension Settings",projectsLabel:b="Project Settings",placeholder:w="Select a project..."}){const[t,r]=j.useState({label:"Platform Bible Core"}),h=(x,G)=>{r({label:x,projectId:G})};return e.jsxs("div",{className:"tw:flex tw:w-full",children:[e.jsx(u,{extensionLabels:s,projectInfo:p,handleSelectSidebarItem:h,selectedSidebarItem:t,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:b,buttonPlaceholderText:w}),e.jsx("div",{className:"tw:flex-1 tw:bg-gray-50 tw:p-6",children:e.jsxs("div",{className:"tw:space-y-4",children:[e.jsx("h2",{className:"tw:text-xl tw:font-semibold",children:"Settings Content"}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-white tw:p-4",children:[e.jsx("h3",{className:"tw:mb-2 tw:font-medium",children:"Currently Selected:"}),e.jsxs("div",{className:"tw:space-y-1 tw:text-sm",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Label:"})," ",t.label]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Project ID:"})," ",t.projectId||"None"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Type:"})," ",t.projectId?"Project Setting":"Extension Setting"]})]})]}),e.jsx("div",{className:"tw:rounded tw:bg-blue-50 tw:p-4",children:e.jsx("p",{className:"tw:text-sm tw:text-blue-800",children:t.projectId?`Configure settings for the selected project: ${t.label}`:`Configure settings for the ${t.label} extension`})})]})})]})}const n={render:()=>e.jsx(o,{})},a={render:()=>e.jsx(o,{extensions:{core:"Core Settings",ui:"User Interface",plugins:"Plugin Manager"},projects:[{projectId:"proj-1",projectName:"Sample Project"},{projectId:"proj-2",projectName:"Demo Project"}]}),parameters:{docs:{description:{story:"Sidebar with minimal extension settings and limited project options."}}}},c={render:()=>e.jsx(o,{projects:[],placeholder:"No projects available"}),parameters:{docs:{description:{story:"Sidebar with no projects available, showing how the dropdown handles empty state."}}}},l={render:()=>e.jsx(o,{extensionsLabel:"Available Extensions",projectsLabel:"Bible Projects",placeholder:"Choose a Bible project..."}),parameters:{docs:{description:{story:"Sidebar with customized section labels and placeholder text."}}}},d={render:()=>{const s={"platform-bible-core":"Platform Bible Core","platform-bible-react":"Platform Bible React","platform-bible-utils":"Platform Bible Utils","text-editor":"Text Editor","reference-selector":"Reference Selector","note-taking":"Note Taking","translation-helper":"Translation Helper","word-study":"Word Study Tools",concordance:"Concordance Search",commentary:"Commentary Viewer",maps:"Biblical Maps",timeline:"Biblical Timeline",languages:"Language Support",themes:"Theme Manager",backup:"Backup & Sync"};return e.jsx(o,{extensions:s})},parameters:{docs:{description:{story:"Sidebar with many extension settings showing scrollable behavior."}}}},m={render:()=>{const[s,p]=j.useState({label:"Platform Bible Core"}),[i,b]=j.useState([]),w=(t,r)=>{const h=r?`${t} (Project: ${r})`:t;b(x=>[h,...x.slice(0,4)]),p({label:t,projectId:r})};return e.jsxs("div",{className:"tw:flex tw:w-full",children:[e.jsx(u,{id:"interactive-sidebar",extensionLabels:V,projectInfo:A,handleSelectSidebarItem:w,selectedSidebarItem:s,extensionsSidebarGroupLabel:"Extension Settings",projectsSidebarGroupLabel:"Project Settings",buttonPlaceholderText:"Select a project..."}),e.jsx("div",{className:"tw:flex-1 tw:bg-gray-50 tw:p-6",children:e.jsxs("div",{className:"tw:space-y-4",children:[e.jsx("h2",{className:"tw:text-xl tw:font-semibold",children:"Interactive Settings Demo"}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-white tw:p-4",children:[e.jsx("h3",{className:"tw:mb-2 tw:font-medium",children:"Current Selection:"}),e.jsxs("div",{className:"tw:space-y-1 tw:text-sm",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Label:"})," ",s.label]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Project ID:"})," ",s.projectId||"None"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Type:"})," ",s.projectId?"Project Setting":"Extension Setting"]})]})]}),e.jsxs("div",{className:"tw:rounded tw:border tw:bg-white tw:p-4",children:[e.jsx("h3",{className:"tw:mb-2 tw:font-medium",children:"Selection History:"}),e.jsx("div",{className:"tw:space-y-1",children:i.length===0?e.jsx("div",{className:"tw:text-sm tw:text-muted-foreground",children:"No selections yet"}):i.map((t,r)=>e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2 tw:text-sm",children:[e.jsx("span",{className:"tw:flex tw:h-4 tw:w-4 tw:items-center tw:justify-center tw:rounded tw:bg-blue-100 tw:text-xs tw:text-blue-800",children:r+1}),t]},r))})]}),e.jsxs("div",{className:"tw:rounded tw:bg-yellow-50 tw:p-4",children:[e.jsx("h3",{className:"tw:mb-2 tw:font-medium",children:"Try This:"}),e.jsxs("ul",{className:"tw:list-inside tw:list-disc tw:space-y-1 tw:text-sm",children:[e.jsx("li",{children:"Click different extension settings to see them highlighted"}),e.jsx("li",{children:"Use the project dropdown to select different projects"}),e.jsx("li",{children:"Notice how the selection history tracks your choices"})]})]})]})})]})},parameters:{docs:{description:{story:"Interactive demo showing selection tracking and state management."}}}};var g,S,f;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <SettingsSidebarDemo />
}`,...(f=(S=n.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var y,v,N;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <SettingsSidebarDemo extensions={{
    core: 'Core Settings',
    ui: 'User Interface',
    plugins: 'Plugin Manager'
  }} projects={[{
    projectId: 'proj-1',
    projectName: 'Sample Project'
  }, {
    projectId: 'proj-2',
    projectName: 'Demo Project'
  }]} />,
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with minimal extension settings and limited project options.'
      }
    }
  }
}`,...(N=(v=a.parameters)==null?void 0:v.docs)==null?void 0:N.source}}};var I,P,T;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <SettingsSidebarDemo projects={[]} placeholder="No projects available" />,
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with no projects available, showing how the dropdown handles empty state.'
      }
    }
  }
}`,...(T=(P=c.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var C,E,B;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <SettingsSidebarDemo extensionsLabel="Available Extensions" projectsLabel="Bible Projects" placeholder="Choose a Bible project..." />,
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with customized section labels and placeholder text.'
      }
    }
  }
}`,...(B=(E=l.parameters)==null?void 0:E.docs)==null?void 0:B.source}}};var L,k,D;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
    const manyExtensions = {
      'platform-bible-core': 'Platform Bible Core',
      'platform-bible-react': 'Platform Bible React',
      'platform-bible-utils': 'Platform Bible Utils',
      'text-editor': 'Text Editor',
      'reference-selector': 'Reference Selector',
      'note-taking': 'Note Taking',
      'translation-helper': 'Translation Helper',
      'word-study': 'Word Study Tools',
      concordance: 'Concordance Search',
      commentary: 'Commentary Viewer',
      maps: 'Biblical Maps',
      timeline: 'Biblical Timeline',
      languages: 'Language Support',
      themes: 'Theme Manager',
      backup: 'Backup & Sync'
    };
    return <SettingsSidebarDemo extensions={manyExtensions} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with many extension settings showing scrollable behavior.'
      }
    }
  }
}`,...(D=(k=d.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var H,M,R;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => {
    const [selectedItem, setSelectedItem] = useState<SelectedSettingsSidebarItem>({
      label: 'Platform Bible Core'
    });
    const [selectionHistory, setSelectionHistory] = useState<string[]>([]);
    const handleSelectSidebarItem = (key: string, projectId?: string) => {
      const selectionText = projectId ? \`\${key} (Project: \${projectId})\` : key;
      setSelectionHistory(prev => [selectionText, ...prev.slice(0, 4)]);
      setSelectedItem({
        label: key,
        projectId
      });
    };
    return <div className="tw:flex tw:w-full">
        <SettingsSidebar id="interactive-sidebar" extensionLabels={sampleExtensions} projectInfo={sampleProjects} handleSelectSidebarItem={handleSelectSidebarItem} selectedSidebarItem={selectedItem} extensionsSidebarGroupLabel="Extension Settings" projectsSidebarGroupLabel="Project Settings" buttonPlaceholderText="Select a project..." />

        <div className="tw:flex-1 tw:bg-gray-50 tw:p-6">
          <div className="tw:space-y-4">
            <h2 className="tw:text-xl tw:font-semibold">Interactive Settings Demo</h2>

            <div className="tw:rounded tw:border tw:bg-white tw:p-4">
              <h3 className="tw:mb-2 tw:font-medium">Current Selection:</h3>
              <div className="tw:space-y-1 tw:text-sm">
                <div>
                  <strong>Label:</strong> {selectedItem.label}
                </div>
                <div>
                  <strong>Project ID:</strong> {selectedItem.projectId || 'None'}
                </div>
                <div>
                  <strong>Type:</strong>{' '}
                  {selectedItem.projectId ? 'Project Setting' : 'Extension Setting'}
                </div>
              </div>
            </div>

            <div className="tw:rounded tw:border tw:bg-white tw:p-4">
              <h3 className="tw:mb-2 tw:font-medium">Selection History:</h3>
              <div className="tw:space-y-1">
                {selectionHistory.length === 0 ? <div className="tw:text-sm tw:text-muted-foreground">No selections yet</div> : selectionHistory.map((selection, index) =>
              // Items have no stable unique id; index is the only available key
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="tw:flex tw:items-center tw:gap-2 tw:text-sm">
                      <span className="tw:flex tw:h-4 tw:w-4 tw:items-center tw:justify-center tw:rounded tw:bg-blue-100 tw:text-xs tw:text-blue-800">
                        {index + 1}
                      </span>
                      {selection}
                    </div>)}
              </div>
            </div>

            <div className="tw:rounded tw:bg-yellow-50 tw:p-4">
              <h3 className="tw:mb-2 tw:font-medium">Try This:</h3>
              <ul className="tw:list-inside tw:list-disc tw:space-y-1 tw:text-sm">
                <li>Click different extension settings to see them highlighted</li>
                <li>Use the project dropdown to select different projects</li>
                <li>Notice how the selection history tracks your choices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing selection tracking and state management.'
      }
    }
  }
}`,...(R=(M=m.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};const $e=["Default","MinimalExtensions","EmptyProjects","CustomLabels","ManyExtensions","InteractiveDemo"];export{l as CustomLabels,n as Default,c as EmptyProjects,m as InteractiveDemo,d as ManyExtensions,a as MinimalExtensions,$e as __namedExportsOrder,Ue as default};
