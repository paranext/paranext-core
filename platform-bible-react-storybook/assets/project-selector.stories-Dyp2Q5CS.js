import{r as s,j as r}from"./iframe-CiomroTv.js";import{P as c,d as j,m as Be}from"./project-selector.component-DI6oU6eY.js";import{B as ze}from"./book-open-BlT6XWBA.js";import{F as Ue}from"./file-text-BKEOY_5X.js";import"./preload-helper-CTOgD26E.js";import"./index-CMl4ZC6j.js";import"./scripture-util-DArajUVn-CPHPTCtZ.js";import"./index.es-CXoS8DB2.js";import"./index-DCo3rgjq.js";import"./index-C77E7Q-s.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./badge-Bwm8Jiom.js";import"./index-BnuTq2W6.js";import"./index-BKJh3U-K.js";import"./button-BIGjazkj.js";import"./popover-CgHiH_wX.js";import"./index-ByUZJc_b.js";import"./index-B7wK_3di.js";import"./index-DmZDvQ6g.js";import"./index-C_LP8I5X.js";import"./index-towpankL.js";import"./index-CTeptPlf.js";import"./index-C2bfiLK2.js";import"./index-C0TbK2Un.js";import"./index-DA9q0_Ct.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-UC45PTNn.js";import"./index-BUxDx8q7.js";import"./command-DPqQliZJ.js";import"./index-D2hOZ_hc.js";import"./dialog-DAE0eT2g.js";import"./createReactComponent-BKjBBrYQ.js";import"./input-group-BKhkp4ib.js";import"./input-B6nKJ1du.js";import"./IconCheck-xSz0BcmR.js";import"./dropdown-menu-cx4POoJW.js";import"./menu.context-CDiDH8ia.js";import"./IconChevronRight-5z2zkbK6.js";import"./index-DdcCMvCS.js";import"./index-CYqYTnI_.js";import"./tooltip-BQf2yA6c.js";import"./index-Di5sLbTc.js";import"./use-truncation-tooltip.hook-CqHHEwMs.js";import"./createLucideIcon-CwOiedh0.js";import"./check-jxqsDIjn.js";import"./arrow-right-DO7PJ5AM.js";import"./loader-circle-BAIOiHRz.js";import"./chevrons-up-down-DGuIlYmf.js";import"./chevron-down-Tjr2_6sH.js";const d=[{id:"hpux",shortName:"HPUX",fullName:"Hawaii Pidgin UX Test Project"},{id:"esvus16",shortName:"ESVUS16",fullName:"English Standard Version (US) 2016"},{id:"esv16uk",shortName:"ESV16UK",fullName:"English Standard Version (UK) 2016"},{id:"tp1",shortName:"TP1",fullName:"Test Project 1"},{id:"heb-grk",shortName:"HEB/GRK",fullName:"Hebrew / Greek"},{id:"schl1951",shortName:"SCHL1951",fullName:"Schlachter 1951"},{id:"web",shortName:"WEB",fullName:"World English Bible"}],l=[{projectId:"esvus16",scrollGroupId:0,scrollGroupScrRefLabel:"GEN 1:1"},{projectId:"esvus16",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"hpux",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"web",scrollGroupId:2,scrollGroupScrRefLabel:"JHN 1:1"}],Bt={title:"Advanced/Project Selector",component:c,tags:["autodocs"],decorators:[t=>r.jsx("div",{className:"tw:w-[320px] tw:p-4",children:r.jsx(t,{})})]},b={render:()=>{const[t,o]=s.useState("esvus16");return r.jsx(c,{mode:"project",projects:d,openTabs:l,selection:{projectId:t},onChangeSelection:({projectId:e})=>o(e),localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})},parameters:{docs:{description:{story:"Single-select in `project` mode. One row per project; the chips on the right list every scroll group the project is currently open in (metadata only — the whole row is the click target). Rows for projects not open anywhere render in muted text. Selected rows float to the top of their section. `availableGroupings` is omitted so no filter/grouping menu renders."}}}},S={render:()=>{const[t,o]=s.useState("esvus16");return r.jsx("div",{className:"tw:w-80",children:r.jsx(c,{mode:"project",projects:d,openTabs:l,selection:{projectId:t},onChangeSelection:({projectId:e})=>o(e),triggerLabelFormat:"shortNameAndFullName",localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})})},parameters:{docs:{description:{story:'`triggerLabelFormat="shortNameAndFullName"` renders `{shortName} - {fullName}` in the trigger (manage-books wide sidebar). The short name leads so ellipsis truncation keeps it readable, and the trigger\'s own tooltip carries the untruncated text on hover. Width comes from the wrapping `<div className="tw:w-80">` — the selector fills its container.'}}}},y={render:()=>{const[t,o]=s.useState("esvus16");return r.jsx("div",{className:"tw:w-14",children:r.jsx(c,{mode:"project",projects:d,openTabs:l,selection:{projectId:t},onChangeSelection:({projectId:e})=>o(e),localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project"}})})},parameters:{docs:{description:{story:"Wrapper width is `tw:w-14` (~56px). The component observes its own trigger width and, below the internal narrow threshold (~100px), drops the chevron and tightens the padding automatically — the label's leading characters stay legible in an icon-rail sidebar. Consumers do not opt into this; they just size the wrapper and the selector adapts."}}}},w={render:()=>{const[t,o]=s.useState([{projectId:"esvus16",scrollGroupId:0},{projectId:"esv16uk"}]),[e,n]=s.useState(l);return r.jsx(c,{mode:"project-multi",projects:d,openTabs:e,selection:{pairs:t},onChangeSelection:({pairs:i})=>o(i),onOpenProjectInGroup:(i,a)=>{n(p=>p.some(u=>u.projectId===i&&u.scrollGroupId===a)?p:[...p,{projectId:i,scrollGroupId:a}])},localizedStrings:{buttonPlaceholder:"Select projects",ariaLabel:"Projects"}})},parameters:{docs:{description:{story:'Multi-select over `(projectId, scrollGroupId)` pairs with no explicit `availableGroupings`. The component auto-adds two groupings: `openTabs` (because `openTabs.length > 0`) and `selection` (because `mode === "project-multi"`), so the filter menu offers Open tabs / Selection out of the box. Consumers who want different labels, ordering, or additional groupings pass their own `availableGroupings`.'}}}},f={render:()=>{const[t,o]=s.useState([{projectId:"esvus16"}]);return r.jsx(c,{mode:"project-multi",projects:d,openTabs:l,selection:{pairs:t},onChangeSelection:({pairs:e})=>o(e),localizedStrings:{buttonPlaceholder:"Select projects",ariaLabel:"Projects"}})},parameters:{docs:{description:{story:'Multi-select with exactly one project selected — isolates the trigger at the boundary between "nothing selected" and "2+ selected" so its shape can be compared against `MultiProject`. The trigger already renders the same `Badge` + comma-joined-items shape at 1 as it does at 2+ (the count badge renders unconditionally once `pairs.length > 0`); this story exists to keep that comparison checkable in Storybook rather than only in source.'}}}},I={render:()=>{const[t,o]=s.useState({projectId:"esvus16",scrollGroupId:1}),[e,n]=s.useState(l);return r.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2",children:[r.jsx(c,{mode:"projectScrollGroup",projects:d,openTabs:e,selection:t,onChangeSelection:o,onOpenProjectInGroup:(i,a)=>{n(p=>p.some(u=>u.projectId===i&&u.scrollGroupId===a)?p:[...p,{projectId:i,scrollGroupId:a}])},localizedStrings:{buttonPlaceholder:"Select a project + scroll group",ariaLabel:"Project with scroll group"}}),r.jsx("button",{type:"button",className:"tw:rounded tw:border tw:border-border tw:px-2 tw:py-1 tw:text-xs",onClick:()=>n(i=>i.filter(a=>!(a.projectId===t.projectId&&a.scrollGroupId===t.scrollGroupId))),children:"Close tab for current selection (shows bound-but-closed synthetic row)"})]})},parameters:{docs:{description:{story:"One row per `(project, open scroll group)` pair, plus one row per project not open anywhere. Clicking a not-open-project row calls `onOpenProjectInGroup(projectId, 0)` to open a tab in Group A and selects that pair. Use the button to close the currently-bound tab — a synthetic row appears with an outlined chip; clicking it calls `onOpenProjectInGroup` again to reopen without changing selection."}}}},Ee=[...d,{id:"na28",shortName:"NA28",fullName:"Nestle-Aland 28th Edition (Greek NT)"},{id:"bhs",shortName:"BHS",fullName:"Biblia Hebraica Stuttgartensia"},{id:"lxx",shortName:"LXX",fullName:"Septuagint"}],P={render:()=>{const[t,o]=s.useState("esvus16");return r.jsx(c,{mode:"project",projects:Ee,openTabs:[],selection:{projectId:t},onChangeSelection:({projectId:e})=>o(e),localizedStrings:{buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:'Single-select with `mode="project"` and `openTabs={[]}`. No `availableGroupings` prop → no filter menu at all. No scroll-group chips render on any row. `partitionFlat` returns one unheaded list. Sample data mixes projects (HPUX, TP1, SCHL1951) and resources (NA28, BHS, LXX) — the component itself does not visually distinguish the two; they render identically.'}}}},v={render:()=>{const[t,o]=s.useState(void 0);return r.jsx(c,{mode:"project",projects:[],openTabs:[],selection:{projectId:t},onChangeSelection:({projectId:e})=>o(e),localizedStrings:{buttonPlaceholder:"Select a project",commandEmptyMessage:"No projects found",ariaLabel:"Project"}})}},G={render:()=>r.jsx(c,{mode:"project",projects:d,openTabs:l,selection:{projectId:"esvus16"},onChangeSelection:()=>{},isDisabled:!0,localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})},T={render:()=>r.jsx(c,{mode:"project",projects:[],openTabs:[],selection:{projectId:void 0},onChangeSelection:()=>{},isLoading:!0,localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}}),parameters:{docs:{description:{story:"`isLoading` shows a spinner in place of the chevron and disables the trigger while the project list is still loading, so the user sees the picker is not ready yet (distinct from `isDisabled`, which is a generic busy state with no spinner)."}}}},N={render:()=>{const t=d.map(n=>n.id==="esv16uk"||n.id==="tp1"?{...n,isDisabled:!0,disabledReason:"Read-only — cannot copy into this project"}:n),[o,e]=s.useState(void 0);return r.jsx(c,{mode:"project",projects:t,openTabs:l,selection:{projectId:o},onChangeSelection:({projectId:n})=>e(n),localizedStrings:{buttonPlaceholder:"Pick a target project",ariaLabel:"Project"}})},parameters:{docs:{description:{story:"Two projects (`ESV16UK`, `TP1`) are marked disabled with a `disabledReason`. They render muted, are not selectable (Up/Down navigation skips them), and the reason surfaces in the row tooltip. Use this to surface read-only or otherwise-unusable projects without filtering them out of the list."}}}},m=172e10,h=24*60*60*1e3,g=[{id:"esvus16",shortName:"ESVUS16",fullName:"English Standard Version (US) 2016",customData:{language:"English",type:"Standard",typeName:"Standard translation",lastUsedAt:m-1*h,versificationId:"eng",versificationName:"English versification"}},{id:"tp1",shortName:"TP1",fullName:"Test Project 1",customData:{language:"English",type:"Standard",typeName:"Standard translation",versificationId:"eng",versificationName:"English versification"}},{id:"hpux-bt",shortName:"HPUXBT",fullName:"Hawaii Pidgin — Back Translation",customData:{language:"English",type:"BackTranslation",typeName:"Back translation",lastUsedAt:m-3*h,versificationId:"eng",versificationName:"English versification"}},{id:"sb-esv",shortName:"ESVSB",fullName:"ESV Study Bible",customData:{language:"English",type:"StudyBible",typeName:"Study Bible",lastUsedAt:m-10*h,versificationId:"eng",versificationName:"English versification"}},{id:"na28",shortName:"NA28",fullName:"Nestle-Aland 28th Edition",customData:{language:"Greek",type:"ScriptureResource",typeName:"Scripture resource",lastUsedAt:m-2*h,versificationId:"org",versificationName:"Original versification"}},{id:"bhs",shortName:"BHS",fullName:"Biblia Hebraica Stuttgartensia",customData:{language:"Hebrew",type:"ScriptureResource",typeName:"Scripture resource",versificationId:"org",versificationName:"Original versification"}},{id:"mhc",shortName:"MHC",fullName:"Matthew Henry's Commentary",customData:{language:"English",type:"CommentaryResource",typeName:"Commentary",lastUsedAt:m-20*h}},{id:"schl1951",shortName:"SCHL1951",fullName:"Schlachter 1951",customData:{language:"German",type:"Standard",typeName:"Standard translation",versificationId:"lxx",versificationName:"Septuagint versification"}},{id:"legacy",shortName:"LEGACY",fullName:"Legacy Uncategorized Project"}],k={render:()=>{const[t,o]=s.useState("esvus16");return r.jsx(c,{mode:"project",projects:g,openTabs:l,selection:{projectId:t},onChangeSelection:({projectId:e})=>o(e),availableGroupings:j,localizedStrings:{buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`availableGroupings={defaultGroupings}` passes all four built-ins (`openTabs`, `lastUsed`, `language`, `type`) with English labels. Open the funnel icon to switch. Each built-in reads its key from `project.customData` (see the `ProjectSelectorProject.customData` JSDoc for the well-known keys). Consumers wire localization by calling `makeBuiltInGroupings(strings)` instead."}}}},x={render:()=>{const[t,o]=s.useState(void 0),e=s.useMemo(()=>({id:"versification",label:"Versification",getGroupKey:i=>{var a;return typeof((a=i.customData)==null?void 0:a.versificationId)=="string"?i.customData.versificationId:void 0},getSectionHeading:(i,a)=>{var B;const p=a.find(Oe=>{var z;return typeof((z=Oe.customData)==null?void 0:z.versificationName)=="string"}),u=(B=p==null?void 0:p.customData)==null?void 0:B.versificationName;return typeof u=="string"?u:i},unknownSectionHeading:"Unknown versification",priorityKey:"eng"}),[]),n=s.useMemo(()=>[...j,e],[e]);return r.jsx(c,{mode:"project",projects:g,openTabs:l,selection:{projectId:t},onChangeSelection:({projectId:i})=>o(i),availableGroupings:n,defaultGrouping:"versification",localizedStrings:{buttonPlaceholder:"Select a reference project",ariaLabel:"Reference project"}})},parameters:{docs:{description:{story:"A custom grouping — versification — appended to the built-ins. `getGroupKey` reads `p.customData?.versificationId`; `getSectionHeading` lifts the display name from `versificationName` on the first row in the bucket; `priorityKey: 'eng'` pins the caller's active versification to the top. `defaultGrouping=\"versification\"` opens with it active. Consumers can register any number of custom groupings this way."}}}},L={render:()=>{const[t,o]=s.useState(void 0),e=s.useMemo(()=>Be({openTabsLabel:"By open tabs",lastUsedLabel:"By last used",languageLabel:"By language",typeLabel:"By kind",lastUsedRecentSectionHeading:"Recently opened",lastUsedOtherSectionHeading:"Everything else",languageUnknownSectionHeading:"Language unknown",typeUnknownSectionHeading:"Kind unknown"}),[]);return r.jsx(c,{mode:"project",projects:g,openTabs:l,selection:{projectId:t},onChangeSelection:({projectId:n})=>o(n),availableGroupings:e,localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`makeBuiltInGroupings(strings)` returns the four built-ins with the labels and section headings you pass in. This is the recommended production path — every consumer resolves the same `%projectSelector_*%` keys through `useLocalizedStrings` and forwards them here."}}}},C={render:()=>{const[t,o]=s.useState("esvus16"),e=s.useMemo(()=>[j[0]],[]);return r.jsx(c,{mode:"project",projects:g,openTabs:l,selection:{projectId:t},onChangeSelection:({projectId:n})=>o(n),availableGroupings:e,localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`availableGroupings` with exactly ONE grouping locks the user into that grouping — the filter funnel drops away entirely (this is single-select, so there is no `Show selected only` toggle either, and the whole menu has nothing to render). The lone grouping is applied unconditionally."}}}},D={render:()=>{const[t,o]=s.useState(void 0),e=j.find(a=>a.id==="language"),n=j.find(a=>a.id==="type"),i=s.useMemo(()=>[e,n],[e,n]);return r.jsx(c,{mode:"project",projects:g,openTabs:l,selection:{projectId:t},onChangeSelection:({projectId:a})=>o(a),availableGroupings:i,defaultGrouping:"type",localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:'`availableGroupings=[languageGrouping, typeGrouping]` narrows the filter menu to just those two. `defaultGrouping="type"` opens with type-grouping active. Two groupings → the "None" radio + both options render normally (single-grouping lock only kicks in when there is exactly one option).'}}}},O={name:"Type indicators (projects vs resources)",render:()=>{const[t,o]=s.useState("esvus16");return r.jsx(c,{mode:"project",projects:g,openTabs:[],selection:{projectId:t},onChangeSelection:({projectId:e})=>o(e),localizedStrings:{buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"},renderProjectIndicator:e=>{var n;return typeof((n=e.customData)==null?void 0:n.type)=="string"&&e.customData.type.endsWith("Resource")?r.jsx(ze,{className:"tw:h-3 tw:w-3 tw:opacity-60","aria-label":"Resource",role:"img"}):r.jsx(Ue,{className:"tw:h-3 tw:w-3 tw:opacity-60","aria-label":"Project",role:"img"})}})},parameters:{docs:{description:{story:"`renderProjectIndicator` lets the caller distinguish row types from data rather than copy. This fixture reads the caller's own `customData.type` values (mixing PT9 ProjectType keys and DBL ResourceType keys, same fixture as the grouping stories): a book icon for the two resource types, a document icon for everything else.\n\nThe selector renders whatever node the caller returns, verbatim. It adds no accessible name of its own, because only the caller knows what its glyph means.\n\nSo the icons here are labelled: nothing else in the row says whether it is a project or a resource, and an unlabelled icon would put that distinction out of reach of a screen reader. Use `aria-hidden` instead only where the row text already carries the same information."}}}};var U,E,R;b.parameters={...b.parameters,docs:{...(U=b.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(R=(E=b.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var H,A,M;S.parameters={...S.parameters,docs:{...(H=S.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(M=(A=S.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var F,K,V;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(V=(K=y.parameters)==null?void 0:K.docs)==null?void 0:V.source}}};var W,X,_;w.parameters={...w.parameters,docs:{...(W=w.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(_=(X=w.parameters)==null?void 0:X.docs)==null?void 0:_.source}}};var J,q,Y;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(Y=(q=f.parameters)==null?void 0:q.docs)==null?void 0:Y.source}}};var Q,Z,$;I.parameters={...I.parameters,docs:{...(Q=I.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...($=(Z=I.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,te,oe;P.parameters={...P.parameters,docs:{...(ee=P.parameters)==null?void 0:ee.docs,source:{originalSource:`{
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
}`,...(oe=(te=P.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};var re,ne,se;v.parameters={...v.parameters,docs:{...(re=v.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(se=(ne=v.parameters)==null?void 0:ne.docs)==null?void 0:se.source}}};var ae,ie,ce;G.parameters={...G.parameters,docs:{...(ae=G.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
    projectId: 'esvus16'
  }} onChangeSelection={() => {}} isDisabled localizedStrings={{
    buttonPlaceholder: 'Select a project',
    ariaLabel: 'Project'
  }} />
}`,...(ce=(ie=G.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var le,pe,de;T.parameters={...T.parameters,docs:{...(le=T.parameters)==null?void 0:le.docs,source:{originalSource:`{
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
}`,...(de=(pe=T.parameters)==null?void 0:pe.docs)==null?void 0:de.source}}};var ue,ge,me;N.parameters={...N.parameters,docs:{...(ue=N.parameters)==null?void 0:ue.docs,source:{originalSource:`{
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
}`,...(me=(ge=N.parameters)==null?void 0:ge.docs)==null?void 0:me.source}}};var he,je,be;k.parameters={...k.parameters,docs:{...(he=k.parameters)==null?void 0:he.docs,source:{originalSource:`{
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
}`,...(be=(je=k.parameters)==null?void 0:je.docs)==null?void 0:be.source}}};var Se,ye,we;x.parameters={...x.parameters,docs:{...(Se=x.parameters)==null?void 0:Se.docs,source:{originalSource:`{
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
}`,...(we=(ye=x.parameters)==null?void 0:ye.docs)==null?void 0:we.source}}};var fe,Ie,Pe;L.parameters={...L.parameters,docs:{...(fe=L.parameters)==null?void 0:fe.docs,source:{originalSource:`{
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
}`,...(Pe=(Ie=L.parameters)==null?void 0:Ie.docs)==null?void 0:Pe.source}}};var ve,Ge,Te;C.parameters={...C.parameters,docs:{...(ve=C.parameters)==null?void 0:ve.docs,source:{originalSource:`{
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
}`,...(Te=(Ge=C.parameters)==null?void 0:Ge.docs)==null?void 0:Te.source}}};var Ne,ke,xe;D.parameters={...D.parameters,docs:{...(Ne=D.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
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
}`,...(xe=(ke=D.parameters)==null?void 0:ke.docs)==null?void 0:xe.source}}};var Le,Ce,De;O.parameters={...O.parameters,docs:{...(Le=O.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  name: 'Type indicators (projects vs resources)',
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    return <ProjectSelector mode="project" projects={typedProjects} openTabs={[]} selection={{
      projectId
    }} onChangeSelection={({
      projectId: newId
    }) => setProjectId(newId)} localizedStrings={{
      buttonPlaceholder: 'Select a project or resource',
      ariaLabel: 'Project or resource'
    }} renderProjectIndicator={project => typeof project.customData?.type === 'string' && project.customData.type.endsWith('Resource') ? <BookOpen className="tw:h-3 tw:w-3 tw:opacity-60" aria-label="Resource" role="img" /> : <FileText className="tw:h-3 tw:w-3 tw:opacity-60" aria-label="Project" role="img" />} />;
  },
  parameters: {
    docs: {
      description: {
        story: "\`renderProjectIndicator\` lets the caller distinguish row types from data rather than copy. This fixture reads the caller's own \`customData.type\` values (mixing PT9 ProjectType keys and DBL ResourceType keys, same fixture as the grouping stories): a book icon for the two resource types, a document icon for everything else.\\n\\nThe selector renders whatever node the caller returns, verbatim. It adds no accessible name of its own, because only the caller knows what its glyph means.\\n\\nSo the icons here are labelled: nothing else in the row says whether it is a project or a resource, and an unlabelled icon would put that distinction out of reach of a screen reader. Use \`aria-hidden\` instead only where the row text already carries the same information."
      }
    }
  }
}`,...(De=(Ce=O.parameters)==null?void 0:Ce.docs)==null?void 0:De.source}}};const zt=["SingleProject","WideTriggerLabel","NarrowRailTrigger","MultiProject","MultiProjectSingleSelection","ScrollGroupBinding","SimpleFlatList","NoProjects","Disabled","Loading","PerRowDisabled","AllBuiltInGroupings","CustomGroupingViaCustomData","LocalizedBuiltInGroupings","SingleGroupingLock","RestrictedGroupings","ProjectAndResourceIndicators"];export{k as AllBuiltInGroupings,x as CustomGroupingViaCustomData,G as Disabled,T as Loading,L as LocalizedBuiltInGroupings,w as MultiProject,f as MultiProjectSingleSelection,y as NarrowRailTrigger,v as NoProjects,N as PerRowDisabled,O as ProjectAndResourceIndicators,D as RestrictedGroupings,I as ScrollGroupBinding,P as SimpleFlatList,C as SingleGroupingLock,b as SingleProject,S as WideTriggerLabel,zt as __namedExportsOrder,Bt as default};
