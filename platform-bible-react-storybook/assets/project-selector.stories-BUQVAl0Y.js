import{r as a,j as r}from"./iframe-BLouS63C.js";import{P as c,d as b,m as Ue}from"./project-selector.component-DUIX3Xlm.js";import{B as Ae}from"./book-open-TgYoWN_k.js";import{F as He}from"./file-text-cQANn5PB.js";import"./preload-helper-CTOgD26E.js";import"./index-mGkT7YiS.js";import"./scripture-util-DArajUVn-CPHPTCtZ.js";import"./index.es-CXoS8DB2.js";import"./index-DCo3rgjq.js";import"./index-C77E7Q-s.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./localization.util-C4JImkK1.js";import"./badge-XNz1fusz.js";import"./index-BnuTq2W6.js";import"./index-BZHZa2Al.js";import"./button-DkEoLQZ3.js";import"./popover-DMtu4R9Y.js";import"./index-BJI4uwE5.js";import"./index-CHiGwW9C.js";import"./index-BXTkrbmv.js";import"./index-CKZ_WzNU.js";import"./index-Bi6vM45r.js";import"./index-BYpYHQSQ.js";import"./index-Dnc0Ht0Z.js";import"./index-ddkEJgJn.js";import"./index-CHsdSc2l.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-dtNwL1Yi.js";import"./index-DdoOfSqE.js";import"./command-DhoZS6hs.js";import"./index-CtaTf5_H.js";import"./dialog-RT-NBuMG.js";import"./createReactComponent-ChkUQwtL.js";import"./input-group-CmJhcCTe.js";import"./input-DdHzlEzQ.js";import"./IconCheck-iMS4ghXR.js";import"./dropdown-menu-CVACmcaL.js";import"./menu.context-BnCFrB0O.js";import"./IconChevronRight-BsicRiZI.js";import"./index-Dt1hruos.js";import"./index-B5ku4Z5Y.js";import"./tooltip-CJO8ctpM.js";import"./index-CrdBEV0e.js";import"./use-truncation-tooltip.hook-B8ZS2slP.js";import"./createLucideIcon-CnYUWbE3.js";import"./check-BKmE5aQx.js";import"./arrow-right-BB1nFDV9.js";import"./loader-circle-YMHXqrJs.js";import"./chevrons-up-down-UTlkEQ9B.js";import"./chevron-down-C5VfaAcA.js";const u=[{id:"hpux",shortName:"HPUX",fullName:"Hawaii Pidgin UX Test Project"},{id:"esvus16",shortName:"ESVUS16",fullName:"English Standard Version (US) 2016"},{id:"esv16uk",shortName:"ESV16UK",fullName:"English Standard Version (UK) 2016"},{id:"tp1",shortName:"TP1",fullName:"Test Project 1"},{id:"heb-grk",shortName:"HEB/GRK",fullName:"Hebrew / Greek"},{id:"schl1951",shortName:"SCHL1951",fullName:"Schlachter 1951"},{id:"web",shortName:"WEB",fullName:"World English Bible"}],p=[{projectId:"esvus16",scrollGroupId:0,scrollGroupScrRefLabel:"GEN 1:1"},{projectId:"esvus16",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"hpux",scrollGroupId:1,scrollGroupScrRefLabel:"MAT 3:16"},{projectId:"web",scrollGroupId:2,scrollGroupScrRefLabel:"JHN 1:1"}],At={title:"Advanced/Project Selector",component:c,tags:["autodocs"],decorators:[t=>r.jsx("div",{className:"tw:w-[320px] tw:p-4",children:r.jsx(t,{})})]},w={render:()=>{const[t,o]=a.useState("esvus16");return r.jsx(c,{mode:"project",projects:u,openTabs:p,selection:{projectId:t},onChangeSelection:({projectId:e})=>o(e),localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})},parameters:{docs:{description:{story:"Single-select in `project` mode. One row per project; the chips on the right list every scroll group the project is currently open in (metadata only — the whole row is the click target). Rows for projects not open anywhere render in muted text. Selected rows float to the top of their section. `availableGroupings` is omitted so no filter/grouping menu renders."}}}},S={render:()=>{const[t,o]=a.useState("esvus16");return r.jsx("div",{className:"tw:w-80",children:r.jsx(c,{mode:"project",projects:u,openTabs:p,selection:{projectId:t},onChangeSelection:({projectId:e})=>o(e),triggerLabelFormat:"shortNameAndFullName",localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})})},parameters:{docs:{description:{story:'`triggerLabelFormat="shortNameAndFullName"` renders `{shortName} - {fullName}` in the trigger (manage-books wide sidebar). The short name leads so ellipsis truncation keeps it readable, and the trigger\'s own tooltip carries the untruncated text on hover. Width comes from the wrapping `<div className="tw:w-80">` — the selector fills its container.'}}}},y={render:()=>{const[t,o]=a.useState("esvus16");return r.jsx("div",{className:"tw:w-14",children:r.jsx(c,{mode:"project",projects:u,openTabs:p,selection:{projectId:t},onChangeSelection:({projectId:e})=>o(e),localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project"}})})},parameters:{docs:{description:{story:"Wrapper width is `tw:w-14` (~56px). The component observes its own trigger width and, below the internal narrow threshold (~100px), drops the chevron and tightens the padding automatically — the label's leading characters stay legible in an icon-rail sidebar. Consumers do not opt into this; they just size the wrapper and the selector adapts."}}}},f={render:()=>{const[t,o]=a.useState("esvus16"),[e,s]=a.useState(0);return r.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2",children:[r.jsx(c,{mode:"project",projects:u,openTabs:p,selection:{projectId:t},onChangeSelection:({projectId:n})=>o(n),localizedStrings:{ariaLabel:"Project"},renderTriggerLabel:n=>n?r.jsxs("span",{className:"tw:flex tw:min-w-0 tw:items-baseline tw:gap-1",children:[r.jsx("span",{className:"tw:truncate tw:font-medium",children:n.shortName}),r.jsx("span",{className:"tw:min-w-0 tw:truncate tw:text-xs tw:opacity-60",children:n.fullName})]}):"Select a project",footerAction:{label:"More projects…",onSelect:()=>s(n=>n+1)}}),r.jsxs("p",{className:"tw:text-xs tw:opacity-60",children:["“More projects…” selected ",e.toString()," time(s)"]})]})},parameters:{docs:{description:{story:'`renderTriggerLabel` and `footerAction` together, as the titlebar project picker combines them: the trigger renders a compound short-name/full-name label instead of the derived string, and a footer row below the last section opens a different surface (here, just a counter standing in for a "More projects…" dialog). The footer separator is a plain rule with `alwaysRender` so it survives an active search query, and it renders only when a section above it has rows.'}}}},I={render:()=>{const[t,o]=a.useState([{projectId:"esvus16",scrollGroupId:0},{projectId:"esv16uk"}]),[e,s]=a.useState(p);return r.jsx(c,{mode:"project-multi",projects:u,openTabs:e,selection:{pairs:t},onChangeSelection:({pairs:n})=>o(n),onOpenProjectInGroup:(n,i)=>{s(l=>l.some(d=>d.projectId===n&&d.scrollGroupId===i)?l:[...l,{projectId:n,scrollGroupId:i}])},localizedStrings:{buttonPlaceholder:"Select projects",ariaLabel:"Projects"}})},parameters:{docs:{description:{story:'Multi-select over `(projectId, scrollGroupId)` pairs with no explicit `availableGroupings`. The component auto-adds two groupings: `openTabs` (because `openTabs.length > 0`) and `selection` (because `mode === "project-multi"`), so the filter menu offers Open tabs / Selection out of the box. Consumers who want different labels, ordering, or additional groupings pass their own `availableGroupings`.'}}}},P={render:()=>{const[t,o]=a.useState([{projectId:"esvus16"}]);return r.jsx(c,{mode:"project-multi",projects:u,openTabs:p,selection:{pairs:t},onChangeSelection:({pairs:e})=>o(e),localizedStrings:{buttonPlaceholder:"Select projects",ariaLabel:"Projects"}})},parameters:{docs:{description:{story:'Multi-select with exactly one project selected — isolates the trigger at the boundary between "nothing selected" and "2+ selected" so its shape can be compared against `MultiProject`. The trigger already renders the same `Badge` + comma-joined-items shape at 1 as it does at 2+ (the count badge renders unconditionally once `pairs.length > 0`); this story exists to keep that comparison checkable in Storybook rather than only in source.'}}}},v={render:()=>{const[t,o]=a.useState({projectId:"esvus16",scrollGroupId:1}),[e,s]=a.useState(p);return r.jsxs("div",{className:"tw:flex tw:flex-col tw:gap-2",children:[r.jsx(c,{mode:"projectScrollGroup",projects:u,openTabs:e,selection:t,onChangeSelection:o,onOpenProjectInGroup:(n,i)=>{s(l=>l.some(d=>d.projectId===n&&d.scrollGroupId===i)?l:[...l,{projectId:n,scrollGroupId:i}])},localizedStrings:{buttonPlaceholder:"Select a project + scroll group",ariaLabel:"Project with scroll group"}}),r.jsx("button",{type:"button",className:"tw:rounded tw:border tw:border-border tw:px-2 tw:py-1 tw:text-xs",onClick:()=>s(n=>n.filter(i=>!(i.projectId===t.projectId&&i.scrollGroupId===t.scrollGroupId))),children:"Close tab for current selection (shows bound-but-closed synthetic row)"})]})},parameters:{docs:{description:{story:"One row per `(project, open scroll group)` pair, plus one row per project not open anywhere. Clicking a not-open-project row calls `onOpenProjectInGroup(projectId, 0)` to open a tab in Group A and selects that pair. Use the button to close the currently-bound tab — a synthetic row appears with an outlined chip; clicking it calls `onOpenProjectInGroup` again to reopen without changing selection."}}}},Me=[...u,{id:"na28",shortName:"NA28",fullName:"Nestle-Aland 28th Edition (Greek NT)"},{id:"bhs",shortName:"BHS",fullName:"Biblia Hebraica Stuttgartensia"},{id:"lxx",shortName:"LXX",fullName:"Septuagint"}],T={render:()=>{const[t,o]=a.useState("esvus16");return r.jsx(c,{mode:"project",projects:Me,openTabs:[],selection:{projectId:t},onChangeSelection:({projectId:e})=>o(e),localizedStrings:{buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:'Single-select with `mode="project"` and `openTabs={[]}`. No `availableGroupings` prop → no filter menu at all. No scroll-group chips render on any row. `partitionFlat` returns one unheaded list. Sample data mixes projects (HPUX, TP1, SCHL1951) and resources (NA28, BHS, LXX) — the component itself does not visually distinguish the two; they render identically.'}}}},G={render:()=>{const[t,o]=a.useState(void 0);return r.jsx(c,{mode:"project",projects:[],openTabs:[],selection:{projectId:t},onChangeSelection:({projectId:e})=>o(e),localizedStrings:{buttonPlaceholder:"Select a project",commandEmptyMessage:"No projects found",ariaLabel:"Project"}})}},N={render:()=>r.jsx(c,{mode:"project",projects:u,openTabs:p,selection:{projectId:"esvus16"},onChangeSelection:()=>{},isDisabled:!0,localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}})},x={render:()=>r.jsx(c,{mode:"project",projects:[],openTabs:[],selection:{projectId:void 0},onChangeSelection:()=>{},isLoading:!0,localizedStrings:{buttonPlaceholder:"Select a project",ariaLabel:"Project"}}),parameters:{docs:{description:{story:"`isLoading` shows a spinner in place of the chevron and disables the trigger while the project list is still loading, so the user sees the picker is not ready yet (distinct from `isDisabled`, which is a generic busy state with no spinner)."}}}},k={render:()=>{const t=u.map(s=>s.id==="esv16uk"||s.id==="tp1"?{...s,isDisabled:!0,disabledReason:"Read-only — cannot copy into this project"}:s),[o,e]=a.useState(void 0);return r.jsx(c,{mode:"project",projects:t,openTabs:p,selection:{projectId:o},onChangeSelection:({projectId:s})=>e(s),localizedStrings:{buttonPlaceholder:"Pick a target project",ariaLabel:"Project"}})},parameters:{docs:{description:{story:"Two projects (`ESV16UK`, `TP1`) are marked disabled with a `disabledReason`. They render muted, are not selectable (Up/Down navigation skips them), and the reason surfaces in the row tooltip. Use this to surface read-only or otherwise-unusable projects without filtering them out of the list."}}}},m=172e10,j=24*60*60*1e3,g=[{id:"esvus16",shortName:"ESVUS16",fullName:"English Standard Version (US) 2016",customData:{language:"English",type:"Standard",typeName:"Standard translation",lastUsedAt:m-1*j,versificationId:"eng",versificationName:"English versification"}},{id:"tp1",shortName:"TP1",fullName:"Test Project 1",customData:{language:"English",type:"Standard",typeName:"Standard translation",versificationId:"eng",versificationName:"English versification"}},{id:"hpux-bt",shortName:"HPUXBT",fullName:"Hawaii Pidgin — Back Translation",customData:{language:"English",type:"BackTranslation",typeName:"Back translation",lastUsedAt:m-3*j,versificationId:"eng",versificationName:"English versification"}},{id:"sb-esv",shortName:"ESVSB",fullName:"ESV Study Bible",customData:{language:"English",type:"StudyBible",typeName:"Study Bible",lastUsedAt:m-10*j,versificationId:"eng",versificationName:"English versification"}},{id:"na28",shortName:"NA28",fullName:"Nestle-Aland 28th Edition",customData:{language:"Greek",type:"ScriptureResource",typeName:"Scripture resource",lastUsedAt:m-2*j,versificationId:"org",versificationName:"Original versification"}},{id:"bhs",shortName:"BHS",fullName:"Biblia Hebraica Stuttgartensia",customData:{language:"Hebrew",type:"ScriptureResource",typeName:"Scripture resource",versificationId:"org",versificationName:"Original versification"}},{id:"mhc",shortName:"MHC",fullName:"Matthew Henry's Commentary",customData:{language:"English",type:"CommentaryResource",typeName:"Commentary",lastUsedAt:m-20*j}},{id:"schl1951",shortName:"SCHL1951",fullName:"Schlachter 1951",customData:{language:"German",type:"Standard",typeName:"Standard translation",versificationId:"lxx",versificationName:"Septuagint versification"}},{id:"legacy",shortName:"LEGACY",fullName:"Legacy Uncategorized Project"}],L={render:()=>{const[t,o]=a.useState("esvus16");return r.jsx(c,{mode:"project",projects:g,openTabs:p,selection:{projectId:t},onChangeSelection:({projectId:e})=>o(e),availableGroupings:b,localizedStrings:{buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`availableGroupings={defaultGroupings}` passes all four built-ins (`openTabs`, `lastUsed`, `language`, `type`) with English labels. Open the funnel icon to switch. Each built-in reads its key from `project.customData` (see the `ProjectSelectorProject.customData` JSDoc for the well-known keys). Consumers wire localization by calling `makeBuiltInGroupings(strings)` instead."}}}},C={render:()=>{const[t,o]=a.useState(void 0),e=a.useMemo(()=>({id:"versification",label:"Versification",getGroupKey:n=>{var i;return typeof((i=n.customData)==null?void 0:i.versificationId)=="string"?n.customData.versificationId:void 0},getSectionHeading:(n,i)=>{var h;const l=i.find(Re=>{var E;return typeof((E=Re.customData)==null?void 0:E.versificationName)=="string"}),d=(h=l==null?void 0:l.customData)==null?void 0:h.versificationName;return typeof d=="string"?d:n},unknownSectionHeading:"Unknown versification",priorityKey:"eng"}),[]),s=a.useMemo(()=>[...b,e],[e]);return r.jsx(c,{mode:"project",projects:g,openTabs:p,selection:{projectId:t},onChangeSelection:({projectId:n})=>o(n),availableGroupings:s,defaultGrouping:"versification",localizedStrings:{buttonPlaceholder:"Select a reference project",ariaLabel:"Reference project"}})},parameters:{docs:{description:{story:"A custom grouping — versification — appended to the built-ins. `getGroupKey` reads `p.customData?.versificationId`; `getSectionHeading` lifts the display name from `versificationName` on the first row in the bucket; `priorityKey: 'eng'` pins the caller's active versification to the top. `defaultGrouping=\"versification\"` opens with it active. Consumers can register any number of custom groupings this way."}}}},O={render:()=>{const[t,o]=a.useState(void 0),e=a.useMemo(()=>Ue({openTabsLabel:"By open tabs",lastUsedLabel:"By last used",languageLabel:"By language",typeLabel:"By kind",lastUsedRecentSectionHeading:"Recently opened",lastUsedOtherSectionHeading:"Everything else",languageUnknownSectionHeading:"Language unknown",typeUnknownSectionHeading:"Kind unknown"}),[]);return r.jsx(c,{mode:"project",projects:g,openTabs:p,selection:{projectId:t},onChangeSelection:({projectId:s})=>o(s),availableGroupings:e,localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`makeBuiltInGroupings(strings)` returns the four built-ins with the labels and section headings you pass in. This is the recommended production path — every consumer resolves the same `%projectSelector_*%` keys through `useLocalizedStrings` and forwards them here."}}}},D={render:()=>{const[t,o]=a.useState("esvus16"),e=a.useMemo(()=>[b[0]],[]);return r.jsx(c,{mode:"project",projects:g,openTabs:p,selection:{projectId:t},onChangeSelection:({projectId:s})=>o(s),availableGroupings:e,localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:"`availableGroupings` with exactly ONE grouping locks the user into that grouping — the filter funnel drops away entirely (this is single-select, so there is no `Show selected only` toggle either, and the whole menu has nothing to render). The lone grouping is applied unconditionally."}}}},z={render:()=>{const[t,o]=a.useState(void 0),e=b.find(i=>i.id==="language"),s=b.find(i=>i.id==="type"),n=a.useMemo(()=>[e,s],[e,s]);return r.jsx(c,{mode:"project",projects:g,openTabs:p,selection:{projectId:t},onChangeSelection:({projectId:i})=>o(i),availableGroupings:n,defaultGrouping:"type",localizedStrings:{buttonPlaceholder:"Select",ariaLabel:"Project or resource"}})},parameters:{docs:{description:{story:'`availableGroupings=[languageGrouping, typeGrouping]` narrows the filter menu to just those two. `defaultGrouping="type"` opens with type-grouping active. Two groupings → the "None" radio + both options render normally (single-grouping lock only kicks in when there is exactly one option).'}}}},B={name:"Type indicators (projects vs resources)",render:()=>{const[t,o]=a.useState("esvus16");return r.jsx(c,{mode:"project",projects:g,openTabs:[],selection:{projectId:t},onChangeSelection:({projectId:e})=>o(e),localizedStrings:{buttonPlaceholder:"Select a project or resource",ariaLabel:"Project or resource"},renderProjectIndicator:e=>{var d,h;const s=(d=e.customData)==null?void 0:d.type,n=s==="ScriptureResource"?Ae:He,i=(h=e.customData)==null?void 0:h.typeName,l=(typeof i=="string"?i:void 0)??(typeof s=="string"?s:void 0)??"Uncategorized";return{node:r.jsx("span",{role:"img","aria-label":l,children:r.jsx(n,{className:"tw:h-3 tw:w-3 tw:opacity-60","aria-hidden":!0})}),label:l}}})},parameters:{docs:{description:{story:"`renderProjectIndicator` lets the caller distinguish row types from data rather than copy. This fixture reads the caller's own `customData.type` values (mixing PT9 ProjectType keys and DBL ResourceType keys, same fixture as the grouping stories) and renders a book icon specifically for the `ScriptureResource` type, a document icon for everything else. The selector renders whatever node the caller returns and cannot know what a glyph means, so naming it is the caller's job: each icon here sits in a `role=\"img\"` wrapper labelled with the project's type, which is what a screen reader announces. The hover half goes through the returned `label` rather than a native `title`, because the row is already a tooltip trigger and a `title` inside one opens a second tooltip over the first."}}}};var R,U,A;w.parameters={...w.parameters,docs:{...(R=w.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(A=(U=w.parameters)==null?void 0:U.docs)==null?void 0:A.source}}};var H,M,F;S.parameters={...S.parameters,docs:{...(H=S.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(F=(M=S.parameters)==null?void 0:M.docs)==null?void 0:F.source}}};var K,W,V;y.parameters={...y.parameters,docs:{...(K=y.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(V=(W=y.parameters)==null?void 0:W.docs)==null?void 0:V.source}}};var X,_,q;f.parameters={...f.parameters,docs:{...(X=f.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(q=(_=f.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};var J,Y,Q;I.parameters={...I.parameters,docs:{...(J=I.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(Q=(Y=I.parameters)==null?void 0:Y.docs)==null?void 0:Q.source}}};var Z,$,ee;P.parameters={...P.parameters,docs:{...(Z=P.parameters)==null?void 0:Z.docs,source:{originalSource:`{
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
}`,...(ee=($=P.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var te,oe,re;v.parameters={...v.parameters,docs:{...(te=v.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(re=(oe=v.parameters)==null?void 0:oe.docs)==null?void 0:re.source}}};var ne,se,ae;T.parameters={...T.parameters,docs:{...(ne=T.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
}`,...(ae=(se=T.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};var ie,ce,le;G.parameters={...G.parameters,docs:{...(ie=G.parameters)==null?void 0:ie.docs,source:{originalSource:`{
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
}`,...(le=(ce=G.parameters)==null?void 0:ce.docs)==null?void 0:le.source}}};var pe,de,ue;N.parameters={...N.parameters,docs:{...(pe=N.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: () => <ProjectSelector mode="project" projects={sampleProjects} openTabs={sampleOpenTabs} selection={{
    projectId: 'esvus16'
  }} onChangeSelection={() => {}} isDisabled localizedStrings={{
    buttonPlaceholder: 'Select a project',
    ariaLabel: 'Project'
  }} />
}`,...(ue=(de=N.parameters)==null?void 0:de.docs)==null?void 0:ue.source}}};var ge,he,me;x.parameters={...x.parameters,docs:{...(ge=x.parameters)==null?void 0:ge.docs,source:{originalSource:`{
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
}`,...(me=(he=x.parameters)==null?void 0:he.docs)==null?void 0:me.source}}};var je,be,we;k.parameters={...k.parameters,docs:{...(je=k.parameters)==null?void 0:je.docs,source:{originalSource:`{
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
}`,...(we=(be=k.parameters)==null?void 0:be.docs)==null?void 0:we.source}}};var Se,ye,fe;L.parameters={...L.parameters,docs:{...(Se=L.parameters)==null?void 0:Se.docs,source:{originalSource:`{
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
}`,...(fe=(ye=L.parameters)==null?void 0:ye.docs)==null?void 0:fe.source}}};var Ie,Pe,ve;C.parameters={...C.parameters,docs:{...(Ie=C.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
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
}`,...(ve=(Pe=C.parameters)==null?void 0:Pe.docs)==null?void 0:ve.source}}};var Te,Ge,Ne;O.parameters={...O.parameters,docs:{...(Te=O.parameters)==null?void 0:Te.docs,source:{originalSource:`{
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
}`,...(Ne=(Ge=O.parameters)==null?void 0:Ge.docs)==null?void 0:Ne.source}}};var xe,ke,Le;D.parameters={...D.parameters,docs:{...(xe=D.parameters)==null?void 0:xe.docs,source:{originalSource:`{
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
}`,...(Le=(ke=D.parameters)==null?void 0:ke.docs)==null?void 0:Le.source}}};var Ce,Oe,De;z.parameters={...z.parameters,docs:{...(Ce=z.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
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
}`,...(De=(Oe=z.parameters)==null?void 0:Oe.docs)==null?void 0:De.source}}};var ze,Be,Ee;B.parameters={...B.parameters,docs:{...(ze=B.parameters)==null?void 0:ze.docs,source:{originalSource:`{
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
}`,...(Ee=(Be=B.parameters)==null?void 0:Be.docs)==null?void 0:Ee.source}}};const Ht=["SingleProject","WideTriggerLabel","NarrowRailTrigger","CompoundTriggerLabelWithFooterAction","MultiProject","MultiProjectSingleSelection","ScrollGroupBinding","SimpleFlatList","NoProjects","Disabled","Loading","PerRowDisabled","AllBuiltInGroupings","CustomGroupingViaCustomData","LocalizedBuiltInGroupings","SingleGroupingLock","RestrictedGroupings","ProjectAndResourceIndicators"];export{L as AllBuiltInGroupings,f as CompoundTriggerLabelWithFooterAction,C as CustomGroupingViaCustomData,N as Disabled,x as Loading,O as LocalizedBuiltInGroupings,I as MultiProject,P as MultiProjectSingleSelection,y as NarrowRailTrigger,G as NoProjects,k as PerRowDisabled,B as ProjectAndResourceIndicators,z as RestrictedGroupings,v as ScrollGroupBinding,T as SimpleFlatList,D as SingleGroupingLock,w as SingleProject,S as WideTriggerLabel,Ht as __namedExportsOrder,At as default};
