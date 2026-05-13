import { createElement, CSSProperties, ReactNode } from 'react';
import DockLayout, { DockMode, LayoutData, TabData, TabGroup } from 'rc-dock';
import {
  ArrowLeft,
  BookOpen,
  BookType,
  ChevronsUpDown,
  CircleHelp,
  ClipboardList,
  Cross,
  FileText,
  GitBranch,
  Home,
  Library,
  MessageSquare,
  Moon,
  Network,
  PenLine,
  Plus,
  RefreshCw,
  Redo2,
  Search,
  Shield,
  Sparkles,
  Undo2,
  User,
} from 'lucide-react';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import 'rc-dock/dist/rc-dock.css';
import '../../renderer/components/docking/dock-layout-wrapper.component.scss';

/* ============================================================================
 * Constants — group names mirror `TAB_GROUP` in
 * `src/renderer/components/docking/platform-dock-layout-positioning.util.ts`
 * so the SCSS selectors (`.dock-style-platform-bible`) match.
 * ========================================================================== */

export const TAB_GROUP = 'card platform-bible';
export const HEADLESS_GROUP = 'headless platform-bible';

/* Override rc-dock's built-in `headless` hover/focus rules so the tab bar never
 * fades back in. */
export const HEADLESS_STYLE = `
  .dock-layout > :not(.dock-fbox) .dock-panel.dock-style-headless .dock-bar {
    pointer-events: none !important;
  }
  .dock-layout > :not(.dock-fbox) .dock-panel.dock-style-headless .dock-bar:hover,
  .dock-layout > :not(.dock-fbox) .dock-panel.dock-style-headless .dock-bar:focus-within,
  .dock-layout > :not(.dock-fbox) .dock-panel.dock-style-headless.dock-panel-dropping .dock-bar {
    opacity: 0 !important;
    height: 20px !important;
  }
`;

/* Strip visible spacing while still allowing resize. The divider keeps a 1px
 * footprint plus rc-dock's transform-based hit-area expansion (scaleX/Y(8)),
 * so it's visually nearly invisible but remains grabbable. */
export const NO_PADDING_STYLE = `
  .ten-no-padding .dock-layout { gap: 0 !important; }
  .ten-no-padding .dock-divider { flex: 0 0 1px !important; background: transparent !important; }
  .ten-no-padding .dock-hbox > .dock-divider { transform: scaleX(8) !important; cursor: ew-resize !important; }
  .ten-no-padding .dock-vbox > .dock-divider { transform: scaleY(8) !important; cursor: ns-resize !important; }
  .ten-no-padding .dock-panel { padding: 0 !important; border-radius: 0 !important; }
  .ten-no-padding .dock-tabpane { padding: 0 !important; border-radius: 0 !important; }
`;

const lockedGroupOptions: TabGroup = {
  maximizable: false,
  floatable: false,
  animated: false,
  // Docking disabled: locking tabs prevents drag-to-create-new-panel.
  tabLocked: true,
  moreIcon: createElement(ChevronsUpDown),
};

const draggableGroupOptions: TabGroup = {
  maximizable: false,
  floatable: false,
  animated: false,
  moreIcon: createElement(ChevronsUpDown),
};

function PlusButton() {
  return (
    <Button variant="ghost" size="icon" className="tw:size-7">
      <Plus />
    </Button>
  );
}

export const POWER_GROUPS: { [key: string]: TabGroup } = {
  [TAB_GROUP]: {
    ...draggableGroupOptions,
    panelExtra: () => <PlusButton />,
  },
};

export const SIMPLE_GROUPS: { [key: string]: TabGroup } = {
  [TAB_GROUP]: {
    ...lockedGroupOptions,
    panelExtra: () => <PlusButton />,
  },
  [HEADLESS_GROUP]: lockedGroupOptions,
};

export const dockStyle: CSSProperties = { flex: 1, minHeight: 0 };

/* ============================================================================
 * Reusable building blocks
 * ========================================================================== */

function IconTab({ children }: { children: ReactNode }) {
  return (
    <span className="tw:flex tw:size-5 tw:items-center tw:justify-center" aria-hidden>
      {children}
    </span>
  );
}

function ToolbarIconButton({ children }: { children: ReactNode }) {
  return (
    <Button variant="ghost" size="icon" className="tw:size-7">
      {children}
    </Button>
  );
}

function PillButton({ children }: { children: ReactNode }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="tw:h-7 tw:rounded-full tw:px-3 tw:text-xs tw:font-medium"
    >
      {children}
    </Button>
  );
}

function ChapterAndScopeRow() {
  return (
    <div className="tw:flex tw:items-center tw:gap-2 tw:px-1 tw:pb-2">
      <PillButton>Genesis 1:0</PillButton>
      <PillButton>A ▾</PillButton>
    </div>
  );
}

function MockSelect({ label, width = 'tw:w-full' }: { label: string; width?: string }) {
  return (
    <Select>
      <SelectTrigger className={`tw:h-8 ${width}`}>
        <SelectValue placeholder={label}>{label}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="placeholder">{label}</SelectItem>
      </SelectContent>
    </Select>
  );
}

function PanelHeader({ title }: { title?: string }) {
  return (
    <div className="tw:flex tw:items-center tw:justify-between tw:border-b tw:border-border tw:px-3 tw:py-2">
      <span className="tw:text-xs tw:font-semibold tw:tracking-wide tw:uppercase">{title}</span>
    </div>
  );
}

function EditorToolbar({ children }: { children: ReactNode }) {
  return (
    <div className="tw:flex tw:items-center tw:gap-1 tw:border-b tw:border-border tw:px-2 tw:py-1">
      {children}
    </div>
  );
}

function FootnotesSection({ children }: { children: ReactNode }) {
  return (
    <div className="tw:flex tw:max-h-56 tw:flex-col tw:gap-2 tw:overflow-auto tw:border-t tw:border-border tw:px-4 tw:py-3">
      <div className="tw:text-xs tw:font-semibold tw:tracking-wide tw:text-muted-foreground tw:uppercase">
        Footnotes
      </div>
      {children}
    </div>
  );
}

function Footnote({
  reference,
  marker,
  text,
}: {
  reference: string;
  marker: string;
  text: string;
}) {
  return (
    <div className="tw:text-sm tw:leading-relaxed">
      <span className="tw:font-semibold">{reference}</span>{' '}
      <span className="tw:text-muted-foreground">{marker}</span> {text}
    </div>
  );
}

function ColorChip({ className }: { className: string }) {
  return <span className={`tw:inline-block tw:size-4 tw:rounded-sm ${className}`} />;
}

/* ============================================================================
 * 10Power panel contents
 * ========================================================================== */

function ScriptureTextPanel() {
  return (
    <div className="tw:flex tw:h-full tw:flex-col">
      <ChapterAndScopeRow />
      <div className="tw:flex-1 tw:overflow-auto tw:rounded-md tw:bg-background tw:px-6 tw:py-4 tw:text-foreground">
        <div className="tw:text-xs tw:tracking-wide tw:text-muted-foreground tw:uppercase">
          <span className="tw:font-semibold tw:text-foreground">GEN</span> Hebrew WLC
          (OpenScriptures.org)
        </div>
        <div className="tw:mt-4 tw:flex tw:items-baseline tw:justify-end tw:text-3xl tw:font-semibold">
          1
        </div>
        <p
          dir="rtl"
          className="tw:mt-2 tw:text-right tw:font-serif tw:text-xl tw:leading-loose"
          lang="he"
        >
          בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃ וְהָאָ֗רֶץ הָיְתָ֥ה
          תֹ֙הוּ֙ וָבֹ֔הוּ וְחֹ֖שֶׁךְ עַל־פְּנֵ֣י תְה֑וֹם וְר֣וּחַ אֱלֹהִ֔ים
        </p>
      </div>
    </div>
  );
}

function ChecksPanelEmpty() {
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:gap-2 tw:p-1">
      <MockSelect label="OHEB/OGRK" />
      <MockSelect label="Chapter" />
      <MockSelect label="Checks (0 selected)" />
      <div className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:text-sm tw:text-muted-foreground">
        No checks selected
      </div>
    </div>
  );
}

function ChecksPanelWithResults() {
  const items = [
    { ref: 'GEN 6:14', code: '45cm:', msg: 'Invalid suffix: 45cm:' },
    { ref: 'GEN 6:14', code: '135m', msg: 'Invalid suffix: 135m' },
    { ref: 'GEN 6:15', code: '50cm', msg: 'Invalid suffix: 50cm' },
    { ref: 'GEN 6:16', code: '1cm', msg: 'Invalid suffix: 1cm' },
  ];
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:gap-2 tw:p-1">
      <MockSelect label="DBLP_SCHLA20…" />
      <MockSelect label="All" />
      <MockSelect label="Checks (14 selected)" />
      <div className="tw:flex tw:flex-1 tw:flex-col tw:gap-2 tw:overflow-auto tw:pe-1">
        {items.map((item) => (
          <div
            key={`${item.ref}-${item.code}`}
            className="tw:rounded-md tw:border tw:bg-background tw:p-2 tw:text-xs"
          >
            <div className="tw:font-medium">
              {item.ref} <span className="tw:text-muted-foreground">{item.code}</span>
            </div>
            <div className="tw:text-muted-foreground">{item.msg}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourceColumn({
  title,
  description,
  lang,
  text,
}: {
  title: string;
  description?: string;
  lang?: string;
  text: string;
}) {
  return (
    <div className="last:tw:border-e-0 tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-2 tw:border-e tw:border-border tw:p-3">
      <div className="tw:flex tw:items-center tw:justify-between">
        <span className="tw:text-sm tw:font-semibold">{title}</span>
        <Button variant="ghost" size="icon" className="tw:size-6">
          ⋮
        </Button>
      </div>
      {description ? (
        <div className="tw:text-xs tw:text-muted-foreground">{description}</div>
      ) : undefined}
      <div lang={lang} dir="ltr" className="tw:text-sm tw:leading-relaxed">
        {text}
      </div>
    </div>
  );
}

function ParallelResourcesPanel() {
  return (
    <div className="tw:flex tw:h-full tw:flex-col">
      <ChapterAndScopeRow />
      <div className="tw:flex tw:flex-1 tw:overflow-auto tw:rounded-md tw:bg-background">
        <ResourceColumn
          title="BDS"
          text="Au commencement, Dieu créa les cieux et la terre. La terre était informe et vide."
        />
        <ResourceColumn
          title="DBL_MB1840"
          description="GEN - Chinese Minorities Mongolian Bible 1840"
          lang="mn"
          text="ᠡᠬᠢᠨ ᠳᠦ ᠪᠤᠷᠬᠠᠨ ᠲᠡᠭᠷᠢ ᠭᠠᠵᠠᠷ ᠢ ᠡᠭᠦᠳᠦᠭᠰᠡᠨ ᠠᠵᠠᠢ᠃"
        />
        <ResourceColumn
          title="DBLP_SCHLA2000"
          lang="de"
          text="Am Anfang schuf Gott die Himmel und die Erde."
        />
        <ResourceColumn
          title="DBLR_GNB_NR_2000"
          lang="bo"
          text="ཐོག་མར་ལྷ་ནི་གནམ་ས་གཉིས་གསར་བཟོ་མཛད་པས།"
        />
      </div>
    </div>
  );
}

const DICTIONARY_ENTRIES = [
  { word: 'אֲדָמָה', count: 1, gloss: 'clay, earth, g…', codes: ['H0127', 'H0128'] },
  { word: 'אֱלֹהִים', count: 26, gloss: 'God, spirit of God, ex…', codes: ['H0430'] },
  { word: 'אֲשֶׁר', count: 7, gloss: 'how, that, when, whe…', codes: ['H0834'] },
  { word: 'אֶחָד', count: 2, gloss: 'one', codes: ['H0259'] },
  { word: 'אֶרֶץ', count: 15, gloss: 'area, country, earth, g…', codes: ['H0776'] },
  { word: 'אֵת', count: 13, gloss: '-', codes: ['H0853', 'H0854', 'H0855'] },
  { word: 'אָדָם', count: 2, gloss: 'human, hum…', codes: ['H0120', 'H0121'] },
  { word: 'אָכְלָה', count: 2, gloss: 'food', codes: ['H0402'] },
  { word: 'אוֹר', count: 4, gloss: 'light', codes: ['H0215'] },
];

function DictionaryPanel() {
  return (
    <div className="tw:flex tw:h-full tw:flex-col">
      <ChapterAndScopeRow />
      <div className="tw:flex tw:items-center tw:gap-2 tw:px-1 tw:pb-2">
        <MockSelect label="Curre…" width="tw:w-28" />
        <div className="tw:relative tw:flex-1">
          <Search className="tw:absolute tw:top-1/2 tw:left-2 tw:size-4 tw:-translate-y-1/2 tw:text-muted-foreground" />
          <Input placeholder="Searc…" className="tw:h-8 tw:ps-7" />
        </div>
      </div>
      <div className="tw:flex tw:flex-1 tw:flex-col tw:overflow-auto tw:rounded-md tw:bg-background">
        {DICTIONARY_ENTRIES.map((entry) => (
          <div
            key={entry.word}
            className="last:tw:border-b-0 tw:flex tw:items-center tw:gap-3 tw:border-b tw:border-border tw:px-3 tw:py-2"
          >
            <div className="tw:min-w-16 tw:text-right tw:font-serif tw:text-lg" lang="he" dir="rtl">
              {entry.word}
            </div>
            <div className="tw:w-6 tw:text-center tw:text-sm tw:font-medium tw:text-muted-foreground">
              {entry.count}
            </div>
            <div className="tw:flex-1 tw:truncate tw:text-sm">{entry.gloss}</div>
            <div className="tw:flex tw:flex-wrap tw:gap-1">
              {entry.codes.map((code) => (
                <span
                  key={code}
                  className="tw:rounded-sm tw:bg-muted tw:px-1.5 tw:py-0.5 tw:text-xs tw:text-muted-foreground"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarkersInventoryPanel() {
  const rows = [
    { m: 'id', c: '1', name: 'File Identification', status: 'OK' },
    { m: 'h', c: '1', name: 'Running Header', status: 'OK' },
    { m: 'mt1', c: '1', name: 'Main Title 1', status: 'OK' },
    { m: 'c', c: '50', name: 'Chapter Number', status: 'OK' },
    { m: 'v', c: '1213', name: 'Verse Number', status: 'OK' },
  ];
  return (
    <div className="tw:flex tw:h-full tw:flex-col">
      <ChapterAndScopeRow />
      <div className="tw:flex tw:items-center tw:gap-2 tw:px-1 tw:pb-2">
        <MockSelect label="All…" width="tw:w-24" />
        <MockSelect label="Curre…" width="tw:w-24" />
        <Input placeholder="Filter text…" className="tw:h-8 tw:flex-1" />
      </div>
      <div className="tw:flex tw:flex-1 tw:flex-col tw:overflow-auto tw:rounded-md tw:bg-background">
        <div className="tw:grid tw:grid-cols-[3rem_3rem_1fr_5rem] tw:gap-2 tw:border-b tw:border-border tw:px-3 tw:py-2 tw:text-xs tw:font-medium tw:text-muted-foreground">
          <span>M…</span>
          <span>C…</span>
          <span>Style Name</span>
          <span>Status</span>
        </div>
        {rows.map((row) => (
          <div
            key={`${row.m}-${row.c}`}
            className="last:tw:border-b-0 tw:grid tw:grid-cols-[3rem_3rem_1fr_5rem] tw:gap-2 tw:border-b tw:border-border tw:px-3 tw:py-2 tw:text-sm"
          >
            <span>{row.m}</span>
            <span>{row.c}</span>
            <span>{row.name}</span>
            <span className="tw:text-muted-foreground">{row.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
 * 10Simple panel contents
 * ========================================================================== */

function GnbScripturePanel() {
  return (
    <div className="tw:flex tw:h-full tw:flex-col">
      <PanelHeader title="Good News Bible (GNB)" />
      <EditorToolbar>
        <ToolbarIconButton>
          <Undo2 className="tw:size-4" />
        </ToolbarIconButton>
        <ToolbarIconButton>
          <Redo2 className="tw:size-4" />
        </ToolbarIconButton>
        <div className="tw:flex-1" />
        <ToolbarIconButton>
          <Shield className="tw:size-4" />
        </ToolbarIconButton>
      </EditorToolbar>
      <div className="tw:flex-1 tw:overflow-auto tw:bg-background tw:px-6 tw:py-4">
        <div className="tw:flex tw:items-baseline tw:gap-3">
          <span className="tw:text-xs tw:text-muted-foreground">\s1</span>
          <h2 className="tw:text-lg tw:font-semibold tw:tracking-wide tw:uppercase">
            The Word of Life
          </h2>
        </div>
        <p className="tw:mt-3 tw:text-base tw:leading-relaxed">
          <span className="tw:text-xs tw:text-muted-foreground">\p </span>
          <sup className="tw:text-xs">1</sup> In the beginning the Word already existed; the Word
          was with God, and the Word was God. <sup className="tw:text-xs">2</sup> From the very
          beginning the Word was with God. <sup className="tw:text-xs">3</sup> Through him God made
          all things; not one thing in all creation was made without him.{' '}
          <sup className="tw:text-xs">4</sup> The Word was the…
        </p>
      </div>
      <FootnotesSection>
        <Footnote
          reference="1:4"
          marker="\f"
          text="The Word was the source of life; or What was made had life in union with the Word."
        />
        <Footnote
          reference="1:21"
          marker="\f"
          text="the Prophet: The one who was expected to appear and announce the coming of the…"
        />
      </FootnotesSection>
    </div>
  );
}

function MarkersOnlyPanel() {
  const rows = [
    ['1', '2', '3', '4', '5'],
    ['6', '7', '8', '9'],
    ['10', '11', '12', '13'],
    ['14'],
    ['15'],
  ];
  return (
    <div className="tw:flex tw:h-full tw:flex-col">
      <div className="tw:flex-1 tw:overflow-auto tw:bg-background tw:px-6 tw:py-4">
        <div className="tw:flex tw:items-baseline tw:gap-3">
          <span className="tw:text-xs tw:text-muted-foreground">\s1</span>
          <h2 className="tw:text-lg tw:font-semibold tw:tracking-wide tw:uppercase">The Word of</h2>
        </div>
        <div className="tw:mt-4 tw:space-y-3 tw:text-sm">
          {rows.map((row) => (
            <div
              key={row.join('-')}
              className="tw:flex tw:flex-wrap tw:items-baseline tw:gap-x-4 tw:gap-y-1"
            >
              <span className="tw:text-xs tw:text-muted-foreground">\p</span>
              {row.map((v) => (
                <span key={v}>
                  <sup className="tw:text-xs">{v}</sup> …
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <FootnotesSection>
        <div className="tw:text-sm tw:text-muted-foreground tw:italic">No footnotes in John 1</div>
      </FootnotesSection>
    </div>
  );
}

function RightPanelHeader({ title, trailing }: { title?: ReactNode; trailing?: ReactNode }) {
  return (
    <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:px-3 tw:py-2">
      <div className="tw:flex tw:items-center tw:gap-2">{title}</div>
      <div className="tw:flex tw:items-center tw:gap-2">{trailing}</div>
    </div>
  );
}

function ScriptureTabContent() {
  return (
    <div className="tw:flex tw:h-full tw:flex-col">
      <div className="tw:px-3 tw:py-2">
        <Button
          variant="outline"
          size="sm"
          className="tw:h-8 tw:w-full tw:justify-between tw:rounded-md tw:px-3 tw:text-xs"
        >
          <span>GNT+ · Greek New Testament (Enha…</span>
          <span>▾</span>
        </Button>
      </div>
      <div
        lang="el"
        className="tw:flex-1 tw:space-y-4 tw:overflow-auto tw:bg-background tw:px-6 tw:py-4 tw:font-serif tw:text-lg tw:leading-loose"
      >
        <p>
          <sup className="tw:text-xs">1</sup> Ἐν ἀρχῇ ἦν ὁ Λόγος, καὶ ὁ Λόγος ἦν πρὸς τὸν Θεόν, καὶ
          Θεὸς ἦν ὁ Λόγος.
        </p>
        <p>
          <sup className="tw:text-xs">2</sup> Οὗτος ἦν ἐν ἀρχῇ πρὸς τὸν Θεόν.
        </p>
        <p>
          <sup className="tw:text-xs">3</sup> πάντα δι&rsquo; αὐτοῦ ἐγένετο, καὶ χωρὶς αὐτοῦ ἐγένετο
          οὐδὲ ἓν ὃ γέγονεν.
        </p>
      </div>
    </div>
  );
}

function TextCollectionTabContent() {
  const versions = [
    {
      code: 'NIV',
      name: 'New International Version',
      text: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
    },
    {
      code: 'ESV',
      name: 'English Standard Version',
      text: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
    },
    {
      code: 'NLT',
      name: 'New Living Translation',
      text: 'In the beginning the Word already existed. The Word was with God, and the Word was God.',
    },
  ];
  return (
    <div className="tw:flex tw:h-full tw:flex-col">
      <RightPanelHeader
        title={<span className="tw:text-sm tw:font-semibold">Text Collection</span>}
        trailing={
          <>
            <span className="tw:text-xs tw:text-muted-foreground">John 1:1</span>
            <ToolbarIconButton>
              <PenLine className="tw:size-4" />
            </ToolbarIconButton>
          </>
        }
      />
      <div className="tw:flex tw:flex-1 tw:flex-col tw:gap-3 tw:overflow-auto tw:px-3 tw:pb-3">
        {versions.map((v) => (
          <div key={v.code} className="tw:rounded-md tw:border tw:bg-background tw:p-3">
            <div className="tw:flex tw:items-baseline tw:gap-2 tw:text-sm">
              <span className="tw:font-bold">{v.code}</span>
              <span className="tw:text-muted-foreground">{v.name}</span>
            </div>
            <p className="tw:mt-2 tw:text-sm tw:leading-relaxed">{v.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SourceLanguageToolsTabContent() {
  type Cell = {
    id: string;
    greek: string;
    translit: string;
    gloss: string;
    highlight?: boolean;
  };
  const verse1Cells: Cell[] = [
    { id: 'v1-1', greek: 'Ἐν', translit: 'En', gloss: 'at' },
    { id: 'v1-2', greek: 'ἀρχῇ', translit: 'archē', gloss: 'beginning' },
    { id: 'v1-3', greek: 'ἦν', translit: 'ēn', gloss: 'be' },
    { id: 'v1-4', greek: 'ὁ', translit: 'ho', gloss: 'the' },
    { id: 'v1-5', greek: 'λόγος,', translit: 'logos', gloss: 'Word' },
    { id: 'v1-6', greek: 'καὶ', translit: 'kai', gloss: 'and' },
    { id: 'v1-7', greek: 'ὁ', translit: 'ho', gloss: 'the' },
    { id: 'v1-8', greek: 'λόγος', translit: 'logos', gloss: 'Word', highlight: true },
    { id: 'v1-9', greek: 'ἦν', translit: 'ēn', gloss: 'be' },
    { id: 'v1-10', greek: 'πρὸς', translit: 'pros', gloss: 'with' },
    { id: 'v1-11', greek: 'τὸν', translit: 'ton', gloss: 'the' },
    { id: 'v1-12', greek: 'θεόν,', translit: 'theon', gloss: 'God' },
    { id: 'v1-13', greek: 'καὶ', translit: 'kai', gloss: 'and' },
    { id: 'v1-14', greek: 'θεὸς', translit: 'theos', gloss: 'divine/God' },
    { id: 'v1-15', greek: 'ἦν', translit: 'ēn', gloss: 'be' },
    { id: 'v1-16', greek: 'ὁ', translit: 'ho', gloss: 'the' },
    { id: 'v1-17', greek: 'λόγος.', translit: 'logos.', gloss: 'Word' },
  ];
  const verse2Cells: Cell[] = [
    { id: 'v2-1', greek: 'οὗτος', translit: 'houtos', gloss: 'this' },
    { id: 'v2-2', greek: 'ἦν', translit: 'ēn', gloss: 'be' },
    { id: 'v2-3', greek: 'ἐν', translit: 'en', gloss: 'at' },
    { id: 'v2-4', greek: 'ἀρχῇ', translit: 'archē', gloss: 'beginning' },
    { id: 'v2-5', greek: 'πρὸς', translit: 'pros', gloss: 'with' },
    { id: 'v2-6', greek: 'τὸν', translit: 'ton', gloss: 'the' },
    { id: 'v2-7', greek: 'θεόν.', translit: 'theon.', gloss: 'God' },
  ];
  return (
    <div className="tw:flex tw:h-full tw:flex-col">
      <RightPanelHeader
        title={
          <>
            <span className="tw:text-sm tw:text-muted-foreground">α</span>
            <span className="tw:text-xs tw:font-semibold tw:tracking-wide tw:uppercase">
              Source Language Tools
            </span>
          </>
        }
        trailing={
          <>
            <Button variant="outline" size="sm" className="tw:h-7 tw:rounded-md tw:px-2 tw:text-xs">
              Greek New Testament ▾
            </Button>
            <span className="tw:text-xs tw:text-muted-foreground">John 1</span>
          </>
        }
      />
      <div className="tw:flex-1 tw:space-y-4 tw:overflow-auto tw:px-3 tw:pb-3">
        {[
          { verse: '1', cells: verse1Cells },
          { verse: '2', cells: verse2Cells },
        ].map((row) => (
          <div key={row.verse} className="tw:flex tw:items-start tw:gap-2 tw:font-serif">
            <sup className="tw:pt-1 tw:text-xs tw:font-semibold">{row.verse}</sup>
            <div className="tw:flex tw:flex-wrap tw:gap-4">
              {row.cells.map((cell) => (
                <div
                  key={cell.id}
                  className={`tw:flex tw:flex-col tw:items-center tw:rounded-md tw:px-1 tw:py-0.5 tw:text-center ${
                    cell.highlight ? 'tw:bg-accent' : ''
                  }`}
                >
                  <span className="tw:text-base tw:font-semibold" lang="el">
                    {cell.greek}
                  </span>
                  <span className="tw:text-[10px] tw:text-muted-foreground">{cell.translit}</span>
                  <span className="tw:text-[11px]">{cell.gloss}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommentsTabContent() {
  const comments = [
    {
      initials: 'JD',
      author: 'John Doe',
      when: '2h ago',
      ref: 'John 1:1',
      text: "Should we capitalize 'Word' here?",
    },
    {
      initials: 'AS',
      author: 'Alice Smith',
      when: '1h ago',
      ref: 'John 1:1',
      text: "I think 'Message' might be clearer for this audience.",
    },
  ];
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:gap-3 tw:px-3 tw:py-3">
      {comments.map((c) => (
        <div key={c.author} className="tw:rounded-md tw:border tw:bg-background tw:p-3">
          <div className="tw:flex tw:items-center tw:justify-between">
            <div className="tw:flex tw:items-center tw:gap-2">
              <span className="tw:flex tw:size-7 tw:items-center tw:justify-center tw:rounded-full tw:bg-muted tw:text-xs tw:font-semibold">
                {c.initials}
              </span>
              <span className="tw:text-sm tw:font-medium">{c.author}</span>
            </div>
            <span className="tw:text-xs tw:text-muted-foreground">{c.when}</span>
          </div>
          <p className="tw:mt-2 tw:text-sm">{c.text}</p>
          <div className="tw:mt-2 tw:text-xs tw:text-muted-foreground">{c.ref}</div>
        </div>
      ))}
    </div>
  );
}

function FindTabContent() {
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:gap-3 tw:px-3 tw:py-3">
      <Button
        variant="outline"
        size="sm"
        className="tw:h-8 tw:w-full tw:justify-between tw:rounded-md tw:px-3 tw:text-xs"
      >
        <span>Translation Project 1 (TP1)</span>
        <span>▾</span>
      </Button>
      <div className="tw:relative">
        <Search className="tw:absolute tw:top-1/2 tw:left-2 tw:size-4 tw:-translate-y-1/2 tw:text-muted-foreground" />
        <Input
          placeholder="Find in Translation Project 1 (TP1)…"
          className="tw:h-8 tw:rounded-full tw:ps-7 tw:text-xs"
        />
      </div>
      <div className="tw:flex tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:text-muted-foreground">
        <Search className="tw:size-10" />
        <span className="tw:text-sm">Find in Translation Project 1 (TP1)</span>
      </div>
    </div>
  );
}

function HandbookTabContent() {
  const entries = [
    {
      ref: 'John 1:1',
      text: "The opening verse of John's Gospel recalls the opening verse of Genesis. 'In the beginning' refers to the time before creation. The term 'Word' (Logos) was meaningful to both Jewish and Greek readers, conveying the idea of divine wisdom and creative power.",
    },
    {
      ref: 'John 1:2',
      text: 'This verse repeats the substance of verse 1 for emphasis. The Word was present with God at the very beginning. The repetition underscores the eternal nature of the Word and his intimate relationship with God.',
    },
  ];
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:gap-3 tw:px-3 tw:py-3">
      <Button
        variant="outline"
        size="sm"
        className="tw:h-8 tw:w-full tw:justify-between tw:rounded-md tw:px-3 tw:text-xs"
      >
        <span>UBS Handbook (HBKENG)</span>
        <span>▾</span>
      </Button>
      <div className="tw:flex tw:flex-1 tw:flex-col tw:gap-4 tw:overflow-auto">
        {entries.map((e) => (
          <div key={e.ref}>
            <div className="tw:text-sm tw:font-semibold tw:text-muted-foreground">{e.ref}</div>
            <p className="tw:mt-1 tw:text-sm tw:leading-relaxed">{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GreekTermsTabContent() {
  const terms = [
    {
      head: 'Logos',
      body: "Word, speech, divine utterance, analogy. In John 1, a title for Jesus Christ, conveying his role as God's self-expression and the agent of creation.",
    },
    {
      head: 'Phos',
      body: "Light. Used metaphorically for truth, holiness, and divine revelation. Contrasted with darkness (skotia) throughout John's Gospel.",
    },
  ];
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:gap-3 tw:px-3 tw:py-3">
      <div className="tw:relative">
        <Search className="tw:absolute tw:top-1/2 tw:left-2 tw:size-4 tw:-translate-y-1/2 tw:text-muted-foreground" />
        <Input
          placeholder="Search Greek terms…"
          className="tw:h-8 tw:rounded-full tw:ps-7 tw:text-xs"
        />
      </div>
      <div className="tw:flex tw:flex-1 tw:flex-col tw:gap-4 tw:overflow-auto">
        {terms.map((t) => (
          <div key={t.head} className="last:tw:border-b-0 tw:border-b tw:border-border tw:pb-3">
            <div className="tw:text-base tw:font-semibold">{t.head}</div>
            <p className="tw:mt-1 tw:text-sm tw:leading-relaxed">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SourceTermRenderingsTabContent() {
  const rows = [
    { source: 'Word', translit: 'Logos', rendering: 'Word', count: 4, status: 'ok' },
    { source: 'Light', translit: 'Phos', rendering: 'Light', count: 6, status: 'ok' },
    { source: 'Darkness', translit: 'Skotia', rendering: '—', count: 2, status: 'warn' },
    { source: 'Life', translit: 'Zoe', rendering: 'Life', count: 3, status: 'ok' },
  ];
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:px-3 tw:py-3">
      <div className="tw:grid tw:grid-cols-[1fr_1fr_2.5rem_3rem] tw:gap-2 tw:border-b tw:border-border tw:pb-2 tw:text-[10px] tw:font-semibold tw:tracking-wide tw:text-muted-foreground tw:uppercase">
        <span>Source Term</span>
        <span>Rendering (Project)</span>
        <span>#</span>
        <span>Status</span>
      </div>
      <div className="tw:flex tw:flex-1 tw:flex-col tw:divide-y tw:overflow-auto">
        {rows.map((row) => (
          <div
            key={row.source}
            className="tw:grid tw:grid-cols-[1fr_1fr_2.5rem_3rem] tw:items-center tw:gap-2 tw:py-3 tw:text-sm"
          >
            <div>
              <div className="tw:font-semibold">{row.source}</div>
              <div className="tw:text-xs tw:text-muted-foreground tw:italic">{row.translit}</div>
            </div>
            <div>{row.rendering}</div>
            <div className="tw:text-muted-foreground">{row.count}</div>
            <div>
              <span
                className={`tw:inline-block tw:size-3 tw:rounded-full ${
                  row.status === 'ok' ? 'tw:bg-emerald-500' : 'tw:bg-amber-500'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderTabContent({ label }: { label: string }) {
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-2 tw:text-muted-foreground">
      <GitBranch className="tw:size-10" />
      <span className="tw:text-sm">{label}</span>
    </div>
  );
}

function AiAssistantTabContent() {
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:gap-3 tw:px-3 tw:py-3">
      <div className="tw:flex tw:justify-end">
        <span className="tw:rounded-full tw:bg-accent tw:px-3 tw:py-1.5 tw:text-sm">
          Explain logos in John 1:1
        </span>
      </div>
      <div className="tw:rounded-md tw:border tw:bg-background tw:p-3">
        <div className="tw:flex tw:items-center tw:gap-2 tw:text-xs tw:font-semibold tw:tracking-wide tw:text-muted-foreground tw:uppercase">
          <Sparkles className="tw:size-3.5" /> AI Assistant
        </div>
        <p className="tw:mt-2 tw:text-sm tw:leading-relaxed">
          In John 1:1, &lsquo;Logos&rsquo; (translated as &lsquo;Word&rsquo;) refers to Jesus as the
          self-expression of God. It connects to both Jewish wisdom literature and Greek philosophy,
          presenting Jesus as the eternal, creative, and communicative power of God.
        </p>
      </div>
    </div>
  );
}

function ChecksTabContent() {
  const items = [
    { ref: 'John 1:23', title: 'Empty verse', tag: 'Chapter/Verse Numbers' },
    {
      ref: 'John 1:0 U+202F (Narrow No-Break Space)',
      title: 'Invalid or unknown whitespace or invisible character: U+202F (Narrow No-Break Space)',
    },
  ];
  return (
    <div className="tw:flex tw:h-full tw:flex-col tw:gap-3 tw:px-3 tw:py-3">
      <div className="tw:flex tw:items-center tw:gap-2">
        <Button
          variant="outline"
          size="sm"
          className="tw:h-8 tw:flex-1 tw:justify-between tw:rounded-md tw:px-3 tw:text-xs"
        >
          <span>Chapter</span>
          <span>▾</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="tw:h-8 tw:flex-1 tw:justify-between tw:rounded-md tw:px-3 tw:text-xs"
        >
          <span>Checks (6 selected)</span>
          <span>▾</span>
        </Button>
      </div>
      <div className="tw:flex tw:flex-1 tw:flex-col tw:gap-2 tw:overflow-auto">
        {items.map((it) => (
          <div
            key={it.ref}
            className="tw:flex tw:flex-col tw:gap-2 tw:rounded-md tw:border tw:bg-background tw:p-3"
          >
            <div className="tw:flex tw:items-start tw:justify-between tw:gap-2">
              <span className="tw:text-xs tw:font-semibold tw:text-muted-foreground">{it.ref}</span>
              <span className="tw:text-muted-foreground">⋯</span>
            </div>
            <div className="tw:text-sm">{it.title}</div>
            {it.tag ? (
              <Button
                variant="secondary"
                size="sm"
                className="tw:h-7 tw:self-start tw:rounded-md tw:px-3 tw:text-xs"
              >
                {it.tag}
              </Button>
            ) : undefined}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
 * Chrome bars
 * ========================================================================== */

function PowerChromeBar() {
  return (
    <div className="tw:flex tw:h-10 tw:shrink-0 tw:items-center tw:gap-2 tw:px-3 tw:text-sm">
      <div className="tw:flex tw:size-6 tw:items-center tw:justify-center tw:rounded tw:bg-primary tw:text-primary-foreground">
        <span className="tw:text-xs tw:font-bold">P</span>
      </div>
      <span className="tw:px-2">Paratext</span>
      <span className="tw:px-2">Help</span>
      <div className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:gap-2">
        <Button variant="ghost" size="icon" className="tw:size-7">
          <Home className="tw:size-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="tw:h-7 tw:w-48 tw:justify-center tw:rounded-full tw:text-xs"
        >
          Genesis 1:0
        </Button>
        <Button variant="outline" size="sm" className="tw:h-7 tw:rounded-full tw:px-3 tw:text-xs">
          A ▾
        </Button>
      </div>
      <div className="tw:flex tw:items-center tw:gap-1">
        <Button variant="ghost" size="icon" className="tw:size-7">
          <Moon className="tw:size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="tw:size-7">
          <Network className="tw:size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="tw:size-7">
          <User className="tw:size-4" />
        </Button>
        <span className="tw:ms-2 tw:px-1 tw:text-muted-foreground">_</span>
        <span className="tw:px-1 tw:text-muted-foreground">▢</span>
        <span className="tw:px-1 tw:text-muted-foreground">✕</span>
      </div>
    </div>
  );
}

function SimpleChromeBar() {
  return (
    <div className="tw:flex tw:h-10 tw:shrink-0 tw:items-center tw:gap-2 tw:border-b tw:border-border tw:bg-muted tw:px-3 tw:text-sm">
      <div className="tw:flex tw:items-center tw:gap-2">
        <BookOpen className="tw:size-4" />
        <span className="tw:font-medium">Paratext 10</span>
      </div>
      <div className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:gap-2">
        <Button variant="ghost" size="sm" className="tw:h-7 tw:rounded-md tw:px-3 tw:text-xs">
          Translation Project 1 (TP1) ▾
        </Button>
        <Button variant="outline" size="sm" className="tw:h-7 tw:rounded-full tw:px-3 tw:text-xs">
          <RefreshCw className="tw:me-1 tw:size-3" />
          Syncing 4/6…
        </Button>
        <Button variant="ghost" size="sm" className="tw:h-7 tw:rounded-md tw:px-3 tw:text-xs">
          John 1 ▾
        </Button>
        <Button variant="ghost" size="icon" className="tw:size-7">
          <ArrowLeft className="tw:size-4" />
        </Button>
      </div>
      <div className="tw:flex tw:items-center tw:gap-2">
        <Button variant="ghost" size="icon" className="tw:size-7">
          <Plus className="tw:size-4" />
        </Button>
        <div className="tw:flex tw:items-center tw:gap-1">
          <ColorChip className="tw:bg-muted-foreground/40" />
          <ColorChip className="tw:bg-muted-foreground/30" />
          <ColorChip className="tw:bg-muted-foreground/20" />
        </div>
        <Button variant="ghost" size="sm" className="tw:h-7 tw:rounded-md tw:px-2 tw:text-xs">
          View ▾
        </Button>
      </div>
    </div>
  );
}

function SidebarButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="tw:flex tw:w-full tw:flex-col tw:items-center tw:gap-1 tw:rounded-md tw:px-2 tw:py-2 tw:text-[10px] tw:text-muted-foreground tw:hover:bg-accent tw:hover:text-foreground"
    >
      <span className="tw:flex tw:size-5 tw:items-center tw:justify-center">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function LeftSidebar() {
  return (
    <div className="tw:flex tw:w-16 tw:shrink-0 tw:flex-col tw:items-stretch tw:gap-1 tw:border-e tw:border-border tw:bg-muted tw:py-2">
      <SidebarButton icon={<RefreshCw className="tw:size-4" />} label="Sync" />
      <div className="tw:flex-1" />
      <SidebarButton icon={<CircleHelp className="tw:size-4" />} label="Help" />
      <SidebarButton icon={<User className="tw:size-4" />} label="Profile" />
    </div>
  );
}

/* ============================================================================
 * Layout data — declared once, reused by both stories.
 * `as` is needed because rc-dock's narrow `LayoutData` union doesn't infer well
 * from object literals; this matches the pattern in the platform-dock-layout story.
 * ========================================================================== */
/* eslint-disable no-type-assertion/no-type-assertion */

export const POWER_LAYOUT: LayoutData = {
  dockbox: {
    mode: 'horizontal' as DockMode,
    children: [
      {
        mode: 'vertical',
        size: 300,
        children: [
          {
            group: TAB_GROUP,
            tabs: [
              {
                id: 'oheb-ogrk-1',
                title: 'OHEB/OGRK',
                content: <ScriptureTextPanel />,
                group: TAB_GROUP,
              },
            ] as TabData[],
          },
          {
            group: TAB_GROUP,
            tabs: [
              {
                id: 'oheb-ogrk-2',
                title: 'OHEB/OGRK',
                content: <ScriptureTextPanel />,
                group: TAB_GROUP,
              },
            ] as TabData[],
          },
        ],
      },
      {
        mode: 'vertical',
        size: 280,
        children: [
          {
            group: TAB_GROUP,
            tabs: [
              {
                id: 'checks-empty',
                title: 'Checks',
                content: <ChecksPanelEmpty />,
                group: TAB_GROUP,
              },
            ] as TabData[],
          },
          {
            group: TAB_GROUP,
            tabs: [
              {
                id: 'checks-results',
                title: 'Checks',
                content: <ChecksPanelWithResults />,
                group: TAB_GROUP,
              },
            ] as TabData[],
          },
        ],
      },
      {
        mode: 'vertical',
        size: 540,
        children: [
          {
            group: TAB_GROUP,
            tabs: [
              {
                id: 'parallel-resources',
                title: 'BDS, DBL_MB1840, DBLP_SCHLA2000, DBLR_GNB_NR_2000',
                content: <ParallelResourcesPanel />,
                group: TAB_GROUP,
              },
            ] as TabData[],
          },
          {
            group: TAB_GROUP,
            tabs: [
              {
                id: 'markers-inventory',
                title: 'Markers Inventory: HPUXK',
                content: <MarkersInventoryPanel />,
                group: TAB_GROUP,
              },
            ] as TabData[],
          },
        ],
      },
      {
        group: TAB_GROUP,
        size: 360,
        tabs: [
          {
            id: 'dictionary',
            title: 'Dictionary: SDBH/SDBG',
            content: <DictionaryPanel />,
            group: TAB_GROUP,
          },
        ] as TabData[],
      },
    ],
  },
};

const rightPanelTabs: TabData[] = [
  {
    id: 'right-scripture',
    title: (
      <IconTab>
        <BookOpen className="tw:size-4" />
      </IconTab>
    ),
    content: <ScriptureTabContent />,
    group: TAB_GROUP,
  },
  {
    id: 'right-text-collection',
    title: (
      <IconTab>
        <Library className="tw:size-4" />
      </IconTab>
    ),
    content: <TextCollectionTabContent />,
    group: TAB_GROUP,
  },
  {
    id: 'right-source-language',
    title: (
      <IconTab>
        <PenLine className="tw:size-4" />
      </IconTab>
    ),
    content: <SourceLanguageToolsTabContent />,
    group: TAB_GROUP,
  },
  {
    id: 'right-comments',
    title: (
      <IconTab>
        <MessageSquare className="tw:size-4" />
      </IconTab>
    ),
    content: <CommentsTabContent />,
    group: TAB_GROUP,
  },
  {
    id: 'right-find',
    title: (
      <IconTab>
        <Search className="tw:size-4" />
      </IconTab>
    ),
    content: <FindTabContent />,
    group: TAB_GROUP,
  },
  {
    id: 'right-handbook',
    title: (
      <IconTab>
        <FileText className="tw:size-4" />
      </IconTab>
    ),
    content: <HandbookTabContent />,
    group: TAB_GROUP,
  },
  {
    id: 'right-greek-terms',
    title: (
      <IconTab>
        <BookType className="tw:size-4" />
      </IconTab>
    ),
    content: <GreekTermsTabContent />,
    group: TAB_GROUP,
  },
  {
    id: 'right-source-term',
    title: (
      <IconTab>
        <Cross className="tw:size-4" />
      </IconTab>
    ),
    content: <SourceTermRenderingsTabContent />,
    group: TAB_GROUP,
  },
  {
    id: 'right-branch',
    title: (
      <IconTab>
        <GitBranch className="tw:size-4" />
      </IconTab>
    ),
    content: <PlaceholderTabContent label="Cross references" />,
    group: TAB_GROUP,
  },
  {
    id: 'right-ai',
    title: (
      <IconTab>
        <Sparkles className="tw:size-4" />
      </IconTab>
    ),
    content: <AiAssistantTabContent />,
    group: TAB_GROUP,
  },
  {
    id: 'right-checks',
    title: (
      <IconTab>
        <ClipboardList className="tw:size-4" />
      </IconTab>
    ),
    content: <ChecksTabContent />,
    group: TAB_GROUP,
  },
];

export const SIMPLE_LAYOUT: LayoutData = {
  dockbox: {
    mode: 'horizontal' as DockMode,
    children: [
      {
        group: HEADLESS_GROUP,
        size: 420,
        tabs: [
          {
            id: 'gnb-scripture',
            title: 'GNB',
            content: <GnbScripturePanel />,
            group: HEADLESS_GROUP,
          },
        ] as TabData[],
      },
      {
        group: HEADLESS_GROUP,
        size: 320,
        tabs: [
          {
            id: 'markers-only',
            title: 'Markers',
            content: <MarkersOnlyPanel />,
            group: HEADLESS_GROUP,
          },
        ] as TabData[],
      },
      {
        group: TAB_GROUP,
        size: 460,
        tabs: rightPanelTabs,
      },
    ],
  },
};

/* eslint-enable no-type-assertion/no-type-assertion */

/* ============================================================================
 * Assembled views — stories choose one and optionally wrap with padding.
 * ========================================================================== */

export function TenPowerView({ paddedDock = true }: { paddedDock?: boolean }) {
  return (
    <div className="tw:flex tw:h-full tw:w-full tw:flex-col tw:bg-background tw:text-foreground">
      <PowerChromeBar />
      {/* The dock-area wrapper provides the outer padding (when enabled). Since
       * rc-dock dividers are transparent, the space between panels shows this
       * same wrapper's background — so outer padding and inter-panel gaps
       * always share the same color. */}
      <div className={`tw:flex tw:min-h-0 tw:flex-1 ${paddedDock ? 'tw:px-2 tw:pb-2' : ''}`}>
        <DockLayout
          defaultLayout={POWER_LAYOUT}
          groups={POWER_GROUPS}
          style={dockStyle}
          dropMode="edge"
        />
      </div>
    </div>
  );
}

export function TenSimpleView() {
  return (
    <div className="tw:flex tw:h-full tw:w-full tw:flex-col tw:bg-background tw:text-foreground">
      <style>{HEADLESS_STYLE}</style>
      <SimpleChromeBar />
      <div className="tw:flex tw:min-h-0 tw:flex-1">
        <LeftSidebar />
        {/* `dropMode` intentionally omitted so tabs can't be dropped onto panel edges. */}
        <DockLayout defaultLayout={SIMPLE_LAYOUT} groups={SIMPLE_GROUPS} style={dockStyle} />
      </div>
    </div>
  );
}
