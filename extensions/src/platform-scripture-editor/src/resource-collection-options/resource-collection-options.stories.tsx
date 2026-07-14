import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useMemo, useState } from 'react';
import type { DblResourceReference } from 'platform-scripture';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { ResourceCollectionOptions } from './resource-collection-options.component';
import { RESOURCE_COLLECTION_OPTIONS_STRING_KEYS } from './resource-collection-options.types';
import type {
  ResourceCollectionViewMode,
  ViewOptionsTextEntry,
} from './resource-collection-options.types';

/**
 * The reusable View Options inner component: a VIEW toggle (Verse / Chapter), a TEXTS list split
 * into an admin-shared top section and a user bottom section, and a Get Resources button. In the
 * app it renders inside the Scripture Text Grid popover; a separate share-layout dialog renders the
 * same component. These stories drive it with local state so every interaction works without a
 * backend.
 *
 * **Try it**: toggle the checkboxes, hover a user row to reveal the remove (✕) button, hover an
 * admin-shared (top-section) row to reveal its "shared by administrator" lock, and click Get
 * Resources. Chapter is disabled with a "coming soon" hint until its renderer ships.
 */
const meta: Meta<typeof ResourceCollectionOptions> = {
  title: 'Bundled Extensions/platform-scripture-editor/ResourceCollectionOptions',
  component: ResourceCollectionOptions,
  tags: ['autodocs', 'test'],
};
export default meta;

type Story = StoryObj<typeof ResourceCollectionOptions>;

const localizedStrings = getLocalizedStrings([...RESOURCE_COLLECTION_OPTIONS_STRING_KEYS]);

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

/** DBL rows carrying long names — the B9 (PT-4156) display: `short — long`. */
const LONG_NAME_ROWS: ViewOptionsTextEntry[] = [
  {
    reference: dblRef('niv', 'NIV'),
    checked: true,
    isAdminLocked: true,
    isUserRemovable: false,
    longName: 'New International Version',
  },
  {
    reference: dblRef('web', 'WEB'),
    checked: true,
    isAdminLocked: false,
    isUserRemovable: true,
    longName: 'World English Bible',
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
  const [viewMode, setViewMode] = useState<ResourceCollectionViewMode>('verse');
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
      <ResourceCollectionOptions
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

/** With Chapter enabled (the state a later chapter renderer unlocks) — both modes selectable. */
export const ChapterEnabled: Story = {
  render: () => <Harness initialTop={ADMIN_ROWS} initialBottom={USER_ROWS} isChapterEnabled />,
};

/** Long names shown after the short name (`NIV — New International Version`) at the normal width. */
export const LongNames: Story = {
  render: () => <Harness initialTop={[LONG_NAME_ROWS[0]]} initialBottom={[LONG_NAME_ROWS[1]]} />,
};

/**
 * The same rows constrained to a narrow container: the short name stays visible and the long name
 * truncates with an ellipsis (pure CSS).
 */
export const LongNamesNarrow: Story = {
  render: () => (
    <div className="tw:w-48">
      <Harness initialTop={[LONG_NAME_ROWS[0]]} initialBottom={[LONG_NAME_ROWS[1]]} />
    </div>
  ),
};

/**
 * A realistic mix: one row has a long name, another has none — the latter renders its short name
 * alone.
 */
export const MixedLongAndShort: Story = {
  render: () => (
    <Harness
      initialTop={[LONG_NAME_ROWS[0]]}
      initialBottom={[
        {
          reference: dblRef('esv', 'ESV'),
          checked: true,
          isAdminLocked: false,
          isUserRemovable: true,
        },
      ]}
    />
  ),
};

/** RTL: a Hebrew resource name. `dir="auto"` flips the row to right-to-left from the name's script. */
export const RightToLeftLongName: Story = {
  render: () => (
    <Harness
      initialTop={[]}
      initialBottom={[
        {
          reference: dblRef('wlc', 'תנ״ך'),
          checked: true,
          isAdminLocked: false,
          isUserRemovable: true,
          longName: 'כתבי הקודש העבריים',
        },
      ]}
    />
  ),
};
