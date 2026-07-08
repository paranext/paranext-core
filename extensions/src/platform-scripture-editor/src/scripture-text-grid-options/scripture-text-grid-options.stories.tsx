import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useMemo, useState } from 'react';
import type { DblResourceReference } from 'platform-scripture';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { ScriptureTextGridOptions } from './scripture-text-grid-options.component';
import { SCRIPTURE_TEXT_GRID_OPTIONS_STRING_KEYS } from './scripture-text-grid-options.types';
import type {
  ScriptureTextGridViewMode,
  ViewOptionsTextEntry,
} from './scripture-text-grid-options.types';

/**
 * The reusable View Options inner component: a VIEW toggle (Verse / Chapter), a TEXTS list split
 * into an admin-shared top section and a user bottom section, and a Get Resources button. In the
 * app it renders inside the Scripture Text Grid popover (A5); the PT-4039 share-layout dialog
 * renders the same component. These stories drive it with local state so every interaction works
 * without a backend.
 *
 * **Try it**: toggle the checkboxes, hover a user row to reveal the remove (✕) button, and click
 * Get Resources. Chapter is disabled with a "coming soon" hint until its renderer ships
 * (B4/PT-4062).
 */
const meta: Meta<typeof ScriptureTextGridOptions> = {
  title: 'Bundled Extensions/platform-scripture-editor/ScriptureTextGridOptions',
  component: ScriptureTextGridOptions,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ScriptureTextGridOptions>;

const localizedStrings = getLocalizedStrings([...SCRIPTURE_TEXT_GRID_OPTIONS_STRING_KEYS]);

const dblRef = (id: string, name: string): DblResourceReference => ({
  type: 'dblResource',
  name,
  id,
});

const ADMIN_ROWS: ViewOptionsTextEntry[] = [
  { reference: dblRef('esv', 'ESV'), checked: true, isAdminLocked: true, isUserRemovable: false },
  { reference: dblRef('niv', 'NIV'), checked: false, isAdminLocked: true, isUserRemovable: false },
];

const USER_ROWS: ViewOptionsTextEntry[] = [
  {
    reference: dblRef('web', 'World English Bible'),
    checked: true,
    isAdminLocked: false,
    isUserRemovable: true,
  },
  // An admin-owned resource the user opted out of — sits in the bottom section but is NOT removable.
  {
    reference: dblRef('kjv', 'KJV'),
    checked: false,
    isAdminLocked: false,
    isUserRemovable: false,
  },
];

/** Interactive harness: holds the view mode + row checked-state locally. */
function Harness({
  initialTop,
  initialBottom,
  isChapterEnabled = false,
  installingResourceNames,
}: {
  initialTop: ViewOptionsTextEntry[];
  initialBottom: ViewOptionsTextEntry[];
  isChapterEnabled?: boolean;
  installingResourceNames?: string[];
}) {
  const [viewMode, setViewMode] = useState<ScriptureTextGridViewMode>('verse');
  const [top, setTop] = useState(initialTop);
  const [bottom, setBottom] = useState(initialBottom);

  const setChecked = (resourceId: string, checked: boolean) => {
    const apply = (rows: ViewOptionsTextEntry[]) =>
      rows.map((row) => (row.reference.id === resourceId ? { ...row, checked } : row));
    setTop(apply);
    setBottom(apply);
  };

  return useMemo(
    () => (
      <ScriptureTextGridOptions
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isChapterEnabled={isChapterEnabled}
        top={top}
        bottom={bottom}
        installingResourceNames={installingResourceNames}
        onCheckedChange={setChecked}
        onRemoveFromList={(id) => setBottom((rows) => rows.filter((r) => r.reference.id !== id))}
        onGetResources={() => {}}
        localizedStrings={localizedStrings}
      />
    ),
    [viewMode, top, bottom, isChapterEnabled, installingResourceNames],
  );
}

/** Regular user (Saroj): admin-shared texts on top (no ✕), the user's own additions below (hover ✕). */
export const UserView: Story = {
  render: () => <Harness initialTop={ADMIN_ROWS} initialBottom={USER_ROWS} />,
};

/** No personal additions yet — the bottom section is empty (blank, per UX). */
export const EmptyBottom: Story = {
  render: () => <Harness initialTop={ADMIN_ROWS} initialBottom={[]} />,
};

/** A fresh project with nothing configured — direction to Get Resources. */
export const Empty: Story = {
  render: () => <Harness initialTop={[]} initialBottom={[]} />,
};

/** A resource is installing after a Get Resources pick — shown as an "Installing {name}…" row. */
export const Installing: Story = {
  render: () => (
    <Harness
      initialTop={ADMIN_ROWS}
      initialBottom={USER_ROWS}
      installingResourceNames={['Berean Standard Bible']}
    />
  ),
};

/** With Chapter enabled (the state A4/PT-4062 unlock) — both modes selectable, no "coming soon". */
export const ChapterEnabled: Story = {
  render: () => <Harness initialTop={ADMIN_ROWS} initialBottom={USER_ROWS} isChapterEnabled />,
};
