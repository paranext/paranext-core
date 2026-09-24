// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import type { WebViewProps } from '@papi/core';
import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference } from 'platform-scripture';

const { mockShowDialog, mockUseEffectiveResourceReferenceList, catalog, noticesByProject } =
  vi.hoisted(() => {
    const dblResources: DblResourceData[] = [];
    return {
      mockShowDialog: vi.fn(),
      mockUseEffectiveResourceReferenceList: vi.fn(),
      catalog: { dblResources },
      noticesByProject: new Map<string, unknown>(),
    };
  });

vi.mock('@papi/frontend', () => ({
  default: {
    dialogs: { showDialog: (...args: unknown[]) => mockShowDialog(...args) },
    projectDataProviders: {
      get: vi.fn(async () => ({
        getChapterUSJ: vi.fn(async () => undefined),
        getSetting: vi.fn(async () => 'ltr'),
      })),
    },
  },
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [
    {
      '%webView_modelTextPanel_pickModelText%': 'Pick model text…',
      '%webView_modelTextPanel_emptyState_prompt%': 'No model text selected.',
      '%webView_modelTextPanel_title%': 'Model text',
      '%webView_modelTextPanel_title_withResource%': 'Model text: {textName}',
      '%platformScripture_copyrightNotice_restrictedLicense_banner%':
        '{label}: The {name} is for reference only.',
      '%platformScripture_copyrightNotice_notification_format%': '{name}: {notice}',
      '%platformScripture_copyrightNotice_moreInfo%': 'More info…',
      '%platformScripture_copyrightNotice_dismiss%': 'Dismiss copyright notice',
      '%platformScripture_copyrightNotice_details_title%': 'Copyright for {name}',
    },
    false,
  ],
  useDataProvider: vi.fn(() => undefined),
  useProjectDataProvider: vi.fn(() => undefined),
  useScrollGroupScrRef: vi.fn(() => [
    { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
    vi.fn(),
  ]),
  useProjectSetting: vi.fn((projectId: string | undefined, key: string, fallback: unknown) => [
    (key === 'platformScripture.copyrightNotice' && projectId && noticesByProject.get(projectId)) ||
      fallback,
    vi.fn(),
    vi.fn(),
    false,
  ]),
}));

vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return { ...original, useExtraValidMarkers: () => [] };
});

vi.mock('@eten-tech-foundation/platform-editor', () => ({
  Editorial: React.forwardRef((_props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    React.useImperativeHandle(ref, () => ({ setUsj: vi.fn() }));
    return <div data-testid="editorial" />;
  }),
  getDefaultViewOptions: () => ({}),
}));

vi.mock('./use-effective-resource-reference-list.hook', () => ({
  useEffectiveResourceReferenceList: (...args: unknown[]) =>
    mockUseEffectiveResourceReferenceList(...args),
}));

vi.mock('./use-dbl-resource-catalog.hook', () => ({
  useDblResourceCatalog: () => ({
    dblResources: catalog.dblResources,
    isLoadingResources: false,
    isCatalogReady: true,
    hasCatalogError: false,
    refetchCatalog: vi.fn(),
  }),
}));

vi.mock('./use-install-dbl-resource.hook', () => ({
  useInstallDblResource: vi.fn(() => vi.fn(async () => {})),
}));

vi.mock('./use-open-find-shortcut.hook', () => ({ useOpenFindShortcut: vi.fn() }));

vi.mock('./use-publish-navigable-project-ids.hook', () => ({
  usePublishNavigableProjectIds: vi.fn(),
}));

// Must follow vi.mock() calls so the side effect runs against the mock boundaries above.
// eslint-disable-next-line import/first
import './model-text-panel.web-view';

/** A catalog entry for a resource that is installed and shown by `projectId` */
function installed(dblEntryUid: string, projectId: string, name: string): DblResourceData {
  return {
    dblEntryUid,
    projectId,
    displayName: name,
    fullName: name,
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 0,
    installed: true,
    updateAvailable: false,
  };
}

function configureModelText(reference: ResourceReference | undefined) {
  mockUseEffectiveResourceReferenceList.mockReturnValue({
    status: 'ready',
    list: {
      dataVersion: '1.0.0',
      items: reference ? [{ ...reference, source: 'admin' }] : [],
    },
  });
}

function renderWebView() {
  // The object literal only provides the props this web view reads
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const props = {
    id: 'model-text-web-view',
    projectId: 'my-project',
    updateWebViewDefinition: vi.fn(),
    useWebViewState: <T,>(_key: string, defaultValue: T) => [defaultValue, vi.fn(), vi.fn()],
  } as unknown as WebViewProps;
  // globalThis is a special interface; the web view file assigns this property at runtime
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const ModelTextPanelWebView = (globalThis as Record<string, unknown>)
    .webViewComponent as React.ComponentType<WebViewProps>;
  return render(<ModelTextPanelWebView {...props} />);
}

// jsdom ships no ResizeObserver, which the copyright notice banner measures itself with
class NoopResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeEach(() => {
  vi.stubGlobal('ResizeObserver', NoopResizeObserver);
  mockShowDialog.mockReset();
  noticesByProject.clear();
  catalog.dblResources = [];
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('ModelTextPanelWebView copyright notice', () => {
  it('shows the notice of a model text chosen from the DBL', () => {
    catalog.dblResources = [installed('uid-niv', 'niv-project', 'NIV11')];
    noticesByProject.set('niv-project', {
      kind: 'restrictedLicense',
      name: 'NIV11',
      fullName: 'New International Version 2011',
      copyrightYears: '2011',
    });
    configureModelText({ type: 'dblResource', id: 'uid-niv', name: 'NIV11' });

    renderWebView();

    expect(screen.getByRole('note')).toHaveTextContent(/^NIV11:/);
  });

  it('shows the notice of a model text that is a project on this computer', () => {
    catalog.dblResources = [installed('local-esv', 'local-esv', 'ESVL')];
    noticesByProject.set('local-esv', {
      kind: 'notification',
      name: 'ESVL',
      fullName: 'English Standard Version (local)',
      bannerText: 'Do not translate the ESV.',
      details: '',
    });
    configureModelText({ type: 'project', id: 'local-esv', name: 'ESVL' });

    renderWebView();

    expect(screen.getByRole('note')).toHaveTextContent('ESVL: Do not translate the ESV.');
  });
});

describe('ModelTextPanelWebView model text picker', () => {
  it('offers restricted texts only as texts that cannot be chosen', async () => {
    mockShowDialog.mockResolvedValue(undefined);
    configureModelText(undefined);

    renderWebView();
    fireEvent.click(await screen.findByRole('button', { name: 'Pick model text…' }));

    expect(mockShowDialog).toHaveBeenCalledWith(
      'platform.resourcePicker',
      expect.objectContaining({ disableRestrictedModelTexts: true }),
    );
  });
});
