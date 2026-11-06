import { LockIcon } from 'lucide-react';
import LabelledGlyph from '@renderer/components/projects/labelled-glyph.component';

/**
 * The padlock marking a project the user can open but not edit.
 *
 * Shared by every surface that lists projects so the accessibility contract lives in one place —
 * see {@link LabelledGlyph} for why the glyph needs a name of its own.
 *
 * @param label Localized "read-only" text, used as the accessible name
 * @param showNativeTitle Whether to also expose {@link label} as a native `title` hover tooltip.
 *   Only for rows that are NOT themselves a tooltip trigger.
 */
export default function ReadOnlyIndicator({
  label,
  showNativeTitle = false,
}: {
  label: string;
  showNativeTitle?: boolean;
}) {
  return (
    <LabelledGlyph label={label} showNativeTitle={showNativeTitle}>
      <LockIcon className="tw:h-3 tw:w-3" aria-hidden />
    </LabelledGlyph>
  );
}
