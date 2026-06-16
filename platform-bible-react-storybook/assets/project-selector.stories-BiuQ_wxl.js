import{j as t,r as p}from"./iframe-D18lKIKU.js";import{P as l}from"./project-selector.component-C8OFFbE5.js";import"./preload-helper-CTOgD26E.js";import"./index-BnMb6O87.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./scripture-util-CIEEBU92-Dw9itcOy.js";import"./utils-BPbySc-g.js";import"./z-index-CoNkaVR8.js";import"./badge-xiXaEtHr.js";import"./index-BnuTq2W6.js";import"./index-DJ8FvcXn.js";import"./button-dWMnsJ9d.js";import"./popover-Dri8XiLr.js";import"./index-BWZTOaeE.js";import"./index-C8OffPiQ.js";import"./index-DXG0y8Eh.js";import"./index-B1zy_L8S.js";import"./index-XgILNRl1.js";import"./index-CVolSeXR.js";import"./index-dVmW3GXK.js";import"./index-S9SelDCj.js";import"./index-CFjnR6r9.js";import"./index-DmtVN2hL.js";import"./index-DgBJYSLB.js";import"./command-B3l8dzLC.js";import"./index-BrPop8TO.js";import"./dialog-Capgj_Np.js";import"./createReactComponent-C4B6fflP.js";import"./input-group-BFGE64R6.js";import"./input-B8Eaj5Wd.js";import"./IconCheck-DMWUSR0B.js";import"./dropdown-menu-CZ0SC4TO.js";import"./menu.context-6OUtZqac.js";import"./IconChevronRight-CjLia2b7.js";import"./index-CIsKK2g9.js";import"./index-BfWh6_lu.js";import"./tooltip-4mra4Zza.js";import"./index-B6vO9pRj.js";import"./chevrons-up-down-CHcuFe1Y.js";import"./createLucideIcon-BO7dMgER.js";import"./chevron-down-CNB6XbdY.js";import"./funnel-B-FQffkQ.js";import"./check-CB51WORs.js";import"./arrow-right-DXMQ55H7.js";const d=[{id:"hpux",shortName:"HPUX",fullName:"Hawaii Pidgin UX Test Project",language:"Hawaii Creole English",languageCode:"hwc-x-ux"},{id:"esvus16",shortName:"ESVUS16",fullName:"English Standard Version (US) 2016",language:"English",languageCode:"en-US"},{id:"esv16uk",shortName:"ESV16UK",fullName:"English Standard Version (UK) 2016",language:"English",languageCode:"en-GB"},{id:"tp1",shortName:"TP1",fullName:"Test Project 1",language:"English",languageCode:"en"},{id:"heb-grk",shortName:"HEB/GRK",fullName:"Hebrew / Greek",language:"Hebrew / Greek",languageCode:"he/el"},{id:"schl1951",shortName:"SCHL1951",fullName:"Schlachter 1951",language:"German",languageCode:"de"},{id:"web",shortName:"WEB",fullName:"World English Bible",language:"English",languageCode:"en"}],u=[{projectId:"esvus16",scrollGroupId:0,scrollGroupScrRefLabel:"GEN 1:1"},{projectId:"esvus16",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"hpux",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"web",scrollGroupId:2,scrollGroupScrRefLabel:"JHN 1:1"}],Ce={title:"Advanced/Project Selector",component:l,tags:["autodocs"],decorators:[e=>t.jsx("div",{className:"tw:w-[320px] tw:p-4",children:t.jsx(e,{})})]},j={render:()=>{const[e,r]=p.useState("esvus16");return t.jsx(l,{mode:"project",projects:d,openTabs:u,selection:{projectId:e},onChangeSelection:({projectId:s})=>r(s),buttonPlaceholder:"Select a project",ariaLabel:"Project"})},parameters:{docs:{description:{story:"Single-select in `project` mode. One row per project; the chips on the right list every scroll group the project is currently open in (metadata only — the whole row is the click target). Rows for projects not open anywhere render in muted text. Selected rows float to the top of their section."}}}},m={render:()=>{const[e,r]=p.useState([{projectId:"esvus16",scrollGroupId:0},{projectId:"esv16uk"}]),[s,o]=p.useState(u);return t.jsx(l,{mode:"project-multi",projects:d,openTabs:s,selection:{pairs:e},onChangeSelection:({pairs:n})=>r(n),onOpenProjectInGroup:(n,c)=>{o(a=>a.some(i=>i.projectId===n&&i.scrollGroupId===c)?a:[...a,{projectId:n,scrollGroupId:c}])},buttonPlaceholder:"Select projects",ariaLabel:"Projects"})},parameters:{docs:{description:{story:'Multi-select over `(projectId, scrollGroupId)` pairs. The same project open in two scroll groups renders as two rows, each independently selectable. Trigger label reads "N: short1 (A), short2 (B), ..." and truncates with ellipsis on overflow. Filter dropdown offers "Group by open tabs" and "Show selected only". Selected pairs whose tab is closed render with a struck chip and an "Open" button.'}}}},h={render:()=>{const[e,r]=p.useState({projectId:"esvus16",scrollGroupId:1}),[s,o]=p.useState(u);return t.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2",children:[t.jsx(l,{mode:"projectScrollGroup",projects:d,openTabs:s,selection:e,onChangeSelection:r,onOpenProjectInGroup:(n,c)=>{o(a=>a.some(i=>i.projectId===n&&i.scrollGroupId===c)?a:[...a,{projectId:n,scrollGroupId:c}])},buttonPlaceholder:"Select a project + scroll group",ariaLabel:"Project with scroll group"}),t.jsx("button",{type:"button",className:"tw:rounded tw:border tw:border-border tw:px-2 tw:py-1 tw:text-xs",onClick:()=>o(n=>n.filter(c=>!(c.projectId===e.projectId&&c.scrollGroupId===e.scrollGroupId))),children:"Close tab for current selection (shows bound-but-closed synthetic row)"})]})},parameters:{docs:{description:{story:"One row per `(project, open scroll group)` pair, plus one row per project not open anywhere. Clicking a not-open-project row calls `onOpenProjectInGroup(projectId, 0)` to open a tab in Group A and selects that pair. Use the button to close the currently-bound tab — a synthetic row appears with an outlined chip and `○` glyph; clicking it calls `onOpenProjectInGroup` again to reopen without changing selection."}}}},b={render:()=>{const[e,r]=p.useState(void 0);return t.jsx(l,{mode:"project",projects:[],openTabs:[],selection:{projectId:e},onChangeSelection:({projectId:s})=>r(s),buttonPlaceholder:"Select a project",commandEmptyMessage:"No projects found",ariaLabel:"Project"})}},g={render:()=>t.jsx(l,{mode:"project",projects:d,openTabs:u,selection:{projectId:"esvus16"},onChangeSelection:()=>{},buttonPlaceholder:"Select a project",ariaLabel:"Project",isDisabled:!0})},w={render:()=>{const e=d.map(o=>o.id==="esv16uk"||o.id==="tp1"?{...o,isDisabled:!0,disabledReason:"Read-only — cannot copy into this project"}:o),[r,s]=p.useState(void 0);return t.jsx(l,{mode:"project",projects:e,openTabs:u,selection:{projectId:r},onChangeSelection:({projectId:o})=>s(o),buttonPlaceholder:"Pick a target project",ariaLabel:"Project"})},parameters:{docs:{description:{story:"Two projects (`ESV16UK`, `TP1`) are marked disabled with a `disabledReason`. They render muted, are not selectable (Up/Down navigation skips them), and the reason surfaces in the row tooltip. Use this to surface read-only or otherwise-unusable projects without filtering them out of the list."}}}};var I,S,P;j.parameters={...j.parameters,docs:{...(I=j.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} buttonPlaceholder="Select a project" ariaLabel="Project" />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Single-select in \`project\` mode. One row per project; the chips on the right list every scroll group the project is currently open in (metadata only — the whole row is the click target). Rows for projects not open anywhere render in muted text. Selected rows float to the top of their section.'
      }
    }
  }
}`,...(P=(S=j.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};var f,y,G;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => {
    const [pairs, setPairs] = useState<ProjectSelectorProjectPair[]>([{
      projectId: 'esvus16',
      scrollGroupId: 0 as ScrollGroupId
    }, {
      projectId: 'esv16uk'
    }]);
    const [openTabs, setOpenTabs] = useState(sampleOpenTabs);
    return <ProjectSelector mode="project-multi" projects={sampleProjects} openTabs={openTabs} selection={{
      pairs
    }} onChangeSelection={({
      pairs: next
    }) => setPairs(next)} onOpenProjectInGroup={(projectId, scrollGroupId) => {
      setOpenTabs(tabs => tabs.some(t => t.projectId === projectId && t.scrollGroupId === scrollGroupId) ? tabs : [...tabs, {
        projectId,
        scrollGroupId
      }]);
    }} buttonPlaceholder="Select projects" ariaLabel="Projects" />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select over \`(projectId, scrollGroupId)\` pairs. The same project open in two scroll groups renders as two rows, each independently selectable. Trigger label reads "N: short1 (A), short2 (B), ..." and truncates with ellipsis on overflow. Filter dropdown offers "Group by open tabs" and "Show selected only". Selected pairs whose tab is closed render with a struck chip and an "Open" button.'
      }
    }
  }
}`,...(G=(y=m.parameters)==null?void 0:y.docs)==null?void 0:G.source}}};var T,x,v;h.parameters={...h.parameters,docs:{...(T=h.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    const [selection, setSelection] = useState<{
      projectId?: string;
      scrollGroupId?: ScrollGroupId;
    }>({
      projectId: 'esvus16',
      scrollGroupId: 1 as ScrollGroupId
    });
    const [openTabs, setOpenTabs] = useState<ProjectSelectorOpenTab[]>(sampleOpenTabs);
    return <div className="tw:flex tw:flex-col tw:gap-2">
        <ProjectSelector mode="projectScrollGroup" projects={sampleProjects} openTabs={openTabs} selection={selection} onChangeSelection={setSelection} onOpenProjectInGroup={(projectId, scrollGroupId) => {
        setOpenTabs(tabs => tabs.some(t => t.projectId === projectId && t.scrollGroupId === scrollGroupId) ? tabs : [...tabs, {
          projectId,
          scrollGroupId
        }]);
      }} buttonPlaceholder="Select a project + scroll group" ariaLabel="Project with scroll group" />
        <button type="button" className="tw:rounded tw:border tw:border-border tw:px-2 tw:py-1 tw:text-xs" onClick={() => setOpenTabs(tabs => tabs.filter(t => !(t.projectId === selection.projectId && t.scrollGroupId === selection.scrollGroupId)))}>
          Close tab for current selection (shows bound-but-closed synthetic row)
        </button>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'One row per \`(project, open scroll group)\` pair, plus one row per project not open anywhere. Clicking a not-open-project row calls \`onOpenProjectInGroup(projectId, 0)\` to open a tab in Group A and selects that pair. Use the button to close the currently-bound tab — a synthetic row appears with an outlined chip and \`○\` glyph; clicking it calls \`onOpenProjectInGroup\` again to reopen without changing selection.'
      }
    }
  }
}`,...(v=(x=h.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var C,O,N;b.parameters={...b.parameters,docs:{...(C=b.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>(undefined);
    return <ProjectSelector mode="project" projects={[]} openTabs={[]} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} buttonPlaceholder="Select a project" commandEmptyMessage="No projects found" ariaLabel="Project" />;
  }
}`,...(N=(O=b.parameters)==null?void 0:O.docs)==null?void 0:N.source}}};var k,E,L;g.parameters={...g.parameters,docs:{...(k=g.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
    projectId: 'esvus16'
  }} onChangeSelection={() => {}} buttonPlaceholder="Select a project" ariaLabel="Project" isDisabled />
}`,...(L=(E=g.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};var R,U,D;w.parameters={...w.parameters,docs:{...(R=w.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => {
    const projectsWithDisabled: ProjectSelectorProject[] = sampleProjects.map(p => p.id === 'esv16uk' || p.id === 'tp1' ? {
      ...p,
      isDisabled: true,
      disabledReason: 'Read-only — cannot copy into this project'
    } : p);
    const [projectId, setProjectId] = useState<string | undefined>(undefined);
    return <ProjectSelector mode="project" projects={projectsWithDisabled} openTabs={sampleOpenTabs} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} buttonPlaceholder="Pick a target project" ariaLabel="Project" />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Two projects (\`ESV16UK\`, \`TP1\`) are marked disabled with a \`disabledReason\`. They render muted, are not selectable (Up/Down navigation skips them), and the reason surfaces in the row tooltip. Use this to surface read-only or otherwise-unusable projects without filtering them out of the list.'
      }
    }
  }
}`,...(D=(U=w.parameters)==null?void 0:U.docs)==null?void 0:D.source}}};const Oe=["SingleProject","MultiProject","ScrollGroupBinding","NoProjects","Disabled","PerRowDisabled"];export{g as Disabled,m as MultiProject,b as NoProjects,w as PerRowDisabled,h as ScrollGroupBinding,j as SingleProject,Oe as __namedExportsOrder,Ce as default};
