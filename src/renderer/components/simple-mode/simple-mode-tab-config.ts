import { type LucideIcon } from 'lucide-react';
import {
  BookOpen,
  PenLine,
  Library,
  FileText,
  BookOpenText,
  Languages,
  MessageSquare,
  Search,
  Sparkles,
  LayoutList,
  GitCompareArrows,
  LetterText,
} from 'lucide-react';
import { SimplePanelId } from './simple-mode-layout.component';

/** Definition for a tab in Simple Mode */
export type SimpleTabDefinition = {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Whether this tab has a real webview or is a placeholder */
  isPlaceholder: boolean;
  /** The default panel this tab belongs to */
  defaultPanel: SimplePanelId;
};

/**
 * Tab definitions for Study & Draft workflow.
 *
 * Reference and Editor panels have 1 tab each (tab bar hidden). Tools panel has many tabs (tab bar
 * shown).
 */
export const SIMPLE_MODE_TABS: SimpleTabDefinition[] = [
  // Reference panel — single tab, tab bar hidden
  {
    id: 'reference-text',
    label: 'Reference Text',
    icon: BookOpen,
    isPlaceholder: false,
    defaultPanel: 'reference',
  },

  // Editor panel — single tab, tab bar hidden
  {
    id: 'scripture-editor',
    label: 'Scripture Editor',
    icon: PenLine,
    isPlaceholder: false,
    defaultPanel: 'editor',
  },

  // Tools/Resources panel — many tabs, tab bar shown
  {
    id: 'bible-texts',
    label: 'Bible Texts',
    icon: BookOpenText,
    isPlaceholder: false,
    defaultPanel: 'tools',
  },
  {
    id: 'commentary',
    label: 'Commentary',
    icon: FileText,
    isPlaceholder: false,
    defaultPanel: 'tools',
  },
  {
    id: 'dictionary',
    label: 'Dictionary',
    icon: LetterText,
    isPlaceholder: false,
    defaultPanel: 'tools',
  },
  {
    id: 'text-collection',
    label: 'Text Collection',
    icon: Library,
    isPlaceholder: true,
    defaultPanel: 'tools',
  },
  {
    id: 'parallel-passages',
    label: 'Parallel Passages',
    icon: GitCompareArrows,
    isPlaceholder: true,
    defaultPanel: 'tools',
  },
  {
    id: 'biblical-terms',
    label: 'Biblical Terms',
    icon: LayoutList,
    isPlaceholder: true,
    defaultPanel: 'tools',
  },
  {
    id: 'source-language-tools',
    label: 'Source Language Tools',
    icon: Languages,
    isPlaceholder: false,
    defaultPanel: 'tools',
  },
  {
    id: 'comments',
    label: 'Comments',
    icon: MessageSquare,
    isPlaceholder: false,
    defaultPanel: 'tools',
  },
  {
    id: 'find',
    label: 'Find',
    icon: Search,
    isPlaceholder: false,
    defaultPanel: 'tools',
  },
  {
    id: 'ask-ai',
    label: 'Ask AI',
    icon: Sparkles,
    isPlaceholder: true,
    defaultPanel: 'tools',
  },
];

/** Get tabs for a specific panel */
export function getTabsForPanel(panelId: SimplePanelId): SimpleTabDefinition[] {
  return SIMPLE_MODE_TABS.filter((tab) => tab.defaultPanel === panelId);
}

/** Get a tab definition by its ID */
export function getTabById(tabId: string): SimpleTabDefinition | undefined {
  return SIMPLE_MODE_TABS.find((tab) => tab.id === tabId);
}
