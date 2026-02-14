namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Information needed to confirm book deletion.
/// </summary>
/// <remarks>
/// Ported from PT9/Paratext/ToolsMenu/DeleteBooksForm.cs (EXT-009)
/// Maps to: CAP-004, BHV-T012, BHV-308
/// </remarks>
/// <param name="Message">Confirmation message to display.</param>
/// <param name="DefaultToNo">Whether the default button should be No (for safety).</param>
/// <param name="IsSharedProject">Whether the project is S/R enabled.</param>
public record DeleteConfirmation(string Message, bool DefaultToNo, bool IsSharedProject);
