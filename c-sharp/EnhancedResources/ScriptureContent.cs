namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// The rendered content for the scripture pane (top half of the ER window).
/// Includes HTML body, footnotes, raw tokens, warning banners, and optional copyright.
/// </summary>
/// <remarks>
/// Contract: data-contracts.md ScriptureContent record
/// CAP-013 (GetScriptureContent), BHV-601 (Footnote HTML), BHV-311 (Hover highlighting)
/// </remarks>
public record ScriptureContent(
    string BodyHtml,
    string FootnoteHtml,
    IReadOnlyList<MarbleToken> Tokens,
    IReadOnlyList<WarningBanner> ActiveBanners,
    string? CopyrightHtml
);
