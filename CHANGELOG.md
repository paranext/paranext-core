# 0.1.0 (2023.9.29)

## What's Changed

### Exciting New Features 🎉

- Created MUI-based checkbox component by @tombogle in https://github.com/paranext/paranext-core/pull/130

### Other Changes

- Abstract console.log by @irahopkinson in https://github.com/paranext/paranext-core/pull/42
- Switch to `electron-log` by @irahopkinson in https://github.com/paranext/paranext-core/pull/64
- Added extension host process that launches from main process by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/29
- Added docking panel support by @FoolRunning in https://github.com/paranext/paranext-core/pull/43
- Load extensions from file, add very primitive webviews by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/67
- Fix production logger by @irahopkinson in https://github.com/paranext/paranext-core/pull/76
- Updates from `electron-react-boilerplate` by @irahopkinson in https://github.com/paranext/paranext-core/pull/71
- Added events and emitters, added useEvent hook, tweaked docking framework css by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/72
- Pull out `electron-builder` config by @irahopkinson in https://github.com/paranext/paranext-core/pull/82
- Fixed extension host crashing in production, reformatted logs, temporarily removed auto updater by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/80
- Update dependencies by @irahopkinson in https://github.com/paranext/paranext-core/pull/84
- Shim internet access out of extensions on extension host and in web view by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/93
- Update VS Code Extension recommendations by @irahopkinson in https://github.com/paranext/paranext-core/pull/94
- Added NetworkObjectService to share objects between processes by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/95
- Print eslint effective config by @irahopkinson in https://github.com/paranext/paranext-core/pull/97
- Enable C# code quality checks by @irahopkinson in https://github.com/paranext/paranext-core/pull/99
- Add CSharpier formatting by @irahopkinson in https://github.com/paranext/paranext-core/pull/100
- Pair incoming responses to the original requests (#61) by @lyonsil in https://github.com/paranext/paranext-core/pull/102
- Add C# tool restore to prepare script by @irahopkinson in https://github.com/paranext/paranext-core/pull/108
- Storybook components by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/96
- Make log level obvious by @irahopkinson in https://github.com/paranext/paranext-core/pull/111
- Lint: add member-ordering by @irahopkinson in https://github.com/paranext/paranext-core/pull/118
- Fix dev after PR #118 by @irahopkinson in https://github.com/paranext/paranext-core/pull/128
- Bump GHA node version by @irahopkinson in https://github.com/paranext/paranext-core/pull/129
- Fix eslint running "forever" by @irahopkinson in https://github.com/paranext/paranext-core/pull/127
- Move thread ownership from Main to PapiClient by @lyonsil in https://github.com/paranext/paranext-core/pull/107
- Add hoisting ESLint rule by @irahopkinson in https://github.com/paranext/paranext-core/pull/131
- Send/receive events and add unit tests (#58) by @lyonsil in https://github.com/paranext/paranext-core/pull/124
- Add a new thread for message sending due to web socket requirements by @lyonsil in https://github.com/paranext/paranext-core/pull/140
- Use <feature>.<type>.<ext> filename convention by @irahopkinson in https://github.com/paranext/paranext-core/pull/142
- Create Data Provider API by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/122
- Misc cleanup by @irahopkinson in https://github.com/paranext/paranext-core/pull/152
- Add retry logic to adding webViews and increase a startup delay in main by @lyonsil in https://github.com/paranext/paranext-core/pull/153
- Changed shutdown to properly wait for sub-processes to shutdown by @FoolRunning in https://github.com/paranext/paranext-core/pull/155
- Update the network object service to modify the objects passed in by @lyonsil in https://github.com/paranext/paranext-core/pull/156
- Add Table component by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/157
- Remove "info" from data provider and network object names by @lyonsil in https://github.com/paranext/paranext-core/pull/159
- Make VSCode stop complaining due to missing NUnit assertion logic by @lyonsil in https://github.com/paranext/paranext-core/pull/160
- Drop the I in some interface names after reviewing with Ira by @lyonsil in https://github.com/paranext/paranext-core/pull/162
- Added Vite/TypeScript/React to extensions, created papi.d.ts, shared types between extensions and main by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/161
- Misc cleanup by @irahopkinson in https://github.com/paranext/paranext-core/pull/165
- Streamlined a number of npm scripts by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/164
- Adjusted Network Object and Data Provider Types by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/163
- security: fix yaml vulnerability by @irahopkinson in https://github.com/paranext/paranext-core/pull/168
- Extension install directory file reading and user file reading/writing by @lyonsil in https://github.com/paranext/paranext-core/pull/169
- WebView API by @irahopkinson in https://github.com/paranext/paranext-core/pull/167
- Implement WebView panels and floats by @irahopkinson in https://github.com/paranext/paranext-core/pull/173
- Improve fragile `isTab` function. by @irahopkinson in https://github.com/paranext/paranext-core/pull/183
- Allow webviews to load static assets from extensions by @lyonsil in https://github.com/paranext/paranext-core/pull/182
- Split Vite build into two steps to enable WebView debugging and library imports by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/187
- Replace NODE_ENV on WebViews in Vite by @irahopkinson in https://github.com/paranext/paranext-core/pull/188
- Fixed circular dependency between papi and webview service causing im… by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/192
- Retry network requests to temporary startup race conditions by @lyonsil in https://github.com/paranext/paranext-core/pull/201
- Replace {unsubscriber, promise} with Promise<UnsubscriberAsync> by @lyonsil in https://github.com/paranext/paranext-core/pull/202
- Fix race condition in data provider registration by @lyonsil in https://github.com/paranext/paranext-core/pull/204
- Scripture reference selector by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/189
- Add Testing section to README by @irahopkinson in https://github.com/paranext/paranext-core/pull/205
- Add color to node console logs. by @irahopkinson in https://github.com/paranext/paranext-core/pull/210
- Misc cleanup by @irahopkinson in https://github.com/paranext/paranext-core/pull/212
- Enable webview styles by @irahopkinson in https://github.com/paranext/paranext-core/pull/207
- Finish shimming require & others in extension host by @irahopkinson in https://github.com/paranext/paranext-core/pull/213
- Pass through warnings from extension host by @irahopkinson in https://github.com/paranext/paranext-core/pull/214
- Add lint `no-public` for classes by @irahopkinson in https://github.com/paranext/paranext-core/pull/217
- Specify node version in README by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/221
- Fix vite security vulnerability by @irahopkinson in https://github.com/paranext/paranext-core/pull/226
- Add .NET C# Dev Kit recommended VS Code extension by @irahopkinson in https://github.com/paranext/paranext-core/pull/238
- Create WebViewProvider API, allowing webviews to persist across refreshes by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/225
- Stabilize Web Views by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/242
- Fixed extensions using papi-dts in TypeScript 5.1 by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/243
- Add Data Type functions to Data Provider API by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/206
- Close all processes together by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/246
- Add support for creating data providers in C# and apply a few Resharper suggestions by @lyonsil in https://github.com/paranext/paranext-core/pull/241
- 172 split papi by @irahopkinson in https://github.com/paranext/paranext-core/pull/247
- Split papi.d.ts by @irahopkinson in https://github.com/paranext/paranext-core/pull/251
- 181 paratext data linux support by @FoolRunning in https://github.com/paranext/paranext-core/pull/216
- Cleanup after #172 by @irahopkinson in https://github.com/paranext/paranext-core/pull/252
- Added tool bar (#223) by @tombogle in https://github.com/paranext/paranext-core/pull/239
- Snackbar component by @jolierabideau in https://github.com/paranext/paranext-core/pull/249
- Fixed extension type discovery for papi-dts by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/262
- Upgrade TypeScript by @irahopkinson in https://github.com/paranext/paranext-core/pull/263
- 158 Use checkbox and textfield in table by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/245
- Add a PAPI data provider that reads scripture using ParatextData by @lyonsil in https://github.com/paranext/paranext-core/pull/261
- Fixed constant redraws caused by reference comparison instead of value comparison by @FoolRunning in https://github.com/paranext/paranext-core/pull/269
- Wrapped MenuItem component and used it in menu by @jolierabideau in https://github.com/paranext/paranext-core/pull/265
- Add event to signal when messaging is complete and modify .net logging by @lyonsil in https://github.com/paranext/paranext-core/pull/271
- 254 update render edit cell api by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/256
- Remove unexisting 'message' prop control by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/273
- Remove all lower level threading types and replace them with Task-based types by @lyonsil in https://github.com/paranext/paranext-core/pull/272
- Add 'npm stop' script and clean up some more processes by @lyonsil in https://github.com/paranext/paranext-core/pull/274
- 258 replace bible api with usfm by @lyonsil in https://github.com/paranext/paranext-core/pull/276
- 257 css injection by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/278
- Use `@sillsdev/scripture` by @irahopkinson in https://github.com/paranext/paranext-core/pull/284
- Fixed dependency conflicts from stylelint bump from dependabot by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/286
- Fix `papi-components` install by @irahopkinson in https://github.com/paranext/paranext-core/pull/287
- Cleanup `scripture-utils` by @irahopkinson in https://github.com/paranext/paranext-core/pull/289
- Use interfaces to get JSDoc comments to work with papi in VSCode by @lyonsil in https://github.com/paranext/paranext-core/pull/288
- Standalone extensions, bundled extensions, and Core share types by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/281
- Tweaked jsdoc generation-specific code by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/293
- Add assembly information to C# project by @lyonsil in https://github.com/paranext/paranext-core/pull/294
- Update debug logging to include the path to the log call by @lyonsil in https://github.com/paranext/paranext-core/pull/295
- Fix dock height by @irahopkinson in https://github.com/paranext/paranext-core/pull/296
- Fix flickering tab groups ellipsis button by @irahopkinson in https://github.com/paranext/paranext-core/pull/303
- Change some dependencies from dev to peer to eliminate runtime issues by @lyonsil in https://github.com/paranext/paranext-core/pull/302
- Flickering ellipsis button - related fixes by @irahopkinson in https://github.com/paranext/paranext-core/pull/307
- Fix the production build for the .NET Data Provider by @lyonsil in https://github.com/paranext/paranext-core/pull/308
- Security update by @irahopkinson in https://github.com/paranext/paranext-core/pull/309
- Update electron by @irahopkinson in https://github.com/paranext/paranext-core/pull/312
- Enable comment propagation to properties of objects using custom script by @lyonsil in https://github.com/paranext/paranext-core/pull/310
- Changed extension bundling from Vite to webpack by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/311
- Removed data url support since paranext does not support them by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/325
- Move unsubscribers from activate() return values to context objects by @lyonsil in https://github.com/paranext/paranext-core/pull/324
- Fix closing the menu by @irahopkinson in https://github.com/paranext/paranext-core/pull/329
- Menu item to restart extension host by @irahopkinson in https://github.com/paranext/paranext-core/pull/330
- Debug production by @irahopkinson in https://github.com/paranext/paranext-core/pull/334
- Prevented extensions from removing sandboxing from iframes or adding scripts to renderer document to do bad things by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/338
- Added Scripture reference selection control to the main toolbar by @tombogle in https://github.com/paranext/paranext-core/pull/266
- Mending BCV in toolbar by @jolierabideau in https://github.com/paranext/paranext-core/pull/348
- add value to slider by @jolierabideau in https://github.com/paranext/paranext-core/pull/352
- Load extensions from ZIP files by @lyonsil in https://github.com/paranext/paranext-core/pull/349
- add id to components by @jolierabideau in https://github.com/paranext/paranext-core/pull/354
- Allow relative paths for `--extensions` by @irahopkinson in https://github.com/paranext/paranext-core/pull/355
- Reload extensions when they change by @irahopkinson in https://github.com/paranext/paranext-core/pull/377
- Fix issues with reference selector component by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/346
- Minor adjustments after PR #377 by @irahopkinson in https://github.com/paranext/paranext-core/pull/382
- Fix snackbar component children by @jolierabideau in https://github.com/paranext/paranext-core/pull/376
- Moved app dir to home/.platform.bible and restructured some files in there, named UnsubscriberAsyncLists by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/384
- Improve lint performance by @irahopkinson in https://github.com/paranext/paranext-core/pull/385
- menu removing shift modifier on close by @jolierabideau in https://github.com/paranext/paranext-core/pull/379
- Create open project dialog by @jolierabideau in https://github.com/paranext/paranext-core/pull/387
- 60 resource viewer v2 by @katherinejensen00 in https://github.com/paranext/paranext-core/pull/380
- 343 storage mock for verseref by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/386
- Create download/update project dialog by @jolierabideau in https://github.com/paranext/paranext-core/pull/390
- Use ScriptureReference type more consistently by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/392
- Create open multiple projects dialog by @jolierabideau in https://github.com/paranext/paranext-core/pull/393
- Make MenuItem functional outside of GridMenu by @jolierabideau in https://github.com/paranext/paranext-core/pull/395
- Add Project Data Provider Factories and associated types by @lyonsil in https://github.com/paranext/paranext-core/pull/389
- Setup linting rules for .(S)CSS by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/397
- Create stub for extension toggle by @jolierabideau in https://github.com/paranext/paranext-core/pull/400
- Security Updates by @irahopkinson in https://github.com/paranext/paranext-core/pull/404
- 344 current ref resource viewer by @katherinejensen00 in https://github.com/paranext/paranext-core/pull/399
- Remove local ref control from resource viewer by @katherinejensen00 in https://github.com/paranext/paranext-core/pull/416
- Make resource viewer take whole webview width, prevent extension name '..' by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/426
- Adjust Extension Toggle by @jolierabideau in https://github.com/paranext/paranext-core/pull/417
- Add C# project data support by @lyonsil in https://github.com/paranext/paranext-core/pull/427
- Update the icons with the new official icon. Removed pt-summit icon. by @FoolRunning in https://github.com/paranext/paranext-core/pull/414
- Package on main by @irahopkinson in https://github.com/paranext/paranext-core/pull/442

## New Contributors

- @lyonsil made their first contribution in https://github.com/paranext/paranext-core/pull/102
- @rolfheij-sil made their first contribution in https://github.com/paranext/paranext-core/pull/96
- @dependabot made their first contribution in https://github.com/paranext/paranext-core/pull/116
- @tombogle made their first contribution in https://github.com/paranext/paranext-core/pull/130
- @jolierabideau made their first contribution in https://github.com/paranext/paranext-core/pull/249
- @katherinejensen00 made their first contribution in https://github.com/paranext/paranext-core/pull/380

**Full Changelog**: https://github.com/paranext/paranext-core/compare/v0.0.2...v0.1.0

# 0.0.2 (2023.2.28)

## What's Changed

### Other Changes

- Update release instructions by @irahopkinson in https://github.com/paranext/paranext-core/pull/20
- Added websocket communication between main and renderer, improved build process and dev experience by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/24
- Add Code Spell Checker by @irahopkinson in https://github.com/paranext/paranext-core/pull/33
- Create C# client for handling requests for existing Paratext data. by @FoolRunning in https://github.com/paranext/paranext-core/pull/28
- Run the dotnet Data Provider from electron by @irahopkinson in https://github.com/paranext/paranext-core/pull/36

## New Contributors

- @FoolRunning made their first contribution in https://github.com/paranext/paranext-core/pull/28

**Full Changelog**: https://github.com/paranext/paranext-core/compare/v0.0.1...v0.0.2

# 0.0.1 (2023.2.4)

## What's Changed

### Other Changes

- First part of issue#2: Add electron-react-boilerplate by @irahopkinson in https://github.com/paranext/paranext-core/pull/2
- Configure publishing to GH by @irahopkinson in https://github.com/paranext/paranext-core/pull/3
- Fix release by @irahopkinson in https://github.com/paranext/paranext-core/pull/4
- Fix Linux release by @irahopkinson in https://github.com/paranext/paranext-core/pull/10
- Fix Lint warnings by @irahopkinson in https://github.com/paranext/paranext-core/pull/13
- Add debugging to GHA workflows by @irahopkinson in https://github.com/paranext/paranext-core/pull/11
- Fix ReadMe icon by @irahopkinson in https://github.com/paranext/paranext-core/pull/12
- Added proper icon files by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/17
- Prepare release by @irahopkinson in https://github.com/paranext/paranext-core/pull/18

## New Contributors

- @irahopkinson made their first contribution in https://github.com/paranext/paranext-core/pull/2
- @tjcouch-sil made their first contribution in https://github.com/paranext/paranext-core/pull/17

**Full Changelog**: https://github.com/paranext/paranext-core/commits/v0.0.1
