// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { DblResourceData } from 'platform-bible-utils';
import type { EffectiveResourceReferenceList } from 'platform-scripture';
import { ModelTextPanel, ModelTextPanelProps } from './model-text-panel.component';

vi.mock('@eten-tech-foundation/platform-editor', () => ({
  Editorial: React.forwardRef((_props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    React.useImperativeHandle(ref, () => ({ setUsj: vi.fn() }));
    return <div data-testid="editorial" />;
  }),
  // The component reads `getDefaultViewOptions()` at module scope; the mocked component below
  // doesn't inspect the returned `view` options, so an empty object is sufficient.
  getDefaultViewOptions: () => ({}),
}));
vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    useExtraValidMarkers: () => [],
  };
});

const seedResource: DblResourceData = {
  dblEntryUid: 'uid-web',
  displayName: 'WEB',
  fullName: 'World English Bible',
  bestLanguageName: 'English',
  type: 'ScriptureResource',
  size: 1200,
  installed: true,
  updateAvailable: false,
  projectId: 'project-web',
};

const baseProps: ModelTextPanelProps = {
  localizedStrings: {},
  hasProject: true,
  effectiveModelTexts: undefined,
  isEffectiveModelTextsLoading: false,
  dblResources: [seedResource],
  isLoadingResources: false,
  getUserModelTexts: async () => undefined,
  installResource: async () => {},
  setUserModelTexts: async () => {},
  showResourcePicker: async () => undefined,
  getResourceChapter: async () => ({ usj: undefined, textDirection: 'ltr' }),
};

describe('ModelTextPanel header', () => {
  it('shows "FULL_NAME (SHORT_NAME)" once a model text resolves and its chapter loads', async () => {
    const effectiveModelTexts: EffectiveResourceReferenceList = {
      dataVersion: '1.0.0',
      items: [{ type: 'dblResource', id: 'uid-web', name: 'WEB', source: 'admin' }],
    };
    render(
      <ModelTextPanel
        {...baseProps}
        effectiveModelTexts={effectiveModelTexts}
        getResourceChapter={async () => ({
          usj: { type: 'USJ', version: '3.1', content: [] },
          textDirection: 'ltr',
        })}
      />,
    );
    expect(await screen.findByTestId('model-text-header')).toHaveTextContent(
      'World English Bible (WEB)',
    );
  });

  it('shows no header in the zero state (no model text configured)', () => {
    render(
      <ModelTextPanel {...baseProps} effectiveModelTexts={{ dataVersion: '1.0.0', items: [] }} />,
    );
    expect(screen.queryByTestId('model-text-header')).not.toBeInTheDocument();
  });
});
