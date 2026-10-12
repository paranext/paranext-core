namespace Paranext.DataProvider.Checks;

/// <summary>
/// Whether a check is ready to run on a project. This record must serialize to the CheckSetupState
/// type defined in TypeScript.
/// </summary>
/// <param name="Status">One of the <see cref="CheckSetupStatus"/> status values</param>
/// <param name="Reason">
/// Only when <see cref="CheckSetupStatus.NotApplicable"/>: localized string key saying why the
/// check does not apply to the project
/// </param>
internal sealed record CheckSetupState(string Status, string? Reason = null);
