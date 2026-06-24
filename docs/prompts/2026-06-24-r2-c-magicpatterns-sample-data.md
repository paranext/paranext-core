# Vehicle C — Magic Patterns seed data (copy-paste)

This is the **seed dataset** that pairs with [`2026-06-24-r2-c-magicpatterns.md`](./2026-06-24-r2-c-magicpatterns.md). Magic Patterns cannot read this repo, so the fake data the prototype renders has to be embedded. Paste the build prompt first; then paste the JSON block below as the hard-coded fixture (`Seed this exact fake data`). Everything here is **invented** — it is grounded in the structure of the real SIL Compact Base Plan and the real Paratext `ProjectProgress.xml` model, but no real project names, person names, or scripture text were copied.

The plan structure (6 stages, their Tasks, and which Checks are required/notify-only in each stage) mirrors the real **SIL Compact Base Plan**. Per the corrected vocabulary (CONTEXT.md: **Check = automated, Review = human-judgment**), the two human-judgment stages and their human Tasks have been **relabeled to "Review"** for display — the underlying stage/task ids are unchanged from the real plan:

- Stage **"Team Check & Comprehension Check" → "Team Review & Comprehension Review"**
- Stage **"Consultant Check" → "Consultant Review"**
- Human Tasks carry `kind: "review"`; the editing Tasks that clear Issues carry `kind: "revision"`; producing-text Tasks carry `kind: "drafting"`. Automated Checks stay **Check**.

## Schema note

The shape is derived from Paratext's `ProjectProgress.xml` (`Stages → Stage(id) → BookStatus → CompletedChapters(BookNum) → <ChapRevId>` per chapter, plus per-task `Assignments` and book-difficulty info), flattened into JSON:

- **A unit's current stage is DERIVED, not stored.** For each chapter (or book/Priority) the current stage is the *earliest* stage that still has unfinished Tasks or unpassed required Checks. `progress[stageId][unitKey]` lists the chapters **completed in that stage** (the non-empty `ChapRevId` equivalent); a chapter absent from a stage's completed-set is "not done there". A chapter present in stage N's set but absent from stage N+1's is *currently in* stage N+1.
- **Task completion is per-chapter / per-book / per-project** (`markComplete`). Tasks within a stage start in `taskStart` order (`after-previous-stage-on-same-book` = first task of the stage; `after-previous-task-on-same-book` = serially after the prior task).
- **Check state is one of** `passing` (0 issues), `has-issues` (a count), or `stale` (was passing, text changed, needs re-run). Checks are `required` (gate the stage) or `notify-only`.
- **Review state** is a human Task: `available` / `in-progress` / `done`, and a Review may carry open **Comments** (each open Comment = an Issue cleared by a **Revision** task).
- **Assignment** per task is `{ kind: "person"|"anyone"|"team"|"unassigned", who? }`. **Solo** = assigned to me / Multiple-incl-me / Anyone (recommendable as Current Task). **Together** = Team (never recommended).

```json
{
  "signedInUserId": "saroj",
  "people": [
    { "id": "saroj", "name": "Saroj", "role": "Drafter", "isSignedInUser": true },
    { "id": "maria", "name": "Maria", "role": "Consultant" },
    { "id": "dilip", "name": "Dilip", "role": "Co-translator" },
    { "id": "anjali", "name": "Anjali", "role": "Back translator" }
  ],
  "checkCatalog": {
    "basic.chapter-verse-numbers": "Chapter / verse numbers",
    "basic.markers": "Markers",
    "basic.punctuation": "Punctuation",
    "basic.capitalization": "Capitalization",
    "basic.repeated-words": "Repeated words",
    "basic.unmatched-pairs": "Unmatched pairs of punctuation",
    "basic.matched-pairs": "Matched pairs of punctuation",
    "basic.quotations": "Quotations",
    "basic.numbers": "Numbers",
    "basic.characters": "Characters",
    "basic.references": "References",
    "spelling.spelling": "Spelling",
    "spelling.word-list": "Word list",
    "notes.translator": "Translator notes",
    "notes.consultant": "Consultant notes",
    "notes.spelling-discussion": "Spelling discussion",
    "notes.rendering-discussion": "Rendering discussion",
    "other.biblical-terms": "Biblical terms",
    "other.parallel-passages": "Parallel passages"
  },
  "plans": [
    {
      "id": "c3aa9e71-02d8-4f4b-aaf1-42a84d90c86d",
      "name": "SIL Compact Base Plan",
      "version": "2",
      "stages": [
        {
          "id": "9eddb82d-ed66-4e24-bdab-060dea2294de",
          "order": 1,
          "name": "Drafting",
          "tasks": [
            { "id": "9f99673c-cb6a-4c05-a9cd-4629eb7f6b20", "name": "Exegesis", "kind": "drafting", "markComplete": "by-chapter", "taskStart": "after-previous-stage-on-same-book", "requiresEditing": false },
            { "id": "43884fe5-7bea-43f0-9b62-f424963d3638", "name": "Create the first draft", "kind": "drafting", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": true }
          ],
          "checks": [
            { "checkId": "basic.chapter-verse-numbers", "requirement": "required" },
            { "checkId": "basic.markers", "requirement": "required" },
            { "checkId": "notes.translator", "requirement": "required" },
            { "checkId": "spelling.spelling", "requirement": "required" }
          ]
        },
        {
          "id": "9443afef-8302-4727-8f85-1cb4ef464168",
          "order": 2,
          "name": "Team Review & Comprehension Review",
          "originalName": "Team Check & Comprehension Check",
          "tasks": [
            { "id": "3480d1ca-6ee7-40eb-a31e-f0e06dbf73a8", "name": "Exegetical review", "originalName": "Exegetical check", "kind": "review", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": true },
            { "id": "7bebeaeb-5932-4232-add9-22f60ac05007", "name": "Naturalness review", "originalName": "Naturalness check", "kind": "review", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": true },
            { "id": "f501021c-2ae1-4579-a5a8-ceb9d63979c5", "name": "Draft supplementary materials", "kind": "drafting", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": true },
            { "id": "427692d3-6cd1-450b-a90f-a09d64fa3610", "name": "Format review", "originalName": "Format check", "kind": "review", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": true },
            { "id": "75365725-9717-46de-85f9-413d44af9b59", "name": "Prepare for comprehension testing", "kind": "drafting", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": false },
            { "id": "e2642958-0d86-450b-8c6d-df076b05ab5f", "name": "Perform comprehension testing", "kind": "review", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": true },
            { "id": "17f2161c-086e-4016-975d-c58dfb7f55cf", "name": "Revise from feedback", "kind": "revision", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": true }
          ],
          "checks": [
            { "checkId": "notes.consultant", "requirement": "required" },
            { "checkId": "basic.characters", "requirement": "required" },
            { "checkId": "basic.punctuation", "requirement": "required" },
            { "checkId": "basic.capitalization", "requirement": "required" },
            { "checkId": "basic.repeated-words", "requirement": "required" },
            { "checkId": "basic.unmatched-pairs", "requirement": "required" },
            { "checkId": "basic.matched-pairs", "requirement": "required" },
            { "checkId": "basic.quotations", "requirement": "required" },
            { "checkId": "basic.numbers", "requirement": "required" },
            { "checkId": "other.biblical-terms", "requirement": "required" },
            { "checkId": "spelling.word-list", "requirement": "required" }
          ]
        },
        {
          "id": "20974cee-9f40-43c4-a0ae-5e733238e134",
          "order": 3,
          "name": "Preparing for Consultant",
          "tasks": [
            { "id": "0b6970df-00ce-4da4-a46a-28be4c7f2e6a", "name": "Draft the back translation", "kind": "drafting", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": true },
            { "id": "7c50ab22-d2cb-415b-b5b7-be52aaf02016", "name": "Check back translation", "kind": "review", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": true }
          ],
          "checks": []
        },
        {
          "id": "b270751c-03d8-463b-abbf-5c8e3c4a188b",
          "order": 4,
          "name": "Consultant Review",
          "originalName": "Consultant Check",
          "tasks": [
            { "id": "fd6c2f9b-c34f-4762-bcd0-845ff03c1785", "name": "Preliminary evaluation of text", "kind": "review", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": true },
            { "id": "consultant-session-task-id", "name": "Consultant checking session", "kind": "review", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": true },
            { "id": "9955d13b-4d77-4c77-81a3-a728bf11b77e", "name": "Revise from consultant feedback", "kind": "revision", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": true },
            { "id": "c6f68e0f-7edd-4841-bf2a-502fd1dd6daf", "name": "Receive consultant approval", "kind": "review", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": false }
          ],
          "checks": []
        },
        {
          "id": "16385cc6-d555-4b29-b342-1f78a9853656",
          "order": 5,
          "name": "Community Review",
          "tasks": [
            { "id": "ab24ebef-f715-4a6e-b505-b5c9172ba6c9", "name": "Review Biblical terms and revise", "kind": "review", "markComplete": "by-chapter", "taskStart": "after-previous-stage-on-same-book", "requiresEditing": true },
            { "id": "ad1e60e2-0340-4832-b914-16fc9c76c76e", "name": "Review for naturalness and revise", "kind": "review", "markComplete": "by-chapter", "taskStart": "after-previous-stage-on-same-book", "requiresEditing": true },
            { "id": "ed3f57fb-e3de-4b13-bfe8-c9754d61e044", "name": "Report on community review", "kind": "drafting", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": false }
          ],
          "checks": [
            { "checkId": "basic.references", "requirement": "required" },
            { "checkId": "notes.spelling-discussion", "requirement": "required" },
            { "checkId": "notes.rendering-discussion", "requirement": "required" }
          ]
        },
        {
          "id": "c66ede6b-1e7b-4d55-b5c3-f8aff60217d7",
          "order": 6,
          "name": "Final Preparation for Publication",
          "tasks": [
            { "id": "b3877769-af37-45c4-b225-24c988148bff", "name": "Check and link glossary entries", "kind": "drafting", "markComplete": "by-chapter", "taskStart": "after-previous-stage-on-same-book", "requiresEditing": true },
            { "id": "46f0f040-73ec-4789-a1e8-1747c131dcaf", "name": "Enter Publication Information", "kind": "drafting", "markComplete": "by-project", "taskStart": "after-previous-task-on-same-book", "requiresEditing": false },
            { "id": "publish-submit-dbl-task-id", "name": "Submit to the DBL", "kind": "drafting", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": false },
            { "id": "publish-task-id", "name": "Publish", "kind": "drafting", "markComplete": "by-chapter", "taskStart": "after-previous-task-on-same-book", "requiresEditing": false }
          ],
          "checks": [
            { "checkId": "other.parallel-passages", "requirement": "required" }
          ]
        }
      ]
    },
    { "id": "EMPTY_PROJECT_PLAN", "name": null, "version": null, "stages": [] }
  ],
  "projects": [
    {
      "id": "proj-tamarind",
      "name": "Tamarind New Testament",
      "language": "Vellari",
      "planId": "c3aa9e71-02d8-4f4b-aaf1-42a84d90c86d",
      "team": ["saroj", "maria", "dilip", "anjali"],
      "books": [
        { "bookId": "PHP", "name": "Philippians", "chapters": 4, "difficulty": "moderate" },
        { "bookId": "TIT", "name": "Titus", "chapters": 3, "difficulty": "easy" },
        { "bookId": "PHM", "name": "Philemon", "chapters": 1, "difficulty": "easiest" },
        { "bookId": "MRK", "name": "Mark", "chapters": 16, "difficulty": "difficult" },
        { "bookId": "MAT", "name": "Matthew", "chapters": 28, "difficulty": "difficult" },
        { "bookId": "LUK", "name": "Luke", "chapters": 24, "difficulty": "difficult" }
      ],
      "priorities": [
        {
          "id": "priority-birth-narrative",
          "name": "Birth Narrative",
          "order": 1,
          "members": [
            { "bookId": "MAT", "chapters": [1, 2] },
            { "bookId": "LUK", "chapters": [1, 2] }
          ]
        }
      ],
      "comments": [
        {
          "id": "cmt-php2-1",
          "reviewTaskId": "3480d1ca-6ee7-40eb-a31e-f0e06dbf73a8",
          "bookId": "PHP",
          "chapter": 2,
          "author": "dilip",
          "status": "open",
          "text": "Verse 6 — the rendering for 'form of God' reads ambiguously; reconsider the key term."
        },
        {
          "id": "cmt-php2-2",
          "reviewTaskId": "3480d1ca-6ee7-40eb-a31e-f0e06dbf73a8",
          "bookId": "PHP",
          "chapter": 2,
          "author": "dilip",
          "status": "open",
          "text": "Verse 10 — 'every knee should bow' lost its parallelism; check against the source."
        }
      ],
      "progress": {
        "9eddb82d-ed66-4e24-bdab-060dea2294de": {
          "PHP": [1, 2, 3, 4],
          "TIT": [1, 2, 3],
          "PHM": [1],
          "MAT": [1, 2, 3],
          "LUK": [1, 2]
        },
        "9443afef-8302-4727-8f85-1cb4ef464168": {
          "PHP": [1],
          "TIT": [1, 2, 3],
          "PHM": [1],
          "MAT": [1]
        },
        "20974cee-9f40-43c4-a0ae-5e733238e134": {
          "PHP": [1],
          "TIT": [1, 2, 3],
          "PHM": [1]
        },
        "b270751c-03d8-463b-abbf-5c8e3c4a188b": {
          "PHP": [1],
          "TIT": [1, 2, 3]
        },
        "16385cc6-d555-4b29-b342-1f78a9853656": {
          "TIT": [1, 2, 3]
        },
        "c66ede6b-1e7b-4d55-b5c3-f8aff60217d7": {}
      },
      "units": [
        {
          "unitKey": "PHP-1",
          "bookId": "PHP",
          "chapter": 1,
          "currentStageId": "16385cc6-d555-4b29-b342-1f78a9853656",
          "currentStageName": "Community Review",
          "justAdvancedToStage": false,
          "ratchetNote": "Already advanced through earlier stages — a passed stage does not un-pass. The stale Check below just needs a re-run (forward-ratchet + staleness story).",
          "taskStates": [
            { "taskId": "ab24ebef-f715-4a6e-b505-b5c9172ba6c9", "state": "available", "assignment": { "kind": "team" }, "group": "together" },
            { "taskId": "ad1e60e2-0340-4832-b914-16fc9c76c76e", "state": "waiting", "assignment": { "kind": "team" }, "group": "together" },
            { "taskId": "ed3f57fb-e3de-4b13-bfe8-c9754d61e044", "state": "waiting", "assignment": { "kind": "person", "who": "saroj" }, "group": "solo" }
          ],
          "checkStates": [
            { "checkId": "basic.references", "state": "passing", "issues": 0, "requirement": "required" },
            { "checkId": "notes.spelling-discussion", "state": "passing", "issues": 0, "requirement": "required" },
            { "checkId": "notes.rendering-discussion", "state": "passing", "issues": 0, "requirement": "required" },
            { "checkId": "spelling.word-list", "state": "stale", "issues": 0, "requirement": "notify-only", "staleNote": "Was passing; text was edited after it last passed — needs a re-run." }
          ]
        },
        {
          "unitKey": "PHP-2",
          "bookId": "PHP",
          "chapter": 2,
          "currentStageId": "9443afef-8302-4727-8f85-1cb4ef464168",
          "currentStageName": "Team Review & Comprehension Review",
          "justAdvancedToStage": false,
          "isFocalChapter": true,
          "taskStates": [
            { "taskId": "3480d1ca-6ee7-40eb-a31e-f0e06dbf73a8", "state": "has-issues", "assignment": { "kind": "person", "who": "dilip" }, "group": "together", "openComments": 2, "note": "Co-translator Review by Dilip — 2 open Comments to clear by Revision." },
            { "taskId": "7bebeaeb-5932-4232-add9-22f60ac05007", "state": "available", "assignment": { "kind": "person", "who": "saroj" }, "group": "solo" },
            { "taskId": "f501021c-2ae1-4579-a5a8-ceb9d63979c5", "state": "waiting", "assignment": { "kind": "anyone" }, "group": "solo" },
            { "taskId": "427692d3-6cd1-450b-a90f-a09d64fa3610", "state": "waiting", "assignment": { "kind": "anyone" }, "group": "solo" },
            { "taskId": "75365725-9717-46de-85f9-413d44af9b59", "state": "waiting", "assignment": { "kind": "person", "who": "saroj" }, "group": "solo" },
            { "taskId": "e2642958-0d86-450b-8c6d-df076b05ab5f", "state": "available", "assignment": { "kind": "person", "who": "saroj" }, "group": "solo", "note": "Comprehension Review available for you to perform." },
            { "taskId": "17f2161c-086e-4016-975d-c58dfb7f55cf", "state": "waiting", "assignment": { "kind": "person", "who": "saroj" }, "group": "solo" }
          ],
          "checkStates": [
            { "checkId": "spelling.word-list", "state": "has-issues", "issues": 12, "requirement": "required" },
            { "checkId": "basic.quotations", "state": "passing", "issues": 0, "requirement": "required" },
            { "checkId": "other.biblical-terms", "state": "has-issues", "issues": 5, "requirement": "required" },
            { "checkId": "notes.consultant", "state": "passing", "issues": 0, "requirement": "required" },
            { "checkId": "basic.punctuation", "state": "passing", "issues": 0, "requirement": "required" }
          ],
          "laterTasks": [
            { "taskId": "9955d13b-4d77-4c77-81a3-a728bf11b77e", "name": "Revise from consultant feedback", "availableAfter": "Consultant Review", "stageId": "b270751c-03d8-463b-abbf-5c8e3c4a188b" }
          ]
        },
        {
          "unitKey": "PHP-3",
          "bookId": "PHP",
          "chapter": 3,
          "currentStageId": "9eddb82d-ed66-4e24-bdab-060dea2294de",
          "currentStageName": "Drafting",
          "justAdvancedToStage": false,
          "taskStates": [
            { "taskId": "9f99673c-cb6a-4c05-a9cd-4629eb7f6b20", "state": "done", "assignment": { "kind": "person", "who": "saroj" }, "group": "solo" },
            { "taskId": "43884fe5-7bea-43f0-9b62-f424963d3638", "state": "available", "assignment": { "kind": "person", "who": "saroj" }, "group": "solo", "note": "Your next step — plain drafting in progress." }
          ],
          "checkStates": [
            { "checkId": "basic.chapter-verse-numbers", "state": "passing", "issues": 0, "requirement": "required" },
            { "checkId": "basic.markers", "state": "passing", "issues": 0, "requirement": "required" },
            { "checkId": "notes.translator", "state": "passing", "issues": 0, "requirement": "required" },
            { "checkId": "spelling.spelling", "state": "passing", "issues": 0, "requirement": "required" }
          ]
        },
        {
          "unitKey": "PHP-4",
          "bookId": "PHP",
          "chapter": 4,
          "currentStageId": "9eddb82d-ed66-4e24-bdab-060dea2294de",
          "currentStageName": "Drafting",
          "justAdvancedToStage": false,
          "blocksTeammate": {
            "teammateId": "maria",
            "teammateTaskId": "fd6c2f9b-c34f-4762-bcd0-845ff03c1785",
            "teammateTaskName": "Preliminary evaluation of text",
            "teammateStageName": "Consultant Review",
            "reason": "Maria is ready and waiting to start her Consultant Review of Philippians 4, but it is blocked until your Drafting is done."
          },
          "taskStates": [
            { "taskId": "9f99673c-cb6a-4c05-a9cd-4629eb7f6b20", "state": "done", "assignment": { "kind": "person", "who": "saroj" }, "group": "solo" },
            { "taskId": "43884fe5-7bea-43f0-9b62-f424963d3638", "state": "available", "assignment": { "kind": "person", "who": "saroj" }, "group": "solo", "note": "Finishing this unblocks Maria's Consultant Review." }
          ],
          "checkStates": [
            { "checkId": "basic.chapter-verse-numbers", "state": "passing", "issues": 0, "requirement": "required" },
            { "checkId": "basic.markers", "state": "passing", "issues": 0, "requirement": "required" },
            { "checkId": "notes.translator", "state": "passing", "issues": 0, "requirement": "required" },
            { "checkId": "spelling.spelling", "state": "has-issues", "issues": 3, "requirement": "required" }
          ]
        },
        {
          "unitKey": "MAT-1",
          "bookId": "MAT",
          "chapter": 1,
          "priorityId": "priority-birth-narrative",
          "currentStageId": "9443afef-8302-4727-8f85-1cb4ef464168",
          "currentStageName": "Team Review & Comprehension Review",
          "justAdvancedToStage": false,
          "taskStates": [
            { "taskId": "3480d1ca-6ee7-40eb-a31e-f0e06dbf73a8", "state": "available", "assignment": { "kind": "person", "who": "saroj" }, "group": "solo" }
          ],
          "checkStates": [
            { "checkId": "spelling.word-list", "state": "passing", "issues": 0, "requirement": "required" },
            { "checkId": "other.biblical-terms", "state": "has-issues", "issues": 2, "requirement": "required" }
          ]
        },
        {
          "unitKey": "MAT-2",
          "bookId": "MAT",
          "chapter": 2,
          "priorityId": "priority-birth-narrative",
          "currentStageId": "9eddb82d-ed66-4e24-bdab-060dea2294de",
          "currentStageName": "Drafting",
          "justAdvancedToStage": false,
          "taskStates": [
            { "taskId": "9f99673c-cb6a-4c05-a9cd-4629eb7f6b20", "state": "available", "assignment": { "kind": "person", "who": "saroj" }, "group": "solo" }
          ],
          "checkStates": [
            { "checkId": "basic.markers", "state": "passing", "issues": 0, "requirement": "required" }
          ]
        },
        {
          "unitKey": "LUK-1",
          "bookId": "LUK",
          "chapter": 1,
          "priorityId": "priority-birth-narrative",
          "currentStageId": "9443afef-8302-4727-8f85-1cb4ef464168",
          "currentStageName": "Team Review & Comprehension Review",
          "justAdvancedToStage": true,
          "advancedFromStageId": "9eddb82d-ed66-4e24-bdab-060dea2294de",
          "advanceNote": "All Drafting work is complete with no open issues — Luke 1 has cleanly reached Team Review & Comprehension Review.",
          "taskStates": [
            { "taskId": "3480d1ca-6ee7-40eb-a31e-f0e06dbf73a8", "state": "available", "assignment": { "kind": "person", "who": "saroj" }, "group": "solo", "note": "First task of the new stage — exegetical Review available." }
          ],
          "checkStates": [
            { "checkId": "spelling.word-list", "state": "passing", "issues": 0, "requirement": "required" },
            { "checkId": "other.biblical-terms", "state": "passing", "issues": 0, "requirement": "required" },
            { "checkId": "notes.consultant", "state": "passing", "issues": 0, "requirement": "required" }
          ]
        },
        {
          "unitKey": "LUK-2",
          "bookId": "LUK",
          "chapter": 2,
          "priorityId": "priority-birth-narrative",
          "currentStageId": "9eddb82d-ed66-4e24-bdab-060dea2294de",
          "currentStageName": "Drafting",
          "justAdvancedToStage": false,
          "taskStates": [
            { "taskId": "9f99673c-cb6a-4c05-a9cd-4629eb7f6b20", "state": "waiting", "assignment": { "kind": "anyone" }, "group": "solo" }
          ],
          "checkStates": []
        }
      ],
      "editorPlaceholder": {
        "bookId": "PHP",
        "chapter": 2,
        "reference": "Philippians 2",
        "verses": [
          { "n": 1, "text": "If there is any encouragement among you, any comfort, any sharing of one spirit, any deep care for one another," },
          { "n": 2, "text": "then make my gladness complete: be of one mind, holding the same love, joined in heart and purpose." },
          { "n": 3, "text": "Do nothing out of rivalry or empty pride, but in humility regard one another as more important than yourselves." },
          { "n": 4, "text": "Let each of you look not only to your own interests, but also to the interests of others." }
        ],
        "note": "Placeholder text only — invented, not a real translation or copyrighted scripture."
      }
    },
    {
      "id": "proj-saffron",
      "name": "Saffron Gospels Draft",
      "language": "Kovari",
      "planId": "EMPTY_PROJECT_PLAN",
      "team": ["saroj"],
      "books": [
        { "bookId": "JHN", "name": "John", "chapters": 21, "difficulty": "moderate" }
      ],
      "priorities": [],
      "comments": [],
      "progress": {},
      "units": [],
      "noPlanFallback": {
        "currentTaskIndicatorText": "No plan set",
        "zeroStateHeading": "This project has no project plan yet",
        "zeroStateBody": "A project plan lays out the stages, tasks, and checks a chapter passes through, so you always know your next step.",
        "ctas": [
          { "label": "Learn the value of a project plan", "action": "learn" },
          { "label": "Contact your project admin", "action": "contact" }
        ]
      }
    }
  ],
  "recommendation": {
    "note": "Current Task precedence: (0) unblock a teammate, else (1) first available unfinished Solo task in the chapter in view. Never recommend from Together.",
    "examples": [
      { "whenViewing": "PHP-4", "recommendedTaskId": "43884fe5-7bea-43f0-9b62-f424963d3638", "becauseRule": 0, "framing": "Your next step: finish Drafting on Philippians 4 to unblock Maria's Consultant Review." },
      { "whenViewing": "PHP-3", "recommendedTaskId": "43884fe5-7bea-43f0-9b62-f424963d3638", "becauseRule": 1, "framing": "Your next step: Create the first draft for Philippians 3." },
      { "whenViewing": "PHP-2", "recommendedTaskId": "e2642958-0d86-450b-8c6d-df076b05ab5f", "becauseRule": 1, "framing": "Your next step: perform the comprehension Review on Philippians 2." },
      { "whenViewing": "PHP-1", "recommendedTaskId": null, "becauseRule": 1, "framing": "Philippians 1 has reached Community Review — its remaining work is Together (team), so there is no Solo next step for you here." }
    ]
  }
}
```

## Book × stage spread (reviewer eyeball)

Project 1 = **Tamarind New Testament** (SIL Compact Base Plan). Each cell is the unit's *current* stage (the earliest stage with unfinished work). Stages: 1 Drafting · 2 Team Review & Comprehension Review · 3 Preparing for Consultant · 4 Consultant Review · 5 Community Review · 6 Final Preparation for Publication.

| Unit | Current stage | Notes |
| --- | --- | --- |
| Philippians 1 | 5 Community Review | **Forward-ratchet + staleness** story: carries a **stale** `spelling.word-list` Check (reopened). Does NOT demonstrate NN6 (that is Luke 1) |
| Philippians 2 | 2 Team Review & Comprehension Review | **Dense focal chapter**: comprehension Review available; co-translator Review w/ 2 open Comments; `spelling.word-list` 12 issues; `basic.quotations` passing; `other.biblical-terms` 5 issues; later "Available after Consultant Review" task |
| Philippians 3 | 1 Drafting | Plain next case |
| Philippians 4 | 1 Drafting | **Blocks Maria's** Consultant Review (drives "unblock a teammate") |
| Titus 1–3 | 4 Consultant Review | Near-done book (all 3 chapters together) |
| Philemon 1 | 3 Preparing for Consultant | Mid-pipeline single-chapter book |
| Mark 1–16 | 1 Drafting | Barely started large book (only ch. 1–3 partly drafted) |
| Matthew 1 | 2 Team Review & Comprehension Review | Priority "Birth Narrative"; `other.biblical-terms` 2 issues |
| Matthew 2 | 1 Drafting | Priority "Birth Narrative" |
| Matthew 3 | 1 Drafting | Outside the Priority |
| Luke 1 | 2 Team Review & Comprehension Review | Priority "Birth Narrative"; **dedicated NN6 chapter** — **just cleanly advanced** from Drafting with no open issues ("reached the next stage") |
| Luke 2 | 1 Drafting | Priority "Birth Narrative" (not yet started) |

Project 2 = **Saffron Gospels Draft** — **no plan** (`EMPTY_PROJECT_PLAN`), used only for the no-plan fallback.

> Priority **"Birth Narrative"** = Matthew 1–2 + Luke 1–2, with its own small spread (Matthew 1 and Luke 1 in stage 2 — Luke 1 the **dedicated NN6 "just reached the next stage"** chapter — the rest in Drafting).
</content>
</invoke>
