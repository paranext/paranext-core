# 0.2.2 (2024.2.28)

This release bundles a couple of Paratext extensions for demonstration purposes. It won't be merged back into main.

# 0.2.1 (2024.2.28)

This release removes a number of extensions, web views, and menu items that are only there to help with testing. It won't be merged back into main. It is being made to help with demonstration purposes.

# 0.2.0 (2024.2.27)

## What's Changed

### Exciting New Features 🎉

- #448 Open resource viewer to selected project by @tombogle in https://github.com/paranext/paranext-core/pull/606
- Unconstrain project folder names (623) by @tombogle in https://github.com/paranext/paranext-core/pull/653

### Other Changes

- Release v0.1.0 by @irahopkinson in https://github.com/paranext/paranext-core/pull/475
- #253: created an IconButton component in papi-components by @tombogle in https://github.com/paranext/paranext-core/pull/474
- Add a service to lookup projects on the file system by @lyonsil in https://github.com/paranext/paranext-core/pull/476
- Fixed readDir unexpectedly giving undefined instead of empty array when there are no matching directories by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/516
- Cleanup by @irahopkinson in https://github.com/paranext/paranext-core/pull/513
- Run basic checks stub by @jolierabideau in https://github.com/paranext/paranext-core/pull/468
- Add prototype GraphQL service on top of Paratext project data providers by @lyonsil in https://github.com/paranext/paranext-core/pull/520
- Create some first-pass issue templates by @FoolRunning in https://github.com/paranext/paranext-core/pull/530
- Stop doing cross builds and increase network timeout by @lyonsil in https://github.com/paranext/paranext-core/pull/535
- Fix network object sharing race condition within the same process by @lyonsil in https://github.com/paranext/paranext-core/pull/537
- Reworked ParatextStandard PDP to include USFM in data type names, wrote TypeScript types for potential Scripture and Project Note data by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/538
- Stop doing cross builds on release by @irahopkinson in https://github.com/paranext/paranext-core/pull/539
- 363 create use project data provider hook by @katherinejensen00 in https://github.com/paranext/paranext-core/pull/546
- Add web view state service and corresponding React hook by @lyonsil in https://github.com/paranext/paranext-core/pull/545
- Fix resource viewer syntax/style by @irahopkinson in https://github.com/paranext/paranext-core/pull/554
- Change import to conditional import when inside the renderer by @lyonsil in https://github.com/paranext/paranext-core/pull/555
- Added dialog service for retrieving info from users. Select Project Dialog. `useDialogCallback` hook by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/553
- 435 basic list by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/550
- Settings dialog stub by @jolierabideau in https://github.com/paranext/paranext-core/pull/547
- Add useDataProviderMulti hook by @lyonsil in https://github.com/paranext/paranext-core/pull/561
- Create `useProjectData` hook by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/568
- Fix accidental exception where closing a dialog tries to close the dialog again and throws an exception by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/575
- #363 Fixed typo in comment in create-use-network-object-hook.util.ts by @tombogle in https://github.com/paranext/paranext-core/pull/565
- Add eslint rules by @irahopkinson in https://github.com/paranext/paranext-core/pull/577
- Fix potential bug on early return by @irahopkinson in https://github.com/paranext/paranext-core/pull/580
- Made webview state not stringified entries while preserving check to make sure it is serializable by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/586
- Enable webviews to change their title and icon url by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/583
- Allow local projects with dashes in short name by @tombogle in https://github.com/paranext/paranext-core/pull/584
- Add more modules to be shared at load time with extensions by @lyonsil in https://github.com/paranext/paranext-core/pull/588
- Fix getMetadataForProject being the only thing using project ids that is case-sensitive by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/589
- Fixed serializable check failing in useWebViewState when using complex objects like arrays by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/592
- Revert MUI/emotion loading changes by @lyonsil in https://github.com/paranext/paranext-core/pull/595
- 514 hook up select multiple projects dialog by @katherinejensen00 in https://github.com/paranext/paranext-core/pull/593
- #460 Make the Resource Viewer editable as a proof-of-concept Scripture editor by @FoolRunning in https://github.com/paranext/paranext-core/pull/556
- Fix resource viewer race condition with use-data.hook by @lyonsil in https://github.com/paranext/paranext-core/pull/598
- Fix race condition when creating the same PDP in multiple threads by @lyonsil in https://github.com/paranext/paranext-core/pull/599
- Hooked up Open Text Collection command, multiple related fixes and tweaks by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/596
- Add open word list menu item by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/602
- 437 Restart extensions when extensions are added by @jolierabideau in https://github.com/paranext/paranext-core/pull/603
- add Volta config by @irahopkinson in https://github.com/paranext/paranext-core/pull/605
- Fix editing of the resource viewer by @FoolRunning in https://github.com/paranext/paranext-core/pull/612
- Revised content security policy and added WebViewContentType.URL for url webviews by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/610
- More C# tests and testing framework by @FoolRunning in https://github.com/paranext/paranext-core/pull/611
- format JSDoc by @irahopkinson in https://github.com/paranext/paranext-core/pull/622
- Loading new extensions not deactivate/activate all loaded extensions by @jolierabideau in https://github.com/paranext/paranext-core/pull/624
- Fixed compiler warning by @FoolRunning in https://github.com/paranext/paranext-core/pull/628
- Change button text run basic checks dialog by @jolierabideau in https://github.com/paranext/paranext-core/pull/627
- Change Comboboxes to Selects in example setting components by @jolierabideau in https://github.com/paranext/paranext-core/pull/629
- don't format JSDoc in papi.d.ts by @irahopkinson in https://github.com/paranext/paranext-core/pull/632
- Improve PAPI imports by @jolierabideau in https://github.com/paranext/paranext-core/pull/634
- Show `nav-operations` by @irahopkinson in https://github.com/paranext/paranext-core/pull/633
- Improve resiliance of network request registration and error messages by @lyonsil in https://github.com/paranext/paranext-core/pull/635
- Added `DataProviders` shared interface for data providers by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/630
- Fix bug where iframe is not unmounted when tab is closed by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/638
- Fixed not being able to access navigator, causing ComboBox dropdown and ... button to crash by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/639
- Update the webview service to use the new service pattern by @lyonsil in https://github.com/paranext/paranext-core/pull/640
- Settings content scroll by @jolierabideau in https://github.com/paranext/paranext-core/pull/643
- Fix Scripture update events not causing data providers to re-fetch data by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/644
- Added tests on Scripture update events by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/646
- Improve JSDoc divider by @irahopkinson in https://github.com/paranext/paranext-core/pull/647
- Fix inconsistent spelling of papi namespaces by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/648
- Added some more C# tests (mainly for the PSI) by @FoolRunning in https://github.com/paranext/paranext-core/pull/654
- Send network events when network objects are created by @lyonsil in https://github.com/paranext/paranext-core/pull/651
- Add the network object status service by @lyonsil in https://github.com/paranext/paranext-core/pull/652
- Add tooltips to app bar by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/657
- Added `app://cache/extension-types` for extension type sharing by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/659
- Generate and deploy documentation with Typedoc by @jolierabideau in https://github.com/paranext/paranext-core/pull/666
- Replace most uses of null with undefined by @lyonsil in https://github.com/paranext/paranext-core/pull/667
- Fix publish-docs workflow by @jolierabideau in https://github.com/paranext/paranext-core/pull/669
- 650 refactor imports by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/668
- Limit the node version in GHA by @irahopkinson in https://github.com/paranext/paranext-core/pull/676
- 353 Update log levels by @katherinejensen00 in https://github.com/paranext/paranext-core/pull/675
- introduce common scss + style docking framework by @Sebastian-ubs in https://github.com/paranext/paranext-core/pull/665
- Change comment headlines to regions by @Sebastian-ubs in https://github.com/paranext/paranext-core/pull/677
- Update readme with GitHub Pages links by @jolierabideau in https://github.com/paranext/paranext-core/pull/673
- Add ways to use WebSocket and XMLHttpRequest in the renderer by @lyonsil in https://github.com/paranext/paranext-core/pull/678
- sync package-lock with package.json by @Sebastian-ubs in https://github.com/paranext/paranext-core/pull/682
- Fix Jest test fail on papi-components by @jolierabideau in https://github.com/paranext/paranext-core/pull/684
- Added internet objects to papi exports by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/685
- Remove "dynamic" data type from all C# code by @lyonsil in https://github.com/paranext/paranext-core/pull/688
- Updated MandatoryProjectDataType JSDoc to match current type enforcement by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/690
- Populate local user dir with project by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/687
- split platform-dock-layout by @Sebastian-ubs in https://github.com/paranext/paranext-core/pull/683
- Remove redundant sender ID from the "registerRequest" command by @lyonsil in https://github.com/paranext/paranext-core/pull/692
- Rework extensions folder to use `paranext-multi-extension-template` by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/693
- #567: Turn on globbing in rimrafSync calls by @tombogle in https://github.com/paranext/paranext-core/pull/696
- Extensions using `papi-shared-types` to share other methods by @jolierabideau in https://github.com/paranext/paranext-core/pull/699
- Event more attributes about network objects when they are registered by @lyonsil in https://github.com/paranext/paranext-core/pull/698
- Fixed clients thinking they failed to unregister request handlers by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/702
- Log unhandled exceptions and highlight module loading oddity by @lyonsil in https://github.com/paranext/paranext-core/pull/703
- Revised `usePromise`, `useData`, `useProjectData`, and `useDialogCallback` by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/701
- Retain `null` JSON properties as `undefined` when deserializing by @lyonsil in https://github.com/paranext/paranext-core/pull/705
- Freeze PAPI and the objects going into it by @lyonsil in https://github.com/paranext/paranext-core/pull/706
- Implement get set reset pattern for useSetting and useWebViewState by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/697
- Replace papi-components with two new libraries by @jolierabideau in https://github.com/paranext/paranext-core/pull/704
- Follow up to replace `papi-components` with two libraries by @jolierabideau in https://github.com/paranext/paranext-core/pull/716
- Add reset function to useWebViewState by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/717
- fix `vite` vulnerability by @irahopkinson in https://github.com/paranext/paranext-core/pull/727
- Revised useSetting and useWebViewState by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/728
- Deduped `@emotion/react` by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/730
- Create localization service by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/725
- Add a placeholder overview page to Storybook by @merchako in https://github.com/paranext/paranext-core/pull/732
- Update npm packages by @irahopkinson in https://github.com/paranext/paranext-core/pull/733
- Fix small bug in localization regex by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/745
- 326 add aliases by @katherinejensen00 in https://github.com/paranext/paranext-core/pull/734
- Fixed some inaccuracies in the ParatextStandard expanded data provider by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/749
- Add JSON document combining logic by @lyonsil in https://github.com/paranext/paranext-core/pull/744
- Move menus schema to `platform-bible-utils` for react components by @lyonsil in https://github.com/paranext/paranext-core/pull/750
- Fix typedoc build problems by @lyonsil in https://github.com/paranext/paranext-core/pull/751
- Create menu store service by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/747
- use the BiblioNexus Foundation shared Scripture editor by @irahopkinson in https://github.com/paranext/paranext-core/pull/753
- Allow sending general requests from C# by @lyonsil in https://github.com/paranext/paranext-core/pull/755
- fix editor scripts by @irahopkinson in https://github.com/paranext/paranext-core/pull/757
- Add menu JSON to the manifest file by @lyonsil in https://github.com/paranext/paranext-core/pull/756
- Add settings and project settings contribution files by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/759
- Updated Uri scheme documentation by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/760
- Updated papi.d.ts with new Uri scheme documentation that I missed before by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/761
- editor: improve note node by @irahopkinson in https://github.com/paranext/paranext-core/pull/762
- Improve extension host & dotnet service shutdown by @irahopkinson in https://github.com/paranext/paranext-core/pull/764
- Async settings service by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/752
- Fix the build by @lyonsil in https://github.com/paranext/paranext-core/pull/766
- Added project settings service and `useProjectSetting` hook by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/758
- Update to .NET v8 and update our assembly dependencies by @lyonsil in https://github.com/paranext/paranext-core/pull/765
- Update .NET version in GitHub actions by @lyonsil in https://github.com/paranext/paranext-core/pull/768
- Added `helloWorld` TypeScript test PDP by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/769
- Support surrogate pairs by @rolfheij-sil in https://github.com/paranext/paranext-core/pull/773
- Updated to node 20.11.1 LTS, replaced ts-node with tsx in the necessary places as a temporary fix for https://github.com/TypeStrong/ts-node/issues/1997 by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/778
- Add missing function to stop script import by @lyonsil in https://github.com/paranext/paranext-core/pull/779
- Fixed platform-bible-utils not being available on backend by @tjcouch-sil in https://github.com/paranext/paranext-core/pull/782

## New Contributors

- @Sebastian-ubs made their first contribution in https://github.com/paranext/paranext-core/pull/665
- @merchako made their first contribution in https://github.com/paranext/paranext-core/pull/732

**Full Changelog**: https://github.com/paranext/paranext-core/compare/v0.1.0...v0.2.0

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
