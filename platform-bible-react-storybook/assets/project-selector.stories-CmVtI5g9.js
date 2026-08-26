import{j as r,r as a}from"./iframe-piLeQRTW.js";import{P as s}from"./project-selector.component-oreeydNv.js";import"./preload-helper-CTOgD26E.js";import"./index-BKT-qVtu.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./index-wk9rVj3k.js";import"./scripture-util-Df5kpddK-R3MLYGBX.js";import"./utils-BPbySc-g.js";import"./z-index-CoNkaVR8.js";import"./badge-gZDjgf8h.js";import"./index-BnuTq2W6.js";import"./index-BFh5Lo3o.js";import"./button-COJne2YN.js";import"./popover-CdHE2Oqk.js";import"./index-CeC1c3-I.js";import"./index-DQwmUbGW.js";import"./index-DhzguSRL.js";import"./index-Lo-zoURl.js";import"./index-Di_18i4Z.js";import"./index-Bc0ZUTGS.js";import"./index-C86Z_Tp2.js";import"./index-Bxg7sB1q.js";import"./index-BClnd7xe.js";import"./index-BHLoU5rD.js";import"./index-B_g7hjDx.js";import"./command-D1nM5Fb3.js";import"./index-qulw53P3.js";import"./dialog-W5YAjqgf.js";import"./createReactComponent-D577i2xe.js";import"./input-group-BxiA5gHY.js";import"./input-CqnFMo8l.js";import"./IconCheck-CMkUfAwK.js";import"./dropdown-menu-CWn3PeyJ.js";import"./menu.context-C9glCwid.js";import"./IconChevronRight-6fJYeABv.js";import"./index-BWAPhVUT.js";import"./index-DYfvh3Ym.js";import"./tooltip-BFhqQ11H.js";import"./index-KlctRFCf.js";import"./use-truncation-tooltip.hook-xiAvgkK3.js";import"./funnel-AHs4Krnn.js";import"./createLucideIcon-Bm99h94W.js";import"./check-B3GQRVmK.js";import"./arrow-right-B5f9UeCm.js";import"./loader-circle-D7Qh5mWp.js";import"./chevrons-up-down-CHpBCXU6.js";import"./chevron-down-DuHSXNWj.js";const i=[{id:"hpux",shortName:"HPUX",fullName:"Hawaii Pidgin UX Test Project",language:"Hawaii Creole English",languageCode:"hwc-x-ux"},{id:"esvus16",shortName:"ESVUS16",fullName:"English Standard Version (US) 2016",language:"English",languageCode:"en-US"},{id:"esv16uk",shortName:"ESV16UK",fullName:"English Standard Version (UK) 2016",language:"English",languageCode:"en-GB"},{id:"tp1",shortName:"TP1",fullName:"Test Project 1",language:"English",languageCode:"en"},{id:"heb-grk",shortName:"HEB/GRK",fullName:"Hebrew / Greek",language:"Hebrew / Greek",languageCode:"he/el"},{id:"schl1951",shortName:"SCHL1951",fullName:"Schlachter 1951",language:"German",languageCode:"de"},{id:"web",shortName:"WEB",fullName:"World English Bible",language:"English",languageCode:"en"}],d=[{projectId:"esvus16",scrollGroupId:0,scrollGroupScrRefLabel:"GEN 1:1"},{projectId:"esvus16",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"hpux",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"web",scrollGroupId:2,scrollGroupScrRefLabel:"JHN 1:1"}],Ze={title:"Advanced/Project Selector",component:s,tags:["autodocs"],decorators:[e=>r.jsx("div",{className:"tw:w-[320px] tw:p-4",children:r.jsx(e,{})})]},h={render:()=>{const[e,t]=a.useState("esvus16");return r.jsx(s,{mode:"project",projects:i,openTabs:d,selection:{projectId:e},onChangeSelection:({projectId:o})=>t(o),buttonPlaceholder:"Select a project",ariaLabel:"Project"})},parameters:{docs:{description:{story:"Single-select in `project` mode. One row per project; the chips on the right list every scroll group the project is currently open in (metadata only — the whole row is the click target). Rows for projects not open anywhere render in muted text. Selected rows float to the top of their section."}}}},m={render:()=>{const[e,t]=a.useState("esvus16");return r.jsx("div",{className:"tw:w-80",children:r.jsx(s,{mode:"project",projects:i,openTabs:d,selection:{projectId:e},onChangeSelection:({projectId:o})=>t(o),buttonPlaceholder:"Select a project",ariaLabel:"Project",triggerLabelFormat:"shortNameAndFullName",buttonClassName:"tw:w-full"})})},parameters:{docs:{description:{story:'`triggerLabelFormat="shortNameAndFullName"` renders `{shortName} - {fullName}` in the trigger (manage-books wide sidebar). The short name leads so ellipsis truncation keeps it readable, and the trigger\'s own tooltip carries the untruncated text on hover.'}}}},j={render:()=>{const[e,t]=a.useState("esvus16");return r.jsx("div",{className:"tw:w-14",children:r.jsx(s,{mode:"project",projects:i,openTabs:d,selection:{projectId:e},onChangeSelection:({projectId:o})=>t(o),buttonPlaceholder:"Select",ariaLabel:"Project",hideTriggerChevron:!0,buttonClassName:"tw:w-full tw:px-0.5 tw:text-xs"})})},parameters:{docs:{description:{story:"`hideTriggerChevron` for very narrow triggers (e.g. an icon-rail sidebar ~56px wide): the chevron plus its margin would consume the whole content box and truncate the label to nothing. The outline button variant keeps it recognizable as a control; pair it with an external tooltip carrying the full project name (as the manage-books narrow rail does). Deliberate deviation from the combobox chevron guideline — see the prop JSDoc."}}}},b={render:()=>{const[e,t]=a.useState([{projectId:"esvus16",scrollGroupId:0},{projectId:"esv16uk"}]),[o,n]=a.useState(d);return r.jsx(s,{mode:"project-multi",projects:i,openTabs:o,selection:{pairs:e},onChangeSelection:({pairs:c})=>t(c),onOpenProjectInGroup:(c,l)=>{n(p=>p.some(u=>u.projectId===c&&u.scrollGroupId===l)?p:[...p,{projectId:c,scrollGroupId:l}])},buttonPlaceholder:"Select projects",ariaLabel:"Projects"})},parameters:{docs:{description:{story:'Multi-select over `(projectId, scrollGroupId)` pairs. The same project open in two scroll groups renders as two rows, each independently selectable. Trigger label reads "N: short1 (A), short2 (B), ..." and truncates with ellipsis on overflow. Filter dropdown offers "Group by open tabs" and "Show selected only". Selected pairs whose tab is closed render with a struck chip and an "Open" button.'}}}},g={render:()=>{const[e,t]=a.useState({projectId:"esvus16",scrollGroupId:1}),[o,n]=a.useState(d);return r.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2",children:[r.jsx(s,{mode:"projectScrollGroup",projects:i,openTabs:o,selection:e,onChangeSelection:t,onOpenProjectInGroup:(c,l)=>{n(p=>p.some(u=>u.projectId===c&&u.scrollGroupId===l)?p:[...p,{projectId:c,scrollGroupId:l}])},buttonPlaceholder:"Select a project + scroll group",ariaLabel:"Project with scroll group"}),r.jsx("button",{type:"button",className:"tw:rounded tw:border tw:border-border tw:px-2 tw:py-1 tw:text-xs",onClick:()=>n(c=>c.filter(l=>!(l.projectId===e.projectId&&l.scrollGroupId===e.scrollGroupId))),children:"Close tab for current selection (shows bound-but-closed synthetic row)"})]})},parameters:{docs:{description:{story:"One row per `(project, open scroll group)` pair, plus one row per project not open anywhere. Clicking a not-open-project row calls `onOpenProjectInGroup(projectId, 0)` to open a tab in Group A and selects that pair. Use the button to close the currently-bound tab — a synthetic row appears with an outlined chip and `○` glyph; clicking it calls `onOpenProjectInGroup` again to reopen without changing selection."}}}},re=[...i,{id:"na28",shortName:"NA28",fullName:"Nestle-Aland 28th Edition (Greek NT)",language:"Greek",languageCode:"el"},{id:"bhs",shortName:"BHS",fullName:"Biblia Hebraica Stuttgartensia",language:"Hebrew",languageCode:"he"},{id:"lxx",shortName:"LXX",fullName:"Septuagint",language:"Greek",languageCode:"el"}],w={render:()=>{const[e,t]=a.useState("esvus16");return r.jsx(s,{mode:"project",projects:re,openTabs:[],selection:{projectId:e},onChangeSelection:({projectId:o})=>t(o),buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"})},parameters:{docs:{description:{story:'The simplest possible display: single-select with `mode="project"` and `openTabs={[]}`. No scroll-group chips render on any row, no "Opened project & resource tabs" section appears, and `partitionAndSort` collapses to a single flat, unheaded list. Sample data mixes projects (HPUX, TP1, SCHL1951) and resources (NA28, BHS, LXX) — note the component itself does not visually distinguish the two; they render identically. The "Group by open tabs" toggle is still present in the filter menu (no way to hide it) but has no visible effect while `openTabs` is empty.'}}}},S={render:()=>{const[e,t]=a.useState([{projectId:"esvus16"},{projectId:"bhs"}]);return r.jsx(s,{mode:"project-multi",projects:re,openTabs:[],selection:{pairs:e},onChangeSelection:({pairs:o})=>t(o),buttonPlaceholder:"Select projects and resources",ariaLabel:"Projects and resources"})},parameters:{docs:{description:{story:'Multi-select without scroll groups: `mode="project-multi"` with `openTabs={[]}`. Every row corresponds to a single `{ projectId }` pair (no `scrollGroupId`), so no chips, no "Open" buttons, and no bound-but-closed synthetic rows appear. The trigger label reads "N: short1, short2, ..." driven by the default `getSelectedText`.'}}}},I={render:()=>{const[e,t]=a.useState(void 0);return r.jsx(s,{mode:"project",projects:[],openTabs:[],selection:{projectId:e},onChangeSelection:({projectId:o})=>t(o),buttonPlaceholder:"Select a project",commandEmptyMessage:"No projects found",ariaLabel:"Project"})}},P={render:()=>r.jsx(s,{mode:"project",projects:i,openTabs:d,selection:{projectId:"esvus16"},onChangeSelection:()=>{},buttonPlaceholder:"Select a project",ariaLabel:"Project",isDisabled:!0})},y={render:()=>r.jsx(s,{mode:"project",projects:[],openTabs:[],selection:{projectId:void 0},onChangeSelection:()=>{},buttonPlaceholder:"Select a project",ariaLabel:"Project",isLoading:!0}),parameters:{docs:{description:{story:"`isLoading` shows a spinner in place of the chevron and disables the trigger while the project list is still loading, so the user sees the picker is not ready yet (distinct from `isDisabled`, which is a generic busy state with no spinner). See I1."}}}},f={render:()=>{const e=i.map(n=>n.id==="esv16uk"||n.id==="tp1"?{...n,isDisabled:!0,disabledReason:"Read-only — cannot copy into this project"}:n),[t,o]=a.useState(void 0);return r.jsx(s,{mode:"project",projects:e,openTabs:d,selection:{projectId:t},onChangeSelection:({projectId:n})=>o(n),buttonPlaceholder:"Pick a target project",ariaLabel:"Project"})},parameters:{docs:{description:{story:"Two projects (`ESV16UK`, `TP1`) are marked disabled with a `disabledReason`. They render muted, are not selectable (Up/Down navigation skips them), and the reason surfaces in the row tooltip. Use this to surface read-only or otherwise-unusable projects without filtering them out of the list."}}}};var T,v,x;h.parameters={...h.parameters,docs:{...(T=h.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(x=(v=h.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var N,G,C;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(C=(G=m.parameters)==null?void 0:G.docs)==null?void 0:C.source}}};var L,k,O;j.parameters={...j.parameters,docs:{...(L=j.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(O=(k=j.parameters)==null?void 0:k.docs)==null?void 0:O.source}}};var E,R,A;b.parameters={...b.parameters,docs:{...(E=b.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(A=(R=b.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};var D,H,U;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(U=(H=g.parameters)==null?void 0:H.docs)==null?void 0:U.source}}};var F,B,M;w.parameters={...w.parameters,docs:{...(F=w.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return <ProjectSelector mode="project" projects={sampleProjectsAndResources} openTabs={[]} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} buttonPlaceholder="Select a project or resource" ariaLabel="Project or resource" />;
  },
  parameters: {
    docs: {
      description: {
        story: 'The simplest possible display: single-select with \`mode="project"\` and \`openTabs={[]}\`. No scroll-group chips render on any row, no "Opened project & resource tabs" section appears, and \`partitionAndSort\` collapses to a single flat, unheaded list. Sample data mixes projects (HPUX, TP1, SCHL1951) and resources (NA28, BHS, LXX) — note the component itself does not visually distinguish the two; they render identically. The "Group by open tabs" toggle is still present in the filter menu (no way to hide it) but has no visible effect while \`openTabs\` is empty.'
      }
    }
  }
}`,...(M=(B=w.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var X,W,V;S.parameters={...S.parameters,docs:{...(X=S.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => {
    const [pairs, setPairs] = useState<ProjectSelectorProjectPair[]>([{
      projectId: 'esvus16'
    }, {
      projectId: 'bhs'
    }]);
    return <ProjectSelector mode="project-multi" projects={sampleProjectsAndResources} openTabs={[]} selection={{
      pairs
    }} onChangeSelection={({
      pairs: next
    }) => setPairs(next)} buttonPlaceholder="Select projects and resources" ariaLabel="Projects and resources" />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select without scroll groups: \`mode="project-multi"\` with \`openTabs={[]}\`. Every row corresponds to a single \`{ projectId }\` pair (no \`scrollGroupId\`), so no chips, no "Open" buttons, and no bound-but-closed synthetic rows appear. The trigger label reads "N: short1, short2, ..." driven by the default \`getSelectedText\`.'
      }
    }
  }
}`,...(V=(W=S.parameters)==null?void 0:W.docs)==null?void 0:V.source}}};var K,J,q;I.parameters={...I.parameters,docs:{...(K=I.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>(undefined);
    return <ProjectSelector mode="project" projects={[]} openTabs={[]} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} buttonPlaceholder="Select a project" commandEmptyMessage="No projects found" ariaLabel="Project" />;
  }
}`,...(q=(J=I.parameters)==null?void 0:J.docs)==null?void 0:q.source}}};var z,_,Q;P.parameters={...P.parameters,docs:{...(z=P.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
    projectId: 'esvus16'
  }} onChangeSelection={() => {}} buttonPlaceholder="Select a project" ariaLabel="Project" isDisabled />
}`,...(Q=(_=P.parameters)==null?void 0:_.docs)==null?void 0:Q.source}}};var Y,Z,$;y.parameters={...y.parameters,docs:{...(Y=y.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...($=(Z=y.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,te,oe;f.parameters={...f.parameters,docs:{...(ee=f.parameters)==null?void 0:ee.docs,source:{originalSource:`{
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
}`,...(oe=(te=f.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};const $e=["SingleProject","WideTriggerLabel","NarrowRailTrigger","MultiProject","ScrollGroupBinding","SimpleFlatList","SimpleFlatMultiSelect","NoProjects","Disabled","Loading","PerRowDisabled"];export{P as Disabled,y as Loading,b as MultiProject,j as NarrowRailTrigger,I as NoProjects,f as PerRowDisabled,g as ScrollGroupBinding,w as SimpleFlatList,S as SimpleFlatMultiSelect,h as SingleProject,m as WideTriggerLabel,$e as __namedExportsOrder,Ze as default};
