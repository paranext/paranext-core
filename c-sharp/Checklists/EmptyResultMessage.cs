using System.Collections.Generic;

namespace Paranext.DataProvider.Checklists;

/// <summary>
/// RED-phase skeleton. See data-contracts.md §3.8.
/// </summary>
public record EmptyResultMessage(
    string Variant,
    string Message,
    IReadOnlyList<string>? SearchedMarkers,
    IReadOnlyList<string>? SearchedBooks
);
