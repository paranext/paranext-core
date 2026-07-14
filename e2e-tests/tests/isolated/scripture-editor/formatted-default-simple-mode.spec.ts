/**
 * Simple-mode default-view e2e (PT-4190 / NN-1 "nothing changes for Simple users" clause): a
 * scripture editor opened with no previously saved view state keeps the pre-Standard-view
 * 'formatted' default when `platform.interfaceMode` is 'simple' — the power-mode Standard default
 * (see standard-default-power-mode.spec.ts) must not leak into Simple mode.
 *
 * The flow mirrors the power-mode spec exactly (same project, same open command, same navigation);
 * the ONLY variable is `interfaceMode`, so a failure here isolates the interface-mode gating of the
 * default rather than anything about how the editor was opened.
 *
 * ONE test() per spec file on purpose — see standard-default-power-mode.spec.ts.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
} from '../../../fixtures/scripture-editor-helpers';

// interfaceMode 'simple' overrides the fixture's 'power' default — this spec IS the guard that
// Simple mode keeps the formatted view.
// DEV_NOISY=false: the noisy dev test layout replaces the normal layouts (see
// scroll-group-sync.spec.ts).
test.use({
  interfaceMode: 'simple',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

test.describe('scripture editor default view', () => {
  test('a first-open editor keeps the formatted view in simple mode', async ({ mainPage }) => {
    // Heavy isolated test: it launches its own Electron instance, installs the bundled sample
    // project into a fresh root, opens the editor, and polls several backend-readiness gates. A cold
    // first run measured ~84s against the default 120s budget (~70%), so a colder or
    // memory-pressured machine could spuriously time out before the calibrated per-step timeouts
    // fire. Give it Playwright's 3x "slow" budget for headroom (a passing run still exits in seconds).
    test.slow();
    // No `waitForHomeTab` here: simple mode loads the static simpleLayout, which has NO Home tab
    // (simple-layout.data.ts). The open helper below carries its own app-readiness gates (first
    // iframe attached = initial loadLayout() done; PAPI command registration; retry loop).
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    // Same book as the power-mode spec; the verse-number wait doubles as the positive control
    // that chapter content finished rendering BEFORE the negative assertions below run (an
    // empty editor would pass them vacuously).
    await navigateToolbarBcv(mainPage, 'Obadiah 1:1');
    await expect(editorFrame.locator('span[data-marker="v"][data-number="1"]')).toBeAttached({
      timeout: 60_000,
    });

    // Formatted view POSITIVE signal, asserted with a wait so the view has actually SETTLED to
    // formatted before the negative checks below (the two toHaveCount(0) checks alone are satisfied
    // by the pre-settle DOM and could pass vacuously). The contentEditable root carries the
    // formatted marker-mode class `marker-hidden`: non-power 'formatted' resolves to markerMode
    // 'hidden' in getViewOptionsForType, which the editor maps onto `.editor-input.marker-hidden`
    // (see _usj-nodes.scss), symmetric to the power spec's `.editor-input.marker-editable`. A
    // Simple->Standard regression (the power-default corrective effect wrongly firing in simple
    // mode) would flip this root class to `marker-editable`, failing HERE by construction instead of
    // slipping past the count-0 checks.
    await expect(editorFrame.locator('.editor-input.marker-hidden')).toBeAttached({
      timeout: 60_000,
    });

    // And no editable-marker mode class or inline marker glyphs anywhere in the content (MarkerNodes
    // exist only in Standard view's editable marker mode). The power-mode corrective effect must
    // never fire in simple mode.
    await expect(editorFrame.locator('.editor-input.marker-editable')).toHaveCount(0);
    await expect(editorFrame.locator('span.opening[data-marker]')).toHaveCount(0);
  });
});
