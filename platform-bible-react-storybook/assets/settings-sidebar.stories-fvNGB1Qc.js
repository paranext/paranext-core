import{j as e}from"./jsx-runtime-CvGToidP.js";import{S as g}from"./settings-sidebar.component-CJBsZrTc.js";import{S as V}from"./sidebar-DnejY9VF.js";import{r as j}from"./iframe-FHgAwj54.js";import"./combo-box.component-CA8nXznD.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./button-cud2eTA2.js";import"./index-C6LUVuya.js";import"./index-D-wbo5Oc.js";import"./index-BPbCuWFR.js";import"./popover-CevumqeB.js";import"./index-Cb3YhHOz.js";import"./index-DMIDenWg.js";import"./index-DvVrmaIy.js";import"./index-CBoFXSy3.js";import"./index-8o_pfAlr.js";import"./index-CgTHgj0j.js";import"./index-BJ-VzaQi.js";import"./index-DmQmB0x9.js";import"./index-desAK0Z_.js";import"./floating-ui.react-dom-DDxLfT8M.js";import"./index-BXuT3Sj2.js";import"./Combination-CMZlQmZK.js";import"./index-DYbRprcN.js";import"./index-gPdjwkel.js";import"./index-DLzBYexm.js";import"./command-D3tc6HP1.js";import"./index-DGcOpdI4.js";import"./index-np2ZhOVR.js";import"./dialog-C1cDbYMW.js";import"./x-CFBWqveS.js";import"./createLucideIcon-B4WsWZHQ.js";import"./search-DYGW0Xl3.js";import"./chevrons-up-down-PdOvZfnq.js";import"./check-Ce2iVscw.js";import"./input-BU551Jib.js";import"./separator-fVx4XNcV.js";import"./skeleton-VGhCf4P8.js";import"./tooltip-Cs5ADqQk.js";import"./index-q5xUhQdo.js";const Te={title:"Advanced/Settings/SettingsSidebar",component:g,tags:["autodocs"],parameters:{docs:{description:{component:`
A sidebar component specifically designed for settings navigation in Platform.Bible applications.

This component provides:
- Extension settings navigation with labeled sections
- Project settings selection via dropdown
- Active item highlighting
- Integration with the shadcn-ui sidebar system
- Customizable labels and styling

The sidebar displays two main sections: extension settings (as clickable menu items) and project settings (as a searchable dropdown). Must be wrapped in a SidebarProvider component.
        `}}},decorators:[s=>e.jsx(V,{children:e.jsx("div",{className:"tw-flex tw-h-96",children:e.jsx(s,{})})})],argTypes:{id:{control:"text",description:"Optional ID for testing purposes"},extensionLabels:{control:!1,description:"Record of extension keys and their display labels"},projectInfo:{control:!1,description:"Array of project information with IDs and names"},handleSelectSidebarItem:{control:!1,description:"Callback function for sidebar item selection"},selectedSidebarItem:{control:!1,description:"Currently selected sidebar item information"},extensionsSidebarGroupLabel:{control:"text",description:"Label for the extensions group section"},projectsSidebarGroupLabel:{control:"text",description:"Label for the projects group section"},buttonPlaceholderText:{control:"text",description:"Placeholder text for the project selection button"},className:{control:"text",description:"Additional CSS classes for styling"}}},A={"platform-bible-core":"Platform Bible Core","platform-bible-react":"Platform Bible React","platform-bible-utils":"Platform Bible Utils","text-editor":"Text Editor","reference-selector":"Reference Selector","note-taking":"Note Taking","translation-helper":"Translation Helper"},G=[{projectId:"project-1",projectName:"English Standard Version"},{projectId:"project-2",projectName:"New International Version"},{projectId:"project-3",projectName:"King James Version"},{projectId:"project-4",projectName:"New American Standard Bible"},{projectId:"project-5",projectName:"Revised Standard Version"}];function o({extensions:s=A,projects:p=G,extensionsLabel:i="Extension Settings",projectsLabel:b="Project Settings",placeholder:w="Select a project..."}){const[t,r]=j.useState({label:"Platform Bible Core"}),h=(x,U)=>{r({label:x,projectId:U})};return e.jsxs("div",{className:"tw-flex tw-w-full",children:[e.jsx(g,{extensionLabels:s,projectInfo:p,handleSelectSidebarItem:h,selectedSidebarItem:t,extensionsSidebarGroupLabel:i,projectsSidebarGroupLabel:b,buttonPlaceholderText:w}),e.jsx("div",{className:"tw-flex-1 tw-bg-gray-50 tw-p-6",children:e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx("h2",{className:"tw-text-xl tw-font-semibold",children:"Settings Content"}),e.jsxs("div",{className:"tw-rounded tw-border tw-bg-white tw-p-4",children:[e.jsx("h3",{className:"tw-mb-2 tw-font-medium",children:"Currently Selected:"}),e.jsxs("div",{className:"tw-space-y-1 tw-text-sm",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Label:"})," ",t.label]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Project ID:"})," ",t.projectId||"None"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Type:"})," ",t.projectId?"Project Setting":"Extension Setting"]})]})]}),e.jsx("div",{className:"tw-rounded tw-bg-blue-50 tw-p-4",children:e.jsx("p",{className:"tw-text-sm tw-text-blue-800",children:t.projectId?`Configure settings for the selected project: ${t.label}`:`Configure settings for the ${t.label} extension`})})]})})]})}const n={render:()=>e.jsx(o,{})},a={render:()=>e.jsx(o,{extensions:{core:"Core Settings",ui:"User Interface",plugins:"Plugin Manager"},projects:[{projectId:"proj-1",projectName:"Sample Project"},{projectId:"proj-2",projectName:"Demo Project"}]}),parameters:{docs:{description:{story:"Sidebar with minimal extension settings and limited project options."}}}},c={render:()=>e.jsx(o,{projects:[],placeholder:"No projects available"}),parameters:{docs:{description:{story:"Sidebar with no projects available, showing how the dropdown handles empty state."}}}},l={render:()=>e.jsx(o,{extensionsLabel:"Available Extensions",projectsLabel:"Bible Projects",placeholder:"Choose a Bible project..."}),parameters:{docs:{description:{story:"Sidebar with customized section labels and placeholder text."}}}},d={render:()=>{const s={"platform-bible-core":"Platform Bible Core","platform-bible-react":"Platform Bible React","platform-bible-utils":"Platform Bible Utils","text-editor":"Text Editor","reference-selector":"Reference Selector","note-taking":"Note Taking","translation-helper":"Translation Helper","word-study":"Word Study Tools",concordance:"Concordance Search",commentary:"Commentary Viewer",maps:"Biblical Maps",timeline:"Biblical Timeline",languages:"Language Support",themes:"Theme Manager",backup:"Backup & Sync"};return e.jsx(o,{extensions:s})},parameters:{docs:{description:{story:"Sidebar with many extension settings showing scrollable behavior."}}}},m={render:()=>{const[s,p]=j.useState({label:"Platform Bible Core"}),[i,b]=j.useState([]),w=(t,r)=>{const h=r?`${t} (Project: ${r})`:t;b(x=>[h,...x.slice(0,4)]),p({label:t,projectId:r})};return e.jsxs("div",{className:"tw-flex tw-w-full",children:[e.jsx(g,{id:"interactive-sidebar",extensionLabels:A,projectInfo:G,handleSelectSidebarItem:w,selectedSidebarItem:s,extensionsSidebarGroupLabel:"Extension Settings",projectsSidebarGroupLabel:"Project Settings",buttonPlaceholderText:"Select a project..."}),e.jsx("div",{className:"tw-flex-1 tw-bg-gray-50 tw-p-6",children:e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx("h2",{className:"tw-text-xl tw-font-semibold",children:"Interactive Settings Demo"}),e.jsxs("div",{className:"tw-rounded tw-border tw-bg-white tw-p-4",children:[e.jsx("h3",{className:"tw-mb-2 tw-font-medium",children:"Current Selection:"}),e.jsxs("div",{className:"tw-space-y-1 tw-text-sm",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Label:"})," ",s.label]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Project ID:"})," ",s.projectId||"None"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Type:"})," ",s.projectId?"Project Setting":"Extension Setting"]})]})]}),e.jsxs("div",{className:"tw-rounded tw-border tw-bg-white tw-p-4",children:[e.jsx("h3",{className:"tw-mb-2 tw-font-medium",children:"Selection History:"}),e.jsx("div",{className:"tw-space-y-1",children:i.length===0?e.jsx("div",{className:"tw-text-sm tw-text-muted-foreground",children:"No selections yet"}):i.map((t,r)=>e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2 tw-text-sm",children:[e.jsx("span",{className:"tw-flex tw-h-4 tw-w-4 tw-items-center tw-justify-center tw-rounded tw-bg-blue-100 tw-text-xs tw-text-blue-800",children:r+1}),t]},r))})]}),e.jsxs("div",{className:"tw-rounded tw-bg-yellow-50 tw-p-4",children:[e.jsx("h3",{className:"tw-mb-2 tw-font-medium",children:"Try This:"}),e.jsxs("ul",{className:"tw-list-inside tw-list-disc tw-space-y-1 tw-text-sm",children:[e.jsx("li",{children:"Click different extension settings to see them highlighted"}),e.jsx("li",{children:"Use the project dropdown to select different projects"}),e.jsx("li",{children:"Notice how the selection history tracks your choices"})]})]})]})})]})},parameters:{docs:{description:{story:"Interactive demo showing selection tracking and state management."}}}};var u,S,f;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
    return <div className="tw-flex tw-w-full">
        <SettingsSidebar id="interactive-sidebar" extensionLabels={sampleExtensions} projectInfo={sampleProjects} handleSelectSidebarItem={handleSelectSidebarItem} selectedSidebarItem={selectedItem} extensionsSidebarGroupLabel="Extension Settings" projectsSidebarGroupLabel="Project Settings" buttonPlaceholderText="Select a project..." />

        <div className="tw-flex-1 tw-bg-gray-50 tw-p-6">
          <div className="tw-space-y-4">
            <h2 className="tw-text-xl tw-font-semibold">Interactive Settings Demo</h2>

            <div className="tw-rounded tw-border tw-bg-white tw-p-4">
              <h3 className="tw-mb-2 tw-font-medium">Current Selection:</h3>
              <div className="tw-space-y-1 tw-text-sm">
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

            <div className="tw-rounded tw-border tw-bg-white tw-p-4">
              <h3 className="tw-mb-2 tw-font-medium">Selection History:</h3>
              <div className="tw-space-y-1">
                {selectionHistory.length === 0 ? <div className="tw-text-sm tw-text-muted-foreground">No selections yet</div> : selectionHistory.map((selection, index) =>
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="tw-flex tw-items-center tw-gap-2 tw-text-sm">
                      <span className="tw-flex tw-h-4 tw-w-4 tw-items-center tw-justify-center tw-rounded tw-bg-blue-100 tw-text-xs tw-text-blue-800">
                        {index + 1}
                      </span>
                      {selection}
                    </div>)}
              </div>
            </div>

            <div className="tw-rounded tw-bg-yellow-50 tw-p-4">
              <h3 className="tw-mb-2 tw-font-medium">Try This:</h3>
              <ul className="tw-list-inside tw-list-disc tw-space-y-1 tw-text-sm">
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
}`,...(R=(M=m.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};const Ce=["Default","MinimalExtensions","EmptyProjects","CustomLabels","ManyExtensions","InteractiveDemo"];export{l as CustomLabels,n as Default,c as EmptyProjects,m as InteractiveDemo,d as ManyExtensions,a as MinimalExtensions,Ce as __namedExportsOrder,Te as default};
