import { describe, it, expect, vi } from 'vitest';
import { SHARE_LAYOUT_DIALOG_TYPE } from '@renderer/components/dialogs/dialog-definition.model';
import { DIALOGS } from '@renderer/components/dialogs/index';
import { SHARE_LAYOUT_DIALOG } from '@renderer/components/dialogs/share-layout.dialog';

// Importing the real `DIALOGS` map transitively pulls in `project-picker.dialog.tsx` ->
// `use-project-picker-data.hook.ts` -> `papi-frontend.service.ts`, whose module-level
// `theme.service-host.ts` initialization calls `window.matchMedia`, which jsdom does not
// implement. Mock this PAPI service boundary (matching the precedent in
// `use-project-picker-data.hook.test.ts`) since this smoke test only checks registration
// metadata and never exercises project-picker behavior.
vi.mock('@renderer/services/papi-frontend.service', () => ({
  webViews: {
    getAllOpenWebViewDefinitions: vi.fn(async () => []),
  },
}));

describe('SHARE_LAYOUT_DIALOG registration', () => {
  it('has the expected tabType', () => {
    expect(SHARE_LAYOUT_DIALOG.tabType).toBe('platform.shareLayoutDialog');
  });

  it('is registered in the DIALOGS map under its own tabType', () => {
    expect(DIALOGS[SHARE_LAYOUT_DIALOG_TYPE]).toBe(SHARE_LAYOUT_DIALOG);
  });

  it('defines a Component to render', () => {
    expect(typeof SHARE_LAYOUT_DIALOG.Component).toBe('function');
  });
});
