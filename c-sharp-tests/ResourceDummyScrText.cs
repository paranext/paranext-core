using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider
{
    /// <summary>
    /// Marker subclass for resource-project test coverage.
    ///
    /// <c>ScrText.IsResourceProject</c> is <c>virtual</c> and defaults to false on
    /// <see cref="DummyScrText"/>. Resources in production override it to true (see
    /// ResourceScrText.cs and JoinedScrText.cs). This subclass mirrors that override so
    /// resource-project behavior can be tested without needing a real on-disk zipped resource.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal sealed class ResourceDummyScrText : DummyScrText
    {
        public ResourceDummyScrText() { }

        public ResourceDummyScrText(ProjectDetails details)
            : base(details) { }

        public override bool IsResourceProject => true;
    }
}
