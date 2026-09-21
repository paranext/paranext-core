import { type ReactNode } from 'react';

/**
 * An icon that carries its own accessible name, and optionally a hover label.
 *
 * Icon-only status markers in a project row — the read-only padlock, the current-project check —
 * are the ONLY carrier of their meaning in that row, so each needs a name of its own rather than
 * relying on neighbouring text. `role="img"` gives that name a reliable host: an `aria-label` on a
 * bare `<span>` is ignored by some screen readers. The wrapper is also what the native `title`
 * hangs off, because a Lucide icon takes no `title` prop of its own.
 *
 * @param label Localized text, used as the accessible name
 * @param showNativeTitle Whether to also expose {@link label} as a native `title` hover tooltip.
 *   Only for rows that are NOT themselves a tooltip trigger — a native `title` inside one opens the
 *   browser's default tooltip alongside the app's, and two tooltips over one row is worse than the
 *   hover label is worth.
 * @param children The icon, which must be `aria-hidden` so it does not compete with {@link label}
 */
export default function LabelledGlyph({
  label,
  showNativeTitle = false,
  children,
}: {
  label: string;
  showNativeTitle?: boolean;
  children: ReactNode;
}) {
  return (
    // `shrink-0` belongs here rather than on the icon inside: this span is the flex item, so a
    // shrinkable wrapper lets a crowded row squeeze the glyph however rigid the icon itself is.
    <span
      role="img"
      aria-label={label}
      title={showNativeTitle ? label : undefined}
      className="tw:shrink-0"
    >
      {children}
    </span>
  );
}
