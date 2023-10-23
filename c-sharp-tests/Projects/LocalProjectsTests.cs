using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

public class LocalProjectsTests
{
    [TestCase("-ABC_441f1e41ffb8d319650847df35f4ffb78f12914e")]
    [TestCase("-_441f1e41ffb8d319650847df35f4ffb78f12914e")]
    [TestCase("ABC@_441f1e41ffb8d319650847df35f4ffb78f12914e")]
    [TestCase("A_B_C")]
    [TestCase("ABC_")]
    [TestCase("ABC_441f1e41ffb8d319650847df35f4ffb78f1291 e")]
    [TestCase("_441f1e41ffb8d319650847df35f4ffb78f12914e")]
    [TestCase("ABC")]
    [TestCase("ABC_441f1e41ffb8d319650847df35f4ffb78f12914")]
    [TestCase("ABC_441f1e41ffb8d319650847df35f4ffb78f12914ee")]
    [TestCase("ABC_441H1e41ffb8d319650847df35f4ffb78f12914e")]
    public void DoesFolderMatchMetadata_FolderNameDoesNotMatchRegex_ReturnsFalse(string folder)
    {
        var metadata = CreateProjectMetadata("ABC");
        Assert.That(LocalProjects.DoesFolderMatchMetadata(folder, metadata), Is.False);
    }

    [TestCase("ABC_441f1e41ffb8d319650847df35f4ffb78f12914e", "ABD")]
    [TestCase("AB-C_441f1e41ffb8d319650847df35f4ffb78f12914e", "AB-D")]
    [TestCase("A-B-C_441f1e41ffb8d319650847df35f4ffb78f12914e", "ABC")]
    public void DoesFolderMatchMetadata_NameDoesNotMatch_ReturnsFalse(string folder, string name)
    {
        var metadata = CreateProjectMetadata(name);
        Assert.That(LocalProjects.DoesFolderMatchMetadata(folder, metadata), Is.False);
    }

    [TestCase("ABC_541f1e41ffb8d319650847df35f4ffb78f12914e", "ABC")]
    [TestCase("AB-C_541f1e41ffb8d319650847df35f4ffb78f12914e", "AB-C")]
    public void DoesFolderMatchMetadata_IdDoesNotMatch_ReturnsFalse(string folder, string name)
    {
        var metadata = CreateProjectMetadata(name);
        Assert.That(LocalProjects.DoesFolderMatchMetadata(folder, metadata), Is.False);
    }

    [TestCase("ABC_441F1E41FFB8D319650847DF35F4FFB78F12914E", "ABC")]
    [TestCase("AB-C_441f1e41ffb8d319650847df35f4ffb78f12914e", "AB-C")]
    [TestCase("A-B-C_441f1e41ffb8d319650847df35f4ffb78f12914e", "A-B-C")]
    public void DoesFolderMatchMetadata_IdAndNameMatch_ReturnsTrue(string folder, string name)
    {
        var metadata = CreateProjectMetadata(name);
        Assert.That(LocalProjects.DoesFolderMatchMetadata(folder, metadata), Is.True);
    }

    private static ProjectMetadata CreateProjectMetadata(string name)
    {
        return new ProjectMetadata("441f1e41ffb8d319650847df35f4ffb78f12914e", name, "paratextFolders", "paratext");
    }
}
