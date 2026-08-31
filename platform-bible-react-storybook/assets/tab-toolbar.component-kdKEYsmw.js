import{j as e}from"./iframe-hJznJ-fq.js";import{T as r,M as p}from"./tab-dropdown-menu.component-BXSTXxl9.js";import{T as h}from"./tab-toolbar-container.component-o3DJv-ih.js";import{E as f}from"./ellipsis-vertical-8a8Flq8d.js";function w({onSelectProjectMenuItem:s,onSelectViewInfoMenuItem:i,projectMenuData:t,tabViewMenuData:n,id:l,className:m,startAreaChildren:o,centerAreaChildren:a,endAreaChildren:d,menuButtonIcon:c,shrinkStep:u}){return e.jsxs(h,{className:`tw:w-full tw:border-b ${m}`,id:l,shrinkStep:u,children:[t&&e.jsx(r,{onSelectMenuItem:s,menuData:t,tabLabel:"Project",icon:c??e.jsx(p,{}),buttonVariant:"ghost"}),o&&e.jsx("div",{className:"tw:flex tw:min-w-0 tw:shrink tw:grow-[10] tw:flex-row tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip",children:o}),a&&e.jsx("div",{className:"tw:flex tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-nowrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto",children:a}),e.jsxs("div",{className:"tw:flex tw:shrink-0 tw:grow-[1] tw:flex-row-reverse tw:flex-nowrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip",children:[n&&e.jsx(r,{onSelectMenuItem:i,menuData:n,tabLabel:"View Info",icon:e.jsx(f,{}),className:"tw:h-full"}),d]})]})}w.__docgenInfo={description:`Toolbar that holds the project menu icon on one side followed by three different areas/categories
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
useMemo to get the WebViewMenu.`},id:{required:!1,tsType:{name:"string"},description:"Optional unique identifier"},className:{required:!1,tsType:{name:"string"},description:"Additional css classes to help with unique styling of the extensible toolbar"},menuButtonIcon:{required:!1,tsType:{name:"ReactNode"},description:"Icon that will be displayed on the Menu Button. Defaults to the hamburger menu icon."},onSelectViewInfoMenuItem:{required:!0,tsType:{name:"SelectMenuItemHandler"},description:`The handler to use for toolbar item commands related to the tab view menu. Here is a basic
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
side in ltr, left side in rtl). Recommended for secondary tools and view options.`},shrinkStep:{required:!1,tsType:{name:"number"},description:`Overrides the shrink step this toolbar would otherwise measure from its own width, and
publishes it to descendants. Higher means narrower.

For stories and tests: measuring needs a layout engine, which jsdom does not have. In the app,
leave it unset and let the toolbar measure itself.`}}};export{w as T};
