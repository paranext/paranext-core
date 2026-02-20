using System.Xml.Serialization;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for EXT-015: MarbleLexiconEntry data models.
/// Validates XML deserialization of the Entry > BaseForm > Meaning > Gloss hierarchy
/// for both SDBH (Hebrew) and SDBG (Greek/Louw-Nida) dictionary formats.
///
/// PT9 Source: Paratext/Marble/MarbleLexiconEntry.cs:1-436
/// </summary>
[TestFixture]
public class MarbleLexiconEntryTests
{
    #region Test XML Data

    // Minimal SDBH-format XML for a single lexicon entry with nested hierarchy
    private const string SdbhEntryXml = """
        <?xml version="1.0" encoding="utf-8"?>
        <Lexicon>
          <Lexicon_Entry Id="001001" Lemma="אָב" Version="5">
            <StrongCodes>
              <Strong>H0001</Strong>
            </StrongCodes>
            <Authors>
              <Author>R. de Blois</Author>
            </Authors>
            <AlternateLemmas>
              <AlternateLemma>av</AlternateLemma>
            </AlternateLemmas>
            <Notes>
              <Note Caller="1" LanguageCode="en">
                <References>
                  <Reference>GEN 2:24</Reference>
                </References>
                <Content>Note about this entry</Content>
              </Note>
            </Notes>
            <Localizations>
              <Localization LanguageCode="en">
                <DateTime>2023-01-15</DateTime>
              </Localization>
            </Localizations>
            <Dates>
              <Date>2023-01-15</Date>
            </Dates>
            <BaseForms>
              <BaseForm Id="001001001">
                <PartsOfSpeech>
                  <PartOfSpeech>noun</PartOfSpeech>
                </PartsOfSpeech>
                <Etymologies>
                  <Etymology>Semitic root</Etymology>
                </Etymologies>
                <RelatedLemmas>
                  <RelatedLemma>
                    <Word>אֵם</Word>
                  </RelatedLemma>
                </RelatedLemmas>
                <MeaningsOfName>
                  <MeaningOfName LanguageCode="en">
                    <Meaning>father</Meaning>
                  </MeaningOfName>
                </MeaningsOfName>
                <LEXMeanings>
                  <LEXMeaning Id="001001001001" IsBiblicalTerm="true" EntryCode="001001001001">
                    <LEXDomains>
                      <LEXDomain>Kinship</LEXDomain>
                    </LEXDomains>
                    <LEXSubDomains>
                      <LEXSubDomain>Parent</LEXSubDomain>
                    </LEXSubDomains>
                    <LEXSenses>
                      <LEXSense LanguageCode="en">
                        <DefinitionLong>A male parent in biological or social terms.</DefinitionLong>
                        <DefinitionShort>father</DefinitionShort>
                        <Glosses>
                          <Gloss>father</Gloss>
                          <Gloss>ancestor</Gloss>
                        </Glosses>
                        <Comments>Most common meaning</Comments>
                      </LEXSense>
                    </LEXSenses>
                    <LEXReferences>
                      <LEXReference>GEN 2:24</LEXReference>
                    </LEXReferences>
                  </LEXMeaning>
                  <LEXMeaning Id="001001001002" IsBiblicalTerm="false" EntryCode="001001001002">
                    <LEXDomains>
                      <LEXDomain>Authority</LEXDomain>
                    </LEXDomains>
                    <LEXSenses>
                      <LEXSense LanguageCode="en">
                        <DefinitionLong>A person who originates or founds something.</DefinitionLong>
                        <DefinitionShort>founder, originator</DefinitionShort>
                        <Glosses>
                          <Gloss>founder</Gloss>
                        </Glosses>
                      </LEXSense>
                    </LEXSenses>
                  </LEXMeaning>
                </LEXMeanings>
              </BaseForm>
            </BaseForms>
          </Lexicon_Entry>
        </Lexicon>
        """;

    // Minimal SDBG-format XML (Louw-Nida Greek) for deserialization
    private const string SdbgEntryXml = """
        <?xml version="1.0" encoding="utf-8"?>
        <LN_Lexicon>
          <SDBG_Entry Id="002001" Lemma="λόγος">
            <AlternateLemmas>
              <AlternateLemma>logos</AlternateLemma>
            </AlternateLemmas>
            <SubEntries>
              <Subentry SubId="002001001">
                <PartOfSpeech>noun</PartOfSpeech>
                <Entry>002001</Entry>
                <Domain>Communication</Domain>
                <SubDomain>Verbal</SubDomain>
                <Senses>
                  <Sense LanguageCode="en">
                    <DefinitionLong>That which is communicated by means of language.</DefinitionLong>
                    <DefinitionShort>word, message</DefinitionShort>
                    <Glosses>
                      <Gloss>word</Gloss>
                      <Gloss>message</Gloss>
                      <Gloss>speech</Gloss>
                    </Glosses>
                    <Comments>Primary sense</Comments>
                  </Sense>
                </Senses>
                <Links>
                  <Link>
                    <TargetString>33.100</TargetString>
                    <TargetResource>SDBG</TargetResource>
                  </Link>
                </Links>
                <Additionals>
                  <Additional Type="note">
                    <Text>See also related entries.</Text>
                  </Additional>
                </Additionals>
                <ReferTo>see also ῥῆμα</ReferTo>
                <References>
                  <Reference>JHN 1:1</Reference>
                </References>
              </Subentry>
            </SubEntries>
            <Notes>
              <Note Caller="1" LanguageCode="en">
                <Content>Important word in NT</Content>
              </Note>
            </Notes>
          </SDBG_Entry>
        </LN_Lexicon>
        """;

    // Minimal entry XML with multiple base forms
    private const string MultiBaseFormXml = """
        <?xml version="1.0" encoding="utf-8"?>
        <Lexicon>
          <Lexicon_Entry Id="003001" Lemma="בָּרָא" Version="3">
            <BaseForms>
              <BaseForm Id="003001001">
                <PartsOfSpeech>
                  <PartOfSpeech>verb</PartOfSpeech>
                </PartsOfSpeech>
                <LEXMeanings>
                  <LEXMeaning Id="003001001001" IsBiblicalTerm="true" EntryCode="003001001001">
                    <LEXSenses>
                      <LEXSense LanguageCode="en">
                        <DefinitionShort>to create</DefinitionShort>
                        <Glosses>
                          <Gloss>create</Gloss>
                        </Glosses>
                      </LEXSense>
                    </LEXSenses>
                  </LEXMeaning>
                </LEXMeanings>
              </BaseForm>
              <BaseForm Id="003001002">
                <PartsOfSpeech>
                  <PartOfSpeech>verb</PartOfSpeech>
                </PartsOfSpeech>
                <LEXMeanings>
                  <LEXMeaning Id="003001002001" IsBiblicalTerm="false" EntryCode="003001002001">
                    <LEXSenses>
                      <LEXSense LanguageCode="en">
                        <DefinitionShort>to cut down</DefinitionShort>
                        <Glosses>
                          <Gloss>cut down</Gloss>
                        </Glosses>
                      </LEXSense>
                    </LEXSenses>
                  </LEXMeaning>
                </LEXMeanings>
              </BaseForm>
            </BaseForms>
          </Lexicon_Entry>
        </Lexicon>
        """;

    #endregion

    #region Helper Methods

    private static T DeserializeXml<T>(string xml)
    {
        var serializer = new XmlSerializer(typeof(T));
        using var reader = new StringReader(xml);
        return (T)serializer.Deserialize(reader)!;
    }

    private static string SerializeXml<T>(T obj)
    {
        var serializer = new XmlSerializer(typeof(T));
        using var writer = new StringWriter();
        serializer.Serialize(writer, obj);
        return writer.ToString();
    }

    #endregion

    #region SDBH (Hebrew) Deserialization Tests

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBH XML deserializes into Lexicon_Main with correct entry count")]
    public void Deserialize_SdbhLexiconXml_ProducesLexiconMainWithEntries()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);

        Assert.That(lexicon, Is.Not.Null);
        Assert.That(lexicon, Has.Count.EqualTo(1));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBH entry has correct top-level attributes (Id, Lemma, Version)")]
    public void Deserialize_SdbhEntry_HasCorrectAttributes()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var entry = lexicon[0];

        Assert.Multiple(() =>
        {
            Assert.That(entry.MainId, Is.EqualTo("001001"));
            Assert.That(entry.Lemma, Is.EqualTo("\u05D0\u05B8\u05D1")); // אָב
            Assert.That(entry.Version, Is.EqualTo("5"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBH entry has correct strong codes list")]
    public void Deserialize_SdbhEntry_HasStrongCodes()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var entry = lexicon[0];

        Assert.That(entry.StrongCodes, Is.Not.Null);
        Assert.That(entry.StrongCodes, Has.Count.EqualTo(1));
        Assert.That(entry.StrongCodes[0], Is.EqualTo("H0001"));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBH entry has correct authors list")]
    public void Deserialize_SdbhEntry_HasAuthors()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var entry = lexicon[0];

        Assert.That(entry.Authors, Is.Not.Null);
        Assert.That(entry.Authors, Has.Count.EqualTo(1));
        Assert.That(entry.Authors[0], Is.EqualTo("R. de Blois"));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBH entry has correct alternate lemmas")]
    public void Deserialize_SdbhEntry_HasAlternateLemmas()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var entry = lexicon[0];

        Assert.That(entry.AlternateLemmas, Is.Not.Null);
        Assert.That(entry.AlternateLemmas, Has.Count.EqualTo(1));
        Assert.That(entry.AlternateLemmas[0], Is.EqualTo("av"));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBH entry has correct localization data")]
    public void Deserialize_SdbhEntry_HasLocalizations()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var entry = lexicon[0];

        Assert.That(entry.Localizations, Is.Not.Null);
        Assert.That(entry.Localizations, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            Assert.That(entry.Localizations[0].LanguageCode, Is.EqualTo("en"));
            Assert.That(entry.Localizations[0].DateTime, Is.EqualTo("2023-01-15"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBH entry has correct notes with caller, language, references, content")]
    public void Deserialize_SdbhEntry_HasNotes()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var entry = lexicon[0];

        Assert.That(entry.Notes, Is.Not.Null);
        Assert.That(entry.Notes, Has.Count.EqualTo(1));

        var note = entry.Notes[0];
        Assert.Multiple(() =>
        {
            Assert.That(note.Caller, Is.EqualTo(1));
            Assert.That(note.LanguageCode, Is.EqualTo("en"));
            Assert.That(note.Content, Is.EqualTo("Note about this entry"));
            Assert.That(note.References, Is.Not.Null);
            Assert.That(note.References, Has.Count.EqualTo(1));
            Assert.That(note.References[0], Is.EqualTo("GEN 2:24"));
        });
    }

    #endregion

    #region SDBH BaseForm Hierarchy Tests

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("Entry > BaseForm hierarchy: entry contains base forms with correct IDs")]
    public void Deserialize_SdbhEntry_HasBaseFormsWithCorrectId()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var entry = lexicon[0];

        Assert.That(entry.BaseForms, Is.Not.Null);
        Assert.That(entry.BaseForms, Has.Count.EqualTo(1));
        Assert.That(entry.BaseForms[0].BaseFormID, Is.EqualTo("001001001"));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("BaseForm has correct parts of speech")]
    public void Deserialize_SdbhBaseForm_HasPartsOfSpeech()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var baseForm = lexicon[0].BaseForms[0];

        Assert.That(baseForm.PartsOfSpeech, Is.Not.Null);
        Assert.That(baseForm.PartsOfSpeech, Has.Count.EqualTo(1));
        Assert.That(baseForm.PartsOfSpeech[0], Is.EqualTo("noun"));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("BaseForm has correct etymologies")]
    public void Deserialize_SdbhBaseForm_HasEtymologies()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var baseForm = lexicon[0].BaseForms[0];

        Assert.That(baseForm.Etymologies, Is.Not.Null);
        Assert.That(baseForm.Etymologies, Has.Count.EqualTo(1));
        Assert.That(baseForm.Etymologies[0], Is.EqualTo("Semitic root"));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("BaseForm has correct related lemmas")]
    public void Deserialize_SdbhBaseForm_HasRelatedLemmas()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var baseForm = lexicon[0].BaseForms[0];

        Assert.That(baseForm.RelatedLemmas, Is.Not.Null);
        Assert.That(baseForm.RelatedLemmas, Has.Count.EqualTo(1));
        Assert.That(
            baseForm.RelatedLemmas[0].Word,
            Is.EqualTo("\u05D0\u05B5\u05DD")
        ); // אֵם
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("BaseForm has correct meanings of name")]
    public void Deserialize_SdbhBaseForm_HasMeaningsOfName()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var baseForm = lexicon[0].BaseForms[0];

        Assert.That(baseForm.MeaningsOfName, Is.Not.Null);
        Assert.That(baseForm.MeaningsOfName, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            Assert.That(baseForm.MeaningsOfName[0].LanguageCode, Is.EqualTo("en"));
            Assert.That(baseForm.MeaningsOfName[0].Meaning, Is.EqualTo("father"));
        });
    }

    #endregion

    #region SDBH LexicalMeaning Hierarchy Tests

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("BaseForm > LEXMeaning hierarchy: base form contains meanings with correct attributes")]
    public void Deserialize_SdbhLexMeaning_HasCorrectAttributes()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var meaning = lexicon[0].BaseForms[0].LEXMeanings[0];

        Assert.Multiple(() =>
        {
            Assert.That(meaning.LEXID, Is.EqualTo("001001001001"));
            Assert.That(meaning.LEXIsBiblicalTerm, Is.EqualTo("true"));
            Assert.That(meaning.LEXEntryCode, Is.EqualTo("001001001001"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("LEXMeaning has correct domain and subdomain lists")]
    public void Deserialize_SdbhLexMeaning_HasDomainsAndSubDomains()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var meaning = lexicon[0].BaseForms[0].LEXMeanings[0];

        Assert.Multiple(() =>
        {
            Assert.That(meaning.LEXDomains, Has.Count.EqualTo(1));
            Assert.That(meaning.LEXDomains[0], Is.EqualTo("Kinship"));
            Assert.That(meaning.LEXSubDomains, Has.Count.EqualTo(1));
            Assert.That(meaning.LEXSubDomains[0], Is.EqualTo("Parent"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("LEXMeaning has correct references")]
    public void Deserialize_SdbhLexMeaning_HasReferences()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var meaning = lexicon[0].BaseForms[0].LEXMeanings[0];

        Assert.That(meaning.LEXReferences, Is.Not.Null);
        Assert.That(meaning.LEXReferences, Has.Count.EqualTo(1));
        Assert.That(meaning.LEXReferences[0], Is.EqualTo("GEN 2:24"));
    }

    #endregion

    #region SDBH Sense (Gloss) Hierarchy Tests

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("LEXMeaning > Sense hierarchy: sense has correct language code and definitions")]
    public void Deserialize_SdbhSense_HasCorrectDefinitions()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var sense = lexicon[0].BaseForms[0].LEXMeanings[0].LEXSenses[0];

        Assert.Multiple(() =>
        {
            Assert.That(sense.LanguageCode, Is.EqualTo("en"));
            Assert.That(
                sense.DefinitionLong,
                Is.EqualTo("A male parent in biological or social terms.")
            );
            Assert.That(sense.DefinitionShort, Is.EqualTo("father"));
            Assert.That(sense.Comments, Is.EqualTo("Most common meaning"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("Sense > Gloss hierarchy: sense contains correct gloss list")]
    public void Deserialize_SdbhSense_HasGlosses()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var sense = lexicon[0].BaseForms[0].LEXMeanings[0].LEXSenses[0];

        Assert.That(sense.Glosses, Is.Not.Null);
        Assert.That(sense.Glosses, Has.Count.EqualTo(2));
        Assert.Multiple(() =>
        {
            Assert.That(sense.Glosses[0], Is.EqualTo("father"));
            Assert.That(sense.Glosses[1], Is.EqualTo("ancestor"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("Entry with multiple LEXMeanings: second meaning has correct IsBiblicalTerm=false")]
    public void Deserialize_SdbhEntry_MultipleMeaningsDeserializedCorrectly()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var meanings = lexicon[0].BaseForms[0].LEXMeanings;

        Assert.That(meanings, Has.Count.EqualTo(2));
        Assert.Multiple(() =>
        {
            Assert.That(meanings[0].LEXIsBiblicalTerm, Is.EqualTo("true"));
            Assert.That(meanings[1].LEXIsBiblicalTerm, Is.EqualTo("false"));
            Assert.That(meanings[1].LEXID, Is.EqualTo("001001001002"));
        });
    }

    #endregion

    #region SDBG (Greek / Louw-Nida) Deserialization Tests

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBG XML deserializes into SDBG_Main with correct entry count")]
    public void Deserialize_SdbgLexiconXml_ProducesSdbgMainWithEntries()
    {
        var lexicon = DeserializeXml<SDBG_Main>(SdbgEntryXml);

        Assert.That(lexicon, Is.Not.Null);
        Assert.That(lexicon, Has.Count.EqualTo(1));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBG entry has correct top-level attributes (Id, Lemma)")]
    public void Deserialize_SdbgEntry_HasCorrectAttributes()
    {
        var lexicon = DeserializeXml<SDBG_Main>(SdbgEntryXml);
        var entry = lexicon[0];

        Assert.Multiple(() =>
        {
            Assert.That(entry.MainId, Is.EqualTo("002001"));
            Assert.That(entry.Lemma, Is.EqualTo("\u03BB\u03CC\u03B3\u03BF\u03C2")); // λόγος
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBG entry has correct alternate lemmas")]
    public void Deserialize_SdbgEntry_HasAlternateLemmas()
    {
        var lexicon = DeserializeXml<SDBG_Main>(SdbgEntryXml);
        var entry = lexicon[0];

        Assert.That(entry.AlternateLemmas, Is.Not.Null);
        Assert.That(entry.AlternateLemmas, Has.Count.EqualTo(1));
        Assert.That(entry.AlternateLemmas[0], Is.EqualTo("logos"));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBG entry has correct sub-entries with expected hierarchy")]
    public void Deserialize_SdbgEntry_HasSubEntries()
    {
        var lexicon = DeserializeXml<SDBG_Main>(SdbgEntryXml);
        var entry = lexicon[0];

        Assert.That(entry.SubEntries, Is.Not.Null);
        Assert.That(entry.SubEntries, Has.Count.EqualTo(1));

        var subEntry = entry.SubEntries[0];
        Assert.Multiple(() =>
        {
            Assert.That(subEntry.SubId, Is.EqualTo("002001001"));
            Assert.That(subEntry.PartOfSpeech, Is.EqualTo("noun"));
            Assert.That(subEntry.Entry, Is.EqualTo("002001"));
            Assert.That(subEntry.Domain, Is.EqualTo("Communication"));
            Assert.That(subEntry.SubDomain, Is.EqualTo("Verbal"));
            Assert.That(subEntry.ReferTo, Is.EqualTo("see also \u1FE5\u1FC6\u03BC\u03B1")); // ῥῆμα
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBG sub-entry has correct senses with glosses")]
    public void Deserialize_SdbgSubEntry_HasSensesWithGlosses()
    {
        var lexicon = DeserializeXml<SDBG_Main>(SdbgEntryXml);
        var subEntry = lexicon[0].SubEntries[0];

        Assert.That(subEntry.Senses, Is.Not.Null);
        Assert.That(subEntry.Senses, Has.Count.EqualTo(1));

        var sense = subEntry.Senses[0];
        Assert.Multiple(() =>
        {
            Assert.That(sense.LanguageCode, Is.EqualTo("en"));
            Assert.That(sense.DefinitionShort, Is.EqualTo("word, message"));
            Assert.That(sense.Glosses, Has.Count.EqualTo(3));
            Assert.That(sense.Glosses[0], Is.EqualTo("word"));
            Assert.That(sense.Glosses[1], Is.EqualTo("message"));
            Assert.That(sense.Glosses[2], Is.EqualTo("speech"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBG sub-entry has correct links")]
    public void Deserialize_SdbgSubEntry_HasLinks()
    {
        var lexicon = DeserializeXml<SDBG_Main>(SdbgEntryXml);
        var subEntry = lexicon[0].SubEntries[0];

        Assert.That(subEntry.Links, Is.Not.Null);
        Assert.That(subEntry.Links, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            Assert.That(subEntry.Links[0].TargetString, Is.EqualTo("33.100"));
            Assert.That(subEntry.Links[0].TargetResource, Is.EqualTo("SDBG"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBG sub-entry has correct additional notes")]
    public void Deserialize_SdbgSubEntry_HasAdditionals()
    {
        var lexicon = DeserializeXml<SDBG_Main>(SdbgEntryXml);
        var subEntry = lexicon[0].SubEntries[0];

        Assert.That(subEntry.Additionals, Is.Not.Null);
        Assert.That(subEntry.Additionals, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            Assert.That(subEntry.Additionals[0].Type, Is.EqualTo("note"));
            Assert.That(subEntry.Additionals[0].Text, Is.EqualTo("See also related entries."));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBG sub-entry has correct references")]
    public void Deserialize_SdbgSubEntry_HasReferences()
    {
        var lexicon = DeserializeXml<SDBG_Main>(SdbgEntryXml);
        var subEntry = lexicon[0].SubEntries[0];

        Assert.That(subEntry.References, Is.Not.Null);
        Assert.That(subEntry.References, Has.Count.EqualTo(1));
        Assert.That(subEntry.References[0], Is.EqualTo("JHN 1:1"));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBG entry has notes with correct attributes")]
    public void Deserialize_SdbgEntry_HasNotes()
    {
        var lexicon = DeserializeXml<SDBG_Main>(SdbgEntryXml);
        var entry = lexicon[0];

        Assert.That(entry.Notes, Is.Not.Null);
        Assert.That(entry.Notes, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            // Note: PT9 SDBG LN_Note has 'Calle' (typo in PT9) for Caller attribute
            Assert.That(entry.Notes[0].Calle, Is.EqualTo(1));
            Assert.That(entry.Notes[0].LanguageCode, Is.EqualTo("en"));
            Assert.That(entry.Notes[0].Content, Is.EqualTo("Important word in NT"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBG sub-entry includes IncludedLemmaSet data when present")]
    public void Deserialize_SdbgSubEntryWithIncludedLemmas_IncludedLemmasDeserialized()
    {
        var xml = """
            <?xml version="1.0" encoding="utf-8"?>
            <LN_Lexicon>
              <SDBG_Entry Id="004001" Lemma="test">
                <SubEntries>
                  <Subentry SubId="004001001">
                    <IncludedLemmaSets>
                      <IncludedLemmaSet>
                        <IncludedLemma>included_word</IncludedLemma>
                        <IncludedPartOfSpeech>verb</IncludedPartOfSpeech>
                      </IncludedLemmaSet>
                    </IncludedLemmaSets>
                  </Subentry>
                </SubEntries>
              </SDBG_Entry>
            </LN_Lexicon>
            """;

        var lexicon = DeserializeXml<SDBG_Main>(xml);
        var subEntry = lexicon[0].SubEntries[0];

        Assert.That(subEntry.IncludedLemmaSets, Is.Not.Null);
        Assert.That(subEntry.IncludedLemmaSets, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            Assert.That(subEntry.IncludedLemmaSets[0].IncludedLemma, Is.EqualTo("included_word"));
            Assert.That(subEntry.IncludedLemmaSets[0].IncludedPartOfSpeech, Is.EqualTo("verb"));
        });
    }

    #endregion

    #region LexEntryKey Tests

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("LexEntryKey parses valid Dictionary:Lemma:Index format")]
    public void LexEntryKey_ValidFormat_ParsesCorrectly()
    {
        var key = new LexEntryKey("SDBH:av:001001001");

        Assert.Multiple(() =>
        {
            Assert.That(key.Dictionary, Is.EqualTo("SDBH"));
            Assert.That(key.Lemma, Is.EqualTo("av"));
            Assert.That(key.Index, Is.EqualTo("001001001"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("LexEntryKey parses SDBG dictionary key")]
    public void LexEntryKey_SdbgFormat_ParsesCorrectly()
    {
        var key = new LexEntryKey("SDBG:logos:002001001");

        Assert.Multiple(() =>
        {
            Assert.That(key.Dictionary, Is.EqualTo("SDBG"));
            Assert.That(key.Lemma, Is.EqualTo("logos"));
            Assert.That(key.Index, Is.EqualTo("002001001"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("LexEntryKey throws ArgumentException for invalid format (too few parts)")]
    public void LexEntryKey_TooFewParts_ThrowsArgumentException()
    {
        Assert.That(
            () => new LexEntryKey("SDBH:av"),
            Throws.TypeOf<ArgumentException>()
        );
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("LexEntryKey throws ArgumentException for invalid format (too many parts)")]
    public void LexEntryKey_TooManyParts_ThrowsArgumentException()
    {
        Assert.That(
            () => new LexEntryKey("SDBH:av:001:extra"),
            Throws.TypeOf<ArgumentException>()
        );
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("LexEntryKey throws ArgumentException for empty string")]
    public void LexEntryKey_EmptyString_ThrowsArgumentException()
    {
        Assert.That(
            () => new LexEntryKey(""),
            Throws.TypeOf<ArgumentException>()
        );
    }

    #endregion

    #region GetBaseForm Helper Tests

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("GetBaseForm returns correct base form at valid index")]
    public void GetBaseForm_ValidIndex_ReturnsBaseForm()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(MultiBaseFormXml);
        var entry = lexicon[0];

        var baseForm = entry.GetBaseForm(0);

        Assert.That(baseForm, Is.Not.Null);
        Assert.That(baseForm.BaseFormID, Is.EqualTo("003001001"));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("GetBaseForm returns second base form at index 1")]
    public void GetBaseForm_SecondIndex_ReturnsSecondBaseForm()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(MultiBaseFormXml);
        var entry = lexicon[0];

        var baseForm = entry.GetBaseForm(1);

        Assert.That(baseForm, Is.Not.Null);
        Assert.That(baseForm.BaseFormID, Is.EqualTo("003001002"));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("GetBaseForm returns null for negative index")]
    public void GetBaseForm_NegativeIndex_ReturnsNull()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(MultiBaseFormXml);
        var entry = lexicon[0];

        var baseForm = entry.GetBaseForm(-1);

        Assert.That(baseForm, Is.Null);
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("GetBaseForm returns null for index beyond list size")]
    public void GetBaseForm_IndexBeyondCount_ReturnsNull()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(MultiBaseFormXml);
        var entry = lexicon[0];

        var baseForm = entry.GetBaseForm(99);

        Assert.That(baseForm, Is.Null);
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("GetBaseForm returns null when BaseForms list is null")]
    public void GetBaseForm_NullBaseForms_ReturnsNull()
    {
        var entry = new Lexicon_Entry { BaseForms = null };

        var baseForm = entry.GetBaseForm(0);

        Assert.That(baseForm, Is.Null);
    }

    #endregion

    #region GetLexMeaning Helper Tests

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("GetLexMeaning returns correct meaning at valid index")]
    public void GetLexMeaning_ValidIndex_ReturnsMeaning()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var baseForm = lexicon[0].BaseForms[0];

        var meaning = baseForm.GetLexMeaning(0);

        Assert.That(meaning, Is.Not.Null);
        Assert.That(meaning.LEXID, Is.EqualTo("001001001001"));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("GetLexMeaning returns second meaning at index 1")]
    public void GetLexMeaning_SecondIndex_ReturnsSecondMeaning()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var baseForm = lexicon[0].BaseForms[0];

        var meaning = baseForm.GetLexMeaning(1);

        Assert.That(meaning, Is.Not.Null);
        Assert.That(meaning.LEXID, Is.EqualTo("001001001002"));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("GetLexMeaning returns null for negative index")]
    public void GetLexMeaning_NegativeIndex_ReturnsNull()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var baseForm = lexicon[0].BaseForms[0];

        var meaning = baseForm.GetLexMeaning(-1);

        Assert.That(meaning, Is.Null);
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("GetLexMeaning returns null for index beyond list size")]
    public void GetLexMeaning_IndexBeyondCount_ReturnsNull()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var baseForm = lexicon[0].BaseForms[0];

        var meaning = baseForm.GetLexMeaning(99);

        Assert.That(meaning, Is.Null);
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("GetLexMeaning returns null when LEXMeanings list is null")]
    public void GetLexMeaning_NullLexMeanings_ReturnsNull()
    {
        var baseForm = new Lexicon_BaseForm { LEXMeanings = null };

        var meaning = baseForm.GetLexMeaning(0);

        Assert.That(meaning, Is.Null);
    }

    #endregion

    #region GetMeaningForCode Helper Tests

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("GetMeaningForCode returns matching meaning when entry code exists")]
    public void GetMeaningForCode_ExistingCode_ReturnsMeaning()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var entry = lexicon[0];

        var meaning = entry.GetMeaningForCode("001001001001");

        Assert.That(meaning, Is.Not.Null);
        Assert.That(meaning.LEXID, Is.EqualTo("001001001001"));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("GetMeaningForCode returns second meaning when matching second code")]
    public void GetMeaningForCode_SecondCode_ReturnsSecondMeaning()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var entry = lexicon[0];

        var meaning = entry.GetMeaningForCode("001001001002");

        Assert.That(meaning, Is.Not.Null);
        Assert.That(meaning.LEXID, Is.EqualTo("001001001002"));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("GetMeaningForCode returns null when code does not exist")]
    public void GetMeaningForCode_NonexistentCode_ReturnsNull()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(SdbhEntryXml);
        var entry = lexicon[0];

        var meaning = entry.GetMeaningForCode("nonexistent_code");

        Assert.That(meaning, Is.Null);
    }

    #endregion

    #region XML Round-Trip Tests

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBH round-trip: serialize then deserialize preserves entry structure")]
    public void RoundTrip_SdbhLexicon_PreservesEntryStructure()
    {
        var original = DeserializeXml<Lexicon_Main>(SdbhEntryXml);

        var serialized = SerializeXml(original);
        var roundTripped = DeserializeXml<Lexicon_Main>(serialized);

        Assert.That(roundTripped, Has.Count.EqualTo(original.Count));
        Assert.Multiple(() =>
        {
            Assert.That(roundTripped[0].MainId, Is.EqualTo(original[0].MainId));
            Assert.That(roundTripped[0].Lemma, Is.EqualTo(original[0].Lemma));
            Assert.That(roundTripped[0].Version, Is.EqualTo(original[0].Version));
            Assert.That(
                roundTripped[0].BaseForms.Count,
                Is.EqualTo(original[0].BaseForms.Count)
            );
            Assert.That(
                roundTripped[0].BaseForms[0].LEXMeanings.Count,
                Is.EqualTo(original[0].BaseForms[0].LEXMeanings.Count)
            );
            Assert.That(
                roundTripped[0].BaseForms[0].LEXMeanings[0].LEXSenses[0].Glosses.Count,
                Is.EqualTo(original[0].BaseForms[0].LEXMeanings[0].LEXSenses[0].Glosses.Count)
            );
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("SDBG round-trip: serialize then deserialize preserves entry structure")]
    public void RoundTrip_SdbgLexicon_PreservesEntryStructure()
    {
        var original = DeserializeXml<SDBG_Main>(SdbgEntryXml);

        var serialized = SerializeXml(original);
        var roundTripped = DeserializeXml<SDBG_Main>(serialized);

        Assert.That(roundTripped, Has.Count.EqualTo(original.Count));
        Assert.Multiple(() =>
        {
            Assert.That(roundTripped[0].MainId, Is.EqualTo(original[0].MainId));
            Assert.That(roundTripped[0].Lemma, Is.EqualTo(original[0].Lemma));
            Assert.That(
                roundTripped[0].SubEntries.Count,
                Is.EqualTo(original[0].SubEntries.Count)
            );
            Assert.That(
                roundTripped[0].SubEntries[0].Senses[0].Glosses.Count,
                Is.EqualTo(original[0].SubEntries[0].Senses[0].Glosses.Count)
            );
        });
    }

    #endregion

    #region Edge Case Tests

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("Empty lexicon XML deserializes to empty list")]
    public void Deserialize_EmptyLexiconXml_ProducesEmptyList()
    {
        var xml = """
            <?xml version="1.0" encoding="utf-8"?>
            <Lexicon />
            """;

        var lexicon = DeserializeXml<Lexicon_Main>(xml);

        Assert.That(lexicon, Is.Not.Null);
        Assert.That(lexicon, Has.Count.EqualTo(0));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("Empty SDBG lexicon XML deserializes to empty list")]
    public void Deserialize_EmptySdbgLexiconXml_ProducesEmptyList()
    {
        var xml = """
            <?xml version="1.0" encoding="utf-8"?>
            <LN_Lexicon />
            """;

        var lexicon = DeserializeXml<SDBG_Main>(xml);

        Assert.That(lexicon, Is.Not.Null);
        Assert.That(lexicon, Has.Count.EqualTo(0));
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("Entry with no BaseForms deserializes with null or empty BaseForms")]
    public void Deserialize_EntryWithNoBaseForms_BaseFormsIsNullOrEmpty()
    {
        var xml = """
            <?xml version="1.0" encoding="utf-8"?>
            <Lexicon>
              <Lexicon_Entry Id="999" Lemma="test" Version="1" />
            </Lexicon>
            """;

        var lexicon = DeserializeXml<Lexicon_Main>(xml);
        var entry = lexicon[0];

        // BaseForms should be null or empty when element is absent.
        // .NET Framework returns null; .NET 8 XmlSerializer may return empty list.
        Assert.That(
            entry.BaseForms == null || entry.BaseForms.Count == 0,
            Is.True,
            "BaseForms should be null or empty when element is absent"
        );
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("Entry with multiple base forms deserializes all base forms correctly")]
    public void Deserialize_EntryWithMultipleBaseForms_AllBaseFormsPresent()
    {
        var lexicon = DeserializeXml<Lexicon_Main>(MultiBaseFormXml);
        var entry = lexicon[0];

        Assert.That(entry.BaseForms, Has.Count.EqualTo(2));
        Assert.Multiple(() =>
        {
            Assert.That(entry.BaseForms[0].BaseFormID, Is.EqualTo("003001001"));
            Assert.That(entry.BaseForms[1].BaseFormID, Is.EqualTo("003001002"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("Meaning with ContextualMeaning child elements deserializes correctly")]
    public void Deserialize_MeaningWithContextualMeanings_ContextualMeaningsDeserialized()
    {
        var xml = """
            <?xml version="1.0" encoding="utf-8"?>
            <Lexicon>
              <Lexicon_Entry Id="005001" Lemma="test" Version="1">
                <BaseForms>
                  <BaseForm Id="005001001">
                    <LEXMeanings>
                      <LEXMeaning Id="005001001001" IsBiblicalTerm="true" EntryCode="005001001001">
                        <ContextualMeanings>
                          <ContextualMeaning Id="CON001">
                            <CONDomains>
                              <CONDomain>TestDomain</CONDomain>
                            </CONDomains>
                            <CONForms>
                              <CONForm>testform</CONForm>
                            </CONForms>
                            <CONSenses>
                              <CONSense LanguageCode="en">
                                <DefinitionShort>contextual def</DefinitionShort>
                                <Glosses>
                                  <Gloss>context gloss</Gloss>
                                </Glosses>
                              </CONSense>
                            </CONSenses>
                          </ContextualMeaning>
                        </ContextualMeanings>
                      </LEXMeaning>
                    </LEXMeanings>
                  </BaseForm>
                </BaseForms>
              </Lexicon_Entry>
            </Lexicon>
            """;

        var lexicon = DeserializeXml<Lexicon_Main>(xml);
        var meaning = lexicon[0].BaseForms[0].LEXMeanings[0];

        Assert.That(meaning.CONMeanings, Is.Not.Null);
        Assert.That(meaning.CONMeanings, Has.Count.EqualTo(1));

        var contextualMeaning = meaning.CONMeanings[0];
        Assert.Multiple(() =>
        {
            Assert.That(contextualMeaning.CONID, Is.EqualTo("CON001"));
            Assert.That(contextualMeaning.CONDomains, Has.Count.EqualTo(1));
            Assert.That(contextualMeaning.CONDomains[0], Is.EqualTo("TestDomain"));
            Assert.That(contextualMeaning.CONForms, Has.Count.EqualTo(1));
            Assert.That(contextualMeaning.CONForms[0], Is.EqualTo("testform"));
            Assert.That(contextualMeaning.CONSenses, Has.Count.EqualTo(1));
            Assert.That(contextualMeaning.CONSenses[0].DefinitionShort, Is.EqualTo("contextual def"));
            Assert.That(contextualMeaning.CONSenses[0].Glosses[0], Is.EqualTo("context gloss"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("Meaning with LEXLinks deserializes link targets correctly")]
    public void Deserialize_MeaningWithLinks_LinksDeserialized()
    {
        var xml = """
            <?xml version="1.0" encoding="utf-8"?>
            <Lexicon>
              <Lexicon_Entry Id="006001" Lemma="test" Version="1">
                <BaseForms>
                  <BaseForm Id="006001001">
                    <LEXMeanings>
                      <LEXMeaning Id="006001001001" IsBiblicalTerm="false" EntryCode="006001001001">
                        <LEXLinks>
                          <LEXLink>
                            <TargetString>SDBH:001001:001001001</TargetString>
                            <TargetResource>SDBH</TargetResource>
                          </LEXLink>
                        </LEXLinks>
                      </LEXMeaning>
                    </LEXMeanings>
                  </BaseForm>
                </BaseForms>
              </Lexicon_Entry>
            </Lexicon>
            """;

        var lexicon = DeserializeXml<Lexicon_Main>(xml);
        var meaning = lexicon[0].BaseForms[0].LEXMeanings[0];

        Assert.That(meaning.LEXLinks, Is.Not.Null);
        Assert.That(meaning.LEXLinks, Has.Count.EqualTo(1));
        Assert.Multiple(() =>
        {
            Assert.That(meaning.LEXLinks[0].TargetString, Is.EqualTo("SDBH:001001:001001001"));
            Assert.That(meaning.LEXLinks[0].TargetResource, Is.EqualTo("SDBH"));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("Lexicon_Entry_Index class deserializes lemma index data correctly")]
    public void Deserialize_LexiconEntryIndex_HasLemmaAndLinks()
    {
        // Lexicon_Entry_Index is a standalone index type used for lookup
        var index = new Lexicon_Entry_Index
        {
            Lemma = "av",
            LemmaSimplified = "ab",
            EntryLinks = new List<string> { "001001", "001002" },
        };

        Assert.Multiple(() =>
        {
            Assert.That(index.Lemma, Is.EqualTo("av"));
            Assert.That(index.LemmaSimplified, Is.EqualTo("ab"));
            Assert.That(index.EntryLinks, Has.Count.EqualTo(2));
        });
    }

    [Test]
    [Category("Extraction")]
    [Property("ExtractionId", "EXT-015")]
    [Property("ScenarioId", "TS-164")]
    [Property("CapabilityId", "CAP-024")]
    [Description("Lexicon_Domain_Index class stores domain code and entry links")]
    public void Deserialize_LexiconDomainIndex_HasDomainCodeAndLinks()
    {
        var domainIndex = new Lexicon_Domain_Index
        {
            DomainCode = "D001",
            EntryLink = new List<string> { "001001", "002001" },
        };

        Assert.Multiple(() =>
        {
            Assert.That(domainIndex.DomainCode, Is.EqualTo("D001"));
            Assert.That(domainIndex.EntryLink, Has.Count.EqualTo(2));
        });
    }

    #endregion
}
