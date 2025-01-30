using Microsoft.Extensions.Configuration;
using Paranext.DataProvider.Users;
using Paratext.Data.ProjectFileAccess;
using Paratext.Data.Users;
using PtxUtils;

namespace Paranext.DataProvider.Projects.DigitalBibleLibrary;

/// <summary>
/// Adapted from ParatextZippedResourcePasswordProvider
/// </summary>
internal class DblResourcePasswordProvider : IZippedResourcePasswordProvider
{
    private string? _cachedValue;

    public static bool IsPasswordAvailable()
    {
        if (RegistrationInfo.DefaultUser.IsValid)
            return true;

        IConfigurationRoot config = new ConfigurationBuilder()
            .AddUserSecrets<DblResourcePasswordProvider>()
            .Build();

        return !string.IsNullOrEmpty(config["DblResourceBase64-DO-NOT-SHARE"])
            && !string.IsNullOrEmpty(config["DblResourceHash-DO-NOT-SHARE"]);
    }

    public string GetPassword()
    {
        if (!RegistrationInfo.DefaultUser.IsValid)
        {
            // Throwing an exception here is invisible to users because ParatextData swallows it
            // Log the message instead in case it is helpful for someone troubleshooting
            Console.WriteLine(RegistrationRequiredException.ExceptionMessage);
            return "This is not the correct password";
        }

        IConfigurationRoot config = new ConfigurationBuilder()
            .AddUserSecrets<DblResourcePasswordProvider>()
            .Build();

        // Run the following from the command line to set a config value (quotes are important):
        //     dotnet user-secrets set "<secret name>" "<secret value>"
        // DO NOT share the secret values, including checking in code, texts, emails, DMs, etc.
        _cachedValue ??= StringUtils.DecryptStringFromBase64(
            config["DblResourceBase64-DO-NOT-SHARE"] ?? "",
            config["DblResourceHash-DO-NOT-SHARE"] ?? ""
        );
        return _cachedValue;
    }
}
