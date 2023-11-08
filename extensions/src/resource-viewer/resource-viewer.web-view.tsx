import { VerseRef } from '@sillsdev/scripture';
import papi from 'papi-frontend';
import { ScriptureReference } from 'papi-components';
import { JSX, useMemo } from 'react';
import UsxEditor from 'usxeditor';
import type { WebViewProps } from 'shared/data/web-view.model';

/** Characteristics of a marker style */
interface StyleInfo {
  /** The USFM marker name that corresponds to a CSS class selector */
  style: string;
  /** Whether this marker style can be closed (e.g. \nd and \nd*). In-line styles only. */
  canClose?: boolean;
  /**
   * Whether this marker style only applies to the word following it (e.g. \v 2). In-line styles
   * only.
   */
  oneWord?: boolean;
}

/** Characteristics of a Slate element */
interface ElementInfo {
  /** Whether the element should be considered within one line or should be a block of text */
  inline?: boolean;
  /**
   * Marker styles for this element. All marker styles should be unique. There should not be a
   * marker style repeated between two elements.
   */
  validStyles?: StyleInfo[];
}

const {
  react: {
    hooks: { useProjectData, useSetting },
  },
  logger,
} = papi;

/** All available elements for use in slate editor */
const editorElements: { [type: string]: ElementInfo } = {
  verse: {
    inline: true,
    validStyles: [{ style: 'v', oneWord: true }],
  },
  para: {
    validStyles: [
      { style: 'p' },
      { style: 'q' },
      { style: 'q1' },
      { style: 'q2' },
      { style: 'q3' },
      { style: 'q4' },
      { style: 'qr' },
      { style: 'd' },
      { style: 'sp' },
      { style: 'b' },
      { style: 'pb' },
      { style: 'h' },
      { style: 'rem' },
      { style: 'toc' },
      { style: 'toc1' },
      { style: 'toc2' },
      { style: 'toc3' },
      { style: 'imt' },
      { style: 'imt1' },
      { style: 'imt2' },
      { style: 'imt3' },
      { style: 'imt4' },
      { style: 'imte' },
      { style: 'imte1' },
      { style: 'imte2' },
      { style: 'mt' },
      { style: 'mt1' },
      { style: 'mt2' },
      { style: 'mt3' },
      { style: 'mt4' },
      { style: 'mte' },
      { style: 'mte1' },
      { style: 'mte2' },
      { style: 'ms' },
      { style: 'ms1' },
      { style: 'mr' },
      { style: 'r' },
      { style: 'is' },
      { style: 'is1' },
      { style: 'is2' },
      { style: 's' },
      { style: 's1' },
      { style: 's2' },
      { style: 'iot' },
      { style: 'io' },
      { style: 'io1' },
      { style: 'io2' },
      { style: 'io3' },
      { style: 'io4' },
      { style: 'lit' },
      { style: 'id' },
    ],
  },
  char: {
    inline: true,
    validStyles: [
      { style: 'nd', canClose: true },
      { style: 'bk', canClose: true },
      { style: 'pn', canClose: true },
      { style: 'wj', canClose: true },
      { style: 'k', canClose: true },
      { style: 'ord', canClose: true },
      { style: 'add', canClose: true },
      { style: 'no', canClose: true },
      { style: 'it', canClose: true },
      { style: 'bd', canClose: true },
      { style: 'bdit', canClose: true },
      { style: 'em', canClose: true },
      { style: 'sc', canClose: true },
      { style: 'sup', canClose: true },
    ],
  },
  chapter: {
    validStyles: [{ style: 'c', oneWord: true }],
  },
};

const usxEditorParaMap = editorElements.para.validStyles?.map((style) => style.style) || [];
const usxEditorCharMap = Object.fromEntries(
  editorElements.char.validStyles?.map((style) => [style.style, {}]) || [],
);

interface ScriptureTextPanelUsxProps {
  usx: string;
  onChanged?: (newUsx: string) => void;
}

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

/**
 * Scripture text panel that displays a read-only version of a usx editor that displays the current
 * chapter
 */
function ScriptureTextPanelUsxEditor({ usx, onChanged }: ScriptureTextPanelUsxProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="text-panel">
      <UsxEditor
        usx={usx}
        paraMap={usxEditorParaMap}
        charMap={usxEditorCharMap}
        onUsxChanged={(newUsx) => {
          // TODO: Check if the project is editable
          if (onChanged) onChanged(newUsx);
        }}
      />
    </div>
  );
}

globalThis.webViewComponent = function ResourceViewer({
  useWebViewState,
}: WebViewProps): JSX.Element {
  const [projectId] = useWebViewState<string>('projectId', '');

  logger.info(`Resource Viewer project ID: ${projectId}`);

  const [scrRef] = useSetting('platform.verseRef', defaultScrRef);

  const [usx, setUsx] = useProjectData(projectId, 'ParatextStandard').ChapterUSX(
    useMemo(() => new VerseRef(scrRef.bookNum, scrRef.chapterNum, scrRef.verseNum), [scrRef]),
    'Loading Scripture...',
  );

  return (
    <div>
      <ScriptureTextPanelUsxEditor usx={usx ?? '<usx/>'} onChanged={setUsx} />
    </div>
  );
};
