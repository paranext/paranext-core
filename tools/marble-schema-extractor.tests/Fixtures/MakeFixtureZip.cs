using ICSharpCode.SharpZipLib.Zip;

namespace MarbleSchemaExtractor.Tests.Fixtures;

internal static class MakeFixtureZip
{
    /// <summary>
    /// Builds an in-memory password-encrypted ZIP containing the given filename→content map.
    /// Returns the path to a temp file the caller must delete.
    /// </summary>
    public static string CreatePasswordedZip(IDictionary<string, string> entries, string password)
    {
        string path = Path.Combine(Path.GetTempPath(), $"fixture-{Guid.NewGuid():N}.zip");
        using var zip = ZipFile.Create(path);
        zip.Password = password;
        zip.BeginUpdate();
        foreach (var kvp in entries)
        {
            zip.Add(new StringDataSource(kvp.Value), kvp.Key);
        }
        zip.CommitUpdate();
        zip.Close();
        return path;
    }

    private sealed class StringDataSource(string text) : IStaticDataSource
    {
        public Stream GetSource() => new MemoryStream(System.Text.Encoding.UTF8.GetBytes(text));
    }
}
