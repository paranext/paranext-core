## Creating Jira Issues — Fill the Template, Don't Overwrite It

Platform.Bible work is tracked in the **Paratext (`PT`) Jira project** on
`paratextstudio.atlassian.net`, reached through the Atlassian MCP server (OAuth — no API token, and
issues are created under the signed-in user's own account and permissions).

When you create an issue there, the project applies **that work-item type's default description
template**, and it **replaces whatever description you passed in the create call**. Each work-item
type (Combined, Dev Task, Sub-task, Bug, …) has its own template and the templates change over
time, so never assume their shape or hard-code their sections — read the live template off the
issue you just created.

### Process for the description

1. **Create the issue first** with the summary (and type/parent). Don't rely on the description you
   pass to the create call — it won't survive.
2. **Read the created issue's description back.** That is the current, authoritative template for
   that work-item type.
3. **Fit your content into the template's sections** — keep its headings and scaffold, and fill
   each section with the relevant part of what you wrote. Put anything that doesn't map cleanly
   under the closest section rather than deleting a heading. Populate the template; don't replace it
   with a different shape.
4. **Push the filled-in description** with an edit call — a post-create edit overrides the template
   reliably.
5. **Re-read and verify** the sections now hold your content instead of the empty placeholders. If
   they're still empty or unchanged, the edit didn't take — stop and report rather than leaving a
   blank templated stub.

The template you read back might look something like the following — this is only an illustration of
the *shape*, not the sections to expect:

```
### User Story
...
### Definition of Done
...
```

### Also worth knowing

- Resolve the site's `cloudId` at call time (you can pass the hostname `paratextstudio.atlassian.net`
  as `cloudId`); don't hard-code it.
- The Atlassian MCP toolset can create / edit / comment / transition but **cannot delete** issues —
  test or mistaken issues must be deleted by hand or transitioned to a closed state.
