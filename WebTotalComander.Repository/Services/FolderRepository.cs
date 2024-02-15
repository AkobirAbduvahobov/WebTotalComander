using System.IO.Compression;
namespace WebTotalComander.Repository.Services;

public class FolderRepository : IFolderRepository
{
    private static string uploadFolderPath = Directory.GetCurrentDirectory() + "\\DataBase\\";

    public async Task<bool> CreateFolderAsync(string folderName, string folderPath = "")
    {
        string path = uploadFolderPath + folderPath + folderName;
        if (Directory.Exists(path))
            throw new FileNotFoundException("Folder already exist");

        Directory.CreateDirectory(path);
        return true;
    }

    public async Task<bool> DeleteFolderAsync(string folderPath)
    {
        string path = uploadFolderPath + folderPath;
        if (!Directory.Exists(path))
            throw new DirectoryNotFoundException("Directory was not found");

        //Directory.Delete(folderPath, recursive: true);
        Directory.Delete(path, recursive: true);
        return true;
    }

    public async Task<string[]> GetAllFilesAsync(string folderPath = "")
    {
        if (folderPath == string.Empty)
            uploadFolderPath.Remove(uploadFolderPath.Length - 1);

        string path = uploadFolderPath + folderPath;

        if (!Directory.Exists(path))
            throw new DirectoryNotFoundException("Directory was not found");

        var res = Directory.GetFileSystemEntries(path).Select(x => x.Remove(0, uploadFolderPath.Length)).ToArray();

        return res;
    }

    public async Task<string[]> GetAllFilesWithPaginationAsync(int offset, int limit, string folderPath = "")
    {
        if (folderPath == string.Empty)
            uploadFolderPath.Remove(uploadFolderPath.Length - 1);

        var path = uploadFolderPath + folderPath;

        if (!Directory.Exists(path))
            throw new DirectoryNotFoundException("Directory was not found");

        var res = Directory.GetFileSystemEntries(path).Skip(offset).Take(limit).Select(x => x.Remove(0, uploadFolderPath.Length)).ToArray();

        return res;
    }

    public async Task<string[]> GetAllWithFilterAsync(int offset, int limit, string ext, string name, string folderPath = "")
    {
        if (folderPath == string.Empty)
            uploadFolderPath.Remove(uploadFolderPath.Length - 1);

        string path = uploadFolderPath + folderPath;

        if (!Directory.Exists(path))
            throw new DirectoryNotFoundException("Directory was not found");
        IEnumerable<string> res1;

        var res3 = Directory.GetFileSystemEntries(path);
        if (ext != "folder")
        {
            res1 = res3.Where(s => s.Substring(1 + s.LastIndexOf("\\")).StartsWith(name) && s.EndsWith(ext));
        }
        else
        {   
            res1 = res3.Where(s => s.Substring(1 + s.LastIndexOf("\\")).StartsWith(name) && !s.Substring(1 + s.LastIndexOf("\\")).Contains('.'));
        }

        var res = res1.Skip(offset).Take(limit).Select(x => x.Remove(0, uploadFolderPath.Length)).ToArray();
        return res;
    }

    public async Task<int> GetTotalCount(string folderPath = "")
    {
        if (folderPath == string.Empty)
            uploadFolderPath.Remove(uploadFolderPath.Length - 1);

        string path = uploadFolderPath + folderPath;

        if (!Directory.Exists(path))
            throw new DirectoryNotFoundException("Directory was not found");

        return Directory.GetFileSystemEntries(path).Count();
    }

    public async Task<byte[]> DownloadZipAsync(string folderPath, string zipFileName)
    {
        folderPath = uploadFolderPath + folderPath;

        if (!Directory.Exists(folderPath))
            throw new DirectoryNotFoundException("Directory was not found");

        using (var memoryStream = new MemoryStream())
        {
            using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
            {
                await ZipFolder(folderPath, archive, "");
            }

            memoryStream.Seek(0, SeekOrigin.Begin);
            return memoryStream.ToArray();
        }
    }

    private async Task ZipFolder(string sourceFolder, ZipArchive archive, string entryPrefix)
    {
        foreach (var file in Directory.GetFiles(sourceFolder))
        {
            var entryName = Path.Combine(entryPrefix, Path.GetFileName(file));
            var entry = archive.CreateEntry(entryName);

            using (var entryStream = entry.Open())
            using (var fileStream = new FileStream(file, FileMode.Open, FileAccess.Read))
            {
                await fileStream.CopyToAsync(entryStream);
            }
        }

        foreach (var subFolder in Directory.GetDirectories(sourceFolder))
        {
            var entryName = Path.Combine(entryPrefix, Path.GetFileName(subFolder) + "/");
            var entry = archive.CreateEntry(entryName);

            await ZipFolder(subFolder, archive, entryName);
        }
    }
}
