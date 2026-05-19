// Auto-generated from PT9 _StandardPlans XMLs (see scripts/__tmp-parse-factory-plans.mjs).
// Do not hand-edit. Regenerate by running the parser script.

import type { OrgProvidedPlan } from '@/components/advanced/project-plan-dialog';

export const FACTORY_PLANS: OrgProvidedPlan[] = [
  {
    "id": "f8fba110-381b-4150-a719-8e8da9a124fe",
    "name": "BI Base Plan 1.0",
    "version": "1.0",
    "kind": "factory",
    "stages": [
      {
        "id": "b708cb04-830d-46ba-b465-6567c05b323b",
        "name": "Complete translation brief",
        "description": "The translation brief is a statement of the standards for the project, such as which source texts are used, and the specific audience and intended uses of the translation. Setting these principles out at the beginning will help the translation team work together towards the common goal.",
        "tasks": [
          {
            "id": "ca3ebec0-0178-4bf6-9a3d-b79db3054baa",
            "name": "Complete translation brief",
            "description": "The translation brief is a statement of the standards for the project, such as which source texts are used, and the specific audience and intended uses of the translation. Setting these principles out at the beginning will help the translation team work together towards the common goal.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "f289c2b4-53c2-4bcd-8673-e29fe4192a43",
            "name": "Consultant provides resources",
            "description": "Any resources that BI has for a particular project should be given to the translation team.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "e4de7f20-feda-47d4-8225-b3e2a32b3510",
            "name": "Exegesis and translation of first draft",
            "description": "The first translation task is to study the text carefully, using Bible versions and commentaries. This is called “doing the exegesis”. There should be at least one person on each translation team who is a skilled exegete.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "22b02107-4a35-4da2-892b-f51a6d92bf67",
            "name": "Populate Key terms",
            "description": "As the translation team does their first draft, they should have the Biblical Terms Renderings window open and the BIM_E list selected to keep track of all key terms that BI has identified as important. They should make sure they are consistently rendering the terms and giving explanations when alternative terms must be used.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "eb241857-5dcb-4700-b705-e7b467483793",
            "name": "Draft section headings, and add book major titles and parall",
            "description": "Section headings should draw from the wording used in the texts of their respective sections. \n\nMajor book title(s) should be added at the beginning of the book. \n\nIf there are parallel passage references, they should be added with the correct book abbreviation and punctuation. \n\nPsalms has special headings, so those should be added too. (See \"Headings\" in the \"USFMs for ParaTExt\" PDF.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "02451648-974e-494c-8665-54c1d26792a6",
            "name": "Draft footnotes",
            "description": "Translation team should draft footnotes, both those connected to the language, the translation, as well as the official BI footnotes. These may be drafted after main text has been finalized. After you have drafted the footnotes, it may be helpful to go to Tools-->Checklist-->Footnotes. This checklist will compare the footnotes in your text to other resources that you specify.\n\nMake sure the formatting of the footnotes is correct, using the \"USFMs for ParaTExt\" PDF to guide.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "069f3859-0eb8-4eb1-a082-e692aea777a0",
            "name": "Standardize language settings & spelling rules for language",
            "description": "For all languages, make sure that the \"Language Settings\" (in the Project menu) are correctly set. You cannot \"Run Spell Check\" if the rules aren't standardized yet.\n\nFor languages whose orthography is not standardized, a linguistics consultant will need to help the translation team standardize their spelling rules.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "aba8c8c2-5d1d-41e5-871e-f3a4c3ed948f",
            "name": "Populate proper names",
            "description": "Translation team & the RRC should work out the spelling issues for proper names early in the project, taking into account all the various issues at one time rather than dealing with each one as they come up and then revising previous decisions. \n\nThe Biblical terms tool can help with the verification of names if the list is filtered for the \"Names\" category.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "9b112e23-4a59-404e-860a-466a5e81a43e",
            "name": "Paragraph check",
            "description": "The translation team should check their translation according to the paragraphing of the BIM.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "ce775768-3acc-401f-8ad3-38de5ed34d46",
        "name": "Translators read aloud the translation to each other",
        "description": "The translator, a mother-tongue speaker of the receptor language, reads the draft aloud to the team, and possibly other mother-tongue speakers of the language to check for naturalness and clarity. Then they adjust the text based on feedback.",
        "tasks": [
          {
            "id": "ddbcd260-c8d7-4b8d-80f7-116c369c73ff",
            "name": "Translators read aloud the translation to each other",
            "description": "The translator, a mother-tongue speaker of the receptor language, reads the draft aloud to the team, and possibly other mother-tongue speakers of the language to check for naturalness and clarity. Then they adjust the text based on feedback.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "04d5ad18-9a05-4b12-bb61-c78151f87601",
            "name": "Exegetical check",
            "description": "This check is done by the translation team. Compare the draft with one or two translations in the national language, discuss exegetical choices that have been made in the translation, identify possible exegetical mistakes in the translation; identify any missing verses or sentences.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "cafe3d38-d2b4-46af-a6d9-0a0581cb915c",
            "name": "Naturalness and clarity check",
            "description": "If there is more than one translator, the translators check each other's work for naturalness and clarity.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "d8ede235-b063-44d7-8898-1c5cc3ca36f8",
            "name": "Team Check Key Terms",
            "description": "Discussions about spelling and word choices that should be remembered should be noted in the appropriate place in the Wordlist and the Biblical Terms tool, respectively.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "5a3b7c9e-0dc1-4728-9837-6264a59badf2",
            "name": "Run \"Spell Check Current Book\"",
            "description": "Under the Checking Menu is \"Spell Check Current Book\", click on this and accept or correct the spelling of all of the words present. For those that need more discussion open the Wordlist tool and add a spelling discussion note.\n\nIt's better to spell check as you go. Commonly spelled words should be approved to decrease the amount of words that need attention.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "ff9c2013-83fb-41f4-8bfc-b32265dce07e",
            "name": "Turn on \"Display Spelling\"",
            "description": "Now that the translation team has entered some text into the project and have checked spelling for that text, they can turn on \"display spelling\" to let Paratext identify misspellings.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "0ab1c4e1-f9c4-4f40-b8cf-e24758dc55b6",
            "name": "Section headings and breaks - check",
            "description": "Under Tools>Checklists>Section headings.., translation team should check the section headings with those in the BIM_E. Also, they should make sure section breaks (/b) occur in the right spots.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "ce1781fd-1ff8-4fef-b385-0f268c8cc0b7",
            "name": "Paragraph breaks - format check",
            "description": "The translation team should read the text and verify that the paragraph breaks are in the desired places. Using BIM as a base, this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\p, and \\m.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "d494da4e-dfba-43d6-b0f6-42c10d10f2a5",
            "name": "Special formatting - format check",
            "description": "The translation team should verify that any text that needs special formatting has been done correctly. See the \"USFMs for ParaTExt\" PDF for all formatting issues. Any formatting conventions that the translation committee has agree to do should be checked to make sure they are done.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "263c68ef-98cb-4868-9978-b85d7837e3ee",
        "name": "Share text with RRC",
        "description": "Open the \"Assignments and Progress\" window and correct all errors/issues shown there. Once all errors are corrected and open notes are resolved, print a copy of the books or chapters to be reviewed by community group. The two simplest ways to print text from Paratext are found under the \"File\" menu. They are \"Print Draft\" and \"Save as RTF\". There are other methods available for more advanced formatting, such as \"Export to Pathway\". Use the method specified by your project administrator or translation consultant.",
        "tasks": [
          {
            "id": "202d77b4-e361-4ee3-a996-23a76edcfef9",
            "name": "Share text with RRC",
            "description": "Open the \"Assignments and Progress\" window and correct all errors/issues shown there. Once all errors are corrected and open notes are resolved, print a copy of the books or chapters to be reviewed by community group. The two simplest ways to print text from Paratext are found under the \"File\" menu. They are \"Print Draft\" and \"Save as RTF\". There are other methods available for more advanced formatting, such as \"Export to Pathway\". Use the method specified by your project administrator or translation consultant.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "f6ea6809-3e93-4c2b-9074-8e0ab6449b65",
            "name": "Naturalness check",
            "description": "This check is done by the RRC (Read the draft, check the general flow of the discourse, its logic, chronology, participant reference, sentence length & rhythm, language style and register, etc.). RRC adds notes in text for discussion at RRC meeting.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "e8763fa7-bf8d-4ef7-b3dd-fa318e1d5196",
            "name": "Clarity check",
            "description": "Naturalness and clarity are probably checked at the same time, but the two tasks are separated out to make sure they are both done. RRC checks to make sure the meaning is as clear as the biblical text is. RRC adds notes in text for discussion at RRC meeting.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "30ab4bd1-567a-447c-9638-a63243cc480d",
            "name": "Key terms check",
            "description": "RRC evaluates the key terms chosen by the translation team. Notes are placed in the discussion section of the particular term of the Biblical Terms tool.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "8ae3822f-f523-4d05-ae12-34ea176c4676",
            "name": "Discuss all RRC notes on text and key terms and revise",
            "description": "RRC discusses issues they raised in their individual reading of the text before the meeting with the translation team. Note that the discussion should be limited to the issues they noted during their personal reading; they should not have to discuss every verse of the translation.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "c653985f-414b-4a1a-9708-7147a3d85467",
            "name": "Revise key terms based on RRC comments",
            "description": "If the RRC recommends changes to the text, the translation team will have to check the key terms in those places to adjust accordingly. The translation team may also need to discuss certain key terms with the RRC.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "378ea5cc-ea2e-4e17-9868-aa25d76fcfb3",
        "name": "Draft the back translation",
        "description": "A back-translation is a translation into the major national or trade language of the area. It should be done by a speaker of the language other than the translator. It helps to show whether the translation is communicating effectively and accurately, and it serves as the basis for the consultant check.",
        "tasks": [
          {
            "id": "856e1b6d-01a8-4d71-bca4-7bc3ecb8e7b8",
            "name": "Draft the back translation",
            "description": "A back-translation is a translation into the major national or trade language of the area. It should be done by a speaker of the language other than the translator. It helps to show whether the translation is communicating effectively and accurately, and it serves as the basis for the consultant check.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "92561c3d-8eed-4f94-b9a8-322dce9142fd",
            "name": "Check the back translation",
            "description": "The translation team should verify that back translation is complete, and there are no missing words or phrases, so it is usable by consultant. The purpose of this check is not for the team to change what the back translator thinks the text means.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "95112c7d-92ea-4dbc-ade8-7c0168c2ba48",
        "name": "Evaluation of text",
        "description": "Consultant evaluates the text and places notes with his observations in the text (or back translation). The evaluation should focus on accuracy, clarity, naturalness, and acceptability of the translation including all supplementary materials and illustrations used.",
        "tasks": [
          {
            "id": "c22afa1d-4da0-48f1-9a67-3e72cff70521",
            "name": "Evaluation of text",
            "description": "Consultant evaluates the text and places notes with his observations in the text (or back translation). The evaluation should focus on accuracy, clarity, naturalness, and acceptability of the translation including all supplementary materials and illustrations used.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "6a553f2d-55ee-4efb-9acc-17253038ad95",
            "name": "Consultant visit and revision",
            "description": "Consultant interacts with the translation team concerning his observations about the text and supplementary materials, and gives assistance and advice as requested. The project administrator should give one team member (that could be himself) editing permission in the Assignments and Progress window for the \"Consultant visit\" task.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "5f0384e9-5916-4f20-a5e5-1c21effe7a84",
            "name": "Revise key terms",
            "description": "Consultant works with translation team to revise key terms as needed while checking the translation.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "c7b8f85a-6549-49a9-8d9c-15daa91cd7bd",
            "name": "Read text aloud as team",
            "description": "After each chapter has been consultant-checked, the translation team should read the text aloud to make sure it flows well. They should do this in the evenings so they can bring issues to the consultant the next day. They should not change the text but should insert notes at the spots that they want to change and then change them in the presence of the consultant.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "09247681-d6dc-4ecf-8c6c-a61636cfafe8",
            "name": "Revise text based on read-alouds",
            "description": "With the consultant present, the translation team discusses all issues that were raised during the read-alouds and makes necessary changes.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "e3aa749c-3eaf-434b-b2de-0e8a58b83531",
            "name": "Establish quotation rules",
            "description": "During the first consultant visit, the consultant should work with the team to determine their quotation rules. It is good to establish these rules after some material has been drafted so that you have text to work with.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "6811fb16-cf1e-4339-8c37-a9ee04b02f52",
            "name": "Establish number settings",
            "description": "During the first consultant visit, the consultant should work with the translation team to determine their number settings. It is good to establish these settings after some material has been drafted so that you have text to work with.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "e13e580a-39b0-4dac-816c-afce8f42b414",
            "name": "Establish Scripture reference settings: reference format and",
            "description": "During the first consultant visit, the consultant should work with the translation team to determine their\n reference format and populate book names (short names, long names, and abbreviations).",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "11af360a-2728-42ab-b6c4-ed19738572d8",
            "name": "Verify key terms",
            "description": "After a book has been consultant checked, the translation team should go back and make sure the Renderings match the revised text. Using the Biblical Terms tool in the Tools menu, set the filters for \"current book\" and \"missing renderings.\" Then change the latter filter to \"unresolved rendering discussion notes\" to make sure there are no unresolved discussions.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "2f3faa97-508c-4fea-b552-cbf8799fb751",
            "name": "Consultant report submitted",
            "description": "Consultant submits a report after consultant visit has been completed. Report should include update on team progress. \n\nThis report is submitted regardless of preliminary approval. Such approval does not necessitate submitting another report.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "68475a7c-bbfd-4b6f-8fd8-774349c31a97",
            "name": "Consultant sends lingering questions to RRC",
            "description": "Any unresolvable issues are taken to RRC for testing/discussion. Consultant should work through these issues at next visit\n\nThe consultant should create a special tag for these notes. In the Project Menu, click on \"Project Properties and Settings\" and then the \"Notes\" tab. Create a new tag. In order to be consistent across projects, we recommend to use the up-pointing red triangle.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "2989c77c-cd00-436e-a860-d3b2e22ceafb",
            "name": "Translator prepares answers to lingering questions based on",
            "description": "Any lingering questions that were taken to RRC should now be answered. The translation team should prepare the RRC answers to be reviewed with the consultant at the next workshop. No changes to the text should be made at this time.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "435598b2-d366-4b5b-b018-9b1d4879dff3",
            "name": "Re-run \"Spell Check Current Book\"",
            "description": "Once all unresolved issues from consultant and RRC discussions have been resolved, the translation team should run a spell check to make sure all spellings are correct. \n\nUnder the Checking Menu is \"Spell Check Current Book\", click on this and accept or correct the spelling of all of the words present.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "bec564e4-6c28-426f-9d71-5aa3717e4a9f",
            "name": "Preliminary consultant approval",
            "description": "Once all issues have been resolved, the consultant gives preliminary approval. Final approval will come after all quality checks have been completed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "ec667895-c466-4fd0-a0b0-893ca22f42f2",
        "name": "Testing of translation with community through trial edition",
        "description": "Once proper approvals have been obtained and a system of gaining feedback has been written, the translation team can distribute the trial edition to learn how to improve their translation. \n\nTrial editions should be done every 3 years for the life of a project.",
        "tasks": [
          {
            "id": "a39dffa8-2a28-40f2-8d4d-10c1003724d5",
            "name": "Testing of translation with community through trial edition",
            "description": "Once proper approvals have been obtained and a system of gaining feedback has been written, the translation team can distribute the trial edition to learn how to improve their translation. \n\nTrial editions should be done every 3 years for the life of a project.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "1ab51ebe-ff85-47dd-90c9-a75e598090d1",
            "name": "Testing of translation with community through informal means",
            "description": "Translation team should use informal means to test the translated material with the language group.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "433d177e-7145-4408-b1ec-ecdbae505929",
            "name": "Translator revises text based on community review",
            "description": "With the consultant present, the translation team discusses changes to the text and makes the approved ones.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "52bb0a4e-8cc3-43fc-a054-e944ea8366ac",
        "name": "Draft Book Introductions",
        "description": "Translation team drafts the book introduction. Be careful to use the same key terms in the introduction as in the text.",
        "tasks": [
          {
            "id": "3aeeb53e-0726-48a4-812c-640667fabbdc",
            "name": "Draft Book Introductions",
            "description": "Translation team drafts the book introduction. Be careful to use the same key terms in the introduction as in the text.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "000f2885-0a8f-4930-b54b-f62689e06196",
            "name": "Draft Glossary",
            "description": "Translation team drafts glossary entries. The glossary is one of the books that occur after Revelation, and its short name is GLO. It is recommended to add glossary entries from within the Biblical terms tool. Using the Biblical terms tool will create GLO book for you. Look in Help under \"glossary\" for more information.\n\nAny special formatting of transliterated words should be done at this point.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "bb55c9be-6197-46ed-ae7b-1c3684b046fc",
            "name": "Verify consistency of translation of Glossary wtih texts",
            "description": "After this add-on is translated, it should be compared with the translation of the terms in the texts to make sure the texts and the Glossary correspond with each other.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "dba22f95-acb0-4ce6-9e4a-baae03112528",
            "name": "Translate Charts of Weights & Measures add-on",
            "description": "Translation team drafts charts of weights and measures.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "f4565b42-2814-436c-8e35-d0570075ae17",
            "name": "Verify consistency of translation of weights and measures in",
            "description": "After this add-on is translated, it should be compared with the translation of the terms in the texts to make sure the texts and the charts correspond with each other.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "b2e14799-1d46-40ca-918b-74f432a273bf",
            "name": "Translate Names of God and gods of other nations add-on",
            "description": "Translation team drafts names of God and gods add-on.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "05419506-3296-4e9c-b2dc-b3934dbe4491",
            "name": "Translate Jewish months add-on",
            "description": "Translation team drafts Jewish months add-on.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "f9d123ab-0bd5-43ca-abb7-24a78ec0eb3d",
            "name": "Translate Jewish feasts add-on",
            "description": "Translation team drafts Jewish feasts add-on.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "9d43e0af-5078-4b5a-ba89-2cfa59e8e62c",
            "name": "Choose Concordance or Topical Index",
            "description": "Translation team should work with their committee to determine if they want a traditional concordance or a topical index to go with their translation. Because of space limitations, we allow only one or the other.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "7912af6b-e7d9-41ea-8198-5bbed0f64b2f",
            "name": "Translate Topical Index",
            "description": "If the team chose the Topical Index, they should translate all the terms.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "eabb5d66-983b-421c-b6a2-2588a6cb6cfa",
            "name": "Verify consistency of translation of Topical Index w texts",
            "description": "After this add-on is translated, it should be compared with the translation of the terms in the texts to make sure the texts and the Index correspond with each other, where necessary.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "22275389-f614-4da5-93b5-7063bffb1f61",
            "name": "Label place names for maps",
            "description": "BI has map entry forms that include the various place names and appropriate Scripture references where those names occur. The translation team should make sure that the names on the maps agree with those in the texts.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "63d3d968-03b8-4803-948e-8c2d628ec9e0",
            "name": "Review of add-ons by RRC",
            "description": "Most add-ons need to be reviewed except maps. RRC inserts notes where needed to discuss with translation team.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "4903f6e2-7b95-4947-ac70-f4b23d6bc17e",
            "name": "Discuss all RRC notes and revise add-ons",
            "description": "Translation team meets with RRC to discuss all their notes and revise accordingly.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "667f036b-d90d-4747-a51c-ed96ee531600",
            "name": "Draft back-translation of add-ons",
            "description": "A back translation should be prepared for the consultant to check the translation of add-ons.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "b12421ef-3643-4e7b-8657-9f43ccdce9fd",
            "name": "Consultant check, revisions to text",
            "description": "Consultant checks all add-ons and translators revise where necessary. The translation team may need to discuss certain issues with the RRC before finalizing.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "68743786-bef0-465b-8fd5-3b6e697f320b",
            "name": "Consultant preliminary approval of add-ons",
            "description": "Consultant confirms that no lingering issues remain on the add-ons.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "18598fb7-8ba2-442a-8ee9-dab02e06c152",
        "name": "Proper Names - final check",
        "description": "Verify that all Proper Names are correct and that there are no lingering issues.",
        "tasks": [
          {
            "id": "60d959ba-9eb9-4b11-9d8d-ba957f1517b2",
            "name": "Proper Names - final check",
            "description": "Verify that all Proper Names are correct and that there are no lingering issues.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "93215949-9395-4527-b500-c24dfb1446ef",
            "name": "Group Names check",
            "description": "If a language treats group names differently (e.g., group name based on ancestor is different than group name based on location), every word that refers to a people group needs to be checked using the “People Group Names” (OT) Checklist. (This check is not yet in Paratext.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "83ed5f9c-407a-45bd-ba3e-3ef27c92fa08",
            "name": "Olders & Youngers (Gospels)",
            "description": "Every occurrence of sibling words in the gospels  (“Olders and Youngers” Checklist—in WebCollab check under “Checklist Word Studies”). (This check is not yet in Paratext.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "4031b559-e1db-4b9b-82d1-cf9436b484aa",
            "name": "You singular/plural check",
            "description": "Every occurrence of “you” needs to be checked if the target language has distinct words for the singular and plural forms. Use the check “You singular-plural” (or “French Tu-Vous”) which lists only the occurrences of the second-person pronoun that might cause problems for the translator since the change in form of the pronoun might be unexpected.  (This check is not yet in Paratext.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "799e1cb1-760f-4080-89f7-89b8b291cab3",
            "name": "We exclusive/inclusive (OT) check",
            "description": "Every occurrence of the first-person plural pronoun in the OT needs to be checked if the target language marks exclusive and inclusive these pronouns. Use the “OT Inclusive Exclusive We Spreadsheet” to help you.   (This check is not yet in Paratext.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "828eb989-7b32-4884-991b-3ecde810e450",
            "name": "You masculine/feminine check",
            "description": "Every occurrence of the first-person plural pronoun in the OT needs to be checked if the target language marks exclusive and inclusive these pronouns. Use the “OT Inclusive Exclusive We Spreadsheet” to help you.   (This check is not yet in Paratext.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "d7e69419-a8c5-4056-99bb-123abe755923",
            "name": "Duals check",
            "description": "If the language has a special form for dual person, the translation team should check these using the BIM as a guide. (No specific help has been created in Paratext or otherwise for this check.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "ab4f2ed0-1618-466e-afdc-739d1be19ae9",
            "name": "Run Basic Checks",
            "description": "Note the capitalization conventions in the “BI Style Guide.” Under the Checking menu in Paratext, run checks for Chapter/Verse, Markers, Characters (Combination), Punctuation, References, Quoted Text, Capitalization, Repeated Words, Unmatched Pairs of Punctuation, Quotations, and Numbers.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "6ae4817e-be46-4dc2-ba2b-5ec2adb37173",
            "name": "Uppercase nouns check",
            "description": "There are various checks in this category for words that have a capital letter for the first letter (“Capital Day in the NT”, “Capital Law in the NT”, “Capital\nProphets in NT”, various names of God in the OT checklists; only the Day and Prophets checklists are in French). We actually recommend doing as little capitalization for “prophets,” “law,” and “day” as necessary (see “Style Guide” for further discussion about this issue). The capitalization convention is established on a language-by-language basis.\nSo, these checks are just to make sure you have been consistent with the convention of capitalizing these nouns, if the committee has chosen to do so. See \"Capitalization in Biblical Terms\" in the \"Paratext Tips & Tricks\" spreadsheet for more guidance on how to check rendreings for capitalization.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "3646f60b-1ae1-4220-9b4d-ab189124744b",
            "name": "Numbers check",
            "description": "Select the list \"Numbers\" in the Biblical terms tool to find all the numbers in the translation.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "694d1c34-6ad8-4ede-bafb-e969d79a8bc0",
            "name": "BI Numbers check",
            "description": "BI has numbers checks for the occurrence of every quantity in the Bible that has numbers designating it. Every number, both ordinal and otherwise, needs to be checked using the Numbers Checklists (Cardinal: “Numbers in the NT” &, “Numbers in the OT” in both English and French; Ordinal: “Ordinal Numbers in the NT” in English, no OT ordinal numbers check).",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "c00092ae-9b4f-4ea8-b195-d03b6ce288f3",
            "name": "Spelling - final check",
            "description": "Resolve any lingering spelling issues.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "7fd347e4-8d1b-47fc-9b22-b8acc79f8483",
            "name": "Layout and indents - format check",
            "description": "Verify other layout issues such as poetry. Particular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\q, \\q1 and \\q2.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "b541112c-e326-4241-85f8-64b55153ded8",
            "name": "Punctuation checks",
            "description": "This is in addition to the Basic Check. Note the punctuation conventions in the “BI Style Guide.”  Also check any other punctuation conventions you and the translation team established.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "d2aa59bc-1371-4386-8397-93de649ef519",
            "name": "Quoted speech check",
            "description": "This is in addition to the Basic Check. BI has created a tool for English, French, and Spanish that color-codes the different levels of quoted speech. Using this tool, verify that you have introduced, concluded, and punctuated all direct speech appropriately.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "045691d3-7739-4601-b28e-b3eb89d7c234",
            "name": "Difficult passages check",
            "description": "Depending on the development of the project, translation team with the consultant may want to spot check various difficult passages that were translated earlier in the process to make sure they are of good quality (e.g., Eph. 1:3-14). (We have no standardized list for the whole OT or NT, so you’d just need to check the Book Worksheets for the books that have one.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "16231a0e-5b1d-45ca-94f4-92b84d0d65b6",
            "name": "Customized checks",
            "description": "These would include any checks that the consultant and the translation team noted as language-specific or project-specific, based on what they have observed during the life of the project.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "ec57df48-066a-47fe-b57a-8d585567030b",
            "name": "OT citations check",
            "description": "Every passage where the NT has quoted from the OT needs to be checked. OT references should be included in the footnotes. The “OT Citations” checklist will help you verify the references. [OT quotations also need to be checked for a NT-only project in places where the OT quotation is repeated to make sure all occurrences are the same, where the Greek is the same.]",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "25efa616-efa0-45c4-95fe-bf84fd11082e",
            "name": "Consistency check - parallel passages",
            "description": "Ensure that the translation is identical where the Hebrew or Greek is identical.Open Parallel Passage tool and confirm all parallel passages. (This check is not simply that parallel passages have check marks, it is meant to read the verses and see if the appropriate words are green and yellow in each passage.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "aa8fd646-762a-4318-866f-4b97a4419f3f",
            "name": "Consistency check - Biblical key terms",
            "description": "Open Biblical terms tool, verify that you are using the BIM_E list, and review all renderings for consistency, and make any last changes needed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "83a62c68-6d97-40c6-b79f-95911fee3576",
            "name": "Special formatting - final check",
            "description": "Using the \"USFM's for ParaTExt\" PDF, make sure that any special formatting issues the translation committee has agreed to do, are done in all texts.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "09cf5068-d3eb-4f7b-b230-3a863e28e9ce",
            "name": "Verify that all Paratext checks are complete",
            "description": "Open the Assignments and progress window, and correct all errors and resolve all outstanding issues reported there.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "2c4dd2df-576b-4fa7-aa55-97ab4e0f9a06",
            "name": "Finalize Table of Contents",
            "description": "The translation team and the RRC need to determine what the names of the books should be. They should also translate and give the order of the add-ons that will be listed in the Table: Charts of Weights and Measures, Names of God and gods of other nations, Jewish months, Jewish feasts, Glossary, Concordance (or Topical Index), and Maps. Consultant needs to make sure all issues have been considered and that everything is accounted for.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "5bf44ae5-c2ee-4cd4-bec9-75aba8ca9b44",
            "name": "Draft introduction to Bible/NT, other front & back matter",
            "description": "All planned front and back matter that has not already been done should be drafted by this stage.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "6bced27a-6656-41fc-8650-34972fb7d01f",
            "name": "Check references",
            "description": "Look up and verify that all Scripture references in footnotes, cross references, parallel passage references, book introductions, etc., are referring to verse(s) that talk about the correct topic. (This is not the automated Paratext check to verify that a Scripture reference is in the correct format and exists in the cannon.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "50c83bd1-b7ae-4e6a-b335-578b3c7015c6",
            "name": "Footnotes - final check",
            "description": "Read all footnotes and cross references looking for inconsistencies in how they are formatted. The goal is to have a consistent look and feel across all footnotes, and not merely the absence of marker errors in the footnotes.  It may be helpful to go to Tools-->Checklist-->Footnotes. This checklist will compare the footnotes in your text to other resources that you specify.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "97d2a82d-992f-42b3-8317-2d093456143f",
            "name": "Section breaks and headings - final check",
            "description": "Using the BIM for comparison, this check can be done using Tools > Checklists > Compare Section Headings. Make sure that any wording changes in the sections are reflected in the section headings.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "6f432909-4a33-403e-9be4-df931b61994d",
            "name": "Prepare concordance",
            "description": "If the committee has chosen to include a traditional concordance, BI helps translation team determine which words to include in concordance.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "97699509-9b5b-420a-a4cb-6e9f408d5745",
            "name": "Choose cross-references set",
            "description": "For NT, there is a NT-only set, a NT with Psa/Prov, a NT with Psa, and a whole Bible set. There is also a NT-only set with or without the OT citation references.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "11459095-5178-4466-ade3-214f66deb77f",
            "name": "Consultant check - final check",
            "description": "Consultant will check any new supplementary materials such as maps, illustrations, front matter, and back matter.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "c0bc1039-fadc-4126-8e54-cb7d0dbaf6ca",
        "name": "Final read-through by translation team and RRC",
        "description": "This should use a draft produced by Publishing Assitant/InDesign so that the text is in close to final format.",
        "tasks": [
          {
            "id": "c2d742fc-33ee-4751-bdf7-77d845a0d81e",
            "name": "Final read-through by translation team and RRC",
            "description": "This should use a draft produced by Publishing Assitant/InDesign so that the text is in close to final format.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "73c1ac89-f57d-4eb1-9805-6dc15979fc83",
            "name": "Revise text based on final read through",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "e1de7ab5-b579-4da3-92cb-336c0c3b144d",
            "name": "Translate and submit survey form",
            "description": "BI supplies post-translations survey form for the translation team to translate and submit to be included (as a separate paper) with published translation distribution.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "3f08517d-4f8d-4b4f-be6d-06f833468228",
            "name": "Final approval from consultant",
            "description": "After the primary consultant for the project receives approvals from the committee, he submits his approval to the Text Production Dept Manager.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "07bb558b-8f4b-4085-ae6d-5230ca06c46c",
            "name": "Final approval by Text Production Dept Manager",
            "description": "",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "a523dfb8-d86a-4ea3-a55e-8f3421a13479",
            "name": "Submit to Publishing",
            "description": "The TPD manager notifies the Projects Management Dept that the text is ready for formatting.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "ccc33f28-27b5-4d7a-903f-c1dc9c8262ed",
            "name": "Revise text during formatting process",
            "description": "The BI formatting team works on the text with the translation team. Any minor changes can be made directly in the text by the translation team. Major (content) changes need to be passed by the primary consultant before making the changes.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "c366a1d2-a26f-461e-b3c4-36d5d42d333c",
            "name": "Archive text",
            "description": "No more changes should be made in the text.  A revision project would require the creation of a new Paratext project.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "33f3b200-35be-45c4-bb24-a6eb241ab9d6",
            "name": "Do audio recording",
            "description": "PMD works with another agency to produce an audio recording of the text.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      }
    ],
    "checks": []
  },
  {
    "id": "81c0ccbe-e874-4751-b97a-fb4f8d3eabcd",
    "name": "Biblica Base Plan 1.03",
    "version": "1.03",
    "kind": "factory",
    "stages": [
      {
        "id": "1703c346-ce9e-427e-9476-9f3a8af26c67",
        "name": "1.1 Initiate Project Increment",
        "description": "Global Project Manager with the Project Manager \n - Agree on overall target completion dates for the Increment and the intermediate Stages\nGlobal Project Manager\n - Sets the Working Project progress parameters for the Increment in the Paratext Registry:\n - Scope: (Current Increment)\n - Status: Active\n - Expected Completion Date: (Current Increment)\nProject Manager\n - Sets scope of the Current Increment in Project Properties\n - Sets Stage target completion dates in Assignments and Progress\n - Assigns tasks to team members in Assignments and Progress\n - Unchecks Task 1.4 Edit Peripheral Books and 4.1 Complete Peripheral Books, if necessary \nGlobal Project Manager \n - Verifies all project increment parameters are set",
        "tasks": [
          {
            "id": "ba420c79-b942-4ffc-95dd-178b8e755fe5",
            "name": "1.1 Initiate Project Increment",
            "description": "Global Project Manager with the Project Manager \n - Agree on overall target completion dates for the Increment and the intermediate Stages\nGlobal Project Manager\n - Sets the Working Project progress parameters for the Increment in the Paratext Registry:\n - Scope: (Current Increment)\n - Status: Active\n - Expected Completion Date: (Current Increment)\nProject Manager\n - Sets scope of the Current Increment in Project Properties\n - Sets Stage target completion dates in Assignments and Progress\n - Assigns tasks to team members in Assignments and Progress\n - Unchecks Task 1.4 Edit Peripheral Books and 4.1 Complete Peripheral Books, if necessary \nGlobal Project Manager \n - Verifies all project increment parameters are set",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "3c877baf-f9b9-41f5-980a-e13c286c8a16",
            "name": "1.2 First Draft Editing",
            "description": "After thorough exegesis, Translators: \n - draft/revise book introductions (Book Intro. Template)\n - draft/revise chapters assigned to them\n - resolve issues found by basic checks\n - use the Wordlist tool to check spelling\n - approve BiblicaBiblicalTerms using the Biblical Terms tool\n - use Parallel Passage tool\nLinguist(s) (one or two)\n - Approve spelling, hyphenation and word breaks using Wordlist tool. \n - Makes notes to translators on grammatical and stylistic issues",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "d693064e-9811-40af-ae27-8f7e10245fc4",
            "name": "1.3 Technical Check",
            "description": "Technical Manager\n - Verifies checks are correctly done\n - Verifies markup is correctly applied\n - Cleans up any errors or inconsistencies",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "b2a26fd8-9cbb-4ae9-bbd5-ab9b933c844a",
            "name": "1.4 Edit Peripheral Books",
            "description": "Translation Team:\n- Translates/revises metatext in FRT and BAK books",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "3afcc381-cf1a-4677-8bd5-2ed6a25d56a2",
        "name": "2.1 Grammar and Spelling Review",
        "description": "Linguist\n - Reads through text\n - Flags grammatical, punctuation, capitalization, clarity, and naturalness errors with “To Do” notes\nUsing Wordlist tool:\n - runs advanced spelling checks: \n   (Tools>Spell Check and Tools> Incorrectly Joined and Split Words)\n - marks misspelled words as incorrect\n - resolves spelling notes in the Wordlist tool",
        "tasks": [
          {
            "id": "ab82beac-f8e8-4657-b5a1-e0ea88020c09",
            "name": "2.1 Grammar and Spelling Review",
            "description": "Linguist\n - Reads through text\n - Flags grammatical, punctuation, capitalization, clarity, and naturalness errors with “To Do” notes\nUsing Wordlist tool:\n - runs advanced spelling checks: \n   (Tools>Spell Check and Tools> Incorrectly Joined and Split Words)\n - marks misspelled words as incorrect\n - resolves spelling notes in the Wordlist tool",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 800,
              "easy": 700,
              "moderate": 600,
              "difficult": 500
            }
          },
          {
            "id": "79e42a6d-48f6-4205-8edb-213b42912e7c",
            "name": "2.2 Co-Translator Review",
            "description": "Co-translator\n - Makes suggestions using “To Do” Notes\n - Creates or comments on rendering discussion notes (Biblical Terms tool)\nSuggested activities:\n - respond to translator notes \n - check against a model text for accuracy",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "7ecbcb7e-99e7-4dff-a9e7-3da95acafe84",
            "name": "2.3 Oral Testing",
            "description": "Translation Coordinator (Lead Translator)\n - Organizes oral reading of the entire text increment\n - Solicits comments from members of the translation team and possibly select members of the language community. See “Guidelines for Oral Testing” document.\n - Adds recommendations to the project as “To Do” notes",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 500,
              "easy": 500,
              "moderate": 500,
              "difficult": 500
            }
          },
          {
            "id": "7f6d0724-a085-402d-8a1d-952a07bbeec0",
            "name": "2.4 Second Draft Editing",
            "description": "Translator\n - Reviews Co-translator, Linguist, and Oral Testing suggestions\n - Resolves as many “To Do” notes as possible\n - Changes unresolved notes to “Consultant Check” notes\n - Edits text as necessary",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 80,
              "easy": 70,
              "moderate": 60,
              "difficult": 50
            }
          }
        ]
      },
      {
        "id": "119d5d2b-4f84-420d-8acd-4738afdb546c",
        "name": "3.1 Consultant Review",
        "description": "Consultant\n - Checks text using Interlinearizer tool, Parallel Passage tool, and back translation, if available\nCreates or responds to:\n - “To Do” and “Consultant Check” notes \n - Rendering Notes in the Biblical Terms tool",
        "tasks": [
          {
            "id": "a7e0f9f9-d26f-40d6-8bc3-199562f99921",
            "name": "3.1 Consultant Review",
            "description": "Consultant\n - Checks text using Interlinearizer tool, Parallel Passage tool, and back translation, if available\nCreates or responds to:\n - “To Do” and “Consultant Check” notes \n - Rendering Notes in the Biblical Terms tool",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "ec3d0845-a919-4eef-bd61-2d16db4cfe12",
            "name": "3.2 Community Check",
            "description": "Community members \n - Review a draft typeset of the increment using “Community Check guidelines” document. Include Transcelerator Comprehension questions for group testing.\n - Comment on a Print Draft printout or PDF of the text or by email",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 500,
              "easy": 500,
              "moderate": 500,
              "difficult": 500
            }
          },
          {
            "id": "366cd1fa-7494-4d7d-b4f8-4cd3edad23c6",
            "name": "3.3 Third Draft Editing",
            "description": "Translator\n - Does the Parallel Passage check with consultant guidance\n - Resolves “To Do” and “Consultant Check” notes\n - Resolves spelling discussion notes (Wordlist tool)\n - Resolves rendering discussion notes (Biblical Terms tool)\n - Makes changes to text as necessary based on Notes and Parallel Passage check",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 80,
              "easy": 70,
              "moderate": 60,
              "difficult": 50
            }
          }
        ]
      },
      {
        "id": "bc28f9f8-0367-4df7-b541-c113abfd1eb4",
        "name": "4.1 Complete Peripheral Books",
        "description": "Translation team \n - Completes/updates translation of metatext in FRT and BAK books\n - Writes/updates preface",
        "tasks": [
          {
            "id": "b4e60deb-7230-4549-896b-09f008f9f03a",
            "name": "4.1 Complete Peripheral Books",
            "description": "Translation team \n - Completes/updates translation of metatext in FRT and BAK books\n - Writes/updates preface",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "6527974c-2772-491e-b3d4-6c452f2f5b65",
            "name": "4.2 Final Draft Editing",
            "description": "Translation team\n - Resolve any issues found by the Project Coordinator, Technical Manager, and Technical Director\n - Make changes to text as necessary",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "a6421e67-0cda-40e1-8290-e1d648937f5c",
            "name": "4.3 Project Coordinator Signoff",
            "description": "Project Coordinator or Translation Consultant\n - Verifies all tasks and checks have been done and all Notes resolved\n - If necessary, sends project back to the translation team to resolve outstanding issues",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "e5b23a90-38e8-4c11-9120-09699dac7493",
            "name": "4.4 Technical Manager Signoff",
            "description": "Technical Manager or Project Manager \n - Verifies that errors have been denied appropriately\n - Verifies that checking inventories have been marked correctly\n - Looks for additional issues that might need to be addressed using advanced checks and tools\n - Resolves as many checking issues as possible\n - If necessary, sends project back to the translation team to resolve outstanding issues",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "c779b0f5-c2c7-4b9e-9842-12bddb571385",
            "name": "4.5 Technical Director Signoff",
            "description": "Translation Technology Director\n - Approves the quality of all Paratext checks\n - If necessary, sends project back to Technical Manager to resolve outstanding issues\n - Creates/updates Publishing Project (PP)\n - Sets Paratext Registry Status to Typesetting (WP&PP)\n- With Global Project Manager input, unchecks Task 1.1 Initiate Project Increment",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "9cbd63b4-81a7-4111-912a-6ffc71906a0a",
        "name": "5.1 Preliminary Typeset Review",
        "description": "Community members review the Preliminary Typeset using “Guidelines for Preliminary Typeset Review” document",
        "tasks": [
          {
            "id": "4a5c6f55-3d13-4a04-b171-ffb4a1d28f74",
            "name": "5.1 Preliminary Typeset Review",
            "description": "Community members review the Preliminary Typeset using “Guidelines for Preliminary Typeset Review” document",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 800,
              "easy": 700,
              "moderate": 600,
              "difficult": 500
            }
          },
          {
            "id": "b194855b-2634-458a-a07f-2d7579fbb296",
            "name": "5.2 Preliminary Typeset Editing",
            "description": "Translation Technology Staff, in consultation with the translation team:\n - Resolves issues discovered by the Preliminary Typeset Review \n - Corrects the Publishing Project\n - Updates the books being published in the Working Project",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "6bf4226e-0a42-4c80-a3c4-6d833e06d7ff",
            "name": "5.3 Final Typeset Proofread",
            "description": "Translation team proofreads the Final Typeset to correct inadvertent typesetting errors using “Guidelines for Final Typeset Proofread” document",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "3cc912c6-c6aa-4505-9a16-c0875b5a4ea3",
            "name": "5.4 Final Editing",
            "description": "Translation Technology Staff, in consultation with the translation team:\n - Resolves any errors in the Publishing Project found by the Final Typeset Proofread\n - Verifies corrections\n - Updates the books being published in the Working Project",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "165984bc-e986-4b85-b0d8-b0f95812657b",
            "name": "5.5 Final Signoff",
            "description": "Area Translation Director\n - Submits report to Senior Director, Global Translation detailing the quality of the work, with recommendations for future work.\nSenior Director, Global Translation\n - Based on ATD report, signs off on the translation project\n - Indicates completed status on the translation dashboard",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "c19ef1f2-ffa9-46ab-9d4d-5b19c9d73685",
            "name": "5.6 Initial Publication",
            "description": "Translation Technology Director \n - Submits completed books to the Digital Bible Library (DBL)\n - Sets Paratext Registry Status to Published (PP)\n - Authorizes the Global Project Manager to set the progress parameters for the next project Increment in the Paratext Registry (WP) (Task 1.1)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      }
    ],
    "checks": []
  },
  {
    "id": "da3ed33a-1f62-453c-9a16-af0ab1dec374",
    "name": "GILLBT Plan",
    "version": "2.0",
    "kind": "factory",
    "stages": [
      {
        "id": "1fee04f4-ddb8-4cfb-8a32-762328d6ba6c",
        "name": "Exegesis",
        "description": "Use the Source Language Tools, UBS Handbooks, and other available commentaries to get a good understanding of the background to the text.",
        "tasks": [
          {
            "id": "cd202fa7-80f2-4925-8f9b-57a2f985c383",
            "name": "Exegesis",
            "description": "Use the Source Language Tools, UBS Handbooks, and other available commentaries to get a good understanding of the background to the text.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "c14c2cd6-eed0-462d-99f5-c61585993516",
            "name": "Draft / Keyboard",
            "description": "Draft/keyboard text into Paratext, being mindful of using the correct spelling, format markers, and punctuation.\n\t\n\nUse the Key Terms tool to have a consistent translation.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "c7e15989-2dbd-482d-b584-b9911c4c05a9",
            "name": "Draft Supplementary Helps",
            "description": "Draft Section Headings, Footnotes, Glossary Entries, Book Introductions, Illustrations.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "7d2a59e8-67e5-4a73-9080-27e3da4c1029",
        "name": "Team Check",
        "description": "",
        "tasks": [
          {
            "id": "f3a66e3a-7bdb-4aed-acee-c0bcca67c222",
            "name": "Team Check",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          }
        ]
      },
      {
        "id": "fe0f2c67-06b7-42d6-91f7-2ed52c690940",
        "name": "Reviewers Feedback",
        "description": "",
        "tasks": [
          {
            "id": "c480c038-cdf0-4948-b98f-07e7526644ea",
            "name": "Reviewers Feedback",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          }
        ]
      },
      {
        "id": "c2523b4a-8267-495d-b903-f45d98ebe0f0",
        "name": "Consultant Check",
        "description": "",
        "tasks": [
          {
            "id": "2ef0350c-1efd-46ff-9cd5-711b8fa81e1c",
            "name": "Consultant Check",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 200,
              "easy": 200,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "6dd794aa-bef3-44f7-a4c0-873fc2dc0708",
            "name": "Translators make corrections",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "3e4ce946-cfc3-4fe9-a32e-81c1606a918c",
        "name": "Community Testing",
        "description": "",
        "tasks": [
          {
            "id": "1f87c9fa-f873-40a1-af1b-27d2989f6a6a",
            "name": "Community Testing",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "69893191-cff6-431a-81f5-24d0faf11426",
            "name": "Confirm Key Terms",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "86ac513a-15c2-45c4-9603-9cde6008b6b5",
        "name": "Finalize Illustrations, Captions and Maps",
        "description": "",
        "tasks": [
          {
            "id": "d5930bdc-a280-42ad-a5c5-709cf8b8813a",
            "name": "Finalize Illustrations, Captions and Maps",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "802276a9-194c-4fb6-938e-786d6de3a911",
            "name": "Finalize Checks: Consistency and Formatting",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "7aaa1652-ded5-4617-931f-0bd3203627d8",
            "name": "Final Approval from Consultant",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "57831416-4ffc-48ab-8b94-d21ce1f3cafd",
            "name": "Typesetting",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "6b140055-fcd8-4064-8c81-18235e5b46d4",
            "name": "Final Read-Through & Approval",
            "description": "Final Read-Through & Approval with church & community representatives.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "e35a9869-aabe-43ad-8f8b-85cf2d27a6bb",
            "name": "Finalize Typesetting",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      }
    ],
    "checks": []
  },
  {
    "id": "c24b3d94-892e-4643-b9a8-0c9db40c9c05",
    "name": "PBT Base Plan",
    "version": "2.28",
    "kind": "factory",
    "stages": [
      {
        "id": "b6cd2718-36c9-472c-84d6-753fca853c02",
        "name": "Study the passage (exegesis)",
        "description": "The first translation task is to study the text carefully, using Bible versions and commentaries. This is called “doing the exegesis”. There should be at least one person on each translation team who is a skilled exegete.",
        "tasks": [
          {
            "id": "9f99673c-cb6a-4c05-a9cd-4629eb7f6b20",
            "name": "Study the passage (exegesis)",
            "description": "The first translation task is to study the text carefully, using Bible versions and commentaries. This is called “doing the exegesis”. There should be at least one person on each translation team who is a skilled exegete.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "4bce47e9-37c3-42ae-a8ec-5a5006c0e21e",
            "name": "Draft text",
            "description": "The first draft of the text, whether written out by hand or directly typed into the computer, is entered into Paratext.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "40b6dcd4-3b9d-4790-819d-28f0fc02bc53",
            "name": "Draft section headings",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "b1ee4198-d3fe-4a2f-9cd7-4e0fa1ec8bd3",
            "name": "Draft footnotes",
            "description": "It is best to draft these when you decide that a footnote is needed. You can add another footnote anytime you feel it needs to be added.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "58089389-d741-4c35-848b-64a65229ffb1",
            "name": "Read the draft aloud",
            "description": "A mother-tongue speaker of the receptor language reads the draft aloud to the team, and possibly other mother tongue speakers of the language to check for naturalness and clarity. Then adjust the text based on comments from the group.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "52d1137c-4259-4e66-b675-f8231709d418",
            "name": "Enter revisions from the readthrough",
            "description": "Revisions to the text based off of reading the text out loud should be entered into Paratext during the reading or as soon as possible after the readthrough is completed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "0b6970df-00ce-4da4-a46a-28be4c7f2e6a",
            "name": "Do back translation or interlinear",
            "description": "A back-translation is a translation into the major national or trade language of the area. It should be done by a speaker of the language other than the translator. It helps to show whether the translation is communicating effectively and accurately. Consultants usually require a back translation or an interlinear. If an interlinear is required instead of a back translation, complete the glossing of the interlinearization of the text to help guide the consultant on a word-by-word basis of looking at the text.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "1ce56f6c-82fc-41b6-9876-7a25572b4951",
            "name": "Draft book introductions",
            "description": "Be careful to use the same key terms in the introduction as in the text.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "c5b30b84-03c8-4bbc-b49a-07b1184550e0",
            "name": "Run basic checks",
            "description": "After drafting a book of the Bible, run basic checks and resolve any issues found with chapter and verse numbers, markers, etc.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          }
        ]
      },
      {
        "id": "75704aa3-5afe-4d6e-be69-92aae825799c",
        "name": "Exegetical check: text",
        "description": "This check is done by the translation advisor/exegetical specialist with the rest of the translation team.",
        "tasks": [
          {
            "id": "e51e5efb-465b-4e47-9146-4c122966a545",
            "name": "Exegetical check: text",
            "description": "This check is done by the translation advisor/exegetical specialist with the rest of the translation team.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "345fa1df-93d1-45f5-9582-29b9e1dfab11",
            "name": "Exegetical check: parallel passages",
            "description": "Open Parallel Passage tool and confirm all parallel passages. Review the wording of the text in these parallel passages and decide if wording in one text would be better if harmonized with the wording in another text. (This check is not simply that parallel passages have check marks, it is meant to read the verses and see if the appropriate words are green or yellow in each passage.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "f930ee8b-ea02-4443-ba40-b59e240c1dca",
            "name": "Exegetical check: introduction, section headings, footnotes",
            "description": "This check is done by the translation team with the translation advisor/exegetical specialist.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "386e0970-f1fc-4ce9-bffa-c2d92a772fc1",
            "name": "Check spelling",
            "description": "You can do a spell check in a variety of ways. If you want to use the Paratext tool, under the Checking Menu is \"Spell Check Current Book\", Click on this and accept or correct the spelling of all of the words present. For those that need more discussion open the wordlist tool and add a spelling discussion note.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "8ca385ae-24ad-41ab-8a63-707505e039a1",
            "name": "Check proper nouns & names",
            "description": "Verify that proper nouns and names have been transliterated according to agreed upon rules, and are consistent. Verify that capitalization has been done correctly and consistently. For languages with word level and grammatical honorifics, verify that they are used correctly. Note: The Biblical terms tool can help with the verification of names if the list is filtered for the \"Names\" category. The Biblical terms tool will not find instances of a name in book introductions, section headings, footnotes, illustration captions and glossary entries. You will have to find the proper names in these locations manually.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "2ab560e9-de94-4121-b26a-153b83b8ded4",
            "name": "Enter Biblical terms renderings",
            "description": "Identify the Biblical key terms in the passage. (Not every term in the \"All Biblical terms list\" but the terms deemed significant for consistency sake.) Keyboard the renderings into the Biblical terms Tool. Check the consistency of the Biblical key terms used in the passage with the terms documented in the Biblical terms tool.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "f3da5856-8678-43d8-bbdf-8e95a38a9221",
            "name": "Exegetical checking: run basic checks",
            "description": "After making changes to the text during exegetical checking, run basic checks and resolve any issues found with chapter and verse numbers, markers, etc.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          }
        ]
      },
      {
        "id": "7580b0c4-40f7-4f03-80b6-d33b749370a7",
        "name": "Prepare text for group checking",
        "description": "Open the \"Assignments and Progress\" window and correct all errors/issues shown there. Once all errors are corrected and open notes are resolved, you can print a copy of the books or chapters to be reviewed by community group. The two simplest ways to print text from Paratext are found under the \"File\" menu. They are \"Print Draft\" and \"Save as RTF\". There are other methods available for more advanced formatting, such as \"Export to Pathway\". Use the method specified by your project administrator or translation consultant.",
        "tasks": [
          {
            "id": "0b6cbd07-9f68-4ec9-9eb6-684ce68f7dac",
            "name": "Prepare text for group checking",
            "description": "Open the \"Assignments and Progress\" window and correct all errors/issues shown there. Once all errors are corrected and open notes are resolved, you can print a copy of the books or chapters to be reviewed by community group. The two simplest ways to print text from Paratext are found under the \"File\" menu. They are \"Print Draft\" and \"Save as RTF\". There are other methods available for more advanced formatting, such as \"Export to Pathway\". Use the method specified by your project administrator or translation consultant.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "a2d91ced-2fbd-4501-a174-e88cd4ca7be9",
            "name": "Comprehension check with a group",
            "description": "Translators read aloud to a group of people who are fresh to the text, Ask comprehension questions. Check for clarity and naturalness.  Make note of any places where revisions need to be made which will later be entered into Paratext.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "7f10b45c-974b-4e3a-9171-1eba8f70383e",
            "name": "Enter revisions from comprehension checks",
            "description": "Type revisions.\n\nWhile supplementary helps are specifically mentioned in the drafting section, it is assumed that all other checks will also be completed on supplementary materials and that these are a part of the final text.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "6603db53-62b5-4df5-aaf5-8d71661d9cc0",
            "name": "Update back translation or interlinear",
            "description": "After making changes to the text during exegetical checking and comprehension checking, update the back translation or interlinear to reflect those changes. This is a critical step to complete before making the text available to the consultant.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "f8afb80c-dab6-470b-a564-89b3d44dbaad",
            "name": "Update Biblical terms",
            "description": "Open Biblical terms tool and filter for chapter(s) being prepared for consultant check. Verify that your list of Biblical terms have approved renderings. Update any that are missing, or need to be changed because of a better understanding of what the Greek or Hebrew means. It is likely some are out-of-date, because of the revisions made after comprehension testing.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "a9af55f4-6e76-468b-95c7-fa942d430432",
            "name": "Comprehension checking: run basic checks",
            "description": "After making changes to the text during comprehension checking, run basic checks and resolve any issues found with chapter and verse numbers, markers, etc.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          }
        ]
      },
      {
        "id": "aa953eb8-215c-4e1e-bfbe-ab16866a3a3a",
        "name": "Make text available to consultant",
        "description": "The team needs to make the translated text available to the consultant who will  evaluate the text for accuracy, clarity, naturalness, and acceptability of the translation including all supplementary materials and illustrations used. This can be done by adding the consultant as a user to the project if they are not already listed as a user. Be sure to let the consultant know that the text (and interlinear or back translation)  is ready for checking.",
        "tasks": [
          {
            "id": "fd6c2f9b-c34f-4762-bcd0-845ff03c1785",
            "name": "Make text available to consultant",
            "description": "The team needs to make the translated text available to the consultant who will  evaluate the text for accuracy, clarity, naturalness, and acceptability of the translation including all supplementary materials and illustrations used. This can be done by adding the consultant as a user to the project if they are not already listed as a user. Be sure to let the consultant know that the text (and interlinear or back translation)  is ready for checking.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "3fa56ed4-eb36-4b5f-bef6-3b193f4e5fdf",
            "name": "Review/respond to Consultant Notes",
            "description": "Once the consultant has evaluated the text and placed notes with observations in the text (or back translation) the translation team may use these notes to review the text themselves and respond to the notes. Translation teams should not resolve the notes of a consultant. The consultant should resolve the notes once the consultant is satisfied that the team has answered whatever question was raised. If there is not time to review and respond to the Consultant Notes before the consultant checking session begins, then these notes should be dealt with in the checking session.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "688c3484-9a22-4674-9e7b-6ab818523a72",
            "name": "Checking session: text",
            "description": "Consultant interacts with the translation team concerning his observations about the text and supplementary materials, and gives assistance and advice as requested. The project administrator should give one team member (that could be himself) editing permission in the Assignments and Progress window for the \"Consultant Checking session\" task. It is best to enter revisions to the text into Paratext during the checking session. If the translation team needs to hold more discussion about a possible revision to the text after the checking session is completed, the consultant should put a Note at that verse. The team will respond to that Note later and if the consultant is satisfied with the answer he will resolve the Note.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "ea0c127b-b1f9-4e6c-867c-1be54ea83f94",
            "name": "Checking session: section headings, footnotes",
            "description": "Consultant interacts with the translation team concerning his observations about the text and supplementary materials, and gives assistance and advice as requested. The project administrator should give one team member (that could be himself) editing permission in the Assignments and Progress window for the \"Consultant Checking session\" task. It is best to enter revisions to the text into Paratext during the checking session. If the translation team needs to hold more discussion about a possible revision to the text after the checking session is completed, the consultant should put a Note at that verse. The team will respond to that Note later and if the consultant is satisfied with the answer he will resolve the Note.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "a62d8948-c0bd-40cc-9a51-aab81cd0beaa",
            "name": "Checking session: introduction",
            "description": "Consultant interacts with the translation team concerning his observations about the text and supplementary materials, and gives assistance and advice as requested. The project administrator should give one team member (that could be himself) editing permission in the Assignments and Progress window for the \"Consultant Checking session\" task. It is best to enter revisions to the text into Paratext during the checking session. If the translation team needs to hold more discussion about a possible revision to the text after the checking session is completed, the consultant should put a Note at that verse. The team will respond to that Note later and if the consultant is satisfied with the answer he will resolve the Note.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "9f1ca7b0-d40e-408a-b40b-c5758f6312b3",
            "name": "Respond to consultant's input",
            "description": "The translation team will respond to all Consultant Notes that remain in the text after the Consultant Checking session has been completed or any other input provided by the Consultant. If the consultant is satisfied with the answer he will resolve the Notes in Paratext.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "6bf78365-758c-4cd9-960f-82f57e68fe4e",
            "name": "Final consultant approval",
            "description": "Consultant gives approval of the text at the end of checking session if all questions are answered to his satisfaction, or once any follow-up tasks which the consultant has clearly defined have been taken care of.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "97931ae7-27a7-43e4-8baf-75f7f3790234",
            "name": "Consultant report distributed",
            "description": "Consultant report shared with the translation team and the team's leadership (e.g. DLA or programs director).",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "61a914d3-fe5d-4386-a4cf-6c20f949d8f7",
            "name": "Review significant changes with community",
            "description": "Community reviews, to make sure that all significant changes done in consultant check are natural and clear.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "71c310fb-78d5-44c9-b334-c586a410a028",
            "name": "Consultant checking: run basic checks",
            "description": "After making changes to the text during consultant checking, run basic checks and resolve any issues found with chapter and verse numbers, markers, etc.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          }
        ]
      },
      {
        "id": "67ebcabd-8d8f-4132-8991-58515e2fdf7d",
        "name": "Draft the Title Page and Verso Page",
        "description": "These pages are mandatory and need to be approved by Branch or Field Directors as they contain copyright statements.",
        "tasks": [
          {
            "id": "819e4803-d2fb-465e-8242-3ce0d58edde2",
            "name": "Draft the Title Page and Verso Page",
            "description": "These pages are mandatory and need to be approved by Branch or Field Directors as they contain copyright statements.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "2ebab8c7-abb5-456f-9498-fcb98f60f17c",
            "name": "Draft other front & back matter",
            "description": "This can include the preface, the glossary, an introduction to the Bible/NT, and spine text.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "9bd5b294-ef93-4e48-a622-8e6907aab38c",
            "name": "Consistency check: Biblical terms",
            "description": "Open Biblical terms tool and review all renderings for consistency, and make any last changes needed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "0779f335-1113-4370-ac07-7cfc0676593b",
            "name": "Consistency check: wordlist",
            "description": "The team goes through the entire wordlist together, to make sure there are no words spelled multiple ways, and to make sure they are all in final agreement on all spelling decisions. Make sure to look at \"Find Similar Words\" and \"Find Incorrectly Joined or Split Words\" under the \"Checking\" tab.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "ea8585f9-a9fa-4778-863f-61ce41542068",
            "name": "Final check: proper names",
            "description": "In the Biblical terms tool, create a new filter for the \"Names\" category. Check for proper capitalization, and confirm that any transliteration of a name conforms to the natural rules and conventions of the vernacular language.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "ba93cc52-db81-4b97-9fa4-7acd521c1601",
            "name": "Final check: numbers & money",
            "description": "Select the list \"Numbers\" as the Biblical terms list in the Biblical terms tool to find all the numbers. Make sure there is consistency in the formatting of all the numbers. \n\nVerify that words such as money, coin, silver, gold, denarii, and shekel are adequately differentiated and rendered consistently.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "1ac01594-c549-410f-bd50-2c248f767c6f",
            "name": "Final check: weights & measures",
            "description": "Verify that words such as talent, mina, shekel, pim, beka, gerah etc., are adequately differentiated and rendered consistently. \n\nVerify that words such as cubit, span, handbreadth, orgyia, stadion, milion, cor, lethech, ephah, seah, omer, cab, bath, hin, log, etc., are adequately differentiated and rendered consistently.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "60fc3151-1b71-4910-b9f4-96dbaf84c225",
            "name": "Format check: section breaks and section headings",
            "description": "If another translation is used as a base then this check can be done using Tools > Checklists > Compare Section Headings",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "a5b28c00-1dce-405f-8cb2-fb9fb0fd346e",
            "name": "Format check: paragraph breaks",
            "description": "If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\p, and \\m.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "e66023ab-dc4d-4f5c-94a5-93fded851e7a",
            "name": "Format check: special formatting",
            "description": "See list of special formatting issues such as genealogies, words on the cross, letters, etc. Verify that text is marked using the correct standard format markers (USFM). See http://paratext.org/about/usfm for latest guide to using USFMs.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "ce33f6a6-b46c-4abe-a234-5fa6bbe06ea5",
            "name": "Format check: layout and indents",
            "description": "Verify other layout issues such as poetry. Particular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\q, \\q1 and \\q2.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "4363aa1f-aeca-4831-8562-085b9381bad6",
            "name": "Finalize illustrations; write captions",
            "description": "Make final decisions on illustrations.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "9fca00d9-bb43-4718-aa64-8d4e07f9ab43",
            "name": "Choose maps; label place names",
            "description": "Make final decisions on maps.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "fac6ef6a-67d8-4fc4-bc1f-32fca45c5b3c",
            "name": "Develop glossary",
            "description": "Determine if the glossary for your project will be solely in the vernacular or a diglot or a triglot. Some teams choose to include a trade language (language of wider communication - LWC) in addition to an official world language. Arrange the glossary entries in alphabetical order in the vernacular language.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "b36effbd-65a1-41f9-83b7-e5b955d85b6d",
            "name": "Develop cover design",
            "description": "Communicate with the person designated as the typesetter for your project and ask that person to help you choose colors for your cover, how many colors, what kind of material to make the cover out of, and many more aspects that you might not be aware of.",
            "markComplete": "by-project",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "b72c7c62-c22b-47b0-9850-a719cb794861",
            "name": "Add cross references",
            "description": "If cross references have not been added to the vernacular project yet, now is the time to add them. If there are verse spans in the text, there is a possibility that the Scripture references will be shown double in the cross reference section as the bottom of hte page. For example, Matt 6:14-15 may show up twice down in the cross reference section. If this is the cae, then all the verses which are referred to from Matt 6:14-15 will need to be listed under only one reference, i.e. joined, and the second cross reference should be deleted. To find all occurances of span verses, use the following RegEx in the \"Find\" box:  regex:\\\\v \\d+-",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "92d5838b-bce2-4207-a7dc-5c6001f6d7d9",
            "name": "Format check: footnotes & cross references",
            "description": "Read all footnotes and cross references looking for inconsistencies in how they are formatted. The goal is to have a consistent look and feel across all footnotes, and not merely the absence of marker errors in the footnotes.  It may be helpful to go to Tools-->Checklist-->Footnotes. This checklist will compare the footnotes in your text to other resources that you specify.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "1cbff9af-07b6-4d6b-b970-aeb548b5b95a",
            "name": "Final read through/approval with church/community",
            "description": "After all final checks have been done, the translation team should print off the NT book(s) and do a complete oral read-through together with church and community leaders who will offer any final suggestions for revisions to the text.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "fdb55ea8-675a-4748-938e-29baeb639b04",
            "name": "Revise text based on final read through/audio",
            "description": "Make any final changes to the text based on feedback given during the oral read through and/or the listening to the audio recording of the Scriptures.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "431a349f-1c55-418d-8209-7112f7abcdb3",
            "name": "Pre-publication: run basic checks",
            "description": "After making changes to the text during pre-publication stage, run basic checks and resolve any issues found with chapter and verse numbers, markers, etc.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "cd07b637-3f6b-42c4-bf7c-be7a9460eee6",
            "name": "Received final publication approval",
            "description": "After every check has been run, after every revision has been made, and when the team says they are ready to go to the final typesetting, then the team must ask for the final approval from whoever is the person in authority over your language project.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "a9a461dc-23c0-460c-a33b-8a5d49ea88e9",
            "name": "Do final typesetting",
            "description": "This task is not done by the translation team. It is done by a typesetter. But you need to be ready to interact with the typesetter at anytime as they run other various Paratext Checks. As the typesetter finds questions to ask the team, they may put them as Notes in the text or can send questions to the team by email.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          }
        ]
      }
    ],
    "checks": []
  },
  {
    "id": "2ddd9e23-894e-4c1f-89a5-81291597bfca",
    "name": "SIL AmArea Base Plan",
    "version": "1.3",
    "kind": "factory",
    "stages": [
      {
        "id": "9eddb82d-ed66-4e24-bdab-060dea2294de",
        "name": "Complete translation brief",
        "description": "Developing the translation Brief\n\nThe translation brief is a statement of the standards for the project, such as which source texts are used,  and the specific audience and intended uses of the translation. Setting these principles out at the beginning will help the translation team work together towards the common goal.\n\nFor more information about the translation brief read:\n\n\nIntroducing the Translation Brief: A Practical Tool for Improving Translations\nThe translation brief, also referred to as translation instructions (Nord, 1991b), is a\nset of instructions prepared by a requester that accompanies a translation assignment,\nthus enabling the requester to convey information about the source text, the specific\ncommunicative purpose and context in which the text is used, the intended uses of\nthe translation and what it aims to accomplish. In short, it enables the requester and\ntranslator to be, quite literally, on the same page from start to finish.\n\nhttp://www.hablamosjuntos.org/mtw/html_toolkit/pdf/tool_3dev_transbrief-feb5_final.pdf",
        "tasks": [
          {
            "id": "79540c20-9aed-4d84-8e64-d3a3e1e98ccd",
            "name": "Complete translation brief",
            "description": "Developing the translation Brief\n\nThe translation brief is a statement of the standards for the project, such as which source texts are used,  and the specific audience and intended uses of the translation. Setting these principles out at the beginning will help the translation team work together towards the common goal.\n\nFor more information about the translation brief read:\n\n\nIntroducing the Translation Brief: A Practical Tool for Improving Translations\nThe translation brief, also referred to as translation instructions (Nord, 1991b), is a\nset of instructions prepared by a requester that accompanies a translation assignment,\nthus enabling the requester to convey information about the source text, the specific\ncommunicative purpose and context in which the text is used, the intended uses of\nthe translation and what it aims to accomplish. In short, it enables the requester and\ntranslator to be, quite literally, on the same page from start to finish.\n\nhttp://www.hablamosjuntos.org/mtw/html_toolkit/pdf/tool_3dev_transbrief-feb5_final.pdf",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "9f99673c-cb6a-4c05-a9cd-4629eb7f6b20",
            "name": "Exegesis",
            "description": "The first translation task is to study the text carefully, using Bible versions and commentaries. This is called “doing the exegesis”. There should be at least one person on each translation team who is a skilled exegete.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "4bce47e9-37c3-42ae-a8ec-5a5006c0e21e",
            "name": "Keyboarding the first draft",
            "description": "The translator, a mother-tongue speaker of the receptor language, makes the first draft of the translation, typing it into Paratext.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          }
        ]
      },
      {
        "id": "9443afef-8302-4727-8f85-1cb4ef464168",
        "name": "Exegetical check",
        "description": "This check is done by the translation team. Compare the draft with one or two translations in the national language, discuss exegetical choices that have been made in the translation, identify possible exegetical mistakes in the translation; identify any missing verses or sentences.)",
        "tasks": [
          {
            "id": "3480d1ca-6ee7-40eb-a31e-f0e06dbf73a8",
            "name": "Exegetical check",
            "description": "This check is done by the translation team. Compare the draft with one or two translations in the national language, discuss exegetical choices that have been made in the translation, identify possible exegetical mistakes in the translation; identify any missing verses or sentences.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "7bebeaeb-5932-4232-add9-22f60ac05007",
            "name": "Naturalness check",
            "description": "This check is done by the translation team (Read the draft, check the general flow of the discourse, its logic, chronology, participant reference, sentence length & rhythm, language style and register, etc.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "8ca385ae-24ad-41ab-8a63-707505e039a1",
            "name": "Proper names check",
            "description": "Verify that proper names have been transliterated according to agreed upon rules, and are consistent. Verify that capitalization has been done correctly and consistently. For languages with word level and grammatical honorifics, verify that they are used correctly. The Greek and Hebrew texts will not have the level of honorifics that some languages will need. Therefore Paratext cannot check for them reliably. Paratext can help if you add the honorifics plus the name as an acceptable rendering for a name, but only native speakers can say for a given instance of a name whether a honorific is required or not. Note: The Biblical terms tool can help with the verification of names if the list is filtered for the \"Names\" category. The Biblical terms tool will not find instances of a name in book introductions, section headings, footnotes, illustration captions and glossary entries. You will have to find the proper names in these locations manually.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "5908f5a3-33bd-4929-bff3-692bb7189c22",
            "name": "Biblical key terms check",
            "description": "This check is done by the translation team (Identify the Biblical key terms in the passage, keyboard the renderings into the Biblical terms Tool, check the consistency of the Biblical key terms used in the passage with the terms documented in the Biblical terms Tool, discuss and document significant variations and/or alternatives that need to be discussed with the translation consultant), compare the draft with one or two translations in the national language, discuss exegetical choices that have been made in the translation, identify possible exegetical mistakes in the translation; identify any missing verses or sentences.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "386e0970-f1fc-4ce9-bffa-c2d92a772fc1",
            "name": "Run \"Spell Check Current Book\"",
            "description": "Under the Checking Menu is \"Spell Check Current Book\", click on this and accept or correct the spelling of all of the words present. For those that need more discussion open the wordlist tool and add a spelling discussion note.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "a54b251a-daee-4366-9431-ebe4a5f0a210",
            "name": "Section breaks and headings - format check",
            "description": "Discuss the format used in the translation and check if this is consistent with the agreed upon model translation (if there is one). Formatting to be checked includes but is not limited to: prose format, indented poetry format, differences in format in the translation and introductions. If another translation is used as a model then this check can be done using Tools > Checklists > Compare Section Headings",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "9cc94d91-bd01-418c-8bcd-c114e99b7d26",
            "name": "Paragraph breaks - format check",
            "description": "Read the text and verify that the paragraph breaks are in the desired places. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\p, and \\m.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "739ab389-cb89-4347-8c29-9c11bb673af7",
            "name": "Layout and indents - format check",
            "description": "Verify other layout issues such as poetry. Particular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\q, \\q1 and \\q2.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "3d26c07e-637e-4e11-980d-3689884d7157",
            "name": "Special formatting - format check",
            "description": "See list of special formatting issues such as genealogies, words on the cross, letters, etc. Verify that text is marked using the correct standard format markers (USFMs). See http://paratext.org/about/usfm for latest guide to using USFMs.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "0b6cbd07-9f68-4ec9-9eb6-684ce68f7dac",
            "name": "Print preliminary version",
            "description": "Optional - Open the \"Assignments and Progress\" window and correct all errors/issues shown there. Once all errors are corrected and open notes are resolved, print a copy of the books or chapters to be reviewed by community group. The two simplest ways to print text from Paratext are found under the \"File\" menu. They are \"Print Draft\" and \"Save as RTF\". There are other methods available for more advanced formatting, such as \"Export to Pathway\". Use the method specified by your project administrator or translation consultant.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          }
        ]
      },
      {
        "id": "20974cee-9f40-43c4-a0ae-5e733238e134",
        "name": "Prepare for comprehension testing",
        "description": "This is comprehension testing done with members of the language community who were not involved in preparing the Preliminary Version of the text. (Re-read the translation draft; Draft general retell questions for comprehension testing; Identify possible issues of misunderstanding; Draft specific questions related to the main events in the passage, participant reference, key terms, foreign concepts, metaphors, rhetorical questions, inferential information, positive or negative associations, etc.)",
        "tasks": [
          {
            "id": "75365725-9717-46de-85f9-413d44af9b59",
            "name": "Prepare for comprehension testing",
            "description": "This is comprehension testing done with members of the language community who were not involved in preparing the Preliminary Version of the text. (Re-read the translation draft; Draft general retell questions for comprehension testing; Identify possible issues of misunderstanding; Draft specific questions related to the main events in the passage, participant reference, key terms, foreign concepts, metaphors, rhetorical questions, inferential information, positive or negative associations, etc.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "e2642958-0d86-450b-8c6d-df076b05ab5f",
            "name": "First comprehension testing & revision",
            "description": "In this plan it is assumed that any checks found unfinished from a previous stage should be dealt with appropriately. NOTE: if a check from a previously completed stage is found to have errors it will show up in the current working stage.\nWhile supplementary helps are specifically mentioned in the drafting section, it is assumed that all other checks will also be completed on supplementary materials and that these are a part of the final text.\nThe team discusses the comments from first comprehension testing and revises the text where appropriate. (Resolve any issues documented by project, spelling and rendering notes.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "b5c6a130-0254-407b-963f-856f580d3698",
            "name": "Print first revision",
            "description": "Optional - Print chapter(s) or book(s) being reviewed using method specified by project administrator or translation consultant.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "986ee40b-6f38-400a-b7f0-b6085faeb476",
            "name": "Second comprehension testing & revision",
            "description": "This check is done with a group of UNSs (Read the first revision of the passage; ask general retell questions; ask follow up questions; document problems of understanding that need to be fixed in the translation; issues related to spelling should be documented with a spelling note in the word list tool, and issues related to rendering words should be documented with a rendering note in the Biblical terms tool. Also note any changes related to improved naturalness of the draft)\nThe team discusses the comments from first comprehension testing and revises the text where appropriate. (Resolve any issues documented by project, spelling and rendering notes.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          }
        ]
      },
      {
        "id": "b270751c-03d8-463b-abbf-5c8e3c4a188b",
        "name": "Update Biblical terms tool",
        "description": "Open Biblical terms tool and filter for chapter(s) being prepared for consultant check. Verify that all the Biblical terms have approved renderings. Update any that are missing, or need to be changed because of a better understanding of what the Greek or Hebrew means. It is likely some are out-of-date, because of the revisions made after comprehension testing.",
        "tasks": [
          {
            "id": "f8afb80c-dab6-470b-a564-89b3d44dbaad",
            "name": "Update Biblical terms tool",
            "description": "Open Biblical terms tool and filter for chapter(s) being prepared for consultant check. Verify that all the Biblical terms have approved renderings. Update any that are missing, or need to be changed because of a better understanding of what the Greek or Hebrew means. It is likely some are out-of-date, because of the revisions made after comprehension testing.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "fa01aafa-8b8f-489b-99d2-4cf63cdb53ea",
            "name": "Grammar and discourse write up",
            "description": "Prepare or revise a write up relevant grammar and discourse analysis and send to the translation consultant. A list of all connector words would be especially helpful for the consultant.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "0b6970df-00ce-4da4-a46a-28be4c7f2e6a",
            "name": "Draft the back translation",
            "description": "A back-translation is a translation into the major national or trade language of the area. It should be done by a speaker of the language other than the translator. It helps to show whether the translation is communicating effectively and accurately, and it serves as the basis for the consultant check.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "7c50ab22-d2cb-415b-b5b7-be52aaf02016",
            "name": "Check back translation",
            "description": "The team should verify that back translation is complete, and there are no missing words or phrases, so it is usable by consultant. The purpose of this check is not for the team to change what the back translator thinks the text means.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "fd6c2f9b-c34f-4762-bcd0-845ff03c1785",
            "name": "Preliminary Evaluation of text by consultant",
            "description": "Consultant evaluates the text and places notes with his observations in the text (or back translation). The evaluation should focus on accuracy, clarity, naturalness, and acceptability of the translation including all supplementary materials and illustrations used.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "25931f1d-cc55-46c9-a3e8-8f0bea379b90",
            "name": "Consultant visit with team",
            "description": "Consultant interacts with the translation team concerning his observations about the text and supplementary materials, and gives assistance and advice as requested. The project administrator should give one team member (that could be himself) editing permission in the Assignments and Progress window for the \"Consultant visit\" task",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "9955d13b-4d77-4c77-81a3-a728bf11b77e",
            "name": "Third revision",
            "description": "The text and supplementary materials are revised based on input from the translation consultant. This task is for the editing that is done after the consultant has left. Some consultants call these edits \"action items\", \"to do list\", \"homework\" or something else.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "aa176048-9a38-4356-9ea7-2e726e6e632a",
            "name": "Back translation revision",
            "description": "Revise the back translation as needed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "c6f68e0f-7edd-4841-bf2a-502fd1dd6daf",
            "name": "Preliminary consultant approval",
            "description": "Consultant gives preliminary approval of the text, but it may have some follow-up tasks which are clearly defined.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "ec5c2bbe-f91b-4d2d-85e3-6160779a319d",
            "name": "Biblical terms tool revision",
            "description": "Revise renderings in the Biblical terms tool as needed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "97931ae7-27a7-43e4-8baf-75f7f3790234",
            "name": "Consultant report distributed",
            "description": "Consultant report shared with the translation team and with major stakeholders.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          }
        ]
      },
      {
        "id": "16385cc6-d555-4b29-b342-1f78a9853656",
        "name": "Naturalness review & revision",
        "description": "The community does a naturalness review of the text based on the oral and/or written communication of the third revision.\nThe team should discuss the comments of the naturalness review and make the changes suggested that are valid.",
        "tasks": [
          {
            "id": "ad1e60e2-0340-4832-b914-16fc9c76c76e",
            "name": "Naturalness review & revision",
            "description": "The community does a naturalness review of the text based on the oral and/or written communication of the third revision.\nThe team should discuss the comments of the naturalness review and make the changes suggested that are valid.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "ab24ebef-f715-4a6e-b505-b5c9172ba6c9",
            "name": "Community review of Biblical key terms and revision",
            "description": "Community leaders, church leaders, and other community members discuss how key terms are rendered.\nThe team discusses comments about key terms made at the community review and uses those changes they think are valid.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "7f371a2d-bd1c-48ef-99f7-c16136246dee",
            "name": "Community review revision report",
            "description": "The team reports to the consultant on any textual or key terms changes made as a result of the community review.  Rationale for the changes should be included.  The team should open the Biblical terms tool and consult the notes, and history sections for the terms being reported on. It is best practice to enter this information in the tool as the changes were being discussed and decided on.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "40b6dcd4-3b9d-4790-819d-28f0fc02bc53",
            "name": "Draft section headings",
            "description": "Draft section headings",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "b1ee4198-d3fe-4a2f-9cd7-4e0fa1ec8bd3",
            "name": "Draft footnotes",
            "description": "Draft footnotes. These may be drafted after main text has been finalized. After you have drafted the footnotes, it may be helpful to go to Tools-->Checklist-->Footnotes. This checklist will compare the footnotes in your text to other resources that you specify.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "1ce56f6c-82fc-41b6-9876-7a25572b4951",
            "name": "Draft book introductions",
            "description": "Draft the book introduction. Be careful to use the same key terms in the introduction as in the text.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "5c28e0c8-0c8a-45a4-afab-9c5f22512928",
            "name": "Draft glossary entries",
            "description": "Draft glossary entries. The glossary is one of the books that occur after Revelation, and its short name is GLO. It is recommended to add glossary entries from within the Biblical terms tool. Using the Biblical terms tool will create GLO book for you. Look in Help under \"glossary\" for more information.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "2913d3d8-3691-4576-95bb-4c9cd7f03adb",
            "name": "Insert illustrations",
            "description": "Make initial decisions on illustrations. If captions contain text not\ndirectly from the scriptures, they should be consultant checked. This\nshould be done in conjunction with the publications department. Sample\nillustrations can be seen at:\nhttps://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "6a15bff7-ae13-45cc-b393-82eee01ff8ae",
            "name": "Verification of supplementary materials & revision",
            "description": "Working with a group of UNSs, test any supplementary materials that have not already been tested. This would most likely include but is not limited to: glossary entries, illustration captions and book introductions.\nThe team discusses the comments from the comprehension testing of supplementary materials and revises the text where appropriate.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          }
        ]
      },
      {
        "id": "c66ede6b-1e7b-4d55-b5c3-f8aff60217d7",
        "name": "Choose final illustrations and write captions",
        "description": "Make final decisions on illustrations. If captions contain text not directly from the scriptures, they should be consultant checked. This should be done in conjunction with the publications department. Sample illustrations can be seen at: https://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0",
        "tasks": [
          {
            "id": "4363aa1f-aeca-4831-8562-085b9381bad6",
            "name": "Choose final illustrations and write captions",
            "description": "Make final decisions on illustrations. If captions contain text not directly from the scriptures, they should be consultant checked. This should be done in conjunction with the publications department. Sample illustrations can be seen at: https://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "9fca00d9-bb43-4718-aa64-8d4e07f9ab43",
            "name": "Choose maps and label place names",
            "description": "Make final decisions on maps. This should be done in conjunction with the publications department. Sample maps can be seen at:\nhttps://www.dropbox.com/sh/0bi5dg8v7vj7y74/AAANSWfsC6uSL_mRSYKBx6T9a?dl=0",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "819e4803-d2fb-465e-8242-3ce0d58edde2",
            "name": "Draft introduction to Bible/NT, other front & back matter",
            "description": "All planned front and back matter that has not already been done should be drafted by this stage.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "f6540822-253b-4b50-8699-179ebb9ea5b7",
            "name": "Check parallel passages",
            "description": "Go to the Tools-->Parallel Passages menu, and use the Parallel Passages tool to guide you to make parallel passages the same to the appropriate level.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "3936924b-7158-4628-a6d5-8dbd7e23885a",
            "name": "Verify that all Paratext checks are complete",
            "description": "Open the Assignments and progress window, and correct all errors and resolve all outstanding issues reported there.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "ea8585f9-a9fa-4778-863f-61ce41542068",
            "name": "Proper names - final check",
            "description": "In the Biblical terms tool, create a new filter for the \"Names\" category.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "ba93cc52-db81-4b97-9fa4-7acd521c1601",
            "name": "Numbers - final check",
            "description": "Select the list \"Numbers\" as the Biblical terms list in the Biblical terms tool to find all the numbers in the New Testament.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "c420d607-9eba-4bf3-92c1-fd5a77bc0915",
            "name": "Money - final check",
            "description": "Verify that words such as money, coin, silver, gold, denarii, and shekel are adequately differentiated and rendered consistently rendered.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "1ac01594-c549-410f-bd50-2c248f767c6f",
            "name": "Weights - final check",
            "description": "Verify that words such as talent, mina, shekel, pim, beka, gerah etc., are adequately differentiated and rendered consistently.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "a643c702-c6c2-4ba9-98c5-4d3191ac4ccb",
            "name": "Measures - final check",
            "description": "Verify that words such as cubit, span, handbreadth, orgyia, stadion, milion, cor, lethech, ephah, seah, omer, cab, bath, hin, log, etc., are adequately differentiated and rendered consistently rendered.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "9bd5b294-ef93-4e48-a622-8e6907aab38c",
            "name": "Consistency check - Biblical key terms",
            "description": "Open Biblical terms tool and review all renderings for consistency, and make any last changes needed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "b7263773-5022-4ec2-9442-c07f681f9f91",
            "name": "Check references",
            "description": "Look up and verify that all Scripture references in footnotes, cross references, book introductions, etc., are referring to verse(s) that talk about the correct topic. (This is not the automated Paratext check to verify that a Scripture reference is in the correct format and exists in the cannon.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "60fc3151-1b71-4910-b9f4-96dbaf84c225",
            "name": "Section breaks and headings - final format check",
            "description": "If another translation is used as a base then this check can be done using Tools > Checklists > Compare Section Headings",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "a5b28c00-1dce-405f-8cb2-fb9fb0fd346e",
            "name": "Paragraph breaks - final format check",
            "description": "If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\p, and \\m.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "ce33f6a6-b46c-4abe-a234-5fa6bbe06ea5",
            "name": "Layout and indents - final format check",
            "description": "Verify other layout issues such as poetry. Particular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\q, \\q1 and \\q2.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "e66023ab-dc4d-4f5c-94a5-93fded851e7a",
            "name": "Special formatting - final format check",
            "description": "See list of special formatting issues such as genealogies, words on the cross, letters, etc. Verify that text is marked using the correct standard format markers (USFM). See http://paratext.org/about/usfm for latest guide to using USFMs.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "bf163865-a207-42b7-950e-b855539b9337",
            "name": "Consultant check - final items",
            "description": "Consultant will check any new supplementary materials such as maps, illustrations, front matter, and back matter.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "e09339d3-83e9-479e-a387-76b83067007d",
            "name": "Final approval from consultant",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "1cbff9af-07b6-4d6b-b970-aeb548b5b95a",
            "name": "Final read through and approval with church and community",
            "description": "This should use a draft produced by PA/InDesign so that the text is in close to final format.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "fdb55ea8-675a-4748-938e-29baeb639b04",
            "name": "Revise text based on final read through",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "a9a461dc-23c0-460c-a33b-8a5d49ea88e9",
            "name": "Do final typesetting",
            "description": "This task is not done by the translation team. It is done by a typesetter who is part of Global Printing Services (GPS).",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "d2159520-6cc0-4fcb-a7c2-e9c68a1b740e",
            "name": "Do audio recording",
            "description": "Ask your entity what partner organizations are in your area that do Scripture recordings.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 250,
              "easy": 250,
              "moderate": 200,
              "difficult": 150
            }
          }
        ]
      }
    ],
    "checks": []
  },
  {
    "id": "ec747b2c-a9b2-41c6-9de1-e6fd564ab4bb",
    "name": "SIL Base Plan",
    "version": "1.34",
    "kind": "factory",
    "stages": [
      {
        "id": "9eddb82d-ed66-4e24-bdab-060dea2294de",
        "name": "Complete translation brief",
        "description": "Developing the translation Brief\n\nThe translation brief is a statement of the standards for the project, such as which source texts are used,  and the specific audience and intended uses of the translation. Setting these principles out at the beginning will help the translation team work together towards the common goal.\n\nFor more information about the translation brief read:\n\n\nIntroducing the Translation Brief: A Practical Tool for Improving Translations\nThe translation brief, also referred to as translation instructions (Nord, 1991b), is a\nset of instructions prepared by a requester that accompanies a translation assignment,\nthus enabling the requester to convey information about the source text, the specific\ncommunicative purpose and context in which the text is used, the intended uses of\nthe translation and what it aims to accomplish. In short, it enables the requester and\ntranslator to be, quite literally, on the same page from start to finish.\n\nhttp://www.hablamosjuntos.org/mtw/html_toolkit/pdf/tool_3dev_transbrief-feb5_final.pdf",
        "tasks": [
          {
            "id": "79540c20-9aed-4d84-8e64-d3a3e1e98ccd",
            "name": "Complete translation brief",
            "description": "Developing the translation Brief\n\nThe translation brief is a statement of the standards for the project, such as which source texts are used,  and the specific audience and intended uses of the translation. Setting these principles out at the beginning will help the translation team work together towards the common goal.\n\nFor more information about the translation brief read:\n\n\nIntroducing the Translation Brief: A Practical Tool for Improving Translations\nThe translation brief, also referred to as translation instructions (Nord, 1991b), is a\nset of instructions prepared by a requester that accompanies a translation assignment,\nthus enabling the requester to convey information about the source text, the specific\ncommunicative purpose and context in which the text is used, the intended uses of\nthe translation and what it aims to accomplish. In short, it enables the requester and\ntranslator to be, quite literally, on the same page from start to finish.\n\nhttp://www.hablamosjuntos.org/mtw/html_toolkit/pdf/tool_3dev_transbrief-feb5_final.pdf",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "9f99673c-cb6a-4c05-a9cd-4629eb7f6b20",
            "name": "Exegesis",
            "description": "The first translation task is to study the text carefully, using Bible versions and commentaries. This is called “doing the exegesis”. There should be at least one person on each translation team who is a skilled exegete.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "3c7a3e20-ffe0-4b32-b11c-f6948b8f5a81",
            "name": "Oral retelling and processing of the text",
            "description": "A translator, a mother-tongue speaker of the receptor language, studies the text in a LWC, then retells the text in the vernacular to others on the team. It may be recorded for use in the drafting of the text in the next step.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "4bce47e9-37c3-42ae-a8ec-5a5006c0e21e",
            "name": "Keyboarding the first draft",
            "description": "The translator, a mother-tongue speaker of the receptor language, makes the first draft of the translation, typing it into Paratext.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "58089389-d741-4c35-848b-64a65229ffb1",
            "name": "Read the draft aloud",
            "description": "The translator, a mother-tongue speaker of the receptor language, reads the draft aloud to the team, and possibly other mother tongue speakers of the language to check for naturalness and clarity. Then adjust the text based on comments from the group.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "40b6dcd4-3b9d-4790-819d-28f0fc02bc53",
            "name": "Draft section headings",
            "description": "Draft section headings",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "b1ee4198-d3fe-4a2f-9cd7-4e0fa1ec8bd3",
            "name": "Draft footnotes",
            "description": "Draft footnotes. These may be drafted after main text has been finalized. After you have drafted the footnotes, it may be helpful to go to Tools-->Checklist-->Footnotes. This checklist will compare the footnotes in your text to other resources that you specify.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "1ce56f6c-82fc-41b6-9876-7a25572b4951",
            "name": "Draft book introductions",
            "description": "Draft the book introduction. Be careful to use the same key terms in the introduction as in the text.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "5c28e0c8-0c8a-45a4-afab-9c5f22512928",
            "name": "Draft glossary entries",
            "description": "Draft glossary entries. The glossary is one of the books that occur after Revelation, and its short name is GLO. It is recommended to add glossary entries from within the Biblical terms tool. Using the Biblical terms tool will create GLO book for you. Look in Help under \"glossary\" for more information.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "2913d3d8-3691-4576-95bb-4c9cd7f03adb",
            "name": "Insert illustrations",
            "description": "Make initial decisions on illustrations. If captions contain text not\ndirectly from the scriptures, they should be consultant checked. This\nshould be done in conjunction with the publications department. Sample\nillustrations can be seen at:\nhttps://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          }
        ]
      },
      {
        "id": "9443afef-8302-4727-8f85-1cb4ef464168",
        "name": "Naturalness check",
        "description": "This check is done by the translation team (Read the draft, check the general flow of the discourse, its logic, chronology, participant reference, sentence length & rhythm, language style and register, etc.)",
        "tasks": [
          {
            "id": "7bebeaeb-5932-4232-add9-22f60ac05007",
            "name": "Naturalness check",
            "description": "This check is done by the translation team (Read the draft, check the general flow of the discourse, its logic, chronology, participant reference, sentence length & rhythm, language style and register, etc.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "3480d1ca-6ee7-40eb-a31e-f0e06dbf73a8",
            "name": "Exegetical check",
            "description": "This check is done by the translation team. Compare the draft with one or two translations in the national language, discuss exegetical choices that have been made in the translation, identify possible exegetical mistakes in the translation; identify any missing verses or sentences.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "8ca385ae-24ad-41ab-8a63-707505e039a1",
            "name": "Proper names check",
            "description": "Verify that proper names have been transliterated according to agreed upon rules, and are consistent. Verify that capitalization has been done correctly and consistently. For languages with word level and grammatical honorifics, verify that they are used correctly. The Greek and Hebrew texts will not have the level of honorifics that some languages will need. Therefore Paratext cannot check for them reliably. Paratext can help if you add the honorifics plus the name as an acceptable rendering for a name, but only native speakers can say for a given instance of a name whether a honorific is required or not. Note: The Biblical terms tool can help with the verification of names if the list is filtered for the \"Names\" category. The Biblical terms tool will not find instances of a name in book introductions, section headings, footnotes, illustration captions and glossary entries. You will have to find the proper names in these locations manually.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "5908f5a3-33bd-4929-bff3-692bb7189c22",
            "name": "Biblical key terms check",
            "description": "This check is done by the translation team (Identify the Biblical key terms in the passage, keyboard the renderings into the Biblical terms Tool, check the consistency of the Biblical key terms used in the passage with the terms documented in the Biblical terms Tool, discuss and document significant variations and/or alternatives that need to be discussed with the translation consultant), compare the draft with one or two translations in the national language, discuss exegetical choices that have been made in the translation, identify possible exegetical mistakes in the translation; identify any missing verses or sentences.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "386e0970-f1fc-4ce9-bffa-c2d92a772fc1",
            "name": "Run \"Spell Check Current Book\"",
            "description": "Under the Checking Menu is \"Spell Check Current Book\", click on this and accept or correct the spelling of all of the words present. For those that need more discussion open the wordlist tool and add a spelling discussion note.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "a54b251a-daee-4366-9431-ebe4a5f0a210",
            "name": "Section breaks and headings - format check",
            "description": "Discuss the format used in the translation and check if this is consistent with the agreed upon model translation (if there is one). Formatting to be checked includes but is not limited to: prose format, indented poetry format, differences in format in the translation and introductions. If another translation is used as a model then this check can be done using Tools > Checklists > Compare Section Headings",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "9cc94d91-bd01-418c-8bcd-c114e99b7d26",
            "name": "Paragraph breaks - format check",
            "description": "Read the text and verify that the paragraph breaks are in the desired places. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\p, and \\m.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "739ab389-cb89-4347-8c29-9c11bb673af7",
            "name": "Layout and indents - format check",
            "description": "Verify other layout issues such as poetry. Particular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\q, \\q1 and \\q2.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "3d26c07e-637e-4e11-980d-3689884d7157",
            "name": "Special formatting - format check",
            "description": "See list of special formatting issues such as genealogies, words on the cross, letters, etc. Verify that text is marked using the correct standard format markers (USFMs). See http://paratext.org/about/usfm for latest guide to using USFMs.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "0b6cbd07-9f68-4ec9-9eb6-684ce68f7dac",
            "name": "Print preliminary version",
            "description": "Open the \"Assignments and Progress\" window and correct all errors/issues shown there. Once all errors are corrected and open notes are resolved, print a copy of the books or chapters to be reviewed by community group. The two simplest ways to print text from Paratext are found under the \"File\" menu. They are \"Print Draft\" and \"Save as RTF\". There are other methods available for more advanced formatting, such as \"Export to Pathway\". Use the method specified by your project administrator or translation consultant.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "75365725-9717-46de-85f9-413d44af9b59",
            "name": "Prepare for comprehension testing",
            "description": "This is comprehension testing done with members of the language community who were not involved in preparing the Preliminary Version of the text. (Re-read the translation draft; Draft general retell questions for comprehension testing; Identify possible issues of misunderstanding; Draft specific questions related to the main events in the passage, participant reference, key terms, foreign concepts, metaphors, rhetorical questions, inferential information, positive or negative associations, etc.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          }
        ]
      },
      {
        "id": "20974cee-9f40-43c4-a0ae-5e733238e134",
        "name": "First comprehension testing",
        "description": "In this plan it is assumed that any checks found unfinished from a previous stage should be dealt with appropriately. NOTE: if a check from a previously completed stage is found to have errors it will show up in the current working stage.\nWhile supplementary helps are specifically mentioned in the drafting section, it is assumed that all other checks will also be completed on supplementary materials and that these are a part of the final text.",
        "tasks": [
          {
            "id": "e2642958-0d86-450b-8c6d-df076b05ab5f",
            "name": "First comprehension testing",
            "description": "In this plan it is assumed that any checks found unfinished from a previous stage should be dealt with appropriately. NOTE: if a check from a previously completed stage is found to have errors it will show up in the current working stage.\nWhile supplementary helps are specifically mentioned in the drafting section, it is assumed that all other checks will also be completed on supplementary materials and that these are a part of the final text.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "17f2161c-086e-4016-975d-c58dfb7f55cf",
            "name": "First revision",
            "description": "The team discusses the comments from first comprehension testing and revises the text where appropriate. (Resolve any issues documented by project, spelling and rendering notes.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "b5c6a130-0254-407b-963f-856f580d3698",
            "name": "Print first revision",
            "description": "Print chapter(s) or book(s) being reviewed using method specified by project administrator or translation consultant.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "986ee40b-6f38-400a-b7f0-b6085faeb476",
            "name": "Second comprehension testing",
            "description": "This check is done with a group of UNSs (Read the first revision of the passage; ask general retell questions; ask follow up questions; document problems of understanding that need to be fixed in the translation; issues related to spelling should be documented with a spelling note in the word list tool, and issues related to rendering words should be documented with a rendering note in the Biblical terms tool. Also note any changes related to improved naturalness of the draft)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "3fde76e5-bc52-419c-8a08-f4f68d876742",
            "name": "Second revision",
            "description": "The team discusses the comments from first comprehension testing and revises the text where appropriate. (Resolve any issues documented by project, spelling and rendering notes.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "6a15bff7-ae13-45cc-b393-82eee01ff8ae",
            "name": "Comprehension testing of supplementary materials",
            "description": "Working with a group of UNSs, test any supplementary materials that have not already been tested. This would most likely include but is not limited to: glossary entries, illustration captions and book introductions.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "e5be1d89-7c8f-433f-888e-f59fe36c6b7b",
            "name": "Revision of supplementary materials",
            "description": "The team discusses the comments from the comprehension testing of supplementary materials and revises the text where appropriate.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "f8afb80c-dab6-470b-a564-89b3d44dbaad",
            "name": "Update Biblical terms tool",
            "description": "Open Biblical terms tool and filter for chapter(s) being prepared for consultant check. Verify that all the Biblical terms have approved renderings. Update any that are missing, or need to be changed because of a better understanding of what the Greek or Hebrew means. It is likely some are out-of-date, because of the revisions made after comprehension testing.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "fa01aafa-8b8f-489b-99d2-4cf63cdb53ea",
            "name": "Grammar and discourse write up",
            "description": "Prepare or revise a write up relevant grammar and discourse analysis and send to the translation consultant. A list of all connector words would be especially helpful for the consultant.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "0b6970df-00ce-4da4-a46a-28be4c7f2e6a",
            "name": "Draft the back translation",
            "description": "A back-translation is a translation into the major national or trade language of the area. It should be done by a speaker of the language other than the translator. It helps to show whether the translation is communicating effectively and accurately, and it serves as the basis for the consultant check.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "7c50ab22-d2cb-415b-b5b7-be52aaf02016",
            "name": "Check back translation",
            "description": "The team should verify that back translation is complete, and there are no missing words or phrases, so it is usable by consultant. The purpose of this check is not for the team to change what the back translator thinks the text means.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          }
        ]
      },
      {
        "id": "b270751c-03d8-463b-abbf-5c8e3c4a188b",
        "name": "Evaluation of text",
        "description": "Consultant evaluates the text and places notes with his observations in the text (or back translation). The evaluation should focus on accuracy, clarity, naturalness, and acceptability of the translation including all supplementary materials and illustrations used.",
        "tasks": [
          {
            "id": "fd6c2f9b-c34f-4762-bcd0-845ff03c1785",
            "name": "Evaluation of text",
            "description": "Consultant evaluates the text and places notes with his observations in the text (or back translation). The evaluation should focus on accuracy, clarity, naturalness, and acceptability of the translation including all supplementary materials and illustrations used.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "25931f1d-cc55-46c9-a3e8-8f0bea379b90",
            "name": "Consultant visit",
            "description": "Consultant interacts with the translation team concerning his observations about the text and supplementary materials, and gives assistance and advice as requested. The project administrator should give one team member (that could be himself) editing permission in the Assignments and Progress window for the \"Consultant visit\" task",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "9955d13b-4d77-4c77-81a3-a728bf11b77e",
            "name": "Third revision",
            "description": "The text and supplementary materials are revised based on input from the translation consultant. This task is for the editing that is done after the consultant has left. Some consultants call these edits \"action items\", \"to do list\", \"homework\" or something else.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "ec5c2bbe-f91b-4d2d-85e3-6160779a319d",
            "name": "Biblical terms tool revision",
            "description": "Revise renderings in the Biblical terms tool as needed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "aa176048-9a38-4356-9ea7-2e726e6e632a",
            "name": "Back translation revision",
            "description": "Revise the back translation as needed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "c6f68e0f-7edd-4841-bf2a-502fd1dd6daf",
            "name": "Preliminary consultant approval",
            "description": "Consultant gives preliminary approval of the text, but it may have some follow-up tasks which are clearly defined.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "97931ae7-27a7-43e4-8baf-75f7f3790234",
            "name": "Consultant report distributed",
            "description": "Consultant report shared with the translation team and with major stakeholders.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          }
        ]
      },
      {
        "id": "16385cc6-d555-4b29-b342-1f78a9853656",
        "name": "Naturalness review",
        "description": "The community does a naturalness review of the text based on the oral and/or written communication of the third revision.",
        "tasks": [
          {
            "id": "ad1e60e2-0340-4832-b914-16fc9c76c76e",
            "name": "Naturalness review",
            "description": "The community does a naturalness review of the text based on the oral and/or written communication of the third revision.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "69a7d76b-0c5c-4066-8c6a-dcce2e02bee2",
            "name": "Fourth revision",
            "description": "The team should discuss the comments of the naturalness review and make the changes suggested that are valid.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "ed3f57fb-e3de-4b13-bfe8-c9754d61e044",
            "name": "Team progress report",
            "description": "The team writes a report about what changes were made in the fourth revision and why those changes were made, and sends it to the consultant.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "ab24ebef-f715-4a6e-b505-b5c9172ba6c9",
            "name": "Community review of Biblical key terms",
            "description": "Community leaders, church leaders, and other community members discuss how key terms are rendered.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "9784a38c-2c37-4d90-82bf-ee7f4125057e",
            "name": "Key term revision",
            "description": "The team discusses comments about key terms made at the community review and uses those changes they think are valid.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "7f371a2d-bd1c-48ef-99f7-c16136246dee",
            "name": "Team Biblical key terms report",
            "description": "The team writes a report about what changes were made in the key terms and why those changes were made, and sends it to the consultant. The team should open the Biblical terms tool and consult the notes, and history sections for the terms being reported on. It is best practice to enter this information in the tool as the changes were being discussed and decided on.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          }
        ]
      },
      {
        "id": "c66ede6b-1e7b-4d55-b5c3-f8aff60217d7",
        "name": "Choose final illustrations and write captions",
        "description": "Make final decisions on illustrations. If captions contain text not directly from the scriptures, they should be consultant checked. This should be done in conjunction with the publications department. Sample illustrations can be seen at: https://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0",
        "tasks": [
          {
            "id": "4363aa1f-aeca-4831-8562-085b9381bad6",
            "name": "Choose final illustrations and write captions",
            "description": "Make final decisions on illustrations. If captions contain text not directly from the scriptures, they should be consultant checked. This should be done in conjunction with the publications department. Sample illustrations can be seen at: https://www.dropbox.com/sh/cs0qspb52iwa2rj/AACr9xi7s2LVoheonn0OnjPla?dl=0",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "9fca00d9-bb43-4718-aa64-8d4e07f9ab43",
            "name": "Choose maps and label place names",
            "description": "Make final decisions on maps. This should be done in conjunction with the publications department. Sample maps can be seen at:\nhttps://www.dropbox.com/sh/0bi5dg8v7vj7y74/AAANSWfsC6uSL_mRSYKBx6T9a?dl=0",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "819e4803-d2fb-465e-8242-3ce0d58edde2",
            "name": "Draft introduction to Bible/NT, other front & back matter",
            "description": "All planned front and back matter that has not already been done should be drafted by this stage.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "f6540822-253b-4b50-8699-179ebb9ea5b7",
            "name": "Check parallel passages",
            "description": "Go to the Tools-->Parallel Passages menu, and use the Parallel Passages tool to guide you to make parallel passages the same to the appropriate level.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "3936924b-7158-4628-a6d5-8dbd7e23885a",
            "name": "Verify that all Paratext checks are complete",
            "description": "Open the Assignments and progress window, and correct all errors and resolve all outstanding issues reported there.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "ea8585f9-a9fa-4778-863f-61ce41542068",
            "name": "Proper names - final check",
            "description": "In the Biblical terms tool, create a new filter for the \"Names\" category.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "ba93cc52-db81-4b97-9fa4-7acd521c1601",
            "name": "Numbers - final check",
            "description": "Select the list \"Numbers\" as the Biblical terms list in the Biblical terms tool to find all the numbers in the New Testament.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "c420d607-9eba-4bf3-92c1-fd5a77bc0915",
            "name": "Money - final check",
            "description": "Verify that words such as money, coin, silver, gold, denarii, and shekel are adequately differentiated and rendered consistently rendered.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "1ac01594-c549-410f-bd50-2c248f767c6f",
            "name": "Weights - final check",
            "description": "Verify that words such as talent, mina, shekel, pim, beka, gerah etc., are adequately differentiated and rendered consistently.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "a643c702-c6c2-4ba9-98c5-4d3191ac4ccb",
            "name": "Measures - final check",
            "description": "Verify that words such as cubit, span, handbreadth, orgyia, stadion, milion, cor, lethech, ephah, seah, omer, cab, bath, hin, log, etc., are adequately differentiated and rendered consistently rendered.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "9bd5b294-ef93-4e48-a622-8e6907aab38c",
            "name": "Consistency check - Biblical key terms",
            "description": "Open Biblical terms tool and review all renderings for consistency, and make any last changes needed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "48728fe8-6dd3-49d0-aea0-c90406faad03",
            "name": "Consistency check - parallel passages",
            "description": "Open Parallel Passage tool and confirm all parallel passages. (This check is not simply that parallel passages have check marks, it is meant to read the verses and see if the appropriate words are green and yellow in each passage.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "b7263773-5022-4ec2-9442-c07f681f9f91",
            "name": "Check references",
            "description": "Look up and verify that all Scripture references in footnotes, cross references, book introductions, etc., are referring to verse(s) that talk about the correct topic. (This is not the automated Paratext check to verify that a Scripture reference is in the correct format and exists in the cannon.)",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "92d5838b-bce2-4207-a7dc-5c6001f6d7d9",
            "name": "Footnotes and cross references - format check",
            "description": "Read all footnotes and cross references looking for inconsistencies in how they are formatted. The goal is to have a consistent look and feel across all footnotes, and not merely the absence of marker errors in the footnotes.  It may be helpful to go to Tools-->Checklist-->Footnotes. This checklist will compare the footnotes in your text to other resources that you specify.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "60fc3151-1b71-4910-b9f4-96dbaf84c225",
            "name": "Section breaks and headings - final format check",
            "description": "If another translation is used as a base then this check can be done using Tools > Checklists > Compare Section Headings",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "a5b28c00-1dce-405f-8cb2-fb9fb0fd346e",
            "name": "Paragraph breaks - final format check",
            "description": "If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\p, and \\m.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "ce33f6a6-b46c-4abe-a234-5fa6bbe06ea5",
            "name": "Layout and indents - final format check",
            "description": "Verify other layout issues such as poetry. Particular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools > Checklists > Compare Markers and look for the new paragraph markers such as \\q, \\q1 and \\q2.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "e66023ab-dc4d-4f5c-94a5-93fded851e7a",
            "name": "Special formatting - final format check",
            "description": "See list of special formatting issues such as genealogies, words on the cross, letters, etc. Verify that text is marked using the correct standard format markers (USFM). See http://paratext.org/about/usfm for latest guide to using USFMs.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "bf163865-a207-42b7-950e-b855539b9337",
            "name": "Consultant check - final items",
            "description": "Consultant will check any new supplementary materials such as maps, illustrations, front matter, and back matter.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "e09339d3-83e9-479e-a387-76b83067007d",
            "name": "Final approval from consultant",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "1cbff9af-07b6-4d6b-b970-aeb548b5b95a",
            "name": "Final read through and approval with church and community",
            "description": "This should use a draft produced by PA/InDesign so that the text is in close to final format.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "fdb55ea8-675a-4748-938e-29baeb639b04",
            "name": "Revise text based on final read through",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "a9a461dc-23c0-460c-a33b-8a5d49ea88e9",
            "name": "Do final typesetting",
            "description": "This task is not done by the translation team. It is done by a typesetter who is part of Global Printing Services (GPS).",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "d2159520-6cc0-4fcb-a7c2-e9c68a1b740e",
            "name": "Do audio recording",
            "description": "Ask your entity what partner organizations are in your area that do Scripture recordings.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 250,
              "easy": 250,
              "moderate": 200,
              "difficult": 150
            }
          }
        ]
      }
    ],
    "checks": []
  },
  {
    "id": "c3aa9e71-02d8-4f4b-aaf1-42a84d90c86d",
    "name": "SIL Compact Base Plan",
    "version": "2",
    "kind": "factory",
    "stages": [
      {
        "id": "9eddb82d-ed66-4e24-bdab-060dea2294de",
        "name": "Exegesis",
        "description": "Study the text carefully, using Paratext resources, recommended commentaries, and other recommended resources. The Translator's Workplace collection of resources contains many recommended resources that are not available in Paratext.  To learn more about Translator's Workplace and to see if you qualify for this collection of resources go to: https://www.sil.org/resources/publications/tw/licensing\n\nExegesis may involve: \n   ● chunking the text into meaningful units\n   ● identifying translation issues including key terms\n   ● identifying cultural issues\n   ● studying the meaning of key terms in the passage and considering what receptor      language rendering would be best for each sense of each term\n   ● oral retelling and processing of the text\n\n    Oral retelling can free the translator's mind from the form of the model language, creating a more natural translation. The basic process is first to study the text until you completely understand and have internalized the passage, then retelling the passage to other speakers of the receptor language. It is best to retell it in the vernacular without looking at the model text(s).  \n\nStudying key terms can be done in one of the Enhanced resources in Paratext, looking at the UBS handbook, the SIL translation notes, or a good Bible Dictionary such as those available in the Translator's Workplace collection or other source recommended by your supervisor.",
        "tasks": [
          {
            "id": "9f99673c-cb6a-4c05-a9cd-4629eb7f6b20",
            "name": "Exegesis",
            "description": "Study the text carefully, using Paratext resources, recommended commentaries, and other recommended resources. The Translator's Workplace collection of resources contains many recommended resources that are not available in Paratext.  To learn more about Translator's Workplace and to see if you qualify for this collection of resources go to: https://www.sil.org/resources/publications/tw/licensing\n\nExegesis may involve: \n   ● chunking the text into meaningful units\n   ● identifying translation issues including key terms\n   ● identifying cultural issues\n   ● studying the meaning of key terms in the passage and considering what receptor      language rendering would be best for each sense of each term\n   ● oral retelling and processing of the text\n\n    Oral retelling can free the translator's mind from the form of the model language, creating a more natural translation. The basic process is first to study the text until you completely understand and have internalized the passage, then retelling the passage to other speakers of the receptor language. It is best to retell it in the vernacular without looking at the model text(s).  \n\nStudying key terms can be done in one of the Enhanced resources in Paratext, looking at the UBS handbook, the SIL translation notes, or a good Bible Dictionary such as those available in the Translator's Workplace collection or other source recommended by your supervisor.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "43884fe5-7bea-43f0-9b62-f424963d3638",
            "name": "Create the first draft",
            "description": "Draft the text in Paratext using the natural patterns of the receptor language. Then re-read it to check for clear logical flow and typographical errors.\n\n    It is recommended to use the Biblical Terms Rendering window or an Enhanced Resource to see what renderings have been used and to add new renderings as needed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          }
        ]
      },
      {
        "id": "9443afef-8302-4727-8f85-1cb4ef464168",
        "name": "Exegetical check",
        "description": "The exegetical checking should include at least the following:\n   ●compare the draft with one or two translations in the national language\n   ●identify any missing verses or sentences\n   ●discuss exegetical choices that have been made in the translation\n   ●identify possible exegetical mistakes in the translation\n   ●adjust text as necessary to resolve any issues found",
        "tasks": [
          {
            "id": "3480d1ca-6ee7-40eb-a31e-f0e06dbf73a8",
            "name": "Exegetical check",
            "description": "The exegetical checking should include at least the following:\n   ●compare the draft with one or two translations in the national language\n   ●identify any missing verses or sentences\n   ●discuss exegetical choices that have been made in the translation\n   ●identify possible exegetical mistakes in the translation\n   ●adjust text as necessary to resolve any issues found",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "7bebeaeb-5932-4232-add9-22f60ac05007",
            "name": "Naturalness check",
            "description": "Read the draft aloud with the team. While reading the text, check the general flow of the discourse, its logic, chronology, participant reference, sentence length & rhythm, language style and register, etc. Adjust text as necessary to resolve any issues found.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "f501021c-2ae1-4579-a5a8-ceb9d63979c5",
            "name": "Draft supplementary materials",
            "description": "These materials may include: \n● section headings\n● footnotes\n● cross-references\n● illustrations (including captions)\n● maps\n● glossary entries\n● book introductions.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "427692d3-6cd1-450b-a90f-a09d64fa3610",
            "name": "Format check",
            "description": "The format checking should include at least the following:\n   ●Check the layout, indents, and special formatting.\n   ●Read the text and verify that the paragraph breaks are in the desired places.\n   ●If another translation is used as a base then this check can be done using \n     Tools> Checklists> Markers and look for the new paragraph markers such as \\p,             and \\m. \n\n●It may be useful to check the section headings using Tools> Checklists> Section Headings. \n\n●Consider verifying other types of formatting in your project, such as poetry,    genealogies, other lists, words on the cross or any other special formatting in your project.\n\nParticular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools > Checklists > Markers and by looking for the new paragraph markers such as \\q, \\q1, and \\q2. \n\n●Verify that text is marked using the correct standard format markers (USFMs) for any additional special formatting such as genealogies, lists, words on the cross, letters, etc.\n\nFor more information on how to correctly use the standard format markers (USFMs), see http://ubsicap.github.io/usfm/v2.5/index.html for the latest guide to the USFM 2.5 standard and https://ubsicap.github.io/usfm/ for the USFM 3.0 standard.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "75365725-9717-46de-85f9-413d44af9b59",
            "name": "Prepare for comprehension testing",
            "description": "Prepare comprehension testing questions: \n● Re-read the translation text\n● Draft general retell questions for comprehension testing\n● Identify possible issues of misunderstanding\n● Draft specific questions related to the main events in the passage, participant reference, key terms, foreign concepts, metaphors, rhetorical questions, inferential information, positive or negative associations, etc.\n\nThis task is different from the community reviewing in stage 5.  It uses a set of specific questions and retelling activities to see if the translation is communicating clearly and accurately the meaning of the source text.  Often a set of specific individuals who have been trained in comprehension testing are used.  Some translation consultants want this check done before they come for the consultant check, while others want to be present when the comprehension checking is performed.  You should adjust the project plan according to your team’s work flow.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "e2642958-0d86-450b-8c6d-df076b05ab5f",
            "name": "Perform comprehension testing",
            "description": "Perform comprehension testing, documenting feedback/answers for later analysis/review. Include supplementary materials in testing. The materials should all be tested with several different members of the language community.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 100,
              "easy": 85,
              "moderate": 70,
              "difficult": 60
            }
          },
          {
            "id": "17f2161c-086e-4016-975d-c58dfb7f55cf",
            "name": "Revise from feedback",
            "description": "The team reviews the results of the comprehension testing and incorporates changes to the text where appropriate. Repeat comprehension testing for revised passages as necessary.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          }
        ]
      },
      {
        "id": "20974cee-9f40-43c4-a0ae-5e733238e134",
        "name": "Draft the back translation",
        "description": "The back translation is created by someone who was not involved in the translation. The goal is to show how a reader will understand the text. It must be prepared without looking at any other translation or version or resource. The text is entered into the back translation project.",
        "tasks": [
          {
            "id": "0b6970df-00ce-4da4-a46a-28be4c7f2e6a",
            "name": "Draft the back translation",
            "description": "The back translation is created by someone who was not involved in the translation. The goal is to show how a reader will understand the text. It must be prepared without looking at any other translation or version or resource. The text is entered into the back translation project.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "7c50ab22-d2cb-415b-b5b7-be52aaf02016",
            "name": "Check back translation",
            "description": "The team should verify that back translation is complete, and mark all verses as finished in Paratext. Do not change the words used when checking the text.  Minor spelling problems are allowed.  The back translation is merely an aid for the consultant and will not be published in most cases.  Often it is the parts that appear to be poor grammar in the national language, that are most helpful for the consultant to see. However, spelling errors that are bad enough to prevent the consultant from understanding the back translation should be corrected.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 100,
              "easy": 85,
              "moderate": 70,
              "difficult": 60
            }
          }
        ]
      },
      {
        "id": "b270751c-03d8-463b-abbf-5c8e3c4a188b",
        "name": "Preliminary evaluation of text",
        "description": "The consultant receives the text in advance and makes preliminary evaluations. The consultant’s comments for the team are placed in the translation or back translation using project notes. The evaluation should focus on accuracy, clarity, naturalness, and acceptability of the translation. The consultant will also evaluate all supplementary materials and illustrations used. The team may review and implement suggestions made by the consultant prior to the direct interaction, if asked to do so by the consultant.",
        "tasks": [
          {
            "id": "fd6c2f9b-c34f-4762-bcd0-845ff03c1785",
            "name": "Preliminary evaluation of text",
            "description": "The consultant receives the text in advance and makes preliminary evaluations. The consultant’s comments for the team are placed in the translation or back translation using project notes. The evaluation should focus on accuracy, clarity, naturalness, and acceptability of the translation. The consultant will also evaluate all supplementary materials and illustrations used. The team may review and implement suggestions made by the consultant prior to the direct interaction, if asked to do so by the consultant.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 128,
              "moderate": 105,
              "difficult": 90
            }
          },
          {
            "id": "25931f1d-cc55-46c9-a3e8-8f0bea379b90",
            "name": "Consultant checking session",
            "description": "The consultant interacts with the translation team in a physical or virtual session. He or she makes observations about the text and supplementary materials, and gives assistance and advice as requested. \n\nThis task involves editing, and a member should be assigned to make changes during the session.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 128,
              "moderate": 105,
              "difficult": 90
            }
          },
          {
            "id": "9955d13b-4d77-4c77-81a3-a728bf11b77e",
            "name": "Revise from consultant feedback",
            "description": "If the consultant gave action items during the checking session, these need to be completed and marked as resolved. \n\nSome consultants may want to approve and mark as resolved the issues they think serious, while leaving the team to correct minor issues and marking them as resolved themselves. Some entities may have requirements about who may mark an issue resolved.  If your entity has specific requirements in this regard, then customize this plan accordingly.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 420,
              "easy": 360,
              "moderate": 300,
              "difficult": 240
            }
          },
          {
            "id": "c6f68e0f-7edd-4841-bf2a-502fd1dd6daf",
            "name": "Receive consultant approval",
            "description": "After implementing the changes, get the consultant's approval via the consultant report or appropriate means.  If approval is not granted, follow whatever remaining recommendations to satisfy the consultant.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "16385cc6-d555-4b29-b342-1f78a9853656",
        "name": "Review Biblical terms and revise",
        "description": "Community leaders, church leaders, and other community members discuss how key terms are rendered. The team discusses comments about key terms made at the community review and uses those changes they think are valid.\n\nConsider using Paratext lite on an Android tablet to collect information at comprehension testing meetings, and Scripture Forge for situations when the language community is in several different countries.",
        "tasks": [
          {
            "id": "ab24ebef-f715-4a6e-b505-b5c9172ba6c9",
            "name": "Review Biblical terms and revise",
            "description": "Community leaders, church leaders, and other community members discuss how key terms are rendered. The team discusses comments about key terms made at the community review and uses those changes they think are valid.\n\nConsider using Paratext lite on an Android tablet to collect information at comprehension testing meetings, and Scripture Forge for situations when the language community is in several different countries.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 420,
              "easy": 360,
              "moderate": 300,
              "difficult": 240
            }
          },
          {
            "id": "ad1e60e2-0340-4832-b914-16fc9c76c76e",
            "name": "Review for naturalness and revise",
            "description": "The community does a naturalness review of the audio or written text. The team discusses the suggestions from the naturalness review and makes any appropriate changes.\n\nConsider using Paratext lite on an Android tablet to collect information at comprehension testing meetings, and Scripture Forge for situations when the language community is in several different countries.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "ed3f57fb-e3de-4b13-bfe8-c9754d61e044",
            "name": "Report on community review",
            "description": "The team reports to the consultant on any textual or key terms changes made as a result of the community review.  Rationale for the changes should be included.  The team should open the Biblical terms tool and consult the notes, and history sections for the terms being reported on. It is best practice to enter this information in the tool as the changes were being discussed and decided on.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "c66ede6b-1e7b-4d55-b5c3-f8aff60217d7",
        "name": "Check and link glossary entries",
        "description": "For users to discover your glossary entries, the words must be marked for a print publication, or hyperlinked for digital publication.  Use the tools in Paratext to add the necessary markup, which will create hyperlinked entries or other highlighting in print to identify glossary words.",
        "tasks": [
          {
            "id": "b3877769-af37-45c4-b225-24c988148bff",
            "name": "Check and link glossary entries",
            "description": "For users to discover your glossary entries, the words must be marked for a print publication, or hyperlinked for digital publication.  Use the tools in Paratext to add the necessary markup, which will create hyperlinked entries or other highlighting in print to identify glossary words.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 420,
              "easy": 360,
              "moderate": 300,
              "difficult": 240
            }
          },
          {
            "id": "46f0f040-73ec-4789-a1e8-1747c131dcaf",
            "name": "Enter Publication Information",
            "description": "Open Project Properties for your project. Click on manage the Project Registration. This will take you to the entry for this project on the web. Go to the Publishing tab on the registration site and complete the information above the horizontal line.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "415f8694-6422-49ba-8c35-4935535ba98d",
            "name": "Submit to the DBL",
            "description": "Submit the text to the DBL.  For Wycliffe Global Alliance partners, the instructions are found at bit.ly/DBL-Submit \n\n<a href=\"https://bit.ly/DBL-Submit\">bit.ly/DBL-Submit</a> \n\nThis page explains how to prepare the text and has a link to a form to fill for the submission.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "a9a461dc-23c0-460c-a33b-8a5d49ea88e9",
            "name": "Publish",
            "description": "Publish the translation in the form and media you have chosen: print, audio, digital, etc. \n\nYou are encouraged to rename this task based on your publishing strategy and add other tasks as needed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          }
        ]
      }
    ],
    "checks": []
  },
  {
    "id": "ac0f7277-5315-408f-a4da-09f0bf591ec8",
    "name": "SILP Base Plan",
    "version": "1.7",
    "kind": "factory",
    "stages": [
      {
        "id": "9eddb82d-ed66-4e24-bdab-060dea2294de",
        "name": "Exegesis",
        "description": "Study the text carefully, using Paratext resources, recommended commentaries, and other resources (e.g. those found in Translator's Workplace).\nThis should involve: \n● chunking the text into meaningful units\n● identifying translation issues\n● identifying cultural issues\n● identifying and studying the meaning of key terms in the book/passage and considering what RL rendering would be best for each sense of a term\n\nIt may also involve:\n● oral retelling and processing of the text\n\nAfter understanding and internalizing the passage, it may be helpful to retell it in the vernacular without looking at the model text(s).  Doing this can free the translator's mind from the form of the model language, creating a more natural translation.",
        "tasks": [
          {
            "id": "9f99673c-cb6a-4c05-a9cd-4629eb7f6b20",
            "name": "Exegesis",
            "description": "Study the text carefully, using Paratext resources, recommended commentaries, and other resources (e.g. those found in Translator's Workplace).\nThis should involve: \n● chunking the text into meaningful units\n● identifying translation issues\n● identifying cultural issues\n● identifying and studying the meaning of key terms in the book/passage and considering what RL rendering would be best for each sense of a term\n\nIt may also involve:\n● oral retelling and processing of the text\n\nAfter understanding and internalizing the passage, it may be helpful to retell it in the vernacular without looking at the model text(s).  Doing this can free the translator's mind from the form of the model language, creating a more natural translation.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "43884fe5-7bea-43f0-9b62-f424963d3638",
            "name": "Create the first draft",
            "description": "Draft the text in Paratext using the natural patterns of the receptor language. Then re-read to check for natural flow and typographical errors. It is recommended to refer to Back Translations such as those in Translator’s Workplace for ideas, but these are not to be considered as exegetical resources.It is also recommended to use the Biblical Terms Rendering window or an Enhanced Resource to see what renderings have been used and to add new renderings as needed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          },
          {
            "id": "f501021c-2ae1-4579-a5a8-ceb9d63979c5",
            "name": "Draft supplementary materials",
            "description": "These materials may include: \n● section headings\n● footnotes\n● cross-references\n● illustrations (including captions)\n● maps\n● glossary entries\n● book introductions",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          }
        ]
      },
      {
        "id": "9443afef-8302-4727-8f85-1cb4ef464168",
        "name": "Accuracy/Exegetical check",
        "description": "Compare the draft with one or two translations in the national language or a fairly literal English version. See if any meaning of the Source Text has been omitted, added, or changed in the drafted translation. Discuss exegetical choices that have been made in the translation and identify possible exegetical mistakes. Discuss Biblical terms renderings as a team. Adjust text as necessary to resolve any issues found.",
        "tasks": [
          {
            "id": "3480d1ca-6ee7-40eb-a31e-f0e06dbf73a8",
            "name": "Accuracy/Exegetical check",
            "description": "Compare the draft with one or two translations in the national language or a fairly literal English version. See if any meaning of the Source Text has been omitted, added, or changed in the drafted translation. Discuss exegetical choices that have been made in the translation and identify possible exegetical mistakes. Discuss Biblical terms renderings as a team. Adjust text as necessary to resolve any issues found.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "7bebeaeb-5932-4232-add9-22f60ac05007",
            "name": "Naturalness check",
            "description": "Read the draft aloud with the team. While reading the text, check the general flow of the discourse, its logic, chronology, participant reference, sentence length & rhythm, language style and register, etc. Adjust text as necessary to resolve any issues found.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "427692d3-6cd1-450b-a90f-a09d64fa3610",
            "name": "Format check",
            "description": "Check the layout, indents, and special formatting.\nRead the text and verify that the paragraph breaks are in the desired places. If another translation is used as a base, then this check can be done using Tools >  Checklists > Markers and look for the new paragraph markers such as \\p, and \\m. \n\nIt may be useful to check the section headings using Tools >  Checklists > Section Headings. \n\nVerify other layout issues such as poetry. Particular attention should be given to poetry indentations. If another translation is used as a base then this check can be done using Tools >  Checklists > Markers and by looking for the new paragraph markers such as \\q, \\q1, and \\q2. \n\nSee list of special formatting issues such as genealogies, words on the cross, letters, etc. \n\nVerify that text is marked using the correct standard format markers (USFMs). See http://ubsicap.github.io/usfm/v2.5/index.html for the latest guide to the USFM 2.5 standard and https://ubsicap.github.io/usfm/ for the USFM 3.0 standard.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "75365725-9717-46de-85f9-413d44af9b59",
            "name": "Prepare for comprehension testing",
            "description": "Prepare comprehension testing questions: \n● Re-read the translation text\n● Draft general retell questions for comprehension testing\n● Identify possible issues of misunderstanding\n● Draft specific questions related to the main events in the passage, participant reference, key terms, foreign concepts, metaphors, rhetorical questions, inferential information, positive or negative associations, etc.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "e2642958-0d86-450b-8c6d-df076b05ab5f",
            "name": "Perform first comprehension test",
            "description": "Perform comprehension testing, documenting feedback/answers for later analysis/review. Include supplementary materials in testing.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 100,
              "easy": 85,
              "moderate": 70,
              "difficult": 60
            }
          },
          {
            "id": "e51f770f-2c83-43e8-a107-d41196014698",
            "name": "Perform second comprehension test",
            "description": "Perform a second comprehension test with different respondents.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "17f2161c-086e-4016-975d-c58dfb7f55cf",
            "name": "Revise from feedback",
            "description": "The team reviews the results of the comprehension testing and incorporates changes to the text where appropriate. Repeat comprehension testing for revised passages as necessary.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          }
        ]
      },
      {
        "id": "20974cee-9f40-43c4-a0ae-5e733238e134",
        "name": "Draft the back translation",
        "description": "The back translation is created by someone who was not involved in the translation. The goal is to show how a reader will understand the text. The text is entered into the back translation project. It must be prepared without looking at any other translation or version or resource.",
        "tasks": [
          {
            "id": "0b6970df-00ce-4da4-a46a-28be4c7f2e6a",
            "name": "Draft the back translation",
            "description": "The back translation is created by someone who was not involved in the translation. The goal is to show how a reader will understand the text. The text is entered into the back translation project. It must be prepared without looking at any other translation or version or resource.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "7c50ab22-d2cb-415b-b5b7-be52aaf02016",
            "name": "Check the back translation",
            "description": "● The team should verify that the back translation is complete, and mark all verses as finished in Paratext.\n\n● Someone who did not draft the back translation should check to be sure it accurately represents the RL draft.\n\n● As an additional check for accuracy, the team should also compare the back translation with a fairly literal version (national language or English). Make revisions in the RL draft if needed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 100,
              "easy": 85,
              "moderate": 70,
              "difficult": 60
            }
          },
          {
            "id": "3040e2e0-dea8-4708-a476-212c427f9089",
            "name": "Update the Biblical terms renderings",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "b270751c-03d8-463b-abbf-5c8e3c4a188b",
        "name": "Preliminary evaluation of text",
        "description": "The consultant receives the text in advance and makes preliminary evaluations. The consultant’s comments for the team are placed in the translation or back translation using project notes. The evaluation should focus on accuracy, clarity, naturalness, and acceptability of the translation. The consultant will also evaluate all supplementary materials and illustrations used.",
        "tasks": [
          {
            "id": "fd6c2f9b-c34f-4762-bcd0-845ff03c1785",
            "name": "Preliminary evaluation of text",
            "description": "The consultant receives the text in advance and makes preliminary evaluations. The consultant’s comments for the team are placed in the translation or back translation using project notes. The evaluation should focus on accuracy, clarity, naturalness, and acceptability of the translation. The consultant will also evaluate all supplementary materials and illustrations used.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 128,
              "moderate": 105,
              "difficult": 90
            }
          },
          {
            "id": "25931f1d-cc55-46c9-a3e8-8f0bea379b90",
            "name": "Consultant checking session",
            "description": "The consultant interacts with the translation team in a physical or virtual session. He or she makes observations about the text and supplementary materials, and gives assistance and advice as requested. \n\nThis task involves editing, and a member should be assigned to make changes during the session.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 150,
              "easy": 128,
              "moderate": 105,
              "difficult": 90
            }
          },
          {
            "id": "9955d13b-4d77-4c77-81a3-a728bf11b77e",
            "name": "Implement suggestions",
            "description": "If the consultant gave action items during the checking session, these need to be completed and approved by the consultant, who will then mark them as resolved.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 420,
              "easy": 360,
              "moderate": 300,
              "difficult": 240
            }
          },
          {
            "id": "c6f68e0f-7edd-4841-bf2a-502fd1dd6daf",
            "name": "Receive consultant approval",
            "description": "After implementing the changes, get the consultant's approval via the consultant report or appropriate means.  If approval is not granted, follow whatever remaining recommendations to satisfy the consultant.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "16385cc6-d555-4b29-b342-1f78a9853656",
        "name": "Community review",
        "description": "Community leaders, church leaders, and other community members review the audio or written text, especially for naturalness.  They are also invited to comment on words used in the translation that may not be in general usage, difficult to understand, etc.  This would include any key biblical terms that the reviewers may point out and discuss with the team.",
        "tasks": [
          {
            "id": "ad1e60e2-0340-4832-b914-16fc9c76c76e",
            "name": "Community review",
            "description": "Community leaders, church leaders, and other community members review the audio or written text, especially for naturalness.  They are also invited to comment on words used in the translation that may not be in general usage, difficult to understand, etc.  This would include any key biblical terms that the reviewers may point out and discuss with the team.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "ed3f57fb-e3de-4b13-bfe8-c9754d61e044",
            "name": "Report on community review",
            "description": "The team reports to the consultant on any textual or key terms changes made as a result of the community review.  Rationale for the changes should be included.  The team should open the Biblical terms tool and consult the notes, and history sections for the terms being reported on. It is best practice to enter this information in the tool as the changes were being discussed and decided on.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "c66ede6b-1e7b-4d55-b5c3-f8aff60217d7",
        "name": "Check and link glossary entries",
        "description": "For users to discover your glossary entries, the words must be marked for a print publication, or hyperlinked for digital publication.  Use the tools in Paratext to add the necessary markup, which will create hyperlinked entries or other highlighting in print to identify glossary words.",
        "tasks": [
          {
            "id": "b3877769-af37-45c4-b225-24c988148bff",
            "name": "Check and link glossary entries",
            "description": "For users to discover your glossary entries, the words must be marked for a print publication, or hyperlinked for digital publication.  Use the tools in Paratext to add the necessary markup, which will create hyperlinked entries or other highlighting in print to identify glossary words.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 420,
              "easy": 360,
              "moderate": 300,
              "difficult": 240
            }
          },
          {
            "id": "46f0f040-73ec-4789-a1e8-1747c131dcaf",
            "name": "Enter Publication Information",
            "description": "Open Project Properties for your project. Click on manage the Project Registration. This will take you to the entry for this project on the web. Go to the Publishing tab on the registration site and complete the information above the horizontal line.",
            "markComplete": "by-project",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "415f8694-6422-49ba-8c35-4935535ba98d",
            "name": "Submit to the DBL",
            "description": "Submit the text to the DBL.  For Wycliffe Global Alliance partners, the instructions are found at bit.ly/DBL-Submit. That page explains how to prepare the text and has a link to a form to fill in for the submission.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "a9a461dc-23c0-460c-a33b-8a5d49ea88e9",
            "name": "Publish",
            "description": "Publish the translation in the form and media you have chosen: print, audio, digital, etc. \n\nYou are encouraged to rename this task based on your publishing strategy and add other tasks as needed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          }
        ]
      }
    ],
    "checks": []
  },
  {
    "id": "21f4f750-3f6a-4b34-b015-4ad4de69a7ae",
    "name": "TSC Plan",
    "version": "9",
    "kind": "factory",
    "stages": [
      {
        "id": "1fee04f4-ddb8-4cfb-8a32-762328d6ba6c",
        "name": "Exegesis",
        "description": "",
        "tasks": [
          {
            "id": "cd202fa7-80f2-4925-8f9b-57a2f985c383",
            "name": "Exegesis",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "c14c2cd6-eed0-462d-99f5-c61585993516",
            "name": "Draft",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "e7c0a8fc-c55a-4ee6-ad29-6be54f5ad330",
            "name": "Keyboard Text in PT",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "c7e15989-2dbd-482d-b584-b9911c4c05a9",
            "name": "Draft Supplementary Helps",
            "description": "Draft Section Headings, Footnotes, Glossary Entries, Book Introductions, Illustrations.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "7d2a59e8-67e5-4a73-9080-27e3da4c1029",
        "name": "Team Check",
        "description": "",
        "tasks": [
          {
            "id": "f3a66e3a-7bdb-4aed-acee-c0bcca67c222",
            "name": "Team Check",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "8a91e112-9932-4beb-a9e7-318f48fa9fce",
            "name": "Team Check Key Terms",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "70673c7a-d735-4e76-8793-b55e6d6f92e4",
            "name": "Team Check Names, Numbers, Weights, Measures, etc.",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "a532bc19-a806-46ea-b093-0504d6232d18",
            "name": "Team Check Supplementary Helps",
            "description": "Team Check  Section Headings, Footnotes, Glossary Entries, Book Introductions, Illustrations.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "a74a2beb-d8f8-4c59-b8d2-36feb777ce46",
            "name": "First Testing",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "65ec15ba-b923-4dea-81c4-43b2581d232c",
            "name": "Revise Based on Feedback from Testing",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "fe0f2c67-06b7-42d6-91f7-2ed52c690940",
        "name": "Prepare Back-Translation",
        "description": "",
        "tasks": [
          {
            "id": "5fa6797f-88cc-4440-9026-6d7f5a9ea240",
            "name": "Prepare Back-Translation",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "c7b1c574-d645-4d3c-a3ec-45a37528031d",
            "name": "Keyboard Back-Translation in PT",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "96663ac1-8b4b-40e4-a135-ee7a2bbf4733",
            "name": "Team Check Back-Translation",
            "description": "Team Check Back-Translation, Revise Text and Back-Translation",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "scripture-text",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "c2523b4a-8267-495d-b903-f45d98ebe0f0",
        "name": "Create project notes",
        "description": "",
        "tasks": [
          {
            "id": "2ef0350c-1efd-46ff-9cd5-711b8fa81e1c",
            "name": "Create project notes",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "f06ce684-24c0-41e5-a493-0e93e78dc187",
            "name": "Consultant Check & preliminary approval",
            "description": "Consultant has place report on file.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "6dd794aa-bef3-44f7-a4c0-873fc2dc0708",
            "name": "Revise Back-Translation",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "3e4ce946-cfc3-4fe9-a32e-81c1606a918c",
        "name": "Community Testing",
        "description": "",
        "tasks": [
          {
            "id": "1f87c9fa-f873-40a1-af1b-27d2989f6a6a",
            "name": "Community Testing",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "063ebe9b-c4b8-4a1f-b7c0-a2e14bf097d0",
            "name": "Revise Based on Feedback from Community Testing",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "75bf7f7f-98c3-4ff8-8b16-dafe6cb62f66",
            "name": "Test Supplementary Helps",
            "description": "Test Supplementary Section Headings, Footnotes, Glossary Entries, Book Introductions, Illustrations.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "0bc2330f-a091-474a-a2d3-61e1d4882ea3",
            "name": "Test Key Terms for the whole book",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "7730a915-f701-4d7f-a2ff-a99b1308972f",
            "name": "Reviewer Check",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "0689ae35-2e95-4bf7-b477-9a2503bafc0d",
            "name": "Revise Based on Feedback from Reviewer Check",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "69893191-cff6-431a-81f5-24d0faf11426",
            "name": "Review Key Terms",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "1b5d67e2-860e-4586-8201-642a83a2426d",
            "name": "Review Supplementary Helps",
            "description": "Review Supplementary Helps Section Headings, Footnotes, Glossary Entries, Book Introductions, Illustrations.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "86ac513a-15c2-45c4-9603-9cde6008b6b5",
        "name": "Choose Illustrations and Write Captions",
        "description": "",
        "tasks": [
          {
            "id": "d5930bdc-a280-42ad-a5c5-709cf8b8813a",
            "name": "Choose Illustrations and Write Captions",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "802276a9-194c-4fb6-938e-786d6de3a911",
            "name": "Choose Maps and Label Place Names",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "94882c23-827a-45fb-8163-06af594b691b",
            "name": "Consistency Checks",
            "description": "Consistency Checks Proper Names, Check Numbers, Money, Weights, Measures, etc., Key Terms, Parallel Passages.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "c47f9c65-64f2-4177-8cd8-a4615c394069",
            "name": "Formatting Checks",
            "description": "Formatting Checks Review Section Breaks, Review Section Headings, Review Paragraph Breaks, Review Layout and Indents.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "4287f31d-a117-4ba0-8f51-8cf716af908a",
            "name": "Consultant Check Last Items",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "7aaa1652-ded5-4617-931f-0bd3203627d8",
            "name": "Final Approval from Consultant",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "6b140055-fcd8-4064-8c81-18235e5b46d4",
            "name": "Final Read-Through & Approval",
            "description": "Final Read-Through & Approval with church & community representatives.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "e35a9869-aabe-43ad-8f8b-85cf2d27a6bb",
            "name": "Final Typesetting",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "df9f4f8d-05da-4176-9517-56ca5c5b2d0b",
            "name": "Audio Recording",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      }
    ],
    "checks": []
  },
  {
    "id": "7e4cea18-4f66-4d4f-813c-a206b08e8502",
    "name": "UBS Standard Translation",
    "version": "1.0",
    "kind": "factory",
    "stages": [
      {
        "id": "1703c346-ce9e-427e-9476-9f3a8af26c67",
        "name": "Study and translate",
        "description": "Thorough exegesis at fundamental level",
        "tasks": [
          {
            "id": "97876b3b-e8b4-44f7-bdb4-e24d5072dbd6",
            "name": "Study and translate",
            "description": "Thorough exegesis at fundamental level",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 14,
              "easy": 12,
              "moderate": 10,
              "difficult": 8
            }
          }
        ]
      },
      {
        "id": "c132ac10-5985-4d99-8ad9-3e823809720a",
        "name": "Co-translator comments on translation",
        "description": "Thorough exegetical review, or second cycle of review",
        "tasks": [
          {
            "id": "a4d088eb-e23b-4294-9971-6024621ea486",
            "name": "Co-translator comments on translation",
            "description": "Thorough exegetical review, or second cycle of review",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 42,
              "easy": 36,
              "moderate": 30,
              "difficult": 24
            }
          },
          {
            "id": "05980b7f-dcef-4f7c-adbd-5d11db2635df",
            "name": "Drafter assesses co-translator comments",
            "description": "Input changes and assign notes back to co-translator",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "d28ae1e1-2b6c-47f1-8a20-159b3e96b1c8",
            "name": "Co-translator resolves or reassigns comments",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "2a64a7e8-052d-42f3-8e01-e44086f14090",
        "name": "Exegete comments on translation",
        "description": "",
        "tasks": [
          {
            "id": "7a640033-f4e0-4f91-801c-ed4bec253f5c",
            "name": "Exegete comments on translation",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 210,
              "easy": 180,
              "moderate": 150,
              "difficult": 120
            }
          },
          {
            "id": "f15d1946-c2b2-4090-9a78-43cafdb1df09",
            "name": "Drafter assesses exegetical comments",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "6121a691-f6e5-48bb-9224-205b93fcc3c4",
            "name": "Exegete resolves or reassigns comments",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "6a4b645f-a24c-41b0-8fe7-ceb2f3b34a50",
            "name": "Team delivers text to community reviewers",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "de2562d0-8a26-4da4-b38a-3473a1144e7d",
            "name": "Team assesses community comments",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "dbad86ec-fc46-4f93-a943-362155ccec49",
        "name": "Stylist/editor comments on text",
        "description": "",
        "tasks": [
          {
            "id": "d3cd428c-556f-4449-8c57-70b82db47278",
            "name": "Stylist/editor comments on text",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "79768302-5c5a-4e30-afdc-7d99260647aa",
            "name": "Drafter assesses stylist/editor comments",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "03959294-d8ea-43e0-be88-b2665fbf625f",
            "name": "Final (oral) reading of text",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "3056c2f9-2b84-40c1-8fd9-f569cda0f67d",
            "name": "Consultant gives final approval",
            "description": "",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      }
    ],
    "checks": []
  },
  {
    "id": "f1c03f36-ab68-4f6a-b472-5964bc2da43e",
    "name": "UBS Study Bible",
    "version": "1.0",
    "kind": "factory",
    "stages": [
      {
        "id": "ee9fbe0a-b5c2-4180-babd-d21d88e60755",
        "name": "create study notes",
        "description": "# Create comprehensive study materials\n## Define specific instructions\n- Read and study the entire book\n- Identify the historical context\n- Look at the source texts\n- Read other books (exegesis)\n- Identify keywords, add to glossary\n- Create articles and sidebars\n- Add cross-references\n- Select appropriate illustrations\n\n## Study, draft and polish\n***\n* considerations\n   - When/how do you refer to earlier information?\n   - Are categories for articles and notes defined?\n   - What consistency checks are necessary?",
        "tasks": [
          {
            "id": "044b17b7-2ea6-4077-afa7-1b3607863f9f",
            "name": "create study notes",
            "description": "# Create comprehensive study materials\n## Define specific instructions\n- Read and study the entire book\n- Identify the historical context\n- Look at the source texts\n- Read other books (exegesis)\n- Identify keywords, add to glossary\n- Create articles and sidebars\n- Add cross-references\n- Select appropriate illustrations\n\n## Study, draft and polish\n***\n* considerations\n   - When/how do you refer to earlier information?\n   - Are categories for articles and notes defined?\n   - What consistency checks are necessary?",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 25,
              "easy": 25,
              "moderate": 25,
              "difficult": 25
            }
          },
          {
            "id": "cc102a28-6bef-44a0-973a-382302ded608",
            "name": "write introductions",
            "description": "# Introductions\n## Book introductions\n* standardize titles, content and structure\n* use a marker template for each book\n\n## Section introductions\n- add main section titles\n- write introductions to sections\n\n## Introductions for groups of books\n- Introduction to the Study Bible\n- Bible, OT, NT\n- Pentateuch, Historical books, Poetry, Prophets\n- Gospels and Acts, Letters of Paul\n- The general letters and Revelation",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "5ee9fcbf-2736-4161-9dcd-a3f418b60297",
            "name": "write sidebars and articles",
            "description": "# Sidebars, articles and tables\n- what kind of materials you want to present in the sidebars and how to consistently phrase them\n- use categories if different content (studying, writing and polishing).",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "704889eb-0578-4a10-8ecc-fc4e7a1ccaf9",
        "name": "review first draft",
        "description": "## Comments by reviewer\n- insert project notes (flags)\n- assign notes to drafter\n- summarize issues for team discussion",
        "tasks": [
          {
            "id": "52710316-309d-4a47-9173-4d1153c34a27",
            "name": "review first draft",
            "description": "## Comments by reviewer\n- insert project notes (flags)\n- assign notes to drafter\n- summarize issues for team discussion",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 25,
              "easy": 25,
              "moderate": 25,
              "difficult": 25
            }
          },
          {
            "id": "f1faa5ae-988f-48f5-b5ce-3931ce96ac29",
            "name": "drafter responds",
            "description": "## Process notes from reviewer\n- the notes created in the previous task are reviewed by the original drafter\n   - adapt content and resolve the notes when suggestions are accepted\n   - otherwise, add your comment to the note and assign it to the team",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "fae1bcdb-8ac5-4ce0-a28f-307d3492ee11",
        "name": "team meeting",
        "description": "### Discuss unresolved comments from stage #2\n- discuss issues (project notes) that are not resolved\n- prepare for editorial and consultant checking\n---\n### review, work on extra materials\n* thematic index\n* maps, tables",
        "tasks": [
          {
            "id": "ad5d7396-8a04-4406-aa83-422896332506",
            "name": "team meeting",
            "description": "### Discuss unresolved comments from stage #2\n- discuss issues (project notes) that are not resolved\n- prepare for editorial and consultant checking\n---\n### review, work on extra materials\n* thematic index\n* maps, tables",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 40,
              "easy": 40,
              "moderate": 40,
              "difficult": 40
            }
          },
          {
            "id": "ae0ddffd-ca96-432b-b243-85df29a61c5d",
            "name": "editorial checking",
            "description": "## Guide for work\n- content, language, linguistic",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-task-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      },
      {
        "id": "1a3630e4-be85-4ba7-bbf8-ad5b7b64ca81",
        "name": "consultant checking",
        "description": "## Consultant checking\n- Check and finalize all the study materials (with team)\n---\nIn the final stage, the Translation Consultant (TC) and/or Global Translation Advisor (GTA) works closely with the editorial team to check and finalize all the study materials, ensuring that everything meets the highest standards of accuracy, clarity, and cultural relevance. \n\n* Sometimes, during the consultant checking sessions, we realise that some specific articles are still needed. In that case, we assign the task of producing it to the editorial team which has a better understanding of the reason why such extra material are needed.",
        "tasks": [
          {
            "id": "be393981-72a5-4299-8e80-1f6afb1fd898",
            "name": "consultant checking",
            "description": "## Consultant checking\n- Check and finalize all the study materials (with team)\n---\nIn the final stage, the Translation Consultant (TC) and/or Global Translation Advisor (GTA) works closely with the editorial team to check and finalize all the study materials, ensuring that everything meets the highest standards of accuracy, clarity, and cultural relevance. \n\n* Sometimes, during the consultant checking sessions, we realise that some specific articles are still needed. In that case, we assign the task of producing it to the editorial team which has a better understanding of the reason why such extra material are needed.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 150,
              "easy": 150,
              "moderate": 150,
              "difficult": 150
            }
          },
          {
            "id": "831f8e73-9feb-491f-8a49-140f94d5937f",
            "name": "advisory committee review",
            "description": "## Guide for work\n- content, language, linguistic",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          },
          {
            "id": "cebfb262-ada0-403d-a21c-1a103e22487f",
            "name": "final checking",
            "description": "# Guide for final checking\n\n- CAP checks\n- review category content\n- review extra materials\n---\n* The role of the CAP officer is crucial throughout the entire process, as most contributors have limited experience with using Paratext.",
            "markComplete": "by-chapter",
            "taskStart": "after-previous-stage-on-same-book",
            "requiresEditing": "no",
            "effort": {
              "easiest": 1000,
              "easy": 1000,
              "moderate": 1000,
              "difficult": 1000
            }
          }
        ]
      }
    ],
    "checks": []
  }
];
