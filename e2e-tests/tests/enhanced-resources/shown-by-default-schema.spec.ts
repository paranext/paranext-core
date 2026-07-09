/**
 * E2E checks for the PT-4050 (A2) two-flag schema + overlay init + admin gate.
 *
 * MANUAL-ONLY: this spec does not run in CI. It lives in the `enhanced-resources` Playwright
 * project (not the CI `smoke` run) and is `test.skip`-gated on `E2E_TEST_PROJECT_ID`, which is set
 * nowhere in the repo. To run it locally, boot the app with CDP enabled, set `E2E_TEST_PROJECT_ID`
 * to a known editable admin project, and run the `enhanced-resources` project (see the run command
 * in `e2e-tests/playwright.config.ts`). Regression protection for this feature comes from the C#
 * unit tests (ParatextProjectDataProviderShownByDefaultTests); this spec is a manual smoke check.
 *
 * Scope — vanilla-core-observable only:
 *
 * - `isResourceShownByDefault` persists through the referenced-resources setting round-trip.
 * - First-open init writes the per-user overlay to match the project's flags.
 * - The admin gate on the referenced-resources write is enforced server-side; it is covered by the C#
 *   unit tests, not asserted here — this fixture runs as the default (admin) user.
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

// A stable test project id available in the e2e fixture data. Adjust to the fixture's known
// editable, admin project id if this constant differs in the harness.
//
// Investigation: the enhanced-resources test suite (test-helpers.ts and sibling specs) does not
// expose a known fixture project id constant — it only operates on UI elements (tabs, iframes).
// The markers-checklist suite discovers a Paratext (USFM) project dynamically from
// ProjectLookupService.getMetadataForAllProjects, but that returns whatever projects happen to be
// installed on the CI runner; it does not guarantee admin access. Because the overlay PDP write
// (`setSetting`) is admin-gated, we cannot reliably pick any arbitrary project from the lookup.
// The env-var + test.skip guard is therefore the correct pattern here.
const TEST_PROJECT_ID = process.env.E2E_TEST_PROJECT_ID ?? '';

test.describe('Scripture Text Grid shown-by-default schema (A2)', () => {
  test('project flag persists and first-open init seeds the overlay', async ({ mainPage }) => {
    test.skip(!TEST_PROJECT_ID, 'No editable admin test project configured for this run');
    await waitForAppReady(mainPage);

    const result = await mainPage.evaluate(async (projectId) => {
      // The renderer sets `globalThis.papi`; it is untyped in the Playwright context.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const { papi } = window as unknown as {
        papi: {
          projectDataProviders: {
            get: (
              pdpType: string,
              projectId: string,
            ) => Promise<{
              setSetting: (key: string, value: unknown) => Promise<boolean>;
              // This test only reads `platformScripture.referencedProjectsAndResources`, so narrow
              // the return here to that shape. This lets the assertions below avoid a type assertion.
              getSetting: (
                key: string,
              ) => Promise<{ items: { id?: string; isResourceShownByDefault?: boolean }[] }>;
              resetShownByDefaultOverlay: () => Promise<boolean>;
              initializeShownByDefaultOverlay: () => Promise<boolean>;
              getShownByDefaultOverlay: () => Promise<Record<string, boolean>>;
            }>;
          };
        };
      };

      const pdp = await papi.projectDataProviders.get(
        'platformScripture.textConnectionSettings',
        projectId,
      );

      // Admin writes the project-scope referenced-resources list with a flagged Bible text.
      await pdp.setSetting('platformScripture.referencedProjectsAndResources', {
        dataVersion: '1.1.0',
        items: [
          {
            type: 'project',
            name: 'P',
            id: 'aabbccddeeff00112233',
            isResourceShownByDefault: true,
          },
        ],
      });

      const stored = await pdp.getSetting('platformScripture.referencedProjectsAndResources');

      // First open initializes the overlay to match the project's flags.
      await pdp.resetShownByDefaultOverlay();
      const didInit = await pdp.initializeShownByDefaultOverlay();
      const overlay = await pdp.getShownByDefaultOverlay();

      return { stored, didInit, overlay };
    }, TEST_PROJECT_ID);

    // Guard so a null/absent setting fails with a clear assertion,
    // not a confusing TypeError during the .find() below.
    expect(result.stored).toBeTruthy();

    const flaggedItem = result.stored.items.find((i) => i.id === 'aabbccddeeff00112233');
    expect(flaggedItem?.isResourceShownByDefault).toBe(true);
    expect(result.didInit).toBe(true);
    expect(result.overlay.aabbccddeeff00112233).toBe(true);
  });
});
