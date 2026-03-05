import {
  DeltaOp,
  DeltaOpInsertNoteEmbed,
  DeltaSource,
  Editorial,
  EditorOptions,
  EditorRef,
  getDefaultViewOptions,
  isInsertEmbedOpOfType,
  ViewOptions,
} from '@eten-tech-foundation/platform-editor';
import { Usj, USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { renderEditorialWithToolbar } from '@/components/demo/scripture-editor/editorial-with-toolbar.renderer';
import {
  annotationRangeWeb1,
  annotationRangeWeb2,
  usjEmpty,
  usjHebrew,
  usjWeb,
} from '@/components/demo/scripture-editor/usj.data';
import '@/components/demo/scripture-editor/scripture-editor.stories.css';
import FootnoteEditor from '@/components/advanced/footnote-editor/footnote-editor.component';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/shadcn-ui/popover';
import { FootnoteEditorLocalizedStrings } from '@/components/advanced/footnote-editor/footnote-editor.types';

const defaultScrRef: SerializedVerseRef = { book: 'PSA', chapterNum: 1, verseNum: 1 };

const meta: Meta<typeof Editorial> = {
  title: 'Demo/Editorial',
  component: Editorial,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Demo Only:** This component is provided for demonstration purposes only. For production applications, developers should import the Scripture Editor component directly from:
- npm [@eten-tech-foundation/platform-editor](https://www.npmjs.com/package/@eten-tech-foundation/platform-editor)
- github [eten-tech-foundation/platform-editor](https://github.com/eten-tech-foundation/scripture-editors/tree/main/packages/platform)

This demo version is included in Storybook to showcase the component's functionality and usage patterns.

**Known Limitation:** In the Docs view, all story examples may show the same note caller style due to global state management in the editor component. To see the correct note caller behavior for each story (default lowercase letters vs custom symbols), please view the individual stories in the Canvas view instead of the Docs view.
        `,
      },
    },
  },
  argTypes: {
    // Add argTypes here as needed for props
    ref: {
      control: 'object',
      description: 'Reference to the editor instance',
      // eslint-disable-next-line no-null/no-null
      defaultValue: null,
    },
    defaultUsj: {
      control: 'object',
      description: 'Default USJ object to initialize the editor with',
      defaultValue: {
        type: USJ_TYPE,
        version: USJ_VERSION,
        content: [''],
      },
    },
    scrRef: {
      control: 'object',
      description: 'Scripture reference',
      defaultValue: defaultScrRef,
    },
    options: {
      control: 'object',
      description: 'Options to configure the editor (EditorOptions)',
      defaultValue: {},
      table: {
        type: {
          summary: 'EditorOptions',
          detail:
            '{ isReadonly?: boolean; hasSpellCheck?: boolean; textDirection?: "ltr" | "rtl" | ' +
            '"auto"; markerMenuTrigger?: string; nodes?: UsjNodeOptions; }',
        },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Editorial>;

/** Story type with custom flattened ViewOptions args for the Controls panel */
type ViewOptionsStory = Omit<Story, 'args' | 'argTypes' | 'render'> & {
  args: ViewOptions;
  argTypes: Partial<Record<keyof ViewOptions, object>>;
  render: (
    args: ViewOptions,
    context: { viewMode: string; parameters?: { docs?: { description?: { story?: string } } } },
  ) => ReactNode;
};

export const Default: Story = {
  args: {
    defaultUsj: usjWeb,
    scrRef: defaultScrRef,
  },
};

export const Empty: Story = {
  args: {
    defaultUsj: usjEmpty,
    scrRef: defaultScrRef,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultUsj: usjWeb,
    scrRef: defaultScrRef,
    options: {
      isReadonly: true,
    },
  },
};

export const RTL: Story = {
  render: (args, context) => renderEditorialWithToolbar(args, context, defaultScrRef),
  parameters: {
    docs: {
      description: {
        story:
          'Right-to-left example using a Hebrew snippet (Psalm 1:1). ' +
          'The editor is set to RTL via _options.textDirection = "rtl"_. If you want the UI ' +
          '(tab toolbar) to be RTL click **Switch direction** in the Storybook toolbar.',
      },
    },
  },
  args: {
    defaultUsj: usjHebrew,
    options: {
      hasExternalUI: true,
      textDirection: 'rtl',
    },
  },
};

function handleAnnotationOnClick(
  event: globalThis.MouseEvent,
  type: string,
  id: string,
  textContent: string,
) {
  // eslint-disable-next-line no-console
  console.log('handleAnnotationOnClick', { event, type, id, textContent });
}

function handleAnnotationOnRemove(type: string, id: string, cause: string, textContent: string) {
  // eslint-disable-next-line no-console
  console.log('handleAnnotationOnRemove', { type, id, cause, textContent });
}

export const Annotated: Story = {
  render: (args) => {
    // eslint-disable-next-line no-null/no-null
    const editorRef = useRef<EditorRef | null>(null);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.setAnnotation(
            annotationRangeWeb1,
            'spelling',
            'annotationId',
            handleAnnotationOnClick,
            handleAnnotationOnRemove,
          );
          editorRef.current.setAnnotation(
            annotationRangeWeb2,
            'grammar',
            'abc123',
            handleAnnotationOnClick,
            handleAnnotationOnRemove,
          );
        }
      }, 0);
      return () => clearTimeout(timeoutId);
    }, []);

    return <Editorial {...args} ref={editorRef} />;
  },
  args: {
    defaultUsj: usjWeb,
    scrRef: defaultScrRef,
  },
};

const insertNoteOptions: EditorOptions = {
  hasExternalUI: true,
  view: { ...getDefaultViewOptions(), noteMode: 'expandInline' },
};

export const InsertNote: Story = {
  render: (args, context) => renderEditorialWithToolbar(args, context, defaultScrRef),
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates inserting notes. Use the Project menu (hamburger) or the ' +
          'toolbar buttons above the editor to insert footnotes, cross-references, and endnotes ' +
          'at the current cursor position. Selecting text before inserting a footnote will use ' +
          'that text as the footnote quote. You can also insert by typing "\\f", "\\x", or "\\fe".',
      },
    },
  },
  args: {
    defaultUsj: usjWeb,
    options: insertNoteOptions,
  },
};

const customNodeOptions: EditorOptions = {
  hasExternalUI: true,
  nodes: {
    noteCallers: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'],
    noteCallerOnClick: (event, noteNodeKey, isCollapsed, getCaller, setCaller, getNoteOps) => {
      // eslint-disable-next-line no-console
      console.log(
        'Note caller clicked:',
        event,
        noteNodeKey,
        isCollapsed,
        getCaller,
        setCaller,
        getNoteOps,
      );
      // eslint-disable-next-line no-alert
      alert('Note caller clicked! Check console for details.');
    },
  },
};

export const CustomNoteOptions: Story = {
  render: (args, context) => renderEditorialWithToolbar(args, context, defaultScrRef),
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates custom note callers and click handling. **Try clicking on the ' +
          'circled number footnote markers (① ②) in the text to see the click handler in ' +
          'action!** The click event will show an alert and log details to the browser console.',
      },
    },
  },
  args: {
    defaultUsj: usjWeb,
    options: customNodeOptions,
  },
};

export const CustomMarkerTrigger: Story = {
  render: (args, context) => renderEditorialWithToolbar(args, context, defaultScrRef),
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates using a custom marker menu trigger key. **Try typing "?" ' +
          '(question mark) anywhere in the editor text to open the marker menu!** The default ' +
          'trigger is "\\\\" (backslash), but this story changes it to "?" for demonstration. ' +
          'The marker menu allows you to insert USFM markers into the text.',
      },
    },
  },
  args: {
    defaultUsj: usjWeb,
    options: {
      hasExternalUI: true,
      markerMenuTrigger: '?',
    },
  },
};

const sampleFootnoteEditorLocalizedStrings: FootnoteEditorLocalizedStrings = {
  '%footnoteEditor_callerDropdown_label%': 'Footnote caller',
  '%footnoteEditor_callerDropdown_item_generated%': 'Auto-generated',
  '%footnoteEditor_callerDropdown_item_hidden%': 'Hidden',
  '%footnoteEditor_callerDropdown_item_custom%': 'Custom',
  '%footnoteEditor_callerDropdown_tooltip%': 'Footnote caller',
  '%footnoteEditor_cancelButton_tooltip%': 'Cancel',
  '%footnoteEditor_copyButton_tooltip%': 'Copy footnote',
  '%footnoteEditor_noteType_crossReference_label%': 'Cross reference',
  '%footnoteEditor_noteType_endNote_label%': 'Endnote',
  '%footnoteEditor_noteType_footnote_label%': 'Footnote',
  '%footnoteEditor_noteType_tooltip%': 'Change type: Footnote',
  '%footnoteEditor_noteTypeDropdown_label%': 'Type',
  '%footnoteEditor_saveButton_tooltip%': 'Save',
  '%markerMenu_deprecated_label%': 'Deprecated',
  '%markerMenu_disallowed_label%': 'Disallowed',
  '%markerMenu_marker_add_description%': 'For a translational addition to the text',
  '%markerMenu_marker_addpn_description%': 'For chinese words to be dot underline & underline',
  '%markerMenu_marker_b_description%': 'Poetry text stanza break (e.g. stanza break) (basic)',
  '%markerMenu_marker_bd_description%': 'A character style, use bold text',
  '%markerMenu_marker_bdit_description%': 'A character style, use bold + italic text',
  '%markerMenu_marker_bk_description%': 'For the quoted name of a book',
  '%markerMenu_marker_c_description%': 'Chapter number',
  '%markerMenu_marker_ca_description%':
    'Second (alternate) chapter number (for coding dual versification; useful for places where different traditions of chapter breaks need to be supported in the same translation)',
  '%markerMenu_marker_cd_description%':
    'Chapter Description (Publishing option D, e.g. in Russian Bibles)',
  '%markerMenu_marker_cl_description%':
    "Chapter label used for translations that add a word such as 'Chapter' before chapter numbers (e.g. Psalms). The subsequent text is the chapter label.",
  '%markerMenu_marker_cls_description%': 'Letter Closing',
  '%markerMenu_marker_cp_description%':
    'Published chapter number (chapter string that should appear in the published text)',
  '%markerMenu_marker_d_description%':
    'A Hebrew text heading, to provide description (e.g. Psalms)',
  '%markerMenu_marker_dc_description%':
    'Deuterocanonical/LXX additions or insertions in the Protocanonical text',
  '%markerMenu_marker_em_description%': 'A character style, use emphasized text style',
  '%markerMenu_marker_f_description%': 'A Footnote text item (basic)',
  '%markerMenu_marker_fdc_description%': 'Footnote text, applies to Deuterocanon only',
  '%markerMenu_marker_fe_description%': 'An Endnote text item',
  '%markerMenu_marker_fk_description%': 'A footnote keyword (basic)',
  '%markerMenu_marker_fl_description%':
    "A footnote label text item, for marking or 'labelling' the type or alternate translation being provided in the note.",
  '%markerMenu_marker_fm_description%':
    'An additional footnote marker location for a previous footnote',
  '%markerMenu_marker_fp_description%': 'A Footnote additional paragraph marker',
  '%markerMenu_marker_fq_description%': 'A footnote scripture quote or alternate rendering (basic)',
  '%markerMenu_marker_fqa_description%':
    'A footnote alternate rendering for a portion of scripture text',
  '%markerMenu_marker_fr_description%': 'The origin reference for the footnote (basic)',
  '%markerMenu_marker_ft_description%': 'Footnote text, Protocanon (basic)',
  '%markerMenu_marker_fv_description%': 'A verse number within the footnote text',
  '%markerMenu_marker_fw_description%':
    'A footnote witness list, for distinguishing a list of sigla representing witnesses in critical editions.',
  '%markerMenu_marker_h_description%': 'Running header text for a book (basic)',
  '%markerMenu_marker_h1_description%': 'Running header text',
  '%markerMenu_marker_h2_description%': 'Running header text, left side of page',
  '%markerMenu_marker_h3_description%': 'Running header text, right side of page',
  '%markerMenu_marker_ib_description%': 'Introduction blank line',
  '%markerMenu_marker_id_description%':
    'File identification information (BOOKID, FILENAME, EDITOR, MODIFICATION DATE)',
  '%markerMenu_marker_ide_description%': 'File encoding information',
  '%markerMenu_marker_ie_description%': 'Introduction ending marker',
  '%markerMenu_marker_iex_description%':
    'Introduction explanatory or bridge text (e.g. explanation of missing book in Short Old Testament)',
  '%markerMenu_marker_ili_description%': 'A list entry, level 1 (if single level)',
  '%markerMenu_marker_ili1_description%': 'A list entry, level 1 (if multiple levels)',
  '%markerMenu_marker_ili2_description%': 'A list entry, level 2',
  '%markerMenu_marker_im_description%':
    'Introduction prose paragraph, with no first line indent (may occur after poetry)',
  '%markerMenu_marker_imi_description%':
    'Introduction prose paragraph text, indented, with no first line indent',
  '%markerMenu_marker_imq_description%':
    'Introduction prose paragraph, quote from the body text, with no first line indent',
  '%markerMenu_marker_imt_description%':
    'Introduction major title, level 1 (if single level) (basic)',
  '%markerMenu_marker_imt1_description%': 'Introduction major title, level 1 (if multiple levels)',
  '%markerMenu_marker_imt2_description%': 'Introduction major title, level 2',
  '%markerMenu_marker_imt3_description%': 'Introduction major title, level 3',
  '%markerMenu_marker_imt4_description%':
    'Introduction major title, level 4 (usually within parenthesis)',
  '%markerMenu_marker_imte_description%':
    'Introduction major title at introduction end, level 1 (if single level)',
  '%markerMenu_marker_imte1_description%':
    'Introduction major title at introduction end, level 1 (if multiple levels)',
  '%markerMenu_marker_imte2_description%': 'Introduction major title at introduction end, level 2',
  '%markerMenu_marker_io_description%': 'Introduction outline text, level 1 (if single level)',
  '%markerMenu_marker_io1_description%':
    'Introduction outline text, level 1 (if multiple levels) (basic)',
  '%markerMenu_marker_io2_description%': 'Introduction outline text, level 2',
  '%markerMenu_marker_io3_description%': 'Introduction outline text, level 3',
  '%markerMenu_marker_io4_description%': 'Introduction outline text, level 4',
  '%markerMenu_marker_ior_description%':
    'Introduction references range for outline entry; for marking references separately',
  '%markerMenu_marker_iot_description%': 'Introduction outline title (basic)',
  '%markerMenu_marker_ip_description%': 'Introduction prose paragraph (basic)',
  '%markerMenu_marker_ipi_description%':
    'Introduction prose paragraph, indented, with first line indent',
  '%markerMenu_marker_ipq_description%': 'Introduction prose paragraph, quote from the body text',
  '%markerMenu_marker_ipr_description%': 'Introduction prose paragraph, right aligned',
  '%markerMenu_marker_iq_description%': 'Introduction poetry text, level 1 (if single level)',
  '%markerMenu_marker_iq1_description%': 'Introduction poetry text, level 1 (if multiple levels)',
  '%markerMenu_marker_iq2_description%': 'Introduction poetry text, level 2',
  '%markerMenu_marker_iq3_description%': 'Introduction poetry text, level 3',
  '%markerMenu_marker_iqt_description%': 'For quoted scripture text appearing in the introduction',
  '%markerMenu_marker_is_description%':
    'Introduction section heading, level 1 (if single level) (basic)',
  '%markerMenu_marker_is1_description%':
    'Introduction section heading, level 1 (if multiple levels)',
  '%markerMenu_marker_is2_description%': 'Introduction section heading, level 2',
  '%markerMenu_marker_it_description%': 'A character style, use italic text',
  '%markerMenu_marker_k_description%': 'For a keyword',
  '%markerMenu_marker_li_description%': 'A list entry, level 1 (if single level)',
  '%markerMenu_marker_li1_description%': 'A list entry, level 1 (if multiple levels)',
  '%markerMenu_marker_li2_description%': 'A list entry, level 2',
  '%markerMenu_marker_li3_description%': 'A list entry, level 3',
  '%markerMenu_marker_li4_description%': 'A list entry, level 4',
  '%markerMenu_marker_lf_description%': 'List footer (concluding remark)',
  '%markerMenu_marker_lh_description%': 'List header (introductory remark)',
  '%markerMenu_marker_lik_description%': 'Structured list entry key text',
  '%markerMenu_marker_lim_description%': 'An embedded list entry, level 1 (if single level)',
  '%markerMenu_marker_lim1_description%': 'An embedded list entry, level 1 (if multiple levels)',
  '%markerMenu_marker_lim2_description%': 'An embedded list entry, level 2',
  '%markerMenu_marker_lim3_description%': 'An embedded list item, level 3',
  '%markerMenu_marker_lim4_description%': 'An embedded list entry, level 4',
  '%markerMenu_marker_lit_description%': 'For a comment or note inserted for liturgical use',
  '%markerMenu_marker_litl_description%': 'List entry total text',
  '%markerMenu_marker_liv_description%': 'Structured list entry value 1 content (if single value)',
  '%markerMenu_marker_liv1_description%':
    'Structured list entry value 1 content (if multiple values)',
  '%markerMenu_marker_liv2_description%': 'Structured list entry value 2 content',
  '%markerMenu_marker_liv3_description%': 'Structured list entry value 3 content',
  '%markerMenu_marker_liv4_description%': 'Structured list entry value 4 content',
  '%markerMenu_marker_liv5_description%': 'Structured list entry value 5 content',
  '%markerMenu_marker_m_description%':
    'Paragraph text, with no first line indent (may occur after poetry) (basic)',
  '%markerMenu_marker_mi_description%':
    'Paragraph text, indented, with no first line indent; often used for discourse',
  '%markerMenu_marker_mr_description%': 'A major section division references range heading (basic)',
  '%markerMenu_marker_ms_description%':
    'A major section division heading, level 1 (if single level) (basic)',
  '%markerMenu_marker_ms1_description%':
    'A major section division heading, level 1 (if multiple levels)',
  '%markerMenu_marker_ms2_description%': 'A major section division heading, level 2',
  '%markerMenu_marker_ms3_description%': 'A major section division heading, level 3',
  '%markerMenu_marker_mt_description%': 'The main title of the book (if single level)',
  '%markerMenu_marker_mt1_description%': 'The main title of the book (if multiple levels) (basic)',
  '%markerMenu_marker_mt2_description%':
    'A secondary title usually occurring before the main title (basic)',
  '%markerMenu_marker_mt3_description%': 'A secondary title occurring after the main title',
  '%markerMenu_marker_mt4_description%':
    'A small secondary title sometimes occurring within parentheses',
  '%markerMenu_marker_mte_description%':
    'The main title of the book repeated at the end of the book, level 1 (if single level)',
  '%markerMenu_marker_mte1_description%':
    'The main title of the book repeated at the end of the book, level 1 (if multiple levels)',
  '%markerMenu_marker_mte2_description%':
    "A secondary title occurring before or after the 'ending' main title",
  '%markerMenu_marker_nb_description%':
    'Paragraph text, with no break from previous paragraph text (at chapter boundary) (basic)',
  '%markerMenu_marker_nd_description%': 'For name of deity (basic)',
  '%markerMenu_marker_no_description%': 'A character style, use normal text',
  '%markerMenu_marker_ord_description%': 'For the text portion of an ordinal number',
  '%markerMenu_marker_p_description%': 'Paragraph text, with first line indent (basic)',
  '%markerMenu_marker_pb_description%':
    "Page Break used for new reader portions and children's bibles where content is controlled by the page",
  '%markerMenu_marker_pc_description%': 'Paragraph text, centered (for Inscription)',
  '%markerMenu_marker_pi_description%':
    'Paragraph text, level 1 indent (if single level), with first line indent; often used for discourse (basic)',
  '%markerMenu_marker_pi1_description%':
    'Paragraph text, level 1 indent (if multiple levels), with first line indent; often used for discourse',
  '%markerMenu_marker_pi2_description%':
    'Paragraph text, level 2 indent, with first line indent; often used for discourse',
  '%markerMenu_marker_pi3_description%':
    'Paragraph text, level 3 indent, with first line indent; often used for discourse',
  '%markerMenu_marker_pm_description%': 'Embedded text paragraph',
  '%markerMenu_marker_pmc_description%': 'Embedded text closing',
  '%markerMenu_marker_pmo_description%': 'Embedded text opening',
  '%markerMenu_marker_pmr_description%':
    "Embedded text refrain (e.g. Then all the people shall say, 'Amen!')",
  '%markerMenu_marker_pn_description%': 'For a proper name',
  '%markerMenu_marker_png_description%': 'For a geographic proper name',
  '%markerMenu_marker_po_description%': 'Letter opening',
  '%markerMenu_marker_pr_description%': 'Text refrain (paragraph text, right aligned)',
  '%markerMenu_marker_q_description%': 'Poetry text, level 1 indent (if single level)',
  '%markerMenu_marker_q1_description%': 'Poetry text, level 1 indent (if multiple levels) (basic)',
  '%markerMenu_marker_q2_description%': 'Poetry text, level 2 indent (basic)',
  '%markerMenu_marker_q3_description%': 'Poetry text, level 3 indent',
  '%markerMenu_marker_q4_description%': 'Poetry text, level 4 indent',
  '%markerMenu_marker_qa_description%': 'Poetry text, Acrostic marker/heading',
  '%markerMenu_marker_qac_description%':
    'Poetry text, Acrostic markup of the first character of a line of acrostic poetry',
  '%markerMenu_marker_qc_description%': 'Poetry text, centered',
  '%markerMenu_marker_qd_description%':
    'A Hebrew musical performance annotation, similar in content to Hebrew descriptive title.',
  '%markerMenu_marker_qm_description%': 'Poetry text, embedded, level 1 indent (if single level)',
  '%markerMenu_marker_qm1_description%':
    'Poetry text, embedded, level 1 indent (if multiple levels)',
  '%markerMenu_marker_qm2_description%': 'Poetry text, embedded, level 2 indent',
  '%markerMenu_marker_qm3_description%': 'Poetry text, embedded, level 3 indent',
  '%markerMenu_marker_qr_description%': 'Poetry text, Right Aligned',
  '%markerMenu_marker_qs_description%': 'Poetry text, Selah',
  '%markerMenu_marker_qt_description%':
    'For Old Testament quoted text appearing in the New Testament (basic)',
  '%markerMenu_marker_r_description%': 'Parallel reference(s) (basic)',
  '%markerMenu_marker_rem_description%': 'Comments and remarks',
  '%markerMenu_marker_restore_description%': 'Project restore information',
  '%markerMenu_marker_rq_description%':
    'A cross-reference indicating the source text for the preceding quotation.',
  '%markerMenu_marker_s_description%': 'A section heading, level 1 (if single level) (basic)',
  '%markerMenu_marker_s1_description%': 'A section heading, level 1 (if multiple levels)',
  '%markerMenu_marker_s2_description%': 'A section heading, level 2 (e.g. Proverbs 22-24)',
  '%markerMenu_marker_s3_description%': "A section heading, level 3 (e.g. Genesis 'The First Day')",
  '%markerMenu_marker_s4_description%': 'A section heading, level 4',
  '%markerMenu_marker_sc_description%': 'A character style, for small capitalization text',
  '%markerMenu_marker_sd_description%':
    'Vertical space used to divide the text into sections, level 1 (if single level)',
  '%markerMenu_marker_sd1_description%':
    'Vertical space used to divide the text into sections, level 1 (if multiple levels)',
  '%markerMenu_marker_sd2_description%':
    'Vertical space used to divide the text into sections, level 2',
  '%markerMenu_marker_sd3_description%':
    'Vertical space used to divide the text into sections, level 3',
  '%markerMenu_marker_sd4_description%':
    'Vertical space used to divide the text into sections, level 4',
  '%markerMenu_marker_sig_description%': 'For the signature of the author of an Epistle',
  '%markerMenu_marker_sls_description%':
    'To represent where the original text is in a secondary language or from an alternate text source',
  '%markerMenu_marker_sp_description%': 'A heading, to identify the speaker (e.g. Job)',
  '%markerMenu_marker_sr_description%': 'A section division references range heading',
  '%markerMenu_marker_sts_description%': 'Status of this file',
  '%markerMenu_marker_sup_description%':
    'A character style, for superscript text. Typically for use in critical edition footnotes.',
  '%markerMenu_marker_tl_description%': 'For transliterated words',
  '%markerMenu_marker_toc1_description%': 'Long table of contents text',
  '%markerMenu_marker_toc2_description%': 'Short table of contents text',
  '%markerMenu_marker_toc3_description%': 'Book Abbreviation',
  '%markerMenu_marker_toca1_description%': 'Alternative language long table of contents text',
  '%markerMenu_marker_toca2_description%': 'Alternative language short table of contents text',
  '%markerMenu_marker_toca3_description%': 'Alternative language book Abbreviation',
  '%markerMenu_marker_usfm_description%': 'File markup version information',
  '%markerMenu_marker_v_description%': 'A verse number',
  '%markerMenu_marker_va_description%':
    'Second (alternate) verse number (for coding dual numeration in Psalms; see also NRSV Exo 22.1-4)',
  '%markerMenu_marker_vp_description%':
    'Published verse marker (verse string that should appear in the published text)',
  '%markerMenu_marker_wj_description%': 'For marking the words of Jesus',
  '%markerMenu_marker_x_description%': 'A list of cross references (basic)',
  '%markerMenu_marker_xdc_description%': 'Cross-reference target reference(s), Deuterocanon only',
  '%markerMenu_marker_xk_description%': 'A cross reference keyword',
  '%markerMenu_marker_xnt_description%': 'Cross-reference target reference(s), New Testament only',
  '%markerMenu_marker_xo_description%': 'The cross reference origin reference (basic)',
  '%markerMenu_marker_xop_description%':
    'Published cross reference origin reference (origin reference that should appear in the published text)',
  '%markerMenu_marker_xot_description%': 'Cross-reference target reference(s), Old Testament only',
  '%markerMenu_marker_xq_description%': 'A cross-reference quotation from the scripture text',
  '%markerMenu_marker_xt_description%':
    'The cross reference target reference(s), protocanon only (basic)',
  '%markerMenu_marker_xta_description%': 'Cross reference target references added text',
  '%markerMenu_noResults%': 'No results found.',
  '%markerMenu_searchPlaceholder%': 'Type a style or search.',
};

export const FootnoteEditorView: Story = {
  render: (args) => {
    // eslint-disable-next-line no-null/no-null
    const editorRef = useRef<EditorRef | null>(null);

    const noteKey = useRef<string>();
    const noteOps = useRef<DeltaOpInsertNoteEmbed[]>();

    const [popoverX, setPopoverX] = useState<number>();
    const [popoverY, setPopoverY] = useState<number>();
    const [popoverHeight, setPopoverHeight] = useState<number>();

    const [showFootnoteEditor, setShowFootnoteEditor] = useState<boolean>();

    const viewOptions = useMemo<ViewOptions>(
      () => ({
        markerMode: 'hidden',
        noteMode: 'collapsed',
        hasSpacing: true,
        isFormattedFont: true,
      }),
      [],
    );

    const mergedOptions = useMemo<EditorOptions>(() => {
      const base = args.options ?? {};
      return {
        ...base,
        nodes: {
          noteCallerOnClick: (
            event,
            noteNodeKey,
            isCollapsed,
            _getCaller,
            _setCaller,
            getNoteOps,
          ) => {
            const targetRect = event.currentTarget.getBoundingClientRect();
            setPopoverX(targetRect.left);
            setPopoverY(targetRect.top);
            setPopoverHeight(targetRect.height);

            if (isCollapsed) {
              // (event as SyntheticEvent<)
              if (noteKey.current) return;

              // Makes sure the note op is the correct type and is defined
              const noteOp = getNoteOps()?.at(0);
              if (!noteOp || !isInsertEmbedOpOfType('note', noteOp)) return;

              noteKey.current = noteNodeKey;
              noteOps.current = [noteOp];
              setShowFootnoteEditor(true);
            }
          },
        },
        view: viewOptions,
      };
    }, [args.options, viewOptions, noteKey]);

    const openFootnoteEditorOnNewNote = useCallback(
      (ops?: DeltaOp[], insertedNodeKey?: string) => {
        if (insertedNodeKey && ops) {
          // If we are already editing a note, then returns
          if (noteKey.current) return;

          // Makes sure the node is a note
          console.log(ops);
          const noteOp = ops[1];
          if (!isInsertEmbedOpOfType('note', noteOp)) return;

          const noteElement = editorRef.current?.getElementByKey(insertedNodeKey);
          // Note element must be defined
          if (!noteElement) return;

          console.log(noteOp);
          const targetRect = noteElement.getBoundingClientRect();
          setPopoverX(targetRect.left);
          setPopoverY(targetRect.top);
          setPopoverHeight(targetRect.height);
          noteKey.current = insertedNodeKey;
          noteOps.current = [noteOp];
          setShowFootnoteEditor(true);
        }
      },
      [noteKey],
    );

    const onEditorClose = () => {
      noteKey.current = undefined;
      noteOps.current = undefined;
      setShowFootnoteEditor(false);
    };

    const onEditorSave = (newNoteOps: DeltaOp[]) => {
      if (noteKey.current) {
        editorRef.current?.replaceEmbedUpdate(noteKey.current, newNoteOps);
      }
      onEditorClose();
    };

    return (
      <div>
        <Editorial
          {...args}
          options={mergedOptions}
          onUsjChange={(
            _usj: Usj,
            ops?: DeltaOp[],
            _source?: DeltaSource,
            insertedNodeKey?: string,
          ) => {
            openFootnoteEditorOnNewNote(ops, insertedNodeKey);
          }}
          ref={editorRef}
          onScrRefChange={() => undefined}
        />
        <Popover open={showFootnoteEditor}>
          <PopoverAnchor
            className="tw-absolute"
            style={{ top: popoverY ?? 0, left: popoverX ?? 0, height: popoverHeight, width: 0 }}
          />
          <PopoverContent className="tw-w-[500px] tw-p-[10px]">
            <FootnoteEditor
              noteKey={noteKey.current}
              noteOps={noteOps.current}
              onSave={onEditorSave}
              onClose={onEditorClose}
              scrRef={args.scrRef ?? defaultScrRef}
              editorOptions={mergedOptions}
              defaultMarkerMenuTrigger={mergedOptions.markerMenuTrigger ?? '\\'}
              localizedStrings={sampleFootnoteEditorLocalizedStrings}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates the use of the new footnote editor on the side of the ' +
          ' editorial component',
      },
    },
  },
  args: {
    defaultUsj: usjWeb,
    scrRef: defaultScrRef,
    options: {
      hasExternalUI: false,
      markerMenuTrigger: '\\',
    },
  },
};

export const EditorViewOptions: ViewOptionsStory = {
  name: 'View Options',
  render: (args, context) => {
    // Destructure flattened view options from args
    const { markerMode, noteMode, hasSpacing, isFormattedFont } = args;

    // Reconstruct the args with the options.view settings
    const mergedArgs = {
      defaultUsj: usjWeb,
      options: {
        hasExternalUI: true,
        view: {
          markerMode,
          noteMode,
          hasSpacing,
          isFormattedFont,
        },
      },
    };

    return renderEditorialWithToolbar(mergedArgs, context, defaultScrRef);
  },
  argTypes: {
    markerMode: {
      control: { type: 'select' },
      options: ['hidden', 'visible', 'editable'],
      description: 'Controls how USFM markers are displayed in the editor',
      table: { category: 'View Options' },
    },
    noteMode: {
      control: { type: 'select' },
      options: ['collapsed', 'expandInline', 'expanded'],
      description: 'Controls how notes are displayed in the editor',
      table: { category: 'View Options' },
    },
    hasSpacing: {
      control: { type: 'boolean' },
      description: 'Whether to add spacing between paragraphs',
      table: { category: 'View Options' },
    },
    isFormattedFont: {
      control: { type: 'boolean' },
      description: 'Whether to use formatted font styling',
      table: { category: 'View Options' },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the editor view options (marker visibility, spacing, and formatted font) ' +
          'using USX input. Below in the **Controls** tab, try changing the **View Options** ' +
          'to see how they affect the editor display.',
      },
    },
  },
  args: {
    markerMode: 'hidden',
    noteMode: 'collapsed',
    hasSpacing: true,
    isFormattedFont: true,
  },
};
