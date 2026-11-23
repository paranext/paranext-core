using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider
{
    /// <summary>
    /// Regression guard for the <see cref="DummyScrText"/> constructor's
    /// empty-<c>HomeDirectory</c> handling. Pins the invariant that every
    /// <see cref="DummyScrText"/> has a non-empty, unique <c>ProjectPath</c>
    /// even when the test author passes (or the parameterless constructor
    /// builds) a <see cref="ProjectDetails"/> with an empty
    /// <c>HomeDirectory</c>.
    /// </summary>
    /// <remarks>
    /// Motivation: multiple <see cref="DummyScrText"/> instances that share
    /// an empty <c>ProjectPath</c> collide inside
    /// <c>ScrTextCollection.RefreshScrTextsInternal</c>'s path-indexed
    /// <c>SingleOrDefault</c> lookup. The collision surfaces as
    /// "Sequence contains more than one matching element" thrown from an
    /// unrelated test's <c>ParatextData.Initialize</c> call long after the
    /// polluting test has finished. If a future change reintroduces empty
    /// <c>ProjectPath</c> on <see cref="DummyScrText"/>, this test fails and
    /// names the invariant explicitly rather than leaving future maintainers
    /// to rediscover the symptom through a full-suite run.
    /// </remarks>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class DummyScrTextTests
    {
        [Test]
        public void ParameterlessConstructor_ProducesNonEmptyProjectPath()
        {
            using var scrText = new DummyScrText();

            Assert.That(
                scrText.Directory,
                Is.Not.Null.And.Not.Empty,
                "DummyScrText() must produce a non-empty ProjectPath to avoid "
                    + "ScrTextCollection path-indexed lookup collisions"
            );
        }

        [Test]
        public void ParameterlessConstructor_TwoInstances_HaveDistinctProjectPaths()
        {
            using var a = new DummyScrText();
            using var b = new DummyScrText();

            Assert.That(
                a.Directory,
                Is.Not.EqualTo(b.Directory),
                "Distinct DummyScrText instances must have distinct ProjectPaths"
            );
        }

        [Test]
        public void ParameterizedConstructor_EmptyHomeDirectory_IsSubstituted()
        {
            var details = new ProjectDetails(
                "Dummy",
                new ProjectMetadata(HexId.CreateNew().ToString(), []),
                ""
            );

            using var scrText = new DummyScrText(details);

            Assert.That(
                scrText.Directory,
                Is.Not.Null.And.Not.Empty,
                "DummyScrText(details with empty HomeDirectory) must substitute a "
                    + "non-empty ProjectPath so that instances do not collide "
                    + "inside ScrTextCollection's path-indexed lookups"
            );
        }

        [Test]
        public void ParameterizedConstructor_EmptyHomeDirectory_TwoInstances_HaveDistinctProjectPaths()
        {
            var detailsA = new ProjectDetails(
                "DummyA",
                new ProjectMetadata(HexId.CreateNew().ToString(), []),
                ""
            );
            var detailsB = new ProjectDetails(
                "DummyB",
                new ProjectMetadata(HexId.CreateNew().ToString(), []),
                ""
            );

            using var a = new DummyScrText(detailsA);
            using var b = new DummyScrText(detailsB);

            Assert.That(
                a.Directory,
                Is.Not.EqualTo(b.Directory),
                "Two DummyScrTexts built from details that both have empty "
                    + "HomeDirectory must still end up with distinct ProjectPaths"
            );
        }

        [Test]
        public void ParameterizedConstructor_NonEmptyHomeDirectory_IsPreserved()
        {
            const string explicitPath = "some/real/project/path";
            var details = new ProjectDetails(
                "Dummy",
                new ProjectMetadata(HexId.CreateNew().ToString(), []),
                explicitPath
            );

            using var scrText = new DummyScrText(details);

            Assert.That(
                scrText.Directory,
                Is.EqualTo(explicitPath),
                "Substitution must only apply to empty HomeDirectory; a caller "
                    + "that supplies an explicit path must see it preserved"
            );
        }
    }
}
