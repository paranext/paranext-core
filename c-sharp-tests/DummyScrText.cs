using System.Diagnostics.CodeAnalysis;
using System.Text;
using System.Xml;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.Languages;
using Paratext.Data.ProjectFileAccess;
using Paratext.Data.ProjectSettingsAccess;
using Paratext.Data.Users;
using PtxUtils;
using SIL.Scripture;

namespace TestParanextDataProvider
{
    [ExcludeFromCodeCoverage]
    internal class DummyScrText : ScrText
    {
        private readonly HexId _id;

        public DummyScrText(ProjectDetails projectDetails)
            : base(
                new ProjectName
                {
                    ShortName = projectDetails.Name,
                    ProjectPath = projectDetails.HomeDirectory
                },
                RegistrationInfo.DefaultUser
            )
        {
            _id = HexId.FromStr(projectDetails.Metadata.Id);
            projectName = new ProjectName
            {
                ShortName = projectDetails.Name + _id,
                ProjectPath = projectDetails.HomeDirectory
            };

            Settings.Editable = true;
            Settings.UsfmVersion = UsfmVersionOption.Version3;

            cachedDefaultStylesheet.Set(new DummyScrStylesheet());
            cachedFrontBackStylesheet.Set(cachedDefaultStylesheet);

            LanguageId langId = new("dmy", null, null, null);
            DummyScrLanguage language = new(this);
            language.SetLanguageId(langId);
            language.Save(null);

            Settings.LanguageID = langId;
            language.ForceSaveLdml(this);
        }

        public DummyScrText()
            : this(
                new ProjectDetails(
                    "Dummy",
                    new ProjectMetadata(HexId.CreateNew().ToString(), []),
                    ""
                )
            ) { }

        /// <summary>
        /// Sets a book as present with a specific modification date.
        /// Used for testing book comparison functionality (CAP-021).
        /// </summary>
        /// <param name="bookNum">Book number (1-123)</param>
        /// <param name="isPresent">Whether the book should be marked as present</param>
        /// <param name="modifiedDate">The modification date to set for the book file</param>
        public void SetBookPresent(int bookNum, bool isPresent, DateTime modifiedDate)
        {
            if (isPresent)
            {
                // Create minimal USFM content for the book
                string bookId = Canon.BookNumberToId(bookNum);
                string usfmContent = $"\\id {bookId}\n\\c 1\n\\v 1 Test content.";

                // Get the file path for this book
                string bookFilePath = BookFilePath(bookNum);

                // Write the file with the specified date
                if (FileManager is InMemoryFileManager inMemoryManager)
                {
                    inMemoryManager.WriteFileWithDate(bookFilePath, usfmContent, modifiedDate);
                }
            }
            else
            {
                // Remove the book file if it exists
                string bookFilePath = BookFilePath(bookNum);
                if (FileManager.Exists(bookFilePath))
                {
                    FileManager.Delete(bookFilePath);
                }
            }
        }

        protected override void Load(bool ignoreLoadErrors = false)
        {
            // Nothing to do
        }

        protected override ProjectFileManager CreateFileManager()
        {
            return new InMemoryFileManager(this);
        }

        protected override ProjectSettings CreateProjectSettings(bool ignoreFileMissing)
        {
            ProjectSettings settings =
                new(this, true)
                {
                    FullName = "Test ScrText",
                    MinParatextDataVersion = ParatextInfo.MinSupportedParatextDataVersion,
                    Guid = _id
                };

            return settings;
        }

        #region InMemoryFileManager class
        private sealed class InMemoryFileManager : ProjectFileManager
        {
            private static readonly Encoding s_utf8NoBOM = new UTF8Encoding(false);
            private readonly Dictionary<string, InMemoryFile> _fileSystem = new();

            public InMemoryFileManager(ScrText scrText)
                : base(scrText) { }

            // Implementation shamelessly stolen from the Paratext test code and then simplified

            #region Implementation of ProjectFileManager
            public override bool IsWritable => true;

            public override bool Exists(string relFilePath)
            {
                return _fileSystem.ContainsKey(relFilePath);
            }

            public override void Delete(string relFilePath)
            {
                _fileSystem.Remove(relFilePath);
            }

            public override void DeleteDirectory(string relDirPath)
            {
                string[] filesToBeRemoved = _fileSystem
                    .Keys.Where(k => Path.GetDirectoryName(k) == relDirPath)
                    .ToArray();
                foreach (string file in filesToBeRemoved)
                    Delete(file);
            }

            public override void MoveFile(string relFilePath, string newRelPath)
            {
                byte[] fileContents = GetFile(relFilePath);
                Delete(relFilePath);
                _fileSystem[newRelPath] = new InMemoryFile(fileContents);
            }

            public override void CopyFile(string absSourceFilePath, string dstRelPath)
            {
                throw new NotImplementedException();
            }

            public override IEnumerable<string> ProjectFiles(
                string searchPattern,
                string? relDirPath = null
            )
            {
                return Enumerable.Empty<string>();
            }

            public override IEnumerable<string> ProjectDirectories(
                string searchPattern,
                string? relDirPath = null
            )
            {
                return Enumerable.Empty<string>();
            }

            public override void WriteFileCreatingBackup(
                string relFilePath,
                Action<string> writeFile,
                Action<string>? validateFile = null
            )
            {
                writeFile(relFilePath);
            }

            public override TextReader OpenFileForRead(
                string relFilePath,
                Encoding? encoding = null
            )
            {
                // ENHANCE: Keep track of file locking via a custom reader to further increase testing accuracy.
                if (encoding == null)
                    encoding = s_utf8NoBOM;
                return new StreamReader(new MemoryStream(GetFile(relFilePath)), encoding);
            }

            public override BinaryReader OpenFileForByteRead(string relFilePath)
            {
                // ENHANCE: Keep track of file locking via a custom reader to further increase testing accuracy.
                return new BinaryReader(new MemoryStream(GetFile(relFilePath)));
            }

            public override XmlTextReader OpenFileForXmlRead(string relFilePath)
            {
                return new XmlTextReader(new MemoryStream(GetFile(relFilePath)));
            }

            public override TextWriter OpenFileForWrite(
                string relFilePath,
                Encoding? encoding = null
            )
            {
                if (encoding == null)
                    encoding = s_utf8NoBOM;
                return new DummyStreamWriter(this, relFilePath, encoding);
            }

            public override BinaryWriter OpenFileForByteWrite(string relFilePath)
            {
                return new DummyBinaryWriter(this, relFilePath);
            }

            public override void SetXml<T>(T obj, string relFilePath)
            {
                _fileSystem[relFilePath] = new InMemoryFile(
                    s_utf8NoBOM.GetBytes(Memento.ToXmlString(obj))
                );
            }

            public override T GetXml<T>(string relFilePath)
            {
                if (!_fileSystem.TryGetValue(relFilePath, out InMemoryFile? file))
                    return default!;

                // For some reason, FromXmlString fails miserably when there is a BOM at the start of the string
                string strData = s_utf8NoBOM.GetString(file.Data);
                if (strData.StartsWith('\uFEFF'))
                    strData = strData.Substring(1);

                return Memento.FromXmlString<T>(strData);
            }

            public override DateTime GetLastWriteTime(string relFilePath)
            {
                if (!_fileSystem.TryGetValue(relFilePath, out InMemoryFile? file))
                    return new DateTime(1601, 1, 1, 0, 0, 0); // This is what .Net does if the file does not exist
                return file.WriteTime;
            }

            public override void CreateDirIfNotExist(string relDirPath)
            {
                // ENHANCE: Mimic the real file system where the directory must exist before creating a file to further increase testing accuracy.
                _fileSystem[relDirPath] = new InMemoryFile(new byte[0]);
            }

            public override string MakeSureFigureIsAccessible(string fileName)
            {
                return Path.Combine(figuresFolder, fileName);
            }

            /// <summary>
            /// Writes a file with a specific modification date.
            /// Used for testing book comparison functionality (CAP-021).
            /// </summary>
            /// <param name="relFilePath">Relative file path</param>
            /// <param name="content">File content as string</param>
            /// <param name="writeTime">The modification date to set</param>
            public void WriteFileWithDate(string relFilePath, string content, DateTime writeTime)
            {
                byte[] data = s_utf8NoBOM.GetBytes(content);
                _fileSystem[relFilePath] = new InMemoryFile(data, writeTime);
            }
            #endregion

            #region Private helper methods
            private byte[] GetFile(string relFilePath)
            {
                if (!_fileSystem.TryGetValue(relFilePath, out InMemoryFile? file))
                    throw new FileNotFoundException("File could not be found: " + relFilePath);
                return file.Data;
            }
            #endregion

            #region DummyStreamWriter class
            /// <summary>
            /// Helper class so that the fake text file can be stored in our fake file system when the writer is closed
            /// </summary>
            private sealed class DummyStreamWriter : StreamWriter
            {
                private readonly InMemoryFileManager _owner;
                private readonly string _relFilePath;

                public DummyStreamWriter(
                    InMemoryFileManager owner,
                    string relFilePath,
                    Encoding encoding
                )
                    : base(new MemoryStream(), encoding)
                {
                    _owner = owner;
                    _relFilePath = relFilePath;
                }

                protected override void Dispose(bool disposing)
                {
                    Flush();

                    _owner._fileSystem[_relFilePath] = new InMemoryFile(
                        ((MemoryStream)BaseStream).ToArray()
                    );

                    base.Dispose(disposing);
                }
            }
            #endregion

            #region DummyBinaryWriter class
            /// <summary>
            /// Helper class so that the fake binary file can be stored in our fake file system when the writer is closed
            /// </summary>
            private sealed class DummyBinaryWriter : BinaryWriter
            {
                private readonly InMemoryFileManager _owner;
                private readonly string _relFilePath;

                public DummyBinaryWriter(InMemoryFileManager owner, string relFilePath)
                    : base(new MemoryStream())
                {
                    _owner = owner;
                    _relFilePath = relFilePath;
                }

                protected override void Dispose(bool disposing)
                {
                    base.Dispose(disposing);
                    _owner._fileSystem[_relFilePath] = new InMemoryFile(
                        ((MemoryStream)BaseStream).ToArray()
                    );
                }
            }
            #endregion

            #region InMemoryFile class
            private sealed class InMemoryFile
            {
                public readonly DateTime WriteTime;

                public readonly byte[] Data;

                public InMemoryFile(byte[] data)
                    : this(data, DateTime.Now) { }

                public InMemoryFile(byte[] data, DateTime writeTime)
                {
                    Data = data ?? throw new ArgumentNullException(nameof(data));
                    WriteTime = writeTime;
                }
            }
            #endregion
        }
        #endregion
    }
}
