/*
 * The Paratext logomark as the icon for a project (PT-5003): colored when the project is editable,
 * monochrome when it is not, so no separate lock icon is needed. Resources keep the open-book icon.
 *
 * The paths are the logomark from `paratext-10-studio`'s `assets/icon.svg`. The monochrome version
 * drops the green disc and draws everything in one color, with the ring thickened to about 10 of
 * 150 units, as PT-5003 asks, so the outline holds up at 16-18 px.
 */

import { cn } from 'platform-bible-react';

const VIEW_BOX = '0 0 151 151';
const DISC_FILL = '#bdd349';
const LOGO_INK = '#3f511f';
/** The monochrome logo's color where it cannot follow `currentColor` (an `<img>` data URL). */
const MONOCHROME_IMAGE_INK = '#3f3f46';
/**
 * A stroke around the ring's own (thin) outline, which together with it makes the monochrome ring
 * about 10 units thick.
 */
const MONOCHROME_RING_STROKE_WIDTH = 6;
/** The monochrome view box: half that stroke wider on every side, so the ring is not cut off. */
const MONOCHROME_VIEW_BOX = '-3 -3 157 157';

const DISC_PATH =
  'M0 75.019 C0 33.587 33.587 0 75.019 0 C116.45 0 150.037 33.587 150.037 75.019 C150.037 116.687 115.838 150.037 75.019 150.037 C33.587 150.037 0 116.45 0 75.019 Z';
const RING_PATH =
  'M118.697 128.964 C111.612 135.589 103.047 140.598 93.291 143.212 C58.082 152.646 17.804 128.086 8.37 92.877 C-1.064 57.668 21.545 16.288 56.754 6.854 C91.963 -2.581 129.336 22.728 138.77 57.937 C143.244 74.635 140.992 93.109 133.812 108.341 L134.303 109.613 C136.379 110.25 138.653 110.971 140.503 111.581 C149.687 95.136 152.723 75.238 147.463 55.607 C136.742 15.597 95.617 -8.146 55.607 2.574 C15.597 13.295 -8.146 54.42 2.574 94.43 C13.295 134.44 54.42 158.184 94.43 147.463 C105.402 144.523 115.7 138.836 123.85 131.973 L123.686 130.791 C122.204 130.248 120.281 129.525 118.697 128.964 Z';
const BOOK_PATH =
  'M135.82 116.5 C124.734 112.883 77.876 97.438 56.539 112.877 C54.339 114.467 51.779 116.767 49.869 118.567 L49.105 118.567 C46.957 116.66 44.387 113.934 41.719 112.567 C34.409 108.807 21.439 109.587 15.609 110.757 L20.279 118.077 C21.026 117.981 21.182 117.906 22.173 117.851 C26.913 117.59 34.592 117.899 38.049 119.677 C41.209 121.297 43.611 123.435 45.031 124.895 L49.869 124.617 C53.205 121.847 56.691 119.424 60.379 117.117 C79.379 105.236 118.273 122.757 129.733 126.327 C131.074 124.9 132.294 123.488 133.483 122.008 C134.407 120.857 135.287 119.677 136.144 118.471 Z';
const BOOK_CORNER_PATH =
  'M22.254 117.831 C21.263 117.886 21.107 117.961 20.36 118.057 L21.814 118.924 Z';
const QUILL_PATH =
  'M58.5 104.5 C60.897 89.928 64.255 88.734 70.443 86.9 C72.405 86.318 74.648 85.653 77.229 84.446 C86.592 80.072 88.031 75.751 90.138 67.066 C91.982 54.319 98.46 40.784 104.324 28.531 C105.318 26.455 106.294 24.415 107.227 22.422 L105.648 22 C77.645 33.7 69.183 37.564 61.107 47.637 C53.101 57.623 52.917 76.754 53.5 83.5 L56 83 L57 81.5 C57.5 59.5 68.064 45.447 92.159 32.806 C92.206 32.847 92.381 33.003 92.554 33.158 C92.726 33.312 92.897 33.465 92.943 33.505 C65.883 61.683 54.102 95.685 50 110.646 L51.691 110.646 C53.5 108 55.767 106.373 58.5 104.5 Z';

/** The logo's markup as a string, for an image URL; mirrors {@link ParatextProjectLogo}. */
function logoSvg(isEditable: boolean): string {
  const ink = isEditable ? LOGO_INK : MONOCHROME_IMAGE_INK;
  const ringStroke = isEditable
    ? ''
    : ` stroke="${ink}" stroke-width="${MONOCHROME_RING_STROKE_WIDTH}" stroke-linejoin="round"`;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${isEditable ? VIEW_BOX : MONOCHROME_VIEW_BOX}">`,
    isEditable ? `<path d="${DISC_PATH}" fill="${DISC_FILL}"/>` : '',
    `<path d="${RING_PATH}" fill="${ink}" fill-rule="evenodd"${ringStroke}/>`,
    `<path d="${BOOK_PATH}" fill="${ink}"/>`,
    `<path d="${BOOK_CORNER_PATH}" fill="${ink}"/>`,
    `<path d="${QUILL_PATH}" fill="${ink}" fill-rule="evenodd" clip-rule="evenodd"/>`,
    '</svg>',
  ].join('');
}

/**
 * The logo as an image URL, for a dock tab's `tabIconUrl`. The monochrome version cannot follow the
 * tab's text color there, so it uses a fixed dark gray.
 */
export function paratextProjectLogoUrl(isEditable: boolean): string {
  // Parentheses escaped too: a tab puts this in an unquoted CSS `url(…)`.
  const encoded = encodeURIComponent(logoSvg(isEditable))
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
  return `data:image/svg+xml;utf8,${encoded}`;
}

export type ParatextProjectLogoProps = {
  /** Colored for a project the user can edit; monochrome (following `currentColor`) otherwise. */
  isEditable: boolean;
  /** Width and height in pixels. */
  size?: number;
  className?: string;
};

/** The Paratext logomark inline. Decorative: the row, tab or title bar names what it stands for. */
export function ParatextProjectLogo({
  isEditable,
  size = 16,
  className,
}: ParatextProjectLogoProps) {
  const ink = isEditable ? LOGO_INK : 'currentColor';
  return (
    <svg
      aria-hidden
      viewBox={isEditable ? VIEW_BOX : MONOCHROME_VIEW_BOX}
      width={size}
      height={size}
      className={cn('tw:shrink-0', className)}
    >
      {isEditable && <path d={DISC_PATH} fill={DISC_FILL} />}
      <path
        d={RING_PATH}
        fill={ink}
        fillRule="evenodd"
        stroke={isEditable ? undefined : ink}
        strokeWidth={isEditable ? undefined : MONOCHROME_RING_STROKE_WIDTH}
        strokeLinejoin="round"
      />
      <path d={BOOK_PATH} fill={ink} />
      <path d={BOOK_CORNER_PATH} fill={ink} />
      <path d={QUILL_PATH} fill={ink} fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

export default ParatextProjectLogo;
