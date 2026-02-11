namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Result of a permission check operation.
/// </summary>
/// <remarks>
/// Ported from PT9/Paratext/ToolsMenu/CreateBooksForm.cs (EXT-001)
/// Maps to: CAP-015, BHV-107, BHV-112
/// </remarks>
/// <param name="Success">Whether permission was granted for all requested books.</param>
/// <param name="ErrorMessage">User-friendly error message if permission denied.</param>
/// <param name="UnauthorizedBooks">List of book numbers that the user cannot create.</param>
public record PermissionResult(bool Success, string? ErrorMessage, List<int> UnauthorizedBooks);
