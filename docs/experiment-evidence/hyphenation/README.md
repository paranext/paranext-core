# Hyphenation Port — Live Verification Evidence

Screenshots captured from a live headless Platform.Bible instance (CDP/Playwright) while
exercising the Hyphenation tool end-to-end against a real project (`HYPHTEST`, a WEB copy with a
seeded PT9-format `hyphenatedWords.txt`). Referenced from the experiment PR description.

| File                               | What it shows                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| 01-editor-tools-menu.png           | Scripture editor hamburger menu with the new "Hyphenation..." entry                               |
| 02-hyphenation-tool-opened.png     | Hyphenation tool opened via the menu, showing seeded PT9 entries with approved checkboxes         |
| 03-add-dialog-validation-error.png | Add dialog rejecting `ex=apmle` for word `example` with the PT9 validation message, Save disabled |
| 04-add-dialog-valid.png            | Same dialog after correcting to `ex=am=ple` (error cleared, Save enabled)                         |
| 05-after-add.png                   | New `example` entry in the list, approved                                                         |
| 06-after-approve-toggle.png        | `created` toggled to approved via the checkbox                                                    |
| 07-filter-and-after-delete.png     | Filter box narrowing to `ear` after deleting `waters`                                             |

This folder exists only as experiment-PR evidence; remove it if this branch is ever taken to a
real merge.
