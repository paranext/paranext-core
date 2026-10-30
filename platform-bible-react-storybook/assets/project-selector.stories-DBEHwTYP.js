import{r as a,j as r}from"./iframe-BPYJEW2Z.js";import{P as c,d as b,m as qe}from"./project-selector.component-D8sqJVfP.js";import{B as Je}from"./book-open-B_xgiJTM.js";import{F as Ye}from"./file-text-B0P-OE3w.js";import"./preload-helper-CTOgD26E.js";import"./index-B2Agy_j1.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./localization.util-C4JImkK1.js";import"./badge-DO-cG0Y9.js";import"./index-BnuTq2W6.js";import"./index-BrYtL90e.js";import"./button-DaMpPBzG.js";import"./popover-cbotnAbJ.js";import"./portal-container.context-CPVwE0eO.js";import"./index-Cp2Ffj8o.js";import"./index-D7LukSKn.js";import"./index-BTQlNjKo.js";import"./index-BSeJATQf.js";import"./index-SGGBNudZ.js";import"./index-k_xDJPKZ.js";import"./index-54ooeuDQ.js";import"./index-RBN3nHv9.js";import"./index-BEkFGIzT.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-Cr9YQ67I.js";import"./index-B0vPlM4p.js";import"./command-C3kaThjv.js";import"./index-D4wllpWD.js";import"./dialog-Ksrkfk76.js";import"./createReactComponent-DLhyd9PA.js";import"./input-group-BKs_YhnL.js";import"./input-DGcyqh-M.js";import"./IconCheck-D8gWG949.js";import"./dropdown-menu-D6bXjZU9.js";import"./menu.context-bxT9vNUR.js";import"./IconChevronRight-C8yV70Zh.js";import"./index-BAV0hGPd.js";import"./index-jY7V8SKK.js";import"./tooltip-DgRlD8tz.js";import"./index-D4F8z1-B.js";import"./use-truncation-tooltip.hook-CHzxBW0e.js";import"./createLucideIcon-DubGwG6v.js";import"./check-C7gFfg12.js";import"./arrow-right-B4-N1Ukb.js";import"./loader-circle-CmarIHJS.js";import"./chevrons-up-down-CmEra5kZ.js";import"./chevron-down-BXjGz9lp.js";const{expect:Qe,userEvent:H,within:Ze}=__STORYBOOK_MODULE_TEST__,u=[{id:"hpux",shortName:"HPUX",fullName:"Hawaii Pidgin UX Test Project"},{id:"esvus16",shortName:"ESVUS16",fullName:"English Standard Version (US) 2016"},{id:"esv16uk",shortName:"ESV16UK",fullName:"English Standard Version (UK) 2016"},{id:"tp1",shortName:"TP1",fullName:"Test Project 1"},{id:"heb-grk",shortName:"HEB/GRK",fullName:"Hebrew / Greek"},{id:"schl1951",shortName:"SCHL1951",fullName:"Schlachter 1951"},{id:"web",shortName:"WEB",fullName:"World English Bible"}],l=[{projectId:"esvus16",scrollGroupId:0,scrollGroupScrRefLabel:"GEN 1:1"},{projectId:"esvus16",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"hpux",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"web",scrollGroupId:2,scrollGroupScrRefLabel:"JHN 1:1"}],Zt={title:"Advanced/Project Selector",component:c,tags:["autodocs"],decorators:[e=>r.jsx("div",{className:"tw:w-[320px] tw:p-4",children:r.jsx(e,{})})]},$e=u.map(e=>({id:e.id,shortName:e.shortName}));function _e({openTabs:e}){const[o,t]=a.useState("esvus16");return r.jsx("div",{className:"tw:w-80",children:r.jsx(c,{mode:"project",projects:$e,openTabs:e,selection:{projectId:o},onChangeSelection:({projectId:n})=>t(n),localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"},triggerLabelFormat:"shortName",buttonClassName:"tw:w-full"})})}const w={render:()=>r.jsx(_e,{openTabs:l}),parameters:{docs:{description:{story:'`triggerLabelFormat="shortName"` (the default) renders only the selected project\'s short name in the trigger. This story pairs the format with fixtures that omit `fullName` so the popover rows also collapse to a single line — the trigger and rows both read the short name only. Compare with `WideTriggerLabel` at the same width to see the `{shortName} - {fullName}` variant with distinct names.'}}}},y={render:()=>r.jsx(_e,{openTabs:[]}),parameters:{docs:{description:{story:'Same no-full-name setup as `ShortNameTriggerLabel`, but with no open tabs. The scroll-group chips on the right disappear and every row renders muted (the "not open anywhere" state), yielding the plainest single-line row layout the selector can render.'}}}},S={render:()=>{const[e,o]=a.useState("esvus16");return r.jsx(c,{mode:"project",projects:u,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:t})=>o(t),localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})},parameters:{docs:{description:{story:"Single-select in `project` mode. One row per project; the chips on the right list every scroll group the project is currently open in (metadata only — the whole row is the click target). Rows for projects not open anywhere render in muted text. Selected rows float to the top of their section. `availableGroupings` is omitted so no filter/grouping menu renders."}}}},f={render:()=>{const[e,o]=a.useState("esvus16");return r.jsx("div",{className:"tw:w-80",children:r.jsx(c,{mode:"project",projects:u,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:t})=>o(t),triggerLabelFormat:"shortNameAndFullName",localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})})},parameters:{docs:{description:{story:'`triggerLabelFormat="shortNameAndFullName"` renders `{shortName} - {fullName}` in the trigger (manage-books wide sidebar). The short name leads so ellipsis truncation keeps it readable, and the trigger\'s own tooltip carries the untruncated text on hover. Width comes from the wrapping `<div className="tw:w-80">` — the selector fills its container.'}}}},I={render:()=>{const[e,o]=a.useState("esvus16");return r.jsx("div",{className:"tw:w-14",children:r.jsx(c,{mode:"project",projects:u,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:t})=>o(t),localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project"}})})},parameters:{docs:{description:{story:"Wrapper width is `tw:w-14` (~56px). The component observes its own trigger width and, below the internal narrow threshold (~100px), drops the chevron and tightens the padding automatically — the label's leading characters stay legible in an icon-rail sidebar. Consumers do not opt into this; they just size the wrapper and the selector adapts."}}}},P={render:()=>{const[e,o]=a.useState("esvus16"),[t,n]=a.useState(0);return r.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2",children:[r.jsx(c,{mode:"project",projects:u,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:s})=>o(s),localizedStrings:{ariaLabel:"Project"},renderTriggerLabel:s=>s?r.jsxs("span",{className:"tw:flex tw:min-w-0 tw:items-baseline tw:gap-1",children:[r.jsx("span",{className:"tw:truncate tw:font-medium",children:s.shortName}),r.jsx("span",{className:"tw:min-w-0 tw:truncate tw:text-xs tw:opacity-60",children:s.fullName})]}):"Select a project",footerAction:{label:"More projects…",onSelect:()=>n(s=>s+1)}}),r.jsxs("p",{className:"tw:text-xs tw:opacity-60",children:["“More projects…” selected ",t.toString()," time(s)"]})]})},parameters:{docs:{description:{story:'`renderTriggerLabel` and `footerAction` together, as the titlebar project picker combines them: the trigger renders a compound short-name/full-name label instead of the derived string, and a footer row below the last section opens a different surface (here, just a counter standing in for a "More projects…" dialog). The footer separator is a plain rule with `alwaysRender` so it survives an active search query, and it renders only when a section above it has rows.'}}}},v={render:()=>{const[e,o]=a.useState([{projectId:"esvus16",scrollGroupId:0},{projectId:"esv16uk"}]),[t,n]=a.useState(l);return r.jsx(c,{mode:"project-multi",projects:u,openTabs:t,selection:{pairs:e},onChangeSelection:({pairs:s})=>o(s),onOpenProjectInGroup:(s,i)=>{n(p=>p.some(d=>d.projectId===s&&d.scrollGroupId===i)?p:[...p,{projectId:s,scrollGroupId:i}])},localizedStrings:{buttonPlaceholder:"Select projects",ariaLabel:"Projects"}})},parameters:{docs:{description:{story:'Multi-select over `(projectId, scrollGroupId)` pairs with no explicit `availableGroupings`. The component auto-adds two groupings: `openTabs` (because `openTabs.length > 0`) and `selection` (because `mode === "project-multi"`), so the filter menu offers Open tabs / Selection out of the box. Consumers who want different labels, ordering, or additional groupings pass their own `availableGroupings`.'}}}},T={render:()=>{const[e,o]=a.useState([{projectId:"esvus16"}]);return r.jsx(c,{mode:"project-multi",projects:u,openTabs:l,selection:{pairs:e},onChangeSelection:({pairs:t})=>o(t),localizedStrings:{buttonPlaceholder:"Select projects",ariaLabel:"Projects"}})},parameters:{docs:{description:{story:'Multi-select with exactly one project selected — isolates the trigger at the boundary between "nothing selected" and "2+ selected" so its shape can be compared against `MultiProject`. The trigger already renders the same `Badge` + comma-joined-items shape at 1 as it does at 2+ (the count badge renders unconditionally once `pairs.length > 0`); this story exists to keep that comparison checkable in Storybook rather than only in source.'}}}},N={render:()=>{const[e,o]=a.useState({projectId:"esvus16",scrollGroupId:1}),[t,n]=a.useState(l);return r.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2",children:[r.jsx(c,{mode:"projectScrollGroup",projects:u,openTabs:t,selection:e,onChangeSelection:o,onOpenProjectInGroup:(s,i)=>{n(p=>p.some(d=>d.projectId===s&&d.scrollGroupId===i)?p:[...p,{projectId:s,scrollGroupId:i}])},localizedStrings:{buttonPlaceholder:"Select a project + scroll group",ariaLabel:"Project with scroll group"}}),r.jsx("button",{type:"button",className:"tw:rounded tw:border tw:border-border tw:px-2 tw:py-1 tw:text-xs",onClick:()=>n(s=>s.filter(i=>!(i.projectId===e.projectId&&i.scrollGroupId===e.scrollGroupId))),children:"Close tab for current selection (shows bound-but-closed synthetic row)"})]})},parameters:{docs:{description:{story:"One row per `(project, open scroll group)` pair, plus one row per project not open anywhere. Clicking a not-open-project row calls `onOpenProjectInGroup(projectId, 0)` to open a tab in Group A and selects that pair. Use the button to close the currently-bound tab — a synthetic row appears with an outlined chip; clicking it calls `onOpenProjectInGroup` again to reopen without changing selection."}}}},et=[...u,{id:"na28",shortName:"NA28",fullName:"Nestle-Aland 28th Edition (Greek NT)"},{id:"bhs",shortName:"BHS",fullName:"Biblia Hebraica Stuttgartensia"},{id:"lxx",shortName:"LXX",fullName:"Septuagint"}],G={render:()=>{const[e,o]=a.useState("esvus16");return r.jsx(c,{mode:"project",projects:et,openTabs:[],selection:{projectId:e},onChangeSelection:({projectId:t})=>o(t),localizedStrings:{buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:'Single-select with `mode="project"` and `openTabs={[]}`. No `availableGroupings` prop → no filter menu at all. No scroll-group chips render on any row. `partitionFlat` returns one unheaded list. Sample data mixes projects (HPUX, TP1, SCHL1951) and resources (NA28, BHS, LXX) — the component itself does not visually distinguish the two; they render identically.'}}}},x={render:()=>{const[e,o]=a.useState(void 0);return r.jsx(c,{mode:"project",projects:[],openTabs:[],selection:{projectId:e},onChangeSelection:({projectId:t})=>o(t),localizedStrings:{buttonPlaceholder:"Select a project",commandEmptyMessage:"No projects found",ariaLabel:"Project"}})}},L={render:()=>r.jsx(c,{mode:"project",projects:u,openTabs:l,selection:{projectId:"esvus16"},onChangeSelection:()=>{},isDisabled:!0,localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})},k={render:()=>r.jsx(c,{mode:"project",projects:[],openTabs:[],selection:{projectId:void 0},onChangeSelection:()=>{},isLoading:!0,localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}}),parameters:{docs:{description:{story:"`isLoading` shows a spinner in place of the chevron and disables the trigger while the project list is still loading, so the user sees the picker is not ready yet (distinct from `isDisabled`, which is a generic busy state with no spinner)."}}}},C={tags:["test"],play:async({canvasElement:e})=>{const o=Ze(e.ownerDocument.body);await H.click(o.getByRole("combobox",{name:/^Project/})),await H.hover(await o.findByRole("option",{name:/ESV16UK/})),await Qe(await o.findByRole("tooltip")).toHaveTextContent("Read-only — cannot copy into this project")},render:()=>{const e=u.map(n=>n.id==="esv16uk"||n.id==="tp1"?{...n,isDisabled:!0,disabledReason:"Read-only — cannot copy into this project"}:n),[o,t]=a.useState(void 0);return r.jsx(c,{mode:"project",projects:e,openTabs:l,selection:{projectId:o},onChangeSelection:({projectId:n})=>t(n),localizedStrings:{buttonPlaceholder:"Pick a target project",ariaLabel:"Project"}})},parameters:{docs:{description:{story:"Two projects (`ESV16UK`, `TP1`) are marked disabled with a `disabledReason`. They render muted, are not selectable (Up/Down navigation skips them), and the reason surfaces in the row tooltip on hover and in the row description screen readers announce. Use this to surface read-only or otherwise-unusable projects without filtering them out of the list."}}}},m=172e10,j=24*60*60*1e3,h=[{id:"esvus16",shortName:"ESVUS16",fullName:"English Standard Version (US) 2016",customData:{language:"English",type:"Standard",typeName:"Standard translation",lastUsedAt:m-1*j,versificationId:"eng",versificationName:"English versification"}},{id:"tp1",shortName:"TP1",fullName:"Test Project 1",customData:{language:"English",type:"Standard",typeName:"Standard translation",versificationId:"eng",versificationName:"English versification"}},{id:"hpux-bt",shortName:"HPUXBT",fullName:"Hawaii Pidgin — Back Translation",customData:{language:"English",type:"BackTranslation",typeName:"Back translation",lastUsedAt:m-3*j,versificationId:"eng",versificationName:"English versification"}},{id:"sb-esv",shortName:"ESVSB",fullName:"ESV Study Bible",customData:{language:"English",type:"StudyBible",typeName:"Study Bible",lastUsedAt:m-10*j,versificationId:"eng",versificationName:"English versification"}},{id:"na28",shortName:"NA28",fullName:"Nestle-Aland 28th Edition",customData:{language:"Greek",type:"ScriptureResource",typeName:"Scripture resource",lastUsedAt:m-2*j,versificationId:"org",versificationName:"Original versification"}},{id:"bhs",shortName:"BHS",fullName:"Biblia Hebraica Stuttgartensia",customData:{language:"Hebrew",type:"ScriptureResource",typeName:"Scripture resource",versificationId:"org",versificationName:"Original versification"}},{id:"mhc",shortName:"MHC",fullName:"Matthew Henry's Commentary",customData:{language:"English",type:"CommentaryResource",typeName:"Commentary",lastUsedAt:m-20*j}},{id:"schl1951",shortName:"SCHL1951",fullName:"Schlachter 1951",customData:{language:"German",type:"Standard",typeName:"Standard translation",versificationId:"lxx",versificationName:"Septuagint versification"}},{id:"legacy",shortName:"LEGACY",fullName:"Legacy Uncategorized Project"}],O={render:()=>{const[e,o]=a.useState("esvus16");return r.jsx(c,{mode:"project",projects:h,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:t})=>o(t),availableGroupings:b,localizedStrings:{buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`availableGroupings={defaultGroupings}` passes all four built-ins (`openTabs`, `lastUsed`, `language`, `type`) with English labels. Open the funnel icon to switch. Each built-in reads its key from `project.customData` (see the `ProjectSelectorProject.customData` JSDoc for the well-known keys). Consumers wire localization by calling `makeBuiltInGroupings(strings)` instead."}}}},D={render:()=>{const[e,o]=a.useState(void 0),t=a.useMemo(()=>({id:"versification",label:"Versification",getGroupKey:s=>{var i;return typeof((i=s.customData)==null?void 0:i.versificationId)=="string"?s.customData.versificationId:void 0},getSectionHeading:(s,i)=>{var g;const p=i.find(Xe=>{var U;return typeof((U=Xe.customData)==null?void 0:U.versificationName)=="string"}),d=(g=p==null?void 0:p.customData)==null?void 0:g.versificationName;return typeof d=="string"?d:s},unknownSectionHeading:"Unknown versification",priorityKey:"eng"}),[]),n=a.useMemo(()=>[...b,t],[t]);return r.jsx(c,{mode:"project",projects:h,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:s})=>o(s),availableGroupings:n,defaultGrouping:"versification",localizedStrings:{buttonPlaceholder:"Select a reference project",ariaLabel:"Reference project"}})},parameters:{docs:{description:{story:"A custom grouping — versification — appended to the built-ins. `getGroupKey` reads `p.customData?.versificationId`; `getSectionHeading` lifts the display name from `versificationName` on the first row in the bucket; `priorityKey: 'eng'` pins the caller's active versification to the top. `defaultGrouping=\"versification\"` opens with it active. Consumers can register any number of custom groupings this way."}}}},B={render:()=>{const[e,o]=a.useState(void 0),t=a.useMemo(()=>qe({openTabsLabel:"By open tabs",lastUsedLabel:"By last used",languageLabel:"By language",typeLabel:"By kind",lastUsedRecentSectionHeading:"Recently opened",lastUsedOtherSectionHeading:"Everything else",languageUnknownSectionHeading:"Language unknown",typeUnknownSectionHeading:"Kind unknown"}),[]);return r.jsx(c,{mode:"project",projects:h,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:n})=>o(n),availableGroupings:t,localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`makeBuiltInGroupings(strings)` returns the four built-ins with the labels and section headings you pass in. This is the recommended production path — every consumer resolves the same `%projectSelector_*%` keys through `useLocalizedStrings` and forwards them here."}}}},R={render:()=>{const[e,o]=a.useState("esvus16"),t=a.useMemo(()=>[b[0]],[]);return r.jsx(c,{mode:"project",projects:h,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:n})=>o(n),availableGroupings:t,localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`availableGroupings` with exactly ONE grouping locks the user into that grouping — the filter funnel drops away entirely (this is single-select, so there is no `Show selected only` toggle either, and the whole menu has nothing to render). The lone grouping is applied unconditionally."}}}},z={render:()=>{const[e,o]=a.useState(void 0),t=b.find(i=>i.id==="language"),n=b.find(i=>i.id==="type"),s=a.useMemo(()=>[t,n],[t,n]);return r.jsx(c,{mode:"project",projects:h,openTabs:l,selection:{projectId:e},onChangeSelection:({projectId:i})=>o(i),availableGroupings:s,defaultGrouping:"type",localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:'`availableGroupings=[languageGrouping, typeGrouping]` narrows the filter menu to just those two. `defaultGrouping="type"` opens with type-grouping active. Two groupings → the "None" radio + both options render normally (single-grouping lock only kicks in when there is exactly one option).'}}}},E={name:"Type indicators (projects vs resources)",render:()=>{const[e,o]=a.useState("esvus16");return r.jsx(c,{mode:"project",projects:h,openTabs:[],selection:{projectId:e},onChangeSelection:({projectId:t})=>o(t),localizedStrings:{buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"},renderProjectIndicator:t=>{var d,g;const n=(d=t.customData)==null?void 0:d.type,s=n==="ScriptureResource"?Je:Ye,i=(g=t.customData)==null?void 0:g.typeName,p=(typeof i=="string"?i:void 0)??(typeof n=="string"?n:void 0)??"Uncategorized";return{node:r.jsx("span",{role:"img","aria-label":p,children:r.jsx(s,{className:"tw:h-3 tw:w-3 tw:opacity-60","aria-hidden":!0})}),label:p}}})},parameters:{docs:{description:{story:"`renderProjectIndicator` lets the caller distinguish row types from data rather than copy. This fixture reads the caller's own `customData.type` values (mixing PT9 ProjectType keys and DBL ResourceType keys, same fixture as the grouping stories) and renders a book icon specifically for the `ScriptureResource` type, a document icon for everything else. The selector renders whatever node the caller returns and cannot know what a glyph means, so naming it is the caller's job: each icon here sits in a `role=\"img\"` wrapper labelled with the project's type, which is what a screen reader announces. The hover half goes through the returned `label` rather than a native `title`, because the row is already a tooltip trigger and a `title` inside one opens a second tooltip over the first."}}}};var A,M,F;w.parameters={...w.parameters,docs:{...(A=w.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <ShortNameTriggerLabelStory openTabs={sampleOpenTabs} />,
  parameters: {
    docs: {
      description: {
        story: '\`triggerLabelFormat="shortName"\` (the default) renders only the selected project\\'s short name in the trigger. This story pairs the format with fixtures that omit \`fullName\` so the popover rows also collapse to a single line — the trigger and rows both read the short name only. Compare with \`WideTriggerLabel\` at the same width to see the \`{shortName} - {fullName}\` variant with distinct names.'
      }
    }
  }
}`,...(F=(M=w.parameters)==null?void 0:M.docs)==null?void 0:F.source}}};var K,W,V;y.parameters={...y.parameters,docs:{...(K=y.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(V=(W=y.parameters)==null?void 0:W.docs)==null?void 0:V.source}}};var _,X,q;S.parameters={...S.parameters,docs:{...(_=S.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(q=(X=S.parameters)==null?void 0:X.docs)==null?void 0:q.source}}};var J,Y,Q;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(Q=(Y=f.parameters)==null?void 0:Y.docs)==null?void 0:Q.source}}};var Z,$,ee;I.parameters={...I.parameters,docs:{...(Z=I.parameters)==null?void 0:Z.docs,source:{originalSource:`{
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
}`,...(ee=($=I.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var te,oe,re;P.parameters={...P.parameters,docs:{...(te=P.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(re=(oe=P.parameters)==null?void 0:oe.docs)==null?void 0:re.source}}};var ne,se,ae;v.parameters={...v.parameters,docs:{...(ne=v.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
}`,...(ae=(se=v.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};var ie,ce,le;T.parameters={...T.parameters,docs:{...(ie=T.parameters)==null?void 0:ie.docs,source:{originalSource:`{
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
}`,...(le=(ce=T.parameters)==null?void 0:ce.docs)==null?void 0:le.source}}};var pe,de,ue;N.parameters={...N.parameters,docs:{...(pe=N.parameters)==null?void 0:pe.docs,source:{originalSource:`{
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
}`,...(ue=(de=N.parameters)==null?void 0:de.docs)==null?void 0:ue.source}}};var he,ge,me;G.parameters={...G.parameters,docs:{...(he=G.parameters)==null?void 0:he.docs,source:{originalSource:`{
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
}`,...(me=(ge=G.parameters)==null?void 0:ge.docs)==null?void 0:me.source}}};var je,be,we;x.parameters={...x.parameters,docs:{...(je=x.parameters)==null?void 0:je.docs,source:{originalSource:`{
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
}`,...(we=(be=x.parameters)==null?void 0:be.docs)==null?void 0:we.source}}};var ye,Se,fe;L.parameters={...L.parameters,docs:{...(ye=L.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: () => <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
    projectId: 'esvus16'
  }} onChangeSelection={() => {}} isDisabled localizedStrings={{
    buttonPlaceholder: 'Select a project',
    ariaLabel: 'Project'
  }} />
}`,...(fe=(Se=L.parameters)==null?void 0:Se.docs)==null?void 0:fe.source}}};var Ie,Pe,ve;k.parameters={...k.parameters,docs:{...(Ie=k.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
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
}`,...(ve=(Pe=k.parameters)==null?void 0:Pe.docs)==null?void 0:ve.source}}};var Te,Ne,Ge;C.parameters={...C.parameters,docs:{...(Te=C.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  // Runs in a real browser: jsdom applies no CSS, so it cannot see the shared \`CommandItem\`'s
  // \`pointer-events: none\` on disabled rows that would stop this hover from reaching the row.
  tags: ['test'],
  play: async ({
    canvasElement
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(body.getByRole('combobox', {
      name: /^Project/
    }));
    await userEvent.hover(await body.findByRole('option', {
      name: /ESV16UK/
    }));
    await expect(await body.findByRole('tooltip')).toHaveTextContent('Read-only — cannot copy into this project');
  },
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
        story: 'Two projects (\`ESV16UK\`, \`TP1\`) are marked disabled with a \`disabledReason\`. They render muted, are not selectable (Up/Down navigation skips them), and the reason surfaces in the row tooltip on hover and in the row description screen readers announce. Use this to surface read-only or otherwise-unusable projects without filtering them out of the list.'
      }
    }
  }
}`,...(Ge=(Ne=C.parameters)==null?void 0:Ne.docs)==null?void 0:Ge.source}}};var xe,Le,ke;O.parameters={...O.parameters,docs:{...(xe=O.parameters)==null?void 0:xe.docs,source:{originalSource:`{
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
}`,...(ke=(Le=O.parameters)==null?void 0:Le.docs)==null?void 0:ke.source}}};var Ce,Oe,De;D.parameters={...D.parameters,docs:{...(Ce=D.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
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
}`,...(De=(Oe=D.parameters)==null?void 0:Oe.docs)==null?void 0:De.source}}};var Be,Re,ze;B.parameters={...B.parameters,docs:{...(Be=B.parameters)==null?void 0:Be.docs,source:{originalSource:`{
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
}`,...(ze=(Re=B.parameters)==null?void 0:Re.docs)==null?void 0:ze.source}}};var Ee,Ue,He;R.parameters={...R.parameters,docs:{...(Ee=R.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
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
}`,...(He=(Ue=R.parameters)==null?void 0:Ue.docs)==null?void 0:He.source}}};var Ae,Me,Fe;z.parameters={...z.parameters,docs:{...(Ae=z.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
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
}`,...(Fe=(Me=z.parameters)==null?void 0:Me.docs)==null?void 0:Fe.source}}};var Ke,We,Ve;E.parameters={...E.parameters,docs:{...(Ke=E.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
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
}`,...(Ve=(We=E.parameters)==null?void 0:We.docs)==null?void 0:Ve.source}}};const $t=["ShortNameTriggerLabel","ShortNameTriggerLabelNoScrollGroups","SingleProject","WideTriggerLabel","NarrowRailTrigger","CompoundTriggerLabelWithFooterAction","MultiProject","MultiProjectSingleSelection","ScrollGroupBinding","SimpleFlatList","NoProjects","Disabled","Loading","PerRowDisabled","AllBuiltInGroupings","CustomGroupingViaCustomData","LocalizedBuiltInGroupings","SingleGroupingLock","RestrictedGroupings","ProjectAndResourceIndicators"];export{O as AllBuiltInGroupings,P as CompoundTriggerLabelWithFooterAction,D as CustomGroupingViaCustomData,L as Disabled,k as Loading,B as LocalizedBuiltInGroupings,v as MultiProject,T as MultiProjectSingleSelection,I as NarrowRailTrigger,x as NoProjects,C as PerRowDisabled,E as ProjectAndResourceIndicators,z as RestrictedGroupings,N as ScrollGroupBinding,w as ShortNameTriggerLabel,y as ShortNameTriggerLabelNoScrollGroups,G as SimpleFlatList,R as SingleGroupingLock,S as SingleProject,f as WideTriggerLabel,$t as __namedExportsOrder,Zt as default};
