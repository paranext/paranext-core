import {
  BookOpen,
  MessageSquareText,
  BookA,
  Languages,
  MessageCircle,
  Search,
  Sparkles,
  ScrollText,
  Library,
  Columns2,
  CheckCircle,
  List,
  type LucideIcon,
} from 'lucide-react';

export interface ToolTabConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  /** The webview type to render, or undefined for placeholder tabs */
  webViewType: string | undefined;
  /** Whether this tab is a placeholder with no webview */
  placeholder?: boolean;
  /** Function to derive webview options from context */
  getWebViewOptions?: (context: {
    projectId: string | undefined;
    bookNum: number;
  }) => Record<string, unknown>;
}

const toolPanelTabs: ToolTabConfig[] = [
  {
    id: 'bibleTexts',
    label: 'Bible Texts',
    icon: BookOpen,
    webViewType: 'platformScriptureEditor.react',
    getWebViewOptions: () => ({ isReadOnly: true }),
  },
  {
    id: 'commentary',
    label: 'Commentary',
    icon: MessageSquareText,
    webViewType: 'platformScriptureEditor.react',
    getWebViewOptions: () => ({ projectId: 'HBKENG', isReadOnly: true }),
  },
  {
    id: 'dictionary',
    label: 'Dictionary',
    icon: BookA,
    webViewType: 'platformLexicalTools.dictionary',
  },
  {
    id: 'biblicalTerms',
    label: 'Biblical Terms',
    icon: Languages,
    webViewType: undefined,
    placeholder: true,
  },
  {
    id: 'comments',
    label: 'Comments',
    icon: MessageCircle,
    webViewType: 'legacyCommentManager.commentList',
    getWebViewOptions: ({ projectId }) => ({ projectId }),
  },
  {
    id: 'search',
    label: 'Search',
    icon: Search,
    webViewType: 'platformScripture.find',
  },
  {
    id: 'askAi',
    label: 'Ask AI',
    icon: Sparkles,
    webViewType: undefined,
    placeholder: true,
  },
  {
    id: 'sourceLang',
    label: 'Source Language Tools',
    icon: ScrollText,
    webViewType: 'platformScriptureEditor.react',
    getWebViewOptions: ({ bookNum }) => ({
      // Old Testament books are 1-39, New Testament 40-66
      projectId: bookNum <= 39 ? 'OHEB' : 'OGRK',
      isReadOnly: true,
    }),
  },
  {
    id: 'textCollection',
    label: 'Text Collection',
    icon: Library,
    webViewType: undefined,
    placeholder: true,
  },
  {
    id: 'parallelPassages',
    label: 'Parallel Passages',
    icon: Columns2,
    webViewType: undefined,
    placeholder: true,
  },
  {
    id: 'checkResults',
    label: 'Check Results',
    icon: CheckCircle,
    webViewType: 'platformScripture.checksSidePanel',
    getWebViewOptions: ({ projectId }) => ({ projectId }),
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: List,
    webViewType: 'platformScripture.characterInventory',
    getWebViewOptions: ({ projectId }) => ({ projectId }),
  },
];

export default toolPanelTabs;
