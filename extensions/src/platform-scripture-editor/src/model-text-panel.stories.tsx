import { usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Dialog, DialogContent } from 'platform-bible-react';
import {
  ResourcePickerDialog,
  RESOURCE_PICKER_DIALOG_STRING_KEYS,
} from 'platform-bible-react/experimental';
import type { DblResourceData } from 'platform-bible-utils';
import type {
  DblResourceReference,
  EffectiveResourceReference,
  EffectiveResourceReferenceList,
} from 'platform-scripture';
import { useCallback, useMemo, useRef, useState } from 'react';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
// The editor's USJ node styling. The real app loads these globally; Storybook doesn't, so without
// them the editor's context menu is unstyled and its read-only marker toolbar renders as a stray
// inline label. We import the same icon-free subset the editorial layout stories used
// (editor.css/editor-overrides.css were skipped because they previously referenced toolbar icon
// SVGs by absolute URL that the css-loader couldn't resolve but have now been cleaned up and can be
// used; the minimal wrapper styles are inlined in EDITOR_WRAPPER_STYLE below).
/* eslint-disable import/no-relative-packages -- these editor demo CSS files are not part of
   platform-bible-react's package exports (only `.` → dist is exported), so they can only be pulled
   in by relative path; this mirrors src/stories/platform/ten-layout-shared.tsx. */
import '../../../../lib/platform-bible-react/src/components/demo/scripture-editor/usj-nodes.css';
/* eslint-enable import/no-relative-packages */
import { ModelTextPanel, MODEL_TEXT_PANEL_STRING_KEYS } from './model-text-panel.component';

/**
 * Icon-free subset of the editor's wrapper styles (from the platform scripture-editor
 * `editor.css`). Crucially it hides the read-only toolbar container — otherwise the editor's
 * current-marker label (e.g. "p - Paragraph - Normal - First Line Indent") shows as stray text
 * above the editor.
 */
const EDITOR_WRAPPER_STYLE = `
  .editor-container { color: inherit; position: relative; line-height: 20px; font-weight: 400; text-align: start; }
  .editor-toolbar-container-readonly { display: none; }
  .editor-toolbar-container-editable { display: inline; }
  .editor-inner { position: relative; }
  .editor-input { min-height: 150px; font-size: 15px; position: relative; tab-size: 1; outline: 0; padding: 15px 10px; flex: auto; }
  .editor-input > p { direction: inherit; margin-top: 0; margin-bottom: 0; line-height: 1.5; }
  .editor-text-bold { font-weight: bold; }
  .editor-text-italic { font-style: italic; }
  .editor-text-underline { text-decoration: underline; }
`;

/**
 * `ModelTextPanel` shows a project's configured "model text" Scripture resource read-only. It owns
 * the orchestration (resolve configured model text → match a DBL resource → auto-install → load
 * USJ); the webview feeds it PAPI in the app. These stories feed it from a thin in-memory service
 * so the flow is fully interactive: pick a model text via the REAL resource picker, watch it
 * install, then render in the editor.
 */

const localizedStrings = getLocalizedStrings([...MODEL_TEXT_PANEL_STRING_KEYS]);
const pickerStrings = getLocalizedStrings([...RESOURCE_PICKER_DIALOG_STRING_KEYS]);

const sampleUsj = usxStringToUsj(`<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="GEN" style="id">World English Bible (WEB)</book>
  <chapter number="1" style="c" sid="GEN 1" />
  <para style="p">
    <verse number="1" style="v" sid="GEN 1:1" />In the beginning, God created the heavens and the earth.<verse eid="GEN 1:1" /></para>
</usx>
`);

const DATA_VERSION = '1.0.0';

const seedResources: DblResourceData[] = [
  {
    dblEntryUid: 'uid-web',
    displayName: 'WEB',
    fullName: 'World English Bible',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1200,
    installed: true,
    updateAvailable: false,
    projectId: 'project-web',
  },
  {
    dblEntryUid: 'uid-asv',
    displayName: 'ASV',
    fullName: 'American Standard Version',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1100,
    installed: false,
    updateAvailable: false,
    projectId: 'project-asv',
  },
];

const dblRef = (resource: DblResourceData): DblResourceReference => ({
  type: 'dblResource',
  id: resource.dblEntryUid,
  name: resource.displayName,
});

type DecoratorConfig = {
  /** Initially-configured model text refs (admin-level). */
  initialAdmin?: DblResourceReference[];
  /** Resource list seed. */
  resources?: DblResourceData[];
  /** Whether the panel has a project. */
  hasProject?: boolean;
  /** Whether the user can write admin settings. */
  canWriteProjectSettings?: boolean;
  /** Disable install so the Installing state is observable (otherwise it auto-completes). */
  disableInstall?: boolean;
};

/**
 * Thin in-memory service container: holds the resources + the admin/user model-text lists, derives
 * the effective list, mutates state on install/select so the panel updates, and wires the real
 * ResourcePickerDialog for `showResourcePicker`.
 */
function ModelTextPanelHarness({ config }: { config: DecoratorConfig }) {
  const [resources, setResources] = useState<DblResourceData[]>(config.resources ?? seedResources);
  const [adminItems, setAdminItems] = useState<DblResourceReference[]>(config.initialAdmin ?? []);
  const [userItems, setUserItems] = useState<DblResourceReference[]>([]);
  const [scrRef, setScrRef] = useState<SerializedVerseRef>({
    book: 'GEN',
    chapterNum: 1,
    verseNum: 1,
  });

  const effectiveModelTexts = useMemo<EffectiveResourceReferenceList>(
    () => ({
      dataVersion: DATA_VERSION,
      items: [
        ...adminItems.map((r): EffectiveResourceReference => ({ ...r, source: 'admin' })),
        ...userItems.map((r): EffectiveResourceReference => ({ ...r, source: 'user' })),
      ],
    }),
    [adminItems, userItems],
  );

  // Resource picker wiring: showResourcePicker opens the real dialog and resolves on Use/cancel.
  const pickerResolveRef = useRef<((r: DblResourceData | undefined) => void) | undefined>(
    undefined,
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerSelectedIds, setPickerSelectedIds] = useState<string[]>([]);

  const showResourcePicker = useCallback((selectedResourceIds: string[]) => {
    setPickerSelectedIds(selectedResourceIds);
    setPickerOpen(true);
    return new Promise<DblResourceData | undefined>((resolve) => {
      pickerResolveRef.current = resolve;
    });
  }, []);

  const resolvePicker = useCallback((resource?: DblResourceData) => {
    setPickerOpen(false);
    pickerResolveRef.current?.(resource);
    pickerResolveRef.current = undefined;
  }, []);

  return (
    <>
      <style>{EDITOR_WRAPPER_STYLE}</style>
      <ModelTextPanel
        localizedStrings={localizedStrings}
        hasProject={config.hasProject ?? true}
        effectiveModelTexts={effectiveModelTexts}
        isEffectiveModelTextsLoading={false}
        dblResources={resources}
        isLoadingResources={false}
        adminModelTexts={{ dataVersion: DATA_VERSION, items: adminItems }}
        getCanWriteProjectSettings={async () => config.canWriteProjectSettings ?? true}
        getUserModelTexts={async () => undefined}
        scrRef={scrRef}
        onScrRefChange={setScrRef}
        installResource={async (uid) => {
          if (config.disableInstall) return;
          setResources((rs) =>
            rs.map((r) => (r.dblEntryUid === uid ? { ...r, installed: true } : r)),
          );
        }}
        setAdminModelTexts={(list) => {
          // Settings write — log it, then reflect it so the panel updates (thin CRUD).
          // eslint-disable-next-line no-console
          console.log('setAdminModelTexts', list);
          setAdminItems(
            list.items.filter((i): i is DblResourceReference => i.type === 'dblResource'),
          );
        }}
        setUserModelTexts={async (list) => {
          // Settings write — log it, then reflect it so the panel updates (thin CRUD).
          // eslint-disable-next-line no-console
          console.log('setUserModelTexts', list);
          setUserItems(
            list.items.filter((i): i is DblResourceReference => i.type === 'dblResource'),
          );
        }}
        showResourcePicker={showResourcePicker}
        getResourceChapter={async () => ({ usj: sampleUsj, textDirection: 'ltr' })}
      />
      <Dialog
        open={pickerOpen}
        onOpenChange={(open) => {
          if (!open) resolvePicker(undefined);
        }}
      >
        <DialogContent>
          <ResourcePickerDialog
            allResources={resources}
            resourceType="ScriptureResource"
            selectedResourceIds={pickerSelectedIds}
            localizedStrings={pickerStrings}
            onSelect={(resource) => resolvePicker(resource)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

const meta: Meta<typeof ModelTextPanel> = {
  title: 'Bundled Extensions/platform-scripture-editor/ModelTextPanel',
  component: ModelTextPanel,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ModelTextPanel>;

function createDecorator(config: DecoratorConfig) {
  return function ModelTextPanelDecorator() {
    return <ModelTextPanelHarness config={config} />;
  };
}

/** A model text is configured and installed — the read-only editor shows it. */
export const Active: Story = {
  decorators: [createDecorator({ initialAdmin: [dblRef(seedResources[0])] })],
};

/**
 * No model text configured. Click "pick model text" to open the REAL resource picker; choosing the
 * uninstalled ASV installs it and then renders it — fully interactive.
 */
export const NoModelText: Story = {
  decorators: [createDecorator({})],
};

/** A configured resource that is still installing (install disabled so the state is observable). */
export const Installing: Story = {
  decorators: [createDecorator({ initialAdmin: [dblRef(seedResources[1])], disableInstall: true })],
};

/** The configured model text id isn't present in the DBL list. */
export const UnknownResource: Story = {
  decorators: [
    createDecorator({
      initialAdmin: [{ type: 'dblResource', id: 'uid-missing', name: 'Missing' }],
    }),
  ],
};

/** The panel was opened without a project id. */
export const NoProject: Story = {
  decorators: [createDecorator({ hasProject: false })],
};

/** A non-admin user picks a model text — it persists at the user level (logged to console). */
export const NonAdminPick: Story = {
  decorators: [createDecorator({ canWriteProjectSettings: false })],
};
