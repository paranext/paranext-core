// Auto-generated from PT9 _StandardPlans XMLs (see scripts/__tmp-parse-factory-plans.mjs).
// Do not hand-edit. Regenerate by running the parser script.

import type { OrgProvidedPlan } from '@/components/advanced/project-plan-dialog';

export const FACTORY_PLANS: OrgProvidedPlan[] = [
  {
    id: 'f8fba110-381b-4150-a719-8e8da9a124fe',
    name: 'BI Base Plan 1.0',
    version: '1.0',
    kind: 'factory',
    stages: [
      {
        id: 'b708cb04-830d-46ba-b465-6567c05b323b',
        names: {
          en: 'Drafting',
        },
        descriptions: {},
        tasks: [
          {
            id: 'ca3ebec0-0178-4bf6-9a3d-b79db3054baa',
            names: {
              en: 'Complete translation brief',
            },
            descriptions: {
              en: 'The translation brief is a statement of the standards for the project, such as which source texts are used, and the specific audience and intended uses of the translation. Setting these principles out at the beginning will help the translation team work together towards the common goal.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'f289c2b4-53c2-4bcd-8673-e29fe4192a43',
            names: {
              en: 'Consultant provides resources',
            },
            descriptions: {
              en: 'Any resources that BI has for a particular project should be given to the translation team.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'e4de7f20-feda-47d4-8225-b3e2a32b3510',
            names: {
              en: 'Exegesis and translation of first draft',
            },
            descriptions: {
              en: 'The first translation task is to study the text carefully, using Bible versions and commentaries. This is called “doing the exegesis”. There should be at least one person on each translation team who is a skilled exegete.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '22b02107-4a35-4da2-892b-f51a6d92bf67',
            names: {
              en: 'Populate Key terms',
            },
            descriptions: {
              en: 'As the translation team does their first draft, they should have the Biblical Terms Renderings window open and the BIM_E list selected to keep track of all key terms that BI has identified as important. They should make sure they are consistently rendering the terms and giving explanations when alternative terms must be used.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'eb241857-5dcb-4700-b705-e7b467483793',
            names: {
              en: 'Draft section headings, and add book major titles and parall',
            },
            descriptions: {
              en: 'Section headings should draw from the wording used in the texts of their respective sections. \n\nMajor book title(s) should be added at the beginning of the book. \n\nIf there are parallel passage references, they should be added with the correct book abbreviation and punctuation. \n\nPsalms has special headings, so those should be added too. (See "Headings" in the "USFMs for ParaTExt" PDF.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '02451648-974e-494c-8665-54c1d26792a6',
            names: {
              en: 'Draft footnotes',
            },
            descriptions: {
              en: 'Translation team should draft footnotes, both those connected to the language, the translation, as well as the official BI footnotes. These may be drafted after main text has been finalized. After you have drafted the footnotes, it may be helpful to go to Tools-->Checklist-->Footnotes. This checklist will compare the footnotes in your text to other resources that you specify.\n\nMake sure the formatting of the footnotes is correct, using the "USFMs for ParaTExt" PDF to guide.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '069f3859-0eb8-4eb1-a082-e692aea777a0',
            names: {
              en: 'Standardize language settings & spelling rules for language',
            },
            descriptions: {
              en: 'For all languages, make sure that the "Language Settings" (in the Project menu) are correctly set. You cannot "Run Spell Check" if the rules aren\'t standardized yet.\n\nFor languages whose orthography is not standardized, a linguistics consultant will need to help the translation team standardize their spelling rules.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'aba8c8c2-5d1d-41e5-871e-f3a4c3ed948f',
            names: {
              en: 'Populate proper names',
            },
            descriptions: {
              en: 'Translation team & the RRC should work out the spelling issues for proper names early in the project, taking into account all the various issues at one time rather than dealing with each one as they come up and then revising previous decisions. \n\nThe Biblical terms tool can help with the verification of names if the list is filtered for the "Names" category.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '9b112e23-4a59-404e-860a-466a5e81a43e',
            names: {
              en: 'Paragraph check',
            },
            descriptions: {
              en: 'The translation team should check their translation according to the paragraphing of the BIM.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: 'ce775768-3acc-401f-8ad3-38de5ed34d46',
        names: {
          en: 'Team Checking',
        },
        descriptions: {
          en: 'If there is only one translator, most of the tasks in this stage can be deleted except for the spell checking and other checks. These checks could just be moved into Stage 1.',
        },
        tasks: [
          {
            id: 'ddbcd260-c8d7-4b8d-80f7-116c369c73ff',
            names: {
              en: 'Translators read aloud the translation to each other',
            },
            descriptions: {
              en: 'The translator, a mother-tongue speaker of the receptor language, reads the draft aloud to the team, and possibly other mother-tongue speakers of the language to check for naturalness and clarity. Then they adjust the text based on feedback.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '04d5ad18-9a05-4b12-bb61-c78151f87601',
            names: {
              en: 'Exegetical check',
            },
            descriptions: {
              en: 'This check is done by the translation team. Compare the draft with one or two translations in the national language, discuss exegetical choices that have been made in the translation, identify possible exegetical mistakes in the translation; identify any missing verses or sentences.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'cafe3d38-d2b4-46af-a6d9-0a0581cb915c',
            names: {
              en: 'Naturalness and clarity check',
            },
            descriptions: {
              en: "If there is more than one translator, the translators check each other's work for naturalness and clarity.",
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'd8ede235-b063-44d7-8898-1c5cc3ca36f8',
            names: {
              en: 'Team Check Key Terms',
            },
            descriptions: {
              en: 'Discussions about spelling and word choices that should be remembered should be noted in the appropriate place in the Wordlist and the Biblical Terms tool, respectively.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '5a3b7c9e-0dc1-4728-9837-6264a59badf2',
            names: {
              en: 'Run "Spell Check Current Book"',
            },
            descriptions: {
              en: 'Under the Checking Menu is "Spell Check Current Book", click on this and accept or correct the spelling of all of the words present. For those that need more discussion open the Wordlist tool and add a spelling discussion note.\n\nIt\'s better to spell check as you go. Commonly spelled words should be approved to decrease the amount of words that need attention.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'ff9c2013-83fb-41f4-8bfc-b32265dce07e',
            names: {
              en: 'Turn on "Display Spelling"',
            },
            descriptions: {
              en: 'Now that the translation team has entered some text into the project and have checked spelling for that text, they can turn on "display spelling" to let Paratext identify misspellings.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '0ab1c4e1-f9c4-4f40-b8cf-e24758dc55b6',
            names: {
              en: 'Section headings and breaks - check',
            },
            descriptions: {
              en: 'Under Tools>Checklists>Section headings.., translation team should check the section headings with those in the BIM_E. Also, they should make sure section breaks (/b) occur in the right spots.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'ce1781fd-1ff8-4fef-b385-0f268c8cc0b7',
            names: {
              en: 'Paragraph breaks - format check',
            },
            descriptions: {
              en: 'The translation team should read the text and verify that the paragraph breaks are in the desired places. Using BIM as a base, this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\p, and \\m.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'd494da4e-dfba-43d6-b0f6-42c10d10f2a5',
            names: {
              en: 'Special formatting - format check',
            },
            descriptions: {
              en: 'The translation team should verify that any text that needs special formatting has been done correctly. See the "USFMs for ParaTExt" PDF for all formatting issues. Any formatting conventions that the translation committee has agree to do should be checked to make sure they are done.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '263c68ef-98cb-4868-9978-b85d7837e3ee',
        names: {
          en: 'Committee Review',
        },
        descriptions: {},
        tasks: [
          {
            id: '202d77b4-e361-4ee3-a996-23a76edcfef9',
            names: {
              en: 'Share text with RRC',
            },
            descriptions: {
              en: 'Open the "Assignments and Progress" window and correct all errors/issues shown there. Once all errors are corrected and open notes are resolved, print a copy of the books or chapters to be reviewed by community group. The two simplest ways to print text from Paratext are found under the "File" menu. They are "Print Draft" and "Save as RTF". There are other methods available for more advanced formatting, such as "Export to Pathway". Use the method specified by your project administrator or translation consultant.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'f6ea6809-3e93-4c2b-9074-8e0ab6449b65',
            names: {
              en: 'Naturalness check',
            },
            descriptions: {
              en: 'This check is done by the RRC (Read the draft, check the general flow of the discourse, its logic, chronology, participant reference, sentence length & rhythm, language style and register, etc.). RRC adds notes in text for discussion at RRC meeting.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'e8763fa7-bf8d-4ef7-b3dd-fa318e1d5196',
            names: {
              en: 'Clarity check',
            },
            descriptions: {
              en: 'Naturalness and clarity are probably checked at the same time, but the two tasks are separated out to make sure they are both done. RRC checks to make sure the meaning is as clear as the biblical text is. RRC adds notes in text for discussion at RRC meeting.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '30ab4bd1-567a-447c-9638-a63243cc480d',
            names: {
              en: 'Key terms check',
            },
            descriptions: {
              en: 'RRC evaluates the key terms chosen by the translation team. Notes are placed in the discussion section of the particular term of the Biblical Terms tool.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '8ae3822f-f523-4d05-ae12-34ea176c4676',
            names: {
              en: 'Discuss all RRC notes on text and key terms and revise',
            },
            descriptions: {
              en: 'RRC discusses issues they raised in their individual reading of the text before the meeting with the translation team. Note that the discussion should be limited to the issues they noted during their personal reading; they should not have to discuss every verse of the translation.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'c653985f-414b-4a1a-9708-7147a3d85467',
            names: {
              en: 'Revise key terms based on RRC comments',
            },
            descriptions: {
              en: 'If the RRC recommends changes to the text, the translation team will have to check the key terms in those places to adjust accordingly. The translation team may also need to discuss certain key terms with the RRC.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '378ea5cc-ea2e-4e17-9868-aa25d76fcfb3',
        names: {
          en: 'Preparing for consultant check',
        },
        descriptions: {},
        tasks: [
          {
            id: '856e1b6d-01a8-4d71-bca4-7bc3ecb8e7b8',
            names: {
              en: 'Draft the back translation',
            },
            descriptions: {
              en: 'A back-translation is a translation into the major national or trade language of the area. It should be done by a speaker of the language other than the translator. It helps to show whether the translation is communicating effectively and accurately, and it serves as the basis for the consultant check.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '92561c3d-8eed-4f94-b9a8-322dce9142fd',
            names: {
              en: 'Check the back translation',
            },
            descriptions: {
              en: 'The translation team should verify that back translation is complete, and there are no missing words or phrases, so it is usable by consultant. The purpose of this check is not for the team to change what the back translator thinks the text means.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '95112c7d-92ea-4dbc-ade8-7c0168c2ba48',
        names: {
          en: 'Consultant check',
        },
        descriptions: {},
        tasks: [
          {
            id: 'c22afa1d-4da0-48f1-9a67-3e72cff70521',
            names: {
              en: 'Evaluation of text',
            },
            descriptions: {
              en: 'Consultant evaluates the text and places notes with his observations in the text (or back translation). The evaluation should focus on accuracy, clarity, naturalness, and acceptability of the translation including all supplementary materials and illustrations used.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '6a553f2d-55ee-4efb-9acc-17253038ad95',
            names: {
              en: 'Consultant visit and revision',
            },
            descriptions: {
              en: 'Consultant interacts with the translation team concerning his observations about the text and supplementary materials, and gives assistance and advice as requested. The project administrator should give one team member (that could be himself) editing permission in the Assignments and Progress window for the "Consultant visit" task.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '5f0384e9-5916-4f20-a5e5-1c21effe7a84',
            names: {
              en: 'Revise key terms',
            },
            descriptions: {
              en: 'Consultant works with translation team to revise key terms as needed while checking the translation.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'c7b8f85a-6549-49a9-8d9c-15daa91cd7bd',
            names: {
              en: 'Read text aloud as team',
            },
            descriptions: {
              en: 'After each chapter has been consultant-checked, the translation team should read the text aloud to make sure it flows well. They should do this in the evenings so they can bring issues to the consultant the next day. They should not change the text but should insert notes at the spots that they want to change and then change them in the presence of the consultant.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '09247681-d6dc-4ecf-8c6c-a61636cfafe8',
            names: {
              en: 'Revise text based on read-alouds',
            },
            descriptions: {
              en: 'With the consultant present, the translation team discusses all issues that were raised during the read-alouds and makes necessary changes.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'e3aa749c-3eaf-434b-b2de-0e8a58b83531',
            names: {
              en: 'Establish quotation rules',
            },
            descriptions: {
              en: 'During the first consultant visit, the consultant should work with the team to determine their quotation rules. It is good to establish these rules after some material has been drafted so that you have text to work with.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '6811fb16-cf1e-4339-8c37-a9ee04b02f52',
            names: {
              en: 'Establish number settings',
            },
            descriptions: {
              en: 'During the first consultant visit, the consultant should work with the translation team to determine their number settings. It is good to establish these settings after some material has been drafted so that you have text to work with.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'e13e580a-39b0-4dac-816c-afce8f42b414',
            names: {
              en: 'Establish Scripture reference settings: reference format and',
            },
            descriptions: {
              en: 'During the first consultant visit, the consultant should work with the translation team to determine their\n reference format and populate book names (short names, long names, and abbreviations).',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '11af360a-2728-42ab-b6c4-ed19738572d8',
            names: {
              en: 'Verify key terms',
            },
            descriptions: {
              en: 'After a book has been consultant checked, the translation team should go back and make sure the Renderings match the revised text. Using the Biblical Terms tool in the Tools menu, set the filters for "current book" and "missing renderings." Then change the latter filter to "unresolved rendering discussion notes" to make sure there are no unresolved discussions.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '2f3faa97-508c-4fea-b552-cbf8799fb751',
            names: {
              en: 'Consultant report submitted',
            },
            descriptions: {
              en: 'Consultant submits a report after consultant visit has been completed. Report should include update on team progress. \n\nThis report is submitted regardless of preliminary approval. Such approval does not necessitate submitting another report.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '68475a7c-bbfd-4b6f-8fd8-774349c31a97',
            names: {
              en: 'Consultant sends lingering questions to RRC',
            },
            descriptions: {
              en: 'Any unresolvable issues are taken to RRC for testing/discussion. Consultant should work through these issues at next visit\n\nThe consultant should create a special tag for these notes. In the Project Menu, click on "Project Properties and Settings" and then the "Notes" tab. Create a new tag. In order to be consistent across projects, we recommend to use the up-pointing red triangle.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '2989c77c-cd00-436e-a860-d3b2e22ceafb',
            names: {
              en: 'Translator prepares answers to lingering questions based on',
            },
            descriptions: {
              en: 'Any lingering questions that were taken to RRC should now be answered. The translation team should prepare the RRC answers to be reviewed with the consultant at the next workshop. No changes to the text should be made at this time.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '435598b2-d366-4b5b-b018-9b1d4879dff3',
            names: {
              en: 'Re-run "Spell Check Current Book"',
            },
            descriptions: {
              en: 'Once all unresolved issues from consultant and RRC discussions have been resolved, the translation team should run a spell check to make sure all spellings are correct. \n\nUnder the Checking Menu is "Spell Check Current Book", click on this and accept or correct the spelling of all of the words present.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'bec564e4-6c28-426f-9d71-5aa3717e4a9f',
            names: {
              en: 'Preliminary consultant approval',
            },
            descriptions: {
              en: 'Once all issues have been resolved, the consultant gives preliminary approval. Final approval will come after all quality checks have been completed.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: 'ec667895-c466-4fd0-a0b0-893ca22f42f2',
        names: {
          en: 'Review by community',
        },
        descriptions: {},
        tasks: [
          {
            id: 'a39dffa8-2a28-40f2-8d4d-10c1003724d5',
            names: {
              en: 'Testing of translation with community through trial edition',
            },
            descriptions: {
              en: 'Once proper approvals have been obtained and a system of gaining feedback has been written, the translation team can distribute the trial edition to learn how to improve their translation. \n\nTrial editions should be done every 3 years for the life of a project.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '1ab51ebe-ff85-47dd-90c9-a75e598090d1',
            names: {
              en: 'Testing of translation with community through informal means',
            },
            descriptions: {
              en: 'Translation team should use informal means to test the translated material with the language group.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '433d177e-7145-4408-b1ec-ecdbae505929',
            names: {
              en: 'Translator revises text based on community review',
            },
            descriptions: {
              en: 'With the consultant present, the translation team discusses changes to the text and makes the approved ones.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '52bb0a4e-8cc3-43fc-a054-e944ea8366ac',
        names: {
          en: 'Prepare translation add-ons',
        },
        descriptions: {},
        tasks: [
          {
            id: '3aeeb53e-0726-48a4-812c-640667fabbdc',
            names: {
              en: 'Draft Book Introductions',
            },
            descriptions: {
              en: 'Translation team drafts the book introduction. Be careful to use the same key terms in the introduction as in the text.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '000f2885-0a8f-4930-b54b-f62689e06196',
            names: {
              en: 'Draft Glossary',
            },
            descriptions: {
              en: 'Translation team drafts glossary entries. The glossary is one of the books that occur after Revelation, and its short name is GLO. It is recommended to add glossary entries from within the Biblical terms tool. Using the Biblical terms tool will create GLO book for you. Look in Help under "glossary" for more information.\n\nAny special formatting of transliterated words should be done at this point.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'bb55c9be-6197-46ed-ae7b-1c3684b046fc',
            names: {
              en: 'Verify consistency of translation of Glossary wtih texts',
            },
            descriptions: {
              en: 'After this add-on is translated, it should be compared with the translation of the terms in the texts to make sure the texts and the Glossary correspond with each other.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'dba22f95-acb0-4ce6-9e4a-baae03112528',
            names: {
              en: 'Translate Charts of Weights & Measures add-on',
            },
            descriptions: {
              en: 'Translation team drafts charts of weights and measures.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'f4565b42-2814-436c-8e35-d0570075ae17',
            names: {
              en: 'Verify consistency of translation of weights and measures in',
            },
            descriptions: {
              en: 'After this add-on is translated, it should be compared with the translation of the terms in the texts to make sure the texts and the charts correspond with each other.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'b2e14799-1d46-40ca-918b-74f432a273bf',
            names: {
              en: 'Translate Names of God and gods of other nations add-on',
            },
            descriptions: {
              en: 'Translation team drafts names of God and gods add-on.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '05419506-3296-4e9c-b2dc-b3934dbe4491',
            names: {
              en: 'Translate Jewish months add-on',
            },
            descriptions: {
              en: 'Translation team drafts Jewish months add-on.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'f9d123ab-0bd5-43ca-abb7-24a78ec0eb3d',
            names: {
              en: 'Translate Jewish feasts add-on',
            },
            descriptions: {
              en: 'Translation team drafts Jewish feasts add-on.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '9d43e0af-5078-4b5a-ba89-2cfa59e8e62c',
            names: {
              en: 'Choose Concordance or Topical Index',
            },
            descriptions: {
              en: 'Translation team should work with their committee to determine if they want a traditional concordance or a topical index to go with their translation. Because of space limitations, we allow only one or the other.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '7912af6b-e7d9-41ea-8198-5bbed0f64b2f',
            names: {
              en: 'Translate Topical Index',
            },
            descriptions: {
              en: 'If the team chose the Topical Index, they should translate all the terms.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'eabb5d66-983b-421c-b6a2-2588a6cb6cfa',
            names: {
              en: 'Verify consistency of translation of Topical Index w texts',
            },
            descriptions: {
              en: 'After this add-on is translated, it should be compared with the translation of the terms in the texts to make sure the texts and the Index correspond with each other, where necessary.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '22275389-f614-4da5-93b5-7063bffb1f61',
            names: {
              en: 'Label place names for maps',
            },
            descriptions: {
              en: 'BI has map entry forms that include the various place names and appropriate Scripture references where those names occur. The translation team should make sure that the names on the maps agree with those in the texts.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '63d3d968-03b8-4803-948e-8c2d628ec9e0',
            names: {
              en: 'Review of add-ons by RRC',
            },
            descriptions: {
              en: 'Most add-ons need to be reviewed except maps. RRC inserts notes where needed to discuss with translation team.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '4903f6e2-7b95-4947-ac70-f4b23d6bc17e',
            names: {
              en: 'Discuss all RRC notes and revise add-ons',
            },
            descriptions: {
              en: 'Translation team meets with RRC to discuss all their notes and revise accordingly.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '667f036b-d90d-4747-a51c-ed96ee531600',
            names: {
              en: 'Draft back-translation of add-ons',
            },
            descriptions: {
              en: 'A back translation should be prepared for the consultant to check the translation of add-ons.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'b12421ef-3643-4e7b-8657-9f43ccdce9fd',
            names: {
              en: 'Consultant check, revisions to text',
            },
            descriptions: {
              en: 'Consultant checks all add-ons and translators revise where necessary. The translation team may need to discuss certain issues with the RRC before finalizing.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '68743786-bef0-465b-8fd5-3b6e697f320b',
            names: {
              en: 'Consultant preliminary approval of add-ons',
            },
            descriptions: {
              en: 'Consultant confirms that no lingering issues remain on the add-ons.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '18598fb7-8ba2-442a-8ee9-dab02e06c152',
        names: {
          en: 'Finalizing for Publication',
        },
        descriptions: {},
        tasks: [
          {
            id: '60d959ba-9eb9-4b11-9d8d-ba957f1517b2',
            names: {
              en: 'Proper Names - final check',
            },
            descriptions: {
              en: 'Verify that all Proper Names are correct and that there are no lingering issues.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '93215949-9395-4527-b500-c24dfb1446ef',
            names: {
              en: 'Group Names check',
            },
            descriptions: {
              en: 'If a language treats group names differently (e.g., group name based on ancestor is different than group name based on location), every word that refers to a people group needs to be checked using the “People Group Names” (OT) Checklist. (This check is not yet in Paratext.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '83ed5f9c-407a-45bd-ba3e-3ef27c92fa08',
            names: {
              en: 'Olders & Youngers (Gospels)',
            },
            descriptions: {
              en: 'Every occurrence of sibling words in the gospels  (“Olders and Youngers” Checklist—in WebCollab check under “Checklist Word Studies”). (This check is not yet in Paratext.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '4031b559-e1db-4b9b-82d1-cf9436b484aa',
            names: {
              en: 'You singular/plural check',
            },
            descriptions: {
              en: 'Every occurrence of “you” needs to be checked if the target language has distinct words for the singular and plural forms. Use the check “You singular-plural” (or “French Tu-Vous”) which lists only the occurrences of the second-person pronoun that might cause problems for the translator since the change in form of the pronoun might be unexpected.  (This check is not yet in Paratext.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '799e1cb1-760f-4080-89f7-89b8b291cab3',
            names: {
              en: 'We exclusive/inclusive (OT) check',
            },
            descriptions: {
              en: 'Every occurrence of the first-person plural pronoun in the OT needs to be checked if the target language marks exclusive and inclusive these pronouns. Use the “OT Inclusive Exclusive We Spreadsheet” to help you.   (This check is not yet in Paratext.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '828eb989-7b32-4884-991b-3ecde810e450',
            names: {
              en: 'You masculine/feminine check',
            },
            descriptions: {
              en: 'Every occurrence of the first-person plural pronoun in the OT needs to be checked if the target language marks exclusive and inclusive these pronouns. Use the “OT Inclusive Exclusive We Spreadsheet” to help you.   (This check is not yet in Paratext.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'd7e69419-a8c5-4056-99bb-123abe755923',
            names: {
              en: 'Duals check',
            },
            descriptions: {
              en: 'If the language has a special form for dual person, the translation team should check these using the BIM as a guide. (No specific help has been created in Paratext or otherwise for this check.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'ab4f2ed0-1618-466e-afdc-739d1be19ae9',
            names: {
              en: 'Run Basic Checks',
            },
            descriptions: {
              en: 'Note the capitalization conventions in the “BI Style Guide.” Under the Checking menu in Paratext, run checks for Chapter/Verse, Markers, Characters (Combination), Punctuation, References, Quoted Text, Capitalization, Repeated Words, Unmatched Pairs of Punctuation, Quotations, and Numbers.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '6ae4817e-be46-4dc2-ba2b-5ec2adb37173',
            names: {
              en: 'Uppercase nouns check',
            },
            descriptions: {
              en: 'There are various checks in this category for words that have a capital letter for the first letter (“Capital Day in the NT”, “Capital Law in the NT”, “Capital\nProphets in NT”, various names of God in the OT checklists; only the Day and Prophets checklists are in French). We actually recommend doing as little capitalization for “prophets,” “law,” and “day” as necessary (see “Style Guide” for further discussion about this issue). The capitalization convention is established on a language-by-language basis.\nSo, these checks are just to make sure you have been consistent with the convention of capitalizing these nouns, if the committee has chosen to do so. See "Capitalization in Biblical Terms" in the "Paratext Tips & Tricks" spreadsheet for more guidance on how to check rendreings for capitalization.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '3646f60b-1ae1-4220-9b4d-ab189124744b',
            names: {
              en: 'Numbers check',
            },
            descriptions: {
              en: 'Select the list "Numbers" in the Biblical terms tool to find all the numbers in the translation.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '694d1c34-6ad8-4ede-bafb-e969d79a8bc0',
            names: {
              en: 'BI Numbers check',
            },
            descriptions: {
              en: 'BI has numbers checks for the occurrence of every quantity in the Bible that has numbers designating it. Every number, both ordinal and otherwise, needs to be checked using the Numbers Checklists (Cardinal: “Numbers in the NT” &, “Numbers in the OT” in both English and French; Ordinal: “Ordinal Numbers in the NT” in English, no OT ordinal numbers check).',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'c00092ae-9b4f-4ea8-b195-d03b6ce288f3',
            names: {
              en: 'Spelling - final check',
            },
            descriptions: {
              en: 'Resolve any lingering spelling issues.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '7fd347e4-8d1b-47fc-9b22-b8acc79f8483',
            names: {
              en: 'Layout and indents - format check',
            },
            descriptions: {
              en: 'Verify other layout issues such as poetry. Particular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\q, \\q1 and \\q2.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'b541112c-e326-4241-85f8-64b55153ded8',
            names: {
              en: 'Punctuation checks',
            },
            descriptions: {
              en: 'This is in addition to the Basic Check. Note the punctuation conventions in the “BI Style Guide.”  Also check any other punctuation conventions you and the translation team established.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'd2aa59bc-1371-4386-8397-93de649ef519',
            names: {
              en: 'Quoted speech check',
            },
            descriptions: {
              en: 'This is in addition to the Basic Check. BI has created a tool for English, French, and Spanish that color-codes the different levels of quoted speech. Using this tool, verify that you have introduced, concluded, and punctuated all direct speech appropriately.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '045691d3-7739-4601-b28e-b3eb89d7c234',
            names: {
              en: 'Difficult passages check',
            },
            descriptions: {
              en: 'Depending on the development of the project, translation team with the consultant may want to spot check various difficult passages that were translated earlier in the process to make sure they are of good quality (e.g., Eph. 1:3-14). (We have no standardized list for the whole OT or NT, so you’d just need to check the Book Worksheets for the books that have one.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '16231a0e-5b1d-45ca-94f4-92b84d0d65b6',
            names: {
              en: 'Customized checks',
            },
            descriptions: {
              en: 'These would include any checks that the consultant and the translation team noted as language-specific or project-specific, based on what they have observed during the life of the project.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'ec57df48-066a-47fe-b57a-8d585567030b',
            names: {
              en: 'OT citations check',
            },
            descriptions: {
              en: 'Every passage where the NT has quoted from the OT needs to be checked. OT references should be included in the footnotes. The “OT Citations” checklist will help you verify the references. [OT quotations also need to be checked for a NT-only project in places where the OT quotation is repeated to make sure all occurrences are the same, where the Greek is the same.]',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '25efa616-efa0-45c4-95fe-bf84fd11082e',
            names: {
              en: 'Consistency check - parallel passages',
            },
            descriptions: {
              en: 'Ensure that the translation is identical where the Hebrew or Greek is identical.Open Parallel Passage tool and confirm all parallel passages. (This check is not simply that parallel passages have check marks, it is meant to read the verses and see if the appropriate words are green and yellow in each passage.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'aa8fd646-762a-4318-866f-4b97a4419f3f',
            names: {
              en: 'Consistency check - Biblical key terms',
            },
            descriptions: {
              en: 'Open Biblical terms tool, verify that you are using the BIM_E list, and review all renderings for consistency, and make any last changes needed.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '83a62c68-6d97-40c6-b79f-95911fee3576',
            names: {
              en: 'Special formatting - final check',
            },
            descriptions: {
              en: 'Using the "USFM\'s for ParaTExt" PDF, make sure that any special formatting issues the translation committee has agreed to do, are done in all texts.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '09cf5068-d3eb-4f7b-b230-3a863e28e9ce',
            names: {
              en: 'Verify that all Paratext checks are complete',
            },
            descriptions: {
              en: 'Open the Assignments and progress window, and correct all errors and resolve all outstanding issues reported there.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '2c4dd2df-576b-4fa7-aa55-97ab4e0f9a06',
            names: {
              en: 'Finalize Table of Contents',
            },
            descriptions: {
              en: 'The translation team and the RRC need to determine what the names of the books should be. They should also translate and give the order of the add-ons that will be listed in the Table: Charts of Weights and Measures, Names of God and gods of other nations, Jewish months, Jewish feasts, Glossary, Concordance (or Topical Index), and Maps. Consultant needs to make sure all issues have been considered and that everything is accounted for.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '5bf44ae5-c2ee-4cd4-bec9-75aba8ca9b44',
            names: {
              en: 'Draft introduction to Bible/NT, other front & back matter',
            },
            descriptions: {
              en: 'All planned front and back matter that has not already been done should be drafted by this stage.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '6bced27a-6656-41fc-8650-34972fb7d01f',
            names: {
              en: 'Check references',
            },
            descriptions: {
              en: 'Look up and verify that all Scripture references in footnotes, cross references, parallel passage references, book introductions, etc., are referring to verse(s) that talk about the correct topic. (This is not the automated Paratext check to verify that a Scripture reference is in the correct format and exists in the cannon.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '50c83bd1-b7ae-4e6a-b335-578b3c7015c6',
            names: {
              en: 'Footnotes - final check',
            },
            descriptions: {
              en: 'Read all footnotes and cross references looking for inconsistencies in how they are formatted. The goal is to have a consistent look and feel across all footnotes, and not merely the absence of marker errors in the footnotes.  It may be helpful to go to Tools-->Checklist-->Footnotes. This checklist will compare the footnotes in your text to other resources that you specify.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '97d2a82d-992f-42b3-8317-2d093456143f',
            names: {
              en: 'Section breaks and headings - final check',
            },
            descriptions: {
              en: 'Using the BIM for comparison, this check can be done using Tools > Checklists > Compare Section Headings. Make sure that any wording changes in the sections are reflected in the section headings.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '6f432909-4a33-403e-9be4-df931b61994d',
            names: {
              en: 'Prepare concordance',
            },
            descriptions: {
              en: 'If the committee has chosen to include a traditional concordance, BI helps translation team determine which words to include in concordance.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '97699509-9b5b-420a-a4cb-6e9f408d5745',
            names: {
              en: 'Choose cross-references set',
            },
            descriptions: {
              en: 'For NT, there is a NT-only set, a NT with Psa/Prov, a NT with Psa, and a whole Bible set. There is also a NT-only set with or without the OT citation references.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '11459095-5178-4466-ade3-214f66deb77f',
            names: {
              en: 'Consultant check - final check',
            },
            descriptions: {
              en: 'Consultant will check any new supplementary materials such as maps, illustrations, front matter, and back matter.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: 'c0bc1039-fadc-4126-8e54-cb7d0dbaf6ca',
        names: {
          en: 'Preparation for publication',
        },
        descriptions: {
          en: 'All the final stages after translation add-ons and quality checks are done.',
        },
        tasks: [
          {
            id: 'c2d742fc-33ee-4751-bdf7-77d845a0d81e',
            names: {
              en: 'Final read-through by translation team and RRC',
            },
            descriptions: {
              en: 'This should use a draft produced by Publishing Assitant/InDesign so that the text is in close to final format.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '73c1ac89-f57d-4eb1-9805-6dc15979fc83',
            names: {
              en: 'Revise text based on final read through',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'e1de7ab5-b579-4da3-92cb-336c0c3b144d',
            names: {
              en: 'Translate and submit survey form',
            },
            descriptions: {
              en: 'BI supplies post-translations survey form for the translation team to translate and submit to be included (as a separate paper) with published translation distribution.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '3f08517d-4f8d-4b4f-be6d-06f833468228',
            names: {
              en: 'Final approval from consultant',
            },
            descriptions: {
              en: 'After the primary consultant for the project receives approvals from the committee, he submits his approval to the Text Production Dept Manager.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '07bb558b-8f4b-4085-ae6d-5230ca06c46c',
            names: {
              en: 'Final approval by Text Production Dept Manager',
            },
            descriptions: {},
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'a523dfb8-d86a-4ea3-a55e-8f3421a13479',
            names: {
              en: 'Submit to Publishing',
            },
            descriptions: {
              en: 'The TPD manager notifies the Projects Management Dept that the text is ready for formatting.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'ccc33f28-27b5-4d7a-903f-c1dc9c8262ed',
            names: {
              en: 'Revise text during formatting process',
            },
            descriptions: {
              en: 'The BI formatting team works on the text with the translation team. Any minor changes can be made directly in the text by the translation team. Major (content) changes need to be passed by the primary consultant before making the changes.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'c366a1d2-a26f-461e-b3c4-36d5d42d333c',
            names: {
              en: 'Archive text',
            },
            descriptions: {
              en: 'No more changes should be made in the text.  A revision project would require the creation of a new Paratext project.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '33f3b200-35be-45c4-bb24-a6eb241ab9d6',
            names: {
              en: 'Do audio recording',
            },
            descriptions: {
              en: 'PMD works with another agency to produce an audio recording of the text.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
    ],
    checks: [
      {
        checkId: 'notes.translator',
        notifyOnlyInStage: null,
        requiredInStage: 'b708cb04-830d-46ba-b465-6567c05b323b',
      },
    ],
  },
  {
    id: '81c0ccbe-e874-4751-b97a-fb4f8d3eabcd',
    name: 'Biblica Base Plan 1.03',
    version: '1.03',
    kind: 'factory',
    stages: [
      {
        id: '1703c346-ce9e-427e-9476-9f3a8af26c67',
        names: {
          en: 'Setup and Drafting',
        },
        descriptions: {
          en: 'Prerequisites\n* Research and Development  Document  approved \n* Translation/Revision team recruited \n* ICAs signed \n* Translation/Revision Brief  written  \n* Preliminary Preface written by Translators based on Brief\n* Translation/Revision Brief and Preface  approved\n* Translation training \n* Paratext and Project Style Guide workshop   \n* Initial translation of metatext in FRT and BAK books\n1) Global Translation Technology staff creates and registers the Paratext Working Project (WP): \n - Sets up Project Plan based on approved project brief and style guide\n - Adds/Updates Paratext project plan\n - Adds standard custom.sty and custom.vrs\n - Adds autocorrect.txt\n - Adds BiblicaBiblicalTerms\n - Adds/Updates standard Translation Metatext template\n - Sets up language settings\n - Creates Back translation project and tasks if needed\n - Creates “Consultant Check” note type\n - Adds personnel and grants Roles and Permissions\n2) Global Project Manager initiates Project plan \n3) Translation team drafts/revises translation, introductions, and metatext',
        },
        tasks: [
          {
            id: 'ba420c79-b942-4ffc-95dd-178b8e755fe5',
            names: {
              en: '1.1 Initiate Project Increment',
            },
            descriptions: {
              en: 'Global Project Manager with the Project Manager \n - Agree on overall target completion dates for the Increment and the intermediate Stages\nGlobal Project Manager\n - Sets the Working Project progress parameters for the Increment in the Paratext Registry:\n - Scope: (Current Increment)\n - Status: Active\n - Expected Completion Date: (Current Increment)\nProject Manager\n - Sets scope of the Current Increment in Project Properties\n - Sets Stage target completion dates in Assignments and Progress\n - Assigns tasks to team members in Assignments and Progress\n - Unchecks Task 1.4 Edit Peripheral Books and 4.1 Complete Peripheral Books, if necessary \nGlobal Project Manager \n - Verifies all project increment parameters are set',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '3c877baf-f9b9-41f5-980a-e13c286c8a16',
            names: {
              en: '1.2 First Draft Editing',
            },
            descriptions: {
              en: 'After thorough exegesis, Translators: \n - draft/revise book introductions (Book Intro. Template)\n - draft/revise chapters assigned to them\n - resolve issues found by basic checks\n - use the Wordlist tool to check spelling\n - approve BiblicaBiblicalTerms using the Biblical Terms tool\n - use Parallel Passage tool\nLinguist(s) (one or two)\n - Approve spelling, hyphenation and word breaks using Wordlist tool. \n - Makes notes to translators on grammatical and stylistic issues',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: 'd693064e-9811-40af-ae27-8f7e10245fc4',
            names: {
              en: '1.3 Technical Check',
            },
            descriptions: {
              en: 'Technical Manager\n - Verifies checks are correctly done\n - Verifies markup is correctly applied\n - Cleans up any errors or inconsistencies',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'b2a26fd8-9cbb-4ae9-bbd5-ab9b933c844a',
            names: {
              en: '1.4 Edit Peripheral Books',
            },
            descriptions: {
              en: 'Translation Team:\n- Translates/revises metatext in FRT and BAK books',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '3afcc381-cf1a-4677-8bd5-2ed6a25d56a2',
        names: {
          en: 'Internal Review',
        },
        descriptions: {
          en: 'Text is updated based on:\n1) Grammar and Spelling Review\n2) Co-Translator Review\n3) Oral Testing',
        },
        tasks: [
          {
            id: 'ab82beac-f8e8-4657-b5a1-e0ea88020c09',
            names: {
              en: '2.1 Grammar and Spelling Review',
            },
            descriptions: {
              en: 'Linguist\n - Reads through text\n - Flags grammatical, punctuation, capitalization, clarity, and naturalness errors with “To Do” notes\nUsing Wordlist tool:\n - runs advanced spelling checks: \n   (Tools>Spell Check and Tools> Incorrectly Joined and Split Words)\n - marks misspelled words as incorrect\n - resolves spelling notes in the Wordlist tool',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 800,
              easy: 700,
              moderate: 600,
              difficult: 500,
            },
          },
          {
            id: '79e42a6d-48f6-4205-8edb-213b42912e7c',
            names: {
              en: '2.2 Co-Translator Review',
            },
            descriptions: {
              en: 'Co-translator\n - Makes suggestions using “To Do” Notes\n - Creates or comments on rendering discussion notes (Biblical Terms tool)\nSuggested activities:\n - respond to translator notes \n - check against a model text for accuracy',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '7ecbcb7e-99e7-4dff-a9e7-3da95acafe84',
            names: {
              en: '2.3 Oral Testing',
            },
            descriptions: {
              en: 'Translation Coordinator (Lead Translator)\n - Organizes oral reading of the entire text increment\n - Solicits comments from members of the translation team and possibly select members of the language community. See “Guidelines for Oral Testing” document.\n - Adds recommendations to the project as “To Do” notes',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 500,
              easy: 500,
              moderate: 500,
              difficult: 500,
            },
          },
          {
            id: '7f6d0724-a085-402d-8a1d-952a07bbeec0',
            names: {
              en: '2.4 Second Draft Editing',
            },
            descriptions: {
              en: 'Translator\n - Reviews Co-translator, Linguist, and Oral Testing suggestions\n - Resolves as many “To Do” notes as possible\n - Changes unresolved notes to “Consultant Check” notes\n - Edits text as necessary',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 80,
              easy: 70,
              moderate: 60,
              difficult: 50,
            },
          },
        ],
      },
      {
        id: '119d5d2b-4f84-420d-8acd-4738afdb546c',
        names: {
          en: 'External Review',
        },
        descriptions: {
          en: 'Text is updated based on: \n1) Consultant review\n2) Community Check\n3) Parallel passage check',
        },
        tasks: [
          {
            id: 'a7e0f9f9-d26f-40d6-8bc3-199562f99921',
            names: {
              en: '3.1 Consultant Review',
            },
            descriptions: {
              en: 'Consultant\n - Checks text using Interlinearizer tool, Parallel Passage tool, and back translation, if available\nCreates or responds to:\n - “To Do” and “Consultant Check” notes \n - Rendering Notes in the Biblical Terms tool',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'ec3d0845-a919-4eef-bd61-2d16db4cfe12',
            names: {
              en: '3.2 Community Check',
            },
            descriptions: {
              en: 'Community members \n - Review a draft typeset of the increment using “Community Check guidelines” document. Include Transcelerator Comprehension questions for group testing.\n - Comment on a Print Draft printout or PDF of the text or by email',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 500,
              easy: 500,
              moderate: 500,
              difficult: 500,
            },
          },
          {
            id: '366cd1fa-7494-4d7d-b4f8-4cd3edad23c6',
            names: {
              en: '3.3 Third Draft Editing',
            },
            descriptions: {
              en: 'Translator\n - Does the Parallel Passage check with consultant guidance\n - Resolves “To Do” and “Consultant Check” notes\n - Resolves spelling discussion notes (Wordlist tool)\n - Resolves rendering discussion notes (Biblical Terms tool)\n - Makes changes to text as necessary based on Notes and Parallel Passage check',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 80,
              easy: 70,
              moderate: 60,
              difficult: 50,
            },
          },
        ],
      },
      {
        id: 'bc28f9f8-0367-4df7-b541-c113abfd1eb4',
        names: {
          en: 'Signoff',
        },
        descriptions: {
          en: 'Text is updated and prepared for publication:\n1) Metatext completed\n2) Quality of Paratext checks verified',
        },
        tasks: [
          {
            id: 'b4e60deb-7230-4549-896b-09f008f9f03a',
            names: {
              en: '4.1 Complete Peripheral Books',
            },
            descriptions: {
              en: 'Translation team \n - Completes/updates translation of metatext in FRT and BAK books\n - Writes/updates preface',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '6527974c-2772-491e-b3d4-6c452f2f5b65',
            names: {
              en: '4.2 Final Draft Editing',
            },
            descriptions: {
              en: 'Translation team\n - Resolve any issues found by the Project Coordinator, Technical Manager, and Technical Director\n - Make changes to text as necessary',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'a6421e67-0cda-40e1-8290-e1d648937f5c',
            names: {
              en: '4.3 Project Coordinator Signoff',
            },
            descriptions: {
              en: 'Project Coordinator or Translation Consultant\n - Verifies all tasks and checks have been done and all Notes resolved\n - If necessary, sends project back to the translation team to resolve outstanding issues',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'e5b23a90-38e8-4c11-9120-09699dac7493',
            names: {
              en: '4.4 Technical Manager Signoff',
            },
            descriptions: {
              en: 'Technical Manager or Project Manager \n - Verifies that errors have been denied appropriately\n - Verifies that checking inventories have been marked correctly\n - Looks for additional issues that might need to be addressed using advanced checks and tools\n - Resolves as many checking issues as possible\n - If necessary, sends project back to the translation team to resolve outstanding issues',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'c779b0f5-c2c7-4b9e-9842-12bddb571385',
            names: {
              en: '4.5 Technical Director Signoff',
            },
            descriptions: {
              en: 'Translation Technology Director\n - Approves the quality of all Paratext checks\n - If necessary, sends project back to Technical Manager to resolve outstanding issues\n - Creates/updates Publishing Project (PP)\n - Sets Paratext Registry Status to Typesetting (WP&PP)\n- With Global Project Manager input, unchecks Task 1.1 Initiate Project Increment',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '9cbd63b4-81a7-4111-912a-6ffc71906a0a',
        names: {
          en: 'Typesetting and Publication',
        },
        descriptions: {
          en: 'Issues discovered during typesetting resolved:\n1) Preliminary typeset review\n2) Final typeset proofread\nPublished to DBL',
        },
        tasks: [
          {
            id: '4a5c6f55-3d13-4a04-b171-ffb4a1d28f74',
            names: {
              en: '5.1 Preliminary Typeset Review',
            },
            descriptions: {
              en: 'Community members review the Preliminary Typeset using “Guidelines for Preliminary Typeset Review” document',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 800,
              easy: 700,
              moderate: 600,
              difficult: 500,
            },
          },
          {
            id: 'b194855b-2634-458a-a07f-2d7579fbb296',
            names: {
              en: '5.2 Preliminary Typeset Editing',
            },
            descriptions: {
              en: 'Translation Technology Staff, in consultation with the translation team:\n - Resolves issues discovered by the Preliminary Typeset Review \n - Corrects the Publishing Project\n - Updates the books being published in the Working Project',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '6bf4226e-0a42-4c80-a3c4-6d833e06d7ff',
            names: {
              en: '5.3 Final Typeset Proofread',
            },
            descriptions: {
              en: 'Translation team proofreads the Final Typeset to correct inadvertent typesetting errors using “Guidelines for Final Typeset Proofread” document',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '3cc912c6-c6aa-4505-9a16-c0875b5a4ea3',
            names: {
              en: '5.4 Final Editing',
            },
            descriptions: {
              en: 'Translation Technology Staff, in consultation with the translation team:\n - Resolves any errors in the Publishing Project found by the Final Typeset Proofread\n - Verifies corrections\n - Updates the books being published in the Working Project',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '165984bc-e986-4b85-b0d8-b0f95812657b',
            names: {
              en: '5.5 Final Signoff',
            },
            descriptions: {
              en: 'Area Translation Director\n - Submits report to Senior Director, Global Translation detailing the quality of the work, with recommendations for future work.\nSenior Director, Global Translation\n - Based on ATD report, signs off on the translation project\n - Indicates completed status on the translation dashboard',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'c19ef1f2-ffa9-46ab-9d4d-5b19c9d73685',
            names: {
              en: '5.6 Initial Publication',
            },
            descriptions: {
              en: 'Translation Technology Director \n - Submits completed books to the Digital Bible Library (DBL)\n - Sets Paratext Registry Status to Published (PP)\n - Authorizes the Global Project Manager to set the progress parameters for the next project Increment in the Paratext Registry (WP) (Task 1.1)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
    ],
    checks: [
      {
        checkId: 'basic.chapter-verse-numbers',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.markers',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.characters',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.punctuation',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.references',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.unmatched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.repeated-words',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.matched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.quotations',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.numbers',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'notes.translator',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.capitalization',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'spelling.word-list',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'spelling.spelling',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'notes.consultant',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'other.biblical-terms',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'other.parallel-passages',
        notifyOnlyInStage: null,
        requiredInStage: '119d5d2b-4f84-420d-8acd-4738afdb546c',
      },
      {
        checkId: 'notes.spelling-discussion',
        notifyOnlyInStage: null,
        requiredInStage: '119d5d2b-4f84-420d-8acd-4738afdb546c',
      },
      {
        checkId: 'notes.rendering-discussion',
        notifyOnlyInStage: null,
        requiredInStage: '119d5d2b-4f84-420d-8acd-4738afdb546c',
      },
    ],
  },
  {
    id: 'da3ed33a-1f62-453c-9a16-af0ab1dec374',
    name: 'GILLBT Plan',
    version: '1.0',
    kind: 'factory',
    stages: [
      {
        id: '1fee04f4-ddb8-4cfb-8a32-762328d6ba6c',
        names: {
          en: 'Drafting',
        },
        descriptions: {
          en: 'The Drafting stage incorporates exegetical research, drafting the text into Paratext, and basic checks.',
        },
        tasks: [
          {
            id: 'cd202fa7-80f2-4925-8f9b-57a2f985c383',
            names: {
              en: 'Exegesis',
            },
            descriptions: {
              en: 'Use the Source Language Tools, UBS Handbooks, and other available commentaries to get a good understanding of the background to the text.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'c14c2cd6-eed0-462d-99f5-c61585993516',
            names: {
              en: 'Draft / Keyboard',
            },
            descriptions: {
              en: 'Draft/keyboard text into Paratext, being mindful of using the correct spelling, format markers, and punctuation.\n\t\n\nUse the Key Terms tool to have a consistent translation.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: 'c7e15989-2dbd-482d-b584-b9911c4c05a9',
            names: {
              en: 'Draft Supplementary Helps',
            },
            descriptions: {
              en: 'Draft Section Headings, Footnotes, Glossary Entries, Book Introductions, Illustrations.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '7d2a59e8-67e5-4a73-9080-27e3da4c1029',
        names: {
          en: 'Team Checking',
        },
        descriptions: {
          en: 'Checking of the text will also entail team checking for key terms, names, numbers, weights, and supplementary helps. The team should refer to any decisions previously made about dialect. First testing may also be done and revision made based on feedback from testing. \n\nIn sum, it involves co-translators reading through translated draft and comparing with base texts such as NIV and other relevant bible resources, harmonizing key biblical terms with co-translators, checking for clarity and naturalness in translation, running further Paratext checks such as section heading, footnotes, relatively long and relatively short verses and paragraphs.',
        },
        tasks: [
          {
            id: 'f3a66e3a-7bdb-4aed-acee-c0bcca67c222',
            names: {
              en: 'Team Check',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
        ],
      },
      {
        id: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
        names: {
          en: 'Preparing for Consultant',
        },
        descriptions: {
          en: 'The team will print out hard copies for reviewing by the review committee, hold review sessions by review panel to check for naturalness and clarity as well as give feedback on the translation. \n\nConsultants may request a back translation which should be prepared ahead of time. Lastly, translators will discuss input by reviewers and insert corrections.',
        },
        tasks: [
          {
            id: 'c480c038-cdf0-4948-b98f-07e7526644ea',
            names: {
              en: 'Reviewers Feedback',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
        ],
      },
      {
        id: 'c2523b4a-8267-495d-b903-f45d98ebe0f0',
        names: {
          en: 'Consultant Checking',
        },
        descriptions: {
          en: 'Process: Consultant will receive a version of the book for study prior to meeting translators.\n\nThe consultant will meet with the translators to check all aspects of translation (introduction to book, chapters and verses of books)\n\nThe consultant will receive an oral back translation of verses during the checking.  The consultant will then probe, discuss and suggest areas for improvement.\n\nTranslators will input corrections from consultant checking and the consultant may later approve the corrections.',
        },
        tasks: [
          {
            id: '2ef0350c-1efd-46ff-9cd5-711b8fa81e1c',
            names: {
              en: 'Consultant Check',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 200,
              easy: 200,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '6dd794aa-bef3-44f7-a4c0-873fc2dc0708',
            names: {
              en: 'Translators make corrections',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '3e4ce946-cfc3-4fe9-a32e-81c1606a918c',
        names: {
          en: 'Community Review',
        },
        descriptions: {
          en: 'Print copies of Consultant checked books. Community groups will test the books for comprehension, \n\nTrial reading should be done in churches, meetings with groups and individuals, in Bible Studies, or family devotions. The community will need to be educated on the use of the text including features such as footnotes, headings, and introductions.\n\nCorrections from community review will be input back into Paratext on the approval of the cosultant.',
        },
        tasks: [
          {
            id: '1f87c9fa-f873-40a1-af1b-27d2989f6a6a',
            names: {
              en: 'Community Testing',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '69893191-cff6-431a-81f5-24d0faf11426',
            names: {
              en: 'Confirm Key Terms',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '86ac513a-15c2-45c4-9603-9cde6008b6b5',
        names: {
          en: 'Finalizing for Publication',
        },
        descriptions: {
          en: 'The translators will run all of the Paratext checks to make sure that the text is in good condition. They will also make sure that illustrations are in the correct places and have appropriate captions.\n\nOnce the Consultant has given approval, the typesetter will format the text, illustrations, and maps to prepare it for printing. Decisions will be made about the size of the text and the type of cover and spine. A final read through is done by the translators before being printed.',
        },
        tasks: [
          {
            id: 'd5930bdc-a280-42ad-a5c5-709cf8b8813a',
            names: {
              en: 'Finalize Illustrations, Captions and Maps',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '802276a9-194c-4fb6-938e-786d6de3a911',
            names: {
              en: 'Finalize Checks: Consistency and Formatting',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '7aaa1652-ded5-4617-931f-0bd3203627d8',
            names: {
              en: 'Final Approval from Consultant',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '57831416-4ffc-48ab-8b94-d21ce1f3cafd',
            names: {
              en: 'Typesetting',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '6b140055-fcd8-4064-8c81-18235e5b46d4',
            names: {
              en: 'Final Read-Through & Approval',
            },
            descriptions: {
              en: 'Final Read-Through & Approval with church & community representatives.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'e35a9869-aabe-43ad-8f8b-85cf2d27a6bb',
            names: {
              en: 'Finalize Typesetting',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
    ],
    checks: [
      {
        checkId: 'basic.chapter-verse-numbers',
        notifyOnlyInStage: null,
        requiredInStage: '1fee04f4-ddb8-4cfb-8a32-762328d6ba6c',
      },
      {
        checkId: 'basic.markers',
        notifyOnlyInStage: null,
        requiredInStage: '1fee04f4-ddb8-4cfb-8a32-762328d6ba6c',
      },
      {
        checkId: 'basic.characters',
        notifyOnlyInStage: null,
        requiredInStage: '1fee04f4-ddb8-4cfb-8a32-762328d6ba6c',
      },
      {
        checkId: 'basic.punctuation',
        notifyOnlyInStage: null,
        requiredInStage: '1fee04f4-ddb8-4cfb-8a32-762328d6ba6c',
      },
      {
        checkId: 'notes.translator',
        notifyOnlyInStage: null,
        requiredInStage: '1fee04f4-ddb8-4cfb-8a32-762328d6ba6c',
      },
      {
        checkId: 'basic.quotations',
        notifyOnlyInStage: null,
        requiredInStage: '1fee04f4-ddb8-4cfb-8a32-762328d6ba6c',
      },
      {
        checkId: 'other.biblical-terms',
        notifyOnlyInStage: null,
        requiredInStage: '7d2a59e8-67e5-4a73-9080-27e3da4c1029',
      },
      {
        checkId: 'basic.references',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'basic.capitalization',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'basic.repeated-words',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'basic.matched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'basic.numbers',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'basic.unmatched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'spelling.word-list',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'spelling.spelling',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'notes.consultant',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'other.parallel-passages',
        notifyOnlyInStage: null,
        requiredInStage: 'c2523b4a-8267-495d-b903-f45d98ebe0f0',
      },
      {
        checkId: 'notes.spelling-discussion',
        notifyOnlyInStage: null,
        requiredInStage: '3e4ce946-cfc3-4fe9-a32e-81c1606a918c',
      },
      {
        checkId: 'notes.rendering-discussion',
        notifyOnlyInStage: null,
        requiredInStage: '3e4ce946-cfc3-4fe9-a32e-81c1606a918c',
      },
    ],
  },
  {
    id: 'c24b3d94-892e-4643-b9a8-0c9db40c9c05',
    name: 'PBT Base Plan',
    version: '2.28',
    kind: 'factory',
    stages: [
      {
        id: 'b6cd2718-36c9-472c-84d6-753fca853c02',
        names: {
          en: 'Drafting',
        },
        descriptions: {},
        tasks: [
          {
            id: '9f99673c-cb6a-4c05-a9cd-4629eb7f6b20',
            names: {
              en: 'Study the passage (exegesis)',
            },
            descriptions: {
              en: 'The first translation task is to study the text carefully, using Bible versions and commentaries. This is called “doing the exegesis”. There should be at least one person on each translation team who is a skilled exegete.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '4bce47e9-37c3-42ae-a8ec-5a5006c0e21e',
            names: {
              en: 'Draft text',
            },
            descriptions: {
              en: 'The first draft of the text, whether written out by hand or directly typed into the computer, is entered into Paratext.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '40b6dcd4-3b9d-4790-819d-28f0fc02bc53',
            names: {
              en: 'Draft section headings',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: 'b1ee4198-d3fe-4a2f-9cd7-4e0fa1ec8bd3',
            names: {
              en: 'Draft footnotes',
            },
            descriptions: {
              en: 'It is best to draft these when you decide that a footnote is needed. You can add another footnote anytime you feel it needs to be added.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '58089389-d741-4c35-848b-64a65229ffb1',
            names: {
              en: 'Read the draft aloud',
            },
            descriptions: {
              en: 'A mother-tongue speaker of the receptor language reads the draft aloud to the team, and possibly other mother tongue speakers of the language to check for naturalness and clarity. Then adjust the text based on comments from the group.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '52d1137c-4259-4e66-b675-f8231709d418',
            names: {
              en: 'Enter revisions from the readthrough',
            },
            descriptions: {
              en: 'Revisions to the text based off of reading the text out loud should be entered into Paratext during the reading or as soon as possible after the readthrough is completed.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '0b6970df-00ce-4da4-a46a-28be4c7f2e6a',
            names: {
              en: 'Do back translation or interlinear',
            },
            descriptions: {
              en: 'A back-translation is a translation into the major national or trade language of the area. It should be done by a speaker of the language other than the translator. It helps to show whether the translation is communicating effectively and accurately. Consultants usually require a back translation or an interlinear. If an interlinear is required instead of a back translation, complete the glossing of the interlinearization of the text to help guide the consultant on a word-by-word basis of looking at the text.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '1ce56f6c-82fc-41b6-9876-7a25572b4951',
            names: {
              en: 'Draft book introductions',
            },
            descriptions: {
              en: 'Be careful to use the same key terms in the introduction as in the text.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: 'c5b30b84-03c8-4bbc-b49a-07b1184550e0',
            names: {
              en: 'Run basic checks',
            },
            descriptions: {
              en: 'After drafting a book of the Bible, run basic checks and resolve any issues found with chapter and verse numbers, markers, etc.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
        ],
      },
      {
        id: '75704aa3-5afe-4d6e-be69-92aae825799c',
        names: {
          en: 'Exegetical Checking',
        },
        descriptions: {},
        tasks: [
          {
            id: 'e51e5efb-465b-4e47-9146-4c122966a545',
            names: {
              en: 'Exegetical check: text',
            },
            descriptions: {
              en: 'This check is done by the translation advisor/exegetical specialist with the rest of the translation team.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '345fa1df-93d1-45f5-9582-29b9e1dfab11',
            names: {
              en: 'Exegetical check: parallel passages',
            },
            descriptions: {
              en: 'Open Parallel Passage tool and confirm all parallel passages. Review the wording of the text in these parallel passages and decide if wording in one text would be better if harmonized with the wording in another text. (This check is not simply that parallel passages have check marks, it is meant to read the verses and see if the appropriate words are green or yellow in each passage.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'f930ee8b-ea02-4443-ba40-b59e240c1dca',
            names: {
              en: 'Exegetical check: introduction, section headings, footnotes',
            },
            descriptions: {
              en: 'This check is done by the translation team with the translation advisor/exegetical specialist.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '386e0970-f1fc-4ce9-bffa-c2d92a772fc1',
            names: {
              en: 'Check spelling',
            },
            descriptions: {
              en: 'You can do a spell check in a variety of ways. If you want to use the Paratext tool, under the Checking Menu is "Spell Check Current Book", Click on this and accept or correct the spelling of all of the words present. For those that need more discussion open the wordlist tool and add a spelling discussion note.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '8ca385ae-24ad-41ab-8a63-707505e039a1',
            names: {
              en: 'Check proper nouns & names',
            },
            descriptions: {
              en: 'Verify that proper nouns and names have been transliterated according to agreed upon rules, and are consistent. Verify that capitalization has been done correctly and consistently. For languages with word level and grammatical honorifics, verify that they are used correctly. Note: The Biblical terms tool can help with the verification of names if the list is filtered for the "Names" category. The Biblical terms tool will not find instances of a name in book introductions, section headings, footnotes, illustration captions and glossary entries. You will have to find the proper names in these locations manually.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '2ab560e9-de94-4121-b26a-153b83b8ded4',
            names: {
              en: 'Enter Biblical terms renderings',
            },
            descriptions: {
              en: 'Identify the Biblical key terms in the passage. (Not every term in the "All Biblical terms list" but the terms deemed significant for consistency sake.) Keyboard the renderings into the Biblical terms Tool. Check the consistency of the Biblical key terms used in the passage with the terms documented in the Biblical terms tool.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'f3da5856-8678-43d8-bbdf-8e95a38a9221',
            names: {
              en: 'Exegetical checking: run basic checks',
            },
            descriptions: {
              en: 'After making changes to the text during exegetical checking, run basic checks and resolve any issues found with chapter and verse numbers, markers, etc.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
        ],
      },
      {
        id: '7580b0c4-40f7-4f03-80b6-d33b749370a7',
        names: {
          en: 'Comprehension Checking',
        },
        descriptions: {},
        tasks: [
          {
            id: '0b6cbd07-9f68-4ec9-9eb6-684ce68f7dac',
            names: {
              en: 'Prepare text for group checking',
            },
            descriptions: {
              en: 'Open the "Assignments and Progress" window and correct all errors/issues shown there. Once all errors are corrected and open notes are resolved, you can print a copy of the books or chapters to be reviewed by community group. The two simplest ways to print text from Paratext are found under the "File" menu. They are "Print Draft" and "Save as RTF". There are other methods available for more advanced formatting, such as "Export to Pathway". Use the method specified by your project administrator or translation consultant.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'a2d91ced-2fbd-4501-a174-e88cd4ca7be9',
            names: {
              en: 'Comprehension check with a group',
            },
            descriptions: {
              en: 'Translators read aloud to a group of people who are fresh to the text, Ask comprehension questions. Check for clarity and naturalness.  Make note of any places where revisions need to be made which will later be entered into Paratext.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '7f10b45c-974b-4e3a-9171-1eba8f70383e',
            names: {
              en: 'Enter revisions from comprehension checks',
            },
            descriptions: {
              en: 'Type revisions.\n\nWhile supplementary helps are specifically mentioned in the drafting section, it is assumed that all other checks will also be completed on supplementary materials and that these are a part of the final text.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '6603db53-62b5-4df5-aaf5-8d71661d9cc0',
            names: {
              en: 'Update back translation or interlinear',
            },
            descriptions: {
              en: 'After making changes to the text during exegetical checking and comprehension checking, update the back translation or interlinear to reflect those changes. This is a critical step to complete before making the text available to the consultant.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'f8afb80c-dab6-470b-a564-89b3d44dbaad',
            names: {
              en: 'Update Biblical terms',
            },
            descriptions: {
              en: 'Open Biblical terms tool and filter for chapter(s) being prepared for consultant check. Verify that your list of Biblical terms have approved renderings. Update any that are missing, or need to be changed because of a better understanding of what the Greek or Hebrew means. It is likely some are out-of-date, because of the revisions made after comprehension testing.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'a9af55f4-6e76-468b-95c7-fa942d430432',
            names: {
              en: 'Comprehension checking: run basic checks',
            },
            descriptions: {
              en: 'After making changes to the text during comprehension checking, run basic checks and resolve any issues found with chapter and verse numbers, markers, etc.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
        ],
      },
      {
        id: 'aa953eb8-215c-4e1e-bfbe-ab16866a3a3a',
        names: {
          en: 'Consultant Checking',
        },
        descriptions: {},
        tasks: [
          {
            id: 'fd6c2f9b-c34f-4762-bcd0-845ff03c1785',
            names: {
              en: 'Make text available to consultant',
            },
            descriptions: {
              en: 'The team needs to make the translated text available to the consultant who will  evaluate the text for accuracy, clarity, naturalness, and acceptability of the translation including all supplementary materials and illustrations used. This can be done by adding the consultant as a user to the project if they are not already listed as a user. Be sure to let the consultant know that the text (and interlinear or back translation)  is ready for checking.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '3fa56ed4-eb36-4b5f-bef6-3b193f4e5fdf',
            names: {
              en: 'Review/respond to Consultant Notes',
            },
            descriptions: {
              en: 'Once the consultant has evaluated the text and placed notes with observations in the text (or back translation) the translation team may use these notes to review the text themselves and respond to the notes. Translation teams should not resolve the notes of a consultant. The consultant should resolve the notes once the consultant is satisfied that the team has answered whatever question was raised. If there is not time to review and respond to the Consultant Notes before the consultant checking session begins, then these notes should be dealt with in the checking session.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '688c3484-9a22-4674-9e7b-6ab818523a72',
            names: {
              en: 'Checking session: text',
            },
            descriptions: {
              en: 'Consultant interacts with the translation team concerning his observations about the text and supplementary materials, and gives assistance and advice as requested. The project administrator should give one team member (that could be himself) editing permission in the Assignments and Progress window for the "Consultant Checking session" task. It is best to enter revisions to the text into Paratext during the checking session. If the translation team needs to hold more discussion about a possible revision to the text after the checking session is completed, the consultant should put a Note at that verse. The team will respond to that Note later and if the consultant is satisfied with the answer he will resolve the Note.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'ea0c127b-b1f9-4e6c-867c-1be54ea83f94',
            names: {
              en: 'Checking session: section headings, footnotes',
            },
            descriptions: {
              en: 'Consultant interacts with the translation team concerning his observations about the text and supplementary materials, and gives assistance and advice as requested. The project administrator should give one team member (that could be himself) editing permission in the Assignments and Progress window for the "Consultant Checking session" task. It is best to enter revisions to the text into Paratext during the checking session. If the translation team needs to hold more discussion about a possible revision to the text after the checking session is completed, the consultant should put a Note at that verse. The team will respond to that Note later and if the consultant is satisfied with the answer he will resolve the Note.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'a62d8948-c0bd-40cc-9a51-aab81cd0beaa',
            names: {
              en: 'Checking session: introduction',
            },
            descriptions: {
              en: 'Consultant interacts with the translation team concerning his observations about the text and supplementary materials, and gives assistance and advice as requested. The project administrator should give one team member (that could be himself) editing permission in the Assignments and Progress window for the "Consultant Checking session" task. It is best to enter revisions to the text into Paratext during the checking session. If the translation team needs to hold more discussion about a possible revision to the text after the checking session is completed, the consultant should put a Note at that verse. The team will respond to that Note later and if the consultant is satisfied with the answer he will resolve the Note.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '9f1ca7b0-d40e-408a-b40b-c5758f6312b3',
            names: {
              en: "Respond to consultant's input",
            },
            descriptions: {
              en: 'The translation team will respond to all Consultant Notes that remain in the text after the Consultant Checking session has been completed or any other input provided by the Consultant. If the consultant is satisfied with the answer he will resolve the Notes in Paratext.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '6bf78365-758c-4cd9-960f-82f57e68fe4e',
            names: {
              en: 'Final consultant approval',
            },
            descriptions: {
              en: 'Consultant gives approval of the text at the end of checking session if all questions are answered to his satisfaction, or once any follow-up tasks which the consultant has clearly defined have been taken care of.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '97931ae7-27a7-43e4-8baf-75f7f3790234',
            names: {
              en: 'Consultant report distributed',
            },
            descriptions: {
              en: "Consultant report shared with the translation team and the team's leadership (e.g. DLA or programs director).",
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '61a914d3-fe5d-4386-a4cf-6c20f949d8f7',
            names: {
              en: 'Review significant changes with community',
            },
            descriptions: {
              en: 'Community reviews, to make sure that all significant changes done in consultant check are natural and clear.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '71c310fb-78d5-44c9-b334-c586a410a028',
            names: {
              en: 'Consultant checking: run basic checks',
            },
            descriptions: {
              en: 'After making changes to the text during consultant checking, run basic checks and resolve any issues found with chapter and verse numbers, markers, etc.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
        ],
      },
      {
        id: '67ebcabd-8d8f-4132-8991-58515e2fdf7d',
        names: {
          en: 'Pre-publication',
        },
        descriptions: {},
        tasks: [
          {
            id: '819e4803-d2fb-465e-8242-3ce0d58edde2',
            names: {
              en: 'Draft the Title Page and Verso Page',
            },
            descriptions: {
              en: 'These pages are mandatory and need to be approved by Branch or Field Directors as they contain copyright statements.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '2ebab8c7-abb5-456f-9498-fcb98f60f17c',
            names: {
              en: 'Draft other front & back matter',
            },
            descriptions: {
              en: 'This can include the preface, the glossary, an introduction to the Bible/NT, and spine text.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '9bd5b294-ef93-4e48-a622-8e6907aab38c',
            names: {
              en: 'Consistency check: Biblical terms',
            },
            descriptions: {
              en: 'Open Biblical terms tool and review all renderings for consistency, and make any last changes needed.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '0779f335-1113-4370-ac07-7cfc0676593b',
            names: {
              en: 'Consistency check: wordlist',
            },
            descriptions: {
              en: 'The team goes through the entire wordlist together, to make sure there are no words spelled multiple ways, and to make sure they are all in final agreement on all spelling decisions. Make sure to look at "Find Similar Words" and "Find Incorrectly Joined or Split Words" under the "Checking" tab.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'ea8585f9-a9fa-4778-863f-61ce41542068',
            names: {
              en: 'Final check: proper names',
            },
            descriptions: {
              en: 'In the Biblical terms tool, create a new filter for the "Names" category. Check for proper capitalization, and confirm that any transliteration of a name conforms to the natural rules and conventions of the vernacular language.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'ba93cc52-db81-4b97-9fa4-7acd521c1601',
            names: {
              en: 'Final check: numbers & money',
            },
            descriptions: {
              en: 'Select the list "Numbers" as the Biblical terms list in the Biblical terms tool to find all the numbers. Make sure there is consistency in the formatting of all the numbers. \n\nVerify that words such as money, coin, silver, gold, denarii, and shekel are adequately differentiated and rendered consistently.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '1ac01594-c549-410f-bd50-2c248f767c6f',
            names: {
              en: 'Final check: weights & measures',
            },
            descriptions: {
              en: 'Verify that words such as talent, mina, shekel, pim, beka, gerah etc., are adequately differentiated and rendered consistently. \n\nVerify that words such as cubit, span, handbreadth, orgyia, stadion, milion, cor, lethech, ephah, seah, omer, cab, bath, hin, log, etc., are adequately differentiated and rendered consistently.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '60fc3151-1b71-4910-b9f4-96dbaf84c225',
            names: {
              en: 'Format check: section breaks and section headings',
            },
            descriptions: {
              en: 'If another translation is used as a base then this check can be done using Tools > Checklists > Compare Section Headings',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'a5b28c00-1dce-405f-8cb2-fb9fb0fd346e',
            names: {
              en: 'Format check: paragraph breaks',
            },
            descriptions: {
              en: 'If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\p, and \\m.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'e66023ab-dc4d-4f5c-94a5-93fded851e7a',
            names: {
              en: 'Format check: special formatting',
            },
            descriptions: {
              en: 'See list of special formatting issues such as genealogies, words on the cross, letters, etc. Verify that text is marked using the correct standard format markers (USFM). See http://paratext.org/about/usfm for latest guide to using USFMs.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'ce33f6a6-b46c-4abe-a234-5fa6bbe06ea5',
            names: {
              en: 'Format check: layout and indents',
            },
            descriptions: {
              en: 'Verify other layout issues such as poetry. Particular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\q, \\q1 and \\q2.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '4363aa1f-aeca-4831-8562-085b9381bad6',
            names: {
              en: 'Finalize illustrations; write captions',
            },
            descriptions: {
              en: 'Make final decisions on illustrations.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '9fca00d9-bb43-4718-aa64-8d4e07f9ab43',
            names: {
              en: 'Choose maps; label place names',
            },
            descriptions: {
              en: 'Make final decisions on maps.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'fac6ef6a-67d8-4fc4-bc1f-32fca45c5b3c',
            names: {
              en: 'Develop glossary',
            },
            descriptions: {
              en: 'Determine if the glossary for your project will be solely in the vernacular or a diglot or a triglot. Some teams choose to include a trade language (language of wider communication - LWC) in addition to an official world language. Arrange the glossary entries in alphabetical order in the vernacular language.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'b36effbd-65a1-41f9-83b7-e5b955d85b6d',
            names: {
              en: 'Develop cover design',
            },
            descriptions: {
              en: 'Communicate with the person designated as the typesetter for your project and ask that person to help you choose colors for your cover, how many colors, what kind of material to make the cover out of, and many more aspects that you might not be aware of.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'b72c7c62-c22b-47b0-9850-a719cb794861',
            names: {
              en: 'Add cross references',
            },
            descriptions: {
              en: 'If cross references have not been added to the vernacular project yet, now is the time to add them. If there are verse spans in the text, there is a possibility that the Scripture references will be shown double in the cross reference section as the bottom of hte page. For example, Matt 6:14-15 may show up twice down in the cross reference section. If this is the cae, then all the verses which are referred to from Matt 6:14-15 will need to be listed under only one reference, i.e. joined, and the second cross reference should be deleted. To find all occurances of span verses, use the following RegEx in the "Find" box:  regex:\\\\v \\d+-',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '92d5838b-bce2-4207-a7dc-5c6001f6d7d9',
            names: {
              en: 'Format check: footnotes & cross references',
            },
            descriptions: {
              en: 'Read all footnotes and cross references looking for inconsistencies in how they are formatted. The goal is to have a consistent look and feel across all footnotes, and not merely the absence of marker errors in the footnotes.  It may be helpful to go to Tools-->Checklist-->Footnotes. This checklist will compare the footnotes in your text to other resources that you specify.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '1cbff9af-07b6-4d6b-b970-aeb548b5b95a',
            names: {
              en: 'Final read through/approval with church/community',
            },
            descriptions: {
              en: 'After all final checks have been done, the translation team should print off the NT book(s) and do a complete oral read-through together with church and community leaders who will offer any final suggestions for revisions to the text.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'fdb55ea8-675a-4748-938e-29baeb639b04',
            names: {
              en: 'Revise text based on final read through/audio',
            },
            descriptions: {
              en: 'Make any final changes to the text based on feedback given during the oral read through and/or the listening to the audio recording of the Scriptures.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '431a349f-1c55-418d-8209-7112f7abcdb3',
            names: {
              en: 'Pre-publication: run basic checks',
            },
            descriptions: {
              en: 'After making changes to the text during pre-publication stage, run basic checks and resolve any issues found with chapter and verse numbers, markers, etc.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'cd07b637-3f6b-42c4-bf7c-be7a9460eee6',
            names: {
              en: 'Received final publication approval',
            },
            descriptions: {
              en: 'After every check has been run, after every revision has been made, and when the team says they are ready to go to the final typesetting, then the team must ask for the final approval from whoever is the person in authority over your language project.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'a9a461dc-23c0-460c-a33b-8a5d49ea88e9',
            names: {
              en: 'Do final typesetting',
            },
            descriptions: {
              en: 'This task is not done by the translation team. It is done by a typesetter. But you need to be ready to interact with the typesetter at anytime as they run other various Paratext Checks. As the typesetter finds questions to ask the team, they may put them as Notes in the text or can send questions to the team by email.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
        ],
      },
    ],
    checks: [
      {
        checkId: 'notes.translator',
        notifyOnlyInStage: null,
        requiredInStage: 'b6cd2718-36c9-472c-84d6-753fca853c02',
      },
    ],
  },
  {
    id: '2ddd9e23-894e-4c1f-89a5-81291597bfca',
    name: 'SIL AmArea Base Plan',
    version: '1.3',
    kind: 'factory',
    stages: [
      {
        id: '9eddb82d-ed66-4e24-bdab-060dea2294de',
        names: {
          en: 'Drafting',
          fr: 'Rédaction de l’ébauche',
          'zh-Hans': '草拟初稿',
          es: 'Borrador',
          pt: 'Rascunho',
        },
        descriptions: {},
        tasks: [
          {
            id: '79540c20-9aed-4d84-8e64-d3a3e1e98ccd',
            names: {
              en: 'Complete translation brief',
              fr: 'Consigne de traduction',
              'zh-Hans': '完成翻译纲要',
              es: 'Traducción Completa - Sumario',
              pt: 'Tradução Completa - Sumário',
            },
            descriptions: {
              en: 'Developing the translation Brief\n\nThe translation brief is a statement of the standards for the project, such as which source texts are used,  and the specific audience and intended uses of the translation. Setting these principles out at the beginning will help the translation team work together towards the common goal.\n\nFor more information about the translation brief read:\n\n\nIntroducing the Translation Brief: A Practical Tool for Improving Translations\nThe translation brief, also referred to as translation instructions (Nord, 1991b), is a\nset of instructions prepared by a requester that accompanies a translation assignment,\nthus enabling the requester to convey information about the source text, the specific\ncommunicative purpose and context in which the text is used, the intended uses of\nthe translation and what it aims to accomplish. In short, it enables the requester and\ntranslator to be, quite literally, on the same page from start to finish.\n\nhttp://www.hablamosjuntos.org/mtw/html_toolkit/pdf/tool_3dev_transbrief-feb5_final.pdf',
              fr: 'Développez la consigne de traduction du projet. La consigne de traduction est un document qui définit les rôles et responsabilités des parties prenantes dans un projet de traduction : communautés locales, églises, SIL, traducteurs. La consigne de traduction définit ce qui sera traduit, qui est le public cible, quel genre de traduction on vise, comment on pense publier, etc. La consigne de traduction permet à toutes les parties prenantes de savoir exactement quel est leur rôle tout au long du processus de la traduction.',
              'zh-Hans':
                '制定翻译纲要\n\n在两种不同语言之间，能达至逐字逐句相同的文本是很难做到的。发起翻译项目的人或翻译请求者（translation requester）若能提供翻译纲要，便可以使译者创建目标语言内容时，更接近原来文本的原意，以致目标语言读者能明白和使用。\n\n翻译：一个共同的责任\n提出翻译纲要：一个改良翻译的实用工具\n\n翻译纲要，也称为翻译指引（Nord, 1991b），是翻译请求者分配翻译任务时所准备的一组指示，使翻译请求者能够传达他的想法，包括关乎源文本的信息，使用文本的特定交流目的和语境，翻译的预期用途以及要达到的目的。简单来说，翻译纲要能使翻译请求者和译者，在实际上，从开始到结束都在同一个节奏上。\n\nhttp://www.hablamosjuntos.org/mtw/html_toolkit/pdf/tool_3dev_transbrief-feb5_final.pdf',
              es: 'Desarrollando la traducción - Sumario\n\nUn texto equivalente en otro idioma palabra-por-palabra es dificil de lograr. El sumario de la traducción habilita a los solicitantes permitir a los traductores crear contenido en el idioma deseado que se aproxime al significado original de un texto de una manera que los lectores del idioma deseado puedan entender y usar.\nTraducción: Una responsabilidad compartida\nPresentando el sumario de la traducción: Una herramienta práctica para mejorar traducciones\nEl sumario de la traducción, tambien referida como instrucciones de traducción (Nord, 1991b), es un conjunto de instrucciones preparadas por un solicitante y que es parte de un proyecto de traducción, permitiendo así que el solicitante transmita información sobre el texto original, el propósito comunicativo específico y el contexto en el que se usa el texto, además de los usos previstos de traducción y lo que se pretende lograr. En resumen, permite al solicitante y al traductor estar, literalmente en la misma página desde el principio hasta el final.\n\nhttp://www.hablamosjuntos.org/mtw/html_toolkit/pdf/tool_3dev_transbrief-feb5_final.pdf',
              pt: 'Resumo completo da tradução - Sumario\n\nO resumo da tradução é uma declaração dos padrões para o projeto, quais textos de origem serão utilizados, e o público específico e os usos pretendidos da tradução.\nA definição destes princípios, no início, ajudará a equipe de tradução a trabalhar em conjunto na direção de um objetivo comum.\n\nPara mais informações sobre a tradução, leia:\n\nIntroduzindo o Resumo de Tradução: Uma Ferramenta Prática para Melhorar traduções\nO resumo da tradução, também referido como instruções de tradução (Nord, 1991b), e é um conjunto de instruções preparado por um solicitante que é parte de um projeto de tradução,\npermitindo, assim, que o solicitante transmita informações sobre o texto-fonte, o objetivo comunicativo específico e o contexto em que o texto é usado, os usos pretendidos da\ntradução e o que ela pretende realizar. Em suma, permite que o solicitante e o tradutor estejam, literalmente, na mesma página do início ao fim do projeto.\n\nhttp://www.hablamosjuntos.org/mtw/html_toolkit/pdf/tool_3dev_transbrief-feb5_final.pdf',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '9f99673c-cb6a-4c05-a9cd-4629eb7f6b20',
            names: {
              en: 'Exegesis',
              fr: 'Exégèse',
              'zh-Hans': '经文解释',
              es: 'Exégesis',
              pt: 'Exegese',
            },
            descriptions: {
              en: 'The first translation task is to study the text carefully, using Bible versions and commentaries. This is called “doing the exegesis”. There should be at least one person on each translation team who is a skilled exegete.',
              fr: "La première tâche du traducteur est de lire tout le livre dans une version qu’il comprend bien. Ensuite, il étudie le texte attentivement en comparant plusieurs versions. Il consulte aussi des manuels de traduction et des commentaires. C'est ce qu'on appelle « faire l'exégèse ». Dans chaque équipe de traduction, il doit y avoir au moins une personne capable de faire ce travail.",
              'zh-Hans':
                '第一个翻译任务是利用不同的圣经版本和注释书来仔细研读并理解经文。这就称之为“经文解释”。每个翻译小组最少要有一位善于解释的人。',
              es: 'La primera tarea en la traducción es estudiar el texto cuidadosamente, usando versiones de la Biblia y comentarios. Esto se llama “haciendo la exégesis”. Debe haber al menos una persona en cada equipo de traducción que sea un exégeta experto.',
              pt: 'A primeira tarefa da tradução é estudar o texto cuidadosamente, utilizando versões da Bíblia e comentários. \nEste é chamado de "Fazer a exegese". Deve ter pelo menos uma pessoas em cada equipe de tradução que seja um exegeta.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '4bce47e9-37c3-42ae-a8ec-5a5006c0e21e',
            names: {
              en: 'Keyboarding the first draft',
              fr: 'Saisie de la première ébauche',
              'zh-Hans': '输入初稿',
              es: 'Redactando el primer borrador',
              pt: 'Digitar o primeiro rascunho',
            },
            descriptions: {
              en: 'The translator, a mother-tongue speaker of the receptor language, makes the first draft of the translation, typing it into Paratext.',
              fr: 'Le traducteur, un locuteur de la langue réceptrice, rédige le texte dans Paratext. Après avoir traduit un passage, il met des titres en tête de section et des notes de bas de page s’il en voit la nécessité.',
              'zh-Hans':
                '以译入语（或受体语言）为母语的译者拟定翻译的初稿，并输入到《圣经辅助工具》中。',
              es: 'Un traductor, un hablante que tenga como lengua materna el lenguaje receptor, ingresa el texto del primer borrador de la traducción en ParaTExt.',
              pt: 'Um tradutor, um falante nativo da língua receptora, faz o primeiro rascunho da tradução, digitando-a no ParaText.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
        ],
      },
      {
        id: '9443afef-8302-4727-8f85-1cb4ef464168',
        names: {
          en: 'Team Checking',
          fr: 'Vérification en équipe',
          'zh-Hans': '翻译小组的检查',
          es: 'Comprobaciones realizadas por el Equipo',
          pt: 'Verificação em Equipe',
        },
        descriptions: {},
        tasks: [
          {
            id: '3480d1ca-6ee7-40eb-a31e-f0e06dbf73a8',
            names: {
              en: 'Exegetical check',
              fr: 'Vérification de l’exégèse',
              'zh-Hans': '经文解释的检查',
              es: 'Chequeo Exegético',
              pt: 'Verificação exegética',
            },
            descriptions: {
              en: 'This check is done by the translation team. Compare the draft with one or two translations in the national language, discuss exegetical choices that have been made in the translation, identify possible exegetical mistakes in the translation; identify any missing verses or sentences.)',
              fr: 'L’équipe de traduction fait cette vérification. Il s’agit de comparer le texte traduit avec une ou deux traductions dans une langue véhiculaire, de discuter des choix exégétiques qui ont été faits pendant la traduction, d’identifier d’éventuelles erreurs exégétiques dans la traduction et de vérifier que rien ne manque (ni versets, ni parties de versets).',
              'zh-Hans':
                '这项检查由翻译小组进行（用一个或两个本国语言的译本与初稿作一比较，讨论翻译中对经文解释方面的选择，识别翻译中可能有错的经文解释；识别是否有漏译的经节或句子。）',
              es: 'Este chequeo es realizado por el equipo de traducción. Comparar el borrador con una o dos traducciones en el idioma nacional, discutir las opciones exegéticas que se hicieron en la traducción, identificar posible errores exegéticos en la traducción; identificar cualquier versículo u oración faltantes.',
              pt: 'Esta verificação é feita pela equipe de tradução. Compare o rascunho com uma ou duas traduções na língua nacional, discutir as escolhas exegéticas que foram feitas na tradução, identificar possíveis erros exegéticos na tradução; Identificar quaisquer versículos ou sentenças ausentes.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '7bebeaeb-5932-4232-add9-22f60ac05007',
            names: {
              en: 'Naturalness check',
              fr: 'Vérification du naturel du texte',
              'zh-Hans': '检查译文的自然度',
              es: 'Comprobando la naturalidad del Texto',
              pt: 'Verificar de naturalidade do Texto',
            },
            descriptions: {
              en: 'This check is done by the translation team (Read the draft, check the general flow of the discourse, its logic, chronology, participant reference, sentence length & rhythm, language style and register, etc.)',
              fr: 'L’équipe de traduction fait cette vérification. Elle consiste à lire le texte en prêtant attention au naturel du discours, à sa logique, à la chronologie, la référence aux participants, la longueur des phrases, le style et le registre de la langue, etc.',
              'zh-Hans':
                '这项检查由翻译小组进行（阅读初稿，检查语篇是否流畅，检查它的逻辑、年代顺序、经文中出现的所指对象（participant reference）、句子长度和节奏、语言风格和语言方式等。）',
              es: 'Este chequeo es realizado por el equipo de traducción (Leer el borrador, comprobar el flujo general del discurso, su lógica, cronología, referencia del participante, duración y ritmo de la oración, estilo del lenguaje y registro, etc.)',
              pt: 'Esta verificação é feita pela equipe de tradução (lê-se o rascunho, verifica o fluxo geral do discurso, sua lógica, cronología, referência do participante, duração e ritmo da oração, estilo de linguagem e registro, etc.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '8ca385ae-24ad-41ab-8a63-707505e039a1',
            names: {
              en: 'Proper names check',
              fr: 'Vérification des noms propres',
              'zh-Hans': '专有名词的检查',
              es: 'Comprobación de Nombres Propios',
              pt: 'Verificação dos Nomes Próprios',
            },
            descriptions: {
              en: 'Verify that proper names have been transliterated according to agreed upon rules, and are consistent. Verify that capitalization has been done correctly and consistently. For languages with word level and grammatical honorifics, verify that they are used correctly. The Greek and Hebrew texts will not have the level of honorifics that some languages will need. Therefore Paratext cannot check for them reliably. Paratext can help if you add the honorifics plus the name as an acceptable rendering for a name, but only native speakers can say for a given instance of a name whether a honorific is required or not. Note: The Biblical terms tool can help with the verification of names if the list is filtered for the "Names" category. The Biblical terms tool will not find instances of a name in book introductions, section headings, footnotes, illustration captions and glossary entries. You will have to find the proper names in these locations manually.',
              fr: 'Il s’agit de vérifier que les noms propres ont été translittérés selon les règles convenues et de manière cohérente et que les majuscules sont mises là où il le faut. L’outil « Termes bibliques » peut aider à vérifier les noms si on applique le filtre « Noms propres » à la liste des noms. Cependant, cet outil ne tient pas compte des noms propres dans les introductions des livres, dans les en-têtes de section, dans les notes de bas de page, ni dans les entrées du glossaire. À ces endroits, on est obligé de vérifier les noms propres manuellement.',
              'zh-Hans':
                '确定专有名词已经按照商定的规则来进行音译，并且是一致的。确定专有名词的大写是正确和一致的。对于用语要分层次和语法中有敬语的语言，要确定这些都用得正确。希腊语和希伯来语原文文本不一定具备某些语言所需要的不同层次的敬语。因此，《圣经辅助工具》无法可靠地进行这类检查。你若添加了一些带敬语的名字作为某个名字可接受的译法，《圣经辅助工具》也可以帮助检查，但只有说本地语的人能分辨什么时候需要有敬语，什么时候不需要。注意：“圣经专门用词”工具可以有助验证这些名字，只需要在列表中为“名字”的类别进行筛选。“圣经专门用词”工具不会在书卷简介、分段标题、脚注、插图标题和词汇表条目中查找名字。你需要在这些位置手动查找所有的专有名词。',
              es: 'Verificar que los nombres propios hayan sido transliterados consistentemente de acuerdo a las reglas acordadas con anterioridad. Compruebe que las capitalización se haya realizado correctamente y de forma coherente. Verificar que los idiomas con nivel de palabra (Word Level) y honoríficos gramaticales (grammatical honorifics) sean usados correctamente. Textos hebreos y griegos no tendrán el nivel de honorificos que algunas lenguas necesitarán. Por lo tanto ParaTExt no podrá comprobarlos de forma segura. ParaTExt puede ayudar si se agrega los honoríficos más el nombre como una traducción aceptable para el nombre, pero sólo nativo hablantes pueden decir si un honorífico es necesario o no para una instancia dada de un nombre. Nota: La herramienta de Vocablos Bíblicos puede ayudar con la verificación de nombres si la lista usa el filtro de Categoría "Nombres". La herramienta de Vocablos Bíblicos no encontrará instancias de un nombre en las instroducciones de los libros, encabezamientos de sección, notas de pie de página, subtítulos de ilustraciones y entradas de glosario. Se tendrá que encontrar los nombres propios en estas ubicaciones manualmente.',
              pt: 'Verifica se os nomes próprios foram transliterados de acordo com regras acordadas e são consistentes. Verifica se as capitalização foi feita corretamente e consistentemente. Para idiomas com nível de palavra e honoríficos gramaticais, verifique se eles são usados corretamente. Os textos grego e hebraico não terão o nível de honoríficos que algumas línguas necessitarão. Portanto, o Paratext não pode verificá-los de forma confiável. O Paratext pode ajudar se você adiciona os honoríficos mais o nome como uma tradução aceitável para o nome, mas somente falantes nativos podem decidir para uma determinada instância se um honorífico é necessário ou não. Nota: A ferramenta de termos bíblicos pode ajudar na verificação de nomes se a lista for filtrada para a categoria "Nomes". A ferramenta de termos bíblicos não encontrará instâncias de um nome em introduções de livros, títulos de seção, notas de rodapé, legendas de ilustração e entradas de glossário. Você terá que encontrar os nomes próprios nesses locais manualmente.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '5908f5a3-33bd-4929-bff3-692bb7189c22',
            names: {
              en: 'Biblical key terms check',
              fr: 'Vérification des termes bibliques',
              'zh-Hans': '主要圣经专门用词的检查',
              es: 'Comprobación de Términos Clave',
              pt: 'Verificação dos Termos-chave bíblicos',
            },
            descriptions: {
              en: 'This check is done by the translation team (Identify the Biblical key terms in the passage, keyboard the renderings into the Biblical terms Tool, check the consistency of the Biblical key terms used in the passage with the terms documented in the Biblical terms Tool, discuss and document significant variations and/or alternatives that need to be discussed with the translation consultant), compare the draft with one or two translations in the national language, discuss exegetical choices that have been made in the translation, identify possible exegetical mistakes in the translation; identify any missing verses or sentences.)',
              fr: "Cette vérification doit être effectuée par l’équipe de traduction. Il s’agit d’identifier les principaux termes bibliques dans un passage, de saisir les équivalents dans l'outil « Termes bibliques », de vérifier que les équivalents ont été utilisés de manière cohérente dans des contextes appropriés, de discuter et documenter des variations importantes et/ou des alternatives qui doivent être discutées avec le conseiller et de comparer le texte avec une ou deux traductions dans une langue véhiculaire.",
              'zh-Hans':
                '这项检查由翻译小组进行（在经文段落中识别主要圣经专门用词，把译法输入到“圣经专门用词”工具中，检查经文段落中使用的主要圣经专门用词与“圣经专门用词”工具中所记录的专门用词是否一致，讨论和记录重要的差异和／或需要与翻译顾问讨论的替代选项，用一个或两个本国语言的译本与初稿做一比较，讨论翻译中对经文解释方面的选择，识别翻译中可能有错的经文解释；识别是否有漏译的经节或句子。）',
              es: 'Este chequeo es realizado por el equipo de traducción (Identificar los términos clave bíblicos en el pasaje, ingresar los terminos generados en la herramienta de Vocablos Bíblicos, compruebar la consistencia de los términos clave usados en el pasaje con los términos documentados en la herramienta de Vocablos Bíblicos, discutir y documentar variaciones significativas y/o alternativas que necesiten ser comentados con el consultor de traducción), comparar el borrador con una o dos traducciones en el idioma nacional, discutir las decisiones exegéticas que se han hecho en la traducción, identificar posibles errores exegéticos en la traducción; Identificar cualquier versículo u oración que falte.)',
              pt: 'Essa verificação é feita pela equipe de tradução (Identificar os termos-chave bíblicos na passagem, digitar os termos generados na ferramenta de termos Bíblicos, Verifique a consistência dos termos-chave bíblicos usados na passagem com os termos documentados na ferramenta de termos bíblicos, discutir e documentar variações significativas e/ou alternativas que precisam ser discutidas com o consultor de tradução), comparar o rascunho com uma ou duas traduções na língua nacional, discutir as escolhas exegéticas que foram feitas na tradução, identificar possíveis erros exegéticos na tradução; identificar quaisquer versículos ou frases que faltam.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '386e0970-f1fc-4ce9-bffa-c2d92a772fc1',
            names: {
              en: 'Run "Spell Check Current Book"',
              fr: "Activation de l’outil « Vérifier l'orthographe du livre actuel »",
              'zh-Hans': '给当前书卷运行“拼写检查”',
              es: 'Ejecutar "Verificar ortografía de este libro:"',
              pt: 'Verificar ortografia no livro atual',
            },
            descriptions: {
              en: 'Under the Checking Menu is "Spell Check Current Book", click on this and accept or correct the spelling of all of the words present. For those that need more discussion open the wordlist tool and add a spelling discussion note.',
              fr: "Dans le menu « Vérification », cliquez sur « Vérifier l'orthographe du livre actuel ». Acceptez ou corrigez l’orthographe de tous les mots. Si vous devez discuter l’orthographe de certains mots en équipe, ouvrez l’outil « Liste de mots » et ajoutez une note de discussion d’orthographe.",
              'zh-Hans':
                '在“检查”菜单下有“给当前书卷运行‘拼写检查’”的选项，单击这个选项，然后接受或纠正所有出现字词的拼写。至于需要更多讨论的字词，请打开“词表”工具，然后添加一个拼写讨论附注。',
              es: 'Bajo el menú Verificación haga click en la opción "Verificar ortografía de este libro:", luego acepte a corrija la ortografía de todas las palabras listadas. Para aquellas palabras que necesiten más discusión, abra la herramienta Lista de Palabras y agregar una nota de ortografía.',
              pt: 'Sob o menu de Verificação clique na opção "Verificar ortografia no livro atual" e aceite ou corrija a ortografia de todas as palavras presentes. Para aquelas palavras que precisam de mais discussão, abra a ferramenta Lista de Palavras e adicione uma nota de discussão ortográfica.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'a54b251a-daee-4366-9431-ebe4a5f0a210',
            names: {
              en: 'Section breaks and headings - format check',
              fr: 'Vérification des sauts de section et en-têtes de section',
              'zh-Hans': '分段符和标题 – 格式检查',
              es: 'Saltos de sección y encabezados - chequeo de formato',
              pt: 'Títulos de seções - verificação de formatação',
            },
            descriptions: {
              en: 'Discuss the format used in the translation and check if this is consistent with the agreed upon model translation (if there is one). Formatting to be checked includes but is not limited to: prose format, indented poetry format, differences in format in the translation and introductions. If another translation is used as a model then this check can be done using Tools > Checklists > Compare Section Headings',
              fr: 'Vérifiez que le formatage utilisé est conforme à la traduction modèle que l’équipe utilise (si un modèle a été choisi). Ce formatage inclut, entre autres : la mise en forme de la prose, de la poésie et de l’introduction. Si une autre traduction est utilisée comme modèle, cette vérification peut se faire à l’aide d’« Outils » > « Listes récapitulatives » > « En-têtes de section ».',
              'zh-Hans':
                '彼此讨论译文中使用的格式，检查这格式与商定的范本译本（若有）是否一致。需要检查的格式包括（但不限于）以下各项：散文（或叙述文）格式，诗歌的缩排格式，译文与简介的不同格式。若是使用另一个译本作为范本，可以通过以下途径运行这项检查：“工具 ＞ 检查表工具（checklists） ＞ 比较分段标题”。',
              es: 'Discutir el formato usado en la traducción y comprobar si este es consistente con el modelo de traducción previamente acordado (si es que hubo alguno). El Formato a comprobar incluye, pero no se limita a: formato de prosa, formato de poesía con sangría, diferencias en el formato de traducción e introducciones. Si otra traducción es usada como modelo entonces esta comprobación se puede realizar usando Herramientas > Lista de verificaciones... > Comparar encabezados de secciones',
              pt: 'Discuta o formato usado na tradução e verifique se isso é consistente com a tradução de modelo acordada (se houver). A formatação a ser verificada inclui, mas não se limita a: formato de prosa, formato de poesia com recuo, diferenças do formato ne tradução e nas introduções. Se outra tradução for usada como um modelo, então essa verificação pode ser feita usando Ferramentas > Listas de verificação > Comparar Títulos de Seção',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '9cc94d91-bd01-418c-8bcd-c114e99b7d26',
            names: {
              en: 'Paragraph breaks - format check',
              fr: 'Vérification des sauts de paragraphe',
              'zh-Hans': '段落符 – 格式检查',
              es: 'Interrupciones de Párrafo - chequeo de formato',
              pt: 'Quebras de parágrafos - verificação de formatação',
            },
            descriptions: {
              en: 'Read the text and verify that the paragraph breaks are in the desired places. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\p, and \\m.',
              fr: 'Lisez le texte et vérifiez que les sauts de paragraphe sont aux endroits désirés. Si vous suivez une version modèle, ce contrôle peut être fait à l’aide d’« Outils » > « Listes récapitulatives » > « Marqueurs ». Comparez les marqueurs qui indiquent les sauts de paragraphe, tels que \\p et \\m.',
              'zh-Hans':
                '阅读文本，确定段落符都在想要放置的地方。若是使用另一个译本作为根据，可以通过以下途径运行这项检查：“工具 ＞ 检查表工具（checklists） ＞ 比较格式码”，然后寻找新的段落格式码，如：\\p，和 \\m。',
              es: 'Lea el texto y verifique que los saltos de párrafo estén en los lugares deseados. Si otra traducción es usada como modelo entonces esta comprobación se puede realizar usando Herramientas > Lista de verificaciones... > Comparar marcadores y buscar marcadores de nuevo párrafo como \\p, y \\m.',
              pt: 'Leia o texto e verifique se as quebras de parágrafo estão nos locais desejados. Se outra tradução for usada como uma base, então essa verificação pode ser feita usando a Ferramentas > Listas de verificação > Comparar marcadores e procure os novos marcadores de parágrafo como \\p e \\m.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '739ab389-cb89-4347-8c29-9c11bb673af7',
            names: {
              en: 'Layout and indents - format check',
              fr: 'Vérification de la mise en page et les mises en retrait',
              'zh-Hans': '版式和缩排 – 格式检查',
              es: 'Diseño y sangría - chequeo de formato',
              pt: 'Layout e recuos - verificação de formatação',
            },
            descriptions: {
              en: 'Verify other layout issues such as poetry. Particular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\q, \\q1 and \\q2.',
              fr: "Vérifiez les autres questions de mise en page. Pour les textes poétiques, attention aux mises en retrait. Si vous suivez une version modèle, ce contrôle peut être fait à l’aide d'« Outils » > « Listes récapitulatives » > « Marqueurs ». Recherchez les marqueurs de paragraphe ajoutés ou manquants comme \\q et \\q1 et \\q2.",
              'zh-Hans':
                '确定其他版式问题，如诗歌。要特别注意诗歌的缩排。若是使用另一个译本作为根据，可以通过以下途径运行这项检查：“工具 ＞ 检查表工具（checklists） ＞ 比较格式码”，然后寻找新的段落格式码，如：\\q， \\q1 和 \\q2。',
              es: 'Comprobar otros problemas de diseño como poesía. Debe prestarse especial atención a las sangrías en la poesía. Si otra traducción es usada como modelo entonces esta comprobación se puede realizar usando Herramientas > Lista de verificaciones... > Comparar marcadores y buscar marcadores de nuevo párrafo como \\q, \\q1 y \\q2.',
              pt: 'Verifique outros problemas de layout, como poesia. Deve-se dar atenção especial aos recuos de poesia. Se outra tradução for usada como uma base, então essa verificação pode ser feita usando a Ferramentas > Listas de verificação > Comparar marcadores e buscar os novos marcadores de parágrafo como \\q, \\q1 e \\q2.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '3d26c07e-637e-4e11-980d-3689884d7157',
            names: {
              en: 'Special formatting - format check',
              fr: 'Vérification de la mise en forme spéciale',
              'zh-Hans': '特殊格式 – 格式检查',
              es: 'Formato especial - chequeo de formato',
              pt: 'Formato especial - verificação de formatação',
            },
            descriptions: {
              en: 'See list of special formatting issues such as genealogies, words on the cross, letters, etc. Verify that text is marked using the correct standard format markers (USFMs). See http://paratext.org/about/usfm for latest guide to using USFMs.',
              fr: 'Consultez la liste des cas spéciaux de mise en forme (les généalogies, les mots sur la croix, les épîtres, etc.). Vérifiez que les marqueurs de formatage standard (UFSM) sont corrects et bien placés. Voyez http://paratext.org/about/usfm pour le guide d’utilisation des marqueurs USFM le plus récent.',
              'zh-Hans':
                '见特殊格式问题列表，如：家谱、十字架上的字词、信件等。确定文本是使用正确的“标准格式格式码”（USFM）来标记。有关使用 USFM 的最新指南，见 http://paratext.org/about/usfm。',
              es: 'Consulte la lista de problemas especiales de formato tales como en genealogías, palabras en la cruz, cartas, etc. Verifique que el texto use marcadores bajo el correcto estándar (USFM). Consultar http://paratext.org/about/usfm para obtener la guía más reciente sobre el uso de USFM.',
              pt: 'Veja a lista de questões especiais de formatação, como genealogias, palavras na cruz, letras, etc.Consulte a lista de problemas especiales de formato tales como en genealogías, palabras en la cruz, cartas, etc. Verifique que el texto use marcadores bajo el correcto estándar (USFM). Consultar http://paratext.org/about/usfm para obtener la guía más reciente sobre el uso de USFM.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '0b6cbd07-9f68-4ec9-9eb6-684ce68f7dac',
            names: {
              en: 'Print preliminary version',
              fr: 'Impression de l’ébauche provisoire',
              'zh-Hans': '打印初版',
              es: 'Imprimir Versión Preliminar',
              pt: 'Imprimir versão preliminar',
            },
            descriptions: {
              en: 'Optional - Open the "Assignments and Progress" window and correct all errors/issues shown there. Once all errors are corrected and open notes are resolved, print a copy of the books or chapters to be reviewed by community group. The two simplest ways to print text from Paratext are found under the "File" menu. They are "Print Draft" and "Save as RTF". There are other methods available for more advanced formatting, such as "Export to Pathway". Use the method specified by your project administrator or translation consultant.',
              fr: 'Ouvrez la fenêtre « Affectations et progrès[a]  » et corrigez tout problème ou erreur signalé. Une fois que toutes les erreurs sont corrigées et les notes résolues, imprimez un exemplaire des livres ou chapitres qui devront être examinés par les réviseurs. Pour imprimer, allez dans le menu « Fichier » et choisissez soit « Imprimer ébauche », soit « Enregistrer en RTF ». Il existe d’autres méthodes disponibles pour une mise en forme plus avancée, telles qu’« Exporter à Pathway ». Utilisez la méthode demandée par votre administrateur de projet ou conseiller en traduction.',
              'zh-Hans':
                '打开“工作分配和进度”窗口，然后改正所有在窗口中显示的错误／问题。改正所有错误和解决所有未解决的附注之后，打印一些书卷或章，交给该语言群体中的公众审阅者审阅。要从《圣经辅助工具》打印文本，两种最简单的方法可见于“文件”菜单，就是“打印草稿”和“另存为 RTF 文件”。较高级的格式还可以使用其他的方法，如“导出至 Pathway 软件”。请使用项目管理员或翻译顾问所指定的方法。',
              es: 'Opcional - Abrir la ventana "Asignaciones y Progreso" y corregir todos los errores/problemas mostrados allí. Una vez corregidos los problemas y las nostas sean resueltas, imprima una copia de los libros o capítulos para que sean revisados por el grupo de la comunidad. La dos formas más sencillas de imprimir texto desde ParaTExt se encuentran bajo el menú "Archivo". Estos son "Imprimir borrador..." y "Guardar como RTF...". Otros métodos están disponibles que permiten un formato más avanzado, como "Exportar a Pathway". Use el método especificado por el administrador del proyecto o por el consultor de traducción.',
              pt: 'Abra a janela "Atribuições e Progresso" e corrija todos os erros/problemas mostrados lá. Depois que todos os erros forem corrigidos e as notas abertas forem resolvidas, imprima uma cópia dos livros ou capítulos a serem revisados pelo grupo da comunidade. As duas formas mais simples de imprimir texto no Paratext estão localizadas no menu "Arquivo". Elas são "Imprimir rascunho..." e "Salvar como RTF...". Há outros métodos disponíveis que permitem un formato mais avançado, como "Exportar para Pathway". Use o método especificado pelo administrador do projeto ou pelo consultor de tradução.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
        ],
      },
      {
        id: '20974cee-9f40-43c4-a0ae-5e733238e134',
        names: {
          en: 'Comprehension checks',
          fr: 'Préparation du texte pour la vérification du conseiller en traduction',
          'zh-Hans': '为顾问检查做准备',
          es: 'Verificaciones de comprensión',
          pt: 'Preparo para a verificação do Consultor',
        },
        descriptions: {},
        tasks: [
          {
            id: '75365725-9717-46de-85f9-413d44af9b59',
            names: {
              en: 'Prepare for comprehension testing',
              fr: 'Préparation pour les tests de compréhension',
              'zh-Hans': '准备理解译文测试',
              es: 'Preparación para la prueba de comprensión',
              pt: 'Preparo para o teste de compreensão',
            },
            descriptions: {
              en: 'This is comprehension testing done with members of the language community who were not involved in preparing the Preliminary Version of the text. (Re-read the translation draft; Draft general retell questions for comprehension testing; Identify possible issues of misunderstanding; Draft specific questions related to the main events in the passage, participant reference, key terms, foreign concepts, metaphors, rhetorical questions, inferential information, positive or negative associations, etc.)',
              fr: 'Il s’agit de tests de compréhension faits avec des membres de la communauté de langue qui n’ont pas été impliqués dans la préparation de l’ébauche du texte. Relisez le texte traduit et rédigez des questions pour les tests de compréhension. Pour cela, identifiez les problèmes d’incompréhension potentiels; rédigez des questions spécifiques ayant trait aux événements principaux dans le passage, aux références aux participants, aux termes clés, aux concepts étrangers, aux métaphores, questions rhétoriques, informations inférées, associations positives ou négatives, etc.',
              'zh-Hans':
                '这项理解译文的测试是与语言群体中没有参与准备文本初稿的人一起去做。（重新阅读译稿；为理解译文测试拟定一般性的复述问题；识别可能出现的误解；拟定一些具体问题，例如与关乎经文中的主要事件、经文中出现的所指对象（participant reference）、主要圣经用词、外来的观念、比喻、修辞性疑问句、推理信息、正面或负面的关联等。）',
              es: 'Se trata de pruebas de comprensión hechas con miembros de la comunidad lingüística que no estuvieron involucrados en la preparación de la Versión Preliminar del texto. (Releyendo el borrador de la traducción; redactar preguntas generales para las pruebas de comprensión, identificación de posibles problemas de malentendidos, redactar preguntas específicas relacionadas con los principales eventos del pasaje, referencia de los participantes, términos clave, conceptos ajenos a la cultura, metáforas, preguntas retóricas, información inferencial , asociaciones positivas o negativas, etc.)',
              pt: 'Este é um teste de compreensão realizado com membros da comunidade linguística que não estavam envolvidos na preparação da Versão Preliminar do texto. (Relê o rascunho da tradução; Rescrever perguntas gerais para testes de compreensão; Identificar possíveis problemas de mal-entendido; Esboçar questões específicas relacionadas aos principais eventos da passagem, referência de participante, termos-chave, conceitos desconhecidos, metáforas, perguntas retóricas, informação implícita, associações positivas ou negativas, etc.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'e2642958-0d86-450b-8c6d-df076b05ab5f',
            names: {
              en: 'First comprehension testing & revision',
              fr: 'Premier test de compréhension',
              'zh-Hans': '第一次译文理解测试',
              es: 'Primera prueba de comprensión y revisión',
              pt: 'Primeiro teste de compreensão',
            },
            descriptions: {
              en: 'In this plan it is assumed that any checks found unfinished from a previous stage should be dealt with appropriately. NOTE: if a check from a previously completed stage is found to have errors it will show up in the current working stage.\nWhile supplementary helps are specifically mentioned in the drafting section, it is assumed that all other checks will also be completed on supplementary materials and that these are a part of the final text.\nThe team discusses the comments from first comprehension testing and revises the text where appropriate. (Resolve any issues documented by project, spelling and rendering notes.)',
              fr: 'Tout contrôle inachevé lors d’une étape précédente doit être traité de façon appropriée. N.B. Si un contrôle d’une étape déjà complétée présente des erreurs, elles s’afficheront dans l’étape en cours. Il faut également effectuer tous les contrôles pour toutes les aides paratextuelles ainsi que les sections liminaires et annexes qui font partie du texte final.',
              'zh-Hans':
                '在这计划中，任何前一阶段未完成的检查都应适当地加以处理。注意：如果前一个完成阶段的检查中出现错误，这情况会在当前的工作阶段中显示出来。\n\n初稿部分特别提到一些辅助性的帮助材料，这里假设所有其他关乎补充材料的检查也会完成，并且是最后文本的一部分。',
              es: 'En este plan se supone que cualquier chequeo de una etapa anterior que no haya sido finalizado debe ser procesado apropiadamente. NOTA: si un chequeo de una etapa previamente completada muestra errores, estos aparecerán en la etapa de trabajo actual.\nSi bien ayudas suplementarias son mencionadas específicamente en la sección de redacción, se supone que todos los demás chequeos también se realizarán en los materiales complementarios y que éstos forman parte del texto final.\nEl equipo discute los comentarios de la primera prueba de comprensión y revisa el texto donde sea necesario. (Resuelva cualquier problema documentado por el proyecto, la ortografía y las notas de traducción.)',
              pt: 'Neste plano, presume-se que qualquer verificação inacabada  durante uma etapa anterior deve ser tratada de forma adequada. NOTA: se uma verificação de uma etapa já concluída contém erros, eles serão exibidos na etapa atual.\nEmbora as ajudas suplementares sejam especificamente mencionadas na seção de rascunho, presume-se que todos os outros controles serão igualmente preenchidos com materiais suplementares e que estes são parte do texto final.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'b5c6a130-0254-407b-963f-856f580d3698',
            names: {
              en: 'Print first revision',
              fr: 'Impression de la première révision',
              'zh-Hans': '打印第一次修订文本',
              es: 'Imprimir la Primera Versión',
              pt: 'Impressão da primeira revisão',
            },
            descriptions: {
              en: 'Optional - Print chapter(s) or book(s) being reviewed using method specified by project administrator or translation consultant.',
              fr: 'Imprimez les chapitres ou le livre en cours de révision en utilisant la méthode demandée par l’administrateur du projet ou le conseiller en traduction.',
              'zh-Hans': '使用项目管理员或翻译顾问指定的方法打印（一个或多个）章或书卷。',
              es: 'Opcional - Imprima el(los) capítulo(s) o libro(s) que está(n) siendo revisado(s) usando el método especificado por el administrador del proyecto o por el consultor de traducción',
              pt: 'Imprimir capítulo(s) ou livro(s) sob revisão usando o método solicitado pelo gerente de projeto ou o consultor de tradução.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '986ee40b-6f38-400a-b7f0-b6085faeb476',
            names: {
              en: 'Second comprehension testing & revision',
              fr: 'Deuxième test de compréhension',
              'zh-Hans': '第二次译文理解测试',
              es: 'Segunda prueba de comprensión y revsión',
              pt: 'Segundo teste de compreensão',
            },
            descriptions: {
              en: 'This check is done with a group of UNSs (Read the first revision of the passage; ask general retell questions; ask follow up questions; document problems of understanding that need to be fixed in the translation; issues related to spelling should be documented with a spelling note in the word list tool, and issues related to rendering words should be documented with a rendering note in the Biblical terms tool. Also note any changes related to improved naturalness of the draft)\nThe team discusses the comments from first comprehension testing and revises the text where appropriate. (Resolve any issues documented by project, spelling and rendering notes.)',
              fr: 'Ce contrôle s’effectue avec un groupe de locuteurs natifs non initiés : leur lire la première révision du passage, poser des questions générales et de suivi et noter les problèmes de compréhension qui doivent être corrigés dans la traduction. Les questions liées à l’orthographe doivent être consignées dans une note d’orthographe dans l’outil « Liste de mots ». Les questions associées aux équivalents des termes bibliques doivent être consignées dans une note dans l’outil « Termes bibliques ». Notez également tout changement qui a été fait pour améliorer la langue dans le texte.',
              'zh-Hans':
                '这项检查与一个 UNS 小组一起去做（阅读经文的第一个修订文本；发问一般性的复述问题；发问后续的问题；记录需要在翻译中处理的理解问题；关乎拼写的问题要在“词表”工具用拼写附注来记录，关乎字词译法的问题要在“圣经专门用词”工具用译法附注来记录。同时注意任何与改进初稿自然度相关的更改。）',
              es: 'Este control se realiza con un grupo de UNS (leer la primera revisión del pasaje, hacer preguntas generales, hacer preguntas de seguimiento, documentar problemas de comprensión que deben ser arreglados en la traducción, cuestiones relacionadas con la ortografía deben ser documentados con una nota de ortografía en la herramienta lista de palabras, y temas relacionados con la generación de palabras traducidas deben ser documentados con una nota de traducción en la herramienta vocablos bíblicos. También tenga en cuenta los cambios relacionados con la mejora de la naturalidad de la redacción del borrador)\nEl equipo discute los comentarios de las primera prueba de comprensión y revisa el texto donde sea necesario. (Resuelva cualquier problema documentado por el proyecto, la ortografía y las notas de traducción.)',
              pt: 'Este controle é feito com um grupo de falantes nativos não iniciados (eles lêem a primeira revisão da passagem, fazer perguntas gerais e para monitorar e registra a compreensão de problemas que devem ser corrigidos na tradução, questões relacionadas com a ortografia devem ser registadas numa nota ortografia na ferramente lista de palavras, e os problemas associados com os termos bíblicos equivalentes devem ser registados na ferramenta de termos bíblicos. Observe também que qualquer alteração foi realizada para melhoria da naturalidade do rascunho)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
        ],
      },
      {
        id: 'b270751c-03d8-463b-abbf-5c8e3c4a188b',
        names: {
          en: 'Consultant Check',
          fr: 'Vérification par le conseiller en traduction',
          'zh-Hans': '翻译顾问检查',
          es: 'Comprobación con el Consultor',
          pt: 'Verificação do Consultor',
        },
        descriptions: {},
        tasks: [
          {
            id: 'f8afb80c-dab6-470b-a564-89b3d44dbaad',
            names: {
              en: 'Update Biblical terms tool',
              fr: 'Mettre à jour les équivalents des termes bibliques',
              'zh-Hans': '更新“圣经专门用词”工具',
              es: 'Actualizar la herramienta de Vocablos Bíblicos',
              pt: 'Atualização de Termos Bíblicos',
            },
            descriptions: {
              en: 'Open Biblical terms tool and filter for chapter(s) being prepared for consultant check. Verify that all the Biblical terms have approved renderings. Update any that are missing, or need to be changed because of a better understanding of what the Greek or Hebrew means. It is likely some are out-of-date, because of the revisions made after comprehension testing.',
              fr: 'Ouvrez l’outil « Termes bibliques » et sélectionnez les chapitres qui doivent être contrôlés par le conseiller. Vérifiez que tous les termes bibliques ont des équivalents approuvés. Mettez à jour la liste : ajoutez ceux qui manquent et modifiez ceux qui doivent l’être à cause d’une meilleure compréhension de leur sens en grec ou en hébreu ou à cause des révisions faites suite aux tests de compréhension.',
              'zh-Hans':
                '打开“圣经专门用词”工具，筛选出一些篇章以便翻译顾问进行检查。确定所有“圣经专门用词”已经有核准的译法。更新缺失的译法，或由于进一步理解希腊语或希伯来语的意思而更改的译法。当中有些极可能已经过期，因为译文理解测试后已有修订。',
              es: 'Abra la herramienta de Vocablos Bíblicos y filtre los resultados para que muestre(n) el(los) capítulo(s) preparado(s) para el chequeo del Consultor. Compruebe que todos los términos clave hayan sido aprobados. Actualize cualquier término ausente, o que necesite ser cambiado debido a un mejor entendimiento del significado del término en Griego o Hebreo. Es probable que algunos estén desactualizados, debido a las revisiones hechas luego de las pruebas de comprensión.',
              pt: 'Abra a ferramenta "termos bíblicos" e selecione o(s) capítulo(s) para ser(em) verificado(s) pelo Consultor. Verifique se todos os termos bíblicos foram aprovados. Atualizar qualquer termo ausente, ou que necessita ser editado devido a uma melhor compreensão de seu significado em grego ou hebraico. É provável que alguns estejam desactualizados devido às revisões feitas após o teste de compreensão.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'fa01aafa-8b8f-489b-99d2-4cf63cdb53ea',
            names: {
              en: 'Grammar and discourse write up',
              fr: 'Esquisse grammaticale et analyse du discours',
              'zh-Hans': '关于语法和语段的详细描写',
              es: 'Redacción Gramatical y discursos',
              pt: 'Esboço gramatical e da análise do discurso',
            },
            descriptions: {
              en: 'Prepare or revise a write up relevant grammar and discourse analysis and send to the translation consultant. A list of all connector words would be especially helpful for the consultant.',
              fr: "Rédigez une analyse concise de la grammaire et du discours et envoyez-le au conseiller. N'oubliez pas d’inclure une liste de tous les connecteurs employés dans la traduction, ce qui sera très utile pour le conseiller.",
              'zh-Hans':
                '准备或修订一份相关语法和语段分析的详细描写，然后发送给翻译顾问。列出所有连接字词的列表会对翻译顾问特别有用。',
              es: 'Preparar o revisar un análisis gramatical y discursivo pertinente y enviarlo al consultor de traducción. Una lista de todas las palabras conectoras sería especialmente útil para el consultor.',
              pt: 'Preparar ou revisar uma análise relevante da gramatica e do discurso para ser enviado ao consultor de tradução. Não se esqueça de incluir uma lista de todos os conectores usados na tradução, o que será muito útil para o consultor.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '0b6970df-00ce-4da4-a46a-28be4c7f2e6a',
            names: {
              en: 'Draft the back translation',
              fr: 'Rédaction de la retraduction',
              'zh-Hans': '草拟回译',
              es: 'Redactar la Retro Traducción',
              pt: 'Rascunho da Retrotradução',
            },
            descriptions: {
              en: 'A back-translation is a translation into the major national or trade language of the area. It should be done by a speaker of the language other than the translator. It helps to show whether the translation is communicating effectively and accurately, and it serves as the basis for the consultant check.',
              fr: 'Une retraduction est une traduction dans une langue nationale ou véhiculaire du texte du projet. Cette retraduction est faite normalement par un locuteur de la langue autre que le traducteur. Cela permet de savoir si la traduction est claire et naturelle. La retraduction écrite sert aussi de texte de base au conseiller.',
              'zh-Hans':
                '回译就是翻译成该地区的主要国家或贸易语言。这步骤应该由译者以外的另一个说该语言的人来完成。这将显示翻译是否能准确有效地沟通，也可用作翻译顾问检查的根据。',
              es: 'Una retrotraducción es una traducción al idioma nacional o comercial del área. Debe ser hecho por un nativo hablante del idioma que no sea el traductor. Ayuda a demostrar si la traducción es comunicada con eficacia y precisión, y sirve como base para el chequeo del Consultor.',
              pt: 'A retrotradução é uma tradução na língua nacional ou comum da região. Esta retrotradução é normalmente feita por um falante da língua que não seja o tradutor. Isso permite saber se a tradução é clara e natural. E serve como base para verificação do Consultor.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '7c50ab22-d2cb-415b-b5b7-be52aaf02016',
            names: {
              en: 'Check back translation',
              fr: 'Vérification de la retraduction',
              'zh-Hans': '检查回译',
              es: 'Chequeo de la Retro Traducción',
              pt: 'Verificação da Retrotradução',
            },
            descriptions: {
              en: 'The team should verify that back translation is complete, and there are no missing words or phrases, so it is usable by consultant. The purpose of this check is not for the team to change what the back translator thinks the text means.',
              fr: 'L’équipe devrait vérifier que la retraduction est complète (pas de mots ou expressions qui manquent) avant de l’envoyer au conseiller. Le but de ce contrôle n’est pas de modifier ce que le retraducteur a écrit.',
              'zh-Hans':
                '翻译小组应确定回译是完整的，没有遗漏字词或片语，以便于顾问使用。这项检查的目的不是让翻译小组去改变回译者对文本意思的理解。',
              es: 'El equipo debe verificar que la retro traducción este completa, y que no existan palabras o frases faltantes, para que pueda ser usado por el Consultor. El propósito de esta comprobación no es para que el equipo cambie lo que el retro traductor piensa lo que significa el texto.',
              pt: 'A equipe deve verificar se a retrotradução está completa, e que não existam palavras ou frazes ausentes, para que possa ser utilizado pelo Consultor. O objetivo desta verificação não é alterar o que o retrotradutor pensa sobre o significado do texto.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'fd6c2f9b-c34f-4762-bcd0-845ff03c1785',
            names: {
              en: 'Preliminary Evaluation of text by consultant',
              fr: 'Évaluation du texte',
              'zh-Hans': '评价文本',
              es: 'Evaluación preliminar de texto por parte del consultor',
              pt: 'Avaliação do Texto',
            },
            descriptions: {
              en: 'Consultant evaluates the text and places notes with his observations in the text (or back translation). The evaluation should focus on accuracy, clarity, naturalness, and acceptability of the translation including all supplementary materials and illustrations used.',
              fr: 'Le conseiller évalue le texte et poste ses remarques dans le texte (ou la retraduction). L’évaluation doit porter sur l’exactitude, la clarté, le naturel et l’acceptabilité de la traduction, y compris des aides paratextuelles et des illustrations utilisées.',
              'zh-Hans':
                '翻译顾问评价文本，并把附注连同他在文本（或回译）中的观察所得写在附注中。评价的焦点应放在文本的准确、清晰、自然和翻译的可接受性，包括所有补充材料和所使用的例证。',
              es: 'El Consultor examina el texto y coloca notas con sus observaciones en el texto (o en la retro traducción). La evaluación debe concentrarse en la precisión, claridad, naturalidad y aceptabilidad de la traducción, incluyendo todas las ilustraciones y materiales complementarios.',
              pt: 'O Consultor examina o texto e faz notas com suas observações sobre o textos (ou sobre a retrotradução). A avaliação deve foca a precisão, claridade, naturalidade e aceitabilidade da tradução, incluindo todas as ilustrações e materiais complementares.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '25931f1d-cc55-46c9-a3e8-8f0bea379b90',
            names: {
              en: 'Consultant visit with team',
              fr: 'Vérification du conseiller en traduction',
              'zh-Hans': '翻译顾问的访问',
              es: 'Visita del Consultor con equipo',
              pt: 'Consultoria presencial',
            },
            descriptions: {
              en: 'Consultant interacts with the translation team concerning his observations about the text and supplementary materials, and gives assistance and advice as requested. The project administrator should give one team member (that could be himself) editing permission in the Assignments and Progress window for the "Consultant visit" task',
              fr: 'Le conseiller en traduction parle de ce qu’il a noté sur la traduction (texte biblique et aides paratextuelles) avec l’équipe et offre aide et conseils selon le besoin. L’administrateur du projet donne à un membre de l’équipe le droit de modification pour la tâche ̀« Vérification par le conseiller en traduction » dans le « Plan du Projet ».',
              'zh-Hans':
                '顾问与翻译小组进行交流，讨论他对译本和补充材料的观察，并按要求提供协助和建议。项目管理员应在“工作分配和进度”窗口，把编辑权限授予一名组员（可以是他自己），去处理“翻译顾问的访问”任务。',
              es: 'El Consultor interactúa con el equipo de traducción en base a sus observaciones sobre el texto y materiales complementarios, además de brindar asistencia y asesoramiento según sea necesario. El administrador del proyecto debe dar permiso de edición a un miembro del equipo (que podría ser él mismo) en la ventana de Asignaciones y Progreso para la tarea "Visita del Consultor"',
              pt: 'O consultor interage com a equipe de tradução em relação às suas observações sobre o texto e materiais complementares, e fornece assistência e aconselhos conforme a necessidade. O administrador do projeto dá permissão a um membro da equipe (que podería ser ele mesmo) na janela Atribuição e Processo para a tarefa "Visita do Consultor"',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '9955d13b-4d77-4c77-81a3-a728bf11b77e',
            names: {
              en: 'Third revision',
              fr: 'Troisième révision',
              'zh-Hans': '第三次修订',
              es: 'Tercera Revisión',
              pt: 'Terceira Revisão',
            },
            descriptions: {
              en: 'The text and supplementary materials are revised based on input from the translation consultant. This task is for the editing that is done after the consultant has left. Some consultants call these edits "action items", "to do list", "homework" or something else.',
              fr: 'Le texte et les aides paratextuelles sont révisés en fonction des commentaires du conseiller en traduction. Ce travail peut se faire en l’absence du conseiller. Certains conseillers appellent ces modifications le « suivi » ou la « liste de tâches » ou les « devoirs ».',
              'zh-Hans':
                '根据翻译顾问的意见修订文本和补充材料。这任务是在顾问离开后进行的编辑工作。有些顾问称这类编辑为“行动项”、“待办事项”、“作业”或其他。',
              es: 'El texto y el material complementario son revisados en base a las sugerencias del Consultor. Esta tarea de edición se debe hacer una vez que el Consultor se haya ido. Algunos Consultores llaman a estas tareas de edición "elementos de acción", "lista por hacer", "tarea" o cualquier otro nombre.',
              pt: 'O texto e o material complementar são revisados com base nas sugestões do Consultor. Esta tarefa é feita depois que o Consutor for embora. Algunus Consultores chama esta tarefa de edição de "itens de ação", "lista de tarefa", "lição de casa" ou qualquer outro nome.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'aa176048-9a38-4356-9ea7-2e726e6e632a',
            names: {
              en: 'Back translation revision',
              fr: 'Révision de la retraduction',
              'zh-Hans': '回译修订',
              es: 'Revisión de la Retro Traducción',
              pt: 'Revisão da Retrotradução',
            },
            descriptions: {
              en: 'Revise the back translation as needed.',
              fr: 'Mettre à jour la retraduction si nécessaire.',
              'zh-Hans': '按需要修订回译。',
              es: 'Revisar la Retro Traducción según se necesite.',
              pt: 'Revisar a Retrotradução se for necessário.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'c6f68e0f-7edd-4841-bf2a-502fd1dd6daf',
            names: {
              en: 'Preliminary consultant approval',
              fr: 'Approbation provisoire du conseiller en traduction',
              'zh-Hans': '翻译顾问初步核准',
              es: 'Aprobación preliminar del Consultor',
              pt: 'Aprovação Preliminar do Consultor',
            },
            descriptions: {
              en: 'Consultant gives preliminary approval of the text, but it may have some follow-up tasks which are clearly defined.',
              fr: 'Le conseiller approuve provisoirement le texte, sous réserve de terminer certaines tâches bien définies.',
              'zh-Hans': '翻译顾问初步核准译文，但可能会有一些明确的后续任务。',
              es: 'El Consultor aprueba preliminarmente el texto, pero puede haber algunos pasos de seguimiento que estarán claramente definidas.',
              pt: 'O Consultor aprova preliminarmente o texto, mas podorá existir algumas tarefas definidas que necessitam ser concluídas.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'ec5c2bbe-f91b-4d2d-85e3-6160779a319d',
            names: {
              en: 'Biblical terms tool revision',
              fr: 'Révision des équivalents des termes bibliques.',
              'zh-Hans': '“圣经专门用词”工具中的修订',
              es: 'Revisión usando la herramienta Vocablos Bíblicos',
              pt: 'Revisão da ferramenta de Termos Bíblicos',
            },
            descriptions: {
              en: 'Revise renderings in the Biblical terms tool as needed.',
              fr: 'Révisez les équivalents dans l’outil « Termes bibliques » si nécessaire.',
              'zh-Hans': '按需要在“圣经专门用词”工具中修订译法。',
              es: 'Revisar las traducciones en la herramienta Vocablos Biblicos según sea necesario.',
              pt: 'Revisar as traduções na ferramenta termos Bíblico se for necessário.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '97931ae7-27a7-43e4-8baf-75f7f3790234',
            names: {
              en: 'Consultant report distributed',
              fr: 'Envoi du rapport du conseiller en traduction',
              'zh-Hans': '分发顾问报告',
              es: 'Informe del Consultor distribuido',
              pt: 'Entrega do relatório do consultor',
            },
            descriptions: {
              en: 'Consultant report shared with the translation team and with major stakeholders.',
              fr: 'Le rapport du conseiller en traduction est partagé avec l’équipe de traduction et les parties prenantes.',
              'zh-Hans': '与翻译小组和主要利益相关者共享顾问报告。',
              es: 'El informe del Consultor compartido con el equipo de traducción y con las principales partes interesadas.',
              pt: 'O relatório do consultor é compartilhado com a equipe de tradução e com as principais partes interessadas.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
        ],
      },
      {
        id: '16385cc6-d555-4b29-b342-1f78a9853656',
        names: {
          en: 'Review by the community',
          fr: 'Vérification par la communauté',
          'zh-Hans': '公众审阅者的复审',
          es: 'Revisión hecha por la Comunidad',
          pt: 'Revisão pela Comunidade',
        },
        descriptions: {},
        tasks: [
          {
            id: 'ad1e60e2-0340-4832-b914-16fc9c76c76e',
            names: {
              en: 'Naturalness review & revision',
              fr: 'Révision du naturel du texte',
              'zh-Hans': '审阅翻译是否自然',
              es: 'Revisión de Naturalidad del texto',
              pt: 'Revisão de naturalidade',
            },
            descriptions: {
              en: 'The community does a naturalness review of the text based on the oral and/or written communication of the third revision.\nThe team should discuss the comments of the naturalness review and make the changes suggested that are valid.',
              fr: 'À partir de la version orale ou écrite de la troisième révision, la communauté vérifie que le texte traduit est naturel.',
              'zh-Hans': '公众审阅者根据第三次修订时口述和／或笔录的意见复审译文的自然度。',
              es: 'La comunidad hace una revisión de naturalidad del texto basada en la comunicación oral y / o escrita de la tercera revisión.\nEl equipo debe analizar los comentarios de la revisión de naturalidad y hacer que los cambios sugeridos sean válidos.',
              pt: 'A partir da versão oral ou escrita da terceira revisão, a comunidade garante que o texto traduzido é natural.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'ab24ebef-f715-4a6e-b505-b5c9172ba6c9',
            names: {
              en: 'Community review of Biblical key terms and revision',
              fr: 'Révision des termes bibliques par la communauté',
              'zh-Hans': '公众审阅者复审主要的圣经专门用词',
              es: 'Revisión de los Términos Clave por la Comunidad',
              pt: 'Revisão dos termos Bíblicos pela comunidade',
            },
            descriptions: {
              en: 'Community leaders, church leaders, and other community members discuss how key terms are rendered.\nThe team discusses comments about key terms made at the community review and uses those changes they think are valid.',
              fr: "Les leaders de la communauté, les chefs religieux et autres membres de la communauté évaluent les termes clés choisis par l'équipe.",
              'zh-Hans': '社区领袖、教会领袖和其他社区成员讨论主要圣经用词的译法。',
              es: 'Líderes de la comunidad, de las Iglesias y miembros de la comunidad discuten como los términos claves son generados.\nEl equipo discute los comentarios sobre los términos claves hechos por la revisón de la comunidad y hacen los cambios que crean necesarios',
              pt: 'Os líderes da comunidade, das Igrejas e membros da comunidade avaliam os termos-chaves escolhidos pela equipe.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '7f371a2d-bd1c-48ef-99f7-c16136246dee',
            names: {
              en: 'Community review revision report',
              fr: 'Rapport sur les termes clés bibliques',
              'zh-Hans': '有关主要圣经专门用词的翻译小组报告',
              es: 'Informe de revisión comunitaria',
              pt: 'Relatório dos Termos-chaves',
            },
            descriptions: {
              en: 'The team reports to the consultant on any textual or key terms changes made as a result of the community review.  Rationale for the changes should be included.  The team should open the Biblical terms tool and consult the notes, and history sections for the terms being reported on. It is best practice to enter this information in the tool as the changes were being discussed and decided on.',
              fr: 'L’équipe rédige un rapport sur les modifications faites aux termes clés ainsi que le pourquoi et l’envoie au conseiller en traduction. Pour cela, l’équipe ouvre l’outil « Termes bibliques » et consulte les notes et l’historique pour les termes mentionnés dans le rapport. Il est recommandé de saisir les décisions prises dans l’outil au fur et à mesure de la traduction.',
              'zh-Hans':
                '翻译小组撰写一份报告，交待他们针对主要圣经用词所做的更改，以及为何作出那些更改，然后发送给翻译顾问。小组应打开“圣经专门用词”工具，查阅报告中主要圣经用词的附注和历史记录部分。把针对更改所进行的讨论和决定输入到“圣经专门用词”工具中，是一个很好的习惯。',
              es: 'El equipo informa al consultor sobre cualquier cambio textual o de términos clave realizado como resultado de la revisión de la comunidad. La razón de ser de los cambios debe ser incluida. El equipo debe abrir la herramienta de vocablos bíblicos y consultar las notas, y las secciones de historial de los términos sobre los que se informa. Es una buena práctica ingresar esta información en la herramienta a medida que se discutieron y decidieron los cambios.',
              pt: 'A equipe elabora um relatório sobre as alterações feitas nos termos-chave e a razão das alterações, e envia ao Consultor. Para isso, a equipe deve abrir a ferramenta "termos Bíblicos" e consultar as notas, e o histórico de traduções dos termos que serão inserudos no relatório. Uma boa prática é inserir essa informação na ferramenta à medida que as mudanças são discutidas e decididas.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '40b6dcd4-3b9d-4790-819d-28f0fc02bc53',
            names: {
              en: 'Draft section headings',
              fr: 'Vérification des en-têtes de section',
              'zh-Hans': '草拟分段标题',
              es: 'Preparar los Encabezados de Sección',
              pt: 'Rascunho dos Títulos de seções',
            },
            descriptions: {
              en: 'Draft section headings',
              fr: 'Une fois que tout un livre est traduit, vérifiez les en-têtes de section',
              'zh-Hans': '草拟分段标题',
              es: 'Preparar los Encabezados de Sección',
              pt: 'Prepara o rascunho dos títulos de seções',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: 'b1ee4198-d3fe-4a2f-9cd7-4e0fa1ec8bd3',
            names: {
              en: 'Draft footnotes',
              fr: 'Rédaction des notes de bas de page',
              'zh-Hans': '草拟脚注',
              es: 'Preparar las Notas al Pie de Página',
              pt: 'Rascunho das notas de rodapé',
            },
            descriptions: {
              en: 'Draft footnotes. These may be drafted after main text has been finalized. After you have drafted the footnotes, it may be helpful to go to Tools-->Checklist-->Footnotes. This checklist will compare the footnotes in your text to other resources that you specify.',
              fr: 'Rédigez les notes de bas de page. Cela peut se faire quand tout le livre a été traduit.',
              'zh-Hans': '草拟脚注。可以在主要文本定稿后才草拟脚注。',
              es: 'Preparar las notas al pie de página. Estos pueden ser elaborados luego de que el texto principal haya sido finalizado.',
              pt: 'Digitar o rascunho das notas de rodapé. Estes podem ser elaborados depois que o texto principal estiver finalizado. \nDepois de ter redigido as notas de rodapé, pode ser útil ir para Ferramentas-->Lista de verificação...-- >Notas de rodapé. \nEsta lista de verificação irá comparar as notas de rodapé no seu texto com outros recursos que você especificar.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '1ce56f6c-82fc-41b6-9876-7a25572b4951',
            names: {
              en: 'Draft book introductions',
              fr: 'Rédaction des introductions des livres',
              'zh-Hans': '草拟书卷简介',
              es: 'Preparar la Introduccion del Libro',
              pt: 'Rascunho da Introduçãdo do Livro',
            },
            descriptions: {
              en: 'Draft the book introduction. Be careful to use the same key terms in the introduction as in the text.',
              fr: 'Rédigez l’introduction du livre traduit. Pensez à utiliser les mêmes termes clés que ceux utilisés dans le texte traduit.',
              'zh-Hans': '草拟书卷简介。\n\n注意在简介中必须使用与文本相同的主要用词。',
              es: 'Elaborar la introducción del libro. Tenga cuidado de usar los mismos términos clave en la introducción como en el texto principal.',
              pt: 'Elaborar a introdução do livro. Tenha cuidado para usar os mesmos termos-chave na introdução como no texto principal.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '5c28e0c8-0c8a-45a4-afab-9c5f22512928',
            names: {
              en: 'Draft glossary entries',
              fr: 'Rédaction des entrées du glossaire',
              'zh-Hans': '草拟《词汇表》条目',
              es: 'Preparar Entradas del Glosario',
              pt: 'Rascunho do Glossário',
            },
            descriptions: {
              en: 'Draft glossary entries. The glossary is one of the books that occur after Revelation, and its short name is GLO. It is recommended to add glossary entries from within the Biblical terms tool. Using the Biblical terms tool will create GLO book for you. Look in Help under "glossary" for more information.',
              fr: "Le glossaire (GLO) se trouve après l’Apocalypse. Il faut décider quels mots inclure dans le glossaire à partir du livre que vous venez de traduire. Rédigez les entrées du glossaire. Il est recommandé d’ajouter les entrées du glossaire à l'aide de l’outil « Termes Bibliques » qui crée le livre GLO. Pour plus d’informations, allez dans « Aide » puis « Glossaire ».",
              'zh-Hans':
                '草拟《词汇表》条目。\n\n在《圣经辅助工具》里，《词汇表》是放在《启示录》后面的一个书卷，简称是 GLO。《词汇表》条目最好从“圣经专门用词”工具内部添加。使用“圣经专门用词”工具时会为你创建一个 GLO 书卷。查看“帮助”里面的“词汇表”可以获取更多信息。',
              es: 'Preparar las entradas del glosario. El glosario es uno de los libros localizados después de Apocalipsis y su nombre corto es GLO. Se recomienda añadir entradas del glosario usando la herramienta de Vocablos Bíblicos. El uso de esta herramienta creará el libro GLO por usted. Busque "glosario" en la Ayuda para más información.',
              pt: 'Rascunho do Glossário. O glossário é um dos livros que ocorrem após o Apocalipse, e seu nome abreviado é GLO. \nRecomenda-se adicionar entradas de glossário utilizando a ferramenta de termos bíblicos. O uso desta ferramenta criará o livro GLO para você. \nProcure "glossário" em Ajuda para ter mais informações.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '2913d3d8-3691-4576-95bb-4c9cd7f03adb',
            names: {
              en: 'Insert illustrations',
              fr: 'Insertion des illustrations',
              'zh-Hans': '插入插图',
              es: 'Insertar Ilustraciones',
              pt: 'Inserir Ilustrações',
            },
            descriptions: {
              en: 'Make initial decisions on illustrations. If captions contain text not\ndirectly from the scriptures, they should be consultant checked. This\nshould be done in conjunction with the publications department. Sample\nillustrations can be seen at:\nhttps://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              fr: 'Faites un premier choix pour les illustrations. Si les légendes contiennent du texte qui ne provient pas directement du texte biblique, elles doivent être vérifiées par un conseiller et le département de publications. Pour voir un échantillon d’illustrations allez sur:\nhttps://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              'zh-Hans':
                '初步决定使用哪些插图。如果插图标题包含非直接引用经文的文本，就必须要求翻译顾问检查文本。这应该与出版部门一起完成。示例插图可在以下位置找到：\n\nhttps://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              es: 'Empezar a tomar las decisiones iniciales sobre las ilustraciones a usar. Si los subtitulos no contienen texto directo de las Escrituras entonces deben ser revisados por el consultor. Esto debe hacerse en coordinación con el departamento de Publicaciones. Se puede ver ejemplos de ilustraciones en:\nhttps://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              pt: 'Faça as primeiras decisões sobre ilustrações. Se as legendas contiverem texto não diretamente das escrituras, elas devem ser checadas pelo consultor.\nIsso deve ser feito em conjunto com o departamento de publicações. Exemplos de ilustrações podem ser vistos em:\nhttps://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '6a15bff7-ae13-45cc-b393-82eee01ff8ae',
            names: {
              en: 'Verification of supplementary materials & revision',
              fr: 'Test de compréhension des aides paratextuelles',
              'zh-Hans': '补充材料的理解测试',
              es: 'Verificación de materiales complementarios y revisó',
              pt: 'Teste de compreensão dos materiais suplementares',
            },
            descriptions: {
              en: 'Working with a group of UNSs, test any supplementary materials that have not already been tested. This would most likely include but is not limited to: glossary entries, illustration captions and book introductions.\nThe team discusses the comments from the comprehension testing of supplementary materials and revises the text where appropriate.',
              fr: 'Avec un groupe de locuteurs de la langue qui ne connaissent pas le texte traduit, testez tous les aides paratextuelles ainsi que les sections liminaires et annexes qui n’ont pas déjà été testées (entrées du glossaire, légendes des illustrations et introductions de livre).',
              'zh-Hans':
                '与一个 UNS 小组合作，测试任何尚未测试的补充材料。当中极可能会包括但不限于：词汇表条目，图表标题和书卷简介。',
              es: 'Trabajando con un grupo de UNS, chequee cualquier material suplementario que no haya sido comprobado. Esto probablemente incluirá, pero no se limitará a: entradas de glosario, subtítulos de ilustración e introducciones de libros.\nEl equipo discute los comentarios hechos durante las pruebas de comprensión de los materiales suplementarios y revisa el texto donde sea necesario.',
              pt: 'Com um grupo de falantes da língua que não conhecem o texto traduzido, avaliar todos os materiais suplementares que não tenham sido testadas (Entradas do glossário, legendas das ilistrações e Introdução dos livros).',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
        ],
      },
      {
        id: 'c66ede6b-1e7b-4d55-b5c3-f8aff60217d7',
        names: {
          en: 'Finalizing for Publication',
          fr: 'Mettre la touche finale avant la publication',
          'zh-Hans': '定稿出版',
          es: 'Finalizando para la Publicación',
          pt: 'Finalização para publicação',
        },
        descriptions: {},
        tasks: [
          {
            id: '4363aa1f-aeca-4831-8562-085b9381bad6',
            names: {
              en: 'Choose final illustrations and write captions',
              fr: 'Choix définitif des illustrations et rédaction des légendes',
              'zh-Hans': '最后选择插图和撰写标题',
              es: 'Elejir Ilustraciones definitivas y escribir subtítulos',
              pt: 'Escolher ilustrações finais e escrever legendas',
            },
            descriptions: {
              en: 'Make final decisions on illustrations. If captions contain text not directly from the scriptures, they should be consultant checked. This should be done in conjunction with the publications department. Sample illustrations can be seen at: https://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              fr: 'Prenez les décisions finales concernant les illustrations. Si les légendes contiennent du texte qui ne provient pas directement du texte biblique, elles doivent être vérifiées par un conseiller en traduction et par le département des publications. Vous trouverez un échantillon d’illustrations sur le lien : https://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              'zh-Hans':
                '最后决定使用哪些插图。如果插图标题包含非直接引用经文的文本，就必须要求顾问检查文本。这应该与出版部门一起完成。示例插图可在以下位置找到：\n\nhttps://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              es: 'Tomas decisiones finales sobre las ilustraciones a usar. Si los subtitulos no contienen texto directo de las Escrituras entonces deben ser revisados por el consultor. Esto debe hacerse en coordinación con el departamento de Publicaciones. Se puede ver ejemplos de ilustraciones en: https://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              pt: 'Tomar as decisões finais sobre as ilustrações. Se as legendas contêm texto que não são diretamente das Escrituras, elas devem ser consultadas. Isso deve ser feito em conjunto com o departamento de publicações. Você pode encontrar uma amostra de ilustrações no link: https://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '9fca00d9-bb43-4718-aa64-8d4e07f9ab43',
            names: {
              en: 'Choose maps and label place names',
              fr: 'Choix des cartes et annotation des noms de lieux',
              'zh-Hans': '选择地图和标示地方名',
              es: 'Elejir Mapas y etiquetar nombres de lugares',
              pt: 'Escolher mapas e nomear lugares',
            },
            descriptions: {
              en: 'Make final decisions on maps. This should be done in conjunction with the publications department. Sample maps can be seen at:\nhttps://www.dropbox.com/sh/0bi5dg8v7vj7y74/AAANSWfsC6uSL_mRSYKBx6T9a?dl=0',
              fr: 'Prenez les décisions finales concernant les cartes. Cela devrait se faire conjointement avec le département des publications. Vous trouverez des exemples de cartes sur le lien suivant : https://www.dropbox.com/sh/0bi5dg8v7vj7y74/AAANSWfsC6uSL_mRSYKBx6T9a?dl=0',
              'zh-Hans':
                '最后决定使用哪些地图。这应该与出版部门一起完成。示例地图可在以下位置找到：\n\nhttps://www.dropbox.com/sh/0bi5dg8v7vj7y74/AAANSWfsC6uSL_mRSYKBx6T9a?dl=0',
              es: 'Tomar las decisiones finales sobre los mapas. Esto se debe hacer en coordinación con el departamento de publicaciones. Ejemplos de mapas se puede ver aquí:\nhttps://www.dropbox.com/sh/0bi5dg8v7vj7y74/AAANSWfsC6uSL_mRSYKBx6T9a?dl=0',
              pt: 'Tomar as decisões finais sobre os mapas. Isso deve ser feito em conjunto com o departamento de publicações. Você pode encontrar exemplos de mapas no link:\nhttps://www.dropbox.com/sh/0bi5dg8v7vj7y74/AAANSWfsC6uSL_mRSYKBx6T9a?dl=0',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '819e4803-d2fb-465e-8242-3ce0d58edde2',
            names: {
              en: 'Draft introduction to Bible/NT, other front & back matter',
              fr: 'Rédaction des pages liminaires et des annexes',
              'zh-Hans': '草拟圣经／新约简介和其他前文与附录',
              es: 'Redactar la Introducción de la Biblia/NT, material anterior/posterior',
              pt: 'Elaboração de páginas introdutórias e apêndices',
            },
            descriptions: {
              en: 'All planned front and back matter that has not already been done should be drafted by this stage.',
              fr: 'Rédigez les pages liminaires (ex: introduction générale) et les parties annexes.',
              'zh-Hans': '这个阶段应要草拟所有已计划但仍未撰写的前文和附录。',
              es: 'Todo el material anterior y posterior que se ha planeado que no se haya hecho todavía debe ser redactado en esta etapa.',
              pt: 'Todo material introduções e apêndices que ainda não foram feitos devem ser elaboradas nesta etapa.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'f6540822-253b-4b50-8699-179ebb9ea5b7',
            names: {
              en: 'Check parallel passages',
              fr: 'Vérification des passages parallèles',
              'zh-Hans': '检查平行经文',
              es: 'Comprobar Pasajes Paralelos',
              pt: 'Verificação de Passagens Paralelas',
            },
            descriptions: {
              en: 'Go to the Tools-->Parallel Passages menu, and use the Parallel Passages tool to guide you to make parallel passages the same to the appropriate level.',
              fr: 'Dans le menu « Outils », cliquez sur « Textes parallèles ». Utilisez cet outil pour harmoniser les passages parallèles au cas par cas.',
              'zh-Hans':
                '转到“工具-->平行经文”菜单，使用“平行经文”工具作指引，使平行经文之间有相应的译法。',
              es: 'Ir al menú Herramientas-->Pasajes paralelos..., y usar la herramienta como guía para hacer que los pasajes paralelos coincida con el texto en el nivel apropiado.',
              pt: 'Ir ao menu Ferramentas-->Passagens paralelas..., e utilizar essa ferramenta para alinhar as passagens paralelas com o texto no nível apropriado.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '3936924b-7158-4628-a6d5-8dbd7e23885a',
            names: {
              en: 'Verify that all Paratext checks are complete',
              fr: 'Vérifiez que tous les contrôles de Paratext ont été effectués',
              'zh-Hans': '确定所有《圣经辅助工具》的检查都已完成',
              es: 'Verificar que todos los chequeos de ParaTExt estén completados.',
              pt: 'Checar se todas as verificações do Paratext foram realizadas',
            },
            descriptions: {
              en: 'Open the Assignments and progress window, and correct all errors and resolve all outstanding issues reported there.',
              fr: 'Ouvrez la fenêtre « Affectations et Progrès » et corrigez toutes les erreurs signalées et résolvez toute question en suspens.',
              'zh-Hans': '打开“工作分配和进度”窗口，更正所有错误和解决所有尚待解决的问题。',
              es: 'Abrir la ventana de Asignaciones y Progreso del proyecto, y correjir todos los errores y resolver todos los problemas pendientes.',
              pt: 'Abrir a janela Atribuiçoes e Progresso, e corrigir eventuais erros relatados e resolver todas as questões pendentes.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'ea8585f9-a9fa-4778-863f-61ce41542068',
            names: {
              en: 'Proper names - final check',
              fr: 'Vérification finale des noms propres',
              'zh-Hans': '专有名称 – 最后检查',
              es: 'Nombres propios - Comprobación final',
              pt: 'Nomes próprios - verificação final',
            },
            descriptions: {
              en: 'In the Biblical terms tool, create a new filter for the "Names" category.',
              fr: 'Dans l’outil « Termes bibliques », créez un nouveau filtre pour la catégorie « Noms propres ».',
              'zh-Hans': '在“圣经专门用词”工具中创建一个新的“名字”类别筛选器。',
              es: 'En la herramienta Vocablos Bíblicos, crear un nuevo filtro para la categoría "Nombres".',
              pt: 'Na ferramenta Termos Bíblicos, crier un novo filtro para a categoría "Nomes próprios".',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'ba93cc52-db81-4b97-9fa4-7acd521c1601',
            names: {
              en: 'Numbers - final check',
              fr: 'Vérification finale des chiffres',
              'zh-Hans': '数目 – 最后检查',
              es: 'Números - chequeo final',
              pt: 'Números - verificação final',
            },
            descriptions: {
              en: 'Select the list "Numbers" as the Biblical terms list in the Biblical terms tool to find all the numbers in the New Testament.',
              fr: "Sélectionnez la liste « Chiffres » dans l'outil « Termes bibliques » pour afficher tous les chiffres employés dans le Nouveau Testament.",
              'zh-Hans':
                '在“圣经专门用词”工具中选择“数”的列表作为“圣经专门用词”列表，以查找新约中所有的数目。',
              es: 'Seleccione la lista "Números" como la lista de términos clave en la herramienta de Vocablos Bíblicos para encontrar todos los números en el Nuevo Testamento.',
              pt: 'Na ferramenta Termos Bíblicos, no menu Arquivo-->Selecionar lista de termos..., selecione "Números" para encontrar todos os números no Novo Testamento.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'c420d607-9eba-4bf3-92c1-fd5a77bc0915',
            names: {
              en: 'Money - final check',
              fr: 'Vérification finale des termes liés à l’argent',
              'zh-Hans': '金钱 – 最后检查',
              es: 'Moneda - chequeo final',
              pt: 'Moedas - verificação final',
            },
            descriptions: {
              en: 'Verify that words such as money, coin, silver, gold, denarii, and shekel are adequately differentiated and rendered consistently rendered.',
              fr: 'Vérifiez que des mots comme argent, or, monnaie, deniers et shekel sont toujours traduits de la même manière et qu’ils sont différents les uns des autres.',
              'zh-Hans':
                '确定所有诸如金钱、钱币、银子、金子、得拿利和舍客勒等字词都有充分的区分和一致的译法。',
              es: 'Comprobar que palabras como dinero, moneda, plata, oro, denario, y siclos esten diferenciados adecuadamente y generados consistentemente.',
              pt: 'Verifique se as palavras dinheiro, moeda, prata, ouro, denário e siclos são sempre traduzidos da mesma forma e elas são diferentes entre si.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '1ac01594-c549-410f-bd50-2c248f767c6f',
            names: {
              en: 'Weights - final check',
              fr: 'Vérification finale des termes liés au poids',
              'zh-Hans': '重量 – 最后检查',
              es: 'Pesos - chequeo final',
              pt: 'Pesos - verificação final',
            },
            descriptions: {
              en: 'Verify that words such as talent, mina, shekel, pim, beka, gerah etc., are adequately differentiated and rendered consistently.',
              fr: 'Vérifiez que des mots comme talent, mina, shekel, pim, beka, gera, etc., sont toujours traduits de la même manière et qu’ils sont différents les uns des autres.',
              'zh-Hans':
                '确定所有诸如他连得、弥拿、舍客勒、pim 、比加、季拉等字词都有充分的区分和一致的译法。',
              es: 'Comprobar que palabras como talento, libra, siclos, pim, medio siclo, geras etc., esten diferenciados adecuadamente y generados consistentemente.',
              pt: 'Verifique se as palavras talento, mina, siclo, pim, beca, gera etc. são sempre traduzidos da mesma forma e elas são diferentes entre si.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'a643c702-c6c2-4ba9-98c5-4d3191ac4ccb',
            names: {
              en: 'Measures - final check',
              fr: 'Vérification finale des mesures',
              'zh-Hans': '计量单位 – 最后检查',
              es: 'Medidas - chequeo final',
              pt: 'Medidas - verificação final',
            },
            descriptions: {
              en: 'Verify that words such as cubit, span, handbreadth, orgyia, stadion, milion, cor, lethech, ephah, seah, omer, cab, bath, hin, log, etc., are adequately differentiated and rendered consistently rendered.',
              fr: 'Vérifiez que des mots comme coudée, travée, quatre doigts, orgyia, stadion, milion, cor, lethech, épha, seah, omer, cab, bath, hin, log, etc., sont toujours traduits de la même manière et qu’ils sont différents les uns des autres.',
              'zh-Hans':
                '确定所有诸如肘、虎口、一掌、 orgyia 、斯他迪、百万、 cor 、半賀梅珥、伊法、细亚、賀梅珥、 cab 、罢特、欣、 log 等字词都有充分的区分和一致的译法。',
              es: 'Comprobar que palabras como codos, palmo, palmo menor, orgyia, stadion, milion, coros, lethech, efa, seah, omer, cab, bath, hin, log, etc., esten diferenciados adecuadamente y generados consistentemente.',
              pt: 'Verifique se as palavras côvado, palmo, palmo menor, estádios, milhas, coro, leteque, efa, seá (alqueire), gômer cabo, bato, him, logue, etc. são sempre traduzidos da mesma forma e elas são diferentes entre si.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '9bd5b294-ef93-4e48-a622-8e6907aab38c',
            names: {
              en: 'Consistency check - Biblical key terms',
              fr: 'Test de la cohérence des termes clés bibliques',
              'zh-Hans': '一致性检查 – 主要圣经专门用词',
              es: 'Chequeos de consistencias - términos clave',
              pt: 'Verficação de consistência - Termos Bíblicos chaves',
            },
            descriptions: {
              en: 'Open Biblical terms tool and review all renderings for consistency, and make any last changes needed.',
              fr: 'Ouvrez l’outil « Termes bibliques » et examinez tous les équivalents pour voir s’ils sont traduits toujours de la même manière. Corrigez si nécessaire.',
              'zh-Hans': '打开“圣经专门用词”工具，审阅所有译法的一致性，按需要进行最后的更改。',
              es: 'Abrir la herramienta Vocablos Bíblicos y comprobar la consistencia de todos los términos y realizar los últimos cambios necesarios.',
              pt: 'Abrir a ferramenta Termos Bíblicos para verificar a consistência de todos os termos e corrigir se necessário.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'b7263773-5022-4ec2-9442-c07f681f9f91',
            names: {
              en: 'Check references',
              fr: 'Vérification des références',
              'zh-Hans': '检查经文参照',
              es: 'Comprobación de referencias',
              pt: 'Verificação de referências',
            },
            descriptions: {
              en: 'Look up and verify that all Scripture references in footnotes, cross references, book introductions, etc., are referring to verse(s) that talk about the correct topic. (This is not the automated Paratext check to verify that a Scripture reference is in the correct format and exists in the cannon.)',
              fr: 'Recherchez toutes les références bibliques dans les notes de bas de page, les renvois, les introductions aux livres, etc., et vérifiez qu’elles font référence aux passages voulus. (Il ne s’agit pas de l’outil de Paratext qui vérifie automatiquement le formatage des références et de leur existence dans le canon.)',
              'zh-Hans':
                '在脚注、经文相互参照、书卷简介等，查阅所有经文参照，确定当中列出的经节都谈论相应的主题。（这并不是《圣经辅助工具》的自动检查，不是要确定经文参照格式是正确和存在于经目表的。）',
              es: 'Buscar y verificar que todas las referencias bíblicas en las notas al pie de página, referencias cruzadas, introducción a libros, etc., mencionen el(los) versículo(s) que traten el tema correcto. (Este no es el chequeo automático de ParaTExt para comprobar que una referencia biblica este en el formato correcto y que exista en el canon).',
              pt: 'Pesquisar todas as referências bíblicas nas notas de rodapé, referências cruzadas, introduções aos livros, etc., verificar se ela(s) trata(m) do(s) tema(s) correto(s). (Esta não é uma verificação automática que o Paratext faz para checar a formatação de referências bíblicas e sua existência no cânon).',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '60fc3151-1b71-4910-b9f4-96dbaf84c225',
            names: {
              en: 'Section breaks and headings - final format check',
              fr: 'Dernier contrôle de formatage des sauts de section et en-têtes de section',
              'zh-Hans': '分段符和标题 – 最后的格式检查',
              es: 'Saltos de sección y encabezados - comprobación del formato final',
              pt: 'Títulos de seções - ver. final de formatação',
            },
            descriptions: {
              en: 'If another translation is used as a base then this check can be done using Tools > Checklists > Compare Section Headings',
              fr: "Si vous suivez une version modèle, cette vérification peut se faire à l’aide d'« Outils » > « Listes récapitulatives » > « En-têtes de section »",
              'zh-Hans':
                '若是使用另一个译本为根据，可以进行这项检查如下：“工具 ＞ 检查表工具（Checklists） ＞ 比较分段标题”。',
              es: 'Si otra traducción es usada como base entonces se puede realizar este chequeo en Herramientas > Lista de Verificaciones > Comparar encabezados de secciones',
              pt: 'Se outra tradução foi usada como base, essa verificação pode ser feita usando a Ferramentas > Lista de Verificações > Comparar títulos de seções',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'a5b28c00-1dce-405f-8cb2-fb9fb0fd346e',
            names: {
              en: 'Paragraph breaks - final format check',
              fr: 'Dernier contrôle final de formatage des sauts de paragraphe',
              'zh-Hans': '段落符 – 最后的格式检查',
              es: 'Saltos de Párrafos - comprobación del formato final',
              pt: 'Quebras de parágrafos - ver. final de formatação',
            },
            descriptions: {
              en: 'If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\p, and \\m.',
              fr: "Vérifiez les marqueurs de paragraphe comme \\p et \\m. Si vous suivez une version modèle, ce contrôle peut être fait à l’aide d'« Outils » > « Listes récapitulatives » > « Marqueurs ». Affichez la version modèle pour comparer et trouver les endroits où il y a des paragraphes non souhaités ou des paragraphes manquants.",
              'zh-Hans':
                '若是使用另一个译本为根据，可以进行这项检查如下：“工具 ＞ 检查表工具（Checklists） ＞ 比较格式码”，然后寻找新的段落格式码，如　\\p 和 \\m。',
              es: 'Si otra traducción es usada como base entonces se puede realizar este chequeo en Herramientas > Lista de Verificaciones > Comparar Marcadores y buscar por nuevos marcadores de párrafo como \\p y \\m.',
              pt: 'Se outra tradução foi usada como base, essa verificação pode ser feita usando a Ferramentas > Lista de Verificações > Comparar Marcadores e procurar por novos marcadores de parágrafo como \\p e \\m.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'ce33f6a6-b46c-4abe-a234-5fa6bbe06ea5',
            names: {
              en: 'Layout and indents - final format check',
              fr: 'Dernier contrôle de formatage pour la mise en page et les mises en retrait',
              'zh-Hans': '版式和缩排 – 最后的格式检查',
              es: 'Diseño y sangrías - Chequeo de formato final',
              pt: 'Layout e recuos - ver. final de formatação',
            },
            descriptions: {
              en: 'Verify other layout issues such as poetry. Particular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\q, \\q1 and \\q2.',
              fr: "Vérifiez d’autres questions de mise en page telles que celle de la poésie. Faites attention en particulier aux mises en retrait poétique. Si vous suivez une version modèle, ce contrôle peut être fait à l’aide d'« Outils » > « Listes récapitulatives » > « Marqueurs ». Affichez la version modèle pour comparer et trouver les endroits où il y a des marqueurs \\q, \\q1, \\q2, en trop ou manquants.",
              'zh-Hans':
                '确定其他版式问题，如诗歌的版式。要特别注意诗歌的缩排。若是使用另一个译本为根据，可以进行这项检查如下：“工具 ＞ 检查表工具（Checklists） ＞ 比较格式码”，然后寻找新的段落格式码，如　\\q，\\q1 和 \\q2。',
              es: 'Revisar otros problemas de diseño como en la poesía. Debe prestarse especial atención a la sangría en el texto de poesía. Si otra traducción es usada como base entonces se puede realizar este chequeo en Herramientas > Lista de Verificaciones > Comparar Marcadores y buscar por marcadores de nuevos párrafos como \\q, \\q1 y \\q2.',
              pt: 'Verifique outros problemas de layout, tais como poesia. Preste atenção especial para colocar os recúos poéticos. Se outra tradução foi usada como base, essa verificação pode ser feita usando a Ferramentas > Lista de Verificações > Comparar Marcadores e procurar por novos marcadores de parágrafo como \\q, \\q1 e \\q2.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'e66023ab-dc4d-4f5c-94a5-93fded851e7a',
            names: {
              en: 'Special formatting - final format check',
              fr: 'Dernier contrôle de formatage pour la mise en forme spéciale',
              'zh-Hans': '特殊格式 – 最后的格式检查',
              es: 'Formato especial - Comprobación del formato final',
              pt: 'Formatação especial - ver. final de formatação',
            },
            descriptions: {
              en: 'See list of special formatting issues such as genealogies, words on the cross, letters, etc. Verify that text is marked using the correct standard format markers (USFM). See http://paratext.org/about/usfm for latest guide to using USFMs.',
              fr: 'Voyez la liste des cas spéciaux de mise en forme (les généalogies, les mots sur la croix, les épîtres, etc.). Vérifiez que les marqueurs de formatage standard (USFM) sont corrects et bien placés. Voyez http://paratext.org/about/usfm pour le guide d’utilisation des marqueurs le plus récent.',
              'zh-Hans':
                '见特殊格式问题列表，如：家谱、十字架上的字词、信件等。确定文本是使用正确的“标准格式格式码”（USFM）来标记。有关使用 USFM 的最新指南，见 http://paratext.org/about/usfm。',
              es: 'Consulte la lista de problemas de formato especial como en genealogías, palabras en la cruz, cartas, etc. Verifique que el texto use marcadores bajo el correcto estándar (USFM). Consultar http://paratext.org/about/usfm para obtener la guía más reciente sobre el uso de USFM.',
              pt: 'Veja a lista de casos especiais de formatação como genealogias, as palavras na cruz, as epístolas, etc. Verifique se os marcadores de formatação padrão (USFM) estão corretoes. Consultar http://paratext.org/about/usfm para obter o guia mais recente sobre o uso do USFM.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'bf163865-a207-42b7-950e-b855539b9337',
            names: {
              en: 'Consultant check - final items',
              fr: 'Dernières vérifications du conseiller',
              'zh-Hans': '翻译顾问的检查 – 最后几项',
              es: 'Chequeo del Consultor - puntos finales',
              pt: 'Verificação do consultor - itens finais',
            },
            descriptions: {
              en: 'Consultant will check any new supplementary materials such as maps, illustrations, front matter, and back matter.',
              fr: 'Le conseiller vérifie toutes les aides paratextuelles (cartes, illustrations, pages liminaires et parties annexes).',
              'zh-Hans': '翻译顾问会检查所有新的补充材料，如地图、图表、前文和附录。',
              es: 'El Consultor revisará cualquiere materia nuevo suplementario como mapas, ilustraciones, páginas preliminares y páginas finales.',
              pt: 'O Consultor  verifica todos os materiais suplementares como: mapas, ilustrações, páginas introdutórias e apêndices.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'e09339d3-83e9-479e-a387-76b83067007d',
            names: {
              en: 'Final approval from consultant',
              fr: 'Approbation finale du conseiller',
              'zh-Hans': '翻译顾问最后的核准',
              es: 'Aprobación final del Consultor',
              pt: 'Aprovação final pelo consultor',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '1cbff9af-07b6-4d6b-b970-aeb548b5b95a',
            names: {
              en: 'Final read through and approval with church and community',
              fr: "Lecture finale et approbation par l'Église et la communauté",
              'zh-Hans': '与教会和语言群体中的公众审阅者一起进行最后的通读和核准。',
              es: 'Lectura final del texto y aprobación de la Iglesia y la comunidad',
              pt: 'Leitura final e aprovação com igreja e comunidade',
            },
            descriptions: {
              en: 'This should use a draft produced by PA/InDesign so that the text is in close to final format.',
              fr: 'Pour ce contrôle, imprimez un exemplaire avec Publishing Assistant ou InDesign afin que le texte ressemble le plus au produit fini.',
              'zh-Hans': '应使用一个用 PA/InDesign 来制作的草稿，使文本接近最终的格式。',
              es: 'Esta lectura debe usar un borrador producido por Publishing Assistant (PA)/InDesign para que el texto esté cerca del formato final.',
              pt: 'Para esta verificação, imprima uma cópia com o software Publishing Wizard ou InDesign para que o texto esteja o mais próximo do formato final.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'fdb55ea8-675a-4748-938e-29baeb639b04',
            names: {
              en: 'Revise text based on final read through',
              fr: 'Révision du texte suite à la lecture finale',
              'zh-Hans': '根据最后的通读来修订文本',
              es: 'Revisar el texto basado en la lectura final',
              pt: 'Revisão do texto baseado na leitura final',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'a9a461dc-23c0-460c-a33b-8a5d49ea88e9',
            names: {
              en: 'Do final typesetting',
              fr: 'Mise en page finale',
              'zh-Hans': '进行最后的排版',
              es: 'Hacer la composición tipográfica final',
              pt: 'Diagramação final',
            },
            descriptions: {
              en: 'This task is not done by the translation team. It is done by a typesetter who is part of Global Printing Services (GPS).',
              fr: 'Cette tâche n’est pas réalisée par l’équipe de traduction. Elle est faite par un typographe du Services de Publication Globale (GPS).',
              'zh-Hans': '这并不是翻译小组的任务。这任务由全球印刷服务（GPS）的排版员来执行。',
              es: 'Este paso no es realizado por el equipo de traducción. Es hecho por un tipógrafo que forma parte del equipo Global Printing Services (GPS).',
              pt: 'Esta tarefa não é realizada pela equipe de tradução. É feita por um diagramador da Global Publishing Services (GPS).',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'd2159520-6cc0-4fcb-a7c2-e9c68a1b740e',
            names: {
              en: 'Do audio recording',
              fr: 'Enregistrement audio du texte biblique',
              'zh-Hans': '进行录音',
              es: 'Hacer grabación de audio',
              pt: 'Gravação em Áudio',
            },
            descriptions: {
              en: 'Ask your entity what partner organizations are in your area that do Scripture recordings.',
              fr: 'Renseignez-vous pour savoir qui fait l’enregistrement audio du texte biblique dans votre région.',
              'zh-Hans': '问问你的单位或机构你地区中有哪些合作伙伴组织会做圣经录音。',
              es: 'Pregunte a su entidad cuáles son las organizaciones socias en su área que realizan grabaciones de las Escrituras.',
              pt: 'Pergunte à sua organização quais são as organizações parceiras na sua região que fazem gravações das Escrituras.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 250,
              easy: 250,
              moderate: 200,
              difficult: 150,
            },
          },
        ],
      },
    ],
    checks: [
      {
        checkId: 'basic.chapter-verse-numbers',
        notifyOnlyInStage: null,
        requiredInStage: '9eddb82d-ed66-4e24-bdab-060dea2294de',
      },
      {
        checkId: 'basic.markers',
        notifyOnlyInStage: null,
        requiredInStage: '9eddb82d-ed66-4e24-bdab-060dea2294de',
      },
      {
        checkId: 'notes.translator',
        notifyOnlyInStage: null,
        requiredInStage: '9eddb82d-ed66-4e24-bdab-060dea2294de',
      },
      {
        checkId: 'notes.consultant',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.characters',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.punctuation',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.capitalization',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.repeated-words',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.references',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'basic.unmatched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'basic.numbers',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'basic.matched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'basic.quotations',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'spelling.word-list',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'spelling.spelling',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'notes.spelling-discussion',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'notes.rendering-discussion',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'other.biblical-terms',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'other.parallel-passages',
        notifyOnlyInStage: null,
        requiredInStage: 'c66ede6b-1e7b-4d55-b5c3-f8aff60217d7',
      },
    ],
  },
  {
    id: 'ec747b2c-a9b2-41c6-9de1-e6fd564ab4bb',
    name: 'SIL Base Plan',
    version: '1.34',
    kind: 'factory',
    stages: [
      {
        id: '9eddb82d-ed66-4e24-bdab-060dea2294de',
        names: {
          en: 'Drafting',
          fr: 'Rédaction de l’ébauche',
          'zh-Hans': '草拟初稿',
          es: 'Borrador',
          pt: 'Rascunho',
        },
        descriptions: {},
        tasks: [
          {
            id: '79540c20-9aed-4d84-8e64-d3a3e1e98ccd',
            names: {
              en: 'Complete translation brief',
              fr: 'Consigne de traduction',
              'zh-Hans': '完成翻译纲要',
              es: 'Traducción Completa - Sumario',
              pt: 'Tradução Completa - Sumário',
            },
            descriptions: {
              en: 'Developing the translation Brief\n\nThe translation brief is a statement of the standards for the project, such as which source texts are used,  and the specific audience and intended uses of the translation. Setting these principles out at the beginning will help the translation team work together towards the common goal.\n\nFor more information about the translation brief read:\n\n\nIntroducing the Translation Brief: A Practical Tool for Improving Translations\nThe translation brief, also referred to as translation instructions (Nord, 1991b), is a\nset of instructions prepared by a requester that accompanies a translation assignment,\nthus enabling the requester to convey information about the source text, the specific\ncommunicative purpose and context in which the text is used, the intended uses of\nthe translation and what it aims to accomplish. In short, it enables the requester and\ntranslator to be, quite literally, on the same page from start to finish.\n\nhttp://www.hablamosjuntos.org/mtw/html_toolkit/pdf/tool_3dev_transbrief-feb5_final.pdf',
              fr: 'Développez la consigne de traduction du projet. La consigne de traduction est un document qui définit les rôles et responsabilités des parties prenantes dans un projet de traduction : communautés locales, églises, SIL, traducteurs. La consigne de traduction définit ce qui sera traduit, qui est le public cible, quel genre de traduction on vise, comment on pense publier, etc. La consigne de traduction permet à toutes les parties prenantes de savoir exactement quel est leur rôle tout au long du processus de la traduction.',
              'zh-Hans':
                '制定翻译纲要\n\n在两种不同语言之间，能达至逐字逐句相同的文本是很难做到的。发起翻译项目的人或翻译请求者（translation requester）若能提供翻译纲要，便可以使译者创建目标语言内容时，更接近原来文本的原意，以致目标语言读者能明白和使用。\n\n翻译：一个共同的责任\n提出翻译纲要：一个改良翻译的实用工具\n\n翻译纲要，也称为翻译指引（Nord, 1991b），是翻译请求者分配翻译任务时所准备的一组指示，使翻译请求者能够传达他的想法，包括关乎源文本的信息，使用文本的特定交流目的和语境，翻译的预期用途以及要达到的目的。简单来说，翻译纲要能使翻译请求者和译者，在实际上，从开始到结束都在同一个节奏上。\n\nhttp://www.hablamosjuntos.org/mtw/html_toolkit/pdf/tool_3dev_transbrief-feb5_final.pdf',
              es: 'Desarrollando la traducción - Sumario\n\nUn texto equivalente en otro idioma palabra-por-palabra es dificil de lograr. El sumario de la traducción habilita a los solicitantes permitir a los traductores crear contenido en el idioma deseado que se aproxime al significado original de un texto de una manera que los lectores del idioma deseado puedan entender y usar.\nTraducción: Una responsabilidad compartida\nPresentando el sumario de la traducción: Una herramienta práctica para mejorar traducciones\nEl sumario de la traducción, tambien referida como instrucciones de traducción (Nord, 1991b), es un conjunto de instrucciones preparadas por un solicitante y que es parte de un proyecto de traducción, permitiendo así que el solicitante transmita información sobre el texto original, el propósito comunicativo específico y el contexto en el que se usa el texto, además de los usos previstos de traducción y lo que se pretende lograr. En resumen, permite al solicitante y al traductor estar, literalmente en la misma página desde el principio hasta el final.\n\nhttp://www.hablamosjuntos.org/mtw/html_toolkit/pdf/tool_3dev_transbrief-feb5_final.pdf',
              pt: 'Resumo completo da tradução - Sumario\n\nO resumo da tradução é uma declaração dos padrões para o projeto, quais textos de origem serão utilizados, e o público específico e os usos pretendidos da tradução.\nA definição destes princípios, no início, ajudará a equipe de tradução a trabalhar em conjunto na direção de um objetivo comum.\n\nPara mais informações sobre a tradução, leia:\n\nIntroduzindo o Resumo de Tradução: Uma Ferramenta Prática para Melhorar traduções\nO resumo da tradução, também referido como instruções de tradução (Nord, 1991b), e é um conjunto de instruções preparado por um solicitante que é parte de um projeto de tradução,\npermitindo, assim, que o solicitante transmita informações sobre o texto-fonte, o objetivo comunicativo específico e o contexto em que o texto é usado, os usos pretendidos da\ntradução e o que ela pretende realizar. Em suma, permite que o solicitante e o tradutor estejam, literalmente, na mesma página do início ao fim do projeto.\n\nhttp://www.hablamosjuntos.org/mtw/html_toolkit/pdf/tool_3dev_transbrief-feb5_final.pdf',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '9f99673c-cb6a-4c05-a9cd-4629eb7f6b20',
            names: {
              en: 'Exegesis',
              fr: 'Exégèse',
              'zh-Hans': '经文解释',
              es: 'Exégesis',
              pt: 'Exegese',
            },
            descriptions: {
              en: 'The first translation task is to study the text carefully, using Bible versions and commentaries. This is called “doing the exegesis”. There should be at least one person on each translation team who is a skilled exegete.',
              fr: "La première tâche du traducteur est de lire tout le livre dans une version qu’il comprend bien. Ensuite, il étudie le texte attentivement en comparant plusieurs versions. Il consulte aussi des manuels de traduction et des commentaires. C'est ce qu'on appelle « faire l'exégèse ». Dans chaque équipe de traduction, il doit y avoir au moins une personne capable de faire ce travail.",
              'zh-Hans':
                '第一个翻译任务是利用不同的圣经版本和注释书来仔细研读并理解经文。这就称之为“经文解释”。每个翻译小组最少要有一位善于解释的人。',
              es: 'La primera tarea en la traducción es estudiar el texto cuidadosamente, usando versiones de la Biblia y comentarios. Esto se llama “haciendo la exégesis”. Debe haber al menos una persona en cada equipo de traducción que sea un exégeta experto.',
              pt: 'A primeira tarefa da tradução é estudar o texto cuidadosamente, utilizando versões da Bíblia e comentários. \nEste é chamado de "Fazer a exegese". Deve ter pelo menos uma pessoas em cada equipe de tradução que seja um exegeta.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '3c7a3e20-ffe0-4b32-b11c-f6948b8f5a81',
            names: {
              en: 'Oral retelling and processing of the text',
              fr: 'Ébauche orale',
              'zh-Hans': '口头复述和文本处理',
              es: 'Recuento oral y procesamiento del texto',
              pt: 'Recontar oralmente e processar o texto',
            },
            descriptions: {
              en: 'A translator, a mother-tongue speaker of the receptor language, studies the text in a LWC, then retells the text in the vernacular to others on the team. It may be recorded for use in the drafting of the text in the next step.',
              fr: 'Le traducteur étudie le texte dans une langue véhiculaire, puis il le dit dans sa langue à ses collègues. On peut enregistrer cette étape. Cela peut aider la rédaction de l’ébauche de la traduction dans l’étape suivante.',
              'zh-Hans':
                '以译入语（或受体语言）为母语的译者首先在 LWC 【？】研读经文，然后用白话向翻译小组的其他成员复述经文。小组可以把这段复述录下来，留待下一步的草拟初稿时使用。',
              es: 'Un traductor, un hablante que tenga como lengua materna el lenguaje receptor, estudia el texto en un LWC (Siglas en Inglés para Lenguaje de comunicación más amplia), luego vuelve a contar el texto en la lengua vernácula a otros en el equipo. Podría ser grabado para su uso en la redacción del texto en el siguiente paso',
              pt: 'Um tradutor, um falante nativo da língua receptora, estuda o texto em um LWC (Siglas em Inglês que siginifica Linguagem de Comunicação mais Ampla), em seguida, \né recontado o texto na lígua vernacular para os outros da equipe. Pode-se gravar para ser utilizado na elaboração do texto na próxima etapa',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '4bce47e9-37c3-42ae-a8ec-5a5006c0e21e',
            names: {
              en: 'Keyboarding the first draft',
              fr: 'Saisie de la première ébauche',
              'zh-Hans': '输入初稿',
              es: 'Redactando el primer borrador',
              pt: 'Digitar o primeiro rascunho',
            },
            descriptions: {
              en: 'The translator, a mother-tongue speaker of the receptor language, makes the first draft of the translation, typing it into Paratext.',
              fr: 'Le traducteur, un locuteur de la langue réceptrice, rédige le texte dans Paratext. Après avoir traduit un passage, il met des titres en tête de section et des notes de bas de page s’il en voit la nécessité.',
              'zh-Hans':
                '以译入语（或受体语言）为母语的译者拟定翻译的初稿，并输入到《圣经辅助工具》中。',
              es: 'Un traductor, un hablante que tenga como lengua materna el lenguaje receptor, ingresa el texto del primer borrador de la traducción en ParaTExt.',
              pt: 'Um tradutor, um falante nativo da língua receptora, faz o primeiro rascunho da tradução, digitando-a no ParaText.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '58089389-d741-4c35-848b-64a65229ffb1',
            names: {
              en: 'Read the draft aloud',
              fr: 'Lecture à haute voix du texte traduit',
              'zh-Hans': '朗读初稿',
              es: 'Lea el borrador en voz alta',
              pt: 'Ler o rascunho em voz alta',
            },
            descriptions: {
              en: 'The translator, a mother-tongue speaker of the receptor language, reads the draft aloud to the team, and possibly other mother tongue speakers of the language to check for naturalness and clarity. Then adjust the text based on comments from the group.',
              fr: "Le traducteur lit le texte traduit à haute voix à l'équipe (et éventuellement à d’autres locuteurs de la langue) pour vérifier le naturel et la clarté du texte. Il modifie le texte en tenant compte des observations formulées par le groupe.",
              'zh-Hans':
                '以译入语（或受体语言）为母语的译者向翻译小组朗读初稿，其他以译入语为母语的组员查看译文是否自然和清晰。然后根据小组的意见调整译文。',
              es: 'Un traductor, un hablante que tenga como lengua materna el lenguaje receptor, lee en voz alta el borrador para el equipo, y posiblemente a otros hablantes del lenguaje receptor para comprobar la naturalidad y claridad del texto. A continuación, el texto se ajusta en base a los comentarios del grupo.',
              pt: 'Um tradutor, um falante nativo da língua receptora, lê em voz alta o rascunho para a equipe e, possivelmente, a outros falantes da língua materna \npara verificar a naturalidade e a claridade do texto. Em seguida, ajuste o texto com base nos comentários do grupo.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '40b6dcd4-3b9d-4790-819d-28f0fc02bc53',
            names: {
              en: 'Draft section headings',
              fr: 'Vérification des en-têtes de section',
              'zh-Hans': '草拟分段标题',
              es: 'Preparar los Encabezados de Sección',
              pt: 'Rascunho dos Títulos de seções',
            },
            descriptions: {
              en: 'Draft section headings',
              fr: 'Une fois que tout un livre est traduit, vérifiez les en-têtes de section',
              'zh-Hans': '草拟分段标题',
              es: 'Preparar los Encabezados de Sección',
              pt: 'Prepara o rascunho dos títulos de seções',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: 'b1ee4198-d3fe-4a2f-9cd7-4e0fa1ec8bd3',
            names: {
              en: 'Draft footnotes',
              fr: 'Rédaction des notes de bas de page',
              'zh-Hans': '草拟脚注',
              es: 'Preparar las Notas al Pie de Página',
              pt: 'Rascunho das notas de rodapé',
            },
            descriptions: {
              en: 'Draft footnotes. These may be drafted after main text has been finalized. After you have drafted the footnotes, it may be helpful to go to Tools-->Checklist-->Footnotes. This checklist will compare the footnotes in your text to other resources that you specify.',
              fr: 'Rédigez les notes de bas de page. Cela peut se faire quand tout le livre a été traduit.',
              'zh-Hans': '草拟脚注。可以在主要文本定稿后才草拟脚注。',
              es: 'Preparar las notas al pie de página. Estos pueden ser elaborados luego de que el texto principal haya sido finalizado.',
              pt: 'Digitar o rascunho das notas de rodapé. Estes podem ser elaborados depois que o texto principal estiver finalizado. \nDepois de ter redigido as notas de rodapé, pode ser útil ir para Ferramentas-->Lista de verificação...-- >Notas de rodapé. \nEsta lista de verificação irá comparar as notas de rodapé no seu texto com outros recursos que você especificar.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '1ce56f6c-82fc-41b6-9876-7a25572b4951',
            names: {
              en: 'Draft book introductions',
              fr: 'Rédaction des introductions des livres',
              'zh-Hans': '草拟书卷简介',
              es: 'Preparar la Introduccion del Libro',
              pt: 'Rascunho da Introduçãdo do Livro',
            },
            descriptions: {
              en: 'Draft the book introduction. Be careful to use the same key terms in the introduction as in the text.',
              fr: 'Rédigez l’introduction du livre traduit. Pensez à utiliser les mêmes termes clés que ceux utilisés dans le texte traduit.',
              'zh-Hans': '草拟书卷简介。\n\n注意在简介中必须使用与文本相同的主要用词。',
              es: 'Elaborar la introducción del libro. Tenga cuidado de usar los mismos términos clave en la introducción como en el texto principal.',
              pt: 'Elaborar a introdução do livro. Tenha cuidado para usar os mesmos termos-chave na introdução como no texto principal.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '5c28e0c8-0c8a-45a4-afab-9c5f22512928',
            names: {
              en: 'Draft glossary entries',
              fr: 'Rédaction des entrées du glossaire',
              'zh-Hans': '草拟《词汇表》条目',
              es: 'Preparar Entradas del Glosario',
              pt: 'Rascunho do Glossário',
            },
            descriptions: {
              en: 'Draft glossary entries. The glossary is one of the books that occur after Revelation, and its short name is GLO. It is recommended to add glossary entries from within the Biblical terms tool. Using the Biblical terms tool will create GLO book for you. Look in Help under "glossary" for more information.',
              fr: "Le glossaire (GLO) se trouve après l’Apocalypse. Il faut décider quels mots inclure dans le glossaire à partir du livre que vous venez de traduire. Rédigez les entrées du glossaire. Il est recommandé d’ajouter les entrées du glossaire à l'aide de l’outil « Termes Bibliques » qui crée le livre GLO. Pour plus d’informations, allez dans « Aide » puis « Glossaire ».",
              'zh-Hans':
                '草拟《词汇表》条目。\n\n在《圣经辅助工具》里，《词汇表》是放在《启示录》后面的一个书卷，简称是 GLO。《词汇表》条目最好从“圣经专门用词”工具内部添加。使用“圣经专门用词”工具时会为你创建一个 GLO 书卷。查看“帮助”里面的“词汇表”可以获取更多信息。',
              es: 'Preparar las entradas del glosario. El glosario es uno de los libros localizados después de Apocalipsis y su nombre corto es GLO. Se recomienda añadir entradas del glosario usando la herramienta de Vocablos Bíblicos. El uso de esta herramienta creará el libro GLO por usted. Busque "glosario" en la Ayuda para más información.',
              pt: 'Rascunho do Glossário. O glossário é um dos livros que ocorrem após o Apocalipse, e seu nome abreviado é GLO. \nRecomenda-se adicionar entradas de glossário utilizando a ferramenta de termos bíblicos. O uso desta ferramenta criará o livro GLO para você. \nProcure "glossário" em Ajuda para ter mais informações.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: '2913d3d8-3691-4576-95bb-4c9cd7f03adb',
            names: {
              en: 'Insert illustrations',
              fr: 'Insertion des illustrations',
              'zh-Hans': '插入插图',
              es: 'Insertar Ilustraciones',
              pt: 'Inserir Ilustrações',
            },
            descriptions: {
              en: 'Make initial decisions on illustrations. If captions contain text not\ndirectly from the scriptures, they should be consultant checked. This\nshould be done in conjunction with the publications department. Sample\nillustrations can be seen at:\nhttps://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              fr: 'Faites un premier choix pour les illustrations. Si les légendes contiennent du texte qui ne provient pas directement du texte biblique, elles doivent être vérifiées par un conseiller et le département de publications. Pour voir un échantillon d’illustrations allez sur:\nhttps://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              'zh-Hans':
                '初步决定使用哪些插图。如果插图标题包含非直接引用经文的文本，就必须要求翻译顾问检查文本。这应该与出版部门一起完成。示例插图可在以下位置找到：\n\nhttps://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              es: 'Empezar a tomar las decisiones iniciales sobre las ilustraciones a usar. Si los subtitulos no contienen texto directo de las Escrituras entonces deben ser revisados por el consultor. Esto debe hacerse en coordinación con el departamento de Publicaciones. Se puede ver ejemplos de ilustraciones en:\nhttps://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              pt: 'Faça as primeiras decisões sobre ilustrações. Se as legendas contiverem texto não diretamente das escrituras, elas devem ser checadas pelo consultor.\nIsso deve ser feito em conjunto com o departamento de publicações. Exemplos de ilustrações podem ser vistos em:\nhttps://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
        ],
      },
      {
        id: '9443afef-8302-4727-8f85-1cb4ef464168',
        names: {
          en: 'Team Checking',
          fr: 'Vérification en équipe',
          'zh-Hans': '翻译小组的检查',
          es: 'Comprobaciones realizadas por el Equipo',
          pt: 'Verificação em Equipe',
        },
        descriptions: {},
        tasks: [
          {
            id: '7bebeaeb-5932-4232-add9-22f60ac05007',
            names: {
              en: 'Naturalness check',
              fr: 'Vérification du naturel du texte',
              'zh-Hans': '检查译文的自然度',
              es: 'Comprobando la naturalidad del Texto',
              pt: 'Verificar de naturalidade do Texto',
            },
            descriptions: {
              en: 'This check is done by the translation team (Read the draft, check the general flow of the discourse, its logic, chronology, participant reference, sentence length & rhythm, language style and register, etc.)',
              fr: 'L’équipe de traduction fait cette vérification. Elle consiste à lire le texte en prêtant attention au naturel du discours, à sa logique, à la chronologie, la référence aux participants, la longueur des phrases, le style et le registre de la langue, etc.',
              'zh-Hans':
                '这项检查由翻译小组进行（阅读初稿，检查语篇是否流畅，检查它的逻辑、年代顺序、经文中出现的所指对象（participant reference）、句子长度和节奏、语言风格和语言方式等。）',
              es: 'Este chequeo es realizado por el equipo de traducción (Leer el borrador, comprobar el flujo general del discurso, su lógica, cronología, referencia del participante, duración y ritmo de la oración, estilo del lenguaje y registro, etc.)',
              pt: 'Esta verificação é feita pela equipe de tradução (lê-se o rascunho, verifica o fluxo geral do discurso, sua lógica, cronología, referência do participante, duração e ritmo da oração, estilo de linguagem e registro, etc.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '3480d1ca-6ee7-40eb-a31e-f0e06dbf73a8',
            names: {
              en: 'Exegetical check',
              fr: 'Vérification de l’exégèse',
              'zh-Hans': '经文解释的检查',
              es: 'Chequeo Exegético',
              pt: 'Verificação exegética',
            },
            descriptions: {
              en: 'This check is done by the translation team. Compare the draft with one or two translations in the national language, discuss exegetical choices that have been made in the translation, identify possible exegetical mistakes in the translation; identify any missing verses or sentences.)',
              fr: 'L’équipe de traduction fait cette vérification. Il s’agit de comparer le texte traduit avec une ou deux traductions dans une langue véhiculaire, de discuter des choix exégétiques qui ont été faits pendant la traduction, d’identifier d’éventuelles erreurs exégétiques dans la traduction et de vérifier que rien ne manque (ni versets, ni parties de versets).',
              'zh-Hans':
                '这项检查由翻译小组进行（用一个或两个本国语言的译本与初稿作一比较，讨论翻译中对经文解释方面的选择，识别翻译中可能有错的经文解释；识别是否有漏译的经节或句子。）',
              es: 'Este chequeo es realizado por el equipo de traducción. Comparar el borrador con una o dos traducciones en el idioma nacional, discutir las opciones exegéticas que se hicieron en la traducción, identificar posible errores exegéticos en la traducción; identificar cualquier versículo u oración faltantes.',
              pt: 'Esta verificação é feita pela equipe de tradução. Compare o rascunho com uma ou duas traduções na língua nacional, discutir as escolhas exegéticas que foram feitas na tradução, identificar possíveis erros exegéticos na tradução; Identificar quaisquer versículos ou sentenças ausentes.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '8ca385ae-24ad-41ab-8a63-707505e039a1',
            names: {
              en: 'Proper names check',
              fr: 'Vérification des noms propres',
              'zh-Hans': '专有名词的检查',
              es: 'Comprobación de Nombres Propios',
              pt: 'Verificação dos Nomes Próprios',
            },
            descriptions: {
              en: 'Verify that proper names have been transliterated according to agreed upon rules, and are consistent. Verify that capitalization has been done correctly and consistently. For languages with word level and grammatical honorifics, verify that they are used correctly. The Greek and Hebrew texts will not have the level of honorifics that some languages will need. Therefore Paratext cannot check for them reliably. Paratext can help if you add the honorifics plus the name as an acceptable rendering for a name, but only native speakers can say for a given instance of a name whether a honorific is required or not. Note: The Biblical terms tool can help with the verification of names if the list is filtered for the "Names" category. The Biblical terms tool will not find instances of a name in book introductions, section headings, footnotes, illustration captions and glossary entries. You will have to find the proper names in these locations manually.',
              fr: 'Il s’agit de vérifier que les noms propres ont été translittérés selon les règles convenues et de manière cohérente et que les majuscules sont mises là où il le faut. L’outil « Termes bibliques » peut aider à vérifier les noms si on applique le filtre « Noms propres » à la liste des noms. Cependant, cet outil ne tient pas compte des noms propres dans les introductions des livres, dans les en-têtes de section, dans les notes de bas de page, ni dans les entrées du glossaire. À ces endroits, on est obligé de vérifier les noms propres manuellement.',
              'zh-Hans':
                '确定专有名词已经按照商定的规则来进行音译，并且是一致的。确定专有名词的大写是正确和一致的。对于用语要分层次和语法中有敬语的语言，要确定这些都用得正确。希腊语和希伯来语原文文本不一定具备某些语言所需要的不同层次的敬语。因此，《圣经辅助工具》无法可靠地进行这类检查。你若添加了一些带敬语的名字作为某个名字可接受的译法，《圣经辅助工具》也可以帮助检查，但只有说本地语的人能分辨什么时候需要有敬语，什么时候不需要。注意：“圣经专门用词”工具可以有助验证这些名字，只需要在列表中为“名字”的类别进行筛选。“圣经专门用词”工具不会在书卷简介、分段标题、脚注、插图标题和词汇表条目中查找名字。你需要在这些位置手动查找所有的专有名词。',
              es: 'Verificar que los nombres propios hayan sido transliterados consistentemente de acuerdo a las reglas acordadas con anterioridad. Compruebe que las capitalización se haya realizado correctamente y de forma coherente. Verificar que los idiomas con nivel de palabra (Word Level) y honoríficos gramaticales (grammatical honorifics) sean usados correctamente. Textos hebreos y griegos no tendrán el nivel de honorificos que algunas lenguas necesitarán. Por lo tanto ParaTExt no podrá comprobarlos de forma segura. ParaTExt puede ayudar si se agrega los honoríficos más el nombre como una traducción aceptable para el nombre, pero sólo nativo hablantes pueden decir si un honorífico es necesario o no para una instancia dada de un nombre. Nota: La herramienta de Vocablos Bíblicos puede ayudar con la verificación de nombres si la lista usa el filtro de Categoría "Nombres". La herramienta de Vocablos Bíblicos no encontrará instancias de un nombre en las instroducciones de los libros, encabezamientos de sección, notas de pie de página, subtítulos de ilustraciones y entradas de glosario. Se tendrá que encontrar los nombres propios en estas ubicaciones manualmente.',
              pt: 'Verifica se os nomes próprios foram transliterados de acordo com regras acordadas e são consistentes. Verifica se as capitalização foi feita corretamente e consistentemente. Para idiomas com nível de palavra e honoríficos gramaticais, verifique se eles são usados corretamente. Os textos grego e hebraico não terão o nível de honoríficos que algumas línguas necessitarão. Portanto, o Paratext não pode verificá-los de forma confiável. O Paratext pode ajudar se você adiciona os honoríficos mais o nome como uma tradução aceitável para o nome, mas somente falantes nativos podem decidir para uma determinada instância se um honorífico é necessário ou não. Nota: A ferramenta de termos bíblicos pode ajudar na verificação de nomes se a lista for filtrada para a categoria "Nomes". A ferramenta de termos bíblicos não encontrará instâncias de um nome em introduções de livros, títulos de seção, notas de rodapé, legendas de ilustração e entradas de glossário. Você terá que encontrar os nomes próprios nesses locais manualmente.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '5908f5a3-33bd-4929-bff3-692bb7189c22',
            names: {
              en: 'Biblical key terms check',
              fr: 'Vérification des termes bibliques',
              'zh-Hans': '主要圣经专门用词的检查',
              es: 'Comprobación de Términos Clave',
              pt: 'Verificação dos Termos-chave bíblicos',
            },
            descriptions: {
              en: 'This check is done by the translation team (Identify the Biblical key terms in the passage, keyboard the renderings into the Biblical terms Tool, check the consistency of the Biblical key terms used in the passage with the terms documented in the Biblical terms Tool, discuss and document significant variations and/or alternatives that need to be discussed with the translation consultant), compare the draft with one or two translations in the national language, discuss exegetical choices that have been made in the translation, identify possible exegetical mistakes in the translation; identify any missing verses or sentences.)',
              fr: "Cette vérification doit être effectuée par l’équipe de traduction. Il s’agit d’identifier les principaux termes bibliques dans un passage, de saisir les équivalents dans l'outil « Termes bibliques », de vérifier que les équivalents ont été utilisés de manière cohérente dans des contextes appropriés, de discuter et documenter des variations importantes et/ou des alternatives qui doivent être discutées avec le conseiller et de comparer le texte avec une ou deux traductions dans une langue véhiculaire.",
              'zh-Hans':
                '这项检查由翻译小组进行（在经文段落中识别主要圣经专门用词，把译法输入到“圣经专门用词”工具中，检查经文段落中使用的主要圣经专门用词与“圣经专门用词”工具中所记录的专门用词是否一致，讨论和记录重要的差异和／或需要与翻译顾问讨论的替代选项，用一个或两个本国语言的译本与初稿做一比较，讨论翻译中对经文解释方面的选择，识别翻译中可能有错的经文解释；识别是否有漏译的经节或句子。）',
              es: 'Este chequeo es realizado por el equipo de traducción (Identificar los términos clave bíblicos en el pasaje, ingresar los terminos generados en la herramienta de Vocablos Bíblicos, compruebar la consistencia de los términos clave usados en el pasaje con los términos documentados en la herramienta de Vocablos Bíblicos, discutir y documentar variaciones significativas y/o alternativas que necesiten ser comentados con el consultor de traducción), comparar el borrador con una o dos traducciones en el idioma nacional, discutir las decisiones exegéticas que se han hecho en la traducción, identificar posibles errores exegéticos en la traducción; Identificar cualquier versículo u oración que falte.)',
              pt: 'Essa verificação é feita pela equipe de tradução (Identificar os termos-chave bíblicos na passagem, digitar os termos generados na ferramenta de termos Bíblicos, Verifique a consistência dos termos-chave bíblicos usados na passagem com os termos documentados na ferramenta de termos bíblicos, discutir e documentar variações significativas e/ou alternativas que precisam ser discutidas com o consultor de tradução), comparar o rascunho com uma ou duas traduções na língua nacional, discutir as escolhas exegéticas que foram feitas na tradução, identificar possíveis erros exegéticos na tradução; identificar quaisquer versículos ou frases que faltam.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '386e0970-f1fc-4ce9-bffa-c2d92a772fc1',
            names: {
              en: 'Run "Spell Check Current Book"',
              fr: "Activation de l’outil « Vérifier l'orthographe du livre actuel »",
              'zh-Hans': '给当前书卷运行“拼写检查”',
              es: 'Ejecutar "Verificar ortografía de este libro:"',
              pt: 'Verificar ortografia no livro atual',
            },
            descriptions: {
              en: 'Under the Checking Menu is "Spell Check Current Book", click on this and accept or correct the spelling of all of the words present. For those that need more discussion open the wordlist tool and add a spelling discussion note.',
              fr: "Dans le menu « Vérification », cliquez sur « Vérifier l'orthographe du livre actuel ». Acceptez ou corrigez l’orthographe de tous les mots. Si vous devez discuter l’orthographe de certains mots en équipe, ouvrez l’outil « Liste de mots » et ajoutez une note de discussion d’orthographe.",
              'zh-Hans':
                '在“检查”菜单下有“给当前书卷运行‘拼写检查’”的选项，单击这个选项，然后接受或纠正所有出现字词的拼写。至于需要更多讨论的字词，请打开“词表”工具，然后添加一个拼写讨论附注。',
              es: 'Bajo el menú Verificación haga click en la opción "Verificar ortografía de este libro:", luego acepte a corrija la ortografía de todas las palabras listadas. Para aquellas palabras que necesiten más discusión, abra la herramienta Lista de Palabras y agregar una nota de ortografía.',
              pt: 'Sob o menu de Verificação clique na opção "Verificar ortografia no livro atual" e aceite ou corrija a ortografia de todas as palavras presentes. Para aquelas palavras que precisam de mais discussão, abra a ferramenta Lista de Palavras e adicione uma nota de discussão ortográfica.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'a54b251a-daee-4366-9431-ebe4a5f0a210',
            names: {
              en: 'Section breaks and headings - format check',
              fr: 'Vérification des sauts de section et en-têtes de section',
              'zh-Hans': '分段符和标题 – 格式检查',
              es: 'Saltos de sección y encabezados - chequeo de formato',
              pt: 'Títulos de seções - verificação de formatação',
            },
            descriptions: {
              en: 'Discuss the format used in the translation and check if this is consistent with the agreed upon model translation (if there is one). Formatting to be checked includes but is not limited to: prose format, indented poetry format, differences in format in the translation and introductions. If another translation is used as a model then this check can be done using Tools > Checklists > Compare Section Headings',
              fr: 'Vérifiez que le formatage utilisé est conforme à la traduction modèle que l’équipe utilise (si un modèle a été choisi). Ce formatage inclut, entre autres : la mise en forme de la prose, de la poésie et de l’introduction. Si une autre traduction est utilisée comme modèle, cette vérification peut se faire à l’aide d’« Outils » > « Listes récapitulatives » > « En-têtes de section ».',
              'zh-Hans':
                '彼此讨论译文中使用的格式，检查这格式与商定的范本译本（若有）是否一致。需要检查的格式包括（但不限于）以下各项：散文（或叙述文）格式，诗歌的缩排格式，译文与简介的不同格式。若是使用另一个译本作为范本，可以通过以下途径运行这项检查：“工具 ＞ 检查表工具（checklists） ＞ 比较分段标题”。',
              es: 'Discutir el formato usado en la traducción y comprobar si este es consistente con el modelo de traducción previamente acordado (si es que hubo alguno). El Formato a comprobar incluye, pero no se limita a: formato de prosa, formato de poesía con sangría, diferencias en el formato de traducción e introducciones. Si otra traducción es usada como modelo entonces esta comprobación se puede realizar usando Herramientas > Lista de verificaciones... > Comparar encabezados de secciones',
              pt: 'Discuta o formato usado na tradução e verifique se isso é consistente com a tradução de modelo acordada (se houver). A formatação a ser verificada inclui, mas não se limita a: formato de prosa, formato de poesia com recuo, diferenças do formato ne tradução e nas introduções. Se outra tradução for usada como um modelo, então essa verificação pode ser feita usando Ferramentas > Listas de verificação > Comparar Títulos de Seção',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '9cc94d91-bd01-418c-8bcd-c114e99b7d26',
            names: {
              en: 'Paragraph breaks - format check',
              fr: 'Vérification des sauts de paragraphe',
              'zh-Hans': '段落符 – 格式检查',
              es: 'Interrupciones de Párrafo - chequeo de formato',
              pt: 'Quebras de parágrafos - verificação de formatação',
            },
            descriptions: {
              en: 'Read the text and verify that the paragraph breaks are in the desired places. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\p, and \\m.',
              fr: 'Lisez le texte et vérifiez que les sauts de paragraphe sont aux endroits désirés. Si vous suivez une version modèle, ce contrôle peut être fait à l’aide d’« Outils » > « Listes récapitulatives » > « Marqueurs ». Comparez les marqueurs qui indiquent les sauts de paragraphe, tels que \\p et \\m.',
              'zh-Hans':
                '阅读文本，确定段落符都在想要放置的地方。若是使用另一个译本作为根据，可以通过以下途径运行这项检查：“工具 ＞ 检查表工具（checklists） ＞ 比较格式码”，然后寻找新的段落格式码，如：\\p，和 \\m。',
              es: 'Lea el texto y verifique que los saltos de párrafo estén en los lugares deseados. Si otra traducción es usada como modelo entonces esta comprobación se puede realizar usando Herramientas > Lista de verificaciones... > Comparar marcadores y buscar marcadores de nuevo párrafo como \\p, y \\m.',
              pt: 'Leia o texto e verifique se as quebras de parágrafo estão nos locais desejados. Se outra tradução for usada como uma base, então essa verificação pode ser feita usando a Ferramentas > Listas de verificação > Comparar marcadores e procure os novos marcadores de parágrafo como \\p e \\m.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '739ab389-cb89-4347-8c29-9c11bb673af7',
            names: {
              en: 'Layout and indents - format check',
              fr: 'Vérification de la mise en page et les mises en retrait',
              'zh-Hans': '版式和缩排 – 格式检查',
              es: 'Diseño y sangría - chequeo de formato',
              pt: 'Layout e recuos - verificação de formatação',
            },
            descriptions: {
              en: 'Verify other layout issues such as poetry. Particular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\q, \\q1 and \\q2.',
              fr: "Vérifiez les autres questions de mise en page. Pour les textes poétiques, attention aux mises en retrait. Si vous suivez une version modèle, ce contrôle peut être fait à l’aide d'« Outils » > « Listes récapitulatives » > « Marqueurs ». Recherchez les marqueurs de paragraphe ajoutés ou manquants comme \\q et \\q1 et \\q2.",
              'zh-Hans':
                '确定其他版式问题，如诗歌。要特别注意诗歌的缩排。若是使用另一个译本作为根据，可以通过以下途径运行这项检查：“工具 ＞ 检查表工具（checklists） ＞ 比较格式码”，然后寻找新的段落格式码，如：\\q， \\q1 和 \\q2。',
              es: 'Comprobar otros problemas de diseño como poesía. Debe prestarse especial atención a las sangrías en la poesía. Si otra traducción es usada como modelo entonces esta comprobación se puede realizar usando Herramientas > Lista de verificaciones... > Comparar marcadores y buscar marcadores de nuevo párrafo como \\q, \\q1 y \\q2.',
              pt: 'Verifique outros problemas de layout, como poesia. Deve-se dar atenção especial aos recuos de poesia. Se outra tradução for usada como uma base, então essa verificação pode ser feita usando a Ferramentas > Listas de verificação > Comparar marcadores e buscar os novos marcadores de parágrafo como \\q, \\q1 e \\q2.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '3d26c07e-637e-4e11-980d-3689884d7157',
            names: {
              en: 'Special formatting - format check',
              fr: 'Vérification de la mise en forme spéciale',
              'zh-Hans': '特殊格式 – 格式检查',
              es: 'Formato especial - chequeo de formato',
              pt: 'Formato especial - verificação de formatação',
            },
            descriptions: {
              en: 'See list of special formatting issues such as genealogies, words on the cross, letters, etc. Verify that text is marked using the correct standard format markers (USFMs). See http://paratext.org/about/usfm for latest guide to using USFMs.',
              fr: 'Consultez la liste des cas spéciaux de mise en forme (les généalogies, les mots sur la croix, les épîtres, etc.). Vérifiez que les marqueurs de formatage standard (UFSM) sont corrects et bien placés. Voyez http://paratext.org/about/usfm pour le guide d’utilisation des marqueurs USFM le plus récent.',
              'zh-Hans':
                '见特殊格式问题列表，如：家谱、十字架上的字词、信件等。确定文本是使用正确的“标准格式格式码”（USFM）来标记。有关使用 USFM 的最新指南，见 http://paratext.org/about/usfm。',
              es: 'Consulte la lista de problemas especiales de formato tales como en genealogías, palabras en la cruz, cartas, etc. Verifique que el texto use marcadores bajo el correcto estándar (USFM). Consultar http://paratext.org/about/usfm para obtener la guía más reciente sobre el uso de USFM.',
              pt: 'Veja a lista de questões especiais de formatação, como genealogias, palavras na cruz, letras, etc.Consulte a lista de problemas especiales de formato tales como en genealogías, palabras en la cruz, cartas, etc. Verifique que el texto use marcadores bajo el correcto estándar (USFM). Consultar http://paratext.org/about/usfm para obtener la guía más reciente sobre el uso de USFM.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '0b6cbd07-9f68-4ec9-9eb6-684ce68f7dac',
            names: {
              en: 'Print preliminary version',
              fr: 'Impression de l’ébauche provisoire',
              'zh-Hans': '打印初版',
              es: 'Imprimir Versión Preliminar',
              pt: 'Imprimir versão preliminar',
            },
            descriptions: {
              en: 'Open the "Assignments and Progress" window and correct all errors/issues shown there. Once all errors are corrected and open notes are resolved, print a copy of the books or chapters to be reviewed by community group. The two simplest ways to print text from Paratext are found under the "File" menu. They are "Print Draft" and "Save as RTF". There are other methods available for more advanced formatting, such as "Export to Pathway". Use the method specified by your project administrator or translation consultant.',
              fr: 'Ouvrez la fenêtre « Affectations et progrès[a]  » et corrigez tout problème ou erreur signalé. Une fois que toutes les erreurs sont corrigées et les notes résolues, imprimez un exemplaire des livres ou chapitres qui devront être examinés par les réviseurs. Pour imprimer, allez dans le menu « Fichier » et choisissez soit « Imprimer ébauche », soit « Enregistrer en RTF ». Il existe d’autres méthodes disponibles pour une mise en forme plus avancée, telles qu’« Exporter à Pathway ». Utilisez la méthode demandée par votre administrateur de projet ou conseiller en traduction.',
              'zh-Hans':
                '打开“工作分配和进度”窗口，然后改正所有在窗口中显示的错误／问题。改正所有错误和解决所有未解决的附注之后，打印一些书卷或章，交给该语言群体中的公众审阅者审阅。要从《圣经辅助工具》打印文本，两种最简单的方法可见于“文件”菜单，就是“打印草稿”和“另存为 RTF 文件”。较高级的格式还可以使用其他的方法，如“导出至 Pathway 软件”。请使用项目管理员或翻译顾问所指定的方法。',
              es: 'Abrir la ventana "Asignaciones y Progreso" y corregir todos los errores/problemas mostrados allí. Una vez corregidos los problemas y las nostas sean resueltas, imprima una copia de los libros o capítulos para que sean revisados por el grupo de la comunidad. La dos formas más sencillas de imprimir texto desde ParaTExt se encuentran bajo el menú "Archivo". Estos son "Imprimir borrador..." y "Guardar como RTF...". Otros métodos están disponibles que permiten un formato más avanzado, como "Exportar a Pathway". Use el método especificado por el administrador del proyecto o por el consultor de traducción.',
              pt: 'Abra a janela "Atribuições e Progresso" e corrija todos os erros/problemas mostrados lá. Depois que todos os erros forem corrigidos e as notas abertas forem resolvidas, imprima uma cópia dos livros ou capítulos a serem revisados pelo grupo da comunidade. As duas formas mais simples de imprimir texto no Paratext estão localizadas no menu "Arquivo". Elas são "Imprimir rascunho..." e "Salvar como RTF...". Há outros métodos disponíveis que permitem un formato mais avançado, como "Exportar para Pathway". Use o método especificado pelo administrador do projeto ou pelo consultor de tradução.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '75365725-9717-46de-85f9-413d44af9b59',
            names: {
              en: 'Prepare for comprehension testing',
              fr: 'Préparation pour les tests de compréhension',
              'zh-Hans': '准备理解译文测试',
              es: 'Preparación para la prueba de comprensión',
              pt: 'Preparo para o teste de compreensão',
            },
            descriptions: {
              en: 'This is comprehension testing done with members of the language community who were not involved in preparing the Preliminary Version of the text. (Re-read the translation draft; Draft general retell questions for comprehension testing; Identify possible issues of misunderstanding; Draft specific questions related to the main events in the passage, participant reference, key terms, foreign concepts, metaphors, rhetorical questions, inferential information, positive or negative associations, etc.)',
              fr: 'Il s’agit de tests de compréhension faits avec des membres de la communauté de langue qui n’ont pas été impliqués dans la préparation de l’ébauche du texte. Relisez le texte traduit et rédigez des questions pour les tests de compréhension. Pour cela, identifiez les problèmes d’incompréhension potentiels; rédigez des questions spécifiques ayant trait aux événements principaux dans le passage, aux références aux participants, aux termes clés, aux concepts étrangers, aux métaphores, questions rhétoriques, informations inférées, associations positives ou négatives, etc.',
              'zh-Hans':
                '这项理解译文的测试是与语言群体中没有参与准备文本初稿的人一起去做。（重新阅读译稿；为理解译文测试拟定一般性的复述问题；识别可能出现的误解；拟定一些具体问题，例如与关乎经文中的主要事件、经文中出现的所指对象（participant reference）、主要圣经用词、外来的观念、比喻、修辞性疑问句、推理信息、正面或负面的关联等。）',
              es: 'Se trata de pruebas de comprensión hechas con miembros de la comunidad lingüística que no estuvieron involucrados en la preparación de la Versión Preliminar del texto. (Releyendo el borrador de la traducción; redactar preguntas generales para las pruebas de comprensión, identificación de posibles problemas de malentendidos, redactar preguntas específicas relacionadas con los principales eventos del pasaje, referencia de los participantes, términos clave, conceptos ajenos a la cultura, metáforas, preguntas retóricas, información inferencial , asociaciones positivas o negativas, etc.)',
              pt: 'Este é um teste de compreensão realizado com membros da comunidade linguística que não estavam envolvidos na preparação da Versão Preliminar do texto. (Relê o rascunho da tradução; Rescrever perguntas gerais para testes de compreensão; Identificar possíveis problemas de mal-entendido; Esboçar questões específicas relacionadas aos principais eventos da passagem, referência de participante, termos-chave, conceitos desconhecidos, metáforas, perguntas retóricas, informação implícita, associações positivas ou negativas, etc.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
        ],
      },
      {
        id: '20974cee-9f40-43c4-a0ae-5e733238e134',
        names: {
          en: 'Preparing for the consultant check',
          fr: 'Préparation du texte pour la vérification du conseiller en traduction',
          'zh-Hans': '为顾问检查做准备',
          es: 'Preparación para el chequeo con el Consultor',
          pt: 'Preparo para a verificação do Consultor',
        },
        descriptions: {},
        tasks: [
          {
            id: 'e2642958-0d86-450b-8c6d-df076b05ab5f',
            names: {
              en: 'First comprehension testing',
              fr: 'Premier test de compréhension',
              'zh-Hans': '第一次译文理解测试',
              es: 'Primera prueba de comprensión',
              pt: 'Primeiro teste de compreensão',
            },
            descriptions: {
              en: 'In this plan it is assumed that any checks found unfinished from a previous stage should be dealt with appropriately. NOTE: if a check from a previously completed stage is found to have errors it will show up in the current working stage.\nWhile supplementary helps are specifically mentioned in the drafting section, it is assumed that all other checks will also be completed on supplementary materials and that these are a part of the final text.',
              fr: 'Tout contrôle inachevé lors d’une étape précédente doit être traité de façon appropriée. N.B. Si un contrôle d’une étape déjà complétée présente des erreurs, elles s’afficheront dans l’étape en cours. Il faut également effectuer tous les contrôles pour toutes les aides paratextuelles ainsi que les sections liminaires et annexes qui font partie du texte final.',
              'zh-Hans':
                '在这计划中，任何前一阶段未完成的检查都应适当地加以处理。注意：如果前一个完成阶段的检查中出现错误，这情况会在当前的工作阶段中显示出来。\n\n初稿部分特别提到一些辅助性的帮助材料，这里假设所有其他关乎补充材料的检查也会完成，并且是最后文本的一部分。',
              es: 'En este plan se supone que cualquier chequeo de una etapa anterior que no haya sido finalizado debe ser procesado apropiadamente. NOTA: si un chequeo de una etapa previamente completada muestra errores, estos aparecerán en la etapa de trabajo actual.\nSi bien ayudas suplementarias son mencionadas específicamente en la sección de redacción, se supone que todos los demás chequeos también se realizarán en los materiales complementarios y que éstos forman parte del texto final.',
              pt: 'Neste plano, presume-se que qualquer verificação inacabada  durante uma etapa anterior deve ser tratada de forma adequada. NOTA: se uma verificação de uma etapa já concluída contém erros, eles serão exibidos na etapa atual.\nEmbora as ajudas suplementares sejam especificamente mencionadas na seção de rascunho, presume-se que todos os outros controles serão igualmente preenchidos com materiais suplementares e que estes são parte do texto final.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '17f2161c-086e-4016-975d-c58dfb7f55cf',
            names: {
              en: 'First revision',
              fr: 'Première révision',
              'zh-Hans': '第一次修订',
              es: 'Primera revisión',
              pt: 'Primeira revisão',
            },
            descriptions: {
              en: 'The team discusses the comments from first comprehension testing and revises the text where appropriate. (Resolve any issues documented by project, spelling and rendering notes.)',
              fr: 'L’équipe examine les commentaires des premiers tests de compréhension et révise le texte si nécessaire. (Résoudre tous les problèmes liés au projet, à l’orthographe et à la traduction.)',
              'zh-Hans':
                '翻译小组讨论第一次译文理解测试所得出的意见，并适当地修订文本。（解决所有用项目附注以及拼写和译法附注记录的问题。）',
              es: 'El equipo discute los comentarios de la primera prueba de comprensión y revisa el texto donde sea necesario. (Resuelva cualquier problema documentado por el proyecto, la ortografía y las notas de traducción.)',
              pt: 'A equipe discute os comentários dos primeiros testes de compreensão e revisa o texto onde for necessário. (Resolver todos os problemas relacionados com o projeto, ortografia e tradução.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'b5c6a130-0254-407b-963f-856f580d3698',
            names: {
              en: 'Print first revision',
              fr: 'Impression de la première révision',
              'zh-Hans': '打印第一次修订文本',
              es: 'Imprimir la Primera Versión',
              pt: 'Impressão da primeira revisão',
            },
            descriptions: {
              en: 'Print chapter(s) or book(s) being reviewed using method specified by project administrator or translation consultant.',
              fr: 'Imprimez les chapitres ou le livre en cours de révision en utilisant la méthode demandée par l’administrateur du projet ou le conseiller en traduction.',
              'zh-Hans': '使用项目管理员或翻译顾问指定的方法打印（一个或多个）章或书卷。',
              es: 'Imprima el(los) capítulo(s) o libro(s) que está(n) siendo revisado(s) usando el método especificado por el administrador del proyecto o por el consultor de traducción',
              pt: 'Imprimir capítulo(s) ou livro(s) sob revisão usando o método solicitado pelo gerente de projeto ou o consultor de tradução.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '986ee40b-6f38-400a-b7f0-b6085faeb476',
            names: {
              en: 'Second comprehension testing',
              fr: 'Deuxième test de compréhension',
              'zh-Hans': '第二次译文理解测试',
              es: 'Segunda prueba de comprensión',
              pt: 'Segundo teste de compreensão',
            },
            descriptions: {
              en: 'This check is done with a group of UNSs (Read the first revision of the passage; ask general retell questions; ask follow up questions; document problems of understanding that need to be fixed in the translation; issues related to spelling should be documented with a spelling note in the word list tool, and issues related to rendering words should be documented with a rendering note in the Biblical terms tool. Also note any changes related to improved naturalness of the draft)',
              fr: 'Ce contrôle s’effectue avec un groupe de locuteurs natifs non initiés : leur lire la première révision du passage, poser des questions générales et de suivi et noter les problèmes de compréhension qui doivent être corrigés dans la traduction. Les questions liées à l’orthographe doivent être consignées dans une note d’orthographe dans l’outil « Liste de mots ». Les questions associées aux équivalents des termes bibliques doivent être consignées dans une note dans l’outil « Termes bibliques ». Notez également tout changement qui a été fait pour améliorer la langue dans le texte.',
              'zh-Hans':
                '这项检查与一个 UNS 小组一起去做（阅读经文的第一个修订文本；发问一般性的复述问题；发问后续的问题；记录需要在翻译中处理的理解问题；关乎拼写的问题要在“词表”工具用拼写附注来记录，关乎字词译法的问题要在“圣经专门用词”工具用译法附注来记录。同时注意任何与改进初稿自然度相关的更改。）',
              es: 'Este control se realiza con un grupo de UNS (leer la primera revisión del pasaje, hacer preguntas generales, hacer preguntas de seguimiento, documentar problemas de comprensión que deben ser arreglados en la traducción, cuestiones relacionadas con la ortografía deben ser documentados con una nota de ortografía en la herramienta lista de palabras, y temas relacionados con la generación de palabras traducidas deben ser documentados con una nota de traducción en la herramienta vocablos bíblicos. También tenga en cuenta los cambios relacionados con la mejora de la naturalidad de la redacción del borrador)',
              pt: 'Este controle é feito com um grupo de falantes nativos não iniciados (eles lêem a primeira revisão da passagem, fazer perguntas gerais e para monitorar e registra a compreensão de problemas que devem ser corrigidos na tradução, questões relacionadas com a ortografia devem ser registadas numa nota ortografia na ferramente lista de palavras, e os problemas associados com os termos bíblicos equivalentes devem ser registados na ferramenta de termos bíblicos. Observe também que qualquer alteração foi realizada para melhoria da naturalidade do rascunho)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '3fde76e5-bc52-419c-8a08-f4f68d876742',
            names: {
              en: 'Second revision',
              fr: 'Deuxième révision',
              'zh-Hans': '第二次修订',
              es: 'Segunda revisión',
              pt: 'Segunda revisão',
            },
            descriptions: {
              en: 'The team discusses the comments from first comprehension testing and revises the text where appropriate. (Resolve any issues documented by project, spelling and rendering notes.)',
              fr: 'L’équipe examine les commentaires du deuxième test de compréhension et révise le texte si nécessaire. (Résoudre tous les problèmes liés au projet, à l’orthographe et à la traduction.)',
              'zh-Hans':
                '翻译小组讨论第一次译文理解测试所得出的意见，并适当地修订文本。（解决所有用项目附注以及拼写和译法附注记录的问题。）',
              es: 'El equipo discute los comentarios de las primera prueba de comprensión y revisa el texto donde sea necesario. (Resuelva cualquier problema documentado por el proyecto, la ortografía y las notas de traducción.)',
              pt: 'A equipe discute os comentários dos primeiros testes de compreensão e revisa o texto onde for necessário. (Resolver todos os problemas relacionados com o projeto, ortografia e tradução.)',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '6a15bff7-ae13-45cc-b393-82eee01ff8ae',
            names: {
              en: 'Comprehension testing of supplementary materials',
              fr: 'Test de compréhension des aides paratextuelles',
              'zh-Hans': '补充材料的理解测试',
              es: 'Prueba de comprensión de materiales complementarios',
              pt: 'Teste de compreensão dos materiais suplementares',
            },
            descriptions: {
              en: 'Working with a group of UNSs, test any supplementary materials that have not already been tested. This would most likely include but is not limited to: glossary entries, illustration captions and book introductions.',
              fr: 'Avec un groupe de locuteurs de la langue qui ne connaissent pas le texte traduit, testez tous les aides paratextuelles ainsi que les sections liminaires et annexes qui n’ont pas déjà été testées (entrées du glossaire, légendes des illustrations et introductions de livre).',
              'zh-Hans':
                '与一个 UNS 小组合作，测试任何尚未测试的补充材料。当中极可能会包括但不限于：词汇表条目，图表标题和书卷简介。',
              es: 'Trabajando con un grupo de UNS, chequee cualquier material suplementario que no haya sido comprobado. Esto probablemente incluirá, pero no se limitará a: entradas de glosario, subtítulos de ilustración e introducciones de libros.',
              pt: 'Com um grupo de falantes da língua que não conhecem o texto traduzido, avaliar todos os materiais suplementares que não tenham sido testadas (Entradas do glossário, legendas das ilistrações e Introdução dos livros).',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'e5be1d89-7c8f-433f-888e-f59fe36c6b7b',
            names: {
              en: 'Revision of supplementary materials',
              fr: 'Révision des aides paratextuelles',
              'zh-Hans': '修订补充材料',
              es: 'Revisión de material suplementario',
              pt: 'Revisão dos materiais suplementares',
            },
            descriptions: {
              en: 'The team discusses the comments from the comprehension testing of supplementary materials and revises the text where appropriate.',
              fr: 'Examinez les remarques soulevées par le test de compréhension et révisez les aides paratextuelles ainsi que les sections liminaires et annexes si nécessaire.',
              'zh-Hans': '翻译小组讨论补充材料理解测试所得出的意见，并适当地修订文本。',
              es: 'El equipo discute los comentarios hechos durante las pruebas de comprensión de los materiales suplementarios y revisa el texto donde sea necesario.',
              pt: 'A equipe discute os comentários dos testes de compreensão de materiais complementares e revisa o texto, se necessário.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'f8afb80c-dab6-470b-a564-89b3d44dbaad',
            names: {
              en: 'Update Biblical terms tool',
              fr: 'Mettre à jour les équivalents des termes bibliques',
              'zh-Hans': '更新“圣经专门用词”工具',
              es: 'Actualizar la herramienta de Vocablos Bíblicos',
              pt: 'Atualização de Termos Bíblicos',
            },
            descriptions: {
              en: 'Open Biblical terms tool and filter for chapter(s) being prepared for consultant check. Verify that all the Biblical terms have approved renderings. Update any that are missing, or need to be changed because of a better understanding of what the Greek or Hebrew means. It is likely some are out-of-date, because of the revisions made after comprehension testing.',
              fr: 'Ouvrez l’outil « Termes bibliques » et sélectionnez les chapitres qui doivent être contrôlés par le conseiller. Vérifiez que tous les termes bibliques ont des équivalents approuvés. Mettez à jour la liste : ajoutez ceux qui manquent et modifiez ceux qui doivent l’être à cause d’une meilleure compréhension de leur sens en grec ou en hébreu ou à cause des révisions faites suite aux tests de compréhension.',
              'zh-Hans':
                '打开“圣经专门用词”工具，筛选出一些篇章以便翻译顾问进行检查。确定所有“圣经专门用词”已经有核准的译法。更新缺失的译法，或由于进一步理解希腊语或希伯来语的意思而更改的译法。当中有些极可能已经过期，因为译文理解测试后已有修订。',
              es: 'Abra la herramienta de Vocablos Bíblicos y filtre los resultados para que muestre(n) el(los) capítulo(s) preparado(s) para el chequeo del Consultor. Compruebe que todos los términos clave hayan sido aprobados. Actualize cualquier término ausente, o que necesite ser cambiado debido a un mejor entendimiento del significado del término en Griego o Hebreo. Es probable que algunos estén desactualizados, debido a las revisiones hechas luego de las pruebas de comprensión.',
              pt: 'Abra a ferramenta "termos bíblicos" e selecione o(s) capítulo(s) para ser(em) verificado(s) pelo Consultor. Verifique se todos os termos bíblicos foram aprovados. Atualizar qualquer termo ausente, ou que necessita ser editado devido a uma melhor compreensão de seu significado em grego ou hebraico. É provável que alguns estejam desactualizados devido às revisões feitas após o teste de compreensão.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'fa01aafa-8b8f-489b-99d2-4cf63cdb53ea',
            names: {
              en: 'Grammar and discourse write up',
              fr: 'Esquisse grammaticale et analyse du discours',
              'zh-Hans': '关于语法和语段的详细描写',
              es: 'Redacción Gramatical y discursos',
              pt: 'Esboço gramatical e da análise do discurso',
            },
            descriptions: {
              en: 'Prepare or revise a write up relevant grammar and discourse analysis and send to the translation consultant. A list of all connector words would be especially helpful for the consultant.',
              fr: "Rédigez une analyse concise de la grammaire et du discours et envoyez-le au conseiller. N'oubliez pas d’inclure une liste de tous les connecteurs employés dans la traduction, ce qui sera très utile pour le conseiller.",
              'zh-Hans':
                '准备或修订一份相关语法和语段分析的详细描写，然后发送给翻译顾问。列出所有连接字词的列表会对翻译顾问特别有用。',
              es: 'Preparar o revisar un análisis gramatical y discursivo pertinente y enviarlo al consultor de traducción. Una lista de todas las palabras conectoras sería especialmente útil para el consultor.',
              pt: 'Preparar ou revisar uma análise relevante da gramatica e do discurso para ser enviado ao consultor de tradução. Não se esqueça de incluir uma lista de todos os conectores usados na tradução, o que será muito útil para o consultor.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '0b6970df-00ce-4da4-a46a-28be4c7f2e6a',
            names: {
              en: 'Draft the back translation',
              fr: 'Rédaction de la retraduction',
              'zh-Hans': '草拟回译',
              es: 'Redactar la Retro Traducción',
              pt: 'Rascunho da Retrotradução',
            },
            descriptions: {
              en: 'A back-translation is a translation into the major national or trade language of the area. It should be done by a speaker of the language other than the translator. It helps to show whether the translation is communicating effectively and accurately, and it serves as the basis for the consultant check.',
              fr: 'Une retraduction est une traduction dans une langue nationale ou véhiculaire du texte du projet. Cette retraduction est faite normalement par un locuteur de la langue autre que le traducteur. Cela permet de savoir si la traduction est claire et naturelle. La retraduction écrite sert aussi de texte de base au conseiller.',
              'zh-Hans':
                '回译就是翻译成该地区的主要国家或贸易语言。这步骤应该由译者以外的另一个说该语言的人来完成。这将显示翻译是否能准确有效地沟通，也可用作翻译顾问检查的根据。',
              es: 'Una retrotraducción es una traducción al idioma nacional o comercial del área. Debe ser hecho por un nativo hablante del idioma que no sea el traductor. Ayuda a demostrar si la traducción es comunicada con eficacia y precisión, y sirve como base para el chequeo del Consultor.',
              pt: 'A retrotradução é uma tradução na língua nacional ou comum da região. Esta retrotradução é normalmente feita por um falante da língua que não seja o tradutor. Isso permite saber se a tradução é clara e natural. E serve como base para verificação do Consultor.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '7c50ab22-d2cb-415b-b5b7-be52aaf02016',
            names: {
              en: 'Check back translation',
              fr: 'Vérification de la retraduction',
              'zh-Hans': '检查回译',
              es: 'Chequeo de la Retro Traducción',
              pt: 'Verificação da Retrotradução',
            },
            descriptions: {
              en: 'The team should verify that back translation is complete, and there are no missing words or phrases, so it is usable by consultant. The purpose of this check is not for the team to change what the back translator thinks the text means.',
              fr: 'L’équipe devrait vérifier que la retraduction est complète (pas de mots ou expressions qui manquent) avant de l’envoyer au conseiller. Le but de ce contrôle n’est pas de modifier ce que le retraducteur a écrit.',
              'zh-Hans':
                '翻译小组应确定回译是完整的，没有遗漏字词或片语，以便于顾问使用。这项检查的目的不是让翻译小组去改变回译者对文本意思的理解。',
              es: 'El equipo debe verificar que la retro traducción este completa, y que no existan palabras o frases faltantes, para que pueda ser usado por el Consultor. El propósito de esta comprobación no es para que el equipo cambie lo que el retro traductor piensa lo que significa el texto.',
              pt: 'A equipe deve verificar se a retrotradução está completa, e que não existam palavras ou frazes ausentes, para que possa ser utilizado pelo Consultor. O objetivo desta verificação não é alterar o que o retrotradutor pensa sobre o significado do texto.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
        ],
      },
      {
        id: 'b270751c-03d8-463b-abbf-5c8e3c4a188b',
        names: {
          en: 'Consultant Check',
          fr: 'Vérification par le conseiller en traduction',
          'zh-Hans': '翻译顾问检查',
          es: 'Comprobación con el Consultor',
          pt: 'Verificação do Consultor',
        },
        descriptions: {},
        tasks: [
          {
            id: 'fd6c2f9b-c34f-4762-bcd0-845ff03c1785',
            names: {
              en: 'Evaluation of text',
              fr: 'Évaluation du texte',
              'zh-Hans': '评价文本',
              es: 'Evaluación del Texto',
              pt: 'Avaliação do Texto',
            },
            descriptions: {
              en: 'Consultant evaluates the text and places notes with his observations in the text (or back translation). The evaluation should focus on accuracy, clarity, naturalness, and acceptability of the translation including all supplementary materials and illustrations used.',
              fr: 'Le conseiller évalue le texte et poste ses remarques dans le texte (ou la retraduction). L’évaluation doit porter sur l’exactitude, la clarté, le naturel et l’acceptabilité de la traduction, y compris des aides paratextuelles et des illustrations utilisées.',
              'zh-Hans':
                '翻译顾问评价文本，并把附注连同他在文本（或回译）中的观察所得写在附注中。评价的焦点应放在文本的准确、清晰、自然和翻译的可接受性，包括所有补充材料和所使用的例证。',
              es: 'El Consultor examina el texto y coloca notas con sus observaciones en el texto (o en la retro traducción). La evaluación debe concentrarse en la precisión, claridad, naturalidad y aceptabilidad de la traducción, incluyendo todas las ilustraciones y materiales complementarios.',
              pt: 'O Consultor examina o texto e faz notas com suas observações sobre o textos (ou sobre a retrotradução). A avaliação deve foca a precisão, claridade, naturalidade e aceitabilidade da tradução, incluindo todas as ilustrações e materiais complementares.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '25931f1d-cc55-46c9-a3e8-8f0bea379b90',
            names: {
              en: 'Consultant visit',
              fr: 'Vérification du conseiller en traduction',
              'zh-Hans': '翻译顾问的访问',
              es: 'Visita del Consultor',
              pt: 'Consultoria presencial',
            },
            descriptions: {
              en: 'Consultant interacts with the translation team concerning his observations about the text and supplementary materials, and gives assistance and advice as requested. The project administrator should give one team member (that could be himself) editing permission in the Assignments and Progress window for the "Consultant visit" task',
              fr: 'Le conseiller en traduction parle de ce qu’il a noté sur la traduction (texte biblique et aides paratextuelles) avec l’équipe et offre aide et conseils selon le besoin. L’administrateur du projet donne à un membre de l’équipe le droit de modification pour la tâche ̀« Vérification par le conseiller en traduction » dans le « Plan du Projet ».',
              'zh-Hans':
                '顾问与翻译小组进行交流，讨论他对译本和补充材料的观察，并按要求提供协助和建议。项目管理员应在“工作分配和进度”窗口，把编辑权限授予一名组员（可以是他自己），去处理“翻译顾问的访问”任务。',
              es: '!@# El Consultor interactúa con el equipo de traducción en base a sus observaciones sobre el texto y materiales complementarios, además de brindar asistencia y asesoramiento según sea necesario. El administrador del proyecto debe dar permiso de edición a un miembro del equipo (que podría ser él mismo) en la ventana de Asignaciones y Progreso para la tarea "Visita del Consultor"',
              pt: 'O consultor interage com a equipe de tradução em relação às suas observações sobre o texto e materiais complementares, e fornece assistência e aconselhos conforme a necessidade. O administrador do projeto dá permissão a um membro da equipe (que podería ser ele mesmo) na janela Atribuição e Processo para a tarefa "Visita do Consultor"',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '9955d13b-4d77-4c77-81a3-a728bf11b77e',
            names: {
              en: 'Third revision',
              fr: 'Troisième révision',
              'zh-Hans': '第三次修订',
              es: 'Tercera Revisión',
              pt: 'Terceira Revisão',
            },
            descriptions: {
              en: 'The text and supplementary materials are revised based on input from the translation consultant. This task is for the editing that is done after the consultant has left. Some consultants call these edits "action items", "to do list", "homework" or something else.',
              fr: 'Le texte et les aides paratextuelles sont révisés en fonction des commentaires du conseiller en traduction. Ce travail peut se faire en l’absence du conseiller. Certains conseillers appellent ces modifications le « suivi » ou la « liste de tâches » ou les « devoirs ».',
              'zh-Hans':
                '根据翻译顾问的意见修订文本和补充材料。这任务是在顾问离开后进行的编辑工作。有些顾问称这类编辑为“行动项”、“待办事项”、“作业”或其他。',
              es: 'El texto y el material complementario son revisados en base a las sugerencias del Consultor. Esta tarea de edición se debe hacer una vez que el Consultor se haya ido. Algunos Consultores llaman a estas tareas de edición "elementos de acción", "lista por hacer", "tarea" o cualquier otro nombre.',
              pt: 'O texto e o material complementar são revisados com base nas sugestões do Consultor. Esta tarefa é feita depois que o Consutor for embora. Algunus Consultores chama esta tarefa de edição de "itens de ação", "lista de tarefa", "lição de casa" ou qualquer outro nome.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'ec5c2bbe-f91b-4d2d-85e3-6160779a319d',
            names: {
              en: 'Biblical terms tool revision',
              fr: 'Révision des équivalents des termes bibliques.',
              'zh-Hans': '“圣经专门用词”工具中的修订',
              es: 'Revisión usando la herramienta Vocablos Bíblicos',
              pt: 'Revisão da ferramenta de Termos Bíblicos',
            },
            descriptions: {
              en: 'Revise renderings in the Biblical terms tool as needed.',
              fr: 'Révisez les équivalents dans l’outil « Termes bibliques » si nécessaire.',
              'zh-Hans': '按需要在“圣经专门用词”工具中修订译法。',
              es: 'Revisar las traducciones en la herramienta Vocablos Biblicos según sea necesario.',
              pt: 'Revisar as traduções na ferramenta termos Bíblico se for necessário.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'aa176048-9a38-4356-9ea7-2e726e6e632a',
            names: {
              en: 'Back translation revision',
              fr: 'Révision de la retraduction',
              'zh-Hans': '回译修订',
              es: 'Revisión de la Retro Traducción',
              pt: 'Revisão da Retrotradução',
            },
            descriptions: {
              en: 'Revise the back translation as needed.',
              fr: 'Mettre à jour la retraduction si nécessaire.',
              'zh-Hans': '按需要修订回译。',
              es: 'Revisar la Retro Traducción según se necesite.',
              pt: 'Revisar a Retrotradução se for necessário.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'c6f68e0f-7edd-4841-bf2a-502fd1dd6daf',
            names: {
              en: 'Preliminary consultant approval',
              fr: 'Approbation provisoire du conseiller en traduction',
              'zh-Hans': '翻译顾问初步核准',
              es: 'Aprobación preliminar del Consultor',
              pt: 'Aprovação Preliminar do Consultor',
            },
            descriptions: {
              en: 'Consultant gives preliminary approval of the text, but it may have some follow-up tasks which are clearly defined.',
              fr: 'Le conseiller approuve provisoirement le texte, sous réserve de terminer certaines tâches bien définies.',
              'zh-Hans': '翻译顾问初步核准译文，但可能会有一些明确的后续任务。',
              es: 'El Consultor aprueba preliminarmente el texto, pero puede haber algunos pasos de seguimiento que estarán claramente definidas.',
              pt: 'O Consultor aprova preliminarmente o texto, mas podorá existir algumas tarefas definidas que necessitam ser concluídas.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '97931ae7-27a7-43e4-8baf-75f7f3790234',
            names: {
              en: 'Consultant report distributed',
              fr: 'Envoi du rapport du conseiller en traduction',
              'zh-Hans': '分发顾问报告',
              es: 'Informe del Consultor distribuido',
              pt: 'Entrega do relatório do consultor',
            },
            descriptions: {
              en: 'Consultant report shared with the translation team and with major stakeholders.',
              fr: 'Le rapport du conseiller en traduction est partagé avec l’équipe de traduction et les parties prenantes.',
              'zh-Hans': '与翻译小组和主要利益相关者共享顾问报告。',
              es: 'El informe del Consultor compartido con el equipo de traducción y con las principales partes interesadas.',
              pt: 'O relatório do consultor é compartilhado com a equipe de tradução e com as principais partes interessadas.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
        ],
      },
      {
        id: '16385cc6-d555-4b29-b342-1f78a9853656',
        names: {
          en: 'Review by the community',
          fr: 'Vérification par la communauté',
          'zh-Hans': '公众审阅者的复审',
          es: 'Revisión hecha por la Comunidad',
          pt: 'Revisão pela Comunidade',
        },
        descriptions: {},
        tasks: [
          {
            id: 'ad1e60e2-0340-4832-b914-16fc9c76c76e',
            names: {
              en: 'Naturalness review',
              fr: 'Révision du naturel du texte',
              'zh-Hans': '审阅翻译是否自然',
              es: 'Revisión de Naturalidad del texto',
              pt: 'Revisão de naturalidade',
            },
            descriptions: {
              en: 'The community does a naturalness review of the text based on the oral and/or written communication of the third revision.',
              fr: 'À partir de la version orale ou écrite de la troisième révision, la communauté vérifie que le texte traduit est naturel.',
              'zh-Hans': '公众审阅者根据第三次修订时口述和／或笔录的意见复审译文的自然度。',
              es: 'La comunidad hace una revisión de la naturalidad del texto basado en la comunicación oral y/o escrita de la tercera revisión.',
              pt: 'A partir da versão oral ou escrita da terceira revisão, a comunidade garante que o texto traduzido é natural.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '69a7d76b-0c5c-4066-8c6a-dcce2e02bee2',
            names: {
              en: 'Fourth revision',
              fr: 'Quatrième révision',
              'zh-Hans': '第四次修订',
              es: 'Cuarta revisión',
              pt: 'Quarta revisão',
            },
            descriptions: {
              en: 'The team should discuss the comments of the naturalness review and make the changes suggested that are valid.',
              fr: 'L’équipe évalue les observations faites lors de la vérification du naturel du texte et modifie le texte si elle le juge nécessaire.',
              'zh-Hans': '翻译小组讨论自然度复审的意见，然后根据有效的更改建议进行修改。',
              es: 'El equipo debe discutir los comentarios hechos durante la revisión de naturalidad del texto y hacer los cambios necesarios que sean válidos.',
              pt: 'A equipe avalia as observações feitas durante a verificação de naturalidade do texto e faz os ajustes que julgar necessário.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'ed3f57fb-e3de-4b13-bfe8-c9754d61e044',
            names: {
              en: 'Team progress report',
              fr: 'Rapport de progression de l’équipe',
              'zh-Hans': '翻译小组进度报告',
              es: 'Informe del progreso del equipo',
              pt: 'Relatório de progresso da equipe',
            },
            descriptions: {
              en: 'The team writes a report about what changes were made in the fourth revision and why those changes were made, and sends it to the consultant.',
              fr: 'L’équipe rédige un rapport sur les modifications faites suite à la quatrième révision ainsi que sur le pourquoi de ces modifications et l’envoie au conseiller en traduction.',
              'zh-Hans':
                '翻译小组撰写一份报告，交待第四次修订所做的更改，以及为何作出那些更改，然后发送给翻译顾问。',
              es: 'El Equipo escribe un informe sobre los cambios que se hicieron en la cuarta revisión y porqué esos cambios fueron hechos. Este informe es enviado al Consultor.',
              pt: 'A equipe escreve um relatório sobre quais mudanças foram feitas na quarta revisão e por que tais mudanças foram feitas, e o encaminha ao consultor.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'ab24ebef-f715-4a6e-b505-b5c9172ba6c9',
            names: {
              en: 'Community review of Biblical key terms',
              fr: 'Révision des termes bibliques par la communauté',
              'zh-Hans': '公众审阅者复审主要的圣经专门用词',
              es: 'Revisión de los Términos Clave por la Comunidad',
              pt: 'Revisão dos termos Bíblicos pela comunidade',
            },
            descriptions: {
              en: 'Community leaders, church leaders, and other community members discuss how key terms are rendered.',
              fr: "Les leaders de la communauté, les chefs religieux et autres membres de la communauté évaluent les termes clés choisis par l'équipe.",
              'zh-Hans': '社区领袖、教会领袖和其他社区成员讨论主要圣经用词的译法。',
              es: 'Líderes de la comunidad, de las Iglesias y miembros de la comunidad discuten como los términos claves son generados.',
              pt: 'Os líderes da comunidade, das Igrejas e membros da comunidade avaliam os termos-chaves escolhidos pela equipe.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '9784a38c-2c37-4d90-82bf-ee7f4125057e',
            names: {
              en: 'Key term revision',
              fr: 'Révision des termes clés',
              'zh-Hans': '主要圣经用词的修订',
              es: 'Revisión de los Términos Clave',
              pt: 'Revisão dos Termos-chaves',
            },
            descriptions: {
              en: 'The team discusses comments about key terms made at the community review and uses those changes they think are valid.',
              fr: 'L’équipe évalue les commentaires faits par la communauté lors de la révision sur les termes clés et modifie ceux qui doivent être changés.',
              'zh-Hans':
                '翻译小组讨论公众审阅对主要圣经用词所给予的意见，然后使用一些他们认为有效的更改。',
              es: 'El equipo discute los comentarios sobre los términos claves hechos por la revisón de la comunidad y hacen los cambios que crean necesarios',
              pt: 'A equipe avalia os comentários feitos pela comunidade durante a revisão dos termos-chave e fazem as devitas mudanças.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '7f371a2d-bd1c-48ef-99f7-c16136246dee',
            names: {
              en: 'Team Biblical key terms report',
              fr: 'Rapport sur les termes clés bibliques',
              'zh-Hans': '有关主要圣经专门用词的翻译小组报告',
              es: 'Informe sobre los Términos Clave',
              pt: 'Relatório dos Termos-chaves',
            },
            descriptions: {
              en: 'The team writes a report about what changes were made in the key terms and why those changes were made, and sends it to the consultant. The team should open the Biblical terms tool and consult the notes, and history sections for the terms being reported on. It is best practice to enter this information in the tool as the changes were being discussed and decided on.',
              fr: 'L’équipe rédige un rapport sur les modifications faites aux termes clés ainsi que le pourquoi et l’envoie au conseiller en traduction. Pour cela, l’équipe ouvre l’outil « Termes bibliques » et consulte les notes et l’historique pour les termes mentionnés dans le rapport. Il est recommandé de saisir les décisions prises dans l’outil au fur et à mesure de la traduction.',
              'zh-Hans':
                '翻译小组撰写一份报告，交待他们针对主要圣经用词所做的更改，以及为何作出那些更改，然后发送给翻译顾问。小组应打开“圣经专门用词”工具，查阅报告中主要圣经用词的附注和历史记录部分。把针对更改所进行的讨论和决定输入到“圣经专门用词”工具中，是一个很好的习惯。',
              es: 'El equipo redacta un informe sobre los cambios hechos en los términos clave y la razón detrás de estos cambios, luego se lo envía al Consultor. El equipo debe consultar las notas de traducción en la herramienta de Vocablos Bíblicos, como también el historial de traducciones de los términos que están siendo incluidos en el informe. Una buena práctica es la de ingresar toda esta información en la herramienta mientras sea discutida y cualquier decisión sea tomada.',
              pt: 'A equipe elabora um relatório sobre as alterações feitas nos termos-chave e a razão das alterações, e envia ao Consultor. Para isso, a equipe deve abrir a ferramenta "termos Bíblicos" e consultar as notas, e o histórico de traduções dos termos que serão inserudos no relatório. Uma boa prática é inserir essa informação na ferramenta à medida que as mudanças são discutidas e decididas.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
        ],
      },
      {
        id: 'c66ede6b-1e7b-4d55-b5c3-f8aff60217d7',
        names: {
          en: 'Finalizing for Publication',
          fr: 'Mettre la touche finale avant la publication',
          'zh-Hans': '定稿出版',
          es: 'Finalizando para la Publicación',
          pt: 'Finalização para publicação',
        },
        descriptions: {},
        tasks: [
          {
            id: '4363aa1f-aeca-4831-8562-085b9381bad6',
            names: {
              en: 'Choose final illustrations and write captions',
              fr: 'Choix définitif des illustrations et rédaction des légendes',
              'zh-Hans': '最后选择插图和撰写标题',
              es: 'Elejir Ilustraciones definitivas y escribir subtítulos',
              pt: 'Escolher ilustrações finais e escrever legendas',
            },
            descriptions: {
              en: 'Make final decisions on illustrations. If captions contain text not directly from the scriptures, they should be consultant checked. This should be done in conjunction with the publications department. Sample illustrations can be seen at: https://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              fr: 'Prenez les décisions finales concernant les illustrations. Si les légendes contiennent du texte qui ne provient pas directement du texte biblique, elles doivent être vérifiées par un conseiller en traduction et par le département des publications. Vous trouverez un échantillon d’illustrations sur le lien : https://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              'zh-Hans':
                '最后决定使用哪些插图。如果插图标题包含非直接引用经文的文本，就必须要求顾问检查文本。这应该与出版部门一起完成。示例插图可在以下位置找到：\n\nhttps://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              es: 'Tomas decisiones finales sobre las ilustraciones a usar. Si los subtitulos no contienen texto directo de las Escrituras entonces deben ser revisados por el consultor. Esto debe hacerse en coordinación con el departamento de Publicaciones. Se puede ver ejemplos de ilustraciones en: https://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
              pt: 'Tomar as decisões finais sobre as ilustrações. Se as legendas contêm texto que não são diretamente das Escrituras, elas devem ser consultadas. Isso deve ser feito em conjunto com o departamento de publicações. Você pode encontrar uma amostra de ilustrações no link: https://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '9fca00d9-bb43-4718-aa64-8d4e07f9ab43',
            names: {
              en: 'Choose maps and label place names',
              fr: 'Choix des cartes et annotation des noms de lieux',
              'zh-Hans': '选择地图和标示地方名',
              es: 'Elejir Mapas y etiquetar nombres de lugares',
              pt: 'Escolher mapas e nomear lugares',
            },
            descriptions: {
              en: 'Make final decisions on maps. This should be done in conjunction with the publications department. Sample maps can be seen at:\nhttps://www.dropbox.com/sh/0bi5dg8v7vj7y74/AAANSWfsC6uSL_mRSYKBx6T9a?dl=0',
              fr: 'Prenez les décisions finales concernant les cartes. Cela devrait se faire conjointement avec le département des publications. Vous trouverez des exemples de cartes sur le lien suivant : https://www.dropbox.com/sh/0bi5dg8v7vj7y74/AAANSWfsC6uSL_mRSYKBx6T9a?dl=0',
              'zh-Hans':
                '最后决定使用哪些地图。这应该与出版部门一起完成。示例地图可在以下位置找到：\n\nhttps://www.dropbox.com/sh/0bi5dg8v7vj7y74/AAANSWfsC6uSL_mRSYKBx6T9a?dl=0',
              es: 'Tomar las decisiones finales sobre los mapas. Esto se debe hacer en coordinación con el departamento de publicaciones. Ejemplos de mapas se puede ver aquí:\nhttps://www.dropbox.com/sh/0bi5dg8v7vj7y74/AAANSWfsC6uSL_mRSYKBx6T9a?dl=0',
              pt: 'Tomar as decisões finais sobre os mapas. Isso deve ser feito em conjunto com o departamento de publicações. Você pode encontrar exemplos de mapas no link:\nhttps://www.dropbox.com/sh/0bi5dg8v7vj7y74/AAANSWfsC6uSL_mRSYKBx6T9a?dl=0',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '819e4803-d2fb-465e-8242-3ce0d58edde2',
            names: {
              en: 'Draft introduction to Bible/NT, other front & back matter',
              fr: 'Rédaction des pages liminaires et des annexes',
              'zh-Hans': '草拟圣经／新约简介和其他前文与附录',
              es: 'Redactar la Introducción de la Biblia/NT, material anterior/posterior',
              pt: 'Elaboração de páginas introdutórias e apêndices',
            },
            descriptions: {
              en: 'All planned front and back matter that has not already been done should be drafted by this stage.',
              fr: 'Rédigez les pages liminaires (ex: introduction générale) et les parties annexes.',
              'zh-Hans': '这个阶段应要草拟所有已计划但仍未撰写的前文和附录。',
              es: 'Todo el material anterior y posterior que se ha planeado que no se haya hecho todavía debe ser redactado en esta etapa.',
              pt: 'Todo material introduções e apêndices que ainda não foram feitos devem ser elaboradas nesta etapa.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'f6540822-253b-4b50-8699-179ebb9ea5b7',
            names: {
              en: 'Check parallel passages',
              fr: 'Vérification des passages parallèles',
              'zh-Hans': '检查平行经文',
              es: 'Comprobar Pasajes Paralelos',
              pt: 'Verificação de Passagens Paralelas',
            },
            descriptions: {
              en: 'Go to the Tools-->Parallel Passages menu, and use the Parallel Passages tool to guide you to make parallel passages the same to the appropriate level.',
              fr: 'Dans le menu « Outils », cliquez sur « Textes parallèles ». Utilisez cet outil pour harmoniser les passages parallèles au cas par cas.',
              'zh-Hans':
                '转到“工具-->平行经文”菜单，使用“平行经文”工具作指引，使平行经文之间有相应的译法。',
              es: 'Ir al menú Herramientas-->Pasajes paralelos..., y usar la herramienta como guía para hacer que los pasajes paralelos coincida con el texto en el nivel apropiado.',
              pt: 'Ir ao menu Ferramentas-->Passagens paralelas..., e utilizar essa ferramenta para alinhar as passagens paralelas com o texto no nível apropriado.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '3936924b-7158-4628-a6d5-8dbd7e23885a',
            names: {
              en: 'Verify that all Paratext checks are complete',
              fr: 'Vérifiez que tous les contrôles de Paratext ont été effectués',
              'zh-Hans': '确定所有《圣经辅助工具》的检查都已完成',
              es: 'Verificar que todos los chequeos de ParaTExt estén completados.',
              pt: 'Checar se todas as verificações do Paratext foram realizadas',
            },
            descriptions: {
              en: 'Open the Assignments and progress window, and correct all errors and resolve all outstanding issues reported there.',
              fr: 'Ouvrez la fenêtre « Affectations et Progrès » et corrigez toutes les erreurs signalées et résolvez toute question en suspens.',
              'zh-Hans': '打开“工作分配和进度”窗口，更正所有错误和解决所有尚待解决的问题。',
              es: 'Abrir la ventana de Asignaciones y Progreso del proyecto, y correjir todos los errores y resolver todos los problemas pendientes.',
              pt: 'Abrir a janela Atribuiçoes e Progresso, e corrigir eventuais erros relatados e resolver todas as questões pendentes.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'ea8585f9-a9fa-4778-863f-61ce41542068',
            names: {
              en: 'Proper names - final check',
              fr: 'Vérification finale des noms propres',
              'zh-Hans': '专有名称 – 最后检查',
              es: 'Nombres propios - Comprobación final',
              pt: 'Nomes próprios - verificação final',
            },
            descriptions: {
              en: 'In the Biblical terms tool, create a new filter for the "Names" category.',
              fr: 'Dans l’outil « Termes bibliques », créez un nouveau filtre pour la catégorie « Noms propres ».',
              'zh-Hans': '在“圣经专门用词”工具中创建一个新的“名字”类别筛选器。',
              es: 'En la herramienta Vocablos Bíblicos, crear un nuevo filtro para la categoría "Nombres".',
              pt: 'Na ferramenta Termos Bíblicos, crier un novo filtro para a categoría "Nomes próprios".',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'ba93cc52-db81-4b97-9fa4-7acd521c1601',
            names: {
              en: 'Numbers - final check',
              fr: 'Vérification finale des chiffres',
              'zh-Hans': '数目 – 最后检查',
              es: 'Números - chequeo final',
              pt: 'Números - verificação final',
            },
            descriptions: {
              en: 'Select the list "Numbers" as the Biblical terms list in the Biblical terms tool to find all the numbers in the New Testament.',
              fr: "Sélectionnez la liste « Chiffres » dans l'outil « Termes bibliques » pour afficher tous les chiffres employés dans le Nouveau Testament.",
              'zh-Hans':
                '在“圣经专门用词”工具中选择“数”的列表作为“圣经专门用词”列表，以查找新约中所有的数目。',
              es: 'Seleccione la lista "Números" como la lista de términos clave en la herramienta de Vocablos Bíblicos para encontrar todos los números en el Nuevo Testamento.',
              pt: 'Na ferramenta Termos Bíblicos, no menu Arquivo-->Selecionar lista de termos..., selecione "Números" para encontrar todos os números no Novo Testamento.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'c420d607-9eba-4bf3-92c1-fd5a77bc0915',
            names: {
              en: 'Money - final check',
              fr: 'Vérification finale des termes liés à l’argent',
              'zh-Hans': '金钱 – 最后检查',
              es: 'Moneda - chequeo final',
              pt: 'Moedas - verificação final',
            },
            descriptions: {
              en: 'Verify that words such as money, coin, silver, gold, denarii, and shekel are adequately differentiated and rendered consistently rendered.',
              fr: 'Vérifiez que des mots comme argent, or, monnaie, deniers et shekel sont toujours traduits de la même manière et qu’ils sont différents les uns des autres.',
              'zh-Hans':
                '确定所有诸如金钱、钱币、银子、金子、得拿利和舍客勒等字词都有充分的区分和一致的译法。',
              es: 'Comprobar que palabras como dinero, moneda, plata, oro, denario, y siclos esten diferenciados adecuadamente y generados consistentemente.',
              pt: 'Verifique se as palavras dinheiro, moeda, prata, ouro, denário e siclos são sempre traduzidos da mesma forma e elas são diferentes entre si.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '1ac01594-c549-410f-bd50-2c248f767c6f',
            names: {
              en: 'Weights - final check',
              fr: 'Vérification finale des termes liés au poids',
              'zh-Hans': '重量 – 最后检查',
              es: 'Pesos - chequeo final',
              pt: 'Pesos - verificação final',
            },
            descriptions: {
              en: 'Verify that words such as talent, mina, shekel, pim, beka, gerah etc., are adequately differentiated and rendered consistently.',
              fr: 'Vérifiez que des mots comme talent, mina, shekel, pim, beka, gera, etc., sont toujours traduits de la même manière et qu’ils sont différents les uns des autres.',
              'zh-Hans':
                '确定所有诸如他连得、弥拿、舍客勒、pim 、比加、季拉等字词都有充分的区分和一致的译法。',
              es: 'Comprobar que palabras como talento, libra, siclos, pim, medio siclo, geras etc., esten diferenciados adecuadamente y generados consistentemente.',
              pt: 'Verifique se as palavras talento, mina, siclo, pim, beca, gera etc. são sempre traduzidos da mesma forma e elas são diferentes entre si.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'a643c702-c6c2-4ba9-98c5-4d3191ac4ccb',
            names: {
              en: 'Measures - final check',
              fr: 'Vérification finale des mesures',
              'zh-Hans': '计量单位 – 最后检查',
              es: 'Medidas - chequeo final',
              pt: 'Medidas - verificação final',
            },
            descriptions: {
              en: 'Verify that words such as cubit, span, handbreadth, orgyia, stadion, milion, cor, lethech, ephah, seah, omer, cab, bath, hin, log, etc., are adequately differentiated and rendered consistently rendered.',
              fr: 'Vérifiez que des mots comme coudée, travée, quatre doigts, orgyia, stadion, milion, cor, lethech, épha, seah, omer, cab, bath, hin, log, etc., sont toujours traduits de la même manière et qu’ils sont différents les uns des autres.',
              'zh-Hans':
                '确定所有诸如肘、虎口、一掌、 orgyia 、斯他迪、百万、 cor 、半賀梅珥、伊法、细亚、賀梅珥、 cab 、罢特、欣、 log 等字词都有充分的区分和一致的译法。',
              es: 'Comprobar que palabras como codos, palmo, palmo menor, orgyia, stadion, milion, coros, lethech, efa, seah, omer, cab, bath, hin, log, etc., esten diferenciados adecuadamente y generados consistentemente.',
              pt: 'Verifique se as palavras côvado, palmo, palmo menor, estádios, milhas, coro, leteque, efa, seá (alqueire), gômer cabo, bato, him, logue, etc. são sempre traduzidos da mesma forma e elas são diferentes entre si.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '9bd5b294-ef93-4e48-a622-8e6907aab38c',
            names: {
              en: 'Consistency check - Biblical key terms',
              fr: 'Test de la cohérence des termes clés bibliques',
              'zh-Hans': '一致性检查 – 主要圣经专门用词',
              es: 'Chequeos de consistencias - términos clave',
              pt: 'Verficação de consistência - Termos Bíblicos chaves',
            },
            descriptions: {
              en: 'Open Biblical terms tool and review all renderings for consistency, and make any last changes needed.',
              fr: 'Ouvrez l’outil « Termes bibliques » et examinez tous les équivalents pour voir s’ils sont traduits toujours de la même manière. Corrigez si nécessaire.',
              'zh-Hans': '打开“圣经专门用词”工具，审阅所有译法的一致性，按需要进行最后的更改。',
              es: 'Abrir la herramienta Vocablos Bíblicos y comprobar la consistencia de todos los términos y realizar los últimos cambios necesarios.',
              pt: 'Abrir a ferramenta Termos Bíblicos para verificar a consistência de todos os termos e corrigir se necessário.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '48728fe8-6dd3-49d0-aea0-c90406faad03',
            names: {
              en: 'Consistency check - parallel passages',
              fr: 'Test de la cohérence pour les textes parallèles',
              'zh-Hans': '一致性检查 – 平行经文',
              es: 'Chequeos de consistencias - pasajes paralelos',
              pt: 'Verificação de consistência - Passagens Paralelas',
            },
            descriptions: {
              en: 'Open Parallel Passage tool and confirm all parallel passages. (This check is not simply that parallel passages have check marks, it is meant to read the verses and see if the appropriate words are green and yellow in each passage.)',
              fr: 'Ouvrez l’outil « Textes parallèles » et validez tous les textes parallèles. (Il ne s’agit pas simplement de vérifier que les cases des textes parallèles sont cochées; on doit relire les versets et voir si les bons mots sont en vert ou en jaune dans chaque passage.)',
              'zh-Hans':
                '打开“平行经文”工具并确认所有平行经文。（这项检查并非只是确定所有平行经文都有勾选标记，而是要细阅所有经节，看看每段经文是否都有相应的绿色和黄色标记字词。）',
              es: 'Abra la herramienta de Pasajes Paralelos y confirme todos los pasajes paralelos. (Este chequeo no es simplemente para que los pasajes paralelos tengan marcas de verificación, esta pensado para que se lean los versículos y verificar que las palabras apropiadas estén resaltados de verde y amarillo en cada pasaje).',
              pt: 'Abra a ferramenta Passagens Paralelas para verificar todas as passagens paralelas. (Esta verificação não é, simplemnte, para assinalar a passagens paralelas como verificada, é preciso ler o versículos e verificar as palavras apropriadas estão destacadas em verde e amarelo em casa passagem).',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'b7263773-5022-4ec2-9442-c07f681f9f91',
            names: {
              en: 'Check references',
              fr: 'Vérification des références',
              'zh-Hans': '检查经文参照',
              es: 'Comprobación de referencias',
              pt: 'Verificação de referências',
            },
            descriptions: {
              en: 'Look up and verify that all Scripture references in footnotes, cross references, book introductions, etc., are referring to verse(s) that talk about the correct topic. (This is not the automated Paratext check to verify that a Scripture reference is in the correct format and exists in the cannon.)',
              fr: 'Recherchez toutes les références bibliques dans les notes de bas de page, les renvois, les introductions aux livres, etc., et vérifiez qu’elles font référence aux passages voulus. (Il ne s’agit pas de l’outil de Paratext qui vérifie automatiquement le formatage des références et de leur existence dans le canon.)',
              'zh-Hans':
                '在脚注、经文相互参照、书卷简介等，查阅所有经文参照，确定当中列出的经节都谈论相应的主题。（这并不是《圣经辅助工具》的自动检查，不是要确定经文参照格式是正确和存在于经目表的。）',
              es: 'Buscar y verificar que todas las referencias bíblicas en las notas al pie de página, referencias cruzadas, introducción a libros, etc., mencionen el(los) versículo(s) que traten el tema correcto. (Este no es el chequeo automático de ParaTExt para comprobar que una referencia biblica este en el formato correcto y que exista en el canon).',
              pt: 'Pesquisar todas as referências bíblicas nas notas de rodapé, referências cruzadas, introduções aos livros, etc., verificar se ela(s) trata(m) do(s) tema(s) correto(s). (Esta não é uma verificação automática que o Paratext faz para checar a formatação de referências bíblicas e sua existência no cânon).',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '92d5838b-bce2-4207-a7dc-5c6001f6d7d9',
            names: {
              en: 'Footnotes and cross references - format check',
              fr: 'Contrôle du formatage des notes de bas de pages et renvois',
              'zh-Hans': '脚注和经文相互参照 – 格式检查',
              es: 'Notas al pie de página y referencias cruzadas - Chequeo de formato',
              pt: 'Notas de Rodapé e Referências - ver. formatação',
            },
            descriptions: {
              en: 'Read all footnotes and cross references looking for inconsistencies in how they are formatted. The goal is to have a consistent look and feel across all footnotes, and not merely the absence of marker errors in the footnotes.  It may be helpful to go to Tools-->Checklist-->Footnotes. This checklist will compare the footnotes in your text to other resources that you specify.',
              fr: 'Revoyez le formatage de toutes les notes de bas de page et les renvois pour qu’il soit uniforme. Il s’agit d’avoir une même mise en forme pour toutes les notes et pas simplement d’éviter les erreurs de marqueur.',
              'zh-Hans':
                '细阅所有脚注和经文参照，查看所使用的格式是否不一致。检查的目标是使所有脚注都有一致的外观和感觉，并非只是检查脚注的格式码错误。',
              es: 'Leer todas las notas al piede página y referencias cruzadas buscando inconsistencias en su formato. La meta es tener una apariencia consistente en todas las notas al pie de página, no sólo no teniendo errores en los marcadores en las notas al pie de página.',
              pt: 'Leia todas as notas de rodapé e referências cruzadas procurando inconsistências em seu formato. O objetivo é ter a mesma formatação em todas as notas de rodapé, e não apenas evitar erros de marcadores nas notas de rodapé.\n\t\t  Pode ser útil para ir em Ferramentas-->Lista de verificações-->Notas de rodapé... Esta lista de verificação irá comparar as notas de rodapé em seu texto com outros recursos que você especificar.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '60fc3151-1b71-4910-b9f4-96dbaf84c225',
            names: {
              en: 'Section breaks and headings - final format check',
              fr: 'Dernier contrôle de formatage des sauts de section et en-têtes de section',
              'zh-Hans': '分段符和标题 – 最后的格式检查',
              es: 'Saltos de sección y encabezados - comprobación del formato final',
              pt: 'Títulos de seções - ver. final de formatação',
            },
            descriptions: {
              en: 'If another translation is used as a base then this check can be done using Tools > Checklists > Compare Section Headings',
              fr: "Si vous suivez une version modèle, cette vérification peut se faire à l’aide d'« Outils » > « Listes récapitulatives » > « En-têtes de section »",
              'zh-Hans':
                '若是使用另一个译本为根据，可以进行这项检查如下：“工具 ＞ 检查表工具（Checklists） ＞ 比较分段标题”。',
              es: 'Si otra traducción es usada como base entonces se puede realizar este chequeo en Herramientas > Lista de Verificaciones > Comparar encabezados de secciones',
              pt: 'Se outra tradução foi usada como base, essa verificação pode ser feita usando a Ferramentas > Lista de Verificações > Comparar títulos de seções',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'a5b28c00-1dce-405f-8cb2-fb9fb0fd346e',
            names: {
              en: 'Paragraph breaks - final format check',
              fr: 'Dernier contrôle final de formatage des sauts de paragraphe',
              'zh-Hans': '段落符 – 最后的格式检查',
              es: 'Saltos de Párrafos - comprobación del formato final',
              pt: 'Quebras de parágrafos - ver. final de formatação',
            },
            descriptions: {
              en: 'If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\p, and \\m.',
              fr: "Vérifiez les marqueurs de paragraphe comme \\p et \\m. Si vous suivez une version modèle, ce contrôle peut être fait à l’aide d'« Outils » > « Listes récapitulatives » > « Marqueurs ». Affichez la version modèle pour comparer et trouver les endroits où il y a des paragraphes non souhaités ou des paragraphes manquants.",
              'zh-Hans':
                '若是使用另一个译本为根据，可以进行这项检查如下：“工具 ＞ 检查表工具（Checklists） ＞ 比较格式码”，然后寻找新的段落格式码，如　\\p 和 \\m。',
              es: 'Si otra traducción es usada como base entonces se puede realizar este chequeo en Herramientas > Lista de Verificaciones > Comparar Marcadores y buscar por nuevos marcadores de párrafo como \\p y \\m.',
              pt: 'Se outra tradução foi usada como base, essa verificação pode ser feita usando a Ferramentas > Lista de Verificações > Comparar Marcadores e procurar por novos marcadores de parágrafo como \\p e \\m.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'ce33f6a6-b46c-4abe-a234-5fa6bbe06ea5',
            names: {
              en: 'Layout and indents - final format check',
              fr: 'Dernier contrôle de formatage pour la mise en page et les mises en retrait',
              'zh-Hans': '版式和缩排 – 最后的格式检查',
              es: 'Diseño y sangrías - Chequeo de formato final',
              pt: 'Layout e recuos - ver. final de formatação',
            },
            descriptions: {
              en: 'Verify other layout issues such as poetry. Particular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\q, \\q1 and \\q2.',
              fr: "Vérifiez d’autres questions de mise en page telles que celle de la poésie. Faites attention en particulier aux mises en retrait poétique. Si vous suivez une version modèle, ce contrôle peut être fait à l’aide d'« Outils » > « Listes récapitulatives » > « Marqueurs ». Affichez la version modèle pour comparer et trouver les endroits où il y a des marqueurs \\q, \\q1, \\q2, en trop ou manquants.",
              'zh-Hans':
                '确定其他版式问题，如诗歌的版式。要特别注意诗歌的缩排。若是使用另一个译本为根据，可以进行这项检查如下：“工具 ＞ 检查表工具（Checklists） ＞ 比较格式码”，然后寻找新的段落格式码，如　\\q，\\q1 和 \\q2。',
              es: 'Revisar otros problemas de diseño como en la poesía. Debe prestarse especial atención a la sangría en el texto de poesía. Si otra traducción es usada como base entonces se puede realizar este chequeo en Herramientas > Lista de Verificaciones > Comparar Marcadores y buscar por marcadores de nuevos párrafos como \\q, \\q1 y \\q2.',
              pt: 'Verifique outros problemas de layout, tais como poesia. Preste atenção especial para colocar os recúos poéticos. Se outra tradução foi usada como base, essa verificação pode ser feita usando a Ferramentas > Lista de Verificações > Comparar Marcadores e procurar por novos marcadores de parágrafo como \\q, \\q1 e \\q2.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'e66023ab-dc4d-4f5c-94a5-93fded851e7a',
            names: {
              en: 'Special formatting - final format check',
              fr: 'Dernier contrôle de formatage pour la mise en forme spéciale',
              'zh-Hans': '特殊格式 – 最后的格式检查',
              es: 'Formato especial - Comprobación del formato final',
              pt: 'Formatação especial - ver. final de formatação',
            },
            descriptions: {
              en: 'See list of special formatting issues such as genealogies, words on the cross, letters, etc. Verify that text is marked using the correct standard format markers (USFM). See http://paratext.org/about/usfm for latest guide to using USFMs.',
              fr: 'Voyez la liste des cas spéciaux de mise en forme (les généalogies, les mots sur la croix, les épîtres, etc.). Vérifiez que les marqueurs de formatage standard (USFM) sont corrects et bien placés. Voyez http://paratext.org/about/usfm pour le guide d’utilisation des marqueurs le plus récent.',
              'zh-Hans':
                '见特殊格式问题列表，如：家谱、十字架上的字词、信件等。确定文本是使用正确的“标准格式格式码”（USFM）来标记。有关使用 USFM 的最新指南，见 http://paratext.org/about/usfm。',
              es: 'Consulte la lista de problemas de formato especial como en genealogías, palabras en la cruz, cartas, etc. Verifique que el texto use marcadores bajo el correcto estándar (USFM). Consultar http://paratext.org/about/usfm para obtener la guía más reciente sobre el uso de USFM.',
              pt: 'Veja a lista de casos especiais de formatação como genealogias, as palavras na cruz, as epístolas, etc. Verifique se os marcadores de formatação padrão (USFM) estão corretoes. Consultar http://paratext.org/about/usfm para obter o guia mais recente sobre o uso do USFM.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'bf163865-a207-42b7-950e-b855539b9337',
            names: {
              en: 'Consultant check - final items',
              fr: 'Dernières vérifications du conseiller',
              'zh-Hans': '翻译顾问的检查 – 最后几项',
              es: 'Chequeo del Consultor - puntos finales',
              pt: 'Verificação do consultor - itens finais',
            },
            descriptions: {
              en: 'Consultant will check any new supplementary materials such as maps, illustrations, front matter, and back matter.',
              fr: 'Le conseiller vérifie toutes les aides paratextuelles (cartes, illustrations, pages liminaires et parties annexes).',
              'zh-Hans': '翻译顾问会检查所有新的补充材料，如地图、图表、前文和附录。',
              es: 'El Consultor revisará cualquiere materia nuevo suplementario como mapas, ilustraciones, páginas preliminares y páginas finales.',
              pt: 'O Consultor  verifica todos os materiais suplementares como: mapas, ilustrações, páginas introdutórias e apêndices.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'e09339d3-83e9-479e-a387-76b83067007d',
            names: {
              en: 'Final approval from consultant',
              fr: 'Approbation finale du conseiller',
              'zh-Hans': '翻译顾问最后的核准',
              es: 'Aprobación final del Consultor',
              pt: 'Aprovação final pelo consultor',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '1cbff9af-07b6-4d6b-b970-aeb548b5b95a',
            names: {
              en: 'Final read through and approval with church and community',
              fr: "Lecture finale et approbation par l'Église et la communauté",
              'zh-Hans': '与教会和语言群体中的公众审阅者一起进行最后的通读和核准。',
              es: 'Lectura final del texto y aprobación de la Iglesia y la comunidad',
              pt: 'Leitura final e aprovação com igreja e comunidade',
            },
            descriptions: {
              en: 'This should use a draft produced by PA/InDesign so that the text is in close to final format.',
              fr: 'Pour ce contrôle, imprimez un exemplaire avec Publishing Assistant ou InDesign afin que le texte ressemble le plus au produit fini.',
              'zh-Hans': '应使用一个用 PA/InDesign 来制作的草稿，使文本接近最终的格式。',
              es: 'Esta lectura debe usar un borrador producido por Publishing Assistant (PA)/InDesign para que el texto esté cerca del formato final.',
              pt: 'Para esta verificação, imprima uma cópia com o software Publishing Wizard ou InDesign para que o texto esteja o mais próximo do formato final.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'fdb55ea8-675a-4748-938e-29baeb639b04',
            names: {
              en: 'Revise text based on final read through',
              fr: 'Révision du texte suite à la lecture finale',
              'zh-Hans': '根据最后的通读来修订文本',
              es: 'Revisar el texto basado en la lectura final',
              pt: 'Revisão do texto baseado na leitura final',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'a9a461dc-23c0-460c-a33b-8a5d49ea88e9',
            names: {
              en: 'Do final typesetting',
              fr: 'Mise en page finale',
              'zh-Hans': '进行最后的排版',
              es: 'Hacer la composición tipográfica final',
              pt: 'Diagramação final',
            },
            descriptions: {
              en: 'This task is not done by the translation team. It is done by a typesetter who is part of Global Printing Services (GPS).',
              fr: 'Cette tâche n’est pas réalisée par l’équipe de traduction. Elle est faite par un typographe du Services de Publication Globale (GPS).',
              'zh-Hans': '这并不是翻译小组的任务。这任务由全球印刷服务（GPS）的排版员来执行。',
              es: 'Este paso no es realizado por el equipo de traducción. Es hecho por un tipógrafo que forma parte del equipo Global Printing Services (GPS).',
              pt: 'Esta tarefa não é realizada pela equipe de tradução. É feita por um diagramador da Global Publishing Services (GPS).',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: 'd2159520-6cc0-4fcb-a7c2-e9c68a1b740e',
            names: {
              en: 'Do audio recording',
              fr: 'Enregistrement audio du texte biblique',
              'zh-Hans': '进行录音',
              es: 'Hacer grabación de audio',
              pt: 'Gravação em Áudio',
            },
            descriptions: {
              en: 'Ask your entity what partner organizations are in your area that do Scripture recordings.',
              fr: 'Renseignez-vous pour savoir qui fait l’enregistrement audio du texte biblique dans votre région.',
              'zh-Hans': '问问你的单位或机构你地区中有哪些合作伙伴组织会做圣经录音。',
              es: 'Pregunte a su entidad cuáles son las organizaciones socias en su área que realizan grabaciones de las Escrituras.',
              pt: 'Pergunte à sua organização quais são as organizações parceiras na sua região que fazem gravações das Escrituras.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 250,
              easy: 250,
              moderate: 200,
              difficult: 150,
            },
          },
        ],
      },
    ],
    checks: [
      {
        checkId: 'basic.chapter-verse-numbers',
        notifyOnlyInStage: null,
        requiredInStage: '9eddb82d-ed66-4e24-bdab-060dea2294de',
      },
      {
        checkId: 'basic.markers',
        notifyOnlyInStage: null,
        requiredInStage: '9eddb82d-ed66-4e24-bdab-060dea2294de',
      },
      {
        checkId: 'notes.translator',
        notifyOnlyInStage: null,
        requiredInStage: '9eddb82d-ed66-4e24-bdab-060dea2294de',
      },
      {
        checkId: 'notes.consultant',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.characters',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.punctuation',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.capitalization',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.repeated-words',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.references',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'basic.unmatched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'basic.numbers',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'basic.matched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'basic.quotations',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'spelling.word-list',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'spelling.spelling',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'notes.spelling-discussion',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'notes.rendering-discussion',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'other.biblical-terms',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'other.parallel-passages',
        notifyOnlyInStage: null,
        requiredInStage: 'c66ede6b-1e7b-4d55-b5c3-f8aff60217d7',
      },
    ],
  },
  {
    id: 'c3aa9e71-02d8-4f4b-aaf1-42a84d90c86d',
    name: 'SIL Compact Base Plan',
    version: '2',
    kind: 'factory',
    stages: [
      {
        id: '9eddb82d-ed66-4e24-bdab-060dea2294de',
        names: {
          en: 'Drafting',
          pt: 'Rascunho',
          es: 'Redacción',
          fr: 'Rédaction de l’ébauche',
          'zh-Hans': '初稿',
          'zh-Hant': '起草',
          'pt-BR': 'Rascunho',
        },
        descriptions: {
          en: 'View this plan by opening the accompanying SIL_Compact_Plan.html document.\n\nThis stage involves creating the first draft of the translation.',
          pt: 'Vá até Verificação > Paratext 6 checks> PBT> Show Project Plan HTML para visualizar ou imprimir este plano. \n\nEsta etapa envolve a criação do primeiro rascunho da tradução.',
          es: 'Vea este plan abriendo el documento adjunto SIL_Compact_Plan.html.\n\nEsta etapa implica la creación del primer borrador de la traducción.',
          fr: 'Consulter ce plan en ouvrant le document SIL_Compact_Plan.html qui l’accompagne.\n\nCette étape consiste à créer la première ébauche de la traduction.',
          'zh-Hans':
            '请打开附带的SIL_Compact_Plan.html文件以查看此计划。\n\n 这阶段主要是翻译初稿。',
          'zh-Hant':
            '透過開啟隨附的 SIL_Compact_Plan.html 文件查看此計劃。\n\n\n\n\n\n此階段涉及創建翻譯的初稿。',
          'pt-BR':
            'Visualize este plano abrindo o documento SIL_Compact_Plan.html que o acompanha.\n\n\n\nEsta etapa envolve a criação do primeiro rascunho da tradução.',
        },
        tasks: [
          {
            id: '9f99673c-cb6a-4c05-a9cd-4629eb7f6b20',
            names: {
              en: 'Exegesis',
              pt: 'Exegese',
              es: 'Exégesis',
              fr: 'Exégèse',
              'zh-Hans': '解经',
              'zh-Hant': '註解',
              'pt-BR': 'Exegese',
            },
            descriptions: {
              en: "Study the text carefully, using Paratext resources, recommended commentaries, and other recommended resources. The Translator's Workplace collection of resources contains many recommended resources that are not available in Paratext.  To learn more about Translator's Workplace and to see if you qualify for this collection of resources go to: https://www.sil.org/resources/publications/tw/licensing\n\nExegesis may involve: \n   ● chunking the text into meaningful units\n   ● identifying translation issues including key terms\n   ● identifying cultural issues\n   ● studying the meaning of key terms in the passage and considering what receptor      language rendering would be best for each sense of each term\n   ● oral retelling and processing of the text\n\n    Oral retelling can free the translator's mind from the form of the model language, creating a more natural translation. The basic process is first to study the text until you completely understand and have internalized the passage, then retelling the passage to other speakers of the receptor language. It is best to retell it in the vernacular without looking at the model text(s).  \n\nStudying key terms can be done in one of the Enhanced resources in Paratext, looking at the UBS handbook, the SIL translation notes, or a good Bible Dictionary such as those available in the Translator's Workplace collection or other source recommended by your supervisor.",
              pt: 'Estude o texto cuidadosamente, utilizando diversos versões da Bíblia e comentários do Paratext.\nIsto pode envolver: \n\n ● dividindo o texto em unidades significativas \n ● identificação de problemas de tradução \n ● identificação de questões culturais  \n ● recontagem oral e processamento do texto\n\nDepois de compreender e interiorizar a passagem, pode ser útil recontá-lo no vernáculo sem olhar para o(s) texto(s) modelo(s).  Fazer isso pode libertar o pensamento do tradutor da influência da forma da linguagem modelo, criando uma tradução mais natural.',
              es: 'Estudie el texto cuidadosamente, utilizando recursos y comentarios de Paratext. \nEsto puede incluir: \n● dividiendo el texto en unidades significativas\n● identificación de problemas de traducción\n● identificación de cuestiones culturales\n● relato oral y procesamiento del texto \n\nDespués de entender el pasaje, puede ser útil volver a contarlo en lengua vernácula sin mirar el texto o textos modelo para liberar la mente del traductor de la forma del lenguaje modelo, creando una traducción más natural.',
              fr: 'Étudier attentivement le texte à l’aide des ressources et des commentaires de Paratext.\nCela peut impliquer :\n● découper le texte en unités significatives\n● identifier les problèmes de traduction\n● identifier les questions culturelles\n● raconter oralement et discuter le sens du texte\n\nAprès avoir compris et assimilé le passage, il est utile de le redire dans la langue vernaculaire sans regarder les textes modèles. Cela peut libérer l’esprit du traducteur de la forme du langage modèle, créant ainsi une traduction plus naturelle.',
              'zh-Hans':
                '使用《圣经辅助工具》中的资源、推荐的注释书和其他资源，仔细研究圣经文本。“翻译员工场”（Translator’s Workplace）资源集合包包含许多《圣经辅助工具》中没有的推荐资源。要了解更多关于“翻译员工场”的信息，以及查看您是否符合条件以获取该资源集合包，请访问：https://www.sil.org/resources/publications/tw/licensing\n\n解经可能包括：\n\n   ● 将文本划分成有意义的单元\n\n   ● 确定翻译方面的问题，包括关键术语\n\n   ●确定文化方面的问题\n\n   ● 确定段落中关键术语的意思，并考虑每个术语的每种意思在译入语中如何最佳地表达\n\n   ● 口头复述及处理文本\n\n\n\n  口头复述可以将翻译人员的思维从范本语言的形式中解放出来，创作出更为自然的译文。口头复述的基本流程是：先研读文本，直到完全理解整段经文；然后把段落复述给其他使用译入语言的人听。复述时，最好把范本文本放到一边，并用白话来复述。\n\n\n\n可以使用《圣经辅助工具》的资源增强版（Enhanced resources）、UBS手册、SIL翻译说明，或一本好的圣经字典，例如“翻译员工场”提供或团队领袖推荐的其他资源，来确定关键术语的含义。',
              'zh-Hant':
                "使用副文本資源、推薦評論和其他推薦資源仔細研究文本。 Translator's Workplace 資源集合包含許多 Paratext 中不提供的建議資源。若要了解更多有關 Translator's Workplace 的資訊並查看您是否有資格獲得此資源集合，請造訪：https://www.sil.org/resources/publications/tw/licensing\n\n\n\n\n\n註釋可能涉及：\n\n   ● 將文字分成有意義的單元\n\n   ● 辨識翻譯問題，包括關鍵術語\n\n   ● 識別文化問題\n\n   ● 研究文章中關鍵術語的含義，並考慮哪種受體語言翻譯最適合每個術語的每種含義\n\n   ● 口頭複述與處理文本\n\n\n\n\n\n    口語複述可以將譯者的思維從模型語言的形式中解放出來，創造出更自然的翻譯。基本過程是先學習文本，直到完全理解並內化該段落，然後將該段落複述給接受語言的其他使用者。最好用白話複述，而不看示範文本。\n\n\n\n\n\n學習關鍵術語可以在 Paratext 的增強資源之一中完成，查看 UBS 手冊、SIL 翻譯註釋或一本好的聖經詞典，例如 Translator's Workplace 集合中提供的字典或您的主管推薦的其他來源。",
              'pt-BR':
                "Estude o texto cuidadosamente, usando recursos do Paratext, comentários recomendados e outros recursos recomendados. A coleção de recursos do Translator's Workplace contém muitos recursos recomendados que não estão disponíveis no Paratext. Para saber mais sobre o Translator's Workplace e ver se você se qualifica para esta coleção de recursos, acesse: https://www.sil.org/resources/publications/tw/licensing\n\n\n\nA exegese pode envolver:\n\n   ● dividir o texto em unidades que façam sentido\n\n   ● identificar problemas de tradução, incluindo termos-chave\n\n   ● identificar questões culturais\n\n   ● estudar o significado dos termos-chave na passagem e considerar qual tradução da língua receptora seria melhor para cada sentido de cada termo\n\n   ● narração oral e processamento do texto\n\n\n\n    A narração oral pode libertar a mente do tradutor da forma da língua modelo, criando uma tradução mais natural. O processo básico é primeiro estudar o texto até compreender completamente e internalizar a passagem e, em seguida, recontar a passagem para outros falantes da língua receptora. É melhor recontá-lo no vernáculo sem olhar para o(s) texto(s) modelo.\n\n\n\nO estudo dos termos-chave pode ser feito em um dos Recursos aprimorados do Paratext, consultando o manual da UBS, as notas de tradução do SIL ou um bom Dicionário Bíblico, como os disponíveis na coleção Translator's Workplace ou outra fonte recomendada pelo seu supervisor.",
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '43884fe5-7bea-43f0-9b62-f424963d3638',
            names: {
              en: 'Create the first draft',
              pt: 'Criar o primeiro rascunho',
              es: 'Crear el primer borrador',
              fr: 'Rédaction de la première ébauche',
              'zh-Hans': '翻译初稿',
              'zh-Hant': '創建初稿',
              'pt-BR': 'Crie o primeiro rascunho',
            },
            descriptions: {
              en: 'Draft the text in Paratext using the natural patterns of the receptor language. Then re-read it to check for clear logical flow and typographical errors.\n\n    It is recommended to use the Biblical Terms Rendering window or an Enhanced Resource to see what renderings have been used and to add new renderings as needed.',
              pt: 'Rascunhar o texto em Paratext e reler para verificar se há erros tipográficos ou não. É recomendado usar a janela de renderização de termos bíblicos ou um recurso aprimorado para ver quais renderizações foram usadas e para adicionar novas renderizações conforme necessário.',
              es: 'Redacte el texto en Paratext y vuelva a leerlo para comprobar si hay errores tipográficos. Se recomienda usar la ventana de Traducciones de Vocablos Bíblico o un recurso aumentado para ver qué traducciones se han usado y para agregar nuevas traducciones según sea necesario.',
              fr: 'Rédiger le texte dans Paratext et le relire pour vérifier les erreurs de frappe. Il est recommandé d’utiliser la fenêtre Termes bibliques équivalents ou une ressource améliorée pour voir quels équivalents ont été utilisés et pour ajouter de nouveaux équivalents si nécessaire.',
              'zh-Hans':
                '在《圣经辅助工具》中，使用译入语的自然模式来翻译初稿。然后重新阅读稿件，检查逻辑是否流畅，以及是否存在拼写错误。\n\n  建议翻译人员使用“圣经专门用词”（Biblical Terms Rendering）窗口，或某个“资源增强版”（Enhanced Resource），来查看先前的译法，并根据需要添加新的译法。',
              'zh-Hant':
                '使用接收語言的自然模式起草副文本中的文字。然後重新閱讀以檢查是否有清晰的邏輯流程和印刷錯誤。\n\n\n\n\n\n    建議使用聖經術語渲染視窗或增強資源來查看已使用的渲染並根據需要添加新的渲染。',
              'pt-BR':
                'Faça o rascunho do texto no Paratext usando os padrões naturais da língua receptora. Em seguida, leia-o novamente para verificar se há um fluxo lógico claro e erros tipográficos.\n\n\n\n    Recomenda-se usar a janela Renderização de Termos Bíblicos ou um Recurso Aprimorado para ver quais renderizações foram usadas e adicionar novas renderizações conforme necessário.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
        ],
      },
      {
        id: '9443afef-8302-4727-8f85-1cb4ef464168',
        names: {
          en: 'Team Check & Comprehension Check',
          pt: 'Verificação em Equipe & Verificação de Compreensão',
          es: 'Comprobación por parte del equipo y comprobación de la comprensión',
          fr: 'Vérification en équipe et vérification de la compréhension',
          'zh-Hans': '小组检查与理解检查',
          'zh-Hant': '團隊檢查和理解檢查',
          'pt-BR': 'Verificação da equipe e verificação de compreensão',
        },
        descriptions: {
          en: 'The team checks the naturalness and exegesis of the draft, and then tests it with the target audience to make sure that it communicates well. \n\nIf you add any custom project note tags to your project, you will have to specify which stage(s) the automated checks for those tags will need to begin.',
          pt: 'A equipa verifica a naturalidade e a exegese do rascunho, depois testa-o com o público-alvo para se certificar de que se comunica bem. Se você adicionar quaisquer tags personalizadas de notas de projeto ao seu projeto, você terá que especificar qual(is) estágio(s) as verificações automatizadas para essas tags precisarão começar.',
          es: 'El equipo comprueba la naturalidad y exégesis del borrador, luego lo prueba con el público para asegurarse de que se comunica bien. \n\nSi añade etiquetas de nota de proyecto personalizadas a su proyecto, tendrá que especificar en qué etapa(s) deben comenzar las comprobaciones automáticas de dichas etiquetas.',
          fr: 'L’équipe vérifie le caractère naturel et l’exégèse du projet, puis elle l’essaie avec le public cible pour s’assurer qu’il communique bien.\n\nSi vous ajoutez des balises de notes de projet personnalisées à votre projet, vous devrez spécifier à quelle(s) étape(s) les contrôles automatisés de ces balises devront commencer.',
          'zh-Hans':
            '小组检查初稿的自然度和解经上的准确性，然后由目标受众来测试，以确保初稿准确传达了文本的意思。\n\n如果您在项目上添加了任何自定义的项目附注标签，务必具体说明这些标签的自动检查要在哪个阶段执行。',
          'zh-Hant':
            '團隊檢查草稿的自然性和解釋，然後與目標受眾進行測試，以確保其能夠良好傳達。\n\n\n\n\n\n如果您為專案新增任何自訂項目註解標籤，則必須指定這些標籤的自動檢查需要開始哪個階段。',
          'pt-BR':
            'A equipe verifica a naturalidade e a exegese do rascunho e depois testa com o público-alvo para garantir que comunique bem.\n\n\n\nSe você adicionar tags de nota do projeto personalizadas ao seu projeto, você vai precisar especificar em qual(is) etapa(s) as verificações automáticas dessas tags vão precisar iniciar.',
        },
        tasks: [
          {
            id: '3480d1ca-6ee7-40eb-a31e-f0e06dbf73a8',
            names: {
              en: 'Exegetical check',
              pt: 'Verificação exegética',
              es: 'Comprobación exegética',
              fr: 'Contrôle exégétique',
              'zh-Hans': '解经检查',
              'zh-Hant': '釋經檢查',
              'pt-BR': 'Verificação exegética',
            },
            descriptions: {
              en: 'The exegetical checking should include at least the following:\n   ●compare the draft with one or two translations in the national language\n   ●identify any missing verses or sentences\n   ●discuss exegetical choices that have been made in the translation\n   ●identify possible exegetical mistakes in the translation\n   ●adjust text as necessary to resolve any issues found',
              pt: 'Comparar o rascunho com uma ou duas traduções na língua nacional, discutir escolhas exegéticas que foram feitas na tradução, identificar possíveis erros exegéticos na tradução; identificar quaisquer versículos ou frases em falta. Ajuste o texto conforme necessário para resolver quaisquer problemas encontrados.',
              es: 'Compare el borrador con una o dos traducciones en el idioma nacional, discuta las elecciones exegéticas que se han hecho en la traducción, identifique posibles errores exegéticos en la traducción, identifique cualquier versículo u oración que falte. Ajuste el texto según sea necesario para resolver cualquier problema que encuentre.',
              fr: 'Comparer le projet avec une ou deux traductions dans la langue nationale, discuter des choix exégétiques qui ont été faits dans la traduction, identifier les erreurs exégétiques possibles dans la traduction, et identifier les versets ou phrases manquants. Ajuster le texte, si nécessaire, pour résoudre tout problème trouvé.',
              'zh-Hans':
                '解经检查至少应包括以下内容：\n\n   ● 将初稿与一两个国家语言译本进行比较\n\n   ● 找出缺漏的经节或句子\n\n   ● 讨论翻译时做出的解经选择\n\n   ● 找出译文中可能存在的解经错误\n\n   ● 根据需要调整文本，解决发现的所有问题',
              'zh-Hant':
                '釋經檢查至少應包括以下內容：\n\n   ●將草稿與一兩個國家語言的譯文進行比較\n\n   ●找出任何缺少的詩句或句子\n\n   ●討論翻譯中的釋經選擇\n\n   ●找出翻譯中可能存在的釋經錯誤\n\n   ●根據需要調整文字以解決發現的任何問題',
              'pt-BR':
                'A verificação exegética deve incluir pelo menos o seguinte:\n\n   ●comparar o rascunho com uma ou duas traduções no idioma nacional\n\n   ● identificar qualquer versículo ou frase que esteja faltando\n\n   ●discutir escolhas exegéticas que foram feitas na tradução\n\n   ●identificar possíveis erros exegéticos na tradução\n\n   ●ajustar o texto conforme necessário para resolver qualquer problema encontrado',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '7bebeaeb-5932-4232-add9-22f60ac05007',
            names: {
              en: 'Naturalness check',
              pt: 'Verificar de naturalidade do Texto',
              es: 'Control de la naturalidad',
              fr: 'Contrôle du caractère naturel',
              'zh-Hans': '自然度检查',
              'zh-Hant': '自然度檢查',
              'pt-BR': 'Verificação de naturalidade',
            },
            descriptions: {
              en: 'Read the draft aloud with the team. While reading the text, check the general flow of the discourse, its logic, chronology, participant reference, sentence length & rhythm, language style and register, etc. Adjust text as necessary to resolve any issues found.',
              pt: 'Leia o rascunho. Ao ler o texto, verifique o fluxo geral do discurso, sua lógica, cronologia, referência do participante, duração e ritmo da frase, estilo de linguagem e registro, etc. Ajuste o texto conforme necessário para resolver quaisquer problemas encontrados.',
              es: 'Leer el borrador, comprobar el flujo general del discurso, su lógica, cronología, referencia del participante, duración y ritmo de la oración, estilo y registro del lenguaje, etc. Ajuste el texto según sea necesario para resolver cualquier problema que encuentre.',
              fr: 'Lire l’ébauche. Pendant la lecture du texte, vérifier la fluidité du discours, sa logique, sa chronologie, les références aux participants, la longueur et le rythme des phrases, le style et le registre linguistique, etc. Ajuster le texte, si nécessaire, pour résoudre tout problème trouvé.',
              'zh-Hans':
                '团队一起朗读初稿。阅读译文时，检查语篇的总体流畅性、逻辑、时序、参与者指称、句子长度和节奏、语言风格等。根据需要调整文本，解决发现的所有问题。',
              'zh-Hant':
                '與團隊一起大聲朗讀草稿。閱讀文本時，檢查話語的整體流程、邏輯、時間順序、參與者參考、句子長度和節奏、語言風格和語體等。',
              'pt-BR':
                'Leia o rascunho em voz alta com a equipe. Durante a leitura do texto, verifique o fluxo geral do discurso, sua lógica, cronologia, referência dos participantes, comprimento e ritmo das frases, estilo e registro linguístico etc. Ajuste o texto conforme necessário para resolver qualquer problema encontrado.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: 'f501021c-2ae1-4579-a5a8-ceb9d63979c5',
            names: {
              en: 'Draft supplementary materials',
              pt: 'Fazer versões preliminares de materiais suplementares',
              es: 'Proyectos de materiales suplementarios',
              fr: 'Rédaction des ébauches de matériels supplémentaires',
              'zh-Hans': '起草补充材料',
              'zh-Hant': '補充資料草案',
              'pt-BR': 'Rascunho de materiais adicionais',
            },
            descriptions: {
              en: 'These materials may include: \n● section headings\n● footnotes\n● cross-references\n● illustrations (including captions)\n● maps\n● glossary entries\n● book introductions.',
              pt: 'Estes materiais podem incluir: \n\n ● títulos de secção \n ● notas de rodapé\n ● referências cruzadas\n ● ilustrações (incluindo legendas)\n ● mapas\n ● entradas do glossário\n ● introduções de livros',
              es: 'Estos materiales pueden incluir: \n● títulos de las secciones\n● notas a pie de página\n● referencias cruzadas\n● ilustraciones (incluyendo subtítulos)\n● mapas\n● entradas de glosario\n● introducciones a los libros',
              fr: 'Ces matériels peuvent comprendre :\n● titres des sections\n● notes de bas de page\n● renvois\n● illustrations (y compris les légendes)\n● cartes\n● entrées du glossaire\n● introductions des livres',
              'zh-Hans':
                '这些材料可能包括：\n\n●分段标题 \n\n● 脚注\n\n● 经文参照\n\n●插图（包括说明）\n\n● 地图 \n\n● 词汇表条目\n\n● 书卷简介',
              'zh-Hant':
                '這些材料可能包括：\n\n● 章節標題\n\n● 註腳\n\n● 交叉引用\n\n● 插圖（包括說明文字）\n\n● 地圖\n\n● 詞彙表條目\n\n● 書籍簡介。',
              'pt-BR':
                'Esses materiais podem incluir:\n\n● títulos de seção\n\n● notas de rodapé\n\n● referências cruzadas\n\n● ilustrações (incluindo legendas)\n\n● mapas\n\n● verbetes do glossário\n\n● introduções de livros.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: '427692d3-6cd1-450b-a90f-a09d64fa3610',
            names: {
              en: 'Format check',
              pt: 'Verificação de formatação',
              es: 'Verificación de formato',
              fr: 'Vérification du formatage du texte',
              'zh-Hans': '格式检查',
              'zh-Hant': '格式檢查',
              'pt-BR': 'Verificação de formatação',
            },
            descriptions: {
              en: 'The format checking should include at least the following:\n   ●Check the layout, indents, and special formatting.\n   ●Read the text and verify that the paragraph breaks are in the desired places.\n   ●If another translation is used as a base then this check can be done using \n     Tools> Checklists> Markers and look for the new paragraph markers such as \\p,             and \\m. \n\n●It may be useful to check the section headings using Tools> Checklists> Section Headings. \n\n●Consider verifying other types of formatting in your project, such as poetry,    genealogies, other lists, words on the cross or any other special formatting in your project.\n\nParticular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools > Checklists > Markers and by looking for the new paragraph markers such as \\q, \\q1, and \\q2. \n\n●Verify that text is marked using the correct standard format markers (USFMs) for any additional special formatting such as genealogies, lists, words on the cross, letters, etc.\n\nFor more information on how to correctly use the standard format markers (USFMs), see http://ubsicap.github.io/usfm/v2.5/index.html for the latest guide to the USFM 2.5 standard and https://ubsicap.github.io/usfm/ for the USFM 3.0 standard.',
              pt: 'Verifique o layout, os recuos e a formatação especial.\n\nLeia o texto e verifique se as quebras de parágrafo estão nos locais desejados. Se outra tradução for usada como base, então esta verificação pode ser feita usando Ferramentas> Listas de Verificações> Marcadores e procure os novos marcadores de parágrafo como \\p, e \\m. \n\nPode ser útil verificar os cabeçalhos das seções usando Ferramentas> Listas de Verificações > Títulos de Secção. \n\nVerifique outras questões de layout, como poesia. Especial atenção deve ser dada às indentações de poesia. Se outra tradução for usada como base, então esta verificação pode ser feita usando Ferramentas> Listas de Verificações> Marcadores e procure os novos marcadores de parágrafo como \\q, \\q1 e \\q2. \n\nVeja a lista de questões especiais de formatação como genealogias, palavras na cruz, letras, etc. \n\nVerifique se o texto está marcado usando os marcadores de formato padrão corretos (USFMs). Consulte https://ubsicap.github.io/usfm para ver a documentação USFM.',
              es: 'Compruebe el diseño, las sangrías y el formato especial.\nLea el texto y verifique que los saltos de párrafo estén en los lugares deseados. Si se utiliza otra traducción como base, esta comprobación se puede hacer utilizando Herramientas > Lista de verificaciones > Marcadores y buscar los marcadores de párrafo como \\p, y \\m. \n\nPuede ser útil comprobar los encabezados de las secciones mediante Herramientas > Lista de verificaciones > Encabezados de secciones. \n\nVerifique otros aspectos de diseño como la poesía. Se debe prestar especial atención a las sangrías poéticas. Si se utiliza otra traducción como base, esta comprobación se puede realizar utilizando Herramientas > Lista de verificaciones > Marcadores y buscar los marcadores de párrafo como \\q, \\q1 y \\q2. \n\nVer lista de temas especiales de formato como genealogías, palabras en la cruz, cartas, etc. \n\nVerifique que el texto esté marcado utilizando los marcadores de formato estándar (USFM) correctos. Ver https://ubsicap.github.io/usfm para la documentación de USFM.',
              fr: 'Vérifier la mise en page, les retraits et le formatage spécial.\nLire le texte et vérifier que les sauts de paragraphe se trouvent aux endroits souhaités. Si une autre traduction est utilisée comme base, cette vérification peut être faite en utilisant Outils> Listes récapitulatives> Marqueurs et rechercher les nouveaux marqueurs de paragraphe tels que \\p et \\m.\n\nIl peut être utile de vérifier les en-têtes de section à l’aide de Outils> Listes récapitulatives> En-têtes de section.\n\nVérifier d’autres questions de mise en page telles que la poésie. Une attention particulière devrait être accordée aux retraits de poésie. Si une autre traduction est utilisée comme base, cette vérification peut être effectuée en utilisant Outils> Listes récapitulatives> Marqueurs et rechercher les nouveaux marqueurs de paragraphe tels que \\q, \\q1 et \\q2.\n\nVoir la liste des questions spéciales de mise en forme telles que les généalogies, les mots sur la croix, les lettres, etc.\n\nVérifier que le texte est marqué à l’aide des marqueurs corrects de format standard (USFM). Voir https://ubsicap.github.io/usfm pour la documentation de l’USFM.',
              'zh-Hans':
                '格式检查至少应该包括以下内容：\n\n   ● 检查布局、缩进和特殊格式。\n\n   ●阅读译文，确保分段的位置正确。\n\n   ●如果使用另一个译本作为基础文本，则可以使用“工具> 检查表工具>格式码”，并查找新的段落标记，如 \\p 和 \\m，来完成这项检查。\n\n●可以使用“工具> 检查表工具>分段标题”，来完成这项检查。\n\n●考虑检查项目中其他类型的格式，例如诗体、家谱、其他清单、在十字架上所写的指控 ，或项目中的其他任何特殊格式。\n\n请特别留意诗歌的缩进。如果使用另一个译本作为基础文本，那么可以使用“工具> 检查表工具>格式码“并通过查找新的段落标记，如 \\q，\\q1和 \\q2等，来完成这项检查。\n\n●确保文本中任何补加的特殊格式，例如家谱、清单、在十字架上所写的指控、字母等、均使用正确的标准格式码（USFM）\n\n\n\n关于如何正确使用标准格式码的更多信息，请参见 http://ubsicap.github.io/usfm/v2.5/index.html，以获取USFM 2.5标准的最新指南；另参见 http://ubsicap.github.io/usfm/v3.0.0/index.html 以获取USFM 3.0标准的最新指南。',
              'zh-Hant':
                '格式檢查至少應包括以下內容：\n\n   ●檢查版面、縮排和特殊格式。\n\n   ●閱讀文字並驗證段落分隔符號是否位於所需的位置。\n\n   ●如果使用另一個翻譯作為基礎，則可以使用下列命令完成此檢查\n\n     工具 > 檢查表 > 標記並尋找新的段落標記，例如 \\p 和 \\m。\n\n\n\n\n\n●使用「工具」>「清單」>「章節標題」檢查章節標題可能會很有用。\n\n\n\n\n\n●考慮驗證項目中的其他類型的格式，例如詩歌、家譜、其他清單、十字架上的單字或項目中的任何其他特殊格式。\n\n\n\n\n\n應特別注意詩歌縮排。如果使用另一個翻譯作為基礎，則可以使用「工具」>「清單」>「標記」並尋找新的段落標記（例如 \\q、\\q1 和 \\q2）來完成此檢查。\n\n\n\n\n\n● 驗證文字是否使用正確的標準格式標記 (USFM) 標記任何其他特殊格式，例如家譜、清單、十字架上的單字、字母等。\n\n\n\n\n\n有關如何正確使用標準格式標記 (USFM) 的更多信息，請參閱 http://ubsicap.github.io/usfm/v2.5/index.html 以獲取 USFM 2.5 標準的最新指南和 https:// ubsicap .github.io/usfm/ 用於USFM 3.0 標準。',
              'pt-BR':
                'A Verificação de formatação deve incluir pelo menos o seguinte:\n\n   ●Verificar o layout, os recuos e a formatação especial.\n\n   ●Ler o texto e verificar se as quebras de parágrafo estão nos locais desejados.\n\n   ●Se outra tradução for usada como base, esta verificação poderá ser feita usando\n\n     Ferramentas> Listas de verificação> Marcadores e procurar os novos marcadores de parágrafo, como \\p e \\m.\n\n\n\n●Pode ser útil verificar os títulos das seções em Ferramentas> Listas de verificação> Título da seção.\n\n\n\n● É recomendável verificar outros tipos de formatação do seu projeto, como poesia, genealogias, outras listas, palavras na cruz ou qualquer outra formatação especial do seu projeto.\n\n\n\nAtenção especial deve ser dada aos recuos de poesia. Se outra tradução for usada como base então esta verificação pode ser feita usando Ferramentas > Listas de Verificação > Marcadores e procurando pelos novos marcadores de parágrafo como \\q, \\q1 e \\q2.\n\n\n\n●Verifique se o texto está marcado usando os marcadores de formato padrão (USFMs) corretos para qualquer formatação especial adicional, como genealogias, listas, palavras na cruz, letras etc.\n\n\n\nPara obter mais informações sobre como usar corretamente os marcadores de formatação padrão (USFMs), consulte http://ubsicap.github.io/usfm/v2.5/index.html para obter o guia mais recente do padrão USFM 2.5 e https:// ubsicap.github.io/usfm/ para o padrão USFM 3.0.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '75365725-9717-46de-85f9-413d44af9b59',
            names: {
              en: 'Prepare for comprehension testing',
              pt: 'Preparo para o teste de compreensão',
              es: 'Prepárese para la prueba de comprensión',
              fr: 'Préparation pour le test de compréhension',
              'zh-Hans': '准备理解测试：',
              'zh-Hant': '準備理解測試',
              'pt-BR': 'Preparo para o teste de compreensão',
            },
            descriptions: {
              en: 'Prepare comprehension testing questions: \n● Re-read the translation text\n● Draft general retell questions for comprehension testing\n● Identify possible issues of misunderstanding\n● Draft specific questions related to the main events in the passage, participant reference, key terms, foreign concepts, metaphors, rhetorical questions, inferential information, positive or negative associations, etc.\n\nThis task is different from the community reviewing in stage 5.  It uses a set of specific questions and retelling activities to see if the translation is communicating clearly and accurately the meaning of the source text.  Often a set of specific individuals who have been trained in comprehension testing are used.  Some translation consultants want this check done before they come for the consultant check, while others want to be present when the comprehension checking is performed.  You should adjust the project plan according to your team’s work flow.',
              pt: 'Preparar perguntas de teste de compreensão: \n\n● Releia o texto da tradução\n\n● Redigir perguntas gerais de recontagem para testes de compreensão\n\n● Identificar possíveis problemas de mal-entendidos\n\n● Redigir perguntas específicas relacionadas com os principais eventos da passagem, referência ao participante, termos-chave, conceitos estrangeiros, metáforas, perguntas retóricas, informações inferenciais, associações positivas ou negativas, etc.',
              es: 'Preparar preguntas para la prueba de comprensión: \n● Releer el texto traducido\n● Redactar las preguntas generales del relato para la prueba de comprensión\n● Identificar posibles problemas de malentendidos\n● Redactar las preguntas específicas relacionadas con los principales eventos del pasaje, referencia de los participantes, términos clave, conceptos extranjeros, metáforas, preguntas retóricas, información inferencial, asociaciones positivas o negativas, entre otras.',
              fr: 'Préparer les questions du test de compréhension :\n● Relire le texte traduit\n● Ecrire des questions de reformulation pour tester la compréhension\n● Identifier les problèmes possibles de mauvaise compréhension\n● Rédiger des questions spécifiques liées aux principaux événements du passage, aux références des participants, aux termes clés, aux concepts étrangers, aux métaphores, aux questions rhétoriques, aux informations déduites, aux associations positives ou négatives, etc.',
              'zh-Hans':
                '准备理解测试问题：\n\n●重新阅读译文 \n\n●起草用于理解测试的一般性复述问题\n\n●找出可能存在错误理解的问题\n\n●起草与以下内容有关的具体问题：经文主要事件、参与者指称、关键术语、外来词、隐喻、反问句、推理信息、正面或负面关联，等等。\n\n这任务与第5阶段的社群审阅不同。它通过一系列具体的问题和复述，来检查译文是否清楚准确地传达了源文本的意思。这任务通常由一组熟悉理解测试的特定人员完成。有些翻译顾问希望在他们进行顾问检查之前，这项检查已经完成，还有一些翻译顾问则希望在进行理解检查时在场。您可以根据小组的工作流程，来调整项目计划。',
              'zh-Hant':
                '準備理解測驗題：\n\n● 重讀翻譯文本\n\n● 起草用於理解測試的一般複述問題\n\n● 辨識可能有誤解的問題\n\n● 起草與文章中的主要事件、參與者參考、關鍵術語、外來概念、隱喻、反問句、推理訊息、正面或負面聯想等相關的具體問題。\n\n\n\n\n\n此任務與第 5 階段的社群審查不同。通常會使用一組接受過理解測試訓練的特定人員。一些翻譯顧問希望在進行顧問檢查之前完成此檢查，而另一些翻譯顧問則希望在進行理解檢查時在場。您應該根據團隊的工作流程調整專案計畫。',
              'pt-BR':
                'Prepare perguntas para o teste de compreensão:\n\n● Releia o texto da tradução\n\n● Faça o rascunho de perguntas gerais da narração para o teste de compreensão\n\n● Identifique possíveis problemas de má compreensão\n\n● Elabore perguntas específicas relacionadas aos principais eventos da passagem, referência dos participantes, termos-chave, conceitos estrangeiros, metáforas, perguntas retóricas, informação inferencial, associações positivas ou negativas, etc.\n\n\n\nEssa tarefa é diferente da revisão da comunidade da etapa 5. Utiliza um conjunto de perguntas específicas e atividades de narração para verificar se a tradução está comunicando de forma clara e precisa o significado do texto de origem. Frequentemente, é usado um conjunto de indivíduos específicos que foram treinados em testes de compreensão. Alguns consultores de tradução desejam que essa verificação seja feita antes de comparecerem para a verificação do consultor, enquanto outros desejam estar presentes quando a verificação de compreensão for realizada. Você deve ajustar o plano do projeto de acordo com o fluxo de trabalho da sua equipe.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'e2642958-0d86-450b-8c6d-df076b05ab5f',
            names: {
              en: 'Perform comprehension testing',
              pt: 'Realizar testes de compreensão',
              es: 'Realizar pruebas de comprensión',
              fr: 'Tests de compréhension',
              'zh-Hans': '进行理解测试',
              'zh-Hant': '執行理解測試',
              'pt-BR': 'Realizar testes de compreensão',
            },
            descriptions: {
              en: 'Perform comprehension testing, documenting feedback/answers for later analysis/review. Include supplementary materials in testing. The materials should all be tested with several different members of the language community.',
              pt: 'Realizar testes de compreensão, documentando feedback/respostas para posterior análise/revisão. Incluir materiais suplementares nos testes.',
              es: 'Realizar pruebas de comprensión, documentando comentarios/respuestas para su análisis/revisión. Incluya materiales suplementarios en las pruebas.',
              fr: 'Effectuer des tests de compréhension, documenter le feedback et les réponses pour une analyse/révision ultérieure. Inclure les matériels supplémentaires dans les tests.',
              'zh-Hans':
                '进行理解测试，记录反馈/回复，以供后续分析/审读。在测试时提供补充材料。所有材料都应由译入语言社群几个不同的成员进行测试。',
              'zh-Hant':
                '執行理解測試，記錄回饋/答案以供以後分析/審查。在測試中包括補充材料。這些材料都應該由語言社群的幾個不同成員進行測試。',
              'pt-BR':
                'Realize testes de compreensão, documentando feedback/respostas para análise/revisão posterior. Inclua materiais adicionais nos testes. Todos os materiais devem ser testados com vários membros diferentes da comunidade linguística.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 100,
              easy: 85,
              moderate: 70,
              difficult: 60,
            },
          },
          {
            id: '17f2161c-086e-4016-975d-c58dfb7f55cf',
            names: {
              en: 'Revise from feedback',
              pt: 'Revisão baseada em feedback',
              es: 'Revisar a partir de los comentarios',
              fr: 'Révision à partir du feedback',
              'zh-Hans': '根据反馈进行修改',
              'zh-Hant': '根據回饋進行修改',
              'pt-BR': 'Revisão baseada no feedback',
            },
            descriptions: {
              en: 'The team reviews the results of the comprehension testing and incorporates changes to the text where appropriate. Repeat comprehension testing for revised passages as necessary.',
              pt: 'A equipa revê os resultados do teste de compreensão e incorpora alterações ao texto sempre que necessário. Se necessário, repita o teste de compreensão para as passagens revistas.',
              es: 'El equipo revisa los resultados de las pruebas de comprensión e incorpora cambios al texto cuando es apropiado. Repita la prueba de comprensión para los pasajes revisados según sea necesario.',
              fr: 'L’équipe examine les résultats des tests de compréhension et apporte des modifications au texte, si nécessaire. Répéter les tests de compréhension pour les passages révisés, au besoin.',
              'zh-Hans':
                '小组审阅理解测试的结果，并对文本进行相应的修改。如有需要，对修改后的段落再次进行理解测试。',
              'zh-Hant':
                '團隊審查理解測試的結果，並在適當的情況下對文本進行更改。必要時對修改後的段落重複理解測試。',
              'pt-BR':
                'A equipe analisa os resultados dos testes de compreensão e incorpora alterações no texto quando apropriado. Repita o teste de compreensão para passagens revisadas conforme necessário.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
        ],
      },
      {
        id: '20974cee-9f40-43c4-a0ae-5e733238e134',
        names: {
          en: 'Preparing for Consultant',
          pt: 'Preparo para a verificação do Consultor',
          es: 'Prepárese para el Consultor',
          fr: 'Préparation pour le consultant',
          'zh-Hans': '为顾问的工作做准备',
          'zh-Hant': '為顧問做準備',
          'pt-BR': 'Preparo para a verificação do Consultor',
        },
        descriptions: {
          en: "The goal of this stage is to prepare the back translation for the consultant. \n\nAutomatic checks for missing and out of date verses in the back translation must be set to run at this stage. This check requires that the back translation project is associated with your project.\n\nNote: The translation consultant may ask that other tasks be completed before the consultant check occurs. For example, the consultant may ask that the renderings for certain Biblical terms be added to the Biblical terms tool, or all project notes be resolved.  If additional tasks such as these are part of your team's process, then add them to your project plan in this stage.",
          pt: 'O objetivo desta etapa é preparar a retrotradução para o consultor. \n\nVerificações automáticas de versículos ausentes e desatualizados na retrotradução devem ser feitas nesta fase. Esta verificação requer que o projeto de retrotradução seja associado ao seu projeto.',
          es: 'El objetivo de esta etapa es preparar la retrotraducción para el consultor. \n\nLas verificaciones automáticas de los versículos faltantes y obsoletos en la retrotraducción deben configurarse para que se ejecuten en esta etapa después de haber asociado un proyecto de retrotraducción a este proyecto.',
          fr: 'L’objectif de cette étape est de préparer la retraduction pour le consultant.\n\nA ce stade, les contrôles automatiques des versets manquants et obsolètes dans la retraduction doivent être activés. Cette vérification exige que le projet de retraduction soit associé à votre projet.',
          'zh-Hans':
            '此阶段的目的是为翻译顾问准备回译内容。\n\n\n\n在这个阶段，必须设置自动检查，以检查回译中缺失或陈旧的经节。此检查要求回译项目必须与您的项目相关联。\n\n\n\n注意：翻译顾问可能会要求先完成其他任务，然后再进行顾问检查。例如，翻译顾问可能会要求将某些圣经专门用词添加到圣经专门用词工具中，或解决项目中的所有附注。如果这些额外任务是您小组工作流程中的一部分，请在这个阶段将其添加到项目计划中。',
          'zh-Hant':
            '此階段的目標是為顧問準備反向翻譯。\n\n\n\n\n\n必須將自動檢查回譯中遺失和過時的經文設定為在此階段運行。此檢查要求反向翻譯項目與您的項目相關聯。\n\n\n\n\n\n注意：翻譯顧問可能會要求在顧問檢查發生之前完成其他任務。例如，顧問可能會要求將某些聖經術語的效果圖添加到聖經術語工具中，或解決所有項目註釋。如果諸如此類的其他任務是您團隊流程的一部分，請在此階段將它們添加到您的專案計劃中。',
          'pt-BR':
            'O objetivo desta etapa é preparar a retrotradução para o consultor.\n\n\n\nVerificações automáticas de versículos que faltam ou estão desatualizados na retrotradução devem ser configuradas para serem executadas nesta etapa. Esta verificação requer que o projeto de retrotradução esteja associado ao seu projeto.\n\n\n\nNota: O consultor de tradução pode solicitar que outras tarefas sejam concluídas antes da verificação do consultor. Por exemplo, o consultor pode solicitar que as traduções de certos termos bíblicos sejam adicionadas à ferramenta de termos bíblicos ou que todas as notas do projeto sejam resolvidas. Se tarefas adicionais como essas fizerem parte do processo da sua equipe, adicione-as ao plano do projeto nesta etapa.',
        },
        tasks: [
          {
            id: '0b6970df-00ce-4da4-a46a-28be4c7f2e6a',
            names: {
              en: 'Draft the back translation',
              pt: 'Rascunho da Retrotradução',
              es: 'Redactar la retrotraducción',
              fr: 'Rédaction de la retraduction',
              'zh-Hans': '起草回译',
              'zh-Hant': '起草反向翻譯',
              'pt-BR': 'Rascunho da Retrotradução',
            },
            descriptions: {
              en: 'The back translation is created by someone who was not involved in the translation. The goal is to show how a reader will understand the text. It must be prepared without looking at any other translation or version or resource. The text is entered into the back translation project.',
              pt: 'A retrotradução é criada por alguém que não estava envolvido na tradução. O objetivo é mostrar como um leitor comum irá entender o texto. O texto é introduzido no projecto de retrotradução.',
              es: 'La retrotraducción es creada por alguien que no estuvo involucrado en la traducción, para mostrar cómo un lector entenderá el texto. El texto se introduce en el proyecto de retrotraducción.',
              fr: 'La retraduction est créée par quelqu’un qui n’a pas participé à la traduction. Le but est de montrer comment le lecteur comprendra le texte. Le texte est saisi dans le projet de retraduction.',
              'zh-Hans':
                '回译须由没有参与翻译的人来起草。目的是展示读者如何理解译文。回译工作不应参考任何其他译本、版本或资源。回译文本应该输入到回译项目中。',
              'zh-Hant':
                '反向翻譯是由未參與翻譯的人員創建的。目的是向讀者展示如何理解文本。必須在不查看任何其他翻譯、版本或資源的情況下準備它。文字被輸入到反向翻譯項目。',
              'pt-BR':
                'A retrotradução é criada por alguém que não esteve envolvido na tradução. O objetivo é mostrar como o leitor compreenderá o texto. Deve ser preparada sem consultar qualquer outra tradução, versão ou recurso. O texto é inserido no projeto de retrotradução.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '7c50ab22-d2cb-415b-b5b7-be52aaf02016',
            names: {
              en: 'Check back translation',
              pt: 'Verifica a Retrotradução',
              es: 'Comprobar la retrotraducción',
              fr: 'Vérification de la retraduction',
              'zh-Hans': '检查回译',
              'zh-Hant': '檢查翻譯',
              'pt-BR': 'Verificação da Retrotradução',
            },
            descriptions: {
              en: 'The team should verify that back translation is complete, and mark all verses as finished in Paratext. Do not change the words used when checking the text.  Minor spelling problems are allowed.  The back translation is merely an aid for the consultant and will not be published in most cases.  Often it is the parts that appear to be poor grammar in the national language, that are most helpful for the consultant to see. However, spelling errors that are bad enough to prevent the consultant from understanding the back translation should be corrected.',
              pt: 'A equipe deve verificar se a retrotradução está completa, e marcar todos os versículos como concluídos no Paratext.',
              es: 'El equipo debe verificar que la retrotraducción esté completa, y marcar todos los versículos como terminados en Paratext.',
              fr: 'L’équipe doit vérifier que la retraduction est complète et marquer tous les versets comme achevés dans Paratext.',
              'zh-Hans':
                '小组应确保回译完整，并在《圣经辅助工具》中标记所有经节已完成。检查文本时，请不要改动文字，拼写方面的小问题则可以修改。回译的作用只是辅助翻译顾问的工作，在大多数情况下都不会出版。通常，在回译到国家语言中语法最不好的那些部分，最需要由顾问来检查。不过，如果拼写错误严重到妨碍顾问正常理解回译，那就要予以纠正。',
              'zh-Hant':
                '團隊應驗證反向翻譯是否完成，並在副文本中將所有經文標記為完成。檢查文字時不要更改所使用的字詞。允許出現小拼字問題。回譯只是對顧問的幫助，大多數情況下不會發布。通常，對顧問來說最有幫助的是本國語言中語法看起來很差的部分。但是，如果拼字錯誤嚴重到妨礙顧問理解反向翻譯，則應予以糾正。',
              'pt-BR':
                'A equipe deve verificar se a retrotradução está completa e marcar todos os versículos como finalizados no Paratext. Não altere as palavras usadas ao verificar o texto. Pequenos problemas ortográficos são permitidos. A retrotradução é apenas uma ajuda para o consultor e não será publicada na maioria dos casos. Muitas vezes são as partes que parecem ser de gramática ruim na língua nacional que são mais úteis para o consultor observar. No entanto, erros ortográficos que sejam graves o suficiente para impedir que o consultor compreenda a retrotradução devem ser corrigidos.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 100,
              easy: 85,
              moderate: 70,
              difficult: 60,
            },
          },
        ],
      },
      {
        id: 'b270751c-03d8-463b-abbf-5c8e3c4a188b',
        names: {
          en: 'Consultant Check',
          pt: 'Verificação do Consultor',
          es: 'Comprobación del consultor',
          fr: 'Vérification du conseiller',
          'zh-Hans': '顾问检查',
          'zh-Hant': '顧問檢查',
          'pt-BR': 'Verificação do Consultor',
        },
        descriptions: {
          en: "The consultant interacts with the team remotely to prepare for the checking session, and then plans a time when they can meet to review the text together.  At the end of the checking session, the team has some work to comply with the consultant's suggestions.  When the consultant is satisfied the improvements have been made, a report or statement is submitted to the team showing the text has been approved.",
          pt: 'O consultor interage com a equipe remotamente para se preparar para a sessão de verificação e, em seguida, marque uma data em que eles podem se reunir para revisar o texto juntos.  No final da sessão de verificação, a equipe tem algum trabalho para cumprir as sugestões do consultor.  Quando o consultor está satisfeito que as melhorias foram feitas, um relatório ou declaração é enviado à equipe mostrando que o texto foi aprovado.',
          es: 'El consultor interactúa con el equipo de forma remota para prepararse para la sesión de verificación y, a continuación, planifica un momento en el que pueden reunirse para revisar el texto juntos.  Al final de la sesión de verificación, el equipo tiene algo de trabajo para cumplir con las sugerencias del consultor.  Una vez que el consultor está satisfecho con los cambios realizados, se presenta un informe o declaración al equipo que muestra que el texto ha sido aprobado.',
          fr: 'Le conseiller communique à distance avec l’équipe pour préparer la séance de vérification, puis planifie un moment où ils peuvent se rencontrer pour réviser le texte ensemble. A la fin de la séance de vérification, l’équipe a du travail à faire pour se conformer aux suggestions du conseiller. Si le conseiller est satisfait des améliorations apportées, un rapport ou une déclaration est soumis à l’équipe indiquant que le texte a été approuvé.',
          'zh-Hans':
            '顾问与小组远程互动，为检查会议做准备。然后计划一个时间，与小组一起审阅文本。在检查会议的最后，小组根据顾问的建议，还要完成一些工作。当顾问对改进感到满意时，会向小组提交一份报告或声明，表明该文本已获核准。',
          'zh-Hant':
            '顧問與團隊遠端互動，為檢查會議做準備，然後規劃他們可以一起審查文本的時間。檢查結束後，團隊需要做一些工作來遵守顧問的建議。當顧問對改進感到滿意時，就會向團隊提交一份報告或聲明，表明文本已獲得批准。',
          'pt-BR':
            'O consultor interage remotamente com a equipe para se preparar para a sessão de verificação e, em seguida, planeja um horário em que possam se reunir para revisar o texto juntos. Ao final da sessão de verificação, a equipe terá algum trabalho a fazer para atender às sugestões do consultor. Quando o consultor estiver satisfeito com as correções feitas, um relatório ou comunicado é enviado à equipe demonstrando que o texto foi aprovado.',
        },
        tasks: [
          {
            id: 'fd6c2f9b-c34f-4762-bcd0-845ff03c1785',
            names: {
              en: 'Preliminary evaluation of text',
              pt: 'Avaliação preliminar do texto',
              es: 'Evaluación preliminar del texto',
              fr: 'Évaluation préliminaire du texte',
              'zh-Hans': '文本初步评估',
              'zh-Hant': '文本初步評估',
              'pt-BR': 'Avaliação preliminar do texto',
            },
            descriptions: {
              en: 'The consultant receives the text in advance and makes preliminary evaluations. The consultant’s comments for the team are placed in the translation or back translation using project notes. The evaluation should focus on accuracy, clarity, naturalness, and acceptability of the translation. The consultant will also evaluate all supplementary materials and illustrations used. The team may review and implement suggestions made by the consultant prior to the direct interaction, if asked to do so by the consultant.',
              pt: 'O consultor recebe o texto com antecedência e faz avaliações preliminares. Os comentários do consultor para a equipe são colocados na tradução ou retrotradução usando notas de projeto. A avaliação deve se concentrar na exatidão, clareza, naturalidade e aceitabilidade da tradução. O consultor também avaliará todos os materiais e ilustrações suplementares utilizados. A equipe pode revisar e implementar sugestões feitas pelo consultor antes da interação direta.',
              es: 'El consultor recibe el texto por adelantado y hace evaluaciones preliminares, colocadas en comentarios para el equipo en la traducción o retrotraducción. La evaluación debe centrarse en la precisión, claridad, naturalidad y aceptabilidad de la traducción, incluidos todos los materiales e ilustraciones suplementarios utilizados. El equipo puede revisar e implementar las sugerencias hechas por el consultor antes de la interacción directa.',
              fr: 'Le conseiller reçoit le texte à l’avance et procède à des évaluations préliminaires. Les commentaires du conseiller à l’intention de l’équipe sont placés dans la traduction ou la retraduction à l’aide des notes de projet. L’évaluation doit porter sur l’exactitude, la clarté, le caractère naturel et l’acceptabilité de la traduction. Le conseiller évaluera également tous les documents et illustrations supplémentaires utilisés. L’équipe peut examiner et mettre en œuvre les suggestions faites par le conseiller avant l’interaction directe.',
              'zh-Hans':
                '顾问提前收到文本并作出初步评估。顾问提供给小组的意见，应以项目附注的形式放在翻译或回译的文本中。评估应注重译文的准确性、清晰度、自然度和可接受度。顾问也会评估所使用的所有补充材料和插图。如果顾问提出要求，小组可能要在直接互动之前，先行讨论并执行顾问的建议。',
              'zh-Hant':
                '顧問提前收到文字並進行初步評估。顧問對團隊的評論會使用項目註釋放在翻譯或回譯中。評估應注重翻譯的準確性、清晰度、自然性和可接受性。顧問還將評估所使用的所有補充資料和插圖。如果顧問要求，團隊可以在直接互動之前審查並實施顧問提出的建議。',
              'pt-BR':
                'O consultor recebe o texto antecipadamente e faz avaliações preliminares. Os comentários do consultor para a equipe são colocados na tradução ou retrotradução por meio de notas do projeto. A avaliação deve focar na precisão, clareza, naturalidade e aceitabilidade da tradução. O consultor também avaliará todos os materiais adicionais e ilustrações utilizadas. A equipe poderá revisar e implementar sugestões feitas pelo consultor antes da interação direta, se solicitado pelo consultor.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 128,
              moderate: 105,
              difficult: 90,
            },
          },
          {
            id: '25931f1d-cc55-46c9-a3e8-8f0bea379b90',
            names: {
              en: 'Consultant checking session',
              pt: 'Sessão de verificação de consultores',
              es: 'Sesión de verificación con el consultor',
              fr: 'Séance de vérification avec le conseiller',
              'zh-Hans': '顾问检查会议',
              'zh-Hant': '顧問檢查會議',
              'pt-BR': 'Sessão de verificação do consultor',
            },
            descriptions: {
              en: 'The consultant interacts with the translation team in a physical or virtual session. He or she makes observations about the text and supplementary materials, and gives assistance and advice as requested. \n\nThis task involves editing, and a member should be assigned to make changes during the session.',
              pt: 'O consultor interage com a equipe de tradução em uma sessão física ou virtual. Ele ou ela faz observações sobre o texto e materiais suplementares, e dá assistência e aconselhamento conforme solicitado. \n\nEsta tarefa envolve a edição, e um membro deve ser designado para fazer mudanças durante a sessão.',
              es: 'El consultor interactúa con el equipo de traducción en una sesión física o virtual. Hace observaciones sobre el texto y los materiales complementarios, y presta asistencia y asesoramiento cuando se le solicita. \n\nEsta tarea implica la edición, y se debe asignar a un miembro para que realice cambios durante la sesión.',
              fr: 'Le conseiller interagit avec l’équipe de traduction lors d’une session physique ou virtuelle. Il ou elle fait des observations sur le texte et les documents supplémentaires, et apporte de l’aide et des conseils sur demande.\n\nCette tâche implique la modification du projet et un membre de l’équipe doit être désigné pour apporter des modifications au cours de la session.',
              'zh-Hans':
                '顾问通过面对面或视频会议，与翻译小组进行互动。顾问对文本和补充材料提出意见，并根据需要提供帮助和建议。\n\n\n\n这项任务涉及编辑，因此应指派一个成员在会议期间进行修改。',
              'zh-Hant':
                '顧問透過實體或虛擬會議與翻譯團隊互動。他或她對文本和補充材料提出意見，並根據要求提供幫助和建議。\n\n\n\n\n\n此任務涉及編輯，應指派一名成員在會議期間進行更改。',
              'pt-BR':
                'O consultor interage com a equipe de tradução em sessão física ou virtual. Ele ou ela faz observações sobre o texto e materiais adicionais e dá assistência e conselhos conforme solicitado.\n\n\n\nEsta tarefa envolve edição e um membro deve ser designado para fazer alterações durante a sessão.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 128,
              moderate: 105,
              difficult: 90,
            },
          },
          {
            id: '9955d13b-4d77-4c77-81a3-a728bf11b77e',
            names: {
              en: 'Revise from consultant feedback',
              pt: 'Implementar sugestões',
              es: 'Implementar sugerencias',
              fr: 'Application des suggestions',
              'zh-Hans': '根据顾问的反馈进行修改',
              'zh-Hant': '根據顧問回饋進行修改',
              'pt-BR': 'Revisão do feedback do consultor',
            },
            descriptions: {
              en: 'If the consultant gave action items during the checking session, these need to be completed and marked as resolved. \n\nSome consultants may want to approve and mark as resolved the issues they think serious, while leaving the team to correct minor issues and marking them as resolved themselves. Some entities may have requirements about who may mark an issue resolved.  If your entity has specific requirements in this regard, then customize this plan accordingly.',
              pt: 'Se o consultor deu itens de ação durante a sessão de verificação, eles precisam ser completados e marcados como resolvidos.',
              es: 'Los cambios que no se pudieron realizar durante la sesión de verificación deben realizarse más tarde y todas las acciones deben resolverse.',
              fr: 'Si le conseiller a donné des mesures de suivi au cours de la séance de vérification, celles-ci doivent être complétées et marquées comme résolues.',
              'zh-Hans':
                '如果顾问在检查会议期间提供了操作项，小组应完成这些操作，并将其标记为已完成。\n\n\n\n有些顾问可能希望核准他们认为比较严重的问题，并将其标记为已解决；同时让小组自行纠正小问题，并标记为已解决。对于谁可以将问题标记为已解决，有些团队可能有所要求。如果您的团队在这方面有具体的要求，请相应地自行制定计划。',
              'zh-Hant':
                '如果顧問在檢查期間給出了行動項目，則需要完成這些行動項目並將其標記為已解決。\n\n\n\n\n\n一些顧問可能希望批准他們認為嚴重的問題並將其標記為已解決，同時讓團隊自己糾正小問題並將其標記為已解決。某些實體可能對誰可以將問題標記為已解決有要求。如果您的實體在這方面有具體要求，則相應地自訂此計劃。',
              'pt-BR':
                'Se o consultor forneceu itens de ação durante a sessão de verificação, estes precisam ser preenchidos e marcados como resolvidos.\n\n\n\nAlguns consultores podem querer aprovar e marcar como resolvidos os problemas que consideram sérios, enquanto deixam a equipe corrigir problemas menores e marcá-los eles mesmos como resolvidos. Algumas organizações podem ter requisitos sobre quem pode marcar um problema como resolvido. Se a sua organização tiver requisitos específicos a esse respeito, personalize este plano adequadamente.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 420,
              easy: 360,
              moderate: 300,
              difficult: 240,
            },
          },
          {
            id: 'c6f68e0f-7edd-4841-bf2a-502fd1dd6daf',
            names: {
              en: 'Receive consultant approval',
              pt: 'Receber aprovação do consultor',
              es: 'Recibir la aprobación del consultor',
              fr: 'Approbation du conseiller.',
              'zh-Hans': '收到顾问核准',
              'zh-Hant': '獲得顧問批准',
              'pt-BR': 'Receba aprovação do consultor',
            },
            descriptions: {
              en: "After implementing the changes, get the consultant's approval via the consultant report or appropriate means.  If approval is not granted, follow whatever remaining recommendations to satisfy the consultant.",
              pt: 'Após a implementação das mudanças, obtenha a aprovação do consultor através do relatório do consultor ou dos meios apropriados.  Se a aprovação não for concedida, siga as recomendações restantes para satisfazer a consultora.',
              es: 'Después de implementar los cambios, obtenga la aprobación del consultor a través del informe del consultor o de los medios apropiados.  Si no se concede la aprobación, siga las recomendaciones restantes para satisfacer al consultor.',
              fr: 'Après la mise en œuvre des changements, obtenir l’approbation du conseiller par le biais du rapport du conseiller ou des moyens appropriés. Si l’approbation n’est pas accordée, suivre les recommandations restantes pour satisfaire le conseiller.',
              'zh-Hans':
                '执行更改后，通过顾问报告或适当的方式获得顾问的核准。如果没有获得核准，请按照其余的建议来达到顾问的要求。',
              'zh-Hant':
                '實施變更後，透過顧問報告或適當的方式獲得顧問的批准。如果未獲得批准，請遵循剩餘的建議以滿足顧問的要求。',
              'pt-BR':
                'Após implementar as alterações, obtenha a aprovação do consultor através do relatório do consultor ou dos meios apropriados. Se a aprovação não for concedida, siga as recomendações restantes para satisfazer o consultor.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '16385cc6-d555-4b29-b342-1f78a9853656',
        names: {
          en: 'Community Review',
          pt: 'Revisão pela Comunidade',
          es: 'Revisión por parte de la Comunidad',
          fr: 'Réexamen par la Communauté',
          'zh-Hans': '社群审阅',
          'zh-Hant': '社群評論',
          'pt-BR': 'Revisão da comunidade',
        },
        descriptions: {
          en: "The goal of this stage is to have one or more community groups to review the text and make suggestions and recommendations.\n\nNote:  If your team's process requires other community reviewing and testing tasks add them to your plan in this stage.  For example, some teams have special community meetings to test key terms, or to resolve issues related to different language variants.",
          pt: 'O objetivo desta etapa é ter um ou mais grupos comunitários para revisar o texto e fazer sugestões e recomendações.',
          es: 'El objetivo de esta etapa es que uno o más grupos comunitarios revisen el texto y hagan sugerencias y recomendaciones.',
          fr: 'Le but de cette étape est de demander à un ou plusieurs groupes communautaires d’examiner le texte et de faire des suggestions et des recommandations.',
          'zh-Hans':
            '这阶段的目标是让一个或多个社群团体审阅文本，并提出建议。\n\n注意：如果您的小组的工作流程要求其他社群来进行审阅和测试任务，请在这阶段将任务添加到您的计划中。例如，一些小组有专门的社群会议来测试关键术语，或解决与不同语言变体有关的问题。',
          'zh-Hant':
            '這一階段的目標是讓一個或多個社區團體審查文本並提出意見和建議。\n\n\n\n\n\n注意：如果您團隊的流程需要其他社群審核和測試任務，請在此階段將它們新增至您的計畫。例如，一些團隊召開特殊的社區會議來測試關鍵術語，或解決與不同語言變體相關的問題。',
          'pt-BR':
            'O objetivo desta etapa é fazer com que um ou mais grupos da comunidade revisem o texto e façam sugestões e recomendações.\n\n\n\nObservação: se o processo da sua equipe exigir outras tarefas de revisão e teste da comunidade, adicione-as ao seu plano nesta etapa. Por exemplo, algumas equipes realizam reuniões especiais com a comunidade para testar termos-chave ou para resolver problemas relacionados a diferentes variantes linguísticas.',
        },
        tasks: [
          {
            id: 'ab24ebef-f715-4a6e-b505-b5c9172ba6c9',
            names: {
              en: 'Review Biblical terms and revise',
              pt: 'Avaliar e revisar termos bíblicos',
              es: 'Revisar vocablos bíblicos',
              fr: 'Revue et révision des termes bibliques',
              'zh-Hans': '检查圣经专门用词并修改',
              'zh-Hant': '複習聖經術語並修改',
              'pt-BR': 'Analisar e revisar termos bíblicos',
            },
            descriptions: {
              en: 'Community leaders, church leaders, and other community members discuss how key terms are rendered. The team discusses comments about key terms made at the community review and uses those changes they think are valid.\n\nConsider using Paratext lite on an Android tablet to collect information at comprehension testing meetings, and Scripture Forge for situations when the language community is in several different countries.',
              pt: 'Líderes comunitários, líderes de igrejas e outros membros da comunidade discutem como os termos chave são renderizados. A equipe discute comentários sobre os termos chave feitos na revisão da comunidade e usa as mudanças que eles acham que são válidas.',
              es: 'Líderes de la comunidad, líderes de la iglesia y otros miembros de la comunidad discuten cómo se expresan los términos clave. El equipo discute los comentarios sobre los términos clave hechos en la revisión de la comunidad y utiliza los cambios que consideran válidos.',
              fr: 'Des leadeurs de communautés, des leadeurs religieux et d’autres membres de la communauté discutent de la façon dont les termes clés sont rendus. L’équipe discute des commentaires sur les termes clés formulés lors de l’examen de la communauté et applique les changements qu’elle juge valables.',
              'zh-Hans':
                '社群领袖、教会领袖和其他社群成员讨论如何翻译圣经专门用词。小组讨论在社群审阅中针对圣经专门用词提出的意见和建议，并应用那些他们认为合宜的修改。\n\n\n\n考虑在安卓平板电脑上使用《圣经辅助工具》（精简版），以在理解测试会议中收集信息；当语言社群位于几个不同的国家时，也可使用  Scripture Forge《经文锻造》(即基于网络翻译和编辑应用程序）。',
              'zh-Hant':
                '社區領袖、教會領袖和其他社區成員討論如何呈現關鍵術語。團隊討論了社群審核中對關鍵術語的評論，並使用了他們認為有效的變更。\n\n\n\n\n\n考慮在 Android 平板電腦上使用 Paratext lite 在理解測試會議上收集信息，並在語言社區位於多個不同國家/地區的情況下使用 Bible Forge。',
              'pt-BR':
                'Os líderes da comunidade, os líderes da igreja e outros membros da comunidade discutem como os termos-chave são traduzidos. A equipe discute comentários sobre termos-chave feitos na revisão da comunidade e utiliza as alterações que considera válidas.\n\n\n\nConsidere usar o Paratext Lite em um tablet Android para coletar informações em reuniões de teste de compreensão e o Scripture Forge para situações em que a comunidade linguística está em vários países diferentes.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 420,
              easy: 360,
              moderate: 300,
              difficult: 240,
            },
          },
          {
            id: 'ad1e60e2-0340-4832-b914-16fc9c76c76e',
            names: {
              en: 'Review for naturalness and revise',
              pt: 'Análise da naturalidade e revisão',
              es: 'Revisión de la naturalidad',
              fr: 'Vérification du caractère naturel et révision',
              'zh-Hans': '检查自然度并修改',
              'zh-Hant': '檢查自然性並進行修改',
              'pt-BR': 'Revise a naturalidade e revise',
            },
            descriptions: {
              en: 'The community does a naturalness review of the audio or written text. The team discusses the suggestions from the naturalness review and makes any appropriate changes.\n\nConsider using Paratext lite on an Android tablet to collect information at comprehension testing meetings, and Scripture Forge for situations when the language community is in several different countries.',
              pt: 'A comunidade faz uma revisão de naturalidade do áudio ou do texto escrito. A equipe discute as sugestões da revisão de naturalidade e faz quaisquer mudanças apropriadas.',
              es: 'La comunidad hace una revisión de naturalidad del audio o texto escrito. El equipo discute las sugerencias de la revisión de naturalidad y hace los cambios apropiados.',
              fr: 'La communauté procède à une révision du caractère naturel du texte audio ou écrit. L’équipe discute des suggestions de l’examen du caractère naturel et apporte les changements appropriés.',
              'zh-Hans':
                '社群对音频或书面文本进行自然度方面的审阅。小组讨论审阅中提出的建议，并作出适当的修改。\n\n\n\n考虑在安卓平板电脑上使用《圣经辅助工具》（精简版），以在理解测试会议中收集信息；当语言社群位于几个不同的国家时，可使用 Scripture Forge 《经文锻造》。',
              'zh-Hant':
                '社區對音訊或書面文字進行自然度審查。團隊討論自然度審核的建議並做出適當的更改。\n\n\n\n\n\n考慮在 Android 平板電腦上使用 Paratext lite 在理解測試會議上收集信息，並在語言社區位於多個不同國家/地區的情況下使用 Bible Forge。',
              'pt-BR':
                'A comunidade faz uma avaliação da naturalidade do áudio ou do texto escrito. A equipe discute as sugestões da revisão de naturalidade e faz as alterações apropriadas.\n\n\n\nÉ recomendável utilizar o Paratext lite em um tablet Android para coletar informações em reuniões de teste de compreensão e o Scripture Forge para situações em que a comunidade da língua estiver em vários países diferentes.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'ed3f57fb-e3de-4b13-bfe8-c9754d61e044',
            names: {
              en: 'Report on community review',
              pt: 'Relatório sobre a revisão da comunidade',
              es: 'Informe sobre la revisión de la comunidad',
              fr: 'Rédaction du rapport sur la vérification avec la communauté',
              'zh-Hans': '社群审阅报告',
              'zh-Hant': '社區審查報告',
              'pt-BR': 'Relatório sobre a revisão da comunidade',
            },
            descriptions: {
              en: 'The team reports to the consultant on any textual or key terms changes made as a result of the community review.  Rationale for the changes should be included.  The team should open the Biblical terms tool and consult the notes, and history sections for the terms being reported on. It is best practice to enter this information in the tool as the changes were being discussed and decided on.',
              pt: 'A equipe reporta ao consultor sobre quaisquer alterações textuais ou termos-chave feitas como resultado da revisão da comunidade.  Justificativa para as mudanças deve ser incluída. A equipe deve abrir a ferramenta de termos bíblicos e consultar as notas e as seções de história para os termos que estão sendo relatados. É melhor prática introduzir esta informação na ferramenta à medida que as mudanças são discutidas e decididas.',
              es: 'El equipo informa al consultor sobre cualquier cambio en el texto o en los términos clave como resultado de la revisión de la comunidad.  Debe incluirse la justificación de los cambios.  El equipo debe abrir la herramienta de vocablos bíblicos y consultar las notas y las secciones de historia de los términos sobre los que se informa. Es una buena práctica introducir esta información en la herramienta a medida que se discuten y deciden los cambios.',
              fr: 'L’équipe rend compte au conseiller de tout changement de texte ou de termes clés apporté à la suite de l’examen de la communauté. La justification des changements devrait être incluse. L’équipe devrait ouvrir l’outil des termes bibliques et consulter les notes et les sections d’historique pour les termes dont il est question. Il est préférable d’entrer cette information dans l’outil au fur et à mesure que l’on discute des changements et que l’on prend des décisions.',
              'zh-Hans':
                '小组向顾问报告在社群审阅中发现的任何文本或关键术语的更改。报告应包含作出更改的理由。小组应打开圣经专门用词工具，查阅注释，以及所改术语的历史记录。最好的做法是，在讨论和决定更改时，就把这些信息输入到工具中。',
              'zh-Hant':
                '團隊向顧問報告社區審核後所做的任何文字或關鍵術語變更。應包括變更的理由。團隊應該打開聖經術語工具並查閱註釋和所報告術語的歷史部分。最佳實踐是在討論和決定變更時在工具中輸入此資訊。',
              'pt-BR':
                'A equipe informa ao consultor sobre qualquer alteração textual ou de termos-chave feita como resultado da revisão da comunidade. A justificativa para as mudanças deve ser incluída. A equipe deve abrir a ferramenta de termos bíblicos e consultar as notas e seções de histórico dos termos relatados. É uma boa prática inserir essas informações na ferramenta à medida que as mudanças são discutidas e decididas.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: 'c66ede6b-1e7b-4d55-b5c3-f8aff60217d7',
        names: {
          en: 'Final Preparation for Publication',
          pt: 'Finalização para publicação',
          es: 'Finalización para la publicación',
          fr: 'Finalisation pour publication',
          'zh-Hans': '出版的最后准备',
          'zh-Hant': '出版的最後準備',
          'pt-BR': 'Preparação Final para Publicação',
        },
        descriptions: {
          en: 'The text is finalized for publication and uploaded to the DBL. If a typeset publication is in view, the typesetting requirements will be furnished by the typesetter.',
          pt: 'O texto é finalizado para publicação e enviado para a DBL. Se uma publicação de composição for prevista, os requisitos de composição serão fornecidos pelo compositor.',
          es: 'El texto se finaliza para su publicación y se carga en el DBL. Si se planifica una publicación de composición tipográfica, los requisitos de composición serán proporcionados por la persona encargada de la composición tipográfica.',
          fr: 'Le texte est finalisé pour publication et téléchargé dans le DBL. Si une publication imprimée est en vue, les exigences en matière de composition seront fournies par le compositeur.',
          'zh-Hans':
            '文本定稿，准备出版并上传到“数字圣经书库”（DBL）。如果计划排版印刷，则由排版人员提出排版要求。',
          'zh-Hant':
            '該文本已最終確定已出版並上傳至 DBL。如果是排版出版物，則排版要求將由排版人員提供。',
          'pt-BR':
            'O texto é finalizado para publicação e carregado na DBL. Se uma publicação impressa estiver em vista, os requisitos de impressão serão fornecidos pelo impressor.',
        },
        tasks: [
          {
            id: 'b3877769-af37-45c4-b225-24c988148bff',
            names: {
              en: 'Check and link glossary entries',
              pt: 'Verificar e ligar entradas do glossário',
              es: 'Comprobar y enlazar las entradas del glosario',
              fr: 'Vérification et liaison des entrées du glossaire',
              'zh-Hans': '检查并链接词汇表条目',
              'zh-Hant': '檢查並連結詞彙表條目',
              'pt-BR': 'Verifique e vincule os verbetes do glossário',
            },
            descriptions: {
              en: 'For users to discover your glossary entries, the words must be marked for a print publication, or hyperlinked for digital publication.  Use the tools in Paratext to add the necessary markup, which will create hyperlinked entries or other highlighting in print to identify glossary words.',
              pt: 'Para que os usuários descubram seus itens do glossário, as palavras devem ser marcadas para uma publicação impressa ou hiperligadas para publicação digital.  Use as ferramentas em Paratext para adicionar a marcação necessária, que irá criar entradas hiperligadas ou outro destaque na impressão para identificar as palavras do glossário.',
              es: 'Para que los usuarios descubran las entradas de su glosario, las palabras deben estar marcadas para una publicación impresa o hipervinculadas para una publicación digital.  Utilice las herramientas de Paratext para añadir marcadores que crearán entradas hipervinculadas u otros resaltes en la impresión para identificar las palabras del glosario.',
              fr: 'Pour que les utilisateurs puissent découvrir vos entrées de glossaire, les mots doivent être marqués pour une publication imprimée ou des liens hypertexte doivent être créés pour une publication numérique. Utiliser les outils de Paratext pour ajouter le marquage nécessaire, qui créera des entrées hyperliées ou d’autres surlignages imprimés pour identifier les mots du glossaire.',
              'zh-Hans':
                '为方便用户找到词汇表条目，您必须为印刷出版提供字词标记，或为电子出版提供字词的超链接。请使用《圣经辅助工具》中的工具添加必要的标记，这将创建超链接条目，或在印刷品中突出显示，以识别词汇表中的字词。',
              'zh-Hant':
                '為了讓使用者發現您的術語表條目，必須為印刷出版物標記單詞，或為數位出版物標記超連結。使用 Paratext 中的工具添加必要的標記，這將在列印中建立超連結條目或其他突出顯示以識別詞彙表單字。',
              'pt-BR':
                'Para que os usuários descubram os verbetes do seu glossário, as palavras devem ser marcadas para uma publicação impressa ou com o link para publicação digital. Use as ferramentas do Paratext para adicionar a marcação necessária, que criará verbetes com links ou outro destaque na impressão para identificar palavras do glossário.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 420,
              easy: 360,
              moderate: 300,
              difficult: 240,
            },
          },
          {
            id: '46f0f040-73ec-4789-a1e8-1747c131dcaf',
            names: {
              en: 'Enter Publication Information',
              pt: 'Introduza a informação de publicação',
              es: 'Introduzca la información de publicación',
              fr: 'Enregistrement de l’information pour la publication',
              'zh-Hans': '输入出版信息',
              'zh-Hant': '輸入出版資訊',
              'pt-BR': 'Insira as informações da publicação',
            },
            descriptions: {
              en: 'Open Project Properties for your project. Click on manage the Project Registration. This will take you to the entry for this project on the web. Go to the Publishing tab on the registration site and complete the information above the horizontal line.',
              pt: 'Abra as Propriedades do Projeto para o seu projeto. Clique em gerenciar o Registro de Projeto. Isso o levará à entrada para este projeto na web. Vá até a aba Publicação no site de registro e preencha as informações acima da linha horizontal.',
              es: 'Abra Propiedades del proyecto para su proyecto. Haga clic en Administrar el registro del proyecto. Esto le llevará a la entrada de este proyecto en la web. Vaya a la pestaña Publicación y complete la información arriba de la línea horizontal.',
              fr: 'Ouvrir Propriétés de projet pour votre projet. Cliquer sur Gérer l’enregistrement du projet. Ceci vous amènera à l’entrée de ce projet sur le web. Aller à l’onglet Publication du site d’inscription et compléter l’information au-dessus de la ligne horizontale.',
              'zh-Hans':
                '在您的项目中打开项目属性。点击管理“项目注册资料”。该操作将带您跳转到该项目在网络上的条目。转到注册网页上的“发布”选项卡，并填写横线上的信息。',
              'zh-Hant':
                '打開您的項目的項目屬性。點選管理項目註冊。這將帶您進入該項目在網路上的入口。前往註冊網站上的「發布」標籤並填寫水平線上方的資訊。',
              'pt-BR':
                'Abra Propriedades do Projeto para o seu projeto. Clique em Gerenciar registro do Projeto. Isso o levará à página deste projeto na web. Acesse a guia Publicação no site de registro e preencha as informações acima da linha horizontal.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '415f8694-6422-49ba-8c35-4935535ba98d',
            names: {
              en: 'Submit to the DBL',
              pt: 'Submeter à DBL',
              es: 'Enviar a la DBL',
              fr: 'Soumission à la DBL',
              'zh-Hans': '提交到“数字圣经书库”（DBL）',
              'zh-Hant': '提交給 DBL',
              'pt-BR': 'Enviar para a DBL',
            },
            descriptions: {
              en: 'Submit the text to the DBL.  For Wycliffe Global Alliance partners, the instructions are found at bit.ly/DBL-Submit \n\n<a href="https://bit.ly/DBL-Submit">bit.ly/DBL-Submit</a> \n\nThis page explains how to prepare the text and has a link to a form to fill for the submission.',
              pt: 'Submeter o texto à DBL.  Para parceiros Wycliffe Global Alliance, as instruções são encontradas em bit.ly/DBL-Submit \n\n<a href="https://bit.ly/DBL-Submit">bit.ly/DBL-Submit</a> \n\nEsta página explica como preparar o texto e tem um link para um formulário a preencher para a submissão.',
              es: 'Envíe el texto a la DBL.  Para los socios de Wycliffe Global Alliance, las instrucciones se encuentran en bit.ly/DBL-Submit \n\n<a href="https://bit.ly/DBL-Submit">bit.ly/DBL-Submit</a> \n\nEsta página explica cómo preparar el texto y tiene un enlace a un formulario para rellenar para la presentación.',
              fr: 'Soumettre le texte à la DBL. Pour les partenaires de Wycliffe Global Alliance, les instructions se trouvent sur <a href==="https://bit.ly/DBL-Submit">bit.ly/DBL-Submit</a>\n\nCette page explique comment préparer le texte et contient un lien vers un formulaire à remplir pour la soumission.',
              'zh-Hans':
                '将文本提交到“数字圣经书库”（DBL）。对于威克里夫全球联盟的伙伴，可在 bit.ly/DBL-Submit  <a href="https://bit.ly/DBL-Submit">bit.ly/DBL-Submit</a>   获取相关说明。\n\n\n\n\n\n该页面说明如何准备文本，并提供一个表单链接以填写要提交的信息。',
              'zh-Hant':
                '將文字提交給 DBL。對於威克利夫全球聯盟合作夥伴，請在 bit.ly/DBL-Submit 上找到相關說明\n\n\n\n\n\n<a href="https://bit.ly/DBL-Submit">bit.ly/DBL-Submit</a>\n\n\n\n\n\n此頁面介紹如何準備文本，並提供了用於填寫提交的表格的連結。',
              'pt-BR':
                'Envie o texto para a DBL. Para parceiros da Wycliffe Global Alliance, as instruções podem ser encontradas em bit.ly/DBL-Submit  <a href="https://bit.ly/DBL-Submit">bit.ly/DBL-Submit</a>\n\n\n\nEsta página explica como preparar o texto e tem um link para um formulário a ser preenchido para o envio.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'a9a461dc-23c0-460c-a33b-8a5d49ea88e9',
            names: {
              en: 'Publish',
              pt: 'Publicar',
              es: 'Publicar',
              fr: 'Publication',
              'zh-Hans': '出版',
              'zh-Hant': '發布',
              'pt-BR': 'Publicar',
            },
            descriptions: {
              en: 'Publish the translation in the form and media you have chosen: print, audio, digital, etc. \n\nYou are encouraged to rename this task based on your publishing strategy and add other tasks as needed.',
              pt: 'Publique na forma e mídia que você escolheu: impressa, áudio, digital, etc. \n\nVocê é encorajado a renomear esta tarefa com base em sua estratégia de publicação e adicionar outras tarefas conforme necessário.',
              es: 'Publicar la traducción en la forma y medio que usted haya elegido: impreso, audio, digital, etc. \n\nSe le anima a renombrar esta tarea en función de su estrategia de publicación y a añadir otras tareas según sea necesario.',
              fr: 'Publier la traduction sous la forme et sur le support de votre choix : imprimé, audio, numérique, etc.\n\nNous vous encourageons à renommer cette tâche en fonction de votre stratégie de publication et à ajouter d’autres tâches, si nécessaire.',
              'zh-Hans':
                '以选定的形式和媒体发布译本：印刷品、音频、数字等。\n\n您也可以根据自己的出版策略重命名这个任务，并按照需要添加其他任务。',
              'zh-Hant':
                '以您選擇的形式和媒體發布譯本：印刷品、音訊、數位等。\n\n\n\n\n\n我們鼓勵您根據您的發布策略重新命名此任務，並根據需要添加其他任務。',
              'pt-BR':
                'Publique a tradução na forma e na mídia que você escolheu: impressa, áudio, digital, etc.\n\n\n\nRecomendamos que você mude o nome desta tarefa com base em sua estratégia de publicação e adicione outras tarefas conforme necessário.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
        ],
      },
    ],
    checks: [
      {
        checkId: 'basic.chapter-verse-numbers',
        notifyOnlyInStage: null,
        requiredInStage: '9eddb82d-ed66-4e24-bdab-060dea2294de',
      },
      {
        checkId: 'basic.markers',
        notifyOnlyInStage: null,
        requiredInStage: '9eddb82d-ed66-4e24-bdab-060dea2294de',
      },
      {
        checkId: 'notes.translator',
        notifyOnlyInStage: null,
        requiredInStage: '9eddb82d-ed66-4e24-bdab-060dea2294de',
      },
      {
        checkId: 'spelling.spelling',
        notifyOnlyInStage: null,
        requiredInStage: '9eddb82d-ed66-4e24-bdab-060dea2294de',
      },
      {
        checkId: 'notes.consultant',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.characters',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.punctuation',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.capitalization',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.repeated-words',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.unmatched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.matched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.quotations',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.numbers',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'other.biblical-terms',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'spelling.word-list',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.references',
        notifyOnlyInStage: null,
        requiredInStage: '16385cc6-d555-4b29-b342-1f78a9853656',
      },
      {
        checkId: 'notes.spelling-discussion',
        notifyOnlyInStage: null,
        requiredInStage: '16385cc6-d555-4b29-b342-1f78a9853656',
      },
      {
        checkId: 'notes.rendering-discussion',
        notifyOnlyInStage: null,
        requiredInStage: '16385cc6-d555-4b29-b342-1f78a9853656',
      },
      {
        checkId: 'other.parallel-passages',
        notifyOnlyInStage: null,
        requiredInStage: 'c66ede6b-1e7b-4d55-b5c3-f8aff60217d7',
      },
    ],
  },
  {
    id: 'ac0f7277-5315-408f-a4da-09f0bf591ec8',
    name: 'SILP Base Plan',
    version: '1.7',
    kind: 'factory',
    stages: [
      {
        id: '9eddb82d-ed66-4e24-bdab-060dea2294de',
        names: {
          en: 'Drafting',
          pt: 'Rascunho',
          es: 'Redacción',
          fr: 'Rédaction de l’ébauche',
        },
        descriptions: {
          en: 'This stage involves creating the first draft of the translation.',
          pt: 'Vá até Verificação > Paratext 6 checks> PBT> Show Project Plan HTML para visualizar ou imprimir este plano. \n\nEsta etapa envolve a criação do primeiro rascunho da tradução.',
          es: 'Vea este plan abriendo el documento adjunto SIL_Compact_Plan.html.\n\nEsta etapa implica la creación del primer borrador de la traducción.',
          fr: 'Consulter ce plan en ouvrant le document SIL_Compact_Plan.html qui l’accompagne.\n\nCette étape consiste à créer la première ébauche de la traduction.',
        },
        tasks: [
          {
            id: '9f99673c-cb6a-4c05-a9cd-4629eb7f6b20',
            names: {
              en: 'Exegesis',
              pt: 'Exegese',
              es: 'Exégesis',
              fr: 'Exégèse',
            },
            descriptions: {
              en: "Study the text carefully, using Paratext resources, recommended commentaries, and other resources (e.g. those found in Translator's Workplace).\nThis should involve: \n● chunking the text into meaningful units\n● identifying translation issues\n● identifying cultural issues\n● identifying and studying the meaning of key terms in the book/passage and considering what RL rendering would be best for each sense of a term\n\nIt may also involve:\n● oral retelling and processing of the text\n\nAfter understanding and internalizing the passage, it may be helpful to retell it in the vernacular without looking at the model text(s).  Doing this can free the translator's mind from the form of the model language, creating a more natural translation.",
              pt: 'Estude o texto cuidadosamente, utilizando diversos versões da Bíblia e comentários do Paratext.\nIsto pode envolver: \n\n ● dividindo o texto em unidades significativas \n ● identificação de problemas de tradução \n ● identificação de questões culturais  \n ● recontagem oral e processamento do texto\n\nDepois de compreender e interiorizar a passagem, pode ser útil recontá-lo no vernáculo sem olhar para o(s) texto(s) modelo(s).  Fazer isso pode libertar o pensamento do tradutor da influência da forma da linguagem modelo, criando uma tradução mais natural.',
              es: 'Estudie el texto cuidadosamente, utilizando recursos y comentarios de Paratext. \nEsto puede incluir: \n● dividiendo el texto en unidades significativas\n● identificación de problemas de traducción\n● identificación de cuestiones culturales\n● relato oral y procesamiento del texto \n\nDespués de entender el pasaje, puede ser útil volver a contarlo en lengua vernácula sin mirar el texto o textos modelo para liberar la mente del traductor de la forma del lenguaje modelo, creando una traducción más natural.',
              fr: 'Étudier attentivement le texte à l’aide des ressources et des commentaires de Paratext.\nCela peut impliquer :\n● découper le texte en unités significatives\n● identifier les problèmes de traduction\n● identifier les questions culturelles\n● raconter oralement et discuter le sens du texte\n\nAprès avoir compris et assimilé le passage, il est utile de le redire dans la langue vernaculaire sans regarder les textes modèles. Cela peut libérer l’esprit du traducteur de la forme du langage modèle, créant ainsi une traduction plus naturelle.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '43884fe5-7bea-43f0-9b62-f424963d3638',
            names: {
              en: 'Create the first draft',
              pt: 'Criar o primeiro rascunho',
              es: 'Crear el primer borrador',
              fr: 'Rédaction de la première ébauche',
            },
            descriptions: {
              en: 'Draft the text in Paratext using the natural patterns of the receptor language. Then re-read to check for natural flow and typographical errors. It is recommended to refer to Back Translations such as those in Translator’s Workplace for ideas, but these are not to be considered as exegetical resources.It is also recommended to use the Biblical Terms Rendering window or an Enhanced Resource to see what renderings have been used and to add new renderings as needed.',
              pt: 'Rascunhar o texto em Paratext e reler para verificar se há erros tipográficos ou não. É recomendado usar a janela de renderização de termos bíblicos ou um recurso aprimorado para ver quais renderizações foram usadas e para adicionar novas renderizações conforme necessário.',
              es: 'Redacte el texto en Paratext y vuelva a leerlo para comprobar si hay errores tipográficos. Se recomienda usar la ventana de Traducciones de Vocablos Bíblico o un recurso aumentado para ver qué traducciones se han usado y para agregar nuevas traducciones según sea necesario.',
              fr: 'Rédiger le texte dans Paratext et le relire pour vérifier les erreurs de frappe. Il est recommandé d’utiliser la fenêtre Termes bibliques équivalents ou une ressource améliorée pour voir quels équivalents ont été utilisés et pour ajouter de nouveaux équivalents si nécessaire.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
          {
            id: 'f501021c-2ae1-4579-a5a8-ceb9d63979c5',
            names: {
              en: 'Draft supplementary materials',
              pt: 'Fazer versões preliminares de materiais suplementares',
              es: 'Proyectos de materiales suplementarios',
              fr: 'Rédaction des ébauches de matériels supplémentaires',
            },
            descriptions: {
              en: 'These materials may include: \n● section headings\n● footnotes\n● cross-references\n● illustrations (including captions)\n● maps\n● glossary entries\n● book introductions',
              pt: 'Estes materiais podem incluir: \n\n ● títulos de secção \n ● notas de rodapé\n ● referências cruzadas\n ● ilustrações (incluindo legendas)\n ● mapas\n ● entradas do glossário\n ● introduções de livros',
              es: 'Estos materiales pueden incluir: \n● títulos de las secciones\n● notas a pie de página\n● referencias cruzadas\n● ilustraciones (incluyendo subtítulos)\n● mapas\n● entradas de glosario\n● introducciones a los libros',
              fr: 'Ces matériels peuvent comprendre :\n● titres des sections\n● notes de bas de page\n● renvois\n● illustrations (y compris les légendes)\n● cartes\n● entrées du glossaire\n● introductions des livres',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
        ],
      },
      {
        id: '9443afef-8302-4727-8f85-1cb4ef464168',
        names: {
          en: 'Team Check & Comprehension Check',
          pt: 'Verificação em Equipe & Verificação de Compreensão',
          es: 'Comprobación por parte del equipo y comprobación de la comprensión',
          fr: 'Vérification en équipe et vérification de la compréhension',
        },
        descriptions: {
          en: 'The team checks the naturalness and accuracy of the draft, and then tests it with the target audience to make sure that it communicates well.',
          pt: 'A equipa verifica a naturalidade e a exegese do rascunho, depois testa-o com o público-alvo para se certificar de que se comunica bem. Se você adicionar quaisquer tags personalizadas de notas de projeto ao seu projeto, você terá que especificar qual(is) estágio(s) as verificações automatizadas para essas tags precisarão começar.',
          es: 'El equipo comprueba la naturalidad y exégesis del borrador, luego lo prueba con el público para asegurarse de que se comunica bien. \n\nSi añade etiquetas de nota de proyecto personalizadas a su proyecto, tendrá que especificar en qué etapa(s) deben comenzar las comprobaciones automáticas de dichas etiquetas.',
          fr: 'L’équipe vérifie le caractère naturel et l’exégèse du projet, puis elle l’essaie avec le public cible pour s’assurer qu’il communique bien.\n\nSi vous ajoutez des balises de notes de projet personnalisées à votre projet, vous devrez spécifier à quelle(s) étape(s) les contrôles automatisés de ces balises devront commencer.',
        },
        tasks: [
          {
            id: '3480d1ca-6ee7-40eb-a31e-f0e06dbf73a8',
            names: {
              en: 'Accuracy/Exegetical check',
              pt: 'Verificação exegética',
              es: 'Comprobación exegética',
              fr: 'Contrôle exégétique',
            },
            descriptions: {
              en: 'Compare the draft with one or two translations in the national language or a fairly literal English version. See if any meaning of the Source Text has been omitted, added, or changed in the drafted translation. Discuss exegetical choices that have been made in the translation and identify possible exegetical mistakes. Discuss Biblical terms renderings as a team. Adjust text as necessary to resolve any issues found.',
              pt: 'Comparar o rascunho com uma ou duas traduções na língua nacional, discutir escolhas exegéticas que foram feitas na tradução, identificar possíveis erros exegéticos na tradução; identificar quaisquer versículos ou frases em falta. Ajuste o texto conforme necessário para resolver quaisquer problemas encontrados.',
              es: 'Compare el borrador con una o dos traducciones en el idioma nacional, discuta las elecciones exegéticas que se han hecho en la traducción, identifique posibles errores exegéticos en la traducción, identifique cualquier versículo u oración que falte. Ajuste el texto según sea necesario para resolver cualquier problema que encuentre.',
              fr: 'Comparer le projet avec une ou deux traductions dans la langue nationale, discuter des choix exégétiques qui ont été faits dans la traduction, identifier les erreurs exégétiques possibles dans la traduction, et identifier les versets ou phrases manquants. Ajuster le texte, si nécessaire, pour résoudre tout problème trouvé.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '7bebeaeb-5932-4232-add9-22f60ac05007',
            names: {
              en: 'Naturalness check',
              pt: 'Verificar de naturalidade do Texto',
              es: 'Control de la naturalidad',
              fr: 'Contrôle du caractère naturel',
            },
            descriptions: {
              en: 'Read the draft aloud with the team. While reading the text, check the general flow of the discourse, its logic, chronology, participant reference, sentence length & rhythm, language style and register, etc. Adjust text as necessary to resolve any issues found.',
              pt: 'Leia o rascunho. Ao ler o texto, verifique o fluxo geral do discurso, sua lógica, cronologia, referência do participante, duração e ritmo da frase, estilo de linguagem e registro, etc. Ajuste o texto conforme necessário para resolver quaisquer problemas encontrados.',
              es: 'Leer el borrador, comprobar el flujo general del discurso, su lógica, cronología, referencia del participante, duración y ritmo de la oración, estilo y registro del lenguaje, etc. Ajuste el texto según sea necesario para resolver cualquier problema que encuentre.',
              fr: 'Lire l’ébauche. Pendant la lecture du texte, vérifier la fluidité du discours, sa logique, sa chronologie, les références aux participants, la longueur et le rythme des phrases, le style et le registre linguistique, etc. Ajuster le texte, si nécessaire, pour résoudre tout problème trouvé.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '427692d3-6cd1-450b-a90f-a09d64fa3610',
            names: {
              en: 'Format check',
              pt: 'Verificação de formatação',
              es: 'Verificación de formato',
              fr: 'Vérification du formatage du texte',
            },
            descriptions: {
              en: 'Check the layout, indents, and special formatting.\nRead the text and verify that the paragraph breaks are in the desired places. If another translation is used as a base, then this check can be done using Tools >  Checklists > Markers and look for the new paragraph markers such as \\p, and \\m. \n\nIt may be useful to check the section headings using Tools >  Checklists > Section Headings. \n\nVerify other layout issues such as poetry. Particular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools >  Checklists > Markers and by looking for the new paragraph markers such as \\q, \\q1, and \\q2. \n\nSee list of special formatting issues such as genealogies, words on the cross, letters, etc. \n\nVerify that text is marked using the correct standard format markers (USFMs). See http://ubsicap.github.io/usfm/v2.5/index.html for the latest guide to the USFM 2.5 standard and https://ubsicap.github.io/usfm/ for the USFM 3.0 standard.',
              pt: 'Verifique o layout, os recuos e a formatação especial.\n\nLeia o texto e verifique se as quebras de parágrafo estão nos locais desejados. Se outra tradução for usada como base, então esta verificação pode ser feita usando Ferramentas> Listas de Verificações> Marcadores e procure os novos marcadores de parágrafo como \\p, e \\m. \n\nPode ser útil verificar os cabeçalhos das seções usando Ferramentas> Listas de Verificações > Títulos de Secção. \n\nVerifique outras questões de layout, como poesia. Especial atenção deve ser dada às indentações de poesia. Se outra tradução for usada como base, então esta verificação pode ser feita usando Ferramentas> Listas de Verificações> Marcadores e procure os novos marcadores de parágrafo como \\q, \\q1 e \\q2. \n\nVeja a lista de questões especiais de formatação como genealogias, palavras na cruz, letras, etc. \n\nVerifique se o texto está marcado usando os marcadores de formato padrão corretos (USFMs). Consulte https://ubsicap.github.io/usfm para ver a documentação USFM.',
              es: 'Compruebe el diseño, las sangrías y el formato especial.\nLea el texto y verifique que los saltos de párrafo estén en los lugares deseados. Si se utiliza otra traducción como base, esta comprobación se puede hacer utilizando Herramientas > Lista de verificaciones > Marcadores y buscar los marcadores de párrafo como \\p, y \\m. \n\nPuede ser útil comprobar los encabezados de las secciones mediante Herramientas > Lista de verificaciones > Encabezados de secciones. \n\nVerifique otros aspectos de diseño como la poesía. Se debe prestar especial atención a las sangrías poéticas. Si se utiliza otra traducción como base, esta comprobación se puede realizar utilizando Herramientas > Lista de verificaciones > Marcadores y buscar los marcadores de párrafo como \\q, \\q1 y \\q2. \n\nVer lista de temas especiales de formato como genealogías, palabras en la cruz, cartas, etc. \n\nVerifique que el texto esté marcado utilizando los marcadores de formato estándar (USFM) correctos. Ver https://ubsicap.github.io/usfm para la documentación de USFM.',
              fr: 'Vérifier la mise en page, les retraits et le formatage spécial.\nLire le texte et vérifier que les sauts de paragraphe se trouvent aux endroits souhaités. Si une autre traduction est utilisée comme base, cette vérification peut être faite en utilisant Outils> Listes récapitulatives> Marqueurs et rechercher les nouveaux marqueurs de paragraphe tels que \\p et \\m.\n\nIl peut être utile de vérifier les en-têtes de section à l’aide de Outils> Listes récapitulatives> En-têtes de section.\n\nVérifier d’autres questions de mise en page telles que la poésie. Une attention particulière devrait être accordée aux retraits de poésie. Si une autre traduction est utilisée comme base, cette vérification peut être effectuée en utilisant Outils> Listes récapitulatives> Marqueurs et rechercher les nouveaux marqueurs de paragraphe tels que \\q, \\q1 et \\q2.\n\nVoir la liste des questions spéciales de mise en forme telles que les généalogies, les mots sur la croix, les lettres, etc.\n\nVérifier que le texte est marqué à l’aide des marqueurs corrects de format standard (USFM). Voir https://ubsicap.github.io/usfm pour la documentation de l’USFM.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '75365725-9717-46de-85f9-413d44af9b59',
            names: {
              en: 'Prepare for comprehension testing',
              pt: 'Preparo para o teste de compreensão',
              es: 'Prepárese para la prueba de comprensión',
              fr: 'Préparation pour le test de compréhension',
            },
            descriptions: {
              en: 'Prepare comprehension testing questions: \n● Re-read the translation text\n● Draft general retell questions for comprehension testing\n● Identify possible issues of misunderstanding\n● Draft specific questions related to the main events in the passage, participant reference, key terms, foreign concepts, metaphors, rhetorical questions, inferential information, positive or negative associations, etc.',
              pt: 'Preparar perguntas de teste de compreensão: \n\n● Releia o texto da tradução\n\n● Redigir perguntas gerais de recontagem para testes de compreensão\n\n● Identificar possíveis problemas de mal-entendidos\n\n● Redigir perguntas específicas relacionadas com os principais eventos da passagem, referência ao participante, termos-chave, conceitos estrangeiros, metáforas, perguntas retóricas, informações inferenciais, associações positivas ou negativas, etc.',
              es: 'Preparar preguntas para la prueba de comprensión: \n● Releer el texto traducido\n● Redactar las preguntas generales del relato para la prueba de comprensión\n● Identificar posibles problemas de malentendidos\n● Redactar las preguntas específicas relacionadas con los principales eventos del pasaje, referencia de los participantes, términos clave, conceptos extranjeros, metáforas, preguntas retóricas, información inferencial, asociaciones positivas o negativas, entre otras.',
              fr: 'Préparer les questions du test de compréhension :\n● Relire le texte traduit\n● Ecrire des questions de reformulation pour tester la compréhension\n● Identifier les problèmes possibles de mauvaise compréhension\n● Rédiger des questions spécifiques liées aux principaux événements du passage, aux références des participants, aux termes clés, aux concepts étrangers, aux métaphores, aux questions rhétoriques, aux informations déduites, aux associations positives ou négatives, etc.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'e2642958-0d86-450b-8c6d-df076b05ab5f',
            names: {
              en: 'Perform first comprehension test',
              pt: 'Realizar testes de compreensão',
              es: 'Realizar pruebas de comprensión',
              fr: 'Tests de compréhension',
            },
            descriptions: {
              en: 'Perform comprehension testing, documenting feedback/answers for later analysis/review. Include supplementary materials in testing.',
              pt: 'Realizar testes de compreensão, documentando feedback/respostas para posterior análise/revisão. Incluir materiais suplementares nos testes.',
              es: 'Realizar pruebas de comprensión, documentando comentarios/respuestas para su análisis/revisión. Incluya materiales suplementarios en las pruebas.',
              fr: 'Effectuer des tests de compréhension, documenter le feedback et les réponses pour une analyse/révision ultérieure. Inclure les matériels supplémentaires dans les tests.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 100,
              easy: 85,
              moderate: 70,
              difficult: 60,
            },
          },
          {
            id: 'e51f770f-2c83-43e8-a107-d41196014698',
            names: {
              en: 'Perform second comprehension test',
            },
            descriptions: {
              en: 'Perform a second comprehension test with different respondents.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '17f2161c-086e-4016-975d-c58dfb7f55cf',
            names: {
              en: 'Revise from feedback',
              pt: 'Revisão baseada em feedback',
              es: 'Revisar a partir de los comentarios',
              fr: 'Révision à partir du feedback',
            },
            descriptions: {
              en: 'The team reviews the results of the comprehension testing and incorporates changes to the text where appropriate. Repeat comprehension testing for revised passages as necessary.',
              pt: 'A equipa revê os resultados do teste de compreensão e incorpora alterações ao texto sempre que necessário. Se necessário, repita o teste de compreensão para as passagens revistas.',
              es: 'El equipo revisa los resultados de las pruebas de comprensión e incorpora cambios al texto cuando es apropiado. Repita la prueba de comprensión para los pasajes revisados según sea necesario.',
              fr: 'L’équipe examine les résultats des tests de compréhension et apporte des modifications au texte, si nécessaire. Répéter les tests de compréhension pour les passages révisés, au besoin.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
        ],
      },
      {
        id: '20974cee-9f40-43c4-a0ae-5e733238e134',
        names: {
          en: 'Prepare for Consultant',
          pt: 'Preparo para a verificação do Consultor',
          es: 'Prepárese para el Consultor',
          fr: 'Préparation pour le consultant',
        },
        descriptions: {
          en: 'The goal of this stage is to prepare the back translation for the consultant. \n\nAutomatic checks for missing and out of date verses in the back translation must be set to run at this stage. This check requires that the back translation project is associated with your project.',
          pt: 'O objetivo desta etapa é preparar a retrotradução para o consultor. \n\nVerificações automáticas de versículos ausentes e desatualizados na retrotradução devem ser feitas nesta fase. Esta verificação requer que o projeto de retrotradução seja associado ao seu projeto.',
          es: 'El objetivo de esta etapa es preparar la retrotraducción para el consultor. \n\nLas verificaciones automáticas de los versículos faltantes y obsoletos en la retrotraducción deben configurarse para que se ejecuten en esta etapa después de haber asociado un proyecto de retrotraducción a este proyecto.',
          fr: 'L’objectif de cette étape est de préparer la retraduction pour le consultant.\n\nA ce stade, les contrôles automatiques des versets manquants et obsolètes dans la retraduction doivent être activés. Cette vérification exige que le projet de retraduction soit associé à votre projet.',
        },
        tasks: [
          {
            id: '0b6970df-00ce-4da4-a46a-28be4c7f2e6a',
            names: {
              en: 'Draft the back translation',
              pt: 'Rascunho da Retrotradução',
              es: 'Redactar la retrotraducción',
              fr: 'Rédaction de la retraduction',
            },
            descriptions: {
              en: 'The back translation is created by someone who was not involved in the translation. The goal is to show how a reader will understand the text. The text is entered into the back translation project. It must be prepared without looking at any other translation or version or resource.',
              pt: 'A retrotradução é criada por alguém que não estava envolvido na tradução. O objetivo é mostrar como um leitor comum irá entender o texto. O texto é introduzido no projecto de retrotradução.',
              es: 'La retrotraducción es creada por alguien que no estuvo involucrado en la traducción, para mostrar cómo un lector entenderá el texto. El texto se introduce en el proyecto de retrotraducción.',
              fr: 'La retraduction est créée par quelqu’un qui n’a pas participé à la traduction. Le but est de montrer comment le lecteur comprendra le texte. Le texte est saisi dans le projet de retraduction.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '7c50ab22-d2cb-415b-b5b7-be52aaf02016',
            names: {
              en: 'Check the back translation',
              pt: 'Verifica a Retrotradução',
              es: 'Comprobar la retrotraducción',
              fr: 'Vérification de la retraduction',
            },
            descriptions: {
              en: '● The team should verify that the back translation is complete, and mark all verses as finished in Paratext.\n\n● Someone who did not draft the back translation should check to be sure it accurately represents the RL draft.\n\n● As an additional check for accuracy, the team should also compare the back translation with a fairly literal version (national language or English). Make revisions in the RL draft if needed.',
              pt: 'A equipe deve verificar se a retrotradução está completa, e marcar todos os versículos como concluídos no Paratext.',
              es: 'El equipo debe verificar que la retrotraducción esté completa, y marcar todos los versículos como terminados en Paratext.',
              fr: 'L’équipe doit vérifier que la retraduction est complète et marquer tous les versets comme achevés dans Paratext.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 100,
              easy: 85,
              moderate: 70,
              difficult: 60,
            },
          },
          {
            id: '3040e2e0-dea8-4708-a476-212c427f9089',
            names: {
              en: 'Update the Biblical terms renderings',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: 'b270751c-03d8-463b-abbf-5c8e3c4a188b',
        names: {
          en: 'Consultant Check',
          pt: 'Verificação do Consultor',
          es: 'Comprobación del consultor',
          fr: 'Vérification du conseiller',
        },
        descriptions: {
          en: "The consultant interacts with the team remotely to prepare for the checking session, and then plans a time when they can meet to review the text together.  At the end of the checking session, the team has some work to comply with the consultant's suggestions.  When the consultant is satisfied and the improvements have been made, a report or statement is submitted to the team showing that the text has been approved.",
          pt: 'O consultor interage com a equipe remotamente para se preparar para a sessão de verificação e, em seguida, marque uma data em que eles podem se reunir para revisar o texto juntos.  No final da sessão de verificação, a equipe tem algum trabalho para cumprir as sugestões do consultor.  Quando o consultor está satisfeito que as melhorias foram feitas, um relatório ou declaração é enviado à equipe mostrando que o texto foi aprovado.',
          es: 'El consultor interactúa con el equipo de forma remota para prepararse para la sesión de verificación y, a continuación, planifica un momento en el que pueden reunirse para revisar el texto juntos.  Al final de la sesión de verificación, el equipo tiene algo de trabajo para cumplir con las sugerencias del consultor.  Una vez que el consultor está satisfecho con los cambios realizados, se presenta un informe o declaración al equipo que muestra que el texto ha sido aprobado.',
          fr: 'Le conseiller communique à distance avec l’équipe pour préparer la séance de vérification, puis planifie un moment où ils peuvent se rencontrer pour réviser le texte ensemble. A la fin de la séance de vérification, l’équipe a du travail à faire pour se conformer aux suggestions du conseiller. Si le conseiller est satisfait des améliorations apportées, un rapport ou une déclaration est soumis à l’équipe indiquant que le texte a été approuvé.',
        },
        tasks: [
          {
            id: 'fd6c2f9b-c34f-4762-bcd0-845ff03c1785',
            names: {
              en: 'Preliminary evaluation of text',
              pt: 'Avaliação preliminar do texto',
              es: 'Evaluación preliminar del texto',
              fr: 'Évaluation préliminaire du texte',
            },
            descriptions: {
              en: 'The consultant receives the text in advance and makes preliminary evaluations. The consultant’s comments for the team are placed in the translation or back translation using project notes. The evaluation should focus on accuracy, clarity, naturalness, and acceptability of the translation. The consultant will also evaluate all supplementary materials and illustrations used.',
              pt: 'O consultor recebe o texto com antecedência e faz avaliações preliminares. Os comentários do consultor para a equipe são colocados na tradução ou retrotradução usando notas de projeto. A avaliação deve se concentrar na exatidão, clareza, naturalidade e aceitabilidade da tradução. O consultor também avaliará todos os materiais e ilustrações suplementares utilizados. A equipe pode revisar e implementar sugestões feitas pelo consultor antes da interação direta.',
              es: 'El consultor recibe el texto por adelantado y hace evaluaciones preliminares, colocadas en comentarios para el equipo en la traducción o retrotraducción. La evaluación debe centrarse en la precisión, claridad, naturalidad y aceptabilidad de la traducción, incluidos todos los materiales e ilustraciones suplementarios utilizados. El equipo puede revisar e implementar las sugerencias hechas por el consultor antes de la interacción directa.',
              fr: 'Le conseiller reçoit le texte à l’avance et procède à des évaluations préliminaires. Les commentaires du conseiller à l’intention de l’équipe sont placés dans la traduction ou la retraduction à l’aide des notes de projet. L’évaluation doit porter sur l’exactitude, la clarté, le caractère naturel et l’acceptabilité de la traduction. Le conseiller évaluera également tous les documents et illustrations supplémentaires utilisés. L’équipe peut examiner et mettre en œuvre les suggestions faites par le conseiller avant l’interaction directe.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 128,
              moderate: 105,
              difficult: 90,
            },
          },
          {
            id: '25931f1d-cc55-46c9-a3e8-8f0bea379b90',
            names: {
              en: 'Consultant checking session',
              pt: 'Sessão de verificação de consultores',
              es: 'Sesión de verificación con el consultor',
              fr: 'Séance de vérification avec le conseiller',
            },
            descriptions: {
              en: 'The consultant interacts with the translation team in a physical or virtual session. He or she makes observations about the text and supplementary materials, and gives assistance and advice as requested. \n\nThis task involves editing, and a member should be assigned to make changes during the session.',
              pt: 'O consultor interage com a equipe de tradução em uma sessão física ou virtual. Ele ou ela faz observações sobre o texto e materiais suplementares, e dá assistência e aconselhamento conforme solicitado. \n\nEsta tarefa envolve a edição, e um membro deve ser designado para fazer mudanças durante a sessão.',
              es: 'El consultor interactúa con el equipo de traducción en una sesión física o virtual. Hace observaciones sobre el texto y los materiales complementarios, y presta asistencia y asesoramiento cuando se le solicita. \n\nEsta tarea implica la edición, y se debe asignar a un miembro para que realice cambios durante la sesión.',
              fr: 'Le conseiller interagit avec l’équipe de traduction lors d’une session physique ou virtuelle. Il ou elle fait des observations sur le texte et les documents supplémentaires, et apporte de l’aide et des conseils sur demande.\n\nCette tâche implique la modification du projet et un membre de l’équipe doit être désigné pour apporter des modifications au cours de la session.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 150,
              easy: 128,
              moderate: 105,
              difficult: 90,
            },
          },
          {
            id: '9955d13b-4d77-4c77-81a3-a728bf11b77e',
            names: {
              en: 'Implement suggestions',
              pt: 'Implementar sugestões',
              es: 'Implementar sugerencias',
              fr: 'Application des suggestions',
            },
            descriptions: {
              en: 'If the consultant gave action items during the checking session, these need to be completed and approved by the consultant, who will then mark them as resolved.',
              pt: 'Se o consultor deu itens de ação durante a sessão de verificação, eles precisam ser completados e marcados como resolvidos.',
              es: 'Los cambios que no se pudieron realizar durante la sesión de verificación deben realizarse más tarde y todas las acciones deben resolverse.',
              fr: 'Si le conseiller a donné des mesures de suivi au cours de la séance de vérification, celles-ci doivent être complétées et marquées comme résolues.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 420,
              easy: 360,
              moderate: 300,
              difficult: 240,
            },
          },
          {
            id: 'c6f68e0f-7edd-4841-bf2a-502fd1dd6daf',
            names: {
              en: 'Receive consultant approval',
              pt: 'Receber aprovação do consultor',
              es: 'Recibir la aprobación del consultor',
              fr: 'Approbation du conseiller.',
            },
            descriptions: {
              en: "After implementing the changes, get the consultant's approval via the consultant report or appropriate means.  If approval is not granted, follow whatever remaining recommendations to satisfy the consultant.",
              pt: 'Após a implementação das mudanças, obtenha a aprovação do consultor através do relatório do consultor ou dos meios apropriados.  Se a aprovação não for concedida, siga as recomendações restantes para satisfazer a consultora.',
              es: 'Después de implementar los cambios, obtenga la aprobación del consultor a través del informe del consultor o de los medios apropiados.  Si no se concede la aprobación, siga las recomendaciones restantes para satisfacer al consultor.',
              fr: 'Après la mise en œuvre des changements, obtenir l’approbation du conseiller par le biais du rapport du conseiller ou des moyens appropriés. Si l’approbation n’est pas accordée, suivre les recommandations restantes pour satisfaire le conseiller.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '16385cc6-d555-4b29-b342-1f78a9853656',
        names: {
          en: 'Review by the Community',
          pt: 'Revisão pela Comunidade',
          es: 'Revisión por parte de la Comunidad',
          fr: 'Réexamen par la Communauté',
        },
        descriptions: {
          en: 'The goal of this stage is to have one or more community groups to review the text and make suggestions and recommendations.\n\nIt is understood that the feasibility of a community check may well be limited in certain contexts.',
          pt: 'O objetivo desta etapa é ter um ou mais grupos comunitários para revisar o texto e fazer sugestões e recomendações.',
          es: 'El objetivo de esta etapa es que uno o más grupos comunitarios revisen el texto y hagan sugerencias y recomendaciones.',
          fr: 'Le but de cette étape est de demander à un ou plusieurs groupes communautaires d’examiner le texte et de faire des suggestions et des recommandations.',
        },
        tasks: [
          {
            id: 'ad1e60e2-0340-4832-b914-16fc9c76c76e',
            names: {
              en: 'Community review',
              pt: 'Análise da naturalidade e revisão',
              es: 'Revisión de la naturalidad',
              fr: 'Vérification du caractère naturel et révision',
            },
            descriptions: {
              en: 'Community leaders, church leaders, and other community members review the audio or written text, especially for naturalness.  They are also invited to comment on words used in the translation that may not be in general usage, difficult to understand, etc.  This would include any key biblical terms that the reviewers may point out and discuss with the team.',
              pt: 'A comunidade faz uma revisão de naturalidade do áudio ou do texto escrito. A equipe discute as sugestões da revisão de naturalidade e faz quaisquer mudanças apropriadas.',
              es: 'La comunidad hace una revisión de naturalidad del audio o texto escrito. El equipo discute las sugerencias de la revisión de naturalidad y hace los cambios apropiados.',
              fr: 'La communauté procède à une révision du caractère naturel du texte audio ou écrit. L’équipe discute des suggestions de l’examen du caractère naturel et apporte les changements appropriés.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'ed3f57fb-e3de-4b13-bfe8-c9754d61e044',
            names: {
              en: 'Report on community review',
              pt: 'Relatório sobre a revisão da comunidade',
              es: 'Informe sobre la revisión de la comunidad',
              fr: 'Rédaction du rapport sur la vérification avec la communauté',
            },
            descriptions: {
              en: 'The team reports to the consultant on any textual or key terms changes made as a result of the community review.  Rationale for the changes should be included.  The team should open the Biblical terms tool and consult the notes, and history sections for the terms being reported on. It is best practice to enter this information in the tool as the changes were being discussed and decided on.',
              pt: 'A equipe reporta ao consultor sobre quaisquer alterações textuais ou termos-chave feitas como resultado da revisão da comunidade.  Justificativa para as mudanças deve ser incluída. A equipe deve abrir a ferramenta de termos bíblicos e consultar as notas e as seções de história para os termos que estão sendo relatados. É melhor prática introduzir esta informação na ferramenta à medida que as mudanças são discutidas e decididas.',
              es: 'El equipo informa al consultor sobre cualquier cambio en el texto o en los términos clave como resultado de la revisión de la comunidad.  Debe incluirse la justificación de los cambios.  El equipo debe abrir la herramienta de vocablos bíblicos y consultar las notas y las secciones de historia de los términos sobre los que se informa. Es una buena práctica introducir esta información en la herramienta a medida que se discuten y deciden los cambios.',
              fr: 'L’équipe rend compte au conseiller de tout changement de texte ou de termes clés apporté à la suite de l’examen de la communauté. La justification des changements devrait être incluse. L’équipe devrait ouvrir l’outil des termes bibliques et consulter les notes et les sections d’historique pour les termes dont il est question. Il est préférable d’entrer cette information dans l’outil au fur et à mesure que l’on discute des changements et que l’on prend des décisions.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: 'c66ede6b-1e7b-4d55-b5c3-f8aff60217d7',
        names: {
          en: 'Finalizing for Publication',
          pt: 'Finalização para publicação',
          es: 'Finalización para la publicación',
          fr: 'Finalisation pour publication',
        },
        descriptions: {
          en: 'The text is finalized for publication and uploaded to the DBL. If a typeset publication is in view, the typesetting requirements will be furnished by the typesetter.',
          pt: 'O texto é finalizado para publicação e enviado para a DBL. Se uma publicação de composição for prevista, os requisitos de composição serão fornecidos pelo compositor.',
          es: 'El texto se finaliza para su publicación y se carga en el DBL. Si se planifica una publicación de composición tipográfica, los requisitos de composición serán proporcionados por la persona encargada de la composición tipográfica.',
          fr: 'Le texte est finalisé pour publication et téléchargé dans le DBL. Si une publication imprimée est en vue, les exigences en matière de composition seront fournies par le compositeur.',
        },
        tasks: [
          {
            id: 'b3877769-af37-45c4-b225-24c988148bff',
            names: {
              en: 'Check and link glossary entries',
              pt: 'Verificar e ligar entradas do glossário',
              es: 'Comprobar y enlazar las entradas del glosario',
              fr: 'Vérification et liaison des entrées du glossaire',
            },
            descriptions: {
              en: 'For users to discover your glossary entries, the words must be marked for a print publication, or hyperlinked for digital publication.  Use the tools in Paratext to add the necessary markup, which will create hyperlinked entries or other highlighting in print to identify glossary words.',
              pt: 'Para que os usuários descubram seus itens do glossário, as palavras devem ser marcadas para uma publicação impressa ou hiperligadas para publicação digital.  Use as ferramentas em Paratext para adicionar a marcação necessária, que irá criar entradas hiperligadas ou outro destaque na impressão para identificar as palavras do glossário.',
              es: 'Para que los usuarios descubran las entradas de su glosario, las palabras deben estar marcadas para una publicación impresa o hipervinculadas para una publicación digital.  Utilice las herramientas de Paratext para añadir marcadores que crearán entradas hipervinculadas u otros resaltes en la impresión para identificar las palabras del glosario.',
              fr: 'Pour que les utilisateurs puissent découvrir vos entrées de glossaire, les mots doivent être marqués pour une publication imprimée ou des liens hypertexte doivent être créés pour une publication numérique. Utiliser les outils de Paratext pour ajouter le marquage nécessaire, qui créera des entrées hyperliées ou d’autres surlignages imprimés pour identifier les mots du glossaire.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 420,
              easy: 360,
              moderate: 300,
              difficult: 240,
            },
          },
          {
            id: '46f0f040-73ec-4789-a1e8-1747c131dcaf',
            names: {
              en: 'Enter Publication Information',
              pt: 'Introduza a informação de publicação',
              es: 'Introduzca la información de publicación',
              fr: 'Enregistrement de l’information pour la publication',
            },
            descriptions: {
              en: 'Open Project Properties for your project. Click on manage the Project Registration. This will take you to the entry for this project on the web. Go to the Publishing tab on the registration site and complete the information above the horizontal line.',
              pt: 'Abra as Propriedades do Projeto para o seu projeto. Clique em gerenciar o Registro de Projeto. Isso o levará à entrada para este projeto na web. Vá até a aba Publicação no site de registro e preencha as informações acima da linha horizontal.',
              es: 'Abra Propiedades del proyecto para su proyecto. Haga clic en Administrar el registro del proyecto. Esto le llevará a la entrada de este proyecto en la web. Vaya a la pestaña Publicación y complete la información arriba de la línea horizontal.',
              fr: 'Ouvrir Propriétés de projet pour votre projet. Cliquer sur Gérer l’enregistrement du projet. Ceci vous amènera à l’entrée de ce projet sur le web. Aller à l’onglet Publication du site d’inscription et compléter l’information au-dessus de la ligne horizontale.',
            },
            markComplete: 'by-project',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '415f8694-6422-49ba-8c35-4935535ba98d',
            names: {
              en: 'Submit to the DBL',
              pt: 'Submeter à DBL',
              es: 'Enviar a la DBL',
              fr: 'Soumission à la DBL',
            },
            descriptions: {
              en: 'Submit the text to the DBL.  For Wycliffe Global Alliance partners, the instructions are found at bit.ly/DBL-Submit. That page explains how to prepare the text and has a link to a form to fill in for the submission.',
              pt: 'Submeter o texto à DBL.  Para parceiros Wycliffe Global Alliance, as instruções são encontradas em bit.ly/DBL-Submit \n\n<a href="https://bit.ly/DBL-Submit">bit.ly/DBL-Submit</a> \n\nEsta página explica como preparar o texto e tem um link para um formulário a preencher para a submissão.',
              es: 'Envíe el texto a la DBL.  Para los socios de Wycliffe Global Alliance, las instrucciones se encuentran en bit.ly/DBL-Submit \n\n<a href="https://bit.ly/DBL-Submit">bit.ly/DBL-Submit</a> \n\nEsta página explica cómo preparar el texto y tiene un enlace a un formulario para rellenar para la presentación.',
              fr: 'Soumettre le texte à la DBL. Pour les partenaires de Wycliffe Global Alliance, les instructions se trouvent sur <a href==="https://bit.ly/DBL-Submit">bit.ly/DBL-Submit</a>\n\nCette page explique comment préparer le texte et contient un lien vers un formulaire à remplir pour la soumission.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'a9a461dc-23c0-460c-a33b-8a5d49ea88e9',
            names: {
              en: 'Publish',
              pt: 'Publicar',
              es: 'Publicar',
              fr: 'Publication',
            },
            descriptions: {
              en: 'Publish the translation in the form and media you have chosen: print, audio, digital, etc. \n\nYou are encouraged to rename this task based on your publishing strategy and add other tasks as needed.',
              pt: 'Publique na forma e mídia que você escolheu: impressa, áudio, digital, etc. \n\nVocê é encorajado a renomear esta tarefa com base em sua estratégia de publicação e adicionar outras tarefas conforme necessário.',
              es: 'Publicar la traducción en la forma y medio que usted haya elegido: impreso, audio, digital, etc. \n\nSe le anima a renombrar esta tarea en función de su estrategia de publicación y a añadir otras tareas según sea necesario.',
              fr: 'Publier la traduction sous la forme et sur le support de votre choix : imprimé, audio, numérique, etc.\n\nNous vous encourageons à renommer cette tâche en fonction de votre stratégie de publication et à ajouter d’autres tâches, si nécessaire.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
        ],
      },
    ],
    checks: [
      {
        checkId: 'basic.chapter-verse-numbers',
        notifyOnlyInStage: null,
        requiredInStage: '9eddb82d-ed66-4e24-bdab-060dea2294de',
      },
      {
        checkId: 'basic.markers',
        notifyOnlyInStage: null,
        requiredInStage: '9eddb82d-ed66-4e24-bdab-060dea2294de',
      },
      {
        checkId: 'notes.translator',
        notifyOnlyInStage: null,
        requiredInStage: '9eddb82d-ed66-4e24-bdab-060dea2294de',
      },
      {
        checkId: 'spelling.spelling',
        notifyOnlyInStage: null,
        requiredInStage: '9eddb82d-ed66-4e24-bdab-060dea2294de',
      },
      {
        checkId: 'notes.consultant',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.characters',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.punctuation',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.capitalization',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.repeated-words',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.unmatched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.matched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.quotations',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'basic.numbers',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'spelling.word-list',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'other.biblical-terms',
        notifyOnlyInStage: null,
        requiredInStage: '9443afef-8302-4727-8f85-1cb4ef464168',
      },
      {
        checkId: 'other.interlinear',
        notifyOnlyInStage: null,
        requiredInStage: '20974cee-9f40-43c4-a0ae-5e733238e134',
      },
      {
        checkId: 'basic.references',
        notifyOnlyInStage: null,
        requiredInStage: '16385cc6-d555-4b29-b342-1f78a9853656',
      },
      {
        checkId: 'notes.spelling-discussion',
        notifyOnlyInStage: null,
        requiredInStage: '16385cc6-d555-4b29-b342-1f78a9853656',
      },
      {
        checkId: 'notes.rendering-discussion',
        notifyOnlyInStage: null,
        requiredInStage: '16385cc6-d555-4b29-b342-1f78a9853656',
      },
      {
        checkId: 'other.parallel-passages',
        notifyOnlyInStage: null,
        requiredInStage: 'c66ede6b-1e7b-4d55-b5c3-f8aff60217d7',
      },
    ],
  },
  {
    id: '21f4f750-3f6a-4b34-b015-4ad4de69a7ae',
    name: 'TSC Plan',
    version: '9',
    kind: 'factory',
    stages: [
      {
        id: '1fee04f4-ddb8-4cfb-8a32-762328d6ba6c',
        names: {
          en: 'Drafting',
        },
        descriptions: {},
        tasks: [
          {
            id: 'cd202fa7-80f2-4925-8f9b-57a2f985c383',
            names: {
              en: 'Exegesis',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'c14c2cd6-eed0-462d-99f5-c61585993516',
            names: {
              en: 'Draft',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'e7c0a8fc-c55a-4ee6-ad29-6be54f5ad330',
            names: {
              en: 'Keyboard Text in PT',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'c7e15989-2dbd-482d-b584-b9911c4c05a9',
            names: {
              en: 'Draft Supplementary Helps',
            },
            descriptions: {
              en: 'Draft Section Headings, Footnotes, Glossary Entries, Book Introductions, Illustrations.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '7d2a59e8-67e5-4a73-9080-27e3da4c1029',
        names: {
          en: 'Team Checking & First Testing',
        },
        descriptions: {},
        tasks: [
          {
            id: 'f3a66e3a-7bdb-4aed-acee-c0bcca67c222',
            names: {
              en: 'Team Check',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '8a91e112-9932-4beb-a9e7-318f48fa9fce',
            names: {
              en: 'Team Check Key Terms',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '70673c7a-d735-4e76-8793-b55e6d6f92e4',
            names: {
              en: 'Team Check Names, Numbers, Weights, Measures, etc.',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'a532bc19-a806-46ea-b093-0504d6232d18',
            names: {
              en: 'Team Check Supplementary Helps',
            },
            descriptions: {
              en: 'Team Check  Section Headings, Footnotes, Glossary Entries, Book Introductions, Illustrations.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'a74a2beb-d8f8-4c59-b8d2-36feb777ce46',
            names: {
              en: 'First Testing',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '65ec15ba-b923-4dea-81c4-43b2581d232c',
            names: {
              en: 'Revise Based on Feedback from Testing',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
        names: {
          en: 'Preparing for Consultant',
        },
        descriptions: {},
        tasks: [
          {
            id: '5fa6797f-88cc-4440-9026-6d7f5a9ea240',
            names: {
              en: 'Prepare Back-Translation',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'c7b1c574-d645-4d3c-a3ec-45a37528031d',
            names: {
              en: 'Keyboard Back-Translation in PT',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '96663ac1-8b4b-40e4-a135-ee7a2bbf4733',
            names: {
              en: 'Team Check Back-Translation',
            },
            descriptions: {
              en: 'Team Check Back-Translation, Revise Text and Back-Translation',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'scripture-text',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: 'c2523b4a-8267-495d-b903-f45d98ebe0f0',
        names: {
          en: 'Consultant Checking',
        },
        descriptions: {},
        tasks: [
          {
            id: '2ef0350c-1efd-46ff-9cd5-711b8fa81e1c',
            names: {
              en: 'Create project notes',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'f06ce684-24c0-41e5-a493-0e93e78dc187',
            names: {
              en: 'Consultant Check & preliminary approval',
            },
            descriptions: {
              en: 'Consultant has place report on file.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '6dd794aa-bef3-44f7-a4c0-873fc2dc0708',
            names: {
              en: 'Revise Back-Translation',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '3e4ce946-cfc3-4fe9-a32e-81c1606a918c',
        names: {
          en: 'Community Testing and Reviewing',
        },
        descriptions: {},
        tasks: [
          {
            id: '1f87c9fa-f873-40a1-af1b-27d2989f6a6a',
            names: {
              en: 'Community Testing',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '063ebe9b-c4b8-4a1f-b7c0-a2e14bf097d0',
            names: {
              en: 'Revise Based on Feedback from Community Testing',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '75bf7f7f-98c3-4ff8-8b16-dafe6cb62f66',
            names: {
              en: 'Test Supplementary Helps',
            },
            descriptions: {
              en: 'Test Supplementary Section Headings, Footnotes, Glossary Entries, Book Introductions, Illustrations.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '0bc2330f-a091-474a-a2d3-61e1d4882ea3',
            names: {
              en: 'Test Key Terms for the whole book',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '7730a915-f701-4d7f-a2ff-a99b1308972f',
            names: {
              en: 'Reviewer Check',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '0689ae35-2e95-4bf7-b477-9a2503bafc0d',
            names: {
              en: 'Revise Based on Feedback from Reviewer Check',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '69893191-cff6-431a-81f5-24d0faf11426',
            names: {
              en: 'Review Key Terms',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '1b5d67e2-860e-4586-8201-642a83a2426d',
            names: {
              en: 'Review Supplementary Helps',
            },
            descriptions: {
              en: 'Review Supplementary Helps Section Headings, Footnotes, Glossary Entries, Book Introductions, Illustrations.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '86ac513a-15c2-45c4-9603-9cde6008b6b5',
        names: {
          en: 'Finalizing for Publication',
        },
        descriptions: {},
        tasks: [
          {
            id: 'd5930bdc-a280-42ad-a5c5-709cf8b8813a',
            names: {
              en: 'Choose Illustrations and Write Captions',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '802276a9-194c-4fb6-938e-786d6de3a911',
            names: {
              en: 'Choose Maps and Label Place Names',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '94882c23-827a-45fb-8163-06af594b691b',
            names: {
              en: 'Consistency Checks',
            },
            descriptions: {
              en: 'Consistency Checks Proper Names, Check Numbers, Money, Weights, Measures, etc., Key Terms, Parallel Passages.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'c47f9c65-64f2-4177-8cd8-a4615c394069',
            names: {
              en: 'Formatting Checks',
            },
            descriptions: {
              en: 'Formatting Checks Review Section Breaks, Review Section Headings, Review Paragraph Breaks, Review Layout and Indents.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '4287f31d-a117-4ba0-8f51-8cf716af908a',
            names: {
              en: 'Consultant Check Last Items',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '7aaa1652-ded5-4617-931f-0bd3203627d8',
            names: {
              en: 'Final Approval from Consultant',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '6b140055-fcd8-4064-8c81-18235e5b46d4',
            names: {
              en: 'Final Read-Through & Approval',
            },
            descriptions: {
              en: 'Final Read-Through & Approval with church & community representatives.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'e35a9869-aabe-43ad-8f8b-85cf2d27a6bb',
            names: {
              en: 'Final Typesetting',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'df9f4f8d-05da-4176-9517-56ca5c5b2d0b',
            names: {
              en: 'Audio Recording',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
    ],
    checks: [
      {
        checkId: 'basic.chapter-verse-numbers',
        notifyOnlyInStage: null,
        requiredInStage: '1fee04f4-ddb8-4cfb-8a32-762328d6ba6c',
      },
      {
        checkId: 'basic.markers',
        notifyOnlyInStage: null,
        requiredInStage: '1fee04f4-ddb8-4cfb-8a32-762328d6ba6c',
      },
      {
        checkId: 'other.biblical-terms',
        notifyOnlyInStage: null,
        requiredInStage: '7d2a59e8-67e5-4a73-9080-27e3da4c1029',
      },
      {
        checkId: 'basic.characters',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'basic.punctuation',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'basic.references',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'basic.capitalization',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'basic.repeated-words',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'basic.matched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'basic.quotations',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'basic.numbers',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'basic.unmatched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'spelling.word-list',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'spelling.spelling',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'notes.consultant',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'back.placeholder',
        notifyOnlyInStage: null,
        requiredInStage: 'fe0f2c67-06b7-42d6-91f7-2ed52c690940',
      },
      {
        checkId: 'other.parallel-passages',
        notifyOnlyInStage: null,
        requiredInStage: 'c2523b4a-8267-495d-b903-f45d98ebe0f0',
      },
      {
        checkId: 'notes.spelling-discussion',
        notifyOnlyInStage: null,
        requiredInStage: '3e4ce946-cfc3-4fe9-a32e-81c1606a918c',
      },
      {
        checkId: 'notes.rendering-discussion',
        notifyOnlyInStage: null,
        requiredInStage: '3e4ce946-cfc3-4fe9-a32e-81c1606a918c',
      },
    ],
  },
  {
    id: '7e4cea18-4f66-4d4f-813c-a206b08e8502',
    name: 'UBS Standard Translation',
    version: '1.0',
    kind: 'factory',
    stages: [
      {
        id: '1703c346-ce9e-427e-9476-9f3a8af26c67',
        names: {
          en: 'Drafting',
          'zh-Hans': '初稿',
          es: 'Borrador',
          'zh-Hant': '初稿',
          pt: 'Rascunho',
        },
        descriptions: {},
        tasks: [
          {
            id: '97876b3b-e8b4-44f7-bdb4-e24d5072dbd6',
            names: {
              en: 'Study and translate',
              'zh-Hans': '研读和翻译',
              es: 'Estudiar y Traducir',
              'zh-Hant': '研讀和翻譯',
              pt: 'Estudar e Traduzir',
            },
            descriptions: {
              en: 'Thorough exegesis at fundamental level',
              'zh-Hans': '在基础层面上仔细研读和解释经文。',
              es: 'Exégesis profunda a nivel fundamental',
              'zh-Hant': '在基礎層面上仔細研讀和解釋經文。',
              pt: 'Exegese profunda no nível fundamental',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 14,
              easy: 12,
              moderate: 10,
              difficult: 8,
            },
          },
        ],
      },
      {
        id: 'c132ac10-5985-4d99-8ad9-3e823809720a',
        names: {
          en: 'Internal review',
          'zh-Hans': '内部审阅',
          es: 'Revisión interna',
          'zh-Hant': '內部審閱',
          pt: 'Revisão interna',
        },
        descriptions: {},
        tasks: [
          {
            id: 'a4d088eb-e23b-4294-9971-6024621ea486',
            names: {
              en: 'Co-translator comments on translation',
              'zh-Hans': '（其他）翻译成员对译稿的意见',
              es: 'Comentarios de  otro traductor',
              'zh-Hant': '（其他）翻譯成員對譯稿的意見',
              pt: 'Comentários do co-tradutor sobre a tradução',
            },
            descriptions: {
              en: 'Thorough exegetical review, or second cycle of review',
              'zh-Hans': '这可以是进一步释经，或是第二轮复审。',
              es: 'Revisión exégetica profunda o segundo ciclo de revisión.',
              'zh-Hant': '這可以是進一步釋經，或是第二輪複審。',
              pt: 'Revisão exegética profunda ou segundo ciclo de revisão.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 42,
              easy: 36,
              moderate: 30,
              difficult: 24,
            },
          },
          {
            id: '05980b7f-dcef-4f7c-adbd-5d11db2635df',
            names: {
              en: 'Drafter assesses co-translator comments',
              'zh-Hans': '初译者评价和总结其他成员的意见',
              es: 'Evaluar los comentarios del co-traductor',
              'zh-Hant': '初譯者評價和總結其他成員的意見',
              pt: 'Avaliar os comentários do co-tradutor',
            },
            descriptions: {
              en: 'Input changes and assign notes back to co-translator',
              'zh-Hans':
                '在《圣经辅助工具》更新改动，并（如需要）透过“注解”功能针对有关问题与成员沟通。',
              es: 'Ingresar los cambios y enviar notas al co-traductor.',
              'zh-Hant':
                '在《聖經輔助工具》更新改動，並（如需要）透過「註解」功能針對有關問題與成員溝通。',
              pt: 'Inserir as alterações e enviar notas ao co-tradutor.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'd28ae1e1-2b6c-47f1-8a20-159b3e96b1c8',
            names: {
              en: 'Co-translator resolves or reassigns comments',
              'zh-Hans': '翻译成员解决“注解”，或把“注解”再分配给其他成员',
              es: 'Co-traductor resuelve o reenvia los comentarios',
              'zh-Hant': '同工解決註解，或再分配有關的意見',
              pt: 'Co-tradutor resolve ou reenvia os comentários',
            },
            descriptions: {
              'zh-Hans':
                '也就是说，如果初译者在总结其他成员对初稿意见的过程中，透过“注解”功能回复了个别成员或作进一步咨询，该成员必须解决“注解”，或把该“注解”转发给其他成员。',
              'zh-Hant':
                '也就是說，如果初譯者在總結其他成員對初稿意見的過程中，透過「註解」功能回復了個別成員或作進一步咨詢，該成員必須解決「註解」，或把該「註解」轉發給其他成員。',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '2a64a7e8-052d-42f3-8e01-e44086f14090',
        names: {
          en: 'External review',
          'zh-Hans': '外部审阅',
          es: 'Revisión Externa',
          'zh-Hant': '外部審閱',
          pt: 'Revisão Externa',
        },
        descriptions: {},
        tasks: [
          {
            id: '7a640033-f4e0-4f91-801c-ed4bec253f5c',
            names: {
              en: 'Exegete comments on translation',
              'zh-Hans': '翻译顾问或特别评审者对译稿的意见',
              es: 'Exégeta hace comentarios a la traducción',
              'zh-Hant': '翻譯顧問或特別評審者對譯稿的意見',
              pt: 'Exegeta faz comentários sobre a tradução',
            },
            descriptions: {
              'zh-Hans':
                '除了翻译顾问，有些语言群体可能有资深的学者或老师或牧长对《圣经》有很深入的研究和认识，但未能成为翻译小组成员，却愿意参与审阅工作。',
              'zh-Hant':
                '除了翻譯顧問，有些語言群體可能有資深的學者或老師或牧長對《聖經》有很深入的研究和認識，但未能成為翻譯小組成員，卻願意參與審閱工作。',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 210,
              easy: 180,
              moderate: 150,
              difficult: 120,
            },
          },
          {
            id: 'f15d1946-c2b2-4090-9a78-43cafdb1df09',
            names: {
              en: 'Drafter assesses exegetical comments',
              'zh-Hans': '初译者评价和总结特别评审者反馈的意见',
              es: 'Revisión de los comentarios exégeticos',
              'zh-Hant': '初譯者評價和總結特別評審者反饋的意見',
              pt: 'Revisão dos comentários exegéticos',
            },
            descriptions: {
              'zh-Hans':
                '在《圣经辅助工具》更新改动，并（如需要）透过“注解”功能针对有关问题与翻译顾问或特别评审者沟通。这是假设他们也使用《圣经辅助工具》。',
              'zh-Hant':
                '在《聖經輔助工具》更新改動，並（如需要）透過「註解」功能針對有關問題與翻譯顧問或特別評審者溝通。這是假設他們也使用《聖經輔助工具》。',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '6121a691-f6e5-48bb-9224-205b93fcc3c4',
            names: {
              en: 'Exegete resolves or reassigns comments',
              'zh-Hans': '翻译顾问或特别评审者解决“注解”，或把“注解”再分配给其他同工',
              es: 'Exégeta resuelve o reenvia los comentarios',
              'zh-Hant': '翻譯顧問或特別評審者解決「註解」，或把「註解」再分配給其他同工',
              pt: 'Exegeta resolve ou reenvia os comentários',
            },
            descriptions: {
              'zh-Hans':
                '也就是说，如果初译者在总结翻译顾问或特别评审者对初稿意见的过程中，透过“注解”功能回复了他们或作进一步咨询，翻译顾问或特别评审者必须解决“注解”，或把该“注解”转发给其他成员。这是假设他们也使用《圣经辅助工具》。',
              'zh-Hant':
                '也就是說，如果初譯者在總結翻譯顧問或特別評審者對初稿意見的過程中，透過「註解」功能回復了他們或作進一步咨詢，翻譯顧問或特別評審者必須解決「註解」，或把該「註解」轉發給其他成員。這是假設他們也使用《聖經輔助工具》。',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '6a4b645f-a24c-41b0-8fe7-ceb2f3b34a50',
            names: {
              en: 'Team delivers text to community reviewers',
              'zh-Hans': '翻译小组向公众审阅者发送文本',
              es: 'Revision de textos traducidos con la comunidad',
              'zh-Hant': '翻譯小組向公眾審閱者發送文本',
              pt: 'Revisão com a comunidade dos textos traduzidos',
            },
            descriptions: {
              'zh-Hans':
                '在一般情况下，公眾审阅者大概不会使用《圣经辅助工具》；按此，翻译小组只能打印出来分发。',
              'zh-Hant':
                '在一般情況下，公眾審閱者大概不會使用《聖經輔助工具》；按此，翻譯小組只能打印出來分發。',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'de2562d0-8a26-4da4-b38a-3473a1144e7d',
            names: {
              en: 'Team assesses community comments',
              'zh-Hans': '翻译小组评价和总结公众反馈的意见',
              es: 'Traductores revisan los comentarios de la comunidad',
              'zh-Hant': '翻譯小組評價和總結公眾反饋的意見',
              pt: 'Tradutores revisam os comentários da comunidade',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: 'dbad86ec-fc46-4f93-a943-362155ccec49',
        names: {
          en: 'Final review',
          'zh-Hans': '最后审阅',
          es: 'Revisión Final',
          'zh-Hant': '最後審閱',
          pt: 'Revisão Final',
        },
        descriptions: {},
        tasks: [
          {
            id: 'd3cd428c-556f-4449-8c57-70b82db47278',
            names: {
              en: 'Stylist/editor comments on text',
              'zh-Hans': '文体审阅者／编辑评论文本',
              es: 'Comentarios del editor sobre la traducción',
              'zh-Hant': '文體審閱者／編輯評論文本',
              pt: 'Comentários do editor sobre a tradução',
            },
            descriptions: {
              'zh-Hans':
                '这只适用于某些语言群体：当中有特别的文体审阅者或编辑，该审阅者或编辑未能成为翻译小组成员，但愿意参与审阅工作。',
              'zh-Hant':
                '這只適用於某些語言群體：當中有特別的文體審閱者或編輯，該審閱者或編輯未能成為翻譯小組成員，但願意參與審閱工作。',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '79768302-5c5a-4e30-afdc-7d99260647aa',
            names: {
              en: 'Drafter assesses stylist/editor comments',
              'zh-Hans': '初译者评价和总结文体审阅者／编辑反馈的意见',
              es: 'Traductores evaluan los comentarios del editor',
              'zh-Hant': '初譯者評價和總結文體審閱者／編輯反饋的意見',
              pt: 'Tradutores avaliam os comentários do editor',
            },
            descriptions: {
              'zh-Hans':
                '在《圣经辅助工具》更新改动，并（如需要）透过“注解”功能针对有关问题与文体审阅者或编辑沟通。',
              'zh-Hant':
                '在《聖經輔助工具》更新改動，並（如需要）透過「註解」功能針對有關問題與文體審閱者或編輯溝通。',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '03959294-d8ea-43e0-be88-b2665fbf625f',
            names: {
              en: 'Final (oral) reading of text',
              'zh-Hans': '最后的文本阅读（朗读）',
              es: 'Lectura final Oral de la traducción',
              'zh-Hant': '最後的文本閱讀（朗讀）',
              pt: 'Leitura final (oral) da tradução',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '3056c2f9-2b84-40c1-8fd9-f569cda0f67d',
            names: {
              en: 'Consultant gives final approval',
              'zh-Hans': '翻译顾问最后核准文本',
              es: 'Consultor otroga la aprobación final',
              'zh-Hant': '翻譯顧問最後核准文本',
              pt: 'Consultor aprova o texto final',
            },
            descriptions: {},
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
    ],
    checks: [
      {
        checkId: 'basic.chapter-verse-numbers',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.markers',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.characters',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.punctuation',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.references',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.unmatched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.capitalization',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.repeated-words',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.matched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.quotations',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'basic.numbers',
        notifyOnlyInStage: null,
        requiredInStage: '1703c346-ce9e-427e-9476-9f3a8af26c67',
      },
      {
        checkId: 'other.biblical-terms',
        notifyOnlyInStage: null,
        requiredInStage: 'c132ac10-5985-4d99-8ad9-3e823809720a',
      },
      {
        checkId: 'other.parallel-passages',
        notifyOnlyInStage: null,
        requiredInStage: 'c132ac10-5985-4d99-8ad9-3e823809720a',
      },
      {
        checkId: 'spelling.spelling',
        notifyOnlyInStage: null,
        requiredInStage: 'c132ac10-5985-4d99-8ad9-3e823809720a',
      },
      {
        checkId: 'spelling.word-list',
        notifyOnlyInStage: null,
        requiredInStage: 'c132ac10-5985-4d99-8ad9-3e823809720a',
      },
      {
        checkId: 'notes.spelling-discussion',
        notifyOnlyInStage: null,
        requiredInStage: 'c132ac10-5985-4d99-8ad9-3e823809720a',
      },
      {
        checkId: 'notes.rendering-discussion',
        notifyOnlyInStage: null,
        requiredInStage: 'c132ac10-5985-4d99-8ad9-3e823809720a',
      },
      {
        checkId: 'notes.consultant',
        notifyOnlyInStage: null,
        requiredInStage: 'c132ac10-5985-4d99-8ad9-3e823809720a',
      },
    ],
  },
  {
    id: 'f1c03f36-ab68-4f6a-b472-5964bc2da43e',
    name: 'UBS Study Bible',
    version: '1.0',
    kind: 'factory',
    stages: [
      {
        id: 'ee9fbe0a-b5c2-4180-babd-d21d88e60755',
        names: {
          en: 'Drafting',
        },
        descriptions: {
          en: "# Study Bible projects\n**Time (progress) impacted by:**\n* Content: quantity and type\n* People: number involved and level\n* Time: hours of work per member \n\nBe specific with the publication goals and ensure that the content can be managed. Defining and using categories will help with complex layouts.\n\n**Effort calculated by:**\n\nThe effort settings are put on tasks and calculated by stage. Change the efforts (verse per day) for the tasks to adapt progress. For more information: go to help section on the [Paratext web site](https://paratext.org/). For effort, there is not a different number of verses per day for easier or harder books. All effort settings in this plan are the same.\n\n## Drafting\n*Note to administrator: Please edit this description to define your team's specific process for this stage. You may want to include some or all of the following tasks.*\n\nCreate the first draft of study content\n* study notes\n* introductions\n* sidebars and articles",
        },
        tasks: [
          {
            id: '044b17b7-2ea6-4077-afa7-1b3607863f9f',
            names: {
              en: 'create study notes',
            },
            descriptions: {
              en: '# Create comprehensive study materials\n## Define specific instructions\n- Read and study the entire book\n- Identify the historical context\n- Look at the source texts\n- Read other books (exegesis)\n- Identify keywords, add to glossary\n- Create articles and sidebars\n- Add cross-references\n- Select appropriate illustrations\n\n## Study, draft and polish\n***\n* considerations\n   - When/how do you refer to earlier information?\n   - Are categories for articles and notes defined?\n   - What consistency checks are necessary?',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 25,
              easy: 25,
              moderate: 25,
              difficult: 25,
            },
          },
          {
            id: 'cc102a28-6bef-44a0-973a-382302ded608',
            names: {
              en: 'write introductions',
            },
            descriptions: {
              en: '# Introductions\n## Book introductions\n* standardize titles, content and structure\n* use a marker template for each book\n\n## Section introductions\n- add main section titles\n- write introductions to sections\n\n## Introductions for groups of books\n- Introduction to the Study Bible\n- Bible, OT, NT\n- Pentateuch, Historical books, Poetry, Prophets\n- Gospels and Acts, Letters of Paul\n- The general letters and Revelation',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: '5ee9fcbf-2736-4161-9dcd-a3f418b60297',
            names: {
              en: 'write sidebars and articles',
            },
            descriptions: {
              en: '# Sidebars, articles and tables\n- what kind of materials you want to present in the sidebars and how to consistently phrase them\n- use categories if different content (studying, writing and polishing).',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '704889eb-0578-4a10-8ecc-fc4e7a1ccaf9',
        names: {
          en: 'Initial review',
        },
        descriptions: {
          en: "## Initial review\n\nThis stage ensures that everything is at the right place and not duplicated nor too much repeated, the content is accurate, coherent, and ready for broader review.\n\n*Note to administrator: Please edit this description to define your team's specific process for this stage. You may want to include tasks from the section below the horizontal line.*\n\n1. Task 1 description\n1. Task 2 description\n   - sub task 1\n   - sub task 2\n* Example notes\n\n---\n* Editors read contributors' work\n   - Check and correct the content (source texts, theology, concepts, references...)\n   - Make notes in Paratext\n   - Submit any work that the contributor still needs to do\n* Contributors refine/improve their work\n   - Take the editors' notes (Paratext) and insert them\n   - Return the work to the editor (Paratext)\n* The editors ensure that everything is at the right place\n   - Receive the revision from the contributor\n   - Inserting improvements\n   - Reading (team)",
        },
        tasks: [
          {
            id: '52710316-309d-4a47-9173-4d1153c34a27',
            names: {
              en: 'review first draft',
            },
            descriptions: {
              en: '## Comments by reviewer\n- insert project notes (flags)\n- assign notes to drafter\n- summarize issues for team discussion',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 25,
              easy: 25,
              moderate: 25,
              difficult: 25,
            },
          },
          {
            id: 'f1faa5ae-988f-48f5-b5ce-3931ce96ac29',
            names: {
              en: 'drafter responds',
            },
            descriptions: {
              en: '## Process notes from reviewer\n- the notes created in the previous task are reviewed by the original drafter\n   - adapt content and resolve the notes when suggestions are accepted\n   - otherwise, add your comment to the note and assign it to the team',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: 'fae1bcdb-8ac5-4ce0-a28f-307d3492ee11',
        names: {
          en: 'Team review',
        },
        descriptions: {
          en: "## Team review\n\n*Note to administrator: Please edit this description to define your team's specific process for this stage. You may want to include tasks from the section below the horizontal line.*\n\n1. Task 1 description\n1. Task 2 description\n   - sub task 1\n   - sub task 2\n* Example notes\n--- \n- Read the revised draft\n- The reader makes notes and give advice\n- Linguists improve the language\n- Collect the feedback according to the time agreed\n- Include comments from readers (team)\n- Insert improvements from contributors and linguists\n- Read the book",
        },
        tasks: [
          {
            id: 'ad5d7396-8a04-4406-aa83-422896332506',
            names: {
              en: 'team meeting',
            },
            descriptions: {
              en: '### Discuss unresolved comments from stage #2\n- discuss issues (project notes) that are not resolved\n- prepare for editorial and consultant checking\n---\n### review, work on extra materials\n* thematic index\n* maps, tables',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 40,
              easy: 40,
              moderate: 40,
              difficult: 40,
            },
          },
          {
            id: 'ae0ddffd-ca96-432b-b243-85df29a61c5d',
            names: {
              en: 'editorial checking',
            },
            descriptions: {
              en: '## Guide for work\n- content, language, linguistic',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-task-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
      {
        id: '1a3630e4-be85-4ba7-bbf8-ad5b7b64ca81',
        names: {
          en: 'Final review',
        },
        descriptions: {
          en: "## Final review\n*Note to administrator: Please edit this description to define your team's specific process for this stage. You may want to include tasks from the section below the horizontal line.*\n\n1. Task 1 description\n1. Task 2 description\n   - sub task 1\n   - sub task 2\n* Example notes\n---\n- Check and finalize all the study materials\n- Oral final reading\n- Final verification with a linguist\n- Final verification with the editor and CAP\n* GTA provides approval",
        },
        tasks: [
          {
            id: 'be393981-72a5-4299-8e80-1f6afb1fd898',
            names: {
              en: 'consultant checking',
            },
            descriptions: {
              en: '## Consultant checking\n- Check and finalize all the study materials (with team)\n---\nIn the final stage, the Translation Consultant (TC) and/or Global Translation Advisor (GTA) works closely with the editorial team to check and finalize all the study materials, ensuring that everything meets the highest standards of accuracy, clarity, and cultural relevance. \n\n* Sometimes, during the consultant checking sessions, we realise that some specific articles are still needed. In that case, we assign the task of producing it to the editorial team which has a better understanding of the reason why such extra material are needed.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 150,
              easy: 150,
              moderate: 150,
              difficult: 150,
            },
          },
          {
            id: '831f8e73-9feb-491f-8a49-140f94d5937f',
            names: {
              en: 'advisory committee review',
            },
            descriptions: {
              en: '## Guide for work\n- content, language, linguistic',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
          {
            id: 'cebfb262-ada0-403d-a21c-1a103e22487f',
            names: {
              en: 'final checking',
            },
            descriptions: {
              en: '# Guide for final checking\n\n- CAP checks\n- review category content\n- review extra materials\n---\n* The role of the CAP officer is crucial throughout the entire process, as most contributors have limited experience with using Paratext.',
            },
            markComplete: 'by-chapter',
            taskStart: 'after-previous-stage-on-same-book',
            requiresEditing: 'no',
            effort: {
              easiest: 1000,
              easy: 1000,
              moderate: 1000,
              difficult: 1000,
            },
          },
        ],
      },
    ],
    checks: [
      {
        checkId: 'notes.translator',
        notifyOnlyInStage: null,
        requiredInStage: 'ee9fbe0a-b5c2-4180-babd-d21d88e60755',
      },
      {
        checkId: 'basic.chapter-verse-numbers',
        notifyOnlyInStage: null,
        requiredInStage: 'ee9fbe0a-b5c2-4180-babd-d21d88e60755',
      },
      {
        checkId: 'basic.markers',
        notifyOnlyInStage: null,
        requiredInStage: 'ee9fbe0a-b5c2-4180-babd-d21d88e60755',
      },
      {
        checkId: 'basic.characters',
        notifyOnlyInStage: null,
        requiredInStage: 'ee9fbe0a-b5c2-4180-babd-d21d88e60755',
      },
      {
        checkId: 'basic.punctuation',
        notifyOnlyInStage: null,
        requiredInStage: '704889eb-0578-4a10-8ecc-fc4e7a1ccaf9',
      },
      {
        checkId: 'basic.unmatched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: '704889eb-0578-4a10-8ecc-fc4e7a1ccaf9',
      },
      {
        checkId: 'basic.capitalization',
        notifyOnlyInStage: null,
        requiredInStage: '704889eb-0578-4a10-8ecc-fc4e7a1ccaf9',
      },
      {
        checkId: 'basic.repeated-words',
        notifyOnlyInStage: null,
        requiredInStage: '704889eb-0578-4a10-8ecc-fc4e7a1ccaf9',
      },
      {
        checkId: 'basic.matched-pairs',
        notifyOnlyInStage: null,
        requiredInStage: '704889eb-0578-4a10-8ecc-fc4e7a1ccaf9',
      },
      {
        checkId: 'basic.numbers',
        notifyOnlyInStage: null,
        requiredInStage: '704889eb-0578-4a10-8ecc-fc4e7a1ccaf9',
      },
      {
        checkId: 'basic.references',
        notifyOnlyInStage: null,
        requiredInStage: '1a3630e4-be85-4ba7-bbf8-ad5b7b64ca81',
      },
      {
        checkId: 'basic.quotations',
        notifyOnlyInStage: null,
        requiredInStage: '1a3630e4-be85-4ba7-bbf8-ad5b7b64ca81',
      },
    ],
  },
];
