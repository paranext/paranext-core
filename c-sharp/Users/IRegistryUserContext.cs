namespace Paranext.DataProvider.Users;

/// <summary>
/// Reads <see cref="RegistryUserSnapshot"/>. Tests use a fake because ParatextData can't produce a
/// valid registration without real codes, and its internet status can make network calls.
/// </summary>
internal interface IRegistryUserContext
{
    Task<RegistryUserSnapshot> GetSnapshotAsync();
}
