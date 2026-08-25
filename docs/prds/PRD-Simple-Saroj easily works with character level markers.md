**Saroj easily works with character-level markers.**

Product Requirements Document

| Owner                     | Todd                                        | Status                   | Shaping        |
| :------------------------ | :------------------------------------------ | :----------------------- | :------------- |
| **Appetite**              | 2                                           | **Last Updated**         | 2026-07-20     |
| **Timing Considerations** | \[ Internal or External Commitments Made \] | **Implementation Owner** | Jolie Rabideau |

_Appetite is a budget, not an estimate. It defines how much time this problem is worth._

# **1\. The Problem**

_What is the customer pain or opportunity? Ground this in real user behavior, not feature requests. A good problem statement makes the solution feel obvious._

When Saroj works with Paratext 10-Simple to edit a text, he needs to be able to use character markers to label certain bits of text for special formatting. He can do this by entering a backslash with the keyboard, but this is not very discoverable. Saroj needs Paratext to give him an easy, discoverable way to label bits of text.

## **Who has this problem?**

_Describe the specific users or segments affected. Be concrete._

Primarily Saroj, as the intended user of 10-Simple.

## **How do we know?**

_What evidence do we have? Support tickets, session recordings, user interviews, data. Link to sources. If the evidence is thin, say so._

The experiences of users in user experience testing.

## **What happens if we do nothing?**

_This forces honesty about urgency and helps with prioritization._

Users will have a more difficult time getting their text formatted correctly and may lose confidence in the ability of Paratext 10 to meet their needs. Word of mouth may slow the migration of users from Paratext 9 to 10\.

# **2\. Appetite & Boundaries**

**\*Shape Up concept:** We’re fixing the time and flexing the scope. This section defines the box we’re working inside.\*

**Appetite (Developer Weeks): 2**

If the solution can’t fit in this box, we narrow scope — not extend the timeline.

| Non-negotiables                                                                                                                                           | Nice-to-haves                                                                                                                                            | No-gos                                                                                                                                                    |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _Must be in any version we ship_ Provide UI to change, delete, add character level markers in a usable way (propose similar to magic patterns prototype). | _Cut these first when time is tight_ UI does not overlap project text, so user can see where the marker(s) will be inserted in context of other markers. | _Explicitly out of scope_ Ensure that the same UI is available for footnotes and cross-refs.                                                              |
| UI for deleting markers only removes markers, not the content within markers.                                                                             |                                                                                                                                                          | Ensure that the suggested markers are context-sensitive and markers that don’t fit the context (as defined by the style sheets) are not shown as options. |

# **3\. Shaped Solution**

_This is the shaped concept — enough direction to be useful, rough enough to leave room for builders to figure out the details. Think breadboard-level, not pixel-perfect._

## **How it works**

_Describe the core flow in plain language. Use a simple numbered walkthrough, a rough sketch, or a breadboard diagram. Avoid specifying UI details unless they’re load-bearing._

## **Key interactions**

_Call out the 2–3 moments that matter most. Where does the user make a decision? Where could they get confused? Where does data flow between systems? Links to key UX mock-ups_

## **Rabbit holes**

_Things that look simple but aren’t. Call these out so the team doesn’t get pulled in._

| Rabbit Hole                                                       | Why It’s Risky                                                   | Suggested Approach                                                         |
| :---------------------------------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------- |
| e.g. Syncing state across tabs                                    | Could burn a week on edge cases                                  | Don’t support in v1 — show “refresh” message                               |
| Positioning the UI in a way that works for both Simple and Power. | Getting agreement on an approach for both might exceed appetite. | Do what is needed for Simple, and let Power team improve it, if necessary. |

# **4\. Risks**

**\*Inspired framework:** Every product idea has four categories of risk. Be honest about where this one is weakest.\*

| Risk Type                                          | Level | Notes                                                                                                                     |
| :------------------------------------------------- | :---: | :------------------------------------------------------------------------------------------------------------------------ |
| **Value — Will users choose to use this?**         |  🟢   | Simple users without prior experience with P9 will likely begin using this until they learn the faster keyboard shortcut. |
| **Usability — Can users figure it out?**           |  🟢   | That’s the goal of this epic.                                                                                             |
| **Feasibility — Can we build it in the appetite?** |  🟡   | Most likely...                                                                                                            |
| **Viability — Does it work for the business?**     |  🟢   | Yes.                                                                                                                      |

## **What discovery have we done (or should we do)?**

_Prototype tests, technical spikes, competitor analysis, etc. If you skipped discovery, say why._

# **5\. Technical Context**

_Just enough for engineering to start thinking — not a spec. The team will fill in the real details during build._

## **Systems involved**

_List services, databases, APIs, or third-party dependencies that will be touched._

## **Known constraints**

_Performance requirements, backward compatibility, migration needs, regulatory considerations._

## **Open technical questions**

_Things the team needs to investigate during build. It’s fine to have these — better to name them than pretend they don’t exist._

**Changelog**

| Date      | Author       | What Changed     |
| :-------- | :----------- | :--------------- |
| 7/20/2026 | Todd Hoatson | Initial Creation |
|           |              |                  |

**Template notes:** _This template borrows from two frameworks. [Shape Up](https://basecamp.com/shapeup/1.5-chapter-06) (Basecamp) contributes appetite over estimates, fixed-time/variable-scope, shaping before building, rabbit holes, and no-gos. [Inspired](https://www.svpg.com/books/inspired-how-to-create-tech-products-customers-love-2nd-edition/) (Marty Cagan) contributes the focus on outcomes over outputs, the four-risk framework, and the emphasis on discovery before delivery. The goal is a document light enough to actually get written, specific enough to align a team, and honest enough to surface risks early._
