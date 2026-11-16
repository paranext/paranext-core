/**
 * The parked Enhanced Resources specs: kept as written test scenarios, and collected by no
 * Playwright config. `playwright-cdp.config.ts` spreads this list into its `testIgnore`;
 * `playwright.config.ts` sets it as the `enhanced-resources` project's `testIgnore`. Specs in that
 * directory that are not listed stay collected.
 *
 * One entry per file. To work on one, remove its entry here and its PARKED header together, then
 * run it against a prepared app. `parked-enhanced-resources.test.ts` checks this list against the
 * spec files and their headers, and checks that both configs use it.
 *
 * Why each file is parked and what it needs before it can run:
 * `tests/enhanced-resources/README.md`.
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
  '**/enhanced-resources/scripture-text-grid.spec.ts',
];
