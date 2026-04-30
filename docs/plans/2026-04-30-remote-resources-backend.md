# Remote Resources Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add C# backend support for fetching, installing, and uninstalling `EnhancedResource`, `XmlResource`, and `SourceLanguageResource` types from `https://media.paratext.org/`.

**Architecture:** A new `RemoteResourcesDataProvider` mirrors `DblResourcesDataProvider`. It fetches per-type XML manifests (cached 24 h locally), wraps each manifest entry in a `PlatformInstallableRemoteResource` (subclassing `InstallableResource`), and exposes four PAPI functions. Credentials are stored in .NET user secrets alongside the existing DBL secrets.

**Tech Stack:** C# / .NET 8, ParatextData NuGet 9.5.0.22 (`InstallableResource`, `ScrTextCollection`, `IRESTClient`, `RESTClient`), NUnit 4.0.1, `Microsoft.Extensions.Configuration.UserSecrets`

---

## File structure

```
c-sharp/
  Projects/
    RemoteResources/
      ManifestEntry.cs                        (new)
      PlatformInstallableRemoteResource.cs    (new)
      PlatformResourceManifest.cs             (new)
      RemoteResourcePasswordProvider.cs       (new)
      RemoteResourcesDataProvider.cs          (new)
  Program.cs                                  (modified)

c-sharp-tests/
  Projects/
    RemoteResources/
      MockRESTClient.cs                       (new — test infrastructure)
      PlatformInstallableRemoteResourceTests.cs (new)
      PlatformResourceManifestTests.cs        (new)
```

---

## Task 1: `RemoteResourcePasswordProvider.cs`

**Files:**

- Create: `c-sharp/Projects/RemoteResources/RemoteResourcePasswordProvider.cs`

- [ ] **Step 1: Write the file**

```csharp
// c-sharp/Projects/RemoteResources/RemoteResourcePasswordProvider.cs
using Microsoft.Extensions.Configuration;
using Paratext.Data;

namespace Paranext.DataProvider.Projects.RemoteResources;

internal static class RemoteResourcePasswordProvider
{
    private const string BaseUrl = "https://media.paratext.org/";

    public static bool IsPasswordAvailable()
    {
        var config = BuildConfig();
        return !string.IsNullOrEmpty(config["RemoteResourceUsername-DO-NOT-SHARE"])
            && !string.IsNullOrEmpty(config["RemoteResourcePassword-DO-NOT-SHARE"]);
    }

    public static IRESTClient GetClient()
    {
        var config = BuildConfig();
        var client = new RESTClient(BaseUrl, ParatextInfo.ParatextVersion.ToString());
        client.SetAuthentication(
            config["RemoteResourceUsername-DO-NOT-SHARE"] ?? "",
            config["RemoteResourcePassword-DO-NOT-SHARE"] ?? ""
        );
        return client;
    }

    private static IConfigurationRoot BuildConfig() =>
        new ConfigurationBuilder()
            .AddUserSecrets<RemoteResourcePasswordProvider>()
            .Build();
}
```

- [ ] **Step 2: Add the credentials to user secrets (one-time dev setup)**

Run from the `c-sharp/` directory. Get the values from whoever holds the shared service-account credentials for `media.paratext.org`:

```bash
dotnet user-secrets set "RemoteResourceUsername-DO-NOT-SHARE" "<username>"
dotnet user-secrets set "RemoteResourcePassword-DO-NOT-SHARE" "<password>"
```

The `UserSecretsId` in `c-sharp/ParanextDataProvider.csproj` (`1860f020-31dd-4eb4-81c4-323eb0cb3e48`) controls where these are stored — they land in the same store as the DBL secrets.

- [ ] **Step 3: Build to verify it compiles**

```bash
cd /home/mgetgen/repos/paranext/paranext-core/c-sharp && dotnet build
```

Expected: `Build succeeded.` with 0 errors.

- [ ] **Step 4: Commit**

```bash
git add c-sharp/Projects/RemoteResources/RemoteResourcePasswordProvider.cs
git commit -m "feat: add RemoteResourcePasswordProvider for media.paratext.org"
```

---

## Task 2: `ManifestEntry.cs` and `PlatformResourceManifest.cs`

**Files:**

- Create: `c-sharp/Projects/RemoteResources/ManifestEntry.cs`
- Create: `c-sharp/Projects/RemoteResources/PlatformResourceManifest.cs`
- Create: `c-sharp-tests/Projects/RemoteResources/PlatformResourceManifestTests.cs`

`ParseManifest` is the only path testable without a live server — the public `Get*Manifest()` methods are not unit-testable.

- [ ] **Step 1: Write the failing test**

```csharp
// c-sharp-tests/Projects/RemoteResources/PlatformResourceManifestTests.cs
using Paranext.DataProvider.Projects.RemoteResources;

namespace TestParanextDataProvider.Projects.RemoteResources;

[TestFixture]
internal class PlatformResourceManifestTests
{
    [Test]
    public void ParseManifest_SingleEntry_ParsesAllFields()
    {
        const string xml = """
            <Resources>
              <Resource>
                <Name>LSJ</Name>
                <FullName>Liddell-Scott-Jones Greek Lexicon</FullName>
                <Version>1.0.0</Version>
                <Size>12345</Size>
                <LanguageId>grc</LanguageId>
                <ResearchData>false</ResearchData>
                <Required>false</Required>
                <InstallAsDictionary>true</InstallAsDictionary>
              </Resource>
            </Resources>
            """;

        var entries = PlatformResourceManifest.ParseManifest(xml);

        Assert.That(entries, Has.Count.EqualTo(1));
        Assert.That(entries[0].Name, Is.EqualTo("LSJ"));
        Assert.That(entries[0].FullName, Is.EqualTo("Liddell-Scott-Jones Greek Lexicon"));
        Assert.That(entries[0].Version, Is.EqualTo("1.0.0"));
        Assert.That(entries[0].Size, Is.EqualTo(12345));
        Assert.That(entries[0].LanguageId, Is.EqualTo("grc"));
        Assert.That(entries[0].ResearchData, Is.False);
        Assert.That(entries[0].Required, Is.False);
        Assert.That(entries[0].InstallAsDictionary, Is.True);
    }

    [Test]
    public void ParseManifest_MultipleEntries_ReturnsAll()
    {
        const string xml = """
            <Resources>
              <Resource><Name>A</Name><FullName>Alpha</FullName><Version>1.0</Version><Size>1</Size><LanguageId>en</LanguageId></Resource>
              <Resource><Name>B</Name><FullName>Beta</FullName><Version>2.0</Version><Size>2</Size><LanguageId>en</LanguageId></Resource>
            </Resources>
            """;

        var entries = PlatformResourceManifest.ParseManifest(xml);

        Assert.That(entries, Has.Count.EqualTo(2));
        Assert.That(entries[0].Name, Is.EqualTo("A"));
        Assert.That(entries[1].Name, Is.EqualTo("B"));
    }

    [Test]
    public void ParseManifest_EmptyXml_ReturnsEmpty()
    {
        const string xml = "<Resources></Resources>";
        var entries = PlatformResourceManifest.ParseManifest(xml);
        Assert.That(entries, Is.Empty);
    }

    [Test]
    public void ParseManifest_BoolFieldsCaseInsensitive_ParsesCorrectly()
    {
        const string xml = """
            <Resources>
              <Resource>
                <Name>TEST</Name>
                <FullName>Test Resource</FullName>
                <Version>1.0</Version>
                <Size>0</Size>
                <LanguageId>en</LanguageId>
                <ResearchData>True</ResearchData>
                <Required>TRUE</Required>
                <InstallAsDictionary>False</InstallAsDictionary>
              </Resource>
            </Resources>
            """;

        var entries = PlatformResourceManifest.ParseManifest(xml);

        Assert.That(entries[0].ResearchData, Is.True);
        Assert.That(entries[0].Required, Is.True);
        Assert.That(entries[0].InstallAsDictionary, Is.False);
    }
}
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
cd /home/mgetgen/repos/paranext/paranext-core && dotnet test c-sharp-tests --filter "PlatformResourceManifestTests"
```

Expected: Compilation error — `ParseManifest` does not exist yet.

- [ ] **Step 3: Write `ManifestEntry.cs`**

```csharp
// c-sharp/Projects/RemoteResources/ManifestEntry.cs
namespace Paranext.DataProvider.Projects.RemoteResources;

internal class ManifestEntry
{
    public string Name { get; set; } = "";
    public string FullName { get; set; } = "";
    public string Version { get; set; } = "";
    public long Size { get; set; }
    public string LanguageId { get; set; } = "";
    public bool ResearchData { get; set; }
    public bool Required { get; set; }
    public bool InstallAsDictionary { get; set; }
}
```

- [ ] **Step 4: Write `PlatformResourceManifest.cs`**

```csharp
// c-sharp/Projects/RemoteResources/PlatformResourceManifest.cs
using System.Xml.Linq;

namespace Paranext.DataProvider.Projects.RemoteResources;

internal static class PlatformResourceManifest
{
    private const string MarbleManifestFile = "MarbleManifest_v3.xml";
    private const string XmlManifestFile = "XmlManifest_9-2.xml";
    private const string SourceLanguageManifestFile = "SourceLanguageManifest_v1.xml";
    private static readonly TimeSpan s_cacheDuration = TimeSpan.FromHours(24);

    public static List<ManifestEntry> GetMarbleManifest() =>
        GetCachedOrFetch(MarbleManifestFile, "platform_marble_manifest.xml");

    public static List<ManifestEntry> GetXmlManifest() =>
        GetCachedOrFetch(XmlManifestFile, "platform_xml_manifest.xml");

    public static List<ManifestEntry> GetSourceLanguageManifest() =>
        GetCachedOrFetch(SourceLanguageManifestFile, "platform_sourcelang_manifest.xml");

    internal static List<ManifestEntry> ParseManifest(string xml)
    {
        // Reads direct children of whatever root element the manifest uses.
        // IMPORTANT: verify element names against the actual server before shipping.
        // To inspect manually: curl -u USER:PASS https://media.paratext.org/MarbleManifest_v3.xml
        var doc = XDocument.Parse(xml);
        return doc.Root
            ?.Elements()
            .Select(e => new ManifestEntry
            {
                Name = e.Element("Name")?.Value ?? "",
                FullName = e.Element("FullName")?.Value ?? "",
                Version = e.Element("Version")?.Value ?? "",
                Size = long.TryParse(e.Element("Size")?.Value, out var size) ? size : 0,
                LanguageId = e.Element("LanguageId")?.Value ?? "",
                ResearchData = ToBool(e.Element("ResearchData")?.Value),
                Required = ToBool(e.Element("Required")?.Value),
                InstallAsDictionary = ToBool(e.Element("InstallAsDictionary")?.Value),
            })
            .Where(e => !string.IsNullOrEmpty(e.Name))
            .ToList() ?? [];
    }

    private static List<ManifestEntry> GetCachedOrFetch(
        string manifestFilename,
        string cacheFilename
    )
    {
        var cachePath = Path.Combine(Path.GetTempPath(), cacheFilename);
        if (
            File.Exists(cachePath)
            && DateTime.UtcNow - File.GetLastWriteTimeUtc(cachePath) < s_cacheDuration
        )
        {
            return ParseManifest(File.ReadAllText(cachePath));
        }

        try
        {
            var client = RemoteResourcePasswordProvider.GetClient();
            var xml = client.Get(manifestFilename);
            File.WriteAllText(cachePath, xml);
            return ParseManifest(xml);
        }
        catch (Exception e)
        {
            Console.WriteLine(
                $"Warning: Could not fetch manifest {manifestFilename}: {e.Message}"
            );
            return [];
        }
    }

    private static bool ToBool(string? value) =>
        value?.Equals("true", StringComparison.OrdinalIgnoreCase) ?? false;
}
```

- [ ] **Step 5: Add `InternalsVisibleTo` so the test project can call `ParseManifest`**

Open `c-sharp/ParanextDataProvider.csproj`. After the closing `</PropertyGroup>` of the first property group (around line 34), add:

```xml
  <ItemGroup>
    <AssemblyAttribute Include="System.Runtime.CompilerServices.InternalsVisibleTo">
      <_Parameter1>c-sharp-tests</_Parameter1>
    </AssemblyAttribute>
  </ItemGroup>
```

- [ ] **Step 6: Run the tests and verify they pass**

```bash
cd /home/mgetgen/repos/paranext/paranext-core && dotnet test c-sharp-tests --filter "PlatformResourceManifestTests"
```

Expected: 4 tests pass.

- [ ] **Step 7: Commit**

```bash
git add c-sharp/Projects/RemoteResources/ManifestEntry.cs \
        c-sharp/Projects/RemoteResources/PlatformResourceManifest.cs \
        c-sharp/ParanextDataProvider.csproj \
        c-sharp-tests/Projects/RemoteResources/PlatformResourceManifestTests.cs
git commit -m "feat: add ManifestEntry and PlatformResourceManifest with 24h caching"
```

---

## Task 3: `MockRESTClient` — test infrastructure

**Files:**

- Create: `c-sharp-tests/Projects/RemoteResources/MockRESTClient.cs`

No TDD here — this is the mock used by later tests.

- [ ] **Step 1: Write `MockRESTClient.cs`**

```csharp
// c-sharp-tests/Projects/RemoteResources/MockRESTClient.cs
using Paratext.Data;

namespace TestParanextDataProvider.Projects.RemoteResources;

internal class MockRESTClient : IRESTClient
{
    public record GetFileCall(string CgiCall, string OutputFile);

    public List<GetFileCall> GetFileCalls { get; } = [];

    public bool GetFile(string cgiCall, string outputFile, params string[] queryvars)
    {
        GetFileCalls.Add(new GetFileCall(cgiCall, outputFile));
        // Write an empty file so the caller does not fail on a missing path
        File.WriteAllBytes(outputFile, []);
        return true;
    }

    // Methods not needed for these tests
    public string Get(string cgiCall, params string[] queryvars) =>
        throw new NotImplementedException();

    public string Get(RESTClient.CgiCallOptions options, string cgiCall, params string[] queryvars) =>
        throw new NotImplementedException();

    public byte[] GetStreaming(string cgiCall, params string[] queryvars) =>
        throw new NotImplementedException();

    public void SetAuthentication(string newUsername, string newPassword) { }

    public string PutFormData(
        RESTClient.CgiCallOptions options,
        string cgiCall,
        string putData,
        string dataType = "json"
    ) => throw new NotImplementedException();

    public string Delete(string cgiCall) => throw new NotImplementedException();

    public string Head(
        RESTClient.CgiCallOptions options,
        string cgiCall,
        params string[] queryvars
    ) => throw new NotImplementedException();

    public string PostJsonFormData(
        RESTClient.CgiCallOptions options,
        string cgiCall,
        string postData
    ) => throw new NotImplementedException();
}
```

- [ ] **Step 2: Build the test project to verify the mock compiles**

```bash
cd /home/mgetgen/repos/paranext/paranext-core && dotnet build c-sharp-tests
```

Expected: `Build succeeded.` with 0 errors.

- [ ] **Step 3: Commit**

```bash
git add c-sharp-tests/Projects/RemoteResources/MockRESTClient.cs
git commit -m "test: add MockRESTClient for remote resource tests"
```

---

## Task 4: `PlatformInstallableRemoteResource.cs` — MARBLE install path (TDD)

**Files:**

- Create: `c-sharp/Projects/RemoteResources/PlatformInstallableRemoteResource.cs`
- Create: `c-sharp-tests/Projects/RemoteResources/PlatformInstallableRemoteResourceTests.cs`

This task covers the MARBLE (`EnhancedResource`) install path, `IsMarbleInstalled()`, and `IsMarbleUpdateAvailable()`. These three are tested end-to-end because no `InternalInstall` is involved — just file copies.

- [ ] **Step 1: Write the failing tests**

```csharp
// c-sharp-tests/Projects/RemoteResources/PlatformInstallableRemoteResourceTests.cs
using Paranext.DataProvider.Projects.RemoteResources;
using Paratext.Data;

namespace TestParanextDataProvider.Projects.RemoteResources;

[TestFixture]
internal class PlatformInstallableRemoteResourceTests
{
    private string _tempResourcesDir = "";

    [SetUp]
    public void SetUp()
    {
        _tempResourcesDir = Path.Combine(
            FixtureSetup.TestFolderPath,
            $"resources_{Guid.NewGuid():N}"
        );
        Directory.CreateDirectory(_tempResourcesDir);
    }

    [TearDown]
    public void TearDown()
    {
        if (Directory.Exists(_tempResourcesDir))
            Directory.Delete(_tempResourcesDir, true);
    }

    // ── MARBLE install ──────────────────────────────────────────────────────

    [Test]
    public void Install_MarbleResource_CopiesFileToResourcesDirectory()
    {
        var mockClient = new MockRESTClient();
        var entry = new ManifestEntry { Name = "LSJ", Version = "1.0.0", FullName = "LSJ Full" };
        var resource = new PlatformInstallableRemoteResource(
            entry,
            ResourceType.EnhancedResource,
            mockClient,
            _tempResourcesDir
        );

        resource.Install();

        Assert.That(File.Exists(Path.Combine(_tempResourcesDir, "LSJ.mbv2z")), Is.True);
    }

    [Test]
    public void Install_MarbleResource_WritesSidecarVersionFile()
    {
        var mockClient = new MockRESTClient();
        var entry = new ManifestEntry { Name = "LSJ", Version = "2.3.1", FullName = "LSJ Full" };
        var resource = new PlatformInstallableRemoteResource(
            entry,
            ResourceType.EnhancedResource,
            mockClient,
            _tempResourcesDir
        );

        resource.Install();

        var sidecarPath = Path.Combine(_tempResourcesDir, "LSJ.mbv2z.version");
        Assert.That(File.Exists(sidecarPath), Is.True);
        Assert.That(File.ReadAllText(sidecarPath).Trim(), Is.EqualTo("2.3.1"));
    }

    [Test]
    public void Install_MarbleResource_DownloadsCorrectFileName()
    {
        var mockClient = new MockRESTClient();
        var entry = new ManifestEntry { Name = "LSJ", Version = "1.0.0", FullName = "LSJ Full" };
        var resource = new PlatformInstallableRemoteResource(
            entry,
            ResourceType.EnhancedResource,
            mockClient,
            _tempResourcesDir
        );

        resource.Install();

        Assert.That(mockClient.GetFileCalls, Has.Count.EqualTo(1));
        Assert.That(mockClient.GetFileCalls[0].CgiCall, Is.EqualTo("LSJ.mbv2z"));
    }

    // ── MARBLE IsMarbleInstalled ───────────────────────────────────────────

    [Test]
    public void IsMarbleInstalled_FileAbsent_ReturnsFalse()
    {
        var entry = new ManifestEntry { Name = "LSJ", Version = "1.0.0" };
        var resource = new PlatformInstallableRemoteResource(
            entry,
            ResourceType.EnhancedResource,
            new MockRESTClient(),
            _tempResourcesDir
        );

        Assert.That(resource.IsMarbleInstalled(), Is.False);
    }

    [Test]
    public void IsMarbleInstalled_FilePresent_ReturnsTrue()
    {
        File.WriteAllBytes(Path.Combine(_tempResourcesDir, "LSJ.mbv2z"), []);
        var entry = new ManifestEntry { Name = "LSJ", Version = "1.0.0" };
        var resource = new PlatformInstallableRemoteResource(
            entry,
            ResourceType.EnhancedResource,
            new MockRESTClient(),
            _tempResourcesDir
        );

        Assert.That(resource.IsMarbleInstalled(), Is.True);
    }

    // ── MARBLE IsMarbleUpdateAvailable ────────────────────────────────────

    [Test]
    public void IsMarbleUpdateAvailable_NoSidecar_ReturnsTrue()
    {
        File.WriteAllBytes(Path.Combine(_tempResourcesDir, "LSJ.mbv2z"), []);
        var entry = new ManifestEntry { Name = "LSJ", Version = "1.0.0" };
        var resource = new PlatformInstallableRemoteResource(
            entry,
            ResourceType.EnhancedResource,
            new MockRESTClient(),
            _tempResourcesDir
        );

        Assert.That(resource.IsMarbleUpdateAvailable(), Is.True);
    }

    [Test]
    public void IsMarbleUpdateAvailable_SidecarMatchesManifestVersion_ReturnsFalse()
    {
        File.WriteAllBytes(Path.Combine(_tempResourcesDir, "LSJ.mbv2z"), []);
        File.WriteAllText(Path.Combine(_tempResourcesDir, "LSJ.mbv2z.version"), "1.0.0");
        var entry = new ManifestEntry { Name = "LSJ", Version = "1.0.0" };
        var resource = new PlatformInstallableRemoteResource(
            entry,
            ResourceType.EnhancedResource,
            new MockRESTClient(),
            _tempResourcesDir
        );

        Assert.That(resource.IsMarbleUpdateAvailable(), Is.False);
    }

    [Test]
    public void IsMarbleUpdateAvailable_ManifestVersionNewer_ReturnsTrue()
    {
        File.WriteAllBytes(Path.Combine(_tempResourcesDir, "LSJ.mbv2z"), []);
        File.WriteAllText(Path.Combine(_tempResourcesDir, "LSJ.mbv2z.version"), "1.0.0");
        var entry = new ManifestEntry { Name = "LSJ", Version = "2.0.0" };
        var resource = new PlatformInstallableRemoteResource(
            entry,
            ResourceType.EnhancedResource,
            new MockRESTClient(),
            _tempResourcesDir
        );

        Assert.That(resource.IsMarbleUpdateAvailable(), Is.True);
    }
}
```

- [ ] **Step 2: Run the tests to confirm they fail**

```bash
cd /home/mgetgen/repos/paranext/paranext-core && dotnet test c-sharp-tests --filter "PlatformInstallableRemoteResourceTests"
```

Expected: Compilation error — `PlatformInstallableRemoteResource` does not exist yet.

- [ ] **Step 3: Write the MARBLE-only skeleton of `PlatformInstallableRemoteResource.cs`**

```csharp
// c-sharp/Projects/RemoteResources/PlatformInstallableRemoteResource.cs
using Paratext.Data;
using Paratext.Data.Archiving;

namespace Paranext.DataProvider.Projects.RemoteResources;

internal class PlatformInstallableRemoteResource : InstallableResource
{
    private readonly ManifestEntry _entry;
    private readonly IRESTClient _client;
    private readonly string _resourcesDirectory;

    public ResourceType Type { get; }
    public ManifestEntry Entry => _entry;

    public PlatformInstallableRemoteResource(
        ManifestEntry entry,
        ResourceType type,
        IRESTClient client,
        string? resourcesDirectory = null
    )
        : base(null, null, null)
    {
        _entry = entry;
        Type = type;
        _client = client;
        _resourcesDirectory = resourcesDirectory ?? ScrTextCollection.ResourcesDirectory;

        Name = entry.Name;
        FullName = entry.FullName;
        Size = entry.Size;
        ResourceVersion = entry.Version;
    }

    public override void Install()
    {
        switch (Type)
        {
            case ResourceType.EnhancedResource:
                InstallMarble();
                break;
            case ResourceType.XmlResource:
                InstallXml();
                break;
            case ResourceType.SourceLanguageResource:
                InstallSourceLanguage();
                break;
            default:
                throw new InvalidOperationException($"Unsupported resource type: {Type}");
        }
    }

    public bool IsMarbleInstalled() =>
        File.Exists(Path.Combine(_resourcesDirectory, $"{_entry.Name}.mbv2z"));

    public bool IsMarbleUpdateAvailable()
    {
        var sidecarPath = Path.Combine(_resourcesDirectory, $"{_entry.Name}.mbv2z.version");
        if (!File.Exists(sidecarPath))
            return true;
        return string.CompareOrdinal(_entry.Version, File.ReadAllText(sidecarPath).Trim()) > 0;
    }

    public override ScrText? ExistingScrText =>
        ScrTextCollection
            .ScrTexts(IncludeProjects.ResourcesAndDictionaries)
            .FirstOrDefault(t => t.Name == _entry.Name);

    private void InstallMarble()
    {
        var fileName = $"{_entry.Name}.mbv2z";
        var tempFile = Path.Combine(Path.GetTempPath(), fileName);
        try
        {
            _client.GetFile(fileName, tempFile);
            File.Copy(tempFile, Path.Combine(_resourcesDirectory, fileName), overwrite: true);
            File.WriteAllText(
                Path.Combine(_resourcesDirectory, $"{fileName}.version"),
                _entry.Version
            );
        }
        finally
        {
            if (File.Exists(tempFile))
                File.Delete(tempFile);
        }
    }

    private void InstallXml()
    {
        throw new NotImplementedException();
    }

    private void InstallSourceLanguage()
    {
        throw new NotImplementedException();
    }
}
```

- [ ] **Step 4: Run the MARBLE tests and verify they pass**

```bash
cd /home/mgetgen/repos/paranext/paranext-core && dotnet test c-sharp-tests --filter "PlatformInstallableRemoteResourceTests"
```

Expected: The 8 MARBLE tests pass. The non-MARBLE tests are not yet written so there's nothing else to fail.

- [ ] **Step 5: Commit**

```bash
git add c-sharp/Projects/RemoteResources/PlatformInstallableRemoteResource.cs \
        c-sharp-tests/Projects/RemoteResources/PlatformInstallableRemoteResourceTests.cs
git commit -m "feat: add PlatformInstallableRemoteResource with MARBLE install path"
```

---

## Task 5: `PlatformInstallableRemoteResource` — XmlResource and SourceLanguageResource install paths

**Files:**

- Modify: `c-sharp/Projects/RemoteResources/PlatformInstallableRemoteResource.cs`
- Modify: `c-sharp-tests/Projects/RemoteResources/PlatformInstallableRemoteResourceTests.cs`

`InternalInstall` is called with a real temp file written by the mock (empty bytes). It will fail to parse the archive, so the tests only verify that the correct URL was requested — they do not test end-to-end installation. End-to-end is covered by the manual test documented in the spec.

- [ ] **Step 1: Add the new tests**

Add the following methods inside the `PlatformInstallableRemoteResourceTests` class (after the existing tests):

```csharp
// ── XmlResource install URL ────────────────────────────────────────────────

[Test]
public void Install_XmlResource_DownloadsFromCorrectUrl()
{
    var mockClient = new MockRESTClient();
    var entry = new ManifestEntry { Name = "LSJ", Version = "1.0.0", FullName = "LSJ Full" };
    var resource = new PlatformInstallableRemoteResource(
        entry,
        ResourceType.XmlResource,
        mockClient,
        _tempResourcesDir
    );

    // InternalInstall will throw because the downloaded file is an empty byte array,
    // not a valid archive. We catch that and only verify the download URL.
    try { resource.Install(); } catch { }

    Assert.That(mockClient.GetFileCalls, Has.Count.EqualTo(1));
    Assert.That(mockClient.GetFileCalls[0].CgiCall, Is.EqualTo("LSJ.xml1z"));
}

// ── SourceLanguageResource install URLs ────────────────────────────────────

[Test]
public void Install_SourceLanguageResource_NotDictionary_DownloadsFromResourcesSubfolder()
{
    var mockClient = new MockRESTClient();
    var entry = new ManifestEntry
    {
        Name = "GNT",
        Version = "1.0.0",
        FullName = "Greek NT",
        InstallAsDictionary = false,
    };
    var resource = new PlatformInstallableRemoteResource(
        entry,
        ResourceType.SourceLanguageResource,
        mockClient,
        _tempResourcesDir
    );

    try { resource.Install(); } catch { }

    Assert.That(mockClient.GetFileCalls, Has.Count.EqualTo(1));
    Assert.That(
        mockClient.GetFileCalls[0].CgiCall,
        Is.EqualTo("SourceLanguageResources/_Resources/GNT.p8z")
    );
}

[Test]
public void Install_SourceLanguageResource_IsDictionary_DownloadsFromDictionariesSubfolder()
{
    var mockClient = new MockRESTClient();
    var entry = new ManifestEntry
    {
        Name = "LSJ",
        Version = "1.0.0",
        FullName = "LSJ Full",
        InstallAsDictionary = true,
    };
    var resource = new PlatformInstallableRemoteResource(
        entry,
        ResourceType.SourceLanguageResource,
        mockClient,
        _tempResourcesDir
    );

    try { resource.Install(); } catch { }

    Assert.That(mockClient.GetFileCalls, Has.Count.EqualTo(1));
    Assert.That(
        mockClient.GetFileCalls[0].CgiCall,
        Is.EqualTo("SourceLanguageResources/_Dictionaries/LSJ.p8z")
    );
}
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
cd /home/mgetgen/repos/paranext/paranext-core && dotnet test c-sharp-tests --filter "PlatformInstallableRemoteResourceTests"
```

Expected: The 3 new tests fail with `NotImplementedException` from `InstallXml`/`InstallSourceLanguage`.

- [ ] **Step 3: Implement `InstallXml` and `InstallSourceLanguage`**

Replace the two `throw new NotImplementedException()` stubs in `PlatformInstallableRemoteResource.cs`:

```csharp
private void InstallXml()
{
    var tempFile = Path.Combine(Path.GetTempPath(), $"{_entry.Name}.xml1z");
    try
    {
        _client.GetFile($"{_entry.Name}.xml1z", tempFile);
        sourceDirectory = Path.GetTempPath();
        InternalInstall(".xml1z");
    }
    finally
    {
        if (File.Exists(tempFile))
            File.Delete(tempFile);
    }
}

private void InstallSourceLanguage()
{
    var subfolder = _entry.InstallAsDictionary
        ? "SourceLanguageResources/_Dictionaries"
        : "SourceLanguageResources/_Resources";
    var remotePath = $"{subfolder}/{_entry.Name}.p8z";
    var tempFile = Path.Combine(Path.GetTempPath(), $"{_entry.Name}.p8z");
    try
    {
        _client.GetFile(remotePath, tempFile);
        sourceDirectory = Path.GetTempPath();
        InternalInstall(".p8z");
    }
    finally
    {
        if (File.Exists(tempFile))
            File.Delete(tempFile);
    }
}
```

- [ ] **Step 4: Run all `PlatformInstallableRemoteResourceTests` and verify they pass**

```bash
cd /home/mgetgen/repos/paranext/paranext-core && dotnet test c-sharp-tests --filter "PlatformInstallableRemoteResourceTests"
```

Expected: All 11 tests pass.

- [ ] **Step 5: Commit**

```bash
git add c-sharp/Projects/RemoteResources/PlatformInstallableRemoteResource.cs \
        c-sharp-tests/Projects/RemoteResources/PlatformInstallableRemoteResourceTests.cs
git commit -m "feat: implement XmlResource and SourceLanguageResource install paths"
```

---

## Task 6: `RemoteResourcesDataProvider.cs` — scaffold, `isGetRemoteResourcesAvailable`, `getRemoteResources`

**Files:**

- Create: `c-sharp/Projects/RemoteResources/RemoteResourcesDataProvider.cs`

`getRemoteResources` calls `PlatformResourceManifest.Get*Manifest()` which hits a live server, so unit tests are not viable for that function. The `isGetRemoteResourcesAvailable` test is also hard to write without real secrets. Focus here is getting a clean build; end-to-end is tested manually.

- [ ] **Step 1: Write `RemoteResourcesDataProvider.cs`**

```csharp
// c-sharp/Projects/RemoteResources/RemoteResourcesDataProvider.cs
using System.Text.Json;
using Paranext.DataProvider.Services;
using Paratext.Data;
using Paratext.Data.Users;

namespace Paranext.DataProvider.Projects.RemoteResources;

internal class RemoteResourcesDataProvider(PapiClient papiClient)
    : NetworkObjects.DataProvider("platformGetResources.remoteResourcesProvider", papiClient)
{
    #region Internal classes

    private record RemoteResourceData(
        string Name,
        string DisplayName,
        string FullName,
        string BestLanguageName,
        string Type,
        long Size,
        bool Installed,
        bool UpdateAvailable,
        string ProjectId
    );

    #endregion

    #region Consts and member variables

    private const int RemoteNetworkTimeout = 0;
    public const string RemoteResources = "RemoteResources";

    private List<PlatformInstallableRemoteResource> _resources = [];

    #endregion

    #region DataProvider methods

    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            ("getRemoteResources", GetRemoteResources),
            ("installRemoteResource", InstallRemoteResource),
            ("uninstallRemoteResource", UninstallRemoteResource),
            ("isGetRemoteResourcesAvailable", IsGetRemoteResourcesAvailable),
        ];
    }

    protected override Task StartDataProviderAsync() => Task.CompletedTask;

    #endregion

    #region Private methods

    private bool IsGetRemoteResourcesAvailable() =>
        RemoteResourcePasswordProvider.IsPasswordAvailable();

    [NetworkTimeout(RemoteNetworkTimeout)]
    private List<RemoteResourceData> GetRemoteResources(JsonElement _ignore)
    {
        const string InvalidUserMessage =
            "User registration is not valid. Cannot retrieve resources from server.";

        if (!RegistrationInfo.DefaultUser.IsValid)
            throw new Exception(InvalidUserMessage);

        var client = RemoteResourcePasswordProvider.GetClient();

        _resources =
        [
            .. PlatformResourceManifest
                .GetMarbleManifest()
                .Select(e => new PlatformInstallableRemoteResource(
                    e,
                    ResourceType.EnhancedResource,
                    client
                )),
            .. PlatformResourceManifest
                .GetXmlManifest()
                .Select(e => new PlatformInstallableRemoteResource(
                    e,
                    ResourceType.XmlResource,
                    client
                )),
            .. PlatformResourceManifest
                .GetSourceLanguageManifest()
                .Select(e => new PlatformInstallableRemoteResource(
                    e,
                    ResourceType.SourceLanguageResource,
                    client
                )),
        ];

        return _resources.Select(BuildResourceData).ToList();
    }

    [NetworkTimeout(RemoteNetworkTimeout)]
    private void InstallRemoteResource(string name, string type)
    {
        throw new NotImplementedException();
    }

    private void UninstallRemoteResource(string name, string type)
    {
        throw new NotImplementedException();
    }

    private static RemoteResourceData BuildResourceData(
        PlatformInstallableRemoteResource resource
    )
    {
        bool installed;
        bool updateAvailable;
        string projectId;

        if (resource.Type == ResourceType.EnhancedResource)
        {
            installed = resource.IsMarbleInstalled();
            updateAvailable = installed && resource.IsMarbleUpdateAvailable();
            projectId = "";
        }
        else
        {
            installed = resource.Installed;
            updateAvailable = installed && resource.IsNewerThanCurrentlyInstalled();
            projectId = resource.ExistingScrText?.Guid.ToString().ToUpperInvariant() ?? "";
        }

        return new RemoteResourceData(
            resource.Entry.Name,
            resource.Entry.Name,
            resource.Entry.FullName,
            resource.Entry.LanguageId,
            resource.Type.ToString(),
            resource.Entry.Size,
            installed,
            updateAvailable,
            projectId
        );
    }

    private PlatformInstallableRemoteResource FindResource(
        string name,
        string type,
        string messageIfNotFound
    ) =>
        _resources.FirstOrDefault(r =>
            r.Entry.Name == name && r.Type.ToString() == type
        ) ?? throw new Exception(messageIfNotFound);

    #endregion
}
```

- [ ] **Step 2: Build to verify it compiles**

```bash
cd /home/mgetgen/repos/paranext/paranext-core/c-sharp && dotnet build
```

Expected: `Build succeeded.` with 0 errors.

- [ ] **Step 3: Commit**

```bash
git add c-sharp/Projects/RemoteResources/RemoteResourcesDataProvider.cs
git commit -m "feat: add RemoteResourcesDataProvider scaffold with getRemoteResources"
```

---

## Task 7: `RemoteResourcesDataProvider` — `installRemoteResource`

**Files:**

- Modify: `c-sharp/Projects/RemoteResources/RemoteResourcesDataProvider.cs`

- [ ] **Step 1: Replace the `InstallRemoteResource` stub with the real implementation**

```csharp
[NetworkTimeout(RemoteNetworkTimeout)]
private void InstallRemoteResource(string name, string type)
{
    var resource = FindResource(
        name,
        type,
        LocalizationService.GetLocalizedString(
            PapiClient,
            "%getResources_errorInstallResource_resourceNotFound%",
            "Resource not available from server."
        )
    );

    bool alreadyInstalled =
        resource.Type == ResourceType.EnhancedResource
            ? resource.IsMarbleInstalled() && !resource.IsMarbleUpdateAvailable()
            : resource.Installed && !resource.IsNewerThanCurrentlyInstalled();

    if (alreadyInstalled)
        throw new Exception(
            LocalizationService.GetLocalizedString(
                PapiClient,
                "%getResources_errorInstallResource_resourceAlreadyInstalled%",
                "Resource is already installed and up to date. Installation skipped."
            )
        );

    resource.Install();
    ScrTextCollection.RefreshScrTexts();

    bool nowInstalled =
        resource.Type == ResourceType.EnhancedResource
            ? resource.IsMarbleInstalled()
            : resource.Installed;

    if (!nowInstalled)
        throw new Exception(
            LocalizationService.GetLocalizedString(
                PapiClient,
                "%getResources_errorInstallResource_installationFailed%",
                "Resource cannot be found after attempted installation. Installation failed."
            )
        );

    SendDataUpdateEvent(RemoteResources, "Remote resources data updated");
}
```

- [ ] **Step 2: Build to verify it compiles**

```bash
cd /home/mgetgen/repos/paranext/paranext-core/c-sharp && dotnet build
```

Expected: `Build succeeded.` with 0 errors.

- [ ] **Step 3: Commit**

```bash
git add c-sharp/Projects/RemoteResources/RemoteResourcesDataProvider.cs
git commit -m "feat: implement installRemoteResource"
```

---

## Task 8: `RemoteResourcesDataProvider` — `uninstallRemoteResource` and `Program.cs` registration

**Files:**

- Modify: `c-sharp/Projects/RemoteResources/RemoteResourcesDataProvider.cs`
- Modify: `c-sharp/Program.cs`

- [ ] **Step 1: Replace the `UninstallRemoteResource` stub**

```csharp
private void UninstallRemoteResource(string name, string type)
{
    var resource = FindResource(
        name,
        type,
        LocalizationService.GetLocalizedString(
            PapiClient,
            "%getResources_errorUninstallResource_resourceNotFound%",
            "Resource not found on list of remote resources."
        )
    );

    bool currentlyInstalled =
        resource.Type == ResourceType.EnhancedResource
            ? resource.IsMarbleInstalled()
            : resource.Installed;

    if (!currentlyInstalled)
        throw new Exception(
            LocalizationService.GetLocalizedString(
                PapiClient,
                "%getResources_errorUninstallResource_resourceNotInstalled%",
                "Resource is not currently installed, so it can't be removed."
            )
        );

    if (resource.Type == ResourceType.EnhancedResource)
    {
        var mbv2zPath = Path.Combine(
            ScrTextCollection.ResourcesDirectory,
            $"{resource.Entry.Name}.mbv2z"
        );
        var sidecarPath = mbv2zPath + ".version";
        if (File.Exists(mbv2zPath))
            File.Delete(mbv2zPath);
        if (File.Exists(sidecarPath))
            File.Delete(sidecarPath);
    }
    else
    {
        ScrTextCollection.DeleteProject(resource.ExistingScrText);
    }

    ScrTextCollection.RefreshScrTexts();

    bool stillInstalled =
        resource.Type == ResourceType.EnhancedResource
            ? resource.IsMarbleInstalled()
            : resource.Installed;

    if (stillInstalled)
        throw new Exception(
            LocalizationService.GetLocalizedString(
                PapiClient,
                "%getResources_errorUninstallResource_localResourceStillPresent%",
                "Resource is still present. Removing failed."
            )
        );

    SendDataUpdateEvent(RemoteResources, "Remote resources data updated");
}
```

- [ ] **Step 2: Register `RemoteResourcesDataProvider` in `Program.cs`**

In `c-sharp/Program.cs`, add the import at the top (alongside the existing `using` for DigitalBibleLibrary):

```csharp
using Paranext.DataProvider.Projects.RemoteResources;
```

Then in `Main()`, after `var dblResources = new DblResourcesDataProvider(papi);`, add:

```csharp
var remoteResources = new RemoteResourcesDataProvider(papi);
```

And add `remoteResources.RegisterDataProviderAsync()` to the `Task.WhenAll(...)` call:

```csharp
await Task.WhenAll(
    paratextFactory.InitializeAsync(),
    inventoryDataProvider.RegisterDataProviderAsync(),
    checkRunner.RegisterDataProviderAsync(),
    dblResources.RegisterDataProviderAsync(),
    remoteResources.RegisterDataProviderAsync(),
    paratextRegistrationService.InitializeAsync(),
    paratextSendReceiveService.InitializeAsync()
);
```

- [ ] **Step 3: Build the full project**

```bash
cd /home/mgetgen/repos/paranext/paranext-core/c-sharp && dotnet build
```

Expected: `Build succeeded.` with 0 errors.

- [ ] **Step 4: Run all tests**

```bash
cd /home/mgetgen/repos/paranext/paranext-core && dotnet test c-sharp-tests
```

Expected: All tests pass. Confirm no regressions.

- [ ] **Step 5: Commit**

```bash
git add c-sharp/Projects/RemoteResources/RemoteResourcesDataProvider.cs \
        c-sharp/Program.cs
git commit -m "feat: implement uninstallRemoteResource and register RemoteResourcesDataProvider"
```

---

## Manual smoke test

After configuring credentials (Task 1 Step 2) and running the app:

1. Call `papi.dataProvider.get('platformGetResources.remoteResourcesProvider').isGetRemoteResourcesAvailable()` — should return `true`.
2. Call `getRemoteResources()` — should return a combined list with entries for all three types. Spot-check that `Name`, `FullName`, and `Type` look correct.
3. Call `installRemoteResource("LSJ", "XmlResource")` — should succeed.
4. Verify `~/.platform.bible/projects/Paratext 9 Projects/_Resources/LSJ/` (or similar path) exists.
5. Call `uninstallRemoteResource("LSJ", "XmlResource")` — should succeed and remove the directory.

> **XML element names:** `ParseManifest` reads direct children of the root element. If the actual manifest XML uses a different structure than what the tests assumed, adjust the LINQ query in `PlatformResourceManifest.ParseManifest` and update `PlatformResourceManifestTests` to match.
