using System.Diagnostics.CodeAnalysis;
using System.Text;
using Paratext.Data;
using Paratext.Data.ProjectFileAccess;
using PtxUtils;

namespace TestParanextDataProvider;

/// <summary>
/// Shared in-memory file manager for test ScrText implementations.
/// Provides a fake file system that stores all files in memory.
/// Used by DummyScrText and DummyScrTextWithoutGuidSuffix.
/// </summary>
[ExcludeFromCodeCoverage]
internal sealed class InMemoryFileManager : ProjectFileManager
{
    private static readonly Encoding s_utf8NoBOM = new UTF8Encoding(false);
    private readonly Dictionary<string, InMemoryFile> _fileSystem = new();

    public InMemoryFileManager(ScrText scrText)
        : base(scrText) { }

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

    public override TextReader OpenFileForRead(string relFilePath, Encoding? encoding = null)
    {
        if (encoding == null)
            encoding = s_utf8NoBOM;
        return new StreamReader(new MemoryStream(GetFile(relFilePath)), encoding);
    }

    public override BinaryReader OpenFileForByteRead(string relFilePath)
    {
        return new BinaryReader(new MemoryStream(GetFile(relFilePath)));
    }

    public override System.Xml.XmlTextReader OpenFileForXmlRead(string relFilePath)
    {
        return new System.Xml.XmlTextReader(new MemoryStream(GetFile(relFilePath)));
    }

    public override TextWriter OpenFileForWrite(string relFilePath, Encoding? encoding = null)
    {
        if (encoding == null)
            encoding = s_utf8NoBOM;
        return new InMemoryStreamWriter(this, relFilePath, encoding);
    }

    public override BinaryWriter OpenFileForByteWrite(string relFilePath)
    {
        return new InMemoryBinaryWriter(this, relFilePath);
    }

    public override void SetXml<T>(T obj, string relFilePath)
    {
        _fileSystem[relFilePath] = new InMemoryFile(s_utf8NoBOM.GetBytes(Memento.ToXmlString(obj)));
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
        _fileSystem[relDirPath] = new InMemoryFile(Array.Empty<byte>());
    }

    public override string MakeSureFigureIsAccessible(string fileName)
    {
        return Path.Combine(figuresFolder, fileName);
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

    #region InMemoryStreamWriter class
    /// <summary>
    /// Helper class so that the fake text file can be stored in our fake file system when the writer is closed
    /// </summary>
    private sealed class InMemoryStreamWriter : StreamWriter
    {
        private readonly InMemoryFileManager _owner;
        private readonly string _relFilePath;

        public InMemoryStreamWriter(
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

    #region InMemoryBinaryWriter class
    /// <summary>
    /// Helper class so that the fake binary file can be stored in our fake file system when the writer is closed
    /// </summary>
    private sealed class InMemoryBinaryWriter : BinaryWriter
    {
        private readonly InMemoryFileManager _owner;
        private readonly string _relFilePath;

        public InMemoryBinaryWriter(InMemoryFileManager owner, string relFilePath)
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
        {
            Data = data ?? throw new ArgumentNullException(nameof(data));
            WriteTime = DateTime.Now;
        }
    }
    #endregion
}
