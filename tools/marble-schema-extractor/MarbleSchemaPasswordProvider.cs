using Microsoft.Extensions.Configuration;
using Paratext.Data.ProjectFileAccess;
using PtxUtils;

namespace MarbleSchemaExtractor;

/// <summary>
/// Reads the same User Secrets used by Paranext.DataProvider's DblResourcePasswordProvider,
/// decrypts in memory, and returns the password for SharpZipLib. Never logs/writes/echoes.
/// </summary>
internal sealed class MarbleSchemaPasswordProvider : IZippedResourcePasswordProvider
{
    private const string Base64Key = "DblResourceBase64-DO-NOT-SHARE";
    private const string HashKey = "DblResourceHash-DO-NOT-SHARE";
    private const string BenignPlaceholder = "This is not the correct password";

    private readonly IConfiguration _config;
    private readonly Func<bool> _isRegistrationValid;
    private string? _cachedValue;

    public MarbleSchemaPasswordProvider(IConfiguration config, Func<bool> isRegistrationValid)
    {
        _config = config;
        _isRegistrationValid = isRegistrationValid;
    }

    public string GetPassword()
    {
        if (!_isRegistrationValid())
            return BenignPlaceholder;

        string? base64 = _config[Base64Key];
        string? hash = _config[HashKey];
        if (string.IsNullOrEmpty(base64) || string.IsNullOrEmpty(hash))
            return BenignPlaceholder;

        _cachedValue ??= StringUtils.DecryptStringFromBase64(base64, hash);
        return _cachedValue;
    }
}

internal static class MarbleSchemaPasswordProviderFactory
{
    public static MarbleSchemaPasswordProvider CreateForRuntime()
    {
        IConfiguration config = new ConfigurationBuilder()
            .AddUserSecrets<MarbleSchemaPasswordProvider>()
            // Fall back to data provider's own secrets ID — same secret values, different ID
            .AddUserSecrets("1860f020-31dd-4eb4-81c4-323eb0cb3e48")
            .Build();

        return new MarbleSchemaPasswordProvider(
            config,
            () => Paratext.Data.Users.RegistrationInfo.DefaultUser.IsValid
        );
    }
}
