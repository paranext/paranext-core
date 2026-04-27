import { Fragment } from 'react';
import { cn } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';

/** Object containing all keys used for localization in this component. */
export const DOMAIN_BREADCRUMB_STRING_KEYS = Object.freeze([
  '%enhancedResources_semanticDomain_breadcrumbAriaLabel%',
  '%enhancedResources_semanticDomain_breadcrumbRoot%',
  '%enhancedResources_semanticDomain_breadcrumbSeparator%',
] as const);

type DomainBreadcrumbLocalizedStringKey = (typeof DOMAIN_BREADCRUMB_STRING_KEYS)[number];
type DomainBreadcrumbLocalizedStrings = {
  [key in DomainBreadcrumbLocalizedStringKey]?: LocalizedStringValue;
};

/** Single segment of the breadcrumb path. */
export type DomainBreadcrumbItem = {
  /** Domain id (or empty string for the synthetic root). */
  id: string;
  /** Human-readable label. */
  label: string;
};

export type DomainBreadcrumbProps = {
  /**
   * Path from root to current domain. The synthetic root (label "All") should be the first entry,
   * with id = '' so consumers can detect it. Subsequent entries are real domain ancestors.
   */
  path: DomainBreadcrumbItem[];
  /**
   * Click handler fired when the user clicks a breadcrumb segment. The last segment (current
   * domain) is rendered with `aria-current="page"` and is not clickable. Per FN-006 this is
   * within-viewer navigation only; cross-view navigation is out of scope.
   */
  onItemClick?: (id: string) => void;
  /** Optional className applied to the root nav element. */
  className?: string;
  localizedStringsWithLoadingState?: [DomainBreadcrumbLocalizedStrings, boolean];
};

/**
 * Pure presentational breadcrumb for the SemanticDomainViewer.
 *
 * Built as a lightweight `nav > ol` rather than depending on a third-party Breadcrumb component
 * because `platform-bible-react` does not currently expose one. ARIA pattern:
 *
 * - The outer `nav` has `aria-label` for landmark navigation
 * - The visible separator (default ">") is rendered with `aria-hidden` so screen readers only
 *   announce the labels
 * - The current (last) item gets `aria-current="page"` and is rendered as plain text (not a button)
 */
export function DomainBreadcrumb({
  path,
  onItemClick = () => {},
  className,
  localizedStringsWithLoadingState = [{}, false],
}: DomainBreadcrumbProps) {
  const getLocalizedString = (key: DomainBreadcrumbLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const navAriaLabel = String(
    getLocalizedString('%enhancedResources_semanticDomain_breadcrumbAriaLabel%'),
  );
  const separator = String(
    getLocalizedString('%enhancedResources_semanticDomain_breadcrumbSeparator%'),
  );

  if (path.length === 0) return undefined;

  return (
    <nav
      aria-label={navAriaLabel}
      data-testid="domain-breadcrumb"
      className={cn('tw-flex tw-min-w-0 tw-items-center tw-text-sm', className)}
    >
      <ol className="tw-flex tw-min-w-0 tw-flex-wrap tw-items-center tw-gap-1">
        {path.map((item, index) => {
          const isLast = index === path.length - 1;
          // Each path segment occupies a unique depth, so prefixing with the depth gives a stable,
          // collision-free key even if two items happened to share an id (e.g. synthetic root +
          // ancestor with empty id in a malformed path).
          const fragmentKey = `${index}-${item.id || 'root'}`;
          return (
            <Fragment key={fragmentKey}>
              <li className="tw-min-w-0">
                {isLast ? (
                  <span
                    aria-current="page"
                    data-testid={`domain-breadcrumb-current-${item.id || 'root'}`}
                    className="tw-truncate tw-font-medium tw-text-foreground"
                  >
                    {item.label}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => onItemClick(item.id)}
                    data-testid={`domain-breadcrumb-${item.id || 'root'}`}
                    className="tw-truncate tw-rounded tw-text-muted-foreground hover:tw-text-foreground hover:tw-underline focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-ring"
                  >
                    {item.label}
                  </button>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="tw-shrink-0 tw-px-1 tw-text-muted-foreground">
                  {separator}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default DomainBreadcrumb;
