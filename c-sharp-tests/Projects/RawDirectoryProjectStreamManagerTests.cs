using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects
{
    internal class RawDirectoryProjectStorageInterpreterTests
    {
        [Test]
        public void RawDirPSI_GetExistingDataStreamNames_NotEmpty()
        {
            var metadata = new ProjectMetadata(
                new Guid(),
                "test",
                ProjectStorageType.ParatextFolders,
                "test"
            );
            // For now we are just reusing the "assets" directory to verify this works when reading from a directory
            var projectDetails = new ProjectDetails(metadata, "assets");
            var psi = new RawDirectoryProjectStreamManager(projectDetails);
            Assert.That(psi.GetExistingDataStreamNames(), Has.Length.GreaterThan(80));
        }
    }
}
