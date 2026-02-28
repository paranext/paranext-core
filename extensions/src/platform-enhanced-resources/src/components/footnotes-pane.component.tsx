import { useMemo } from 'react';

/** Props for the FootnotesPane component */
interface FootnotesPaneProps {
  /** The footnotes HTML content to render */
  footnotesHtml: string;
  /** Whether the footnotes pane is visible */
  isVisible: boolean;
}

/**
 * Footnotes pane that renders below the scripture content. Hidden by default, toggled with F7 key.
 * Displays footnote HTML content from the backend.
 *
 * @param props - FootnotesPaneProps
 * @returns Footnotes pane element or undefined when hidden
 */
export default function FootnotesPane({ footnotesHtml, isVisible }: FootnotesPaneProps) {
  const sanitizedHtml = useMemo(() => ({ __html: footnotesHtml }), [footnotesHtml]);

  if (!isVisible) {
    return undefined;
  }

  return (
    <div
      data-testid="footnotes-pane"
      className="tw-border-t tw-p-2 tw-overflow-auto tw-max-h-48 tw-bg-muted/30"
    >
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={sanitizedHtml} />
    </div>
  );
}
