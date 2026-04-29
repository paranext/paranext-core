using MarbleSchemaExtractor.Tests.Fixtures;

namespace MarbleSchemaExtractor.Tests;

[TestFixture]
public class SemanticDomainDeserializerTests
{
    private const string TestPassword = "test-pw";
    private string? _zipPath;

    [TearDown]
    public void TearDown()
    {
        if (_zipPath != null && File.Exists(_zipPath))
            File.Delete(_zipPath);
    }

    [Test]
    public void CollectStats_HandlesDomainHierarchy()
    {
        var domainsXml = """
            <Domains>
              <SemanticDomain>
                <SemanticDomainLocalizations>
                  <SemanticDomainLocalization LanguageCode="en" Label="Universe, Creation"/>
                </SemanticDomainLocalizations>
                <Level>1</Level>
                <Code>001</Code>
              </SemanticDomain>
            </Domains>
            """;
        _zipPath = MakeFixtureZip.CreatePasswordedZip(
            new Dictionary<string, string> { ["Domains.xml"] = domainsXml },
            TestPassword
        );

        using var archive = ResourceArchive.Open(_zipPath, () => TestPassword);
        var deserializer = new SemanticDomainDeserializer();
        string statsJson = deserializer.CollectStats(archive);

        Assert.That(statsJson, Does.Contain("\"Domain.Code\""));
        Assert.That(statsJson, Does.Contain("\"Domain.SemanticDomainLocalizations\""));
    }
}
