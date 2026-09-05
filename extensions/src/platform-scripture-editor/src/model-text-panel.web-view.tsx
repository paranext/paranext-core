import { Usj, USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import type { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useDataProvider, useLocalizedStrings, useScrollGroupScrRef } from '@papi/frontend/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { formatReplacementString, getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import type {
  DblResourceReference,
  EffectiveResourceReference,
  ResourceReferenceList,
} from 'platform-scripture';
import { useCallback, useEffect, useMemo } from 'react';
import { useResourceReferenceSource } from './use-resource-reference-source.hook';
import { useDblResourceCatalog } from './use-dbl-resource-catalog.hook';
import { HAS_FREE_RESOURCES, freeResourcePickerOptions } from './free-resources.utils';
import { openParatextRegistration } from './open-paratext-registration.util';
import { isDblResourceReference } from './resource-reference.utils';
import { useOpenFindShortcut } from './use-open-find-shortcut.hook';
import { useInstallDblResource } from './use-install-dbl-resource.hook';
import { ModelTextPanel, MODEL_TEXT_PANEL_STRING_KEYS } from './model-text-panel.component';
import { canPublishResourcePanelProjectIds } from './resource-panel-readiness.utils';
import { usePublishNavigableProjectIds } from './use-publish-navigable-project-ids.hook';

const DEFAULT_TEXT_DIRECTION = 'ltr';

const defaultUsj: Usj = {
  type: USJ_TYPE,
  version: USJ_VERSION,
  content: [],
};

// Webview-only localized strings — used for the dynamic title via updateWebViewDefinition. The
// presentational component doesn't know about the title.
const ALL_STRING_KEYS: LocalizeKey[] = [
  ...MODEL_TEXT_PANEL_STRING_KEYS,
  '%webView_modelTextPanel_title%',
  '%webView_modelTextPanel_title_withResource%',
];

/**
 * Thin data-loader for the model-text panel. It wires PAPI to the props of `ModelTextPanel`, which
 * owns the orchestration. Raw data is passed as props; writes and resource-dependent reads (the
 * resolved resource's USJ + text direction) are passed as callbacks.
 */
globalThis.webViewComponent = function ModelTextPanelWebView({
  id: webViewId,
  projectId,
  scrollGroupScrRef,
  updateWebViewDefinition,
  useWebViewState,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => ALL_STRING_KEYS, []));

  // --- Raw data sources ---

  // Reads the project's configured model text when a project is open, and the app-scoped
  // free-resource choice when none is. Same state shape either way, so everything below is unchanged.
  const modelTextSource = useResourceReferenceSource(projectId, 'platformScripture.modelTexts');
  const effectiveModelTextsState = modelTextSource.state;
  const effectiveModelTexts =
    effectiveModelTextsState.status === 'ready' ? effectiveModelTextsState.list : undefined;

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');
  const { dblResources, isCatalogReady, hasCatalogError, hasRegistrationError, refetchCatalog } =
    useDblResourceCatalog();

  // --- Dynamic title: "Model text: {displayName}" when a resource is loaded ---
  // Computed inline (rather than in the presentational component) because updateWebViewDefinition
  // is a webview-only API.

  const effectiveModelText = effectiveModelTexts?.items[0];
  let dblRef: (EffectiveResourceReference & DblResourceReference) | undefined;
  if (isDblResourceReference(effectiveModelText)) {
    dblRef = effectiveModelText;
  }
  const matchedInstalledResource = dblRef
    ? dblResources.find((r) => r.dblEntryUid === dblRef.id && r.installed)
    : undefined;
  const modelTextSmallName = matchedInstalledResource?.displayName;

  // Follow the scroll group in the RESOLVED MODEL RESOURCE's versification, not this panel's own
  // (editable) project's. This web view's definition `projectId` is the editable project (it reads
  // that project's `platformScripture.modelTexts` setting), but it renders the model resource — so
  // passing the resource's id as the conversion project makes `scrRef` come back converted into the
  // resource's versification and makes a verse click here stamp the resource as the scroll group's
  // source project (other web views then convert FROM it). We call `useScrollGroupScrRef` directly
  // (rather than the `useWebViewScrollGroupScrRef` prop) so we can pass that resource id instead of
  // this web view's own `projectId`; the `scrollGroupScrRef` prop is kept live by the web-view host
  // re-rendering the component on definition updates. `undefined` until a resource resolves — no
  // conversion, and nothing is displayed yet anyway.
  const modelResourceProjectId = matchedInstalledResource?.projectId;
  const [scrRef, setScrRef] = useScrollGroupScrRef(
    scrollGroupScrRef,
    useCallback(
      (newScrollGroupScrRef) =>
        updateWebViewDefinition({ scrollGroupScrRef: newScrollGroupScrRef }),
      [updateWebViewDefinition],
    ),
    modelResourceProjectId,
  );

  useEffect(() => {
    const baseTitle = localizedStrings['%webView_modelTextPanel_title%'];
    if (!baseTitle) return;
    if (modelTextSmallName) {
      const fmt = localizedStrings['%webView_modelTextPanel_title_withResource%'];
      updateWebViewDefinition({
        title: formatReplacementString(fmt, { textName: modelTextSmallName }),
      });
    } else {
      updateWebViewDefinition({ title: baseTitle });
    }
  }, [modelTextSmallName, localizedStrings, updateWebViewDefinition]);

  // Ctrl+F opens Find for the displayed model resource.
  useOpenFindShortcut(webViewId, modelResourceProjectId);

  // This web view's definition `projectId` is the editable project whose model-text setting is
  // read, so the displayed resource is invisible to global navigation UI unless declared here.
  usePublishNavigableProjectIds(
    useWebViewState,
    modelResourceProjectId ? [modelResourceProjectId] : [],
    canPublishResourcePanelProjectIds(effectiveModelTextsState, isCatalogReady),
  );

  // --- Operation callbacks ---

  // Re-resolve the cached resource list once an install completes so the resource flips to
  // installed and renders; the install itself lives in the shared hook. Returns a no-op until the
  // provider resolves — its identity change then re-fires the panel's auto-install effect for the
  // real install.
  const installResource = useInstallDblResource(
    dblResourcesProvider,
    'model text panel',
    refetchCatalog,
  );

  const { getUserList: getUserModelTexts, setUserList, isNoProject } = modelTextSource;

  // An empty allowlist means there is nothing to offer, so the entry point stays off and the panel
  // shows its plain no-project message instead of a picker that cannot be populated.
  const isFreeResourceEntryPoint = isNoProject && HAS_FREE_RESOURCES;

  const setUserModelTexts = useCallback(
    async (list: ResourceReferenceList) => {
      await setUserList(list);
    },
    [setUserList],
  );

  const showResourcePicker = useCallback(
    (selectedResourceIds: string[]) =>
      papi.dialogs.showDialog('platform.resourcePicker', {
        selectedResourceIds,
        ...freeResourcePickerOptions(
          isFreeResourceEntryPoint,
          localizedStrings['%webView_resourcePanel_freeResourcesOnly_notice%'],
        ),
        isModal: true,
        resourceType: 'ScriptureResource',
      }),
    [isFreeResourceEntryPoint, localizedStrings],
  );

  const getResourceChapter = useCallback(
    async (resourceProjectId: string, ref: SerializedVerseRef) => {
      const usjPdp = await papi.projectDataProviders.get(
        'platformScripture.USJ_Chapter',
        resourceProjectId,
      );
      const usj =
        (await usjPdp.getChapterUSJ({
          book: ref.book,
          chapterNum: ref.chapterNum,
          verseNum: 1,
          versificationStr: ref.versificationStr,
        })) ?? defaultUsj;

      let textDirection: string = DEFAULT_TEXT_DIRECTION;
      try {
        const basePdp = await papi.projectDataProviders.get('platform.base', resourceProjectId);
        const td = await basePdp.getSetting('platform.textDirection');
        if (typeof td === 'string' && td) textDirection = td;
      } catch (e) {
        logger.warn(`Failed to read model text direction: ${getErrorMessage(e)}`);
      }

      return { usj, textDirection };
    },
    [],
  );

  return (
    <ModelTextPanel
      localizedStrings={localizedStrings}
      hasProject={projectId !== undefined}
      isFreeResourceEntryPoint={isFreeResourceEntryPoint}
      hasRegistrationError={hasRegistrationError}
      modelTextsState={effectiveModelTextsState}
      dblResources={dblResources}
      isCatalogReady={isCatalogReady}
      hasCatalogError={hasCatalogError}
      onRetryCatalog={refetchCatalog}
      onOpenRegistration={openParatextRegistration}
      getUserModelTexts={getUserModelTexts}
      scrRef={scrRef}
      onScrRefChange={setScrRef}
      installResource={installResource}
      setUserModelTexts={setUserModelTexts}
      showResourcePicker={showResourcePicker}
      getResourceChapter={getResourceChapter}
      logger={logger}
    />
  );
};
