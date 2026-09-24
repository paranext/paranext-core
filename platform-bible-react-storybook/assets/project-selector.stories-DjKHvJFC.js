import{r as a,j as o}from"./iframe-BleaQVUC.js";import{P as c,d as b,m as _e}from"./project-selector.component-CTUco8vs.js";import{B as qe}from"./book-open-uCcH_Ddp.js";import{F as Je}from"./file-text-nlH02LG6.js";import"./preload-helper-CTOgD26E.js";import"./index-BwGqfxvI.js";import"./scripture-util-DArajUVn-BzQhUzBK.js";import"./index.es-CXoS8DB2.js";import"./index-DCo3rgjq.js";import"./index-C77E7Q-s.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./localization.util-C4JImkK1.js";import"./badge-DAxLsRks.js";import"./index-BnuTq2W6.js";import"./index-P39p_low.js";import"./button-DQUVzzg0.js";import"./popover-C4V3mU_z.js";import"./content-zoom-area.context-CJPomLyf.js";import"./index-CyuTAXM7.js";import"./index-B4zLkWoP.js";import"./index-lxR7zxMx.js";import"./index-CQIOIx3D.js";import"./index-ClZUktyi.js";import"./index-BdLfUvuy.js";import"./index-BOh-TQnq.js";import"./index-BfrZ5PWg.js";import"./index-Cu2ME1_H.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-OegYQ6gT.js";import"./index-Dy5ZSD4q.js";import"./command-zpZ9MFD6.js";import"./index-DKtXNAaa.js";import"./dialog-Br12kXHI.js";import"./createReactComponent-DebQA1Ut.js";import"./input-group-OgZvv_7r.js";import"./input-DDXmIfib.js";import"./IconCheck-DeIWUmH5.js";import"./dropdown-menu-CJnKNPs7.js";import"./menu.context-Cxi6J3AV.js";import"./IconChevronRight-172hCkt2.js";import"./index-BfoMMD-J.js";import"./index-iSXYNVgh.js";import"./tooltip-B6XyOVAo.js";import"./index-CrVRCC-X.js";import"./use-truncation-tooltip.hook-CfxCe6oM.js";import"./createLucideIcon-D1KIsR2Q.js";import"./check-Dd4up1ft.js";import"./arrow-right-Dbgj6qRT.js";import"./loader-circle-5KBLsfrl.js";import"./chevrons-up-down-CvyjBpmA.js";import"./chevron-down-COsLj15J.js";const u=[{id:"hpux",shortName:"HPUX",fullName:"Hawaii Pidgin UX Test Project"},{id:"esvus16",shortName:"ESVUS16",fullName:"English Standard Version (US) 2016"},{id:"esv16uk",shortName:"ESV16UK",fullName:"English Standard Version (UK) 2016"},{id:"tp1",shortName:"TP1",fullName:"Test Project 1"},{id:"heb-grk",shortName:"HEB/GRK",fullName:"Hebrew / Greek"},{id:"schl1951",shortName:"SCHL1951",fullName:"Schlachter 1951"},{id:"web",shortName:"WEB",fullName:"World English Bible"}],l=[{projectId:"esvus16",scrollGroupId:0,scrollGroupScrRefLabel:"GEN 1:1"},{projectId:"esvus16",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"hpux",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"web",scrollGroupId:2,scrollGroupScrRefLabel:"JHN 1:1"}],Yt={title:"Advanced/Project Selector",component:c,tags:["autodocs"],decorators:[e=>o.jsx("div",{className:"tw:w-[320px] tw:p-4",children:o.jsx(e,{})})]},Ye=u.map(e=>({id:e.id,shortName:e.shortName}));function Ve({openTabs:e}){const[r,t]=a.useState("esvus16");return o.jsx("div",{className:"tw:w-80",children:o.jsx(c,{mode:"project",projects:Ye,openTabs:e,selection:{projectId:r},onChangeSelection:({projectId:n})=>t(n),localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"},triggerLabelFormat:"shortName",buttonClassName:"tw:w-full"})})}const w={render:()=>o.jsx(Ve,{openTabs:l}),parameters:{docs:{description:{story:'`triggerLabelFormat="shortName"` (the default) renders only the selected project\'s short name in the trigger. This story pairs the format with fixtures that omit `fullName` so the popover rows also collapse to a single line — the trigger and rows both read the short name only. Compare with `WideTriggerLabel` at the same width to see the `{shortName} - {fullName}` variant with distinct names.'}}}},S={render:()=>o.jsx(Ve,{openTabs:[]}),parameters:{docs:{description:{story:'Same no-full-name setup as `ShortNameTriggerLabel`, but with no open tabs. The scroll-group chips on the right disappear and every row renders muted (the "not open anywhere" state), yielding the plainest single-line row layout the selector can render.'}}}},y={render:()=>{const[e,r]=a.useState("esvus16");return o.jsx(c,{mode:"project",projects:u,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:t})=>r(t),localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})},parameters:{docs:{description:{story:"Single-select in `project` mode. One row per project; the chips on the right list every scroll group the project is currently open in (metadata only — the whole row is the click target). Rows for projects not open anywhere render in muted text. Selected rows float to the top of their section. `availableGroupings` is omitted so no filter/grouping menu renders."}}}},f={render:()=>{const[e,r]=a.useState("esvus16");return o.jsx("div",{className:"tw:w-80",children:o.jsx(c,{mode:"project",projects:u,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:t})=>r(t),triggerLabelFormat:"shortNameAndFullName",localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})})},parameters:{docs:{description:{story:'`triggerLabelFormat="shortNameAndFullName"` renders `{shortName} - {fullName}` in the trigger (manage-books wide sidebar). The short name leads so ellipsis truncation keeps it readable, and the trigger\'s own tooltip carries the untruncated text on hover. Width comes from the wrapping `<div className="tw:w-80">` — the selector fills its container.'}}}},I={render:()=>{const[e,r]=a.useState("esvus16");return o.jsx("div",{className:"tw:w-14",children:o.jsx(c,{mode:"project",projects:u,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:t})=>r(t),localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project"}})})},parameters:{docs:{description:{story:"Wrapper width is `tw:w-14` (~56px). The component observes its own trigger width and, below the internal narrow threshold (~100px), drops the chevron and tightens the padding automatically — the label's leading characters stay legible in an icon-rail sidebar. Consumers do not opt into this; they just size the wrapper and the selector adapts."}}}},P={render:()=>{const[e,r]=a.useState("esvus16"),[t,n]=a.useState(0);return o.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2",children:[o.jsx(c,{mode:"project",projects:u,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:s})=>r(s),localizedStrings:{ariaLabel:"Project"},renderTriggerLabel:s=>s?o.jsxs("span",{className:"tw:flex tw:min-w-0 tw:items-baseline tw:gap-1",children:[o.jsx("span",{className:"tw:truncate tw:font-medium",children:s.shortName}),o.jsx("span",{className:"tw:min-w-0 tw:truncate tw:text-xs tw:opacity-60",children:s.fullName})]}):"Select a project",footerAction:{label:"More projects…",onSelect:()=>n(s=>s+1)}}),o.jsxs("p",{className:"tw:text-xs tw:opacity-60",children:["“More projects…” selected ",t.toString()," time(s)"]})]})},parameters:{docs:{description:{story:'`renderTriggerLabel` and `footerAction` together, as the titlebar project picker combines them: the trigger renders a compound short-name/full-name label instead of the derived string, and a footer row below the last section opens a different surface (here, just a counter standing in for a "More projects…" dialog). The footer separator is a plain rule with `alwaysRender` so it survives an active search query, and it renders only when a section above it has rows.'}}}},v={render:()=>{const[e,r]=a.useState([{projectId:"esvus16",scrollGroupId:0},{projectId:"esv16uk"}]),[t,n]=a.useState(l);return o.jsx(c,{mode:"project-multi",projects:u,openTabs:t,selection:{pairs:e},onChangeSelection:({pairs:s})=>r(s),onOpenProjectInGroup:(s,i)=>{n(p=>p.some(d=>d.projectId===s&&d.scrollGroupId===i)?p:[...p,{projectId:s,scrollGroupId:i}])},localizedStrings:{buttonPlaceholder:"Select projects",ariaLabel:"Projects"}})},parameters:{docs:{description:{story:'Multi-select over `(projectId, scrollGroupId)` pairs with no explicit `availableGroupings`. The component auto-adds two groupings: `openTabs` (because `openTabs.length > 0`) and `selection` (because `mode === "project-multi"`), so the filter menu offers Open tabs / Selection out of the box. Consumers who want different labels, ordering, or additional groupings pass their own `availableGroupings`.'}}}},T={render:()=>{const[e,r]=a.useState([{projectId:"esvus16"}]);return o.jsx(c,{mode:"project-multi",projects:u,openTabs:l,selection:{pairs:e},onChangeSelection:({pairs:t})=>r(t),localizedStrings:{buttonPlaceholder:"Select projects",ariaLabel:"Projects"}})},parameters:{docs:{description:{story:'Multi-select with exactly one project selected — isolates the trigger at the boundary between "nothing selected" and "2+ selected" so its shape can be compared against `MultiProject`. The trigger already renders the same `Badge` + comma-joined-items shape at 1 as it does at 2+ (the count badge renders unconditionally once `pairs.length > 0`); this story exists to keep that comparison checkable in Storybook rather than only in source.'}}}},N={render:()=>{const[e,r]=a.useState({projectId:"esvus16",scrollGroupId:1}),[t,n]=a.useState(l);return o.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2",children:[o.jsx(c,{mode:"projectScrollGroup",projects:u,openTabs:t,selection:e,onChangeSelection:r,onOpenProjectInGroup:(s,i)=>{n(p=>p.some(d=>d.projectId===s&&d.scrollGroupId===i)?p:[...p,{projectId:s,scrollGroupId:i}])},localizedStrings:{buttonPlaceholder:"Select a project + scroll group",ariaLabel:"Project with scroll group"}}),o.jsx("button",{type:"button",className:"tw:rounded tw:border tw:border-border tw:px-2 tw:py-1 tw:text-xs",onClick:()=>n(s=>s.filter(i=>!(i.projectId===e.projectId&&i.scrollGroupId===e.scrollGroupId))),children:"Close tab for current selection (shows bound-but-closed synthetic row)"})]})},parameters:{docs:{description:{story:"One row per `(project, open scroll group)` pair, plus one row per project not open anywhere. Clicking a not-open-project row calls `onOpenProjectInGroup(projectId, 0)` to open a tab in Group A and selects that pair. Use the button to close the currently-bound tab — a synthetic row appears with an outlined chip; clicking it calls `onOpenProjectInGroup` again to reopen without changing selection."}}}},Qe=[...u,{id:"na28",shortName:"NA28",fullName:"Nestle-Aland 28th Edition (Greek NT)"},{id:"bhs",shortName:"BHS",fullName:"Biblia Hebraica Stuttgartensia"},{id:"lxx",shortName:"LXX",fullName:"Septuagint"}],G={render:()=>{const[e,r]=a.useState("esvus16");return o.jsx(c,{mode:"project",projects:Qe,openTabs:[],selection:{projectId:e},onChangeSelection:({projectId:t})=>r(t),localizedStrings:{buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:'Single-select with `mode="project"` and `openTabs={[]}`. No `availableGroupings` prop → no filter menu at all. No scroll-group chips render on any row. `partitionFlat` returns one unheaded list. Sample data mixes projects (HPUX, TP1, SCHL1951) and resources (NA28, BHS, LXX) — the component itself does not visually distinguish the two; they render identically.'}}}},x={render:()=>{const[e,r]=a.useState(void 0);return o.jsx(c,{mode:"project",projects:[],openTabs:[],selection:{projectId:e},onChangeSelection:({projectId:t})=>r(t),localizedStrings:{buttonPlaceholder:"Select a project",commandEmptyMessage:"No projects found",ariaLabel:"Project"}})}},L={render:()=>o.jsx(c,{mode:"project",projects:u,openTabs:l,selection:{projectId:"esvus16"},onChangeSelection:()=>{},isDisabled:!0,localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})},k={render:()=>o.jsx(c,{mode:"project",projects:[],openTabs:[],selection:{projectId:void 0},onChangeSelection:()=>{},isLoading:!0,localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}}),parameters:{docs:{description:{story:"`isLoading` shows a spinner in place of the chevron and disables the trigger while the project list is still loading, so the user sees the picker is not ready yet (distinct from `isDisabled`, which is a generic busy state with no spinner)."}}}},C={render:()=>{const e=u.map(n=>n.id==="esv16uk"||n.id==="tp1"?{...n,isDisabled:!0,disabledReason:"Read-only — cannot copy into this project"}:n),[r,t]=a.useState(void 0);return o.jsx(c,{mode:"project",projects:e,openTabs:l,selection:{projectId:r},onChangeSelection:({projectId:n})=>t(n),localizedStrings:{buttonPlaceholder:"Pick a target project",ariaLabel:"Project"}})},parameters:{docs:{description:{story:"Two projects (`ESV16UK`, `TP1`) are marked disabled with a `disabledReason`. They render muted, are not selectable (Up/Down navigation skips them), and the reason surfaces in the row tooltip. Use this to surface read-only or otherwise-unusable projects without filtering them out of the list."}}}},m=172e10,j=24*60*60*1e3,g=[{id:"esvus16",shortName:"ESVUS16",fullName:"English Standard Version (US) 2016",customData:{language:"English",type:"Standard",typeName:"Standard translation",lastUsedAt:m-1*j,versificationId:"eng",versificationName:"English versification"}},{id:"tp1",shortName:"TP1",fullName:"Test Project 1",customData:{language:"English",type:"Standard",typeName:"Standard translation",versificationId:"eng",versificationName:"English versification"}},{id:"hpux-bt",shortName:"HPUXBT",fullName:"Hawaii Pidgin — Back Translation",customData:{language:"English",type:"BackTranslation",typeName:"Back translation",lastUsedAt:m-3*j,versificationId:"eng",versificationName:"English versification"}},{id:"sb-esv",shortName:"ESVSB",fullName:"ESV Study Bible",customData:{language:"English",type:"StudyBible",typeName:"Study Bible",lastUsedAt:m-10*j,versificationId:"eng",versificationName:"English versification"}},{id:"na28",shortName:"NA28",fullName:"Nestle-Aland 28th Edition",customData:{language:"Greek",type:"ScriptureResource",typeName:"Scripture resource",lastUsedAt:m-2*j,versificationId:"org",versificationName:"Original versification"}},{id:"bhs",shortName:"BHS",fullName:"Biblia Hebraica Stuttgartensia",customData:{language:"Hebrew",type:"ScriptureResource",typeName:"Scripture resource",versificationId:"org",versificationName:"Original versification"}},{id:"mhc",shortName:"MHC",fullName:"Matthew Henry's Commentary",customData:{language:"English",type:"CommentaryResource",typeName:"Commentary",lastUsedAt:m-20*j}},{id:"schl1951",shortName:"SCHL1951",fullName:"Schlachter 1951",customData:{language:"German",type:"Standard",typeName:"Standard translation",versificationId:"lxx",versificationName:"Septuagint versification"}},{id:"legacy",shortName:"LEGACY",fullName:"Legacy Uncategorized Project"}],O={render:()=>{const[e,r]=a.useState("esvus16");return o.jsx(c,{mode:"project",projects:g,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:t})=>r(t),availableGroupings:b,localizedStrings:{buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`availableGroupings={defaultGroupings}` passes all four built-ins (`openTabs`, `lastUsed`, `language`, `type`) with English labels. Open the funnel icon to switch. Each built-in reads its key from `project.customData` (see the `ProjectSelectorProject.customData` JSDoc for the well-known keys). Consumers wire localization by calling `makeBuiltInGroupings(strings)` instead."}}}},D={render:()=>{const[e,r]=a.useState(void 0),t=a.useMemo(()=>({id:"versification",label:"Versification",getGroupKey:s=>{var i;return typeof((i=s.customData)==null?void 0:i.versificationId)=="string"?s.customData.versificationId:void 0},getSectionHeading:(s,i)=>{var h;const p=i.find(Xe=>{var U;return typeof((U=Xe.customData)==null?void 0:U.versificationName)=="string"}),d=(h=p==null?void 0:p.customData)==null?void 0:h.versificationName;return typeof d=="string"?d:s},unknownSectionHeading:"Unknown versification",priorityKey:"eng"}),[]),n=a.useMemo(()=>[...b,t],[t]);return o.jsx(c,{mode:"project",projects:g,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:s})=>r(s),availableGroupings:n,defaultGrouping:"versification",localizedStrings:{buttonPlaceholder:"Select a reference project",ariaLabel:"Reference project"}})},parameters:{docs:{description:{story:"A custom grouping — versification — appended to the built-ins. `getGroupKey` reads `p.customData?.versificationId`; `getSectionHeading` lifts the display name from `versificationName` on the first row in the bucket; `priorityKey: 'eng'` pins the caller's active versification to the top. `defaultGrouping=\"versification\"` opens with it active. Consumers can register any number of custom groupings this way."}}}},z={render:()=>{const[e,r]=a.useState(void 0),t=a.useMemo(()=>_e({openTabsLabel:"By open tabs",lastUsedLabel:"By last used",languageLabel:"By language",typeLabel:"By kind",lastUsedRecentSectionHeading:"Recently opened",lastUsedOtherSectionHeading:"Everything else",languageUnknownSectionHeading:"Language unknown",typeUnknownSectionHeading:"Kind unknown"}),[]);return o.jsx(c,{mode:"project",projects:g,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:n})=>r(n),availableGroupings:t,localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`makeBuiltInGroupings(strings)` returns the four built-ins with the labels and section headings you pass in. This is the recommended production path — every consumer resolves the same `%projectSelector_*%` keys through `useLocalizedStrings` and forwards them here."}}}},B={render:()=>{const[e,r]=a.useState("esvus16"),t=a.useMemo(()=>[b[0]],[]);return o.jsx(c,{mode:"project",projects:g,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:n})=>r(n),availableGroupings:t,localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`availableGroupings` with exactly ONE grouping locks the user into that grouping — the filter funnel drops away entirely (this is single-select, so there is no `Show selected only` toggle either, and the whole menu has nothing to render). The lone grouping is applied unconditionally."}}}},E={render:()=>{const[e,r]=a.useState(void 0),t=b.find(i=>i.id==="language"),n=b.find(i=>i.id==="type"),s=a.useMemo(()=>[t,n],[t,n]);return o.jsx(c,{mode:"project",projects:g,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:i})=>r(i),availableGroupings:s,defaultGrouping:"type",localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:'`availableGroupings=[languageGrouping, typeGrouping]` narrows the filter menu to just those two. `defaultGrouping="type"` opens with type-grouping active. Two groupings → the "None" radio + both options render normally (single-grouping lock only kicks in when there is exactly one option).'}}}},R={name:"Type indicators (projects vs resources)",render:()=>{const[e,r]=a.useState("esvus16");return o.jsx(c,{mode:"project",projects:g,openTabs:[],selection:{projectId:e},onChangeSelection:({projectId:t})=>r(t),localizedStrings:{buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"},renderProjectIndicator:t=>{var d,h;const n=(d=t.customData)==null?void 0:d.type,s=n==="ScriptureResource"?qe:Je,i=(h=t.customData)==null?void 0:h.typeName,p=(typeof i=="string"?i:void 0)??(typeof n=="string"?n:void 0)??"Uncategorized";return{node:o.jsx("span",{role:"img","aria-label":p,children:o.jsx(s,{className:"tw:h-3 tw:w-3 tw:opacity-60","aria-hidden":!0})}),label:p}}})},parameters:{docs:{description:{story:"`renderProjectIndicator` lets the caller distinguish row types from data rather than copy. This fixture reads the caller's own `customData.type` values (mixing PT9 ProjectType keys and DBL ResourceType keys, same fixture as the grouping stories) and renders a book icon specifically for the `ScriptureResource` type, a document icon for everything else. The selector renders whatever node the caller returns and cannot know what a glyph means, so naming it is the caller's job: each icon here sits in a `role=\"img\"` wrapper labelled with the project's type, which is what a screen reader announces. The hover half goes through the returned `label` rather than a native `title`, because the row is already a tooltip trigger and a `title` inside one opens a second tooltip over the first."}}}};var A,H,M;w.parameters={...w.parameters,docs:{...(A=w.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <ShortNameTriggerLabelStory openTabs={sampleOpenTabs} />,
  parameters: {
    docs: {
      description: {
        story: '\`triggerLabelFormat="shortName"\` (the default) renders only the selected project\\'s short name in the trigger. This story pairs the format with fixtures that omit \`fullName\` so the popover rows also collapse to a single line — the trigger and rows both read the short name only. Compare with \`WideTriggerLabel\` at the same width to see the \`{shortName} - {fullName}\` variant with distinct names.'
      }
    }
  }
}`,...(M=(H=w.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var F,W,K;S.parameters={...S.parameters,docs:{...(F=S.parameters)==null?void 0:F.docs,source:{originalSource:`{
  // No project is open in any scroll group, so the right-side scroll-group chips are suppressed and
  // every row renders in muted text (the "not open anywhere" state).
  render: () => <ShortNameTriggerLabelStory openTabs={[]} />,
  parameters: {
    docs: {
      description: {
        story: 'Same no-full-name setup as \`ShortNameTriggerLabel\`, but with no open tabs. The scroll-group chips on the right disappear and every row renders muted (the "not open anywhere" state), yielding the plainest single-line row layout the selector can render.'
      }
    }
  }
}`,...(K=(W=S.parameters)==null?void 0:W.docs)==null?void 0:K.source}}};var V,X,_;y.parameters={...y.parameters,docs:{...(V=y.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(_=(X=y.parameters)==null?void 0:X.docs)==null?void 0:_.source}}};var q,J,Y;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(Y=(J=f.parameters)==null?void 0:J.docs)==null?void 0:Y.source}}};var Q,Z,$;I.parameters={...I.parameters,docs:{...(Q=I.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...($=(Z=I.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,te,oe;P.parameters={...P.parameters,docs:{...(ee=P.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => {
    const [projectId, setProjectId] = useState<string | undefined>('esvus16');
    const [dialogOpenCount, setDialogOpenCount] = useState(0);
    return <div className="tw:flex tw:flex-col tw:gap-2">
        <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
        projectId
      }} onChangeSelection={({
        projectId: newId
      }) => setProjectId(newId)} localizedStrings={{
        ariaLabel: 'Project'
      }}
      // A two-part label: short name leading, full name trailing in muted text. The callback
      // owns the WHOLE trigger, including the nothing-selected case, which is why it has to
      // answer \`undefined\` itself rather than falling back to \`buttonPlaceholder\`.
      renderTriggerLabel={selected => selected ? <span className="tw:flex tw:min-w-0 tw:items-baseline tw:gap-1">
                <span className="tw:truncate tw:font-medium">{selected.shortName}</span>
                <span className="tw:min-w-0 tw:truncate tw:text-xs tw:opacity-60">
                  {selected.fullName}
                </span>
              </span> : 'Select a project'} footerAction={{
        label: 'More projects…',
        onSelect: () => setDialogOpenCount(n => n + 1)
      }} />
        <p className="tw:text-xs tw:opacity-60">
          &ldquo;More projects…&rdquo; selected {dialogOpenCount.toString()} time(s)
        </p>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: '\`renderTriggerLabel\` and \`footerAction\` together, as the titlebar project picker combines them: the trigger renders a compound short-name/full-name label instead of the derived string, and a footer row below the last section opens a different surface (here, just a counter standing in for a "More projects…" dialog). The footer separator is a plain rule with \`alwaysRender\` so it survives an active search query, and it renders only when a section above it has rows.'
      }
    }
  }
}`,...(oe=(te=P.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};var re,ne,se;v.parameters={...v.parameters,docs:{...(re=v.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(se=(ne=v.parameters)==null?void 0:ne.docs)==null?void 0:se.source}}};var ae,ie,ce;T.parameters={...T.parameters,docs:{...(ae=T.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
}`,...(ce=(ie=T.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var le,pe,de;N.parameters={...N.parameters,docs:{...(le=N.parameters)==null?void 0:le.docs,source:{originalSource:`{
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
}`,...(de=(pe=N.parameters)==null?void 0:pe.docs)==null?void 0:de.source}}};var ue,ge,he;G.parameters={...G.parameters,docs:{...(ue=G.parameters)==null?void 0:ue.docs,source:{originalSource:`{
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
}`,...(he=(ge=G.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};var me,je,be;x.parameters={...x.parameters,docs:{...(me=x.parameters)==null?void 0:me.docs,source:{originalSource:`{
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
}`,...(be=(je=x.parameters)==null?void 0:je.docs)==null?void 0:be.source}}};var we,Se,ye;L.parameters={...L.parameters,docs:{...(we=L.parameters)==null?void 0:we.docs,source:{originalSource:`{
  render: () => <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
    projectId: 'esvus16'
  }} onChangeSelection={() => {}} isDisabled localizedStrings={{
    buttonPlaceholder: 'Select a project',
    ariaLabel: 'Project'
  }} />
}`,...(ye=(Se=L.parameters)==null?void 0:Se.docs)==null?void 0:ye.source}}};var fe,Ie,Pe;k.parameters={...k.parameters,docs:{...(fe=k.parameters)==null?void 0:fe.docs,source:{originalSource:`{
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
}`,...(Pe=(Ie=k.parameters)==null?void 0:Ie.docs)==null?void 0:Pe.source}}};var ve,Te,Ne;C.parameters={...C.parameters,docs:{...(ve=C.parameters)==null?void 0:ve.docs,source:{originalSource:`{
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
}`,...(Ne=(Te=C.parameters)==null?void 0:Te.docs)==null?void 0:Ne.source}}};var Ge,xe,Le;O.parameters={...O.parameters,docs:{...(Ge=O.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
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
}`,...(Le=(xe=O.parameters)==null?void 0:xe.docs)==null?void 0:Le.source}}};var ke,Ce,Oe;D.parameters={...D.parameters,docs:{...(ke=D.parameters)==null?void 0:ke.docs,source:{originalSource:`{
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
}`,...(Oe=(Ce=D.parameters)==null?void 0:Ce.docs)==null?void 0:Oe.source}}};var De,ze,Be;z.parameters={...z.parameters,docs:{...(De=z.parameters)==null?void 0:De.docs,source:{originalSource:`{
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
}`,...(Be=(ze=z.parameters)==null?void 0:ze.docs)==null?void 0:Be.source}}};var Ee,Re,Ue;B.parameters={...B.parameters,docs:{...(Ee=B.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
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
}`,...(Ue=(Re=B.parameters)==null?void 0:Re.docs)==null?void 0:Ue.source}}};var Ae,He,Me;E.parameters={...E.parameters,docs:{...(Ae=E.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
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
}`,...(Me=(He=E.parameters)==null?void 0:He.docs)==null?void 0:Me.source}}};var Fe,We,Ke;R.parameters={...R.parameters,docs:{...(Fe=R.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
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
    }} renderProjectIndicator={project => {
      const type = project.customData?.type;
      const Icon = type === 'ScriptureResource' ? BookOpen : FileText;
      const typeName = project.customData?.typeName;
      // A row whose project carries no type still needs a name for its glyph — the fixture's
      // uncategorized entry exercises that path.
      const typeLabel = (typeof typeName === 'string' ? typeName : undefined) ?? (typeof type === 'string' ? type : undefined) ?? 'Uncategorized';
      // The glyph is the only visual carrier of "project or resource", so give it an
      // accessible name of its own instead of hiding it from assistive tech.
      //
      // No native \`title\`: a selector row is itself a tooltip trigger, so a \`title\` inside one
      // opens the browser's default tooltip on top of the app's. \`label\` is the way in — the
      // selector puts it in the row tooltip, which is the sighted-user half of the same job.
      return {
        node: <span role="img" aria-label={typeLabel}>
                <Icon className="tw:h-3 tw:w-3 tw:opacity-60" aria-hidden />
              </span>,
        label: typeLabel
      };
    }} />;
  },
  parameters: {
    docs: {
      description: {
        story: "\`renderProjectIndicator\` lets the caller distinguish row types from data rather than copy. This fixture reads the caller's own \`customData.type\` values (mixing PT9 ProjectType keys and DBL ResourceType keys, same fixture as the grouping stories) and renders a book icon specifically for the \`ScriptureResource\` type, a document icon for everything else. The selector renders whatever node the caller returns and cannot know what a glyph means, so naming it is the caller's job: each icon here sits in a \`role=\\"img\\"\` wrapper labelled with the project's type, which is what a screen reader announces. The hover half goes through the returned \`label\` rather than a native \`title\`, because the row is already a tooltip trigger and a \`title\` inside one opens a second tooltip over the first."
      }
    }
  }
}`,...(Ke=(We=R.parameters)==null?void 0:We.docs)==null?void 0:Ke.source}}};const Qt=["ShortNameTriggerLabel","ShortNameTriggerLabelNoScrollGroups","SingleProject","WideTriggerLabel","NarrowRailTrigger","CompoundTriggerLabelWithFooterAction","MultiProject","MultiProjectSingleSelection","ScrollGroupBinding","SimpleFlatList","NoProjects","Disabled","Loading","PerRowDisabled","AllBuiltInGroupings","CustomGroupingViaCustomData","LocalizedBuiltInGroupings","SingleGroupingLock","RestrictedGroupings","ProjectAndResourceIndicators"];export{O as AllBuiltInGroupings,P as CompoundTriggerLabelWithFooterAction,D as CustomGroupingViaCustomData,L as Disabled,k as Loading,z as LocalizedBuiltInGroupings,v as MultiProject,T as MultiProjectSingleSelection,I as NarrowRailTrigger,x as NoProjects,C as PerRowDisabled,R as ProjectAndResourceIndicators,E as RestrictedGroupings,N as ScrollGroupBinding,w as ShortNameTriggerLabel,S as ShortNameTriggerLabelNoScrollGroups,G as SimpleFlatList,B as SingleGroupingLock,y as SingleProject,f as WideTriggerLabel,Qt as __namedExportsOrder,Yt as default};
