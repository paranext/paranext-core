/**
 * E2E checks for the PT-4050 (A2) two-flag schema + overlay init + admin gate.
 *
 * Scope — vanilla-core-observable only:
 *
 * - `isResourceShownByDefault` persists through the project setting round-trip.
 * - First-open init writes the per-user overlay to match the project's flags.
 * - The admin gate on the project-scope write is enforced server-side; it is covered by C# unit tests
 *   (ParatextProjectDataProviderShownByDefaultTests), not asserted here — this spec runs against a
 *   project where the current user is an administrator.
 *
 * NOT covered here (requires the PRIVATE Send/Receive auto-download patch, which vanilla core does
 * not include — verified manually in the Studio build): the real DBL auto-download that the
 * auto-promoted Referenced entry triggers. See PT-4050 DoD "verified in the Studio build".
 *
 * This spec mutates real project settings (with restore-on-teardown), so it is LOCAL-ONLY: it skips
 * when the CI env var is set. Locally it discovers an admin-writable project dynamically via
 * `canUserWriteProjectTextConnectionSettings()`; set E2E_TEST_PROJECT_ID to pin a specific
 * project.
 */
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

// Optional override: pin the project to test against instead of discovering one dynamically.
const PREFERRED_PROJECT_ID = process.env.E2E_TEST_PROJECT_ID ?? '';

const SYNTHETIC_ITEM_ID = 'aabbccddeeff00112233';

// The renderer sets `globalThis.papi`; it is untyped in the Playwright context. This is the
// narrow slice of the PAPI surface this spec uses.
type PapiWindow = {
  papi: {
    projectLookup: {
      getMetadataForAllProjects: () => Promise<{ id: string; projectInterfaces?: string[] }[]>;
    };
    projectDataProviders: {
      get: (
        pdpType: string,
        projectId: string,
      ) => Promise<{
        setSetting: (key: string, value: unknown) => Promise<boolean>;
        // This spec only reads `platformScripture.modelTexts` and
        // `platformScripture.referencedProjectsAndResources`, so narrow the return here to that
        // shape. This lets the assertions below avoid a type assertion on `unknown`.
        getSetting: (
          key: string,
        ) => Promise<{ items: { id?: string; isResourceShownByDefault?: boolean }[] }>;
        canUserWriteProjectTextConnectionSettings: () => Promise<boolean>;
        resetShownByDefaultOverlay: () => Promise<boolean>;
        initializeShownByDefaultOverlay: () => Promise<boolean>;
        getShownByDefaultOverlay: () => Promise<Record<string, boolean>>;
      }>;
    };
  };
};

test.describe('Scripture Text Grid shown-by-default schema (A2)', () => {
  test('project flag persists and first-open init seeds the overlay', async ({ mainPage }) => {
    test.skip(
      !!process.env.CI,
      'Mutates real project settings (restored on teardown) — local runs only',
    );
    await waitForAppReady(mainPage);

    // Find a project where the current user can write the admin-gated project-scope settings.
    // The write under test is admin-gated, so an arbitrary project is not enough — ask the PDP's
    // own gate query for each candidate.
    const projectId = await mainPage.evaluate(async (preferredId) => {
      // `globalThis.papi` is set by the renderer and untyped in the Playwright context
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const { papi } = window as unknown as PapiWindow;
      if (preferredId) return preferredId;

      const allProjects = await papi.projectLookup.getMetadataForAllProjects();
      const candidates = allProjects.filter((project) =>
        project.projectInterfaces?.includes('platformScripture.textConnectionSettings'),
      );
      const adminChecks = await Promise.all(
        candidates.map(async (candidate) => {
          try {
            const pdp = await papi.projectDataProviders.get(
              'platformScripture.textConnectionSettings',
              candidate.id,
            );
            return (await pdp.canUserWriteProjectTextConnectionSettings())
              ? candidate.id
              : undefined;
          } catch {
            return undefined;
          }
        }),
      );
      return adminChecks.find((id) => id) ?? '';
    }, PREFERRED_PROJECT_ID);

    test.skip(
      !projectId,
      'No admin-writable project with platformScripture.textConnectionSettings found locally',
    );

    const result = await mainPage.evaluate(
      async ({ testProjectId, syntheticItemId }) => {
        // `globalThis.papi` is set by the renderer and untyped in the Playwright context
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const { papi } = window as unknown as PapiWindow;

        const pdp = await papi.projectDataProviders.get(
          'platformScripture.textConnectionSettings',
          testProjectId,
        );

        // Capture pre-test state so teardown can restore it. `modelTexts` is replaced by the
        // write under test, and auto-promote appends the synthetic entry to
        // `referencedProjectsAndResources` as a side effect.
        const originalModelTexts = await pdp.getSetting('platformScripture.modelTexts');
        const originalReferenced = await pdp.getSetting(
          'platformScripture.referencedProjectsAndResources',
        );

        try {
          // Admin writes the project-scope model-texts list with a flagged Bible text.
          await pdp.setSetting('platformScripture.modelTexts', {
            dataVersion: '1.1.0',
            items: [
              {
                type: 'project',
                name: 'P',
                id: syntheticItemId,
                isResourceShownByDefault: true,
              },
            ],
          });

          const stored = await pdp.getSetting('platformScripture.modelTexts');

          // First open initializes the overlay to match the project's flags.
          await pdp.resetShownByDefaultOverlay();
          const didInit = await pdp.initializeShownByDefaultOverlay();
          const overlay = await pdp.getShownByDefaultOverlay();

          return { stored, didInit, overlay };
        } finally {
          // Restore the project to its pre-test state so repeated runs and sibling tests do not
          // see the synthetic entry (in either setting) or an initialized overlay.
          await pdp.setSetting('platformScripture.modelTexts', originalModelTexts);
          await pdp.setSetting(
            'platformScripture.referencedProjectsAndResources',
            originalReferenced,
          );
          await pdp.resetShownByDefaultOverlay();
        }
      },
      { testProjectId: projectId, syntheticItemId: SYNTHETIC_ITEM_ID },
    );

    // Guard so a null/absent setting fails with a clear assertion,
    // not a confusing TypeError during the .find() below.
    expect(result.stored).toBeTruthy();

    const flaggedItem = result.stored.items.find((i) => i.id === SYNTHETIC_ITEM_ID);
    expect(flaggedItem?.isResourceShownByDefault).toBe(true);
    expect(result.didInit).toBe(true);
    expect(result.overlay[SYNTHETIC_ITEM_ID]).toBe(true);
  });
});
