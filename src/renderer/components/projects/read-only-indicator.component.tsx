import { LockIcon } from 'lucide-react';

/**
 * The padlock marking a project the user can open but not edit.
 *
 * Shared by every surface that lists projects so the accessibility contract lives in one place: the
 * glyph is the ONLY carrier of "read-only" in a row, so it needs an accessible name of its own
 * rather than relying on neighbouring text. `role="img"` gives that name a reliable host — an
 * `aria-label` on a `<span>` with no role is ignored by some screen readers.
 *
 * @param label Localized "read-only" text, used as the accessible name
 * @param showNativeTitle Whether to also expose {@link label} as a native `title` hover tooltip.
 *   Only for rows that are NOT themselves a tooltip trigger — a native `title` inside one opens the
 *   browser's default tooltip alongside the app's, and two tooltips over one row is worse than the
 *   hover label is worth.
 */
export default function ReadOnlyIndicator({
  label,
  showNativeTitle = false,
}: {
  label: string;
  showNativeTitle?: boolean;
}) {
  return (
    <span role="img" aria-label={label} title={showNativeTitle ? label : undefined}>
      <LockIcon className="tw:h-3 tw:w-3 tw:shrink-0" aria-hidden />
    </span>
  );
}
