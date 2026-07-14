/**
 * Power-mode default-view e2e (PT-4190 / NN-1 default clause): a scripture editor opened with no
 * previously saved view state defaults to Standard view when `platform.interfaceMode` is 'power'.
 *
 * The default is applied by a corrective effect in platform-scripture-editor.web-view.tsx that
 * fires only after the interface-mode setting resolves (the first frames may render 'formatted'),
 * so the Standard-view assertions poll with generous timeouts rather than asserting immediately.
 *
 * Probes:
 *
 * - `.editor-input.marker-editable` — the editor library maps `ViewOptions.markerMode` onto a
 *   `marker-<mode>` class on the contentEditable root (`getViewClassList` in shared-react), and
 *   Standard view (STANDARD_VIEW_MODE) is the only view preset with markerMode 'editable'.
 * - `span.opening[data-marker]` — a rendered inline marker glyph (MarkerNode; class from its
 *   markerSyntax). Only the editable marker mode creates MarkerNodes, and their visible `\marker`
 *   text is the user-facing substance of Standard view.
 *
 * ONE test() per spec file on purpose: the isolated fixture is test-scoped, and a SECOND Electron
 * instance launched against the shared webpack renderer dev server has a documented failure mode
 * where new dock tabs never render (see isolated.fixture.ts). The simple-mode counterpart lives in
 * formatted-default-simple-mode.spec.ts for the same reason.
 *
 * Runs against an isolated project root, so the only project is the bundled sample WEB (installed
 * by the C# backend into the empty root): `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

// interfaceMode 'power' matches the fixture default but is stated explicitly — this spec IS the
// power-default guard, so it must not drift if the fixture default ever changes.
// DEV_NOISY=false: the noisy dev test layout has no Home tab (see scroll-group-sync.spec.ts).
test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('scripture editor default view', () => {
  test('a first-open editor defaults to Standard view in power mode', async ({ mainPage }) => {
    await waitForHomeTab(mainPage);

    // Open the EDITABLE editor — the mainline Standard-view surface (the sample project ships
    // Editable=F, so openScriptureEditor would otherwise fall back to a read-only viewer).
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    // Load a small single-chapter book (same choice as scroll-group-sync.spec.ts) so the marker
    // glyph assertion below runs against real chapter content.
    await navigateToolbarBcv(mainPage, 'Obadiah 1:1');

    // The view settles on 'standard' once the corrective effect fires (see file header).
    await expect(editorFrame.locator('.editor-input.marker-editable')).toBeAttached({
      timeout: 60_000,
    });
    // And Standard view actually renders inline marker glyphs, not just the mode class.
    await expect(
      editorFrame.locator('.editor-input.marker-editable span.opening[data-marker]').first(),
    ).toBeAttached({ timeout: 30_000 });
  });
});
