import React from 'react';

/**
 * 3-column workspace shell used to host Paratext 10 Simple prototype stories.
 *
 * The active column ({@link columnIndex}) is shown normally; the other two are dimmed so
 * reviewers can see which column the story is exercising. A stub toolbar above the columns
 * communicates that BCV scroll-sync lives there — not inside any column. The Column 3 header
 * also renders a tiny tab strip stub (icons-as-pills) so stories that touch Column 3 show
 * the right surrounding chrome.
 *
 * Shared across Agents A/B/C — first writer wins; if it already exists, just import it.
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
      <div className="tw-flex tw-flex-1 tw-min-h-0">
        {cols.map((label, i) => {
          const focused = i === columnIndex;
          return (
            <div
              key={i}
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
              {focused ? <div className="tw-flex tw-min-h-0 tw-flex-1">{children}</div> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
