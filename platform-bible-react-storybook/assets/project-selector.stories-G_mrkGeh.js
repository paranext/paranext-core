import{j as t,r as c}from"./iframe-C2E5fT_X.js";import{P as n}from"./project-selector.component-LCneUudy.js";import"./preload-helper-CTOgD26E.js";import"./index-D7R6UePp.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./scripture-util-A_1QUftH-D53X2Fsv.js";import"./utils-BPbySc-g.js";import"./z-index-CoNkaVR8.js";import"./badge-DEPactzz.js";import"./index-BnuTq2W6.js";import"./index-DSFQTdMV.js";import"./button-DdeOESPE.js";import"./popover-Coj_0uNk.js";import"./index-BAOIecmR.js";import"./index-ix_9Y8cv.js";import"./index-CTX1WQZF.js";import"./index-DjBhEhJi.js";import"./index-mqzfrla_.js";import"./index-DdJlOORC.js";import"./index-DXg-gZ-k.js";import"./index-DthHniIR.js";import"./index-Dd7lg6Wd.js";import"./index-PpWv9gAw.js";import"./index-C_FLY7IH.js";import"./command-CkmpkWpE.js";import"./index-C4Q-oDK_.js";import"./dialog-D0kwD8in.js";import"./createReactComponent-DSaAAUvL.js";import"./input-group-C2qYjmXu.js";import"./input-CCHnvcJb.js";import"./IconCheck-Ba9XcEpy.js";import"./dropdown-menu-D-IsTAPE.js";import"./menu.context-CdAY-QlN.js";import"./IconChevronRight-8Vszcqem.js";import"./index-DA-06hK0.js";import"./index-CzGH5UXr.js";import"./tooltip-BTH03GAN.js";import"./index-CVYgYSyO.js";import"./funnel-Bt1wOyhl.js";import"./createLucideIcon-0FACdxKg.js";import"./check-DOttjRsb.js";import"./arrow-right-Dx_-eyED.js";import"./loader-circle-D3W3erl_.js";import"./chevrons-up-down-__jeBjJb.js";import"./chevron-down-ELZRpDcd.js";const p=[{id:"hpux",shortName:"HPUX",fullName:"Hawaii Pidgin UX Test Project",language:"Hawaii Creole English",languageCode:"hwc-x-ux"},{id:"esvus16",shortName:"ESVUS16",fullName:"English Standard Version (US) 2016",language:"English",languageCode:"en-US"},{id:"esv16uk",shortName:"ESV16UK",fullName:"English Standard Version (UK) 2016",language:"English",languageCode:"en-GB"},{id:"tp1",shortName:"TP1",fullName:"Test Project 1",language:"English",languageCode:"en"},{id:"heb-grk",shortName:"HEB/GRK",fullName:"Hebrew / Greek",language:"Hebrew / Greek",languageCode:"he/el"},{id:"schl1951",shortName:"SCHL1951",fullName:"Schlachter 1951",language:"German",languageCode:"de"},{id:"web",shortName:"WEB",fullName:"World English Bible",language:"English",languageCode:"en"}],d=[{projectId:"esvus16",scrollGroupId:0,scrollGroupScrRefLabel:"GEN 1:1"},{projectId:"esvus16",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"hpux",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"web",scrollGroupId:2,scrollGroupScrRefLabel:"JHN 1:1"}],Me={title:"Advanced/Project Selector",component:n,tags:["autodocs"],decorators:[e=>t.jsx("div",{className:"tw:w-[320px] tw:p-4",children:t.jsx(e,{})})]},h={render:()=>{const[e,o]=c.useState("esvus16");return t.jsx(n,{mode:"project",projects:p,openTabs:d,selection:{projectId:e},onChangeSelection:({projectId:r})=>o(r),buttonPlaceholder:"Select a project",ariaLabel:"Project"})},parameters:{docs:{description:{story:"Single-select in `project` mode. One row per project; the chips on the right list every scroll group the project is currently open in (metadata only — the whole row is the click target). Rows for projects not open anywhere render in muted text. Selected rows float to the top of their section."}}}},m={render:()=>{const[e,o]=c.useState("esvus16");return t.jsx("div",{className:"tw:w-80",children:t.jsx(n,{mode:"project",projects:p,openTabs:d,selection:{projectId:e},onChangeSelection:({projectId:r})=>o(r),buttonPlaceholder:"Select a project",ariaLabel:"Project",triggerLabelFormat:"shortNameAndFullName",buttonClassName:"tw:w-full"})})},parameters:{docs:{description:{story:'`triggerLabelFormat="shortNameAndFullName"` renders `{shortName} - {fullName}` in the trigger (manage-books wide sidebar). The short name leads so ellipsis truncation keeps it readable, and the trigger\'s own tooltip carries the untruncated text on hover.'}}}},j={render:()=>{const[e,o]=c.useState("esvus16");return t.jsx("div",{className:"tw:w-14",children:t.jsx(n,{mode:"project",projects:p,openTabs:d,selection:{projectId:e},onChangeSelection:({projectId:r})=>o(r),buttonPlaceholder:"Select",ariaLabel:"Project",hideTriggerChevron:!0,buttonClassName:"tw:w-full tw:px-0.5 tw:text-xs"})})},parameters:{docs:{description:{story:"`hideTriggerChevron` for very narrow triggers (e.g. an icon-rail sidebar ~56px wide): the chevron plus its margin would consume the whole content box and truncate the label to nothing. The outline button variant keeps it recognizable as a control; pair it with an external tooltip carrying the full project name (as the manage-books narrow rail does). Deliberate deviation from the combobox chevron guideline — see the prop JSDoc."}}}},b={render:()=>{const[e,o]=c.useState([{projectId:"esvus16",scrollGroupId:0},{projectId:"esv16uk"}]),[r,s]=c.useState(d);return t.jsx(n,{mode:"project-multi",projects:p,openTabs:r,selection:{pairs:e},onChangeSelection:({pairs:a})=>o(a),onOpenProjectInGroup:(a,l)=>{s(i=>i.some(u=>u.projectId===a&&u.scrollGroupId===l)?i:[...i,{projectId:a,scrollGroupId:l}])},buttonPlaceholder:"Select projects",ariaLabel:"Projects"})},parameters:{docs:{description:{story:'Multi-select over `(projectId, scrollGroupId)` pairs. The same project open in two scroll groups renders as two rows, each independently selectable. Trigger label reads "N: short1 (A), short2 (B), ..." and truncates with ellipsis on overflow. Filter dropdown offers "Group by open tabs" and "Show selected only". Selected pairs whose tab is closed render with a struck chip and an "Open" button.'}}}},g={render:()=>{const[e,o]=c.useState({projectId:"esvus16",scrollGroupId:1}),[r,s]=c.useState(d);return t.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2",children:[t.jsx(n,{mode:"projectScrollGroup",projects:p,openTabs:r,selection:e,onChangeSelection:o,onOpenProjectInGroup:(a,l)=>{s(i=>i.some(u=>u.projectId===a&&u.scrollGroupId===l)?i:[...i,{projectId:a,scrollGroupId:l}])},buttonPlaceholder:"Select a project + scroll group",ariaLabel:"Project with scroll group"}),t.jsx("button",{type:"button",className:"tw:rounded tw:border tw:border-border tw:px-2 tw:py-1 tw:text-xs",onClick:()=>s(a=>a.filter(l=>!(l.projectId===e.projectId&&l.scrollGroupId===e.scrollGroupId))),children:"Close tab for current selection (shows bound-but-closed synthetic row)"})]})},parameters:{docs:{description:{story:"One row per `(project, open scroll group)` pair, plus one row per project not open anywhere. Clicking a not-open-project row calls `onOpenProjectInGroup(projectId, 0)` to open a tab in Group A and selects that pair. Use the button to close the currently-bound tab — a synthetic row appears with an outlined chip and `○` glyph; clicking it calls `onOpenProjectInGroup` again to reopen without changing selection."}}}},w={render:()=>{const[e,o]=c.useState(void 0);return t.jsx(n,{mode:"project",projects:[],openTabs:[],selection:{projectId:e},onChangeSelection:({projectId:r})=>o(r),buttonPlaceholder:"Select a project",commandEmptyMessage:"No projects found",ariaLabel:"Project"})}},I={render:()=>t.jsx(n,{mode:"project",projects:p,openTabs:d,selection:{projectId:"esvus16"},onChangeSelection:()=>{},buttonPlaceholder:"Select a project",ariaLabel:"Project",isDisabled:!0})},S={render:()=>t.jsx(n,{mode:"project",projects:[],openTabs:[],selection:{projectId:void 0},onChangeSelection:()=>{},buttonPlaceholder:"Select a project",ariaLabel:"Project",isLoading:!0}),parameters:{docs:{description:{story:"`isLoading` shows a spinner in place of the chevron and disables the trigger while the project list is still loading, so the user sees the picker is not ready yet (distinct from `isDisabled`, which is a generic busy state with no spinner). See I1."}}}},P={render:()=>{const e=p.map(s=>s.id==="esv16uk"||s.id==="tp1"?{...s,isDisabled:!0,disabledReason:"Read-only — cannot copy into this project"}:s),[o,r]=c.useState(void 0);return t.jsx(n,{mode:"project",projects:e,openTabs:d,selection:{projectId:o},onChangeSelection:({projectId:s})=>r(s),buttonPlaceholder:"Pick a target project",ariaLabel:"Project"})},parameters:{docs:{description:{story:"Two projects (`ESV16UK`, `TP1`) are marked disabled with a `disabledReason`. They render muted, are not selectable (Up/Down navigation skips them), and the reason surfaces in the row tooltip. Use this to surface read-only or otherwise-unusable projects without filtering them out of the list."}}}};var f,y,T;h.parameters={...h.parameters,docs:{...(f=h.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(T=(y=h.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var v,x,G;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return <div className="tw:w-80">
        <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
        projectId
      }} onChangeSelection={({
        projectId: newId
      }) => setProjectId(newId)} buttonPlaceholder="Select a project" ariaLabel="Project" triggerLabelFormat="shortNameAndFullName" buttonClassName="tw:w-full" />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: '\`triggerLabelFormat="shortNameAndFullName"\` renders \`{shortName} - {fullName}\` in the trigger (manage-books wide sidebar). The short name leads so ellipsis truncation keeps it readable, and the trigger\\'s own tooltip carries the untruncated text on hover.'
      }
    }
  }
}`,...(G=(x=m.parameters)==null?void 0:x.docs)==null?void 0:G.source}}};var N,C,L;j.parameters={...j.parameters,docs:{...(N=j.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return <div className="tw:w-14">
        <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
        projectId
      }} onChangeSelection={({
        projectId: newId
      }) => setProjectId(newId)} buttonPlaceholder="Select" ariaLabel="Project" hideTriggerChevron buttonClassName="tw:w-full tw:px-0.5 tw:text-xs" />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: '\`hideTriggerChevron\` for very narrow triggers (e.g. an icon-rail sidebar ~56px wide): the chevron plus its margin would consume the whole content box and truncate the label to nothing. The outline button variant keeps it recognizable as a control; pair it with an external tooltip carrying the full project name (as the manage-books narrow rail does). Deliberate deviation from the combobox chevron guideline — see the prop JSDoc.'
      }
    }
  }
}`,...(L=(C=j.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var k,O,E;b.parameters={...b.parameters,docs:{...(k=b.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(E=(O=b.parameters)==null?void 0:O.docs)==null?void 0:E.source}}};var D,R,U;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(U=(R=g.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var A,F,B;w.parameters={...w.parameters,docs:{...(A=w.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>(undefined);
    return <ProjectSelector mode="project" projects={[]} openTabs={[]} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} buttonPlaceholder="Select a project" commandEmptyMessage="No projects found" ariaLabel="Project" />;
  }
}`,...(B=(F=w.parameters)==null?void 0:F.docs)==null?void 0:B.source}}};var H,M,W;I.parameters={...I.parameters,docs:{...(H=I.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
    projectId: 'esvus16'
  }} onChangeSelection={() => {}} buttonPlaceholder="Select a project" ariaLabel="Project" isDisabled />
}`,...(W=(M=I.parameters)==null?void 0:M.docs)==null?void 0:W.source}}};var V,K,J;S.parameters={...S.parameters,docs:{...(V=S.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <ProjectSelector mode="project" projects={[]} openTabs={[]} selection={{
    projectId: undefined
  }} onChangeSelection={() => {}} buttonPlaceholder="Select a project" ariaLabel="Project" isLoading />,
  parameters: {
    docs: {
      description: {
        story: '\`isLoading\` shows a spinner in place of the chevron and disables the trigger while the project list is still loading, so the user sees the picker is not ready yet (distinct from \`isDisabled\`, which is a generic busy state with no spinner). See I1.'
      }
    }
  }
}`,...(J=(K=S.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};var q,z,X;P.parameters={...P.parameters,docs:{...(q=P.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(X=(z=P.parameters)==null?void 0:z.docs)==null?void 0:X.source}}};const We=["SingleProject","WideTriggerLabel","NarrowRailTrigger","MultiProject","ScrollGroupBinding","NoProjects","Disabled","Loading","PerRowDisabled"];export{I as Disabled,S as Loading,b as MultiProject,j as NarrowRailTrigger,w as NoProjects,P as PerRowDisabled,g as ScrollGroupBinding,h as SingleProject,m as WideTriggerLabel,We as __namedExportsOrder,Me as default};
