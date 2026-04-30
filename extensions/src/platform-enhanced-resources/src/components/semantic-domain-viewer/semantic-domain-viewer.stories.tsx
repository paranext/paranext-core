import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useCallback, useState } from 'react';
import type { SemanticDomain } from 'platform-bible-react';
import { Button } from 'platform-bible-react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  SemanticDomainViewer,
  SEMANTIC_DOMAIN_VIEWER_STRING_KEYS,
  type SemanticDomainFilteredItem,
} from './semantic-domain-viewer.component';
import type { DictionaryDisplayItemData } from '../dictionary-tab/dictionary-display-item.component';
import {
  MOCK_DOMAIN_TREE,
  MOCK_DOMAIN_PATH_DEEP,
  MOCK_DICT_ENTRIES_FILTERED,
} from '../../data/semantic-domain-viewer.story-data';

const localizedStrings = getLocalizedStrings([...SEMANTIC_DOMAIN_VIEWER_STRING_KEYS]);

const meta: Meta<typeof SemanticDomainViewer> = {
  title: 'Bundled Extensions/platform-enhanced-resources/SemanticDomainViewer/SemanticDomainViewer',
  component: SemanticDomainViewer,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    allDomains: MOCK_DOMAIN_TREE,
    filteredEntries: MOCK_DICT_ENTRIES_FILTERED,
    isLoading: false,
    onOpenChange: () => {},
    onDomainChange: () => {},
  },
};
export default meta;
type Story = StoryObj<typeof SemanticDomainViewer>;

/**
 * Default - the single fully-interactive story for `SemanticDomainViewer`. Drives `open`,
 * `domainPath`, and `filteredEntries` from local state so reviewers can exercise the real flows:
 *
 * - Open / close the Dialog (trigger button + Dialog X / Esc / click-outside).
 * - Navigate the breadcrumb tree popovers. Top-level (depth-0) entries are a SINGLE combined
 *   chevron+label button that ONLY toggles expand/collapse - clicking does NOT select. Nested
 *   (depth-1+) entries keep the click-to-select behavior and gain `hover:tw-underline`.
 * - Verify the breadcrumb chain does NOT overflow under the Dialog's close-X button at the default
 *   rendered width (90vw / max 3xl).
 * - Keyboard: ArrowUp / ArrowDown move list selection inside the Dialog; Esc closes the Dialog; Tab /
 *   Shift+Tab cycle within the Dialog (Radix focus-trap default).
 *
 * [Revised: 2026-04-29] Theme 4 (single interactive story per component) + Theme 17 (#11a/b/c bug
 * fixes) self-evident from this story.
 */
export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [domainPath, setDomainPath] = useState<SemanticDomain[] | undefined>(
      MOCK_DOMAIN_PATH_DEEP,
    );
    const [filteredEntries, setFilteredEntries] = useState<SemanticDomainFilteredItem[]>(
      MOCK_DICT_ENTRIES_FILTERED,
    );
    const [isLoading, setIsLoading] = useState(false);

    const openWithDeepPath = useCallback(() => {
      setDomainPath(MOCK_DOMAIN_PATH_DEEP);
      setFilteredEntries(MOCK_DICT_ENTRIES_FILTERED);
      setIsLoading(false);
      setOpen(true);
    }, []);

    const openAtRoot = useCallback(() => {
      // No domain path - the viewer falls back to the first top-level domain
      // (the "Browse semantic domains" cold entry path).
      setDomainPath(undefined);
      setFilteredEntries(MOCK_DICT_ENTRIES_FILTERED);
      setIsLoading(false);
      setOpen(true);
    }, []);

    const openWithEmptyResults = useCallback(() => {
      setDomainPath(MOCK_DOMAIN_PATH_DEEP);
      setFilteredEntries([]);
      setIsLoading(false);
      setOpen(true);
    }, []);

    const handleDomainChange = useCallback((newPath: SemanticDomain[]) => {
      // Real production wiring would re-query the backend for the new domain's filtered
      // entries. The story keeps the pre-loaded fixture so reviewers can exercise the
      // breadcrumb popovers without losing the populated list.
      setDomainPath(newPath);
      // eslint-disable-next-line no-console
      console.log(
        '[SemanticDomainViewer story] domain change ->',
        newPath.map((d) => d.label).join(' > '),
      );
    }, []);

    const handleEntryClick = useCallback((entry: DictionaryDisplayItemData) => {
      // Production routes to MarbleForm; the story logs the click.
      // eslint-disable-next-line no-console
      console.log('[SemanticDomainViewer story] entry-click', entry.tokenId, entry.sourceText);
    }, []);

    const handleAllOccurrencesClick = useCallback((tokenId: string) => {
      // Production routes to MarbleForm filtered by occurrences; the story logs the click.
      // eslint-disable-next-line no-console
      console.log('[SemanticDomainViewer story] all-occurrences-click', tokenId);
    }, []);

    const handleSenseOccurrencesClick = useCallback((senseId: string) => {
      // Production routes to MarbleForm filtered by sense; the story logs the click.
      // eslint-disable-next-line no-console
      console.log('[SemanticDomainViewer story] sense-occurrences-click', senseId);
    }, []);

    return (
      <div className="tw-relative tw-h-[720px] tw-w-[1024px] tw-bg-muted tw-p-4">
        <div className="tw-mb-3 tw-flex tw-flex-wrap tw-gap-2">
          <Button onClick={openWithDeepPath}>Open Semantic Domain Viewer</Button>
          <Button variant="outline" onClick={openAtRoot}>
            Open at root (cold entry)
          </Button>
          <Button variant="outline" onClick={openWithEmptyResults}>
            Open with empty results
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setDomainPath(MOCK_DOMAIN_PATH_DEEP);
              setFilteredEntries([]);
              setIsLoading(true);
              setOpen(true);
            }}
          >
            Open in loading state
          </Button>
        </div>
        <div className="tw-rounded tw-border tw-bg-background tw-p-3 tw-text-sm">
          <p className="tw-mb-1 tw-font-semibold">How to verify the bug fixes:</p>
          <ol className="tw-list-inside tw-list-decimal tw-space-y-0.5 tw-text-muted-foreground">
            <li>
              Click any breadcrumb segment to open its tree popover. Click a TOP-level entry (e.g.,
              &ldquo;1. Physical&rdquo;) - it should expand/collapse only. The tree must remain
              visible.
            </li>
            <li>
              Click a deeper entry (e.g., &ldquo;1.1 Movement&rdquo;) - it should underline on hover
              and select on click, navigating the breadcrumb to that path.
            </li>
            <li>
              Resize / inspect the breadcrumb chain - it should never visually overlap the
              Dialog&apos;s close-X (top-right). The chain collapses to an ellipsis instead.
            </li>
            <li>
              Press ArrowUp / ArrowDown - selection should move within the entries list. Press Esc -
              the Dialog should close (when no nested popover is open).
            </li>
          </ol>
        </div>
        <SemanticDomainViewer
          open={open}
          domainPath={domainPath}
          allDomains={MOCK_DOMAIN_TREE}
          filteredEntries={filteredEntries}
          isLoading={isLoading}
          onOpenChange={setOpen}
          onDomainChange={handleDomainChange}
          onEntryClick={handleEntryClick}
          onAllOccurrencesClick={handleAllOccurrencesClick}
          onSenseOccurrencesClick={handleSenseOccurrencesClick}
          localizedStringsWithLoadingState={[localizedStrings, false]}
        />
      </div>
    );
  },
};

/**
 * Loading - skeleton list inside the breadcrumb-popover layout. Retained as a content-driven static
 * variant so the loading skeleton is captured in isolation for visual review (also reachable from
 * `Default` via the "Open in loading state" trigger).
 */
export const Loading: Story = {
  args: {
    open: true,
    domainPath: MOCK_DOMAIN_PATH_DEEP,
    filteredEntries: [],
    isLoading: true,
  },
};
