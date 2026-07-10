/** Props for {@link ScriptureTextGridEmptyState}. */
export type ScriptureTextGridEmptyStateProps = {
  /** Localized prompt directing the user to open View Options to choose which texts to show. */
  prompt: string;
};

/**
 * Centered directional copy shown in the Scripture Text Grid body when there is nothing renderable.
 * Points the user at the View Options button in the header. Purely presentational — the web view
 * decides when to render it (the `resources.length === 0` branch in
 * `scripture-text-grid.web-view`).
 */
export function ScriptureTextGridEmptyState({ prompt }: ScriptureTextGridEmptyStateProps) {
  return (
    <div
      data-testid="scripture-text-grid-empty-state"
      className="tw:flex tw:h-full tw:items-center tw:justify-center tw:p-4"
    >
      {/* `role="status"` announces the message to screen readers when the grid becomes empty. */}
      <p role="status" className="tw:text-center tw:text-sm tw:text-muted-foreground">
        {prompt}
      </p>
    </div>
  );
}
