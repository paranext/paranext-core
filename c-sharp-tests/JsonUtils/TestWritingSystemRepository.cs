using Paratext.Data.Languages;
using SIL.WritingSystems;

namespace TestParanextDataProvider.JsonUtils
{
    public class TestWritingSystemRepository : IWritingSystemRepository<WritingSystemDefinition>
    {
        private readonly Dictionary<string, WritingSystemDefinition> writingSystems =
            new Dictionary<string, WritingSystemDefinition>();
        private readonly SimpleWritingSystemFactory factory = new SimpleWritingSystemFactory();

        public TestWritingSystemRepository()
        {
            if (!Sldr.IsInitialized)
                Sldr.Initialize(true); // always use offline mode in tests.

            // just have a very basic definition of English - tests will need to set any expected properties
            WritingSystemDefinition en = new WritingSystemDefinition("en");
            en.DefaultFont = new FontDefinition("Arial");
            en.DefaultFontSize = 10;
            Set(en);
        }

        public void Replace(string wsLanguageTag, WritingSystemDefinition newWs) =>
            throw new NotImplementedException();

        public IEnumerable<WritingSystemDefinition> AllWritingSystems
        {
            get { return writingSystems.Values; }
        }

        public bool CanSave(WritingSystemDefinition ws) => true;

        public bool CanSet(WritingSystemDefinition ws) => true;

        public void Conflate(string wsToConflate, string wsToConflateWith) =>
            throw new NotImplementedException();

        public bool Contains(string id) => writingSystems.ContainsKey(id);

        public int Count => writingSystems.Count;

        public WritingSystemDefinition Get(string id) => writingSystems[id];

        public string GetNewIdWhenSet(WritingSystemDefinition ws) =>
            throw new NotImplementedException();

        public void Remove(string id) => writingSystems.Remove(id);

        public void Save() { }

        public void Set(WritingSystemDefinition ws)
        {
            if (ws.Id == null)
                ws.Id = ws.LanguageTag;
            writingSystems[ws.Id] = ws;
        }

        public bool TryGet(string id, out WritingSystemDefinition ws)
        {
            return writingSystems.TryGetValue(id, out ws);
        }

        public event EventHandler<WritingSystemConflatedEventArgs> WritingSystemConflated
        {
            add { }
            remove { }
        }

        public event EventHandler<WritingSystemDeletedEventArgs> WritingSystemDeleted
        {
            add { }
            remove { }
        }

        public event EventHandler<WritingSystemIdChangedEventArgs> WritingSystemIdChanged
        {
            add { }
            remove { }
        }

        public bool WritingSystemIdHasChanged(string id) => throw new NotImplementedException();

        public string WritingSystemIdHasChangedTo(string id) => throw new NotImplementedException();

        public IWritingSystemFactory<WritingSystemDefinition> WritingSystemFactory
        {
            get { return factory; }
        }

        IWritingSystemFactory IWritingSystemRepository.WritingSystemFactory
        {
            get { throw new NotImplementedException(); }
        }
    }
}
