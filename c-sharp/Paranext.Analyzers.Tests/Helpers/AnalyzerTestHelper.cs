namespace Paranext.Analyzers.Tests.Helpers;

/// <summary>
/// Stub source code for classes referenced by the PNX007 analyzer.
/// PNX007 walks the inheritance chain by name, so we need minimal
/// class definitions to satisfy the semantic model.
/// </summary>
public static class AnalyzerTestHelper
{
    public const string NetworkObjectStubs = """
        namespace TestProject;

        public class NetworkObject { }
        public class DataProvider : NetworkObject { }
        public class ProjectDataProvider : DataProvider { }
        """;
}
