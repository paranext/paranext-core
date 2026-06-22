import {
  Editorial,
  EditorOptions,
  EditorRef,
  getDefaultViewOptions,
  UsjNodeOptions,
} from '@eten-tech-foundation/platform-editor';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Button, Spinner } from 'platform-bible-react';
import type { DblResourceData, LocalizedStringValue } from 'platform-bible-utils';
import type {
  DblResourceReference,
  EffectiveResourceReference,
  EffectiveResourceReferenceList,
  ResourceReferenceList,
} from 'platform-scripture';
import { ComponentProps, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { selectTextConnection } from './select-dbl-resource';
import { scrollToVerse } from './editor-dom.util';

const DEFAULT_TEXT_DIRECTION = 'ltr';

/** Max ms to retry scrolling via rAF before giving up (e.g. verse marker missing from USJ) */
const SCROLL_MAX_WAIT_MS = 2000;

/**
 * Object containing all keys used for localization in this component. Pass these keys into the
 * Platform's localization hook and pass the resulting localized strings into the `localizedStrings`
 * prop.
 */
export const MODEL_TEXT_PANEL_STRING_KEYS = Object.freeze([
  /** @deprecated Use `%webView_modelTextPanel_selecting%` instead. */
  '%webView_modelTextPanel_installing%',
  '%webView_modelTextPanel_selecting%',
  '%webView_modelTextPanel_noProject%',
  '%webView_modelTextPanel_pickModelText%',
  '%webView_modelTextPanel_unknownResource%',
  '%webView_modelTextPanel_emptyState_prompt%',
] as const);

type ModelTextPanelLocalizedStringKey = (typeof MODEL_TEXT_PANEL_STRING_KEYS)[number];
type ModelTextPanelLocalizedStrings = {
  [key in ModelTextPanelLocalizedStringKey]?: LocalizedStringValue;
};

const DEFAULT_SCR_REF: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

export type ModelTextPanelProps = {
  /** Localized strings; import `MODEL_TEXT_PANEL_STRING_KEYS` to resolve them. */
  localizedStrings: ModelTextPanelLocalizedStrings;
  /** Whether the panel has a project context (opened with a project id). */
  hasProject: boolean;
  /**
   * The resolved ("effective") model-text references for this project, or `undefined` while still
   * resolving. The first item is the configured model text.
   */
  effectiveModelTexts: EffectiveResourceReferenceList | undefined;
  /** Whether the effective model texts are still loading. */
  isEffectiveModelTextsLoading: boolean;
  /** All DBL resources — used to match the configured model text and to feed the resource picker. */
  dblResources: DblResourceData[];
  /** Whether the DBL resources are still loading. */
  isLoadingResources: boolean;
  /** The project's admin-level model-text setting (used when writing an admin choice). */
  adminModelTexts: ResourceReferenceList | undefined;
  /** The function to get the user-level model-text setting (used when writing a user choice). */
  getUserModelTexts: () => Promise<ResourceReferenceList | undefined>;
  /**
   * Function to get whether the user may write project (admin) settings; decides admin vs. user
   * persistence.
   */
  getCanWriteProjectSettings: () => Promise<boolean | undefined>;
  /** Current Scripture reference for the editor. */
  scrRef?: SerializedVerseRef;
  /** Called when the editor changes the Scripture reference. */
  onScrRefChange?: (scrRef: SerializedVerseRef) => void;
  /**
   * Install a DBL resource by its entry uid (fire-and-forget; the panel re-resolves once
   * installed).
   */
  installResource: (dblEntryUid: string) => Promise<void>;
  /** Persist an admin-level model-text list. */
  setAdminModelTexts: (list: ResourceReferenceList) => void;
  /** Persist a user-level model-text list. */
  setUserModelTexts: (list: ResourceReferenceList) => Promise<void>;
  /**
   * Open the resource picker for the user to choose a model text. Resolves with the chosen
   * resource, or `undefined` if the picker was cancelled. In the app this opens the
   * `platform.resourcePicker` dialog; in Storybook it renders the real ResourcePickerDialog
   * inline.
   */
  showResourcePicker: (selectedResourceIds: string[]) => Promise<DblResourceData | undefined>;
  /**
   * Retrieve the resolved resource's chapter USJ and text direction. This is a callback (not a
   * prop) because the resource project to read from is resolved inside this component.
   */
  getResourceChapter: (
    resourceProjectId: string,
    scrRef: SerializedVerseRef,
  ) => Promise<{ usj: Usj | undefined; textDirection: string }>;
  /** Logger forwarded to the editor (the webview supplies the PAPI logger; stories may omit it). */
  logger?: ComponentProps<typeof Editorial>['logger'];
};

/**
 * Read-only panel that displays a project's configured "model text" Scripture resource. It owns the
 * orchestration (resolve the configured model text → match a DBL resource → auto-install if needed
 * → load that resource's chapter USJ) so the app webview and Storybook share the same logic; only
 * the data (props) and the PAPI-backed operations (callbacks) differ between them.
 */
export function ModelTextPanel({
  localizedStrings,
  hasProject,
  effectiveModelTexts,
  isEffectiveModelTextsLoading,
  dblResources,
  isLoadingResources,
  adminModelTexts,
  getUserModelTexts,
  getCanWriteProjectSettings,
  scrRef = DEFAULT_SCR_REF,
  onScrRefChange = () => {},
  installResource,
  setAdminModelTexts,
  setUserModelTexts,
  showResourcePicker,
  getResourceChapter,
  logger,
}: ModelTextPanelProps) {
  // --- Resolve the configured model text against the DBL resource list ---

  const effectiveModelText = effectiveModelTexts?.items[0];
  let dblRef: (EffectiveResourceReference & DblResourceReference) | undefined;
  if (effectiveModelText?.type === 'dblResource') {
    // EffectiveResourceReference union check doesn't satisfy TS discriminated-union refinement
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    dblRef = effectiveModelText as EffectiveResourceReference & DblResourceReference;
  }
  const match = dblRef ? dblResources.find((r) => r.dblEntryUid === dblRef.id) : undefined;
  const resourceProjectId = match?.installed ? match.projectId : undefined;

  const [isSelecting, setIsSelecting] = useState(false);

  // Tracks the latest scrRef this panel's editor just published so we can suppress the echo that
  // comes back through scroll group 0 (forced in simple mode) and avoid scroll-jumping the user's
  // own click target to the top of the viewport.
  // eslint-disable-next-line no-null/no-null
  const lastPublishedScrRefRef = useRef<SerializedVerseRef | null>(null);

  // --- Load the resolved resource's chapter USJ (re-fetch on resource/reference change) ---

  const [usj, setUsj] = useState<Usj | undefined>(undefined);
  const [textDirection, setTextDirection] = useState<string>(DEFAULT_TEXT_DIRECTION);
  // `undefined` means "not yet fetched" so we can show the loading state, matching the original.
  const [isUsjLoading, setIsUsjLoading] = useState(false);

  useEffect(() => {
    if (!resourceProjectId) {
      setUsj(undefined);
      return undefined;
    }
    let isActive = true;
    setIsUsjLoading(true);
    const load = async () => {
      const { usj: nextUsj, textDirection: nextTextDirection } = await getResourceChapter(
        resourceProjectId,
        scrRef,
      );
      if (!isActive) return;
      setUsj(nextUsj);
      setTextDirection(nextTextDirection || DEFAULT_TEXT_DIRECTION);
      setIsUsjLoading(false);
    };
    load().catch(() => {
      if (!isActive) return;
      setUsj(undefined);
      setIsUsjLoading(false);
    });
    return () => {
      isActive = false;
    };
    // Intentionally excludes scrRef.verseNum: chapter data only changes with book or chapter, not verse.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    resourceProjectId,
    scrRef.book,
    scrRef.chapterNum,
    scrRef.versificationStr,
    getResourceChapter,
  ]);

  // Scroll to the current verse whenever the scrRef or USJ changes.
  // Using granular scrRef deps instead of the whole object avoids redundant scroll attempts
  // when scrRef identity changes but the reference itself hasn't.
  useEffect(() => {
    // Suppress our own echo: the panel is on scroll group 0 in simple mode, so a verse click
    // inside Editorial publishes to the scroll group and immediately bounces back as a prop
    // update. Without this check, scrollToVerse would snap the user's click target to the top
    // of the viewport after they clicked it.
    const lastPublished = lastPublishedScrRefRef.current;
    if (
      lastPublished &&
      lastPublished.book === scrRef.book &&
      lastPublished.chapterNum === scrRef.chapterNum &&
      lastPublished.verseNum === scrRef.verseNum
    ) {
      lastPublishedScrRefRef.current = null;
      return undefined;
    }

    // Gate on USJ being loaded for the current chapter. On book/chapter change, usj still holds
    // the previous chapter while the fetch is in flight — querying the DOM now would scroll into
    // the wrong chapter's content (or silently no-op). usj in deps ensures we re-run once data
    // arrives and the editor has re-rendered.
    if (!usj || isUsjLoading) return undefined;

    // rAF retry: waits for the editor DOM to paint the new chapter before scrolling. Stops as
    // soon as the verse element is found, or after SCROLL_MAX_WAIT_MS (verse marker absent).
    let cancelled = false;
    const start = Date.now();
    const tryScroll = () => {
      if (cancelled) return;
      const found = scrollToVerse(scrRef);
      if (found || scrRef.verseNum <= 1) return;
      if (Date.now() - start > SCROLL_MAX_WAIT_MS) return;
      requestAnimationFrame(tryScroll);
    };
    tryScroll();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usj, isUsjLoading, scrRef.book, scrRef.chapterNum, scrRef.verseNum]);

  // --- Editor ---

  // EditorRef requires null initial value per React ref convention
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  const options: EditorOptions = useMemo(
    () => ({
      isReadonly: true,
      hasSpellCheck: false,
      // UsjNodeOptions is a complex type; empty-object initializer requires assertion
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      nodes: {} as UsjNodeOptions,
      // Narrow the resource's (string) text-direction setting to the editor's union without a cast.
      textDirection: textDirection === 'rtl' || textDirection === 'auto' ? textDirection : 'ltr',
      view: getDefaultViewOptions(),
    }),
    [textDirection],
  );

  // Read-only: push incoming USJ directly into the editor whenever it changes.
  useEffect(() => {
    if (usj) editorRef.current?.setUsj(usj);
  }, [usj]);

  // --- Resource picker / selection ---

  const currentModelTextIds = useMemo(() => {
    const items = effectiveModelTexts?.items ?? [];
    const dblItems = items.filter(
      (r): r is EffectiveResourceReference & DblResourceReference => r.type === 'dblResource',
    );
    const adminDblItems = dblItems.filter((r) => r.source === 'admin');
    const relevantItems =
      adminDblItems.length > 0 ? adminDblItems : dblItems.filter((r) => r.source === 'user');
    return relevantItems.map((r) => r.id);
  }, [effectiveModelTexts]);

  const handleResourceSelect = useCallback(
    async (resource: DblResourceData) => {
      setIsSelecting(true);
      try {
        await selectTextConnection(
          resource,
          adminModelTexts,
          setAdminModelTexts,
          getCanWriteProjectSettings,
          getUserModelTexts,
          setUserModelTexts,
          async () => installResource(resource.dblEntryUid),
        );
      } finally {
        setIsSelecting(false);
      }
    },
    [
      adminModelTexts,
      getCanWriteProjectSettings,
      setAdminModelTexts,
      getUserModelTexts,
      setUserModelTexts,
      installResource,
    ],
  );

  const handlePickModelText = useCallback(async () => {
    const resource = await showResourcePicker(currentModelTextIds);
    if (resource) await handleResourceSelect(resource);
  }, [showResourcePicker, currentModelTextIds, handleResourceSelect]);

  const handleScrRefChange = useCallback(
    (newScrRef: SerializedVerseRef) => {
      lastPublishedScrRefRef.current = newScrRef;
      onScrRefChange(newScrRef);
    },
    [onScrRefChange],
  );

  // --- Render the resolved state ---

  // No project: opened without a project id (expected to be brief).
  if (!hasProject) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <p>{localizedStrings['%webView_modelTextPanel_noProject%']}</p>
      </div>
    );
  }

  // Zero state: no model text configured (or still loading the list / DBL resources).
  if (isLoadingResources || !effectiveModelTexts || effectiveModelTexts.items.length === 0) {
    return (
      <div className="tw:flex tw:h-screen tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:p-8 tw:text-center">
        {/* Also shows spinner for if loading resources, except if there is no model text then */}
        {/* it should directly show the button to pick a model text below */}
        {isEffectiveModelTextsLoading ||
        (isLoadingResources && effectiveModelText && effectiveModelTexts?.items.length !== 0) ? (
          <Spinner />
        ) : (
          <>
            <p>{localizedStrings['%webView_modelTextPanel_emptyState_prompt%']}</p>
            <Button onClick={() => handlePickModelText()}>
              {localizedStrings['%webView_modelTextPanel_pickModelText%']}
            </Button>
          </>
        )}
      </div>
    );
  }

  // Error state: the configured uid isn't in the DBL list at all.
  if (dblRef && match === undefined) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <p>{localizedStrings['%webView_modelTextPanel_unknownResource%']}</p>
      </div>
    );
  }

  // Installing: resource found but not yet installed.
  if (isSelecting) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:gap-2 tw:p-8 tw:text-center">
        <Spinner />
        <span>{localizedStrings['%webView_modelTextPanel_selecting%']}</span>
      </div>
    );
  }

  // Loading: USJ not yet fetched for the resolved resource.
  if (!resourceProjectId || (usj === undefined && isUsjLoading)) {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <Spinner />
      </div>
    );
  }

  // Active: read-only editor showing the model text.
  return (
    <div className="tw:h-screen tw:overflow-auto" dir={options.textDirection}>
      <Editorial
        ref={editorRef}
        scrRef={scrRef}
        onScrRefChange={handleScrRefChange}
        options={options}
        logger={logger}
      />
    </div>
  );
}

export default ModelTextPanel;
