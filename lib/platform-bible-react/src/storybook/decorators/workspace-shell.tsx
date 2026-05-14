import * as React from 'react';

/**
 * Three-column shell that approximates Paratext 10 Simple's workspace chrome for Storybook
 * decorators.
 *
 * Renders three columns: Model Text (0), Editor (1), Resources & Tools (2). The non-focused columns
 * are dimmed and empty so the story can focus the reviewer's attention on a single column. A stub
 * toolbar at the top reminds reviewers where the BCV control lives — it is intentionally NOT in any
 * column.
 *
 * Column 3 shows a small icon-tab strip ("Bible", "Commentaries"). These are visual stubs; the
 * strip is rendered by the shell, not by the story, because the PRD requires tab headers not to
 * look draggable / not to mimic PT10Power tab chrome.
 */
export function WorkspaceShell({
  children,
  columnIndex,
  column3TabIcons = ['Bible', 'Commentaries'],
}: {
  children: React.ReactNode;
  columnIndex: 0 | 1 | 2;
  column3TabIcons?: string[];
}) {
  const cols = ['Model Text', 'Editor', 'Resources & Tools'];
  return (
    <div className="tw-flex tw-h-[600px] tw-w-full tw-flex-col tw-border tw-bg-background tw-font-sans">
      {/* stub toolbar so the BCV control's location is visible */}
      <div className="tw-flex tw-h-9 tw-items-center tw-border-b tw-px-3 tw-text-xs tw-text-muted-foreground">
        [main toolbar — BCV control lives here, not in columns]
      </div>
      <div className="tw-flex tw-min-h-0 tw-flex-1">
        {cols.map((label, i) => {
          const focused = i === columnIndex;
          return (
            <div
              key={label}
              className={[
                'tw-flex tw-min-w-0 tw-flex-1 tw-flex-col',
                i < 2 ? 'tw-border-r' : '',
                focused ? 'tw-bg-background' : 'tw-bg-muted/30 tw-opacity-40',
              ].join(' ')}
            >
              <div className="tw-flex tw-h-8 tw-items-center tw-justify-between tw-border-b tw-px-3 tw-text-[11px] tw-text-muted-foreground">
                <span>{label}</span>
                {i === 2 && (
                  <span className="tw-flex tw-gap-1">
                    {column3TabIcons.map((t) => (
                      <span key={t} className="tw-rounded tw-border tw-px-1.5 tw-py-0.5">
                        {t}
                      </span>
                    ))}
                  </span>
                )}
              </div>
              {focused ? <div className="tw-flex tw-min-h-0 tw-flex-1">{children}</div> : undefined}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WorkspaceShell;
