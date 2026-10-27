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

// This module has no imports through the `@/` alias, so `menu.util.ts` can use it and still be
// type-checked from the core workspace, which does not resolve that alias.

/**
 * Curated set of lucide icons that can be shown by name. Each icon is a named import so the bundle
 * contains only these icons; adding an icon means adding it here.
 */
const LUCIDE_ICON_COMPONENTS = {
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
} as const satisfies Record<string, LucideIconComponent>;

/** Name of an icon in the curated set */
export type LucideIconName = keyof typeof LUCIDE_ICON_COMPONENTS;

export const LUCIDE_ICONS_BY_NAME: Readonly<Record<LucideIconName, LucideIconComponent>> =
  LUCIDE_ICON_COMPONENTS;

/**
 * Names (lucide kebab-case) of the icons `LucideIcon` can render
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const LUCIDE_ICON_NAMES: readonly string[] = Object.keys(LUCIDE_ICONS_BY_NAME);

/**
 * Whether `LucideIcon` can render the given name. Lets a caller that also has an image path fall
 * back to the path for a name this build does not know, such as one a newer core added.
 *
 * @param name Lucide icon name in kebab-case, or `undefined` when the item names no icon
 */
export function isLucideIconName(name: string | undefined): name is LucideIconName {
  // Object.hasOwn keeps inherited keys such as `constructor` from resolving to a non-icon
  return name !== undefined && Object.hasOwn(LUCIDE_ICONS_BY_NAME, name);
}
