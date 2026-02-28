import { useCallback } from 'react';

/** Props for the GuideContent component */
interface GuideContentProps {
  /** Whether the "show on open" checkbox is checked */
  showOnOpen: boolean;
  /** Callback when the show-on-open checkbox is toggled */
  onToggleShowOnOpen: () => void;
  /** Callback when the close button is clicked */
  onClose: () => void;
}

/**
 * GuideContent component displays the static "Getting Started Guide" for Enhanced Resources. It
 * explains what the colored highlights mean, what the four tab icons represent, and provides a
 * checkbox to toggle whether the guide auto-shows on ER open.
 *
 * Implements BHV-410 (guide singleton) and BHV-604 (auto-show on first open).
 *
 * @param props - GuideContentProps
 * @returns The guide panel with static HTML content, close button, and show-on-open checkbox
 */
export default function GuideContent({
  showOnOpen,
  onToggleShowOnOpen,
  onClose,
}: GuideContentProps) {
  const handleCheckboxChange = useCallback(() => {
    onToggleShowOnOpen();
  }, [onToggleShowOnOpen]);

  return (
    <div
      data-testid="guide-panel"
      className="tw-border-b tw-bg-blue-50 tw-text-sm tw-relative"
      role="complementary"
      aria-label="Enhanced Resources Getting Started Guide"
    >
      {/* Header with title and close button */}
      <div className="tw-flex tw-items-center tw-justify-between tw-px-4 tw-pt-3 tw-pb-1">
        <h3 className="tw-font-semibold tw-text-base">
          Enhanced Resources: A Getting Started Guide
        </h3>
        <button
          type="button"
          data-testid="guide-close"
          onClick={onClose}
          className="tw-text-muted-foreground hover:tw-text-foreground tw-p-1"
          aria-label="Close"
        >
          X
        </button>
      </div>

      {/* Guide content */}
      <div data-testid="er-guide-content" className="tw-px-4 tw-pb-3 tw-space-y-3">
        <p>
          Enhanced resources are interactive Bible translations that allow you to explore the
          original languages and related reference materials.
        </p>

        {/* Highlight explanations */}
        <div className="tw-space-y-2">
          <h4 className="tw-font-medium">Highlights</h4>
          <ul className="tw-space-y-1 tw-list-none tw-pl-0">
            <li className="tw-flex tw-items-start tw-gap-2">
              <span
                className="tw-inline-block tw-w-3 tw-h-3 tw-mt-0.5 tw-rounded-sm tw-bg-blue-400 tw-shrink-0"
                aria-hidden="true"
              />
              <span>
                <strong>Blue highlighted</strong> words are linked to lexicon entries. Click a word
                to see its definition.
              </span>
            </li>
            <li className="tw-flex tw-items-start tw-gap-2">
              <span
                className="tw-inline-block tw-w-3 tw-h-3 tw-mt-0.5 tw-rounded-sm tw-bg-gray-400 tw-shrink-0"
                aria-hidden="true"
              />
              <span>
                <strong>Gray highlighted</strong> words have been found in the tracked
                project&apos;s term renderings.
              </span>
            </li>
            <li className="tw-flex tw-items-start tw-gap-2">
              <span
                className="tw-inline-block tw-w-3 tw-h-3 tw-mt-0.5 tw-rounded-sm tw-bg-orange-400 tw-shrink-0"
                aria-hidden="true"
              />
              <span>
                <strong>Orange highlighted</strong> words are missing from the tracked project.
              </span>
            </li>
          </ul>
        </div>

        {/* Tab icon descriptions */}
        <div className="tw-space-y-2">
          <h4 className="tw-font-medium">Tab Icons</h4>
          <ul className="tw-space-y-1 tw-list-none tw-pl-0">
            <li>
              <strong>Dictionary</strong> &mdash; Lexicon entries with definitions and glosses
            </li>
            <li>
              <strong>Encyclopedia</strong> &mdash; Articles about people, places, and topics
            </li>
            <li>
              <strong>Media</strong> &mdash; Images and illustrations
            </li>
            <li>
              <strong>Maps</strong> &mdash; Geographic maps and diagrams
            </li>
          </ul>
        </div>

        <p>
          Remember to update your Enhanced Resources periodically for the latest data. Click the
          info icon in the toolbar to show this guide again.
        </p>

        {/* Show on open checkbox */}
        <div className="tw-flex tw-items-center tw-gap-2 tw-pt-1">
          <input
            type="checkbox"
            data-testid="show-guide-checkbox"
            id="show-guide-checkbox"
            checked={showOnOpen}
            onChange={handleCheckboxChange}
            className="tw-w-4 tw-h-4"
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="show-guide-checkbox" className="tw-text-sm tw-cursor-pointer">
            Show this guide when an Enhanced Resource is opened
          </label>
        </div>
      </div>
    </div>
  );
}
