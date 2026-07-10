import { Label } from 'platform-bible-react';

/** Props for {@link ScriptureTextGridEmptyState}. */
export type ScriptureTextGridEmptyStateProps = {
  /** Localized directional copy telling the user how to add texts (points at the View Options icon). */
  prompt: string;
};

/**
 * Centered directional copy shown in the Scripture Text Grid body when there is nothing renderable.
 * Points the user at the View Options button in the header. Purely presentational — the web view
 * owns the decision of when to render it (see the empty conditional in
 * `scripture-text-grid.web-view`).
 */
export function ScriptureTextGridEmptyState({ prompt }: ScriptureTextGridEmptyStateProps) {
  return (
    <div
      data-testid="scripture-text-grid-empty-state"
      className="tw:flex tw:h-full tw:items-center tw:justify-center tw:p-4"
    >
      <Label className="tw:text-center tw:text-muted-foreground">{prompt}</Label>
    </div>
  );
}

export default ScriptureTextGridEmptyState;
