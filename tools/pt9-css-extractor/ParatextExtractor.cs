using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using Paratext.Data;
using Paratext.Data.ProjectFileAccess;
using Paratext.Data.Themes;
using Paratext.Data.Users;
using Paratext.InternalShared.ScriptureEditor;

namespace Pt9CssExtractor;

/// <summary>
/// All Paratext-using code lives in this class so it gets JIT'd only after
/// the AssemblyResolve handler has been installed by <see cref="Program.Main"/>.
/// </summary>
internal static class ParatextExtractor
{
    internal static int Run(CliOptions opts)
    {
        Console.Error.WriteLine($"Paratext install : {opts.ParatextInstallDir}");
        Console.Error.WriteLine($"Projects dir     : {opts.ProjectsDir}");
        Console.Error.WriteLine($"Project / resource: {opts.ProjectName}");

        InitializeParatextData(opts);

        ScrText scrText =
            ScrTextCollection.Get(opts.ProjectName)
            ?? throw new InvalidOperationException(
                $"Could not find Paratext project or resource named '{opts.ProjectName}' "
                + $"under '{opts.ProjectsDir}' (projects and the _Resources subdirectory are both searched).");

        // The DBL entry UID is what the editor keys commentary marker styles on (the TS
        // `useCommentaryMarkerStyles` hook and the C# `CommentariesWhiteList`), so surface it
        // here — it saves a manual lookup when wiring a freshly-extracted resource into those
        // registries. Resources always have one; guard anyway so a non-DBL project still extracts.
        string dblId = scrText.Settings.DBLId.ToString();
        Console.Error.WriteLine(
            $"DBL entry UID    : {(string.IsNullOrEmpty(dblId) ? "(none — not a DBL resource)" : dblId)}");

        // zoom: 1.0 matches what PT9 itself passes (Paratext\Plugins\Legacy\LegacyPluginManager.cs
        // and Paratext\Marble\MarbleForm.cs). The design-doc value of 100 produces nonsense
        // 1200pt font sizes — zoom multiplies font-size and margin values directly.
        string css = CSSCreator.CreateDefaultCSS(
            scrText,
            zoom: 1.0,
            fontFamilies: Array.Empty<string>(),
            includeFontFaces: false);

        string outDir = Path.GetDirectoryName(Path.GetFullPath(opts.OutPath))!;
        Directory.CreateDirectory(outDir);
        File.WriteAllText(
            opts.OutPath,
            css,
            new UTF8Encoding(encoderShouldEmitUTF8Identifier: false));

        Console.WriteLine($"Wrote {opts.OutPath} ({css.Length:N0} chars)");
        return 0;
    }

    private static void InitializeParatextData(CliOptions opts)
    {
        ScrTextCollection.Implementation = new MinimalScrTextCollection(opts.ParatextInstallDir);

        // PT9's base usfm.sty uses `\ColorName <name>` directives that get resolved against
        // `Theme.Current.GetColorInfo(name)`. With no theme, ScrTag.GetThemeColor returns 0
        // and silently *overwrites* the preceding `\Color <int>` line — so every marker
        // ends up RawColor=0 (black). Wire up the default theme so colours resolve.
        // ParatextData.dll embeds Paratext.Data.Themes.Default.ColorMapping.xml, so this
        // works without any extra files on disk.
        Theme.Current ??= new MinimalTheme(
            ColorTheme.CurrentThemeColorNames,
            ColorTheme.CurrentThemeColors);

        string fullProjectsDir = Path.GetFullPath(opts.ProjectsDir);
        if (!Directory.Exists(fullProjectsDir))
            throw new DirectoryNotFoundException(
                $"Paratext projects directory not found: {fullProjectsDir}");

        ParatextData.Initialize(fullProjectsDir, false);
    }
}

/// <summary>
/// Minimal <see cref="ScrTextCollection"/> that lets us open standard projects and
/// zipped (.p8z) resources. No DBL / UI / SLDR plumbing — the CLI doesn't need it.
/// </summary>
internal sealed class MinimalScrTextCollection : ScrTextCollection
{
    private readonly IZippedResourcePasswordProvider _passwordProvider;

    public MinimalScrTextCollection(string paratextInstallDir)
    {
        _passwordProvider = new InstalledZippedResourcePasswordProvider(paratextInstallDir);
    }

    protected override ScrText CreateResourceProject(ProjectName name) =>
        new ResourceScrText(name, RegistrationInfo.DefaultUser, _passwordProvider);

    protected override ScrText CreateXmlResourceProject(ProjectName name) =>
        new XmlResourceScrText(name, RegistrationInfo.DefaultUser, _passwordProvider);

    protected override UnsupportedReason MigrateProjectIfNeeded(ScrText scrText) =>
        scrText.NeedsMigration ? UnsupportedReason.CannotUpgrade : UnsupportedReason.Supported;
}

/// <summary>
/// A no-image Theme used only to feed colours into Paratext's stylesheet parser. We never
/// resolve theme images so <see cref="Theme.GetImageInfo"/> is intentionally a no-op.
/// </summary>
internal sealed class MinimalTheme : Theme
{
    public MinimalTheme(
        IEnumerable<KeyValuePair<string, string>> itemsToColor,
        IEnumerable<KeyValuePair<string, ColorInfo>> colors)
        : base(Enumerable.Empty<KeyValuePair<string, ImageInfo>>(), itemsToColor, colors) { }

    public override ImageInfo GetImageInfo(string name) => new ImageInfo(null, "");
}

/// <summary>
/// Delegates to the password provider that already lives inside the installed
/// <c>ParatextBase.dll</c>. We never embed Paratext's resource password in this
/// repository — the password stays where Paratext itself keeps it. Loaded via
/// reflection so we don't have to add a direct project reference to
/// <c>ParatextBase.dll</c> (which would pull WinForms-touching types into our
/// compile graph).
/// </summary>
internal sealed class InstalledZippedResourcePasswordProvider : IZippedResourcePasswordProvider
{
    private const string ProviderTypeName =
        "Paratext.Base.ProjectFileAccess.ParatextZippedResourcePasswordProvider";

    private readonly IZippedResourcePasswordProvider _delegate;

    public InstalledZippedResourcePasswordProvider(string paratextInstallDir)
    {
        string dllPath = Path.Combine(paratextInstallDir, "ParatextBase.dll");
        if (!File.Exists(dllPath))
            throw new FileNotFoundException(
                $"Cannot find ParatextBase.dll at '{dllPath}'. The CLI relies on Paratext's "
                + "installed resource-password provider so the password never has to live in "
                + "this repository — install Paratext 9 or point --paratext-install-dir at it.",
                dllPath);

        Assembly asm = Assembly.LoadFrom(dllPath);
        Type providerType =
            asm.GetType(ProviderTypeName, throwOnError: true)
            ?? throw new InvalidOperationException(
                $"Loaded {dllPath} but type '{ProviderTypeName}' was not found — "
                + "incompatible Paratext install?");

        _delegate = (IZippedResourcePasswordProvider)Activator.CreateInstance(providerType)!;
    }

    public string GetPassword() => _delegate.GetPassword();
}
