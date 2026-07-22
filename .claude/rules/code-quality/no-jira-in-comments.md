## No Jira Issue References in Code Comments

Do not include Jira issue IDs (e.g. `PT-1234`) in code comments — **except** inside TODO comments.

Issue references rot: tickets close, context disappears, and future readers are left with a dead link that explains nothing. The right home for "this change was made because of PT-1234" is the commit message or PR description, not the source file.

### The one exception — TODOs

A TODO may include an issue ID to signal exactly when the deferred work can be cleaned up:

```ts
// TODO(PT-1234): Remove this workaround once the upstream bug is fixed
```

### What to do instead

- Explain the *why* in plain language: the constraint, invariant, or surprising behavior that warranted the comment.
- Put the ticket reference in the commit message or PR body.
- If the only purpose of the comment is to credit a ticket, delete the comment.
