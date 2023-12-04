using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.Projects;
using System.Diagnostics.CodeAnalysis;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyParatextProjectStorageInterpreter : ParatextProjectStorageInterpreter
    {
        private readonly Dictionary<string, byte[]> _inMemoryFiles = new();
        
        public DummyParatextProjectStorageInterpreter(PapiClient papiClient, DummyLocalParatextProjects paratextProjects) : base(papiClient, paratextProjects)
        {
        }

        protected override IProjectStreamManager CreateStreamManager(ProjectDetails projectDetails)
        {
            return new InMemoryStreamManager(this);
        }

        #region InMemoryStreamManager class
        private sealed class InMemoryStreamManager : IProjectStreamManager
        {
            private readonly DummyParatextProjectStorageInterpreter _owner;

            public InMemoryStreamManager(DummyParatextProjectStorageInterpreter owner)
            {
                _owner = owner;
            }

            #region Implementation of IProjectStreamManager
            public void Initialize()
            {
                // Nothing to do
            }

            public string[] GetExistingDataStreamNames()
            {
                throw new NotImplementedException();
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
            private readonly DummyParatextProjectStorageInterpreter _owner;
            private readonly string _streamName;

            public InMemoryFile(DummyParatextProjectStorageInterpreter owner, string streamName,
                byte[] existingData) : base(existingData)
            {
                _owner = owner;
                _streamName = streamName;
            }
            
            public InMemoryFile(DummyParatextProjectStorageInterpreter owner, string streamName)
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
