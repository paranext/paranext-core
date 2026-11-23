namespace Paranext.DataProvider.Checks;

/// <summary>
/// A check that could not run during a check job, with the message it gave. The other checks in the
/// job still ran. This record must serialize to the CheckJobError type defined in TypeScript.
/// </summary>
internal sealed record CheckJobError(string CheckId, string Message);
