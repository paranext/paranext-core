import{r as a,j as t}from"./iframe-CQ-j3kT0.js";import{P as v}from"./project-selector.component-lxQGQcrg.js";import{a as q,b as P,c as m,d as u,e as h,f as T,g as M,h as F}from"./sidebar-zNVGReFA.js";import{c as g}from"./utils-BPbySc-g.js";import{c as C}from"./createLucideIcon-IzI4AwwX.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M15 12h-5",key:"r7krc0"}],["path",{d:"M15 8h-5",key:"1khuty"}],["path",{d:"M19 17V5a2 2 0 0 0-2-2H4",key:"zz82l3"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",key:"1ph1d7"}]],O=C("scroll-text",_);function A({id:j,extensionLabels:f,projectInfo:o,handleSelectSidebarItem:l,selectedSidebarItem:r,extensionsSidebarGroupLabel:w,projectsSidebarGroupLabel:s,buttonPlaceholderText:p,searchPlaceholderText:i,noResultsText:c,className:b}){const d=a.useCallback((e,n)=>{l(e,n)},[l]),y=a.useCallback(e=>{const n=o.find(k=>k.projectId===e);return n?n.projectName:e},[o]),N=a.useMemo(()=>o.map(e=>({id:e.projectId,shortName:e.projectName,fullName:e.projectFullName})),[o]),x=a.useMemo(()=>{const e={buttonPlaceholder:p,ariaLabel:s};return i&&(e.searchPlaceholder=i),c&&(e.commandEmptyMessage=c),e},[p,s,i,c]),S=a.useCallback(e=>!r.projectId&&e===r.label,[r]);return t.jsx(q,{id:j,collapsible:"none",variant:"inset",className:g("tw:w-96 tw:gap-2 tw:overflow-y-auto",b),children:t.jsxs(P,{children:[t.jsxs(m,{children:[t.jsx(u,{className:"tw:text-sm",children:w}),t.jsx(h,{children:t.jsx(T,{children:Object.entries(f).map(([e,n])=>t.jsx(M,{children:t.jsx(F,{onClick:()=>d(e),isActive:S(e),children:t.jsx("span",{className:"tw:pl-3",children:n})})},e))})})]}),t.jsxs(m,{children:[t.jsx(u,{className:"tw:text-sm",children:s}),t.jsx(h,{className:"tw:pl-3",children:t.jsxs("div",{className:g("tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1",{"tw:bg-sidebar-accent tw:text-sidebar-accent-foreground":r==null?void 0:r.projectId}),children:[t.jsx(O,{className:"tw:h-4 tw:w-4 tw:shrink-0"}),t.jsx(v,{mode:"project",projects:N,openTabs:[],selection:{projectId:(r==null?void 0:r.projectId)??""},onChangeSelection:({projectId:e})=>{if(!e)return;const n=y(e);d(n,e)},buttonVariant:"ghost",buttonClassName:"tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal",localizedStrings:x,triggerLabelFormat:"shortNameAndFullName"})]})})]})]})})}A.__docgenInfo={description:`The SettingsSidebar component is a sidebar that displays a list of extension settings and project
settings. It can be used to navigate to different settings pages. Must be wrapped in a
SidebarProvider component otherwise produces errors.

@param props - {@link SettingsSidebarProps} The props for the component.`,methods:[],displayName:"SettingsSidebar",props:{id:{required:!1,tsType:{name:"string"},description:"Optional id for testing"},extensionLabels:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"string"}],raw:"Record<string, string>"},description:"Extension labels from contribution"},projectInfo:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
English string when omitted.`},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the sidebar"}}};export{A as S};
