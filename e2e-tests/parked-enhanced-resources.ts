/**
 * The Enhanced Resources specs that are parked: kept as the written test scenarios for a feature
 * that is still to be finished (epic PT-2021, "Enhanced Resources"), and collected by no Playwright
 * config. Both `playwright.config.ts` and `playwright-cdp.config.ts` list these globs in
 * `testIgnore`.
 *
 * They have never run as a whole. They need an app started in Power mode with real Marble resources
 * installed (such as `ESV16UK+`), many of their tests are `test.fixme`, and
 * `text-collection-schema.spec.ts` also needs `E2E_TEST_PROJECT_ID` to name an editable admin
 * project. See `tests/enhanced-resources/README.md`.
 *
 * One entry per file: to work on one, remove its entry here, then run it against a prepared app.
 * Finishing the feature means removing the entries one by one. The local-only specs in the same
 * directory (`scripture-text-grid*`, `cell-reorder`, `enhanced-resource-content-zoom`,
 * `enhanced-resources-image-render`) are not listed and stay collected.
 */
export const PARKED_ENHANCED_RESOURCES_SPECS: string[] = [
  '**/enhanced-resources/enhanced-resources-functional-UI-PKG-001.spec.ts',
  '**/enhanced-resources/enhanced-resources-functional-UI-PKG-002.spec.ts',
  '**/enhanced-resources/enhanced-resources-functional-UI-PKG-003.spec.ts',
  '**/enhanced-resources/enhanced-resources-functional-UI-PKG-004.spec.ts',
  '**/enhanced-resources/enhanced-resources-functional-UI-PKG-005.spec.ts',
  '**/enhanced-resources/enhanced-resources-functional-UI-PKG-006.spec.ts',
  '**/enhanced-resources/enhanced-resources-functional-UI-PKG-007.spec.ts',
  '**/enhanced-resources/enhanced-resources-functional-UI-PKG-008.spec.ts',
  '**/enhanced-resources/enhanced-resources-journey.spec.ts',
  '**/enhanced-resources/text-collection-schema.spec.ts',
];
