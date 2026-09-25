import{j as e,r as c}from"./iframe-CwCaby_0.js";import{S as k,j as E}from"./sidebar-QsjRPmpy.js";import{c as C}from"./utils-BPbySc-g.js";import{S as M}from"./search-bar.component-HCAGX6Yz.js";import{S as G}from"./settings-sidebar.component-Ejqx-F1m.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./button-D1Rh3Vm6.js";import"./index-Bv-dt4QP.js";import"./input-D8ZxEyhe.js";import"./separator-CA4oVLqp.js";import"./index-BmfWWMld.js";import"./skeleton-BiTfKRvm.js";import"./tooltip-IA-E6O3k.js";import"./z-index-DiGYIwoM.js";import"./index-C7xk-KdH.js";import"./index-B8PL1_My.js";import"./index-DjzsZX1g.js";import"./index-oBa7vK3t.js";import"./index-CFPoxtm7.js";import"./index-SZvYyM_S.js";import"./index-BNTXN8Kk.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-Chz3DA-e.js";import"./index-kT857MVF.js";import"./index-CWNu5mL2.js";import"./createReactComponent-CWqFY6IP.js";import"./search-D_KYuldi.js";import"./createLucideIcon-8ZUAVQqN.js";import"./x-DHVtM2GM.js";import"./project-selector.component-CmxEdTFI.js";import"./index-AIIJ_tDp.js";import"./scripture-util-DArajUVn-CPHPTCtZ.js";import"./index.es-CXoS8DB2.js";import"./index-DCo3rgjq.js";import"./index-C77E7Q-s.js";import"./localization.util-C4JImkK1.js";import"./badge-DCxlPxMo.js";import"./popover-B0VJUiAi.js";import"./index-DFMsCqZm.js";import"./command-C6Ck2F5k.js";import"./index-BRIWerQc.js";import"./dialog-omNDT3qW.js";import"./input-group-B7Bnn7QF.js";import"./IconCheck-BeMV56CH.js";import"./dropdown-menu-DAb4SNx5.js";import"./menu.context-5n4iBV0B.js";import"./IconChevronRight-Ty3fw_Ka.js";import"./index-BGF7VlWJ.js";import"./index-BRyNXn2M.js";import"./use-truncation-tooltip.hook-0ZmUVk-2.js";import"./check-gWRTUu9r.js";import"./arrow-right-D_IzA4MA.js";import"./loader-circle-xm7WVuGQ.js";import"./chevrons-up-down-BgPfSsSX.js";import"./chevron-down-BGc24jcE.js";function u({id:i,children:o,searchValue:n,onSearch:a,className:d,...t}){return e.jsxs("div",{className:"tw:box-border tw:flex tw:h-full tw:flex-col",children:[e.jsx("div",{className:"tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4",children:e.jsx(M,{className:"tw:w-9/12",value:n,onSearch:a,placeholder:"Search app settings, extension settings, and project settings"})}),e.jsxs(k,{id:i,className:"tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",children:[e.jsx(G,{className:C("tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e",d),...t}),e.jsx(E,{className:"tw:min-w-[215px]",children:o})]})]})}u.__docgenInfo={description:`A component that wraps a search bar and a settings sidebar, providing a way to search and
navigate to different settings pages.

@param {SettingsSidebarContentSearchProps} props - The props for the component.
@param {string} props.id - The id of the sidebar.`,methods:[],displayName:"SettingsSidebarContentSearch",props:{id:{required:!1,tsType:{name:"string"},description:"Optional id for testing"},extensionLabels:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>"},description:"Extension labels from contribution"},projectInfo:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  projectId: string;
  /**
   * Short project name — the trigger label for the \`<ProjectSelector>\` and the primary line of each
   * popover row. Sourced from the \`platform.name\` project setting.
   */
  projectName: string;
  /**
   * Optional full project name — rendered as the muted secondary line beneath \`projectName\` in the
   * popover rows. Omit it for a project that has no distinct full name; when it is absent, blank or
   * equal to \`projectName\`, the row falls back to a single-line layout (the \`hasDistinctFullName\`
   * rule the \`ProjectSelector\` applies).
   *
   * Source it from project metadata (\`getMetadataForAllProjects\`), NOT from a
   * \`getSetting('platform.fullName')\` read: that setting cannot express "no full name" — it
   * defaults to a localized \`%project_full_name_missing%\` placeholder, which would render here as a
   * second name the project does not have.
   */
  projectFullName?: string;
}`,signature:{properties:[{key:"projectId",value:{name:"string",required:!0}},{key:"projectName",value:{name:"string",required:!0},description:"Short project name — the trigger label for the `<ProjectSelector>` and the primary line of each\npopover row. Sourced from the `platform.name` project setting."},{key:"projectFullName",value:{name:"string",required:!1},description:"Optional full project name — rendered as the muted secondary line beneath `projectName` in the\npopover rows. Omit it for a project that has no distinct full name; when it is absent, blank or\nequal to `projectName`, the row falls back to a single-line layout (the `hasDistinctFullName`\nrule the `ProjectSelector` applies).\n\nSource it from project metadata (`getMetadataForAllProjects`), NOT from a\n`getSetting('platform.fullName')` read: that setting cannot express \"no full name\" — it\ndefaults to a localized `%project_full_name_missing%` placeholder, which would render here as a\nsecond name the project does not have."}]}}],raw:"ProjectInfo[]"},description:"Project names and ids"},handleSelectSidebarItem:{required:!0,tsType:{name:"signature",type:"function",raw:"(key: string, projectId?: string) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"string"},name:"projectId"}],return:{name:"void"}}},description:"Handler for selecting a sidebar item"},selectedSidebarItem:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  label: string;
  projectId?: string;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"projectId",value:{name:"string",required:!1}}]}},description:"The current selected value in the sidebar"},extensionsSidebarGroupLabel:{required:!0,tsType:{name:"string"},description:"Label for the group of extensions setting groups"},projectsSidebarGroupLabel:{required:!0,tsType:{name:"string"},description:"Label for the group of projects settings"},buttonPlaceholderText:{required:!0,tsType:{name:"string"},description:"Placeholder text for the button"},searchPlaceholderText:{required:!1,tsType:{name:"string"},description:`Placeholder text for the project picker's search box. Falls back to the picker's English string
when omitted.`},noResultsText:{required:!1,tsType:{name:"string"},description:`Message the project picker shows when no project matches the search. Falls back to the picker's
English string when omitted.`},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the sidebar"},searchValue:{required:!0,tsType:{name:"string"},description:"The search query in the search bar"},onSearch:{required:!0,tsType:{name:"signature",type:"function",raw:"(searchQuery: string) => void",signature:{arguments:[{type:{name:"string"},name:"searchQuery"}],return:{name:"void"}}},description:"Handler to run when the value of the search bar changes"}}};const De={title:"Advanced/Settings/SettingsSidebarContentSearch",component:u,parameters:{layout:"fullscreen"},tags:["autodocs"]},_={"extension-host":"Extension Host","extension-manager":"Extension Manager",platform:"Platform",about:"About","user-management":"User Management","ui-language-selector":"UI Language Selector","paranext-extension-dashboard":"Paranext Extension Dashboard","hello-world":"Hello World","hello-world-main-menu":"Hello World Main Menu","hello-world-menu":"Hello World Menu","hello-someone-else":"Hello Someone Else","quick-verse":"Quick Verse","quick-verse-menu":"Quick Verse Menu","platform-scripture":"Platform Scripture","platform-scripture-editor":"Platform Scripture Editor","download-manager":"Download Manager"},O=[{projectId:"project1",projectName:"Bible Translation Project"},{projectId:"project2",projectName:"Commentary Project"},{projectId:"project3",projectName:"Study Notes Project"}];function h(i){const{extensionLabels:o,projectInfo:n}=i,[a,d]=c.useState("extension-host"),[t,N]=c.useState(""),T=c.useMemo(()=>{if(!t)return o;const r={};return Object.entries(o).forEach(([q,m])=>{typeof m=="string"&&m.toLowerCase().includes(t.toLowerCase())&&(r[q]=m)}),r},[o,t]),I=c.useMemo(()=>t?n.filter(r=>r.projectName.toLowerCase().includes(t.toLowerCase())):n,[n,t]),P=r=>{d(r)},L=r=>{N(r)};return e.jsx("div",{style:{height:"100vh"},children:e.jsx(u,{...i,extensionLabels:T,projectInfo:I,selectedSidebarItem:a,handleSelectSidebarItem:P,searchValue:t,onSearch:L,children:e.jsxs("div",{className:"tw:p-6",children:[e.jsxs("h2",{className:"tw:mb-4 tw:text-2xl tw:font-bold",children:["Settings for: ",o[a]||a]}),e.jsx("p",{className:"tw:mb-4 tw:text-muted-foreground",children:"This is where the settings content would be displayed for the selected item."}),t&&e.jsxs("div",{className:"tw:rounded-md tw:bg-muted tw:p-4",children:[e.jsxs("p",{className:"tw:text-sm",children:[e.jsx("strong",{children:"Active search:"}),' "',t,'"']}),e.jsx("p",{className:"tw:mt-1 tw:text-xs tw:text-muted-foreground",children:"Showing filtered results in the sidebar"})]})]})})})}const s={render:h,args:{id:"settings-sidebar-search",extensionLabels:_,projectInfo:O,extensionsSidebarGroupLabel:"Extensions",projectsSidebarGroupLabel:"Projects",buttonPlaceholderText:"No extensions available"}},l={render:h,args:{...s.args},parameters:{docs:{description:{story:"Try typing in the search bar to filter the sidebar items."}}}},p={render:h,args:{id:"settings-sidebar-search-empty",extensionLabels:{},projectInfo:[],extensionsSidebarGroupLabel:"Extensions",projectsSidebarGroupLabel:"Projects",buttonPlaceholderText:"No extensions available"}};var g,f,b;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: InteractiveTemplate,
  args: {
    id: 'settings-sidebar-search',
    extensionLabels: mockExtensionLabels,
    projectInfo: mockProjectInfo,
    extensionsSidebarGroupLabel: 'Extensions',
    projectsSidebarGroupLabel: 'Projects',
    buttonPlaceholderText: 'No extensions available'
  }
}`,...(b=(f=s.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var j,x,w;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: InteractiveTemplate,
  args: {
    ...Default.args
  },
  parameters: {
    docs: {
      description: {
        story: 'Try typing in the search bar to filter the sidebar items.'
      }
    }
  }
}`,...(w=(x=l.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var S,y,v;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: InteractiveTemplate,
  args: {
    id: 'settings-sidebar-search-empty',
    extensionLabels: {},
    projectInfo: [],
    extensionsSidebarGroupLabel: 'Extensions',
    projectsSidebarGroupLabel: 'Projects',
    buttonPlaceholderText: 'No extensions available'
  }
}`,...(v=(y=p.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};const He=["Default","WithSearch","EmptyState"];export{s as Default,p as EmptyState,l as WithSearch,He as __namedExportsOrder,De as default};
