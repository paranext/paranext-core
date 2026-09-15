import{r as n,j as r}from"./iframe-Ct1S2ZOi.js";import{P as c,d as h,m as xe}from"./project-selector.component-bu5hoX83.js";import"./preload-helper-CTOgD26E.js";import"./index-CMl4ZC6j.js";import"./scripture-util-DArajUVn-CPHPTCtZ.js";import"./index.es-CXoS8DB2.js";import"./index-DCo3rgjq.js";import"./index-C77E7Q-s.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./badge-dY0RcXuD.js";import"./index-BnuTq2W6.js";import"./index-DZsvhj6K.js";import"./button-DHQhFIyy.js";import"./popover-DDZifakL.js";import"./index-ymwyXKjB.js";import"./index-SZHVh1Tc.js";import"./index-DHLJ3Oej.js";import"./index-B4iibHSi.js";import"./index-LlRER_qQ.js";import"./index-I7RyV6a1.js";import"./index-BeBu8I9Y.js";import"./index-CiUQk02R.js";import"./index-CJ9u4tGB.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-Ccol6qlI.js";import"./index-Blfsc-zH.js";import"./command-DwXW56xa.js";import"./index-BLXcp1bh.js";import"./dialog--ahHcrWj.js";import"./createReactComponent-BXvMFbar.js";import"./input-group-CR31lhQQ.js";import"./input-CPTZjZT3.js";import"./IconCheck-DUoos7kc.js";import"./dropdown-menu-20voYmud.js";import"./menu.context-B3NbuLku.js";import"./IconChevronRight-B5nbyQcq.js";import"./index-CuQSjKfc.js";import"./index-i18jKU3C.js";import"./tooltip-Dzuez19h.js";import"./index-smprAO2K.js";import"./use-truncation-tooltip.hook-DchEMS5f.js";import"./createLucideIcon-i-AWkgqx.js";import"./check-By-FNbGx.js";import"./arrow-right-B3EcZISO.js";import"./loader-circle-BnuJPceg.js";import"./chevrons-up-down-BLPhZs8B.js";import"./chevron-down-gBLxa5Nr.js";const d=[{id:"hpux",shortName:"HPUX",fullName:"Hawaii Pidgin UX Test Project"},{id:"esvus16",shortName:"ESVUS16",fullName:"English Standard Version (US) 2016"},{id:"esv16uk",shortName:"ESV16UK",fullName:"English Standard Version (UK) 2016"},{id:"tp1",shortName:"TP1",fullName:"Test Project 1"},{id:"heb-grk",shortName:"HEB/GRK",fullName:"Hebrew / Greek"},{id:"schl1951",shortName:"SCHL1951",fullName:"Schlachter 1951"},{id:"web",shortName:"WEB",fullName:"World English Bible"}],l=[{projectId:"esvus16",scrollGroupId:0,scrollGroupScrRefLabel:"GEN 1:1"},{projectId:"esvus16",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"hpux",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"web",scrollGroupId:2,scrollGroupScrRefLabel:"JHN 1:1"}],Nt={title:"Advanced/Project Selector",component:c,tags:["autodocs"],decorators:[e=>r.jsx("div",{className:"tw:w-[320px] tw:p-4",children:r.jsx(e,{})})]},b={render:()=>{const[e,o]=n.useState("esvus16");return r.jsx(c,{mode:"project",projects:d,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:t})=>o(t),localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})},parameters:{docs:{description:{story:"Single-select in `project` mode. One row per project; the chips on the right list every scroll group the project is currently open in (metadata only — the whole row is the click target). Rows for projects not open anywhere render in muted text. Selected rows float to the top of their section. `availableGroupings` is omitted so no filter/grouping menu renders."}}}},S={render:()=>{const[e,o]=n.useState("esvus16");return r.jsx("div",{className:"tw:w-80",children:r.jsx(c,{mode:"project",projects:d,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:t})=>o(t),triggerLabelFormat:"shortNameAndFullName",localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})})},parameters:{docs:{description:{story:'`triggerLabelFormat="shortNameAndFullName"` renders `{shortName} - {fullName}` in the trigger (manage-books wide sidebar). The short name leads so ellipsis truncation keeps it readable, and the trigger\'s own tooltip carries the untruncated text on hover. Width comes from the wrapping `<div className="tw:w-80">` — the selector fills its container.'}}}},f={render:()=>{const[e,o]=n.useState("esvus16");return r.jsx("div",{className:"tw:w-14",children:r.jsx(c,{mode:"project",projects:d,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:t})=>o(t),localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project"}})})},parameters:{docs:{description:{story:"Wrapper width is `tw:w-14` (~56px). The component observes its own trigger width and, below the internal narrow threshold (~100px), drops the chevron and tightens the padding automatically — the label's leading characters stay legible in an icon-rail sidebar. Consumers do not opt into this; they just size the wrapper and the selector adapts."}}}},y={render:()=>{const[e,o]=n.useState([{projectId:"esvus16",scrollGroupId:0},{projectId:"esv16uk"}]),[t,s]=n.useState(l);return r.jsx(c,{mode:"project-multi",projects:d,openTabs:t,selection:{pairs:e},onChangeSelection:({pairs:i})=>o(i),onOpenProjectInGroup:(i,a)=>{s(p=>p.some(u=>u.projectId===i&&u.scrollGroupId===a)?p:[...p,{projectId:i,scrollGroupId:a}])},localizedStrings:{buttonPlaceholder:"Select projects",ariaLabel:"Projects"}})},parameters:{docs:{description:{story:'Multi-select over `(projectId, scrollGroupId)` pairs with no explicit `availableGroupings`. The component auto-adds two groupings: `openTabs` (because `openTabs.length > 0`) and `selection` (because `mode === "project-multi"`), so the filter menu offers Open tabs / Selection out of the box. Consumers who want different labels, ordering, or additional groupings pass their own `availableGroupings`.'}}}},w={render:()=>{const[e,o]=n.useState([{projectId:"esvus16"}]);return r.jsx(c,{mode:"project-multi",projects:d,openTabs:l,selection:{pairs:e},onChangeSelection:({pairs:t})=>o(t),localizedStrings:{buttonPlaceholder:"Select projects",ariaLabel:"Projects"}})},parameters:{docs:{description:{story:'Multi-select with exactly one project selected — isolates the trigger at the boundary between "nothing selected" and "2+ selected" so its shape can be compared against `MultiProject`. The trigger already renders the same `Badge` + comma-joined-items shape at 1 as it does at 2+ (the count badge renders unconditionally once `pairs.length > 0`); this story exists to keep that comparison checkable in Storybook rather than only in source.'}}}},I={render:()=>{const[e,o]=n.useState({projectId:"esvus16",scrollGroupId:1}),[t,s]=n.useState(l);return r.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2",children:[r.jsx(c,{mode:"projectScrollGroup",projects:d,openTabs:t,selection:e,onChangeSelection:o,onOpenProjectInGroup:(i,a)=>{s(p=>p.some(u=>u.projectId===i&&u.scrollGroupId===a)?p:[...p,{projectId:i,scrollGroupId:a}])},localizedStrings:{buttonPlaceholder:"Select a project + scroll group",ariaLabel:"Project with scroll group"}}),r.jsx("button",{type:"button",className:"tw:rounded tw:border tw:border-border tw:px-2 tw:py-1 tw:text-xs",onClick:()=>s(i=>i.filter(a=>!(a.projectId===e.projectId&&a.scrollGroupId===e.scrollGroupId))),children:"Close tab for current selection (shows bound-but-closed synthetic row)"})]})},parameters:{docs:{description:{story:"One row per `(project, open scroll group)` pair, plus one row per project not open anywhere. Clicking a not-open-project row calls `onOpenProjectInGroup(projectId, 0)` to open a tab in Group A and selects that pair. Use the button to close the currently-bound tab — a synthetic row appears with an outlined chip; clicking it calls `onOpenProjectInGroup` again to reopen without changing selection."}}}},Ce=[...d,{id:"na28",shortName:"NA28",fullName:"Nestle-Aland 28th Edition (Greek NT)"},{id:"bhs",shortName:"BHS",fullName:"Biblia Hebraica Stuttgartensia"},{id:"lxx",shortName:"LXX",fullName:"Septuagint"}],P={render:()=>{const[e,o]=n.useState("esvus16");return r.jsx(c,{mode:"project",projects:Ce,openTabs:[],selection:{projectId:e},onChangeSelection:({projectId:t})=>o(t),localizedStrings:{buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:'Single-select with `mode="project"` and `openTabs={[]}`. No `availableGroupings` prop → no filter menu at all. No scroll-group chips render on any row. `partitionFlat` returns one unheaded list. Sample data mixes projects (HPUX, TP1, SCHL1951) and resources (NA28, BHS, LXX) — the component itself does not visually distinguish the two; they render identically.'}}}},v={render:()=>{const[e,o]=n.useState(void 0);return r.jsx(c,{mode:"project",projects:[],openTabs:[],selection:{projectId:e},onChangeSelection:({projectId:t})=>o(t),localizedStrings:{buttonPlaceholder:"Select a project",commandEmptyMessage:"No projects found",ariaLabel:"Project"}})}},G={render:()=>r.jsx(c,{mode:"project",projects:d,openTabs:l,selection:{projectId:"esvus16"},onChangeSelection:()=>{},isDisabled:!0,localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})},N={render:()=>r.jsx(c,{mode:"project",projects:[],openTabs:[],selection:{projectId:void 0},onChangeSelection:()=>{},isLoading:!0,localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}}),parameters:{docs:{description:{story:"`isLoading` shows a spinner in place of the chevron and disables the trigger while the project list is still loading, so the user sees the picker is not ready yet (distinct from `isDisabled`, which is a generic busy state with no spinner)."}}}},T={render:()=>{const e=d.map(s=>s.id==="esv16uk"||s.id==="tp1"?{...s,isDisabled:!0,disabledReason:"Read-only — cannot copy into this project"}:s),[o,t]=n.useState(void 0);return r.jsx(c,{mode:"project",projects:e,openTabs:l,selection:{projectId:o},onChangeSelection:({projectId:s})=>t(s),localizedStrings:{buttonPlaceholder:"Pick a target project",ariaLabel:"Project"}})},parameters:{docs:{description:{story:"Two projects (`ESV16UK`, `TP1`) are marked disabled with a `disabledReason`. They render muted, are not selectable (Up/Down navigation skips them), and the reason surfaces in the row tooltip. Use this to surface read-only or otherwise-unusable projects without filtering them out of the list."}}}},g=172e10,m=24*60*60*1e3,j=[{id:"esvus16",shortName:"ESVUS16",fullName:"English Standard Version (US) 2016",customData:{language:"English",type:"Standard",typeName:"Standard translation",lastUsedAt:g-1*m,versificationId:"eng",versificationName:"English versification"}},{id:"tp1",shortName:"TP1",fullName:"Test Project 1",customData:{language:"English",type:"Standard",typeName:"Standard translation",versificationId:"eng",versificationName:"English versification"}},{id:"hpux-bt",shortName:"HPUXBT",fullName:"Hawaii Pidgin — Back Translation",customData:{language:"English",type:"BackTranslation",typeName:"Back translation",lastUsedAt:g-3*m,versificationId:"eng",versificationName:"English versification"}},{id:"sb-esv",shortName:"ESVSB",fullName:"ESV Study Bible",customData:{language:"English",type:"StudyBible",typeName:"Study Bible",lastUsedAt:g-10*m,versificationId:"eng",versificationName:"English versification"}},{id:"na28",shortName:"NA28",fullName:"Nestle-Aland 28th Edition",customData:{language:"Greek",type:"ScriptureResource",typeName:"Scripture resource",lastUsedAt:g-2*m,versificationId:"org",versificationName:"Original versification"}},{id:"bhs",shortName:"BHS",fullName:"Biblia Hebraica Stuttgartensia",customData:{language:"Hebrew",type:"ScriptureResource",typeName:"Scripture resource",versificationId:"org",versificationName:"Original versification"}},{id:"mhc",shortName:"MHC",fullName:"Matthew Henry's Commentary",customData:{language:"English",type:"CommentaryResource",typeName:"Commentary",lastUsedAt:g-20*m}},{id:"schl1951",shortName:"SCHL1951",fullName:"Schlachter 1951",customData:{language:"German",type:"Standard",typeName:"Standard translation",versificationId:"lxx",versificationName:"Septuagint versification"}},{id:"legacy",shortName:"LEGACY",fullName:"Legacy Uncategorized Project"}],k={render:()=>{const[e,o]=n.useState("esvus16");return r.jsx(c,{mode:"project",projects:j,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:t})=>o(t),availableGroupings:h,localizedStrings:{buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`availableGroupings={defaultGroupings}` passes all four built-ins (`openTabs`, `lastUsed`, `language`, `type`) with English labels. Open the funnel icon to switch. Each built-in reads its key from `project.customData` (see the `ProjectSelectorProject.customData` JSDoc for the well-known keys). Consumers wire localization by calling `makeBuiltInGroupings(strings)` instead."}}}},L={render:()=>{const[e,o]=n.useState(void 0),t=n.useMemo(()=>({id:"versification",label:"Versification",getGroupKey:i=>{var a;return typeof((a=i.customData)==null?void 0:a.versificationId)=="string"?i.customData.versificationId:void 0},getSectionHeading:(i,a)=>{var z;const p=a.find(Le=>{var D;return typeof((D=Le.customData)==null?void 0:D.versificationName)=="string"}),u=(z=p==null?void 0:p.customData)==null?void 0:z.versificationName;return typeof u=="string"?u:i},unknownSectionHeading:"Unknown versification",priorityKey:"eng"}),[]),s=n.useMemo(()=>[...h,t],[t]);return r.jsx(c,{mode:"project",projects:j,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:i})=>o(i),availableGroupings:s,defaultGrouping:"versification",localizedStrings:{buttonPlaceholder:"Select a reference project",ariaLabel:"Reference project"}})},parameters:{docs:{description:{story:"A custom grouping — versification — appended to the built-ins. `getGroupKey` reads `p.customData?.versificationId`; `getSectionHeading` lifts the display name from `versificationName` on the first row in the bucket; `priorityKey: 'eng'` pins the caller's active versification to the top. `defaultGrouping=\"versification\"` opens with it active. Consumers can register any number of custom groupings this way."}}}},x={render:()=>{const[e,o]=n.useState(void 0),t=n.useMemo(()=>xe({openTabsLabel:"By open tabs",lastUsedLabel:"By last used",languageLabel:"By language",typeLabel:"By kind",lastUsedRecentSectionHeading:"Recently opened",lastUsedOtherSectionHeading:"Everything else",languageUnknownSectionHeading:"Language unknown",typeUnknownSectionHeading:"Kind unknown"}),[]);return r.jsx(c,{mode:"project",projects:j,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:s})=>o(s),availableGroupings:t,localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`makeBuiltInGroupings(strings)` returns the four built-ins with the labels and section headings you pass in. This is the recommended production path — every consumer resolves the same `%projectSelector_*%` keys through `useLocalizedStrings` and forwards them here."}}}},C={render:()=>{const[e,o]=n.useState("esvus16"),t=n.useMemo(()=>[h[0]],[]);return r.jsx(c,{mode:"project",projects:j,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:s})=>o(s),availableGroupings:t,localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`availableGroupings` with exactly ONE grouping locks the user into that grouping — the filter funnel drops away entirely (this is single-select, so there is no `Show selected only` toggle either, and the whole menu has nothing to render). The lone grouping is applied unconditionally."}}}},O={render:()=>{const[e,o]=n.useState(void 0),t=h.find(a=>a.id==="language"),s=h.find(a=>a.id==="type"),i=n.useMemo(()=>[t,s],[t,s]);return r.jsx(c,{mode:"project",projects:j,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:a})=>o(a),availableGroupings:i,defaultGrouping:"type",localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:'`availableGroupings=[languageGrouping, typeGrouping]` narrows the filter menu to just those two. `defaultGrouping="type"` opens with type-grouping active. Two groupings → the "None" radio + both options render normally (single-grouping lock only kicks in when there is exactly one option).'}}}};var B,E,U;b.parameters={...b.parameters,docs:{...(B=b.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} localizedStrings={{
      buttonPlaceholder: 'Select a project',
      ariaLabel: 'Project'
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Single-select in \`project\` mode. One row per project; the chips on the right list every scroll group the project is currently open in (metadata only — the whole row is the click target). Rows for projects not open anywhere render in muted text. Selected rows float to the top of their section. \`availableGroupings\` is omitted so no filter/grouping menu renders.'
      }
    }
  }
}`,...(U=(E=b.parameters)==null?void 0:E.docs)==null?void 0:U.source}}};var H,R,A;S.parameters={...S.parameters,docs:{...(H=S.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return <div className="tw:w-80">
        <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
        projectId
      }} onChangeSelection={({
        projectId: newId
      }) => setProjectId(newId)} triggerLabelFormat="shortNameAndFullName" localizedStrings={{
        buttonPlaceholder: 'Select a project',
        ariaLabel: 'Project'
      }} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: '\`triggerLabelFormat="shortNameAndFullName"\` renders \`{shortName} - {fullName}\` in the trigger (manage-books wide sidebar). The short name leads so ellipsis truncation keeps it readable, and the trigger\\'s own tooltip carries the untruncated text on hover. Width comes from the wrapping \`<div className="tw:w-80">\` — the selector fills its container.'
      }
    }
  }
}`,...(A=(R=S.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};var M,K,V;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return <div className="tw:w-14">
        <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
        projectId
      }} onChangeSelection={({
        projectId: newId
      }) => setProjectId(newId)} localizedStrings={{
        buttonPlaceholder: 'Select',
        ariaLabel: 'Project'
      }} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: "Wrapper width is \`tw:w-14\` (~56px). The component observes its own trigger width and, below the internal narrow threshold (~100px), drops the chevron and tightens the padding automatically — the label's leading characters stay legible in an icon-rail sidebar. Consumers do not opt into this; they just size the wrapper and the selector adapts."
      }
    }
  }
}`,...(V=(K=f.parameters)==null?void 0:K.docs)==null?void 0:V.source}}};var F,W,X;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
    }} localizedStrings={{
      buttonPlaceholder: 'Select projects',
      ariaLabel: 'Projects'
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select over \`(projectId, scrollGroupId)\` pairs with no explicit \`availableGroupings\`. The component auto-adds two groupings: \`openTabs\` (because \`openTabs.length > 0\`) and \`selection\` (because \`mode === "project-multi"\`), so the filter menu offers Open tabs / Selection out of the box. Consumers who want different labels, ordering, or additional groupings pass their own \`availableGroupings\`.'
      }
    }
  }
}`,...(X=(W=y.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var _,J,q;w.parameters={...w.parameters,docs:{...(_=w.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => {
    const [pairs, setPairs] = useState<ProjectSelectorProjectPair[]>([{
      projectId: 'esvus16'
    }]);
    return <ProjectSelector mode="project-multi" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
      pairs
    }} onChangeSelection={({
      pairs: next
    }) => setPairs(next)} localizedStrings={{
      buttonPlaceholder: 'Select projects',
      ariaLabel: 'Projects'
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select with exactly one project selected — isolates the trigger at the boundary between "nothing selected" and "2+ selected" so its shape can be compared against \`MultiProject\`. The trigger already renders the same \`Badge\` + comma-joined-items shape at 1 as it does at 2+ (the count badge renders unconditionally once \`pairs.length > 0\`); this story exists to keep that comparison checkable in Storybook rather than only in source.'
      }
    }
  }
}`,...(q=(J=w.parameters)==null?void 0:J.docs)==null?void 0:q.source}}};var Y,Q,Z;I.parameters={...I.parameters,docs:{...(Y=I.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
      }} localizedStrings={{
        buttonPlaceholder: 'Select a project + scroll group',
        ariaLabel: 'Project with scroll group'
      }} />
        <button type="button" className="tw:rounded tw:border tw:border-border tw:px-2 tw:py-1 tw:text-xs" onClick={() => setOpenTabs(tabs => tabs.filter(t => !(t.projectId === selection.projectId && t.scrollGroupId === selection.scrollGroupId)))}>
          Close tab for current selection (shows bound-but-closed synthetic row)
        </button>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'One row per \`(project, open scroll group)\` pair, plus one row per project not open anywhere. Clicking a not-open-project row calls \`onOpenProjectInGroup(projectId, 0)\` to open a tab in Group A and selects that pair. Use the button to close the currently-bound tab — a synthetic row appears with an outlined chip; clicking it calls \`onOpenProjectInGroup\` again to reopen without changing selection.'
      }
    }
  }
}`,...(Z=(Q=I.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var $,ee,te;P.parameters={...P.parameters,docs:{...($=P.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return <ProjectSelector mode="project" projects={sampleProjectsAndResources} openTabs={[]} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} localizedStrings={{
      buttonPlaceholder: 'Select a project or resource',
      ariaLabel: 'Project or resource'
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Single-select with \`mode="project"\` and \`openTabs={[]}\`. No \`availableGroupings\` prop → no filter menu at all. No scroll-group chips render on any row. \`partitionFlat\` returns one unheaded list. Sample data mixes projects (HPUX, TP1, SCHL1951) and resources (NA28, BHS, LXX) — the component itself does not visually distinguish the two; they render identically.'
      }
    }
  }
}`,...(te=(ee=P.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var oe,re,ne;v.parameters={...v.parameters,docs:{...(oe=v.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>(undefined);
    return <ProjectSelector mode="project" projects={[]} openTabs={[]} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} localizedStrings={{
      buttonPlaceholder: 'Select a project',
      commandEmptyMessage: 'No projects found',
      ariaLabel: 'Project'
    }} />;
  }
}`,...(ne=(re=v.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var se,ae,ie;G.parameters={...G.parameters,docs:{...(se=G.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: () => <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
    projectId: 'esvus16'
  }} onChangeSelection={() => {}} isDisabled localizedStrings={{
    buttonPlaceholder: 'Select a project',
    ariaLabel: 'Project'
  }} />
}`,...(ie=(ae=G.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};var ce,le,pe;N.parameters={...N.parameters,docs:{...(ce=N.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: () => <ProjectSelector mode="project" projects={[]} openTabs={[]} selection={{
    projectId: undefined
  }} onChangeSelection={() => {}} isLoading localizedStrings={{
    buttonPlaceholder: 'Select a project',
    ariaLabel: 'Project'
  }} />,
  parameters: {
    docs: {
      description: {
        story: '\`isLoading\` shows a spinner in place of the chevron and disables the trigger while the project list is still loading, so the user sees the picker is not ready yet (distinct from \`isDisabled\`, which is a generic busy state with no spinner).'
      }
    }
  }
}`,...(pe=(le=N.parameters)==null?void 0:le.docs)==null?void 0:pe.source}}};var de,ue,ge;T.parameters={...T.parameters,docs:{...(de=T.parameters)==null?void 0:de.docs,source:{originalSource:`{
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
    }) => setProjectId(newId)} localizedStrings={{
      buttonPlaceholder: 'Pick a target project',
      ariaLabel: 'Project'
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Two projects (\`ESV16UK\`, \`TP1\`) are marked disabled with a \`disabledReason\`. They render muted, are not selectable (Up/Down navigation skips them), and the reason surfaces in the row tooltip. Use this to surface read-only or otherwise-unusable projects without filtering them out of the list.'
      }
    }
  }
}`,...(ge=(ue=T.parameters)==null?void 0:ue.docs)==null?void 0:ge.source}}};var me,he,je;k.parameters={...k.parameters,docs:{...(me=k.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return <ProjectSelector mode="project" projects={typedProjects} openTabs={sampleOpenTabs} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} availableGroupings={defaultGroupings} localizedStrings={{
      buttonPlaceholder: 'Select a project or resource',
      ariaLabel: 'Project or resource'
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: '\`availableGroupings={defaultGroupings}\` passes all four built-ins (\`openTabs\`, \`lastUsed\`, \`language\`, \`type\`) with English labels. Open the funnel icon to switch. Each built-in reads its key from \`project.customData\` (see the \`ProjectSelectorProject.customData\` JSDoc for the well-known keys). Consumers wire localization by calling \`makeBuiltInGroupings(strings)\` instead.'
      }
    }
  }
}`,...(je=(he=k.parameters)==null?void 0:he.docs)==null?void 0:je.source}}};var be,Se,fe;L.parameters={...L.parameters,docs:{...(be=L.parameters)==null?void 0:be.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>(undefined);
    const versificationGrouping: ProjectSelectorGrouping = useMemo(() => ({
      id: 'versification',
      label: 'Versification',
      getGroupKey: p => typeof p.customData?.versificationId === 'string' ? p.customData.versificationId : undefined,
      getSectionHeading: (_key, projects) => {
        const first = projects.find(p => typeof p.customData?.versificationName === 'string');
        const heading = first?.customData?.versificationName;
        return typeof heading === 'string' ? heading : _key;
      },
      unknownSectionHeading: 'Unknown versification',
      priorityKey: 'eng'
    }), []);
    const groupings = useMemo<ProjectSelectorGrouping[]>(() => [...defaultGroupings, versificationGrouping], [versificationGrouping]);
    return <ProjectSelector mode="project" projects={typedProjects} openTabs={sampleOpenTabs} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} availableGroupings={groupings} defaultGrouping="versification" localizedStrings={{
      buttonPlaceholder: 'Select a reference project',
      ariaLabel: 'Reference project'
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: "A custom grouping — versification — appended to the built-ins. \`getGroupKey\` reads \`p.customData?.versificationId\`; \`getSectionHeading\` lifts the display name from \`versificationName\` on the first row in the bucket; \`priorityKey: 'eng'\` pins the caller's active versification to the top. \`defaultGrouping=\\"versification\\"\` opens with it active. Consumers can register any number of custom groupings this way."
      }
    }
  }
}`,...(fe=(Se=L.parameters)==null?void 0:Se.docs)==null?void 0:fe.source}}};var ye,we,Ie;x.parameters={...x.parameters,docs:{...(ye=x.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>(undefined);
    // In production, these strings would come from \`useLocalizedStrings\` against the platform's
    // \`%projectSelector_*%\` keys. Here we pass them as literals to show the wiring.
    const groupings = useMemo(() => makeBuiltInGroupings({
      openTabsLabel: 'By open tabs',
      lastUsedLabel: 'By last used',
      languageLabel: 'By language',
      typeLabel: 'By kind',
      lastUsedRecentSectionHeading: 'Recently opened',
      lastUsedOtherSectionHeading: 'Everything else',
      languageUnknownSectionHeading: 'Language unknown',
      typeUnknownSectionHeading: 'Kind unknown'
    }), []);
    return <ProjectSelector mode="project" projects={typedProjects} openTabs={sampleOpenTabs} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} availableGroupings={groupings} localizedStrings={{
      buttonPlaceholder: 'Select',
      ariaLabel: 'Project or resource'
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: '\`makeBuiltInGroupings(strings)\` returns the four built-ins with the labels and section headings you pass in. This is the recommended production path — every consumer resolves the same \`%projectSelector_*%\` keys through \`useLocalizedStrings\` and forwards them here.'
      }
    }
  }
}`,...(Ie=(we=x.parameters)==null?void 0:we.docs)==null?void 0:Ie.source}}};var Pe,ve,Ge;C.parameters={...C.parameters,docs:{...(Pe=C.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    const groupings = useMemo<ProjectSelectorGrouping[]>(() => [defaultGroupings[0]], []);
    return <ProjectSelector mode="project" projects={typedProjects} openTabs={sampleOpenTabs} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} availableGroupings={groupings} localizedStrings={{
      buttonPlaceholder: 'Select',
      ariaLabel: 'Project or resource'
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: '\`availableGroupings\` with exactly ONE grouping locks the user into that grouping — the filter funnel drops away entirely (this is single-select, so there is no \`Show selected only\` toggle either, and the whole menu has nothing to render). The lone grouping is applied unconditionally.'
      }
    }
  }
}`,...(Ge=(ve=C.parameters)==null?void 0:ve.docs)==null?void 0:Ge.source}}};var Ne,Te,ke;O.parameters={...O.parameters,docs:{...(Ne=O.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>(undefined);
    const languageGrouping = defaultGroupings.find(g => g.id === 'language');
    const typeGrouping = defaultGroupings.find(g => g.id === 'type');
    const groupings = useMemo<ProjectSelectorGrouping[]>(() => [languageGrouping!, typeGrouping!], [languageGrouping, typeGrouping]);
    return <ProjectSelector mode="project" projects={typedProjects} openTabs={sampleOpenTabs} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} availableGroupings={groupings} defaultGrouping="type" localizedStrings={{
      buttonPlaceholder: 'Select',
      ariaLabel: 'Project or resource'
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: '\`availableGroupings=[languageGrouping, typeGrouping]\` narrows the filter menu to just those two. \`defaultGrouping="type"\` opens with type-grouping active. Two groupings → the "None" radio + both options render normally (single-grouping lock only kicks in when there is exactly one option).'
      }
    }
  }
}`,...(ke=(Te=O.parameters)==null?void 0:Te.docs)==null?void 0:ke.source}}};const Tt=["SingleProject","WideTriggerLabel","NarrowRailTrigger","MultiProject","MultiProjectSingleSelection","ScrollGroupBinding","SimpleFlatList","NoProjects","Disabled","Loading","PerRowDisabled","AllBuiltInGroupings","CustomGroupingViaCustomData","LocalizedBuiltInGroupings","SingleGroupingLock","RestrictedGroupings"];export{k as AllBuiltInGroupings,L as CustomGroupingViaCustomData,G as Disabled,N as Loading,x as LocalizedBuiltInGroupings,y as MultiProject,w as MultiProjectSingleSelection,f as NarrowRailTrigger,v as NoProjects,T as PerRowDisabled,O as RestrictedGroupings,I as ScrollGroupBinding,P as SimpleFlatList,C as SingleGroupingLock,b as SingleProject,S as WideTriggerLabel,Tt as __namedExportsOrder,Nt as default};
