import {
  Book,
  BookA,
  BookCopy,
  BookMarked,
  CircleCheckBig,
  CircleQuestionMark,
  Download,
  ExternalLink,
  Eye,
  FileText,
  FunctionSquare,
  House,
  Library,
  type LucideIcon as LucideIconComponent,
  MessageSquare,
  MessageSquarePlus,
  PanelBottom,
  Pencil,
  RefreshCw,
  Scan,
  Search,
  Settings,
  Sparkles,
  SquareSigma,
  SquareX,
  Users,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { cn } from '@/utils/shadcn-ui/utils';

/**
 * Curated set of lucide icons that can be shown by name. Each icon is a named import so the bundle
 * contains only these icons; adding an icon means adding it here.
 */
const LUCIDE_ICONS_BY_NAME: Readonly<Record<string, LucideIconComponent>> = {
  'refresh-cw': RefreshCw,
  download: Download,
  house: House,
  'book-a': BookA,
  settings: Settings,
  'circle-question-mark': CircleQuestionMark,
  'external-link': ExternalLink,
  users: Users,
  'book-copy': BookCopy,
  pencil: Pencil,
  eye: Eye,
  'zoom-in': ZoomIn,
  'zoom-out': ZoomOut,
  scan: Scan,
  'file-text': FileText,
  'panel-bottom': PanelBottom,
  'message-square-plus': MessageSquarePlus,
  'square-function': FunctionSquare,
  'square-x': SquareX,
  'square-sigma': SquareSigma,
  book: Book,
  'book-marked': BookMarked,
  library: Library,
  search: Search,
  'message-square': MessageSquare,
  'circle-check-big': CircleCheckBig,
  sparkles: Sparkles,
};

/**
 * Names (lucide kebab-case) of the icons {@link LucideIcon} can render
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const LUCIDE_ICON_NAMES: readonly string[] = Object.keys(LUCIDE_ICONS_BY_NAME);

/**
 * Whether {@link LucideIcon} can render the given name. Lets a caller that also has an image path
 * fall back to the path for a name this build does not know, such as one a newer core added.
 *
 * @param name Lucide icon name in kebab-case, or `undefined` when the item names no icon
 */
export function isLucideIconName(name: string | undefined): name is string {
  return name !== undefined && Object.hasOwn(LUCIDE_ICONS_BY_NAME, name);
}

/** @experimental This export is unstable and may change shape or disappear without notice */
export type LucideIconProps = {
  /**
   * Lucide icon name in kebab-case, e.g. `refresh-cw`. Must be one of {@link LUCIDE_ICON_NAMES}.
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  name: string;
  /**
   * Extra classes for the svg, appended to the default 16px size
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  className?: string;
};

/**
 * Renders a lucide icon by name. The svg strokes with `currentColor`, so it follows the text colour
 * of its surroundings (theme, hover, selected and disabled states). Renders nothing for a name that
 * is not in {@link LUCIDE_ICON_NAMES}.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function LucideIcon({ name, className }: LucideIconProps) {
  // Object.hasOwn keeps inherited keys such as `constructor` from resolving to a non-icon
  const Icon = isLucideIconName(name) ? LUCIDE_ICONS_BY_NAME[name] : undefined;
  if (!Icon) return undefined;
  return <Icon aria-hidden="true" className={cn('tw:h-4 tw:w-4 tw:shrink-0', className)} />;
}

export default LucideIcon;
