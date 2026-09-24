namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Raw tooltip data for hovering over a linked word in the Enhanced Resources scripture pane.
///
/// Pure data source: only fields directly available from the ER files. The TS presenter
/// (extensions/src/platform-enhanced-resources/src/presenters/tooltip-presenter.ts) shapes
/// this into a UI-ready view model; the markdown emitter
/// (scripture-pane.component.tsx renderTooltipMarkdown) handles localization, format-string
/// substitution, and markdown layout. No transliteration, no gloss filtering, no POS
/// localization happens here.
///
/// PT9 reference: MarbleForm.cs:2692 (GetTooltip).
/// Spec: working-docs/2026-05-15-er-editor-integration-followup-design.md §5b.
/// </summary>
public record TooltipData(
    string SourceForm,
    string Lemma,
    string PartOfSpeechRaw,
    IReadOnlyList<string> RawGlosses,
    RenderingStatus? RenderingStatus
);
