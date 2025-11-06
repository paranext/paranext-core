import { EditorThemeClasses } from 'lexical';

import './editor-theme.css';

export const editorTheme: EditorThemeClasses = {
  ltr: 'tw-text-left',
  rtl: 'tw-text-right',
  heading: {
    h1: 'tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl',
    h2: 'tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0',
    h3: 'tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight',
    h4: 'tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight',
    h5: 'tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight',
    h6: 'tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight',
  },
  paragraph: 'tw-outline-none',
  quote: 'tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic',
  link: 'tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer',
  list: {
    checklist: 'tw-relative',
    listitem: 'tw-mx-8',
    listitemChecked:
      'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',
    listitemUnchecked:
      'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',
    nested: {
      listitem: 'tw-list-none before:tw-hidden after:tw-hidden',
    },
    ol: 'tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2',
    olDepth: [
      'tw-list-outside !tw-list-decimal',
      'tw-list-outside !tw-list-[upper-roman]',
      'tw-list-outside !tw-list-[lower-roman]',
      'tw-list-outside !tw-list-[upper-alpha]',
      'tw-list-outside !tw-list-[lower-alpha]',
    ],
    ul: 'tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2',
    ulDepth: [
      'tw-list-outside !tw-list-disc',
      'tw-list-outside !tw-list-disc',
      'tw-list-outside !tw-list-disc',
      'tw-list-outside !tw-list-disc',
      'tw-list-outside !tw-list-disc',
    ],
  },
  hashtag: 'tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1',
  text: {
    bold: 'tw-font-bold',
    code: 'tw-bg-gray-100 tw-p-1 tw-rounded-md',
    italic: 'tw-italic',
    strikethrough: 'tw-line-through',
    subscript: 'tw-sub',
    superscript: 'tw-sup',
    underline: 'tw-underline',
    underlineStrikethrough: 'tw-underline tw-line-through',
  },
  image: 'tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image',
  inlineImage:
    'tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image',
  keyword: 'tw-text-purple-900 tw-font-bold',
  code: 'EditorTheme__code',
  codeHighlight: {
    atrule: 'EditorTheme__tokenAttr',
    attr: 'EditorTheme__tokenAttr',
    boolean: 'EditorTheme__tokenProperty',
    builtin: 'EditorTheme__tokenSelector',
    cdata: 'EditorTheme__tokenComment',
    char: 'EditorTheme__tokenSelector',
    class: 'EditorTheme__tokenFunction',
    'class-name': 'EditorTheme__tokenFunction',
    comment: 'EditorTheme__tokenComment',
    constant: 'EditorTheme__tokenProperty',
    deleted: 'EditorTheme__tokenProperty',
    doctype: 'EditorTheme__tokenComment',
    entity: 'EditorTheme__tokenOperator',
    function: 'EditorTheme__tokenFunction',
    important: 'EditorTheme__tokenVariable',
    inserted: 'EditorTheme__tokenSelector',
    keyword: 'EditorTheme__tokenAttr',
    namespace: 'EditorTheme__tokenVariable',
    number: 'EditorTheme__tokenProperty',
    operator: 'EditorTheme__tokenOperator',
    prolog: 'EditorTheme__tokenComment',
    property: 'EditorTheme__tokenProperty',
    punctuation: 'EditorTheme__tokenPunctuation',
    regex: 'EditorTheme__tokenVariable',
    selector: 'EditorTheme__tokenSelector',
    string: 'EditorTheme__tokenSelector',
    symbol: 'EditorTheme__tokenProperty',
    tag: 'EditorTheme__tokenProperty',
    url: 'EditorTheme__tokenOperator',
    variable: 'EditorTheme__tokenVariable',
  },
  characterLimit: '!tw-bg-destructive/50',
  table: 'EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse',
  tableCell:
    'EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right',
  tableCellActionButton:
    'EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer',
  tableCellActionButtonContainer:
    'EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5',
  tableCellEditing: 'EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm',
  tableCellHeader:
    'EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right',
  tableCellPrimarySelected:
    'EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ',
  tableCellResizer:
    'EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0',
  tableCellSelected: 'EditorTheme__tableCellSelected tw-bg-muted',
  tableCellSortedIndicator:
    'EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted',
  tableResizeRuler:
    'EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0',
  tableRowStriping: 'EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted',
  tableSelected: 'EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2',
  tableSelection: 'EditorTheme__tableSelection tw-bg-transparent',
  layoutItem: 'tw-border tw-border-dashed tw-px-4 tw-py-2',
  layoutContainer: 'tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0',
  autocomplete: 'tw-text-muted-foreground',
  blockCursor: '',
  embedBlock: {
    base: 'tw-user-select-none',
    focus: 'tw-ring-2 tw-ring-primary tw-ring-offset-2',
  },
  hr: 'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',
  indent: '[--lexical-indent-base-value:40px]',
  mark: '',
  markOverlap: '',
};
