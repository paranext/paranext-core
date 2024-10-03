using Paratext.Data.Languages;
using Paratext.Data;
using PtxUtils;
using SIL.WritingSystems;
using System.Diagnostics.CodeAnalysis;

namespace TestParanextDataProvider
{
    /// <summary>
    /// Replaces a ScrLanguage for use in testing. Does not use the file system to save/load data. 
    /// </summary>
    /// <remarks>Shamelessly copied from Paratext tests.</remarks>
    [ExcludeFromCodeCoverage]
    public class DummyScrLanguage : ScrLanguage
    {
        public DummyScrLanguage(ScrText scrText) : base(null, ProjectNormalization.Undefined, scrText)
        {
        }

        protected override WritingSystemDefinition LoadWsDef(ScrText scrText)
        {
            // Don't load anything from disk for testing and just return the one we already have
            return wsDef;
        }

        public override void Save(ScrText? scrText, string? newFileName = null)
        {
            // Don't save anything to disk for testing
            string id = wsDef.GetLanguageId().Id;
            if (WritingSystemRepository.TryGet(id, out _))
                WritingSystemRepository.Remove(id);

            WritingSystemRepository.Set(wsDef);
        }

        public void SetLanguageId(LanguageId langId)
        {
            wsDef.LanguageTag = langId.Id;
        }

        public void ForceSaveLdml(ScrText scrText)
        {
            WriteLdmlFile(scrText, wsDef, false);
        }
    }
}
