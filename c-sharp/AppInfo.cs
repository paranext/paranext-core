using System.Text.Json.Serialization;

namespace Paranext.DataProvider;

/// <summary>
/// Information about the app that is currently running.
/// All of the information in this object is static and is determined at build time. It will not
/// change throughout the lifetime of the app or across runs of the same build.
///
/// This is the C# equivalent of the TypeScript `AppInfo` type.
/// </summary>
[method: JsonConstructor]
public readonly struct AppInfo(string name, string version, string uriScheme)
{
    /// <summary>
    /// Programmatic name of the application.
    ///
    /// Example: `platform-bible`
    /// </summary>
    public string Name { get; } = name;

    /// <summary>
    /// Version of the app. This is in [semver](https://semver.org/) format.
    ///
    /// Example: `0.3.0`
    ///
    /// Example: `1.2.3-ordered.info.here+additional.unordered.info.here123`
    /// </summary>
    public string Version { get; } = version;

    /// <summary>
    /// URI scheme that this application handles. Navigating to a URI with this scheme will open this
    /// application
    /// </summary>
    public string UriScheme { get; } = uriScheme;
}
