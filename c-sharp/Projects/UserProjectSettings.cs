using System.Xml.Linq;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Manages per-user project settings stored in
/// <c>{projectDirectory}/Extensions/UserSettings-{userId}.xml</c>.
/// </summary>
internal sealed class UserProjectSettings
{
    private readonly string _userId;
    private readonly string _filePath;
    private XDocument? _document;
    private readonly object _lock = new();

    public UserProjectSettings(string projectDirectory, string userId)
    {
        _userId = userId;
        _filePath = Path.Combine(projectDirectory, "Extensions", $"UserSettings-{userId}.xml");
    }

    /// <summary>
    /// Gets the schema version and content element for the named setting.
    /// Returns <c>(null, null)</c> if the file or element is absent.
    /// </summary>
    public (string? schemaVersion, XElement? content) GetSetting(string xmlElementName)
    {
        lock (_lock)
        {
            EnsureLoaded();
            XElement? settingEl = _document!.Root?.Element(xmlElementName);

            if (settingEl == null)
                return (null, null);

            string? version = settingEl.Attribute("dataSchemaVersion")?.Value;
            XElement? content = settingEl.Element("Items");
            return (version, content);
        }
    }

    /// <summary>
    /// Upserts the named setting element with the given schema version and content.
    /// Creates the file and <c>Extensions/</c> directory if they don't exist.
    /// </summary>
    public void SetSetting(string xmlElementName, string schemaVersion, XElement content)
    {
        lock (_lock)
        {
            EnsureLoaded();
            XElement root = _document!.Root!;
            XElement? existing = root.Element(xmlElementName);
            if (existing != null)
                existing.Remove();

            root.Add(
                new XElement(
                    xmlElementName,
                    new XAttribute("dataSchemaVersion", schemaVersion),
                    content
                )
            );

            Save();
        }
    }

    /// <summary>Removes the named setting element if present.</summary>
    public void RemoveSetting(string xmlElementName)
    {
        lock (_lock)
        {
            EnsureLoaded();
            _document!.Root?.Element(xmlElementName)?.Remove();
            if (File.Exists(_filePath))
                Save();
        }
    }

    private void EnsureLoaded()
    {
        if (_document != null)
            return;

        if (File.Exists(_filePath))
        {
            _document = XDocument.Load(_filePath);
        }
        else
        {
            _document = new XDocument(
                new XDeclaration("1.0", "utf-8", null),
                new XElement("UserSettings")
            );
        }
    }

    private void Save()
    {
        string? dir = Path.GetDirectoryName(_filePath);
        if (dir != null && !Directory.Exists(dir))
            Directory.CreateDirectory(dir);

        _document!.Save(_filePath);
    }
}
