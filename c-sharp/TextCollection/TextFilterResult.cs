namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Result of text eligibility filtering (EXT-003).
/// </summary>
public record TextFilterResult(IList<TextCollectionItem> Accepted, IList<RejectedText> Rejected);

/// <summary>
/// A rejected text with the reason for rejection.
/// </summary>
public record RejectedText(string ScrTextName, string ScrTextId, string Reason);
