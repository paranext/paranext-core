/*
 * Design-ideas stories for the unified Home + GetResources concept. See
 * `home-unified.component.tsx` for the accompanying component prototype.
 *
 * These stories demonstrate the concept across representative data shapes:
 *   - Default: a mixed catalog of installed projects, S/R-able-not-installed projects, DBL
 *     resources not yet installed, and update-available installed resources — with the first
 *     100 items initially fetched and the rest paged in on scroll or filter.
 *   - Unified: Ian's preference without the Type and Last used columns, the type in a tooltip on
 *     the name, and equal-width action buttons.
 *   - UnifiedSimple: Unified in Simple interface mode — Open is every on-computer row's primary
 *     action, and the list is single-select.
 *   - HiddenItems: the collapsed Hidden group, Hide / Unhide, and the team-shared rows that can't
 *     be hidden.
 *   - EmptyLocal: no local content; the list is fully populated by DBL discovery.
 *   - Loading: initial spinner state.
 *   - NoResults: zero items after data loads.
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button, CardTitle } from 'platform-bible-react';
import { HomeIcon } from 'lucide-react';
import { useState } from 'react';
import { HomeUnified, HomeUnifiedProps } from './home-unified.component';
import { buildDblCatalog, FULL_CATALOG } from './unified-items.data';
import { useUnifiedCatalog } from './use-unified-catalog.hook';

const meta: Meta<typeof HomeUnified> = {
  title: 'Design ideas/Unified Home (Home + GetResources)',
  component: HomeUnified,
  parameters: {
    docs: {
      description: {
        component:
          'Prototype of a single, table-based Home view that merges installed projects, S/R-able ' +
          "projects on the server, and DBL resources into one search+filter surface. The user's " +
          "job — 'find and open my project/resource, no matter where it lives' — becomes one flow " +
          'instead of two disconnected screens (Home + Get Resources). Simple and Power interface ' +
          'modes share the same Home; only the pickers choose a project or resource for a panel. ' +
          'Every variant shows the All / Paratext projects / Resources dropdown and the type ' +
          'buttons together: the dropdown sets the scope, and only the type buttons inside it ' +
          'show. Items the user hid sit in a collapsed "Hidden (n)" group at the bottom of the list.',
      },
    },
  },
  tags: ['!autodocs'],
};

export default meta;

type Story = StoryObj<typeof HomeUnified>;

// Wraps the component in the shared catalog state so actions on rows visibly mutate the list.
// Reviewers can click Install/Get on a row and watch it go through in-flight → installed, click Sync
// to clear the "needs sync" state, and see the progressive-loading affordance kick in on scroll or
// filter.
function InteractiveHarness(overrides?: Partial<HomeUnifiedProps>) {
  const catalog = overrides?.items ?? FULL_CATALOG;
  return function InteractiveStory() {
    const { items, inFlightIds, hasMore, fetchMore, applyAction, dblAvailableCount } =
      useUnifiedCatalog(catalog);
    return (
      <HomeUnified
        items={items}
        inFlightIds={inFlightIds}
        onItemAction={applyAction}
        hasMore={hasMore}
        onFetchMore={fetchMore}
        isLoading={overrides?.isLoading}
        variant={overrides?.variant}
        dblAvailableCount={
          overrides?.variant?.startsWith('downloadMore') || overrides?.variant === 'unified'
            ? dblAvailableCount
            : undefined
        }
        initialProjectResourceFilter={overrides?.initialProjectResourceFilter}
        showDownloadButton={overrides?.showDownloadButton}
        onClose={overrides?.onClose}
        interfaceMode={overrides?.interfaceMode}
        isDownloadOverlayOpen={overrides?.isDownloadOverlayOpen}
        onDownloadOverlayOpenChange={overrides?.onDownloadOverlayOpenChange}
        overlayOnly={overrides?.overlayOnly}
        headerContent={
          overrides?.headerContent ?? (
            <div className="tw:flex tw:items-center tw:gap-2">
              <HomeIcon size={28} />
              <CardTitle>Home</CardTitle>
            </div>
          )
        }
      />
    );
  };
}

export const Default: Story = {
  render: InteractiveHarness(),
  parameters: {
    docs: {
      description: {
        story:
          'The full catalog: several installed projects/resources at the top, then the DBL ' +
          'discovery set. Only the first 100 items are loaded initially — scrolling near the ' +
          "bottom or applying any filter pages in the remaining ~150. Each row's ellipsis menu " +
          'lists its other actions first, then a separator, Hide, and Remove (in red) at the ' +
          'bottom; hidden items collect in the "Hidden (n)" group at the bottom.',
      },
    },
  },
};

export const ButtonFiltersAndSrIntegration: Story = {
  render: InteractiveHarness({ variant: 'buttons' }),
  parameters: {
    docs: {
      description: {
        story:
          'Alternative layout: type filters shown as a horizontal row of big toggle buttons; the ' +
          'language filter shrinks to a count-only combobox with a hover tooltip listing the ' +
          'selected languages. Row names carry S/R-style status badges (Edited / Update / New / ' +
          'DBL), and Select All / None / Edited / New preselection buttons sit at the top-right ' +
          'of the table for quick multi-select from the send/receive dialog.',
      },
    },
  },
};

export const DownloadMoreModal: Story = {
  render: InteractiveHarness({ variant: 'downloadMore' }),
  parameters: {
    docs: {
      description: {
        story:
          'S/R integration variant + hidden DBL rows. The inline table shows only projects and ' +
          'resources on the computer plus new-on-server projects — the definite catalog. A ' +
          '"Download more resources" button sits below the list with a count of DBL items ' +
          'matching the current search/filter; clicking it opens a near-full-screen modal that ' +
          'browses the DBL catalog with independent search + type + language filters. The modal ' +
          'groups its list into "On this computer" (expanded) and "Available for download" ' +
          '(collapsed); typing a search expands both, and Close dismisses it. The item ' +
          'count summary switches to the definite `x of y (+z)` form, where y = on-computer and ' +
          'z = new on the S/R server.',
      },
    },
  },
};

export const DownloadMoreModalAlternatives: Story = {
  render: InteractiveHarness({ variant: 'downloadMoreTabs' }),
  parameters: {
    docs: {
      description: {
        story:
          'Same as DownloadMoreModal outside the modal. A Tabs bar pinned above everything ' +
          '(also above the modal backdrop) switches the modal’s per-row action UI between ' +
          'three shapes: Open-primary (row button is always Open, state actions in the ' +
          'ellipsis), Open-inline (state-based button on the right + a small Open next to the ' +
          'short name for locally-available rows), and Action-inline (Open on the right, ' +
          'state-based button replaces the badge next to the short name).',
      },
    },
  },
};

export const IansPreference: Story = {
  name: "Ian's preference",
  render: InteractiveHarness({ variant: 'downloadMoreSplit' }),
  parameters: {
    docs: {
      description: {
        story:
          'DownloadMoreModal without the Edited / New / Installed / Update badges. The ' +
          'explanatory tooltip moves back onto the row action button (as in Default), and each ' +
          'row action is a split button: the state-based action plus a chevron menu with the ' +
          'rest. Home rows offer Hide on every row and Remove on every installed row, projects ' +
          'included; for a resource a project team shares, both are disabled with the reason. ' +
          'Every menu lists the state and secondary actions first, then a separator, Hide (or ' +
          'Unhide), and Remove in red at the bottom. ' +
          'Hidden items (DE-NLV and BDAG in this catalog) sit in the collapsed "Hidden (n)" group ' +
          'at the bottom. In the modal the language combobox has no tooltip; the "Only my ' +
          'languages" tooltip lists the user\'s languages instead.',
      },
    },
  },
};

export const Unified: Story = {
  render: InteractiveHarness({ variant: 'unified' }),
  parameters: {
    docs: {
      description: {
        story:
          "Ian's preference without the Type and Last used columns; the list still opens sorted " +
          'by last use. Hover (or keyboard-focus) the icon and short name for a tooltip with the ' +
          'full name, language and type, as on the production Home. Every row action is the same ' +
          'width whatever its label, so the split chevrons line up in one column — in the download ' +
          'modal too, which also drops its Type column. Choosing "Paratext projects" in the ' +
          'dropdown hides the type buttons (only one type is left) and replaces the "Download ' +
          'resources" button below the list with Clear filters.',
      },
    },
  },
};

export const UnifiedSimple: Story = {
  name: 'Unified – Simple',
  render: InteractiveHarness({
    variant: 'unified',
    interfaceMode: 'simple',
    initialProjectResourceFilter: 'paratextProject',
    showDownloadButton: false,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Unified in Simple interface mode, scoped to Paratext projects with no "Download ' +
          'resources" button — the shape the Simple-mode "More projects…" dialog shows. Open is ' +
          'the primary action of every row on this computer, including rows that need a Sync and ' +
          'resources with an Update: that action moves to the top of the chevron menu, and the ' +
          'chevron turns primary (labelled "More actions — sync needed" / "— update available") ' +
          'so the row still asks for attention. The Open tooltip still explains the row and says ' +
          'the Sync or Update is in the menu. Rows not on this computer keep Get as their ' +
          'primary action. The list is single-select: no checkboxes, clicking a row selects only ' +
          'that row, and there are no batch buttons in the footer. The Edited / Updated / New ' +
          'presets only filter, and double-clicking a row still opens it.',
      },
    },
  },
};

export const HiddenItems: Story = {
  name: 'Hidden items',
  render: InteractiveHarness({ variant: 'downloadMoreSplit' }),
  parameters: {
    docs: {
      description: {
        story:
          "Ian's preference, focused on hiding — the only way to unlist an item. The catalog " +
          'starts with DE-NLV (a project) and BDAG (a resource) hidden: they sit in the collapsed ' +
          '"Hidden (n)" group at the bottom of the list; click its heading to expand it. Hidden ' +
          'rows look muted, have no checkbox, and are left out of batch selection, the presets, ' +
          'and the item counts. Their primary action stays the state-based one (BDAG still ' +
          'offers Update); the chevron menu offers Unhide, plus Remove (last, in red) where the ' +
          'row is installed. Hide any project or user resource from its menu to move it into the ' +
          'group. A resource a project team shares (e.g. WEB-A, shared by the WEB team) cannot ' +
          'be hidden or removed: both menu items are disabled with "Shared by a project team; ' +
          'only a project administrator can remove it." The download modal still lists hidden ' +
          'resources, marked with a muted "Hidden" label.',
      },
    },
  },
};

// The download modal on its own, opened by a button outside it — the shape another surface (e.g.
// a resource panel's "Download resources" button) would use.
function DownloadOverlayOnlyStory() {
  const { items, inFlightIds, hasMore, fetchMore, applyAction, dblAvailableCount } =
    useUnifiedCatalog(FULL_CATALOG);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="tw:p-4">
      <Button onClick={() => setIsOpen(true)}>Download resources</Button>
      <HomeUnified
        items={items}
        inFlightIds={inFlightIds}
        onItemAction={applyAction}
        hasMore={hasMore}
        onFetchMore={fetchMore}
        variant="downloadMoreSplit"
        dblAvailableCount={dblAvailableCount}
        overlayOnly
        isDownloadOverlayOpen={isOpen}
        onDownloadOverlayOpenChange={setIsOpen}
      />
    </div>
  );
}

export const DownloadOverlayOnly: Story = {
  render: () => <DownloadOverlayOnlyStory />,
  parameters: {
    docs: {
      description: {
        story:
          'The download modal without the Home card (`overlayOnly`), its open state controlled by ' +
          'the parent through `isDownloadOverlayOpen` / `onDownloadOverlayOpenChange`. The button ' +
          'stands in for another surface, such as a resource panel. Its list is grouped into "On ' +
          'this computer" and "Available for download", and Close dismisses it. Opening it still pages in ' +
          'the DBL catalog, Remove still asks for confirmation, and hidden resources (BDAG) are ' +
          'listed with a muted "Hidden" label.',
      },
    },
  },
};

export const EmptyLocal: Story = {
  render: InteractiveHarness({
    items: buildDblCatalog(240),
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Brand-new install: nothing local, DBL discovery populates the list. "Only my ' +
          'languages" becomes inert (there are no local languages to seed from).',
      },
    },
  },
};

export const Loading: Story = {
  render: InteractiveHarness({ items: [], isLoading: true }),
};

export const NoResults: Story = {
  render: InteractiveHarness({ items: [] }),
  parameters: {
    docs: {
      description: {
        story: 'Zero items after data loads — shows the "browse DBL" empty-state prompt.',
      },
    },
  },
};
