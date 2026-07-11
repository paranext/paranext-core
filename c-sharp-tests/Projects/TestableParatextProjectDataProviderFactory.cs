using System.Collections.Concurrent;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Minimal concrete <see cref="ParatextProjectDataProviderFactoryBase"/> used to test the
    /// per-project creation/locking behavior in the base class in isolation from any specific
    /// PDPF's project-interface or rejection logic.
    /// </summary>
    /// <remarks>
    /// <see cref="ShouldServeProject"/> runs once (per project) inside the base class's
    /// Lazy-creation critical section - the same place the real `ScrText`/PDP construction
    /// happens - so recording invocations here and exposing <see cref="OnCreating"/> lets tests
    /// observe and synchronize concurrent callers without needing a real PDP/registration stack.
    /// </remarks>
    [ExcludeFromCodeCoverage]
    internal class TestableParatextProjectDataProviderFactory
        : ParatextProjectDataProviderFactoryBase
    {
        private readonly ConcurrentQueue<string> _creationInvocations = new();

        public TestableParatextProjectDataProviderFactory(
            PapiClient papiClient,
            LocalParatextProjects paratextProjects
        )
            : base(papiClient, paratextProjects, [], "Test") { }

        /// <summary>
        /// Optional hook invoked synchronously inside <see cref="ShouldServeProject"/> - i.e. while
        /// the per-project Lazy factory is executing - so tests can block/synchronize concurrent
        /// threads to observe (non-)serialization.
        /// </summary>
        public Action<string>? OnCreating { get; set; }

        /// <summary>
        /// When false, <see cref="ShouldServeProject"/> rejects the project, simulating a project
        /// that belongs to a sibling factory (the deterministic failure path).
        /// </summary>
        public bool ShouldServe { get; set; } = true;

        /// <summary>
        /// Project IDs (as seen via <see cref="ShouldServeProject"/>'s <c>scrText.Guid</c>) in the
        /// order the base class's creation critical section ran for them. One entry per attempt -
        /// a project whose creation is retried after a failure (not cached) appears more than once.
        /// </summary>
        public IReadOnlyCollection<string> CreationInvocations => _creationInvocations;

        public int CreationInvocationCount => _creationInvocations.Count;

        protected override bool ShouldServeProject(ScrText scrText)
        {
            var id = scrText.Guid.ToString();
            _creationInvocations.Enqueue(id);
            OnCreating?.Invoke(id);
            return ShouldServe;
        }

        protected override string GetCrossFactoryRejectionMessage(string projectID) =>
            $"Rejected by test factory: {projectID}";

        protected override string GetRegistrationTaskDescription(
            ParatextProjectDataProvider pdp,
            ProjectDetails details
        ) => $"Register test PDP {pdp.DataProviderName} for {details.Name}";

        // Not exercised by these tests (they call GetProjectDataProviderID directly), but required
        // by the abstract base.
        protected override List<ProjectMetadata>? GetAvailableProjects(JsonElement _ignore) => null;
    }
}
