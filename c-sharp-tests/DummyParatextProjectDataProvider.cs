using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyParatextProjectDataProvider : ParatextProjectDataProvider
    {
        private readonly Dictionary<string, byte[]> _inMemoryFiles = new();

        public DummyParatextProjectDataProvider(
            string name,
            PapiClient papiClient,
            ProjectDetails projectDetails,
            LocalParatextProjects paratextProjects
        )
            : base(name, papiClient, projectDetails, paratextProjects) { }

        /// <summary>
        /// The names this PDP would register as wire methods, so tests can assert the wire surface
        /// a given project's interface list produces.
        /// </summary>
        public List<string> GetRegisteredFunctionNames() =>
            GetFunctions().Select(function => function.functionName).ToList();

        /// <summary>
        /// The stream names this PDP currently holds data for, so tests can assert which calls
        /// create files and which do not.
        /// </summary>
        public List<string> GetStoredStreamNames() => [.. _inMemoryFiles.Keys];

        protected override IProjectStreamManager CreateStreamManager(ProjectDetails projectDetails)
        {
            return new InMemoryStreamManager(this);
        }

        #region InMemoryStreamManager class

        private sealed class InMemoryStreamManager : IProjectStreamManager
        {
            private readonly DummyParatextProjectDataProvider _owner;

            public InMemoryStreamManager(DummyParatextProjectDataProvider owner)
            {
                _owner = owner;
            }

            #region Implementation of IProjectStreamManager

            public void Initialize()
            {
                // Nothing to do
            }

            public string[] GetExistingDataStreamNames(string? underPath = null)
            {
                // Stream names are already '/'-joined here, so a plain prefix match gives the same
                // recursive, relative, forward-slash names the file-based manager produces
                var prefix = string.IsNullOrEmpty(underPath) ? "" : $"{underPath}/";
                return
                [
                    .. _owner
                        ._inMemoryFiles.Keys.Where(streamName =>
                            streamName.StartsWith(prefix, StringComparison.Ordinal)
                        )
                        .Select(streamName => streamName[prefix.Length..])
                        .OrderBy(streamName => streamName, StringComparer.Ordinal),
                ];
            }

            public Stream? GetDataStream(string streamName, bool createIfNotExists = false)
            {
                if (_owner._inMemoryFiles.TryGetValue(streamName, out byte[]? existingFile))
                    return new InMemoryFile(_owner, streamName, existingFile);

                return createIfNotExists ? new InMemoryFile(_owner, streamName) : null;
            }

            public bool DeleteDataStream(string streamName)
            {
                throw new NotImplementedException();
            }

            #endregion
        }

        #endregion

        #region InMemoryFile class

        private sealed class InMemoryFile : MemoryStream
        {
            private readonly DummyParatextProjectDataProvider _owner;
            private readonly string _streamName;

            public InMemoryFile(
                DummyParatextProjectDataProvider owner,
                string streamName,
                byte[] existingData
            )
                : base(existingData)
            {
                _owner = owner;
                _streamName = streamName;
            }

            public InMemoryFile(DummyParatextProjectDataProvider owner, string streamName)
            {
                _owner = owner;
                _streamName = streamName;
            }

            protected override void Dispose(bool disposing)
            {
                if (disposing)
                    _owner._inMemoryFiles[_streamName] = ToArray();

                base.Dispose(disposing);
            }
        }

        #endregion
    }
}
