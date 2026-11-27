import{j as e}from"./iframe-Cw8cgmmO.js";import{T as i,M as p}from"./tab-dropdown-menu.component-BZkuvdcg.js";import{T as h}from"./tab-toolbar-container.component-B7dFREcL.js";import{E as f}from"./ellipsis-vertical-smRp0MET.js";function w({onSelectProjectMenuItem:s,onSelectViewInfoMenuItem:m,projectMenuData:t,tabViewMenuData:n,id:l,className:d,startAreaChildren:o,centerAreaChildren:a,endAreaChildren:u,menuButtonIcon:c,openMenuInOverlay:r}){return e.jsxs(h,{className:`tw:w-full tw:border-b ${d}`,id:l,children:[t&&e.jsx(i,{onSelectMenuItem:s,menuData:t,tabLabel:"Project",icon:c??e.jsx(p,{}),buttonVariant:"ghost",showSectionHeadings:!0,openMenuInOverlay:r}),o&&e.jsx("div",{className:"tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip",children:o}),a&&e.jsx("div",{className:"tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto",children:a}),e.jsxs("div",{className:"tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip",children:[n&&e.jsx(i,{onSelectMenuItem:m,menuData:n,tabLabel:"View Info",icon:e.jsx(f,{}),className:"tw:h-full",showSectionHeadings:!0,openMenuInOverlay:r}),u]})]})}w.__docgenInfo={description:`Toolbar that holds the project menu icon on one side followed by three different areas/categories
for toolbar icons followed by an optional view info menu icon. See the Tab Floating Menu Button
component for a menu component that takes up less screen real estate yet is always visible.`,methods:[],displayName:"TabToolbar",props:{onSelectProjectMenuItem:{required:!0,tsType:{name:"SelectMenuItemHandler"},description:`The handler to use for toolbar item commands related to the project menu. Here is a basic
example of how to create this:

@example

\`\`\`tsx
const projectMenuCommandHandler: SelectMenuItemHandler = async (selectedMenuItem) => {
  const commandName = selectedMenuItem.command;
  try {
    // Assert the more specific type. Assert the more specific type. The menu data should
    // specify a valid command name here. If not, the error will be caught.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await papi.commands.sendCommand(commandName as CommandNames);
  } catch (e) {
    throw new Error(
      \`handleMenuCommand error: command: \${commandName}. \${JSON.stringify(e)}\`,
    );
  }
};
\`\`\``},projectMenuData:{required:!1,tsType:{name:"Localized",elements:[{name:"MultiColumnMenu"}],raw:"Localized<MultiColumnMenu>"},description:`Menu data that is used to populate the Menubar component for the project menu. In an extension,
the menu data comes from menus.json in the contributions folder. To access that info, use
useMemo to get the WebViewMenu.`},id:{required:!1,tsType:{name:"string"},description:"Optional unique identifier"},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the extensible toolbar"},menuButtonIcon:{required:!1,tsType:{name:"ReactNode"},description:"Icon that will be displayed on the Menu Button. Defaults to the hamburger menu icon."},openMenuInOverlay:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  menuData: Localized<MultiColumnMenu>,
  options: TabMenuOverlayOptions,
) => Promise<Localized<MenuItemContainingCommand> | undefined>`,signature:{arguments:[{type:{name:"Localized",elements:[{name:"MultiColumnMenu"}],raw:"Localized<MultiColumnMenu>"},name:"menuData"},{type:{name:"signature",type:"object",raw:`{
  /** The trigger's rectangle; the menu opens below it, aligned with its start edge */
  anchor: TabMenuTriggerRect;
  /** Whether the menu was opened from the keyboard, so it opens with its first item focused */
  focusFirstItem?: boolean;
}`,signature:{properties:[{key:"anchor",value:{name:"signature",type:"object",raw:"{ x: number; y: number; width: number; height: number }",signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0},description:"The trigger's rectangle; the menu opens below it, aligned with its start edge"},{key:"focusFirstItem",value:{name:"boolean",required:!1},description:"Whether the menu was opened from the keyboard, so it opens with its first item focused"}]}},name:"options"}],return:{name:"Promise",elements:[{name:"union",raw:"Localized<MenuItemContainingCommand> | undefined",elements:[{name:"Localized",elements:[{name:"MenuItemContainingCommand"}],raw:"Localized<MenuItemContainingCommand>"},{name:"undefined"}]}],raw:"Promise<Localized<MenuItemContainingCommand> | undefined>"}}},description:"Opens the toolbar's menus outside this document instead of in it. See `OpenTabMenuInOverlay`.\n\n@experimental This property is unstable and may change or disappear without notice"},onSelectViewInfoMenuItem:{required:!0,tsType:{name:"SelectMenuItemHandler"},description:`The handler to use for toolbar item commands related to the tab view menu. Here is a basic
example of how to create this from the hello-rock3 extension:

@example

\`\`\`tsx
const projectMenuCommandHandler: SelectMenuItemHandler = async (selectedMenuItem) => {
  const commandName = selectedMenuItem.command;
  try {
    // Assert the more specific type. Assert the more specific type. The menu data should
    // specify a valid command name here. If not, the error will be caught.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await papi.commands.sendCommand(commandName as CommandNames);
  } catch (e) {
    throw new Error(
      \`handleMenuCommand error: command: \${commandName}. \${JSON.stringify(e)}\`,
    );
  }
};
\`\`\``},tabViewMenuData:{required:!1,tsType:{name:"Localized",elements:[{name:"MultiColumnMenu"}],raw:"Localized<MultiColumnMenu>"},description:"Menu data that is used to populate the Menubar component for the view info menu"},startAreaChildren:{required:!1,tsType:{name:"ReactNode"},description:`Toolbar children to be put at the start of the the toolbar after the project menu icon (left
side in ltr, right side in rtl). Recommended for inner navigation.`},centerAreaChildren:{required:!1,tsType:{name:"ReactNode"},description:"Toolbar children to be put in the center area of the the toolbar. Recommended for tools."},endAreaChildren:{required:!1,tsType:{name:"ReactNode"},description:`Toolbar children to be put at the end of the the toolbar before the tab view menu icon (right
side in ltr, left side in rtl). Recommended for secondary tools and view options.`}}};export{w as T};
