using System.Diagnostics.CodeAnalysis;
using Paratext.Data;

namespace TestParanextDataProvider.CreatingProjects
{
    /// <summary>
    /// Tests for ProjectType extension methods (CAP-004: GetProjectTypeInfo).
    /// TDD Variant: Outside-In TDD
    ///
    /// These tests verify the Paratext.Data.ProjectTypeExtensions methods:
    /// - IsDerivedType: Whether the project type is derived from another project
    /// - SharesProjectLicenseWithParent: Whether the project shares license with parent
    /// - StandardStyleSheetName: The default stylesheet for the project type
    ///
    /// Note: These extension methods already exist in ParatextData.dll.
    /// The tests verify we can correctly use them from PT10.
    ///
    /// Test Specifications: SPEC-023, SPEC-024, SPEC-025 from translation-info-specs.md
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    [Category("CreatingProjects")]
    [Category("CAP-004")]
    public class ProjectTypeInfoTests
    {
        #region IsDerivedType Tests

        /// <summary>
        /// Standard projects are not derived from any other project.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-035")]
        [Property("BehaviorId", "BHV-009")]
        [Description("Standard project type is not derived")]
        public void IsDerivedType_Standard_ReturnsFalse()
        {
            // Act
            bool result = ProjectType.Standard.IsDerivedType();

            // Assert
            Assert.That(result, Is.False);
        }

        /// <summary>
        /// BackTranslation projects are derived from their source translation.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-035")]
        [Property("BehaviorId", "BHV-009")]
        [Description("BackTranslation project type is derived")]
        public void IsDerivedType_BackTranslation_ReturnsTrue()
        {
            // Act
            bool result = ProjectType.BackTranslation.IsDerivedType();

            // Assert
            Assert.That(result, Is.True);
        }

        /// <summary>
        /// Daughter projects are derived from their source translation.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-035")]
        [Property("BehaviorId", "BHV-009")]
        [Description("Daughter project type is derived")]
        public void IsDerivedType_Daughter_ReturnsTrue()
        {
            // Act
            bool result = ProjectType.Daughter.IsDerivedType();

            // Assert
            Assert.That(result, Is.True);
        }

        /// <summary>
        /// StudyBible projects are derived from their base translation.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-035")]
        [Property("BehaviorId", "BHV-009")]
        [Description("StudyBible project type is derived")]
        public void IsDerivedType_StudyBible_ReturnsTrue()
        {
            // Act
            bool result = ProjectType.StudyBible.IsDerivedType();

            // Assert
            Assert.That(result, Is.True);
        }

        /// <summary>
        /// Auxiliary projects are derived from their source project.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-035")]
        [Property("BehaviorId", "BHV-009")]
        [Description("Auxiliary project type is derived")]
        public void IsDerivedType_Auxiliary_ReturnsTrue()
        {
            // Act
            bool result = ProjectType.Auxiliary.IsDerivedType();

            // Assert
            Assert.That(result, Is.True);
        }

        /// <summary>
        /// ConsultantNotes projects are NOT derived (they are standalone).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-035")]
        [Property("BehaviorId", "BHV-009")]
        [Description("ConsultantNotes project type is not derived")]
        public void IsDerivedType_ConsultantNotes_ReturnsFalse()
        {
            // Act
            bool result = ProjectType.ConsultantNotes.IsDerivedType();

            // Assert
            Assert.That(result, Is.False);
        }

        /// <summary>
        /// TransliterationManual projects are derived from their source.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-035")]
        [Property("BehaviorId", "BHV-009")]
        [Description("TransliterationManual project type is derived")]
        public void IsDerivedType_TransliterationManual_ReturnsTrue()
        {
            // Act
            bool result = ProjectType.TransliterationManual.IsDerivedType();

            // Assert
            Assert.That(result, Is.True);
        }

        /// <summary>
        /// TransliterationWithEncoder projects are derived from their source.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-035")]
        [Property("BehaviorId", "BHV-009")]
        [Description("TransliterationWithEncoder project type is derived")]
        public void IsDerivedType_TransliterationWithEncoder_ReturnsTrue()
        {
            // Act
            bool result = ProjectType.TransliterationWithEncoder.IsDerivedType();

            // Assert
            Assert.That(result, Is.True);
        }

        #endregion

        #region SharesProjectLicenseWithParent Tests

        /// <summary>
        /// Standard projects do not share license (they are independent).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-036")]
        [Property("BehaviorId", "BHV-009")]
        [Description("Standard project type does not share license")]
        public void SharesProjectLicenseWithParent_Standard_ReturnsFalse()
        {
            // Act
            bool result = ProjectType.Standard.SharesProjectLicenseWithParent();

            // Assert
            Assert.That(result, Is.False);
        }

        /// <summary>
        /// BackTranslation projects share license with their source.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-036")]
        [Property("BehaviorId", "BHV-009")]
        [Description("BackTranslation project type shares license with parent")]
        public void SharesProjectLicenseWithParent_BackTranslation_ReturnsTrue()
        {
            // Act
            bool result = ProjectType.BackTranslation.SharesProjectLicenseWithParent();

            // Assert
            Assert.That(result, Is.True);
        }

        /// <summary>
        /// Daughter projects do NOT share license (they are separate translations).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-036")]
        [Property("BehaviorId", "BHV-009")]
        [Description("Daughter project type does not share license")]
        public void SharesProjectLicenseWithParent_Daughter_ReturnsFalse()
        {
            // Act
            bool result = ProjectType.Daughter.SharesProjectLicenseWithParent();

            // Assert
            Assert.That(result, Is.False);
        }

        /// <summary>
        /// StudyBible projects do NOT share license (they are derived works).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-036")]
        [Property("BehaviorId", "BHV-009")]
        [Description("StudyBible project type does not share license")]
        public void SharesProjectLicenseWithParent_StudyBible_ReturnsFalse()
        {
            // Act
            bool result = ProjectType.StudyBible.SharesProjectLicenseWithParent();

            // Assert
            Assert.That(result, Is.False);
        }

        /// <summary>
        /// Auxiliary projects share license with their source.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-036")]
        [Property("BehaviorId", "BHV-009")]
        [Description("Auxiliary project type shares license with parent")]
        public void SharesProjectLicenseWithParent_Auxiliary_ReturnsTrue()
        {
            // Act
            bool result = ProjectType.Auxiliary.SharesProjectLicenseWithParent();

            // Assert
            Assert.That(result, Is.True);
        }

        /// <summary>
        /// ConsultantNotes projects do not share license.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-036")]
        [Property("BehaviorId", "BHV-009")]
        [Description("ConsultantNotes project type does not share license")]
        public void SharesProjectLicenseWithParent_ConsultantNotes_ReturnsFalse()
        {
            // Act
            bool result = ProjectType.ConsultantNotes.SharesProjectLicenseWithParent();

            // Assert
            Assert.That(result, Is.False);
        }

        /// <summary>
        /// TransliterationManual projects share license with source.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-036")]
        [Property("BehaviorId", "BHV-009")]
        [Description("TransliterationManual project type shares license")]
        public void SharesProjectLicenseWithParent_TransliterationManual_ReturnsTrue()
        {
            // Act
            bool result = ProjectType.TransliterationManual.SharesProjectLicenseWithParent();

            // Assert
            Assert.That(result, Is.True);
        }

        /// <summary>
        /// TransliterationWithEncoder projects share license with source.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-036")]
        [Property("BehaviorId", "BHV-009")]
        [Description("TransliterationWithEncoder project type shares license")]
        public void SharesProjectLicenseWithParent_TransliterationWithEncoder_ReturnsTrue()
        {
            // Act
            bool result = ProjectType.TransliterationWithEncoder.SharesProjectLicenseWithParent();

            // Assert
            Assert.That(result, Is.True);
        }

        #endregion

        #region StandardStyleSheetName Tests

        /// <summary>
        /// Standard projects use "usfm.sty" stylesheet.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-009")]
        [Description("Standard project type uses usfm.sty")]
        public void StandardStyleSheetName_Standard_ReturnsUsfmSty()
        {
            // Act
            string result = ProjectType.Standard.StandardStyleSheetName();

            // Assert
            Assert.That(result, Is.EqualTo("usfm.sty"));
        }

        /// <summary>
        /// BackTranslation projects use "usfm.sty" stylesheet.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-009")]
        [Description("BackTranslation project type uses usfm.sty")]
        public void StandardStyleSheetName_BackTranslation_ReturnsUsfmSty()
        {
            // Act
            string result = ProjectType.BackTranslation.StandardStyleSheetName();

            // Assert
            Assert.That(result, Is.EqualTo("usfm.sty"));
        }

        /// <summary>
        /// Daughter projects use "usfm.sty" stylesheet.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-009")]
        [Description("Daughter project type uses usfm.sty")]
        public void StandardStyleSheetName_Daughter_ReturnsUsfmSty()
        {
            // Act
            string result = ProjectType.Daughter.StandardStyleSheetName();

            // Assert
            Assert.That(result, Is.EqualTo("usfm.sty"));
        }

        /// <summary>
        /// StudyBible projects use "usfm_sb.sty" stylesheet (Study Bible variant).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-009")]
        [Description("StudyBible project type uses usfm_sb.sty")]
        public void StandardStyleSheetName_StudyBible_ReturnsUsfmSbSty()
        {
            // Act
            string result = ProjectType.StudyBible.StandardStyleSheetName();

            // Assert
            Assert.That(result, Is.EqualTo("usfm_sb.sty"));
        }

        /// <summary>
        /// Auxiliary projects use "usfm.sty" stylesheet.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-009")]
        [Description("Auxiliary project type uses usfm.sty")]
        public void StandardStyleSheetName_Auxiliary_ReturnsUsfmSty()
        {
            // Act
            string result = ProjectType.Auxiliary.StandardStyleSheetName();

            // Assert
            Assert.That(result, Is.EqualTo("usfm.sty"));
        }

        /// <summary>
        /// ConsultantNotes projects use "usfm.sty" stylesheet.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-009")]
        [Description("ConsultantNotes project type uses usfm.sty")]
        public void StandardStyleSheetName_ConsultantNotes_ReturnsUsfmSty()
        {
            // Act
            string result = ProjectType.ConsultantNotes.StandardStyleSheetName();

            // Assert
            Assert.That(result, Is.EqualTo("usfm.sty"));
        }

        /// <summary>
        /// TransliterationManual projects use "usfm.sty" stylesheet.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-009")]
        [Description("TransliterationManual project type uses usfm.sty")]
        public void StandardStyleSheetName_TransliterationManual_ReturnsUsfmSty()
        {
            // Act
            string result = ProjectType.TransliterationManual.StandardStyleSheetName();

            // Assert
            Assert.That(result, Is.EqualTo("usfm.sty"));
        }

        /// <summary>
        /// TransliterationWithEncoder projects use "usfm.sty" stylesheet.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-009")]
        [Description("TransliterationWithEncoder project type uses usfm.sty")]
        public void StandardStyleSheetName_TransliterationWithEncoder_ReturnsUsfmSty()
        {
            // Act
            string result = ProjectType.TransliterationWithEncoder.StandardStyleSheetName();

            // Assert
            Assert.That(result, Is.EqualTo("usfm.sty"));
        }

        #endregion
    }
}
