import rule from './dialog-scroll-container';
import { ruleTester } from '../test.utils';

ruleTester.run('dialog-scroll-container', rule, {
  valid: [
    // No DialogContent — rule doesn't fire.
    {
      code: `<div><BookGridSelector /></div>`,
    },
    // DialogContent with no list descendant — rule doesn't fire.
    {
      code: `<DialogContent><DialogHeader><DialogTitle>X</DialogTitle></DialogHeader></DialogContent>`,
    },
    // DialogContent with list + scroll boundary on intermediate <form>.
    {
      code: `
        <DialogContent className="tw:max-h-[90vh] tw:flex tw:flex-col">
          <form className="tw:flex tw:flex-1 tw:flex-col tw:overflow-y-auto tw:min-h-0">
            <BookGridSelector />
          </form>
        </DialogContent>
      `,
    },
    // Scroll boundary on the DialogContent itself.
    {
      code: `
        <DialogContent className="tw:max-h-[90vh] tw:overflow-y-auto">
          <BookGridSelector />
        </DialogContent>
      `,
    },
    // overflow-auto (not just overflow-y-auto) also counts.
    {
      code: `
        <DialogContent>
          <div className="tw:overflow-auto">
            <table />
          </div>
        </DialogContent>
      `,
    },
    // List wrapped in a fragment — scroll boundary still recognized through fragment.
    {
      code: `
        <DialogContent>
          <div className="tw:overflow-y-auto">
            <>
              <RestoreFileList />
            </>
          </div>
        </DialogContent>
      `,
    },
    // Conditional render with scroll boundary in both branches.
    {
      code: `
        <DialogContent>
          <div className="tw:overflow-y-auto">
            {hasData ? <BookGridSelector /> : <RestoreFileList />}
          </div>
        </DialogContent>
      `,
    },
    // List inside DialogContent but ALSO inside a non-Dialog parent (rule shouldn't apply to non-Dialog cases).
    // This isn't really a "valid" DialogContent case — included as a regression check that the walker stops at lists.
    {
      code: `
        <DialogContent>
          <div className="tw:overflow-y-auto">
            <BookGridSelector />
          </div>
        </DialogContent>
      `,
    },
  ],
  invalid: [
    // The RestoreForm bug: DialogContent + form + RestoreFileList, no overflow-y-auto on the form.
    {
      code: `
        <DialogContent className="tw:max-h-[90vh] tw:flex tw:flex-col">
          <form className="tw:flex tw:flex-col tw:gap-3">
            <RestoreFileList />
          </form>
        </DialogContent>
      `,
      errors: [{ messageId: 'missingScrollContainer', data: { listName: 'RestoreFileList' } }],
      output: `
        <DialogContent className="tw:max-h-[90vh] tw:flex tw:flex-col">
          <form className="tw:flex tw:flex-col tw:gap-3 tw:overflow-y-auto tw:min-h-0">
            <RestoreFileList />
          </form>
        </DialogContent>
      `,
    },
    // Direct child list, no wrapping div with overflow. The fixer adds className to
    // DialogContent itself (since it's the immediate parent of the list). This is acceptable
    // POC behavior — a future iteration of the rule could insert a wrapping <div> instead so
    // dialog positioning isn't affected by scroll.
    {
      code: `
        <DialogContent>
          <BookGridSelector />
        </DialogContent>
      `,
      errors: [{ messageId: 'missingScrollContainer', data: { listName: 'BookGridSelector' } }],
      output: `
        <DialogContent className="tw:overflow-y-auto tw:min-h-0">
          <BookGridSelector />
        </DialogContent>
      `,
    },
    // Wrapped in div, but div has no className.
    {
      code: `
        <DialogContent className="tw:max-h-[80vh]">
          <div>
            <table />
          </div>
        </DialogContent>
      `,
      errors: [{ messageId: 'missingScrollContainer', data: { listName: 'table' } }],
      output: `
        <DialogContent className="tw:max-h-[80vh]">
          <div className="tw:overflow-y-auto tw:min-h-0">
            <table />
          </div>
        </DialogContent>
      `,
    },
    // List inside a conditional render, no scroll boundary.
    {
      code: `
        <DialogContent>
          <section className="tw:flex tw:flex-col">
            {showList && <RestoreFileList />}
          </section>
        </DialogContent>
      `,
      errors: [{ messageId: 'missingScrollContainer', data: { listName: 'RestoreFileList' } }],
      output: `
        <DialogContent>
          <section className="tw:flex tw:flex-col tw:overflow-y-auto tw:min-h-0">
            {showList && <RestoreFileList />}
          </section>
        </DialogContent>
      `,
    },
  ],
});
